"use client";

import { MotionReveal } from "@/components/motion/motion-reveal";
import { AmbientHeroBackground } from "@/components/marketing/ambient-hero-background";
import { ImagingReportPanel } from "@/components/marketing/imaging-report-panel";
import { SectionIntro } from "@/components/marketing/section-intro";
import { Container } from "@/components/ui/container";

function ImagingShowcaseSection() {
  return (
    <section className="relative overflow-hidden section-sm pt-4">
      <AmbientHeroBackground />
      <Container className="relative z-10">
        <MotionReveal>
          <SectionIntro
            align="center"
            eyebrow="Digital Reports"
            title="Understand Your Grade"
            description="Every graded card includes a report designed to show the condition detail behind the result."
          />
        </MotionReveal>
        <div className="mt-6">
          <ImagingReportPanel />
        </div>
      </Container>
    </section>
  );
}

export { ImagingShowcaseSection };
