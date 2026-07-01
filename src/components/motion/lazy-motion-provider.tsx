"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

function LazyMotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      {children}
    </LazyMotion>
  );
}

export { LazyMotionProvider };
