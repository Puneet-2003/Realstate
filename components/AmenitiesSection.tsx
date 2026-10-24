"use client";

import React, { useState } from "react";
import { Sparkles, Waves, Wine, Film, HeartPulse, ShieldCheck, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Amenity {
  id: string;
  category: "Wellness" | "Leisure" | "Service";
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  image: string;
  metrics: string[];
  hours: string;
}

const AMENITIES: Amenity[] = [
  {
    id: "pool",
    category: "Wellness",
    title: "Cantilevered Horizon Sky Pool",
    subtitle: "25-Meter Heated Saltwater Pool Suspended on Level 58",
    tagline: "Water & Horizon",
    description:
      "Hovering 220 meters above the metropolis, the 25-meter heated saltwater infinity pool features bottom observation portals and expansive teak sun decks with unobstructed sunset vistas.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1600&auto=format&fit=crop",
    metrics: ["25-Meter Length", "Geothermal Heating 84°F", "Private Cabanas"],
    hours: "Daily 06:00 — 23:00",
  },
  {
    id: "spa",
    category: "Wellness",
    title: "Roman Thermal Hydrotherapy Spa",
    subtitle: "Carved Basalt Caldarium, Herbal Steam & Cold Plunge",
    tagline: "Restorative Sanctuary",
    description:
      "Inspired by ancient Roman bath culture, the subterranean thermal circuit offers bespoke hydrotherapy jets, Finnish cedarwood sauna, Himalayan salt chamber, and ice plunge pools.",
    image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1600&auto=format&fit=crop",
    metrics: ["3 Hydrothermal Pools", "Cryotherapy Chamber", "Private Treatment Suites"],
    hours: "Daily 07:00 — 22:00",
  },
  {
    id: "sommelier",
    category: "Leisure",
    title: "The Sommelier Vault & Tasting Salon",
    subtitle: "Temperature & Humidity Calibrated Vintage Reserve",
    tagline: "Private Vintage Cellar",
    description:
      "A subterranean sanctuary lined in blackened steel and acoustic timber. Each resident enjoys private locked vintage lockers with sommelier-guided tasting sessions and private dining reservations.",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=1600&auto=format&fit=crop",
    metrics: ["3,200 Bottle Capacity", "55°F / 65% Humidity", "Private Sommelier on Call"],
    hours: "24/7 Resident Access",
  },
  {
    id: "cinema",
    category: "Leisure",
    title: "Dolby Atmos Screening Cinema",
    subtitle: "18-Seat Bespoke Velvet Screening Pavilion",
    tagline: "Private Cinema",
    description:
      "Equipped with Meyer Sound cinema acoustics, 4K laser projection, and motorized Italian leather reclining chaise lounges for private screenings, premiere events, and intimate family gatherings.",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1600&auto=format&fit=crop",
    metrics: ["Meyer Sound 32-Channel", "Laser Micro-LED Screen", "Private Bar Service"],
    hours: "Available via Concierge Reservation",
  },
  {
    id: "fitness",
    category: "Wellness",
    title: "Longevity & Biometric Fitness Lab",
    subtitle: "Technogym Artis Suite & Dedicated Pilates Reformer Studio",
    tagline: "Peak Conditioning",
    description:
      "Panoramic fitness facility framed in natural light, featuring AI-guided Technogym strength stations, custom Reformer Pilates equipment, and resident biometric wellness assessments.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1600&auto=format&fit=crop",
    metrics: ["Technogym Artis Line", "Reformer Studio", "Resident Biometric Coaching"],
    hours: "24/7 Resident Keycard Access",
  },
  {
    id: "concierge",
    category: "Service",
    title: "24/7 White-Glove Valet & Chauffeur",
    subtitle: "Private Fleet, Valet Portals & Bespoke Butler Services",
    tagline: "Discrete Hospitality",
    description:
      "Les Clefs d'Or accredited concierge team managing private aviation transfers, in-residence Michelin dining, art transport, and discrete biometric subterranean vehicular arrival.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1600&auto=format&fit=crop",
    metrics: ["Les Clefs d'Or Concierge", "House Rolls-Royce Fleet", "Biometric Subterranean Valet"],
    hours: "24/7 Uninterrupted Service",
  },
];

interface AmenitiesSectionProps {
  onOpenBooking: () => void;
}

export function AmenitiesSection({ onOpenBooking }: AmenitiesSectionProps) {
  const [filter, setFilter] = useState<"All" | "Wellness" | "Leisure" | "Service">("All");

  const filtered = filter === "All" ? AMENITIES : AMENITIES.filter((a) => a.category === filter);

  return (
    <section id="amenities" className="py-28 sm:py-36 bg-[#050505] relative">
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
              <Sparkles className="w-3.5 h-3.5" />
              <span>Lifestyle &amp; Privileges</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
              More Than a Residence. <br />
              <span className="italic font-normal text-gradient bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
                A Way of Life.
              </span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <p className="text-white/60 text-xs sm:text-sm max-w-sm font-light leading-relaxed">
              Explore thoughtfully curated spaces designed to bring comfort, convenience, and
              meaningful everyday experiences together.
            </p>

            {/* Filter Pills with animated background */}
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

        {/* Amenities Card Grid with layout animation */}
        <motion.div layout className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filtered.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: idx * 0.05 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className="group rounded-2xl bg-[#09090D] border border-white/10 hover:border-[#C6A76B]/40 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-xl"
              >
                <div>
                  {/* Visual Image */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090D] via-transparent to-transparent" />
                    <span className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-widest text-[#C6A76B] bg-black/70 px-3 py-1 rounded-full backdrop-blur-md border border-[#C6A76B]/20">
                      {item.tagline}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-serif text-xl sm:text-2xl text-white font-light group-hover:text-[#F5F0E8] transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-xs font-mono text-[#C6A76B] block mt-1">
                      {item.subtitle}
                    </span>

                    <p className="mt-3 text-xs text-white/65 font-light leading-relaxed">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.metrics.map((m) => (
                        <span
                          key={m}
                          className="text-[10px] font-mono text-white/70 bg-black/50 border border-white/5 px-2.5 py-1 rounded-md"
                        >
                          {m}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="p-6 pt-0 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-[#C6A76B]" />
                    {item.hours}
                  </span>
                  <button
                    type="button"
                    onClick={onOpenBooking}
                    className="text-[#C6A76B] hover:text-[#d8be85] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <span>Inquire</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Exclusive Private Services Banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-[#0C0C12] via-[#101016] to-[#0C0C12] border border-[#C6A76B]/30 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C6A76B] block mb-1">
              Bespoke Residential Privileges
            </span>
            <h4 className="font-serif text-2xl sm:text-3xl text-white font-light">
              Experience Bespoke Living Firsthand.
            </h4>
            <p className="text-xs sm:text-sm text-white/60 mt-1 max-w-xl font-light">
              Private tours of amenity decks, wine cellars, and sky lounges are available by
              confidential appointment only.
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            onClick={onOpenBooking}
            className="shrink-0 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black shadow-lg shadow-[#C6A76B]/20 transition-all cursor-pointer"
          >
            Reserve Amenity Tour
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
