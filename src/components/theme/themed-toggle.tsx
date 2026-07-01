"use client";

import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeToggle, type ThemeToggleProps } from "@/components/theme/theme-toggle";

function ThemedToggle(props: ThemeToggleProps) {
  return (
    <ThemeProvider>
      <ThemeToggle {...props} />
    </ThemeProvider>
  );
}

export { ThemedToggle };
