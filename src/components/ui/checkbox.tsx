import { forwardRef, type InputHTMLAttributes } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  helperText?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, helperText, error, id, disabled, ...props }, ref) => {
    const checkboxId = id || props.name;

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={checkboxId}
          className={cn(
            "group flex cursor-pointer items-start gap-3",
            disabled && "cursor-not-allowed opacity-50"
          )}
        >
          <span className="relative mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center">
            <input
              ref={ref}
              type="checkbox"
              id={checkboxId}
              disabled={disabled}
              className="sr-only"
              {...props}
            />
            <span
              className={cn(
                "flex h-5 w-5 items-center justify-center rounded-md border border-border-strong bg-surface transition-colors",
                "group-has-[:checked]:border-primary group-has-[:checked]:bg-primary",
                "group-has-[:focus-visible]:ring-2 group-has-[:focus-visible]:ring-accent/40 group-has-[:focus-visible]:ring-offset-2",
                error && "border-error",
                className
              )}
              aria-hidden="true"
            >
              <Check className="h-3.5 w-3.5 text-primary-foreground opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
            </span>
          </span>
          {label && (
            <span className="text-body-sm text-foreground">
              {label}
              {helperText && (
                <span className="mt-0.5 block text-muted">{helperText}</span>
              )}
            </span>
          )}
        </label>
        {error && (
          <p className="ml-8 text-body-sm text-error" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Checkbox.displayName = "Checkbox";

export { Checkbox };
