import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { META_TEXT, PRICE_DISPLAY, BODY_MUTED, BODY_TEXT } from "@/lib/typography";
import { cn } from "@/lib/utils";

export interface PricingHeroCardProps {
  label: string;
  amount: string;
  turnaround: string;
  note: string;
  ctaLabel?: string;
  ctaHref?: string;
  className?: string;
}

function PricingHeroCard({
  label,
  amount,
  turnaround,
  note,
  ctaLabel = "Submit Cards",
  ctaHref = "/submit-cards",
  className,
}: PricingHeroCardProps) {
  const priceMatch = amount.match(/\$[\d,]+(?:\.\d+)?/);
  const priceValue = priceMatch?.[0] ?? amount;

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border-2 p-8 sm:p-10",
        "border-indigo-200/90 bg-gradient-to-br from-white via-indigo-50/40 to-violet-50/30",
        "shadow-[0_0_0_1px_rgb(99_102_241/0.1),0_20px_50px_rgb(99_102_241/0.16),0_0_72px_rgb(99_102_241/0.14)]",
        "dark:border-cyan-400/35 dark:from-[#0c1018] dark:via-[#0f1528] dark:to-[#121a33]",
        "dark:shadow-[0_0_0_1px_rgb(56_189_248/0.22),0_24px_56px_rgb(0_0_0/0.45),0_0_88px_rgb(56_189_248/0.18)]",
        className
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl bg-gradient-to-br from-indigo-400/10 via-transparent to-violet-400/10 dark:from-cyan-400/15 dark:to-violet-500/10"
        aria-hidden="true"
      />

      <div className="relative text-left">
        <p className={cn(META_TEXT, "text-muted-foreground dark:text-slate-400")}>{label}</p>

        <div className="mt-5 flex items-baseline gap-2">
          <span className={PRICE_DISPLAY}>
            {priceValue}
          </span>
          <span className={BODY_MUTED}>/ card</span>
        </div>

        <p className={cn("mt-4", BODY_MUTED)}>{turnaround}</p>

        <p
          className={cn(
            "mt-6 rounded-full border border-indigo-200/80 bg-white/95 px-5 py-3.5",
            BODY_TEXT,
            "dark:border-white/12 dark:bg-white/[0.06] dark:text-slate-200"
          )}
        >
          {note}
        </p>

        <Link
          href={ctaHref}
          className={cn(
            buttonVariants({ variant: "dark", size: "md" }),
            "mt-8 rounded-full px-8",
            "!bg-foreground !text-white hover:!bg-foreground/90 hover:!text-white",
            "dark:!bg-white dark:!text-[#09090b] dark:hover:!bg-white/90 dark:hover:!text-[#09090b]"
          )}
        >
          {ctaLabel}
        </Link>
      </div>
    </div>
  );
}

export { PricingHeroCard };
