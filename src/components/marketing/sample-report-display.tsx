import { ImagingReportPanel } from "@/components/marketing/imaging-report-panel";
import { cn } from "@/lib/utils";

export interface SampleReportDisplayProps {
  className?: string;
}

function SampleReportDisplay({ className }: SampleReportDisplayProps) {
  return (
    <div className={cn("w-full", className)}>
      <ImagingReportPanel />
    </div>
  );
}

export { SampleReportDisplay };
