"use client";

import { type ReactNode, useId, useLayoutEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { BODY_MUTED, SECTION_EYEBROW, SECTION_H2, SECTION_META } from "@/lib/typography";

export interface StandardPopup {
  label: string;
  className?: string;
}

export interface StandardHorizontalItem {
  title: string;
  description: string;
  eyebrow?: string;
  accent?: ReactNode;
  popups?: readonly StandardPopup[];
}

export interface StandardHorizontalSectionProps {
  items: StandardHorizontalItem[];
  header?: ReactNode;
  className?: string;
}

const SCROLL_VH_PER_CARD = 78;
const SCROLL_BASE_VH = 115;

function StandardHorizontalSection({
  items,
  header,
  className,
}: StandardHorizontalSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const scrollRange = useMotionValue(0);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const count = items.length;
  const sectionHeight = `${(count - 1) * SCROLL_VH_PER_CARD + SCROLL_BASE_VH}vh`;

  useLayoutEffect(() => {
    if (reduceMotion) return;

    let rafId = 0;
    const measure = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const track = trackRef.current;
        const viewport = viewportRef.current;
        if (!track || !viewport) return;
        scrollRange.set(Math.max(0, track.scrollWidth - viewport.clientWidth));
      });
    };

    measure();
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener("load", measure);
    };
  }, [count, reduceMotion, scrollRange]);

  const x = useTransform([scrollYProgress, scrollRange], ([progress, range]) => {
    return -(progress as number) * (range as number);
  });

  if (reduceMotion) {
    return (
      <section className={cn("bg-surface-muted py-12", className)}>
        {header && <div className="mx-auto max-w-3xl px-6 pb-8">{header}</div>}
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
          {items.map((item) => (
            <StandardCard key={item.title} item={item} active />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={cn("relative bg-surface-muted", className)}
      style={{ height: sectionHeight }}
    >
      <div className="sticky top-16 flex h-[min(700px,92vh)] w-full min-w-0 flex-col justify-center py-8 sm:top-20">
        {header && (
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6">
            {header}
          </div>
        )}

        <div ref={viewportRef} className="relative w-full min-w-0 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-12 bg-gradient-to-r from-surface-muted to-transparent sm:w-20"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-12 bg-gradient-to-l from-surface-muted to-transparent sm:w-20"
            aria-hidden="true"
          />

          <motion.div
            ref={trackRef}
            className="flex w-max gap-8 px-4 sm:gap-10 sm:px-6"
            style={{ x }}
          >
            {items.map((item, index) => (
              <StandardCardSlide
                key={item.title}
                item={item}
                index={index}
                count={count}
                progress={scrollYProgress}
              />
            ))}
          </motion.div>
        </div>

        <motion.div className="mx-auto mt-6 flex gap-2" aria-hidden="true">
          {items.map((item, index) => (
            <ScrollDot
              key={item.title}
              index={index}
              count={count}
              progress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ScrollDot({
  index,
  count,
  progress,
}: {
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / count;
  const center = index * segment + segment * 0.5;
  const width = useTransform(
    progress,
    [center - segment * 0.35, center, center + segment * 0.35],
    [6, 28, 6]
  );
  const opacity = useTransform(
    progress,
    [center - segment * 0.4, center, center + segment * 0.4],
    [0.35, 1, 0.35]
  );

  return (
    <motion.span
      className="block h-1.5 rounded-full bg-cyan-400/90 dark:bg-cyan-400"
      style={{ width, opacity }}
    />
  );
}

function StandardCardSlide({
  item,
  index,
  count,
  progress,
}: {
  item: StandardHorizontalItem;
  index: number;
  count: number;
  progress: MotionValue<number>;
}) {
  const segment = 1 / count;
  const enter = index * segment;
  const center = enter + segment * 0.5;
  const scale = useTransform(
    progress,
    [enter, center, enter + segment],
    [0.9, 1, 0.9]
  );
  const opacity = useTransform(
    progress,
    [enter, enter + segment * 0.12, enter + segment * 0.88, enter + segment],
    [0.5, 1, 1, 0.5]
  );

  return (
    <motion.div
      className="w-[min(94vw,700px)] shrink-0 snap-center"
      style={{ scale, opacity }}
    >
      <StandardCard item={item} progress={progress} index={index} count={count} />
    </motion.div>
  );
}

function StandardCard({
  item,
  progress,
  index,
  count,
  active = false,
}: {
  item: StandardHorizontalItem;
  progress?: MotionValue<number>;
  index?: number;
  count?: number;
  active?: boolean;
}) {
  const arrowIds = useId().replace(/:/g, "");
  const segment = count ? 1 / count : 1;
  const center = index !== undefined ? index * segment + segment * 0.5 : 0.5;

  return (
    <div className="relative flex items-stretch gap-0 pb-2 pt-4">
      {item.popups && item.popups.length > 0 && (
        <div className="relative flex w-[min(30vw,148px)] shrink-0 flex-col justify-center gap-8 py-6 pr-1 sm:w-40 sm:gap-10">
          {item.popups.map((popup, popupIndex) => (
            <PopupWithArrow
              key={popup.label}
              popup={popup}
              popupIndex={popupIndex}
              arrowIds={arrowIds}
              progress={progress}
              center={center}
              segment={segment}
              forceActive={active}
            />
          ))}
        </div>
      )}

      <div
        className={cn(
          "relative min-w-0 flex-1 overflow-hidden rounded-3xl border-2 p-7 sm:p-9",
          "border-indigo-200 bg-white text-foreground",
          "shadow-[0_16px_48px_rgb(99_102_241/0.14),0_0_48px_rgb(99_102_241/0.08)]",
          "dark:border-cyan-400/25 dark:bg-[#0c1018] dark:text-white",
          "dark:shadow-[0_24px_56px_rgb(0_0_0/0.45),0_0_64px_rgb(56_189_248/0.12)]"
        )}
      >
        <div className="pointer-events-none absolute inset-0 dark:hidden bg-[linear-gradient(135deg,rgb(238_242_255/0.9)_0%,transparent_50%)]" />
        <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_80%_0%,rgb(99_102_241/0.18),transparent_55%)]" />

        <div className="relative">
          {item.eyebrow && <p className={SECTION_EYEBROW}>{item.eyebrow}</p>}
          <h2 className={cn("mt-2", SECTION_H2)}>{item.title}</h2>
          <p className={cn("mt-3 max-w-xl", BODY_MUTED)}>{item.description}</p>
          {item.accent}
        </div>
      </div>
    </div>
  );
}

function CurlyArrow({
  arrowIds,
  variant,
  className,
}: {
  arrowIds: string;
  variant: "upper" | "lower";
  className?: string;
}) {
  const gradientId = `ww-arrow-grad-${arrowIds}`;
  const markerId = `ww-arrow-head-${arrowIds}`;

  const path =
    variant === "upper"
      ? "M4 4 C20 18, 36 8, 58 14 S96 22, 128 18"
      : "M4 32 C22 18, 40 26, 62 20 S98 12, 128 16";

  return (
    <svg
      viewBox="0 0 132 36"
      fill="none"
      aria-hidden="true"
      className={cn(
        "pointer-events-none relative mt-1 h-9 w-[min(24vw,118px)] overflow-visible sm:mt-1.5 sm:h-10 sm:w-32",
        className
      )}
    >
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgb(99 102 241)" stopOpacity="0.55" />
          <stop offset="55%" stopColor="rgb(56 189 248)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(139 92 246)" stopOpacity="0.85" />
        </linearGradient>
        <marker
          id={markerId}
          markerWidth="7"
          markerHeight="7"
          refX="6"
          refY="3.5"
          orient="auto"
        >
          <path
            d="M0 0 L7 3.5 L0 7 Z"
            className="fill-indigo-500 dark:fill-cyan-400"
          />
        </marker>
      </defs>
      <path
        d={path}
        stroke={`url(#${gradientId})`}
        strokeWidth="2"
        strokeLinecap="round"
        markerEnd={`url(#${markerId})`}
        className="drop-shadow-[0_0_6px_rgb(56_189_248/0.45)]"
      />
    </svg>
  );
}

function PopupWithArrow({
  popup,
  popupIndex,
  arrowIds,
  progress,
  center,
  segment,
  forceActive,
}: {
  popup: StandardPopup;
  popupIndex: number;
  arrowIds: string;
  progress?: MotionValue<number>;
  center: number;
  segment: number;
  forceActive?: boolean;
}) {
  const variant = popupIndex % 2 === 0 ? "upper" : "lower";
  const badgeClassName = cn(
    "relative z-20 inline-flex w-full max-w-[9.5rem] items-center justify-center rounded-full border px-3 py-2 text-center leading-tight",
    SECTION_META,
    "border-indigo-200 bg-white text-primary shadow-lg",
    "dark:border-cyan-400/40 dark:bg-[#121a33] dark:text-cyan-300 dark:shadow-[0_0_24px_rgb(56_189_248/0.25)]",
    popup.className
  );

  if (forceActive || !progress) {
    return (
      <div className="relative flex flex-col items-start">
        <span className={badgeClassName}>{popup.label}</span>
        <CurlyArrow arrowIds={`${arrowIds}-${popupIndex}`} variant={variant} />
      </div>
    );
  }

  return (
    <AnimatedPopupWithArrow
      label={popup.label}
      className={badgeClassName}
      arrowIds={`${arrowIds}-${popupIndex}`}
      variant={variant}
      popupIndex={popupIndex}
      progress={progress}
      center={center}
      segment={segment}
    />
  );
}

function AnimatedPopupWithArrow({
  label,
  className,
  arrowIds,
  variant,
  popupIndex,
  progress,
  center,
  segment,
}: {
  label: string;
  className: string;
  arrowIds: string;
  variant: "upper" | "lower";
  popupIndex: number;
  progress: MotionValue<number>;
  center: number;
  segment: number;
}) {
  const delay = popupIndex * 0.05;
  const popupScale = useTransform(
    progress,
    [
      center - segment * 0.44 + delay,
      center - segment * 0.12 + delay,
      center + segment * 0.12,
      center + segment * 0.44,
    ],
    [0, 1, 1, 0]
  );
  const popupY = useTransform(
    progress,
    [center - segment * 0.38 + delay, center, center + segment * 0.38],
    [12, 0, 12]
  );
  const popupOpacity = useTransform(
    progress,
    [
      center - segment * 0.4 + delay,
      center - segment * 0.14 + delay,
      center + segment * 0.14,
      center + segment * 0.4,
    ],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="relative flex flex-col items-start"
      style={{ scale: popupScale, y: popupY, opacity: popupOpacity }}
    >
      <span className={className}>{label}</span>
      <CurlyArrow arrowIds={arrowIds} variant={variant} />
    </motion.div>
  );
}

export { StandardHorizontalSection };
