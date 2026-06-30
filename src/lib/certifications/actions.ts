"use server";

import { normalizeCertificationNumber } from "@/lib/certifications/number";
import type { CertificationRecord } from "@/lib/certifications/types";
import { getMockCertification } from "@/lib/certifications/mock-data";

export async function lookupCertificationNumber(
  rawNumber: string
): Promise<{ found: boolean; certificationNumber: string }> {
  const certificationNumber = normalizeCertificationNumber(rawNumber);
  const cert = getMockCertification(certificationNumber);

  return { found: Boolean(cert), certificationNumber };
}

export async function getCertificationByNumber(
  rawNumber: string
): Promise<CertificationRecord | null> {
  return getMockCertification(rawNumber);
}

export async function verifyCertification(
  rawNumber: string
): Promise<CertificationRecord | null> {
  const cert = getMockCertification(rawNumber);
  if (!cert || cert.status !== "ACTIVE") return null;
  return cert;
}
