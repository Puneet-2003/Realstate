"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Lenis from "lenis";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import {
  Volume2,
  VolumeX,
  ArrowDown,
  Sparkles,
  Info,
  X,
  ArrowRight,
} from "lucide-react";

const TOTAL_FRAMES = 240;

interface Chapter {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  location: string;
  range: [number, number]; // [start, end] scroll progress
  specs: string[];
}

const CHAPTERS: Chapter[] = [
  {
    id: "exterior",
    number: "01",
    title: "Architecture Beyond Ordinary.",
    subtitle: "A new perspective on elevated living.",
    description:
      "Rising 68 stories into the metropolitan skyline, The Lumière commands attention with its geometric glass facade, illuminated canopy, and landscaped private motor court.",
    location: "Exterior Facade & Grand Driveway",
    range: [0.0, 0.18],
    specs: ["68 Stories", "Low-E Acoustic Glazing", "Private Motor Court"],
  },
  {
    id: "approach",
    number: "02",
    title: "Every Detail, Intentionally Designed.",
    subtitle:
      "From the first impression to the finest finish, every element reflects a commitment to timeless architectural excellence.",
    location: "Entrance Gates & Vehicular Portal",
    description:
      "Passing through the architectural security gates along radiant basalt pavers, the entrance canopy glows with warm ambient light, framing the dramatic scale of the tower.",
    range: [0.18, 0.38],
    specs: ["Biometric Gateways", "Radiant Basalt Pavers", "Architectural Canopy"],
  },
  {
    id: "lobby",
    number: "03",
    title: "An Entrance That Sets the Standard.",
    subtitle:
      "Experience a welcoming arrival defined by space, natural materials, considered lighting, and understated luxury.",
    location: "Grand Double-Height Foyer",
    description:
      "Motorized glass portals reveal a monumental 32-foot double-height foyer paved with bookmatched Italian Statuario marble and enveloped in warm acoustic cove lighting.",
    range: [0.38, 0.58],
    specs: ["32ft Finished Ceilings", "Statuario Marble", "Acoustic STC 48"],
  },
  {
    id: "reception",
    number: "04",
    title: "Crafted Around the Way You Live.",
    subtitle:
      "Thoughtful materials, considered proportions, and carefully curated interiors create a refined experience in every shared space.",
    location: "Reception & Preserved Botanical Atrium",
    description:
      "At the center of the lobby, a sculpted marble reception desk sits beneath bespoke champagne brass chandeliers, accompanied by a signature living bonsai atrium.",
    range: [0.58, 0.78],
    specs: ["24/7 White-Glove Desk", "Living Bonsai Atrium", "Bespoke Brass Lighting"],
  },
  {
    id: "residence",
    number: "05",
    title: "Space to Live Exceptionally.",
    subtitle:
      "Discover thoughtfully designed residences where natural light, refined finishes, and functional layouts come together.",
    location: "The Sky Penthouse — 64th Floor",
    description:
      "Ascending into the upper residential sanctuary reveals continuous panoramic floor-to-ceiling glass, Italian boucle furnishings, bespoke stone kitchens, and twilight sunset horizons.",
    range: [0.78, 1.0],
    specs: ["360° Sunset Horizon", "12,400 Sq Ft", "Minotti & Boffi Fitments"],
  },
];

interface Hotspot {
  id: string;
  label: string;
  title: string;
  description: string;
  targetRange: [number, number];
  position: { top: string; left: string };
}

