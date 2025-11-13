import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CartItem, { CartItemData } from "@/components/CartItem";
import OrderSummary from "@/components/OrderSummary";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface CartItemWithProduct extends CartItemData {
  product: {
    id: string;
    name: string;
    price: string;
    salePrice: string | null;
    imageUrl: string;
  };
}

export default function Cart() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();

  const { data: cartItemsData = [], isLoading } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
  });

  const updateQuantityMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: string; quantity: number }) => {
      return apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
  });

  const removeItemMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/cart/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "Item has been removed from your cart.",
      });
    },
  });

  const handleUpdateQuantity = (id: string, quantity: number) => {
    updateQuantityMutation.mutate({ id, quantity });
  };

  const handleRemove = (id: string) => {
    removeItemMutation.mutate(id);
  };

  const cartItems: CartItemData[] = cartItemsData.map((item) => ({
    id: item.id,
    name: item.product.name,
    price: item.product.salePrice
      ? parseFloat(item.product.salePrice)
      : parseFloat(item.product.price),
    size: item.size,
    color: item.color,
    quantity: item.quantity,
    image: item.product.imageUrl,
  }));

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

          {isLoading ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground">Loading cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
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
                    onCheckout={() => setLocation("/checkout")}
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
