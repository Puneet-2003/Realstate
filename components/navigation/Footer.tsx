"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#150F0A] border-t border-[#C89D5C]/25 text-[#FAF7F2] pt-16 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-[#C89D5C]/20 text-xs">
          <div className="md:col-span-1">
            <Link href="/" className="group inline-flex flex-col items-start focus:outline-none">
              <span className="font-serif text-2xl font-light tracking-[0.2em] text-[#FAF7F2] group-hover:text-[#DFBD85] transition-colors">
                AURELIA <span className="text-[#C89D5C] font-normal">&amp;</span> CO.
              </span>
              <span className="text-[9px] uppercase tracking-[0.38em] text-[#C89D5C] font-mono -mt-1">
                Luxury Real Estate
              </span>
            </Link>
            <p className="mt-4 text-xs text-[#D8C3AC] font-light leading-relaxed">
              Curating architectural sanctuaries and managing intergenerational wealth across global capitals.
            </p>
          </div>

          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#DFBD85] font-semibold mb-4">
              Navigation
            </h5>
            <ul className="space-y-2 text-[#D8C3AC]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/properties" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#DFBD85] font-semibold mb-4">
              Portfolio
            </h5>
            <ul className="space-y-2 text-[#D8C3AC]">
              <li><Link href="/properties?category=Luxury+Villa" className="hover:text-white transition-colors">Luxury Villas</Link></li>
              <li><Link href="/properties?category=Modern+Penthouse" className="hover:text-white transition-colors">Modern Penthouses</Link></li>
              <li><Link href="/properties?category=Waterfront+Estate" className="hover:text-white transition-colors">Waterfront Estates</Link></li>
              <li><Link href="/properties?category=Architectural+Icon" className="hover:text-white transition-colors">Architectural Icons</Link></li>
            </ul>
          </div>

          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#DFBD85] font-semibold mb-4">
              Headquarters
            </h5>
            <div className="space-y-2 text-[#D8C3AC]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C89D5C]" />
                <span>Beverly Hills, CA 90210</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C89D5C]" />
                <a href="tel:+13108924400" className="hover:text-white">+1 (310) 892-4400</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C89D5C]" />
                <a href="mailto:private@aurelia.com" className="hover:text-white">private@aurelia.com</a>
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8C7B70]">
          <p>&copy; 2026 Aurelia &amp; Co. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#DFBD85] hover:text-white transition-colors cursor-pointer font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
