import { cn } from "@/lib/utils";
import {
  HEADING_DISPLAY,
  PAGE_LEAD,
  SECTION_EYEBROW,
  SECTION_TITLE,
} from "@/lib/typography";

export interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

function SectionIntro({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
}: SectionIntroProps) {
  const isCenter = align === "center";

  return (
    <div
      className={cn(
        "max-w-4xl",
        isCenter && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p className={cn(SECTION_EYEBROW)}>
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          HEADING_DISPLAY,
          SECTION_TITLE,
          eyebrow ? "mt-3" : undefined,
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-2xl",
            PAGE_LEAD,
            isCenter && "mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export { SectionIntro };
