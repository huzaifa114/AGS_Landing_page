"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import { BrandLogo } from "@/components/brand/brand-logo";
import { navigation } from "@/data/site-content";

const ThemedToggle = dynamic(
  () => import("@/components/theme/themed-toggle").then((m) => m.ThemedToggle),
  { ssr: false, loading: () => <span className="inline-block h-9 w-9" aria-hidden /> }
);

export interface MobileNavProps {
  open: boolean;
  onClose: () => void;
  navItems: { label: string; href: string }[];
}

function MobileNav({ open, onClose, navItems }: MobileNavProps) {
  return (
    <>
      <div
        className={cn(
          "fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm transition-opacity lg:hidden",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      <nav
        className={cn(
          "fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-surface shadow-premium transition-transform duration-300 lg:hidden",
          open ? "translate-x-0" : "translate-x-full"
        )}
        aria-label="Mobile navigation"
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between border-b border-border p-6">
          <BrandLogo size="sm" animated onClick={onClose} />
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            aria-label="Close menu"
            className="h-8 w-8 rounded-full p-0"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex flex-1 flex-col gap-1 overflow-y-auto p-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch={false}
              onClick={onClose}
              className="rounded-xl px-4 py-3 text-body-md font-medium text-foreground transition-colors hover:bg-surface-muted"
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex flex-col gap-3 border-t border-border p-6">
          <div className="flex items-center justify-between">
            <span className="text-body-sm font-medium text-foreground">Theme</span>
            <ThemedToggle />
          </div>
          <Link
            href={navigation.login.href}
            prefetch={false}
            onClick={onClose}
            className={buttonVariants({ variant: "outline", size: "md" })}
          >
            {navigation.login.label}
          </Link>
          <Link
            href={navigation.submitCards.href}
            prefetch={false}
            onClick={onClose}
            className={cn(buttonVariants({ variant: "primary", size: "md" }), "text-white")}
          >
            {navigation.submitCards.label}
          </Link>
        </div>
      </nav>
    </>
  );
}

export { MobileNav };
