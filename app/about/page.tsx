import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About Our Heritage & Philosophy | Aurelia & Co. Private Estates",
  description:
    "Discover the architectural ethos, private office heritage, and global advisory leadership behind Aurelia & Co.",
};

export default function AboutPage() {
  const milestones = [
    {
      year: "2007",
      title: "Founding in Zurich",
      description:
        "Established on Bahnhofstrasse as an ultra-prime advisory catering exclusively to Swiss family offices seeking rare alpine and lakeside architectural estates.",
    },
    {
      year: "2013",
      title: "Mayfair Private Desk, London",
      description:
        "Opened Berkeley Square salon, representing tier-one architectural townhouses in Belgravia, Kensington, and country estates across the Cotswolds.",
    },
    {
      year: "2019",
      title: "Manhattan & California Expansion",
      description:
        "Launched advisory presence on Fifth Avenue and Beverly Hills, structuring acquisitions of iconic modernist villas and trophy penthouses.",
    },
    {
      year: "2024",
      title: "Global Gateway Integration",
      description:
        "Inaugurated dedicated sovereign wealth representation desks in DIFC Dubai and Ginza Tokyo, reaching $4.8B+ in cumulative transactional volume.",
    },
  ];

  const leaders = [
    {
      name: "Henrik Van Der Bilt",
      role: "Managing Senior Partner & Founder",
      location: "Zurich & London",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop",
      bio: "Former architectural historian and private banker with 25 years directing cross-border trophy estate transactions.",
    },
    {
      name: "Aurelia Sterling",
      role: "Head of Global Curation & Design",
      location: "London & New York",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop",
      bio: "Advises architectural patrons, museum trustees, and family principals on structural conservation and pedigree acquisitions.",
    },
    {
      name: "Tariq Al-Mansoor",
      role: "Principal, Middle East & Asia Gateway",
      location: "Dubai & Singapore",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop",
      bio: "Specialist in sovereign wealth real estate allocations, waterfront development curation, and private offshore structures.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col">
      <Navbar />

      <main className="flex-1 pt-28 sm:pt-36">
        {/* Hero Banner */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 border-b border-white/10">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#c5a880] font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Heritage &amp; Stewardship</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-light text-white tracking-tight leading-[1.08] max-w-4xl">
            Where Architectural Artistry <br />
            <span className="italic font-normal text-gold-gradient">Meets Sovereign Discretion.</span>
          </h1>
          <p className="mt-8 text-base sm:text-lg text-zinc-300 font-light max-w-2xl leading-relaxed">
            Aurelia &amp; Co. was conceived not as a brokerage, but as a private curatorial salon. We believe
            that great residences are the ultimate physical manifestation of culture, intellect, and generational permanence.
          </p>
        </section>

        {/* Narrative & Philosophy */}
        <section className="py-20 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1600&auto=format&fit=crop"
                alt="Aurelia Private Salon Interior"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                Our Manifesto
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light leading-snug">
                We represent fewer than fifty properties worldwide at any given moment.
              </h2>
              <p className="text-sm text-zinc-300 font-light leading-relaxed">
                By intentionally limiting our engagements, our partners provide focused, bespoke intelligence.
                We delve deeply into provenance, structural authenticity, micro-climates, and legal frameworks,
                ensuring every client interaction is characterized by uncompromising rigor.
              </p>
              <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-4">
                <div>
                  <span className="font-serif text-3xl text-gold-accent font-medium">94%</span>
                  <span className="block text-xs text-zinc-400 mt-1">Properties Audited &amp; Declined</span>
                </div>
                <div>
                  <span className="font-serif text-3xl text-gold-accent font-medium">100%</span>
                  <span className="block text-xs text-zinc-400 mt-1">Discretion &amp; NDA Protected</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 bg-[#09090e] border-t border-b border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mb-12">
              <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                Evolution
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-white font-light mt-1">
                Nineteen Years of Curatorial Excellence
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {milestones.map((m) => (
                <div key={m.year} className="p-6 rounded-2xl bg-[#111116] border border-white/10">
                  <span className="font-serif text-3xl text-[#c5a880] font-medium">{m.year}</span>
                  <h4 className="text-base font-serif text-white mt-2">{m.title}</h4>
                  <p className="text-xs text-zinc-400 mt-2 leading-relaxed font-light">{m.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-14">
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
              Senior Advisory
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl text-white font-light mt-1">
              Led by Principals of Proven Integrity
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leaders.map((leader) => (
              <div
                key={leader.name}
                className="rounded-2xl overflow-hidden bg-[#101016] border border-white/10 p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-square rounded-xl overflow-hidden mb-5">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-mono">
                    {leader.location}
                  </span>
                  <h4 className="font-serif text-xl text-white mt-1">{leader.name}</h4>
                  <span className="text-xs text-zinc-400 block mt-0.5">{leader.role}</span>
                  <p className="text-xs text-zinc-300 mt-3 font-light leading-relaxed">
                    {leader.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Consultation Banner */}
          <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-[#0f0f16] border border-[#c5a880]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white">
                Begin a Confidential Conversation
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-lg">
                Connect directly with our managing partners for discretionary portfolio reviews and private off-market viewings.
              </p>
            </div>
            <Link
              href="/contact"
              className="px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all shrink-0"
            >
              Contact Private Desk
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
