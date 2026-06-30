import { useId } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { brand } from "@/data/site-content";

export interface WhiteWhaleMarkProps {
  className?: string;
  size?: number;
}

/** Stylized whale tail + grading scan mark */
function WhiteWhaleMark({ className, size = 24 }: WhiteWhaleMarkProps) {
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
      className={className}
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

      {/* Whale body */}
      <path
        d="M11 27.5C11.8 22.2 15.2 17.8 20 16.5C24.8 17.8 28.2 22.2 29 27.5"
        stroke={`url(#${gradId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
        fill="none"
      />
      {/* Tail flukes */}
      <path
        d="M20 16.5L13.5 9.5M20 16.5L26.5 9.5"
        stroke={`url(#${accentId})`}
        strokeWidth="2.25"
        strokeLinecap="round"
      />
      {/* Grading scan arc */}
      <path
        d="M10 23.5H30"
        stroke="#38bdf8"
        strokeOpacity="0.55"
        strokeWidth="1"
        strokeLinecap="round"
      />
      {/* Eye / sensor */}
      <circle cx="23" cy="21.5" r="1.75" fill="#38bdf8" />
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
}

function BrandLogo({
  className,
  showText = true,
  href = "/",
  size = "sm",
  onClick,
}: BrandLogoProps) {
  const isMd = size === "md";
  const markBox = isMd ? "h-10 w-10 rounded-xl" : "h-9 w-9 rounded-lg";
  const markSize = isMd ? 22 : 20;
  const textClass = isMd
    ? "font-heading text-2xl font-extrabold tracking-tight"
    : "font-heading text-body-md font-bold tracking-tight";

  const content = (
    <>
      <span
        className={cn(
          "relative flex shrink-0 items-center justify-center overflow-hidden",
          markBox,
          "border border-indigo-200/90 bg-gradient-to-br from-indigo-50 to-violet-50 shadow-sm",
          "dark:border-indigo-400/35 dark:from-indigo-500/20 dark:to-violet-500/10",
          "dark:shadow-[0_0_20px_rgb(99_102_241/0.22)]"
        )}
      >
        <span className="pointer-events-none absolute left-1 top-1 h-2 w-2 border-l border-t border-indigo-400/50 dark:border-cyan-400/60" />
        <span className="pointer-events-none absolute right-1 top-1 h-2 w-2 border-r border-t border-indigo-400/50 dark:border-cyan-400/60" />
        <WhiteWhaleMark size={markSize} />
      </span>
      {showText && (
        <span className={cn(textClass, "text-foreground dark:text-white")}>{brand.name}</span>
      )}
    </>
  );

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2.5 transition-opacity hover:opacity-85",
        className
      )}
      aria-label={`${brand.name} home`}
    >
      {content}
    </Link>
  );
}

export { WhiteWhaleMark, BrandLogo };
