"use client";

import React, { useRef, useEffect } from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { gsap } from "gsap";
import { registerGSAP, EASING } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type ScrollRevealEffect = "fade" | "slide" | "mask" | "scale";
export type ScrollRevealEngine = "motion" | "gsap";

export interface ScrollRevealProps extends Omit<HTMLMotionProps<"div">, "children" | "direction"> {
  children: React.ReactNode;
  /**
   * Animation effect:
   * - "fade": Smooth opacity transition
   * - "slide": Translation + opacity
   * - "mask": Architectural clip-path wipe reveal
   * - "scale": Subtle luxury scale up (0.94 -> 1)
   * Default: "mask"
   */
  effect?: ScrollRevealEffect;
  /**
   * Underlying animation engine: "motion" (declarative React) or "gsap" (high performance scrub/timeline).
   * Default: "motion"
   */
  engine?: ScrollRevealEngine;
  /**
   * Animation delay (in seconds). Default: 0
   */
  delay?: number;
  /**
   * Animation duration (in seconds). Default: 0.85
   */
  duration?: number;
  /**
   * Direction for slide or mask reveal: "up" | "down" | "left" | "right". Default: "up"
   */
  direction?: "up" | "down" | "left" | "right";
  /**
   * Viewport threshold to trigger reveal (0 to 1). Default: 0.15
   */
  threshold?: number;
  /**
   * Whether to animate only once. Default: true
   */
  once?: boolean;
  /**
   * GSAP only: Enable scroll scrubbing (ties progress directly to scrollbar). Default: false
   */
  scrub?: boolean | number;
  /**
   * Additional classes.
   */
  className?: string;
}

export function ScrollReveal({
  children,
  effect = "mask",
  engine = "motion",
  delay = 0,
  duration = 0.85,
  direction = "up",
  threshold = 0.15,
  once = true,
  scrub = false,
  className,
  ...props
}: ScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // GSAP Engine implementation
  useEffect(() => {
    if (engine !== "gsap" || typeof window === "undefined" || !containerRef.current) {
      return;
    }

    registerGSAP();

    if (shouldReduceMotion) {
      gsap.set(containerRef.current, {
        opacity: 1,
        clearProps: "all",
      });
      return;
    }

    const element = containerRef.current;
    const ctx = gsap.context(() => {
      if (effect === "mask") {
        gsap.fromTo(
          element,
          {
            clipPath:
              direction === "up"
                ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                : direction === "down"
                ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                : direction === "left"
                ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            opacity: 0.2,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
            duration,
            delay,
            ease: EASING.gsap.luxury,
            scrollTrigger: {
              trigger: element,
              start: `top ${Math.round((1 - threshold) * 100)}%`,
              once,
              scrub: scrub ? (typeof scrub === "number" ? scrub : 1) : false,
            },
          }
        );
      } else if (effect === "scale") {
        gsap.fromTo(
          element,
          { scale: 0.94, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration,
            delay,
            ease: EASING.gsap.luxury,
            scrollTrigger: {
              trigger: element,
              start: `top ${Math.round((1 - threshold) * 100)}%`,
              once,
              scrub: scrub ? (typeof scrub === "number" ? scrub : 1) : false,
            },
          }
        );
      } else {
        // "slide" or "fade"
        const yOffset = direction === "up" ? 40 : direction === "down" ? -40 : 0;
        const xOffset = direction === "left" ? 40 : direction === "right" ? -40 : 0;

        gsap.fromTo(
          element,
          {
            opacity: 0,
            y: effect === "slide" ? yOffset : 0,
            x: effect === "slide" ? xOffset : 0,
          },
          {
            opacity: 1,
            y: 0,
            x: 0,
            duration,
            delay,
            ease: EASING.gsap.luxury,
            scrollTrigger: {
              trigger: element,
              start: `top ${Math.round((1 - threshold) * 100)}%`,
              once,
              scrub: scrub ? (typeof scrub === "number" ? scrub : 1) : false,
            },
          }
        );
      }
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, [engine, effect, delay, duration, direction, threshold, once, scrub, shouldReduceMotion]);

  // Motion Engine implementation
  if (engine === "motion") {
    if (shouldReduceMotion) {
      return (
        <div className={cn(className)}>
          {children}
        </div>
      );
    }

    const getInitialState = () => {
      switch (effect) {
        case "mask":
          return {
            clipPath:
              direction === "up"
                ? "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)"
                : direction === "down"
                ? "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)"
                : direction === "left"
                ? "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                : "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            opacity: 0.1,
          };
        case "scale":
          return {
            scale: 0.94,
            opacity: 0,
          };
        case "slide":
          return {
            opacity: 0,
            y: direction === "up" ? 36 : direction === "down" ? -36 : 0,
            x: direction === "left" ? 36 : direction === "right" ? -36 : 0,
          };
        case "fade":
        default:
          return {
            opacity: 0,
          };
      }
    };

    const getAnimateState = () => {
      switch (effect) {
        case "mask":
          return {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            opacity: 1,
          };
        case "scale":
          return {
            scale: 1,
            opacity: 1,
          };
        case "slide":
          return {
            opacity: 1,
            y: 0,
            x: 0,
          };
        case "fade":
        default:
          return {
            opacity: 1,
          };
      }
    };

    return (
      <motion.div
        initial={getInitialState()}
        whileInView={getAnimateState()}
        viewport={{ once, amount: threshold }}
        transition={{
          duration,
          delay,
          ease: EASING.luxury,
        }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  // Fallback / GSAP container
  return (
    <div ref={containerRef} className={cn(className)}>
      {children}
    </div>
  );
}
