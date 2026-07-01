"use client";

import dynamic from "next/dynamic";
import { IdleMount } from "@/components/motion/idle-mount";

const GlowingCardPair = dynamic(
  () => import("@/components/marketing/glowing-card-pair").then((m) => m.GlowingCardPair),
  { ssr: false }
);

function DeferredGlowingCardPair({ autoFlip }: { autoFlip?: boolean }) {
  return (
    <IdleMount
      fallback={
        <div className="aspect-[5/7] max-w-sm rounded-2xl bg-surface-muted/50" aria-hidden />
      }
      idleTimeoutMs={5500}
    >
      <GlowingCardPair autoFlip={autoFlip} />
    </IdleMount>
  );
}

export { DeferredGlowingCardPair };
