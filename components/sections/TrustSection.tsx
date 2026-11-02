"use client";

import React from "react";
import {
  ShieldCheck,
  Award,
  FileCheck,
  Scale,
  Sparkles,
} from "lucide-react";

export function TrustSection() {
  const credentials = [
    { label: "Brokerage License", value: "DRE #01928472 (California Dept of Real Estate)" },
    { label: "Global Affiliation", value: "National Association of Realtors (NAR) Global Institute" },
    { label: "Compliance & AML", value: "FinCEN Tier-1 Fiduciary & Anti-Money Laundering Certified" },
    { label: "Independent Escrow", value: "Bonded Third-Party Institutional Trust & Escrow Holding" },
  ];

  const partners = [
    "Architectural Digest Global",
    "Sotheby's International Network",
    "Christie's International Real Estate",
    "Luxury Portfolio International",
    "Who's Who in Luxury Real Estate",
  ];

  const verificationSteps = [
    {
      step: "01",
      title: "Title & Provenance Audit",
      desc: "Full forensic examination of chain of title, encumbrances, and historic provenance.",
    },
    {
      step: "02",
      title: "Physical & Seismic Engineering",
      desc: "Independent structural, mechanical, environmental, and soil stability clearance.",
    },
    {
      step: "03",
      title: "Independent Valuation Modeling",
      desc: "Dual appraisal reconciling historical comparables and replacement construction metrics.",
    },
    {
      step: "04",
      title: "Direct Principal Verification",
      desc: "Direct confirmation of seller legal capacity and authority to convey fee simple title.",
    },
  ];

  return (
    <section id="trust" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-b border-[#D8C3AC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
            <span>Section 10 • Institutional Credibility</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
            Trust &amp; Verified <br />
            <span className="italic font-normal text-[#7F4F24]">
              Fiduciary Standards.
            </span>
          </h2>
          <p className="mt-4 text-sm text-[#2D2018] font-normal leading-relaxed max-w-xl mx-auto">
            Every transaction is backed by verified legal registrations, audited credentials, and globally recognized real estate affiliations.
          </p>
        </div>

        {/* Credentials & Verified Listings Process Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Official Registrations & Awards */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-white border border-[#D8C3AC] shadow-md shadow-[#2D1A0B]/6">
            <div>
              <div className="flex items-center gap-2 text-[#7F4F24] mb-4">
                <ShieldCheck className="w-5 h-5 text-[#7F4F24]" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">
                  Official Licensing &amp; Registration
                </span>
              </div>

              <div className="space-y-3.5">
                {credentials.map((cred) => (
                  <div key={cred.label} className="p-3.5 rounded-xl bg-[#FAF7F2] border border-[#D8C3AC]">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-[#6B3F1B] font-bold block">
                      {cred.label}
                    </span>
                    <span className="text-xs text-[#120C08] block font-semibold mt-0.5">
                      {cred.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards & Recognition Highlight */}
            <div className="mt-8 pt-6 border-t border-[#D8C3AC]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#7F4F24]/10 border border-[#7F4F24]/20 flex items-center justify-center shrink-0 text-[#7F4F24]">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm text-[#120C08] font-semibold font-serif">Best Luxury Brokerage 2025</h4>
                  <span className="text-xs text-[#2D2018]">International Real Estate Excellence Awards, London</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 4-Step Verified Listings Process */}
          <div className="lg:col-span-7 p-8 rounded-3xl bg-white border border-[#D8C3AC] shadow-md shadow-[#2D1A0B]/6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#7F4F24] mb-6">
                <FileCheck className="w-5 h-5 text-[#7F4F24]" />
                <span className="text-xs font-mono uppercase tracking-widest font-bold">
                  Our 4-Stage Listing Verification Protocol
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {verificationSteps.map((step) => (
                  <div key={step.step} className="p-4 rounded-xl bg-[#FAF7F2] border border-[#D8C3AC]">
                    <span className="text-lg font-mono text-[#7F4F24] font-bold block mb-1">
                      {step.step}
                    </span>
                    <h5 className="text-sm font-semibold text-[#120C08] mb-1.5 font-serif">{step.title}</h5>
                    <p className="text-xs text-[#2D2018] font-normal leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction Transparency Guarantee */}
            <div className="mt-8 pt-6 border-t border-[#D8C3AC] flex items-center gap-3 text-xs text-[#120C08]">
              <Scale className="w-4 h-4 text-[#7F4F24] shrink-0" />
              <span>
                <strong className="text-[#7F4F24] font-bold">Zero-Conflict Guarantee:</strong> Dedicated buy-side representation ensuring strict legal loyalty to our client with full commission and disclosure transparency.
              </span>
            </div>
          </div>
        </div>

        {/* Prestigious Global Network Logos / Names Bar */}
        <div className="mt-12 pt-8 border-t border-[#D8C3AC]">
          <span className="text-[10px] font-mono uppercase tracking-widest text-[#6B3F1B] block text-center mb-5 font-bold">
            Institutional Affiliations &amp; Global Publication Partners
          </span>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
            {partners.map((partner) => (
              <span
                key={partner}
                className="text-xs sm:text-sm font-serif uppercase tracking-wider text-[#2D2018] font-semibold hover:text-[#7F4F24] transition-colors"
              >
                {partner}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
