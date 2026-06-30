import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Checklist } from "@/components/marketing/checklist";
import { CTABand } from "@/components/marketing/cta-band";
import { AnimatedBlock } from "@/components/motion/animated-block";
import { Section } from "@/components/ui/section";
import { PricingHeroCard } from "@/components/marketing/pricing-hero-card";
import { buttonVariants } from "@/components/ui/button";
import { pricingPage } from "@/data/site-content";
import { BODY_MUTED } from "@/lib/typography";

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
          <div className="mx-auto max-w-md">
            <PricingHeroCard
              label={pricingPage.price.label}
              amount={pricingPage.price.amount}
              turnaround={pricingPage.price.turnaround}
              note={pricingPage.price.note}
              ctaLabel={pricingPage.cta.button}
            />
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
