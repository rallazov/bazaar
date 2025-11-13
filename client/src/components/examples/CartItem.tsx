import CartItem from '../CartItem';
import blackProduct from '@assets/generated_images/Black_boxer_briefs_product_cd1031ec.png';

export default function CartItemExample() {
  const item = {
    id: '1',
    name: 'Classic Black Boxer Brief',
    price: 24.99,
    size: 'L',
    color: 'Black',
    quantity: 2,
    image: blackProduct,
  };

  return (
    <div className="p-8 bg-background max-w-2xl">
      <CartItem
        item={item}
        onUpdateQuantity={(id, qty) => console.log('Update quantity:', id, qty)}
        onRemove={(id) => console.log('Remove item:', id)}
      />
    </div>
  );
}
