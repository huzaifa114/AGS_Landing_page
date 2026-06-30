import { cn } from "@/lib/utils";

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

      <p className="font-hud text-xs uppercase tracking-[0.2em] text-muted-foreground dark:text-slate-400">
        Last updated: {lastUpdated}
      </p>

      <div className="mt-8 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-h4 font-bold text-foreground dark:text-white sm:text-h3">
              {section.title}
            </h2>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-3 text-body-sm leading-relaxed text-muted-foreground dark:text-slate-400 sm:text-body-md"
              >
                {paragraph}
              </p>
            ))}
            {section.list && section.list.length > 0 && (
              <ul className="mt-3 list-disc space-y-2 pl-5 text-body-sm text-muted-foreground dark:text-slate-400 sm:text-body-md">
                {section.list.map((item) => (
                  <li key={item} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {footerNote && (
        <p className="mt-10 border-t border-border pt-6 text-body-sm text-muted-foreground dark:text-slate-500">
          {footerNote}
        </p>
      )}
    </article>
  );
}

export { LegalDocument };
