"use client";

import { useEffect, useState, type RefObject } from "react";
import { getHeroStackScale, HERO_STACK_DESIGN } from "@/components/marketing/hero-card-stack-layout";

function useHeroStackScale(containerRef: RefObject<HTMLElement | null>) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      setScale(getHeroStackScale(el.clientWidth));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [containerRef]);

  const height = Math.max(
    HERO_STACK_DESIGN.minHeight,
    Math.round(HERO_STACK_DESIGN.height * scale)
  );

  return { scale, height };
}

export { useHeroStackScale };
