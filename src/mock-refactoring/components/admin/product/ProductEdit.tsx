import { Product } from "../../../../types";
import { DiscountForm } from "./discount/DiscountForm";

interface ProductEditProps {
  product: Product;
  editingProduct: Product;
  newDiscount: { quantity: number; rate: number }; // 추가
  onNewDiscountChange: (discount: { quantity: number; rate: number }) => void; // 추가
  onProductNameUpdate: (productId: string, newName: string) => void;
  onPriceUpdate: (productId: string, newPrice: number) => void;
  onStockUpdate: (productId: string, newStock: number) => void;
  onAddDiscount: (productId: string) => void; // 이 부분도 누락됨
  onRemoveDiscount: (productId: string, index: number) => void;
  onEditComplete: () => void;
}

export const ProductEdit = ({
  product,
  editingProduct,
  newDiscount,
  onNewDiscountChange,
  onProductNameUpdate,
  onPriceUpdate,
  onStockUpdate,
  onAddDiscount,
  onRemoveDiscount,
  onEditComplete,
}: ProductEditProps) => {
  return (
    <div>
      <div className="mb-4">
        <label className="block mb-1">상품명: </label>
        <input
          type="text"
          value={editingProduct.name}
          onChange={(e) => onProductNameUpdate(product.id, e.target.value)}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">가격: </label>
        <input
          type="number"
          value={editingProduct.price}
          onChange={(e) => onPriceUpdate(product.id, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">재고: </label>
        <input
          type="number"
          value={editingProduct.stock}
          onChange={(e) => onStockUpdate(product.id, parseInt(e.target.value))}
          className="w-full p-2 border rounded"
        />
      </div>

      <DiscountForm
        discounts={editingProduct.discounts}
        newDiscount={newDiscount}
        productId={product.id}
        onNewDiscountChange={onNewDiscountChange}
        onAddDiscount={onAddDiscount}
        onRemoveDiscount={onRemoveDiscount}
      />

      <button
        onClick={onEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};
