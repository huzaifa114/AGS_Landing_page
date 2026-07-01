"use client";

import dynamic from "next/dynamic";
import { IdleMount } from "@/components/motion/idle-mount";

const SiteFooter = dynamic(
  () => import("@/components/layout/site-footer").then((m) => m.SiteFooter),
  { loading: () => <div className="min-h-[28rem]" aria-hidden /> }
);

function DeferredSiteFooter() {
  return (
    <IdleMount
      fallback={<div className="min-h-[28rem]" aria-hidden />}
      idleTimeoutMs={2000}
    >
      <SiteFooter />
    </IdleMount>
  );
}

export { DeferredSiteFooter };
