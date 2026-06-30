"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { HEADING_DISPLAY, SECTION_EYEBROW, SECTION_META, SECTION_TITLE } from "@/lib/typography";

type BrandItem = {
  name: string;
  logo: string;
  logoDark?: string;
  wide?: boolean;
  extraWide?: boolean;
};

const BRANDS: BrandItem[] = [
  { name: "Panini", logo: "/images/brands/panini.svg" },
  { name: "Topps", logo: "/images/brands/topps.svg" },
  { name: "Pokemon", logo: "/images/brands/pokemon.svg", wide: true },
  { name: "Yu-Gi-Oh!", logo: "/images/brands/yugioh.svg" },
  {
    name: "Magic: The Gathering",
    logo: "/images/brands/mtg.svg",
    logoDark: "/images/brands/mtg-dark.svg",
    extraWide: true,
  },
  { name: "Upper Deck", logo: "/images/brands/upper-deck.svg" },
  { name: "One Piece TCG", logo: "/images/brands/one-piece.svg" },
  { name: "Bowman", logo: "/images/brands/bowman.svg" },
  { name: "Donruss", logo: "/images/brands/donruss.svg" },
  { name: "NBA Prizm", logo: "/images/brands/nba.svg" },
];

function BrandPill({ brand, index }: { brand: (typeof BRANDS)[number]; index: number }) {
  const reduceMotion = useReducedMotion();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = mounted && resolvedTheme === "dark";
  const logoSrc = isDark && brand.logoDark ? brand.logoDark : brand.logo;

  return (
    <motion.div
      className={cn(
        "group relative flex h-[72px] shrink-0 items-center justify-center overflow-hidden rounded-2xl px-5",
        /* light — clean white pill */
        "border border-border bg-white shadow-sm",
        /* dark — HUD pill */
        "dark:border-indigo-500/25 dark:bg-[rgb(11_16_32/0.92)] dark:shadow-[0_0_32px_rgb(99_102_241/0.14)]",
        brand.extraWide ? "w-[280px]" : brand.wide ? "w-[230px]" : "w-[200px]"
      )}
      animate={
        reduceMotion || !isDark
          ? undefined
          : {
              boxShadow: [
                "0 0 24px rgb(99 102 241 / 0.14), inset 0 1px 0 rgb(255 255 255 / 0.06)",
                "0 0 44px rgb(56 189 248 / 0.28), inset 0 1px 0 rgb(255 255 255 / 0.1)",
                "0 0 24px rgb(99 102 241 / 0.14), inset 0 1px 0 rgb(255 255 255 / 0.06)",
              ],
            }
      }
      transition={{ duration: 3.5, repeat: Infinity, delay: index * 0.15 }}
    >
      <span className="hud-corner left-1.5 top-1.5 border-l border-t border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner right-1.5 top-1.5 border-r border-t border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner bottom-1.5 left-1.5 border-b border-l border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner bottom-1.5 right-1.5 border-b border-r border-indigo-200 dark:border-cyan-400/50" />

      {isDark && !reduceMotion && (
        <motion.div
          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/12 to-transparent"
          animate={{ x: ["-120%", "120%"] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: index * 0.2, ease: "linear" }}
        />
      )}

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt={`${brand.name} logo`}
        width={brand.extraWide ? 220 : brand.wide ? 170 : 150}
        height={40}
        className={cn(
          "relative z-10 w-auto object-contain",
          isDark ? "brightness-110 contrast-125" : brand.logoDark ? undefined : "brightness-110 contrast-125",
          brand.extraWide ? "h-11 max-w-[220px]" : brand.wide ? "h-11 max-w-[170px]" : "h-10 max-w-[150px]"
        )}
        draggable={false}
      />
    </motion.div>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const reduceMotion = useReducedMotion();
  const track = [...BRANDS, ...BRANDS];

  return (
    <div className="ai-marquee-track overflow-hidden py-2">
      <motion.div
        className="flex w-max items-center gap-5 px-4"
        animate={reduceMotion ? undefined : { x: reverse ? ["-50%", "0%"] : ["0%", "-50%"] }}
        transition={{ duration: reverse ? 38 : 34, repeat: Infinity, ease: "linear" }}
      >
        {track.map((brand, i) => (
          <BrandPill key={`${brand.name}-${reverse ? "r" : "f"}-${i}`} brand={brand} index={i % BRANDS.length} />
        ))}
      </motion.div>
    </div>
  );
}

function BrandMarquee({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <section
      className={cn(
        "relative overflow-hidden py-12 sm:py-16",
        /* light — flat clean surface, no blue tint */
        "border-y border-border bg-surface",
        /* dark — robocop strip */
        "dark:border-y dark:border-indigo-500/20 dark:bg-gradient-to-b dark:from-[#070b18] dark:via-[#0a1024] dark:to-[#070b18]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 hidden dark:block bg-[radial-gradient(ellipse_at_50%_50%,rgb(99_102_241/0.14),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 hidden dark:block imaging-grid-overlay opacity-15" />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <div className="mb-3 flex items-center justify-center gap-2">
          <motion.span
            className="h-2 w-2 rounded-full bg-indigo-500 dark:bg-cyan-400"
            animate={reduceMotion ? undefined : { opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className={SECTION_EYEBROW}>
            Category index
          </span>
        </div>
        <h2 className={cn(HEADING_DISPLAY, SECTION_TITLE)}>
          Trusted Across Major Trading Card Categories
        </h2>
        <p className={cn("mx-auto mt-3 max-w-2xl", SECTION_META)}>
          Supported manufacturer protocols · holographic brand stream
        </p>
      </div>

      <div className="relative mt-8 space-y-3">
        <MarqueeRow />
        <MarqueeRow reverse />
      </div>
    </section>
  );
}

export { BrandMarquee };
