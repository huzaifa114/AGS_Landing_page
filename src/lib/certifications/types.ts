export type CertificationStatus = "ACTIVE" | "REVOKED";
export type ImageType = "FRONT" | "BACK";

export interface CertificationImageRecord {
  imageType: ImageType;
  imageUrl: string | null;
}

export interface CertificationCardDetails {
  cardName: string;
  year: string | null;
  setName: string | null;
  cardNumber: string | null;
  playerName: string | null;
  category: string | null;
}

export interface CertificationRecord {
  id: string;
  certificationNumber: string;
  grade: string;
  gradingDate: Date;
  status: CertificationStatus;
  createdAt: Date;
  updatedAt: Date;
  submissionNumber: string;
  card: CertificationCardDetails;
  images: CertificationImageRecord[];
  verificationCount?: number;
}

export interface CertificationListItem {
  id: string;
  certificationNumber: string;
  grade: string;
  gradingDate: Date;
  status: CertificationStatus;
  cardName: string;
  submissionNumber: string;
}
