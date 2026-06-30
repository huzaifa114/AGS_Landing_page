import type { Metadata } from "next";
import { Mail, Package, Shield } from "lucide-react";
import { MarketingPage } from "@/components/layout/marketing-page";
import { HeroShell } from "@/components/marketing/hero-shell";
import { ContactForm } from "@/components/marketing/contact-form";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact White Whale about submissions, grading, dealer accounts, or certification verification.",
};

const contactCards = [
  {
    icon: <Package className="h-5 w-5" />,
    title: "Submission Support",
    description: "Questions about submitting cards, turnaround, or tracking.",
  },
  {
    icon: <Mail className="h-5 w-5" />,
    title: "Dealer Inquiries",
    description: "Volume pricing, bulk workflows, and dealer program details.",
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: "Certification Questions",
    description: "Help with certification verification and digital reports.",
  },
];

export default function ContactPage() {
  return (
    <MarketingPage>
      <HeroShell
        eyebrow="Support"
        align="center"
        title="Contact White Whale"
        description="Have a question about submissions, grading, dealer accounts, or certification verification? Send us a message."
      />

      <Section spacing="lg">
        <div className="grid gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
          <div className="flex flex-col gap-4 lg:col-span-2">
            {contactCards.map((card) => (
              <Card key={card.title} className="hud-panel relative overflow-hidden border-0 shadow-none">
                <span className="hud-corner left-2 top-2 border-l border-t" aria-hidden="true" />
                <span className="hud-corner right-2 top-2 border-r border-t" aria-hidden="true" />
                <CardContent className="flex gap-4 p-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                    {card.icon}
                  </div>
                  <div>
                    <h3 className="text-body-md font-semibold">{card.title}</h3>
                    <p className="mt-1 text-body-sm text-muted">{card.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </Section>
    </MarketingPage>
  );
}
