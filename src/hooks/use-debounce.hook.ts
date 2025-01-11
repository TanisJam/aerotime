import { useState, useEffect } from 'react';

export const useDebounce = <T>(value: T, delay: number = 500): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const getDelay = () => {
      if (typeof value === 'string') {
        switch (value.length) {
          case 1:
            return delay * 1.5; // 750ms
          case 2:
            return delay * 1.2; // 600ms
          default:
            return delay; // 500ms
        }
      }
      return delay;
    };

    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, getDelay());

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
};
