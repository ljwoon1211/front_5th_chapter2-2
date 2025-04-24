import { http, HttpResponse, delay } from 'msw';
import { Product, Coupon, CartItem } from '../../types';
import { initialProducts, initialCoupons } from '../constants/initialData';

// In-memory 데이터 저장소
let products: Product[] = [...initialProducts];
let coupons: Coupon[] = [...initialCoupons];
let cart: CartItem[] = [];

// 핸들러 정의
export const handlers = [
  // 상품 관련 API
  http.get('/api/products', async () => {
    await delay(300);
    return HttpResponse.json(products);
  }),

  http.post('/api/products', async ({ request }) => {
    const newProduct = await request.json() as Product;

    // ID가 없다면 생성
    if (!newProduct.id) {
      newProduct.id = Date.now().toString();
    }

    products = [...products, newProduct];
    await delay(300);
    return HttpResponse.json(newProduct, { status: 201 });
  }),

  http.put('/api/products/:id', async ({ request, params }) => {
    const updatedProduct = await request.json() as Product;
    const { id } = params;

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    products = products.map(product =>
      product.id === id ? updatedProduct : product
    );

    await delay(300);
    return HttpResponse.json(updatedProduct);
  }),

  http.delete('/api/products/:id', async ({ params }) => {
    const { id } = params;

    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return new HttpResponse(null, { status: 404 });
    }

    products = products.filter(product => product.id !== id);

    await delay(300);
    return new HttpResponse(null, { status: 204 });
  }),

  // 쿠폰 관련 API
  http.get('/api/coupons', async () => {
    await delay(300);
    return HttpResponse.json(coupons);
  }),

  http.post('/api/coupons', async ({ request }) => {
    const newCoupon = await request.json() as Coupon;
    coupons = [...coupons, newCoupon];

    await delay(300);
    return HttpResponse.json(newCoupon, { status: 201 });
  }),

  // 장바구니 관련 API
  http.get('/api/cart', async () => {
    await delay(300);
    return HttpResponse.json(cart);
  }),

  http.post('/api/cart', async ({ request }) => {
    try {
      console.log('MSW: Received POST /api/cart request');
      const item = await request.json() as { product: Product, quantity: number };
      console.log('MSW: Request body:', item);

      // 이미 카트에 있는 아이템인지 확인
      const existingItemIndex = cart.findIndex(cartItem =>
        cartItem.product.id === item.product.id
      );

      if (existingItemIndex !== -1) {
        // 기존 아이템이 있는 경우 수량 증가
        console.log('MSW: Updating existing cart item');
        cart[existingItemIndex].quantity += item.quantity;
      } else {
        // 새 아이템 추가
        console.log('MSW: Adding new cart item');
        cart = [...cart, { product: item.product, quantity: item.quantity }];
      }

      console.log('MSW: Current cart:', cart);
      await delay(300);
      return HttpResponse.json(cart, { status: 201 });
    } catch (error) {
      console.error('MSW: Error handling POST /api/cart', error);
      return new HttpResponse(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }),

  http.put('/api/cart/:productId', async ({ request, params }) => {
    try {
      const { productId } = params;
      const { quantity } = await request.json() as { quantity: number };

      console.log(`MSW: Updating cart item quantity for product ${productId} to ${quantity}`);

      if (quantity <= 0) {
        // 수량이 0 이하면 아이템 제거
        cart = cart.filter(item => item.product.id !== productId);
      } else {
        // 수량 업데이트
        cart = cart.map(item =>
          item.product.id === productId
            ? { ...item, quantity }
            : item
        );
      }

      await delay(300);
      return HttpResponse.json(cart);
    } catch (error) {
      console.error('MSW: Error handling PUT /api/cart', error);
      return new HttpResponse(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }),

  http.delete('/api/cart/:productId', async ({ params }) => {
    try {
      const { productId } = params;

      console.log(`MSW: Removing cart item with product ID ${productId}`);

      cart = cart.filter(item => item.product.id !== productId);

      await delay(300);
      return HttpResponse.json(cart);
    } catch (error) {
      console.error('MSW: Error handling DELETE /api/cart/:productId', error);
      return new HttpResponse(JSON.stringify({ error: String(error) }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }
  }),

];