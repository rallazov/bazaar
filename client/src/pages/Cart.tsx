import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem, { CartItemData } from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowLeft } from "lucide-react";
import blackProduct from "@assets/generated_images/Black_boxer_briefs_product_cd1031ec.png";
import redProduct from "@assets/generated_images/Red_boxer_briefs_product_f7f95c72.png";
import { useToast } from "@/hooks/use-toast";

export default function Cart() {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<CartItemData[]>([
    {
      id: "1",
      name: "Classic Black Boxer Brief",
      price: 24.99,
      size: "L",
      color: "Black",
      quantity: 2,
      image: blackProduct,
    },
    {
      id: "2",
      name: "Bold Red Boxer Brief",
      price: 29.99,
      size: "M",
      color: "Red",
      quantity: 1,
      image: redProduct,
    },
  ]);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemove = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    });
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.09;

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartItems.length} />
      <main className="flex-1 py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-8">
            <Link href="/">
              <Button variant="ghost" className="gap-2 -ml-4" data-testid="button-continue-shopping">
                <ArrowLeft className="h-4 w-4" />
                Continue Shopping
              </Button>
            </Link>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold mb-4" data-testid="text-empty-cart-title">
                Your cart is empty
              </h2>
              <p className="text-muted-foreground mb-8">
                Add some products to get started
              </p>
              <Link href="/">
                <Button data-testid="button-shop-now-empty">Shop Now</Button>
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <h1 className="text-3xl font-bold mb-6" data-testid="text-cart-title">
                  Shopping Cart
                </h1>
                {cartItems.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={handleUpdateQuantity}
                    onRemove={handleRemove}
                  />
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <OrderSummary
                    subtotal={subtotal}
                    tax={tax}
                    onCheckout={() => {
                      window.location.href = "/checkout";
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
