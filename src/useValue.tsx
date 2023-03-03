import * as React from "react";

export function useValue(value: any) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  const timeoutId = React.useRef<number | undefined>(undefined);
  const set = React.useCallback((value: any, delay?: number) => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
    if (delay === undefined) {
      setDebouncedValue(value);
      return;
    }

    timeoutId.current = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
  }, []);

  React.useEffect(() => {
    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
      }
    };
  }, [timeoutId]);

  return {
    value: debouncedValue,
    set,
  };
}
