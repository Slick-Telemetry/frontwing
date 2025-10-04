import { useEffect, useRef } from 'react';

export function useResizeObserver(
  ref: HTMLElement | null,
  callback: () => void,
) {
  const callbackRef = useRef(callback);

  // Update callback ref when callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!ref) return;

    // Event-driven resize: observe container size changes (e.g., sidebar animation)
    const observer = new ResizeObserver(() => {
      // Batch with rAF to avoid excessive synchronous resizes
      window.requestAnimationFrame(callbackRef.current);
    });

    observer.observe(ref);

    return () => {
      observer.disconnect();
    };
  }, [ref]);
}
