# White Whale Component Library

Phase 1 design system foundation. All components live in `src/components/`.

## UI Primitives (`components/ui/`)

### Button
**File:** `button.tsx`

| Variant | Usage |
|---------|-------|
| `primary` | Main CTAs — Submit Cards, Sign Up |
| `secondary` | Secondary actions with subtle background |
| `ghost` | Tertiary actions, nav items |
| `outline` | Alternative secondary with border |
| `text` | Inline text links styled as buttons |
| `dark` | High-contrast actions on light backgrounds |
| `light` | Actions on dark/colored backgrounds |

| Size | Height | Usage |
|------|--------|-------|
| `sm` | 36px | Compact UI, table actions |
| `md` | 44px | Default |
| `lg` | 48px | Marketing CTAs |
| `xl` | 56px | Hero CTAs |

**Props:** `loading`, `iconLeft`, `iconRight`, `disabled`

**Future pages:** All pages — primary conversion actions

---

### Input
**File:** `input.tsx`

**Props:** `label`, `helperText`, `error`, `success`, `iconLeft`, `iconRight`

**States:** default, focus, error, disabled, success

**Future pages:** Login, Submit flow, Verify Certification, Contact, Dealer Program application

---

### Textarea
**File:** `textarea.tsx`

**Props:** `label`, `helperText`, `error`, `success`

**Future pages:** Submit flow (special instructions), Contact, Dealer Program

---

### Select
**File:** `select.tsx`

**Props:** `label`, `options`, `placeholder`, `helperText`, `error`

**Future pages:** Submit flow (service tier), Pricing calculator, Dashboard filters

---

### Checkbox
**File:** `checkbox.tsx`

**Props:** `label`, `helperText`, `error`

**Future pages:** Submit flow (terms), Registration, Settings

---

### Badge
**File:** `badge.tsx`

| Variant | Usage |
|---------|-------|
| `default` | General labels |
| `success` | Completed, approved |
| `warning` | Pending, attention needed |
| `error` | Failed, rejected |
| `info` | Informational status |
| `neutral` | Inactive, draft |
| `premium` | Vaulted, premium tier |

**Future pages:** Dashboard submissions, Report cards, Certification lookup

---

### StatusPill
**File:** `status-pill.tsx`

Same variants as Badge, with optional status dot indicator.

**Future pages:** Submission tracking, Certification status, Dealer application status

---

### Card
**File:** `card.tsx`

**Exports:** `Card`, `CardHeader`, `CardTitle`, `CardDescription`, `CardContent`, `CardFooter`

**Future pages:** Universal container for content blocks

---

### Container
**File:** `container.tsx`

| Size | Max Width |
|------|-----------|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1440px (default) |

---

### Section
**File:** `section.tsx`

**Props:** `spacing` (sm/md/lg/xl), `contained`, `containerSize`

---

### Modal
**File:** `modal.tsx`

**Props:** `open`, `onClose`, `title`, `description`, `children`

**Future pages:** Confirmations, quick views, login prompts

---

### Tabs
**File:** `tabs.tsx`

**Exports:** `Tabs`, `TabsList`, `TabsTrigger`, `TabsContent`

**Future pages:** Dashboard views, Report details, Settings

---

### EmptyState
**File:** `empty-state.tsx`

**Props:** `icon`, `title`, `description`, `action`

**Future pages:** Dashboard (no submissions), Collection (empty vault)

---

## Marketing Components (`components/marketing/`)

### HeroShell
Large hero section with eyebrow, title, description, actions, and optional media.

**Future pages:** Homepage, Why White Whale, Technology, Digital Reports, Pricing, Dealer Program

---

### FeatureCard
Icon + title + description card for feature grids.

**Future pages:** Homepage, Why White Whale, Technology, How It Works

---

### MetricCard
Stat display with label, value, and optional trend indicator.

**Future pages:** Homepage, Why White Whale, Pricing

---

### CTABand
Full-width call-to-action section with title, description, and actions.

**Variants:** `default`, `premium`

**Future pages:** All marketing pages (bottom conversion sections)

---

### TimelineStep
Numbered step with title and description for process flows.

**Future pages:** How It Works, Submit flow

---

### Checklist
List of items with check icons and optional descriptions.

**Future pages:** Why White Whale, Pricing comparison, Dealer Program benefits

---

## Dashboard Components (`components/dashboard/`)

### DashboardStatCard
Key metric display with label, value, trend, and icon.

**Future pages:** Dashboard home, Collection overview

---

### SubmissionCard
Submission summary with ID, status, card count, and date.

**Future pages:** Dashboard submissions list, Submission detail

---

### ReportPreviewCard
Certification report preview with grade, cert number, and status.

**Future pages:** Dashboard reports, Collection detail, Digital Reports

---

### VaultCard
Vaulted card display with grade, value, and vault status.

**Future pages:** Dashboard vault, Collection management

---

## Layout Components (`components/layout/`)

### SiteHeader
Sticky header with logo, desktop nav, mobile menu, Login, and Submit Cards CTA.

**Nav items:** How It Works, Pricing, Technology, Digital Reports, Verify Certification, Dealer Program

---

### SiteFooter
Footer with Product, Company, Legal columns and tagline.

**Tagline:** Consistent Grading. Transparent Results.

---

### MobileNav
Slide-out drawer navigation for mobile viewports.

---

## Design Tokens (`styles/tokens.css`)

All tokens are CSS custom properties consumed by Tailwind via `@theme inline` in `globals.css`.

### Key Token Categories
- **Colors:** background, surface, foreground, primary, accent, semantic
- **Typography:** display, heading, body, caption scales
- **Spacing:** 8pt system + section spacing utilities
- **Radius:** sm through full
- **Shadows:** xs through premium
- **Gradients:** hero, card, premium, dashboard

---

## Showcase Route

Visit `/design-system` to see all Phase 1 components rendered with sample data.

## Future Page Mapping

| Page | Primary Components |
|------|--------------------|
| Homepage | HeroShell, FeatureCard, MetricCard, CTABand |
| Why White Whale | HeroShell, FeatureCard, Checklist, CTABand |
| How It Works | HeroShell, TimelineStep, FeatureCard, CTABand |
| Technology | HeroShell, FeatureCard, MetricCard |
| Digital Reports | HeroShell, ReportPreviewCard, FeatureCard |
| Pricing | HeroShell, MetricCard, Checklist, CTABand |
| Dealer Program | HeroShell, FeatureCard, Input, Textarea, CTABand |
| Verify Certification | HeroShell, Input, ReportPreviewCard |
| Login / Register | Input, Button, Checkbox |
| Dashboard | DashboardStatCard, SubmissionCard, VaultCard |
| Submit Flow | Input, Select, Textarea, Checkbox, TimelineStep |
