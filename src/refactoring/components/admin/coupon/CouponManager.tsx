import { useState } from "react";
import { CouponForm } from "./CouponForm";
import { CouponList } from "./CouponList";
import { Coupon } from "../../../../types";

interface CouponManagerProps {
  coupons: Coupon[];
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const CouponManager = ({ coupons, onCouponAdd }: CouponManagerProps) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
      <div className="bg-white p-4 rounded shadow">
        <CouponForm
          coupon={newCoupon}
          onCouponChange={setNewCoupon}
          onAddCoupon={handleAddCoupon}
        />
        <CouponList coupons={coupons} />
      </div>
    </div>
  );
};
