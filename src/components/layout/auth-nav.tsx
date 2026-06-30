import Link from "next/link";
import { navigation } from "@/data/site-content";
import { cn } from "@/lib/utils";

function AuthNav() {
  return (
    <Link
      href={navigation.login.href}
      className={cn(
        "hidden rounded-lg px-3 py-2 text-body-sm font-medium text-foreground/75 transition-colors",
        "hover:bg-indigo-50 hover:text-foreground dark:hover:bg-surface-muted sm:inline-flex sm:items-center"
      )}
    >
      {navigation.login.label}
    </Link>
  );
}

export { AuthNav };
