import { AlertCircle, CheckCircle2, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export interface VerificationNoticeProps {
  email: string;
  verified?: boolean;
  onResend?: () => void;
  resendLoading?: boolean;
  className?: string;
}

function VerificationNotice({
  email,
  verified = false,
  onResend,
  resendLoading = false,
  className,
}: VerificationNoticeProps) {
  if (verified) {
    return (
      <div
        className={cn(
          "flex items-start gap-3 rounded-xl border border-success/30 bg-success-soft p-4",
          className
        )}
        role="status"
      >
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
        <div>
          <p className="text-body-sm font-medium text-success">Email verified</p>
          <p className="mt-1 text-body-sm text-muted">{email}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-warning/30 bg-warning-soft p-4",
        className
      )}
      role="alert"
    >
      <Mail className="mt-0.5 h-5 w-5 shrink-0 text-warning" />
      <div className="flex-1">
        <p className="text-body-sm font-medium text-foreground">
          Verify your email address
        </p>
        <p className="mt-1 text-body-sm text-muted">
          We sent a verification link to <strong>{email}</strong>. Check your
          inbox to unlock full account features.
        </p>
        {onResend && (
          <Button
            variant="ghost"
            size="sm"
            className="mt-3 h-auto px-0 text-primary"
            onClick={onResend}
            loading={resendLoading}
          >
            Resend verification email
          </Button>
        )}
      </div>
    </div>
  );
}

export function VerificationError({
  title,
  message,
  className,
}: {
  title: string;
  message: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-error/30 bg-error-soft p-4",
        className
      )}
      role="alert"
    >
      <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-error" />
      <div>
        <p className="text-body-sm font-medium text-error">{title}</p>
        <p className="mt-1 text-body-sm text-muted">{message}</p>
      </div>
    </div>
  );
}

export { VerificationNotice };
