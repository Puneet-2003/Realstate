"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { EASING } from "@/lib/animations";
import { cn } from "@/lib/utils";

export interface SlideUpProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  /**
   * Delay before animation begins (in seconds). Default: 0
   */
  delay?: number;
  /**
   * Duration of slide up (in seconds). Default: 0.8
   */
  duration?: number;
  /**
   * Distance in pixels to translate upward from. Default: 32
   */
  distance?: number;
  /**
   * Use an organic spring curve rather than smooth quintic ease. Default: false
   */
  spring?: boolean;
  /**
   * Viewport trigger threshold (0 to 1). Default: 0.2
   */
  threshold?: number;
  /**
   * Whether to trigger only once. Default: true
   */
  once?: boolean;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * Render tag. Default: "div"
   */
  as?: "div" | "section" | "article" | "p" | "span";
}

export function SlideUp({
  children,
  delay = 0,
  duration = 0.8,
  distance = 32,
  spring = false,
  threshold = 0.2,
  once = true,
  className,
  as = "div",
  ...props
}: SlideUpProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = (motion[as] || motion.div) as typeof motion.div;

  const transitionConfig = shouldReduceMotion
    ? { duration: 0.01 }
    : spring
    ? {
        type: "spring" as const,
        stiffness: 120,
        damping: 18,
        mass: 0.8,
        delay,
      }
    : {
        duration,
        delay,
        ease: EASING.luxury,
      };

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        y: shouldReduceMotion ? 0 : distance,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        transition: transitionConfig,
      }}
      viewport={{
        once,
        amount: threshold,
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
