"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "framer-motion";

function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });
  const [loadPct, setLoadPct] = useState(0);
  const [showLoad, setShowLoad] = useState(true);

  useEffect(() => {
    if (reduceMotion) {
      setShowLoad(false);
      return;
    }

    let frame: number;
    let start: number | null = null;

    const tick = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const simulated = Math.min(92, (elapsed / 1400) * 92);
      setLoadPct(simulated);
      if (elapsed < 1400) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    const finish = () => {
      setLoadPct(100);
      setTimeout(() => setShowLoad(false), 500);
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("load", finish);
    };
  }, [reduceMotion]);

  if (reduceMotion) return null;

  return (
    <>
      {showLoad && (
        <div className="pointer-events-none fixed inset-x-0 top-0 z-[200]">
          <motion.div
            className="h-1 origin-left bg-gradient-to-r from-indigo-500 via-violet-500 to-cyan-400 shadow-[0_0_20px_rgb(99_102_241/0.9)]"
            style={{ scaleX: loadPct / 100 }}
          />
          <motion.span
            className="absolute right-3 top-2 text-[10px] font-bold tabular-nums text-primary"
            animate={{ opacity: loadPct >= 100 ? 0 : 1 }}
          >
            {Math.round(loadPct)}%
          </motion.span>
        </div>
      )}

      <motion.div
        className="pointer-events-none fixed inset-x-0 top-0 z-[199] h-[3px] origin-left bg-gradient-to-r from-indigo-400 via-violet-500 to-cyan-300 shadow-[0_0_18px_rgb(99_102_241/0.85)]"
        style={{ scaleX }}
      />
    </>
  );
}

export { ScrollProgress };
