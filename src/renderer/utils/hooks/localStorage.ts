import { useCallback, useState } from "react";

export function useLocalStorage(
  key: string,
  initialValue?: (() => string) | string
): [string, (newValue: string) => void] {
  const getInitialValue = useCallback(() => {
    const stored = window.localStorage.getItem(key);
    if (stored) return stored;

    return typeof initialValue === "string" ? initialValue : initialValue();
  }, [key, initialValue]);

  const [value, setValue] = useState(() => getInitialValue());

  const saveValue = useCallback(
    (newValue: string) => {
      window.localStorage.setItem(key, newValue);
      setValue(newValue);
    },
    [key, setValue]
  );

  return [value, saveValue];
}
