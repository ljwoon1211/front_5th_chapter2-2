import { Product } from "../../types";

interface ProductFormProps {
  product: Omit<Product, "id"> | Product;
  onSubmit: () => void;
  onProductChange: (product: any) => void;
  submitLabel: string;
}

export const ProductForm = ({
  product,
  onSubmit,
  onProductChange,
  submitLabel,
}: ProductFormProps) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-4">
      <h3 className="text-xl font-semibold mb-2">
        {submitLabel === "추가" ? "새 상품 추가" : "상품 수정"}
      </h3>
      <div className="mb-2">
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700"
        >
          상품명
        </label>
        <input
          id="productName"
          type="text"
          value={product.name}
          onChange={(e) =>
            onProductChange({ ...product, name: e.target.value })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productPrice"
          className="block text-sm font-medium text-gray-700"
        >
          가격
        </label>
        <input
          id="productPrice"
          type="number"
          value={product.price}
          onChange={(e) =>
            onProductChange({
              ...product,
              price: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <div className="mb-2">
        <label
          htmlFor="productStock"
          className="block text-sm font-medium text-gray-700"
        >
          재고
        </label>
        <input
          id="productStock"
          type="number"
          value={product.stock}
          onChange={(e) =>
            onProductChange({
              ...product,
              stock: parseInt(e.target.value),
            })
          }
          className="w-full p-2 border rounded"
        />
      </div>
      <button
        onClick={onSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {submitLabel}
      </button>
    </div>
  );
};
