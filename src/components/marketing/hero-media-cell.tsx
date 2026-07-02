"use client";

import dynamic from "next/dynamic";
import { HeroCardStackPlaceholder } from "@/components/marketing/hero-card-stack-placeholder";
import { InteractionMount } from "@/components/motion/interaction-mount";

const HeroCardStack = dynamic(
  () => import("@/components/marketing/hero-card-stack").then((m) => m.HeroCardStack),
  { ssr: false }
);

function HeroMediaCell() {
  return (
    <InteractionMount fallback={<HeroCardStackPlaceholder />}>
      <HeroCardStack />
    </InteractionMount>
  );
}

export { HeroMediaCell };
