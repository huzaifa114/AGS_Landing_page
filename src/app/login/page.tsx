import type { Metadata } from "next";
import { Suspense } from "react";
import { AuthLayout } from "@/components/auth/auth-layout";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your White Whale account.",
};

export default function LoginPage() {
  return (
    <AuthLayout>
      <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-muted" />}>
        <LoginForm />
      </Suspense>
    </AuthLayout>
  );
}
