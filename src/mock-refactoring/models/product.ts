/**
 * 최대 할인율
 */
export const getMaxDiscountRate = (discounts: { quantity: number; rate: number }[]) => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

