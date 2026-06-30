"use client";

import { useState } from "react";
import {
  ArrowRight,
  Award,
  BarChart3,
  FileText,
  Inbox,
  Mail,
  Search,
  Shield,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { StatusPill } from "@/components/ui/status-pill";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { Modal } from "@/components/ui/modal";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EmptyState } from "@/components/ui/empty-state";
import { FeatureCard } from "@/components/marketing/feature-card";
import { MetricCard } from "@/components/marketing/metric-card";
import { CTABand } from "@/components/marketing/cta-band";
import { TimelineStep } from "@/components/marketing/timeline-step";
import { Checklist } from "@/components/marketing/checklist";
import { cn } from "@/lib/utils";

const colorSwatches = [
  { name: "Background", var: "--color-background" },
  { name: "Surface", var: "--color-surface" },
  { name: "Surface Muted", var: "--color-surface-muted" },
  { name: "Foreground", var: "--color-foreground" },
  { name: "Muted", var: "--color-muted" },
  { name: "Border", var: "--color-border" },
  { name: "Primary", var: "--color-primary" },
  { name: "Accent", var: "--color-accent" },
  { name: "Accent Soft", var: "--color-accent-soft" },
  { name: "Success", var: "--color-success" },
  { name: "Warning", var: "--color-warning" },
  { name: "Error", var: "--color-error" },
  { name: "Info", var: "--color-info" },
  { name: "Premium", var: "--color-premium" },
];

const typographyScale = [
  { label: "Display XL", className: "text-display-xl", sample: "Consistent Grading" },
  { label: "Display LG", className: "text-display-lg", sample: "Transparent Results" },
  { label: "H1", className: "text-h1", sample: "Premium Card Grading" },
  { label: "H2", className: "text-h2", sample: "Built for Collectors" },
  { label: "H3", className: "text-h3", sample: "Digital Certification" },
  { label: "H4", className: "text-h4", sample: "Submission Details" },
  { label: "Body LG", className: "text-body-lg", sample: "Large body text for introductions and key messaging." },
  { label: "Body MD", className: "text-body-md", sample: "Standard body text for paragraphs and descriptions." },
  { label: "Body SM", className: "text-body-sm", sample: "Small body text for secondary information." },
  { label: "Caption", className: "text-caption", sample: "Eyebrow Label" },
];

function ShowcaseSection({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <Section id={id} spacing="lg" className="border-b border-border">
      <div className="mb-10">
        <p className="text-caption text-accent">{id.replace(/-/g, " ")}</p>
        <h2 className="mt-2 text-h2 font-semibold">{title}</h2>
        {description && (
          <p className="mt-3 max-w-2xl text-body-md text-muted">{description}</p>
        )}
      </div>
      {children}
    </Section>
  );
}

