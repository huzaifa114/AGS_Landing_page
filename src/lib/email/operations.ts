import { baseUrl } from "@/lib/email/index";
import { sendEmail } from "@/lib/email/index";

export async function sendSubmissionReceivedEmail(
  email: string,
  submissionNumber: string
) {
  await sendEmail({
    to: email,
    subject: "White Whale received your submission",
    text: `Submission ${submissionNumber} has been received and entered into our grading workflow.`,
    html: `<p>Submission <strong>${submissionNumber}</strong> has been received.</p>`,
  });
}

export async function sendImagingStartedEmail(
  email: string,
  submissionNumber: string
) {
  await sendEmail({
    to: email,
    subject: "Imaging started for your submission",
    text: `Imaging has started for ${submissionNumber}.`,
    html: `<p>Imaging has started for <strong>${submissionNumber}</strong>.</p>`,
  });
}

export async function sendGradingStartedEmail(
  email: string,
  submissionNumber: string
) {
  await sendEmail({
    to: email,
    subject: "Grading started for your submission",
    text: `Grading has started for ${submissionNumber}.`,
    html: `<p>Grading has started for <strong>${submissionNumber}</strong>.</p>`,
  });
}

export async function sendCertificationReadyEmail(
  email: string,
  certificationNumber: string
) {
  const url = `${baseUrl()}/verify-certification/${certificationNumber}`;
  await sendEmail({
    to: email,
    subject: "Your certification is ready",
    text: `Certification ${certificationNumber} is ready. Verify: ${url}`,
    html: `<p>Certification <strong>${certificationNumber}</strong> is ready. <a href="${url}">View verification</a></p>`,
  });
}

export async function sendReportReadyEmail(
  email: string,
  reportNumber: string
) {
  const url = `${baseUrl()}/reports/${reportNumber}`;
  await sendEmail({
    to: email,
    subject: "Your digital report is ready",
    text: `Report ${reportNumber} is available. View: ${url}`,
    html: `<p>Report <strong>${reportNumber}</strong> is available. <a href="${url}">View report</a></p>`,
  });
}

export async function sendSubmissionShippedEmail(
  email: string,
  submissionNumber: string
) {
  await sendEmail({
    to: email,
    subject: "Your submission has shipped",
    text: `Submission ${submissionNumber} has shipped.`,
    html: `<p>Submission <strong>${submissionNumber}</strong> has shipped.</p>`,
  });
}

export async function sendSubmissionCompletedEmail(
  email: string,
  submissionNumber: string
) {
  await sendEmail({
    to: email,
    subject: "Your submission is complete",
    text: `Submission ${submissionNumber} is complete.`,
    html: `<p>Submission <strong>${submissionNumber}</strong> is complete. Thank you for choosing White Whale.</p>`,
  });
}
