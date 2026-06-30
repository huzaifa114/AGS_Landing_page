import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BODY_MUTED } from "@/lib/typography";

export interface PlaceholderPageProps {
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
}

function PlaceholderPage({
  title,
  description,
  backHref = "/",
  backLabel = "Back to Home",
}: PlaceholderPageProps) {
  return (
    <MarketingPage>
      <HeroShell
        align="center"
        title={title}
        description={description}
        actions={
          <Link
            href={backHref}
            className={cn(buttonVariants({ variant: "outline", size: "md" }), "gap-2")}
          >
            <ArrowLeft className="h-4 w-4" />
            {backLabel}
          </Link>
        }
      />
      <Section spacing="md">
        <div className="mx-auto max-w-lg hud-panel relative overflow-hidden rounded-2xl p-10 text-center">
          <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
          <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
          <p className={BODY_MUTED}>
            This feature will be built in a later phase. Check back soon.
          </p>
        </div>
      </Section>
    </MarketingPage>
  );
}

export { PlaceholderPage };
