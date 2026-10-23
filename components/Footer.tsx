"use client";

import React from "react";
import { ArrowUp, ShieldCheck, Mail, ArrowRight } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-white pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tier: Wordmark & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          <div className="lg:col-span-6">
            <div className="flex items-center gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-light tracking-[0.2em] text-white">
                THE LUMIÈRE
              </span>
              <span className="w-2 h-2 rounded-full bg-[#C6A76B]" />
            </div>
            <span className="text-[10px] uppercase tracking-[0.35em] text-[#F5F0E8]/50 font-mono block mt-1">
              Private Residences &amp; Penthouses
            </span>

            <p className="mt-6 text-sm text-white/60 font-light leading-relaxed max-w-md">
              A 68-story sculptural landmark defined by light, materiality, and timeless restraint.
              Designed for generational stewardship.
            </p>

            <div className="mt-8 flex items-center gap-4 text-xs font-mono text-white/40">
              <span>NEW YORK</span>
              <span>•</span>
              <span>LONDON</span>
              <span>•</span>
              <span>ZURICH</span>
              <span>•</span>
              <span>DUBAI</span>
            </div>
          </div>

          {/* Private Portfolio Gazette */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A76B] block mb-2">
                Private Journal
              </span>
              <h4 className="font-serif text-2xl text-white font-light">
                Receive the Annual Architectural Monograph
              </h4>
              <p className="text-xs text-white/50 font-light mt-1">
                Curated insights into spatial engineering, private market transactions, and design acquisitions.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you. You have been added to the Private Advisory Journal.");
              }}
              className="mt-6 flex flex-col sm:flex-row items-center gap-3"
            >
              <div className="relative w-full sm:flex-1">
                <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="email"
                  required
                  placeholder="Enter private email address..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-[#C6A76B]"
                />
              </div>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black transition-all shrink-0 cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle Tier: Architectural Collaborators */}
        <div className="py-10 border-b border-white/10 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-mono text-white/50">
          <div>
            <span className="text-[10px] uppercase text-white/30 block mb-1">Architecture</span>
            <span className="text-white/80">Foster + Partners &amp; Vance</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-white/30 block mb-1">Interior Design</span>
            <span className="text-white/80">Studio Christian Liaigre</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-white/30 block mb-1">Structural Engineering</span>
            <span className="text-white/80">Thornton Tomasetti Inc.</span>
          </div>
          <div>
            <span className="text-[10px] uppercase text-white/30 block mb-1">Landscape Masterplan</span>
            <span className="text-white/80">Piet Oudolf Botanical Studio</span>
          </div>
        </div>

        {/* Bottom Tier: Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 text-[11px] font-mono text-white/40">
          <p className="max-w-2xl leading-relaxed text-center md:text-left">
            The architectural visualizations, renderings, and specifications depicted are artist
            interpretations. Final dimensions, materials, and municipal certifications are subject
            to change in accordance with local building regulations.
          </p>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/60 hover:text-[#C6A76B] transition-colors py-2 px-4 rounded-full border border-white/10 hover:border-[#C6A76B]/40 cursor-pointer shrink-0"
          >
            <span className="text-[10px] tracking-widest uppercase">Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="mt-8 text-center text-[10px] font-mono text-white/30">
          © 2026 The Lumière Residences. All International Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
