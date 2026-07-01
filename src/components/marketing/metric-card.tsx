import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { META_TEXT, GRADE_STAT, BODY_MUTED } from "@/lib/typography";

export interface MetricCardProps {
  label: string;
  value: string;
  change?: string;
  trend?: "up" | "down" | "neutral";
  icon?: ReactNode;
  className?: string;
}

function MetricCard({
  label,
  value,
  change,
  trend = "neutral",
  icon,
  className,
}: MetricCardProps) {
  return (
    <Card className={cn("gradient-card", className)}>
      <CardContent className="flex flex-col gap-3 p-8">
        <div className="flex items-center justify-between">
          <p className={META_TEXT}>{label}</p>
          {icon && (
            <div className="text-muted-foreground">{icon}</div>
          )}
        </div>
        <p className={GRADE_STAT}>{value}</p>
        {change && (
          <p
            className={cn(
              BODY_MUTED,
              "font-medium",
              trend === "up" && "text-success",
              trend === "down" && "text-error",
              trend === "neutral" && "text-muted"
            )}
          >
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export { MetricCard };
