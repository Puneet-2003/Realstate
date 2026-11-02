"use client";

import React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { EASING } from "@/lib/animations";
import { cn } from "@/lib/utils";

export type AnimatedTextType = "words" | "characters" | "lines";

export interface AnimatedTextProps {
  /**
   * The text content to animate.
   */
  text: string;
  /**
   * Splitting mode: "words", "characters", or "lines". Default: "words"
   */
  type?: AnimatedTextType;
  /**
   * Initial delay before animation begins (in seconds). Default: 0
   */
  delay?: number;
  /**
   * Duration of each segment animation (in seconds). Default: 0.6
   */
  duration?: number;
  /**
   * Delay between consecutive animated segments (in seconds). Default: 0.035 for characters, 0.08 for words
   */
  stagger?: number;
  /**
   * Whether to animate only once when entering viewport. Default: true
   */
  once?: boolean;
  /**
   * Viewport trigger threshold (0 to 1). Default: 0.2
   */
  threshold?: number;
  /**
   * Container CSS classes.
   */
  className?: string;
  /**
   * Segment CSS classes.
   */
  segmentClassName?: string;
  /**
   * HTML heading/paragraph tag. Default: "p"
   */
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span" | "div";
}

export function AnimatedText({
  text,
  type = "words",
  delay = 0,
  duration = 0.6,
  stagger,
  once = true,
  threshold = 0.2,
  className,
  segmentClassName,
  as = "p",
}: AnimatedTextProps) {
  const shouldReduceMotion = useReducedMotion();
  const defaultStagger = type === "characters" ? 0.025 : type === "lines" ? 0.15 : 0.07;
  const resolvedStagger = stagger ?? defaultStagger;

  // Split text into units
  const segments: string[] = React.useMemo(() => {
    if (type === "characters") {
      return Array.from(text);
    }
    if (type === "lines") {
      return text.split("\n");
    }
    // "words"
    return text.split(" ");
  }, [text, type]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : resolvedStagger,
        delayChildren: shouldReduceMotion ? 0 : delay,
      },
    },
  };

  const segmentVariants: Variants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : duration,
        ease: EASING.luxury,
      },
    },
  };

  const Component = motion[as] || motion.p;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      aria-label={text}
      className={cn("inline-block", className)}
    >
      {segments.map((segment, index) => (
        <React.Fragment key={index}>
          <motion.span
            variants={segmentVariants}
            className={cn("inline-block will-change-[transform,opacity]", segmentClassName)}
          >
            {segment === " " ? "\u00A0" : segment}
          </motion.span>
          {type === "words" && index < segments.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </React.Fragment>
      ))}
    </Component>
  );
}

