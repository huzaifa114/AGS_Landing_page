"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

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
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative h-full min-w-0", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 48, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-20px", amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: index * 0.14,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                y: [0, -8, 0],
                boxShadow: [
                  "0 0 0 1px rgb(99 102 241 / 0.15), 0 8px 24px rgb(99 102 241 / 0.08)",
                  "0 0 0 1px rgb(99 102 241 / 0.45), 0 12px 40px rgb(99 102 241 / 0.22)",
                  "0 0 0 1px rgb(99 102 241 / 0.15), 0 8px 24px rgb(99 102 241 / 0.08)",
                ],
              }
        }
        transition={{
          duration: 2.8 + index * 0.35,
          repeat: Infinity,
          ease: "easeInOut",
          delay: index * 0.25,
        }}
        className="relative h-full overflow-hidden rounded-2xl hud-panel p-4 sm:p-5"
      >
        <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
        <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent dark:via-indigo-500/60" />

        <div className="flex min-w-0 flex-col gap-3">
          <motion.div
            animate={reduceMotion ? undefined : { scale: [1, 1.06, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.2 }}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:shadow-[0_0_24px_rgb(34_211_238/0.2)]"
          >
            {icon}
          </motion.div>
          <div className="min-w-0">
            <h3 className="font-heading text-body-md font-bold leading-snug text-foreground sm:text-h4">
              {title}
            </h3>
            <p className="mt-1.5 text-body-sm text-muted-foreground leading-relaxed dark:text-slate-400">{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export { AnimatedFeatureCard };
