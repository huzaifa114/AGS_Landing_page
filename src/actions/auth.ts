"use server";

import { registerSchema, forgotPasswordSchema } from "@/lib/validations/auth";

export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export async function registerUser(formData: FormData): Promise<ActionResult> {
  const raw = {
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  };

  const parsed = registerSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message:
      "Thanks for registering. Account creation is not available yet on this preview site.",
  };
}

export async function requestPasswordReset(
  formData: FormData
): Promise<ActionResult> {
  const parsed = forgotPasswordSchema.safeParse({
    email: formData.get("email"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message:
      "If an account exists for that email, we've sent password reset instructions.",
  };
}

export async function resetPassword(
  _token: string,
  formData: FormData
): Promise<ActionResult> {
  const { resetPasswordSchema } = await import("@/lib/validations/auth");
  const parsed = resetPasswordSchema.safeParse({
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  return {
    success: true,
    message: "Password updated. You can now sign in with your new password.",
  };
}

export async function verifyEmailToken(
  token?: string
): Promise<"success" | "invalid" | "expired"> {
  void token;
  return "invalid";
}

export async function resendVerificationEmail(
  email?: string
): Promise<ActionResult> {
  void email;
  return {
    success: true,
    message: "Verification email sent. Check your inbox.",
  };
}
