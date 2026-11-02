"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Target, Eye, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export function AboutSection() {
  return (
    <section id="about" className="py-20 sm:py-28 bg-[#7F4F24] relative overflow-hidden text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Architectural Photo with Provenance Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-[#FAF7F2]/20 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
                alt="Aurelia & Co. Architectural Heritage"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2D1A0B]/80 via-transparent to-transparent" />

              {/* Floating Provenance Pill */}
              <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-[#18110B]/90 backdrop-blur-xl border border-[#C89D5C]/35 flex items-center justify-between shadow-xl">
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#DFBD85] block">
                    Established 2008
                  </span>
                  <span className="font-serif text-lg text-white font-light mt-0.5 block">
                    18+ Years of Proven Stewardship
                  </span>
                </div>
                <div className="w-10 h-10 rounded-full bg-[#C89D5C]/25 border border-[#C89D5C]/40 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5 text-[#DFBD85]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Mission/Vision (Image 2 style) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#F3E5C8] font-bold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Section 05 • The Aurelia Legacy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-normal tracking-tight leading-[1.08]">
              The Luxury Experience <br />
              <span className="italic font-normal text-[#F3E5C8]">
                You&apos;ll Remember.
              </span>
            </h2>

            <p className="mt-5 text-sm sm:text-base text-[#FAF7F2] font-normal leading-relaxed">
              Founded in 2008, Aurelia &amp; Co. operates as a discreet private advisory for sovereigns, family offices, and discerning individuals acquiring trophy real estate worldwide.
            </p>

            {/* Mission & Vision Side-by-Side Cards */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-[#2D1A0B]/60 border border-[#FAF7F2]/25 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#F3E5C8] mb-2">
                  <Target className="w-4 h-4 text-[#F3E5C8]" />
                  <span className="text-xs uppercase tracking-wider font-bold">Our Mission</span>
                </div>
                <p className="text-xs text-[#FAF7F2] font-normal leading-relaxed">
                  Provide institutional-grade transparency and exclusive access to the world&apos;s finest off-market pocket inventory.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#2D1A0B]/60 border border-[#FAF7F2]/25 backdrop-blur-sm">
                <div className="flex items-center gap-2 text-[#F3E5C8] mb-2">
                  <Eye className="w-4 h-4 text-[#F3E5C8]" />
                  <span className="text-xs uppercase tracking-wider font-bold">Our Vision</span>
                </div>
                <p className="text-xs text-[#FAF7F2] font-normal leading-relaxed">
                  Redefine international real estate advisory through architectural stewardship and intergenerational wealth preservation.
                </p>
              </div>
            </div>

            {/* Client Commitment Points */}
            <div className="mt-6 flex flex-wrap gap-2">
              {[
                "100% Verified Titles",
                "Fiduciary Discretion",
                "Cross-Border Advisory",
                "Direct Principal Access",
              ].map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 rounded-full text-xs font-mono font-medium text-white bg-[#2D1A0B]/70 border border-[#FAF7F2]/30 shadow-xs"
                >
                  ✓ {badge}
                </span>
              ))}
            </div>

            {/* Learn More CTA */}
            <div className="mt-8">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-widest font-bold text-[#18110B] bg-[#FAF7F2] hover:bg-white transition-all shadow-lg shadow-black/20 cursor-pointer"
              >
                <span>Discover Our Heritage</span>
                <ArrowRight className="w-4 h-4 text-[#18110B]" />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
