"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { IdleMount } from "@/components/motion/idle-mount";
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
    <IdleMount
      fallback={<div className="min-h-[60vh]" aria-hidden />}
      idleTimeoutMs={6000}
    >
      <StandardHorizontalSection items={items} header={header} className={className} />
    </IdleMount>
  );
}

export { DeferredStandardHorizontalSection };
