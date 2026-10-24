"use client";

import React, { useState } from "react";
import { Bed, Bath, Maximize2, Compass, ArrowRight, Download, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ResidenceTier {
  id: string;
  name: string;
  level: string;
  areaSqFt: number;
  bedrooms: number;
  bathrooms: number;
  ceilingHeight: string;
  price: string;
  headline: string;
  description: string;
  image: string;
  features: string[];
  rooms: { name: string; dims: string }[];
}

const RESIDENCES: ResidenceTier[] = [
  {
    id: "sky-penthouse",
    name: "The Sky Penthouse",
    level: "Levels 64 – 68 (Full Floor Triplex)",
    areaSqFt: 12400,
    bedrooms: 5,
    bathrooms: 7,
    ceilingHeight: "15.5 FT",
    price: "$48,500,000",
    headline: "The Crowning Pinnacle of Modern Metropolitan Living",
    description:
      "Spanning three complete upper levels with direct private dual high-speed elevators. Features a private rooftop heated saltwater swimming pool, 360-degree unobstructed horizon panoramas, dedicated wine sommelier vault, and primary suite wing.",
    image: "/sequence/frame-240.jpg",
    features: [
      "Private Rooftop Heated Infinity Pool",
      "Direct High-Speed Keycard Elevator",
      "Curated Boffi Kitchen & Sub-Zero Suite",
      "Wraparound Sunset Sky Terrace (2,200 sq ft)",
      "Dedicated Butler Pantry & Staff Quarters",
      "Primary Sanctuary with Dual Marble Baths",
    ],
    rooms: [
      { name: "Grand Entertaining Salon", dims: "38' x 24'" },
      { name: "Formal Dining Gallery", dims: "22' x 16'" },
      { name: "Primary Master Suite", dims: "26' x 20'" },
      { name: "Private Sky Terrace", dims: "65' x 34'" },
    ],
  },
  {
    id: "horizon-duplex",
    name: "The Horizon Duplex",
    level: "Levels 46 – 52 (Two-Story Residence)",
    areaSqFt: 7800,
    bedrooms: 4,
    bathrooms: 5.5,
    ceilingHeight: "22 FT Double-Height Volume",
    price: "$28,000,000",
    headline: "Soaring Double-Height Volumes Framed in Architectural Bronze",
    description:
      "A dramatic two-story vertical villa in the clouds. The monumental 22-foot double-height salon captures afternoon sunlight through motorized acoustic glass panels leading out to a deeply recessed cantilever terrace.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    features: [
      "22ft Finished Double-Height Great Room",
      "Cantilevered Bronze & Glass Floating Staircase",
      "Custom Poliform Italian Wardrobes",
      "Deeply Recessed Sunset Loggia",
      "Integrated Crestron Home Automation",
      "Private Library & Executive Study",
    ],
    rooms: [
      { name: "Double-Height Great Salon", dims: "32' x 22'" },
      { name: "Family Media Lounge", dims: "19' x 15'" },
      { name: "Primary Bedroom Suite", dims: "22' x 18'" },
      { name: "Sunset Loggia", dims: "28' x 14'" },
    ],
  },
  {
    id: "tower-panorama",
    name: "The Tower Panorama",
    level: "Levels 28 – 44 (Corner Residence)",
    areaSqFt: 4600,
    bedrooms: 3,
    bathrooms: 3.5,
    ceilingHeight: "12.5 FT",
    price: "$16,500,000",
    headline: "Uncompromised Flow, Pure Proportions & Light",
    description:
      "Occupying corner aspects of the tower, providing dual-exposure city and waterfront perspectives. Designed with seamless open-plan living, Molteni&C millwork, and Statuario marble en-suite sanctuaries.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1600&auto=format&fit=crop",
    features: [
      "Dual-Exposure Corner Vistas",
      "Bookmatched Marble Powder Suite",
      "Custom Dornbracht Brushed Champagne Fixtures",
      "Generous Walk-in Dressing Suites",
      "Motorized Solar & Blackout Shades",
      "Private Underground Reserved Parking (2 bays)",
    ],
    rooms: [
      { name: "Open Living & Dining Room", dims: "28' x 20'" },
      { name: "Chef's Show Kitchen", dims: "16' x 14'" },
      { name: "Primary Suite", dims: "20' x 16'" },
      { name: "Corner Observation Balcony", dims: "18' x 10'" },
    ],
  },
];

