"use client";

import React from "react";
import {
  ShieldCheck,
  Award,
  Scale,
  Sparkles,
  TrendingUp,
  UserCheck,
} from "lucide-react";
import { motion } from "motion/react";

export function WhyChooseUs() {
  const pillars = [
    {
      id: "verified",
      title: "Verified Property Listings",
      desc: "Every residence undergoes rigorous title verification, physical engineering inspections, and environmental compliance audits prior to listing.",
      icon: ShieldCheck,
    },
    {
      id: "experienced",
      title: "Experienced Real Estate Professionals",
      desc: "Our senior partners bring an average of 16+ years in private family office acquisitions, high-yield commercial assets, and prime estates.",
      icon: Award,
    },
    {
      id: "transparent",
      title: "Transparent Transactions",
      desc: "Strict adherence to fiduciary integrity with transparent fee structures, clear legal disclosures, and zero hidden terms.",
      icon: Scale,
    },
    {
      id: "personalized",
      title: "Personalized Consultation",
      desc: "Dedicated bespoke advisory matching your investment thesis, lifestyle preferences, and global tax architecture.",
      icon: Sparkles,
    },
    {
      id: "market",
      title: "Market Knowledge",
      desc: "Proprietary predictive analytics, micro-market liquidity telemetry, and privileged access to private off-market pocket listings.",
      icon: TrendingUp,
    },
    {
      id: "client",
      title: "Client-Focused Approach",
      desc: "End-to-end white-glove service from confidential private viewings to closing, deed transfer, and ongoing property asset stewardship.",
      icon: UserCheck,
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 sm:py-32 bg-[#E7E5D4]/40 relative overflow-hidden border-b border-[#D7D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
            <span>Pillars of Distinction • Certified Standards</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2712] font-light tracking-tight">
            Why Discerning Clients <br />
            <span className="italic text-[#9D9970]">
              Choose Aurelia &amp; Co.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6F6C55] font-light leading-relaxed max-w-xl mx-auto">
            A reputation forged through discreet excellence, uncompromised fiduciary duty, and verifiable transaction records.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: idx * 0.06 }}
                className="p-8 rounded-2xl bg-[#F4F3EA] border border-[#D7D4BD] hover:border-[#9D9970]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#1E1700]/5 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#E7E5D4] border border-[#D7D4BD] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5 text-[#9D9970]" />
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2B2712] font-normal tracking-tight group-hover:text-[#9D9970] transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-[#6F6C55] font-light leading-relaxed mt-3">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-[#D7D4BD]/70 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#9D9970]">
                  <span>Pillar 0{idx + 1}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">Certified</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}