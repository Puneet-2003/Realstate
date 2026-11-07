"use client";

import React from "react";
import { Clock, MapPin, Headphones, ArrowRight, ShieldCheck, Globe } from "lucide-react";

export function LuxuryInfoBar() {
  return (
    <section className="bg-[#1E1700] border-y border-[#D7D4BD]/15 text-[#F4F3EA] relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-7">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 divide-y md:divide-y-0 md:divide-x divide-[#D7D4BD]/15">
          {/* Column 1: Private Viewing Protocol */}
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-[#9D9970]/30 flex items-center justify-center shrink-0 mt-0.5">
              <Clock className="w-4 h-4 text-[#9D9970]" />
            </div>
            <div>
              <span className="block text-[10px] font-mono tracking-[0.25em] uppercase text-[#9D9970] font-medium">
                Viewing Protocols
              </span>
              <p className="font-serif text-lg text-[#F4F3EA] font-light mt-0.5">
                Mon – Sun: 08:00 – 21:00 EST
              </p>
              <span className="block text-xs text-[#6F6C55] mt-0.5 font-light">
                Confidential in-person walkthroughs &amp; encrypted virtual previews
              </span>
            </div>
          </div>

          {/* Column 2: Sovereign Advisory Galleries */}
          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-[#9D9970]/30 flex items-center justify-center shrink-0 mt-0.5">
              <MapPin className="w-4 h-4 text-[#9D9970]" />
            </div>
            <div>
              <span className="block text-[10px] font-mono tracking-[0.25em] uppercase text-[#9D9970] font-medium">
                Global Advisory Hubs
              </span>
              <p className="font-serif text-lg text-[#F4F3EA] font-light mt-0.5">
                740 Park Avenue • Mayfair Desk
              </p>
              <span className="block text-xs text-[#6F6C55] mt-0.5 font-light">
                Zurich Paradeplatz • Beverly Hills • Lake Como
              </span>
            </div>
          </div>

          {/* Column 3: White-Glove Client Concierge */}
          <div className="flex items-start gap-4 pt-4 md:pt-0 md:pl-8">
            <div className="w-10 h-10 rounded-full bg-white/5 border border-[#9D9970]/30 flex items-center justify-center shrink-0 mt-0.5">
              <Headphones className="w-4 h-4 text-[#9D9970]" />
            </div>
            <div>
              <span className="block text-[10px] font-mono tracking-[0.25em] uppercase text-[#9D9970] font-medium">
                Sovereign Concierge
              </span>
              <a
                href="tel:+18008924400"
                className="font-serif text-lg text-[#F4F3EA] hover:text-[#9D9970] transition-colors font-light mt-0.5 block"
              >
                +1 (800) 892-4400
              </a>
              <span className="block text-xs text-[#6F6C55] mt-0.5 font-light">
                Direct encrypted line for private collectors &amp; family offices
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}