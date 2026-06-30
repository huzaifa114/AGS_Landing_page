"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { dealerProgramPage } from "@/data/site-content";

const volumeOptions = [
  { value: "1-50", label: "1–50 cards / month" },
  { value: "51-200", label: "51–200 cards / month" },
  { value: "201-500", label: "201–500 cards / month" },
  { value: "500+", label: "500+ cards / month" },
];

function DealerApplicationForm() {
  const [submitted, setSubmitted] = useState(false);
  const content = dealerProgramPage.application;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card id="dealer-form" className="ai-console border-border/80 shadow-premium">
        <CardContent className="p-8 text-center">
          <p className="text-body-md font-semibold text-foreground">
            Application received
          </p>
          <p className="mt-2 text-body-sm text-muted">
            Thanks for your interest. Our team will review your application and
            get back to you shortly.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card id="dealer-form" className="ai-console border-border/80 shadow-premium">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input name="name" label="Name" placeholder="Your full name" required />
          <Input
            name="email"
            type="email"
            label="Email"
            placeholder="you@business.com"
            required
          />
          <Input
            name="company"
            label="Company / Shop Name"
            placeholder="Your business name"
            required
          />
          <Input name="phone" type="tel" label="Phone" placeholder="(555) 000-0000" />
          <Select
            name="volume"
            label="Estimated Monthly Submissions"
            placeholder="Select volume"
            options={volumeOptions}
            required
          />
          <Textarea
            name="message"
            label="Message"
            placeholder="Tell us about your business and submission needs..."
          />
          <Button type="submit" size="lg" className="w-full font-semibold text-white sm:w-auto">
            {content.submitButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export { DealerApplicationForm };
