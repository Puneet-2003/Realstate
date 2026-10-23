"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowRight, Phone, Calendar, Sparkles } from "lucide-react";

interface NavbarProps {
  onOpenBooking: () => void;
}

export function Navbar({ onOpenBooking }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Toggle navbar translucency
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Track active section
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#050505]/80 backdrop-blur-xl border-b border-white/10 py-3.5 shadow-2xl shadow-black/80"
            : "bg-gradient-to-b from-black/80 via-black/20 to-transparent py-5"
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

            {/* Center: Apple-style Pill Navigation */}
            <nav className="hidden md:flex items-center space-x-1 border border-white/10 rounded-full px-4 py-1.5 bg-black/40 backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3.5 py-1 text-xs uppercase tracking-widest transition-all duration-300 rounded-full cursor-pointer ${
                      isActive
                        ? "text-[#C6A76B] font-semibold bg-white/10 shadow-sm"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right: Book a Private Visit CTA */}
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/442079460912?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20The%20Lumi%C3%A8re%20private%20residences."
                target="_blank"
                rel="noopener noreferrer"
                className="hidden xl:flex items-center gap-2 text-xs uppercase tracking-wider text-white/50 hover:text-[#C6A76B] transition-colors"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Private Desk</span>
              </a>

              <button
                type="button"
                onClick={onOpenBooking}
                className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#C6A76B] hover:bg-[#d8be85] transition-all duration-300 shadow-lg shadow-[#C6A76B]/20 hover:scale-[1.02] cursor-pointer"
              >
                <span>Book a Private Visit</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>

              {/* Mobile Hamburger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-white/80 hover:text-white rounded-lg hover:bg-white/5 focus:outline-none cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-8 px-6 md:hidden animate-in fade-in duration-200">
          <div className="flex flex-col space-y-4">
            <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-[#C6A76B]">
              Navigation
            </span>
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-2xl font-serif text-white hover:text-[#C6A76B] transition-colors py-2 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="space-y-4 pt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3.5 rounded-full text-center text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] text-black shadow-xl"
            >
              Book a Private Visit
            </button>

            <div className="flex items-center justify-between text-xs font-mono text-white/40 pt-2">
              <span>THE LUMIÈRE TOWER</span>
              <span className="text-[#C6A76B]">68 FLOORS</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
