import { Discount } from "../../../types";

interface DiscountListProps {
  discounts: Discount[];
  productId?: string;
  editable?: boolean;
  onRemoveDiscount?: (productId: string, index: number) => void;
}

export const DiscountList = ({
  discounts,
  productId = "",
  editable = false,
  onRemoveDiscount,
}: DiscountListProps) => {
  return (
    <ul
      className={`${
        editable ? "" : "list-disc list-inside"
      } text-sm text-gray-500 mb-2`}
    >
      {discounts.map((discount, index) => (
        <li
          key={index}
          className={editable ? "flex justify-between items-center mb-2" : ""}
        >
          <span>
            {discount.quantity}개 이상{editable ? " 구매 시" : ":"}{" "}
            {(discount.rate * 100).toFixed(0)}% 할인
          </span>

          {editable && onRemoveDiscount && (
            <button
              onClick={() => onRemoveDiscount(productId, index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          )}
        </li>
      ))}
    </ul>
  );
};
