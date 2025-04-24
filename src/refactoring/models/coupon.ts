import { Coupon } from "../../types";

/**
 * 쿠폰 적용 후 금액 계산
 */
export const applyCouponDiscount = (totalAmount: number, coupon: Coupon | null): number => {
  if (!coupon) return totalAmount;

  if (coupon.discountType === "amount") {
    return Math.max(0, totalAmount - coupon.discountValue);
  } else {
    return totalAmount * (1 - coupon.discountValue / 100);
  }
};