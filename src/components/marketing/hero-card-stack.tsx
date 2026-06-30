"use client";

import { useEffect } from "react";
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
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const closeRaw = useTransform(scrollY, [0, 280], [0, 1], { clamp: true });
  const closeT = useSpring(closeRaw, { stiffness: 85, damping: 22 });

  return (
    <div className={cn("relative mx-auto w-full max-w-xl", className)}>
      <motion.div
        className="pointer-events-none absolute left-1/2 top-[52%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/40 blur-sm"
        animate={reduceMotion ? undefined : { scale: [1, 1.8, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative mx-auto h-[400px] w-full sm:h-[440px]">
        {CARDS.map((card) => (
          <BloomCard key={`flower-${card.z}`} card={card} closeT={closeT} reduceMotion={!!reduceMotion} />
        ))}
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
    const from = BUD.rotate;
    const open = card.open.rotate;
    const closed = card.closed.rotate;
    const bloomed = lerp(from, open, t);
    return lerp(bloomed, closed, c as number);
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

  const scale = useTransform([bloom, closeT], ([b, c]) => {
    const t = (b as number) * (1 - (c as number));
    const bloomed = lerp(BUD.scale, card.open.scale, t);
    return lerp(bloomed, card.closed.scale, c as number);
  });

  const opacity = useTransform(bloom, [0, 0.2], [0, 1]);

  return (
    <motion.div
      className="absolute left-1/2 top-[52%] w-[160px] -translate-x-1/2 -translate-y-1/2 sm:w-[175px]"
      style={{ zIndex: card.z, rotate, x, y, scale, opacity }}
    >
      <div className="relative rounded-xl border border-indigo-400/35 bg-gradient-to-b from-slate-100 to-slate-200 p-2.5 shadow-[0_28px_64px_rgb(0_0_0/0.4)] dark:from-slate-800 dark:to-slate-900">
        <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-lg border border-white/15">
          <Image src={card.src} alt={card.alt} fill className="object-cover" sizes="175px" priority={!!card.grade} />
          <CardImagingOverlay active variant="hero" />
        </div>
        {card.grade && (
          <div className="absolute -bottom-2 left-1/2 flex h-7 min-w-[6rem] -translate-x-1/2 items-center justify-center gap-1 rounded-md bg-gradient-to-r from-indigo-600 to-violet-600 px-3 font-heading text-[10px] font-bold tracking-wider text-white">
            GRADE <span className="font-grade text-xs font-extrabold">{card.grade}</span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

export { HeroCardStack };
