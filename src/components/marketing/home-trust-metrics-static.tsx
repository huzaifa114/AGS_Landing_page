import { Activity, Cpu, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  SECTION_EYEBROW,
  SECTION_META,
  SECTION_H2,
  GRADE_DISPLAY,
  META_TEXT,
  PANEL_TITLE,
} from "@/lib/typography";

const METRICS = [
  {
    code: "SYS-01",
    label: "Unit Cost",
    detail: "Flat-rate grade protocol",
    display: "$10",
    icon: Zap,
    accent: "from-indigo-50 to-violet-50 dark:from-cyan-500/20 dark:to-indigo-500/10",
  },
  {
    code: "SYS-02",
    label: "Process Window",
    detail: "Target after intake",
    display: "72 HR",
    icon: Activity,
    accent: "from-violet-50 to-fuchsia-50 dark:from-violet-500/20 dark:to-fuchsia-500/10",
  },
  {
    code: "SYS-03",
    label: "Digital Output",
    detail: "Reports auto-generated",
    display: "100%",
    icon: Cpu,
    accent: "from-blue-50 to-indigo-50 dark:from-indigo-500/20 dark:to-blue-500/10",
  },
  {
    code: "SYS-04",
    label: "Live Verification",
    detail: "Cert lookup stream",
    display: "12,847",
    icon: ShieldCheck,
    accent: "from-emerald-50 to-cyan-50 dark:from-emerald-500/20 dark:to-cyan-500/10",
  },
] as const;

function HomeTrustMetricsStatic() {
  return (
    <section className="relative overflow-hidden ai-strip py-12 sm:py-14">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(99_102_241/0.06),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(99_102_241/0.18),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 imaging-grid-overlay opacity-10 dark:opacity-20" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-8 text-center sm:mb-10">
          <span className={cn("mb-3 block", SECTION_EYEBROW)}>System telemetry</span>
          <h2 className={SECTION_H2}>Real-Time Service Matrix</h2>
          <p className={cn("mx-auto mt-3 max-w-2xl", SECTION_META)}>
            Live grading infrastructure metrics · auto-indexed
          </p>
        </div>

        <div className="grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.code} className="hud-panel relative h-full rounded-2xl p-[1px]">
                <div
                  className={cn(
                    "relative flex h-full min-h-[248px] flex-col overflow-hidden rounded-[calc(1rem-1px)] bg-white bg-gradient-to-br px-4 py-5 dark:bg-transparent sm:min-h-[260px] sm:px-5 sm:py-6",
                    metric.accent
                  )}
                >
                  <span className="hud-corner left-2 top-2 border-l-2 border-t-2" />
                  <span className="hud-corner right-2 top-2 border-r-2 border-t-2" />
                  <span className="hud-corner bottom-2 left-2 border-b-2 border-l-2" />
                  <span className="hud-corner bottom-2 right-2 border-b-2 border-r-2" />

                  <div className="relative flex min-h-[4.5rem] items-start justify-between gap-2">
                    <div className="flex min-w-0 flex-1 items-start gap-2.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-indigo-200 bg-indigo-50 text-indigo-600 dark:border-cyan-400/30 dark:bg-cyan-500/10 dark:text-cyan-300">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className={cn(SECTION_META, "text-indigo-600 dark:text-cyan-400/80")}>
                          {metric.code}
                        </p>
                        <p className={cn(PANEL_TITLE, "mt-0.5 min-h-[2.5rem] line-clamp-2 leading-tight")}>
                          {metric.label}
                        </p>
                      </div>
                    </div>
                    {metric.code === "SYS-04" && (
                      <span
                        className={cn(
                          META_TEXT,
                          "inline-flex shrink-0 items-center gap-1.5 rounded border border-emerald-300 bg-emerald-50 px-2 py-0.5 text-emerald-700 dark:border-emerald-400/40 dark:bg-emerald-500/15 dark:text-emerald-300"
                        )}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                        Live
                      </span>
                    )}
                  </div>

                  <p className={cn("relative mt-5 min-h-[3rem] tabular-nums sm:min-h-[3.25rem]", GRADE_DISPLAY)}>
                    <span className="bg-gradient-to-r from-indigo-600 via-primary to-violet-600 bg-clip-text text-transparent dark:from-cyan-200 dark:via-white dark:to-violet-200">
                      {metric.display}
                    </span>
                  </p>

                  <p className={cn("relative mt-2 min-h-[2.25rem] line-clamp-2", SECTION_META)}>
                    {metric.detail}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export { HomeTrustMetricsStatic };
