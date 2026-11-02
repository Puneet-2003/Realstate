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
      title: "Q4 Global Luxury Real Estate Outlook & Capital Inflows",
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
    {
      id: "selling-guides",
      category: "Valuation Insights",
      title: "Maximizing Valuation: Curating High-Value Penthouses for Global Market Presentation",
      excerpt: "Strategic staging, architectural videography, and targeted private outreach to qualified global ultra-high-net-worth buyers.",
      date: "October 05, 2026",
      readTime: "4 min read",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    },
    {
      id: "market-updates",
      category: "Cap Rate Intelligence",
      title: "Metropolitan Skyline Index: Prime Residential Yield & Cap Rate Comparisons",
      excerpt: "Quarterly benchmarking of ultra-prime condo and penthouse yields across Manhattan, London, Dubai, and Singapore.",
      date: "September 28, 2026",
      readTime: "8 min read",
      image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1200&auto=format&fit=crop",
    },
  ];

  return (
    <section id="insights" className="py-20 sm:py-28 bg-[#F5EFEB] relative overflow-hidden border-b border-[#D8C3AC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D8C3AC]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
              <span>Section 13 • Editorial &amp; Intelligence</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
              Latest News &amp; <br />
              <span className="italic font-normal text-[#7F4F24]">
                Market Insights.
              </span>
            </h2>
          </div>

          <p className="text-[#2D2018] text-sm max-w-sm font-normal leading-relaxed">
            Proprietary research, cross-border intelligence, and essential guidance for global property collectors.
          </p>
        </div>

        {/* Blog Articles Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(0, 3).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group flex flex-col rounded-2xl bg-white border border-[#D8C3AC] overflow-hidden hover:border-[#7F4F24] transition-all duration-300 shadow-md shadow-[#2D1A0B]/6 hover:shadow-2xl hover:shadow-[#2D1A0B]/14"
            >
              {/* Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black/10">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85" />

                {/* Category Pill */}
                <div className="absolute top-3.5 left-3.5 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-[#7F4F24] text-white font-bold shadow-md">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs text-[#7F4F24] mb-2 font-mono">
                    <span className="flex items-center gap-1 font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      {article.date}
                    </span>
                    <span className="text-[#8C5A30]/40">•</span>
                    <span className="flex items-center gap-1 text-[#2D2018] font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl text-[#120C08] font-medium group-hover:text-[#7F4F24] transition-colors line-clamp-2 leading-snug">
                    {article.title}
                  </h3>

                  <p className="mt-2.5 text-xs sm:text-sm text-[#2D2018] font-normal leading-relaxed line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="mt-5 pt-4 border-t border-[#D8C3AC]">
                  <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#7F4F24] group-hover:text-[#120C08] transition-colors font-bold">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Secondary Two Guides Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {articles.slice(3, 5).map((article) => (
            <div
              key={article.id}
              className="p-6 rounded-2xl bg-white border border-[#D8C3AC] hover:border-[#7F4F24] transition-all flex flex-col sm:flex-row items-center gap-5 shadow-sm hover:shadow-md"
            >
              <div className="relative w-full sm:w-36 h-28 rounded-xl overflow-hidden shrink-0">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-wider text-[#7F4F24] mb-1 font-bold">
                  <span>{article.category}</span>
                  <span className="text-[#8C5A30]/40">•</span>
                  <span className="text-[#2D2018] font-medium">{article.date}</span>
                </div>
                <h4 className="font-serif text-base text-[#120C08] font-medium hover:text-[#7F4F24] transition-colors leading-snug">
                  {article.title}
                </h4>
                <p className="mt-1 text-xs text-[#2D2018] line-clamp-1 font-normal">
                  {article.excerpt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
