"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, ShieldCheck, Cpu, Wind, Sparkles } from "lucide-react";
import { Tilt, TiltContent } from "@animate-ui/react/primitives/effects/tilt";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

interface MaterialCard {
  title: string;
  subtitle: string;
  spec: string;
  image: string;
}

const MATERIALS: MaterialCard[] = [
  {
    title: "Italian Statuario Marble",
    subtitle: "Bookmatched Carrara marble with low-glare satin finish.",
    spec: "Carrara, Italy • 30mm Slabs",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Acoustic Glass",
    subtitle: "Triple-laminated STC 48 glazing blocking 99.4% of urban noise.",
    spec: "Saint-Gobain • STC 48 Argon",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "Architectural Bronze",
    subtitle: "Schüco champagne anodized profiles framing panoramic vistas.",
    spec: "Schüco Custom • C33 Champagne",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    title: "American Black Walnut",
    subtitle: "FSC-certified quarter-cut millwork with micro-acoustic backing.",
    spec: "Pennsylvania, USA • Quarter-Cut",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
  },
];

const ENGINEERING_METRICS = [
  { value: "18.5 FT", title: "Cantilever Span", desc: "Column-free corner terraces" },
  { value: "185 MPH", title: "Wind Resistance", desc: "Aerodynamic curved glazing" },
  { value: "92.4%", title: "Core Efficiency", desc: "Unobstructed living perimeter" },
  { value: "LEED Platinum", title: "Sustainability", desc: "Zero-emission geothermal heating" },
];

const ENGINEERING_SPECS = [
  {
    id: "spec-1",
    title: "Acoustic Attenuation & Glazing Physics",
    category: "Acoustic Isolation",
    icon: Wind,
    detail:
      "Engineered by Saint-Gobain, the triple-layer acoustic facade integrates an argon gas thermal barrier and PVB interlayer, achieving an STC 48 rating. Metropolitan sirens and ambient street rumble are damped by 99.4%, creating absolute acoustic stillness within high-altitude salons.",
  },
  {
    id: "spec-2",
    title: "Tuned Mass Damper & High-Altitude Structural Rigidity",
    category: "Seismology & Dynamics",
    icon: Cpu,
    detail:
      "Suspended within floors 65 and 66 sits a 450-tonne liquid-tuned mass damper designed to counteract lateral wind shear. The aerodynamic curved bronze exoskeleton diffuses vortex shedding, ensuring negligible building acceleration even during Category 4 hurricane conditions.",
  },
  {
    id: "spec-3",
    title: "Bespoke Millwork & Natural Stone Metallurgy",
    category: "Materiality",
    icon: Sparkles,
    detail:
      "Every residence features 30mm thick bookmatched Statuario marble quarried directly from Carrara, dry-laid at the factory to maintain continuous veining across entire master baths. Millwork is crafted from slow-grown Appalachian American walnut with satin oil finishes.",
  },
  {
    id: "spec-4",
    title: "Geothermal Micro-Loop & Clean Air Purification",
    category: "Environmental",
    icon: ShieldCheck,
    detail:
      "A closed-circuit 2,400-foot geothermal heat exchange loop eliminates rooftop chillers, reducing energy consumption by 48% and earning LEED Platinum accreditation. Hospital-grade MERV 16 filtration cycles interior air every 12 minutes with continuous UV-C sterilization.",
  },
];

export function ArchitectureSection() {
  return (
    <section id="architecture" className="py-24 sm:py-32 bg-[#140F00] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10"
        >
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#BCB893] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Materiality &amp; Engineering</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-white font-light tracking-tight leading-[1.1]">
              Architectural <br />
              <span className="italic font-normal bg-gradient-to-r from-[#FFFFFF] via-[#DCDAC2] to-[#BCB893] bg-clip-text text-transparent">
                Precision &amp; Matter.
              </span>
            </h2>
          </div>

          <p className="text-white/60 text-xs sm:text-sm max-w-sm font-light leading-relaxed">
            Every material tested to surpass seismic and acoustic benchmarks while honoring natural texture.
          </p>
        </motion.div>

        {/* 4 Clean Editorial Visual Cards with Animate UI Tilt */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {MATERIALS.map((mat) => (
            <Tilt key={mat.title} maxTilt={10} perspective={900} className="w-full">
              <TiltContent className="group rounded-2xl bg-[#171200] border border-white/10 hover:border-[#BCB893]/40 transition-colors duration-300 overflow-hidden flex flex-col justify-between shadow-xl h-full">
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-black">
                  <img
                    src={mat.image}
                    alt={mat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#171200] via-transparent to-transparent pointer-events-none" />
                  <span className="absolute top-3 left-3 text-[10px] font-mono uppercase tracking-widest text-[#BCB893] bg-black/70 px-2.5 py-1 rounded-full backdrop-blur-md border border-[#BCB893]/20 pointer-events-none">
                    {mat.spec}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif text-lg text-white font-light group-hover:text-[#F1EFE3] transition-colors">
                      {mat.title}
                    </h3>
                    <p className="text-xs text-white/60 font-light mt-1.5 leading-relaxed">
                      {mat.subtitle}
                    </p>
                  </div>
                </div>
              </TiltContent>
            </Tilt>
          ))}
        </div>

        {/* Visual Engineering Statistics Matrix */}
        <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {ENGINEERING_METRICS.map((metric, idx) => (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: idx * 0.06 }}
              whileHover={{ y: -3 }}
              className="p-5 sm:p-6 rounded-2xl bg-[#09090C] border border-white/10 hover:border-[#BCB893]/30 transition-colors flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-[#BCB893] block font-light">
                  {metric.value}
                </span>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-white mt-1.5 font-mono">
                  {metric.title}
                </h4>
                <p className="text-[11px] text-white/50 mt-1 font-light">
                  {metric.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animate UI Accordion: Deep Architectural Engineering & Building Specs */}
        <div className="mt-20 pt-16 border-t border-white/10">
          <div className="max-w-3xl mb-8">
            <Badge variant="outline" className="text-[#BCB893] border-[#BCB893]/30 font-mono text-[10px] uppercase tracking-widest px-3 py-1 mb-3">
              Technical Dossier
            </Badge>
            <h3 className="text-2xl sm:text-4xl font-serif text-white font-light">
              Engineering Disciplines &amp; Construction Telemetry
            </h3>
            <p className="text-xs sm:text-sm text-white/60 font-light mt-2 leading-relaxed">
              Explore the structural systems, acoustic attenuation, and environmental sustainability protocols engineered into The Lumière.
            </p>
          </div>

          <Accordion type="single" collapsible defaultValue="spec-1" className="w-full space-y-3">
            {ENGINEERING_SPECS.map((spec) => {
              const Icon = spec.icon;
              return (
                <AccordionItem
                  key={spec.id}
                  value={spec.id}
                  className="rounded-xl border border-white/10 bg-[#171200] px-6 py-2 transition-colors data-[state=open]:border-[#BCB893]/40 data-[state=open]:bg-[#0c0c14]"
                >
                  <AccordionTrigger className="hover:no-underline cursor-pointer py-4">
                    <div className="flex items-center gap-4 text-left">
                      <div className="w-9 h-9 rounded-lg bg-[#BCB893]/10 border border-[#BCB893]/20 flex items-center justify-center text-[#BCB893] shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-[#BCB893] block">
                          {spec.category}
                        </span>
                        <span className="font-serif text-lg sm:text-xl text-white font-light mt-0.5 block">
                          {spec.title}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 pb-5 text-xs sm:text-sm text-white/70 font-light leading-relaxed pl-13">
                    {spec.detail}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
