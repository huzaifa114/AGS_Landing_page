import { redirect } from "next/navigation";

interface VerifyLegacyRedirectProps {
  params: Promise<{ certificationNumber: string }>;
}

export default async function VerifyLegacyRedirect({
  params,
}: VerifyLegacyRedirectProps) {
  const { certificationNumber } = await params;
  redirect(`/verify-certification/${certificationNumber}`);
}
