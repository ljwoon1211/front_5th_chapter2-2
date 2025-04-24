import { useState } from "react";
import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { useCoupons, useProducts } from "./hooks";
import { initialCoupons, initialProducts } from "./constants/initialData.ts";
import { PageContainer } from "./components/layout/PageContainer.tsx";
import { Navbar } from "./components/layout/Navbar.tsx";

const App = () => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  const [isAdmin, setIsAdmin] = useState(false);

  const togglePage = () => setIsAdmin(!isAdmin);

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
