import debounce from 'lodash.debounce';
import { RefObject, useEffect, useRef } from 'react';

export function useResizeObserver(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
) {
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ref?.current) return;

    const debouncedCallback = debounce(() => {
      callbackRef.current();
    }, 0);

    // Event-driven resize: observe container size changes (e.g., sidebar animation)
    const observer = new ResizeObserver(() => {
      debouncedCallback();
    });

    observer.observe(ref.current);

    return () => {
      observer.disconnect();
      debouncedCallback.cancel();
    };
  }, [ref]);
}
