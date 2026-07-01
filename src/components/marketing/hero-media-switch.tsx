"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { IdleMount } from "@/components/motion/idle-mount";

const HeroCardStackLazy = dynamic(
  () => import("@/components/marketing/hero-card-stack-lazy").then((m) => m.HeroCardStackLazy),
  { ssr: false }
);

function HeroMediaSwitch({ placeholder }: { placeholder: ReactNode }) {
  return (
    <IdleMount fallback={placeholder} idleTimeoutMs={6000}>
      <HeroCardStackLazy />
    </IdleMount>
  );
}

export { HeroMediaSwitch };
