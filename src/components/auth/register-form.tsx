"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, type RegisterInput } from "@/lib/validations/auth";
import { registerUser } from "@/actions/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";

function RegisterForm() {
  const router = useRouter();
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(data: RegisterInput) {
    setServerError("");
    setFieldErrors({});
    setLoading(true);

    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    const result = await registerUser(formData);
    setLoading(false);

    if (!result.success) {
      setServerError(result.message);
      if (result.errors) setFieldErrors(result.errors);
      return;
    }

    router.push("/login?registered=true");
  }

  function fieldError(name: keyof RegisterInput) {
    return errors[name]?.message || fieldErrors[name]?.[0];
  }

  return (
    <AuthCard
      title="Create your account"
      description="Join White Whale to manage your grading submissions"
      footer={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-medium text-primary hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      {serverError && (
        <p className="mb-6 rounded-xl border border-error/30 bg-error-soft p-4 text-body-sm text-error" role="alert">
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <div className="grid gap-5 sm:grid-cols-2">
          <Input
            label="First Name"
            autoComplete="given-name"
            placeholder="First name"
            error={fieldError("firstName")}
            {...register("firstName")}
          />
          <Input
            label="Last Name"
            autoComplete="family-name"
            placeholder="Last name"
            error={fieldError("lastName")}
            {...register("lastName")}
          />
        </div>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={fieldError("email")}
          {...register("email")}
        />
        <PasswordField
          label="Password"
          autoComplete="new-password"
          placeholder="Create a password"
          helperText="At least 8 characters with uppercase, lowercase, number, and special character"
          error={fieldError("password")}
          {...register("password")}
        />
        <PasswordField
          label="Confirm Password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          error={fieldError("confirmPassword")}
          {...register("confirmPassword")}
        />
        <Button type="submit" size="lg" loading={loading} className="w-full">
          Create Account
        </Button>
      </form>
    </AuthCard>
  );
}

export { RegisterForm };