export default function DesignSystemPage() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <SiteHeader />
      <main className="gradient-dashboard min-h-screen">
        <Section spacing="lg" className="border-b border-border gradient-hero">
          <div className="max-w-3xl">
            <p className="text-caption text-accent">Phase 1</p>
            <h1 className="mt-3 text-display-lg font-semibold sm:text-display-xl">
              White Whale Design System
            </h1>
            <p className="mt-6 text-body-lg text-muted">
              Complete foundation of design tokens, UI components, marketing
              primitives, and dashboard patterns for the White Whale platform.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              {[
                "Brand Colors",
                "Typography",
                "Buttons",
                "Forms",
                "Cards",
                "Badges",
                "Marketing",
                "Dashboard",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="rounded-full border border-border bg-surface px-4 py-2 text-body-sm text-muted transition-colors hover:border-border-strong hover:text-foreground"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </Section>

        <ShowcaseSection
          id="brand-colors"
          title="Brand Colors"
          description="Premium light-first palette with deep navy primary and refined semantic colors."
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7">
            {colorSwatches.map((swatch) => (
              <div key={swatch.var} className="flex flex-col gap-2">
                <div
                  className="h-20 rounded-xl border border-border shadow-sm"
                  style={{ backgroundColor: `var(${swatch.var})` }}
                />
                <p className="text-body-sm font-medium">{swatch.name}</p>
                <p className="text-body-sm text-muted-foreground font-mono text-xs">
                  {swatch.var}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["gradient-hero", "gradient-card", "gradient-premium", "gradient-dashboard"].map(
              (gradient) => (
                <div key={gradient} className="flex flex-col gap-2">
                  <div
                    className={cn("h-24 rounded-xl border border-border", gradient)}
                  />
                  <p className="text-body-sm font-medium">{gradient}</p>
                </div>
              )
            )}
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="typography"
          title="Typography Scale"
          description="Inter-based type system with Apple-inspired display headings and generous line heights."
        >
          <div className="flex flex-col gap-8">
            {typographyScale.map((type) => (
              <div
                key={type.label}
                className="flex flex-col gap-2 border-b border-border pb-8 last:border-0"
              >
                <p className="text-body-sm font-medium text-muted">
                  {type.label}
                </p>
                <p className={cn(type.className, "text-foreground")}>
                  {type.sample}
                </p>
              </div>
            ))}
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="buttons"
          title="Button System"
          description="Seven variants and four sizes with loading, icon, and disabled states."
        >
          <div className="space-y-10">
            <div>
              <p className="mb-4 text-body-sm font-medium text-muted">Variants</p>
              <div className="flex flex-wrap gap-4">
                <Button variant="primary">Primary</Button>
                <Button variant="secondary">Secondary</Button>
                <Button variant="ghost">Ghost</Button>
                <Button variant="outline">Outline</Button>
                <Button variant="text">Text Link</Button>
                <Button variant="dark">Dark</Button>
                <Button variant="light">Light</Button>
              </div>
            </div>
            <div>
              <p className="mb-4 text-body-sm font-medium text-muted">Sizes</p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="sm">Small</Button>
                <Button size="md">Medium</Button>
                <Button size="lg">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>
            <div>
              <p className="mb-4 text-body-sm font-medium text-muted">States</p>
              <div className="flex flex-wrap gap-4">
                <Button loading>Loading</Button>
                <Button disabled>Disabled</Button>
                <Button iconRight={<ArrowRight className="h-4 w-4" />}>
                  With Icon
                </Button>
              </div>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="forms"
          title="Form Components"
          description="Accessible form fields with labels, helper text, and validation states."
        >
          <div className="grid gap-8 lg:grid-cols-2">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              helperText="We'll never share your email."
              iconLeft={<Mail className="h-4 w-4" />}
            />
            <Input
              label="Certification number"
              placeholder="WW-000000"
              error="Invalid certification number"
              iconLeft={<Search className="h-4 w-4" />}
            />
            <Input
              label="Card value"
              placeholder="$0.00"
              success
              defaultValue="$1,250.00"
            />
            <Select
              label="Service tier"
              placeholder="Select a tier"
              options={[
                { value: "standard", label: "Standard" },
                { value: "express", label: "Express" },
                { value: "premium", label: "Premium" },
              ]}
              helperText="Turnaround times vary by tier."
            />
            <Textarea
              label="Special instructions"
              placeholder="Any notes about your submission..."
              helperText="Optional — max 500 characters"
            />
            <div className="flex flex-col gap-4">
              <Checkbox
                label="I agree to the grading terms"
                helperText="Required before submission"
              />
              <Checkbox
                label="Email me when grading is complete"
                defaultChecked
              />
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="cards"
          title="Card Components"
          description="Base card system with subtle borders and premium spacing."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Base Card</CardTitle>
                <CardDescription>
                  Foundation card component for all surfaces.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-muted">
                  Clean borders, soft shadows, generous padding.
                </p>
              </CardContent>
            </Card>
            <Card className="gradient-card">
              <CardHeader>
                <CardTitle>Gradient Card</CardTitle>
                <CardDescription>Subtle gradient surface</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-muted">
                  Used for highlighted content areas.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-premium">
              <CardHeader>
                <CardTitle>Premium Shadow</CardTitle>
                <CardDescription>Elevated surface treatment</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-body-sm text-muted">
                  For hero elements and featured content.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="outline" onClick={() => setModalOpen(true)}>
              Open Modal
            </Button>
          </div>
          <Modal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            title="Example Modal"
            description="Modal component for dialogs and confirmations."
          >
            <p className="text-body-sm text-muted">
              This modal uses the native dialog element with accessible focus
              management and backdrop styling.
            </p>
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setModalOpen(false)}>Confirm</Button>
            </div>
          </Modal>

          <div className="mt-10">
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>
              <TabsContent value="overview">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-body-sm text-muted">
                      Tab content for overview section.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="details">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-body-sm text-muted">
                      Tab content for details section.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="history">
                <Card>
                  <CardContent className="p-6">
                    <p className="text-body-sm text-muted">
                      Tab content for history section.
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div className="mt-10">
            <EmptyState
              icon={<Inbox className="h-5 w-5" />}
              title="No submissions yet"
              description="Submit your first cards to start tracking your grading journey."
              action={<Button>Submit Cards</Button>}
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="badges"
          title="Badges & Status Pills"
          description="Status indicators for submissions, certifications, and reports."
        >
          <div className="space-y-8">
            <div>
              <p className="mb-4 text-body-sm font-medium text-muted">Badges</p>
              <div className="flex flex-wrap gap-3">
                <Badge>Default</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="error">Error</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="neutral">Neutral</Badge>
                <Badge variant="premium">Premium</Badge>
              </div>
            </div>
            <div>
              <p className="mb-4 text-body-sm font-medium text-muted">
                Status Pills
              </p>
              <div className="flex flex-wrap gap-3">
                <StatusPill>Default</StatusPill>
                <StatusPill variant="success">Graded</StatusPill>
                <StatusPill variant="warning">Pending</StatusPill>
                <StatusPill variant="error">Rejected</StatusPill>
                <StatusPill variant="info">In Review</StatusPill>
                <StatusPill variant="neutral">Draft</StatusPill>
                <StatusPill variant="premium">Vaulted</StatusPill>
              </div>
            </div>
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="marketing"
          title="Marketing Components"
          description="Primitives for homepage, product pages, and conversion sections."
        >
          <div className="space-y-16">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Shield className="h-5 w-5" />}
                title="Consistent Standards"
                description="Every card graded to the same rigorous criteria with full process transparency."
              />
              <FeatureCard
                icon={<FileText className="h-5 w-5" />}
                title="Digital Reports"
                description="Detailed certification reports with clear grading breakdowns."
              />
              <FeatureCard
                icon={<Sparkles className="h-5 w-5" />}
                title="Premium Experience"
                description="Collector-first design that treats your cards as valuable assets."
              />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <MetricCard
                label="Cards Graded"
                value="50K+"
                change="+12% this quarter"
                trend="up"
                icon={<Award className="h-5 w-5" />}
              />
              <MetricCard
                label="Avg. Turnaround"
                value="7 days"
                change="Industry leading"
                trend="neutral"
                icon={<TrendingUp className="h-5 w-5" />}
              />
              <MetricCard
                label="Collector Rating"
                value="4.9"
                change="+0.2 from last year"
                trend="up"
                icon={<BarChart3 className="h-5 w-5" />}
              />
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <TimelineStep
                step={1}
                title="Submit your cards"
                description="Ship your cards with our secure submission process and track every step."
              />
              <TimelineStep
                step={2}
                title="Expert grading"
                description="Our team applies consistent standards with full documentation."
                isLast
              />
            </div>

            <Checklist
              items={[
                {
                  text: "Consistent grading standards",
                  description: "Every grader follows the same documented criteria.",
                },
                {
                  text: "Transparent digital reports",
                  description: "Full grading breakdown accessible online.",
                },
                {
                  text: "Secure vault storage",
                  description: "Optional vaulting for high-value certifications.",
                },
              ]}
            />

            <CTABand
              title="Start your grading journey"
              description="Join collectors who trust White Whale for consistent, transparent results."
              variant="premium"
              actions={
                <>
                  <Button variant="light" size="lg">
                    Submit Cards
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Learn More
                  </Button>
                </>
              }
            />
          </div>
        </ShowcaseSection>

        <ShowcaseSection
          id="navigation"
          title="Navigation Preview"
          description="Sticky header with desktop nav and mobile drawer."
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
            <SiteHeader className="relative" />
            <div className="p-8 text-center text-body-sm text-muted">
              Header shown above — scroll the page to see sticky behavior.
            </div>
          </div>
        </ShowcaseSection>

        <Section id="footer-preview" spacing="lg">
          <div className="mb-10">
            <p className="text-caption text-accent">footer preview</p>
            <h2 className="mt-2 text-h2 font-semibold">Footer Preview</h2>
            <p className="mt-3 max-w-2xl text-body-md text-muted">
              Site footer with product, company, and legal columns.
            </p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-border">
            <SiteFooter />
          </div>
        </Section>
      </main>
    </>
  );
}
