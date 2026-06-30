"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AmbientHeroBackground } from "@/components/marketing/ambient-hero-background";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";
import { cn } from "@/lib/utils";
import { HEADING_DISPLAY, PAGE_HERO_TITLE, PAGE_LEAD, BODY_MUTED } from "@/lib/typography";
import { formatPageHeroTitle } from "@/components/marketing/page-hero-title";

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
  const reduceMotion = useReducedMotion();

  const ease = [0.22, 1, 0.36, 1] as const;

  const fadeUp = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 32 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease },
        };

  return (
    <section className={cn("relative overflow-hidden section-md pb-4", className)}>
      <AmbientHeroBackground />

      <Container className="relative z-10">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-10">
          <div className="flex flex-col gap-4">
            <motion.h1
              {...fadeUp(0)}
              className={cn("max-w-3xl", HEADING_DISPLAY, PAGE_HERO_TITLE)}
            >
              {formatPageHeroTitle(title)}
            </motion.h1>

            {description && (
              <motion.p
                {...fadeUp(0.1)}
                className={cn("max-w-lg", PAGE_LEAD)}
              >
                {description}
              </motion.p>
            )}

            {subtext && (
              <motion.p {...fadeUp(0.16)} className={cn("max-w-lg", BODY_MUTED)}>
                {subtext}
              </motion.p>
            )}

            {trustBullets && <motion.div {...fadeUp(0.22)}>{trustBullets}</motion.div>}

            {(primaryCta || secondaryCta) && (
              <motion.div {...fadeUp(0.28)} className="flex flex-wrap gap-4 pt-2">
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
              </motion.div>
            )}
          </div>

          {media && (
            <motion.div
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 40, scale: 0.96 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.85, delay: 0.2, ease },
                  })}
              className="relative"
            >
              {!reduceMotion && (
                <motion.div
                  className="absolute -inset-6 rounded-3xl bg-primary/10 blur-2xl"
                  animate={{ opacity: [0.35, 0.55, 0.35] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
              <div className="relative">{media}</div>
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}

export { CinematicHero };
