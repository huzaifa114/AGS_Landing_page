import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 whitespace-nowrap",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-primary-foreground shadow-sm hover:bg-primary-hover active:scale-[0.98] font-semibold [&]:text-white",
        secondary:
          "bg-surface-muted text-foreground border border-border hover:bg-surface hover:border-border-strong active:scale-[0.98]",
        ghost:
          "text-foreground hover:bg-surface-muted active:bg-surface-muted/80",
        outline:
          "border border-border-strong bg-transparent text-foreground hover:bg-surface-muted active:scale-[0.98]",
        text: "text-primary hover:text-primary-hover underline-offset-4 hover:underline p-0 h-auto",
        dark: "bg-foreground text-surface hover:bg-foreground/90 active:scale-[0.98]",
        light:
          "bg-surface text-foreground border border-border shadow-sm hover:shadow-md active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-4 text-body-sm rounded-xl",
        md: "h-11 px-6 text-body-sm rounded-xl",
        lg: "h-12 px-8 text-body-md rounded-xl",
        xl: "h-14 px-10 text-body-lg rounded-xl",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      loading = false,
      disabled,
      iconLeft,
      iconRight,
      children,
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading;

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isDisabled}
        suppressHydrationWarning
        aria-busy={loading}
        {...props}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
