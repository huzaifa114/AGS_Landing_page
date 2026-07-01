"use client";

import dynamic from "next/dynamic";
import { IdleMount } from "@/components/motion/idle-mount";

const ScrollProgress = dynamic(
  () => import("@/components/motion/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false }
);

function DeferredScrollProgress() {
  return (
    <IdleMount fallback={null} idleTimeoutMs={5000}>
      <ScrollProgress />
    </IdleMount>
  );
}

export { DeferredScrollProgress };
