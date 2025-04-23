import { Coupon } from "../../../types";

interface CouponFormProps {
  coupon: Coupon;
  onCouponChange: (coupon: Coupon) => void;
  onAddCoupon: () => void;
}

export const CouponForm = ({
  coupon,
  onCouponChange,
  onAddCoupon,
}: CouponFormProps) => {
  return (
    <div className="space-y-2 mb-4">
      <input
        type="text"
        placeholder="쿠폰 이름"
        value={coupon.name}
        onChange={(e) => onCouponChange({ ...coupon, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="쿠폰 코드"
        value={coupon.code}
        onChange={(e) => onCouponChange({ ...coupon, code: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <div className="flex gap-2">
        <select
          value={coupon.discountType}
          onChange={(e) =>
            onCouponChange({
              ...coupon,
              discountType: e.target.value as "amount" | "percentage",
            })
          }
          className="w-full p-2 border rounded"
        >
          <option value="amount">금액(원)</option>
          <option value="percentage">할인율(%)</option>
        </select>
        <input
          type="number"
          placeholder="할인 값"
          value={coupon.discountValue}
          onChange={(e) =>
            onCouponChange({
              ...coupon,
              discountValue: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={onAddCoupon}
        className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
      >
        쿠폰 추가
      </button>
    </div>
  );
};
