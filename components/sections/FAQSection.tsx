"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How can I schedule a private property walkthrough?",
      a: "You can schedule a private visit directly through our online appointment form above, via WhatsApp concierge, or by calling our Manhattan / Mayfair desk. Chauffeured private transport and helicopter transfers can be coordinated upon request.",
    },
    {
      q: "Are all property listings in your index verified?",
      a: "Yes. Every property in our curated portfolio undergoes a strict four-stage audit covering title provenance, environmental compliance, physical engineering, and direct legal authority of the seller prior to presentation.",
    },
    {
      q: "What documentation is required to initiate an acquisition?",
      a: "Standard requirements include government-issued photographic identification or passport, certified proof of funds or pre-approval from an institutional private bank, and an executed non-disclosure agreement for confidential pocket estates.",
    },
    {
      q: "Do you offer cross-border wealth and tax consultations?",
      a: "Yes. Our capital markets division provides bespoke investment consultations, quantitative portfolio modeling, 1031 tax-deferred exchanges, and cross-border commercial real estate structuring.",
    },
    {
      q: "Can international family offices schedule encrypted virtual sessions?",
      a: "Yes. We offer encrypted 4K virtual consultations and digital walkthroughs for international buyers unable to travel immediately to the property location.",
    },
    {
      q: "Do you assist with institutional and jumbo financing packages?",
      a: "While we operate as an independent advisory, we maintain direct relationships with premier private banks, family office lenders, and jumbo mortgage underwriters to arrange customized financing packages.",
    },
    {
      q: "What is your advisory fee and commission structure?",
      a: "Our commission and advisory fee structures follow standard luxury brokerage guidelines and are fully transparent with zero hidden fees. In most residential acquisitions, representation fees are paid by the seller.",
    },
    {
      q: "Can I list an architectural estate privately without public publicity?",
      a: "Yes. Over 60% of our transaction volume is executed through discreet off-market pocket representation, directly presenting your trophy estate to verified sovereign buyers without public MLS footprint.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-24 sm:py-32 bg-[#F4F3EA] relative overflow-hidden border-b border-[#D7D4BD]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
            <span>Client Clarifications • Acquisition Protocols</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2712] font-light tracking-tight">
            Frequently Asked <br />
            <span className="italic text-[#9D9970]">
              Questions.
            </span>
          </h2>
          <p className="mt-4 text-sm text-[#6F6C55] font-light leading-relaxed">
            Essential information regarding acquisition protocols, confidential viewings, and bespoke advisory services.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-[#D7D4BD] bg-[#E7E5D4]/30 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-[#E7E5D4]/60 transition-colors"
                >
                  <span className="font-serif text-lg sm:text-xl text-[#2B2712] font-normal pr-4">
                    {faq.q}
                  </span>
                  <div className={`w-8 h-8 rounded-full border border-[#D7D4BD] flex items-center justify-center shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180 bg-[#1E1700] text-[#F4F3EA] border-[#1E1700]" : "text-[#6F6C55]"}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-[#6F6C55] font-light leading-relaxed border-t border-[#D7D4BD]/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}