"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles, Shield } from "lucide-react";
import { PROPERTIES } from "@/lib/properties";
import { formatNumber } from "@/lib/utils";
import { whatsappUrl } from "@/lib/whatsapp";

export function SignatureResidence() {
  const signatureProp = PROPERTIES.find((p) => p.slug === "the-glass-pavilion-bel-air") || PROPERTIES[0];

  return (
    <section id="signature-residence" className="py-24 sm:py-32 bg-[#171200] relative overflow-hidden border-t border-b border-white/5">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#BCB893]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Tag */}
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#BCB893] font-semibold mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Curator&apos;s Signature Residence</span>
        </div>

        {/* Split Screen Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Narrative & Specifications */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#A9A68A] font-mono">
                {signatureProp.location.neighborhood} • {signatureProp.location.city}
              </span>
              <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-white font-light tracking-tight mt-2 leading-[1.1]">
                {signatureProp.title}
              </h2>
              <p className="font-serif text-2xl sm:text-3xl text-gold-accent font-normal mt-3">
                {signatureProp.priceFormatted}
              </p>

              <p className="text-sm sm:text-base text-[#C9C7AE] font-light mt-6 leading-relaxed">
                {signatureProp.description}
              </p>

              {/* Architect Quote */}
              <div className="mt-6 p-4 rounded-xl bg-white/[0.03] border-l-2 border-[#BCB893] text-xs text-[#C9C7AE] italic">
                &ldquo;{signatureProp.architecturalPhilosophy}&rdquo;
                <span className="block not-italic font-medium text-[#BCB893] mt-2">
                  — {signatureProp.architect}
                </span>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-3 gap-4 text-left">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A9A68A] block">Bedrooms</span>
                <span className="text-lg font-serif text-white">{signatureProp.bedrooms} Suites</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A9A68A] block">Bathrooms</span>
                <span className="text-lg font-serif text-white">{signatureProp.bathrooms} Baths</span>
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-wider text-[#A9A68A] block">Interior Area</span>
                <span className="text-lg font-serif text-white">{formatNumber(signatureProp.areaSqFt)} sq ft</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href={`/properties/${signatureProp.slug}`}
                className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#BCB893] hover:bg-[#CFCCAE] transition-all shadow-xl shadow-[#BCB893]/20 flex items-center gap-2 group"
              >
                <span>Discover This Residence</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>

              <a
                href={whatsappUrl("Inquiry regarding The Glass Pavilion Bel Air")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-full text-xs uppercase tracking-widest text-[#C9C7AE] hover:text-white border border-white/15 hover:border-[#BCB893] transition-colors"
              >
                Schedule Private Viewing
              </a>
            </div>
          </div>

          {/* Right Column: Layered Photography Collage */}
          <div className="lg:col-span-7 relative">
            {/* Primary Large Photo */}
            <div className="relative aspect-[16/10] sm:aspect-[16/11] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={signatureProp.coverImage}
                alt={signatureProp.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              {/* Floating Highlight Pill */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between text-xs text-white bg-black/65 backdrop-blur-md p-3.5 rounded-2xl border border-white/15">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-[#BCB893]" />
                  <span>3.2 Private Gated Acres in Bel Air Crest</span>
                </div>
                <span className="text-[#BCB893] font-semibold">LEED Platinum</span>
              </div>
            </div>

            {/* Secondary Overlapping Thumbnail */}
            <div className="hidden sm:block absolute -bottom-8 -left-8 w-56 aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#171200] shadow-2xl shadow-black">
              <Image
                src={signatureProp.gallery[1] || signatureProp.coverImage}
                alt="Interior Living Hall"
                fill
                sizes="250px"
                className="object-cover"
              />
            </div>

            {/* Tertiary Detail Thumbnail */}
            <div className="hidden sm:block absolute -top-6 -right-6 w-44 aspect-square rounded-2xl overflow-hidden border-2 border-[#171200] shadow-2xl shadow-black">
              <Image
                src={signatureProp.gallery[2] || signatureProp.coverImage}
                alt="Cantilever Pool View"
                fill
                sizes="200px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
