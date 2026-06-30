import Link from "next/link";
import {
  CheckCircle2,
  CreditCard,
  LogIn,
  Package,
  ShoppingCart,
  Truck,
} from "lucide-react";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Checklist } from "@/components/marketing/checklist";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { submitCardsPage } from "@/data/site-content";
import { cn } from "@/lib/utils";

const stepIcons = [LogIn, Package, CheckCircle2, Truck, ShoppingCart, CheckCircle2];

export interface SubmissionFlowPreviewProps {
  className?: string;
}

function SubmissionFlowPreview({ className }: SubmissionFlowPreviewProps) {
  const content = submitCardsPage;

  return (
    <div className={cn("space-y-12", className)}>
      <SectionIntro
        title={content.flow.title}
        description={content.flow.description}
        align="left"
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {content.steps.map((step, index) => {
          const Icon = stepIcons[index];
          return (
            <Card key={step.title} className="hud-panel relative overflow-hidden border-0 shadow-none">
              <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
              <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-primary dark:bg-accent-soft">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-caption text-foreground">Step {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-1 font-bold text-foreground">{step.title}</h3>
                    <p className="mt-2 text-body-sm text-muted leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="hud-panel relative overflow-hidden border-0 shadow-none">
          <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
          <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-h4 font-bold text-foreground">{content.included.title}</h3>
            <Checklist
              className="mt-6"
              items={content.included.items.map((text) => ({ text }))}
            />
          </CardContent>
        </Card>

        <Card className="hud-panel relative overflow-hidden border-0 shadow-none">
          <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
          <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-h4 font-bold text-foreground">Accepted payment methods</h3>
            <p className="mt-2 text-body-sm text-muted">
              Payment options shown for preview. Checkout is not active in this release.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {content.paymentMethods.map((method) => (
                <Badge key={method} variant="neutral" className="font-medium">
                  <CreditCard className="mr-1.5 h-3 w-3" />
                  {method}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="ai-console overflow-hidden border-border/80 shadow-premium">
        <CardContent className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="max-w-xl">
            <p className="text-body-sm text-muted">{content.notice}</p>
          </div>
          <Link
            href="/login?callbackUrl=/submit-cards"
            className={buttonVariants({ size: "lg", className: "shrink-0 font-semibold text-white" })}
          >
            {content.cta}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}

export { SubmissionFlowPreview };
