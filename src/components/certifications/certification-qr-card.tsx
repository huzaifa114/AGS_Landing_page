import { generateCertificationQrDataUrl } from "@/lib/qr/certification-qr";
import { Card, CardContent } from "@/components/ui/card";

export async function CertificationQrCard({
  certificationNumber,
  title = "Verification QR",
}: {
  certificationNumber: string;
  title?: string;
}) {
  const dataUrl = await generateCertificationQrDataUrl(certificationNumber);

  return (
    <Card className="border-border/60">
      <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
        <p className="text-body-sm font-medium text-muted">{title}</p>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={dataUrl}
          alt={`QR code for certification ${certificationNumber}`}
          className="h-40 w-40 rounded-xl border border-border bg-white p-2"
        />
        <p className="font-mono text-body-sm">{certificationNumber}</p>
        <p className="text-caption text-muted-foreground">
          Scans to public verification
        </p>
      </CardContent>
    </Card>
  );
}
