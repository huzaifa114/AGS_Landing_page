import type { Metadata } from "next";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { LegalDocument } from "@/components/marketing/legal-document";
import { Section } from "@/components/ui/section";
import { termsPage } from "@/data/site-content";

export const metadata: Metadata = {
  title: termsPage.meta.title,
  description: termsPage.meta.description,
};

export default function TermsPage() {
  const content = termsPage;

  return (
    <MarketingPage>
      <HeroShell
        eyebrow={content.hero.eyebrow}
        align="center"
        title={content.hero.title}
        description={content.hero.description}
      />

      <Section spacing="md">
        <LegalDocument
          lastUpdated={content.lastUpdated}
          sections={content.sections}
          footerNote={content.footerNote}
        />
      </Section>
    </MarketingPage>
  );
}
