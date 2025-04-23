import { useState } from "react";
import { Coupon, Discount, Product } from "../../types.ts";
import { useProductManagement } from "../hooks/useProductManagement.ts";
import { ProductManager } from "../components/admin/ProductManager.tsx";
import { CouponManager } from "../components/admin/CouponManager.tsx";

interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProductManager
          products={products}
          onProductUpdate={onProductUpdate}
          onProductAdd={onProductAdd}
        />
        <CouponManager coupons={coupons} onCouponAdd={onCouponAdd} />
      </div>
    </div>
  );
};
