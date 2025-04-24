import { useState } from "react";
import { describe, expect, test, vi } from "vitest";
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  within,
} from "@testing-library/react";
import { CartPage } from "../../refactoring/pages/CartPage";
import { AdminPage } from "../../refactoring/pages/AdminPage";
import { CartItem, Coupon, Discount, Product } from "../../types";
import {
  formatCouponInfo,
  formatPrice,
} from "../../refactoring/utils/formatUtils";
import { applyCouponDiscount } from "../../refactoring/models/coupon";
import { getMaxDiscountRate } from "../../refactoring/models/product";
import { ProductSearch } from "../../refactoring/components/common/ProductSearch";
import { FormField } from "../../refactoring/components/common/FormField";
import { DiscountList } from "../../refactoring/components/common/DiscountList";
import {
  useDiscountCalculator,
  useProductSearch,
} from "../../refactoring/hooks";

const mockProducts: Product[] = [
  {
    id: "p1",
    name: "상품1",
    price: 10000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.1 }],
  },
  {
    id: "p2",
    name: "상품2",
    price: 20000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.15 }],
  },
  {
    id: "p3",
    name: "상품3",
    price: 30000,
    stock: 20,
    discounts: [{ quantity: 10, rate: 0.2 }],
  },
];
const mockCoupons: Coupon[] = [
  {
    name: "5000원 할인 쿠폰",
    code: "AMOUNT5000",
    discountType: "amount",
    discountValue: 5000,
  },
  {
    name: "10% 할인 쿠폰",
    code: "PERCENT10",
    discountType: "percentage",
    discountValue: 10,
  },
];

const TestAdminPage = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [coupons, setCoupons] = useState<Coupon[]>(mockCoupons);

  const handleProductUpdate = (updatedProduct: Product) => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
  };

  const handleProductAdd = (newProduct: Product) => {
    setProducts((prevProducts) => [...prevProducts, newProduct]);
  };

  const handleCouponAdd = (newCoupon: Coupon) => {
    setCoupons((prevCoupons) => [...prevCoupons, newCoupon]);
  };

  return (
    <AdminPage
      products={products}
      coupons={coupons}
      onProductUpdate={handleProductUpdate}
      onProductAdd={handleProductAdd}
      onCouponAdd={handleCouponAdd}
    />
  );
};

