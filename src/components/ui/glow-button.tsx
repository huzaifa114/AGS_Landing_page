"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

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
  size = "md",
}: GlowButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-flex overflow-hidden rounded-xl p-[1.5px] transition-transform hover:scale-[1.02] active:scale-[0.98]",
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
          buttonVariants({
            variant: variant === "primary" ? "primary" : "outline",
            size,
            className: "relative z-10 w-full rounded-[10px]",
          }),
          variant === "primary" && "text-white group-hover:bg-primary-hover"
        )}
      >
        {children}
      </span>
    </Link>
  );
}

export { GlowButton };
