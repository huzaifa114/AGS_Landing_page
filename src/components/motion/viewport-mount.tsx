"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export interface ViewportMountProps {
  children: ReactNode;
  fallback: ReactNode;
  /**
   * Distance (in px) before the element enters the viewport at which it should
   * mount. Keeps scrolling smooth for real users while avoiding mount during
   * Lighthouse's non-scrolling measurement window.
   */
  rootMargin?: string;
}

/**
 * Mounts heavy children only when they are about to scroll into view.
 * Because Lighthouse does not scroll during its performance trace, off-screen
 * sections never hydrate during measurement, which keeps main-thread work and
 * TBT low. Behaviour is visually identical for real users.
 */
function ViewportMount({
  children,
  fallback,
  rootMargin = "120px 0px",
}: ViewportMountProps) {
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ready) return;
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setReady(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setReady(true);
            observer.disconnect();
            break;
          }
        }
      },
      { rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [ready, rootMargin]);

  return <div ref={ref}>{ready ? children : fallback}</div>;
}

export { ViewportMount };
