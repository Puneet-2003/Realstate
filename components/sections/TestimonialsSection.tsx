"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialsSection() {
  const testimonials = [
    {
      id: "t1",
      name: "Lord Julian Sterling",
      designation: "Managing Trustee, Sterling Global Family Office",
      property: "Acquisition: Bel Air Cantilevered Villa ($54,000,000)",
      feedback:
        "Aurelia & Co. handled our estate acquisition with extraordinary discretion. Their micro-market intelligence allowed us to secure an off-market architectural masterpiece without public bidding friction.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "t2",
      name: "Claire Montclaire",
      designation: "Founder & Chief Executive, Montclaire Capital",
      property: "Acquisition: Central Park South Triplex Penthouse ($48,500,000)",
      feedback:
        "Their quantitative valuation models and fiduciary focus are unmatched. Alessandro and his advisory team structured the cross-border acquisition seamlessly within fourteen business days.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
    },
    {
      id: "t3",
      name: "Henrik Lindqvist",
      designation: "Private Wealth Investor, Geneva",
      property: "Commercial Portfolio: Prime Retail Assets ($68,000,000)",
      feedback:
        "The level of diligence and transparency provided during our multi-property closing set a new benchmark. They are not merely brokers; they are strategic asset stewards.",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  const prev = () => setActiveIdx((curr) => (curr === 0 ? testimonials.length - 1 : curr - 1));
  const next = () => setActiveIdx((curr) => (curr === testimonials.length - 1 ? 0 : curr + 1));

  const current = testimonials[activeIdx];

  return (
    <section id="testimonials" className="py-20 sm:py-28 bg-[#18110B] relative overflow-hidden border-b border-[#C89D5C]/20 text-[#FAF7F2]">
      {/* Warm Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#7F4F24]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#DFBD85] font-semibold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C89D5C]" />
            <span>Section 09 • Client Testimonials</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl text-white font-light tracking-tight">
            Endorsed by Discerning <br />
            <span className="italic font-normal text-[#DFBD85]">
              Global Collectors.
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#EADECF] mt-3 font-light">
            Reflecting on transactions executed with uncompromising privacy, discretion, and fiduciary care.
          </p>
        </div>

        {/* Testimonial Card (Image 2 style) */}
        <div className="relative rounded-3xl bg-[#231811]/90 border border-[#C89D5C]/35 p-8 sm:p-14 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Subtle Quote Background Icon */}
          <div className="absolute top-6 right-8 text-[#C89D5C]/15 pointer-events-none">
            <Quote className="w-24 h-24 sm:w-32 sm:h-32" />
          </div>

          <div className="max-w-3xl relative z-10">
            {/* Stars & Verified Pill */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center gap-1 text-[#C89D5C]">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider text-[#DFBD85] bg-[#7F4F24]/30 border border-[#C89D5C]/30">
                <ShieldCheck className="w-3 h-3 text-[#C89D5C]" />
                <span>Verified Transaction</span>
              </span>
            </div>

            {/* Testimonial Quote */}
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="font-serif italic text-xl sm:text-2xl md:text-3xl text-[#FAF7F2] font-light leading-relaxed"
              >
                &ldquo;{current.feedback}&rdquo;
              </motion.blockquote>
            </AnimatePresence>

            {/* Author Footer */}
            <div className="mt-8 pt-6 border-t border-[#C89D5C]/20 flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#C89D5C]/50">
                  <Image
                    src={current.avatar}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-white font-normal">{current.name}</h3>
                  <span className="text-xs text-[#EADECF] block">{current.designation}</span>
                  <span className="text-[11px] text-[#DFBD85] block font-mono mt-0.5">{current.property}</span>
                </div>
              </div>

              {/* Prev / Next Nav Buttons */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={prev}
                  className="p-2.5 rounded-full bg-[#18110B] border border-[#C89D5C]/30 text-[#DFBD85] hover:text-[#18110B] hover:bg-[#C89D5C] transition-all cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="p-2.5 rounded-full bg-[#18110B] border border-[#C89D5C]/30 text-[#DFBD85] hover:text-[#18110B] hover:bg-[#C89D5C] transition-all cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
