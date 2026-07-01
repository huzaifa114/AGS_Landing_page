import { type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface CssRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "none";
  scale?: boolean;
}

function CssReveal({
  children,
  className,
  delay = 0,
  direction = "up",
  scale = true,
}: CssRevealProps) {
  return (
    <div
      className={cn(
        "css-reveal",
        direction === "down" && "css-reveal-down",
        direction === "none" && "css-reveal-none",
        scale && direction !== "none" && "css-reveal-scale",
        className
      )}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export interface CssStaggerProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
}

function CssStagger({ children, className, stagger = 0.1 }: CssStaggerProps) {
  return (
    <div
      className={cn("css-stagger", className)}
      style={{ "--stagger-step": `${stagger}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function CssStaggerItem({
  children,
  className,
  index = 0,
}: {
  children: ReactNode;
  className?: string;
  index?: number;
}) {
  return (
    <div
      className={cn("css-stagger-item", className)}
      style={{ "--stagger-index": index } as CSSProperties}
    >
      {children}
    </div>
  );
}

export { CssReveal, CssStagger, CssStaggerItem };
