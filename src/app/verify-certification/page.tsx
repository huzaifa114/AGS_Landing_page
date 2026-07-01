import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { CertificationSearch } from "@/components/marketing/certification-search";
import { Checklist } from "@/components/marketing/checklist";
import { CTABand } from "@/components/marketing/cta-band";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { verifyChecklist, verifyPage } from "@/data/site-content";
import { BODY_TEXT } from "@/lib/typography";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: verifyPage.meta.title,
  description: verifyPage.meta.description,
};

export default function VerifyCertificationPage() {
  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Verification"
        align="center"
        title={verifyPage.hero.title}
        description={verifyPage.hero.description}
      />

      <Section spacing="md" id="verify-search">
        <div className="mx-auto max-w-md">
          <CertificationSearch compact />
        </div>
      </Section>

      <Section spacing="lg" className="bg-surface-muted/50">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <SectionIntro align="left" title={verifyPage.collectorsCanVerify.title} />
          <Checklist items={verifyChecklist.map((text) => ({ text }))} />
        </div>
      </Section>

      <Section spacing="lg">
        <div className="mx-auto max-w-3xl text-center">
          <SectionIntro
            title={verifyPage.buyersSellers.title}
            description={verifyPage.buyersSellers.description}
          />
          <p className={cn("mt-8", BODY_TEXT, "font-semibold")}>
            {verifyPage.buyersSellers.tagline}
          </p>
        </div>
      </Section>

      <CTABand
        title={verifyPage.hero.title}
        description={verifyPage.hero.description}
        actions={
          <Link href="#verify-search" className={buttonVariants({ size: "md", className: "text-white" })}>
            {verifyPage.cta.button}
          </Link>
        }
      />
    </MarketingPage>
  );
}
