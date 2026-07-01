"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { CardImagingOverlay } from "@/components/marketing/card-imaging-overlay";
import { sampleCardImages, showcaseCardSets, type ShowcaseCardSet } from "@/data/site-content";
import { cn } from "@/lib/utils";

export interface GlowingCardPairProps {
  grade?: string;
  className?: string;
  autoFlip?: boolean;
}

const FLIPS_PER_SET = 2;

const FLIP_STATUS = [
  { front: "OPTICAL SCAN · PLAYER INDEX LOCKED", back: "REVERSE CAPTURE · CERT ID VERIFIED" },
  { front: "SURFACE MAP · MICRON RESOLUTION", back: "SERIAL TRACE · AUTHENTICITY CHECK" },
  { front: "CENTERING LOCK · EDGE PROFILE", back: "BACK PRINT · HOLO VALIDATION" },
];

function FlipCard({
  initialFront,
  flipPhase,
  cardSet,
}: {
  initialFront: boolean;
  flipPhase: number;
  cardSet: ShowcaseCardSet;
}) {
  const showFront = initialFront ? flipPhase % 2 === 0 : flipPhase % 2 === 1;

  return (
    <div className="relative aspect-[2.5/3.5]" style={{ perspective: 1200 }}>
      <motion.div
        className="relative h-full w-full"
        animate={{ rotateY: showFront ? 0 : 180 }}
        transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: "preserve-3d" }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-indigo-500/30 shadow-[0_0_28px_rgb(99_102_241/0.25)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Image
            key={`${cardSet.id}-front`}
            src={cardSet.front}
            alt={cardSet.frontAlt}
            fill
            className="object-cover"
            sizes="200px"
          />
          <CardImagingOverlay active variant="pair" />
          <div className="absolute right-2 top-2">
            <Badge variant="premium" className="font-grade font-extrabold">
              {cardSet.grade}
            </Badge>
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent" />
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-xl border border-violet-500/30 shadow-[0_0_28px_rgb(139_92_246/0.25)]"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <Image
            key={`${cardSet.id}-back`}
            src={cardSet.back}
            alt={cardSet.backAlt}
            fill
            className="object-cover"
            sizes="200px"
          />
          <CardImagingOverlay active variant="pair" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-violet-950/40 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

function GlowingCardPair({ grade = "9.0", className, autoFlip = false }: GlowingCardPairProps) {
  const reduceMotion = useReducedMotion();
  const [flipPhase, setFlipPhase] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  useEffect(() => {
    if (!autoFlip || reduceMotion) return;
    const id = setInterval(() => {
      setFlipPhase((p) => p + 1);
      setStatusIndex((i) => (i + 1) % FLIP_STATUS.length);
    }, 4000);
    return () => clearInterval(id);
  }, [autoFlip, reduceMotion]);

  const cardSetIndex = Math.floor(flipPhase / FLIPS_PER_SET) % showcaseCardSets.length;
  const cardSet = showcaseCardSets[cardSetIndex];
  const status = FLIP_STATUS[statusIndex];
  const leftShowingFront = flipPhase % 2 === 0;
  const rightShowingFront = flipPhase % 2 === 1;

  return (
    <div className={cn("relative", className)}>
      <motion.div
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse_at_50%_50%,rgb(99_102_241/0.25),transparent_70%)]"
        animate={reduceMotion ? undefined : { opacity: [0.4, 0.8, 0.4], scale: [1, 1.04, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative overflow-hidden rounded-2xl ai-console p-5 shadow-lg dark:shadow-[0_24px_64px_rgb(0_0_0/0.35)]">
        <div className="pointer-events-none absolute inset-0 imaging-grid-overlay opacity-40" />

        <div className="relative grid grid-cols-2 gap-4">
          {autoFlip ? (
            <>
              <div>
                <FlipCard
                  initialFront={true}
                  flipPhase={flipPhase}
                  cardSet={cardSet}
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`l-${cardSet.id}-${leftShowingFront ? "f" : "b"}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-center font-hud text-[10px] uppercase tracking-wider text-cyan-300"
                  >
                    {leftShowingFront ? `Front · ${cardSet.label}` : `Back · ${cardSet.label}`}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div>
                <FlipCard
                  initialFront={false}
                  flipPhase={flipPhase}
                  cardSet={cardSet}
                />
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`r-${cardSet.id}-${rightShowingFront ? "f" : "b"}`}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 text-center font-hud text-[10px] uppercase tracking-wider text-violet-300"
                  >
                    {rightShowingFront ? `Front · ${cardSet.label}` : `Back · ${cardSet.label}`}
                  </motion.p>
                </AnimatePresence>
              </div>
            </>
          ) : (
            (
              [
                { side: "front" as const, src: sampleCardImages.front, alt: sampleCardImages.frontAlt, label: "Front" },
                { side: "back" as const, src: sampleCardImages.back, alt: sampleCardImages.backAlt, label: "Back" },
              ] as const
            ).map((face, i) => (
              <motion.div
                key={face.side}
                initial={reduceMotion ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <motion.div
                  animate={
                    reduceMotion
                      ? undefined
                      : {
                          y: [0, i === 0 ? -6 : 6, 0],
                          boxShadow: [
                            "0 0 20px rgb(99 102 241 / 0.2)",
                            "0 0 36px rgb(99 102 241 / 0.45)",
                            "0 0 20px rgb(99 102 241 / 0.2)",
                          ],
                        }
                  }
                  transition={{
                    duration: 3 + i * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.3,
                  }}
                  className="relative aspect-[2.5/3.5] overflow-hidden rounded-xl border border-indigo-500/30"
                >
                  <Image
                    src={face.src}
                    alt={face.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 160px, 200px"
                    quality={65}
                  />
                  <CardImagingOverlay active variant="pair" />
                  {face.side === "front" && (
                    <div className="absolute right-2 top-2">
                      <Badge variant="premium" className="font-grade font-extrabold">
                        {grade}
                      </Badge>
                    </div>
                  )}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-indigo-950/40 to-transparent" />
                </motion.div>
                <p className="mt-2 text-center font-hud text-[10px] uppercase tracking-wider text-indigo-300">
                  {face.label}
                </p>
              </motion.div>
            ))
          )}
        </div>

        {autoFlip && (
          <AnimatePresence mode="wait">
            <motion.p
              key={`${cardSet.id}-${statusIndex}-${flipPhase % 2}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="relative mt-4 text-center font-hud text-[11px] uppercase tracking-[0.16em] text-indigo-300/90"
            >
              {cardSet.label} · Grade {cardSet.grade} ·{" "}
              {leftShowingFront ? status.front : status.back}
            </motion.p>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

export { GlowingCardPair };
