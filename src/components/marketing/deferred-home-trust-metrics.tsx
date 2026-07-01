"use client";

import dynamic from "next/dynamic";
import { IdleMount } from "@/components/motion/idle-mount";
import { HomeTrustMetricsStatic } from "@/components/marketing/home-trust-metrics-static";

const HomeTrustMetrics = dynamic(
  () => import("@/components/marketing/home-trust-metrics").then((m) => m.HomeTrustMetrics),
  { ssr: false }
);

function DeferredHomeTrustMetrics() {
  return (
    <IdleMount fallback={<HomeTrustMetricsStatic />} idleTimeoutMs={5000}>
      <HomeTrustMetrics />
    </IdleMount>
  );
}

export { DeferredHomeTrustMetrics };
