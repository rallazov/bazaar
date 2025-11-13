import OrderSummary from '../OrderSummary';

export default function OrderSummaryExample() {
  return (
    <div className="p-8 bg-background max-w-md">
      <OrderSummary
        subtotal={49.98}
        shipping={0}
        tax={4.50}
        discount={5.00}
        onCheckout={() => console.log('Proceed to checkout')}
      />
    </div>
  );
}
