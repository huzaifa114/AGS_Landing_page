import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Checklist } from "@/components/marketing/checklist";
import { ImagingReportPanel } from "@/components/marketing/imaging-report-panel";
import { AnimatedBlock } from "@/components/motion/animated-block";
import { CTABand } from "@/components/marketing/cta-band";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { digitalReportsPage } from "@/data/site-content";
import { BODY_MUTED } from "@/lib/typography";

export const metadata: Metadata = {
  title: digitalReportsPage.meta.title,
  description: digitalReportsPage.meta.description,
};

export default function DigitalReportsPage() {
  const content = digitalReportsPage;

  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Digital Reports"
        align="center"
        title={content.hero.title}
        description={content.hero.description}
      />

      <Section spacing="md">
        <AnimatedBlock>
          <div className="mx-auto max-w-3xl text-center">
            <p className={BODY_MUTED}>{content.overview}</p>
          </div>
        </AnimatedBlock>
      </Section>

      <Section spacing="md" className="bg-surface-muted/50">
        <AnimatedBlock delay={0.1}>
          <ImagingReportPanel className="mx-auto max-w-4xl" />
        </AnimatedBlock>
      </Section>

      <Section spacing="md" className="bg-surface-muted/50">
        <AnimatedBlock>
          <div className="grid items-start gap-8 lg:grid-cols-2">
            <SectionIntro align="left" title={content.included.title} />
            <Checklist items={content.included.items.map((text) => ({ text }))} />
          </div>
        </AnimatedBlock>
      </Section>

      <Section spacing="md">
        <AnimatedBlock>
          <div className="mx-auto max-w-3xl text-center">
            <SectionIntro
              title={content.collectors.title}
              description={content.collectors.description}
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
