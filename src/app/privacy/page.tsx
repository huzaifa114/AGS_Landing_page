import type { Metadata } from "next";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { LegalDocument } from "@/components/marketing/legal-document";
import { Section } from "@/components/ui/section";
import { privacyPage } from "@/data/site-content";

export const metadata: Metadata = {
  title: privacyPage.meta.title,
  description: privacyPage.meta.description,
};

export default function PrivacyPage() {
  const content = privacyPage;

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
