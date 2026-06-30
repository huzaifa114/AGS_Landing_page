import { cn } from "@/lib/utils";
import {
  BODY_MUTED,
  HEADING_DISPLAY,
  META_TEXT,
  SUBSECTION_TITLE,
} from "@/lib/typography";

export interface LegalSection {
  title: string;
  paragraphs?: readonly string[];
  list?: readonly string[];
}

export interface LegalDocumentProps {
  lastUpdated: string;
  sections: readonly LegalSection[];
  footerNote?: string;
  className?: string;
}

function LegalDocument({ lastUpdated, sections, footerNote, className }: LegalDocumentProps) {
  return (
    <article
      className={cn(
        "hud-panel relative mx-auto max-w-3xl overflow-hidden rounded-2xl p-6 sm:p-8 lg:p-10",
        className
      )}
    >
      <span className="hud-corner left-3 top-3 border-l-2 border-t-2" aria-hidden="true" />
      <span className="hud-corner right-3 top-3 border-r-2 border-t-2" aria-hidden="true" />

      <p className={META_TEXT}>
        Last updated: {lastUpdated}
      </p>

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className={cn(HEADING_DISPLAY, SUBSECTION_TITLE)}>
              {section.title}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className={cn("mt-3", BODY_MUTED)}
              >
                {paragraph}
              </p>
            ))}
            {section.list && section.list.length > 0 && (
              <ul className={cn("mt-3 list-disc space-y-2 pl-5", BODY_MUTED)}>
                {section.list.map((item) => (
                  <li key={item}>
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {footerNote && (
        <p className={cn("mt-10 border-t border-border pt-6", BODY_MUTED)}>
          {footerNote}
        </p>
      )}
    </article>
  );
}

export { LegalDocument };
