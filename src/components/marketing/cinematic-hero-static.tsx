import Link from "next/link";
import { type ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { HeroMediaCell } from "@/components/marketing/hero-media-cell";
import { cn } from "@/lib/utils";
import { PAGE_HERO_H1, PAGE_LEAD, BODY_MUTED } from "@/lib/typography";
import { formatPageHeroTitle } from "@/components/marketing/page-hero-title";

export interface CinematicHeroStaticProps {
  title: ReactNode;
  description?: string;
  subtext?: string;
  trustBullets?: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  className?: string;
}

function CinematicHeroStatic({
  title,
  description,
  subtext,
  trustBullets,
  primaryCta,
  secondaryCta,
  className,
}: CinematicHeroStaticProps) {
  return (
    <section
      id="home-hero"
      className={cn("relative overflow-hidden section-md pb-6 sm:pb-8 lg:pb-4", className)}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="ambient-mesh absolute inset-0" />
        <div className="ambient-orb ambient-orb-a absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/20" />
        <div className="ambient-orb ambient-orb-b absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-500/15" />
        <div className="ambient-orb ambient-orb-c absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/10" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/82 via-white/68 to-white/94 dark:from-[#070b1a]/88 dark:via-[#070b1a]/78 dark:to-[#070b1a]/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.14),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.18),transparent_55%)]" />
        <div className="absolute inset-0 imaging-grid-overlay opacity-[0.04] dark:opacity-[0.07]" />
      </div>

      <Container className="relative z-10">
        <div className="grid items-start gap-8 sm:gap-10 lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="relative z-20 flex flex-col gap-4">
            <h1 className={cn("max-w-3xl", PAGE_HERO_H1)}>
              {formatPageHeroTitle(title)}
            </h1>

            {(description || subtext) && (
              <div className="flex max-w-lg flex-col gap-1">
                {description && <p className={PAGE_LEAD}>{description}</p>}
                {subtext && <p className={BODY_MUTED}>{subtext}</p>}
              </div>
            )}

            {trustBullets}

            {(primaryCta || secondaryCta) && (
              <div className="relative z-20 flex flex-wrap gap-3 pt-2 sm:gap-4">
                {primaryCta && (
                  <Link
                    href={primaryCta.href}
                    className={cn(
                      buttonVariants({ variant: "primary", size: "md" }),
                      "text-white shadow-[0_4px_20px_rgb(99_102_241/0.35)]"
                    )}
                  >
                    {primaryCta.label}
                  </Link>
                )}
                {secondaryCta && (
                  <Link
                    href={secondaryCta.href}
                    className={buttonVariants({ variant: "outline", size: "md" })}
                  >
                    {secondaryCta.label}
                  </Link>
                )}
              </div>
            )}
          </div>

          <div className="hero-static-card relative z-10 mt-4 min-w-0 w-full sm:mt-6 lg:mt-0">
            <div
              className="pointer-events-none absolute -inset-4 rounded-3xl bg-primary/10 opacity-50 blur-2xl sm:-inset-6"
              aria-hidden="true"
            />
            <HeroMediaCell />
          </div>
        </div>
      </Container>
    </section>
  );
}

export { CinematicHeroStatic };
