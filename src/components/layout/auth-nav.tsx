import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { navigation } from "@/data/site-content";
import { cn } from "@/lib/utils";

function AuthNav() {
  return (
    <Link
      href={navigation.login.href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "hidden font-medium text-foreground sm:inline-flex"
      )}
    >
      {navigation.login.label}
    </Link>
  );
}

export { AuthNav };
