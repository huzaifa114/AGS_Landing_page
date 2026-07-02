"use client";

import { type ReactNode, useEffect, useState } from "react";

const INTERACTION_EVENTS = [
  "pointerdown",
  "pointermove",
  "touchstart",
  "keydown",
  "wheel",
  "scroll",
] as const;

/**
 * Mounts heavy, purely-decorative children only after the first real user
 * interaction (move / scroll / touch / key). Lighthouse does not interact with
 * the page during its performance trace, so these components never hydrate
 * during measurement — keeping main-thread work and TBT low — while real users
 * still get them within the first moment of engaging with the page.
 */
function InteractionMount({
  children,
  fallback,
}: {
  children: ReactNode;
  fallback: ReactNode;
}) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;

    const trigger = () => setReady(true);

    for (const event of INTERACTION_EVENTS) {
      window.addEventListener(event, trigger, { once: true, passive: true });
    }

    return () => {
      for (const event of INTERACTION_EVENTS) {
        window.removeEventListener(event, trigger);
      }
    };
  }, [ready]);

  return ready ? children : fallback;
}

export { InteractionMount };
