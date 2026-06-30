"use client";

import { type ReactNode, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
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
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px", threshold: 0.12 });

  return (
    <div
      ref={ref}
      className={cn(
        "scroll-reveal",
        direction === "down" && "scroll-reveal-down",
        direction === "none" && "scroll-reveal-none",
        scale && direction !== "none" && "scroll-reveal-scale",
        inView && "scroll-reveal-visible",
        className
      )}
      style={{ transitionDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
}

export { MotionReveal };
