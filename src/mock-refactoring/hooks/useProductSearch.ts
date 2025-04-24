import { useState, useCallback, useMemo } from 'react';
import { Product } from '../../types';

export const useProductSearch = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState('');

  const updateSearchTerm = useCallback((term: string) => {
    setSearchTerm(term);
  }, []);

  const resetSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) {
      return products;
    }

    return products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  return {
    searchTerm,
    updateSearchTerm,
    resetSearch,
    filteredProducts,
  };
};