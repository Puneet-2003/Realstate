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
      title: "Residential Property Acquisition",
      desc: "Exclusive fiduciary representation for acquiring prime architectural estates, coastal villas, and high-rise penthouses with complete title guarantee.",
      icon: Home,
    },
    {
      id: "commercial-real-estate",
      title: "Commercial & Hospitality Assets",
      desc: "Institutional acquisition and disposition of trophy office towers, luxury boutique hotels, and flagship retail assets across key financial capitals.",
      icon: Building,
    },
    {
      id: "property-selling",
      title: "Global Private Dispositions",
      desc: "Bespoke global marketing strategies reaching ultra-high-net-worth buyers, sovereign family offices, and verified collectors with absolute privacy.",
      icon: KeyRound,
    },
    {
      id: "property-rental",
      title: "Seasonal & Executive Leases",
      desc: "Curated long-term luxury leasing services for international executives, diplomats, and bespoke seasonal retreats in St. Moritz, Como, and Aspen.",
      icon: FileCheck2,
    },
    {
      id: "investment-consulting",
      title: "Capital & Yield Underwriting",
      desc: "Quantitative cash flow analysis, cap rate modeling, risk-adjusted underwriting, and tax-advantaged portfolio diversification structures.",
      icon: TrendingUp,
    },
    {
      id: "property-management",
      title: "Family Estate Stewardship",
      desc: "Comprehensive asset stewardship, preventative architectural maintenance, staff management, and discrete quarterly financial reporting.",
      icon: Settings,
    },
    {
      id: "property-valuation",
      title: "Certified Architectural Valuation",
      desc: "Certified appraisal and market benchmarking based on proprietary off-market transaction comparables and architect provenance.",
      icon: Calculator,
    },
    {
      id: "real-estate-advisory",
      title: "Cross-Border Wealth Structuring",
      desc: "Strategic guidance on cross-border transactions, 1031 exchanges, foreign investment regulations, and generational estate trusts.",
      icon: Compass,
    },
  ];

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#F4F3EA] relative overflow-hidden border-b border-[#D7D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D7D4BD]">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
              <span>Advisory Portfolio • Private Client Services</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2712] font-light tracking-tight">
              Our Professional <br />
              <span className="italic text-[#9D9970]">
                Real Estate Services.
              </span>
            </h2>
          </div>

          <p className="text-[#6F6C55] text-sm max-w-sm font-light leading-relaxed">
            Full-spectrum real estate advisory engineered for high-net-worth individuals, family offices, and institutional investors.
          </p>
        </div>

        {/* 8 Services Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                className="group relative flex flex-col justify-between p-7 rounded-2xl bg-[#E7E5D4]/40 hover:bg-[#E7E5D4]/80 border border-[#D7D4BD] hover:border-[#9D9970]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#1E1700]/5"
              >
                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#F4F3EA] border border-[#D7D4BD] flex items-center justify-center text-[#9D9970] mb-5 group-hover:scale-105 group-hover:bg-[#1E1700] group-hover:text-[#F4F3EA] transition-all">
                    <Icon className="w-5 h-5" />
                  </div>

                  <span className="text-[10px] font-mono tracking-widest uppercase text-[#9D9970] font-semibold block mb-2">
                    Advisory 0{index + 1}
                  </span>

                  <h3 className="font-serif text-xl text-[#2B2712] font-normal group-hover:text-[#9D9970] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-xs text-[#6F6C55] font-light leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D7D4BD]/70">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-[#2B2712] hover:text-[#9D9970] transition-colors group/link font-medium"
                  >
                    <span>Inquire Privately</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1 text-[#9D9970]" />
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