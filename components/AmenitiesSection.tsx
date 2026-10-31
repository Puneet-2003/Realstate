"use client";

import React, { useState } from "react";
import { Sparkles, ArrowRight, Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import {
  RippleButton,
  RippleButtonRipples,
} from "@animate-ui/react/primitives/buttons/ripple";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface Amenity {
  id: string;
  category: "Wellness" | "Leisure" | "Service";
  title: string;
  sentence: string;
  tagline: string;
  image: string;
  highlight: string;
  tooltipText: string;
}

const AMENITIES: Amenity[] = [
  {
    id: "pool",
    category: "Wellness",
    title: "Infinity Pool",
    sentence: "Heated 25-meter saltwater pool suspended 220 meters above the skyline.",
    tagline: "Level 58 Horizon",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
    highlight: "84°F Geothermal Saltwater",
    tooltipText: "Continuous salinity balancing with zero chlorine scent, framed by heated basalt lounging decks.",
  },
  {
    id: "spa",
    category: "Wellness",
    title: "Wellness Spa",
    sentence: "Subterranean Roman thermal hydrotherapy circuit, cedar sauna, and cold plunge.",
    tagline: "Thermal Sanctuary",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
    highlight: "Basalt Thermal Circuit",
    tooltipText: "Features Swiss hydrotherapy jets, herbal salt steam grotto, and Finnish pine aromatherapy chambers.",
  },
  {
    id: "cinema",
    category: "Leisure",
    title: "Private Cinema",
    sentence: "Meyer Sound 32-channel Dolby Atmos acoustics with 4K laser projection.",
    tagline: "Dolby Atmos Screening",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    highlight: "18 Reclining Velvet Lounges",
    tooltipText: "Direct DCI-compliant satellite uplink for live premiere screening and private studio screenings.",
  },
  {
    id: "fitness",
    category: "Wellness",
    title: "Fitness Studio",
    sentence: "AI-guided Technogym Artis line and dedicated Reformer Pilates suites.",
    tagline: "Biometric Conditioning",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
    highlight: "Technogym Artis Line",
    tooltipText: "Real-time heart-rate tracking consoles and on-demand Olympian strength coaches.",
  },
  {
    id: "concierge",
    category: "Service",
    title: "Concierge Services",
    sentence: "24/7 Les Clefs d'Or team, house Rolls-Royce fleet, and private valet.",
    tagline: "Discrete Hospitality",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
    highlight: "Les Clefs d'Or Accredited",
    tooltipText: "Global priority access to private aviation, Michelin reservations, and secure vault facilities.",
  },
];

interface AmenitiesSectionProps {
  onOpenBooking: () => void;
}

export function AmenitiesSection({ onOpenBooking }: AmenitiesSectionProps) {
  const [filter, setFilter] = useState<"All" | "Wellness" | "Leisure" | "Service">("All");

  const filtered = filter === "All" ? AMENITIES : AMENITIES.filter((a) => a.category === filter);

  return (
    <section id="amenities" className="py-24 sm:py-32 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C6A76B] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lifestyle &amp; Privileges</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
              Elevated Living, <br />
              <span className="italic font-normal bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
                Every Day.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-[#0A0A0E] border border-white/10 rounded-full">
              {(["All", "Wellness", "Leisure", "Service"] as const).map((cat) => {
                const isActive = filter === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFilter(cat)}
                    className={`relative px-3.5 py-1.5 text-xs uppercase font-mono tracking-wider rounded-full transition-colors cursor-pointer ${
                      isActive ? "text-black font-semibold" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="activeAmenityPill"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                        className="absolute inset-0 bg-[#C6A76B] rounded-full shadow-md shadow-[#C6A76B]/20"
                      />
                    )}
                    <span className="relative z-10">{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* 5 Distinct Minimalist Luxury Visual Cards with Animate UI Tilt */}
        <motion.div layout className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                className="h-full"
              >
                <Tilt maxTilt={8} perspective={1000} className="w-full h-full">
                  <TiltContent className="group rounded-2xl bg-[#09090D] border border-white/10 hover:border-[#C6A76B]/40 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-xl h-full">
                    <div>
                      <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#09090D] via-transparent to-transparent pointer-events-none" />
                        <span className="absolute top-3.5 left-3.5 text-[10px] font-mono uppercase tracking-widest text-[#C6A76B] bg-black/70 px-3 py-1 rounded-full backdrop-blur-md border border-[#C6A76B]/20 pointer-events-none">
                          {item.tagline}
                        </span>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between">
                          <h3 className="font-serif text-2xl text-white font-light group-hover:text-[#F5F0E8] transition-colors">
                            {item.title}
                          </h3>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                type="button"
                                className="p-1.5 rounded-full text-white/40 hover:text-[#C6A76B] hover:bg-white/5 transition-colors cursor-pointer"
                                aria-label="Amenity Details"
                              >
                                <Info className="w-4 h-4" />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent className="bg-[#0e0e14] border-[#C6A76B]/40 text-white text-xs max-w-xs p-3">
                              <p className="text-[11px] leading-relaxed text-white/90">
                                {item.tooltipText}
                              </p>
                            </TooltipContent>
                          </Tooltip>
                        </div>
                        <p className="mt-2 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                          {item.sentence}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                      <span className="text-[#C6A76B]/80">{item.highlight}</span>
                      <RippleButton
                        onClick={onOpenBooking}
                        className="text-[#C6A76B] hover:text-[#d8be85] transition-colors flex items-center gap-1.5 px-3 py-1 rounded-full hover:bg-white/5 cursor-pointer text-xs font-mono"
                      >
                        <RippleButtonRipples color="rgba(198, 167, 107, 0.3)" />
                        <span className="relative z-10 flex items-center gap-1">
                          <span>Inquire</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </RippleButton>
                    </div>
                  </TiltContent>
                </Tilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Private Privilege Callout with Animate UI Ripple Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-14 p-6 sm:p-8 rounded-2xl bg-[#09090E] border border-[#C6A76B]/30 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#C6A76B] block mb-1">
              Private Curated Tours
            </span>
            <h4 className="font-serif text-xl sm:text-2xl text-white font-light">
              Experience the Amenity Levels in Person.
            </h4>
          </div>

          <RippleButton
            onClick={onOpenBooking}
            className="shrink-0 px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black shadow-lg shadow-[#C6A76B]/20 transition-all cursor-pointer"
          >
            <RippleButtonRipples color="rgba(255, 255, 255, 0.4)" />
            <span className="relative z-10">Schedule Private Tour</span>
          </RippleButton>
        </motion.div>
      </div>
    </section>
  );
}
