import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import type { Product } from "@shared/schema";

export default function Home() {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const { data: cartItems = [] } = useQuery<any[]>({
    queryKey: ["/api/cart"],
  });

  const addToCartMutation = useMutation({
    mutationFn: async (data: {
      productId: string;
      size: string;
      color: string;
      quantity: number;
    }) => {
      return apiRequest("POST", "/api/cart", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const handleAddToCart = (productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;

    const defaultSize = product.sizes?.[1] || "M";
    const defaultColor = product.colors?.[0] || "Black";

    addToCartMutation.mutate(
      {
        productId,
        size: defaultSize,
        color: defaultColor,
        quantity: 1,
      },
      {
        onSuccess: () => {
          toast({
            title: "Added to cart",
            description: `${product.name} has been added to your cart.`,
          });
        },
      }
    );
  };

  const formattedProducts = products.map((p) => ({
    id: p.id,
    name: p.name,
    price: parseFloat(p.price),
    salePrice: p.salePrice ? parseFloat(p.salePrice) : undefined,
    image: p.imageUrl,
    colors: p.colors?.map((color) => {
      const colorMap: Record<string, string> = {
        Black: "#000000",
        Red: "#DC2626",
        Gray: "#6B7280",
        Navy: "#1E3A8A",
        White: "#FFFFFF",
        Olive: "#6B7F39",
      };
      return colorMap[color] || "#000000";
    }),
  }));

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={cartItems.length} />
      <main className="flex-1">
        <Hero />
        {isLoading ? (
          <div className="py-24 text-center">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
        ) : (
          <ProductGrid products={formattedProducts} onAddToCart={handleAddToCart} />
        )}
      </main>
      <Footer />
    </div>
  );
}
