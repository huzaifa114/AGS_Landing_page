import { cn } from "@/lib/utils";

export interface BadgePillProps {
  children: React.ReactNode;
  className?: string;
}

function BadgePill({ children, className }: BadgePillProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-indigo-100 bg-indigo-50 px-3 py-1 text-body-sm font-semibold text-primary dark:border-accent-soft dark:bg-accent-soft",
        className
      )}
    >
      {children}
    </span>
  );
}

export { BadgePill };
