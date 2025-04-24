import { useState, useEffect, useCallback } from 'react';
import { CartItem, Product } from "../../types";
import { cartAPI } from "../services/api";
import { useDiscountCalculator } from "./useDiscountCalculator";

export const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const { selectedCoupon, applyCoupon, calculateDiscountTotal } = useDiscountCalculator();

  // 초기 장바구니 로드
  useEffect(() => {
    const fetchCart = async () => {
      try {
        setLoading(true);
        const data = await cartAPI.getCart();
        setCart(data);
        setError(null);
      } catch (err) {
        console.error("Error loading cart:", err);
        // 오류 발생 시 빈 장바구니로 초기화
        setCart([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  const addToCart = useCallback(async (product: Product) => {
    // 재고 확인
    const cartItem = cart.find(item => item.product.id === product.id);
    const currentQuantity = cartItem ? cartItem.quantity : 0;

    if (currentQuantity >= product.stock) {
      return; // 재고 부족
    }

    try {
      setLoading(true);
      const updatedCart = await cartAPI.addToCart(product, 1);
      setCart(updatedCart);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add to cart'));
    } finally {
      setLoading(false);
    }
  }, [cart]);

  const removeFromCart = useCallback(async (productId: string) => {
    try {
      setLoading(true);
      const updatedCart = await cartAPI.removeFromCart(productId);
      setCart(updatedCart);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to remove from cart'));
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = useCallback(async (productId: string, newQuantity: number) => {
    try {
      setLoading(true);
      const updatedCart = await cartAPI.updateQuantity(productId, newQuantity);
      setCart(updatedCart);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update quantity'));
    } finally {
      setLoading(false);
    }
  }, []);

  const calculateTotal = useCallback(() => {
    return calculateDiscountTotal(cart);
  }, [cart, calculateDiscountTotal]);

  return {
    cart,
    loading,
    error,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};