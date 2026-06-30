"use client";

import Link from "next/link";
import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export interface PremiumButtonProps {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  size?: "md" | "lg";
}

function PremiumButton({
  href,
  children,
  className,
  variant = "primary",
  size = "md",
}: PremiumButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({
          variant: variant === "primary" ? "primary" : "outline",
          size,
        }),
        variant === "primary" &&
          "text-white shadow-[0_4px_20px_rgb(99_102_241/0.35)] transition-all hover:-translate-y-px hover:shadow-[0_8px_28px_rgb(99_102_241/0.42)] active:translate-y-0",
        className
      )}
    >
      {children}
    </Link>
  );
}

export { PremiumButton };
