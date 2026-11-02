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
    <section id="properties" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-b border-[#8C5A30]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-[#8C5A30]/25"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
              <span>Section 04 • Curated Residences</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
              Featured <span className="italic font-normal text-[#7F4F24]">Properties.</span>
            </h2>
          </div>

          <p className="text-[#2D2018] text-sm max-w-sm font-normal leading-relaxed">
            Curated architectural masterworks with unrepeatable views and exceptional provenance.
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
                  className={`relative px-4 py-2 rounded-full text-xs uppercase tracking-wider transition-all cursor-pointer font-medium ${
                    isActive
                      ? "text-[#FAF7F2] font-semibold"
                      : "text-[#2D2018] hover:text-[#120C08] bg-white border border-[#D8C3AC] shadow-xs"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activePropTab"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      className="absolute inset-0 bg-[#7F4F24] rounded-full shadow-md shadow-[#7F4F24]/30"
                    />
                  )}
                  <span className="relative z-10">{cat === "All" ? "All Featured" : cat}</span>
                </button>
              );
            })}
          </div>

          <Link
            href="/properties"
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#7F4F24] hover:text-[#120C08] group transition-colors font-bold"
          >
            <span>View All Properties ({PROPERTIES.length})</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Property Grid with High-Contrast Typography & Sharp Borders */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProperties.map((property) => {
              const fav = isFavorite(property.id);
              return (
                <motion.article
                  key={property.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group relative flex flex-col rounded-2xl bg-white border border-[#D8C3AC] hover:border-[#7F4F24] transition-all duration-300 overflow-hidden shadow-md shadow-[#2D1A0B]/6 hover:shadow-2xl hover:shadow-[#2D1A0B]/14"
                >
                  {/* Image Container with Badges & Save Icon */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10">
                    <Image
                      src={property.coverImage}
                      alt={property.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30" />

                    {/* Top Badges */}
                    <div className="absolute top-3.5 left-3.5 flex items-center gap-2 z-10">
                      {property.featured && (
                        <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-[#7F4F24] text-white font-bold shadow-md">
                          Verified Asset
                        </span>
                      )}
                      <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-black/70 text-white border border-white/25 backdrop-blur-md font-medium">
                        {property.category}
                      </span>
                    </div>

                    {/* Favorite Heart Button */}
                    <button
                      type="button"
                      onClick={() => toggleFavorite(property.id)}
                      className={`absolute top-3.5 right-3.5 z-10 p-2 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                        fav
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                          : "bg-black/60 text-white hover:text-white border border-white/20 hover:scale-110"
                      }`}
                      aria-label={fav ? "Remove from saved" : "Save property"}
                    >
                      <Heart className={`w-4 h-4 ${fav ? "fill-current" : ""}`} />
                    </button>

                    {/* Price Tag Overlay */}
                    <div className="absolute bottom-3 left-4 z-10">
                      <span className="text-xl sm:text-2xl font-serif text-white font-normal drop-shadow-md tracking-tight">
                        {property.priceFormatted}
                      </span>
                      <span className="text-[11px] text-[#F3E5C8] block font-mono font-medium drop-shadow-sm">
                        {property.pricePerSqFt}
                      </span>
                    </div>
                  </div>

                  {/* Card Body with Clear Readable Typography */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-xs text-[#7F4F24] mb-2 font-semibold">
                        <MapPin className="w-3.5 h-3.5 text-[#7F4F24] shrink-0" />
                        <span>{property.location.neighborhood}, {property.location.city}</span>
                      </div>

                      {/* Title: Dark, solid, prestigious font */}
                      <h3 className="font-serif text-xl sm:text-2xl text-[#120C08] font-medium tracking-tight group-hover:text-[#7F4F24] transition-colors leading-snug">
                        {property.title}
                      </h3>

                      {/* Subtitle: High-contrast body text */}
                      <p className="text-xs sm:text-sm text-[#2D2018] font-normal mt-2 line-clamp-2 leading-relaxed">
                        {property.subtitle}
                      </p>
                    </div>

                    {/* Specs Row */}
                    <div className="mt-5 pt-4 border-t border-[#8C5A30]/20 grid grid-cols-3 gap-2 text-center text-xs text-[#120C08] font-semibold">
                      <div className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#FAF7F2] border border-[#D8C3AC]">
                        <Bed className="w-3.5 h-3.5 text-[#7F4F24]" />
                        <span>{property.bedrooms} Beds</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#FAF7F2] border border-[#D8C3AC]">
                        <Bath className="w-3.5 h-3.5 text-[#7F4F24]" />
                        <span>{property.bathrooms} Baths</span>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-[#FAF7F2] border border-[#D8C3AC]">
                        <Square className="w-3.5 h-3.5 text-[#7F4F24]" />
                        <span>{property.areaSqFt.toLocaleString()} sqft</span>
                      </div>
                    </div>

                    {/* View Details Button with High Contrast & Hover */}
                    <div className="mt-5">
                      <Link
                        href={`/properties/${property.slug}`}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs uppercase tracking-widest font-bold bg-[#FAF7F2] hover:bg-[#7F4F24] text-[#120C08] hover:text-[#FAF7F2] border border-[#C89D5C]/40 hover:border-[#7F4F24] transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Residence</span>
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
