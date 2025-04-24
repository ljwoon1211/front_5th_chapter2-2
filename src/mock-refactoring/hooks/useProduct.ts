import { useEffect, useState } from "react";
import { Product } from "../../types.ts";
import { productAPI } from "../services/api.ts";

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  // 초기 데이터 로드
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await productAPI.getAll();
        setProducts(data);
        setError(null);
      } catch (err) {
        console.error("Error loading products:", err);
        // 오류 발생 시 초기 데이터 사용
        setProducts(initialProducts);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [initialProducts]);

  const updateProduct = async (updatedProduct: Product) => {
    try {
      setLoading(true);
      const updated = await productAPI.update(updatedProduct);
      setProducts(prevProducts =>
        prevProducts.map(product => product.id === updated.id ? updated : product)
      );
      return updated;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to update product'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addProduct = async (newProduct: Omit<Product, 'id'>) => {
    try {
      setLoading(true);
      const created = await productAPI.create(newProduct);
      setProducts(prevProducts => [...prevProducts, created]);
      return created;
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add product'));
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    products,
    loading,
    error,
    updateProduct,
    addProduct,
  };
};