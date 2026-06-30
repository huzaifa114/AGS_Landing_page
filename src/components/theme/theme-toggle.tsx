"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Monitor, Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const themes = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

export interface ThemeToggleProps {
  className?: string;
  compact?: boolean;
}

function ThemeToggle({ className, compact = false }: ThemeToggleProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="sm"
        className={cn("h-9 w-9 p-0", className)}
        aria-label="Theme"
        disabled
      />
    );
  }

  const active = theme ?? "system";
  const displayTheme = active === "system" ? resolvedTheme ?? "light" : active;
  const ActiveIcon =
    displayTheme === "dark" ? Moon : displayTheme === "light" ? Sun : Monitor;

  if (compact) {
    const isDark = (resolvedTheme ?? theme) === "dark";

    return (
      <div className={cn("relative", className)}>
        <Button
          variant="ghost"
          size="sm"
          className="h-9 w-9 p-0"
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          onClick={() => setTheme(isDark ? "light" : "dark")}
        >
          <ActiveIcon className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-surface-muted/60 p-1",
        className
      )}
      role="group"
      aria-label="Theme selection"
    >
      {themes.map((item) => {
        const Icon = item.icon;
        const isActive = active === item.value;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => setTheme(item.value)}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-body-sm font-medium transition-colors",
              isActive
                ? "bg-surface text-foreground shadow-xs"
                : "text-muted hover:text-foreground"
            )}
            aria-pressed={isActive}
            aria-label={`${item.label} theme`}
          >
            <Icon className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export { ThemeToggle };
