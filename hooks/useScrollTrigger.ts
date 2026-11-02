"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP, isReducedMotion } from "@/lib/animations";

export interface ScrollTriggerOptions {
  trigger?: RefObject<HTMLElement | null> | HTMLElement | string;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  pin?: boolean | HTMLElement | string;
  markers?: boolean;
  toggleActions?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

/**
 * Custom React 19 hook for GSAP ScrollTrigger animations.
 * Provides automatic context creation and cleanup to prevent memory leaks,
 * respects prefers-reduced-motion, and integrates with the Lenis smooth scroll ticker.
 */
export function useScrollTrigger(
  callback: (context: gsap.Context) => void,
  dependencies: unknown[] = [],
  scopeRef?: RefObject<HTMLElement | null>
) {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    registerGSAP();

    if (isReducedMotion()) {
      return;
    }

    const scope = scopeRef?.current || undefined;
    const ctx = gsap.context(() => {
      callback(ctx);
    }, scope);

    return () => {
      ctx.revert(); // Automatically kills all GSAP tweens & ScrollTriggers created in context
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);
}

