"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, PhoneCall, Sparkles } from "lucide-react";
import { ConsultationModal } from "@/components/forms/ConsultationModal";

export function FinalCTA() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <>
      <section className="relative py-28 sm:py-36 overflow-hidden">
        {/* Full-width background photography */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2400&auto=format&fit=crop"
            alt="Palazzo del Lago Waterfront Villa"
            fill
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/80 to-[#070709]/90" />
          <div className="absolute inset-0 cinematic-grid opacity-30" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#c5a880]/30 text-xs tracking-[0.25em] uppercase text-[#c5a880] mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Advisory &amp; Acquisition</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl text-white font-light tracking-tight leading-[1.08]">
            Your Next Chapter <br />
            <span className="italic font-normal text-gold-gradient">Starts Here.</span>
          </h2>

          <p className="mt-6 text-base sm:text-lg text-zinc-300 font-light max-w-2xl mx-auto leading-relaxed">
            Discover a property that reflects the way you want to live. Whether acquiring an off-market
            modernist sanctuary or curating an international real estate portfolio.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/properties"
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all shadow-2xl shadow-[#c5a880]/30 flex items-center justify-center gap-2 group hover:scale-[1.02]"
            >
              <span>Explore Properties</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <button
              type="button"
              onClick={() => setIsConsultationOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-full text-xs uppercase tracking-widest text-white border border-white/20 hover:border-[#c5a880] bg-black/60 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-white/10"
            >
              <PhoneCall className="w-4 h-4 text-[#c5a880]" />
              <span>Speak With an Advisor</span>
            </button>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6 text-xs text-zinc-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Discretion Guaranteed
            </span>
            <span>•</span>
            <span>Swiss Escrow &amp; Advisory</span>
            <span>•</span>
            <span>Verified Pedigree</span>
          </div>
        </div>
      </section>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
}
