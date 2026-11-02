"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGSAP, isReducedMotion } from "@/lib/animations";

export interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (
    target: number | string | HTMLElement,
    options?: {
      offset?: number;
      duration?: number;
      immediate?: boolean;
      lock?: boolean;
    }
  ) => void;
  stop: () => void;
  start: () => void;
}

const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useLenis = () => useContext(LenisContext);

export interface SmoothScrollProviderProps {
  children: ReactNode;
  /**
   * Scroll duration multiplier. Default: 1.4s for luxurious weighted feel.
   */
  duration?: number;
  /**
   * Easing function for Lenis. Default: custom luxury expo curve.
   */
  easing?: (t: number) => number;
  /**
   * Enable smooth scroll on touch devices. Default: true.
   */
  smoothMobile?: boolean;
  /**
   * Whether to force disable Lenis even if reduced motion is false.
   */
  disabled?: boolean;
}

// Stable reference default easing (prevents re-render dependency churn)
const DEFAULT_EASING = (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t));

export function SmoothScrollProvider({
  children,
  duration = 1.4,
  easing = DEFAULT_EASING,
  smoothMobile = true,
  disabled = false,
}: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);

  // Stable scroll control callbacks (never trigger re-renders)
  const scrollTo = useCallback(
    (
      target: number | string | HTMLElement,
      options?: {
        offset?: number;
        duration?: number;
        immediate?: boolean;
        lock?: boolean;
      }
    ) => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(target, options);
      } else if (typeof window !== "undefined") {
        if (typeof target === "number") {
          window.scrollTo({
            top: target,
            behavior: options?.immediate ? "auto" : "smooth",
          });
        } else if (typeof target === "string") {
          const el = document.querySelector(target);
          el?.scrollIntoView({
            behavior: options?.immediate ? "auto" : "smooth",
          });
        } else if (target instanceof HTMLElement) {
          target.scrollIntoView({
            behavior: options?.immediate ? "auto" : "smooth",
          });
        }
      }
    },
    []
  );

  const stop = useCallback(() => {
    lenisRef.current?.stop();
  }, []);

  const start = useCallback(() => {
    lenisRef.current?.start();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || disabled) return;

    // Respect user's motion preference (prevent vestibular discomfort)
    if (isReducedMotion()) {
      return;
    }

    // Register GSAP plugins safely
    registerGSAP();

    // Initialize Lenis with ultra-smooth cinematic parameters
    const lenis = new Lenis({
      duration,
      easing,
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: smoothMobile ? 1.6 : 1.0,
      autoResize: true,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    // Sync Lenis scroll with GSAP ScrollTrigger
    const handleScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", handleScroll);

    // Add Lenis's raf update into GSAP's high-precision ticker
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Expose lenis globally for debugging or component shortcuts
    if (typeof window !== "undefined") {
      (window as unknown as { __lenis?: Lenis }).__lenis = lenis;
    }

    return () => {
      lenis.off("scroll", handleScroll);
      gsap.ticker.remove(tickerUpdate);
      lenis.destroy();
      lenisRef.current = null;
      if (typeof window !== "undefined") {
        delete (window as unknown as { __lenis?: Lenis }).__lenis;
      }
    };
  }, [disabled, duration, easing, smoothMobile]);

  // Context value with getter for lenis ref (zero re-render overhead)
  const contextValue = useMemo<LenisContextValue>(
    () => ({
      get lenis() {
        return lenisRef.current;
      },
      scrollTo,
      stop,
      start,
    }),
    [scrollTo, stop, start]
  );

  return (
    <LenisContext.Provider value={contextValue}>
      {children}
    </LenisContext.Provider>
  );
}
