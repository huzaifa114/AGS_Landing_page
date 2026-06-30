import type { Metadata } from "next";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Checklist } from "@/components/marketing/checklist";
import { DealerApplicationForm } from "@/components/marketing/dealer-application-form";
import { CTABand } from "@/components/marketing/cta-band";
import { Section } from "@/components/ui/section";
import { dealerProgramPage } from "@/data/site-content";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: dealerProgramPage.meta.title,
  description: dealerProgramPage.meta.description,
};

export default function DealerProgramPage() {
  const content = dealerProgramPage;

  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Partners"
        align="center"
        title={content.hero.title}
        description={content.hero.description}
      />

      <Section spacing="lg">
        <SectionIntro
          title={content.overview.title}
          description={content.overview.description}
        />
      </Section>

      <Section spacing="lg" className="bg-surface-muted/50">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <SectionIntro align="left" title={content.benefits.title} />
          <Checklist items={content.benefits.items.map((text) => ({ text }))} />
        </div>
        <p className="mx-auto mt-10 max-w-2xl text-center text-body-lg text-muted">
          {content.tagline}
        </p>
      </Section>

      <Section spacing="lg">
        <SectionIntro
          title={content.application.title}
          description={content.application.description}
        />
        <div className="mx-auto mt-12 max-w-2xl">
          <DealerApplicationForm />
        </div>
      </Section>

      <CTABand
        title="Apply For Dealer Program"
        description="Tell us about your business and we'll be in touch."
        actions={
          <Link href="#dealer-form" className={buttonVariants({ variant: "light", size: "lg", className: "font-semibold" })}>
            Apply For Dealer Program
          </Link>
        }
      />
    </MarketingPage>
  );
}
