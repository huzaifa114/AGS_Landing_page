import { cn } from "@/lib/utils";
import { SECTION_EYEBROW, SECTION_META, SECTION_H2 } from "@/lib/typography";

type BrandItem = {
  name: string;
  logo: string;
  logoDark?: string;
  wide?: boolean;
};

const BRANDS: BrandItem[] = [
  { name: "Panini", logo: "/images/brands/panini.svg" },
  { name: "Topps", logo: "/images/brands/topps.svg" },
  { name: "Pokemon", logo: "/images/brands/pokemon.svg" },
  { name: "Yu-Gi-Oh!", logo: "/images/brands/yugioh.svg" },
  {
    name: "Magic: The Gathering",
    logo: "/images/brands/mtg.svg",
    logoDark: "/images/brands/mtg-dark.svg",
  },
  { name: "Upper Deck", logo: "/images/brands/upper-deck.svg" },
  { name: "One Piece TCG", logo: "/images/brands/one-piece.svg" },
  { name: "Bowman", logo: "/images/brands/bowman.svg" },
  { name: "Donruss", logo: "/images/brands/donruss.svg" },
  { name: "NBA Prizm", logo: "/images/brands/nba.svg" },
];

function BrandPill({ brand }: { brand: BrandItem }) {
  return (
    <div
      className={cn(
        "brand-pill-glow group relative flex h-[58px] shrink-0 items-center justify-center overflow-hidden rounded-xl px-3",
        "border border-border bg-white shadow-sm",
        "dark:border-indigo-500/25 dark:bg-[rgb(11_16_32/0.92)] dark:shadow-[0_0_32px_rgb(99_102_241/0.14)]",
        brand.wide ? "w-[168px]" : "w-[148px]"
      )}
    >
      <span className="hud-corner left-1.5 top-1.5 border-l border-t border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner right-1.5 top-1.5 border-r border-t border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner bottom-1.5 left-1.5 border-b border-l border-indigo-200 dark:border-cyan-400/50" />
      <span className="hud-corner bottom-1.5 right-1.5 border-b border-r border-indigo-200 dark:border-cyan-400/50" />
      <span className="brand-pill-shimmer pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-transparent via-cyan-400/12 to-transparent dark:block" />

      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={brand.logo}
        alt={`${brand.name} logo`}
        width={brand.wide ? 130 : 110}
        height={32}
        loading="lazy"
        decoding="async"
        className={cn(
          "relative z-10 w-auto object-contain brightness-110 contrast-125",
          brand.logoDark ? "dark:hidden" : undefined,
          brand.wide ? "h-8 max-w-[130px]" : "h-8 max-w-[110px]"
        )}
        draggable={false}
      />
      {brand.logoDark && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={brand.logoDark}
          alt=""
          width={brand.wide ? 130 : 110}
          height={32}
          loading="lazy"
          decoding="async"
          className={cn(
            "relative z-10 hidden w-auto object-contain brightness-110 contrast-125 dark:block",
            brand.wide ? "h-8 max-w-[130px]" : "h-8 max-w-[110px]"
          )}
          draggable={false}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

function MarqueeRow({ reverse = false }: { reverse?: boolean }) {
  const track = [...BRANDS, ...BRANDS];

  return (
    <div className="ai-marquee-track overflow-hidden py-2">
      <div
        className={cn(
          "brand-marquee-track flex w-max items-center gap-3.5 px-4",
          reverse && "brand-marquee-track-reverse"
        )}
      >
        {track.map((brand, i) => (
          <BrandPill key={`${brand.name}-${reverse ? "r" : "f"}-${i}`} brand={brand} />
        ))}
      </div>
    </div>
  );
}

function BrandMarquee({ className }: { className?: string }) {
  return (
    <section
      className={cn(
        "relative overflow-hidden py-12 sm:py-16",
        "border-y border-border bg-surface",
        "dark:border-y dark:border-indigo-500/20 dark:bg-gradient-to-b dark:from-[#070b18] dark:via-[#0a1024] dark:to-[#070b18]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 hidden bg-[radial-gradient(ellipse_at_50%_50%,rgb(99_102_241/0.14),transparent_60%)] dark:block" />
      <div className="pointer-events-none absolute inset-0 hidden imaging-grid-overlay opacity-15 dark:block" />

      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <span className={cn("mb-3 block", SECTION_EYEBROW)}>Category index</span>
        <h2 className={SECTION_H2}>Trusted Across Major Trading Card Categories</h2>
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
