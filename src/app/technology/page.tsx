import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Layers, Workflow } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { PremiumCard } from "@/components/sections/premium-card";
import { Checklist } from "@/components/marketing/checklist";
import { CTABand } from "@/components/marketing/cta-band";
import { AnimatedBlock } from "@/components/motion/animated-block";
import { StaggerItem, StaggerReveal } from "@/components/motion/stagger-reveal";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { technologyPage } from "@/data/site-content";
import { BODY_MUTED, BODY_TEXT } from "@/lib/typography";
import { cn } from "@/lib/utils";

const processIcons = [Workflow, Camera, Layers];

export const metadata: Metadata = {
  title: technologyPage.meta.title,
  description: technologyPage.meta.description,
};

export default function TechnologyPage() {
  const content = technologyPage;

  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Technology"
        align="center"
        title={content.hero.title}
        description={content.hero.description}
      />

      <Section spacing="md">
        <AnimatedBlock>
          <SectionIntro title={content.coreTechnology.title} />
        </AnimatedBlock>
        <AnimatedBlock delay={0.08}>
          <ul className={cn("mx-auto mt-6 max-w-3xl space-y-2", BODY_MUTED)}>
            {content.coreTechnology.principles.map((line) => (
              <li key={line} className="leading-relaxed">
                {line}
              </li>
            ))}
          </ul>
        </AnimatedBlock>
        <StaggerReveal className="mt-8 grid gap-5 lg:grid-cols-3">
          {content.coreTechnology.items.map((item, index) => {
            const Icon = processIcons[index];
            return (
              <StaggerItem key={item.title} index={index}>
                <PremiumCard
                  icon={<Icon className="h-5 w-5" />}
                  title={item.title}
                  description={item.description}
                />
              </StaggerItem>
            );
          })}
        </StaggerReveal>
      </Section>

      <Section spacing="md" className="bg-surface-muted/50">
        <AnimatedBlock>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <SectionIntro
              align="left"
              title={content.imaging.title}
              description={content.imaging.description}
            />
            <Checklist items={content.imaging.checklist.map((text) => ({ text }))} />
          </div>
        </AnimatedBlock>
      </Section>

      <Section spacing="md">
        <AnimatedBlock>
          <div className={cn("mx-auto max-w-3xl space-y-4", BODY_MUTED)}>
            <SectionIntro align="left" title={content.whyTech.title} />
            {content.whyTech.paragraphs.map((paragraph, index) => (
              <p
                key={paragraph}
                className={
                  index === content.whyTech.paragraphs.length - 1
                    ? cn(BODY_TEXT, "font-semibold")
                    : undefined
                }
              >
                {paragraph}
              </p>
            ))}
          </div>
        </AnimatedBlock>
      </Section>

      <AnimatedBlock>
        <CTABand
          title={content.cta.title}
          description={content.cta.description}
          actions={
            <Link
              href="/digital-reports"
              className={buttonVariants({ size: "md", className: "text-white" })}
            >
              {content.cta.button}
            </Link>
          }
        />
      </AnimatedBlock>
    </MarketingPage>
  );
}
