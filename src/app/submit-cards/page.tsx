import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SubmissionFlowPreview } from "@/components/marketing/submission-flow-preview";
import { CTABand } from "@/components/marketing/cta-band";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";
import { submitCardsPage } from "@/data/site-content";

export const metadata: Metadata = {
  title: submitCardsPage.meta.title,
  description: submitCardsPage.meta.description,
};

export default function SubmitCardsPage() {
  const content = submitCardsPage;

  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Submit"
        align="center"
        title={content.hero.title}
        description={content.hero.description}
      />

      <Section spacing="lg">
        <SubmissionFlowPreview />
      </Section>

      <CTABand
        title="Ready to submit?"
        description="Create an account or sign in to begin your grading submission."
        variant="premium"
        actions={
          <Link
            href="/login?callbackUrl=/submit-cards"
            className={buttonVariants({ variant: "light", size: "md" })}
          >
            {content.cta}
          </Link>
        }
      />
    </MarketingPage>
  );
}
