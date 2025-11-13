import ProductCard from "./ProductCard";
import { Truck, RotateCcw, Award } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  colors?: string[];
}

interface ProductGridProps {
  products: Product[];
  onAddToCart: (productId: string) => void;
}

export default function ProductGrid({ products, onAddToCart }: ProductGridProps) {
  const benefits = [
    {
      icon: Truck,
      title: "Free Shipping",
      description: "On orders over $50",
    },
    {
      icon: RotateCcw,
      title: "30-Day Returns",
      description: "Easy returns & exchanges",
    },
    {
      icon: Award,
      title: "Premium Fabric",
      description: "Soft, breathable materials",
    },
  ];

  return (
    <div className="py-12 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4" data-testid="text-section-title">
            Premium Collection
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-section-subtitle">
            Discover our range of premium boxer briefs designed for ultimate comfort and style
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-16">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onAddToCart={() => onAddToCart(product.id)}
            />
          ))}
        </div>

        <div className="bg-muted rounded-md p-8 md:p-12">
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="text-center" data-testid={`benefit-${idx}`}>
                <benefit.icon className="h-12 w-12 mx-auto mb-4 text-primary" />
                <h3 className="font-semibold text-lg mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
