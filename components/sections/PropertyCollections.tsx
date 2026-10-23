"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Compass } from "lucide-react";
import { PROPERTY_CATEGORIES } from "@/lib/properties";

export function PropertyCollections() {
  return (
    <section id="collections" className="py-24 sm:py-32 bg-[#070709] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>Architectural Typologies</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
              Curated <span className="italic font-normal text-gold-gradient">Collections.</span>
            </h2>
          </div>

          <p className="text-zinc-400 text-sm max-w-md font-light leading-relaxed">
            Categorized by spatial philosophy, environmental context, and design pedigree. Explore our
            handpicked portfolios around the world.
          </p>
        </div>

        {/* Collections Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROPERTY_CATEGORIES.map((collection, index) => {
            const isWide = index === 0 || index === 3;
            return (
              <Link
                key={collection.slug}
                href={`/properties?category=${encodeURIComponent(collection.category)}`}
                className={`group relative rounded-3xl overflow-hidden bg-zinc-900 border border-white/10 hover:border-[#c5a880]/50 transition-all duration-500 flex flex-col justify-end p-6 sm:p-8 min-h-[380px] sm:min-h-[420px] ${
                  isWide ? "lg:col-span-2" : "lg:col-span-1"
                }`}
              >
                {/* Background Image */}
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent opacity-90 group-hover:opacity-75 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-6 left-6 right-6 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-black/60 backdrop-blur-md text-[#c5a880] border border-white/10">
                    Collection {index + 1}
                  </span>
                  <span className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center text-white group-hover:bg-[#c5a880] group-hover:text-black transition-all">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                    {collection.count} Available Residences
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-serif text-white mt-1 group-hover:text-[#c5a880] transition-colors">
                    {collection.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-300 font-light mt-2 max-w-lg leading-relaxed line-clamp-2">
                    {collection.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
