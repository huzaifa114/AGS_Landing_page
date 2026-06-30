"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search, ShieldX } from "lucide-react";
import { lookupCertificationNumber } from "@/lib/certifications/actions";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { cn } from "@/lib/utils";
import { certificationSearch } from "@/data/site-content";

export interface CertificationSearchProps {
  className?: string;
  compact?: boolean;
  bare?: boolean;
}

function CertificationSearch({
  className,
  compact = false,
  bare = false,
}: CertificationSearchProps) {
  const router = useRouter();
  const [certNumber, setCertNumber] = useState("");
  const [error, setError] = useState("");
  const [notFound, setNotFound] = useState(false);
  const [searchedNumber, setSearchedNumber] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setNotFound(false);

    const trimmed = certNumber.trim();
    if (!trimmed) {
      setError(certificationSearch.emptyError);
      return;
    }

    setLoading(true);
    try {
      const result = await lookupCertificationNumber(trimmed);
      if (result.found) {
        router.push(`/verify-certification/${encodeURIComponent(result.certificationNumber)}`);
        return;
      }

      setSearchedNumber(result.certificationNumber);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  }

  function handleReset() {
    setNotFound(false);
    setCertNumber("");
    setSearchedNumber("");
    setError("");
  }

  const formContent =
    notFound ? (
      <EmptyState
        icon={<ShieldX className="h-5 w-5" />}
        title={certificationSearch.notFoundTitle}
        description={certificationSearch.notFoundDescription}
        className="border-0 bg-transparent py-8"
        action={
          <div className="flex flex-col items-center gap-2">
            <p className="font-mono text-body-sm text-muted">
              Searched: {searchedNumber}
            </p>
            <Button variant="ghost" size="sm" onClick={handleReset}>
              {certificationSearch.searchAgain}
            </Button>
          </div>
        }
      />
    ) : (
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          label={certificationSearch.label}
          placeholder={certificationSearch.placeholder}
          value={certNumber}
          onChange={(e) => setCertNumber(e.target.value)}
          error={error}
          iconLeft={<Search className="h-4 w-4" />}
        />
        <Button
          type="submit"
          variant="primary"
          className="w-full font-semibold text-white sm:w-auto"
          loading={loading}
        >
          {certificationSearch.button}
        </Button>
      </form>
    );

  if (bare) {
    return <div className={cn(className)}>{formContent}</div>;
  }

  return (
    <Card className={cn("ai-console border-border/80 shadow-premium", className)}>
      <CardContent className={cn("p-6", !compact && "sm:p-8")}>
        {formContent}
      </CardContent>
    </Card>
  );
}

export { CertificationSearch };
