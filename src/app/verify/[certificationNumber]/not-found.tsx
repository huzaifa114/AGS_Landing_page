import Link from "next/link";
import type { Metadata } from "next";
import { MarketingPage } from "@/components/layout/marketing-page";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { EmptyState } from "@/components/ui/empty-state";
import { CertificationSearch } from "@/components/marketing/certification-search";
import { buttonVariants } from "@/components/ui/button";
import { ShieldX } from "lucide-react";

export const metadata: Metadata = {
  title: "Certification Not Found",
  description: "The requested certification could not be verified.",
};

export default function VerifyNotFoundPage() {
  return (
    <MarketingPage>
      <Section spacing="lg" className="gradient-dashboard">
        <Container>
          <div className="mx-auto flex max-w-xl flex-col gap-8">
            <EmptyState
              icon={<ShieldX className="h-5 w-5" />}
              title="Certification not found."
              description="We couldn't locate a certification matching that number. Please verify the certification number and try again."
              action={
                <Link href="/verify-certification" className={buttonVariants()}>
                  Try Another Number
                </Link>
              }
            />
            <CertificationSearch compact />
          </div>
        </Container>
      </Section>
    </MarketingPage>
  );
}
