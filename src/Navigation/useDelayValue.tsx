import * as React from "react";

// This code uses a custom hook that allows you to delay the change of a value.
// The set function accepts a value and a delay in ms. If a delay is provided,
// the value is not set until after the delay has elapsed. If no delay is provided,
// the value is set immediately.

// The set function uses a timeoutId ref to store the ID of the timeout that is
// set when a value is delayed. The timeout is cleared before a new value is set
// to prevent the value from being changed if the user provides another value
// before the timeout elapses. The timeout is also cleared when the component
// unmounts to prevent memory leaks.

// The cancel function can be used to cancel the timeout so it will prevent the
// value from being set. This function is useful when the user moves the mouse
// outside.

export type UseDelayValueSetFunction = (value: any, delay?: number) => void;
export type UseDelayCancelValueFunction = () => void;

export function useDelayValue<T>(value: T) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);

  const timeoutId = React.useRef<NodeJS.Timeout | undefined>(undefined);
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

  const cancel = React.useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }
  }, []);

  return {
    value: debouncedValue,
    set,
    cancel,
  };
}
