"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Calendar, Phone, Mail, Sparkles } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { useLenis } from "@/components/animation";
import {
  FlipButton,
  FlipButtonFront,
  FlipButtonBack,
} from "@/components/animate-ui/buttons/flip";

interface NavbarProps {
  onOpenBooking?: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { favoritesCount } = useFavorites();
  const { scrollTo } = useLenis();

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Prevent background scroll when menu is open
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
    { number: "01", label: "The Walkthrough", href: "/#hero" },
    { number: "02", label: "Properties Sold & Record", href: "/#experience" },
    { number: "03", label: "Founder & Owner Profile", href: "/#owner" },
    { number: "04", label: "Client Testimonials", href: "/#testimonials" },
    { number: "05", label: "Book Consultation", href: "/#schedule-meeting" },
  ];

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    if (href.startsWith("/#")) {
      const id = href.replace("/#", "");
      if (scrollTo) {
        scrollTo(`#${id}`, { offset: -60, duration: 1.2 });
      } else {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleScheduleClick = () => {
    setMenuOpen(false);
    if (onOpenBooking) {
      onOpenBooking();
    } else if (scrollTo) {
      scrollTo("#schedule-meeting", { offset: -60, duration: 1.2 });
    } else {
      const scheduleEl = document.getElementById("schedule-meeting");
      scheduleEl?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* FLOATING CIRCULAR MENU BUTTON POSITIONED OVER GEMINI LOGO */}
      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed bottom-6 right-6 sm:bottom-7 sm:right-7 z-50 w-12 h-12 rounded-full bg-[#1E1700]/95 hover:bg-[#1E1700] border border-[#9D9970]/70 hover:border-[#9D9970] text-[#F4F3EA] transition-all duration-300 cursor-pointer shadow-2xl shadow-black/80 hover:shadow-[0_0_25px_rgba(157,153,112,0.4)] backdrop-blur-xl flex items-center justify-center group hover:scale-105 active:scale-95 focus:outline-none"
        aria-label={menuOpen ? "Close Navigation Menu" : "Open Navigation Menu"}
        title={menuOpen ? "Close Menu" : "Open Navigation Menu"}
      >
        {/* Animated Three Lines / Cross */}
        <div className="w-5 h-4 relative flex flex-col justify-between items-center">
          <span
            className={`h-[1.5px] bg-[#9D9970] transition-all duration-300 rounded-full ${
              menuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5 group-hover:bg-[#F4F3EA]"
            }`}
          />
          <span
            className={`h-[1.5px] bg-[#9D9970] transition-all duration-300 rounded-full ${
              menuOpen ? "opacity-0" : "w-3.5 group-hover:bg-[#F4F3EA]"
            }`}
          />
          <span
            className={`h-[1.5px] bg-[#9D9970] transition-all duration-300 rounded-full ${
              menuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5 group-hover:bg-[#F4F3EA]"
            }`}
          />
        </div>
      </button>

      {/* FULLSCREEN / SLIDE-OVER NAVIGATION MODAL */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-xl flex justify-end"
          >
            {/* Click backdrop to close */}
            <div
              className="absolute inset-0"
              onClick={() => setMenuOpen(false)}
            />

            {/* Slide-over Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              data-lenis-prevent
              className="relative z-10 w-full max-w-xl h-full h-dvh bg-[#1E1700] border-l border-[#D7D4BD]/20 shadow-2xl flex flex-col justify-between p-5 sm:p-10 overflow-y-auto overscroll-contain"
            >
              {/* Drawer Top Bar */}
              <div className="flex items-center justify-between pb-6 border-b border-[#D7D4BD]/15">
                <div className="flex flex-col">
                  <span className="font-serif text-xl sm:text-2xl text-[#F4F3EA] font-light tracking-widest">
                    AURELIA <span className="text-[#9D9970]">&amp;</span> CO.
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-semibold">
                    Global Sanctuary Index
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setMenuOpen(false)}
                  className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-[#D7D4BD]/20 text-[#9D9970] hover:text-[#F4F3EA] transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Links List */}
              <nav className="py-6 sm:py-8 space-y-1 sm:space-y-2">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * idx, duration: 0.3 }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(link.href)}
                      className="group w-full flex items-center justify-between py-3 px-4 rounded-xl hover:bg-white/5 transition-all text-left cursor-pointer"
                    >
                      <div className="flex items-baseline gap-4">
                        <span className="text-xs font-mono text-[#9D9970] font-medium">
                          {link.number}
                        </span>
                        <span className="font-serif text-xl sm:text-2xl text-[#F4F3EA] group-hover:text-[#9D9970] transition-colors font-light">
                          {link.label}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#9D9970] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </button>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer Bottom Actions: Schedule CTA & Global Desks */}
              <div className="pt-6 border-t border-[#D7D4BD]/15 space-y-6">
                {/* Schedule Viewing Primary Button */}
                <FlipButton
                  from="top"
                  tapScale={0.97}
                  onClick={handleScheduleClick}
                  className="w-full shadow-xl shadow-[#9D9970]/25 cursor-pointer"
                >
                  <FlipButtonFront className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-[#9D9970] text-[#1E1700] font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span>Request Private Viewing</span>
                    <ArrowRight className="w-4 h-4" />
                  </FlipButtonFront>
                  <FlipButtonBack className="w-full flex items-center justify-center gap-3 py-3.5 px-6 rounded-full bg-[#BCB893] text-[#1E1700] font-mono text-xs uppercase tracking-[0.2em] font-semibold">
                    <span>Reserve Time & Date →</span>
                  </FlipButtonBack>
                </FlipButton>

                {/* Direct Contacts & Global Coordinates */}
                <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-4 text-xs font-mono text-[#A9A68A]">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#9D9970] block mb-1">
                      Beverly Hills Desk
                    </span>
                    <a
                      href="tel:+13108924400"
                      className="hover:text-[#F4F3EA] transition-colors block text-[#F4F3EA]/80 font-sans"
                    >
                      +1 (310) 892-4400
                    </a>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#9D9970] block mb-1">
                      Confidential Advisory
                    </span>
                    <a
                      href="mailto:private@aurelia.com"
                      className="hover:text-[#F4F3EA] transition-colors block text-[#F4F3EA]/80 font-sans truncate"
                    >
                      private@aurelia.com
                    </a>
                  </div>
                </div>

                {/* Footer Legal Note */}
                <div className="text-[10px] font-mono text-[#A9A68A]/60 flex items-center justify-between">
                  <span>&copy; {new Date().getFullYear()} AURELIA &amp; CO.</span>
                  <span>CONFIDENTIAL</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
