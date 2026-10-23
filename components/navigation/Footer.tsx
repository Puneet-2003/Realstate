"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Send, CheckCircle2 } from "lucide-react";
import { PROPERTY_CATEGORIES } from "@/lib/properties";

export function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.includes("@")) {
      setNewsletterSuccess(true);
      setNewsletterEmail("");
    }
  };

  const offices = [
    { city: "London", address: "14 Berkeley Square, Mayfair" },
    { city: "New York", address: "767 Fifth Avenue, Midtown" },
    { city: "Zurich", address: "Bahnhofstrasse 28" },
    { city: "Dubai", address: "Gate Village 04, DIFC" },
  ];

  return (
    <footer className="bg-[#050507] border-t border-white/10 text-zinc-400 text-xs font-light">
      {/* Upper Newsletter & Brand Desk */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-block focus:outline-none">
              <span className="font-serif text-2xl font-light tracking-[0.25em] text-white">
                AURELIA <span className="text-[#c5a880]">&amp;</span> CO.
              </span>
              <span className="block text-[10px] uppercase tracking-[0.35em] text-zinc-400 font-mono mt-0.5">
                Private Estates &amp; Advisory
              </span>
            </Link>

            <p className="mt-4 text-xs sm:text-sm text-zinc-400 font-light max-w-md leading-relaxed">
              Curators of irreplaceable architectural pedigree, cantilevered coastal sanctuaries,
              and prime capital preservation worldwide. Operating with absolute discretion.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://wa.me/442079460912?text=Hello%20Aurelia%20Estates"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#c5a880] text-zinc-200 hover:text-white transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>WhatsApp Private Desk</span>
              </a>

              <Link
                href="/contact"
                className="px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:border-[#c5a880] text-zinc-200 hover:text-white transition-colors"
              >
                Encrypted Inquiry
              </Link>
            </div>
          </div>

          {/* Newsletter / Private Dispatch */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#09090e] border border-white/10">
              <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
                Private Dispatch
              </span>
              <h4 className="text-xl font-serif text-white mt-1">
                The Aurelia Quarterly Architectural Monograph
              </h4>
              <p className="text-xs text-zinc-400 mt-1 max-w-lg leading-relaxed">
                Receive confidential off-market architectural listings, prime market intelligence, and
                collector features directly to your executive inbox.
              </p>

              {newsletterSuccess ? (
                <div className="mt-4 flex items-center gap-2 text-xs text-[#c5a880]">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>You have been added to our private confidential dispatch.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="mt-4 flex flex-col sm:flex-row gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your confidential email..."
                    className="flex-1 px-4 py-2.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Links & Global Offices Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-b border-white/10">
          {/* Navigation */}
          <div>
            <h5 className="text-[11px] uppercase tracking-widest text-white font-semibold mb-4">
              Navigation
            </h5>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/properties" className="hover:text-white transition-colors">Curated Portfolio</Link>
              </li>
              <li>
                <Link href="/properties?type=Buy" className="hover:text-white transition-colors">Acquisitions (Buy)</Link>
              </li>
              <li>
                <Link href="/properties?type=Rent" className="hover:text-white transition-colors">Prime Leases (Rent)</Link>
              </li>
              <li>
                <Link href="/#showcase-3d" className="hover:text-white transition-colors">3D Villa Visualizer</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">Heritage &amp; Leadership</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">Private Advisory Desk</Link>
              </li>
            </ul>
          </div>

          {/* Typologies */}
          <div>
            <h5 className="text-[11px] uppercase tracking-widest text-white font-semibold mb-4">
              Typologies
            </h5>
            <ul className="space-y-2.5">
              {PROPERTY_CATEGORIES.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/properties?category=${encodeURIComponent(cat.category)}`}
                    className="hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Global Private Suites */}
          <div className="col-span-2">
            <h5 className="text-[11px] uppercase tracking-widest text-white font-semibold mb-4">
              Global Private Suites
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {offices.map((office) => (
                <div key={office.city} className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                  <span className="text-white font-medium block text-xs">{office.city}</span>
                  <span className="text-[11px] text-zinc-400 block mt-0.5">{office.address}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-400">
          <div>
            &copy; 2026 Aurelia &amp; Co. Private Estates Limited. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">Privacy Notice</Link>
            <Link href="/about" className="hover:text-white transition-colors">Terms of Representation</Link>
            <Link href="/about" className="hover:text-white transition-colors">Regulatory Compliance</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
