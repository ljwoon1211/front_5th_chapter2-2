import { CartItem } from "../../../types";
import { useDiscountCalculator } from "../../hooks";

interface CartItemRowProps {
  item: CartItem;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
}

export const CartItemRow = ({
  item,
  onUpdateQuantity,
  onRemoveFromCart,
}: CartItemRowProps) => {
  const { getAppliedProductDiscount } = useDiscountCalculator();

  return (
    <div className="flex justify-between items-center bg-white p-3 rounded shadow">
      <div>
        <span className="font-semibold">{item.product.name}</span>
        <br />
        <span className="text-sm text-gray-600">
          {item.product.price}원 x {item.quantity}
          {getAppliedProductDiscount(item) > 0 && (
            <span className="text-green-600 ml-1">
              ({(getAppliedProductDiscount(item) * 100).toFixed(0)}% 할인 적용)
            </span>
          )}
        </span>
      </div>
      <div className="flex items-center">
        <QuantityControls
          productId={item.product.id}
          quantity={item.quantity}
          onUpdateQuantity={onUpdateQuantity}
        />
        <button
          onClick={() => onRemoveFromCart(item.product.id)}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-1"
        >
          삭제
        </button>
      </div>
    </div>
  );
};

interface QuantityControlsProps {
  productId: string;
  quantity: number;
  onUpdateQuantity: (productId: string, newQuantity: number) => void;
}

export const QuantityControls = ({
  productId,
  quantity,
  onUpdateQuantity,
}: QuantityControlsProps) => {
  return (
    <>
      <button
        onClick={() => onUpdateQuantity(productId, quantity - 1)}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      >
        -
      </button>
      <button
        onClick={() => onUpdateQuantity(productId, quantity + 1)}
        className="bg-gray-300 text-gray-800 px-2 py-1 rounded mr-1 hover:bg-gray-400"
      >
        +
      </button>
    </>
  );
};
