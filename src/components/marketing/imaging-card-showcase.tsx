"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { CardImagingOverlay } from "@/components/marketing/card-imaging-overlay";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";
import { META_TEXT } from "@/lib/typography";

export interface ImagingCardShowcaseProps {
  className?: string;
  grade?: string;
  frontSrc?: string;
  backSrc?: string;
  frontAlt?: string;
  backAlt?: string;
}

function ImagingCardShowcase({
  className,
  grade = "9.0",
  frontSrc = sampleCardImages.front,
  backSrc = sampleCardImages.back,
  frontAlt = sampleCardImages.frontAlt,
  backAlt = sampleCardImages.backAlt,
}: ImagingCardShowcaseProps) {
  const faces = [
    { side: "front" as const, src: frontSrc, alt: frontAlt, label: "Front capture" },
    { side: "back" as const, src: backSrc, alt: backAlt, label: "Back capture" },
  ];

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-2xl border-2 border-indigo-200 bg-white p-4 shadow-[0_16px_48px_rgb(99_102_241/0.12)] sm:p-5",
        "dark:border-cyan-400/25 dark:bg-[#0c1018] dark:shadow-[0_24px_56px_rgb(0_0_0/0.45)]",
        className
      )}
    >
      <span className="hud-corner left-2 top-2 border-l border-t border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner right-2 top-2 border-r border-t border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner bottom-2 left-2 border-b border-l border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner bottom-2 right-2 border-b border-r border-indigo-200 dark:border-cyan-400/50" />

      <p className={cn(META_TEXT, "mb-4 text-center")}>Controlled imaging capture</p>

      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {faces.map((face) => (
          <div key={face.side} className="relative">
            <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-xl border border-indigo-200/80 bg-surface-muted/50 dark:border-white/10 dark:bg-black/20">
              <Image
                src={face.src}
                alt={face.alt}
                fill
                className="object-contain p-1.5"
                sizes="(max-width: 640px) 40vw, 220px"
              />
              <CardImagingOverlay active variant="pair" />
              {face.side === "front" && (
                <div className="absolute right-2 top-2">
                  <Badge variant="premium" className="font-grade font-extrabold">
                    {grade}
                  </Badge>
                </div>
              )}
            </div>
            <p className={cn("mt-2 text-center", META_TEXT)}>
              {face.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export { ImagingCardShowcase };
