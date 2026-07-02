"use client";

import dynamic from "next/dynamic";
import { InteractionMount } from "@/components/motion/interaction-mount";

const AmbientMotionCanvas = dynamic(
  () =>
    import("@/components/marketing/ambient-motion-canvas").then(
      (m) => m.AmbientMotionCanvas
    ),
  { ssr: false }
);

/**
 * Adds only the ambient particle canvas on top of the hero. The CSS orbs, mesh
 * and gradients are already rendered statically by CinematicHeroStatic, so we
 * intentionally do NOT duplicate them here.
 */
function DeferredHeroEnhancements() {
  return (
    <InteractionMount fallback={null}>
      <div
        className="hero-enhancements-active pointer-events-none absolute inset-0 z-[1] overflow-hidden"
        aria-hidden="true"
      >
        <AmbientMotionCanvas />
      </div>
    </InteractionMount>
  );
}

export { DeferredHeroEnhancements };
