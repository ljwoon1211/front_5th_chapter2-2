import { CartItem, Product } from "../../types";
import { getRemainingStock, removeCartItem, updateCartItemQuantity } from "../models/cart";
import { useLocalStorage } from "./useLocalStorage";
import { useDiscountCalculator } from "./useDiscountCalculator";


export const useCart = () => {
  const [cart, setCart] = useLocalStorage<CartItem[]>('cart', []);
  const { selectedCoupon, applyCoupon, calculateDiscountTotal } = useDiscountCalculator()

  const addToCart = (product: Product) => {
    const remainingStock = getRemainingStock(product, cart);
    if (remainingStock <= 0) return;

    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(item.quantity + 1, product.stock) }
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prevCart => removeCartItem(prevCart, productId));
  };

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCart((prevCart) =>
      updateCartItemQuantity(prevCart, productId, newQuantity)
    )
  };

  const calculateTotal = () => {
    return calculateDiscountTotal(cart);
  };


  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  };
};
