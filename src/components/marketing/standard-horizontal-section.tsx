"use client";

import { type ReactNode, useLayoutEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { BODY_MUTED, HEADING_DISPLAY, SECTION_EYEBROW, SECTION_TITLE } from "@/lib/typography";

export interface StandardPopup {
  label: string;
  className?: string;
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right";
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

const POPUP_POSITION: Record<StandardPopup["position"], string> = {
  "top-left": "-top-3 left-4 sm:-top-4 sm:left-6",
  "top-right": "-top-3 right-4 sm:-top-4 sm:right-6",
  "bottom-left": "-bottom-3 left-4 sm:-bottom-4 sm:left-6",
  "bottom-right": "-bottom-3 right-4 sm:-bottom-4 sm:right-6",
};

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
  const sectionHeight = `${(count - 1) * 50 + 100}vh`;

  useLayoutEffect(() => {
    if (reduceMotion) return;

    const measure = () => {
      const track = trackRef.current;
      const viewport = viewportRef.current;
      if (!track || !viewport) return;
      scrollRange.set(Math.max(0, track.scrollWidth - viewport.clientWidth));
    };

    measure();
    const raf = requestAnimationFrame(measure);
    const observer = new ResizeObserver(measure);
    if (trackRef.current) observer.observe(trackRef.current);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener("load", measure);
    return () => {
      cancelAnimationFrame(raf);
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
        <div className="flex gap-5 overflow-x-auto px-6 pb-4 snap-x snap-mandatory">
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
      <div className="sticky top-16 flex h-[min(640px,88vh)] w-full min-w-0 flex-col justify-center py-8 sm:top-20">
        {header && (
          <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pb-6 sm:px-6">
            {header}
          </div>
        )}

        <div ref={viewportRef} className="relative w-full min-w-0 overflow-hidden">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 bg-gradient-to-r from-surface-muted to-transparent sm:w-24"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 bg-gradient-to-l from-surface-muted to-transparent sm:w-24"
            aria-hidden="true"
          />

          <motion.div
            ref={trackRef}
            className="flex w-max gap-5 px-4 sm:gap-6 sm:px-6"
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

        <motion.div
          className="mx-auto mt-6 flex gap-2"
          aria-hidden="true"
        >
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
    [0.92, 1, 0.92]
  );
  const opacity = useTransform(
    progress,
    [enter, enter + segment * 0.15, enter + segment * 0.85, enter + segment],
    [0.55, 1, 1, 0.55]
  );

  return (
    <motion.div
      className="w-[min(82vw,520px)] shrink-0 snap-center"
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
  const segment = count ? 1 / count : 1;
  const center = index !== undefined ? index * segment + segment * 0.5 : 0.5;

  return (
    <div className="relative pt-6 pb-4">
      {item.popups?.map((popup, popupIndex) => (
        <PopupBadge
          key={popup.label}
          popup={popup}
          popupIndex={popupIndex}
          progress={progress}
          center={center}
          segment={segment}
          forceActive={active}
        />
      ))}

      <div
        className={cn(
          "relative overflow-hidden rounded-3xl border-2 p-7 sm:p-9",
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
          <h2 className={cn("mt-2", HEADING_DISPLAY, SECTION_TITLE)}>{item.title}</h2>
          <p className={cn("mt-3 max-w-xl", BODY_MUTED)}>{item.description}</p>
          {item.accent}
        </div>
      </div>
    </div>
  );
}

function PopupBadge({
  popup,
  popupIndex,
  progress,
  center,
  segment,
  forceActive,
}: {
  popup: StandardPopup;
  popupIndex: number;
  progress?: MotionValue<number>;
  center: number;
  segment: number;
  forceActive?: boolean;
}) {
  if (forceActive || !progress) {
    return (
      <span
        className={cn(
          "absolute z-30 rounded-full border px-3 py-1.5 font-hud text-[10px] uppercase tracking-wider",
          "border-indigo-200 bg-white text-primary shadow-lg",
          "dark:border-cyan-400/40 dark:bg-[#121a33] dark:text-cyan-300 dark:shadow-[0_0_24px_rgb(56_189_248/0.25)]",
          POPUP_POSITION[popup.position],
          popup.className
        )}
      >
        {popup.label}
      </span>
    );
  }

  const delay = popupIndex * 0.04;
  const popupScale = useTransform(
    progress,
    [
      center - segment * 0.42 + delay,
      center - segment * 0.1 + delay,
      center + segment * 0.1,
      center + segment * 0.42,
    ],
    [0, 1, 1, 0]
  );
  const popupY = useTransform(
    progress,
    [center - segment * 0.35 + delay, center, center + segment * 0.35],
    [14, 0, 14]
  );
  const popupOpacity = useTransform(
    progress,
    [
      center - segment * 0.38 + delay,
      center - segment * 0.12 + delay,
      center + segment * 0.12,
      center + segment * 0.38,
    ],
    [0, 1, 1, 0]
  );

  return (
    <motion.span
      className={cn(
        "absolute z-30 rounded-full border px-3 py-1.5 font-hud text-[10px] uppercase tracking-wider",
        "border-indigo-200 bg-white text-primary shadow-lg",
        "dark:border-cyan-400/40 dark:bg-[#121a33] dark:text-cyan-300 dark:shadow-[0_0_24px_rgb(56_189_248/0.25)]",
        POPUP_POSITION[popup.position],
        popup.className
      )}
      style={{ scale: popupScale, y: popupY, opacity: popupOpacity }}
    >
      {popup.label}
    </motion.span>
  );
}

export { StandardHorizontalSection };
