import { type ReactNode } from "react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export interface AuthLayoutProps {
  children: ReactNode;
  className?: string;
}

function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main
        className={cn(
          "gradient-hero flex min-h-[calc(100vh-72px)] items-center section-md",
          className
        )}
      >
        <Container size="sm">{children}</Container>
      </main>
      <SiteFooter />
    </>
  );
}

export { AuthLayout };
