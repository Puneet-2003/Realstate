"use client";

import React from "react";
import { motion } from "framer-motion";
import { Award, Building2, Users2, Landmark } from "lucide-react";

export function CompanyStats() {
  const stats = [
    {
      id: "years",
      value: "18+",
      label: "Years of Experience",
      subtext: "Established in 2008 with unbroken private advisory heritage.",
      icon: Award,
    },
    {
      id: "sold",
      value: "1,450+",
      label: "Properties Sold",
      subtext: "Architectural estates, sky penthouses, and private islands.",
      icon: Building2,
    },
    {
      id: "clients",
      value: "2,800+",
      label: "Happy Clients",
      subtext: "Institutional funds, sovereign families, and private collectors.",
      icon: Users2,
    },
    {
      id: "volume",
      value: "$4.2B+",
      label: "Successful Transactions",
      subtext: "Cumulative private treaty and competitive closed volume.",
      icon: Landmark,
    },
  ];

  return (
    <section className="py-14 sm:py-18 bg-[#FAF7F2] border-b border-[#D8C3AC] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#D8C3AC]">
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`flex flex-col items-start ${
                  index !== 0 ? "pt-6 sm:pt-0 sm:pl-8 lg:pl-10" : ""
                }`}
              >
                <div className="flex items-center gap-2 mb-2.5">
                  <div className="p-1.5 rounded-lg bg-[#7F4F24]/10 border border-[#7F4F24]/20">
                    <Icon className="w-4 h-4 text-[#7F4F24]" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#7F4F24] font-mono font-bold">
                    Verified Heritage
                  </span>
                </div>

                <div className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#6B3F1B] font-medium tracking-tight">
                  {item.value}
                </div>

                <h3 className="text-base font-semibold text-[#120C08] mt-2 tracking-wide font-serif">
                  {item.label}
                </h3>
                <p className="text-xs text-[#2D2018] mt-1 font-normal leading-relaxed">
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
