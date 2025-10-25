import { useCallback, useState } from "react";

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState("");
  const debouncedSetDebouncedValueFn = useCallback(
    debouncedFn(setDebouncedValue, delay),
    []
  );

  debouncedSetDebouncedValueFn(value);

  return debouncedValue;
};

const debouncedFn = (cbFn, delay, ...args) => {
  let timerId = null;
  return (...extraArgs) => {
    const shouldCallNow = !timerId;
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => {
      timerId = null;
      // cbFn(...extraArgs, ...args);
    }, delay);
    if (shouldCallNow) {
      cbFn(...extraArgs, ...args);
    }
  };
};

export default useDebounce;
