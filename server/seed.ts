import { storage } from "./storage";
import type { InsertProduct } from "@shared/schema";

const products: InsertProduct[] = [
  {
    name: "Classic Black Boxer Brief",
    description: "Premium comfort in classic black. Our signature boxer brief featuring soft, breathable fabric for all-day comfort.",
    price: "29.99",
    salePrice: "24.99",
    imageUrl: "/generated_images/Black_boxer_briefs_product_cd1031ec.png",
    colors: ["Black"],
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
  {
    name: "Bold Red Boxer Brief",
    description: "Make a statement with bold red. Premium fabric meets vibrant color for confident comfort.",
    price: "29.99",
    salePrice: null,
    imageUrl: "/generated_images/Red_boxer_briefs_product_f7f95c72.png",
    colors: ["Red"],
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
  {
    name: "Charcoal Gray Boxer Brief",
    description: "Sophisticated charcoal gray for versatile style. Perfect blend of comfort and understated elegance.",
    price: "29.99",
    salePrice: null,
    imageUrl: "/generated_images/Gray_boxer_briefs_product_4b8ae20b.png",
    colors: ["Gray"],
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
  {
    name: "Navy Blue Boxer Brief",
    description: "Deep navy blue for timeless appeal. Premium comfort with a classic touch.",
    price: "29.99",
    salePrice: "24.99",
    imageUrl: "/generated_images/Navy_boxer_briefs_product_0d74910f.png",
    colors: ["Navy"],
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
  {
    name: "Pure White Boxer Brief",
    description: "Clean, crisp white for essential comfort. Made with premium breathable fabric.",
    price: "29.99",
    salePrice: null,
    imageUrl: "/generated_images/White_boxer_briefs_product_6efa8aff.png",
    colors: ["White"],
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
  {
    name: "Olive Green Boxer Brief",
    description: "Modern olive green for contemporary style. Exceptional comfort meets fresh design.",
    price: "29.99",
    salePrice: null,
    imageUrl: "/generated_images/Olive_boxer_briefs_product_19b74dfb.png",
    colors: ["Olive"],
    sizes: ["S", "M", "L", "XL"],
    stock: 100,
  },
];

export async function seedProducts() {
  try {
    const existingProducts = await storage.getAllProducts();
    
    // Only seed if no products exist
    if (existingProducts.length === 0) {
      console.log("Seeding products...");
      for (const product of products) {
        await storage.createProduct(product);
      }
      console.log(`Seeded ${products.length} products successfully`);
    } else {
      console.log(`Database already has ${existingProducts.length} products, skipping seed`);
    }
  } catch (error) {
    console.error("Error seeding products:", error);
  }
}
