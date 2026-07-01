"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { AuthNav } from "./auth-nav";
import { BrandLogo } from "@/components/brand/brand-logo";
import { navigation } from "@/data/site-content";

const ThemedToggle = dynamic(
  () => import("@/components/theme/themed-toggle").then((m) => m.ThemedToggle),
  { ssr: false, loading: () => <span className="inline-block h-9 w-9" aria-hidden /> }
);

const MobileNav = dynamic(
  () => import("./mobile-nav").then((m) => m.MobileNav),
  { ssr: false }
);

export interface SiteHeaderProps {
  className?: string;
}

function SiteHeader({ className }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-40 px-2 pt-2 sm:px-3 lg:px-4">
        <header
          className={cn(
            "mx-auto max-w-[1440px] rounded-full border border-border bg-white/95 shadow-[0_4px_24px_rgb(0_0_0/0.06)] backdrop-blur-md",
            "dark:border-indigo-500/20 dark:bg-[rgb(12_18_36/0.92)] dark:shadow-[0_8px_32px_rgb(0_0_0/0.4)]",
            className
          )}
        >
          <div className="flex h-14 items-center justify-between gap-4 px-4 sm:h-16 sm:px-5 lg:px-6">
            <div className="flex min-w-0 items-center gap-6 lg:gap-10">
              <BrandLogo size="sm" animated />
              <nav
                className="hidden items-center gap-0.5 lg:flex"
                aria-label="Main navigation"
              >
                {navigation.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
                    className="rounded-lg px-3 py-2 text-body-sm font-medium text-foreground/75 transition-colors hover:bg-indigo-50 hover:text-foreground dark:hover:bg-surface-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex shrink-0 items-center gap-2 sm:gap-3">
              <ThemedToggle compact />
              <AuthNav />
              <Link
                href={navigation.submitCards.href}
                prefetch={false}
                className={cn(
                  buttonVariants({ variant: "primary", size: "md" }),
                  "hidden text-white sm:inline-flex"
                )}
              >
                {navigation.submitCards.label}
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                aria-expanded={mobileOpen}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </header>
      </div>

      {mobileOpen ? (
        <MobileNav
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          navItems={[...navigation.items]}
        />
      ) : null}
    </>
  );
}

export { SiteHeader };
