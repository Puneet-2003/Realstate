"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROPERTIES } from "@/lib/properties";
import { PropertyCard } from "@/components/properties/PropertyCard";

export function FeaturedProperties() {
  const [activeFilter, setActiveFilter] = useState<string>("All");

  const categories = ["All", "Luxury Villa", "Modern Penthouse", "Waterfront Estate", "Architectural Icon"];

  const filteredProperties = PROPERTIES.filter((p) => {
    if (activeFilter === "All") return p.featured;
    return p.category === activeFilter;
  });

  return (
    <section className="py-24 sm:py-32 bg-[#070709] relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/4 -left-64 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

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
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Portfolio</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
              Spaces Worth <span className="italic font-normal text-gold-gradient">Discovering.</span>
            </h2>
          </div>

          <p className="text-zinc-400 text-sm max-w-md font-light leading-relaxed">
            From cantilevered glass pavilions in Bel Air to 18th-century palazzi on Lake Como, each
            acquisition reflects irreplaceable provenance and architectural pedigree.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                    isActive ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeFeaturedCategory"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-[#c5a880] rounded-full shadow-md shadow-[#c5a880]/20"
                    />
                  )}
                  <span className="relative z-10">{cat === "All" ? "All Featured" : cat}</span>
                </button>
              );
            })}
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#c5a880] hover:text-[#dfc293] group transition-colors"
          >
            <span>View All Listings ({PROPERTIES.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <motion.div layout className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <AnimatePresence>
            {filteredProperties.map((property, index) => {
              const isHeroCard = index === 0 && activeFilter === "All";
              return (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className={isHeroCard ? "md:col-span-2 lg:col-span-2" : "col-span-1"}
                >
                  <PropertyCard
                    property={property}
                    aspectRatio={isHeroCard ? "aspect-[16/9]" : "aspect-[4/3]"}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-zinc-400">
            Seeking bespoke architectural representation or off-market acquisitions?
          </span>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all flex items-center gap-2"
          >
            <span>Request Private Inquiry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
