"use client";

import React from "react";
import { motion } from "motion/react";
import { Award, Building2, Users2, Landmark, TrendingUp } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/animation";
import { EASING } from "@/lib/animations";

export function CompanyStats() {
  const stats = [
    {
      id: "sold",
      value: "1,450+",
      label: "Trophy Properties Sold",
      subtext: "Monumental architectural estates, penthouses, and private retreats.",
      icon: Building2,
    },
    {
      id: "volume",
      value: "$4.2B+",
      label: "Closed Sales Volume",
      subtext: "Cumulative private acquisitions and off-market transactions.",
      icon: Landmark,
    },
    {
      id: "years",
      value: "18+",
      label: "Years of Advisory Experience",
      subtext: "Founded in 2008 with unbroken private advisory provenance.",
      icon: Award,
    },
    {
      id: "clients",
      value: "2,800+",
      label: "Family Offices & Collectors",
      subtext: "Institutional funds, sovereign families, and private connoisseurs.",
      icon: Users2,
    },
  ];

  return (
    <section id="experience" className="py-20 sm:py-28 bg-[#171200] border-b border-[#3E3A1F] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <StaggerContainer className="max-w-3xl mb-10 sm:mb-14">
          <StaggerItem className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B2612] border border-[#3E3A1F] text-[11px] font-mono uppercase tracking-[0.25em] text-[#BCB893] font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5 text-[#BCB893]" />
            <span>Proven Track Record &amp; Experience</span>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#F4F3EA] font-light tracking-tight">
              Over 1,450 Trophy Estates Sold. <br />
              <span className="italic font-normal text-[#BCB893]">$4.2 Billion in Closed Acquisitions.</span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-base text-[#A9A68A] font-light leading-relaxed max-w-2xl">
              Nearly two decades of distinguished stewardship representing the world&apos;s most valuable architectural masterworks.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-8 sm:gap-y-12 pt-4">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: index * 0.12, ease: EASING.luxury }}
                // Dividers: stacked rows on phones, a 2×2 grid on tablets, one row on desktop.
                className={`flex flex-col items-start border-[#3E3A1F] ${
                  index !== 0 ? "border-t pt-8 sm:border-t-0 sm:pt-0" : ""
                } ${
                  index % 2 === 1 ? "sm:border-l sm:pl-8" : "sm:pr-8"
                } ${
                  index === 2 ? "lg:border-l lg:pl-10" : ""
                } ${index !== 0 ? "lg:pl-10" : ""}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 rounded-full bg-[#2B2612] border border-[#3E3A1F]">
                    <Icon className="w-4 h-4 text-[#BCB893]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.25em] text-[#BCB893] font-mono font-semibold">
                    Verified Record
                  </span>
                </div>

                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#F4F3EA] font-light tracking-tight">
                  {item.value}
                </div>

                <h3 className="text-base font-serif text-[#F4F3EA] mt-2 tracking-wide font-normal">
                  {item.label}
                </h3>
                <p className="text-xs text-[#A9A68A] mt-1 font-light leading-relaxed">
                  {item.subtext}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
