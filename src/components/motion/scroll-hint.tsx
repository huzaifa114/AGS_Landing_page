"use client";

import { ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

function ScrollHint({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return null;

  return (
    <motion.div
      className={cn("flex flex-col items-center gap-1.5", className)}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted">
        Scroll to reveal
      </span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-indigo-500/30 bg-indigo-500/10 shadow-[0_0_20px_rgb(99_102_241/0.25)]"
      >
        <ChevronDown className="h-4 w-4 text-primary" />
      </motion.div>
    </motion.div>
  );
}

export { ScrollHint };
