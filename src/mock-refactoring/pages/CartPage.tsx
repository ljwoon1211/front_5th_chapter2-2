import { Coupon, Product } from "../../types.ts";
import { CartItemList } from "../components/cart/CartItemList.tsx";
import { CartSummary } from "../components/cart/CartSummary.tsx";
import { CouponSelector } from "../components/cart/CouponSelector.tsx";
import { ProductSearch } from "../components/common/ProductSearch.tsx";

import { ProductList } from "../components/product/ProductList.tsx";
import { useCart, useProductSearch } from "../hooks/index.ts";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    selectedCoupon,
  } = useCart();

  const { searchTerm, updateSearchTerm, resetSearch, filteredProducts } =
    useProductSearch(products);

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
    calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">장바구니</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 목록</h2>

          <ProductSearch
            searchTerm={searchTerm}
            onSearchChange={updateSearchTerm}
            onResetSearch={resetSearch}
          />

          <ProductList
            products={filteredProducts}
            cart={cart}
            onAddToCart={addToCart}
          />
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">장바구니 내역</h2>
          <CartItemList
            cart={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveFromCart={removeFromCart}
          />

          <CouponSelector
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            onApplyCoupon={applyCoupon}
          />

          <CartSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalAfterDiscount={totalAfterDiscount}
            totalDiscount={totalDiscount}
          />
        </div>
      </div>
    </div>
  );
};
