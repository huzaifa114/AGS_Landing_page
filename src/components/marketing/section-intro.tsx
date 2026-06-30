import { cn } from "@/lib/utils";
import { FEATURE_SECTION_TITLE, PAGE_LEAD, SECTION_EYEBROW, SECTION_TITLE } from "@/lib/typography";

export interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
  /** feature = Collectors Deserve Better size; section = slightly smaller (default) */
  size?: "feature" | "section";
}

function SectionIntro({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  titleClassName,
  size = "section",
}: SectionIntroProps) {
  const isCenter = align === "center";
  const titleSize = size === "feature" ? FEATURE_SECTION_TITLE : SECTION_TITLE;

  return (
    <div
      className={cn(
        "max-w-4xl",
        isCenter && "mx-auto text-center",
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            "font-hud font-bold uppercase tracking-[0.24em] text-primary dark:text-cyan-400",
            SECTION_EYEBROW
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "font-heading font-extrabold leading-[1.08] tracking-tight text-foreground dark:text-white",
          titleSize,
          eyebrow ? "mt-3" : undefined,
          titleClassName
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-3 max-w-2xl text-muted-foreground leading-relaxed dark:text-slate-400",
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
