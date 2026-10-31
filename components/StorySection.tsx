"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Award } from "lucide-react";
import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import { Shine } from "@animate-ui/react/primitives/effects/shine";

export function StorySection() {
  const pillars = [
    {
      number: "01",
      title: "Volumetric Proportion",
      tagline: "Light & Scale",
      description: "Double-height spaces and column-free floorplates calibrated for deep natural daylight.",
    },
    {
      number: "02",
      title: "Natural Materiality",
      tagline: "Authentic Textures",
      description: "Honed Italian Statuario, solid American walnut, and hand-patinated champagne bronze.",
    },
    {
      number: "03",
      title: "Biophilic Harmony",
      tagline: "Living Sanctuary",
      description: "Century-old black pine atrium and private residential sky terraces woven into the facade.",
    },
  ];

  return (
    <section id="story" className="py-24 sm:py-32 bg-[#070709] relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C6A76B]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Editorial Eyebrow & Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C6A76B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Architectural Ethos</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight leading-[1.08]">
            Architecture <br />
            <span className="italic font-normal bg-gradient-to-r from-[#F5F0E8] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
              Beyond Ordinary.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/80 font-light leading-relaxed">
            68 stories. Timeless architecture. Elevated living.
          </p>
        </motion.div>

        {/* Visual Editorial Composition */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Visual: Grand Foyer with Animate UI Tilt */}
          <div className="md:col-span-7">
            <Tilt maxTilt={6} perspective={1100} className="w-full">
              <TiltContent className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src="/sequence/frame-075.jpg"
                    alt="The Lumière Grand Lobby"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>

                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A76B]">
                      LOBBY PORTAL
                    </span>
                    <h4 className="text-xl font-serif text-white mt-0.5">
                      Double-Height Statuario Atrium
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-white/60">32FT CEILINGS</span>
                </div>
              </TiltContent>
            </Tilt>
          </div>

          {/* Secondary Column: Penthouse Sky Horizon + Minimal Quote */}
          <div className="md:col-span-5 flex flex-col space-y-6">
            <Tilt maxTilt={6} perspective={1100} className="w-full">
              <TiltContent className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src="/sequence/frame-100.jpg"
                    alt="Penthouse Living Room"
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                </div>
                <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between pointer-events-none">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A76B]">
                      LEVEL 64 PENTHOUSE
                    </span>
                    <h4 className="text-lg font-serif text-white mt-0.5">
                      Sunset Living Salon &amp; Horizon
                    </h4>
                  </div>
                </div>
              </TiltContent>
            </Tilt>

            {/* Architectural Quote Card with Animate UI Shine */}
            <div className="relative overflow-hidden rounded-2xl">
              <Shine color="rgba(198, 167, 107, 0.25)" duration={4} loop loopDelay={3} className="p-6 sm:p-7 rounded-2xl bg-[#0C0C10] border border-white/10 relative">
                <p className="text-sm text-white/80 font-light italic leading-relaxed">
                  “True luxury lives in the weight of bronze, the silence of acoustic glass, and afternoon light across honed marble.”
                </p>
                <div className="mt-4 pt-3.5 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium text-white block">Alistair Vance</span>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#C6A76B]">
                      Lead Design Principal, Vance &amp; Partners
                    </span>
                  </div>
                  <Award className="w-4 h-4 text-[#C6A76B]" />
                </div>
              </Shine>
            </div>
          </div>
        </div>

        {/* 3 Pillars Grid with Animate UI Tilt */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {pillars.map((pillar) => (
            <Tilt key={pillar.number} maxTilt={8} perspective={900} className="w-full h-full">
              <TiltContent className="p-7 rounded-2xl bg-[#0B0B0E] border border-white/10 hover:border-[#C6A76B]/40 transition-colors duration-300 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between pb-5 border-b border-white/10">
                    <span className="font-mono text-xs text-[#C6A76B] tracking-widest">
                      PILLAR {pillar.number}
                    </span>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                      {pillar.tagline}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-white font-light tracking-tight mt-5">
                    {pillar.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </TiltContent>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
