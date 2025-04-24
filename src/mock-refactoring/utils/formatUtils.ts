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
 * 할인율을 퍼센트 형식으로 포맷팅 (예: 0.1 -> "10%")
 */
export const formatDiscountRate = (rate: number): string => {
  return `${(rate * 100).toFixed(0)}%`;
};

/**
 * 적용된 할인율 메시지 (예: "(10% 할인 적용)")
 */
export const formatAppliedDiscount = (rate: number): string => {
  return `(${formatDiscountRate(rate)} 할인 적용)`;
};

/**
 * 최대 할인율 메시지 (예: "최대 10% 할인")
 */
export const formatMaxDiscount = (rate: number): string => {
  return `최대 ${formatDiscountRate(rate)} 할인`;
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

