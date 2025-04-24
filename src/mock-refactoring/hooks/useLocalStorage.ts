import { useState, useEffect } from 'react';

/**
 * localStorage를 사용하는 상태 관리 훅
 * test 모드에서는 일반 state로 동작하고, 일반 모드에서는 localStorage와 연동
 */
export const useLocalStorage = <T>(key: string, initialValue: T) => {
  const isTestMode = import.meta.env.MODE === 'test';

  const [storedValue, setStoredValue] = useState<T>(() => {
    if (isTestMode) {
      return initialValue;
    }

    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('localStorage에서 데이터 로드 중 오류 발생:', error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (isTestMode) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('localStorage에 데이터 저장 중 오류 발생:', error);
    }
  }, [key, storedValue, isTestMode]);

  return [storedValue, setStoredValue] as const;
};