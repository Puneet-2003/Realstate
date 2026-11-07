"use client";

import React from "react";
import {
  ShieldCheck,
  Award,
  FileCheck,
  Scale,
  Sparkles,
  CheckCircle2,
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
      desc: "Full forensic examination of chain of title, encumbrances, and historic architectural provenance.",
    },
    {
      step: "02",
      title: "Physical & Seismic Engineering",
      desc: "Independent structural, mechanical, environmental, and soil stability engineering clearances.",
    },
    {
      step: "03",
      title: "Independent Valuation Modeling",
      desc: "Dual appraisal reconciling private off-market comparables and replacement construction metrics.",
    },
    {
      step: "04",
      title: "Direct Principal Verification",
      desc: "Direct confirmation of seller legal capacity and sovereign authority to convey fee simple title.",
    },
  ];

  return (
    <section id="trust" className="py-24 sm:py-32 bg-[#F4F3EA] relative overflow-hidden border-b border-[#D7D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
            <span>Fiduciary Integrity • Legal Verification</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2712] font-light tracking-tight">
            Institutional Trust &amp; <br />
            <span className="italic text-[#9D9970]">
              Due Diligence Protocol.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6F6C55] font-light leading-relaxed max-w-xl mx-auto">
            Operating under rigorous international fiduciary standards with certified licenses, bonded escrows, and accredited legal partners.
          </p>
        </div>

        {/* 4-Step Diligence Process */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {verificationSteps.map((item) => (
            <div
              key={item.step}
              className="p-6 rounded-2xl bg-[#E7E5D4]/40 border border-[#D7D4BD] hover:border-[#9D9970]/60 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="font-serif text-3xl text-[#9D9970] font-light block mb-3">
                  {item.step}
                </span>
                <h3 className="font-serif text-xl text-[#2B2712] font-normal tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-2.5 text-xs text-[#6F6C55] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-[#D7D4BD]/70 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#9D9970]">
                <CheckCircle2 className="w-3 h-3 text-[#9D9970]" />
                <span>Audited Standard</span>
              </div>
            </div>
          ))}
        </div>

        {/* Legal License Grid & Global Affiliations */}
        <div className="rounded-2xl bg-[#E7E5D4]/60 border border-[#D7D4BD] p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center divide-y md:divide-y-0 md:divide-x divide-[#D7D4BD]">
            {/* Left: Licenses */}
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9D9970] font-semibold block">
                Fiduciary Compliance &amp; Licenses
              </span>
              <div className="space-y-3">
                {credentials.map((c) => (
                  <div key={c.label} className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 text-xs">
                    <span className="text-[#2B2712] font-medium">{c.label}:</span>
                    <span className="font-mono text-[#6F6C55] text-[11px]">{c.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Partner Network */}
            <div className="pt-6 md:pt-0 md:pl-8 space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#9D9970] font-semibold block">
                Global Architectural &amp; Advisory Network
              </span>
              <div className="flex flex-wrap gap-2">
                {partners.map((p) => (
                  <span
                    key={p}
                    className="px-3.5 py-1.5 rounded-full text-xs font-mono text-[#2B2712] bg-[#F4F3EA] border border-[#D7D4BD] font-light"
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}