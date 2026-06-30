import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { AuthCard } from "@/components/auth/auth-card";
import { VerificationError } from "@/components/auth/verification-notice";
import { verifyEmailToken } from "@/actions/auth";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your White Whale account email address.",
};

export default async function VerifyEmailPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const status = await verifyEmailToken(token);

  return (
    <AuthLayout>
      <AuthCard
        title={
          status === "success"
            ? "Email verified"
            : status === "expired"
              ? "Link expired"
              : "Invalid link"
        }
        description={
          status === "success"
            ? "Your email has been verified. You can now access all account features."
            : status === "expired"
              ? "This verification link has expired. Sign in to request a new one."
              : "This verification link is invalid or has already been used."
        }
      >
        {status === "success" ? (
          <div className="flex flex-col items-center gap-6">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-success-soft text-success">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <div className="flex w-full flex-col gap-3">
              <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "w-full")}>
                Sign In
              </Link>
              <Link
                href="/submit-cards"
                className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-full")}
              >
                Submit Cards
              </Link>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {status === "expired" ? (
              <VerificationError
                title="Verification expired"
                message="Request a new verification email after sign-in is available in a future release."
              />
            ) : (
              <VerificationError
                title="Invalid verification link"
                message="The link may have already been used or is incorrect."
              />
            )}
            <Link href="/login" className={cn(buttonVariants({ size: "lg" }), "w-full text-center")}>
              Sign In
            </Link>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
}
