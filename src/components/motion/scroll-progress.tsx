"use client";

import { useEffect, useRef } from "react";

function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollTop = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? scrollTop / max : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      ref={barRef}
      className="scroll-progress-bar pointer-events-none fixed inset-x-0 top-0 z-[199] h-[3px] origin-left bg-gradient-to-r from-indigo-400 via-violet-500 to-cyan-300 shadow-[0_0_18px_rgb(99_102_241/0.85)]"
      aria-hidden="true"
    />
  );
}

export { ScrollProgress };
