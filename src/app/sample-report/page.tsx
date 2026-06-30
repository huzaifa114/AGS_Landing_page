import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { SectionIntro } from "@/components/marketing/section-intro";
import { SampleReportDisplay } from "@/components/marketing/sample-report-display";
import { Checklist } from "@/components/marketing/checklist";
import { CTABand } from "@/components/marketing/cta-band";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Sample Report",
  description:
    "See how White Whale digital grading reports help collectors understand the condition behind the final grade.",
};

export default function SampleReportPage() {
  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Report Preview"
        align="center"
        title="Sample Digital Grading Report"
        description="See how White Whale reports are designed to help collectors better understand the condition behind the final grade."
      />

      <Section spacing="lg">
        <SampleReportDisplay />
      </Section>

      <Section spacing="lg" className="bg-surface-muted/50">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionIntro
              align="left"
              title="Report Value"
              description="Every report is designed to give collectors the context they need to buy, sell, and collect with confidence."
            />
          </div>
          <Checklist
            items={[
              { text: "Transparent grade context" },
              { text: "High-resolution image record" },
              { text: "Certification-linked data" },
              { text: "Permanent digital record" },
            ]}
          />
        </div>
      </Section>

      <CTABand
        title="Ready to grade your cards?"
        description="Every submission includes a full digital grading report."
        variant="premium"
        actions={
          <Link href="/submit-cards" className={buttonVariants({ variant: "light", size: "md" })}>
            Submit Cards
          </Link>
        }
      />
    </MarketingPage>
  );
}
