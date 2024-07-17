"use client";
import { useEffect, useState } from "react";
export const useDebounce = (value: any, delay = 500) => {
  const [debouncedValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceValue(value);
    }, delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};
