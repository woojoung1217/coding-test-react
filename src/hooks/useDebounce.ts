import { useState, useEffect, useRef, useCallback } from 'react';
import { debounce } from '../utils/debounce';

/**
 * 값이 변경될 때마다 디바운스를 적용하여 상태를 업데이트하는 커스텀 훅.
 * 이 훅은 미리 구현되어 있으며, 지원자는 `utils/debounce.ts` 파일만 수정하면 됩니다.
 *
 * @param value 디바운스를 적용할 값
 * @param delay 디바운스 시간 (밀리초)
 * @returns 디바운스가 적용된 값
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetState = useCallback(debounce(setDebouncedValue, delay), [delay]);

  useEffect(() => {
    debouncedSetState(value);
  }, [value, debouncedSetState]);

  return debouncedValue;
}
