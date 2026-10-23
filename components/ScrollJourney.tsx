"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import {
  Volume2,
  VolumeX,
  Compass,
  ArrowDown,
  Layers,
  Sparkles,
  Info,
  X,
  ArrowRight,
  Maximize2,
} from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

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
    range: [0.38, 0.56],
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
    range: [0.56, 0.76],
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
    range: [0.76, 1.0],
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
    targetRange: [0.05, 0.22],
    position: { top: "35%", left: "45%" },
  },
  {
    id: "canopy",
    label: "Illuminated Canopy",
    title: "Linear Warm Amber Architectural Lighting",
    description:
      "Concealed 2700K warm LED ribbons bounce indirect golden light across fluted aluminum louvers, welcoming arrivals with residential warmth.",
    targetRange: [0.22, 0.42],
    position: { top: "30%", left: "50%" },
  },
  {
    id: "marble",
    label: "Italian Marble",
    title: "Bookmatched Honed Statuario Floor",
    description:
      "Hand-selected slabs quarried in Carrara, Italy, honed to a silky low-sheen satin finish that mirrors the ambient ceiling illumination.",
    targetRange: [0.42, 0.65],
    position: { top: "72%", left: "55%" },
  },
  {
    id: "bonsai",
    label: "Botanical Centerpiece",
    title: "Preserved Specimen Bonsai Garden",
    description:
      "A century-old cultivated Japanese black pine integrated into a recessed granite plinth, bringing organic tranquility into the monumental volume.",
    targetRange: [0.62, 0.8],
    position: { top: "52%", left: "50%" },
  },
  {
    id: "skyline",
    label: "Sunset Panorama",
    title: "Unobstructed Western Skyline Horizon",
    description:
      "Full-height structural glass mullions frame dramatic twilight sunsets across the metropolitan skyline, complemented by motorized sheer drapery.",
    targetRange: [0.82, 0.98],
    position: { top: "40%", left: "30%" },
  },
];

interface ScrollJourneyProps {
  onOpenBooking?: () => void;
}

