"use client";

import dynamic from "next/dynamic";
import { ViewportMount } from "@/components/motion/viewport-mount";
import { HomeTrustMetricsStatic } from "@/components/marketing/home-trust-metrics-static";

const HomeTrustMetrics = dynamic(
  () => import("@/components/marketing/home-trust-metrics").then((m) => m.HomeTrustMetrics),
  { ssr: false }
);

function DeferredHomeTrustMetrics() {
  return (
    <ViewportMount fallback={<HomeTrustMetricsStatic />}>
      <HomeTrustMetrics />
    </ViewportMount>
  );
}

export { DeferredHomeTrustMetrics };
