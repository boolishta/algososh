import { useEffect, useState } from 'react';
import { DELAY_IN_MS } from '../constants/delays';

export function useCurrentIndex(length: number, delay = DELAY_IN_MS) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setTimeout(() => {
      if (currentIndex < length) {
        setCurrentIndex(currentIndex + 1);
      }
    }, delay);
    return () => clearTimeout(interval);
  }, [currentIndex, length, delay]);
  return { currentIndex, setCurrentIndex };
}
