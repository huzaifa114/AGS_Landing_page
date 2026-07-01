import { type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";
import { BODY_MUTED, CARD_H3 } from "@/lib/typography";

export interface AnimatedFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  index?: number;
  className?: string;
}

function AnimatedFeatureCard({
  icon,
  title,
  description,
  index = 0,
  className,
}: AnimatedFeatureCardProps) {
  return (
    <div
      className={cn("feature-card-enter relative h-full min-w-0", className)}
      style={{ "--card-index": index } as CSSProperties}
    >
      <div className="feature-card-float relative h-full overflow-hidden rounded-2xl hud-panel p-4 sm:p-5">
        <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
        <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent dark:via-indigo-500/60" />

        <div className="flex min-w-0 flex-col gap-3">
          <div
            className="feature-card-icon flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 text-indigo-600 shadow-sm dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:shadow-[0_0_24px_rgb(34_211_238/0.2)]"
            style={{ "--card-index": index } as CSSProperties}
          >
            {icon}
          </div>
          <div className="min-w-0">
            <h3 className={CARD_H3}>{title}</h3>
            <p className={cn("mt-1.5", BODY_MUTED)}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedFeatureCard };
