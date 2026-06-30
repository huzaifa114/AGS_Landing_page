import type { CertificationRecord } from "@/lib/certifications/types";
import { normalizeCertificationNumber } from "@/lib/certifications/number";

const now = new Date("2025-03-15");

export const MOCK_CERTIFICATIONS: Record<string, CertificationRecord> = {
  "WW-000001": {
    id: "mock-cert-1",
    certificationNumber: "WW-000001",
    grade: "9.0",
    gradingDate: now,
    status: "ACTIVE",
    createdAt: now,
    updatedAt: now,
    submissionNumber: "WW-SUB-00001",
    card: {
      cardName: "Victor Wembanyama",
      year: "2023",
      setName: "Panini Prizm",
      cardNumber: "136",
      playerName: "Victor Wembanyama",
      category: "Basketball",
    },
    images: [
      { imageType: "FRONT", imageUrl: "/images/front.png" },
      { imageType: "BACK", imageUrl: "/images/back.png" },
    ],
    verificationCount: 128,
  },
};

export function getMockCertification(
  rawNumber: string
): CertificationRecord | null {
  const certificationNumber = normalizeCertificationNumber(rawNumber);
  return MOCK_CERTIFICATIONS[certificationNumber] ?? null;
}
