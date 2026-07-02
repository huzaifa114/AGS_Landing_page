"use client";

import { useEffect, useState } from "react";

const EKG_PATH =
  "M0 48 H72 L88 48 L98 18 L112 78 L126 48 L168 48 L178 22 L192 74 L206 48 L248 48 L258 28 L272 68 L286 48 H400";

const MIN_VISIBLE_MS = 720;

function PageLoader() {
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const markLoaderDone = () => {
      document.documentElement.dataset.loaderDone = "true";
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      markLoaderDone();
      setVisible(false);
      return;
    }

    const started = performance.now();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";

    let dismissed = false;

    const dismiss = () => {
      if (dismissed) return;
      dismissed = true;

      const elapsed = performance.now() - started;
      const wait = Math.max(0, MIN_VISIBLE_MS - elapsed);

      window.setTimeout(() => {
        setExiting(true);
        window.setTimeout(() => {
          setVisible(false);
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          markLoaderDone();
        }, 300);
      }, wait);
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      dismiss();
    } else {
      document.addEventListener("DOMContentLoaded", dismiss, { once: true });
    }

    return () => {
      document.removeEventListener("DOMContentLoaded", dismiss);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`page-loader fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#060a14] ${exiting ? "page-loader-exit" : ""}`}
      aria-hidden="true"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgb(99_102_241/0.14),transparent_68%)]"
        aria-hidden="true"
      />

      <div className="relative w-full max-w-2xl px-8">
        <svg
          viewBox="0 0 400 96"
          className="h-24 w-full overflow-visible sm:h-28"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="ekg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.15" />
              <stop offset="50%" stopColor="rgb(56 189 248)" stopOpacity="1" />
              <stop offset="100%" stopColor="rgb(139 92 246)" stopOpacity="0.4" />
            </linearGradient>
            <filter id="ekg-glow" x="-20%" y="-80%" width="140%" height="260%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={EKG_PATH}
            fill="none"
            stroke="rgb(56 189 248 / 0.14)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          <path
            d={EKG_PATH}
            fill="none"
            stroke="url(#ekg-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#ekg-glow)"
            pathLength={1}
            className="page-loader-ekg"
          />
        </svg>

        <div
          className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full"
          aria-hidden="true"
        >
          <div className="page-loader-sweep h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_rgb(56_189_248/0.9)]" />
        </div>
      </div>

      <p className="mt-8 font-hud text-[11px] uppercase tracking-[0.35em] text-cyan-400/80">
        Initializing
      </p>

      <div className="mt-4 h-px w-40 overflow-hidden rounded-full bg-white/8">
        <div className="page-loader-progress h-full origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 shadow-[0_0_12px_rgb(56_189_248/0.8)]" />
      </div>
    </div>
  );
}

export { PageLoader };
