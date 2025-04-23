import { Discount, Product } from "../../types";

interface ProductEditProps {
  product: Product;
  editingProduct: Product;

  onProductNameUpdate: (productId: string, newName: string) => void;
  onPriceUpdate: (productId: string, newPrice: number) => void;
  onStockUpdate: (productId: string, newStock: number) => void;
  onRemoveDiscount: (productId: string, index: number) => void;
  onEditComplete: () => void;
}

export const ProductEdit = ({
  product,
  editingProduct,
  onProductNameUpdate,
  onPriceUpdate,
  onStockUpdate,
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

      {/* 할인 정보 수정 부분 */}
      <div>
        <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
        {editingProduct.discounts.map((discount, index) => (
          <div key={index} className="flex justify-between items-center mb-2">
            <span>
              {discount.quantity}개 이상 구매 시 {discount.rate * 100}% 할인
            </span>
            <button
              onClick={() => onRemoveDiscount(product.id, index)}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={onEditComplete}
        className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
      >
        수정 완료
      </button>
    </div>
  );
};

export default ProductEdit;
