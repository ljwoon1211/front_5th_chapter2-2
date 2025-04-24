import { Product } from "../../../types";
import { FormField } from "../common/FormField";

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
      <FormField
        label="상품명"
        id="productName"
        type="text"
        value={product.name}
        onChange={(value) => onProductChange({ ...product, name: value })}
        className="mb-2"
      />

      <FormField
        label="가격"
        id="productPrice"
        type="number"
        value={product.price}
        onChange={(value) =>
          onProductChange({ ...product, price: parseInt(value) })
        }
        className="mb-2"
      />

      <FormField
        label="재고"
        id="productStock"
        type="number"
        value={product.stock}
        onChange={(value) =>
          onProductChange({ ...product, stock: parseInt(value) })
        }
        className="mb-2"
      />
      <button
        onClick={onSubmit}
        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        {submitLabel}
      </button>
    </div>
  );
};
