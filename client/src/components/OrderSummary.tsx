import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
  subtotal: number;
  shipping?: number;
  tax?: number;
  discount?: number;
  onCheckout?: () => void;
  checkoutLabel?: string;
}

export default function OrderSummary({
  subtotal,
  shipping = 0,
  tax = 0,
  discount = 0,
  onCheckout,
  checkoutLabel = "Proceed to Checkout",
}: OrderSummaryProps) {
  const total = subtotal + shipping + tax - discount;
  const freeShippingThreshold = 50;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <Card className="p-6 space-y-4" data-testid="card-order-summary">
      <h2 className="text-xl font-bold" data-testid="text-order-summary-title">
        Order Summary
      </h2>

      {remainingForFreeShipping > 0 && (
        <div className="text-sm text-muted-foreground p-3 bg-muted rounded-md" data-testid="text-free-shipping-notice">
          Add ${remainingForFreeShipping.toFixed(2)} more for free shipping
        </div>
      )}

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal</span>
          <span className="font-medium" data-testid="text-subtotal">
            ${subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Shipping</span>
          <span className="font-medium" data-testid="text-shipping">
            {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
          </span>
        </div>

        {tax > 0 && (
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax</span>
            <span className="font-medium" data-testid="text-tax">
              ${tax.toFixed(2)}
            </span>
          </div>
        )}

        {discount > 0 && (
          <div className="flex justify-between text-sm text-primary">
            <span>Discount</span>
            <span className="font-medium" data-testid="text-discount">
              -${discount.toFixed(2)}
            </span>
          </div>
        )}
      </div>

      <Separator />

      <div className="flex justify-between text-lg font-bold">
        <span>Total</span>
        <span data-testid="text-total">${total.toFixed(2)}</span>
      </div>

      {onCheckout && (
        <Button
          className="w-full"
          size="lg"
          onClick={onCheckout}
          data-testid="button-checkout"
        >
          {checkoutLabel}
        </Button>
      )}
    </Card>
  );
}
