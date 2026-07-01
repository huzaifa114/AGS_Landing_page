import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { SECTION_H2, PAGE_LEAD } from "@/lib/typography";

export interface CTABandProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  variant?: "default" | "premium";
  className?: string;
}

function CTABand({
  title,
  description,
  actions,
  variant = "default",
  className,
}: CTABandProps) {
  const isPremium = variant === "premium";

  return (
    <section
      className={cn(
        "section-md",
        isPremium ? "gradient-premium" : "bg-surface-muted",
        className
      )}
    >
      <Container>
        <div
          className={cn(
            "flex flex-col items-start justify-between gap-8 rounded-2xl p-10 sm:p-12 lg:flex-row lg:items-center",
            !isPremium && "hud-panel relative overflow-hidden border-0 shadow-none"
          )}
        >
          {!isPremium && (
            <>
              <span className="hud-corner left-3 top-3 border-l border-t" aria-hidden="true" />
              <span className="hud-corner right-3 top-3 border-r border-t" aria-hidden="true" />
            </>
          )}
          <div className="max-w-xl">
            <h2
              className={cn(
                SECTION_H2,
                isPremium ? "text-primary-foreground" : undefined
              )}
            >
              {title}
            </h2>
            {description && (
              <p
                className={cn(
                  "mt-4",
                  PAGE_LEAD,
                  isPremium ? "text-primary-foreground/85" : undefined
                )}
              >
                {description}
              </p>
            )}
          </div>
          {actions && (
            <div className="flex shrink-0 flex-wrap gap-4">{actions}</div>
          )}
        </div>
      </Container>
    </section>
  );
}

export { CTABand };
