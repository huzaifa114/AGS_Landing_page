import Image from "next/image";
import { Award } from "lucide-react";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";

export interface SlabVisualProps {
  className?: string;
}

function SlabVisual({ className }: SlabVisualProps) {
  return (
    <div
      className={cn(
        "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-surface via-surface-muted to-surface p-6 shadow-premium sm:p-8",
        className
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(99_102_241/0.08),transparent_60%)]" />
      <div className="relative flex flex-col items-center gap-5">
        <div className="relative">
          <div className="absolute -inset-3 rounded-2xl bg-foreground/5 blur-xl" />
          <div className="relative rounded-xl border-2 border-border-strong bg-gradient-to-b from-slate-100 to-slate-200 p-3 shadow-xl dark:from-slate-800 dark:to-slate-900">
            <div className="relative h-52 w-36 overflow-hidden rounded-lg border border-border shadow-inner sm:h-60 sm:w-40">
              <Image
                src={sampleCardImages.front}
                alt={sampleCardImages.frontAlt}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 40vw, 160px"
                priority
              />
            </div>
            <div className="absolute -bottom-2 left-1/2 flex h-7 min-w-[7rem] -translate-x-1/2 items-center justify-center rounded-md bg-primary px-3 text-[10px] font-bold tracking-wider text-white">
              GRADE 9.0
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-body-sm text-foreground">
          <Award className="h-4 w-4 text-primary" aria-hidden="true" />
          <span>Premium encapsulated certification</span>
        </div>
      </div>
    </div>
  );
}

export { SlabVisual };
