"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Bed, Bath, Maximize2, ArrowUpRight, Sparkles, Eye, X } from "lucide-react";
import { Property } from "@/types/property";
import { formatNumber } from "@/lib/utils";

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

  return (
    <>
      <article
        className={`group relative rounded-2xl overflow-hidden bg-[#111116] border border-white/10 hover:border-[#c5a880]/40 transition-all duration-500 hover:shadow-2xl hover:shadow-black/80 flex flex-col ${className}`}
      >
        {/* Image Container with Zoom effect */}
        <div className={`relative w-full ${aspectRatio} overflow-hidden bg-zinc-900`}>
          <Image
            src={property.coverImage}
            alt={property.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-black/30 opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Badges on Top */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2 z-10">
            <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/65 backdrop-blur-md text-[#c5a880] border border-[#c5a880]/30">
              {property.category}
            </span>

            <div className="flex items-center gap-1.5">
              {property.signature && (
                <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-[#c5a880] text-black">
                  <Sparkles className="w-3 h-3" />
                  <span>Signature</span>
                </span>
              )}
              <span className="px-2.5 py-1 rounded-full text-[10px] uppercase tracking-widest bg-black/60 backdrop-blur-md text-zinc-300 border border-white/10">
                {property.status}
              </span>
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
                className="px-4 py-2 rounded-full text-xs uppercase tracking-widest font-medium bg-black/80 backdrop-blur-md text-white border border-[#c5a880]/50 hover:bg-[#c5a880] hover:text-black transition-all flex items-center gap-1.5 shadow-xl cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Quick View</span>
              </button>
            </div>
          )}

          {/* Price Tag Overlay on Bottom of Image */}
          <div className="absolute bottom-3 left-4 z-10">
            <span className="text-xl sm:text-2xl font-serif text-white font-medium drop-shadow-md">
              {property.priceFormatted}
            </span>
            {property.pricePerSqFt && (
              <span className="block text-[11px] text-zinc-300 font-sans">
                {property.pricePerSqFt}
              </span>
            )}
          </div>
        </div>

        {/* Content Details */}
        <div className="p-5 flex flex-col flex-1 justify-between">
          <div>
            {/* Location */}
            <div className="flex items-center gap-1.5 text-xs text-[#c5a880] mb-1.5">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>
                {property.location.city}, {property.location.country}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-xl sm:text-2xl text-white group-hover:text-[#c5a880] transition-colors leading-snug line-clamp-1">
              <Link href={`/properties/${property.slug}`} className="focus:outline-none">
                {property.title}
              </Link>
            </h3>

            {/* Subtitle / Architectural detail */}
            <p className="text-xs text-zinc-400 mt-1 line-clamp-2 leading-relaxed">
              {property.subtitle}
            </p>
          </div>

          {/* Specs Bar & CTA */}
          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Bed className="w-3.5 h-3.5 text-zinc-400" />
                <span>{property.bedrooms} Beds</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="w-3.5 h-3.5 text-zinc-400" />
                <span>{property.bathrooms} Baths</span>
              </div>
              <div className="flex items-center gap-1">
                <Maximize2 className="w-3.5 h-3.5 text-zinc-400" />
                <span>{formatNumber(property.areaSqFt)} sq ft</span>
              </div>
            </div>

            <Link
              href={`/properties/${property.slug}`}
              className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-[#c5a880] group-hover:border-[#c5a880] transition-all duration-300"
              aria-label={`View details for ${property.title}`}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
      </article>

      {/* Quick View Modal */}
      {quickViewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          <div
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
            onClick={() => setQuickViewOpen(false)}
          />
          <div className="relative w-full max-w-3xl rounded-2xl bg-[#0e0e14] border border-[#c5a880]/30 p-6 shadow-2xl z-10 text-left my-8">
            <button
              onClick={() => setQuickViewOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white bg-white/5"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden">
                <Image
                  src={property.coverImage}
                  alt={property.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
                  {property.category} • {property.location.city}
                </span>
                <h3 className="text-2xl font-serif text-white mt-1">{property.title}</h3>
                <p className="text-xl font-serif text-[#c5a880] mt-1">{property.priceFormatted}</p>
                <p className="text-xs text-zinc-300 mt-3 leading-relaxed">
                  {property.description}
                </p>

                <div className="mt-4 py-3 border-y border-white/10 grid grid-cols-3 gap-2 text-center text-xs">
                  <div>
                    <span className="block text-zinc-400">Bedrooms</span>
                    <span className="font-semibold text-white">{property.bedrooms} Suites</span>
                  </div>
                  <div>
                    <span className="block text-zinc-400">Bathrooms</span>
                    <span className="font-semibold text-white">{property.bathrooms} Baths</span>
                  </div>
                  <div>
                    <span className="block text-zinc-400">Total Area</span>
                    <span className="font-semibold text-white">{formatNumber(property.areaSqFt)} sq ft</span>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Link
                    href={`/properties/${property.slug}`}
                    className="flex-1 py-2.5 rounded-full text-center text-xs uppercase tracking-widest font-semibold bg-[#c5a880] text-black hover:bg-[#dfc293] transition-colors"
                  >
                    View Full Residence
                  </Link>
                  <a
                    href={`https://wa.me/442079460912?text=Inquiring%20about%20${encodeURIComponent(
                      property.title
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2.5 rounded-full text-xs uppercase tracking-wider text-zinc-300 border border-white/15 hover:border-[#c5a880]"
                  >
                    WhatsApp Desk
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
