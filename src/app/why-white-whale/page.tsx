import type { Metadata } from "next";
import Link from "next/link";
import { Eye, Shield, Clock, DollarSign } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { AnimatedFeatureCard } from "@/components/marketing/animated-feature-card";
import { CTABand } from "@/components/marketing/cta-band";
import { AnimatedBlock } from "@/components/motion/animated-block";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { whyWhiteWhalePage } from "@/data/site-content";
import { BODY_MUTED, BODY_TEXT } from "@/lib/typography";
import { cn } from "@/lib/utils";

const beliefIcons = [Eye, Shield, Clock, DollarSign];

export const metadata: Metadata = {
  title: whyWhiteWhalePage.meta.title,
  description: whyWhiteWhalePage.meta.description,
};

export default function WhyWhiteWhalePage() {
  const content = whyWhiteWhalePage;

  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Our Standard"
        align="center"
        title={content.hero.title}
        description={content.hero.description}
      />

      <Section spacing="md">
        <AnimatedBlock>
          <SectionIntro title={content.exists.title} description={content.exists.description} />
        </AnimatedBlock>
        <AnimatedBlock delay={0.08}>
          <div className={cn("mx-auto mt-6 max-w-3xl space-y-4", BODY_MUTED)}>
            {content.intro.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === content.intro.length - 1 ? cn(BODY_TEXT, "font-semibold") : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedBlock>
      </Section>

      <Section spacing="md" className="bg-surface-muted/50">
        <AnimatedBlock>
          <SectionIntro title={content.beliefs.title} />
        </AnimatedBlock>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {content.beliefs.items.map((belief, index) => {
            const Icon = beliefIcons[index];
            return (
              <AnimatedFeatureCard
                key={belief.title}
                index={index}
                icon={<Icon className="h-5 w-5" />}
                title={belief.title}
                description={belief.description}
              />
            );
          })}
        </div>
      </Section>

      <Section spacing="md">
        <AnimatedBlock>
          <div className="mx-auto max-w-3xl text-center">
            <SectionIntro
              title={content.difference.title}
              description={content.difference.description}
            />
          </div>
        </AnimatedBlock>
      </Section>

      <AnimatedBlock>
        <CTABand
          title={content.cta.title}
          description={content.cta.description}
          variant="premium"
          actions={
            <Link
              href="/submit-cards"
              className={buttonVariants({ variant: "light", size: "md" })}
            >
              {content.cta.button}
            </Link>
          }
        />
      </AnimatedBlock>
    </MarketingPage>
  );
}
