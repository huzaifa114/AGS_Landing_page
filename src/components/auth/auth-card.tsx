import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { BODY_MUTED, PAGE_HERO_H1, PAGE_LEAD } from "@/lib/typography";
import { formatPageHeroTitle } from "@/components/marketing/page-hero-title";

export interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
}

function AuthCard({ title, description, children, footer, className }: AuthCardProps) {
  return (
    <Card className={cn("border-border/80 shadow-premium", className)}>
      <CardContent className="p-8 sm:p-10">
        <div className="mb-8 text-center">
          <h1 className={PAGE_HERO_H1}>{formatPageHeroTitle(title)}</h1>
          {description && (
            <p className={cn("mt-3", PAGE_LEAD)}>{description}</p>
          )}
        </div>
        {children}
        {footer && (
          <div className={cn("mt-8 border-t border-border pt-6 text-center", BODY_MUTED)}>
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { AuthCard };
