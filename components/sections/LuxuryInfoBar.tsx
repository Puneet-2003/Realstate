"use client";

import React from "react";
import { Clock, MapPin, Headphones, ArrowRight, ShieldCheck } from "lucide-react";

export function LuxuryInfoBar() {
  return (
    <section className="bg-[#7F4F24] border-y border-[#C89D5C]/30 text-[#FAF7F2] relative z-20 shadow-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-white/15">
          {/* Column 1: Opening & Viewing Times */}
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-full bg-black/20 border border-[#FAF7F2]/20 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-5 h-5 text-[#FAF7F2]" />
            </div>
            <div>
              <span className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#F3E5C8] font-semibold">
                Private Viewing Hours
              </span>
              <p className="font-serif text-lg text-white font-normal mt-0.5">
                Mon – Sun: 08:00 – 21:00 EST
              </p>
              <span className="block text-xs text-[#EADECF] mt-0.5">
                Confidential appointments &amp; virtual previews
              </span>
            </div>
          </div>

          {/* Column 2: Global Prime Galleries */}
          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
            <div className="w-11 h-11 rounded-full bg-black/20 border border-[#FAF7F2]/20 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-5 h-5 text-[#FAF7F2]" />
            </div>
            <div>
              <span className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#F3E5C8] font-semibold">
                Global Galleries
              </span>
              <p className="font-serif text-lg text-white font-normal mt-0.5">
                740 Park Ave, Manhattan • Mayfair
              </p>
              <span className="block text-xs text-[#EADECF] mt-0.5">
                Beverly Hills • Lake Como • Zurich
              </span>
            </div>
          </div>

          {/* Column 3: White-Glove Support & Advisory */}
          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
            <div className="w-11 h-11 rounded-full bg-black/20 border border-[#FAF7F2]/20 flex items-center justify-center shrink-0 mt-0.5">
              <Headphones className="w-5 h-5 text-[#FAF7F2]" />
            </div>
            <div>
              <span className="block text-[11px] font-mono tracking-[0.2em] uppercase text-[#F3E5C8] font-semibold">
                Client Concierge
              </span>
              <a
                href="tel:+18008924400"
                className="font-serif text-lg text-white hover:text-[#F3E5C8] transition-colors font-normal mt-0.5 block"
              >
                +1 (800) 892-4400
              </a>
              <span className="block text-xs text-[#EADECF] mt-0.5">
                24/7 sovereign &amp; private family desk
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
