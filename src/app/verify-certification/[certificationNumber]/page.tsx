import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { VerificationResultCard } from "@/components/certifications/verification-result-card";
import { CertificationQrCard } from "@/components/certifications/certification-qr-card";
import { CertificationSearch } from "@/components/marketing/certification-search";
import { verifyCertification } from "@/lib/certifications/actions";
import { buttonVariants } from "@/components/ui/button";

export const dynamic = "force-dynamic";

interface VerifyDetailPageProps {
  params: Promise<{ certificationNumber: string }>;
}

export async function generateMetadata({
  params,
}: VerifyDetailPageProps): Promise<Metadata> {
  const { certificationNumber } = await params;
  return {
    title: `Verify ${decodeURIComponent(certificationNumber)}`,
    description: "White Whale certification verification record.",
  };
}

export default async function VerifyCertificationDetailPage({
  params,
}: VerifyDetailPageProps) {
  const { certificationNumber } = await params;
  const certification = await verifyCertification(
    decodeURIComponent(certificationNumber)
  );

  if (!certification) {
    notFound();
  }

  return (
    <MarketingPage>
      <Section spacing="lg" className="gradient-hero">
        <Container>
          <div className="mx-auto flex max-w-4xl flex-col gap-8">
            <div>
              <Link
                href="/verify-certification"
                className={buttonVariants({ variant: "ghost", size: "sm", className: "mb-4 px-0" })}
              >
                ← Back to verification
              </Link>
              <p className="text-caption text-accent">Certification Verification</p>
              <h1 className="mt-2 text-h2 font-bold tracking-tight">Trust Record</h1>
              <p className="mt-2 max-w-2xl text-body-md text-muted">
                Consistent Grading. Transparent Results.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_220px]">
              <VerificationResultCard certification={certification} />
              <CertificationQrCard
                certificationNumber={certification.certificationNumber}
                title="Scan to Verify"
              />
            </div>
          </div>
        </Container>
      </Section>

      <Section spacing="md">
        <Container>
          <div className="mx-auto max-w-xl">
            <CertificationSearch compact />
          </div>
        </Container>
      </Section>
    </MarketingPage>
  );
}
