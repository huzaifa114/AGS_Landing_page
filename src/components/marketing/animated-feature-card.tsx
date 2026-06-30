"use client";

import { type ReactNode, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";
import { BODY_MUTED, HEADING_DISPLAY, SUBSECTION_TITLE } from "@/lib/typography";

export interface AnimatedFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

function AnimatedFeatureCard({
  icon,
  title,
  description,
  index = 0,
  className,
}: AnimatedFeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px", threshold: 0.2 });

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal scroll-reveal-scale relative h-full min-w-0",
        inView && "scroll-reveal-visible",
        className
      )}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <div className="relative h-full overflow-hidden rounded-2xl hud-panel p-4 transition-shadow duration-300 hover:shadow-[0_12px_40px_rgb(99_102_241/0.16)] sm:p-5 dark:hover:shadow-[0_12px_40px_rgb(56_189_248/0.12)]">
        <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
        <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent dark:via-indigo-500/60" />

        <div className="flex min-w-0 flex-col gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:shadow-[0_0_24px_rgb(34_211_238/0.2)]">
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className={cn(HEADING_DISPLAY, SUBSECTION_TITLE)}>{title}</h3>
            <p className={cn("mt-1.5", BODY_MUTED)}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedFeatureCard };
