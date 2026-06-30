"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Activity,
  Box,
  Cpu,
  Crosshair,
  Layers,
  ScanLine,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CardImagingOverlay } from "@/components/marketing/card-imaging-overlay";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";

type SubgradeKey = "centering" | "corners" | "edges" | "surface";
type CardSide = "front" | "back";

const CYCLE_MS = 3000;
const ease = [0.22, 1, 0.36, 1] as const;

const SUBGRADES: {
  key: SubgradeKey;
  label: string;
  value: number;
  icon: LucideIcon;
}[] = [
  { key: "centering", label: "Centering", value: 9.5, icon: Crosshair },
  { key: "corners", label: "Corners", value: 9.0, icon: Box },
  { key: "edges", label: "Edges", value: 9.0, icon: Activity },
  { key: "surface", label: "Surface", value: 8.5, icon: Layers },
];

const CONDITION_NOTES: Record<CardSide, Record<SubgradeKey, string>> = {
  front: {
    centering:
      "Strong front-face centering with minor offset visible under controlled imaging capture.",
    corners: "Front corners present cleanly with minimal whitening at contact points.",
    edges: "Front edge profile is clean with wear consistent with the assigned grade.",
    surface: "Front surface shows minor imperfections documented in the high-resolution record.",
  },
  back: {
    centering: "Back-face centering aligns within tolerance under controlled capture.",
    corners: "Back corners show light handling wear, logged in the imaging record.",
    edges: "Edge wear is light and consistent with the assigned grade.",
    surface: "Back surface texture is uniform with minor marks indexed in the report.",
  },
};

const SIGNALS: Record<CardSide, Record<SubgradeKey, string>> = {
  front: {
    centering: "Front offset 0.4mm",
    corners: "4 front corners mapped",
    edges: "Front edge vectors 1.2M",
    surface: "6.8M front surface pts",
  },
  back: {
    centering: "Back offset 0.3mm",
    corners: "4 back corners mapped",
    edges: "Back edge vectors 0.9M",
    surface: "5.6M back surface pts",
  },
};

const DATA_METRICS = [
  { label: "Surface points", value: 12.4, suffix: "M" },
  { label: "Depth samples", value: 8.2, suffix: "M" },
  { label: "Edge vectors", value: 2.1, suffix: "M" },
  { label: "Confidence", value: 99.2, suffix: "%" },
] as const;

function useCountUp(target: number, active: boolean, duration = 1.4) {
  const [val, setVal] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active || reduceMotion) {
      setVal(target);
      return;
    }
    setVal(0);
    let start: number | null = null;
    let frame: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setVal(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduceMotion]);

  return val;
}

function MetricCell({
  label,
  value,
  suffix,
  active,
}: {
  label: string;
  value: number;
  suffix: string;
  active: boolean;
}) {
  const n = useCountUp(value, active);
  const display = suffix === "%" ? n.toFixed(1) : n.toFixed(1);

  return (
    <div className="rounded-lg border border-border dark:border-white/10 bg-surface-muted dark:bg-black/30 px-2.5 py-2">
      <dt className="text-[9px] font-semibold uppercase tracking-wide text-muted-foreground dark:text-slate-500">{label}</dt>
      <dd className="mt-0.5 font-mono text-sm font-bold tabular-nums text-indigo-300">
        {display}
        {suffix}
      </dd>
    </div>
  );
}

function ScoreRing({ value, active }: { value: number; active: boolean }) {
  const pct = (value / 10) * 100;
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative flex h-12 w-12 items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 48 48">
        <circle cx="24" cy="24" r="20" fill="none" stroke="rgb(255 255 255 / 0.08)" strokeWidth="3" />
        <motion.circle
          cx="24"
          cy="24"
          r="20"
          fill="none"
          stroke="rgb(99 102 241)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 20}`}
          initial={{ strokeDashoffset: 2 * Math.PI * 20 }}
          animate={{
            strokeDashoffset: active ? 2 * Math.PI * 20 * (1 - pct / 100) : 2 * Math.PI * 20,
          }}
          transition={{ duration: reduceMotion ? 0 : 0.5, ease: "easeOut" }}
        />
      </svg>
      <span className="font-mono text-sm font-bold text-foreground dark:text-white">{value.toFixed(1)}</span>
    </div>
  );
}

