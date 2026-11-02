"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize2, ArrowUpRight, Sparkles, Eye, X, Heart } from "lucide-react";
import { Property } from "@/types/property";
import { formatNumber } from "@/lib/utils";
import { useFavorites } from "@/lib/favorites";

export function PropertyCard({
  property,
  aspectRatio = "aspect-[4/3]",
  className = "",
  showQuickView = true,
}: {
  property: Property;
  aspectRatio?: string;
  className?: string;
  showQuickView?: boolean;
}) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();
  const fav = isFavorite(property.id);

  return (
    <>
      <article
        className={`group relative rounded-2xl overflow-hidden bg-white border border-[#D8C3AC] hover:border-[#7F4F24] transition-all duration-500 shadow-md shadow-[#2D1A0B]/6 hover:shadow-2xl hover:shadow-[#2D1A0B]/14 flex flex-col ${className}`}
      >
        {/* Image Container with Zoom effect */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-black/10`}>
          <Image
            src={property.coverImage}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 opacity-70 group-hover:opacity-50 transition-opacity" />

          {/* Badges on Top */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-[#7F4F24] text-white shadow-md">
              {property.category}
            </span>

            <div className="flex items-center gap-1.5">
              {property.signature && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold bg-[#C89D5C] text-[#18110B]">
                  <Sparkles className="w-3 h-3" />
                  <span>Signature</span>
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest bg-black/70 backdrop-blur-md text-white border border-white/20 font-medium">
                {property.status}
              </span>
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleFavorite(property.id);
                }}
                className={`p-1.5 rounded-full backdrop-blur-md transition-all cursor-pointer ${
                  fav
                    ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                    : "bg-black/60 text-white hover:text-white border border-white/20 hover:scale-110"
                }`}
                aria-label={fav ? "Remove from saved" : "Save property"}
              >
                <Heart className={`w-3.5 h-3.5 ${fav ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>

          {/* Quick View Button (Desktop hover) */}
          {showQuickView && (
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none group-hover:pointer-events-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setQuickViewOpen(true);
                }}
                className="px-4 py-2 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#18110B]/90 backdrop-blur-md text-[#FAF7F2] border border-[#C89D5C]/50 hover:bg-[#7F4F24] hover:text-white transition-all flex items-center gap-1.5 shadow-xl cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[#C89D5C]" />
                <span>Quick View</span>
              </button>
            </div>
          )}

          {/* Price Tag Overlay on Bottom of Image */}
          <div className="absolute bottom-3 left-4 z-10">
            <span className="text-xl sm:text-2xl font-serif text-white font-normal drop-shadow-md tracking-tight">
              {property.priceFormatted}
            </span>
            {property.pricePerSqFt && (
              <span className="block text-[11px] text-[#F3E5C8] font-sans font-medium">
                {property.pricePerSqFt}
              </span>
            )}
          </div>
        </div>

        {/* Content Details with High-Contrast Typography */}
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div>
            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-[#7F4F24] mb-2 font-semibold">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>
                {property.location.city}, {property.location.country}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl sm:text-2xl text-[#120C08] font-medium group-hover:text-[#7F4F24] transition-colors leading-snug line-clamp-1 tracking-tight">
              <Link href={`/properties/${property.slug}`} className="focus:outline-none">
                {property.title}
              </Link>
            </h3>

            {/* Subtitle / Architectural detail */}
            <p className="text-xs sm:text-sm text-[#2D2018] mt-2 line-clamp-2 leading-relaxed font-normal">
              {property.subtitle}
            </p>
          </div>

          {/* Specs Bar & CTA */}
          <div className="mt-5 pt-4 border-t border-[#8C5A30]/20 flex items-center justify-between text-xs text-[#120C08] font-semibold">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Bed className="w-3.5 h-3.5 text-[#7F4F24]" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Bath className="w-3.5 h-3.5 text-[#7F4F24]" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Maximize2 className="w-3.5 h-3.5 text-[#7F4F24]" />
                <span>{formatNumber(property.areaSqFt)} sq ft</span>
              </div>
            </div>

            <Link
              href={`/properties/${property.slug}`}
              className="w-9 h-9 rounded-full border border-[#8C5A30]/35 bg-[#FAF7F2] flex items-center justify-center text-[#7F4F24] group-hover:text-white group-hover:bg-[#7F4F24] group-hover:border-[#7F4F24] transition-all duration-300 shadow-xs"
              aria-label={`View details for ${property.title}`}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in"
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl bg-[#18110B] border border-[#C89D5C]/35 p-6 text-[#FAF7F2] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF7F2] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative aspect-video w-full rounded-xl overflow-hidden mb-4">
              <Image
                src={property.coverImage}
                alt={property.title}
                fill
                className="object-cover"
              />
            </div>

            <span className="text-xs uppercase font-mono text-[#DFBD85]">
              {property.location.neighborhood}, {property.location.city}
            </span>
            <h3 className="font-serif text-2xl text-white font-medium mt-1">
              {property.title}
            </h3>
            <p className="font-serif text-xl text-[#DFBD85] mt-1 font-semibold">
              {property.priceFormatted}
            </p>
            <p className="text-xs text-[#EADECF] mt-3 line-clamp-3 leading-relaxed">
              {property.description}
            </p>

            <div className="mt-6 flex items-center justify-between gap-4">
              <Link
                href={`/properties/${property.slug}`}
                className="w-full text-center py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C89D5C] hover:bg-[#DFBD85] text-[#18110B] transition-colors shadow-lg"
              >
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
