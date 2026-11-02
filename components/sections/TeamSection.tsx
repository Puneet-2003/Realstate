"use client";

import React from "react";
import Image from "next/image";
import { Mail, Phone, ArrowUpRight, Sparkles } from "lucide-react";
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
      experience: "22+ Years Experience",
      specialization: "Trophy Architectural Estates & Coastal Sanctuaries",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop",
      email: "a.vance@aureliarealestate.com",
    },
    {
      id: "elena",
      name: "Elena Rostova",
      title: "Head of Private Client Acquisitions",
      experience: "16+ Years Experience",
      specialization: "Manhattan & London Sky Penthouses",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200&auto=format&fit=crop",
      email: "e.rostova@aureliarealestate.com",
    },
    {
      id: "marcus",
      name: "Marcus Sterling",
      title: "Director of Capital Markets & Commercial",
      experience: "19+ Years Experience",
      specialization: "Institutional Portfolios & Hospitality Assets",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1200&auto=format&fit=crop",
      email: "m.sterling@aureliarealestate.com",
    },
    {
      id: "seraphina",
      name: "Seraphina Lin",
      title: "Senior Partner, Global Wealth Advisory",
      experience: "14+ Years Experience",
      specialization: "Cross-Border Tax & Generational Real Estate",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=1200&auto=format&fit=crop",
      email: "s.lin@aureliarealestate.com",
    },
  ];

  return (
    <section id="team" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-b border-[#D8C3AC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-[#D8C3AC]">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
              <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
              <span>Section 08 • Leadership</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
              Meet Our Senior <br />
              <span className="italic font-normal text-[#7F4F24]">
                Advisory Team.
              </span>
            </h2>
          </div>

          <p className="text-[#2D2018] text-sm max-w-sm font-normal leading-relaxed">
            Trusted advisors combining rigorous quantitative underwriting with discreet personal representation.
          </p>
        </div>

        {/* Team Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative flex flex-col rounded-2xl bg-white border border-[#D8C3AC] overflow-hidden hover:border-[#7F4F24] transition-all duration-300 shadow-md shadow-[#2D1A0B]/6 hover:shadow-2xl hover:shadow-[#2D1A0B]/14"
            >
              {/* Photo */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-black/10">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-85" />

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 z-10">
                  <span className="px-2.5 py-1 rounded-full text-[10px] uppercase font-mono tracking-wider bg-black/80 border border-white/25 text-[#F3E5C8] backdrop-blur-md font-semibold">
                    {member.experience}
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-xl text-[#120C08] font-medium group-hover:text-[#7F4F24] transition-colors leading-snug">
                    {member.name}
                  </h3>
                  <span className="text-xs text-[#7F4F24] font-bold block mt-1">
                    {member.title}
                  </span>

                  <p className="mt-2.5 text-xs text-[#2D2018] font-normal leading-relaxed">
                    <strong className="text-[#120C08] font-semibold">Specialization:</strong> {member.specialization}
                  </p>
                </div>

                {/* Connect CTA Button */}
                <div className="mt-5 pt-4 border-t border-[#D8C3AC]">
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
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold bg-[#FAF7F2] hover:bg-[#7F4F24] text-[#120C08] hover:text-[#FAF7F2] border border-[#C89D5C]/40 hover:border-[#7F4F24] transition-all cursor-pointer shadow-xs"
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
