"use client";

import React, { useState } from "react";
import { ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How can I schedule a property visit?",
      a: "You can schedule a private visit directly through our online appointment form above, via WhatsApp concierge, or by calling our Manhattan / Beverly Hills desk. Chauffeured private transport and helicopter transfers can be coordinated upon request.",
    },
    {
      q: "Are your property listings verified?",
      a: "Yes. Every property in our curated portfolio undergoes a strict four-stage audit covering title provenance, environmental compliance, physical engineering, and direct legal authority of the seller prior to presentation.",
    },
    {
      q: "What documents are required to purchase a property?",
      a: "Standard requirements include government-issued photographic identification or passport, certified proof of funds or pre-approval from an institutional private bank, and an executed non-disclosure agreement for confidential pocket estates.",
    },
    {
      q: "Do you offer investment consultations?",
      a: "Yes. Our capital markets division provides bespoke investment consultations, quantitative portfolio modeling, 1031 tax-deferred exchanges, and cross-border commercial real estate structuring.",
    },
    {
      q: "Can I schedule an online meeting?",
      a: "Yes. We offer encrypted 4K virtual consultations and digital walkthroughs for international buyers unable to travel immediately to the property location.",
    },
    {
      q: "Do you assist with home loans?",
      a: "While we operate as an independent advisory, we maintain direct relationships with premier private banks, family office lenders, and jumbo mortgage underwriters to arrange customized financing packages.",
    },
    {
      q: "What are your service charges?",
      a: "Our commission and advisory fee structures follow standard luxury brokerage guidelines and are fully transparent with zero hidden fees. In most residential acquisitions, representation fees are paid by the seller.",
    },
    {
      q: "Can I list my property with your company?",
      a: "Yes. We accept exceptional residential estates, architectural masterworks, and commercial assets that meet our strict curation guidelines. We offer both global public campaigns and confidential off-market pocket representation.",
    },
    {
      q: "How can I contact a property consultant?",
      a: "You can connect directly with any of our senior partners via our Team section, submit an inquiry form, email private@aurelia.com, or message our 24/7 WhatsApp concierge.",
    },
    {
      q: "How long does the buying process take?",
      a: "Cash and private treaty transactions for verified luxury estates typically close in 14 to 30 days. Transactions involving cross-border financing or bespoke legal structures typically require 45 to 60 days.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIndex((curr) => (curr === idx ? null : idx));
  };

  return (
    <section id="faq" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-b border-[#D8C3AC]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
            <span>Section 12 • Client Knowledge Base</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
            Frequently Asked <br />
            <span className="italic font-normal text-[#7F4F24]">
              Questions.
            </span>
          </h2>
          <p className="mt-3 text-sm text-[#2D2018] font-normal leading-relaxed">
            Clear, authoritative guidance on acquisitions, private viewings, and our representation standards.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={faq.q}
                className="rounded-2xl bg-white border border-[#D8C3AC] overflow-hidden transition-colors duration-200 shadow-sm hover:border-[#7F4F24] hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left gap-4 hover:text-[#7F4F24] transition-colors cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg text-[#120C08] font-medium flex items-center gap-3">
                    <span className="font-mono text-xs text-[#6B3F1B] font-bold">
                      {idx < 9 ? `0${idx + 1}` : idx + 1}.
                    </span>
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#FAF7F2] border border-[#D8C3AC] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-[#7F4F24] text-white" : "text-[#7F4F24]"
                    }`}
                  >
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
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-3 text-sm text-[#2D2018] font-normal leading-relaxed border-t border-[#D8C3AC]">
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
