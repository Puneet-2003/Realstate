"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUp, Mail, Send, CheckCircle2, Phone, MapPin } from "lucide-react";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#150F0A] border-t border-[#C89D5C]/25 text-[#FAF7F2] pt-20 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Tier: Brand, Description & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#C89D5C]/20">
          <div className="lg:col-span-6">
            <Link href="/" className="group inline-flex flex-col items-start focus:outline-none">
              <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.2em] text-[#FAF7F2] group-hover:text-[#DFBD85] transition-colors">
                AURELIA <span className="text-[#C89D5C] font-normal">&amp;</span> CO.
              </span>
              <span className="text-[9px] uppercase tracking-[0.38em] text-[#C89D5C] font-mono -mt-1">
                Luxury Real Estate
              </span>
            </Link>

            <p className="mt-5 text-sm text-[#D8C3AC] font-light leading-relaxed max-w-md">
              A private international real estate brokerage establishing global trust, curating trophy architectural residences, and managing intergenerational property wealth.
            </p>

            <div className="mt-6 flex items-center gap-3 text-[#D8C3AC]">
              {["instagram", "linkedin", "youtube", "twitter"].map((platform) => (
                <div
                  key={platform}
                  className="w-9 h-9 rounded-full bg-[#231811] border border-[#C89D5C]/30 flex items-center justify-center text-[#DFBD85] hover:text-white hover:border-[#DFBD85] transition-colors cursor-pointer"
                >
                  <span className="text-xs uppercase font-mono">{platform[0]}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#DFBD85] block mb-2 font-semibold">
                Private Advisory Gazette
              </span>
              <h4 className="font-serif text-2xl text-[#FAF7F2] font-light">
                Receive Off-Market Property Intelligence
              </h4>
              <p className="text-xs text-[#D8C3AC] font-light mt-1.5 leading-relaxed">
                Curated quarterly market telemetry, unlisted pocket estate opportunities, and architectural appraisals.
              </p>
            </div>

            <div className="mt-6">
              {!subscribed ? (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-[#C89D5C] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="principal@familyoffice.com"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-xs text-[#FAF7F2] placeholder-[#8C7B70] focus:outline-none focus:border-[#DFBD85] transition-colors"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-[#C89D5C] via-[#DFBD85] to-[#C89D5C] text-[#18110B] transition-all flex items-center justify-center gap-1.5 cursor-pointer shrink-0 shadow-md"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5 text-[#18110B]" />
                  </button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-xs text-[#DFBD85] font-mono">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-[#C89D5C]" />
                  <span>Subscribed. You will receive private quarterly briefs.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Middle Tier: 4-Column Navigation Links */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 border-b border-[#C89D5C]/20 text-xs">
          {/* Quick Navigation */}
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#DFBD85] font-semibold mb-4">
              Quick Navigation
            </h5>
            <ul className="space-y-2.5 text-[#D8C3AC] font-light">
              <li><a href="/#hero" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="/#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="/#properties" className="hover:text-white transition-colors">Properties</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Our Services</a></li>
              <li><a href="/#why-choose-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="/#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="/#contact" className="hover:text-white transition-colors">Contact</a></li>
              <li><a href="/#schedule-meeting" className="text-[#DFBD85] hover:underline font-medium">Schedule a Meeting</a></li>
            </ul>
          </div>

          {/* Property Categories */}
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#DFBD85] font-semibold mb-4">
              Property Categories
            </h5>
            <ul className="space-y-2.5 text-[#D8C3AC] font-light">
              <li><Link href="/properties?category=Luxury+Villa" className="hover:text-white transition-colors">Luxury Villas</Link></li>
              <li><Link href="/properties?category=Modern+Penthouse" className="hover:text-white transition-colors">Modern Penthouses</Link></li>
              <li><Link href="/properties?category=Waterfront+Estate" className="hover:text-white transition-colors">Waterfront Estates</Link></li>
              <li><Link href="/properties?category=Architectural+Icon" className="hover:text-white transition-colors">Architectural Icons</Link></li>
              <li><Link href="/properties?type=Buy" className="hover:text-white transition-colors">Buy Property</Link></li>
              <li><Link href="/properties?type=Rent" className="hover:text-white transition-colors">Rent / Lease</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#DFBD85] font-semibold mb-4">
              Our Services
            </h5>
            <ul className="space-y-2.5 text-[#D8C3AC] font-light">
              <li><a href="/#services" className="hover:text-white transition-colors">Residential Buying</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Commercial Real Estate</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Property Selling</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Property Rental</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Investment Consulting</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Property Valuation</a></li>
              <li><a href="/#services" className="hover:text-white transition-colors">Real Estate Advisory</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h5 className="font-mono text-[10px] uppercase tracking-widest text-[#DFBD85] font-semibold mb-4">
              Headquarters
            </h5>
            <div className="space-y-2.5 text-[#D8C3AC] font-light leading-relaxed">
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C89D5C] shrink-0 mt-0.5" />
                <span>450 N Canon Drive, Penthouse Suite, Beverly Hills, CA 90210</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#C89D5C] shrink-0" />
                <a href="tel:+13108924400" className="hover:text-white">+1 (310) 892-4400</a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C89D5C] shrink-0" />
                <a href="mailto:private@aurelia.com" className="hover:text-white">private@aurelia.com</a>
              </p>
              <p className="text-[11px] text-[#8C7B70] pt-1 font-mono">
                Mon – Fri: 08:00 – 19:00 PST
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Tier: Copyright, Legal & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#8C7B70]">
          <p className="font-light">
            &copy; 2026 Aurelia &amp; Co. Luxury Real Estate Brokerage. All rights reserved. Equal Housing Opportunity.
          </p>

          <div className="flex items-center gap-5 flex-wrap">
            <span className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Terms &amp; Conditions</span>
            <span className="hover:text-[#FAF7F2] transition-colors cursor-pointer">Cookie Policy</span>
            <button
              type="button"
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-[#DFBD85] hover:text-white transition-colors cursor-pointer ml-auto sm:ml-0 font-semibold"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
