"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Activity, Cpu, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { SECTION_EYEBROW, SECTION_META, SECTION_TITLE, HEADING_DISPLAY } from "@/lib/typography";

type MetricConfig = {
  code: string;
  label: string;
  detail: string;
  kind: "currency" | "hours" | "percent" | "live";
  target?: number;
  prefix?: string;
  suffix?: string;
  icon: typeof Cpu;
  accent: string;
};

const METRICS: MetricConfig[] = [
  {
    code: "SYS-01",
    label: "Unit Cost",
    detail: "Flat-rate grade protocol",
    kind: "currency",
    target: 10,
    prefix: "$",
    icon: Zap,
    accent: "from-indigo-50 to-violet-50 dark:from-cyan-500/20 dark:to-indigo-500/10",
  },
  {
    code: "SYS-02",
    label: "Process Window",
    detail: "Target after intake",
    kind: "hours",
    target: 72,
    suffix: "HR",
    icon: Activity,
    accent: "from-violet-50 to-fuchsia-50 dark:from-violet-500/20 dark:to-fuchsia-500/10",
  },
  {
    code: "SYS-03",
    label: "Digital Output",
    detail: "Reports auto-generated",
    kind: "percent",
    target: 100,
    suffix: "%",
    icon: Cpu,
    accent: "from-blue-50 to-indigo-50 dark:from-indigo-500/20 dark:to-blue-500/10",
  },
  {
    code: "SYS-04",
    label: "Live Verification",
    detail: "Cert lookup stream",
    kind: "live",
    icon: ShieldCheck,
    accent: "from-emerald-50 to-cyan-50 dark:from-emerald-500/20 dark:to-cyan-500/10",
  },
];

function useLiveCount(target: number, active: boolean, duration = 1.8) {
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
      setVal(Math.round(target * (1 - Math.pow(1 - p, 4))));
      if (p < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [active, target, duration, reduceMotion]);

  return val;
}

function useLiveTicker(active: boolean) {
  const [n, setN] = useState(12847);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!active || reduceMotion) return;
    const id = setInterval(() => {
      setN((v) => v + Math.floor(Math.random() * 3) + 1);
    }, 2200);
    return () => clearInterval(id);
  }, [active, reduceMotion]);

  return n;
}

function HudMetricCard({
  metric,
  index,
  active,
}: {
  metric: MetricConfig;
  index: number;
  active: boolean;
}) {
  const count = useLiveCount(metric.target ?? 0, active && metric.kind !== "live");
  const ticker = useLiveTicker(active && metric.kind === "live");
  const reduceMotion = useReducedMotion();
  const Icon = metric.icon;

  const display =
    metric.kind === "currency"
      ? `${metric.prefix}${count}`
      : metric.kind === "hours"
        ? `${count}${metric.suffix ? ` ${metric.suffix}` : ""}`
        : metric.kind === "percent"
          ? `${count}${metric.suffix ?? ""}`
          : ticker.toLocaleString();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 24, scale: 0.96 }}
      animate={active ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="hud-panel group relative h-full rounded-2xl p-[1px]"
    >
      <div
        className={cn(
          "relative flex h-full min-h-[248px] flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-white bg-gradient-to-br px-4 py-5 dark:bg-transparent sm:min-h-[260px] sm:px-5 sm:py-6",
          metric.accent
        )}
      >
        <span className="hud-corner left-2 top-2 border-l-2 border-t-2" />
        <span className="hud-corner right-2 top-2 border-r-2 border-t-2" />
        <span className="hud-corner bottom-2 left-2 border-b-2 border-l-2" />
        <span className="hud-corner bottom-2 right-2 border-b-2 border-r-2" />

        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-indigo-400/40 to-transparent dark:via-cyan-400/60"
            animate={{ top: ["0%", "100%"] }}
            transition={{ duration: 3.2 + index * 0.4, repeat: Infinity, ease: "linear" }}
          />
        )}

        <div className="relative flex min-h-[4.5rem] items-start justify-between gap-2">
          <div className="flex min-w-0 flex-1 items-start gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:shadow-[0_0_20px_rgb(34_211_238/0.2)]">
              <Icon className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className={cn(SECTION_META, "text-indigo-600 dark:text-cyan-400/80")}>{metric.code}</p>
              <p className="mt-0.5 min-h-[2.5rem] line-clamp-2 text-[11px] font-bold uppercase leading-tight tracking-wider text-foreground dark:text-white/90">
                {metric.label}
              </p>
            </div>
          </div>

          {metric.kind === "live" ? (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded border border-emerald-300 bg-emerald-50 px-2 py-0.5 font-hud text-[9px] uppercase text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-300">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-400"
                animate={reduceMotion ? undefined : { opacity: [1, 0.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
              Live
            </span>
          ) : (
            <span className="h-6 w-[52px] shrink-0" aria-hidden="true" />
          )}
        </div>

        <motion.p
          key={display}
          className="relative mt-5 min-h-[3rem] font-grade text-4xl font-extrabold tabular-nums leading-none tracking-wide text-foreground dark:text-white sm:min-h-[3.25rem] sm:text-5xl"
          initial={reduceMotion ? false : { opacity: 0.5, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <span className="bg-gradient-to-r from-indigo-600 via-primary to-violet-600 bg-clip-text text-transparent dark:from-cyan-200 dark:via-white dark:to-violet-200">
            {display}
          </span>
        </motion.p>

        <p className={cn("relative mt-2 min-h-[2.25rem] line-clamp-2", SECTION_META)}>
          {metric.detail}
        </p>

        <div className="relative mt-auto flex gap-1 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-1 flex-1 rounded-full bg-indigo-500 dark:bg-cyan-400"
              animate={
                reduceMotion
                  ? undefined
                  : { opacity: [0.25, 1, 0.25] }
              }
              transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.12 + index * 0.08 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function HomeTrustMetrics() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <section
      ref={ref}
      className="relative overflow-hidden ai-strip py-12 sm:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(99_102_241/0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(99_102_241/0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 imaging-grid-overlay opacity-10 dark:opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <span className={cn("mb-3 block", SECTION_EYEBROW)}>
            System telemetry
          </span>
          <h2 className={cn(HEADING_DISPLAY, SECTION_TITLE)}>
            Real-Time Service Matrix
          </h2>
          <p className={cn("mx-auto mt-3 max-w-2xl", SECTION_META)}>
            Live grading infrastructure metrics · auto-indexed
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric, index) => (
            <HudMetricCard key={metric.code} metric={metric} index={index} active={inView} />
          ))}
        </div>
      </div>
    </section>
  );
}

export { HomeTrustMetrics };
