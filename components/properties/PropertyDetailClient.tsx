"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Shield,
  Sparkles,
  Check,
  Compass,
  Eye,
  X,
  Share2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Property } from "@/types/property";
import { formatNumber } from "@/lib/utils";
import { ConsultationModal } from "@/components/forms/ConsultationModal";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { whatsappUrl } from "@/lib/whatsapp";
import { PropertyCard } from "@/components/properties/PropertyCard";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation";

export function PropertyDetailClient({
  property,
  relatedProperties,
}: {
  property: Property;
  relatedProperties: Property[];
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeFloorIndex, setActiveFloorIndex] = useState(0);
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  const images = property.gallery.length > 0 ? property.gallery : [property.coverImage];

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const activeFloor = property.floorPlans[activeFloorIndex] || property.floorPlans[0];

  const whatsappMessage = (
    `Hello Aurelia Private Office, I am interested in scheduling a private briefing regarding ${property.title} in ${property.location.city} (${property.priceFormatted}).`
  );

  return (
    <div className="relative">
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white z-10">
            <span className="text-xs uppercase tracking-widest text-[#BCB893] font-mono">
              {property.title} • Slide {activeImageIndex + 1} of {images.length}
            </span>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="relative flex-1 my-4 flex items-center justify-center">
            <div className="relative w-full h-full max-h-[80vh] max-w-6xl">
              <Image
                src={images[activeImageIndex]}
                alt={`${property.title} view ${activeImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>

            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
              }
              className="absolute left-1 sm:left-6 p-2 sm:p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#BCB893] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-1 sm:right-6 p-2 sm:p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#BCB893] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto py-2" data-lenis-prevent>
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                  activeImageIndex === idx ? "border-[#BCB893] scale-105" : "border-white/20 opacity-50"
                }`}
              >
                <Image src={img} alt="thumb" fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb & Actions */}
        <div className="flex items-center justify-between gap-3 text-xs text-[#6F6C55] mb-6">
          <div className="flex items-center gap-2 min-w-0">
            <Link href="/" className="hover:text-[#2B2612] transition-colors shrink-0">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-[#2B2612] transition-colors shrink-0">Properties</Link>
            <span>/</span>
            <span className="text-[#5A5734] font-medium truncate">{property.title}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#6B6840]/25 hover:border-[#5A5734] text-[#5A5734] hover:text-[#2B2612] transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Link Copied!" : "Share Dossier"}</span>
          </button>
        </div>

        {/* Property Header */}
        <FadeIn className="pb-8 border-b border-[#6B6840]/20 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-[#5A5734] text-white">
                {property.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-black/60 text-white border border-white/10">
                {property.status}
              </span>
              {property.signature && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-[#BCB893] text-[#1E1700] font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>Signature Reserve</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2612] font-light tracking-tight mt-1">
              {property.title}
            </h1>

            <div className="flex items-start sm:items-center gap-2 text-xs sm:text-sm text-[#6F6C55] mt-2">
              <MapPin className="w-4 h-4 shrink-0 text-[#5A5734]" />
              <span>{property.location.address}, {property.location.city}, {property.location.country}</span>
            </div>
          </div>

          <div className="lg:text-right">
            <span className="text-[10px] uppercase tracking-widest text-[#5A5734] block font-mono font-semibold">
              Guide Price
            </span>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#5A5734] font-normal mt-0.5">
              {property.priceFormatted}
            </div>
            {property.pricePerSqFt && (
              <span className="text-xs text-[#6F6C55] block mt-1 font-mono">
                {property.pricePerSqFt}
              </span>
            )}
          </div>
        </FadeIn>

        {/* Gallery Grid (Editorial Hero Presentation) */}
        <FadeIn delay={0.15} distance={32} duration={0.9} threshold={0.1} className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Large Image */}
          <div
            onClick={() => {
              setActiveImageIndex(0);
              setLightboxOpen(true);
            }}
            className="md:col-span-8 relative aspect-[4/3] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 cursor-pointer group"
          >
            <Image
              src={images[0]}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 65vw"
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-xs text-white border border-white/10">
              <Eye className="w-3.5 h-3.5 text-[#BCB893]" />
              <span>Click to Expand Fullscreen Lightbox ({images.length} High-Res Plates)</span>
            </div>
          </div>

          {/* Secondary Stacked Images */}
          <div className="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-4">
            {images.slice(1, 3).map((img, idx) => (
              <div
                key={idx}
                onClick={() => {
                  setActiveImageIndex(idx + 1);
                  setLightboxOpen(true);
                }}
                className="relative aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 cursor-pointer group"
              >
                <Image
                  src={img}
                  alt={`${property.title} view ${idx + 2}`}
                  fill
                  sizes="(max-width: 768px) 50vw, 35vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Specifications Matrix Bar */}
        <StaggerContainer staggerDelay={0.07} threshold={0.2} className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-[#DCDAC2] shadow-sm grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 sm:gap-6 text-left">
          <StaggerItem>
            <span className="text-[10px] uppercase tracking-wider text-[#5A5734] block font-mono font-semibold">Bedrooms</span>
            <span className="text-base sm:text-lg font-serif text-[#2B2612]">{property.bedrooms} Suites</span>
          </StaggerItem>
          <StaggerItem>
            <span className="text-[10px] uppercase tracking-wider text-[#5A5734] block font-mono font-semibold">Bathrooms</span>
            <span className="text-base sm:text-lg font-serif text-[#2B2612]">{property.bathrooms} Baths</span>
          </StaggerItem>
          <StaggerItem>
            <span className="text-[10px] uppercase tracking-wider text-[#5A5734] block font-mono font-semibold">Internal Living</span>
            <span className="text-base sm:text-lg font-serif text-[#2B2612]">{formatNumber(property.areaSqFt)} sq ft</span>
          </StaggerItem>
          <StaggerItem>
            <span className="text-[10px] uppercase tracking-wider text-[#5A5734] block font-mono font-semibold">Lot Size</span>
            <span className="text-base sm:text-lg font-serif text-[#2B2612]">{property.lotSize || "Private Reserve"}</span>
          </StaggerItem>
          <StaggerItem>
            <span className="text-[10px] uppercase tracking-wider text-[#5A5734] block font-mono font-semibold">Architect</span>
            <span className="text-base sm:text-lg font-serif text-[#2B2612] truncate block">{property.architect || "Atelier Private"}</span>
          </StaggerItem>
          <StaggerItem>
            <span className="text-[10px] uppercase tracking-wider text-[#5A5734] block font-mono font-semibold">Completion</span>
            <span className="text-base sm:text-lg font-serif text-[#2B2612]">{property.specs.completionYear}</span>
          </StaggerItem>
        </StaggerContainer>

        {/* 2-Column Content Layout: Left details, Right VIP Contact Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Narrative, Amenities, Floor Plans, Map */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description & Narrative */}
            <FadeIn threshold={0.1}>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2612] font-light">
                Architectural Monograph
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#6F6C55] font-light leading-relaxed">
                {property.description}
              </p>
              <div className="mt-6 p-5 rounded-2xl bg-white border border-[#DCDAC2] border-l-4 border-l-[#5A5734] text-sm text-[#2B2612] italic shadow-xs">
                &ldquo;{property.architecturalPhilosophy}&rdquo;
                <span className="block not-italic font-semibold text-[#5A5734] mt-2 text-xs">
                  — Architectural Philosophy &amp; Material Intent
                </span>
              </div>
            </FadeIn>

            {/* Comprehensive Amenities Grid */}
            <FadeIn threshold={0.1}>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#2B2612] font-light">
                Curated Amenities &amp; Private Infrastructure
              </h3>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white border border-[#DCDAC2] text-xs text-[#2B2612] shadow-xs"
                  >
                    <Check className="w-4 h-4 text-[#5A5734] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* Interactive Tabbed Floor Plan Visualizer */}
            {property.floorPlans && property.floorPlans.length > 0 && (
              <FadeIn threshold={0.1}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#5A5734] font-semibold">
                      Spatial Layout
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1700] font-light">
                      Architectural Floor Levels
                    </h3>
                  </div>

                  {/* Level Tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-full bg-[#F8F7F0] border border-[#DCDAC2] overflow-x-auto">
                    {property.floorPlans.map((fp, idx) => (
                      <button
                        key={fp.level}
                        type="button"
                        onClick={() => setActiveFloorIndex(idx)}
                        className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
                          activeFloorIndex === idx
                            ? "bg-[#5A5734] text-white font-semibold shadow-xs"
                            : "text-[#6F6C55] hover:text-[#1E1700]"
                        }`}
                      >
                        {fp.level.split(" - ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Level Detail Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#DCDAC2] shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#ECEADB]">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#5A5734] font-mono font-medium">
                        {activeFloor.level}
                      </span>
                      <h4 className="text-xl font-serif text-[#1E1700] mt-0.5">{activeFloor.title}</h4>
                    </div>
                    <span className="text-sm font-serif text-[#5A5734]">
                      {formatNumber(activeFloor.sqFt)} sq ft ({activeFloor.sqM} sq m)
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#5A5734] mt-4 font-light leading-relaxed">
                    {activeFloor.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-[#ECEADB]">
                    <span className="text-[10px] uppercase tracking-wider text-[#5A5734] block mb-2 font-mono font-semibold">
                      Designated Spatial Zones
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeFloor.rooms.map((room) => (
                        <span
                          key={room}
                          className="px-3 py-1 rounded-lg bg-[#F8F7F0] border border-[#DCDAC2] text-xs text-[#2B2612]"
                        >
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}

            {/* Neighborhood / Geographic Context */}
            <FadeIn threshold={0.1}>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1700] font-light">
                Geographic Positioning &amp; Environs
              </h3>
              <div className="mt-6 p-6 rounded-2xl bg-white border border-[#DCDAC2] shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#5A5734]/10 flex items-center justify-center text-[#5A5734]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-base font-serif text-[#1E1700]">{property.location.neighborhood}</h5>
                    <span className="text-xs text-[#6F6C55]">
                      Coordinates: {property.location.coordinates.lat}° N, {property.location.coordinates.lng}° W
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[#5A5734] font-light leading-relaxed">
                  Situated in {property.location.city}&apos;s most protected ultra-prime corridor. The property
                  benefits from total gated seclusion, private surveillance monitoring, direct helicopter access,
                  and immediate proximity to international private aviation airports.
                </p>

                <div className="mt-4 pt-4 border-t border-[#ECEADB] flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 sm:gap-3 text-xs text-[#6F6C55]">
                  <span>Private Airport: 18 min</span>
                  <span>Marina / Harbor: 12 min</span>
                  <span>Michelin Dining: 5 min</span>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Right Column: Sticky VIP Contact & Private Viewing Desk */}
          <FadeIn delay={0.2} distance={32} threshold={0.05} className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-6">
              {/* Action Box */}
              <div className="p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-[#1E1700] border border-[#BCB893]/30 shadow-2xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#CFCCAE] font-semibold mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Private Office Desk</span>
                </div>
                <h4 className="text-2xl font-serif text-white">Arrange a Viewing</h4>
                <p className="text-xs text-[#CFCCAE] mt-1 leading-relaxed">
                  Strictly confidential private viewings arranged exclusively for verified principals.
                </p>

                <div className="[color-scheme:dark] mt-6">
                  <ConsultationForm
                    compact
                    propertyTitle={`${property.title} — ${property.location.city} (${property.priceFormatted})`}
                  />
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <a
                    href={whatsappUrl(whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full text-center text-xs uppercase tracking-wider text-[#CFCCAE] border border-[#BCB893]/30 hover:border-[#CFCCAE] hover:text-white transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Direct WhatsApp Advisory
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsConsultationOpen(true)}
                    className="w-full py-2.5 rounded-full text-center text-xs uppercase tracking-wider text-[#CFCCAE]/70 hover:text-white transition-colors cursor-pointer"
                  >
                    Request Bespoke Acquisition Dossier
                  </button>
                </div>
              </div>

              {/* Private Security & Verification Badge */}
              <div className="p-5 rounded-2xl bg-white border border-[#DCDAC2] text-xs text-[#5A5734] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-[#1E1700] font-medium">
                  <Shield className="w-4 h-4 text-[#5A5734]" />
                  <span>Verified Legal Provenance</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Clean title verified by international notarial counsel. Available for sovereign wealth,
                  trust, and family office acquisition.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Related Residences Section */}
        {relatedProperties.length > 0 && (
          <div className="mt-16 sm:mt-24 pt-12 sm:pt-16 border-t border-[#DCDAC2]">
            <FadeIn className="flex flex-wrap items-end justify-between gap-3 mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#5A5734] font-semibold">
                  Complementary Residences
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-[#1E1700] font-light">
                  You May Also Consider
                </h3>
              </div>
              <Link
                href="/properties"
                className="text-xs uppercase tracking-widest text-[#5A5734] hover:text-[#5C3919] font-medium transition-colors flex items-center gap-1"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </FadeIn>

            <StaggerContainer staggerDelay={0.12} threshold={0.1} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProperties.map((rel) => (
                <StaggerItem key={rel.id}><PropertyCard property={rel} /></StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        )}
      </div>

      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
        propertyTitle={property.title}
      />
    </div>
  );
}
