import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { Transition, Variants } from "motion/react";

/**
 * Luxury Real Estate Easing & Timing curves.
 * Curated for high-end, smooth, weighted architectural animations (60 FPS).
 */
export const EASING = {
  // Ultra-smooth luxury deceleration curve (quintic/expo feel)
  luxury: [0.22, 1, 0.36, 1] as const,
  luxuryEaseString: "cubic-bezier(0.22, 1, 0.36, 1)",

  // Gentle, cinematic camera easing
  cinematic: [0.16, 1, 0.3, 1] as const,

  // Snappy responsive interaction for buttons & hover triggers
  snappy: [0.32, 0.72, 0, 1] as const,

  // Smooth standard ease-in-out
  easeInOut: [0.65, 0, 0.35, 1] as const,

  // GSAP string equivalents
  gsap: {
    luxury: "power4.out",
    cinematic: "power3.out",
    gentle: "power2.out",
    smooth: "expo.out",
  },
};

/**
 * Standard transition presets for Motion components.
 */
export const TRANSITIONS = {
  luxury: (delay = 0, duration = 0.8): Transition => ({
    duration,
    delay,
    ease: EASING.luxury,
  }),
  cinematic: (delay = 0, duration = 1.1): Transition => ({
    duration,
    delay,
    ease: EASING.cinematic,
  }),
  snappy: (delay = 0, duration = 0.4): Transition => ({
    duration,
    delay,
    ease: EASING.snappy,
  }),
  spring: (delay = 0): Transition => ({
    type: "spring",
    stiffness: 140,
    damping: 20,
    mass: 0.8,
    delay,
  }),
};

/**
 * Standard reusable animation variants for Motion.
 */
export const VARIANTS = {
  fadeIn: (distance = 24): Variants => ({
    hidden: { opacity: 0, y: distance },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASING.luxury },
    },
  }),
  fadeInSimple: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: EASING.luxury },
    },
  },
  staggerContainer: (stagger = 0.1, delayChildren = 0.1): Variants => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren,
      },
    },
  }),
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.7, ease: EASING.luxury },
    },
  },
};

/**
 * Client-safe GSAP initializer that registers plugins once on the window.
 */
let gsapRegistered = false;

export function registerGSAP(): typeof gsap | null {
  if (typeof window === "undefined") return null;

  if (!gsapRegistered) {
    gsap.registerPlugin(ScrollTrigger);
    // Ensure smooth interpolation and prevent lag spikes
    gsap.config({
      autoSleep: 60,
      force3D: true,
    });
    gsapRegistered = true;
  }

  return gsap;
}

/**
 * Checks if the user prefers reduced motion (SSR-safe).
 */
export function isReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

