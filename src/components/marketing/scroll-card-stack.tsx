"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";

const CARDS = [
  { src: sampleCardImages.front, alt: sampleCardImages.frontAlt, label: "Front", grade: "9.0" },
  { src: sampleCardImages.back, alt: sampleCardImages.backAlt, label: "Back", grade: null },
  { src: sampleCardImages.front, alt: sampleCardImages.frontAlt, label: "Imaging", grade: null },
] as const;

function ScrollCardStack({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <div
      ref={ref}
      className={cn(
        "relative mx-auto flex h-[340px] w-full max-w-sm items-center justify-center sm:h-[380px]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_50%_50%,rgb(99_102_241/0.12),transparent_70%)]" />

      {CARDS.map((card, index) => (
        <ScrollStackCard
          key={card.label}
          card={card}
          index={index}
          total={CARDS.length}
          scrollYProgress={scrollYProgress}
          reduceMotion={!!reduceMotion}
        />
      ))}
    </div>
  );
}

function ScrollStackCard({
  card,
  index,
  total,
  scrollYProgress,
  reduceMotion,
}: {
  card: (typeof CARDS)[number];
  index: number;
  total: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  reduceMotion: boolean;
}) {
  const step = index / (total - 1);
  const baseRotate = (index - 1) * 8;

  const y = useTransform(
    scrollYProgress,
    [0, 0.3 + step * 0.2, 0.7 + step * 0.1, 1],
    reduceMotion
      ? [index * -12, index * -12, index * -12, index * -12]
      : [120 + index * 30, 40 - index * 14, -index * 12, -index * 14]
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    reduceMotion ? [baseRotate, baseRotate, baseRotate] : [baseRotate + 12, baseRotate, baseRotate - 2]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.4 + step * 0.15, 1],
    reduceMotion ? [1, 1, 1] : [0.85, 0.95 - index * 0.03, 1 - index * 0.04]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2 + step * 0.15, 0.45 + step * 0.2],
    reduceMotion ? [1, 1, 1] : [0, 0.5, 1]
  );

  return (
    <motion.div
      className="absolute w-[58%] max-w-[200px]"
      style={{
        zIndex: index + 1,
        y,
        rotate,
        scale,
        opacity,
      }}
    >
      <div
        className="absolute -inset-3 rounded-2xl blur-2xl"
        style={{
          background: `radial-gradient(circle, rgb(99 102 241 / ${0.25 - index * 0.05}), transparent 70%)`,
        }}
      />
      <div className="relative overflow-hidden rounded-xl border border-indigo-500/25 bg-surface shadow-[0_16px_48px_rgb(0_0_0/0.25),0_0_24px_rgb(99_102_241/0.2)]">
        <div className="relative aspect-[2.5/3.5]">
          <Image src={card.src} alt={card.alt} fill className="object-cover" sizes="200px" />
          {card.grade && (
            <div className="absolute right-2 top-2 rounded-md bg-indigo-600 px-2 py-0.5 text-[10px] font-bold text-white shadow-[0_0_12px_rgb(99_102_241/0.6)]">
              {card.grade}
            </div>
          )}
        </div>
        <p className="py-2 text-center text-[10px] font-bold uppercase tracking-wider text-muted">
          {card.label}
        </p>
      </div>
    </motion.div>
  );
}

export { ScrollCardStack };
