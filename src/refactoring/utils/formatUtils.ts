import { Coupon } from "../../types";

/**
 * 숫자를 통화 형식의 문자열로 변환 (예: 10000 -> "10,000")
 */
export const formatCurrency = (value: number): string => {
  return value.toLocaleString();
};

/**
 * 숫자를 통화 형식 + 화폐 기호로 변환 (예: 10000 -> "10,000원")
 */
export const formatPrice = (price: number, currency: string = "원"): string => {
  return `${formatCurrency(price)}${currency}`;
};


/**
 * 쿠폰 정보 표시 텍스트
 */
export const formatCouponInfo = (coupon: Coupon): string => {
  const discountText = formatDiscountValue(coupon);
  return `${coupon.name} (${coupon.code}):${discountText} 할인`;
};

/**
 * 쿠폰 할인 값 텍스트 생성
 */
export const formatDiscountValue = (coupon: Coupon): string => {
  return coupon.discountType === "amount"
    ? formatCurrency(coupon.discountValue)
    : `${coupon.discountValue}%`;
};