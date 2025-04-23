import { Coupon } from "../../types";

/**
 * 쿠폰 정보 표시 텍스트
 */
export const formatCouponInfo = (coupon: Coupon): string => {
  const discountText = coupon.discountType === "amount"
    ? `${coupon.discountValue}원`
    : `${coupon.discountValue}%`;

  return `${coupon.name} (${coupon.code}):${discountText} 할인`;
};

/**
 * 쿠폰 할인 타입에 따른 텍스트 생성
 */
export const getDiscountValueText = (coupon: Coupon): string => {
  return coupon.discountType === "amount"
    ? `${coupon.discountValue}원`
    : `${coupon.discountValue}%`;
};

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