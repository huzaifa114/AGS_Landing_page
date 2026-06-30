import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  helperText?: string;
  error?: string;
  success?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, helperText, error, success, id, disabled, ...props }, ref) => {
    const textareaId = id || props.name;
    const hasError = Boolean(error);
    const describedBy = [
      helperText ? `${textareaId}-helper` : null,
      error ? `${textareaId}-error` : null,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <div className="flex w-full flex-col gap-2">
        {label && (
          <label
            htmlFor={textareaId}
            className="text-body-sm font-medium text-foreground"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={textareaId}
          disabled={disabled}
          aria-invalid={hasError}
          aria-describedby={describedBy || undefined}
          className={cn(
            "flex min-h-[120px] w-full resize-y rounded-xl border bg-surface px-4 py-3 text-body-md text-foreground transition-colors placeholder:text-muted-foreground",
            "focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-surface-muted",
            hasError && "border-error focus:border-error focus:ring-error/20",
            success && !hasError && "border-success focus:border-success focus:ring-success/20",
            !hasError && !success && "border-border",
            className
          )}
          {...props}
        />
        {helperText && !error && (
          <p id={`${textareaId}-helper`} className="text-body-sm text-muted">
            {helperText}
          </p>
        )}
        {error && (
          <p id={`${textareaId}-error`} className="text-body-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
