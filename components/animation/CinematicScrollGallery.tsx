"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { cn } from "@/lib/utils";

export interface GalleryCard {
  letter: string;
  title: string;
  location: string;
  image: string;
  tag?: string;
  initialOffset?: number; // Starting Y differential offset
}

export interface CinematicScrollGalleryProps {
  /**
   * Main big title displayed in the hero state (e.g. "Nature." or "Sanctuary.")
   */
  title?: string;
  /**
   * Top navigation brand name
   */
  brand?: string;
  /**
   * Counter in bottom left (e.g. "04 / 09")
   */
  counter?: string;
  /**
   * Full bleed hero background image
   */
  backgroundImage?: string;
  /**
   * Four vertical cards that glide in from the bottom (e.g. W E S T or A U R A)
   */
  cards?: GalleryCard[];
  /**
   * Editorial description paragraph that reveals below the cards
   */
  description?: string;
  /**
   * Secondary location or subheading
   */
  caption?: string;
  /**
   * Additional container classes
   */
  className?: string;
  /**
   * Action button text
   */
  ctaText?: string;
  /**
   * Action button callback
   */
  onCtaClick?: () => void;
}

const DEFAULT_CARDS: GalleryCard[] = [
  {
    letter: "W",
    title: "Alpine Sanctuary",
    location: "St. Moritz, Switzerland",
    image:
      "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
    initialOffset: 60,
  },
  {
    letter: "E",
    title: "The Glass Pavilion",
    location: "Bel-Air, California",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    initialOffset: -20,
  },
  {
    letter: "S",
    title: "Villa Monolithic",
    location: "Lake Como, Italy",
    image:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    initialOffset: 45,
  },
  {
    letter: "T",
    title: "The Sky Penthouse",
    location: "Manhattan, New York",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    initialOffset: -35,
  },
];

/**
 * CinematicScrollGallery
 * Recreates the iconic smooth scroll-driven transition from the reference video:
 * 1. Fullscreen Hero with bold centered title ("Nature." / "Sanctuary.")
 * 2. Scrubbed scroll smoothly lifts the title, scales and dims the background
 * 3. 4 vertical cards rise in an undulating staggered wave with letter typography ("W E S T")
 * 4. Editorial narrative fades in below the cards
 */
