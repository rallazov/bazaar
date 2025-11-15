import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProductSchema, insertCartItemSchema, insertOrderSchema } from "@shared/schema";
import Stripe from "stripe";

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    const apiKey = process.env.STRIPE_SECRET_KEY;
    if (!apiKey) {
      throw new Error(
        "STRIPE_SECRET_KEY environment variable is not set. " +
        "Please set it to enable Stripe functionality."
      );
    }
    stripe = new Stripe(apiKey);
  }
  return stripe;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Product routes
  app.get("/api/products", async (req, res) => {
    try {
      const products = await storage.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });

  app.get("/api/products/:id", async (req, res) => {
    try {
      const product = await storage.getProduct(req.params.id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Failed to fetch product" });
    }
  });

  // Cart routes
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id;
      const cartItems = await storage.getCartItems(sessionId);

      // Enrich cart items with product data
      const enrichedItems = await Promise.all(
        cartItems.map(async (item) => {
          const product = await storage.getProduct(item.productId);
          return {
            ...item,
            product,
          };
        })
      );

      res.json(enrichedItems);
    } catch (error) {
      console.error("Error fetching cart:", error);
      res.status(500).json({ error: "Failed to fetch cart" });
    }
  });

  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id;
      const validated = insertCartItemSchema.parse({
        ...req.body,
        sessionId,
      });

      const cartItem = await storage.addCartItem(validated);
      res.json(cartItem);
    } catch (error) {
      console.error("Error adding to cart:", error);
      res.status(400).json({ error: "Failed to add item to cart" });
    }
  });

  app.patch("/api/cart/:id", async (req, res) => {
    try {
      const { quantity } = req.body;
      if (typeof quantity !== "number" || quantity < 1) {
        return res.status(400).json({ error: "Invalid quantity" });
      }

      const updatedItem = await storage.updateCartItemQuantity(
        req.params.id,
        quantity
      );

      if (!updatedItem) {
        return res.status(404).json({ error: "Cart item not found" });
      }

      res.json(updatedItem);
    } catch (error) {
      console.error("Error updating cart item:", error);
      res.status(500).json({ error: "Failed to update cart item" });
    }
  });

  app.delete("/api/cart/:id", async (req, res) => {
    try {
      await storage.removeCartItem(req.params.id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error removing cart item:", error);
      res.status(500).json({ error: "Failed to remove cart item" });
    }
  });

  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = req.session.id;
      await storage.clearCart(sessionId);
      res.json({ success: true });
    } catch (error) {
      console.error("Error clearing cart:", error);
      res.status(500).json({ error: "Failed to clear cart" });
    }
  });

  // Checkout routes
  app.post("/api/checkout/create-payment-intent", async (req, res) => {
    try {
      const sessionId = req.session.id;
      const cartItems = await storage.getCartItems(sessionId);

      if (cartItems.length === 0) {
        return res.status(400).json({ error: "Cart is empty" });
      }

      // Calculate total
      let total = 0;
      for (const item of cartItems) {
        const product = await storage.getProduct(item.productId);
        if (!product) continue;

        const price = product.salePrice
          ? parseFloat(product.salePrice)
          : parseFloat(product.price);
        total += price * item.quantity;
      }

      // Add tax (9%)
      const tax = total * 0.09;
      const finalTotal = Math.round((total + tax) * 100); // Convert to cents

      // Create Stripe payment intent
      const paymentIntent = await getStripe().paymentIntents.create({
        amount: finalTotal,
        currency: "usd",
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          sessionId,
        },
      });

      res.json({
        clientSecret: paymentIntent.client_secret,
        amount: finalTotal,
      });
    } catch (error) {
      console.error("Error creating payment intent:", error);
      res.status(500).json({ error: "Failed to create payment intent" });
    }
  });

  app.post("/api/checkout/confirm", async (req, res) => {
    try {
      const { paymentIntentId, customerEmail, customerName, shippingAddress } = req.body;
      const sessionId = req.session.id;

      // Verify payment intent
      const paymentIntent = await getStripe().paymentIntents.retrieve(paymentIntentId);

      if (paymentIntent.status !== "succeeded") {
        return res.status(400).json({ error: "Payment not completed" });
      }

      // Get cart items to calculate total
      const cartItems = await storage.getCartItems(sessionId);
      let subtotal = 0;

      for (const item of cartItems) {
        const product = await storage.getProduct(item.productId);
        if (!product) continue;

        const price = product.salePrice
          ? parseFloat(product.salePrice)
          : parseFloat(product.price);
        subtotal += price * item.quantity;
      }

      const tax = subtotal * 0.09;
      const total = (subtotal + tax).toFixed(2);

      // Create order
      const order = await storage.createOrder({
        sessionId,
        customerEmail,
        customerName,
        shippingAddress,
        total,
        status: "confirmed",
        stripePaymentIntentId: paymentIntentId,
      });

      // Clear cart
      await storage.clearCart(sessionId);

      res.json({ order });
    } catch (error) {
      console.error("Error confirming order:", error);
      res.status(500).json({ error: "Failed to confirm order" });
    }
  });

  // Order route
  app.get("/api/orders/:id", async (req, res) => {
    try {
      const order = await storage.getOrder(req.params.id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Failed to fetch order" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
