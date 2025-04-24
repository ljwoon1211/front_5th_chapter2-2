import { Coupon, Product } from "../../../types";
import { AdminPage } from "../../pages/AdminPage";
import { CartPage } from "../../pages/CartPage";

interface PageContainerProps {
  isAdmin: boolean;
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const PageContainer = ({
  isAdmin,
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: PageContainerProps) => {
  return (
    <main className="container mx-auto mt-6">
      {isAdmin ? (
        <AdminPage
          products={products}
          coupons={coupons}
          onProductUpdate={onProductUpdate}
          onProductAdd={onProductAdd}
          onCouponAdd={onCouponAdd}
        />
      ) : (
        <CartPage products={products} coupons={coupons} />
      )}
    </main>
  );
};
