"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles, Compass, ShieldCheck, Award } from "lucide-react";

export function StorySection() {
  const pillars = [
    {
      number: "01",
      title: "The Monolith & The Void",
      tagline: "Volumetric Proportion",
      description:
        "Every floorplate is sculpted around generous negative space. Unobstructed spans and double-height ceiling volumes allow daylight to penetrate deeply into the core of each residence.",
    },
    {
      number: "02",
      title: "Tactile Authenticity",
      tagline: "Natural Materiality",
      description:
        "We reject synthetic imitations. Surfaces are crafted from honed Italian Statuario marble, fluted solid American walnut, and hand-patinated champagne architectural bronze.",
    },
    {
      number: "03",
      title: "Biophilic Serenity",
      tagline: "Living Architecture",
      description:
        "From the century-old preserved black pine at the entrance lobby to the private residential terraces, nature is woven into the architectural fabric as an essential sensory element.",
    },
  ];

  return (
    <section id="story" className="py-28 sm:py-36 bg-[#070709] relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#C6A76B]/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C6A76B] mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Architectural Ethos</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight leading-[1.08]">
            Where Light, Proportion <br />
            <span className="italic font-normal text-gradient bg-gradient-to-r from-[#F5F0E8] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
              &amp; Matter Converge.
            </span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-white/70 font-light leading-relaxed">
            The Lumière is not merely a residential tower; it is an architectural landmark
            conceived to elevate daily life into a continuous sensory ritual. Designed in
            collaboration with world-renowned master architects, every sightline, acoustic
            threshold, and material junction has been measured with watchmaker precision.
          </p>
        </motion.div>

        {/* Featured Visual Grid: Actual Exterior and Lobby Details */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Main Visual: Lobby Arrival */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-7 relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden">
              <img
                src="/sequence/frame-180.jpg"
                alt="The Lumière Grand Lobby"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A76B]">
                  LOBBY PORTAL
                </span>
                <h4 className="text-xl font-serif text-white mt-1">
                  Double-Height Statuario Atrium
                </h4>
              </div>
              <span className="text-xs font-mono text-white/60">32FT CEILINGS</span>
            </div>
          </motion.div>

          {/* Secondary Visual: Penthouse Skyline Horizon */}
          <div className="md:col-span-5 flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative group rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black"
            >
              <div className="relative aspect-[16/11] w-full overflow-hidden">
                <img
                  src="/sequence/frame-240.jpg"
                  alt="Penthouse Living Room"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                <div>
                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A76B]">
                    LEVEL 64 RESIDENCE
                  </span>
                  <h4 className="text-lg font-serif text-white mt-0.5">
                    Sunset Living Salon &amp; Sky Lounge
                  </h4>
                </div>
              </div>
            </motion.div>

            {/* Architectural Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 rounded-2xl bg-[#0C0C10] border border-white/10 relative"
            >
              <span className="font-serif text-5xl text-[#C6A76B]/30 absolute top-4 left-6">“</span>
              <p className="relative z-10 text-sm sm:text-base text-white/80 font-light italic leading-relaxed pt-3">
                True architectural luxury is quiet. It lives in the weight of the bronze door handle,
                the silent transition of acoustic glass, and the way afternoon light carves shadows
                across honed marble.
              </p>
              <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-white block">Alistair Vance</span>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-[#C6A76B]">
                    Lead Design Principal, Vance &amp; Partners
                  </span>
                </div>
                <Award className="w-5 h-5 text-[#C6A76B]" />
              </div>
            </motion.div>
          </div>
        </div>

        {/* The 3 Core Pillars with Staggered Entrance */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.number}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="p-8 rounded-2xl bg-[#0B0B0E] border border-white/10 hover:border-[#C6A76B]/40 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-mono text-xs text-[#C6A76B] tracking-widest">
                  PILLAR {pillar.number}
                </span>
                <span className="text-[10px] uppercase font-mono tracking-widest text-white/40">
                  {pillar.tagline}
                </span>
              </div>

              <h3 className="font-serif text-2xl text-white font-light tracking-tight mt-6 group-hover:text-[#F5F0E8] transition-colors">
                {pillar.title}
              </h3>

              <p className="mt-4 text-xs sm:text-sm text-white/60 font-light leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
