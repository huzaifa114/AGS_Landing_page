import Link from "next/link";
import { Activity, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { StatusPill } from "@/components/ui/status-pill";
import { buttonVariants } from "@/components/ui/button";
import { CertificationImagePlaceholder } from "@/components/certifications/certification-image-placeholder";
import type { CertificationRecord } from "@/lib/certifications/types";

export interface CertificationDetailViewProps {
  certification: CertificationRecord;
  className?: string;
}

function CertificationDetailView({
  certification,
  className,
}: CertificationDetailViewProps) {
  const frontImage = certification.images.find((i) => i.imageType === "FRONT");
  const backImage = certification.images.find((i) => i.imageType === "BACK");

  const timeline = [
    {
      title: "Certification Created",
      description: `Record ${certification.certificationNumber} issued.`,
      date: certification.createdAt,
    },
    {
      title: "Grading Complete",
      description: `Final grade: ${certification.grade}`,
      date: certification.gradingDate,
    },
    ...(certification.verificationCount
      ? [
          {
            title: "Public Verifications",
            description: `Verified ${certification.verificationCount} time${certification.verificationCount === 1 ? "" : "s"} through White Whale.`,
            date: certification.updatedAt,
          },
        ]
      : []),
  ];

  return (
    <div className={cn("flex flex-col gap-8", className)}>
      <Card className="border-border/60">
        <CardContent className="p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-premium-soft text-premium">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <p className="text-caption text-muted-foreground">
                  Certification Record
                </p>
                <h2 className="font-mono text-h4 font-semibold">
                  {certification.certificationNumber}
                </h2>
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

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <p className="text-caption text-muted-foreground">Grade</p>
              <p className="mt-2 text-h2 font-semibold text-primary">
                {certification.grade}
              </p>
            </div>
            <div>
              <p className="text-caption text-muted-foreground">Grading Date</p>
              <p className="mt-2 text-body-md font-medium">
                {certification.gradingDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-caption text-muted-foreground">Submission</p>
              <p className="mt-2 font-mono text-body-md font-medium text-foreground">
                {certification.submissionNumber}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card className="border-border/60">
          <CardContent className="p-6 sm:p-8">
            <h3 className="text-h4 font-semibold">Card Information</h3>
            <p className="mt-4 text-body-md font-medium">
              {certification.card.cardName}
            </p>
            <dl className="mt-4 grid gap-3 sm:grid-cols-2">
              {certification.card.year && (
                <div>
                  <dt className="text-body-sm text-muted">Year</dt>
                  <dd className="font-medium">{certification.card.year}</dd>
                </div>
              )}
              {certification.card.setName && (
                <div>
                  <dt className="text-body-sm text-muted">Set</dt>
                  <dd className="font-medium">{certification.card.setName}</dd>
                </div>
              )}
              {certification.card.playerName && (
                <div>
                  <dt className="text-body-sm text-muted">Player</dt>
                  <dd className="font-medium">
                    {certification.card.playerName}
                  </dd>
                </div>
              )}
              {certification.card.category && (
                <div>
                  <dt className="text-body-sm text-muted">Category</dt>
                  <dd className="font-medium">{certification.card.category}</dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        <div className="grid gap-4 sm:grid-cols-2">
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

      <Card className="border-border/60">
        <CardContent className="p-6 sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h3 className="text-h4 font-semibold">Timeline</h3>
            <Link
              href={`/verify-certification/${certification.certificationNumber}`}
              className={buttonVariants({ variant: "outline", size: "md" })}
            >
              Public Verification
            </Link>
          </div>
          <div className="flex flex-col gap-0">
            {timeline.map((event, index) => {
              const isLast = index === timeline.length - 1;
              return (
                <div key={event.title} className="relative flex gap-4 pb-6 last:pb-0">
                  {!isLast && (
                    <div
                      className="absolute left-[7px] top-4 h-full w-px bg-border"
                      aria-hidden="true"
                    />
                  )}
                  <div className="relative z-10 mt-1.5 flex h-3.5 w-3.5 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-surface">
                    <Activity className="h-2 w-2 text-primary" />
                  </div>
                  <div>
                    <p className="text-body-md font-medium">{event.title}</p>
                    <p className="mt-0.5 text-body-sm text-muted">
                      {event.description}
                    </p>
                    <p className="mt-1 text-body-sm text-muted-foreground">
                      {event.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export { CertificationDetailView };
