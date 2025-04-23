import { Discount } from "../../../types";
import { DiscountList } from "../common/DiscountList";

interface DiscountFormProps {
  discounts: Discount[];
  newDiscount: Discount;
  productId: string;
  onNewDiscountChange: (discount: Discount) => void;
  onAddDiscount: (productId: string) => void;
  onRemoveDiscount: (productId: string, index: number) => void;
}

export const DiscountForm = ({
  discounts,
  newDiscount,
  productId,
  onNewDiscountChange,
  onAddDiscount,
  onRemoveDiscount,
}: DiscountFormProps) => {
  return (
    <div>
      <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
      <DiscountList
        discounts={discounts}
        productId={productId}
        editable={true}
        onRemoveDiscount={onRemoveDiscount}
      />
      <div className="flex space-x-2">
        <input
          type="number"
          placeholder="수량"
          value={newDiscount.quantity}
          onChange={(e) =>
            onNewDiscountChange({
              ...newDiscount,
              quantity: parseInt(e.target.value),
            })
          }
          className="w-1/3 p-2 border rounded"
        />
        <input
          type="number"
          placeholder="할인율 (%)"
          value={newDiscount.rate * 100}
          onChange={(e) =>
            onNewDiscountChange({
              ...newDiscount,
              rate: parseInt(e.target.value) / 100,
            })
          }
          className="w-1/3 p-2 border rounded"
        />
        <button
          onClick={() => onAddDiscount(productId)}
          className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          할인 추가
        </button>
      </div>
    </div>
  );
};
