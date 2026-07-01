import Image from "next/image";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";

function HeroCardStackPlaceholder({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "hero-stack-shell relative mx-auto w-full max-w-xl overflow-hidden px-1 sm:px-0",
        className
      )}
    >
      <div className="hero-stack-viewport relative mx-auto w-full">
        <div className="hero-stack-canvas">
          <div className="hero-stack-front-card absolute left-1/2 top-[52%] w-[175px] -translate-x-1/2 -translate-y-1/2">
            <div className="relative rounded-xl border border-indigo-400/35 bg-gradient-to-b from-slate-100 to-slate-200 p-2.5 shadow-[0_28px_64px_rgb(0_0_0/0.4)] dark:from-slate-800 dark:to-slate-900">
              <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-lg border border-white/15">
                <Image
                  src={sampleCardImages.front}
                  alt={sampleCardImages.frontAlt}
                  width={175}
                  height={245}
                  className="h-full w-full object-cover"
                  priority
                  fetchPriority="high"
                  unoptimized
                  sizes="(max-width: 640px) 42vw, 175px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { HeroCardStackPlaceholder };
