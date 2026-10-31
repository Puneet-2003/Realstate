"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  RippleButton,
  RippleButtonRipples,
} from "@animate-ui/react/primitives/buttons/ripple";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smooth scroll progress spring bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      const sections = [
        { id: "overview", el: document.getElementById("journey") },
        { id: "story", el: document.getElementById("story") },
        { id: "architecture", el: document.getElementById("architecture") },
        { id: "residences", el: document.getElementById("residences") },
        { id: "amenities", el: document.getElementById("amenities") },
        { id: "location", el: document.getElementById("location") },
        { id: "inquire", el: document.getElementById("inquire") },
      ];

      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.el && sec.el.offsetTop <= scrollPos) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Overview", href: "#journey", id: "overview" },
    { label: "Architecture", href: "#architecture", id: "architecture" },
    { label: "Residences", href: "#residences", id: "residences" },
    { label: "Amenities", href: "#amenities", id: "amenities" },
    { label: "Location", href: "#location", id: "location" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Subtle Spring Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#C6A76B] via-[#F5F0E8] to-[#C6A76B] origin-left z-[60] pointer-events-none"
      />

      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/85 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80"
            : "bg-gradient-to-b from-black/85 via-black/25 to-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Project Identity */}
            <a
              href="#journey"
              onClick={(e) => handleNavClick(e, "#journey")}
              className="group flex flex-col items-start focus:outline-none cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <span className="font-serif text-xl sm:text-2xl font-light tracking-[0.22em] text-white transition-colors duration-300 group-hover:text-[#C6A76B]">
                  THE LUMIÈRE
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A76B]" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.35em] text-[#F5F0E8]/50 font-mono -mt-0.5">
                Private Residences &amp; Penthouses
              </span>
            </a>

            {/* Center: Apple-style Pill Navigation with Framer Motion Layout Animation */}
            <nav className="hidden md:flex items-center space-x-1 border border-white/10 rounded-full p-1 bg-black/40 backdrop-blur-md relative">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`relative px-4 py-1 text-xs uppercase tracking-widest transition-colors duration-300 rounded-full cursor-pointer z-10 ${
                      isActive
                        ? "text-[#C6A76B] font-semibold"
                        : "text-white/70 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-nav-indicator"
                        className="absolute inset-0 bg-white/10 rounded-full border border-[#C6A76B]/30"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </a>
                );
              })}
            </nav>

            {/* Right: Book a Private Visit CTA & Animate UI Tooltip */}
            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <a
                    href="https://wa.me/442079460912?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20The%20Lumi%C3%A8re%20private%20residences."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hidden xl:flex items-center gap-2 text-xs uppercase tracking-wider text-white/60 hover:text-[#C6A76B] transition-colors px-3 py-1.5 rounded-full border border-white/5 hover:border-[#C6A76B]/30 bg-white/[0.02]"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Private Desk</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent className="bg-[#0e0e14] border-[#C6A76B]/40 text-white text-xs max-w-xs p-3 shadow-xl">
                  <div className="flex items-center gap-1.5 text-[#C6A76B] font-mono text-[10px] uppercase tracking-wider mb-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Direct Concierge Portal</span>
                  </div>
                  <p className="text-[11px] text-white/80 leading-snug">
                    Encrypted priority line to our senior residential director. Typical response under 5 minutes.
                  </p>
                </TooltipContent>
              </Tooltip>

              {/* Animate UI Ripple Button */}
              <RippleButton
                onClick={onOpenBooking}
                hoverScale={1.03}
                tapScale={0.97}
                className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#C6A76B] hover:bg-[#d8be85] transition-colors duration-300 shadow-lg shadow-[#C6A76B]/20 cursor-pointer overflow-hidden"
              >
                <RippleButtonRipples color="rgba(255, 255, 255, 0.4)" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>Book a Private Visit</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </RippleButton>

              {/* Animate UI Animated Sheet Mobile Navigation */}
              <div className="md:hidden">
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                  <SheetTrigger asChild>
                    <button
                      type="button"
                      className="p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none cursor-pointer"
                      aria-label="Toggle Navigation Menu"
                    >
                      <Menu className="w-6 h-6" />
                    </button>
                  </SheetTrigger>
                  <SheetContent
                    side="right"
                    className="w-full sm:max-w-md bg-[#070709] border-white/10 p-6 flex flex-col justify-between text-white"
                  >
                    <div>
                      <SheetHeader className="p-0 mb-8 text-left">
                        <SheetTitle className="font-serif text-2xl tracking-[0.15em] text-[#C6A76B] uppercase font-light">
                          THE LUMIÈRE
                        </SheetTitle>
                        <span className="text-[10px] font-mono tracking-[0.25em] text-white/40 uppercase">
                          Private Residences &amp; Penthouses
                        </span>
                      </SheetHeader>

                      <div className="flex flex-col space-y-4">
                        <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C6A76B]">
                          Explore Architecture
                        </span>
                        {navLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-2xl font-serif text-white hover:text-[#C6A76B] transition-colors py-2.5 border-b border-white/5"
                          >
                            {link.label}
                          </a>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t border-white/10">
                      <RippleButton
                        onClick={() => {
                          setMobileMenuOpen(false);
                          onOpenBooking();
                        }}
                        className="w-full py-3.5 rounded-full text-center text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] text-black shadow-xl cursor-pointer"
                      >
                        <RippleButtonRipples color="rgba(255, 255, 255, 0.4)" />
                        <span className="relative z-10">Book a Private Visit</span>
                      </RippleButton>

                      <div className="flex items-center justify-between text-xs font-mono text-white/40 pt-2">
                        <span>THE LUMIÈRE TOWER</span>
                        <span className="text-[#C6A76B]">68 FLOORS</span>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  );
}
