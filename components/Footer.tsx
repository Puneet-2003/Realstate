"use client";

import React from "react";
import Link from "next/link";
import { ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animation";

const exploreLinks = [
  { label: "Experience", href: "/#experience" },
  { label: "Founder", href: "/#owner" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Book Consultation", href: "/#schedule-meeting" },
];

// Properties column is temporarily hidden from the footer.
const SHOW_PROPERTY_LINKS = false;

const propertyLinks = [
  { label: "Villas", href: "/properties?category=Luxury+Villa" },
  { label: "Penthouses", href: "/properties?category=Modern+Penthouse" },
  { label: "Waterfront Estates", href: "/properties?category=Waterfront+Estate" },
  { label: "Rentals", href: "/properties?type=Rent" },
];

const headingClass =
  "font-mono text-[10px] uppercase tracking-widest text-[#9D9970] font-semibold mb-4";
const linkClass = "hover:text-[#F4F3EA] transition-colors";

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#140F00] border-t border-[#D7D4BD]/15 text-[#F4F3EA] pt-14 sm:pt-20 pb-28 sm:pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <StaggerContainer staggerDelay={0.08} threshold={0.1} className="grid grid-cols-2 lg:grid-cols-12 gap-x-6 gap-y-10 sm:gap-10 pb-12 sm:pb-14 border-b border-[#D7D4BD]/15 text-sm">
          {/* Brand */}
          <StaggerItem className="col-span-2 lg:col-span-5">
            <Link href="/" className="group inline-flex flex-col items-start focus:outline-none">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.18em] sm:tracking-[0.22em] text-[#F4F3EA] group-hover:text-[#9D9970] transition-colors">
                AURELIA <span className="text-[#9D9970] font-normal">&amp;</span> CO.
              </span>
              <span className="text-[10px] uppercase tracking-[0.4em] text-[#9D9970] font-mono mt-1 font-semibold">
                Extraordinary Estates
              </span>
            </Link>
            <p className="mt-5 text-[#A9A68A] font-light leading-relaxed max-w-sm">
              Private real estate brokerage for exceptional residences.
            </p>
          </StaggerItem>

          {/* Explore */}
          <StaggerItem className="lg:col-span-2">
            <h5 className={headingClass}>Explore</h5>
            <ul className="space-y-3 text-[#A9A68A] font-light">
              {exploreLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className={linkClass}>{l.label}</a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          {/* Properties — hidden for now; flip SHOW_PROPERTY_LINKS to restore */}
          {SHOW_PROPERTY_LINKS && (
            <StaggerItem className="lg:col-span-2">
              <h5 className={headingClass}>Properties</h5>
              <ul className="space-y-3 text-[#A9A68A] font-light">
                {propertyLinks.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className={linkClass}>{l.label}</Link>
                  </li>
                ))}
              </ul>
            </StaggerItem>
          )}

          {/* Contact */}
          <StaggerItem className={`col-span-2 ${SHOW_PROPERTY_LINKS ? "lg:col-span-3" : "lg:col-span-5"}`}>
            <h5 className={headingClass}>Contact</h5>
            <div className="space-y-3 text-[#A9A68A] font-light">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-3.5 h-3.5 text-[#9D9970] shrink-0 mt-1" />
                <span>Beverly Hills, CA</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-3.5 h-3.5 text-[#9D9970] shrink-0" />
                <a href="tel:+13108924400" className={linkClass}>+1 (310) 892-4400</a>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-3.5 h-3.5 text-[#9D9970] shrink-0" />
                <a href="mailto:private@aurelia.com" className={linkClass}>private@aurelia.com</a>
              </p>
            </div>
          </StaggerItem>
        </StaggerContainer>

        {/* Bottom bar */}
        {/* Right padding keeps "Top" clear of the floating menu/WhatsApp buttons. */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#A9A68A] sm:pr-20 2xl:pr-0">
          <p className="font-light">
            &copy; 2026 Aurelia &amp; Co. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <span className={`${linkClass} cursor-pointer`}>Privacy</span>
            <span className={`${linkClass} cursor-pointer`}>Terms</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="flex items-center gap-1.5 text-[#9D9970] hover:text-[#F4F3EA] transition-colors cursor-pointer font-mono uppercase tracking-wider"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
