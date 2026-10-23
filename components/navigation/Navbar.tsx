"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";
import { ConsultationModal } from "@/components/forms/ConsultationModal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Properties", href: "/properties" },
    { label: "Buy", href: "/properties?type=Buy" },
    { label: "Rent", href: "/properties?type=Rent" },
    { label: "3D Villa", href: "/#showcase-3d" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#07070a]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Wordmark Logo */}
            <Link
              href="/"
              className="group flex flex-col items-start focus:outline-none"
            >
              <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.25em] text-white transition-colors duration-300 group-hover:text-[#c5a880]">
                AURELIA <span className="text-[#c5a880]">&amp;</span> CO.
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-zinc-400 font-mono -mt-0.5">
                Private Estates
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 border border-white/10 rounded-full px-5 py-1.5 bg-black/40 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`px-3.5 py-1 text-xs uppercase tracking-widest transition-all duration-300 rounded-full ${
                      isActive
                        ? "text-[#c5a880] font-semibold bg-white/5"
                        : "text-zinc-300 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>

            {/* CTA & Actions */}
            <div className="hidden lg:flex items-center space-x-4">
              <a
                href="https://wa.me/442079460912?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Aurelia%20private%20estates."
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider text-zinc-400 hover:text-[#c5a880] transition-colors flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Private Desk
              </a>

              <button
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-widest font-medium text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all duration-300 shadow-lg shadow-[#c5a880]/20 hover:scale-[1.02] cursor-pointer"
              >
                <span>Book Consultation</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="px-3 py-1.5 rounded-full text-[11px] uppercase tracking-wider font-medium text-black bg-[#c5a880]"
              >
                Consult
              </button>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full border border-white/15 bg-black/60 text-zinc-200 hover:text-white"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#08080c]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 shadow-2xl transition-all">
            <div className="flex flex-col space-y-4">
              <div className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold mb-1">
                Navigation
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-lg font-serif text-zinc-200 hover:text-[#c5a880] transition-colors py-1 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-zinc-600" />
                </Link>
              ))}

              <div className="pt-6 mt-4 border-t border-white/10 flex flex-col space-y-3">
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsConsultationOpen(true);
                  }}
                  className="w-full py-3 rounded-full text-center text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] shadow-lg shadow-[#c5a880]/20"
                >
                  Book Private Consultation
                </button>
                <a
                  href="https://wa.me/442079460912?text=Hello%20Aurelia%20Estates"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 rounded-full text-center text-xs uppercase tracking-wider text-zinc-300 border border-white/15 hover:border-[#c5a880] transition-colors flex items-center justify-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Direct WhatsApp Advisory
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Consultation Modal Dialog */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </>
  );
}
