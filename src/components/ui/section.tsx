import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import { Container } from "./container";

type SectionSpacing = "sm" | "md" | "lg" | "xl" | "none";

const spacingMap: Record<SectionSpacing, string> = {
  none: "",
  sm: "section-sm",
  md: "section-md",
  lg: "section-lg",
  xl: "section-xl",
};

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  spacing?: SectionSpacing;
  contained?: boolean;
  containerSize?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
  as?: "section" | "div";
}

function Section({
  className,
  spacing = "md",
  contained = true,
  containerSize = "2xl",
  as: Component = "section",
  children,
  ...props
}: SectionProps) {
  return (
    <Component
      className={cn(spacingMap[spacing], className)}
      {...props}
    >
      {contained ? (
        <Container size={containerSize}>{children}</Container>
      ) : (
        children
      )}
    </Component>
  );
}

export { Section };
