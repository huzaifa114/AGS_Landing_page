import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Checklist } from "@/components/marketing/checklist";
import { CTABand } from "@/components/marketing/cta-band";
import { AnimatedBlock } from "@/components/motion/animated-block";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { pricingPage } from "@/data/site-content";
import { BODY_MUTED, HEADING_DISPLAY, PAGE_HERO_TITLE } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: pricingPage.meta.title,
  description: pricingPage.meta.description,
};

export default function PricingPage() {
  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Pricing"
        align="center"
        title={pricingPage.hero.title}
        description={pricingPage.hero.description}
      />

      <Section spacing="md">
        <AnimatedBlock>
          <div className="mx-auto max-w-lg">
            <Card className="overflow-hidden border-border/80 shadow-premium ai-console">
              <div className="gradient-premium px-8 py-12 text-center text-white">
                <p className="text-caption text-white/80">{pricingPage.price.label}</p>
                <p className={cn("mt-2", HEADING_DISPLAY, PAGE_HERO_TITLE, "text-white")}>{pricingPage.price.amount}</p>
                <p className={cn("mt-4 text-body-md text-white/90")}>{pricingPage.price.turnaround}</p>
              </div>
              <CardContent className="p-6 text-center">
                <p className={BODY_MUTED}>{pricingPage.price.note}</p>
              </CardContent>
            </Card>
          </div>
        </AnimatedBlock>
      </Section>

      <Section spacing="md" className="bg-surface-muted/50">
        <AnimatedBlock>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <SectionIntro align="left" title={pricingPage.included.title} description={pricingPage.included.subtitle} />
            </div>
            <Checklist items={pricingPage.included.items.map((text) => ({ text }))} />
          </div>
        </AnimatedBlock>
      </Section>

      <Section spacing="md">
        <AnimatedBlock>
          <div className="mx-auto max-w-2xl space-y-3 text-center">
            {pricingPage.simplicity.map((line) => (
              <p key={line} className={BODY_MUTED}>
                {line}
              </p>
            ))}
          </div>
        </AnimatedBlock>
      </Section>

      <AnimatedBlock>
        <CTABand
          title={pricingPage.cta.title}
          description={pricingPage.cta.description}
          variant="premium"
          actions={
            <Link
              href="/submit-cards"
              className={buttonVariants({ variant: "light", size: "md" })}
            >
              {pricingPage.cta.button}
            </Link>
          }
        />
      </AnimatedBlock>
    </MarketingPage>
  );
}
