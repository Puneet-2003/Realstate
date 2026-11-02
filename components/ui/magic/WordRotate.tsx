"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { EASING } from "@/lib/animations";

export interface WordRotateProps {
  words: string[];
  duration?: number;
  framerProps?: React.ComponentProps<typeof motion.h1>;
  className?: string;
}

/**
 * Magic UI Word Rotate.
 * Cycles smoothly through an array of words with vertical slide-fade animations.
 */
export function WordRotate({
  words,
  duration = 2800,
  className,
}: WordRotateProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (words.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  if (shouldReduceMotion) {
    return <span className={cn(className)}>{words[index]}</span>;
  }

  return (
    <span className="inline-flex overflow-hidden py-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{
            duration: 0.45,
            ease: EASING.luxury,
          }}
          className={cn("inline-block", className)}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

