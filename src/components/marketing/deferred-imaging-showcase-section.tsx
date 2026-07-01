"use client";

import dynamic from "next/dynamic";
import { IdleMount } from "@/components/motion/idle-mount";

const ImagingShowcaseSection = dynamic(
  () =>
    import("@/components/marketing/imaging-showcase-section").then(
      (m) => m.ImagingShowcaseSection
    ),
  { ssr: false }
);

function DeferredImagingShowcaseSection() {
  return (
    <IdleMount
      fallback={<div className="min-h-[50vh]" aria-hidden />}
      idleTimeoutMs={6500}
    >
      <ImagingShowcaseSection />
    </IdleMount>
  );
}

export { DeferredImagingShowcaseSection };
