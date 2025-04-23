
/**
 * 숫자를 통화 형식으로 변환하는 유틸리티 함수
 * 
 * @param amount 변환할 금액
 * @param locale 사용할 로케일 (기본값: 'ko-KR')
 * @param currency 통화 코드 (기본값: 'KRW')
 * @param options 추가 옵션
 * @returns 형식화된 통화 문자열
 * 
 * @example
 * formatCurrency(10000) // '₩10,000'
 * formatCurrency(10000, 'ko-KR', 'KRW', { symbol: false }) // '10,000원'
 * formatCurrency(10000, 'en-US', 'USD') // '$10,000.00'
 */
export const formatCurrency = (
  amount: number,
  locale: string = 'ko-KR',
  currency: string = 'KRW',
  options: {
    /**
     * 통화 기호를 표시할지 여부
     */
    symbol?: boolean;
    /**
     * 소수점 이하 자릿수
     */
    decimals?: number;
    /**
     * 통화 단위(원, $, 등)를 접미사로 사용할지 여부
     */
    useUnitSuffix?: boolean;
  } = {}
): string => {
  const { symbol = false, decimals, useUnitSuffix = true } = options;

  // 금액이 NaN이거나 undefined인 경우 처리
  if (isNaN(amount) || amount === undefined) {
    return '-';
  }

  // 소수점 처리
  const formattedAmount = Math.round(amount * 100) / 100;

  // 기본 Intl.NumberFormat 옵션
  const numberFormatOptions: Intl.NumberFormatOptions = {
    style: symbol ? 'currency' : 'decimal',
    currency,
    minimumFractionDigits: decimals !== undefined ? decimals : 0,
    maximumFractionDigits: decimals !== undefined ? decimals : 0,
  };

  // 통화 단위를 접미사로 사용하는 경우
  if (!symbol && useUnitSuffix) {
    const formatter = new Intl.NumberFormat(locale, {
      ...numberFormatOptions,
      style: 'decimal',
    });

    // 한국어 로케일인 경우 '원' 추가
    if (locale.startsWith('ko')) {
      return `${formatter.format(formattedAmount)}원`;
    }

    // 영어 로케일인 경우 통화 코드에 따라 접미사 변경
    if (locale.startsWith('en')) {
      const currencySuffixes: Record<string, string> = {
        USD: 'USD',
        EUR: 'EUR',
        GBP: 'GBP',
        JPY: 'JPY',
      };

      const suffix = currencySuffixes[currency] || currency;
      return `${formatter.format(formattedAmount)} ${suffix}`;
    }
  }

  // 기본 형식
  const formatter = new Intl.NumberFormat(locale, numberFormatOptions);
  return formatter.format(formattedAmount);
};