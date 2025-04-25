import { Product } from "../../../../types";
import { ProductDetail } from "./ProductDetail";
import { ProductEdit } from "./ProductEdit";

interface ProductCardProps {
  product: Product;
  index: number;
  isOpen: boolean;
  editingProduct: Product | null;
  newDiscount: { quantity: number; rate: number };
  onToggle: (productId: string) => void;
  onEditProduct: (product: Product) => void;
  onNewDiscountChange: (discount: { quantity: number; rate: number }) => void;
  onProductNameUpdate: (productId: string, newName: string) => void;
  onPriceUpdate: (productId: string, newPrice: number) => void;
  onStockUpdate: (productId: string, newStock: number) => void;
  onAddDiscount: (productId: string) => void;
  onRemoveDiscount: (productId: string, index: number) => void;
  onEditComplete: () => void;
}

export const ProductCard = ({
  product,
  index,
  isOpen,
  editingProduct,
  newDiscount,
  onToggle,
  onEditProduct,
  onNewDiscountChange,
  onProductNameUpdate,
  onPriceUpdate,
  onStockUpdate,
  onAddDiscount,
  onRemoveDiscount,
  onEditComplete,
}: ProductCardProps) => {
  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={() => onToggle(product.id)}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>

      {isOpen && (
        <div className="mt-2">
          {editingProduct && editingProduct.id === product.id ? (
            <ProductEdit
              product={product}
              editingProduct={editingProduct}
              newDiscount={newDiscount}
              onNewDiscountChange={onNewDiscountChange}
              onProductNameUpdate={onProductNameUpdate}
              onPriceUpdate={onPriceUpdate}
              onStockUpdate={onStockUpdate}
              onAddDiscount={onAddDiscount}
              onRemoveDiscount={onRemoveDiscount}
              onEditComplete={onEditComplete}
            />
          ) : (
            <ProductDetail product={product} onEditClick={onEditProduct} />
          )}
        </div>
      )}
    </div>
  );
};
