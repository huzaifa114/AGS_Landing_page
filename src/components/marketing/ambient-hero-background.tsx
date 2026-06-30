"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { AmbientMotionCanvas } from "@/components/marketing/ambient-motion-canvas";

export interface AmbientHeroBackgroundProps {
  className?: string;
  /** Optional MP4 — if missing, built-in motion canvas is used */
  videoSrc?: string;
}

function AmbientHeroBackground({
  className,
  videoSrc = "/videos/hero-bg.mp4",
}: AmbientHeroBackgroundProps) {
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    fetch(videoSrc, { method: "HEAD" })
      .then((res) => {
        if (!cancelled) setVideoReady(res.ok);
      })
      .catch(() => {
        if (!cancelled) setVideoReady(false);
      });

    return () => {
      cancelled = true;
    };
  }, [videoSrc]);

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {/* Built-in cinematic motion — no video file required */}
      {!videoReady && <AmbientMotionCanvas />}

      {videoReady && (
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover opacity-40 dark:opacity-25"
          src={videoSrc}
        />
      )}

      <div className="ambient-mesh absolute inset-0" />
      <div className="ambient-orb ambient-orb-a absolute -left-24 top-10 h-72 w-72 rounded-full bg-indigo-300/30 blur-3xl dark:bg-indigo-500/20" />
      <div className="ambient-orb ambient-orb-b absolute -right-16 top-1/3 h-80 w-80 rounded-full bg-violet-300/25 blur-3xl dark:bg-violet-500/15" />
      <div className="ambient-orb ambient-orb-c absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-sky-200/35 blur-3xl dark:bg-sky-500/10" />

      <div className="absolute inset-0 bg-gradient-to-b from-white/82 via-white/68 to-white/94 dark:from-[#070b1a]/88 dark:via-[#070b1a]/78 dark:to-[#070b1a]/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.14),transparent_55%)] dark:bg-[radial-gradient(ellipse_at_top,rgb(99_102_241/0.18),transparent_55%)]" />
      <div className="absolute inset-0 imaging-grid-overlay opacity-[0.04] dark:opacity-[0.07]" />
    </div>
  );
}

export { AmbientHeroBackground };
