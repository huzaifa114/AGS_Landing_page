import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { TimelineStep } from "@/components/marketing/timeline-step";
import { ImagingCardShowcase } from "@/components/marketing/imaging-card-showcase";
import { CTABand } from "@/components/marketing/cta-band";
import { AnimatedBlock } from "@/components/motion/animated-block";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { StaggerItem, StaggerReveal } from "@/components/motion/stagger-reveal";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { howItWorksPage, showcaseCardSets } from "@/data/site-content";

const slabShowcase = showcaseCardSets.find((set) => set.id === "baseball") ?? showcaseCardSets[3];

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
          <SectionIntro eyebrow="Workflow" title="Grading Process" align="left" />
        </AnimatedBlock>

        <div className="mt-8 grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <StaggerReveal className="w-full min-w-0">
            {howItWorksPage.steps.map((step, index) => (
              <StaggerItem key={step.title} index={index}>
                <TimelineStep
                  step={index + 1}
                  title={step.title}
                  description={step.description}
                  isLast={index === howItWorksPage.steps.length - 1}
                />
              </StaggerItem>
            ))}
          </StaggerReveal>

          <div className="w-full min-w-0 lg:sticky lg:top-24">
            <MotionReveal>
              <ImagingCardShowcase
                grade={slabShowcase.grade}
                frontSrc={slabShowcase.front}
                backSrc={slabShowcase.back}
                frontAlt={slabShowcase.frontAlt}
                backAlt={slabShowcase.backAlt}
                className="h-full"
              />
            </MotionReveal>
          </div>
        </div>
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
