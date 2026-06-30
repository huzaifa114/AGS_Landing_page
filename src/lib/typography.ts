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

/** H3 / H4 — cards, panels, subsections */
export const SUBSECTION_TITLE = "text-h4";

/** HUD label above headings */
export const SECTION_EYEBROW =
  "font-hud text-caption font-bold uppercase tracking-[0.24em] text-primary dark:text-cyan-400";

/** Secondary line under section headings */
export const SECTION_META =
  "font-hud text-caption font-bold uppercase tracking-[0.12em] text-muted-foreground dark:text-slate-400";

/** Dates, labels, footer column titles */
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

/** @deprecated Use SECTION_TITLE */
export const FEATURE_SECTION_TITLE = SECTION_TITLE;
