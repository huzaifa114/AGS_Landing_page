import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";

export interface CardImagePairProps {
  grade?: string;
  className?: string;
  variant?: "default" | "compact";
  frontSrc?: string;
  backSrc?: string;
}

function CardImageFace({
  side,
  src,
  alt,
  label,
  grade,
}: {
  side: "front" | "back";
  src: string;
  alt: string;
  label: string;
  grade?: string;
}) {
  return (
    <div className="group relative">
      <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-xl border border-border/80 bg-surface shadow-lg transition-transform duration-300 group-hover:-translate-y-1">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 45vw, 220px"
          priority={side === "front"}
        />
        {grade && side === "front" && (
          <div className="absolute right-2 top-2">
            <Badge variant="premium" className="shadow-md">
              {grade}
            </Badge>
          </div>
        )}
      </div>
      <p className="mt-2 text-center text-caption text-foreground">{label}</p>
    </div>
  );
}

function CardImagePair({
  grade = "9.0",
  className,
  variant = "default",
  frontSrc = sampleCardImages.front,
  backSrc = sampleCardImages.back,
}: CardImagePairProps) {
  return (
    <Card
      className={cn(
        "overflow-hidden border-border/80 shadow-premium",
        className
      )}
    >
      <CardContent className={cn("p-6", variant === "compact" ? "sm:p-6" : "sm:p-8")}>
        <div className="grid grid-cols-2 gap-4 sm:gap-6">
          <CardImageFace
            side="front"
            src={frontSrc}
            alt={sampleCardImages.frontAlt}
            label={sampleCardImages.frontLabel}
            grade={grade}
          />
          <CardImageFace
            side="back"
            src={backSrc}
            alt={sampleCardImages.backAlt}
            label={sampleCardImages.backLabel}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export { CardImagePair, CardImageFace };
