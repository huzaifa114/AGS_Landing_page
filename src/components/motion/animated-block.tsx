"use client";

import { type ReactNode } from "react";
import { MotionReveal } from "@/components/motion/motion-reveal";

export interface AnimatedBlockProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedBlock({ children, className, delay = 0 }: AnimatedBlockProps) {
  return (
    <MotionReveal delay={delay} className={className}>
      {children}
    </MotionReveal>
  );
}

export { AnimatedBlock };
