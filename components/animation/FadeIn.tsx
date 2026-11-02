"use client";

import React from "react";
import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";
import { EASING } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type FadeInDirection = "up" | "down" | "left" | "right" | "none";

export interface FadeInProps extends Omit<HTMLMotionProps<"div">, "direction" | "children"> {
  children: React.ReactNode;
  /**
   * Delay before animation begins (in seconds). Default: 0
   */
  delay?: number;
  /**
   * Duration of entrance animation (in seconds). Default: 0.75
   */
  duration?: number;
  /**
   * Direction of entrance slide. Default: "up"
   */
  direction?: FadeInDirection;
  /**
   * Distance of entrance slide (in pixels). Default: 24
   */
  distance?: number;
  /**
   * Percentage of component visible before triggering (0 to 1). Default: 0.2
   */
  threshold?: number;
  /**
   * Whether to animate only once when entering viewport. Default: true
   */
  once?: boolean;
  /**
   * Additional CSS classes.
   */
  className?: string;
  /**
   * HTML tag / component to render as. Default: "div"
   */
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "span" | "p";
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.75,
  direction = "up",
  distance = 24,
  threshold = 0.2,
  once = true,
  className,
  as = "div",
  ...props
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();

  // Calculate positional offsets based on direction
  const getOffset = () => {
    if (shouldReduceMotion || direction === "none") {
      return { x: 0, y: 0 };
    }
    switch (direction) {
      case "up":
        return { x: 0, y: distance };
      case "down":
        return { x: 0, y: -distance };
      case "left":
        return { x: distance, y: 0 };
      case "right":
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();
  const MotionComponent = (motion[as] || motion.div) as typeof motion.div;

  return (
    <MotionComponent
      initial={{
        opacity: 0,
        x: offset.x,
        y: offset.y,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        transition: {
          duration: shouldReduceMotion ? 0.01 : duration,
          delay: shouldReduceMotion ? 0 : delay,
          ease: EASING.luxury,
        },
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
