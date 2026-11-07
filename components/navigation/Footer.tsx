"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animation";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#150F0A] border-t border-[#BCB893]/25 text-[#F8F7F0] pt-12 sm:pt-16 pb-28 sm:pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StaggerContainer staggerDelay={0.08} threshold={0.1} className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 md:gap-8 pb-10 sm:pb-12 border-b border-[#BCB893]/20 text-xs">
          <StaggerItem className="col-span-2 md:col-span-1">
            <Link href="/" className="group inline-flex flex-col items-start focus:outline-none">
              <span className="font-serif text-2xl font-light tracking-[0.2em] text-[#F8F7F0] group-hover:text-[#CFCCAE] transition-colors">
                AURELIA <span className="text-[#BCB893] font-normal">&amp;</span> CO.
              </span>
              <span className="text-[9px] uppercase tracking-[0.38em] text-[#BCB893] font-mono -mt-1">
                Luxury Real Estate
              </span>
            </Link>
            <p className="mt-4 text-xs text-[#CFCCAE] font-light leading-relaxed">
              Curating architectural sanctuaries and managing intergenerational wealth across global capitals.
            </p>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#CFCCAE] font-semibold mb-4">
              Navigation
            </h5>
            <ul className="space-y-2 text-[#CFCCAE]">
              <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/properties" className="hover:text-white transition-colors">Properties</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#CFCCAE] font-semibold mb-4">
              Portfolio
            </h5>
            <ul className="space-y-2 text-[#CFCCAE]">
              <li><Link href="/properties?category=Luxury+Villa" className="hover:text-white transition-colors">Luxury Villas</Link></li>
              <li><Link href="/properties?category=Modern+Penthouse" className="hover:text-white transition-colors">Modern Penthouses</Link></li>
              <li><Link href="/properties?category=Waterfront+Estate" className="hover:text-white transition-colors">Waterfront Estates</Link></li>
              <li><Link href="/properties?category=Architectural+Icon" className="hover:text-white transition-colors">Architectural Icons</Link></li>
            </ul>
          </StaggerItem>

          <StaggerItem className="col-span-2 md:col-span-1">
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#CFCCAE] font-semibold mb-4">
              Headquarters
            </h5>
            <div className="space-y-2 text-[#CFCCAE]">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0 text-[#BCB893]" />
                <span>Beverly Hills, CA 90210</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 shrink-0 text-[#BCB893]" />
                <a href="tel:+13108924400" className="hover:text-white">+1 (310) 892-4400</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0 text-[#BCB893]" />
                <a href="mailto:private@aurelia.com" className="hover:text-white">private@aurelia.com</a>
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8A876A]">
          <p>&copy; 2026 Aurelia &amp; Co. All rights reserved.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-[#CFCCAE] hover:text-white transition-colors cursor-pointer font-semibold"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