const HOTSPOTS: Hotspot[] = [
  {
    id: "glazing",
    label: "Acoustic Glazing",
    title: "Triple-Laminated Acoustic Low-E Facade",
    description:
      "Engineered to block 99.4% of urban ambient noise while optimizing solar heat gain and providing crystal-clear chromatic clarity from sunrise to twilight.",
    targetRange: [0.04, 0.2],
    position: { top: "35%", left: "45%" },
  },
  {
    id: "canopy",
    label: "Illuminated Canopy",
    title: "Linear Warm Amber Architectural Lighting",
    description:
      "Concealed 2700K warm LED ribbons bounce indirect golden light across fluted aluminum louvers, welcoming arrivals with residential warmth.",
    targetRange: [0.2, 0.4],
    position: { top: "30%", left: "50%" },
  },
  {
    id: "marble",
    label: "Italian Marble",
    title: "Bookmatched Honed Statuario Floor",
    description:
      "Hand-selected slabs quarried in Carrara, Italy, honed to a silky low-sheen satin finish that mirrors the ambient ceiling illumination.",
    targetRange: [0.4, 0.6],
    position: { top: "72%", left: "55%" },
  },
  {
    id: "bonsai",
    label: "Botanical Centerpiece",
    title: "Preserved Specimen Bonsai Garden",
    description:
      "A century-old cultivated Japanese black pine integrated into a recessed granite plinth, bringing organic tranquility into the monumental volume.",
    targetRange: [0.6, 0.78],
    position: { top: "52%", left: "50%" },
  },
  {
    id: "skyline",
    label: "Sunset Panorama",
    title: "Unobstructed Western Skyline Horizon",
    description:
      "Full-height structural glass mullions frame dramatic twilight sunsets across the metropolitan skyline, complemented by motorized sheer drapery.",
    targetRange: [0.8, 0.98],
    position: { top: "40%", left: "30%" },
  },
];

interface ScrollJourneyProps {
  onOpenBooking?: () => void;
}

