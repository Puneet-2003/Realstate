"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Bed,
  Bath,
  Square,
  Heart,
  ArrowRight,
  Sparkles,
  MapPin,
  Eye,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { PROPERTIES } from "@/lib/properties";
import { useFavorites } from "@/lib/favorites";

export function FeaturedPropertiesSection() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const { toggleFavorite, isFavorite } = useFavorites();

  const categories = [
    "All",
    "Luxury Villa",
    "Modern Penthouse",
    "Waterfront Estate",
    "Architectural Icon",
  ];

  const filteredProperties = PROPERTIES.filter((p) => {
    if (activeFilter === "All") return p.featured;
    return p.category === activeFilter;
  });

  return (
    <section id="properties" className="py-24 sm:py-32 bg-[#F4F3EA] relative overflow-hidden border-b border-[#D7D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#D7D4BD]"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
              <span>Curated Portfolio • Trophy Residences</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2712] font-light tracking-tight">
              Featured <span className="italic text-[#9D9970]">Residences.</span>
            </h2>
          </div>

          <p className="text-[#6F6C55] text-sm max-w-sm font-light leading-relaxed">
            Architectural masterworks distinguished by unrepeatable topographies, bespoke craft, and peerless provenance.
          </p>
        </motion.div>

        {/* Filter Pills & View All CTA */}
        <div className="mt-8 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center flex-wrap gap-2">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-4 py-2 rounded-full text-xs font-mono tracking-wider uppercase transition-all cursor-pointer ${
                    isActive
                      ? "text-[#F4F3EA] bg-[#1E1700] shadow-md shadow-black/20"
                      : "text-[#6F6C55] hover:text-[#2B2712] bg-[#E7E5D4] hover:bg-[#D7D4BD]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <Link
            href="/properties"
            className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#2B2712] hover:text-[#9D9970] transition-colors py-2"
          >
            <span>Explore All 24 Trophy Estates</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Properties Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property, idx) => {
              const favorite = isFavorite(property.id);

              return (
                <motion.div
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, delay: idx * 0.05 }}
                  className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#E7E5D4]/50 border border-[#D7D4BD] hover:border-[#9D9970]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#1E1700]/5"
                >
                  {/* Card Image Container */}
                  <div className="relative aspect-[16/11] w-full overflow-hidden bg-[#1E1700]">
                    <Image
                      src={property.coverImage}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1E1700]/80 via-[#1E1700]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                    {/* Top Status & Category Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                      <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#1E1700]/75 text-[#9D9970] border border-[#9D9970]/30 backdrop-blur-md font-semibold">
                        {property.category}
                      </span>

                      {/* Favorite Button */}
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(property.id);
                        }}
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-all cursor-pointer backdrop-blur-md ${
                          favorite
                            ? "bg-rose-500/90 text-white shadow-lg shadow-rose-500/30"
                            : "bg-[#1E1700]/60 text-white/80 hover:text-white hover:bg-[#1E1700]/90 border border-white/20"
                        }`}
                        aria-label="Add to private favorites"
                      >
                        <Heart className={`w-4 h-4 ${favorite ? "fill-current" : ""}`} />
                      </button>
                    </div>

                    {/* Location Badge */}
                    <div className="absolute bottom-4 left-4 z-10 flex items-center gap-1.5 text-xs text-[#F4F3EA] drop-shadow-md font-light">
                      <MapPin className="w-3.5 h-3.5 text-[#9D9970]" />
                      <span>{property.location.neighborhood}, {property.location.city}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Price Header */}
                      <div className="flex items-baseline justify-between mb-2">
                        <span className="font-serif text-2xl sm:text-3xl text-[#2B2712] font-normal tracking-tight">
                          {property.priceFormatted}
                        </span>
                        <span className="text-[11px] font-mono text-[#6F6C55]">
                          {property.pricePerSqFt}
                        </span>
                      </div>

                      {/* Title & Philosophy */}
                      <h3 className="font-serif text-xl sm:text-2xl text-[#2B2712] font-light tracking-wide group-hover:text-[#9D9970] transition-colors">
                        {property.title}
                      </h3>
                      <p className="text-xs text-[#6F6C55] font-light line-clamp-2 mt-2 leading-relaxed">
                        {property.subtitle}
                      </p>
                    </div>

                    {/* Architectural Specifications Grid */}
                    <div className="mt-6 pt-5 border-t border-[#D7D4BD] grid grid-cols-3 gap-2 text-center text-xs text-[#6F6C55]">
                      <div className="flex items-center justify-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#9D9970]" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 border-x border-[#D7D4BD]">
                        <Bath className="w-3.5 h-3.5 text-[#9D9970]" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5">
                        <Square className="w-3.5 h-3.5 text-[#9D9970]" />
                        <span>{property.areaSqFt.toLocaleString()} sq ft</span>
                      </div>
                    </div>

                    {/* Link Action */}
                    <div className="mt-5">
                      <Link
                        href={`/properties/${property.slug}`}
                        className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs font-mono uppercase tracking-[0.2em] font-medium bg-[#F4F3EA] hover:bg-[#1E1700] text-[#2B2712] hover:text-[#F4F3EA] border border-[#D7D4BD] hover:border-[#1E1700] transition-all cursor-pointer"
                      >
                        <span>View Architectural Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}