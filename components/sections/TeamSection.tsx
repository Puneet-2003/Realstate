"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

interface TeamSectionProps {
  onOpenBooking?: () => void;
}

export function TeamSection({ onOpenBooking }: TeamSectionProps) {
  const team = [
    {
      id: "alessandro",
      name: "Alessandro Vance",
      title: "Managing Partner & Principal",
      experience: "22+ Years Provenance",
      specialization: "Trophy Architectural Estates & Coastal Sanctuaries",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      email: "a.vance@aureliarealestate.com",
    },
    {
      id: "elena",
      name: "Elena Rostova",
      title: "Head of Private Client Acquisitions",
      experience: "16+ Years Provenance",
      specialization: "Manhattan & London Sky Penthouses",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
      email: "e.rostova@aureliarealestate.com",
    },
    {
      id: "marcus",
      name: "Marcus Sterling",
      title: "Director of Capital Markets & Commercial",
      experience: "19+ Years Provenance",
      specialization: "Institutional Portfolios & Hospitality Assets",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
      email: "m.sterling@aureliarealestate.com",
    },
    {
      id: "seraphina",
      name: "Seraphina Lin",
      title: "Senior Partner, Global Wealth Advisory",
      experience: "14+ Years Provenance",
      specialization: "Cross-Border Tax Architecture & Generational Estates",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop",
      email: "s.lin@aureliarealestate.com",
    },
  ];

  return (
    <section id="team" className="py-24 sm:py-32 bg-[#E7E5D4]/30 relative overflow-hidden border-b border-[#D7D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D7D4BD]">
          <div>
            <div className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#9D9970] font-mono font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#9D9970]" />
              <span>Leadership • Global Partners</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2712] font-light tracking-tight">
              Meet Our Senior <br />
              <span className="italic text-[#9D9970]">
                Advisory Team.
              </span>
            </h2>
          </div>

          <p className="text-[#6F6C55] text-sm max-w-sm font-light leading-relaxed">
            Trusted advisors combining rigorous quantitative underwriting with discreet fiduciary representation.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
              className="group relative flex flex-col rounded-2xl bg-[#F4F3EA] border border-[#D7D4BD] overflow-hidden hover:border-[#9D9970]/60 transition-all duration-300 shadow-md shadow-[#2B2712]/5 hover:shadow-xl hover:shadow-[#2B2712]/10"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#1E1700]">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E1700]/80 via-transparent to-transparent opacity-80" />

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-[#1E1700]/80 border border-white/20 text-[#9D9970] backdrop-blur-md font-medium">
                    {member.experience}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl text-[#2B2712] font-normal group-hover:text-[#9D9970] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#9D9970] font-mono tracking-wider uppercase block mt-1">
                    {member.title}
                  </span>

                  <p className="mt-3 text-xs text-[#6F6C55] font-light leading-relaxed">
                    <strong className="text-[#2B2712] font-normal">Focus:</strong> {member.specialization}
                  </p>
                </div>

                {/* Connect CTA Button */}
                <div className="mt-6 pt-4 border-t border-[#D7D4BD]">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenBooking) {
                        onOpenBooking();
                      } else {
                        const el = document.getElementById("schedule-meeting");
                        if (el) el.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs font-mono uppercase tracking-[0.15em] font-medium bg-[#E7E5D4] hover:bg-[#1E1700] text-[#2B2712] hover:text-[#F4F3EA] border border-[#D7D4BD] hover:border-[#1E1700] transition-all cursor-pointer"
                  >
                    <span>Connect With Advisor</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}