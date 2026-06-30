"use client";

import { type ReactNode, useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";

export interface StickyStackItem {
  title: string;
  description: string;
  eyebrow?: string;
  accent?: ReactNode;
}

export interface StickyStackSectionProps {
  items: StickyStackItem[];
  header?: ReactNode;
  className?: string;
}

function StickyStackSection({ items, header, className }: StickyStackSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const count = items.length;
  const sectionHeight = `${(count - 1) * 48 + 38}vh`;

  if (reduceMotion) {
    return (
      <section className={cn("bg-surface-muted py-12", className)}>
        {header && <div className="mx-auto max-w-3xl px-6 pb-6">{header}</div>}
        <div className="mx-auto max-w-3xl space-y-5 px-6">
          {items.map((item) => (
            <div
              key={item.title}
              className="relative overflow-hidden rounded-3xl border-2 border-indigo-200 bg-white p-8 shadow-[0_12px_40px_rgb(99_102_241/0.1)] dark:border-indigo-500/25 dark:bg-[#0c1018] dark:shadow-[0_28px_64px_rgb(0_0_0/0.42)]"
            >
              <span className="hud-corner left-3 top-3 border-l-2 border-t-2" aria-hidden="true" />
              <span className="hud-corner right-3 top-3 border-r-2 border-t-2" aria-hidden="true" />
              {item.eyebrow && (
                <p className="font-hud text-caption font-bold uppercase tracking-[0.2em] text-primary dark:text-cyan-400">
                  {item.eyebrow}
                </p>
              )}
              <h2 className="mt-2 font-heading text-h1 font-extrabold text-foreground dark:text-white">{item.title}</h2>
              <p className="mt-3 text-h4 text-muted-foreground dark:text-slate-400 leading-relaxed">{item.description}</p>
              {item.accent}
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={cn("relative bg-surface-muted pb-4", className)}
      style={{ height: sectionHeight }}
    >
      {header && (
        <div className="relative z-10 mx-auto max-w-3xl px-4 pb-3 pt-6 sm:px-6 sm:pt-8">
          {header}
        </div>
      )}

      <div className="sticky top-20 flex h-[min(420px,58vh)] items-start justify-center px-4 sm:px-6">
        <div className="relative mx-auto h-full w-full max-w-3xl">
          {items.map((item, index) => (
            <StickyStackPanel
              key={item.title}
              item={item}
              index={index}
              count={count}
              progress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function StickyStackPanel({
  item,
  index,
  count,
  progress,
}: {
  item: StickyStackItem;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / count;
  const isLast = index === count - 1;
  const enterStart = index * segment;
  const fadeInEnd = enterStart + segment * 0.08;
  const hideStart = isLast ? 1.1 : (index + 1) * segment + segment * 0.12;
  const hideEnd = hideStart + 0.04;
  const stackTop = index * 22;

  const y = useTransform(
    progress,
    [enterStart, enterStart + segment * 0.55],
    index === 0 ? ["0px", "0px"] : ["65%", `${stackTop}px`]
  );

  const opacityInput =
    index === 0
      ? isLast
        ? [0, 1]
        : [0, hideStart, hideEnd]
      : isLast
        ? [enterStart, fadeInEnd, 1]
        : [enterStart, fadeInEnd, hideStart, hideEnd];

  const opacityOutput =
    index === 0
      ? isLast
        ? [1, 1]
        : [1, 1, 0]
      : isLast
        ? [0, 1, 1]
        : [0, 1, 1, 0];

  const opacity = useTransform(progress, opacityInput, opacityOutput);

  const scale = useTransform(
    progress,
    index === 0 ? [0, hideStart] : [fadeInEnd, hideStart],
    [1, isLast ? 1 : 0.98]
  );

  return (
    <motion.div
      className="absolute inset-x-0 top-0"
      style={{ zIndex: index + 1, y, opacity, scale }}
    >
      <div className="relative overflow-hidden rounded-3xl border-2 border-indigo-200 bg-white p-7 text-foreground shadow-[0_16px_48px_rgb(99_102_241/0.14)] dark:border-indigo-500/25 dark:bg-[#0c1018] dark:text-white dark:shadow-[0_28px_64px_rgb(0_0_0/0.42)] sm:p-9">
        <div className="pointer-events-none absolute inset-0 dark:hidden bg-[linear-gradient(135deg,rgb(238_242_255/0.9)_0%,transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_80%_0%,rgb(99_102_241/0.18),transparent_55%)]" />
        <span className="hud-corner left-3 top-3 border-l-2 border-t-2" aria-hidden="true" />
        <span className="hud-corner right-3 top-3 border-r-2 border-t-2" aria-hidden="true" />
        <div className="relative">
          {item.eyebrow && (
            <p className="font-hud text-caption font-bold uppercase tracking-[0.2em] text-primary dark:text-cyan-400">
              {item.eyebrow}
            </p>
          )}
          <h2 className="mt-2 font-heading text-h1 font-extrabold tracking-tight text-foreground dark:text-white sm:text-display-lg">
            {item.title}
          </h2>
          <p className="mt-3 max-w-xl text-body-sm font-normal leading-relaxed text-muted-foreground dark:text-slate-400">
            {item.description}
          </p>
          {item.accent}
        </div>
      </div>
    </motion.div>
  );
}

export { StickyStackSection };
