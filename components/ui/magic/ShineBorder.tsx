"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ShineBorderProps {
  borderRadius?: number;
  borderWidth?: number;
  duration?: number;
  color?: string | string[];
  className?: string;
  children: React.ReactNode;
}

/**
 * Magic UI Shine Border.
 * Adds an animated glowing gradient border around containers.
 */
export function ShineBorder({
  borderRadius = 16,
  borderWidth = 1,
  duration = 10,
  color = ["#E7E5D4", "#BCB893", "#8C642A"],
  className,
  children,
}: ShineBorderProps) {
  const gradientColors = Array.isArray(color) ? color.join(", ") : color;

  return (
    <div
      style={
        {
          "--border-radius": `${borderRadius}px`,
        } as React.CSSProperties
      }
      className={cn(
        "relative min-h-[60px] w-full rounded-[--border-radius] p-[1px] overflow-hidden",
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 size-full animate-shine"
        style={{
          borderRadius: `${borderRadius}px`,
          padding: `${borderWidth}px`,
          backgroundImage: `radial-gradient(circle, transparent 20%, ${gradientColors}, transparent 70%)`,
          backgroundSize: "300% 300%",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          animationDuration: `${duration}s`,
        }}
      />
      <div className="relative size-full rounded-[calc(var(--border-radius)-1px)]">
        {children}
      </div>
    </div>
  );
}
