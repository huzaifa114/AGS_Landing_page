"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
  icon?: ReactNode;
  isLast?: boolean;
  className?: string;
}

function TimelineStep({
  step,
  title,
  description,
  icon,
  isLast = false,
  className,
}: TimelineStepProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className={cn("relative flex gap-5", className)}>
      <div className="flex flex-col items-center">
        <motion.div
          animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 0 rgb(99 102 241 / 0.2)", "0 0 20px 4px rgb(99 102 241 / 0.35)", "0 0 0 0 rgb(99 102 241 / 0.2)"] }}
          transition={{ duration: 2.8, repeat: Infinity }}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 font-grade text-sm font-extrabold text-primary dark:border-indigo-500/30 dark:bg-indigo-500/15 dark:text-indigo-300"
        >
          {icon || step}
        </motion.div>
        {!isLast && (
          <div className="mt-2 w-px flex-1 bg-gradient-to-b from-indigo-300 to-transparent dark:from-indigo-500/40" aria-hidden="true" />
        )}
      </div>
      <motion.div
        className={cn(
          "hud-panel flex-1 rounded-2xl p-4 sm:p-5",
          isLast ? "pb-0" : "pb-8"
        )}
        initial={reduceMotion ? false : { opacity: 0, x: 16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.5 }}
      >
        <span className="hud-corner left-2 top-2 border-l border-t" />
        <span className="hud-corner right-2 top-2 border-r border-t" />
        <h3 className="font-heading text-body-md font-bold text-foreground dark:text-white sm:text-h4">{title}</h3>
        <p className="mt-2 max-w-md text-body-sm text-muted-foreground leading-relaxed dark:text-slate-400">
          {description}
        </p>
      </motion.div>
    </div>
  );
}

export { TimelineStep };
