"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";

function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nextErrors: Record<string, string> = {};

    if (!String(form.get("name")).trim()) nextErrors.name = "Name is required.";
    if (!String(form.get("email")).trim()) nextErrors.email = "Email is required.";
    if (!String(form.get("subject")).trim()) nextErrors.subject = "Subject is required.";
    if (!String(form.get("message")).trim()) nextErrors.message = "Message is required.";

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <Card className="ai-console border-border/80 shadow-premium">
        <CardContent className="p-8 text-center">
          <p className="text-body-md font-medium text-foreground">
            Thanks. Contact form delivery will be connected in the backend phase.
          </p>
          <Button
            variant="ghost"
            className="mt-4"
            onClick={() => setSubmitted(false)}
          >
            Send another message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="ai-console border-border/80 shadow-premium">
      <CardContent className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="grid gap-6 sm:grid-cols-2">
            <Input
              name="name"
              label="Name"
              placeholder="Your name"
              error={errors.name}
              required
            />
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              error={errors.email}
              required
            />
          </div>
          <Input
            name="subject"
            label="Subject"
            placeholder="How can we help?"
            error={errors.subject}
            required
          />
          <Textarea
            name="message"
            label="Message"
            placeholder="Your message..."
            error={errors.message}
            required
          />
          <Button type="submit" size="lg" className="w-full sm:w-auto">
            Send Message
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export { ContactForm };
