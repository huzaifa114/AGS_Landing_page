"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { ViewportMount } from "@/components/motion/viewport-mount";
import type { StandardHorizontalItem } from "@/components/marketing/standard-horizontal-section";

const StandardHorizontalSection = dynamic(
  () =>
    import("@/components/marketing/standard-horizontal-section").then(
      (m) => m.StandardHorizontalSection
    ),
  { ssr: false }
);

function DeferredStandardHorizontalSection({
  items,
  header,
  className,
}: {
  items: StandardHorizontalItem[];
  header?: ReactNode;
  className?: string;
}) {
  return (
    <ViewportMount fallback={<div className="min-h-[60vh]" aria-hidden />}>
      <StandardHorizontalSection items={items} header={header} className={className} />
    </ViewportMount>
  );
}

export { DeferredStandardHorizontalSection };
