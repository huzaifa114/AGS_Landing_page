"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { MobileNav } from "./mobile-nav";
import { AuthNav } from "./auth-nav";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandLogo } from "@/components/brand/brand-logo";
import { navigation } from "@/data/site-content";

export interface SiteHeaderProps {
  className?: string;
}

function SiteHeader({ className }: SiteHeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur-md dark:border-border/60 dark:bg-surface/90",
          className
        )}
      >
        <Container>
          <div className="flex h-16 items-center justify-between lg:h-[72px]">
            <div className="flex items-center gap-8 lg:gap-10">
              <BrandLogo size="sm" />
              <nav
                className="hidden items-center gap-0.5 lg:flex"
                aria-label="Main navigation"
              >
                {navigation.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-lg px-3 py-2 text-body-sm font-medium text-foreground/75 transition-colors hover:bg-indigo-50 hover:text-foreground dark:hover:bg-surface-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <ThemeToggle compact />
              <AuthNav />
              <Link
                href={navigation.submitCards.href}
                className={cn(
                  buttonVariants({ variant: "primary", size: "sm" }),
                  "hidden font-semibold text-white sm:inline-flex"
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
        </Container>
      </header>

      <MobileNav
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        navItems={[...navigation.items]}
      />
    </>
  );
}

export { SiteHeader };
