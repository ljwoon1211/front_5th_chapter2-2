import { useCallback, useState } from 'react';
import { CartItem, Coupon } from '../../types';
import { calculateBaseItemTotal, calculateCartTotal, getMaxApplicableDiscount } from '../models/cart';

/**
 * 할인 계산 로직을 담당하는 커스텀 훅
 * 상품 할인율과 쿠폰 할인을 계산하여 최종 금액을 반환
 */
export const useDiscountCalculator = () => {
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);

  /**
   * 쿠폰 적용
   */
  const applyCoupon = useCallback((coupon: Coupon) => {
    setSelectedCoupon(coupon);
  }, []);

  /**
   * 장바구니의 최종 금액을 계산
   */
  const calculateDiscountTotal = useCallback((cart: CartItem[]) => {
    return calculateCartTotal(cart, selectedCoupon);
  }, [selectedCoupon]);

  /**
   * 적용된 상품 할인율을 반환
   */
  const getAppliedProductDiscount = (item: CartItem): number => {
    return getMaxApplicableDiscount(item);
  };

  /**
   * 상품 개별 할인 금액 계산
   */
  const calculateItemDiscountAmount = (item: CartItem): number => {
    const baseTotal = calculateBaseItemTotal(item);
    const discountRate = getAppliedProductDiscount(item);
    return baseTotal * discountRate;
  };


  return {
    applyCoupon,
    calculateDiscountTotal,
    getAppliedProductDiscount,
    calculateItemDiscountAmount,
    selectedCoupon
  };
};