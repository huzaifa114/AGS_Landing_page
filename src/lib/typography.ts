/** Shared typography — single source of truth site-wide */

/** Montserrat display headings */
export const HEADING_DISPLAY =
  "font-heading font-extrabold leading-[1.08] tracking-tight text-foreground dark:text-white";

/** H1 — page heroes (homepage + inner pages) */
export const PAGE_HERO_TITLE = "text-display-lg sm:text-display-xl";

/** Combined H1 classes for hero + auth pages */
export const PAGE_HERO_H1 = `${HEADING_DISPLAY} ${PAGE_HERO_TITLE}`;

/** Purple accent line on H1 (matches homepage hero) */
export const H1_ACCENT = "text-primary dark:text-violet-400";

/** H2 — section titles */
export const SECTION_TITLE = "text-h1 lg:text-display-lg";

/** Combined H2 — use on every section heading */
export const SECTION_H2 = `${HEADING_DISPLAY} ${SECTION_TITLE}`;

/** H3 / H4 — cards, panels, subsections */
export const SUBSECTION_TITLE = "text-h4";

/** Combined H3/H4 — card titles, timeline steps, feature cards */
export const CARD_H3 = `${HEADING_DISPLAY} ${SUBSECTION_TITLE}`;

/** HUD label above headings */
export const SECTION_EYEBROW =
  "font-hud text-caption font-bold uppercase tracking-[0.24em] text-primary dark:text-cyan-400";

/** Secondary line under section headings */
export const SECTION_META =
  "font-hud text-caption font-bold uppercase tracking-[0.12em] text-muted-foreground dark:text-slate-400";

/** Dates, labels, footer column titles, field labels */
export const META_TEXT =
  "font-hud text-caption font-bold uppercase tracking-[0.2em] text-muted-foreground dark:text-slate-400";

/** Hero / section lead paragraphs */
export const PAGE_LEAD =
  "text-body-md leading-relaxed text-muted-foreground dark:text-slate-400";

/** Standard body copy */
export const BODY_TEXT =
  "text-body-md leading-relaxed text-foreground dark:text-slate-300";

/** Muted body copy */
export const BODY_MUTED =
  "text-body-md leading-relaxed text-muted-foreground dark:text-slate-400";

/** Emphasized body — checklist items, closing lines, pills */
export const BODY_STRONG = `${BODY_TEXT} font-semibold`;

/** FAQ / accordion question */
export const FAQ_QUESTION = CARD_H3;

/** Large Orbitron grade — report hero, metrics band */
export const GRADE_FEATURE =
  "font-grade font-extrabold leading-none tracking-wide text-h1 lg:text-display-lg text-foreground dark:text-white";

/** Medium Orbitron grade — inline stats (72, report values) */
export const GRADE_DISPLAY =
  "font-grade font-extrabold leading-none tracking-wide text-h1 text-foreground dark:text-white";

/** Compact Orbitron grade — prices in cards */
export const GRADE_STAT =
  "font-grade font-extrabold leading-none tracking-wide text-h2 text-foreground dark:text-white";

/** Pricing hero amount — same scale as page H1 */
export const PRICE_DISPLAY = PAGE_HERO_H1;

/** Gradient grade display (digital report panel) */
export const GRADE_GRADIENT =
  "font-grade font-extrabold leading-none tracking-wide text-h1 lg:text-display-lg text-transparent bg-gradient-to-br from-indigo-600 via-primary to-violet-600 bg-clip-text dark:from-cyan-300 dark:via-white dark:to-violet-300";

/** Mono numeric data */
export const MONO_DATA_SM =
  "font-mono text-body-sm font-bold tabular-nums text-foreground dark:text-white";

/** HUD panel row labels */
export const PANEL_LABEL = `${META_TEXT} text-muted-foreground dark:text-slate-500`;

/** HUD panel compact title (metric card label row) */
export const PANEL_TITLE = `${SECTION_META} text-foreground dark:text-white/90`;

/** Timeline step number badge */
export const STEP_BADGE =
  "font-grade text-body-sm font-extrabold text-primary dark:text-indigo-300";

/** Brand logo wordmark */
export const BRAND_LOGO_LG = `${HEADING_DISPLAY} text-h3`;
export const BRAND_LOGO_SM = `${HEADING_DISPLAY} text-body-md font-bold`;

/** @deprecated Use SECTION_H2 */
export const FEATURE_SECTION_TITLE = SECTION_TITLE;

/** @deprecated Use CARD_H3 */
export const FEATURE_CARD_TITLE = CARD_H3;
