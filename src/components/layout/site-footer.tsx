import Link from "next/link";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { PremiumButton } from "@/components/ui/premium-button";
import { BrandLogo } from "@/components/brand/brand-logo";
import { brand, footer, navigation } from "@/data/site-content";
import { BODY_MUTED, META_TEXT, SECTION_EYEBROW } from "@/lib/typography";

export interface SiteFooterProps {
  className?: string;
}

function SiteFooter({ className }: SiteFooterProps) {
  return (
    <footer
      className={cn(
        "relative overflow-hidden border-t border-border bg-surface text-foreground",
        "dark:border-indigo-500/20 dark:bg-[#060a18] dark:text-slate-300",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgb(99_102_241/0.08),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_50%_0%,rgb(99_102_241/0.14),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 imaging-grid-overlay opacity-[0.06] dark:opacity-10" />

      <Container className="relative">
        <div className="section-md !py-14 sm:!py-16">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr] lg:gap-12">
            <div>
              <BrandLogo size="md" className="inline-flex" />
              <p className={cn("mt-4 max-w-sm", BODY_MUTED)}>
                {brand.footerDescription}
              </p>
              <p className={cn("mt-3", SECTION_EYEBROW)}>
                {brand.tagline}
              </p>

              <div className="mt-8">
                <PremiumButton href={navigation.submitCards.href} className="inline-flex items-center gap-2">
                  {navigation.submitCards.label}
                  <ArrowRight className="h-4 w-4" />
                </PremiumButton>
              </div>
            </div>

            <div>
              <h3 className={META_TEXT}>
                Platform
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5" role="list">
                {footer.navigation.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className={cn(BODY_MUTED, "transition-colors hover:text-foreground dark:hover:text-white")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className={META_TEXT}>
                Resources
              </h3>
              <ul className="mt-4 flex flex-col gap-2.5" role="list">
                {footer.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={false}
                      className={cn(BODY_MUTED, "transition-colors hover:text-foreground dark:hover:text-white")}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-8 dark:border-white/10 sm:flex-row sm:items-center">
            <p className={META_TEXT}>
              &copy; {new Date().getFullYear()} {brand.name}. All rights reserved.
            </p>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 dark:border-emerald-500/25 dark:bg-emerald-500/10">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
              <span className="text-caption font-hud text-emerald-700 dark:text-emerald-300">
                Certification verification online
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export { SiteFooter };
