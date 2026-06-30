import { sendEmail, baseUrl } from "@/lib/email";

const MILESTONES = [1, 10, 100] as const;

const sentMilestones = new Set<string>();

export async function maybeSendCollectionMilestoneEmail(
  email: string,
  totalCertifications: number
): Promise<void> {
  const milestone = MILESTONES.find((value) => value === totalCertifications);
  if (!milestone) return;

  const key = `${email}:${milestone}`;
  if (sentMilestones.has(key)) return;
  sentMilestones.add(key);

  const vaultUrl = `${baseUrl()}/account/vault`;

  await sendEmail({
    to: email,
    subject: `Collection milestone: ${milestone} certification${milestone === 1 ? "" : "s"}`,
    text: `Congratulations! Your White Whale collection now includes ${milestone} certification${milestone === 1 ? "" : "s"}. View your vault: ${vaultUrl}`,
    html: `
      <p>Congratulations! Your White Whale collection now includes <strong>${milestone}</strong> certification${milestone === 1 ? "" : "s"}.</p>
      <p><a href="${vaultUrl}">Open Collection Vault</a></p>
    `,
  });
}
