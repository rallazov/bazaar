import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import blackProduct from "@assets/generated_images/Black_boxer_briefs_product_cd1031ec.png";
import redProduct from "@assets/generated_images/Red_boxer_briefs_product_f7f95c72.png";
import grayProduct from "@assets/generated_images/Gray_boxer_briefs_product_4b8ae20b.png";
import navyProduct from "@assets/generated_images/Navy_boxer_briefs_product_0d74910f.png";
import whiteProduct from "@assets/generated_images/White_boxer_briefs_product_6efa8aff.png";
import oliveProduct from "@assets/generated_images/Olive_boxer_briefs_product_19b74dfb.png";

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const { toast } = useToast();

  const products = [
    {
      id: "1",
      name: "Classic Black Boxer Brief",
      price: 29.99,
      salePrice: 24.99,
      image: blackProduct,
      colors: ["#000000"],
    },
    {
      id: "2",
      name: "Bold Red Boxer Brief",
      price: 29.99,
      image: redProduct,
      colors: ["#DC2626"],
    },
    {
      id: "3",
      name: "Charcoal Gray Boxer Brief",
      price: 29.99,
      image: grayProduct,
      colors: ["#6B7280"],
    },
    {
      id: "4",
      name: "Navy Blue Boxer Brief",
      price: 29.99,
      salePrice: 24.99,
      image: navyProduct,
      colors: ["#1E3A8A"],
    },
    {
      id: "5",
      name: "Pure White Boxer Brief",
      price: 29.99,
      image: whiteProduct,
      colors: ["#FFFFFF"],
    },
    {
      id: "6",
      name: "Olive Green Boxer Brief",
      price: 29.99,
      image: oliveProduct,
      colors: ["#6B7F39"],
    },
  ];

  const handleAddToCart = (productId: string) => {
    setCartCount((prev) => prev + 1);
    const product = products.find((p) => p.id === productId);
    toast({
      title: "Added to cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartCount} />
      <main className="flex-1">
        <Hero />
        <ProductGrid products={products} onAddToCart={handleAddToCart} />
      </main>
      <Footer />
    </div>
  );
}
