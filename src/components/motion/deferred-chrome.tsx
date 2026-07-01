"use client";

import dynamic from "next/dynamic";

const ScrollProgress = dynamic(
  () => import("@/components/motion/scroll-progress").then((m) => m.ScrollProgress),
  { ssr: false }
);

export { ScrollProgress };
