export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text: string;
}

async function sendEmail(payload: EmailPayload): Promise<void> {
  const hasSmtp =
    process.env.SMTP_HOST &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASSWORD;

  if (hasSmtp) {
    console.info("[email:smtp] Would send via SMTP:", payload.subject, "→", payload.to);
    return;
  }

  console.info("\n--- Mock Email ---");
  console.info("To:", payload.to);
  console.info("Subject:", payload.subject);
  console.info("Body:\n", payload.text);
  console.info("--- End Email ---\n");
}

function baseUrl(): string {
  return process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";
}

function fromAddress(): string {
  return process.env.EMAIL_FROM ?? "White Whale <noreply@whitewhale.com>";
}

export { sendEmail, baseUrl };

export async function sendVerificationEmail(
  email: string,
  token: string
): Promise<void> {
  const url = `${baseUrl()}/verify-email/${token}`;

  await sendEmail({
    to: email,
    subject: "Verify your White Whale account",
    text: `Welcome to White Whale.\n\nVerify your email: ${url}\n\nThis link expires in 24 hours.`,
    html: `
      <p>Welcome to White Whale.</p>
      <p><a href="${url}">Verify your email address</a></p>
      <p>This link expires in 24 hours.</p>
    `,
  });

  void fromAddress();
}

export async function sendPasswordResetEmail(
  email: string,
  token: string
): Promise<void> {
  const url = `${baseUrl()}/reset-password/${token}`;

  await sendEmail({
    to: email,
    subject: "Reset your White Whale password",
    text: `Reset your password: ${url}\n\nThis link expires in 1 hour. If you didn't request this, ignore this email.`,
    html: `
      <p>Reset your White Whale password:</p>
      <p><a href="${url}">Reset Password</a></p>
      <p>This link expires in 1 hour.</p>
    `,
  });
}
