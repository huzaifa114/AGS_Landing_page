"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "@/lib/validations/auth";
import { resetPassword } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";

function ResetPasswordForm({ token }: { token: string }) {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordInput>({
    resolver: zodResolver(resetPasswordSchema),
  });

  async function onSubmit(data: ResetPasswordInput) {
    setServerError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const result = await resetPassword(token, formData);
    setLoading(false);

    if (!result.success) {
      setServerError(result.message);
      return;
    }

    router.push("/login?reset=true");
  }

  return (
    <AuthCard
      title="Reset your password"
      description="Choose a new password for your account"
      footer={
        <Link href="/login" className="font-medium text-primary hover:underline">
          Back to sign in
        </Link>
      }
    >
      {serverError && (
        <p className="mb-6 rounded-xl border border-error/30 bg-error-soft p-4 text-body-sm text-error" role="alert">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <PasswordField
          label="New Password"
          autoComplete="new-password"
          placeholder="New password"
          helperText="At least 8 characters with uppercase, lowercase, number, and special character"
          error={errors.password?.message}
          {...register("password")}
        />
        <PasswordField
          label="Confirm New Password"
          autoComplete="new-password"
          placeholder="Confirm new password"
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" size="md" loading={loading} className="w-full">
          Update Password
        </Button>
      </form>
    </AuthCard>
  );
}

export { ResetPasswordForm };
