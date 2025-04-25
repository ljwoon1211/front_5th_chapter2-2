import { Coupon } from "../../../../types";
import { formatCouponInfo } from "../../../utils/formatUtils";

interface CouponListProps {
  coupons: Coupon[];
}

export const CouponList = ({ coupons }: CouponListProps) => {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
      <div className="space-y-2">
        {coupons.map((coupon, index) => (
          <div
            key={index}
            data-testid={`coupon-${index + 1}`}
            className="bg-gray-100 p-2 rounded"
          >
            {formatCouponInfo(coupon)}
          </div>
        ))}
      </div>
    </div>
  );
};
