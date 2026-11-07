"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Eye, ShieldCheck, Check } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 bg-[#1E1700] relative overflow-hidden text-[#F4F3EA] border-b border-[#D7D4BD]/15">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Photo with Provenance Badge */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#D7D4BD]/20 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
                alt="Aurelia & Co. Architectural Heritage"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1E1700]/90 via-transparent to-transparent" />

              {/* Floating Provenance Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#1E1700]/90 backdrop-blur-xl border border-[#9D9970]/30 flex items-center justify-between shadow-2xl">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#9D9970] block">
                    Established 2008 • Geneva &amp; Mayfair
                  </span>
                  <span className="font-serif text-lg text-[#F4F3EA] font-light mt-0.5 block">
                    18+ Years of Proven Stewardship
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#9D9970]/20 border border-[#9D9970]/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#9D9970]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Mission/Vision */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
              <span>The Aurelia Legacy • Curatorial Manifesto</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#F4F3EA] font-light tracking-tight leading-[1.08]">
              The Luxury Experience <br />
              <span className="italic text-[#9D9970]">
                You&apos;ll Remember.
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#E7E5D4] font-light leading-relaxed">
              Founded in 2008, Aurelia &amp; Co. operates as a discreet private advisory for sovereigns, family offices, and discerning individuals acquiring trophy real estate worldwide.
            </p>

            {/* Mission & Vision Side-by-Side Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-white/5 border border-[#D7D4BD]/15 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#9D9970] mb-2 font-mono">
                  <Target className="w-4 h-4 text-[#9D9970]" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Our Mission</span>
                </div>
                <p className="text-xs text-[#E7E5D4] font-light leading-relaxed">
                  Provide institutional-grade transparency and exclusive access to the world&apos;s finest off-market pocket inventory.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white/5 border border-[#D7D4BD]/15 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#9D9970] mb-2 font-mono">
                  <Eye className="w-4 h-4 text-[#9D9970]" />
                  <span className="text-xs uppercase tracking-wider font-semibold">Our Vision</span>
                </div>
                <p className="text-xs text-[#E7E5D4] font-light leading-relaxed">
                  Redefine international real estate advisory through architectural stewardship and intergenerational wealth preservation.
                </p>
              </div>
            </div>

            {/* Client Commitment Points */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {[
                "100% Verified Titles",
                "Fiduciary Discretion",
                "Cross-Border Advisory",
                "Direct Principal Access",
              ].map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-normal text-[#E7E5D4] bg-white/5 border border-[#D7D4BD]/20"
                >
                  <Check className="w-3.5 h-3.5 text-[#9D9970]" />
                  <span>{badge}</span>
                </span>
              ))}
            </div>

            {/* Learn More CTA */}
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold text-[#1E1700] bg-[#9D9970] hover:bg-[#BCB893] transition-all shadow-xl shadow-[#9D9970]/20 cursor-pointer"
              >
                <span>Discover Our Heritage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}