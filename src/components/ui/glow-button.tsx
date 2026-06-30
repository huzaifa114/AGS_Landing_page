"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface GlowButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
}

function GlowButton({
  href,
  children,
  className,
  variant = "primary",
  size = "lg",
}: GlowButtonProps) {
  const sizeClass =
    size === "lg" ? "px-8 py-3 text-body-md" : "px-6 py-2.5 text-body-sm";

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex overflow-hidden rounded-xl p-[1.5px] font-semibold transition-transform hover:scale-[1.02] active:scale-[0.98]",
        className
      )}
    >
      <span
        className={cn(
          "glow-border absolute inset-0 rounded-xl",
          variant === "primary" && "glow-border-strong"
        )}
        aria-hidden="true"
      />
      <span
        className={cn(
          "relative z-10 inline-flex w-full items-center justify-center gap-2 rounded-[10px]",
          sizeClass,
          variant === "primary"
            ? "bg-primary text-white group-hover:bg-primary-hover"
            : "border border-border/50 bg-white/90 text-foreground backdrop-blur-md group-hover:bg-white dark:bg-surface dark:group-hover:bg-surface-muted"
        )}
      >
        {children}
      </span>
    </Link>
  );
}

export { GlowButton };
