import { useEffect, useRef } from "react";

export const useTimeout = (cb, delay) => {
  const timerRef = useRef(null);
  const cbRef = useRef(null);

  useEffect(() => {
    // Referring to updated callback
    cbRef.current = cb;

    return () => {
      cbRef.current = null;
    };
  }, [cb]);

  const createTimer = (cbRef, delay) => {
    // Just passing in the callback Ref current value and not calling it
    // Else the callback function will get called right away
    timerRef.current = setTimeout(() => {
      cbRef.current();
    }, [delay]);
  };

  useEffect(() => {
    createTimer(cbRef, delay);

    return () => {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    };
  }, [delay]);
};
