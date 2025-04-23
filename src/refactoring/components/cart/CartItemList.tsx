import { CartItem } from "../../../types";
import { CartItemRow } from "./CartItemRow";

interface CartItemListProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
}

export const CartItemList = ({
  cart,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartItemListProps) => {
  if (cart.length === 0) {
    return (
      <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500">장바구니가 비어있습니다.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {cart.map((item) => (
        <CartItemRow
          key={item.product.id}
          item={item}
          onUpdateQuantity={onUpdateQuantity}
          onRemoveFromCart={onRemoveFromCart}
        />
      ))}
    </div>
  );
};
