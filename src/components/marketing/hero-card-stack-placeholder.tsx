"use client";

import { useRef } from "react";
import Image from "next/image";
import { HERO_STACK_DESIGN } from "@/components/marketing/hero-card-stack-layout";
import { useHeroStackScale } from "@/components/marketing/use-hero-stack-scale";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";

function HeroCardStackPlaceholder({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scale, height } = useHeroStackScale(containerRef);

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
          <div className="absolute left-1/2 top-[52%] w-[175px] -translate-x-1/2 -translate-y-1/2">
            <div className="relative rounded-xl border border-indigo-400/35 bg-gradient-to-b from-slate-100 to-slate-200 p-2.5 shadow-[0_28px_64px_rgb(0_0_0/0.4)] dark:from-slate-800 dark:to-slate-900">
              <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-lg border border-white/15">
                <Image
                  src={sampleCardImages.front}
                  alt={sampleCardImages.frontAlt}
                  width={175}
                  height={245}
                  className="h-full w-full object-cover"
                  quality={65}
                  loading="lazy"
                  sizes="(max-width: 640px) 34vw, 175px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroCardStackPlaceholder };
