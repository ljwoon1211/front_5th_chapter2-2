import { Product } from "../../types.ts";
import { useLocalStorage } from "./useLocalStorage.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useLocalStorage<Product[]>('products', initialProducts);

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts =>
      prevProducts.map(product => product.id === updatedProduct.id ? updatedProduct : product)
    );
  };

  const addProduct = (newProduct: Product) => {
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };

  return {
    products,
    updateProduct,
    addProduct,
  };
};
