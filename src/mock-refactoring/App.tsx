import { useState } from "react";
import { useCoupons, useProducts } from "./hooks/index.ts";
import { initialCoupons, initialProducts } from "./constants/initialData.ts";
import { PageContainer } from "./components/layout/PageContainer.tsx";
import { Navbar } from "./components/layout/Navbar.tsx";

const App = () => {
  const {
    products,
    loading: productsLoading,
    error: productsError,
    updateProduct,
    addProduct,
  } = useProducts(initialProducts);

  const {
    coupons,
    loading: couponsLoading,
    error: couponsError,
    addCoupon,
  } = useCoupons(initialCoupons);

  const [isAdmin, setIsAdmin] = useState(false);

  const togglePage = () => setIsAdmin(!isAdmin);

  if (productsLoading || couponsLoading) {
    return <div>loading...</div>;
  }

  if (productsError || couponsError) {
    return <div>{productsError?.message || couponsError?.message}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar isAdmin={isAdmin} onTogglePage={togglePage} />
      <PageContainer
        isAdmin={isAdmin}
        products={products}
        coupons={coupons}
        onProductUpdate={updateProduct}
        onProductAdd={addProduct}
        onCouponAdd={addCoupon}
      />
    </div>
  );
};

export default App;
