import { useState, useEffect } from "react";
import { Coupon } from "../../types.ts";
import { couponAPI } from "../services/api.ts";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const [coupons, setCoupons] = useState<Coupon[]>(initialCoupons);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const data = await couponAPI.getAll();
        setCoupons(data);
        setError(null);
      } catch (err) {
        console.error("Error loading coupons:", err);
        // 오류 발생 시 초기 데이터 사용
        setCoupons(initialCoupons);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [initialCoupons]);

  const addCoupon = async (newCoupon: Coupon) => {
    try {
      setLoading(true);
      const created = await couponAPI.create(newCoupon);
      setCoupons(prevCoupons => [...prevCoupons, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add coupon'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    coupons,
    loading,
    error,
    addCoupon
  };
};