import type { Metadata } from "next";
import { preload } from "react-dom";
import Link from "next/link";
import { ArrowRight, Timer, Eye, Scale, Wallet } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { CinematicHeroStatic } from "@/components/marketing/cinematic-hero-static";
import { DeferredHeroEnhancements } from "@/components/marketing/deferred-hero-enhancements";
import { BrandMarquee } from "@/components/marketing/brand-marquee";
import { TrustBullets } from "@/components/marketing/trust-bullets";
import { SectionIntro } from "@/components/marketing/section-intro";
import { TimelineStep } from "@/components/marketing/timeline-step";
import { AnimatedFeatureCard } from "@/components/marketing/animated-feature-card";
import { Checklist } from "@/components/marketing/checklist";
import { PremiumButton } from "@/components/ui/premium-button";
import { CTABand } from "@/components/marketing/cta-band";
import { CssReveal, CssStagger, CssStaggerItem } from "@/components/motion/css-reveal";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { DeferredHomeTrustMetrics } from "@/components/marketing/deferred-home-trust-metrics";
import { DeferredStandardHorizontalSection } from "@/components/marketing/deferred-standard-horizontal-section";
import { DeferredImagingShowcaseSection } from "@/components/marketing/deferred-imaging-showcase-section";
import { DeferredGlowingCardPair } from "@/components/marketing/deferred-glowing-card-pair";
import { cn } from "@/lib/utils";
import { BODY_MUTED, BODY_STRONG, GRADE_DISPLAY, GRADE_STAT, META_TEXT } from "@/lib/typography";
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
    popups: [
      { label: "Repeatable" },
      { label: "Same workflow" },
    ],
  },
  {
    eyebrow: "Commitment 02",
    title: "See What Shaped Your Grade",
    description:
      "Every slab ships with a digital report that documents the condition detail behind the final grade — not just a number on a label.",
    popups: [
      { label: "Digital report" },
      { label: "Full detail" },
    ],
  },
  {
    eyebrow: "Commitment 03",
    title: "Back In Your Hands Fast",
    description:
      "White Whale targets a 72-hour turnaround after receipt so your cards spend less time waiting and more time in the market.",
    popups: [
      { label: "72h target" },
      { label: "Fast return" },
    ],
    accent: (
      <div className="mt-6 flex items-baseline gap-3">
        <span className={cn(GRADE_DISPLAY, "text-primary dark:text-cyan-300")}>72</span>
        <span className={BODY_MUTED}>hour target turnaround</span>
      </div>
    ),
  },
  {
    eyebrow: "Commitment 04",
    title: "One Clear Price",
    description:
      "$10 per card. No tier maze, no surprise upcharges. Subgrades available at $20 per card when you want deeper condition breakdown.",
    popups: [
      { label: "$10 / card" },
      { label: "No hidden fees" },
    ],
    accent: (
      <div className="mt-6 inline-flex rounded-2xl border-2 border-indigo-200 bg-indigo-50 px-6 py-4 dark:border-indigo-500/30 dark:bg-indigo-500/10">
        <div>
          <p className={META_TEXT}>Standard grade</p>
          <p className={GRADE_STAT}>$10</p>
        </div>
        <div className="ml-8 border-l-2 border-indigo-200 pl-8 dark:border-white/10">
          <p className={META_TEXT}>With subgrades</p>
          <p className={GRADE_STAT}>$20</p>
        </div>
      </div>
    ),
  },
] as const;

export default function HomePage() {
  preload("/images/front.png", { as: "image", fetchPriority: "high" });

  const content = home;
  const heroProps = {
    title: `${content.hero.titleLine1} ${content.hero.titleLine2}`,
    description: content.hero.description,
    subtext: content.hero.subtext,
    trustBullets: <TrustBullets items={[...content.trustBullets]} />,
    primaryCta: { label: content.hero.primaryCta, href: "/submit-cards" },
    secondaryCta: { label: content.hero.secondaryCta, href: "/how-it-works" },
  };

  return (
    <MarketingPage>
      <div className="relative">
        <CinematicHeroStatic {...heroProps} />
        <DeferredHeroEnhancements />
      </div>

      <BrandMarquee />

      <div className="content-auto">
        <DeferredHomeTrustMetrics />
      </div>

      <Section spacing="md" className="content-auto bg-surface">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <div>
            <CssReveal>
              <SectionIntro
                align="left"
                title={content.collectorsDeserveBetter.title}
              />
            </CssReveal>
            <CssReveal delay={0.08}>
              <div className={cn("mt-4 space-y-3", BODY_MUTED)}>
                {content.collectorsDeserveBetter.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </CssReveal>
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
            <CssReveal delay={0.2}>
              <p className={cn("mt-5", BODY_STRONG)}>
                {content.collectorsDeserveBetter.closing}
              </p>
            </CssReveal>
          </div>
          <CssReveal delay={0.12} direction="none">
            <DeferredGlowingCardPair autoFlip />
          </CssReveal>
        </div>
      </Section>

      <DeferredStandardHorizontalSection
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

      <DeferredImagingShowcaseSection />

      <Section spacing="md" className="content-auto bg-surface">
        <CssReveal>
          <SectionIntro
            eyebrow={content.howItWorks.eyebrow}
            title={content.howItWorks.title}
            description={content.howItWorks.description}
          />
        </CssReveal>
        <CssStagger className="mt-6 grid gap-5 lg:grid-cols-2">
          {content.howItWorks.steps.map((step, index) => (
            <CssStaggerItem key={step.title} index={index}>
              <TimelineStep
                step={index + 1}
                title={step.title}
                description={step.description}
                isLast={index === content.howItWorks.steps.length - 1}
              />
            </CssStaggerItem>
          ))}
        </CssStagger>
        <CssReveal delay={0.15}>
          <div className="mt-5">
            <Link
              href="/how-it-works"
              prefetch={false}
              className={cn(buttonVariants({ variant: "outline", size: "md" }), "gap-2")}
            >
              {content.howItWorks.cta}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </CssReveal>
      </Section>

      <Section spacing="md" className="content-auto bg-surface-muted/70">
        <CssReveal>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <div>
              <SectionIntro align="left" title={content.moreThanGrade.title} />
              <Checklist
                className="mt-5"
                items={content.moreThanGrade.checklist.map((text) => ({ text }))}
              />
              <p className={cn("mt-5", BODY_MUTED)}>
                {content.moreThanGrade.description}
              </p>
              <div className="mt-5">
                <PremiumButton href="/sample-report" variant="outline">
                  {content.moreThanGrade.cta}
                </PremiumButton>
              </div>
            </div>
            <CssReveal delay={0.1}>
              <DeferredGlowingCardPair />
            </CssReveal>
          </div>
        </CssReveal>
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
