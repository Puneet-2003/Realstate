"use client";

import React from "react";
import Image from "next/image";
import { ShieldCheck, Mail, Calendar, ArrowRight, Sparkles } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation";
import {
  FlipButton,
  FlipButtonFront,
  FlipButtonBack,
} from "@/components/animate-ui/buttons/flip";

interface OwnerSectionProps {
  onOpenBooking?: () => void;
}

export function OwnerSection({ onOpenBooking }: OwnerSectionProps = {}) {
  return (
    <section id="owner" className="py-24 sm:py-32 bg-[#1E1700] border-b border-[#3E3A1F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Eyebrow */}
        <StaggerContainer className="max-w-3xl mb-12 sm:mb-16">
          <StaggerItem className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2612] border border-[#3E3A1F] text-[11px] font-mono uppercase tracking-[0.25em] text-[#BCB893] font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#BCB893]" />
            <span>Private Stewardship &amp; Leadership</span>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#F4F3EA] font-light tracking-tight">
              Meet the Founder &amp; <br />
              <span className="italic font-normal text-[#BCB893]">Managing Principal.</span>
            </h2>
          </StaggerItem>
        </StaggerContainer>

        {/* Owner Profile Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Editorial Portrait */}
          <FadeIn className="lg:col-span-5" distance={40} duration={0.9} threshold={0.15}>
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative frame */}
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-[#3E3A1F] shadow-2xl shadow-black/5 bg-[#2B2612]">
                <Image
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85"
                  alt="Alexander Vance - Founder & Managing Principal"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1700]/70 via-transparent to-transparent pointer-events-none" />

                {/* Bottom Overlay Tag */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#1E1700]/85 backdrop-blur-md border border-[#D7D4BD]/20 text-[#F4F3EA]">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCB893] block font-semibold">
                    Managing Principal
                  </span>
                  <span className="font-serif text-xl text-[#F4F3EA] block mt-0.5">
                    Alexander Aurelia Vance
                  </span>
                  <span className="text-xs text-[#A9A68A] font-light block mt-0.5">
                    Licensed Master Broker • Beverly Hills &amp; London
                  </span>
                </div>
              </div>

              {/* Verified Pill */}
              <div className="absolute -top-4 -right-4 hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-[#2B2712] text-[#F4F3EA] border border-[#9D9970] shadow-xl text-xs font-mono">
                <ShieldCheck className="w-4 h-4 text-[#BCB893]" />
                <span>18+ Years Private Practice</span>
              </div>
            </div>
          </FadeIn>

          {/* Right Column: Narrative, Credentials & Direct Access */}
          <StaggerContainer className="lg:col-span-7 space-y-8" staggerDelay={0.12} threshold={0.1}>
            <StaggerItem>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#BCB893] font-semibold block mb-2">
                Architectural Vision &amp; Heritage
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F4F3EA] font-light leading-snug">
                &ldquo;True luxury is not merely square footage—it is an enduring dialogue between monumental architecture, acoustic solitude, and timeless natural topography.&rdquo;
              </h3>
            </StaggerItem>

            <StaggerItem as="div" className="text-sm sm:text-base text-[#A9A68A] font-light leading-relaxed">
              Founded under the personal direction of Alexander Vance in 2008, Aurelia &amp; Co. was established as an antidote to mass-market luxury brokerage. Alexander personally oversees every acquisition, cross-border conveyance, and confidential off-market placement for discerning family offices, institutional investors, and global architectural patrons.
            </StaggerItem>

            {/* Key Achievements Grid */}
            <StaggerItem className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-[#252010] border border-[#3E3A1F] shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-[#BCB893] font-semibold block">
                  Cumulative Career Volume
                </span>
                <span className="font-serif text-2xl text-[#F4F3EA] block mt-1">
                  $4.2 Billion+
                </span>
                <span className="text-[11px] text-[#A9A68A] font-light block mt-0.5">
                  Across 1,450+ trophy property transactions
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[#252010] border border-[#3E3A1F] shadow-sm">
                <span className="text-xs font-mono uppercase tracking-wider text-[#BCB893] font-semibold block">
                  Institutional Accreditations
                </span>
                <span className="font-serif text-xl text-[#F4F3EA] block mt-1">
                  Forbes Real Estate Council
                </span>
                <span className="text-[11px] text-[#A9A68A] font-light block mt-0.5">
                  Trustee, International Architectural Heritage
                </span>
              </div>
            </StaggerItem>

            {/* Direct Consultation Actions */}
            <StaggerItem className="pt-4 border-t border-[#3E3A1F] flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              {onOpenBooking && (
                <FlipButton
                  from="top"
                  tapScale={0.97}
                  onClick={onOpenBooking}
                  className="shadow-xl shadow-[#9D9970]/25 cursor-pointer"
                >
                  <FlipButtonFront className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold bg-[#9D9970] text-[#1E1700]">
                    <Calendar className="w-4 h-4" />
                    <span>Schedule Private Dialogue</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </FlipButtonFront>
                  <FlipButtonBack className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold bg-[#BCB893] text-[#1E1700]">
                    <span>Select Dialogue Time →</span>
                  </FlipButtonBack>
                </FlipButton>
              )}

              <a
                href="mailto:alexander@aurelia.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.15em] border border-[#3E3A1F] hover:border-[#9D9970] text-[#F4F3EA] hover:bg-[#252010] transition-all cursor-pointer font-medium"
              >
                <Mail className="w-4 h-4 text-[#BCB893]" />
                <span>Direct Confidential Email</span>
              </a>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
}

