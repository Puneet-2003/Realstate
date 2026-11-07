"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Calendar, Sparkles, Clock } from "lucide-react";
import { motion } from "framer-motion";

export function BlogSection() {
  const articles = [
    {
      id: "market-trends",
      category: "Market Trends",
      title: "Global Luxury Real Estate Outlook & Capital Inflows",
      excerpt: "Analyzing shifting institutional allocations into trophy residential enclaves across North America and Europe.",
      date: "October 24, 2026",
      readTime: "5 min read",
      image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "investment-tips",
      category: "Investment Tips",
      title: "Trophy Asset Allocation: Hedging Inflation Through Prime Real Estate",
      excerpt: "How family offices utilize unrepeatable architectural assets to preserve intergenerational wealth with minimal volatility.",
      date: "October 18, 2026",
      readTime: "6 min read",
      image: "https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "buying-guides",
      category: "Acquisition Guides",
      title: "The Complete Guide to Acquiring Off-Market Architectural Estates",
      excerpt: "Navigating private pocket listings, discrete escrow protocols, and forensic title verification for high-value properties.",
      date: "October 12, 2026",
      readTime: "7 min read",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section id="insights" className="py-24 sm:py-32 bg-[#E7E5D4]/40 relative overflow-hidden border-b border-[#D7D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D7D4BD]">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
              <span>Editorial Journal • Market Intelligence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2712] font-light tracking-tight">
              Latest News &amp; <br />
              <span className="italic text-[#9D9970]">
                Market Insights.
              </span>
            </h2>
          </div>

          <p className="text-[#6F6C55] text-sm max-w-sm font-light leading-relaxed">
            Curated intelligence on ultra-prime capital flows, architectural innovation, and generational wealth preservation.
          </p>
        </div>

        {/* 3 Featured Editorial Articles */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((item, idx) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.08 }}
              className="group flex flex-col rounded-2xl overflow-hidden bg-[#F4F3EA] border border-[#D7D4BD] hover:border-[#9D9970]/60 transition-all duration-300 hover:shadow-xl hover:shadow-[#2B2712]/5"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#1E1700]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase bg-[#1E1700]/80 text-[#9D9970] border border-[#9D9970]/30 backdrop-blur-md font-medium">
                    {item.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-[11px] font-mono text-[#6F6C55] mb-3">
                    <span>{item.date}</span>
                    <span>•</span>
                    <span>{item.readTime}</span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl text-[#2B2712] font-normal group-hover:text-[#9D9970] transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-xs sm:text-sm text-[#6F6C55] font-light leading-relaxed">
                    {item.excerpt}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#D7D4BD]">
                  <span className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.15em] text-[#2B2712] group-hover:text-[#9D9970] transition-colors font-medium">
                    <span>Read Intelligence Report</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform text-[#9D9970]" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}