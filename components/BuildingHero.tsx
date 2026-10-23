"use client";

import React from "react";
import { ArrowDown, Sparkles, Compass } from "lucide-react";

interface BuildingHeroProps {
  onExplore: () => void;
  onOpenBooking: () => void;
}

export function BuildingHero({ onExplore, onOpenBooking }: BuildingHeroProps) {
  return (
    <div className="relative min-h-[90vh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-12 max-w-7xl mx-auto bg-[#050505]">
      {/* Top Tagline */}
      <div className="flex items-center gap-3 text-xs font-mono tracking-[0.3em] uppercase text-[#C6A76B]">
        <Sparkles className="w-3.5 h-3.5" />
        <span>One Billionaire's Row • Waterfront Crest</span>
      </div>

      {/* Main Hero Typography */}
      <div className="max-w-4xl my-auto">
        <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.35em] text-[#F5F0E8]/60 block mb-4">
          The Flagship Architectural Landmark
        </span>

        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl text-white font-light tracking-tight leading-[1.02]">
          Architecture <br />
          <span className="italic font-normal text-gradient bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
            Beyond Ordinary.
          </span>
        </h1>

        <p className="mt-6 text-lg sm:text-2xl text-white/70 font-light leading-relaxed max-w-2xl">
          A new perspective on elevated living. Experience an unbroken continuous journey from the
          sculpted exterior gates into the sanctuary of the double-height lobby and sky residences.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onExplore}
            className="group px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black shadow-xl shadow-[#C6A76B]/20 transition-all flex items-center gap-2 cursor-pointer hover:scale-105"
          >
            <span>Begin Architectural Tour</span>
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-mono text-white/80 hover:text-white border border-white/10 hover:border-[#C6A76B]/50 transition-all backdrop-blur-md cursor-pointer"
          >
            Book a Private Visit
          </button>
        </div>
      </div>

      {/* Quick Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-white/10 text-xs font-mono text-white/60">
        <div>
          <span className="text-[10px] uppercase text-white/40 block">Building Height</span>
          <span className="text-white font-serif text-lg">280 Meters • 68 Floors</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-white/40 block">Architectural Glazing</span>
          <span className="text-white font-serif text-lg">Acoustic STC 48 Low-E</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-white/40 block">Private Residences</span>
          <span className="text-white font-serif text-lg">142 Exclusive Suites</span>
        </div>
        <div>
          <span className="text-[10px] uppercase text-white/40 block">Immediate Horizon</span>
          <span className="text-white font-serif text-lg">360° Unobstructed Vistas</span>
        </div>
      </div>
    </div>
  );
}
