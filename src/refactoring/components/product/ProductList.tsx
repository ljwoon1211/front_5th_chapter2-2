import { CartItem, Product } from "../../../types";
import { getRemainingStock } from "../../models/cart";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
  products: Product[];
  cart: CartItem[];
  onAddToCart: (product: Product) => void;
}

export const ProductList = ({
  products,
  cart,
  onAddToCart,
}: ProductListProps) => {
  return (
    <div className="space-y-2">
      {products.map((product) => {
        const remainingStock = getRemainingStock(product, cart);
        return (
          <ProductItem
            key={product.id}
            product={product}
            remainingStock={remainingStock}
            onAddToCart={onAddToCart}
          />
        );
      })}
    </div>
  );
};
