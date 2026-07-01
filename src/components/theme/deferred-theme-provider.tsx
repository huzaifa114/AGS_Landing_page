"use client";

import { type ReactNode, useEffect, useState } from "react";
import { ThemeProvider } from "@/components/theme/theme-provider";

function DeferredThemeProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const run = () => setReady(true);
    if (typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(run, { timeout: 1500 });
    } else {
      window.setTimeout(run, 50);
    }
  }, []);

  if (!ready) {
    return <>{children}</>;
  }

  return <ThemeProvider>{children}</ThemeProvider>;
}

export { DeferredThemeProvider };
