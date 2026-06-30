import { sendEmail } from "@/lib/email/index";

function dealerDashboardUrl(): string {
  const base =
    process.env.AUTH_URL ?? process.env.NEXTAUTH_URL ?? "http://localhost:3000";
  return `${base}/account/dealer`;
}

export async function sendDealerApplicationReceivedEmail(
  email: string,
  businessName: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: "White Whale Dealer Application Received",
    text: `Hi,\n\nWe received your dealer application for ${businessName}.\n\nOur team will review your request and follow up soon.\n\nTrack status: ${dealerDashboardUrl()}`,
    html: `
      <p>We received your dealer application for <strong>${businessName}</strong>.</p>
      <p>Our team will review your request and follow up soon.</p>
      <p><a href="${dealerDashboardUrl()}">View application status</a></p>
    `,
  });
}

export async function sendDealerApprovedEmail(
  email: string,
  businessName: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: "Welcome to the White Whale Dealer Program",
    text: `Congratulations — ${businessName} has been approved for the White Whale Dealer Program.\n\nAccess your dealer dashboard: ${dealerDashboardUrl()}`,
    html: `
      <p>Congratulations — <strong>${businessName}</strong> has been approved for the White Whale Dealer Program.</p>
      <p><a href="${dealerDashboardUrl()}">Open Dealer Dashboard</a></p>
    `,
  });
}

export async function sendDealerRejectedEmail(
  email: string,
  businessName: string,
  reason?: string
): Promise<void> {
  await sendEmail({
    to: email,
    subject: "White Whale Dealer Application Update",
    text: `Thank you for applying with ${businessName}.\n\nWe are unable to approve your dealer application at this time.${reason ? `\n\nReason: ${reason}` : ""}\n\nYou may reapply in the future as your business grows.`,
    html: `
      <p>Thank you for applying with <strong>${businessName}</strong>.</p>
      <p>We are unable to approve your dealer application at this time.</p>
      ${reason ? `<p><strong>Reason:</strong> ${reason}</p>` : ""}
      <p>You may reapply in the future as your business grows.</p>
    `,
  });
}
