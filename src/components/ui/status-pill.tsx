import { cva, type VariantProps } from "class-variance-authority";
import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

const statusPillVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-body-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-surface-muted text-foreground",
        success: "bg-success-soft text-success",
        warning: "bg-warning-soft text-warning",
        error: "bg-error-soft text-error",
        info: "bg-info-soft text-info",
        neutral: "bg-surface-muted text-muted",
        premium: "bg-premium-soft text-premium",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface StatusPillProps
  extends HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof statusPillVariants> {
  dot?: boolean;
}

function StatusPill({
  className,
  variant,
  dot = true,
  children,
  ...props
}: StatusPillProps) {
  return (
    <span
      className={cn(statusPillVariants({ variant }), className)}
      {...props}
    >
      {dot && (
        <span
          className={cn(
            "h-1.5 w-1.5 rounded-full",
            variant === "success" && "bg-success",
            variant === "warning" && "bg-warning",
            variant === "error" && "bg-error",
            variant === "info" && "bg-info",
            variant === "premium" && "bg-premium",
            variant === "neutral" && "bg-muted",
            (!variant || variant === "default") && "bg-foreground"
          )}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
}

export { StatusPill, statusPillVariants };
