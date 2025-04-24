import { Product } from "../../../types";
import { getMaxDiscountRate } from "../../models/product";
import { formatMaxDiscount, formatPrice } from "../../utils/formatUtils";
import { DiscountList } from "../common/DiscountList";

interface ProductItemProps {
  product: Product;
  remainingStock: number;
  onAddToCart: (product: Product) => void;
}

export const ProductItem = ({
  product,
  remainingStock,
  onAddToCart,
}: ProductItemProps) => {
  return (
    <div
      data-testid={`product-${product.id}`}
      className="bg-white p-3 rounded shadow"
    >
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{product.name}</span>
        <span className="text-gray-600">{formatPrice(product.price)}</span>
      </div>
      <div className="text-sm text-gray-500 mb-2">
        <span
          className={`font-medium ${
            remainingStock > 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          재고: {remainingStock}개
        </span>
        {product.discounts.length > 0 && (
          <span className="ml-2 font-medium text-blue-600">
            {formatMaxDiscount(getMaxDiscountRate(product.discounts))}
          </span>
        )}
      </div>

      <DiscountList discounts={product.discounts} />

      <button
        onClick={() => onAddToCart(product)}
        className={`w-full px-3 py-1 rounded ${
          remainingStock > 0
            ? "bg-blue-500 text-white hover:bg-blue-600"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
        disabled={remainingStock <= 0}
      >
        {remainingStock > 0 ? "장바구니에 추가" : "품절"}
      </button>
    </div>
  );
};
