import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface TrustBulletsProps {
  items: string[];
  className?: string;
}

function TrustBullets({ items, className }: TrustBulletsProps) {
  return (
    <ul className={cn("flex flex-col gap-3", className)} role="list">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span
            className="check-icon-glow flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-primary ring-1 ring-primary/20 dark:bg-accent-soft dark:text-accent"
            aria-hidden="true"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="text-body-md font-semibold text-foreground">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export { TrustBullets };
