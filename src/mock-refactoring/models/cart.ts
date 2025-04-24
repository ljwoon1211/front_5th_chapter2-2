import { CartItem, Coupon, Product } from "../../types";
import { applyCouponDiscount } from "./coupon";

/**
 * 가격 * 수량
 */
export const calculateBaseItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  return price * quantity;
}

/**
 * (가격 * 수량) * 할인적용된 가격
 */
export const calculateItemTotal = (item: CartItem) => {
  const baseTotal = calculateBaseItemTotal(item)
  const discountRate = getMaxApplicableDiscount(item);
  const discountedTotal = baseTotal * (1 - discountRate);

  return discountedTotal;
};

/**
 * 수량에 따른 최대 할인율 계산
 */
export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const { quantity } = item;

  return discounts.reduce((maxDiscount, discount) => {
    return quantity >= discount.quantity && discount.rate > maxDiscount
      ? discount.rate
      : maxDiscount;
  }, 0);
};

/**
 * 장바구니 전체 금액을 계산하는 함수 (할인 전, 할인 후, 총 할인액)
 */
export const calculateCartTotal = (
  cart: CartItem[],
  selectedCoupon: Coupon | null
) => {
  let totalBeforeDiscount = 0;
  let totalAfterDiscount = 0;

  cart.forEach((item) => {
    const itemTotal = calculateBaseItemTotal(item);
    totalBeforeDiscount += itemTotal;

    const discountRate = getMaxApplicableDiscount(item);
    totalAfterDiscount += itemTotal * (1 - discountRate);
  });

  const finalAmount = applyCouponDiscount(totalAfterDiscount, selectedCoupon);
  const totalDiscount = totalBeforeDiscount - finalAmount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(finalAmount),
    totalDiscount: Math.round(totalDiscount),
  };
};

/**
 * 장바구니 수량 업데이트 함수
 */
export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number
): CartItem[] => {
  return cart.map((item) => {
    if (item.product.id === productId) {
      const maxQuantity = item.product.stock;
      const updatedQuantity = Math.max(
        0,
        Math.min(newQuantity, maxQuantity)
      );
      return updatedQuantity > 0
        ? { ...item, quantity: updatedQuantity }
        : null;
    }
    return item;
  })
    .filter((item): item is CartItem => item !== null)
};

/**
 * 남은 재고 함수
 */
export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

/**
 * 장바구니에서 상품 제거
 */
export const removeCartItem = (cart: CartItem[], productId: string): CartItem[] => {
  return cart.filter(item => item.product.id !== productId);
};

