import { type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

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
          <p className="text-body-sm text-muted">{label}</p>
          {icon && (
            <div className="text-muted-foreground">{icon}</div>
          )}
        </div>
        <p className="text-h2 font-semibold tracking-tight">{value}</p>
        {change && (
          <p
            className={cn(
              "text-body-sm font-medium",
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
