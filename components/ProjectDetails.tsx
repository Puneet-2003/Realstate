"use client";

import React from "react";
import { Building2, Compass, MapPin, Award, CheckCircle2, Shield } from "lucide-react";
import { motion } from "framer-motion";

export function ProjectDetails() {
  const specs = [
    { label: "Total Height", value: "280 m / 918 ft", sub: "68 Architectural Stories" },
    { label: "Private Residences", value: "142 Units", sub: "1 to 5 Bedrooms + Penthouses" },
    { label: "Dedicated Amenities", value: "45,000 sq ft", sub: "Across 4 Private Levels" },
    { label: "Structural Engineering", value: "Thornton Tomasetti", sub: "Seismic & Wind Tuned" },
    { label: "Master Architecture", value: "Vance & Partners", sub: "International Design Award" },
    { label: "Interior Direction", value: "Studio Liaigre Paris", sub: "Custom Italian & French Millwork" },
    { label: "Sustainability", value: "LEED Platinum", sub: "WELL Building Standard Gold" },
    { label: "Delivery Horizon", value: "Q4 2026", sub: "Under Active Construction" },
  ];

  const landmarks = [
    { name: "Private Executive Helipad", time: "4 mins", category: "Aviation" },
    { name: "Michelin 3-Star Gastronomy Enclave", time: "6 mins", category: "Dining" },
    { name: "Metropolitan Opera & Symphony Hall", time: "8 mins", category: "Culture" },
    { name: "Superyacht Marina & Private Club", time: "10 mins", category: "Maritime" },
    { name: "Haute Horlogerie & Fashion Promenade", time: "5 mins", category: "Retail" },
    { name: "International Airport Direct Transfer", time: "22 mins", category: "Transit" },
  ];

  return (
    <section id="location" className="py-28 sm:py-36 bg-[#070709] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C6A76B] mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Project Architecture &amp; Address</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
              Location &amp; <br />
              <span className="italic font-normal text-gradient bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
                Project Telemetry.
              </span>
            </h2>
          </div>

          <p className="text-white/60 text-xs sm:text-sm max-w-md font-light leading-relaxed">
            Positioned at the epicentre of commerce, culture, and coastal prestige, The Lumière
            provides immediate accessibility alongside complete sanctuary.
          </p>
        </motion.div>

        {/* Specifications Matrix */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {specs.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.05 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-5 sm:p-6 rounded-2xl bg-[#0B0B0F] border border-white/5 hover:border-[#C6A76B]/30 transition-colors flex flex-col justify-between"
            >
              <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                {item.label}
              </span>
              <div className="mt-3">
                <span className="text-lg sm:text-xl font-serif text-white block">
                  {item.value}
                </span>
                <span className="text-[11px] font-mono text-[#C6A76B] block mt-0.5">
                  {item.sub}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Location & Neighborhood Exploration */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Map & Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl group bg-black"
          >
            <div className="relative aspect-[16/10] w-full">
              <img
                src="https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?q=80&w=1600&auto=format&fit=crop"
                alt="The Lumière Location Skyline"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C6A76B] bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                  METROPOLITAN PROMENADE
                </span>
                <h3 className="text-2xl font-serif text-white mt-2">
                  One Lumière Way, Waterfront Crest
                </h3>
                <p className="text-xs text-white/60 font-light mt-0.5">
                  Surrounded by protected parklands and private deepwater anchorages.
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-[#C6A76B] bg-black/70 px-3 py-1.5 rounded-full border border-[#C6A76B]/30 shrink-0">
                <MapPin className="w-3.5 h-3.5" />
                <span>Prime District 01</span>
              </div>
            </div>
          </motion.div>

          {/* Key Landmarks Schedule */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 bg-[#0A0A0E] border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C6A76B]">
                Immediate Proximity
              </span>
              <span className="text-[10px] font-mono text-white/40">Transit Times</span>
            </div>

            <div className="mt-4 space-y-3">
              {landmarks.map((landmark, idx) => (
                <motion.div
                  key={landmark.name}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: idx * 0.05 }}
                  className="p-3.5 rounded-xl bg-black/40 border border-white/5 flex items-center justify-between hover:border-[#C6A76B]/30 transition-all"
                >
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                      {landmark.category}
                    </span>
                    <h5 className="text-xs sm:text-sm font-medium text-white mt-0.5">
                      {landmark.name}
                    </h5>
                  </div>
                  <span className="text-xs font-mono text-[#C6A76B] font-semibold bg-[#C6A76B]/10 px-2.5 py-1 rounded-md">
                    {landmark.time}
                  </span>
                </motion.div>
              ))}
            </div>

            <div className="mt-6 pt-5 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
              <span className="flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5 text-[#C6A76B]" />
                24/7 Gated Security &amp; Biometrics
              </span>
              <span className="text-[#C6A76B] font-mono">Confidential Visits</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
