import type { Metadata } from "next";
import Link from "next/link";
import { Camera, Layers, Workflow } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { PremiumCard } from "@/components/sections/premium-card";
import { Checklist } from "@/components/marketing/checklist";
import { ImagingCardShowcase } from "@/components/marketing/imaging-card-showcase";
import { ImagingReportPanel } from "@/components/marketing/imaging-report-panel";
import { AmbientHeroBackground } from "@/components/marketing/ambient-hero-background";
import { CTABand } from "@/components/marketing/cta-band";
import { AnimatedBlock } from "@/components/motion/animated-block";
import { MotionReveal } from "@/components/motion/motion-reveal";
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

      <Section spacing="sm">
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
          <div className="grid items-center gap-8 lg:grid-cols-2">
            <MotionReveal>
              <ImagingCardShowcase />
            </MotionReveal>
            <div>
              <SectionIntro
                align="left"
                title={content.imaging.title}
                description={content.imaging.description}
              />
              <Checklist className="mt-6" items={content.imaging.checklist.map((text) => ({ text }))} />
            </div>
          </div>
        </AnimatedBlock>
      </Section>

      <Section spacing="md" className="relative overflow-hidden">
        <AmbientHeroBackground />
        <div className="relative z-10">
          <MotionReveal>
            <SectionIntro
              align="center"
              eyebrow="Live preview"
              title="Condition Analytics In Every Report"
              description="Surface, edges, corners, and centering indexed in a digital grading report."
            />
          </MotionReveal>
          <MotionReveal delay={0.1}>
            <ImagingReportPanel className="mx-auto mt-6 max-w-4xl" />
          </MotionReveal>
        </div>
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
