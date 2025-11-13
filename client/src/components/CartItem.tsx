import { Button } from "@/components/ui/button";
import { Minus, Plus, X } from "lucide-react";

export interface CartItemData {
  id: string;
  name: string;
  price: number;
  size: string;
  color: string;
  quantity: number;
  image: string;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 border rounded-md" data-testid={`cart-item-${item.id}`}>
      <img
        src={item.image}
        alt={item.name}
        className="w-24 h-24 object-cover rounded-md bg-muted"
        data-testid={`img-cart-item-${item.id}`}
      />

      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="font-semibold" data-testid={`text-cart-item-name-${item.id}`}>
              {item.name}
            </h3>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 -mr-2 -mt-2"
              onClick={() => onRemove(item.id)}
              data-testid={`button-remove-${item.id}`}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground" data-testid={`text-cart-item-details-${item.id}`}>
            Size: {item.size} • Color: {item.color}
          </p>
        </div>

        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
              disabled={item.quantity <= 1}
              data-testid={`button-decrease-${item.id}`}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium" data-testid={`text-quantity-${item.id}`}>
              {item.quantity}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              data-testid={`button-increase-${item.id}`}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <span className="font-bold" data-testid={`text-cart-item-total-${item.id}`}>
            ${(item.price * item.quantity).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}
