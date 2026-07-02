"use client";

import dynamic from "next/dynamic";
import { type ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { InteractionMount } from "@/components/motion/interaction-mount";

const ScrollProgress = dynamic(
  () => import("@/components/motion/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false }
);

const SiteFooter = dynamic(
  () => import("@/components/layout/site-footer").then((m) => m.SiteFooter),
  { loading: () => <div className="min-h-[28rem]" aria-hidden /> }
);

function MarketingPage({ children }: { children: ReactNode }) {
  return (
    <>
      <InteractionMount fallback={null}>
        <ScrollProgress />
      </InteractionMount>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </>
  );
}

export { MarketingPage };
