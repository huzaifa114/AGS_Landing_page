import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { BODY_MUTED } from "@/lib/typography";

export interface ChecklistItem {
  text: string;
  description?: string;
}

export interface ChecklistProps {
  items: ChecklistItem[];
  className?: string;
}

function Checklist({ items, className }: ChecklistProps) {
  return (
    <ul className={cn("flex flex-col gap-4", className)} role="list">
      {items.map((item, index) => (
        <li key={index} className="flex gap-3.5">
          <span
            className="check-icon-glow-success mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-500/25 dark:bg-success-soft dark:text-success"
            aria-hidden="true"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <div>
            <p className="text-body-md font-semibold text-foreground">
              {item.text}
            </p>
            {item.description && (
              <p className={cn("mt-0.5", BODY_MUTED)}>
                {item.description}
              </p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export { Checklist };
