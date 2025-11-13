import ProductCard from '../ProductCard';
import blackProduct from '@assets/generated_images/Black_boxer_briefs_product_cd1031ec.png';

export default function ProductCardExample() {
  return (
    <div className="p-8 bg-background">
      <div className="max-w-sm">
        <ProductCard
          id="1"
          name="Classic Black Boxer Brief"
          price={29.99}
          salePrice={24.99}
          image={blackProduct}
          colors={['#000000', '#DC2626', '#6B7280']}
          onAddToCart={() => console.log('Added to cart')}
        />
      </div>
    </div>
  );
}
