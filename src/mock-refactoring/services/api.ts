import { Product, Coupon, CartItem } from '../../types';


/**
 * 장바구니 관련 API 함수
 */
export const cartAPI = {
  // 장바구니 조회
  getCart: async (): Promise<CartItem[]> => {
    const response = await fetch('/api/cart');
    if (!response.ok) {
      throw new Error('Failed to fetch cart');
    }
    return response.json();
  },

  // 장바구니에 상품 추가
  addToCart: async (product: Product, quantity: number = 1): Promise<CartItem[]> => {
    const response = await fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ product, quantity })
    });

    if (!response.ok) {
      throw new Error('Failed to add to cart');
    }

    return response.json();
  },

  // 장바구니 상품 수량 변경
  updateQuantity: async (productId: string, quantity: number): Promise<CartItem[]> => {
    const response = await fetch(`/api/cart/${productId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ quantity })
    });

    if (!response.ok) {
      throw new Error('Failed to update cart item');
    }

    return response.json();
  },

  // 장바구니에서 상품 제거
  removeFromCart: async (productId: string): Promise<CartItem[]> => {
    const response = await fetch(`/api/cart/${productId}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to remove from cart');
    }

    return response.json();
  },


};


/**
 * 상품 관련 API 함수
 */
export const productAPI = {
  // 모든 상품 가져오기
  getAll: async (): Promise<Product[]> => {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  // 새 상품 추가하기
  create: async (product: Omit<Product, 'id'>): Promise<Product> => {
    const response = await fetch('/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Failed to create product');
    }

    return response.json();
  },

  // 상품 업데이트
  update: async (product: Product): Promise<Product> => {
    const response = await fetch(`/api/products/${product.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    });

    if (!response.ok) {
      throw new Error('Failed to update product');
    }

    return response.json();
  },

  // 상품 삭제
  delete: async (id: string): Promise<void> => {
    const response = await fetch(`/api/products/${id}`, {
      method: 'DELETE'
    });

    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  }
};

/**
 * 쿠폰 관련 API 함수
 */
export const couponAPI = {
  // 모든 쿠폰 가져오기
  getAll: async (): Promise<Coupon[]> => {
    const response = await fetch('/api/coupons');
    if (!response.ok) {
      throw new Error('Failed to fetch coupons');
    }
    return response.json();
  },

  // 새 쿠폰 추가하기
  create: async (coupon: Coupon): Promise<Coupon> => {
    const response = await fetch('/api/coupons', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(coupon)
    });

    if (!response.ok) {
      throw new Error('Failed to create coupon');
    }

    return response.json();
  }
};