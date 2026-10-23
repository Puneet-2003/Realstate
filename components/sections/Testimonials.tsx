"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BRAND_TESTIMONIALS } from "@/lib/properties";
import { ChevronLeft, ChevronRight, Quote, Sparkles, Star } from "lucide-react";

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? BRAND_TESTIMONIALS.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === BRAND_TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const current = BRAND_TESTIMONIALS[currentIndex];

  return (
    <section className="py-24 sm:py-32 bg-[#070709] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Client Voices</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
            Endorsed by Discerning <span className="italic font-normal text-gold-gradient">Collectors.</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 mt-3 font-light">
            Reflecting on acquisitions facilitated with utmost discretion and architectural stewardship.
          </p>
        </div>

        {/* Testimonial Feature Card */}
        <div className="relative rounded-3xl bg-[#0e0e14] border border-[#c5a880]/20 p-8 sm:p-14 shadow-2xl">
          <div className="absolute top-8 right-8 text-[#c5a880]/20 pointer-events-none">
            <Quote className="w-16 h-16 sm:w-24 sm:h-24" />
          </div>

          <div className="max-w-3xl">
            {/* Stars */}
            <div className="flex items-center gap-1 mb-6 text-[#c5a880]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            {/* Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-zinc-100 font-light leading-relaxed">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Author Info */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#c5a880]/40">
                  <Image
                    src={current.avatar}
                    alt={current.clientName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-serif text-lg text-white font-normal">{current.clientName}</h4>
                  <span className="text-xs text-zinc-400 block">{current.title}</span>
                  <span className="text-[11px] text-[#c5a880] block font-mono">{current.residence}</span>
                </div>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Previous endorsement"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-[#c5a880] hover:text-[#c5a880] flex items-center justify-center text-zinc-300 transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <div className="text-xs text-zinc-500 font-mono px-2">
                  0{currentIndex + 1} / 0{BRAND_TESTIMONIALS.length}
                </div>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Next endorsement"
                  className="w-10 h-10 rounded-full border border-white/15 hover:border-[#c5a880] hover:text-[#c5a880] flex items-center justify-center text-zinc-300 transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
