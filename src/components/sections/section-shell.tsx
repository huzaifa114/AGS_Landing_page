import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SectionShellProps {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}

function SectionShell({ children, className, glow = false }: SectionShellProps) {
  return (
    <div className={cn("relative", className)}>
      {glow && (
        <>
          <div
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.08),transparent_55%)]"
            aria-hidden="true"
          />
        </>
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export { SectionShell };
