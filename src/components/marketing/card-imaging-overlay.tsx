"use client";

import { motion, useReducedMotion } from "framer-motion";

type OverlayVariant = "subgrade" | "hero" | "pair";

const SAMPLE_DOTS = [
  { x: 18, y: 22 }, { x: 42, y: 15 }, { x: 68, y: 28 }, { x: 85, y: 12 },
  { x: 25, y: 45 }, { x: 55, y: 38 }, { x: 78, y: 52 }, { x: 12, y: 62 },
];

const HERO_LOCKS = [
  "left-3 top-3 border-l-2 border-t-2",
  "right-3 top-3 border-r-2 border-t-2",
  "left-3 bottom-3 border-b-2 border-l-2",
  "right-3 bottom-3 border-b-2 border-r-2",
];

const PAIR_HEX = [
  { x: 12, y: 18 }, { x: 38, y: 10 }, { x: 64, y: 22 }, { x: 88, y: 14 },
  { x: 20, y: 48 }, { x: 50, y: 42 }, { x: 78, y: 55 }, { x: 30, y: 72 },
  { x: 60, y: 78 }, { x: 85, y: 68 },
];

function CardImagingOverlay({
  active = true,
  variant = "subgrade",
}: {
  active?: boolean;
  variant?: OverlayVariant;
}) {
  const reduceMotion = useReducedMotion();
  const off = reduceMotion || !active;

  if (variant === "hero") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -inset-[60%] rotate-12 opacity-50"
          style={{
            background:
              "linear-gradient(105deg, transparent 42%, rgb(129 140 248 / 0.45) 50%, rgb(56 189 248 / 0.35) 54%, transparent 62%)",
          }}
          animate={off ? undefined : { x: ["-35%", "35%"] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {HERO_LOCKS.map((pos, i) => (
          <motion.div
            key={pos}
            className={`absolute h-6 w-6 border-violet-400/80 ${pos}`}
            animate={off ? undefined : { opacity: [0.35, 1, 0.35], scale: [0.95, 1.05, 0.95] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.2 }}
          />
        ))}

        <motion.div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-400/50"
          animate={off ? undefined : { rotate: 360, scale: [0.9, 1.08, 0.9] }}
          transition={{
            rotate: { duration: 8, repeat: Infinity, ease: "linear" },
            scale: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
          }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-px w-14 -translate-x-1/2 -translate-y-1/2 bg-cyan-400/60"
          animate={off ? undefined : { opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-14 w-px -translate-x-1/2 -translate-y-1/2 bg-cyan-400/60"
          animate={off ? undefined : { opacity: [0.2, 0.9, 0.2] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: 0.4 }}
        />

        <div className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-widest text-cyan-300/90">
          grade lock
        </div>
      </div>
    );
  }

  if (variant === "pair") {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-35"
          style={{
            backgroundImage:
              "repeating-linear-gradient(60deg, rgb(99 102 241 / 0.1) 0px, rgb(99 102 241 / 0.1) 1px, transparent 1px, transparent 10px)",
          }}
        />

        {PAIR_HEX.map((cell, i) => (
          <motion.div
            key={`hex-${i}`}
            className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-sm border border-violet-400/40 bg-violet-500/10"
            style={{ left: `${cell.x}%`, top: `${cell.y}%` }}
            animate={
              off
                ? undefined
                : {
                    opacity: [0.15, 0.95, 0.15],
                    borderColor: ["rgb(139 92 246 / 0.2)", "rgb(56 189 248 / 0.9)", "rgb(139 92 246 / 0.2)"],
                  }
            }
            transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18 }}
          />
        ))}

        <motion.div
          className="absolute bottom-0 left-0 top-0 w-1 bg-gradient-to-b from-transparent via-indigo-400/70 to-transparent"
          animate={off ? undefined : { y: ["-100%", "100%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 top-0 w-1 bg-gradient-to-b from-transparent via-violet-400/70 to-transparent"
          animate={off ? undefined : { y: ["100%", "-100%"] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.4 }}
        />

        <motion.div
          className="absolute inset-x-3 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent"
          animate={off ? undefined : { opacity: [0.1, 0.8, 0.1], scaleX: [0.6, 1, 0.6] }}
          transition={{ duration: 2.8, repeat: Infinity }}
        />

        <div className="absolute bottom-2 right-2 rounded bg-black/55 px-1.5 py-0.5 font-mono text-[7px] uppercase tracking-widest text-violet-300/90">
          dual sync
        </div>
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 imaging-grid-overlay opacity-25" />

      {[
        "left-2 top-2 border-l-2 border-t-2",
        "right-2 top-2 border-r-2 border-t-2",
        "left-2 bottom-2 border-b-2 border-l-2",
        "right-2 bottom-2 border-b-2 border-r-2",
      ].map((pos, i) => (
        <motion.div
          key={pos}
          className={`absolute h-5 w-5 border-indigo-400/70 ${pos}`}
          animate={off ? undefined : { opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}

      {SAMPLE_DOTS.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute h-1 w-1 rounded-full bg-cyan-400/80"
          style={{ left: `${dot.x}%`, top: `${dot.y}%` }}
          animate={off ? undefined : { opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.22 }}
        />
      ))}

      <motion.div
        className="imaging-scan-line"
        animate={off ? undefined : { top: ["0%", "100%"] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="imaging-scan-line opacity-40"
        style={{ height: 3, filter: "blur(2px)" }}
        animate={off ? undefined : { top: ["0%", "100%"] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: "linear", delay: 0.05 }}
      />

      <div className="absolute bottom-2 left-2 rounded bg-black/50 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-indigo-300/90">
        WW scan
      </div>
    </div>
  );
}

export { CardImagingOverlay };
