import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Timer, Eye, Scale, Wallet } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { CinematicHero } from "@/components/marketing/cinematic-hero";
import { HomeTrustMetrics } from "@/components/marketing/home-trust-metrics";
import { BrandMarquee } from "@/components/marketing/brand-marquee";
import { TrustBullets } from "@/components/marketing/trust-bullets";
import { HeroCardStack } from "@/components/marketing/hero-card-stack";
import { AnimatedFeatureCard } from "@/components/marketing/animated-feature-card";
import { GlowingCardPair } from "@/components/marketing/glowing-card-pair";
import { StickyStackSection } from "@/components/marketing/sticky-stack-section";
import { SectionIntro } from "@/components/marketing/section-intro";
import { TimelineStep } from "@/components/marketing/timeline-step";
import { Checklist } from "@/components/marketing/checklist";
import { ImagingShowcaseSection } from "@/components/marketing/imaging-showcase-section";
import { PremiumButton } from "@/components/ui/premium-button";
import { CTABand } from "@/components/marketing/cta-band";
import { MotionReveal } from "@/components/motion/motion-reveal";
import { StaggerItem, StaggerReveal } from "@/components/motion/stagger-reveal";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { home } from "@/data/site-content";

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
};

const painPointIcons = [Timer, Eye, Scale, Wallet];

const WHITE_WHALE_STACK = [
  {
    eyebrow: "Commitment 01",
    title: "Grading You Can Repeat",
    description:
      "Controlled imaging workflows and standardized evaluation help deliver a more consistent result — card after card, submission after submission.",
  },
  {
    eyebrow: "Commitment 02",
    title: "See What Shaped Your Grade",
    description:
      "Every slab ships with a digital report that documents the condition detail behind the final grade — not just a number on a label.",
  },
  {
    eyebrow: "Commitment 03",
    title: "Back In Your Hands Fast",
    description:
      "White Whale targets a 72-hour turnaround after receipt so your cards spend less time waiting and more time in the market.",
    accent: (
      <div className="mt-6 flex items-baseline gap-3">
        <span className="font-grade text-4xl font-extrabold text-primary dark:text-cyan-300">72</span>
        <span className="text-h4 text-muted-foreground dark:text-slate-400">hour target turnaround</span>
      </div>
    ),
  },
  {
    eyebrow: "Commitment 04",
    title: "One Clear Price",
    description:
      "$10 per card. No tier maze, no surprise upcharges. Subgrades available at $20 per card when you want deeper condition breakdown.",
    accent: (
      <div className="mt-6 inline-flex rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-6 py-4 dark:border-indigo-500/30 dark:bg-indigo-500/10">
        <div>
          <p className="font-hud text-caption text-primary dark:text-indigo-300">Standard grade</p>
          <p className="font-grade text-3xl font-extrabold text-foreground dark:text-white">$10</p>
        </div>
        <div className="ml-8 border-l-2 border-indigo-200 pl-8 dark:border-white/10">
          <p className="font-hud text-caption text-primary dark:text-indigo-300">With subgrades</p>
          <p className="font-grade text-3xl font-extrabold text-foreground dark:text-white">$20</p>
        </div>
      </div>
    ),
  },
] as const;

export default function HomePage() {
  const content = home;

  return (
    <MarketingPage>
      <CinematicHero
        title={
          <>
            {content.hero.titleLine1}
            <br />
            <span className="text-primary">{content.hero.titleLine2}</span>
          </>
        }
        description={content.hero.description}
        subtext={content.hero.subtext}
        trustBullets={<TrustBullets items={[...content.trustBullets]} />}
        primaryCta={{ label: content.hero.primaryCta, href: "/submit-cards" }}
        secondaryCta={{ label: content.hero.secondaryCta, href: "/how-it-works" }}
        media={<HeroCardStack />}
      />

      <HomeTrustMetrics />

      <BrandMarquee />

      <Section spacing="md" className="bg-surface">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <MotionReveal>
              <SectionIntro
                align="left"
                title={content.collectorsDeserveBetter.title}
                size="feature"
              />
            </MotionReveal>
            <MotionReveal delay={0.08}>
              <div className="mt-4 space-y-3 text-body-sm text-muted/90 leading-relaxed sm:text-body-md">
                {content.collectorsDeserveBetter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </MotionReveal>
            <div className="mt-5 grid min-w-0 gap-3 sm:grid-cols-2">
              {content.collectorsDeserveBetter.painPoints.map((point, index) => {
                const Icon = painPointIcons[index];
                return (
                  <AnimatedFeatureCard
                    key={point.title}
                    index={index}
                    icon={<Icon className="h-5 w-5" />}
                    title={point.title}
                    description={point.description}
                  />
                );
              })}
            </div>
            <MotionReveal delay={0.2}>
              <p className="mt-5 text-body-md font-semibold text-foreground leading-relaxed">
                {content.collectorsDeserveBetter.closing}
              </p>
            </MotionReveal>
          </div>
          <MotionReveal delay={0.12} direction="none">
            <GlowingCardPair autoFlip />
          </MotionReveal>
        </div>
      </Section>

      <StickyStackSection
        header={
          <SectionIntro
            eyebrow="Our Standard"
            title={content.pillars.title}
            description={content.pillars.subtitle}
            align="left"
          />
        }
        items={[...WHITE_WHALE_STACK]}
      />

      <ImagingShowcaseSection />

      <Section spacing="md" className="bg-surface">
        <MotionReveal>
          <SectionIntro
            eyebrow={content.howItWorks.eyebrow}
            title={content.howItWorks.title}
            description={content.howItWorks.description}
          />
        </MotionReveal>
        <StaggerReveal className="mt-6 grid gap-5 lg:grid-cols-2">
          {content.howItWorks.steps.map((step, index) => (
            <StaggerItem key={step.title}>
              <TimelineStep
                step={index + 1}
                title={step.title}
                description={step.description}
                isLast={index === content.howItWorks.steps.length - 1}
              />
            </StaggerItem>
          ))}
        </StaggerReveal>
        <MotionReveal delay={0.15}>
          <div className="mt-5">
            <Link
              href="/how-it-works"
              className={cn(buttonVariants({ variant: "outline" }), "gap-2 font-semibold")}
            >
              {content.howItWorks.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </MotionReveal>
      </Section>

      <Section spacing="md" className="bg-surface-muted/70">
        <MotionReveal>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <SectionIntro align="left" title={content.moreThanGrade.title} />
              <Checklist
                className="mt-5"
                items={content.moreThanGrade.checklist.map((text) => ({ text }))}
              />
              <p className="mt-5 text-body-sm text-muted leading-relaxed sm:text-body-md">
                {content.moreThanGrade.description}
              </p>
              <div className="mt-5">
                <PremiumButton href="/sample-report" variant="outline" size="md">
                  {content.moreThanGrade.cta}
                </PremiumButton>
              </div>
            </div>
            <MotionReveal delay={0.1}>
              <GlowingCardPair />
            </MotionReveal>
          </div>
        </MotionReveal>
      </Section>

      <CTABand
        title={content.finalCta.title}
        description={content.finalCta.description}
        variant="premium"
        actions={<PremiumButton href="/submit-cards">{content.finalCta.button}</PremiumButton>}
      />
    </MarketingPage>
  );
}
