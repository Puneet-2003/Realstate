"use client";

import React, { createContext, useContext } from "react";
import { motion, useReducedMotion, type Variants, type HTMLMotionProps } from "motion/react";
import { EASING } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface StaggerContextValue {
  shouldReduceMotion: boolean | null;
  distance: number;
}

const StaggerContext = createContext<StaggerContextValue>({
  shouldReduceMotion: false,
  distance: 20,
});

export interface StaggerContainerProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  /**
   * Delay between each consecutive child animation (in seconds). Default: 0.1
   */
  staggerDelay?: number;
  /**
   * Initial delay before the first child starts (in seconds). Default: 0.1
   */
  delayChildren?: number;
  /**
   * Viewport trigger threshold (0 to 1). Default: 0.15
   */
  threshold?: number;
  /**
   * Whether to animate only once. Default: true
   */
  once?: boolean;
  /**
   * Translation distance for child items. Default: 24
   */
  distance?: number;
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * HTML element to render container as. Default: "div"
   */
  as?: "div" | "ul" | "ol" | "section" | "article";
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  delayChildren = 0.1,
  threshold = 0.15,
  once = true,
  distance = 24,
  className,
  as = "div",
  ...props
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();
  const MotionComponent = (motion[as] || motion.div) as typeof motion.div;

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : delayChildren,
      },
    },
  };

  return (
    <StaggerContext.Provider value={{ shouldReduceMotion, distance }}>
      <MotionComponent
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        className={cn(className)}
        {...props}
      >
        {children}
      </MotionComponent>
    </StaggerContext.Provider>
  );
}

export interface StaggerItemProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  /**
   * Custom translation distance override.
   */
  distance?: number;
  /**
   * Direction of entrance. Default: "up"
   */
  direction?: "up" | "down" | "left" | "right" | "none";
  /**
   * Additional classes.
   */
  className?: string;
  /**
   * HTML element to render item as. Default: "div"
   */
  as?: "div" | "li" | "article" | "span";
}

export function StaggerItem({
  children,
  distance: customDistance,
  direction = "up",
  className,
  as = "div",
  ...props
}: StaggerItemProps) {
  const { shouldReduceMotion, distance: contextDistance } = useContext(StaggerContext);
  const distance = customDistance ?? contextDistance;
  const MotionComponent = (motion[as] || motion.div) as typeof motion.div;

  const getOffset = () => {
    if (shouldReduceMotion || direction === "none") return { x: 0, y: 0 };
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

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.65,
        ease: EASING.luxury,
      },
    },
  };

  return (
    <MotionComponent
      variants={itemVariants}
      className={cn(className)}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
