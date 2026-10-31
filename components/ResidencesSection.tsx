"use client";

import React, { useState } from "react";
import { Bed, Bath, Maximize2, Compass, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { SlidingNumber } from "@animate-ui/react/primitives/texts/sliding-number";
import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import {
  RippleButton,
  RippleButtonRipples,
} from "@animate-ui/react/primitives/buttons/ripple";

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
    headline: "The Crowning Pinnacle of Metropolitan Living",
    description:
      "Full-floor triplex sanctuary with private heated rooftop pool, 360-degree horizon panoramas, and dual private elevator portals.",
    image: "/sequence/frame-100.jpg",
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
    ceilingHeight: "22 FT Double-Height",
    price: "$28,000,000",
    headline: "Soaring Double-Height Volumes in Architectural Bronze",
    description:
      "Two-story sky villa framed in monumental 22-foot acoustic glass, cantilevered floating stair, and deep sunset loggia.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop",
    features: [
      "22ft Finished Great Room Volume",
      "Bronze & Glass Floating Staircase",
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
      "Dual-exposure corner residence with open-plan living, Molteni&C millwork, and bookmatched Statuario marble sanctuaries.",
    image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1600&auto=format&fit=crop",
    features: [
      "Dual-Exposure Corner Vistas",
      "Bookmatched Marble Powder Suite",
      "Dornbracht Brushed Champagne Fixtures",
      "Generous Walk-in Dressing Suites",
      "Motorized Blackout & Solar Shades",
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
  const [selectedTab, setSelectedTab] = useState<string>(RESIDENCES[0].id);

  return (
    <section id="residences" className="py-24 sm:py-32 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
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
                <Compass className="w-3.5 h-3.5" />
                <span>Residential Collections</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
                Sanctuaries of <br />
                <span className="italic font-normal bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
                  Elevated Distinction.
                </span>
              </h2>
            </div>

            {/* Animate UI Animated Tabs List */}
            <TabsList className="bg-white/[0.04] border border-white/10 p-1.5 rounded-full h-auto gap-1">
              {RESIDENCES.map((res) => (
                <TabsTrigger
                  key={res.id}
                  value={res.id}
                  className="px-4 sm:px-5 py-2 rounded-full text-xs uppercase tracking-widest font-mono text-white/60 hover:text-white data-[state=active]:bg-[#C6A76B] data-[state=active]:text-black data-[state=active]:font-semibold transition-all shadow-md"
                >
                  {res.name.replace("The ", "")}
                </TabsTrigger>
              ))}
            </TabsList>
          </motion.div>

          {/* Tab Contents for Each Residence */}
          {RESIDENCES.map((res) => (
            <TabsContent key={res.id} value={res.id} className="mt-12 focus:outline-none">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Visual & Room Dimensions with Animate UI Tilt */}
                <div className="lg:col-span-7 flex flex-col space-y-5">
                  <Tilt maxTilt={8} perspective={1000} className="w-full">
                    <TiltContent className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black group">
                      <img
                        src={res.image}
                        alt={res.name}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between pointer-events-none">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A76B] bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                            {res.level}
                          </span>
                          <h3 className="text-2xl sm:text-3xl font-serif text-white mt-2">
                            {res.name}
                          </h3>
                        </div>
                        <div className="text-right">
                          <span className="text-[10px] font-mono text-white/50 uppercase tracking-widest block">
                            Price
                          </span>
                          <span className="text-xl sm:text-2xl font-serif text-[#C6A76B] font-light">
                            {res.price}
                          </span>
                        </div>
                      </div>
                    </TiltContent>
                  </Tilt>

                  {/* Room Dimensions Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-[#0B0B0F] border border-white/10">
                    {res.rooms.map((room) => (
                      <div key={room.name} className="p-2">
                        <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block truncate">
                          {room.name}
                        </span>
                        <span className="text-xs sm:text-sm font-semibold text-white mt-1 block">
                          {room.dims}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Specifications Card with Animate UI SlidingNumber */}
                <div className="lg:col-span-5 bg-[#0A0A0E] border border-white/10 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl">
                  <div>
                    {/* Metrics Header with Animated Counters */}
                    <div className="flex items-center justify-between pb-5 border-b border-white/10">
                      <div className="flex items-center gap-3 text-xs font-mono text-white/80">
                        <span className="flex items-center gap-1.5">
                          <Maximize2 className="w-3.5 h-3.5 text-[#C6A76B]" />
                          <span className="text-white font-medium">
                            <SlidingNumber number={res.areaSqFt} thousandSeparator="," />
                          </span>{" "}
                          sq ft
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Bed className="w-3.5 h-3.5 text-[#C6A76B]" />
                          <span className="text-white font-medium">
                            <SlidingNumber number={res.bedrooms} />
                          </span>{" "}
                          Beds
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1.5">
                          <Bath className="w-3.5 h-3.5 text-[#C6A76B]" />
                          <span className="text-white font-medium">
                            <SlidingNumber number={Math.floor(res.bathrooms)} />
                            {res.bathrooms % 1 !== 0 ? ".5" : ""}
                          </span>{" "}
                          Baths
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#C6A76B]">{res.ceilingHeight}</span>
                    </div>

                    <h4 className="font-serif text-xl sm:text-2xl text-white font-light mt-5">
                      {res.headline}
                    </h4>

                    <p className="mt-2.5 text-xs sm:text-sm text-white/70 font-light leading-relaxed">
                      {res.description}
                    </p>

                    {/* Features List */}
                    <div className="mt-5 space-y-2 border-t border-white/10 pt-5">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A76B] block mb-2">
                        Residence Appointments
                      </span>
                      {res.features.map((feat) => (
                        <div key={feat} className="flex items-center gap-2.5 text-xs text-white/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76B]" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Animate UI Ripple Button */}
                  <div className="mt-8 pt-5 border-t border-white/10 flex items-center gap-3">
                    <RippleButton
                      onClick={onOpenBooking}
                      className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C6A76B]/20"
                    >
                      <RippleButtonRipples color="rgba(255, 255, 255, 0.4)" />
                      <span className="relative z-10 flex items-center gap-2">
                        <span>Book Private Viewing</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </RippleButton>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
