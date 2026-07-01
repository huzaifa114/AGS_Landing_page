"use client";

import { type ReactNode, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { AmbientHeroBackground } from "@/components/marketing/ambient-hero-background";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { PAGE_HERO_H1, PAGE_LEAD, BODY_MUTED } from "@/lib/typography";
import { formatPageHeroTitle } from "@/components/marketing/page-hero-title";

const HeroCardStack = dynamic(
  () => import("@/components/marketing/hero-card-stack").then((m) => m.HeroCardStack),
  { ssr: false }
);

function HeroLcpPlaceholder() {
  return (
    <div className="relative mx-auto h-[400px] w-full max-w-xl sm:h-[440px]">
      <div className="absolute left-1/2 top-[52%] w-[160px] -translate-x-1/2 -translate-y-1/2 sm:w-[175px]">
        <div className="relative rounded-xl border border-indigo-400/35 bg-gradient-to-b from-slate-100 to-slate-200 p-2.5 shadow-[0_28px_64px_rgb(0_0_0/0.4)] dark:from-slate-800 dark:to-slate-900">
          <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-lg border border-white/15">
            <Image
              src={sampleCardImages.front}
              alt={sampleCardImages.frontAlt}
              width={175}
              height={245}
              className="h-full w-full object-cover"
              quality={65}
              priority
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function DeferredHeroMedia({ fallback }: { fallback: ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let idleId = 0;
    let timeoutId = 0;
    let observer: MutationObserver | null = null;

    const run = () => {
      if (typeof window.requestIdleCallback === "function") {
        idleId = window.requestIdleCallback(() => setReady(true), { timeout: 4200 });
      } else {
        timeoutId = window.setTimeout(() => setReady(true), 400);
      }
    };

    if (document.documentElement.dataset.loaderDone === "true") {
      run();
    } else {
      observer = new MutationObserver(() => {
        if (document.documentElement.dataset.loaderDone === "true") {
          observer?.disconnect();
          observer = null;
          run();
        }
      });
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["data-loader-done"],
      });
    }

    return () => {
      observer?.disconnect();
      if (idleId) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };
  }, []);

  return ready ? <HeroCardStack /> : fallback;
}

export interface CinematicHeroProps {
  title: ReactNode;
  description?: string;
  subtext?: string;
  trustBullets?: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  media?: ReactNode;
  className?: string;
}

function CinematicHero({
  title,
  description,
  subtext,
  trustBullets,
  primaryCta,
  secondaryCta,
  media,
  className,
}: CinematicHeroProps) {
  const heroMedia = media ?? <DeferredHeroMedia fallback={<HeroLcpPlaceholder />} />;

  return (
    <section className={cn("relative overflow-hidden section-md pb-4", className)}>
      <AmbientHeroBackground />

      <Container className="relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-4">
            <h1 className={cn("max-w-3xl", PAGE_HERO_H1)}>
              {formatPageHeroTitle(title)}
            </h1>

            {(description || subtext) && (
              <div className="flex max-w-lg flex-col gap-1">
                {description && <p className={PAGE_LEAD}>{description}</p>}
                {subtext && <p className={BODY_MUTED}>{subtext}</p>}
              </div>
            )}

            {trustBullets && (
              <div className="motion-safe:animate-[fade-up_0.5s_ease-out_0.08s_both]">
                {trustBullets}
              </div>
            )}

            {(primaryCta || secondaryCta) && (
              <div className="flex flex-wrap gap-4 pt-2 motion-safe:animate-[fade-up_0.5s_ease-out_0.12s_both]">
                {primaryCta && (
                  <PremiumButton href={primaryCta.href}>
                    {primaryCta.label}
                  </PremiumButton>
                )}
                {secondaryCta && (
                  <PremiumButton href={secondaryCta.href} variant="outline">
                    {secondaryCta.label}
                  </PremiumButton>
                )}
              </div>
            )}
          </div>

          <div className="relative motion-safe:animate-[fade-up_0.55s_ease-out_0.1s_both]">
            <div
              className="pointer-events-none absolute -inset-6 rounded-3xl bg-primary/10 opacity-50 blur-2xl motion-safe:animate-pulse"
              aria-hidden="true"
            />
            <div className="relative">{heroMedia}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export { CinematicHero };