function SubgradeRow({
  item,
  isActive,
}: {
  item: (typeof SUBGRADES)[number];
  isActive: boolean;
}) {
  const Icon = item.icon;

  return (
    <motion.div
      className={cn(
        "flex items-center gap-3 rounded-xl border px-3 py-2.5",
        isActive
          ? "border-indigo-500/50 bg-indigo-500/12"
          : "border-border dark:border-white/8 bg-white/[0.02]"
      )}
      animate={{ scale: isActive ? 1.01 : 1 }}
      transition={{ duration: 0.25, ease }}
    >
      <div
        className={cn(
          "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
          isActive ? "bg-indigo-500/25 text-indigo-300" : "bg-surface-muted dark:bg-white/5 text-muted-foreground dark:text-slate-500"
        )}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground dark:text-slate-400">
          {item.label}
        </p>
        <p className="font-mono text-base font-bold text-foreground dark:text-white">{item.value.toFixed(1)}</p>
      </div>
      {isActive && <ScoreRing value={item.value} active={isActive} />}
    </motion.div>
  );
}

function ImagingReportPanel({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [activeSubgrade, setActiveSubgrade] = useState<SubgradeKey>("centering");
  const [cardSide, setCardSide] = useState<CardSide>("front");
  const [inView, setInView] = useState(false);
  const [autoPlay, setAutoPlay] = useState(true);
  const cycleRef = useRef(0);
  const pauseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeItem = SUBGRADES.find((s) => s.key === activeSubgrade) ?? SUBGRADES[0];
  const cardSrc = cardSide === "front" ? sampleCardImages.front : sampleCardImages.back;
  const cardAlt = cardSide === "front" ? sampleCardImages.frontAlt : sampleCardImages.backAlt;
  const conditionText = CONDITION_NOTES[cardSide][activeSubgrade];
  const signalText = SIGNALS[cardSide][activeSubgrade];

  const pauseAuto = useCallback(() => {
    setAutoPlay(false);
    if (pauseTimer.current) clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => setAutoPlay(true), 12000);
  }, []);

  useEffect(() => {
    if (!inView || !autoPlay || reduceMotion) return;

    const tick = () => {
      cycleRef.current = (cycleRef.current + 1) % 8;
      const step = cycleRef.current;
      const side: CardSide = step < 4 ? "front" : "back";
      const idx = step % 4;
      setCardSide(side);
      setActiveSubgrade(SUBGRADES[idx].key);
    };

    const id = setInterval(tick, CYCLE_MS);
    return () => clearInterval(id);
  }, [inView, autoPlay, reduceMotion]);

  useEffect(() => {
    return () => {
      if (pauseTimer.current) clearTimeout(pauseTimer.current);
    };
  }, []);

  return (
    <motion.div
      className={cn(
        "relative overflow-hidden rounded-2xl ai-console shadow-premium dark:shadow-[0_32px_80px_rgb(0_0_0/0.5)]",
        className
      )}
      initial={reduceMotion ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      onViewportEnter={() => setInView(true)}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease }}
    >
      <div className="pointer-events-none absolute inset-0 imaging-panel-mesh" />

      <div className="relative grid grid-cols-[1fr_auto] items-end gap-x-4 border-b border-border dark:border-white/10 px-4 py-3 sm:px-5">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary dark:text-indigo-400">
            Digital Grading Report
          </p>
          <h3 className="mt-0.5 text-xl font-bold text-foreground sm:text-2xl">Victor Wembanyama</h3>
          <span className="font-mono text-xs text-muted-foreground dark:text-slate-500">WW-000001</span>
        </div>
        <div className="text-right">
          <p className="font-hud text-[10px] font-bold uppercase tracking-[0.2em] text-primary dark:text-cyan-400">
            Final Grade
          </p>
          <div className="relative mt-1 inline-flex flex-col items-end">
            <motion.div
              className="relative"
              animate={reduceMotion ? undefined : { scale: [1, 1.03, 1] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
            >
              <p className="font-grade text-5xl font-extrabold leading-none tracking-wider text-transparent sm:text-6xl bg-gradient-to-br from-indigo-600 via-primary to-violet-600 bg-clip-text dark:from-cyan-300 dark:via-white dark:to-violet-300 dark:drop-shadow-[0_0_18px_rgb(56_189_248/0.45)]">
                9.0
              </p>
              <div className="pointer-events-none absolute -inset-2 rounded-lg bg-indigo-500/10 blur-md dark:bg-cyan-400/10" />
            </motion.div>
            <span className="mt-1 font-hud text-[9px] uppercase tracking-[0.22em] text-violet-600/90 dark:text-violet-300/90">
              AI · Confidence Index
            </span>
          </div>
        </div>
      </div>

      <div className="relative grid gap-4 p-4 sm:p-5 lg:grid-cols-[1.05fr_1fr] lg:gap-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground dark:text-slate-300">
              <ScanLine className="h-3.5 w-3.5 text-indigo-400" />
              Imaging capture
              {autoPlay && inView && (
                <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300">
                  <motion.span
                    className="h-1 w-1 rounded-full bg-indigo-400"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  Auto
                </span>
              )}
            </div>
            <div className="flex rounded-lg border border-border dark:border-white/10 bg-surface-muted dark:bg-white/5 p-0.5">
              {(["front", "back"] as const).map((side) => (
                <button
                  key={side}
                  type="button"
                  onClick={() => {
                    setCardSide(side);
                    pauseAuto();
                  }}
                  className={cn(
                    "rounded-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors",
                    cardSide === side ? "bg-indigo-600 text-white" : "text-muted-foreground dark:text-slate-400"
                  )}
                >
                  {side}
                </button>
              ))}
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[260px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={cardSide}
                initial={{ opacity: 0, filter: "blur(4px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.35, ease }}
                className="relative aspect-[2.5/3.5] overflow-hidden rounded-lg border border-indigo-500/30"
              >
                <Image src={cardSrc} alt={cardAlt} fill className="object-cover" sizes="260px" priority />
                <CardImagingOverlay active={inView} variant="subgrade" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                {cardSide === "front" && (
                  <div className="absolute right-2 top-2">
                    <Badge variant="premium" className="font-grade font-extrabold">9.0</Badge>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="rounded-xl border border-border dark:border-white/10 bg-surface-muted/80 dark:bg-white/[0.03] p-3">
            <div className="mb-2 flex items-center gap-1.5 text-xs font-bold text-foreground dark:text-slate-200">
              <Cpu className="h-3.5 w-3.5 text-indigo-400" />
              Imaging metrics
            </div>
            <dl className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {DATA_METRICS.map((m) => (
                <MetricCell key={m.label} label={m.label} value={m.value} suffix={m.suffix} active={inView} />
              ))}
            </dl>
            <AnimatePresence mode="wait">
              <motion.p
                key={`${cardSide}-${activeSubgrade}`}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.28, ease }}
                className="mt-2.5 border-t border-border dark:border-white/8 pt-2.5 text-xs text-muted-foreground dark:text-slate-400"
              >
                <span className="font-semibold uppercase text-indigo-300">{cardSide}</span>
                {" · "}
                <span className="font-semibold text-indigo-300">{activeItem.label}</span>
                {" — "}
                {conditionText}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-h4 font-bold text-foreground dark:text-white">Condition Analytics</h4>
              <p className="mt-0.5 text-body-sm capitalize text-muted-foreground dark:text-slate-400">
                {cardSide} surface · auto-indexed
              </p>
            </div>
            <Activity className="h-5 w-5 text-indigo-400" />
          </div>

          <div className="space-y-1.5">
            {SUBGRADES.map((item) => (
              <button
                key={item.key}
                type="button"
                className="block w-full text-left"
                onClick={() => {
                  setActiveSubgrade(item.key);
                  pauseAuto();
                }}
              >
                <SubgradeRow item={item} isActive={item.key === activeSubgrade} />
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`detail-${cardSide}-${activeSubgrade}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3, ease }}
              className="overflow-hidden rounded-xl border border-indigo-500/30 bg-indigo-500/8 px-3 py-3"
            >
              <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wide text-indigo-300">
                <Sparkles className="h-3 w-3" />
                {cardSide} · {signalText}
              </div>
              <p className="mt-2 text-body-sm leading-relaxed text-muted-foreground dark:text-slate-300">
                <span className="font-semibold text-foreground dark:text-white">{activeItem.label}</span>
                {" — "}
                {conditionText}
              </p>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-1.5">
            {SUBGRADES.map((item) => (
              <div
                key={item.key}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  item.key === activeSubgrade ? "w-6 bg-indigo-500" : "w-1.5 bg-white/20"
                )}
              />
            ))}
          </div>

          <div>
            <p className="text-body-sm font-bold text-muted-foreground dark:text-slate-300">Certification</p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              <Badge variant="premium">WW-000001</Badge>
              <Badge variant="info">Verified Record</Badge>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export { ImagingReportPanel };
