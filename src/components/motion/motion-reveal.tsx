"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MotionRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
  scale?: boolean;
}

function MotionReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  scale = true,
}: MotionRevealProps) {
  const reduceMotion = useReducedMotion();

  const offset =
    direction === "up" ? 40 : direction === "down" ? -40 : 0;

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{
        opacity: 0,
        y: offset,
        ...(scale ? { scale: 0.94 } : {}),
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        ...(scale ? { scale: 1 } : {}),
      }}
      viewport={{ once: true, margin: "-50px", amount: 0.2 }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] as const }}
    >
      {children}
    </motion.div>
  );
}

export { MotionReveal };
