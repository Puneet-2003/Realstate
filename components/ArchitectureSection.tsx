"use client";

import React, { useState } from "react";
import { Layers, Shield, Eye, Cpu, Compass, CheckCircle2 } from "lucide-react";

interface MaterialDetail {
  id: string;
  name: string;
  origin: string;
  finish: string;
  specs: string;
  description: string;
  image: string;
  acousticThermal: string;
}

const MATERIALS: MaterialDetail[] = [
  {
    id: "marble",
    name: "Honed Italian Statuario Marble",
    origin: "Carrara Quarries, Tuscany, Italy",
    finish: "Micro-honed silky satin finish (Low-glare)",
    specs: "30mm Bookmatched Slabs • Porosity < 0.15%",
    description:
      "Hand-selected from deep subterranean veins in the Apuan Alps. Each monolithic slab exhibits dramatic charcoal veins coursing across a pure ivory backdrop, calibrated to align across foyer thresholds.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    acousticThermal: "High thermal mass, natural radiant cooling compatibility",
  },
  {
    id: "glazing",
    name: "Low-E Triple Acoustic Glazing",
    origin: "Saint-Gobain Specialized Labs, France",
    finish: "Ultra-clear Low-Iron Glass with Double Silver Coating",
    specs: "Acoustic STC 48 • Argon Gas Cavity • 99.4% UV Shield",
    description:
      "Engineered to withstand 180 mph wind loads while maintaining absolute silence within the residence. The dual Low-E coatings selectively reflect infrared heat while transmitting pristine natural daylight.",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1200&auto=format&fit=crop",
    acousticThermal: "Reduces exterior urban decibels by 48dB (Whisper quiet)",
  },
  {
    id: "bronze",
    name: "Champagne Anodized Architectural Bronze",
    origin: "Schüco Custom Facades, Germany",
    finish: "Brushed directional satin with anti-fingerprint sealant",
    specs: "Marine-Grade 6063-T6 Aluminum Alloy • C33 Champagne Anodize",
    description:
      "Framing the monumental window mullions, elevator portals, and bespoke chandeliers. This warm metallic hue captures changing sunset angles, transitioning from pale champagne to deep honey amber.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1200&auto=format&fit=crop",
    acousticThermal: "Thermally broken extrusion profiles with polyamide thermal struts",
  },
  {
    id: "walnut",
    name: "Quarter-Cut American Black Walnut",
    origin: "FSC Certified Forests, Pennsylvania, USA",
    finish: "Hand-rubbed natural matte polyurethane oil",
    specs: "Bookmatched Architectural Veneer • Class A Fire-Rated Core",
    description:
      "Used throughout the reception wall cladding, residential millwork, and private library suites. Quarter-sawn for straight, tight linear grain that provides tactile warmth against stone and glass.",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    acousticThermal: "Micro-perforated acoustic backing dampens reverberant speech",
  },
];

export function ArchitectureSection() {
  const [selectedMaterial, setSelectedMaterial] = useState<MaterialDetail>(MATERIALS[0]);

  const engineeringMetrics = [
    {
      title: "Cantilever Slab Span",
      value: "18.5 FT",
      desc: "Post-tensioned concrete slabs permit column-free panoramic corner terraces.",
    },
    {
      title: "Wind Load Tolerance",
      value: "185 MPH",
      desc: "Aerodynamic curved glass corners reduce vortex shedding and building drift.",
    },
    {
      title: "Floorplate Efficiency",
      value: "92.4%",
      desc: "Optimized central core placement leaves residential perimeters completely open.",
    },
    {
      title: "LEED Certification",
      value: "PLATINUM",
      desc: "Zero-emission geothermal heat pumps combined with smart facade heat capture.",
    },
  ];

  return (
    <section id="architecture" className="py-28 sm:py-36 bg-[#050505] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.25em] text-[#C6A76B] mb-3">
              <Layers className="w-3.5 h-3.5" />
              <span>Materiality &amp; Engineering</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight leading-[1.1]">
              Architectural <br />
              <span className="italic font-normal text-gradient bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
                Precision &amp; Materiality.
              </span>
            </h2>
          </div>

          <p className="text-white/60 text-sm max-w-md font-light leading-relaxed">
            The beauty of The Lumière is rooted in structural integrity. Every element is tested to
            surpass international seismic, acoustic, and thermal benchmarks while celebrating pure,
            unvarnished natural textures.
          </p>
        </div>

        {/* Interactive Material Inspector */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Material Selector Tabs */}
          <div className="lg:col-span-5 flex flex-col space-y-3">
            <span className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-1">
              Select Material to Inspect
            </span>
            {MATERIALS.map((mat) => {
              const isSelected = selectedMaterial.id === mat.id;
              return (
                <button
                  key={mat.id}
                  type="button"
                  onClick={() => setSelectedMaterial(mat)}
                  className={`p-5 rounded-2xl text-left transition-all duration-300 border cursor-pointer ${
                    isSelected
                      ? "bg-[#0E0E14] border-[#C6A76B] shadow-xl shadow-[#C6A76B]/10 translate-x-2"
                      : "bg-[#08080B] border-white/5 hover:border-white/20 text-white/70"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono tracking-wider uppercase text-[#C6A76B]">
                      {mat.origin.split(",")[0]}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-[#C6A76B] animate-pulse" />
                    )}
                  </div>
                  <h4 className="text-base font-serif text-white mt-1">{mat.name}</h4>
                  <p className="text-xs text-white/50 mt-1 line-clamp-1">{mat.finish}</p>
                </button>
              );
            })}
          </div>

          {/* Material Detailed Preview Card */}
          <div className="lg:col-span-7 bg-[#09090D] border border-white/10 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
            <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden mb-6 border border-white/10">
              <img
                src={selectedMaterial.image}
                alt={selectedMaterial.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-wider text-[#C6A76B] bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                  {selectedMaterial.origin}
                </span>
                <span className="text-xs font-mono text-white/70 bg-black/60 px-3 py-1 rounded-full backdrop-blur-md">
                  {selectedMaterial.specs.split("•")[0]}
                </span>
              </div>
            </div>

            <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
              {selectedMaterial.name}
            </h3>

            <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed mt-3">
              {selectedMaterial.description}
            </p>

            <div className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/40 block">
                  Surface Specification
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  {selectedMaterial.specs}
                </span>
              </div>
              <div className="p-3.5 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C6A76B] block">
                  Acoustic &amp; Thermal Performance
                </span>
                <span className="text-white/90 font-medium mt-1 block">
                  {selectedMaterial.acousticThermal}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Structural Engineering Matrix */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {engineeringMetrics.map((metric) => (
            <div
              key={metric.title}
              className="p-6 rounded-2xl bg-[#09090C] border border-white/10 hover:border-[#C6A76B]/40 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="text-2xl sm:text-3xl font-serif text-[#C6A76B] block font-light">
                  {metric.value}
                </span>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white mt-2">
                  {metric.title}
                </h4>
                <p className="text-xs text-white/60 mt-2 font-light leading-relaxed">
                  {metric.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
