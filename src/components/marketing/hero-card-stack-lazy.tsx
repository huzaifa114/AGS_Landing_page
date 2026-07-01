"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import { HeroCardStack } from "@/components/marketing/hero-card-stack";

function HeroCardStackLazy() {
  return (
    <LazyMotion features={domAnimation} strict={false}>
      <HeroCardStack />
    </LazyMotion>
  );
}

export { HeroCardStackLazy };
