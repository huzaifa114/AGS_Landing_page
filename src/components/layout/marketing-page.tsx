import { type ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { DeferredSiteFooter } from "@/components/layout/deferred-site-footer";
import { DeferredScrollProgress } from "@/components/motion/deferred-scroll-progress";

function MarketingPage({ children }: { children: ReactNode }) {
  return (
    <>
      <DeferredScrollProgress />
      <SiteHeader />
      <main>{children}</main>
      <DeferredSiteFooter />
    </>
  );
}

export { MarketingPage };
