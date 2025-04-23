import { Product } from "../../../types";
import { useProductManagement } from "../../hooks";
import { ProductCard } from "./ProductCard";
import { ProductForm } from "./ProductForm";

interface ProductManagerProps {
  products: Product[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
}

export const ProductManager = ({
  products,
  onProductUpdate,
  onProductAdd,
}: ProductManagerProps) => {
  const {
    openProductIds,
    editingProduct,
    newDiscount,
    showNewProductForm,
    newProduct,
    setNewDiscount,
    setShowNewProductForm,
    setNewProduct,
    toggleProductAccordion,
    handleEditProduct,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleEditComplete,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
    handleAddNewProduct,
  } = useProductManagement(products, onProductUpdate, onProductAdd);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
      <button
        onClick={() => setShowNewProductForm(!showNewProductForm)}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
      >
        {showNewProductForm ? "취소" : "새 상품 추가"}
      </button>

      {showNewProductForm && (
        <ProductForm
          product={newProduct}
          onSubmit={handleAddNewProduct}
          onProductChange={setNewProduct}
          submitLabel="추가"
        />
      )}

      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            index={index}
            isOpen={openProductIds.has(product.id)}
            editingProduct={editingProduct}
            newDiscount={newDiscount}
            onToggle={toggleProductAccordion}
            onEditProduct={handleEditProduct}
            onNewDiscountChange={setNewDiscount}
            onProductNameUpdate={handleProductNameUpdate}
            onPriceUpdate={handlePriceUpdate}
            onStockUpdate={handleStockUpdate}
            onAddDiscount={handleAddDiscount}
            onRemoveDiscount={handleRemoveDiscount}
            onEditComplete={handleEditComplete}
          />
        ))}
      </div>
    </div>
  );
};
