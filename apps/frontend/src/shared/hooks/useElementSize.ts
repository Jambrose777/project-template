import { useEffect, useRef, useState } from 'react';

// Measures an element's rendered content-box size via `ResizeObserver`,
// reactively updating whenever the element's own size changes. Kept under
// `src/shared/` per styling.instructions.md's "colocate until a second place
// needs it" rule, so future features needing an element's live size can
// reuse it directly.
export function useElementSize<T extends HTMLElement>(): [
  React.RefObject<T | null>,
  { width: number; height: number },
] {
  const ref = useRef<T>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return [ref, size];
}
