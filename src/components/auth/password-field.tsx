"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PasswordFieldProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  error?: string;
}

const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  (
    {
      className,
      label = "Password",
      helperText,
      error,
      id,
      disabled,
      ...props
    },
    ref
  ) => {
    const [visible, setVisible] = useState(false);
    const inputId = id || props.name;
    const hasError = Boolean(error);

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
          <input
            ref={ref}
            id={inputId}
            type={visible ? "text" : "password"}
            disabled={disabled}
            aria-invalid={hasError}
            className={cn(
              "flex h-12 w-full rounded-xl border bg-surface px-4 pr-11 text-body-md text-foreground transition-colors placeholder:text-muted-foreground",
              "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-muted",
              hasError
                ? "border-error focus:border-error focus:ring-error/20"
                : "border-border",
              className
            )}
            {...props}
          />
          <button
            type="button"
            onClick={() => setVisible((v) => !v)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted hover:text-foreground"
            aria-label={visible ? "Hide password" : "Show password"}
            tabIndex={-1}
          >
            {visible ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        {helperText && !error && (
          <p className="text-body-sm text-muted">{helperText}</p>
        )}
        {error && (
          <p className="text-body-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordField.displayName = "PasswordField";

export { PasswordField };
