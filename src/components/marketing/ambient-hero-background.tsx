"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/utils";

const AmbientMotionCanvas = dynamic(
  () =>
    import("@/components/marketing/ambient-motion-canvas").then(
      (m) => m.AmbientMotionCanvas
    ),
  { ssr: false }
);

export interface AmbientHeroBackgroundProps {
  className?: string;
}

function AmbientHeroBackground({ className }: AmbientHeroBackgroundProps) {
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    let idleId = 0;
    let timeoutId = 0;
    let observer: MutationObserver | null = null;

    const mountCanvas = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setCanvasReady(true), {
          timeout: 2500,
        });
      } else {
        timeoutId = window.setTimeout(() => setCanvasReady(true), 600);
      }
    };

    const start = () => {
      if (document.documentElement.dataset.loaderDone === "true") {
        mountCanvas();
        return;
      }

      observer = new MutationObserver(() => {
        if (document.documentElement.dataset.loaderDone === "true") {
          observer?.disconnect();
          observer = null;
          mountCanvas();
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-loader-done"],
      });
    };

    start();

    return () => {
      observer?.disconnect();
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {canvasReady && <AmbientMotionCanvas />}

      <div className="ambient-mesh absolute inset-0" />
      <div className="ambient-orb ambient-orb-a absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/20" />
      <div className="ambient-orb ambient-orb-b absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-500/15" />
      <div className="ambient-orb ambient-orb-c absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/10" />

      <div className="absolute inset-0 bg-gradient-to-b from-white/82 via-white/68 to-white/94 dark:from-[#070b1a]/88 dark:via-[#070b1a]/78 dark:to-[#070b1a]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.14),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.18),transparent_55%)]" />
      <div className="absolute inset-0 imaging-grid-overlay opacity-[0.04] dark:opacity-[0.07]" />
    </div>
  );
}

export { AmbientHeroBackground };
