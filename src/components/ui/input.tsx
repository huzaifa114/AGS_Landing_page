import { forwardRef, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      label,
      helperText,
      error,
      success,
      iconLeft,
      iconRight,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const inputId = id || props.name;
    const hasError = Boolean(error);
    const describedBy = [
      helperText ? `${inputId}-helper` : null,
      error ? `${inputId}-error` : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={inputId}
            className="text-body-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <div className="relative">
          {iconLeft && (
            <div className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
              {iconLeft}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            suppressHydrationWarning
            aria-invalid={hasError}
            aria-describedby={describedBy || undefined}
            className={cn(
              "flex h-12 w-full rounded-xl border bg-surface px-4 text-body-md text-foreground transition-colors placeholder:text-muted-foreground",
              "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-muted",
              iconLeft && "pl-11",
              iconRight && "pr-11",
              hasError &&
                "border-error focus:border-error focus:ring-error/20",
              success &&
                !hasError &&
                "border-success focus:border-success focus:ring-success/20",
              !hasError && !success && "border-border",
              className
            )}
            {...props}
          />
          {iconRight && (
            <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted">
              {iconRight}
            </div>
          )}
        </div>
        {helperText && !error && (
          <p id={`${inputId}-helper`} className="text-body-sm text-muted">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${inputId}-error`} className="text-body-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
