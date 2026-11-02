"use client";

import React, { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface TextGenerateEffectProps {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}

/**
 * Aceternity UI Text Generate Effect.
 * Creates an ethereal typewriter/blur-in word reveal effect.
 */
export function TextGenerateEffect({
  words,
  className,
  filter = true,
  duration = 0.5,
}: TextGenerateEffectProps) {
  const [scope, animate] = useAnimate();
  const shouldReduceMotion = useReducedMotion();
  const wordsArray = words.split(" ");

  useEffect(() => {
    if (shouldReduceMotion) {
      animate(
        "span",
        {
          opacity: 1,
          filter: "none",
        },
        { duration: 0.01 }
      );
      return;
    }

    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration || 0.5,
        delay: stagger(0.12),
      }
    );
  }, [animate, duration, filter, shouldReduceMotion]);

  return (
    <div className={cn("font-serif font-light", className)}>
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="opacity-0 inline-block text-inherit"
              style={{
                filter: filter && !shouldReduceMotion ? "blur(10px)" : "none",
              }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    </div>
  );
}

