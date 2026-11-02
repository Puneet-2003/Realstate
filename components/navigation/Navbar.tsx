"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Calendar, Phone, Sparkles } from "lucide-react";
import { ConsultationModal } from "@/components/forms/ConsultationModal";
import { useFavorites } from "@/lib/favorites";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navLinks = [
    { number: "01", label: "Home", href: "/" },
    { number: "02", label: "About Us", href: "/about" },
    { number: "03", label: "All Properties", href: "/properties" },
    { number: "04", label: "Our Services", href: "/#services" },
    { number: "05", label: "Why Choose Us", href: "/#why-choose-us" },
    { number: "06", label: "Testimonials", href: "/#testimonials" },
    { number: "07", label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      {/* MINIMALIST HEADER BAR: Simple Logo + Three-line Menu Button ONLY */}
      <header className="sticky top-0 left-0 right-0 z-50 bg-[#18110B]/95 backdrop-blur-md border-b border-[#C89D5C]/25 shadow-xl shadow-black/30 transition-all duration-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Wordmark Logo */}
            <Link
              href="/"
              className="group flex flex-col items-start focus:outline-none"
            >
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.2em] text-[#FAF7F2] transition-colors duration-300 group-hover:text-[#DFBD85]">
                AURELIA <span className="text-[#C89D5C] font-normal">&amp;</span> CO.
              </span>
              <span className="text-[9px] uppercase tracking-[0.38em] text-[#C89D5C] font-mono -mt-1 font-semibold">
                Luxury Real Estate
              </span>
            </Link>

            {/* Three-line Menu Button */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                className="group flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#231811] hover:bg-[#2D1A0B] border border-[#C89D5C]/35 hover:border-[#DFBD85] text-[#FAF7F2] transition-all duration-300 cursor-pointer shadow-md shadow-black/40 hover:scale-[1.03]"
                aria-label="Toggle Navigation Menu"
              >
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#DFBD85] font-semibold hidden sm:inline">
                  {menuOpen ? "Close" : "Menu"}
                </span>

                <div className="w-5 h-4 relative flex flex-col justify-between items-end">
                  <span
                    className={`h-[1.5px] bg-[#DFBD85] transition-all duration-300 rounded-full ${
                      menuOpen ? "w-5 rotate-45 translate-y-[7.5px]" : "w-5"
                    }`}
                  />
                  <span
                    className={`h-[1.5px] bg-[#DFBD85] transition-all duration-300 rounded-full ${
                      menuOpen ? "opacity-0" : "w-3.5"
                    }`}
                  />
                  <span
                    className={`h-[1.5px] bg-[#DFBD85] transition-all duration-300 rounded-full ${
                      menuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-4"
                    }`}
                  />
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Slide-over Full Navigation Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-xl flex justify-end"
          >
            <div
              className="absolute inset-0"
              onClick={() => setMenuOpen(false)}
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-xl h-full bg-[#18110B] border-l border-[#C89D5C]/30 shadow-2xl flex flex-col justify-between p-6 sm:p-10 overflow-y-auto"
            >
              <div className="flex items-center justify-between pb-6 border-b border-[#C89D5C]/20">
                <div className="flex flex-col">
                  <span className="font-serif text-xl text-[#FAF7F2] font-light tracking-widest">
                    AURELIA <span className="text-[#C89D5C]">&amp;</span> CO.
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#C89D5C] font-mono font-semibold">
                    Global Sanctuary Index
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-full bg-[#231811] hover:bg-[#2D1A0B] border border-[#C89D5C]/30 text-[#DFBD85] hover:text-white transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="py-8 space-y-2">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.35 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className={`group flex items-center justify-between py-2.5 px-3 rounded-lg hover:bg-white/5 transition-all duration-200 cursor-pointer ${
                          isActive ? "bg-white/10" : ""
                        }`}
                      >
                        <div className="flex items-baseline gap-4">
                          <span className="text-[11px] font-mono text-[#C89D5C] font-semibold">
                            {link.number}
                          </span>
                          <span
                            className={`font-serif text-2xl sm:text-3xl font-light tracking-wide transition-colors ${
                              isActive
                                ? "text-[#DFBD85]"
                                : "text-[#FAF7F2] group-hover:text-[#DFBD85]"
                            }`}
                          >
                            {link.label}
                          </span>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C89D5C] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Link>
                    </motion.div>
                  );
                })}
              </nav>

              <div className="pt-6 border-t border-[#C89D5C]/20 space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setMenuOpen(false);
                    setIsConsultationOpen(true);
                  }}
                  className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-[#18110B] bg-gradient-to-r from-[#C89D5C] via-[#DFBD85] to-[#C89D5C] hover:brightness-110 shadow-lg shadow-[#C89D5C]/20 transition-all cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  <span>Schedule Private Consultation</span>
                </button>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href="tel:+18008924400"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-xs text-[#FAF7F2] hover:text-[#DFBD85] transition-colors font-mono"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#C89D5C]" />
                    <span>+1 (800) 892-4400</span>
                  </a>

                  <a
                    href="https://wa.me/13108924400?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Aurelia%20private%20estates."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-xs text-[#FAF7F2] hover:text-[#DFBD85] transition-colors font-mono"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>WhatsApp Desk</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        propertyTitle="Exclusive Portfolio Consultation"
      />
    </>
  );
}
