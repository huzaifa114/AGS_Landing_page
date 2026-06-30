"use client";

import { type RefObject, useEffect, useState } from "react";

export interface UseInViewOptions {
  once?: boolean;
  margin?: string;
  threshold?: number;
}

function useInView<T extends Element>(
  ref: RefObject<T | null>,
  { once = true, margin = "0px", threshold = 0.15 }: UseInViewOptions = {}
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (once) observer.disconnect();
        } else if (!once) {
          setInView(false);
        }
      },
      { rootMargin: margin, threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [ref, once, margin, threshold]);

  return inView;
}

export { useInView };
