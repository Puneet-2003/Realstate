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
    <section id="why-choose-us" className="py-20 sm:py-28 bg-[#F5EFEB] relative overflow-hidden border-b border-[#8C5A30]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
            <span>Section 06 • Uncompromising Trust</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
            Why Discerning Clients <br />
            <span className="italic font-normal text-[#7F4F24]">
              Choose Aurelia &amp; Co.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#2D2018] font-normal leading-relaxed max-w-xl mx-auto">
            A reputation forged through discreet excellence, uncompromised fiduciary duty, and verifiable transaction records.
          </p>
        </div>

        {/* 6 Pillars Grid with Solid Contrast & Dark Legible Typography */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="group relative p-8 rounded-2xl bg-white border border-[#D8C3AC] hover:border-[#7F4F24] transition-all duration-300 shadow-md shadow-[#2D1A0B]/6 hover:shadow-2xl hover:shadow-[#2D1A0B]/14 flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#8C5A30]/15 border border-[#8C5A30]/30 flex items-center justify-center mb-5 group-hover:scale-105 group-hover:bg-[#7F4F24] group-hover:text-white transition-all text-[#7F4F24]">
                    <Icon className="w-6 h-6" />
                  </div>

                  {/* Title: Deep, sharp espresso black with medium weight for crystal clear readability */}
                  <h3 className="font-serif text-xl sm:text-2xl text-[#120C08] font-medium tracking-tight group-hover:text-[#7F4F24] transition-colors leading-snug">
                    {pillar.title}
                  </h3>

                  {/* Description: High-contrast rich body text */}
                  <p className="mt-3 text-xs sm:text-sm text-[#2D2018] font-normal leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#8C5A30]/20 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-[#6B3F1B]">
                  <span className="font-bold">Pillar 0{idx + 1}</span>
                  <span className="text-[#7F4F24] font-semibold">Certified Standard</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
