"use client";

import dynamic from "next/dynamic";
import { ViewportMount } from "@/components/motion/viewport-mount";

const ImagingShowcaseSection = dynamic(
  () =>
    import("@/components/marketing/imaging-showcase-section").then(
      (m) => m.ImagingShowcaseSection
    ),
  { ssr: false }
);

function DeferredImagingShowcaseSection() {
  return (
    <ViewportMount fallback={<div className="min-h-[50vh]" aria-hidden />}>
      <ImagingShowcaseSection />
    </ViewportMount>
  );
}

export { DeferredImagingShowcaseSection };
