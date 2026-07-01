"use client";

import { useId } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { brand } from "@/data/site-content";
import { BRAND_LOGO_LG, BRAND_LOGO_SM } from "@/lib/typography";

export interface WhiteWhaleMarkProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

/** Stylized whale tail + grading scan mark */
function WhiteWhaleMark({ className, size = 24, animated = false }: WhiteWhaleMarkProps) {
  const uid = useId().replace(/:/g, "");
  const gradId = `ww-grad-${uid}`;
  const accentId = `ww-accent-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(animated && "ww-logo-mark", className)}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={gradId} x1="4" y1="4" x2="36" y2="36" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6366f1" />
          <stop offset="1" stopColor="#8b5cf6" />
        </linearGradient>
        <linearGradient id={accentId} x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#38bdf8" />
          <stop offset="1" stopColor="#6366f1" />
        </linearGradient>
      </defs>

      <g className={animated ? "ww-logo-body" : undefined}>
        <path
          d="M11 27.5C11.8 22.2 15.2 17.8 20 16.5C24.8 17.8 28.2 22.2 29 27.5"
          stroke={`url(#${gradId})`}
          strokeWidth="2.25"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      <path
        d="M20 16.5L13.5 9.5"
        stroke={`url(#${accentId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        className={animated ? "ww-logo-fluke ww-logo-fluke-left" : undefined}
      />
      <path
        d="M20 16.5L26.5 9.5"
        stroke={`url(#${accentId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        className={animated ? "ww-logo-fluke ww-logo-fluke-right" : undefined}
      />

      <path
        d="M10 23.5H30"
        stroke="#38bdf8"
        strokeOpacity="0.85"
        strokeWidth="1"
        strokeLinecap="round"
        className={animated ? "ww-logo-scan" : undefined}
      />

      <circle
        cx="23"
        cy="21.5"
        r="1.75"
        fill="#38bdf8"
        className={animated ? "ww-logo-eye" : undefined}
      />
    </svg>
  );
}

export interface BrandLogoProps {
  className?: string;
  showText?: boolean;
  href?: string;
  /** sm = navbar, md = footer */
  size?: "sm" | "md";
  onClick?: () => void;
  /** Roll-in after page loader + idle motion on the logomark */
  animated?: boolean;
}

function BrandLogo({
  className,
  showText = true,
  href = "/",
  size = "sm",
  onClick,
  animated = false,
}: BrandLogoProps) {
  const isMd = size === "md";
  const markBox = isMd ? "h-10 w-10 rounded-xl" : "h-9 w-9 rounded-lg";
  const markSize = isMd ? 22 : 20;
  const textClass = isMd ? BRAND_LOGO_LG : BRAND_LOGO_SM;

  const namePrefix = brand.name.slice(0, -1);
  const nameTail = brand.name.slice(-1);

  const content = (
    <>
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          markBox,
          "border border-indigo-200/90 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-sm",
          "dark:border-indigo-400/35 dark:from-indigo-500/20 dark:to-violet-500/10",
          "dark:shadow-[0_0_20px_rgb(99_102_241/0.22)]",
          animated && [
            "ww-logo-shell ww-logo-roll-settle z-10",
            "transition-[box-shadow] duration-300",
            "group-hover:shadow-[0_0_28px_rgb(99_102_241/0.35)]",
            "group-hover:dark:shadow-[0_0_32px_rgb(56_189_248/0.35)]",
            "group-active:scale-[0.97]",
          ]
        )}
      >
        {animated && (
          <span
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            aria-hidden="true"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/15 to-transparent ww-logo-shimmer" />
          </span>
        )}
        <span className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l border-t border-indigo-400/50 dark:border-cyan-400/60" />
        <span className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r border-t border-indigo-400/50 dark:border-cyan-400/60" />
        <WhiteWhaleMark size={markSize} animated={animated} />
      </span>
      {showText && (
        <span
          className={cn(
            textClass,
            "text-foreground transition-colors duration-300 dark:text-white",
            animated && [
              "ww-logo-text",
              "group-hover:text-primary dark:group-hover:text-cyan-300",
            ]
          )}
        >
          {animated ? (
            <>
              {namePrefix}
              <span className="ww-logo-e-anchor inline-block">{nameTail}</span>
            </>
          ) : (
            brand.name
          )}
        </span>
      )}
    </>
  );

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2.5 overflow-visible outline-none",
        animated ? "transition-opacity hover:opacity-100" : "transition-opacity hover:opacity-85",
        className
      )}
      aria-label={`${brand.name} home`}
    >
      {content}
    </Link>
  );
}

export { WhiteWhaleMark, BrandLogo };
