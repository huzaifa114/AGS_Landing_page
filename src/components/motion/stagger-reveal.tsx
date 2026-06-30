"use client";

import { type CSSProperties, type ReactNode, useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { cn } from "@/lib/utils";

export interface StaggerRevealProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

function StaggerReveal({ children, className, stagger = 0.1 }: StaggerRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px", threshold: 0.1 });

  return (
    <div
      ref={ref}
      className={cn(inView && "stagger-reveal-visible", className)}
      style={{ "--stagger-step": `${stagger}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  return (
    <div
      className={cn("stagger-reveal-item", className)}
      style={{ transitionDelay: `calc(var(--stagger-step, 0.1s) * ${index})` }}
    >
      {children}
    </div>
  );
}

export { StaggerReveal, StaggerItem };
