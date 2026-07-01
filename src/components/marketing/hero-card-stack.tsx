"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { CardImagingOverlay } from "@/components/marketing/card-imaging-overlay";
import { HERO_STACK_DESIGN } from "@/components/marketing/hero-card-stack-layout";
import { useHeroStackScale } from "@/components/marketing/use-hero-stack-scale";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";

const BUD = { rotate: 0, x: 0, y: 0, scale: 0.35 };

const CARDS = [
  {
    src: sampleCardImages.front,
    alt: sampleCardImages.frontAlt,
    open: { rotate: 0, x: 0, y: -100, scale: 1.05 },
    closed: { rotate: -2, x: -6, y: -4, scale: 1 },
    grade: "9.0",
    z: 3,
    bloomDelay: 0,
  },
  {
    src: sampleCardImages.back,
    alt: sampleCardImages.backAlt,
    open: { rotate: -32, x: -112, y: 62, scale: 1.02 },
    closed: { rotate: -9, x: -12, y: 2, scale: 0.98 },
    grade: null,
    z: 1,
    bloomDelay: 0.14,
  },
  {
    src: sampleCardImages.front,
    alt: sampleCardImages.frontAlt,
    open: { rotate: 32, x: 112, y: 62, scale: 1.02 },
    closed: { rotate: 7, x: 10, y: 0, scale: 0.98 },
    grade: null,
    z: 2,
    bloomDelay: 0.28,
  },
] as const;

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function HeroCardStack({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scale, height } = useHeroStackScale(containerRef);
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const closeRaw = useTransform(scrollY, [0, 280], [0, 1], { clamp: true });
  const closeT = useSpring(closeRaw, { stiffness: 85, damping: 22 });

  return (
    <div
      ref={containerRef}
      className={cn("relative mx-auto w-full max-w-xl overflow-hidden px-1 sm:px-0", className)}
    >
      <div className="relative mx-auto w-full" style={{ height }}>
        <div
          className="absolute left-1/2 top-1/2 origin-center"
          style={{
            width: HERO_STACK_DESIGN.width,
            height: HERO_STACK_DESIGN.height,
            transform: `translate(-50%, -50%) scale(${scale})`,
          }}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[52%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/40 blur-sm"
            animate={
              reduceMotion ? undefined : { scale: [1, 1.8, 1], opacity: [0.5, 0.8, 0.5] }
            }
            transition={{ duration: 3, repeat: Infinity }}
          />

          <div className="relative h-full w-full">
            {CARDS.map((card) => (
              <BloomCard
                key={`flower-${card.z}`}
                card={card}
                closeT={closeT}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BloomCard({
  card,
  closeT,
  reduceMotion,
}: {
  card: (typeof CARDS)[number];
  closeT: ReturnType<typeof useSpring>;
  reduceMotion: boolean;
}) {
  const bloom = useMotionValue(reduceMotion ? 1 : 0);

  useEffect(() => {
    if (reduceMotion) return;
    const controls = animate(bloom, 1, {
      delay: card.bloomDelay,
      duration: 1.05,
      ease: [0.34, 1.45, 0.64, 1],
    });
    return () => controls.stop();
  }, [bloom, card.bloomDelay, reduceMotion]);

  const rotate = useTransform([bloom, closeT], ([b, c]) => {
    const t = (b as number) * (1 - (c as number));
    const bloomed = lerp(BUD.rotate, card.open.rotate, t);
    return lerp(bloomed, card.closed.rotate, c as number);
  });

  const x = useTransform([bloom, closeT], ([b, c]) => {
    const t = (b as number) * (1 - (c as number));
    const bloomed = lerp(BUD.x, card.open.x, t);
    return lerp(bloomed, card.closed.x, c as number);
  });

  const y = useTransform([bloom, closeT], ([b, c]) => {
    const t = (b as number) * (1 - (c as number));
    const bloomed = lerp(BUD.y, card.open.y, t);
    return lerp(bloomed, card.closed.y, c as number);
  });

  const cardScale = useTransform([bloom, closeT], ([b, c]) => {
    const t = (b as number) * (1 - (c as number));
    const bloomed = lerp(BUD.scale, card.open.scale, t);
    return lerp(bloomed, card.closed.scale, c as number);
  });

  const opacity = useTransform(bloom, [0, 0.2], [0, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-[52%] w-[175px] -translate-x-1/2 -translate-y-1/2"
      style={{ zIndex: card.z, rotate, x, y, scale: cardScale, opacity }}
    >
      <div className="relative rounded-xl border border-indigo-400/35 bg-gradient-to-b from-slate-100 to-slate-200 p-2 shadow-[0_28px_64px_rgb(0_0_0/0.4)] sm:p-2.5 dark:from-slate-800 dark:to-slate-900">
        <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-lg border border-white/15">
          <Image
            src={card.src}
            alt={card.alt}
            width={175}
            height={245}
            className="h-full w-full object-cover"
            quality={65}
            priority={!!card.grade}
            loading={card.grade ? "eager" : "lazy"}
            sizes="(max-width: 640px) 34vw, 175px"
          />
          <CardImagingOverlay active variant="hero" />
        </div>
        {card.grade && (
          <div className="absolute -bottom-2 left-1/2 flex h-6 min-w-[5.25rem] -translate-x-1/2 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-2.5 font-heading text-[9px] font-bold tracking-wider text-white sm:h-7 sm:min-w-[6rem] sm:px-3 sm:text-[10px]">
            GRADE{" "}
            <span className="font-grade text-[10px] font-extrabold sm:text-xs">{card.grade}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export { HeroCardStack };
