import {
  type User,
  type InsertUser,
  type Product,
  type InsertProduct,
  type CartItem,
  type InsertCartItem,
  type Order,
  type InsertOrder,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // User methods
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;

  // Product methods
  getAllProducts(): Promise<Product[]>;
  getProduct(id: string): Promise<Product | undefined>;
  createProduct(product: InsertProduct): Promise<Product>;

  // Cart methods
  getCartItems(sessionId: string): Promise<CartItem[]>;
  addCartItem(item: InsertCartItem): Promise<CartItem>;
  updateCartItemQuantity(id: string, quantity: number): Promise<CartItem | undefined>;
  removeCartItem(id: string): Promise<void>;
  clearCart(sessionId: string): Promise<void>;

  // Order methods
  createOrder(order: InsertOrder): Promise<Order>;
  getOrder(id: string): Promise<Order | undefined>;
  updateOrderStatus(id: string, status: string): Promise<Order | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private products: Map<string, Product>;
  private cartItems: Map<string, CartItem>;
  private orders: Map<string, Order>;

  constructor() {
    this.users = new Map();
    this.products = new Map();
    this.cartItems = new Map();
    this.orders = new Map();
  }

  // User methods
  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Product methods
  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProduct(id: string): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = randomUUID();
    const product: Product = {
      id,
      name: insertProduct.name,
      description: insertProduct.description ?? null,
      price: insertProduct.price,
      salePrice: insertProduct.salePrice ?? null,
      imageUrl: insertProduct.imageUrl,
      colors: insertProduct.colors ?? null,
      sizes: insertProduct.sizes ?? null,
      stock: insertProduct.stock ?? null,
    };
    this.products.set(id, product);
    return product;
  }

  // Cart methods
  async getCartItems(sessionId: string): Promise<CartItem[]> {
    return Array.from(this.cartItems.values()).filter(
      (item) => item.sessionId === sessionId
    );
  }

  async addCartItem(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item with same product, size, color already exists
    const existingItem = Array.from(this.cartItems.values()).find(
      (item) =>
        item.sessionId === insertItem.sessionId &&
        item.productId === insertItem.productId &&
        item.size === insertItem.size &&
        item.color === insertItem.color
    );

    if (existingItem) {
      // Update quantity instead of creating new item
      existingItem.quantity += (insertItem.quantity ?? 1);
      this.cartItems.set(existingItem.id, existingItem);
      return existingItem;
    }

    const id = randomUUID();
    const cartItem: CartItem = {
      id,
      sessionId: insertItem.sessionId,
      productId: insertItem.productId,
      size: insertItem.size,
      color: insertItem.color,
      quantity: insertItem.quantity ?? 1,
      createdAt: new Date(),
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async updateCartItemQuantity(
    id: string,
    quantity: number
  ): Promise<CartItem | undefined> {
    const item = this.cartItems.get(id);
    if (!item) return undefined;

    item.quantity = quantity;
    this.cartItems.set(id, item);
    return item;
  }

  async removeCartItem(id: string): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    const items = await this.getCartItems(sessionId);
    items.forEach((item) => this.cartItems.delete(item.id));
  }

  // Order methods
  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = randomUUID();
    const order: Order = {
      id,
      sessionId: insertOrder.sessionId,
      customerEmail: insertOrder.customerEmail,
      customerName: insertOrder.customerName,
      shippingAddress: insertOrder.shippingAddress,
      total: insertOrder.total,
      status: insertOrder.status ?? "pending",
      stripePaymentIntentId: insertOrder.stripePaymentIntentId ?? null,
      createdAt: new Date(),
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrder(id: string): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateOrderStatus(
    id: string,
    status: string
  ): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;

    order.status = status;
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
