import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { BODY_MUTED, CARD_H3, STEP_BADGE } from "@/lib/typography";

export interface TimelineStepProps {
  step: number;
  title: string;
  description: string;
  icon?: ReactNode;
  isLast?: boolean;
  className?: string;
}

function TimelineStep({
  step,
  title,
  description,
  icon,
  isLast = false,
  className,
}: TimelineStepProps) {
  return (
    <div className={cn("relative flex gap-5", className)}>
      <div className="flex flex-col items-center">
        <div className="timeline-step-badge flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-indigo-200 bg-indigo-50 dark:border-indigo-500/30 dark:bg-indigo-500/15">
          {icon ? icon : <span className={STEP_BADGE}>{step}</span>}
        </div>
        {!isLast && (
          <div
            className="mt-2 w-px flex-1 bg-gradient-to-b from-indigo-300 to-transparent dark:from-indigo-500/40"
            aria-hidden="true"
          />
        )}
      </div>
      <div
        className={cn(
          "timeline-step-panel hud-panel flex-1 rounded-2xl p-4 sm:p-5",
          isLast ? "pb-0" : "pb-8"
        )}
      >
        <span className="hud-corner left-2 top-2 border-l border-t" />
        <span className="hud-corner right-2 top-2 border-r border-t" />
        <h3 className={CARD_H3}>{title}</h3>
        <p className={cn("mt-2 max-w-md", BODY_MUTED)}>{description}</p>
      </div>
    </div>
  );
}

export { TimelineStep };
