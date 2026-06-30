"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface FeatureCardProps {
  icon?: ReactNode;
  title: string;
  description: string;
  className?: string;
}

function FeatureCard({ icon, title, description, className }: FeatureCardProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn("relative h-full", className)}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.55 }}
    >
      <motion.div
        animate={
          reduceMotion
            ? undefined
            : {
                boxShadow: [
                  "0 0 0 1px rgb(99 102 241 / 0.12), 0 8px 24px rgb(99 102 241 / 0.06)",
                  "0 0 0 1px rgb(99 102 241 / 0.35), 0 12px 36px rgb(99 102 241 / 0.14)",
                  "0 0 0 1px rgb(99 102 241 / 0.12), 0 8px 24px rgb(99 102 241 / 0.06)",
                ],
              }
        }
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="hud-panel relative h-full overflow-hidden rounded-2xl p-5 sm:p-6"
      >
        <span className="hud-corner left-2 top-2 border-l border-t" />
        <span className="hud-corner right-2 top-2 border-r border-t" />
        <div className="flex flex-col gap-4">
          {icon && (
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-primary shadow-sm dark:border-indigo-500/30 dark:bg-indigo-500/15">
              {icon}
            </div>
          )}
          <div>
            <h3 className="font-heading text-body-md font-bold text-foreground sm:text-h4">{title}</h3>
            <p className="mt-2 text-body-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export { FeatureCard };
