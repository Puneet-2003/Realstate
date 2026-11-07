"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Compass, TrendingUp, Award, ArrowRight, Check } from "lucide-react";

export function BrandStory() {
  const differentiators = [
    {
      icon: Compass,
      title: "Radically Curated Portfolio",
      description:
        "We reject 94% of properties presented to our firm. We represent solely residences with verified architectural pedigree, museum-grade material finishes, and irreplaceable geographic positioning.",
      details: ["Architectural provenance verification", "Structural engineering audits", "Rare off-market allocations"],
    },
    {
      icon: ShieldCheck,
      title: "Bespoke Family Office Advisory",
      description:
        "Every client is represented exclusively by a Senior Partner. We handle multi-jurisdictional structuring, Swiss escrow services, and private helicopter or security transfers with military discretion.",
      details: ["Single point of encrypted advisory", "Cross-border tax & legal coordination", "Strict non-disclosure protocols"],
    },
    {
      icon: TrendingUp,
      title: "Trophy Asset Wealth Preservation",
      description:
        "Prime architectural real estate is the most resilient store of generational value. Our global macroeconomic intelligence ensures acquisitions that outperform standard asset classes.",
      details: ["Proprietary prime liquidity analytics", "Historical yield & appreciation models", "Currency hedging strategies"],
    },
  ];

  return (
    <section className="py-24 sm:py-32 bg-[#171200] relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#BCB893] font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>The Aurelia Philosophy</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-white font-light tracking-tight leading-[1.1]">
            Real Estate, <br />
            <span className="italic font-normal text-gold-gradient">Reimagined as Fine Art.</span>
          </h2>
          <p className="mt-6 text-[#C9C7AE] text-sm sm:text-base font-light leading-relaxed">
            Founded on the principle that exceptional living spaces cannot be traded like ordinary commodities.
            We operate as a global private salon connecting visionary architects, master builders, and the world&apos;s
            most discerning families.
          </p>
        </div>

        {/* 3 Core Differentiator Cards */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {differentiators.map((diff, index) => {
            const Icon = diff.icon;
            return (
              <div
                key={diff.title}
                className="relative p-8 rounded-3xl bg-[#1E1700] border border-white/10 hover:border-[#BCB893]/40 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-[#BCB893] mb-6 group-hover:scale-110 group-hover:border-[#BCB893]/50 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <span className="text-[10px] uppercase tracking-widest text-[#A9A68A] font-mono">
                    Pillar 0{index + 1}
                  </span>
                  <h3 className="text-xl font-serif text-white mt-1 group-hover:text-[#BCB893] transition-colors">
                    {diff.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A9A68A] mt-3 leading-relaxed font-light">
                    {diff.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-2">
                  {diff.details.map((item) => (
                    <div key={item} className="flex items-center gap-2 text-xs text-[#C9C7AE]">
                      <Check className="w-3.5 h-3.5 text-[#BCB893]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Visual Storytelling Banner */}
        <div className="mt-16 rounded-3xl overflow-hidden relative border border-white/10 bg-[#140F00]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-7 p-8 sm:p-12 relative z-10">
              <span className="text-xs uppercase tracking-widest text-[#BCB893] font-semibold">
                Global Footprint
              </span>
              <h3 className="text-2xl sm:text-4xl font-serif text-white mt-2 leading-tight">
                Operating Discreetly in the World&apos;s Foremost Gateway Metropolises
              </h3>
              <p className="text-xs sm:text-sm text-[#C9C7AE] font-light mt-4 leading-relaxed max-w-xl">
                With permanent private advisory suites in London (Mayfair), New York (Billionaires&apos; Row),
                Zurich (Bahnhofstrasse), and Dubai (DIFC), we bridge capital and architectural rarity across borders.
              </p>
              <div className="mt-8 flex items-center gap-4">
                <Link
                  href="/about"
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#BCB893] text-black hover:bg-[#CFCCAE] transition-all flex items-center gap-2"
                >
                  <span>Our Heritage &amp; Leadership</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/contact"
                  className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest text-[#C9C7AE] hover:text-white border border-white/15"
                >
                  Global Offices
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 relative h-72 lg:h-full min-h-[300px]">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop"
                alt="Architectural Interior Gallery"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#171200] via-transparent to-transparent lg:block hidden" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
