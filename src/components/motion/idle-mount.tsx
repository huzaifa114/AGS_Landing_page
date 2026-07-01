"use client";

import { type ReactNode, useEffect, useState } from "react";

export interface IdleMountProps {
  children: ReactNode;
  fallback: ReactNode;
  /** Extra idle wait after page loader finishes */
  idleTimeoutMs?: number;
}

function IdleMount({ children, fallback, idleTimeoutMs = 2200 }: IdleMountProps) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId = 0;
    let timeoutId = 0;
    let observer: MutationObserver | null = null;

    const activate = () => {
      const run = () => setReady(true);
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(run, { timeout: idleTimeoutMs });
      } else {
        timeoutId = window.setTimeout(run, 600);
      }
    };

    if (document.documentElement.dataset.loaderDone === "true") {
      activate();
    } else {
      observer = new MutationObserver(() => {
        if (document.documentElement.dataset.loaderDone === "true") {
          observer?.disconnect();
          observer = null;
          activate();
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-loader-done"],
      });
    }

    return () => {
      observer?.disconnect();
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, [idleTimeoutMs]);

  return ready ? children : fallback;
}

export { IdleMount };
