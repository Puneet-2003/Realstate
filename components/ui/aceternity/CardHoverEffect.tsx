"use client";

import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface HoverEffectItem {
  title: string;
  description: string;
  link?: string;
  icon?: React.ReactNode;
  badge?: string;
}

export interface CardHoverEffectProps {
  items: HoverEffectItem[];
  className?: string;
  cardClassName?: string;
}

/**
 * Aceternity UI Card Hover Effect.
 * Renders a grid of cards with a fluid background highlight that glides between items.
 */
export function CardHoverEffect({
  items,
  className,
  cardClassName,
}: CardHoverEffectProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 py-6",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          key={item?.title || idx}
          className="relative group block p-2 h-full w-full cursor-pointer"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#C89D5C]/15 block rounded-2xl -z-0"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.2 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.05 },
                }}
              />
            )}
          </AnimatePresence>
          <div
            className={cn(
              "rounded-xl h-full w-full p-6 overflow-hidden bg-[#FAF7F2] dark:bg-[#18110B]/90 border border-[#8C5A30]/20 group-hover:border-[#C89D5C]/50 relative z-10 transition-colors duration-300 shadow-sm",
              cardClassName
            )}
          >
            {item.badge && (
              <span className="inline-block text-[10px] uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#C89D5C]/15 text-[#8C5A30] dark:text-[#DFBD85] font-semibold mb-3">
                {item.badge}
              </span>
            )}
            {item.icon && (
              <div className="text-[#C89D5C] mb-4 text-2xl">
                {item.icon}
              </div>
            )}
            <h4 className="font-serif text-xl font-medium tracking-tight text-[#241810] dark:text-[#FAF7F2] mb-2">
              {item.title}
            </h4>
            <p className="text-sm text-[#4A2A12]/80 dark:text-[#D8C3AC]/80 leading-relaxed font-sans">
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

