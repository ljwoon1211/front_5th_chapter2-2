import { Coupon } from "../../types.ts";
import { useLocalStorage } from "./useLocalStorage.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useLocalStorage<Coupon[]>('coupons', initialCoupons);

  const addCoupon = (newCoupon: Coupon) => {
    setCoupons(prevCoupons => [...prevCoupons, newCoupon]);
  }

  return { coupons, addCoupon };
};