export function ScrollJourney({ onOpenBooking }: ScrollJourneyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [scrollProgress, setScrollProgress] = useState(0);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isPreloaded, setIsPreloaded] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isAudioEnabled, setIsAudioEnabled] = useState(false);

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

  // Draw frame on canvas with aspect-ratio cover
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Find closest loaded frame if requested frame isn't ready
    let imgToDraw: HTMLImageElement | null = null;
    if (loadedFlagsRef.current[frameIndex] && imagesRef.current[frameIndex]) {
      imgToDraw = imagesRef.current[frameIndex];
    } else {
      // Search backward first
      for (let i = frameIndex; i >= 0; i--) {
        if (loadedFlagsRef.current[i] && imagesRef.current[i]) {
          imgToDraw = imagesRef.current[i];
          break;
        }
      }
      // If none backward, search forward
      if (!imgToDraw) {
        for (let i = frameIndex; i < TOTAL_FRAMES; i++) {
          if (loadedFlagsRef.current[i] && imagesRef.current[i]) {
            imgToDraw = imagesRef.current[i];
            break;
          }
        }
      }
    }

    if (!imgToDraw || !imgToDraw.naturalWidth) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    const imgWidth = imgToDraw.naturalWidth;
    const imgHeight = imgToDraw.naturalHeight;

    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const destWidth = imgWidth * scale;
    const destHeight = imgHeight * scale;
    const destX = (canvasWidth - destWidth) / 2;
    const destY = (canvasHeight - destHeight) / 2;

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(imgToDraw, 0, 0, imgWidth, imgHeight, destX, destY, destWidth, destHeight);
  }, []);

  // Update canvas resolution on resize
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = window.innerWidth;
    const height = window.innerHeight;

    if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      drawFrame(currentRenderedFrameRef.current);
    }
  }, [drawFrame]);

  // Preloading image sequence
  useEffect(() => {
    let isMounted = true;
    let loaded = 0;

    // Phase 1: Load first 20 frames immediately for instant rendering
    const priorityFrames = 20;

    const loadFrame = (index: number): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = getFramePath(index);
        img.onload = () => {
          if (!isMounted) return resolve();
          imagesRef.current[index] = img;
          loadedFlagsRef.current[index] = true;
          loaded++;
          setLoadedCount(loaded);
          if (index === 0) {
            drawFrame(0);
          }
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    };

    // Load initial batch
    const initialPromises = [];
    for (let i = 0; i < priorityFrames; i++) {
      initialPromises.push(loadFrame(i));
    }

    Promise.all(initialPromises).then(() => {
      if (!isMounted) return;
      setIsPreloaded(true);
      resizeCanvas();

      // Phase 2: Progressively load remaining frames
      let nextIndex = priorityFrames;
      const loadNextBatch = () => {
        if (!isMounted || nextIndex >= TOTAL_FRAMES) return;
        const batchSize = 10;
        const batchPromises = [];
        for (let i = 0; i < batchSize && nextIndex < TOTAL_FRAMES; i++, nextIndex++) {
          batchPromises.push(loadFrame(nextIndex));
        }
        Promise.all(batchPromises).then(() => {
          if (window.requestIdleCallback) {
            window.requestIdleCallback(loadNextBatch);
          } else {
            setTimeout(loadNextBatch, 30);
          }
        });
      };
      loadNextBatch();
    });

    window.addEventListener("resize", resizeCanvas);

    return () => {
      isMounted = false;
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [getFramePath, drawFrame, resizeCanvas]);

  // Smooth lerped render loop
  useEffect(() => {
    const renderLoop = () => {
      const current = currentRenderedFrameRef.current;
      const target = targetFrameRef.current;

      // Smooth interpolation between frames
      const diff = target - current;
      if (Math.abs(diff) > 0.05) {
        currentRenderedFrameRef.current = current + diff * 0.18;
        const frameToDraw = Math.round(currentRenderedFrameRef.current);
        drawFrame(Math.min(TOTAL_FRAMES - 1, Math.max(0, frameToDraw)));
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [drawFrame]);

  // Setup Lenis Smooth Scroll and GSAP ScrollTrigger
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          setScrollProgress(progress);

          // Update target frame
          const target = Math.min(
            TOTAL_FRAMES - 1,
            Math.max(0, Math.floor(progress * (TOTAL_FRAMES - 1)))
          );
          targetFrameRef.current = target;

          // Find active chapter
          const chapterIdx = CHAPTERS.findIndex(
            (c) => progress >= c.range[0] && progress <= c.range[1]
          );
          if (chapterIdx !== -1) {
            setActiveChapterIndex(chapterIdx);
          }
        },
      });
    }

    return () => {
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  // Web Audio subtle ambient tone
  const toggleAudio = useCallback(() => {
    if (!isAudioEnabled) {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Warm harmonic sub-drone
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const gain = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(55, ctx.currentTime); // A1 bass tone

        osc2.type = "sine";
        osc2.frequency.setValueAtTime(110.2, ctx.currentTime); // A2 harmonic

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
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const scrollTarget = containerTop + containerHeight * targetProgress;

    window.scrollTo({
      top: scrollTarget,
      behavior: "smooth",
    });
  };

  const activeChapter = CHAPTERS[activeChapterIndex] || CHAPTERS[0];

  return (
    <div
      ref={containerRef}
      id="journey"
      className="relative bg-[#050505] text-white"
      style={{ height: "650vh" }}
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
        {/* Full-bleed HTML5 Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover block"
        />

        {/* Cinematic Vignette & Ambient Glow Overlays */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050505]/90 via-transparent to-[#050505]/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#050505]/60 via-transparent to-[#050505]/60" />

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

            {/* Frame / Preload Telemetry */}
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md">
              <span className="text-[10px] text-white/40">FRAME</span>
              <span className="text-[10px] text-[#F5F0E8] font-semibold">
                {String(Math.min(TOTAL_FRAMES, Math.floor(scrollProgress * TOTAL_FRAMES) + 1)).padStart(3, "0")}
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

        {/* Hotspot Inspection Modal / Card */}
        {activeHotspot && (
          <div className="absolute inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md transition-opacity">
            <div className="relative max-w-md w-full bg-[#0A0A0C] border border-[#C6A76B]/40 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-black text-left animate-in fade-in zoom-in-95 duration-200">
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
            </div>
          </div>
        )}

        {/* Synchronized Storytelling Overlays (Scenes 1 - 5) */}
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col justify-end pb-24 sm:pb-28 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto">
          {CHAPTERS.map((chapter, idx) => {
            const start = chapter.range[0];
            const end = chapter.range[1];
            const mid = (start + end) / 2;
            const distance = Math.abs(scrollProgress - mid);
            const halfDuration = (end - start) / 2;

            // Fade curve: 1 at center, fading toward 0 at boundaries
            let opacity = 1 - distance / halfDuration;
            opacity = Math.max(0, Math.min(1, opacity));

            // Curve opacity for smooth appearance
            const smoothOpacity = Math.pow(opacity, 1.5);
            const translateY = (1 - opacity) * 30;

            if (opacity <= 0.01) return null;

            return (
              <div
                key={chapter.id}
                style={{
                  opacity: smoothOpacity,
                  transform: `translateY(${translateY}px)`,
                }}
                className="max-w-3xl transition-transform duration-100 ease-out pointer-events-auto"
              >
                {/* Chapter Pre-header */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#C6A76B]/20 text-[#C6A76B] border border-[#C6A76B]/30">
                    SCENE {chapter.number}
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-[#F5F0E8]/70 font-mono">
                    {chapter.location}
                  </span>
                </div>

                {/* Editorial Headline */}
                <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.08] drop-shadow-lg">
                  {chapter.title}
                </h2>

                {/* Supporting Copy */}
                <p className="mt-3 sm:mt-4 text-base sm:text-lg text-white/85 font-light leading-relaxed max-w-2xl drop-shadow">
                  {chapter.subtitle}
                </p>

                <p className="hidden md:block mt-2 text-xs sm:text-sm text-white/60 font-light leading-relaxed max-w-xl">
                  {chapter.description}
                </p>

                {/* Architectural Specs Badges */}
                <div className="mt-5 flex flex-wrap items-center gap-2 sm:gap-3">
                  {chapter.specs.map((spec) => (
                    <span
                      key={spec}
                      className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-white/80 bg-black/50 border border-white/10 backdrop-blur-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>

                {/* Action CTA for Hero or Final Chapter */}
                {idx === 0 && (
                  <div className="mt-6 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => scrollToChapter(1)}
                      className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black transition-all shadow-xl shadow-[#C6A76B]/20 hover:scale-105 cursor-pointer"
                    >
                      <span>Explore the Residence</span>
                      <ArrowDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" />
                    </button>
                    <span className="text-xs font-mono uppercase tracking-widest text-white/50">
                      Scroll to travel inside
                    </span>
                  </div>
                )}

                {idx === CHAPTERS.length - 1 && (
                  <div className="mt-6 flex items-center gap-4">
                    <button
                      type="button"
                      onClick={onOpenBooking}
                      className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black transition-all shadow-xl shadow-[#C6A76B]/20 hover:scale-105 cursor-pointer"
                    >
                      <span>Book a Private Visit</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Edge: Apple-Style Chapter Indicator Scrubber */}
        <div className="hidden lg:flex fixed right-8 top-1/2 -translate-y-1/2 flex-col items-end gap-3 z-30 pointer-events-auto">
          {CHAPTERS.map((ch, idx) => {
            const isActive = activeChapterIndex === idx;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => scrollToChapter(idx)}
                className="group flex items-center gap-3 py-1 text-right focus:outline-none cursor-pointer"
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
                <span
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    isActive
                      ? "w-8 bg-[#C6A76B] shadow-lg shadow-[#C6A76B]/40"
                      : "w-2 bg-white/20 group-hover:bg-white/50 group-hover:w-4"
                  }`}
                />
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
