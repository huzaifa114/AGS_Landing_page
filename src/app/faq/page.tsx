import type { Metadata } from "next";
import Link from "next/link";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { FAQAccordion } from "@/components/marketing/faq-accordion";
import { CTABand } from "@/components/marketing/cta-band";
import { Section } from "@/components/ui/section";
import { buttonVariants } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Frequently asked questions about White Whale card grading, pricing, turnaround, digital reports, and certification verification.",
};

const faqItems = [
  {
    question: "What does White Whale do?",
    answer:
      "White Whale provides card grading with digital reports, certification verification, and a target 72-hour turnaround.",
  },
  {
    question: "How much does grading cost?",
    answer: "Launch pricing is $10 per card.",
  },
  {
    question: "What is included with each graded card?",
    answer:
      "Each graded card includes grading, encapsulation, a digital report, certification verification, high-resolution images, and online status tracking.",
  },
  {
    question: "How fast is turnaround?",
    answer:
      "White Whale targets a 72-hour turnaround after cards are received.",
  },
  {
    question: "What is a Digital Grading Report?",
    answer:
      "A Digital Grading Report gives collectors additional visibility into the condition information behind the final grade.",
  },
  {
    question: "Can I verify a graded card?",
    answer:
      "Yes. Each graded card receives a unique certification number linked to an online record.",
  },
  {
    question: "Is the dealer program available?",
    answer:
      "White Whale offers dealer solutions for card shops, breakers, marketplace sellers, and professional submitters.",
  },
  {
    question: "Is technology replacing human grading?",
    answer:
      "No. Technology supports consistency and documentation. It does not replace the grading process.",
  },
];

export default function FAQPage() {
  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Help Center"
        align="center"
        title="Frequently Asked Questions"
        description="Answers to common questions about White Whale grading, pricing, and certification."
      />

      <Section spacing="lg">
        <div className="mx-auto max-w-3xl">
          <FAQAccordion items={faqItems} />
        </div>
      </Section>

      <CTABand
        title="Still have questions?"
        description="Submit your cards or contact our team for more information."
        actions={
          <Link href="/submit-cards" className={buttonVariants({ size: "lg" })}>
            Submit Cards
          </Link>
        }
      />
    </MarketingPage>
  );
}
