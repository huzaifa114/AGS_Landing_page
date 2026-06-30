import { type ReactNode } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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
          <h1 className="text-h2 font-semibold tracking-tight">{title}</h1>
          {description && (
            <p className="mt-3 text-body-md text-muted">{description}</p>
          )}
        </div>
        {children}
        {footer && (
          <div className="mt-8 border-t border-border pt-6 text-center text-body-sm text-muted">
            {footer}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export { AuthCard };