export function CinematicScrollGallery({
  title = "Nature.",
  brand = "Ready co.",
  counter = "04 / 09",
  backgroundImage = "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=2000&q=85",
  cards = DEFAULT_CARDS,
  description = "Ciucas Mountains represent one of the best alternatives if you're thinking of taking your family on a one day hike in Romania. Located between the Eastern and Southern Carpathians, Ciucas Mountains are taller than the nearby mountains, reaching a maximum altitude of 1,954 meters on Ciucas Peak, having nonetheless hiking trails you can easily do even if you're just a beginner.",
  caption = "Instagram. Facebook. Dribbble. Twitter.",
  className,
  ctaText = "Sign up",
  onCtaClick,
}: CinematicScrollGalleryProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll tracking across the pinned track (220vh total height)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth out progress with spring physics for butter-smooth 60 FPS response
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.6,
  });

  // Background transformations: subtle scale up + dark vignette fade
  const bgScale = useTransform(smoothProgress, [0, 0.7], [1.0, 1.08]);
  const bgDarkOverlay = useTransform(smoothProgress, [0.05, 0.45], [0.25, 0.88]);

  // Main Title: translates from screen center up to top header
  const titleY = useTransform(smoothProgress, [0.05, 0.55], ["0vh", "-38vh"]);
  const titleScale = useTransform(smoothProgress, [0.05, 0.55], [1.0, 0.48]);
  const titleOpacity = useTransform(smoothProgress, [0.45, 0.7], [1.0, 0.9]);

  // Bottom pagination & social links fade out gently as scroll begins
  const bottomBarOpacity = useTransform(smoothProgress, [0, 0.25], [1.0, 0.0]);

  // Four cards rising from bottom with differential heights (staggered waves)
  const card1Y = useTransform(smoothProgress, [0.15, 0.65], ["130%", `${cards[0]?.initialOffset || 30}px`]);
  const card2Y = useTransform(smoothProgress, [0.18, 0.68], ["140%", `${cards[1]?.initialOffset || -20}px`]);
  const card3Y = useTransform(smoothProgress, [0.22, 0.72], ["135%", `${cards[2]?.initialOffset || 40}px`]);
  const card4Y = useTransform(smoothProgress, [0.25, 0.76], ["145%", `${cards[3]?.initialOffset || -30}px`]);

  const cardsOpacity = useTransform(smoothProgress, [0.12, 0.45], [0, 1]);

  // Editorial description reveals below the cards at the end of the scroll
  const descriptionOpacity = useTransform(smoothProgress, [0.55, 0.8], [0, 1]);
  const descriptionY = useTransform(smoothProgress, [0.55, 0.8], [30, 0]);

  return (
    <section
      ref={containerRef}
      className={cn("relative h-[240vh] w-full bg-[#120C08]", className)}
    >
      {/* Sticky Fullscreen Viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none">
        {/* Full-bleed Background Image with Darkening Vignette */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div
            style={{
              scale: shouldReduceMotion ? 1 : bgScale,
            }}
            className="relative h-full w-full will-change-transform"
          >
            <Image
              src={backgroundImage}
              alt="Atmospheric Landscape"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>

          {/* Dynamic darkening overlay that transitions to black on scroll */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? 0.8 : bgDarkOverlay,
            }}
            className="absolute inset-0 bg-gradient-to-b from-black/50 via-[#120C08]/90 to-black will-change-[opacity]"
          />
        </div>

        {/* TOP BAR: Brand logo & Call-to-action */}
        <header className="relative z-30 flex items-center justify-between px-6 sm:px-12 pt-8 sm:pt-10">
          <span className="font-sans font-semibold text-sm sm:text-base tracking-tight text-[#FAF7F2]">
            {brand}
          </span>

          <button
            onClick={onCtaClick}
            type="button"
            className="px-5 py-2 rounded-full text-xs font-medium text-white bg-black/80 hover:bg-black border border-white/20 backdrop-blur-md transition-all cursor-pointer hover:scale-105"
          >
            {ctaText}
          </button>
        </header>

        {/* CENTER STAGE: Morphing Title & Staggered Cards */}
        <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 max-w-7xl mx-auto w-full">
          {/* Main Giant Title ("Nature." / "Sanctuary.") */}
          <motion.div
            style={{
              y: shouldReduceMotion ? 0 : titleY,
              scale: shouldReduceMotion ? 1 : titleScale,
              opacity: titleOpacity,
            }}
            className="absolute z-10 text-center will-change-transform"
          >
            <h1 className="font-sans font-bold text-6xl sm:text-8xl md:text-9xl text-white tracking-tight drop-shadow-2xl">
              {title}
            </h1>
          </motion.div>

          {/* 4 Staggered Vertical Cards (W E S T) */}
          <motion.div
            style={{
              opacity: cardsOpacity,
            }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 lg:gap-7 items-center justify-center w-full max-w-4xl pt-10 will-change-[opacity,transform]"
          >
            {cards.slice(0, 4).map((card, index) => {
              const cardMotionY =
                index === 0
                  ? card1Y
                  : index === 1
                  ? card2Y
                  : index === 2
                  ? card3Y
                  : card4Y;

              return (
                <motion.div
                  key={card.letter + index}
                  style={{
                    y: shouldReduceMotion ? 0 : cardMotionY,
                  }}
                  className="group relative h-48 sm:h-64 md:h-80 rounded-md overflow-hidden bg-[#18110B] border border-white/10 shadow-2xl transition-transform duration-300 hover:scale-[1.03] will-change-transform"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 brightness-90 group-hover:brightness-100"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />

                  {/* Subtle dark gradient overlay inside card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

                  {/* Centered Large Letter (W, E, S, T) exactly like reference video */}
                  <div className="absolute inset-x-0 bottom-4 sm:bottom-6 flex flex-col items-center justify-center text-center">
                    <span className="font-sans font-extrabold text-4xl sm:text-5xl md:text-6xl text-white/90 drop-shadow-lg tracking-wider">
                      {card.letter}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#DFBD85] opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1">
                      {card.title}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Editorial Paragraph below cards */}
          <motion.div
            style={{
              opacity: shouldReduceMotion ? 1 : descriptionOpacity,
              y: shouldReduceMotion ? 0 : descriptionY,
            }}
            className="mt-6 sm:mt-10 max-w-xl text-center px-4 will-change-[transform,opacity]"
          >
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed drop-shadow-md">
              {description}
            </p>
          </motion.div>
        </div>

        {/* BOTTOM BAR: Counter (04 / 09) & Social links */}
        <motion.footer
          style={{
            opacity: bottomBarOpacity,
          }}
          className="relative z-30 flex items-center justify-between px-6 sm:px-12 pb-8 sm:pb-10 text-xs text-white/80 font-sans tracking-wide"
        >
          <div className="flex items-center gap-1.5 font-semibold">
            <span className="text-base sm:text-lg text-white">{counter.split("/")[0]}</span>
            <span className="text-white/60 font-light">/{counter.split("/")[1] || "09"}</span>
          </div>

          <div className="text-[11px] text-white/70 tracking-wider">
            {caption}
          </div>
        </motion.footer>
      </div>
    </section>
  );
}

