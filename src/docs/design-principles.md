# White Whale Design Principles

## Brand Philosophy

White Whale is a premium card grading platform built for collectors who demand clarity, consistency, and confidence. Our core message is simple:

**Consistent Grading. Transparent Results.**

Every design decision should reinforce trust, professionalism, and the value of the collector's assets. Technology supports the story — it never becomes the story.

## Visual Direction

### Premium & Modern
- Large, confident typography with generous whitespace
- Clean surfaces with subtle depth (soft borders, refined shadows)
- Light-first theme with deep navy primary accents
- Calm, confident interactions — no visual noise

### Collector-First
- Dashboard experiences should feel like wealth management apps (Wealthfront, Monarch Money, Copilot Money)
- Cards and certifications are presented as valuable assets, not database rows
- Language and visuals speak to serious collectors, not casual users

### Trustworthy & Professional
- Clear information hierarchy
- Transparent status indicators and progress
- Accessible, readable typography at all sizes
- Consistent patterns across marketing and dashboard contexts

## Design Inspiration

| Source | Weight | What We Take |
|--------|--------|--------------|
| Apple | 40% | Large typography, clean layouts, premium product storytelling |
| Stripe | 25% | Modern layouts, strong information hierarchy, clean section flow |
| AGS | 15% | Grading-industry relevance, technology-forward structure |
| Collectr | 10% | Collection management and portfolio presentation |
| Shopify | 10% | Dashboard structure and operational workflows |

## What to Avoid

- Traditional grading company aesthetics (dated layouts, cluttered cert lookups)
- Startup AI company look (gradient overload, robot imagery, "powered by AI" messaging)
- Gaming/sports website energy (aggressive colors, action-heavy UI)
- Heavy AI or engineering-focused messaging
- Cluttered dashboards and admin-panel feeling interfaces
- Noisy backgrounds, heavy gradients, or decorative elements that compete with content

## Component Usage Rules

### Typography
- Use `text-display-xl` and `text-display-lg` only for hero headlines
- Apply `tracking-tight` (via display/heading classes) to large headings only
- Body copy should use `text-body-md` or `text-body-lg` with generous line-height
- Captions (`text-caption`) are for eyebrows and labels only — always uppercase

### Color
- Primary CTA actions use `primary` (deep navy)
- Accent blue is for highlights, links, and focus states — not primary actions
- Semantic colors (success, warning, error, info) are for status only
- Avoid using more than one strong color in a single component

### Spacing
- Follow the 8pt spacing system (4, 8, 12, 16, 24, 32, 40, 48, 64, 80, 96, 128)
- Use `Section` component with `section-sm` through `section-xl` for page rhythm
- Card internal padding should be `p-6` or `p-8` — never cramped

### Cards
- Subtle borders (`border-border`) with soft shadows (`shadow-sm`)
- Avoid heavy gradients on card surfaces
- Dashboard cards should feel asset-focused, not spreadsheet-like

### Buttons
- One primary CTA per viewport section
- Use `rounded-full` for buttons (premium, confident feel)
- Ghost and outline variants for secondary actions

### Forms
- Always include visible labels
- Helper text for context, error text for validation
- Minimum touch target height of 48px (`h-12`)

## Accessibility

- Semantic HTML elements (`header`, `nav`, `main`, `footer`, `section`)
- Visible focus states on all interactive elements
- Form fields associated with labels via `htmlFor` / `id`
- Color contrast meeting WCAG AA standards
- Mobile-responsive layouts with touch-friendly targets
- ARIA attributes on modals, tabs, and status indicators where needed

## File Organization

```
src/
├── styles/tokens.css     # Design token CSS variables
├── app/globals.css       # Global styles and utility classes
├── components/ui/        # Base UI primitives
├── components/marketing/ # Marketing page primitives
├── components/dashboard/ # Dashboard page primitives
└── components/layout/    # Header, footer, navigation
```

All page-level styling should compose from shared components and tokens — never hardcode one-off styles in pages.
