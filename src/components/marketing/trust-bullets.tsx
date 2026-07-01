import { Check } from "lucide-react";
import { BODY_STRONG } from "@/lib/typography";
import { cn } from "@/lib/utils";

export interface TrustBulletsProps {
  items: string[];
  className?: string;
}

function TrustBullets({ items, className }: TrustBulletsProps) {
  return (
    <ul className={cn("flex flex-wrap gap-2.5 sm:gap-3", className)} role="list">
      {items.map((item) => (
        <li key={item} className="relative">
          <span
            className={cn(
              "inline-flex items-center rounded-full border border-primary/35 bg-indigo-50/70 px-4 py-2.5",
              BODY_STRONG,
              "dark:border-cyan-400/40 dark:bg-white/[0.04] dark:text-slate-100"
            )}
          >
            {item}
          </span>
          <span
            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white shadow-sm dark:bg-cyan-400 dark:text-[#060a18]"
            aria-hidden="true"
          >
            <Check className="h-3 w-3" strokeWidth={3} />
          </span>
        </li>
      ))}
    </ul>
  );
}

export { TrustBullets };
