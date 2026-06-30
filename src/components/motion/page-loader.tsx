"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const EKG_PATH =
  "M0 48 H72 L88 48 L98 18 L112 78 L126 48 L168 48 L178 22 L192 74 L206 48 L248 48 L258 28 L272 68 L286 48 H400";

function PageLoader() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(!reduceMotion);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;

    document.body.style.overflow = "hidden";

    let frame: number;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const simulated = Math.min(90, (elapsed / 1500) * 90);
      setProgress(simulated);
      if (elapsed < 1500) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const dismiss = () => {
      setProgress(100);
      window.setTimeout(() => {
        setVisible(false);
        document.body.style.overflow = "";
      }, 480);
    };

    if (document.readyState === "complete") {
      window.setTimeout(dismiss, 850);
    } else {
      window.addEventListener("load", dismiss);
    }

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", dismiss);
      document.body.style.overflow = "";
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#060a14]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
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

              <motion.path
                d={EKG_PATH}
                fill="none"
                stroke="url(#ekg-gradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#ekg-glow)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: [0, 1, 0] }}
                transition={{
                  duration: 1.35,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.72, 1],
                }}
              />
            </svg>

            <motion.div
              className="absolute left-8 right-8 top-1/2 h-[2px] -translate-y-1/2 overflow-hidden rounded-full"
              aria-hidden="true"
            >
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_16px_rgb(56_189_248/0.9)]"
                animate={{ x: ["-120%", "320%"] }}
                transition={{ duration: 1.35, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>

          <motion.p
            className="mt-8 font-hud text-[11px] uppercase tracking-[0.35em] text-cyan-400/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            Initializing
          </motion.p>

          <motion.div
            className="mt-4 h-px w-40 overflow-hidden rounded-full bg-white/8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.div
              className="h-full origin-left bg-gradient-to-r from-indigo-500 via-cyan-400 to-violet-500 shadow-[0_0_12px_rgb(56_189_248/0.8)]"
              style={{ scaleX: progress / 100 }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export { PageLoader };