describe("advanced > ", () => {
  describe("시나리오 테스트 > ", () => {
    test("장바구니 페이지 테스트 > ", async () => {
      render(<CartPage products={mockProducts} coupons={mockCoupons} />);
      const product1 = screen.getByTestId("product-p1");
      const product2 = screen.getByTestId("product-p2");
      const product3 = screen.getByTestId("product-p3");
      const addToCartButtonsAtProduct1 =
        within(product1).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct2 =
        within(product2).getByText("장바구니에 추가");
      const addToCartButtonsAtProduct3 =
        within(product3).getByText("장바구니에 추가");

      // 1. 상품 정보 표시
      expect(product1).toHaveTextContent("상품1");
      expect(product1).toHaveTextContent("10,000원");
      expect(product1).toHaveTextContent("재고: 20개");
      expect(product2).toHaveTextContent("상품2");
      expect(product2).toHaveTextContent("20,000원");
      expect(product2).toHaveTextContent("재고: 20개");
      expect(product3).toHaveTextContent("상품3");
      expect(product3).toHaveTextContent("30,000원");
      expect(product3).toHaveTextContent("재고: 20개");

      // 2. 할인 정보 표시
      expect(screen.getByText("10개 이상: 10% 할인")).toBeInTheDocument();

      // 3. 상품1 장바구니에 상품 추가
      fireEvent.click(addToCartButtonsAtProduct1); // 상품1 추가

      // 4. 할인율 계산
      expect(screen.getByText("상품 금액: 10,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 0원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 10,000원")).toBeInTheDocument();

      // 5. 상품 품절 상태로 만들기
      for (let i = 0; i < 19; i++) {
        fireEvent.click(addToCartButtonsAtProduct1);
      }

      // 6. 품절일 때 상품 추가 안 되는지 확인하기
      expect(product1).toHaveTextContent("재고: 0개");
      fireEvent.click(addToCartButtonsAtProduct1);
      expect(product1).toHaveTextContent("재고: 0개");

      // 7. 할인율 계산
      expect(screen.getByText("상품 금액: 200,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 20,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 180,000원")).toBeInTheDocument();

      // 8. 상품을 각각 10개씩 추가하기
      fireEvent.click(addToCartButtonsAtProduct2); // 상품2 추가
      fireEvent.click(addToCartButtonsAtProduct3); // 상품3 추가

      const increaseButtons = screen.getAllByText("+");
      for (let i = 0; i < 9; i++) {
        fireEvent.click(increaseButtons[1]); // 상품2
        fireEvent.click(increaseButtons[2]); // 상품3
      }

      // 9. 할인율 계산
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 110,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 590,000원")).toBeInTheDocument();

      // 10. 쿠폰 적용하기
      const couponSelect = screen.getByRole("combobox");
      fireEvent.change(couponSelect, { target: { value: "1" } }); // 10% 할인 쿠폰 선택

      // 11. 할인율 계산
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 169,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 531,000원")).toBeInTheDocument();

      // 12. 다른 할인 쿠폰 적용하기
      fireEvent.change(couponSelect, { target: { value: "0" } }); // 5000원 할인 쿠폰
      expect(screen.getByText("상품 금액: 700,000원")).toBeInTheDocument();
      expect(screen.getByText("할인 금액: 115,000원")).toBeInTheDocument();
      expect(screen.getByText("최종 결제 금액: 585,000원")).toBeInTheDocument();
    });

    test("관리자 페이지 테스트 > ", async () => {
      render(<TestAdminPage />);

      const $product1 = screen.getByTestId("product-1");

      // 1. 새로운 상품 추가
      fireEvent.click(screen.getByText("새 상품 추가"));

      fireEvent.change(screen.getByLabelText("상품명"), {
        target: { value: "상품4" },
      });
      fireEvent.change(screen.getByLabelText("가격"), {
        target: { value: "15000" },
      });
      fireEvent.change(screen.getByLabelText("재고"), {
        target: { value: "30" },
      });

      fireEvent.click(screen.getByText("추가"));

      const $product4 = screen.getByTestId("product-4");

      expect($product4).toHaveTextContent("상품4");
      expect($product4).toHaveTextContent("15000원");
      expect($product4).toHaveTextContent("재고: 30");

      // 2. 상품 선택 및 수정
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("toggle-button"));
      fireEvent.click(within($product1).getByTestId("modify-button"));

      act(() => {
        fireEvent.change(within($product1).getByDisplayValue("20"), {
          target: { value: "25" },
        });
        fireEvent.change(within($product1).getByDisplayValue("10000"), {
          target: { value: "12000" },
        });
        fireEvent.change(within($product1).getByDisplayValue("상품1"), {
          target: { value: "수정된 상품1" },
        });
      });

      fireEvent.click(within($product1).getByText("수정 완료"));

      expect($product1).toHaveTextContent("수정된 상품1");
      expect($product1).toHaveTextContent("12000원");
      expect($product1).toHaveTextContent("재고: 25");

      // 3. 상품 할인율 추가 및 삭제
      fireEvent.click($product1);
      fireEvent.click(within($product1).getByTestId("modify-button"));

      // 할인 추가
      act(() => {
        fireEvent.change(screen.getByPlaceholderText("수량"), {
          target: { value: "5" },
        });
        fireEvent.change(screen.getByPlaceholderText("할인율 (%)"), {
          target: { value: "5" },
        });
      });
      fireEvent.click(screen.getByText("할인 추가"));

      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).toBeInTheDocument();

      // 할인 삭제
      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(
        screen.queryByText("10개 이상 구매 시 10% 할인")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).toBeInTheDocument();

      fireEvent.click(screen.getAllByText("삭제")[0]);
      expect(
        screen.queryByText("10개 이상 구매 시 10% 할인")
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText("5개 이상 구매 시 5% 할인")
      ).not.toBeInTheDocument();

      // 4. 쿠폰 추가
      fireEvent.change(screen.getByPlaceholderText("쿠폰 이름"), {
        target: { value: "새 쿠폰" },
      });
      fireEvent.change(screen.getByPlaceholderText("쿠폰 코드"), {
        target: { value: "NEW10" },
      });
      fireEvent.change(screen.getByRole("combobox"), {
        target: { value: "percentage" },
      });
      fireEvent.change(screen.getByPlaceholderText("할인 값"), {
        target: { value: "10" },
      });

      fireEvent.click(screen.getByText("쿠폰 추가"));

      const $newCoupon = screen.getByTestId("coupon-3");

      expect($newCoupon).toHaveTextContent("새 쿠폰 (NEW10):10% 할인");
    });
  });

  describe("자유롭게 작성해보세요.", () => {
    test("새로운 유틸 함수를 만든 후에 테스트 코드를 작성해서 실행해보세요", () => {
      expect(true).toBe(true);
    });
    test("formatUtils - formatPrice 함수가 올바르게 가격을 포맷팅해야 함", () => {
      // src/refactoring/utils/formatUtils.ts의 formatPrice 함수 테스트

      expect(formatPrice(10000)).toBe("10,000원");
      expect(formatPrice(0)).toBe("0원");
      expect(formatPrice(1000000)).toBe("1,000,000원");
      expect(formatPrice(10000, "$")).toBe("10,000$"); // 다른 통화 단위 테스트
    });

    test("formatUtils - formatCouponInfo 함수가 쿠폰 정보를 올바르게 표시해야 함", () => {
      // src/refactoring/utils/formatUtils.ts의 formatCouponInfo 함수 테스트

      const amountCoupon: Coupon = {
        name: "금액 쿠폰",
        code: "AMOUNT5000",
        discountType: "amount",
        discountValue: 5000,
      };

      const percentCoupon: Coupon = {
        name: "퍼센트 쿠폰",
        code: "PERCENT10",
        discountType: "percentage",
        discountValue: 10,
      };

      expect(formatCouponInfo(amountCoupon)).toBe(
        "금액 쿠폰 (AMOUNT5000):5,000 할인"
      );
      expect(formatCouponInfo(percentCoupon)).toBe(
        "퍼센트 쿠폰 (PERCENT10):10% 할인"
      );
    });

    test("coupon 모델 - applyCouponDiscount 함수가 쿠폰 할인을 올바르게 적용해야 함", () => {
      // src/refactoring/models/coupon.ts의 applyCouponDiscount 함수 테스트

      const amountCoupon: Coupon = {
        name: "금액 쿠폰",
        code: "AMOUNT5000",
        discountType: "amount",
        discountValue: 5000,
      };

      const percentCoupon: Coupon = {
        name: "퍼센트 쿠폰",
        code: "PERCENT10",
        discountType: "percentage",
        discountValue: 10,
      };

      // 금액 쿠폰 테스트
      expect(applyCouponDiscount(10000, amountCoupon)).toBe(5000); // 10000 - 5000 = 5000
      expect(applyCouponDiscount(4000, amountCoupon)).toBe(0); // 4000 - 5000 < 0이므로 0 반환

      // 퍼센트 쿠폰 테스트
      expect(applyCouponDiscount(10000, percentCoupon)).toBe(9000); // 10000 * (1 - 0.1) = 9000

      // 쿠폰 없음 테스트
      expect(applyCouponDiscount(10000, null)).toBe(10000); // 쿠폰 없으면 원래 가격 반환
    });

    test("product 모델 - getMaxDiscountRate 함수가 최대 할인율을 올바르게 반환해야 함", () => {
      // src/refactoring/models/product.ts의 getMaxDiscountRate 함수 테스트

      const discounts = [
        { quantity: 5, rate: 0.05 },
        { quantity: 10, rate: 0.1 },
        { quantity: 20, rate: 0.2 },
      ];

      expect(getMaxDiscountRate(discounts)).toBe(0.2); // 최대 할인율 0.2 반환
      expect(getMaxDiscountRate([])).toBe(0); // 빈 배열인 경우 0 반환
    });

    test("새로운 hook 함수르 만든 후에 테스트 코드를 작성해서 실행해보세요", () => {
      expect(true).toBe(true);
    });

    test("useProductSearch 훅이 상품 검색 기능을 올바르게 제공해야 함", () => {
      // src/refactoring/hooks/useProductSearch.ts 테스트

      const mockProducts: Product[] = [
        { id: "p1", name: "상품1", price: 10000, stock: 20, discounts: [] },
        { id: "p2", name: "상품2", price: 20000, stock: 30, discounts: [] },
        {
          id: "p3",
          name: "테스트상품",
          price: 30000,
          stock: 40,
          discounts: [],
        },
      ];

      // 훅 초기화
      const { result } = renderHook(() => useProductSearch(mockProducts));

      // 초기 상태 검증
      expect(result.current.searchTerm).toBe(""); // 초기 검색어는 빈 문자열
      expect(result.current.filteredProducts).toEqual(mockProducts); // 초기 필터링된 상품은 모든 상품

      // 검색어 업데이트
      act(() => {
        result.current.updateSearchTerm("상품");
      });

      // 검색 결과 검증
      expect(result.current.searchTerm).toBe("상품");
      expect(result.current.filteredProducts).toHaveLength(3); // "상품"이 포함된 상품 3개
      expect(result.current.filteredProducts[0].name).toBe("상품1");
      expect(result.current.filteredProducts[1].name).toBe("상품2");
      expect(result.current.filteredProducts[2].name).toBe("테스트상품");

      // 검색어 초기화
      act(() => {
        result.current.resetSearch();
      });

      // 초기화 결과 검증
      expect(result.current.searchTerm).toBe("");
      expect(result.current.filteredProducts).toEqual(mockProducts);
    });

    test("useDiscountCalculator 훅이 할인 계산 기능을 올바르게 제공해야 함", () => {
      // src/refactoring/hooks/useDiscountCalculator.ts 테스트
      // 테스트용 상품, 카트 아이템, 쿠폰 준비
      const product: Product = {
        id: "p1",
        name: "테스트 상품",
        price: 10000,
        stock: 20,
        discounts: [
          { quantity: 5, rate: 0.1 },
          { quantity: 10, rate: 0.2 },
        ],
      };

      const cartItem: CartItem = {
        product,
        quantity: 10,
      };

      const coupon: Coupon = {
        name: "10% 할인 쿠폰",
        code: "PERCENT10",
        discountType: "percentage",
        discountValue: 10,
      };

      // 훅 초기화
      const { result } = renderHook(() => useDiscountCalculator());

      // 초기 상태 검증
      expect(result.current.selectedCoupon).toBeNull(); // 초기에는 쿠폰 선택 안 됨

      // 쿠폰 적용
      act(() => {
        result.current.applyCoupon(coupon);
      });

      expect(result.current.selectedCoupon).toEqual(coupon); // 쿠폰 선택 상태 확인

      // 적용된 상품 할인율 확인
      expect(result.current.getAppliedProductDiscount(cartItem)).toBe(0.2); // 10개이므로 20% 할인

      // 상품 개별 할인 금액 계산 확인
      expect(result.current.calculateItemDiscountAmount(cartItem)).toBe(20000); // 10000 * 10 * 0.2 = 20000

      // 전체 할인 계산 확인
      const cartItems = [cartItem];
      const total = result.current.calculateDiscountTotal(cartItems);

      // 기대 결과:
      // - 할인 전 총액: 10000 * 10 = 100000
      // - 상품 할인 적용 후: 100000 * (1 - 0.2) = 80000
      // - 쿠폰 할인 적용 후: 80000 * (1 - 0.1) = 72000
      // - 총 할인액: 100000 - 72000 = 28000

      expect(total.totalBeforeDiscount).toBe(100000);
      expect(total.totalAfterDiscount).toBe(72000);
      expect(total.totalDiscount).toBe(28000);
    });
  });

  describe("컴포넌트 테스트", () => {
    test("ProductSearch 컴포넌트가 올바르게 렌더링되고 동작해야 함", () => {
      // src/refactoring/components/common/ProductSearch.tsx 테스트
      const mockOnSearchChange = vi.fn();
      const mockOnResetSearch = vi.fn();

      // 컴포넌트 렌더링 (검색어 없는 상태)
      render(
        <ProductSearch
          searchTerm=""
          onSearchChange={mockOnSearchChange}
          onResetSearch={mockOnResetSearch}
        />
      );

      // 검색 입력 필드 존재 확인
      const searchInput = screen.getByPlaceholderText("상품명 검색");
      expect(searchInput).toBeInTheDocument();

      // 초기화 버튼은 검색어가 없을 때 보이지 않아야 함
      expect(screen.queryByText("초기화")).not.toBeInTheDocument();

      // 검색어 입력
      fireEvent.change(searchInput, { target: { value: "테스트" } });
      expect(mockOnSearchChange).toHaveBeenCalledWith("테스트");

      // 검색어가 있는 상태로 다시 렌더링
      render(
        <ProductSearch
          searchTerm="테스트"
          onSearchChange={mockOnSearchChange}
          onResetSearch={mockOnResetSearch}
        />
      );

      // 초기화 버튼이 보여야 함
      const resetButton = screen.getByText("초기화");
      expect(resetButton).toBeInTheDocument();

      // 초기화 버튼 클릭
      fireEvent.click(resetButton);
      expect(mockOnResetSearch).toHaveBeenCalled();
    });

    test("FormField 컴포넌트가 올바르게 렌더링되고 동작해야 함", () => {
      // src/refactoring/components/common/FormField.tsx 테스트
      const mockOnChange = vi.fn();

      // 텍스트 필드 렌더링 (라벨 포함)
      render(
        <FormField
          label="테스트 라벨"
          id="test-field"
          type="text"
          value="테스트 값"
          onChange={mockOnChange}
          placeholder="테스트 플레이스홀더"
        />
      );

      // 라벨 존재 확인
      expect(screen.getByText("테스트 라벨")).toBeInTheDocument();

      // 입력 필드 존재 및 값 확인
      const inputElement = screen.getByDisplayValue("테스트 값");
      expect(inputElement).toBeInTheDocument();
      expect(inputElement).toHaveAttribute("id", "test-field");
      expect(inputElement).toHaveAttribute(
        "placeholder",
        "테스트 플레이스홀더"
      );

      // 값 변경 이벤트
      fireEvent.change(inputElement, { target: { value: "새 값" } });
      expect(mockOnChange).toHaveBeenCalledWith("새 값");

      // 숫자 필드 렌더링 (라벨 없음)
      render(
        <FormField
          type="number"
          value={42}
          onChange={mockOnChange}
          placeholder="숫자 입력"
        />
      );

      // 숫자 입력 필드 확인
      const numberInput = screen.getByDisplayValue("42");
      expect(numberInput).toBeInTheDocument();
      expect(numberInput).toHaveAttribute("type", "number");

      // 숫자 값 변경
      fireEvent.change(numberInput, { target: { value: "99" } });
      expect(mockOnChange).toHaveBeenCalledWith("99");
    });

    test("DiscountList 컴포넌트가 올바르게 렌더링되어야 함", () => {
      // src/refactoring/components/common/DiscountList.tsx 테스트

      const discounts: Discount[] = [
        { quantity: 5, rate: 0.1 },
        { quantity: 10, rate: 0.2 },
      ];

      const mockOnRemoveDiscount = vi.fn();

      // 읽기 전용 모드로 렌더링
      render(<DiscountList discounts={discounts} />);

      // 할인 정보가 올바르게 표시되어야 함
      expect(screen.getByText("5개 이상: 10% 할인")).toBeInTheDocument();
      expect(screen.getByText("10개 이상: 20% 할인")).toBeInTheDocument();

      // 삭제 버튼은 없어야 함
      expect(screen.queryByText("삭제")).not.toBeInTheDocument();

      // 편집 모드로 렌더링
      render(
        <DiscountList
          discounts={discounts}
          productId="test-product"
          editable={true}
          onRemoveDiscount={mockOnRemoveDiscount}
        />
      );

      // 할인 정보가 올바르게 표시되어야 함
      expect(screen.getByText("5개 이상 구매 시 10% 할인")).toBeInTheDocument();
      expect(
        screen.getByText("10개 이상 구매 시 20% 할인")
      ).toBeInTheDocument();

      // 삭제 버튼이 있어야 함
      const deleteButtons = screen.getAllByText("삭제");
      expect(deleteButtons).toHaveLength(2);

      // 첫 번째 할인 삭제
      fireEvent.click(deleteButtons[0]);
      expect(mockOnRemoveDiscount).toHaveBeenCalledWith("test-product", 0);
    });
  });
});
