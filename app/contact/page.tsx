"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  ShieldCheck,
  Send,
  CheckCircle2,
  Phone,
  Mail,
  Lock,
} from "lucide-react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [targetMarket, setTargetMarket] = useState("California (Bel Air / Malibu)");
  const [budget, setBudget] = useState("$25M – $50M");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please provide your name and contact email address.");
      return;
    }
    setErrorMsg("");
    setIsSubmitted(true);
  };

  const offices = [
    {
      city: "London (Mayfair)",
      address: "14 Berkeley Square, Mayfair, London W1J 6BQ",
      tel: "+44 20 7946 0912",
      hours: "09:00 – 19:00 GMT",
      lead: "Lord Julian Vance-Garrick Office",
    },
    {
      city: "New York (Midtown)",
      address: "767 Fifth Avenue, 42nd Floor, New York, NY 10153",
      tel: "+1 212 555 0198",
      hours: "09:00 – 18:30 EST",
      lead: "Aurelia Sterling Desk",
    },
    {
      city: "Zurich (Bahnhofstrasse)",
      address: "Bahnhofstrasse 28, 8001 Zürich, Switzerland",
      tel: "+41 44 211 8840",
      hours: "08:30 – 18:00 CET",
      lead: "Henrik Van Der Bilt Salon",
    },
    {
      city: "Dubai (DIFC)",
      address: "Gate Village, Building 04, Level 06, DIFC, Dubai",
      tel: "+971 4 362 7700",
      hours: "09:00 – 19:00 GST",
      lead: "Tariq Al-Mansoor Suite",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Private Discretionary Desk</span>
            </div>
            <h1 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight leading-[1.08]">
              Connect with Our <br />
              <span className="italic font-normal text-gold-gradient">Global Senior Partners.</span>
            </h1>
            <p className="mt-6 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
              We welcome inquiries from private collectors, family offices, and sovereign wealth representatives.
              All communications are strictly protected by bilateral non-disclosure agreements.
            </p>
          </div>

          {/* Form & Offices Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Left: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#0d0d12] border border-[#c5a880]/30 shadow-2xl">
                <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
                  <div>
                    <h3 className="font-serif text-2xl text-white">Confidential Inquiry Dossier</h3>
                    <p className="text-xs text-zinc-400 mt-1">Directly received by Senior Advisory Partners</p>
                  </div>
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] text-zinc-300 font-mono">
                    <Lock className="w-3 h-3 text-[#c5a880]" />
                    <span>256-Bit Encrypted</span>
                  </div>
                </div>

                {isSubmitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 border border-[#c5a880] flex items-center justify-center mx-auto mb-4 text-[#c5a880]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                      Inquiry Received
                    </span>
                    <h4 className="text-2xl font-serif text-white mt-2">
                      Thank You, {name}
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-300 mt-3 max-w-md mx-auto leading-relaxed">
                      A Senior Advisory Partner will reach out via your preferred secure channel within four hours.
                    </p>
                    <a
                      href="https://wa.me/442079460912?text=Hello%20Aurelia%20Private%20Desk"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#c5a880] text-black"
                    >
                      <span>Direct WhatsApp Fast-Track</span>
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-lg bg-red-900/40 border border-red-500/40 text-xs text-red-200">
                        {errorMsg}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                          Full Legal Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Lord / Lady / Mr / Ms..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#c5a880] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="principal@familyoffice.com"
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#c5a880] transition-colors"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                          Direct Phone / WhatsApp
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+44 / +1 / +41..."
                          className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#c5a880] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                          Target Region
                        </label>
                        <select
                          value={targetMarket}
                          onChange={(e) => setTargetMarket(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-[#14141e] border border-white/10 text-zinc-200 text-xs sm:text-sm focus:outline-none focus:border-[#c5a880] transition-colors cursor-pointer"
                        >
                          <option value="California (Bel Air / Malibu)">California (Bel Air / Malibu)</option>
                          <option value="New York (Manhattan Penthouse)">New York (Manhattan Penthouse)</option>
                          <option value="French Riviera (Cote d'Azur)">French Riviera (Côte d&apos;Azur)</option>
                          <option value="Swiss Alps (St. Moritz / Gstaad)">Swiss Alps (St. Moritz / Gstaad)</option>
                          <option value="Italian Lakes (Lake Como)">Italian Lakes (Lake Como)</option>
                          <option value="Dubai & Middle East Waterfront">Dubai &amp; Middle East Waterfront</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                        Budget Allocation Parameters
                      </label>
                      <select
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#14141e] border border-white/10 text-zinc-200 text-xs sm:text-sm focus:outline-none focus:border-[#c5a880] transition-colors cursor-pointer"
                      >
                        <option value="Under $25,000,000">Under $25,000,000</option>
                        <option value="$25M – $50M">$25,000,000 – $50,000,000</option>
                        <option value="$50M – $100M">$50,000,000 – $100,000,000</option>
                        <option value="$100M+ Sovereign / Master Estate">$100M+ Sovereign / Master Estate</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                        Specific Architectural Criteria &amp; Discretion Directives
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Detail specific preferences: cantilever infinity pools, helipad requirements, historic provenance, or particular architects..."
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs sm:text-sm focus:outline-none focus:border-[#c5a880] transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all shadow-xl shadow-[#c5a880]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-4 h-4" />
                      <span>Transmit Confidential Dossier</span>
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Global Advisory Suites */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-6 rounded-2xl bg-[#0f0f16] border border-white/10">
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
                  Global Headquarters
                </span>
                <h4 className="text-xl font-serif text-white mt-1">Aurelia &amp; Co. Private Office</h4>
                <div className="mt-4 space-y-2 text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>Global Concierge: +44 20 7946 0912</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-[#c5a880]" />
                    <span>advisory@aureliaprivateestates.com</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest text-zinc-400 block font-semibold">
                  Regional Advisory Suites
                </span>
                {offices.map((office) => (
                  <div
                    key={office.city}
                    className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <h5 className="font-serif text-base text-white">{office.city}</h5>
                      <span className="text-[10px] text-[#c5a880] font-mono">{office.hours}</span>
                    </div>
                    <p className="text-xs text-zinc-400 mt-1">{office.address}</p>
                    <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-zinc-400">
                      <span>{office.tel}</span>
                      <span className="text-zinc-500 text-[11px]">{office.lead}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
