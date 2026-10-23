"use client";

import React, { useRef, useState, useEffect, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import {
  ArrowDown,
  Volume2,
  VolumeX,
  ArrowRight,
  RotateCcw,
  Check,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { BuildingScene } from "@/components/three/BuildingScene";
import { CameraScrollRig } from "@/components/three/CameraScrollRig";
import { ConsultationModal } from "@/components/forms/ConsultationModal";

// Register ScrollTrigger safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// Chapter Data corresponding to the camera journey
const CHAPTERS = [
  {
    id: "approach",
    number: "01",
    name: "The Arrival",
    subtitle: "A Cantilevered Sanctuarial Estate in Steel, Water & Sky",
    tagline: "Exterior Architecture & Reflection Pool",
    location: "Bel Air Crest, Los Angeles",
    specs: ["14,800 Sq Ft", "3.2 Private Acres", "Cantilever Steel"],
    range: [0.0, 0.22],
    cameraTargetProgress: 0.05,
    details:
      "Sculpted into the ridgeline of Bel Air, the residence greets visitors with black water reflection ponds, stepping-stone basalt walkways, and dramatic cantilevered titanium rooflines.",
  },
  {
    id: "portal",
    number: "02",
    name: "The Threshold",
    subtitle: "Motorized Acoustic Glazing & Honed Roman Travertine",
    tagline: "Passing Through The Grand Entrance",
    location: "Entrance Portal & Foyer",
    specs: ["Acoustic STC 48", "Biometric Entry", "Travertine Portico"],
    range: [0.22, 0.42],
    cameraTargetProgress: 0.32,
    details:
      "As you approach, the motorized architectural glass panels slide quietly into subterranean pockets, blurring the distinction between California coastal atmosphere and private interior luxury.",
  },
  {
    id: "greathall",
    number: "03",
    name: "The Great Pavilion",
    subtitle: "Double-Height Volume, Hearth & Sunken Lounge",
    tagline: "Main Living & Entertaining Salon",
    location: "Interior Level 01",
    specs: ["14.5ft Finished Ceilings", "Quartzite Monolith Fireplace", "Minotti Furnishings"],
    range: [0.42, 0.65],
    cameraTargetProgress: 0.52,
    details:
      "Stepping into the great entertaining pavilion reveals open-concept living anchored by a floating black quartzite fireplace, custom Italian boucle sectionals, and a sculptural bronze cantilever staircase.",
  },
  {
    id: "horizon",
    number: "04",
    name: "Cantilever Pool Deck",
    subtitle: "120ft Suspended Horizon Edge Over Canyon & Sea",
    tagline: "Outdoor Living & Wellness Sanctuary",
    location: "West Cantilever Deck",
    specs: ["120ft Heated Saltwater Pool", "Geothermal Heating", "Pacific Ocean Panoramas"],
    range: [0.65, 0.85],
    cameraTargetProgress: 0.74,
    details:
      "Floor-to-ceiling glass reveals the west terrace, where a 120ft heated saltwater infinity pool cantilevers directly over the canyon drop, complemented by sunken fire pits and sunset lounges.",
  },
  {
    id: "observatory",
    number: "05",
    name: "Sky Observatory",
    subtitle: "300° Panoramic Skyline Views & Generational Wealth",
    tagline: "Upper Mezzanine & Private Office",
    location: "Level 02 Mezzanine",
    specs: ["300° Unobstructed Views", "Dolby Atmos Screening", "Collector Vault"],
    range: [0.85, 1.0],
    cameraTargetProgress: 0.95,
    details:
      "Ascending to the upper sky mezzanine provides commanding 300° views stretching from downtown Los Angeles to Catalina Island. An extraordinary sanctuary for private acquisition.",
  },
];

export function BuildingScrollJourney() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [doorProgress, setDoorProgress] = useState(0);
  const [interiorGlow, setInteriorGlow] = useState(0);
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });
  const [isAudioActive, setIsAudioActive] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis Smooth Scroll & GSAP ScrollTrigger
  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.5,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    // Setup GSAP ScrollTrigger on container
    if (containerRef.current) {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        },
      });
    }

    return () => {
      gsap.ticker.remove(tickerCallback);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      lenis.destroy();
    };
  }, []);

  // Mouse Parallax on Desktop
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMouseParallax({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Web Audio API Ambient Sound (Zero external audio file dependencies)
  const toggleAudio = () => {
    if (isAudioActive) {
      if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
      }
      setIsAudioActive(false);
    } else {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        audioContextRef.current = ctx;

        // Warm ambient drone (simulating gentle breeze and architectural resonance)
        const osc1 = ctx.createOscillator();
        const osc2 = ctx.createOscillator();
        const filter = ctx.createBiquadFilter();
        const gainNode = ctx.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(110, ctx.currentTime); // A2 warm harmonic

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(165, ctx.currentTime); // E3 warm fifth

        filter.type = "lowpass";
        filter.frequency.setValueAtTime(320, ctx.currentTime);

        gainNode.gain.setValueAtTime(0.06, ctx.currentTime);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        osc1.start();
        osc2.start();
        setIsAudioActive(true);
      } catch (err) {
        console.warn("Audio context could not start:", err);
      }
    }
  };

  // Jump to specific chapter waypoint
  const scrollToChapter = useCallback((targetProgress: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + containerHeight * targetProgress;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, { duration: 1.6 });
    } else {
      window.scrollTo({ top: targetScroll, behavior: "smooth" });
    }
  }, []);

  // Determine current active chapter based on scroll progress
  const currentChapter =
    CHAPTERS.find(
      (c) => scrollProgress >= c.range[0] && scrollProgress <= c.range[1]
    ) || CHAPTERS[0];

  return (
    <>
      {/* Scroll track container: 550vh tall to allow rich, deliberate continuous journey */}
      <div ref={containerRef} className="relative w-full h-[550vh] bg-[#070709]">
        {/* Sticky Fullscreen 3D Viewport */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* 3D Canvas */}
          <Canvas
            camera={{ position: [0, 2.4, 20], fov: 42 }}
            shadows
            gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
            className="w-full h-full bg-[#08080c]"
          >
            <Suspense fallback={null}>
              <color attach="background" args={["#08080c"]} />
              <fog attach="fog" args={["#08080c", 18, 55]} />

              <CameraScrollRig
                scrollProgress={scrollProgress}
                mouseParallax={mouseParallax}
                onUpdateDoorProgress={setDoorProgress}
                onUpdateInteriorGlow={setInteriorGlow}
              />

              <BuildingScene
                doorProgress={doorProgress}
                interiorGlow={interiorGlow}
                selectedHotspot={selectedHotspot}
                onSelectHotspot={(id) => setSelectedHotspot(id)}
              />
            </Suspense>
          </Canvas>

          {/* Vignette & cinematic contrast gradient */}
          <div className="pointer-events-none absolute inset-0 bg-radial from-transparent via-[#070709]/20 to-[#070709]/80" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#070709] to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[#070709]/90 to-transparent" />

          {/* ================= PERSISTENT CINEMATIC HUD ================= */}
          {/* Top Left: Live Location & Journey Phase Indicator */}
          <div className="absolute top-20 sm:top-24 left-4 sm:left-8 z-30 flex items-center gap-2.5">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#c5a880] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#c5a880]" />
            </span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a880] font-mono font-semibold">
                Spatial Exploration
              </span>
              <span className="text-xs text-white font-medium drop-shadow">
                {currentChapter.location}
              </span>
            </div>
          </div>

          {/* Top Right: Ambient Sound & Quick Jump Controls */}
          <div className="absolute top-20 sm:top-24 right-4 sm:right-8 z-30 flex items-center gap-2">
            {/* Ambient Sound Toggle */}
            <button
              type="button"
              onClick={toggleAudio}
              className={`p-2.5 rounded-full border transition-all cursor-pointer backdrop-blur-md ${
                isAudioActive
                  ? "bg-[#c5a880] text-black border-[#c5a880] shadow-lg shadow-[#c5a880]/30"
                  : "bg-black/60 text-zinc-300 border-white/15 hover:border-[#c5a880] hover:text-white"
              }`}
              title={isAudioActive ? "Mute Ambient Sound" : "Enable Spatial Audio"}
            >
              {isAudioActive ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>

            {/* Quick Skip to Exterior */}
            <button
              type="button"
              onClick={() => scrollToChapter(0)}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/15 hover:border-[#c5a880] text-zinc-300 hover:text-white text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Exterior</span>
            </button>
          </div>

          {/* Left Vertical Navigation Waypoints (Desktop) */}
          <div className="hidden lg:flex absolute left-8 top-1/2 -translate-y-1/2 z-30 flex-col space-y-4">
            <span className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-mono -rotate-90 origin-left translate-y-8">
              Waypoints
            </span>
            {CHAPTERS.map((ch) => {
              const isActive = currentChapter.id === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => scrollToChapter(ch.cameraTargetProgress)}
                  className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      isActive
                        ? "bg-[#c5a880] scale-150 shadow-md shadow-[#c5a880]/50"
                        : "bg-white/20 group-hover:bg-white/60"
                    }`}
                  />
                  <div className="flex flex-col opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-mono">
                      {ch.number}
                    </span>
                    <span className="text-xs text-white whitespace-nowrap drop-shadow">
                      {ch.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ================= DYNAMIC EDITORIAL CONTENT REVEAL ================= */}
          {/* Aligned based on the camera position in the space */}
          <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-6 sm:p-12 z-20">
            {/* Main Center/Lower Chapter Information */}
            <div className="mt-auto max-w-2xl pointer-events-auto">
              <div className="p-6 sm:p-8 rounded-3xl bg-black/75 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-500">
                {/* Chapter Tag & Progress */}
                <div className="flex items-center justify-between gap-4 mb-2 pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase tracking-widest font-mono font-semibold bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880]/30">
                      Phase {currentChapter.number}
                    </span>
                    <span className="text-xs text-zinc-400 font-medium">
                      {currentChapter.tagline}
                    </span>
                  </div>

                  <span className="text-xs font-mono text-[#c5a880]">
                    {Math.round(scrollProgress * 100)}% Depth
                  </span>
                </div>

                {/* Chapter Headline */}
                <h2 className="text-2xl sm:text-4xl font-serif text-white font-light tracking-tight leading-snug">
                  {currentChapter.name}
                </h2>
                <p className="text-xs sm:text-sm font-serif text-[#c5a880] mt-1 italic">
                  {currentChapter.subtitle}
                </p>

                {/* Narrative Details */}
                <p className="text-xs sm:text-sm text-zinc-300 font-light mt-3 leading-relaxed">
                  {currentChapter.details}
                </p>

                {/* Specs Badges */}
                <div className="mt-4 pt-4 border-t border-white/10 flex flex-wrap gap-2">
                  {currentChapter.specs.map((spec) => (
                    <span
                      key={spec}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] text-zinc-300 font-mono"
                    >
                      <Check className="w-3 h-3 text-[#c5a880]" />
                      <span>{spec}</span>
                    </span>
                  ))}
                </div>

                {/* Final Chapter Specific CTAs (Only on last chapter: Sky Sanctuary) */}
                {currentChapter.id === "observatory" && (
                  <div className="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsConsultationOpen(true)}
                      className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#c5a880] text-black hover:bg-[#dfc293] transition-all shadow-lg shadow-[#c5a880]/30 cursor-pointer"
                    >
                      Book Private Tour
                    </button>
                    <a
                      href="https://wa.me/442079460912?text=Hello%20Aurelia%2C%20I%20would%20like%20to%20inquire%20about%20The%20Glass%20Pavilion%20residence."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider text-zinc-300 hover:text-white border border-white/15 hover:border-[#c5a880] transition-colors"
                    >
                      WhatsApp Desk
                    </a>
                    <Link
                      href="/properties"
                      className="px-5 py-2.5 rounded-full text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
                    >
                      <span>All Properties</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Progress Bar & Scroll Cue */}
            <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-zinc-400 pointer-events-auto">
              {/* Progress Line */}
              <div className="flex-1 max-w-md flex items-center gap-3">
                <span className="font-mono text-[10px] text-zinc-400">01</span>
                <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#dfc293] to-[#c5a880] transition-all duration-150"
                    style={{ width: `${Math.max(4, scrollProgress * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-[10px] text-zinc-400">05</span>
              </div>

              {/* Scroll guidance hint */}
              <div className="flex items-center gap-2 text-zinc-300">
                <span className="text-[11px] uppercase tracking-widest font-mono">
                  {scrollProgress < 0.15
                    ? "Scroll Down to Enter the Building"
                    : scrollProgress < 0.85
                    ? "Scroll to Continue Through Interior"
                    : "Scroll Up to Return Outside"}
                </span>
                <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#c5a880]" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        propertyTitle="The Glass Pavilion (Bel Air Crest)"
      />
    </>
  );
}
