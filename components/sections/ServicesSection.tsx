"use client";

import React from "react";
import {
  Home,
  Building,
  KeyRound,
  FileCheck2,
  TrendingUp,
  Settings,
  Calculator,
  Compass,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";

export function ServicesSection() {
  const services = [
    {
      id: "residential-buying",
      title: "Residential Property Buying",
      desc: "Exclusive representation for acquiring prime architectural estates, coastal villas, and high-rise penthouses with full title guarantee.",
      icon: Home,
    },
    {
      id: "commercial-real-estate",
      title: "Commercial Real Estate",
      desc: "Institutional acquisition and disposition of trophy office towers, prime luxury retail, and hospitality assets across key capitals.",
      icon: Building,
    },
    {
      id: "property-selling",
      title: "Property Selling",
      desc: "Bespoke global marketing strategies reaching ultra-high-net-worth buyers, sovereign family offices, and verified collectors.",
      icon: KeyRound,
    },
    {
      id: "property-rental",
      title: "Property Rental",
      desc: "Curated long-term luxury leasing services for international executives, diplomats, and bespoke seasonal estates.",
      icon: FileCheck2,
    },
    {
      id: "investment-consulting",
      title: "Real Estate Investment Consulting",
      desc: "Quantitative cash flow analysis, cap rate modeling, risk-adjusted underwriting, and tax-advantaged portfolio diversification.",
      icon: TrendingUp,
    },
    {
      id: "property-management",
      title: "Property Management",
      desc: "Comprehensive asset stewardship, preventative maintenance oversight, tenant relations, and financial reporting.",
      icon: Settings,
    },
    {
      id: "property-valuation",
      title: "Property Valuation",
      desc: "Certified appraisal and market benchmarking based on proprietary transaction comparables and architectural pedigree.",
      icon: Calculator,
    },
    {
      id: "real-estate-advisory",
      title: "Real Estate Advisory",
      desc: "Strategic guidance on cross-border transactions, 1031 exchanges, sovereign regulations, and generational estate planning.",
      icon: Compass,
    },
  ];

  return (
    <section id="services" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-b border-[#8C5A30]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#8C5A30]/25">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
              <span>Section 07 • Bespoke Advisory</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
              Our Professional <br />
              <span className="italic font-normal text-[#7F4F24]">
                Real Estate Services.
              </span>
            </h2>
          </div>

          <p className="text-[#2D2018] text-sm max-w-sm font-normal leading-relaxed">
            Full-spectrum real estate advisory engineered for high-net-worth individuals, family offices, and institutional investors.
          </p>
        </div>

        {/* 8 Services Grid with High-Contrast Typography */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="group relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl bg-white border border-[#D8C3AC] hover:border-[#7F4F24] transition-all duration-300 shadow-md shadow-[#2D1A0B]/6 hover:shadow-2xl hover:shadow-[#2D1A0B]/14"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#8C5A30]/15 border border-[#8C5A30]/30 flex items-center justify-center text-[#7F4F24] mb-4 group-hover:scale-105 group-hover:bg-[#7F4F24] group-hover:text-white transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#6B3F1B] font-bold block mb-1.5">
                    Service 0{index + 1}
                  </span>

                  <h3 className="font-serif text-xl text-[#120C08] font-medium group-hover:text-[#7F4F24] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#2D2018] font-normal leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#8C5A30]/20">
                  <a
                    href="#schedule-meeting"
                    className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#7F4F24] hover:text-[#120C08] transition-colors group/link font-bold"
                  >
                    <span>Inquire Now</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
