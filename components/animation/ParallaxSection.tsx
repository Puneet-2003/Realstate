"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ParallaxSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  /**
   * Parallax speed factor.
   * Positive values (e.g. 0.2 to 0.4) create foreground/background depth.
   * Negative values (e.g. -0.2 to -0.4) move against scroll direction.
   * Default: 0.25
   */
  speed?: number;
  /**
   * Parallax axis. Default: "vertical"
   */
  direction?: "vertical" | "horizontal";
  /**
   * Container CSS classes.
   */
  className?: string;
  /**
   * Wrapper tag. Default: "div"
   */
  as?: "div" | "section" | "article" | "figure";
}

export function ParallaxSection({
  children,
  speed = 0.25,
  direction = "vertical",
  className,
  as = "div",
  ...props
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Track scroll progression relative to container bounds
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Calculate parallax translation range (e.g. speed 0.2 -> -50px to 50px)
  const range = speed * 150;
  const transformRange = [range, -range];

  const y = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : transformRange);
  const x = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [0, 0] : transformRange);

  const MotionComponent = motion[as] || motion.div;

  return (
    <div
      ref={containerRef}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <MotionComponent
        style={{
          y: direction === "vertical" ? y : 0,
          x: direction === "horizontal" ? x : 0,
          willChange: shouldReduceMotion ? "auto" : "transform",
        }}
        className="h-full w-full"
      >
        {children}
      </MotionComponent>
    </div>
  );
}

