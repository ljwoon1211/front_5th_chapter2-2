import { CartItem, Coupon, Product } from "../../types";

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const { quantity } = item;
  return price * quantity;
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
    const itemTotal = calculateItemTotal(item);
    totalBeforeDiscount += itemTotal;

    const discountRate = getMaxApplicableDiscount(item);
    totalAfterDiscount += itemTotal * (1 - discountRate);
  });

  // 쿠폰 적용
  if (selectedCoupon) {
    if (selectedCoupon.discountType === "amount") {
      totalAfterDiscount = Math.max(
        0,
        totalAfterDiscount - selectedCoupon.discountValue
      );
    } else {
      totalAfterDiscount *= 1 - selectedCoupon.discountValue / 100;
    }
  }

  const totalDiscount = totalBeforeDiscount - totalAfterDiscount;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(totalAfterDiscount),
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
  return cart.map(item =>
    item.product.id === productId
      ? { ...item, quantity: newQuantity }
      : item
  );
};


export const getRemainingStock = (product: Product, cart: CartItem[]) => {
  const cartItem = cart.find((item) => item.product.id === product.id);
  return product.stock - (cartItem?.quantity || 0);
};

export const getMaxDiscountRate = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};