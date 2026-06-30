"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginInput } from "@/lib/validations/auth";
import { AuthCard } from "@/components/auth/auth-card";
import { Input } from "@/components/ui/input";
import { PasswordField } from "@/components/auth/password-field";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { BODY_MUTED } from "@/lib/typography";

function LoginForm() {
  const [serverError, setServerError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { rememberMe: false },
  });

  const rememberMe = watch("rememberMe");

  async function onSubmit() {
    setServerError("");
    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 400));

    setLoading(false);
    setServerError(
      "Login is not available yet. Account sign-in will open in a future release."
    );
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Sign in to your White Whale account"
      footer={
        <>
          <p>
            Don&apos;t have an account?{" "}
            <Link href="/register" className="font-semibold text-primary hover:underline">
              Create account
            </Link>
          </p>
          <p className="mt-3">
            Ready to grade your cards?{" "}
            <Link href="/submit-cards" className="font-semibold text-primary hover:underline">
              Start a submission
            </Link>
          </p>
        </>
      }
    >
      {serverError && (
        <p
          className={cn("mb-6 rounded-xl border border-error/30 bg-error-soft p-4 text-error", BODY_MUTED)}
          role="alert"
        >
          {serverError}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register("email")}
        />
        <PasswordField
          label="Password"
          autoComplete="current-password"
          placeholder="Your password"
          error={errors.password?.message}
          {...register("password")}
        />
        <div className="flex items-center justify-between gap-4">
          <Checkbox
            label="Remember me"
            checked={rememberMe}
            onChange={(e) => setValue("rememberMe", e.target.checked)}
          />
          <Link
            href="/forgot-password"
            className="text-body-sm font-medium text-primary hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <Button
          type="submit"
          size="md"
          loading={loading}
          className="w-full text-white"
        >
          Login
        </Button>
      </form>
    </AuthCard>
  );
}

export { LoginForm };
