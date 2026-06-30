"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface PremiumCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

function PremiumCard({ icon, title, description, className }: PremiumCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("h-full", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.55 }}
    >
      <motion.div
        animate={reduceMotion ? undefined : { y: [0, -4, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="hud-panel relative h-full overflow-hidden rounded-2xl p-5 sm:p-6"
      >
        <span className="hud-corner left-2 top-2 border-l border-t" />
        <span className="hud-corner right-2 top-2 border-r border-t" />
        {icon && (
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-primary dark:border-indigo-500/30 dark:bg-indigo-500/15">
            {icon}
          </div>
        )}
        <h3 className="font-heading text-body-md font-bold text-foreground sm:text-h4">{title}</h3>
        <p className="mt-2 whitespace-pre-line text-body-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </motion.div>
    </motion.div>
  );
}

export { PremiumCard };
