"use client";

import dynamic from "next/dynamic";
import { ViewportMount } from "@/components/motion/viewport-mount";

const GlowingCardPair = dynamic(
  () => import("@/components/marketing/glowing-card-pair").then((m) => m.GlowingCardPair),
  { ssr: false }
);

function DeferredGlowingCardPair({ autoFlip }: { autoFlip?: boolean }) {
  return (
    <ViewportMount
      fallback={
        <div className="aspect-[5/7] max-w-sm rounded-2xl bg-surface-muted/50" aria-hidden />
      }
    >
      <GlowingCardPair autoFlip={autoFlip} />
    </ViewportMount>
  );
}

export { DeferredGlowingCardPair };
