import { useEffect, useRef, useState } from "react";

// To implement useThrottle without useEffect it's a normal pure JS implementation
const useThrottle = (cbFn, delay, trailCall = false) => {
  const flagRef = useRef(null);
  const timerRef = useRef(null);
  const callRef = useRef(null);

  useEffect(() => {
    flagRef.current = true;
    callRef.current = false;
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = null;
      flagRef.current = null;
      callRef.current = null;
    };
  }, [cbFn, delay]);

  const makeApiCall = (...args) => {
    if (flagRef.current) {
      cbFn(...args);
      flagRef.current = false;
      timerRef.current = setTimeout(() => {
        flagRef.current = true;
        if (callRef.current) {
          makeApiCall(...args);
          callRef.current = false;
        }
      }, [delay]);
    } else if (trailCall) {
      callRef.current = true;
    }
  };

  return makeApiCall;
};

export default useThrottle;
