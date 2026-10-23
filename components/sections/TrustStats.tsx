"use client";

import React from "react";
import { TRUST_METRICS } from "@/lib/properties";
import { Award, ShieldCheck, Globe, Clock } from "lucide-react";

export function TrustStats() {
  const icons = [Award, ShieldCheck, Globe, Clock];

  return (
    <section className="py-20 bg-[#09090e] border-t border-b border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {TRUST_METRICS.map((metric, index) => {
            const Icon = icons[index % icons.length];
            return (
              <div
                key={metric.label}
                className={`flex flex-col items-start ${index !== 0 ? "pt-6 sm:pt-0 sm:pl-8 lg:pl-10" : ""}`}
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-[#c5a880]" />
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-mono">
                    Track Record
                  </span>
                </div>

                <div className="flex items-baseline gap-1">
                  {metric.label.includes("Volume") && (
                    <span className="font-serif text-3xl sm:text-4xl text-white font-light">$</span>
                  )}
                  <span className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight">
                    {metric.value}
                  </span>
                  <span className="font-serif text-2xl sm:text-3xl text-gold-accent font-medium">
                    {metric.suffix}
                  </span>
                </div>

                <h4 className="text-sm font-medium text-zinc-200 mt-2">{metric.label}</h4>
                <p className="text-xs text-zinc-400 mt-1 font-light leading-relaxed">
                  {metric.subtext}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
