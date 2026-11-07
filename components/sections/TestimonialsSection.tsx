"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation";

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
    <section id="testimonials" className="py-24 sm:py-32 bg-[#171200] relative overflow-hidden border-b border-[#D7D4BD]/15 text-[#F4F3EA]">
      {/* Subtle Gold Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#9D9970]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <StaggerContainer className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <StaggerItem className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
            <span>Client Endorsements • Sovereign Verification</span>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#F4F3EA] font-light tracking-tight">
              Endorsed by Discerning <br />
              <span className="italic text-[#9D9970]">
                Global Collectors.
              </span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="text-xs sm:text-sm text-[#A9A68A] mt-3 font-light leading-relaxed">
              Reflecting on acquisitions executed with uncompromising privacy, discretion, and fiduciary care.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Testimonial Showcase Card */}
        <FadeIn distance={40} duration={0.9} threshold={0.2} className="relative rounded-3xl bg-white/5 border border-[#D7D4BD]/20 p-6 sm:p-12 md:p-16 backdrop-blur-xl shadow-2xl">
          <Quote className="w-9 h-9 sm:w-12 sm:h-12 text-[#9D9970]/25 absolute top-5 right-5 sm:top-8 sm:right-8 pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col justify-between"
            >
              {/* Star Rating & Verified Pill */}
              <div className="flex flex-wrap items-center gap-3 mb-6 pr-10 sm:pr-0">
                <div className="flex items-center gap-1 text-[#9D9970]">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="text-[10px] font-mono tracking-wider uppercase text-[#9D9970] bg-[#9D9970]/15 px-2.5 py-0.5 rounded-full border border-[#9D9970]/30 font-semibold">
                  Verified Acquisition
                </span>
              </div>

              {/* Quote Statement */}
              <p className="font-serif text-lg min-[400px]:text-xl sm:text-2xl md:text-3xl text-[#F4F3EA] font-light leading-relaxed sm:tracking-wide italic">
                &ldquo;{current.feedback}&rdquo;
              </p>

              {/* Transaction Specifier */}
              <p className="mt-4 text-xs font-mono text-[#9D9970] tracking-wider uppercase">
                {current.property}
              </p>

              {/* Author Info */}
              <div className="mt-8 pt-6 border-t border-[#D7D4BD]/15 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4 min-w-0">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#9D9970]/50 shrink-0">
                    <Image
                      src={current.avatar}
                      alt={current.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-[#F4F3EA] font-normal tracking-wide">
                      {current.name}
                    </h4>
                    <span className="text-xs text-[#A9A68A] font-light block">
                      {current.designation}
                    </span>
                  </div>
                </div>

                {/* Navigation Arrows */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#9D9970] border border-[#D7D4BD]/25 hover:border-[#9D9970] text-[#F4F3EA] hover:text-[#1E1700] transition-all flex items-center justify-center cursor-pointer"
                    aria-label="Previous testimonial"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="w-11 h-11 rounded-full bg-white/5 hover:bg-[#9D9970] border border-[#D7D4BD]/25 hover:border-[#9D9970] text-[#F4F3EA] hover:text-[#1E1700] transition-all flex items-center justify-center cursor-pointer"
                    aria-label="Next testimonial"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </FadeIn>
      </div>
    </section>
  );
}