export function ScrollJourney({ onOpenBooking }: ScrollJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrameNumber, setCurrentFrameNumber] = useState(1);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);
  const [loadedPercent, setLoadedPercent] = useState(0);

  // Audio Context Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const droneNodesRef = useRef<{ osc1: OscillatorNode; osc2: OscillatorNode; gain: GainNode } | null>(null);

  // Image cache and animation refs
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(TOTAL_FRAMES).fill(null));
  const loadedFlagsRef = useRef<boolean[]>(new Array(TOTAL_FRAMES).fill(false));
  const currentRenderedFrameRef = useRef<number>(0);
  const targetFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Helper to format frame path
  const getFramePath = useCallback((index: number) => {
    const pad = String(index + 1).padStart(3, "0");
    return `/sequence/frame-${pad}.jpg`;
  }, []);

  // Draw frame on canvas with sub-frame blending for cinematic 60fps continuity
  const drawFrame = useCallback((frameFloat: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const baseIndex = Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.floor(frameFloat)));
    const nextIndex = Math.min(TOTAL_FRAMES - 1, baseIndex + 1);
    const fraction = frameFloat - baseIndex;

    // Helper to find closest loaded frame
    const getLoadedImage = (index: number): HTMLImageElement | null => {
      if (loadedFlagsRef.current[index] && imagesRef.current[index]) {
        return imagesRef.current[index];
      }
      for (let i = index; i >= 0; i--) {
        if (loadedFlagsRef.current[i] && imagesRef.current[i]) return imagesRef.current[i];
      }
      for (let i = index; i < TOTAL_FRAMES; i++) {
        if (loadedFlagsRef.current[i] && imagesRef.current[i]) return imagesRef.current[i];
      }
      return null;
    };

    const baseImg = getLoadedImage(baseIndex);
    if (!baseImg || !baseImg.naturalWidth) return;

    const imgWidth = baseImg.naturalWidth;
    const imgHeight = baseImg.naturalHeight;
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const destWidth = imgWidth * scale;
    const destHeight = imgHeight * scale;
    const destX = (canvasWidth - destWidth) / 2;
    const destY = (canvasHeight - destHeight) / 2;

    // 1. Draw base frame
    ctx.globalAlpha = 1.0;
    ctx.drawImage(baseImg, 0, 0, imgWidth, imgHeight, destX, destY, destWidth, destHeight);

    // 2. Sub-frame cross-dissolve to the next frame for buttery analog continuity
    if (fraction > 0.02 && nextIndex > baseIndex) {
      const nextImg = getLoadedImage(nextIndex);
      if (nextImg && nextImg !== baseImg && nextImg.naturalWidth) {
        ctx.globalAlpha = fraction;
        ctx.drawImage(nextImg, 0, 0, imgWidth, imgHeight, destX, destY, destWidth, destHeight);
        ctx.globalAlpha = 1.0;
      }
    }
  }, []);

  // Update canvas resolution on resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    drawFrame(currentRenderedFrameRef.current);
  }, [drawFrame]);

  // Robust Concurrent Image Preloading
  useEffect(() => {
    let isMounted = true;
    let loadedCount = 0;

    // Immediately size canvas
    resizeCanvas();

    const loadSingleFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (!isMounted) return resolve();
          imagesRef.current[index] = img;
          loadedFlagsRef.current[index] = true;
          loadedCount++;
          setLoadedPercent(Math.round((loadedCount / TOTAL_FRAMES) * 100));

          // If frame 0 just loaded, draw it immediately!
          if (index === 0) {
            drawFrame(0);
          }
          // If the currently requested frame just loaded, update it
          if (Math.round(currentRenderedFrameRef.current) === index) {
            drawFrame(currentRenderedFrameRef.current);
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    // Immediate load of Frame 0
    loadSingleFrame(0).then(() => {
      if (!isMounted) return;
      drawFrame(0);
    });

    // Load entire sequence in fast concurrent chunks
    const loadAllFrames = async () => {
      const concurrency = 16;
      for (let i = 0; i < TOTAL_FRAMES; i += concurrency) {
        if (!isMounted) break;
        const batch = [];
        for (let j = i; j < i + concurrency && j < TOTAL_FRAMES; j++) {
          batch.push(loadSingleFrame(j));
        }
        await Promise.all(batch);
      }
    };

    loadAllFrames();

    window.addEventListener("resize", resizeCanvas);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [getFramePath, drawFrame, resizeCanvas]);

  // Framer Motion Scroll Progress Binding with Slow, Extended Runway
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Pure Apple-style buttery-smooth Framer Motion spring physics
  // Deliberately calibrated for a slow, luxurious glide without fast jerky skipping
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 75, // Silky, cushioned resistance
    damping: 28,   // Completely eliminates oscillation / bounce
    mass: 0.6,     // Lightweight, immediate response without lag
    restDelta: 0.0001,
  });

  // Transform 0..1 smooth progress directly into continuous frame float 0..(TOTAL_FRAMES - 1)
  const currentFrameMotion = useTransform(smoothProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Framer Motion driven sub-frame canvas rendering
  useMotionValueEvent(currentFrameMotion, "change", (latestFrame) => {
    currentRenderedFrameRef.current = latestFrame;
    drawFrame(latestFrame);
    setCurrentFrameNumber(Math.min(TOTAL_FRAMES, Math.max(1, Math.round(latestFrame) + 1)));
  });

  // Framer Motion driven chapter & telemetry sync
  useMotionValueEvent(smoothProgress, "change", (latestProgress) => {
    setScrollProgress(latestProgress);
    const chapterIdx = CHAPTERS.findIndex(
      (c) => latestProgress >= c.range[0] && latestProgress <= c.range[1]
    );
    if (chapterIdx !== -1) {
      setActiveChapterIndex(chapterIdx);
    }
  });

  // Setup Lenis Smooth Scroll with independent requestAnimationFrame loop
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85, // Slower, more intentional scroll sensitivity
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Web Audio subtle ambient tone
  const toggleAudio = useCallback(() => {
    if (!isAudioEnabled) {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Warm harmonic sub-drone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime);

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(110.2, ctx.currentTime);

        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 3);

        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(ctx.destination);

        osc1.start();
        osc2.start();

        droneNodesRef.current = { osc1, osc2, gain };
        setIsAudioEnabled(true);
      } catch (err) {
        console.error("Audio error", err);
      }
    } else {
      if (droneNodesRef.current && audioContextRef.current) {
        const { gain, osc1, osc2 } = droneNodesRef.current;
        gain.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current.currentTime + 1);
        setTimeout(() => {
          try {
            osc1.stop();
            osc2.stop();
            audioContextRef.current?.close();
          } catch {
            // ignore
          }
        }, 1100);
      }
      setIsAudioEnabled(false);
    }
  }, [isAudioEnabled]);

  // Jump to chapter
  const scrollToChapter = (index: number) => {
    if (!containerRef.current) return;
    const targetRange = CHAPTERS[index].range;
    const targetProgress = (targetRange[0] + targetRange[1]) / 2;
    const rect = containerRef.current.getBoundingClientRect();
    const containerTop = rect.top + window.scrollY;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const scrollTarget = containerTop + containerHeight * targetProgress;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(scrollTarget, { duration: 1.5 });
    } else {
      window.scrollTo({
        top: scrollTarget,
        behavior: "smooth",
      });
    }
  };

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <div
      ref={containerRef}
      id="journey"
      className="relative bg-[#050505] text-white w-full"
      style={{ height: "900vh" }}
    >
      {/* Sticky Viewport Container: Pure GPU-accelerated pinning for 900vh */}
      <div
        ref={viewportRef}
        className="sticky top-0 w-full h-screen overflow-hidden bg-[#050505]"
      >
        {/* Full-bleed HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block z-0"
        />

        {/* Underlying Image Fallback (Guarantees zero blank screen while frames load) */}
        <div className="absolute inset-0 pointer-events-none z-[-1]">
          <img
            src="/sequence/frame-001.jpg"
            alt="The Lumière Exterior View"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Cinematic Vignette & Ambient Glow Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-transparent to-[#050505]/50 z-10" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/70 via-transparent to-[#050505]/70 z-10" />

        {/* Top Telemetry Bar */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 px-6 sm:px-12 flex items-center justify-between text-xs font-mono uppercase tracking-[0.25em] text-white/60 pointer-events-none z-30">
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#C6A76B] animate-pulse" />
            <span className="text-[#F5F0E8] font-medium tracking-[0.2em]">
              THE LUMIÈRE ARCHITECTURAL JOURNEY
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-[#C6A76B]">
              {activeChapter.location}
            </span>
          </div>

          <div className="flex items-center gap-4 pointer-events-auto">
            {/* Audio Ambience Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/70 border border-white/10 hover:border-[#C6A76B]/50 text-white/70 hover:text-white transition-all backdrop-blur-md cursor-pointer"
              title="Toggle architectural soundscape"
            >
              {isAudioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#C6A76B]" />
                  <span className="text-[10px] text-[#C6A76B]">Audio On</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="text-[10px]">Ambient Sound</span>
                </>
              )}
            </button>

            {/* Frame Telemetry */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] text-white/40">FRAME</span>
              <span className="text-[10px] text-[#F5F0E8] font-semibold">
                {String(currentFrameNumber).padStart(3, "0")}
              </span>
              <span className="text-[10px] text-white/30">/ {TOTAL_FRAMES}</span>
            </div>
          </div>
        </div>

        {/* Interactive Hotspots Layer */}
        <div className="absolute inset-0 pointer-events-none z-20">
          {HOTSPOTS.map((hotspot) => {
            const isVisible =
              scrollProgress >= hotspot.targetRange[0] &&
              scrollProgress <= hotspot.targetRange[1];

            return (
              <div
                key={hotspot.id}
                style={{ top: hotspot.position.top, left: hotspot.position.left }}
                className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ${
                  isVisible
                    ? "opacity-100 scale-100 pointer-events-auto"
                    : "opacity-0 scale-75 pointer-events-none"
                }`}
              >
                <button
                  type="button"
                  onClick={() => setActiveHotspot(hotspot)}
                  className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/70 hover:bg-black/90 border border-[#C6A76B]/60 text-white shadow-2xl backdrop-blur-xl cursor-pointer hover:border-[#C6A76B] transition-all hover:scale-105"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#C6A76B] opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#C6A76B]" />
                  </span>
                  <span className="text-[11px] font-sans tracking-wider uppercase text-[#F5F0E8] group-hover:text-white">
                    {hotspot.label}
                  </span>
                  <Info className="w-3 h-3 text-[#C6A76B] opacity-70 group-hover:opacity-100" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Hotspot Inspection Modal / Card with Framer Motion */}
        <AnimatePresence>
          {activeHotspot && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative max-w-md w-full bg-[#0A0A0C] border border-[#C6A76B]/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black text-left"
              >
                <button
                  type="button"
                  onClick={() => setActiveHotspot(null)}
                  className="absolute top-5 right-5 p-2 rounded-full text-white/50 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close detail"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#C6A76B] mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Architectural Specification</span>
                </div>

                <h3 className="font-serif text-2xl text-white font-light tracking-tight mt-1">
                  {activeHotspot.title}
                </h3>

                <p className="text-sm text-white/70 font-light leading-relaxed mt-4">
                  {activeHotspot.description}
                </p>

                <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-white/40">
                    The Lumière Engineering
                  </span>
                  <button
                    type="button"
                    onClick={() => setActiveHotspot(null)}
                    className="px-4 py-1.5 rounded-full text-xs uppercase tracking-widest bg-[#C6A76B] hover:bg-[#d8be85] text-black font-semibold transition-all cursor-pointer"
                  >
                    Dismiss
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Synchronized Storytelling Overlays with Framer Motion AnimatePresence */}
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-end pb-24 sm:pb-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {activeChapter && (
              <motion.div
                key={activeChapter.id}
                initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl pointer-events-auto"
              >
                {/* Chapter Pre-header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#C6A76B]/20 text-[#C6A76B] border border-[#C6A76B]/30">
                    SCENE {activeChapter.number}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#F5F0E8]/70 font-mono">
                    {activeChapter.location}
                  </span>
                </div>

                {/* Editorial Headline */}
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.08] drop-shadow-2xl">
                  {activeChapter.title}
                </h2>

                {/* Supporting Copy */}
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/90 font-light leading-relaxed max-w-2xl drop-shadow-lg">
                  {activeChapter.subtitle}
                </p>

                <p className="hidden md:block mt-2 text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-xl">
                  {activeChapter.description}
                </p>

                {/* Architectural Specs Badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                  {activeChapter.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-white/90 bg-black/60 border border-white/15 backdrop-blur-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Action CTA for Hero or Final Chapter */}
                {activeChapterIndex === 0 && (
                  <div className="mt-6 flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={() => scrollToChapter(1)}
                      className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black transition-all shadow-xl shadow-[#C6A76B]/20 cursor-pointer"
                    >
                      <span>Explore the Residence</span>
                      <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                    </motion.button>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                      Scroll to travel inside
                    </span>
                  </div>
                )}

                {activeChapterIndex === CHAPTERS.length - 1 && (
                  <div className="mt-6 flex items-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      type="button"
                      onClick={onOpenBooking}
                      className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black transition-all shadow-xl shadow-[#C6A76B]/20 cursor-pointer"
                    >
                      <span>Book a Private Visit</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Edge: Apple-Style Chapter Indicator Scrubber with Framer Motion layoutId */}
        <div className="hidden lg:flex absolute right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-3 z-30 pointer-events-auto">
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(idx)}
                className="group flex items-center gap-3 py-1 text-right focus:outline-none cursor-pointer relative"
              >
                <span
                  className={`text-[10px] font-mono tracking-widest uppercase transition-all duration-300 ${
                    isActive
                      ? "text-[#C6A76B] opacity-100 font-semibold"
                      : "text-white/40 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {ch.number} • {ch.id}
                </span>
                <div className="relative w-8 h-2 flex items-center justify-end">
                  {isActive ? (
                    <motion.div
                      layoutId="active-scrubber-pill"
                      className="w-8 h-1.5 rounded-full bg-[#C6A76B] shadow-lg shadow-[#C6A76B]/50"
                      transition={{ type: "spring", stiffness: 350, damping: 28 }}
                    />
                  ) : (
                    <div className="w-2 h-1.5 rounded-full bg-white/20 group-hover:bg-white/50 group-hover:w-4 transition-all" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Scroll Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/5 z-30">
          <div
            className="h-full bg-gradient-to-r from-[#C6A76B] via-[#E8D4A8] to-[#C6A76B] transition-all duration-75"
            style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          />
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          className={`absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/50 text-[10px] font-mono tracking-[0.25em] uppercase transition-opacity duration-500 pointer-events-none z-30 ${
            scrollProgress > 0.08 ? "opacity-0" : "opacity-100 animate-bounce"
          }`}
        >
          <span>SCROLL TO ADVANCE JOURNEY</span>
          <ArrowDown className="w-3.5 h-3.5 text-[#C6A76B]" />
        </div>
      </div>
    </div>
  );
}
