"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Box, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

// Dynamic import of 3D Canvas
const ArchitecturalCanvas = dynamic(
  () => import("@/components/three/ArchitecturalCanvas"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 flex items-center justify-center bg-[#09090d] rounded-2xl">
        <div className="flex flex-col items-center gap-2">
          <div className="w-8 h-8 border-2 border-[#C6A76B] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs uppercase tracking-widest text-[#C6A76B] font-mono">Loading 3D Model...</span>
        </div>
      </div>
    ),
  }
);

export function Showcase3DSection() {
  const architecturalFeatures = [
    {
      title: "Cantilevered Structural Steel",
      spec: "24-Foot Continuous Overhang",
      desc: "Swedish high-tensile steel frame with seismic damping allowing column-free glass perimeters.",
    },
    {
      title: "Acoustic Motorized Glazing",
      spec: "Triple-Laminated Argon Insulated",
      desc: "Acoustic STC 48 rating with motorized panels sliding into subterranean wall pockets.",
    },
    {
      title: "Geothermal Micro-Climate",
      spec: "Zero Carbon Heating & Cooling",
      desc: "Subterranean heat loops providing radiant floor heating and passive convective cooling.",
    },
    {
      title: "Cantilevered Infinity Pool",
      spec: "120ft Suspended Horizon",
      desc: "Heated saltwater system with observation ports overlooking the metropolitan skyline.",
    },
  ];

  return (
    <section id="showcase-3d" className="py-24 sm:py-32 bg-[#070709] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C6A76B] font-semibold mb-3">
              <Box className="w-3.5 h-3.5" />
              <span>Interactive Spatial Simulation</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
              Architectural <br />
              <span className="italic font-normal bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
                Visualization in Real-Time.
              </span>
            </h2>
          </div>

          <p className="text-zinc-400 text-xs sm:text-sm max-w-sm font-light leading-relaxed">
            Rotate and inspect structural engineering and daylight paths in real-time before arrival.
          </p>
        </div>

        {/* 3D Model Canvas Display */}
        <div className="mt-10">
          <ArchitecturalCanvas className="w-full h-[500px] sm:h-[600px] shadow-2xl" showControls={true} />
        </div>

        {/* Technical Architecture Specs Matrix */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {architecturalFeatures.map((feat) => (
            <div
              key={feat.title}
              className="p-6 rounded-2xl bg-[#0e0e14] border border-white/10 hover:border-[#C6A76B]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#C6A76B] font-mono font-semibold">
                  {feat.spec}
                </span>
                <h4 className="text-base font-serif text-white mt-1.5">{feat.title}</h4>
                <p className="text-xs text-zinc-400 mt-2 font-light leading-relaxed">
                  {feat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Bar */}
        <div className="mt-10 p-6 rounded-2xl bg-[#0f0f16] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#C6A76B]/10 flex items-center justify-center text-[#C6A76B]">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h5 className="text-sm font-serif text-white">Full CAD / BIM Architectural Schematics</h5>
              <p className="text-xs text-zinc-400">Available to verified principals and their architectural representatives.</p>
            </div>
          </div>

          <Link
            href="/contact"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] text-black hover:bg-[#dfc293] transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-[#C6A76B]/20"
          >
            <span>Request Digital Dossier</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
