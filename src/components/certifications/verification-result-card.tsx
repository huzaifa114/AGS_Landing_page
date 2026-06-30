import { BadgeCheck, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { CertificationImagePlaceholder } from "@/components/certifications/certification-image-placeholder";
import type { CertificationRecord } from "@/lib/certifications/types";

export interface VerificationResultCardProps {
  certification: CertificationRecord;
  className?: string;
}

function VerificationResultCard({
  certification,
  className,
}: VerificationResultCardProps) {
  const frontImage = certification.images.find((i) => i.imageType === "FRONT");
  const backImage = certification.images.find((i) => i.imageType === "BACK");

  return (
    <Card
      className={cn(
        "overflow-hidden border-border/60 shadow-lg",
        className
      )}
    >
      <div className="border-b border-border bg-gradient-to-r from-primary/5 via-accent-soft/30 to-premium-soft/20 px-6 py-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <BadgeCheck className="h-6 w-6" />
            </div>
            <div>
              <p className="text-caption text-muted-foreground">
                Verified Certification
              </p>
              <p className="font-mono text-body-md font-semibold">
                {certification.certificationNumber}
              </p>
            </div>
          </div>
          <StatusPill
            variant={
              certification.status === "ACTIVE" ? "premium" : "warning"
            }
          >
            {certification.status === "ACTIVE" ? "Active" : "Revoked"}
          </StatusPill>
        </div>
      </div>

      <CardContent className="p-6 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div className="flex flex-col gap-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="text-caption text-muted-foreground">Grade</p>
                <p className="mt-2 text-h2 font-semibold text-primary">
                  {certification.grade}
                </p>
              </div>
              <div>
                <p className="text-caption text-muted-foreground">
                  Grading Date
                </p>
                <p className="mt-2 text-body-md font-medium">
                  {certification.gradingDate.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-surface-muted/30 p-6">
              <p className="text-caption text-muted-foreground">Card Details</p>
              <h2 className="mt-2 text-h4 font-semibold">
                {certification.card.cardName}
              </h2>
              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                {certification.card.year && (
                  <div>
                    <dt className="text-body-sm text-muted">Year</dt>
                    <dd className="text-body-md font-medium">
                      {certification.card.year}
                    </dd>
                  </div>
                )}
                {certification.card.setName && (
                  <div>
                    <dt className="text-body-sm text-muted">Set</dt>
                    <dd className="text-body-md font-medium">
                      {certification.card.setName}
                    </dd>
                  </div>
                )}
                {certification.card.playerName && (
                  <div>
                    <dt className="text-body-sm text-muted">Player</dt>
                    <dd className="text-body-md font-medium">
                      {certification.card.playerName}
                    </dd>
                  </div>
                )}
                {certification.card.cardNumber && (
                  <div>
                    <dt className="text-body-sm text-muted">Card #</dt>
                    <dd className="text-body-md font-medium">
                      {certification.card.cardNumber}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div>
              <p className="text-caption text-muted-foreground">
                Submission Number
              </p>
              <p className="mt-2 font-mono text-body-md font-medium">
                {certification.submissionNumber}
              </p>
            </div>

            <div className="flex items-start gap-3 rounded-2xl border border-success/20 bg-success-soft/40 p-5">
              <Shield className="mt-0.5 h-5 w-5 shrink-0 text-success" />
              <p className="text-body-sm text-foreground">
                This certification record has been verified through White Whale.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <CertificationImagePlaceholder
              imageType="FRONT"
              imageUrl={frontImage?.imageUrl}
            />
            <CertificationImagePlaceholder
              imageType="BACK"
              imageUrl={backImage?.imageUrl}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { VerificationResultCard };
