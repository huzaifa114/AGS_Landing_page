"use client";

import { AmbientHeroBackground } from "@/components/marketing/ambient-hero-background";
import { IdleMount } from "@/components/motion/idle-mount";

/** Ambient canvas/gradient only — cards stay in hero grid (no absolute overlay). */
function HeroEnhancements() {
  return (
    <div className="hero-enhancements-active pointer-events-none absolute inset-0 z-[1]" aria-hidden="true">
      <AmbientHeroBackground />
    </div>
  );
}

function DeferredHeroEnhancements() {
  return (
    <IdleMount fallback={null} idleTimeoutMs={3500}>
      <HeroEnhancements />
    </IdleMount>
  );
}

export { DeferredHeroEnhancements };
