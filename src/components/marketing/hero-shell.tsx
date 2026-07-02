"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { AmbientHeroBackground } from "@/components/marketing/ambient-hero-background";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import {
  PAGE_LEAD,
  SECTION_EYEBROW,
  PAGE_HERO_H1,
} from "@/lib/typography";
import { formatPageHeroTitle } from "@/components/marketing/page-hero-title";

export interface HeroShellProps {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  children?: ReactNode;
  actions?: ReactNode;
  media?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

function HeroShell({
  eyebrow,
  title,
  description,
  children,
  actions,
  media,
  align = "left",
  className,
}: HeroShellProps) {
  const reduceMotion = useReducedMotion();
  const isCenter = align === "center";
  const ease = [0.22, 1, 0.36, 1] as const;

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease },
        };

  return (
    <section
      className={cn(
        "page-hero relative overflow-hidden",
        media
          ? "pt-5 pb-7 sm:pt-7 sm:pb-9 lg:pt-8 lg:pb-10"
          : "page-hero-compact pt-5 pb-3 sm:pt-7 sm:pb-4 lg:pt-8 lg:pb-5",
        className
      )}
    >
      <AmbientHeroBackground />

      <Container className="relative z-10">
        <div
          className={cn(
            "grid items-center gap-6 lg:grid-cols-2 lg:gap-8",
            isCenter && "lg:grid-cols-1 lg:text-center"
          )}
        >
          <div
            className={cn(
              "flex flex-col gap-3 sm:gap-4",
              isCenter && "mx-auto max-w-4xl items-center"
            )}
          >
            {eyebrow && (
              <motion.p
                {...fade(0)}
                className={cn(SECTION_EYEBROW)}
              >
                {eyebrow}
              </motion.p>
            )}
            <motion.h1
              {...fade(eyebrow ? 0.06 : 0)}
              className={cn(PAGE_HERO_H1, isCenter && "text-balance")}
            >
              {formatPageHeroTitle(title)}
            </motion.h1>
            {description && (
              <motion.p
                {...fade(eyebrow ? 0.12 : 0.08)}
                className={cn(
                  PAGE_LEAD,
                  "max-w-2xl",
                  isCenter && "mx-auto"
                )}
              >
                {description}
              </motion.p>
            )}
            {children}
            {actions && (
              <motion.div
                {...fade(0.18)}
                className={cn("flex flex-wrap gap-4 pt-1", isCenter && "justify-center")}
              >
                {actions}
              </motion.div>
            )}
          </div>
          {media && (
            <motion.div
              {...(reduceMotion
                ? {}
                : {
                    initial: { opacity: 0, y: 28, scale: 0.96 },
                    animate: { opacity: 1, y: 0, scale: 1 },
                    transition: { duration: 0.65, delay: 0.12, ease },
                  })}
              className={cn(isCenter && "mx-auto w-full max-w-2xl")}
            >
              {media}
            </motion.div>
          )}
        </div>
      </Container>
    </section>
  );
}

export { HeroShell };