interface ResidencesSectionProps {
  onOpenBooking: () => void;
}

export function ResidencesSection({ onOpenBooking }: ResidencesSectionProps) {
  const [activeTier, setActiveTier] = useState<ResidenceTier>(RESIDENCES[0]);

  return (
    <section id="residences" className="py-28 sm:py-36 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C6A76B] mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Curated Residential Collections</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
              Sanctuaries of <br />
              <span className="italic font-normal text-gradient bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
                Elevated Distinction.
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 p-1 rounded-full bg-white/[0.03] border border-white/10">
            {RESIDENCES.map((res) => {
              const isActive = activeTier.id === res.id;
              return (
                <button
                  key={res.id}
                  type="button"
                  onClick={() => setActiveTier(res)}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-widest font-mono transition-colors cursor-pointer ${
                    isActive ? "text-black font-semibold" : "text-white/60 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeResidencePill"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      className="absolute inset-0 bg-[#C6A76B] rounded-full shadow-lg shadow-[#C6A76B]/20"
                    />
                  )}
                  <span className="relative z-10">{res.name.replace("The ", "")}</span>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Featured Residence Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            {/* Left Column: Visual & Quick Stats */}
            <div className="lg:col-span-7 flex flex-col space-y-6">
              <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                <img
                  src={activeTier.image}
                  alt={activeTier.name}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                  <div>
                    <span className="text-[11px] font-mono tracking-widest uppercase text-[#C6A76B] bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                      {activeTier.level}
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif text-white mt-2">
                      {activeTier.name}
                    </h3>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                      Acquisition Price
                    </span>
                    <span className="text-xl sm:text-2xl font-serif text-[#C6A76B] font-light">
                      {activeTier.price}
                    </span>
                  </div>
                </div>
              </div>

              {/* Room Dimensions Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl bg-[#0B0B0F] border border-white/10">
                {activeTier.rooms.map((room) => (
                  <div key={room.name} className="p-2">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                      {room.name}
                    </span>
                    <span className="text-sm font-semibold text-white mt-1 block">
                      {room.dims}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Specifications & Inquire */}
            <div className="lg:col-span-5 bg-[#0A0A0E] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
              <div>
                {/* Specs Header */}
                <div className="flex items-center justify-between pb-6 border-b border-white/10">
                  <div className="flex items-center gap-4 text-xs font-mono text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Maximize2 className="w-3.5 h-3.5 text-[#C6A76B]" />
                      {activeTier.areaSqFt.toLocaleString()} Sq Ft
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-[#C6A76B]" />
                      {activeTier.bedrooms} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-3.5 h-3.5 text-[#C6A76B]" />
                      {activeTier.bathrooms} Baths
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#C6A76B]">{activeTier.ceilingHeight}</span>
                </div>

                <h4 className="font-serif text-xl sm:text-2xl text-white font-light mt-6">
                  {activeTier.headline}
                </h4>

                <p className="mt-3 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                  {activeTier.description}
                </p>

                {/* Distinctive Features List */}
                <div className="mt-6 space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/40 block mb-2">
                    Key Residence Fitments
                  </span>
                  {activeTier.features.map((feat, idx) => (
                    <motion.div
                      key={feat}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05, duration: 0.3 }}
                      className="flex items-center gap-2.5 text-xs text-white/85"
                    >
                      <div className="w-4 h-4 rounded-full bg-[#C6A76B]/15 flex items-center justify-center shrink-0">
                        <Check className="w-2.5 h-2.5 text-[#C6A76B]" />
                      </div>
                      <span>{feat}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* CTA Actions */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onOpenBooking}
                  className="w-full sm:flex-1 py-3 px-6 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black transition-all shadow-xl shadow-[#C6A76B]/20 text-center cursor-pointer"
                >
                  Schedule Private Viewing
                </motion.button>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  href="#inquire"
                  className="w-full sm:w-auto py-3 px-5 rounded-full text-xs uppercase tracking-widest font-mono text-white/70 hover:text-white border border-white/10 hover:border-white/30 transition-all text-center"
                >
                  Request Floorplans
                </motion.a>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
