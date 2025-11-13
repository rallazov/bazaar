import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import { Link } from "wouter";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  colors?: string[];
  onAddToCart?: () => void;
}

export default function ProductCard({
  id,
  name,
  price,
  salePrice,
  image,
  colors = [],
  onAddToCart,
}: ProductCardProps) {
  const discount = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0;

  return (
    <Card className="group overflow-hidden hover-elevate" data-testid={`card-product-${id}`}>
      <Link href={`/product/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          {salePrice && (
            <Badge
              className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground"
              data-testid={`badge-sale-${id}`}
            >
              -{discount}%
            </Badge>
          )}
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            data-testid={`img-product-${id}`}
          />
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <Link href={`/product/${id}`}>
          <h3
            className="font-semibold text-lg text-foreground hover:text-primary transition-colors"
            data-testid={`text-product-name-${id}`}
          >
            {name}
          </h3>
        </Link>

        <div className="flex items-center gap-2">
          {salePrice ? (
            <>
              <span
                className="text-lg font-bold text-primary"
                data-testid={`text-sale-price-${id}`}
              >
                ${salePrice.toFixed(2)}
              </span>
              <span
                className="text-sm text-muted-foreground line-through"
                data-testid={`text-original-price-${id}`}
              >
                ${price.toFixed(2)}
              </span>
            </>
          ) : (
            <span className="text-lg font-bold text-foreground" data-testid={`text-price-${id}`}>
              ${price.toFixed(2)}
            </span>
          )}
        </div>

        {colors.length > 0 && (
          <div className="flex gap-2">
            {colors.map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border-2 border-border"
                style={{ backgroundColor: color }}
                data-testid={`color-option-${id}-${idx}`}
              />
            ))}
          </div>
        )}

        <Button
          className="w-full gap-2"
          onClick={(e) => {
            e.preventDefault();
            onAddToCart?.();
          }}
          data-testid={`button-add-cart-${id}`}
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </Card>
  );
}
