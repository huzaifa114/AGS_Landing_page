import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { TimelineStep } from "@/components/marketing/timeline-step";
import { CTABand } from "@/components/marketing/cta-band";
import { AnimatedBlock } from "@/components/motion/animated-block";
import { StaggerItem, StaggerReveal } from "@/components/motion/stagger-reveal";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { howItWorksPage } from "@/data/site-content";

export const metadata: Metadata = {
  title: howItWorksPage.meta.title,
  description: howItWorksPage.meta.description,
};

export default function HowItWorksPage() {
  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Process"
        align="center"
        title={howItWorksPage.hero.title}
        description={howItWorksPage.hero.description}
      />

      <Section spacing="md">
        <AnimatedBlock>
          <SectionIntro eyebrow="Workflow" title="Grading Process" align="center" />
        </AnimatedBlock>
        <StaggerReveal className="mx-auto mt-8 max-w-2xl">
          {howItWorksPage.steps.map((step, index) => (
            <StaggerItem key={step.title}>
              <TimelineStep
                step={index + 1}
                title={step.title}
                description={step.description}
                isLast={index === howItWorksPage.steps.length - 1}
              />
            </StaggerItem>
          ))}
        </StaggerReveal>
      </Section>

      <AnimatedBlock>
        <CTABand
          title={howItWorksPage.cta.title}
          description={howItWorksPage.cta.description}
          variant="premium"
          actions={
            <Link
              href="/submit-cards"
              className={buttonVariants({ variant: "light", size: "md" })}
            >
              {howItWorksPage.cta.button}
            </Link>
          }
        />
      </AnimatedBlock>
    </MarketingPage>
  );
}
