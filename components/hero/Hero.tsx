"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Sparkles, Box, Compass } from "lucide-react";
import { SearchPanel } from "@/components/search/SearchPanel";
import dynamic from "next/dynamic";

// Dynamically import 3D canvas so initial LCP remains ultra-fast
const ArchitecturalCanvas = dynamic(
  () => import("@/components/three/ArchitecturalCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex items-center justify-center bg-[#070709]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#c5a880] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#c5a880]">Initializing 3D Space...</span>
        </div>
      </div>
    ),
  }
);

export function Hero() {
  const [heroMode, setHeroMode] = useState<"cinematic" | "3d">("cinematic");

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-12 sm:pb-16 overflow-hidden">
      {/* Background layer: Either Cinematic Photography or Interactive 3D Canvas */}
      {heroMode === "cinematic" ? (
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2600&auto=format&fit=crop"
            alt="The Glass Pavilion, Bel Air - Luxury Architectural Villa"
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center scale-105 animate-pulse duration-[10000ms]"
          />
          {/* Atmospheric cinematic overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/50 to-[#070709]/80" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#070709]/40 to-[#070709]/90" />
          <div className="absolute inset-0 cinematic-grid opacity-30" />
        </div>
      ) : (
        <div className="absolute inset-0 z-0 bg-[#070709]">
          <ArchitecturalCanvas className="w-full h-full" showControls={true} />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070709] via-transparent to-[#070709]/70" />
        </div>
      )}

      {/* Hero Header & Mode Switcher */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-4 sm:mt-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#c5a880]/30 text-xs tracking-[0.2em] uppercase text-[#c5a880]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Exceptional Properties. Extraordinary Living.</span>
          </div>

          {/* Mode Switcher: Cinematic Imagery vs 3D Architecture */}
          <div className="inline-flex items-center p-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setHeroMode("cinematic")}
              className={`px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                heroMode === "cinematic"
                  ? "bg-[#c5a880] text-black font-semibold shadow-md shadow-[#c5a880]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              Cinematic Film
            </button>
            <button
              type="button"
              onClick={() => setHeroMode("3d")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs uppercase tracking-wider font-medium transition-all cursor-pointer ${
                heroMode === "3d"
                  ? "bg-[#c5a880] text-black font-semibold shadow-md shadow-[#c5a880]/30"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Box className="w-3.5 h-3.5" />
              <span>Interactive 3D</span>
            </button>
          </div>
        </div>

        {/* Hero Headline & Editorial Narrative */}
        <div className="max-w-4xl mt-8 sm:mt-12">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white tracking-tight leading-[1.05]">
            Find a Place <br />
            <span className="italic font-normal text-gold-gradient">Beyond Ordinary.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300 font-light max-w-2xl leading-relaxed">
            Curators of the world&apos;s most rare architectural estates, cantilevered coastal sanctuaries,
            and crown penthouses. Where visionary design meets absolute discretion.
          </p>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/properties"
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all shadow-xl shadow-[#c5a880]/20 flex items-center gap-2 group hover:scale-[1.02]"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <a
              href="#signature-residence"
              className="px-7 py-3.5 rounded-full text-xs uppercase tracking-widest text-zinc-300 hover:text-white border border-white/20 hover:border-[#c5a880] bg-black/40 backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4 text-[#c5a880]" />
              <span>Discover Our Story</span>
            </a>
          </div>
        </div>
      </div>

      {/* Featured Property Badge & Scroll cue */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-10 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-zinc-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-zinc-300">Curated Showcase:</span>
            <span className="text-white font-medium">The Glass Pavilion, Bel Air</span>
            <span className="text-[#c5a880] font-semibold">$54,000,000</span>
          </div>

          <a
            href="#search-section"
            className="inline-flex items-center gap-2 text-zinc-400 hover:text-[#c5a880] transition-colors self-start sm:self-auto"
          >
            <span>Scroll to discover</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-[#c5a880]" />
          </a>
        </div>
      </div>

      {/* Embedded Property Search Panel */}
      <div id="search-section" className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <SearchPanel />
      </div>
    </section>
  );
}
