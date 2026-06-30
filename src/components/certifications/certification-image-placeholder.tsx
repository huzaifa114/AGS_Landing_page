import Image from "next/image";
import { sampleCardImages } from "@/data/site-content";
import { cn } from "@/lib/utils";
import type { ImageType } from "@/lib/certifications/types";

export interface CertificationImagePlaceholderProps {
  imageType: ImageType;
  imageUrl?: string | null;
  className?: string;
}

function CertificationImagePlaceholder({
  imageType,
  imageUrl,
  className,
}: CertificationImagePlaceholderProps) {
  const isFront = imageType === "FRONT";
  const src = imageUrl ?? (isFront ? sampleCardImages.front : sampleCardImages.back);
  const alt = isFront ? sampleCardImages.frontAlt : sampleCardImages.backAlt;
  const label = isFront ? sampleCardImages.frontLabel : sampleCardImages.backLabel;

  return (
    <div className={cn(className)}>
      <div className="relative aspect-[2.5/3.5] overflow-hidden rounded-xl border border-border/80 bg-surface shadow-md">
        <Image src={src} alt={alt} fill className="object-cover" sizes="280px" />
      </div>
      <p className="mt-2 text-center text-caption text-foreground">{label}</p>
    </div>
  );
}

export { CertificationImagePlaceholder };
