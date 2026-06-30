import QRCode from "qrcode";
import { baseUrl } from "@/lib/email/index";

export async function getCertificationVerifyUrl(
  certificationNumber: string
): Promise<string> {
  return `${baseUrl()}/verify-certification/${encodeURIComponent(certificationNumber)}`;
}

export async function generateCertificationQrDataUrl(
  certificationNumber: string
): Promise<string> {
  const url = await getCertificationVerifyUrl(certificationNumber);
  return QRCode.toDataURL(url, {
    margin: 2,
    width: 256,
    color: { dark: "#1a2b5f", light: "#ffffff" },
  });
}
