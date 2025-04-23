import { Coupon } from "../../../types";
import { FormField } from "../common/FormField";

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
      <FormField
        label="쿠폰 이름"
        type="text"
        value={coupon.name}
        onChange={(value) => onCouponChange({ ...coupon, name: value })}
        placeholder="쿠폰 이름"
      />

      <FormField
        label="쿠폰 코드"
        type="text"
        value={coupon.code}
        onChange={(value) => onCouponChange({ ...coupon, code: value })}
        placeholder="쿠폰 코드"
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

        <FormField
          type="number"
          value={coupon.discountValue}
          onChange={(value) =>
            onCouponChange({
              ...coupon,
              discountValue: parseInt(value),
            })
          }
          placeholder="할인 값"
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
