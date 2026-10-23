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
  Send,
  Eye,
  X,
  Share2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
} from "lucide-react";
import { Property } from "@/types/property";
import { formatNumber } from "@/lib/utils";
import { ConsultationModal } from "@/components/forms/ConsultationModal";
import { PropertyCard } from "@/components/properties/PropertyCard";

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
  const [inquiryName, setInquiryName] = useState("");
  const [inquiryEmail, setInquiryEmail] = useState("");
  const [inquiryPhone, setInquiryPhone] = useState("");
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryError, setInquiryError] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);

  const images = property.gallery.length > 0 ? property.gallery : [property.coverImage];

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryName.trim() || !inquiryEmail.trim()) {
      setInquiryError("Please enter your name and contact email.");
      return;
    }
    setInquiryError("");
    setInquirySubmitted(true);
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const activeFloor = property.floorPlans[activeFloorIndex] || property.floorPlans[0];

  const whatsappMessage = encodeURIComponent(
    `Hello Aurelia Private Office, I am interested in scheduling a private briefing regarding ${property.title} in ${property.location.city} (${property.priceFormatted}).`
  );

  return (
    <div className="relative">
      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between text-white z-10">
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
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
              className="absolute left-2 sm:left-6 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#c5a880] transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={() =>
                setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
              }
              className="absolute right-2 sm:right-6 p-3 rounded-full bg-black/60 border border-white/20 text-white hover:border-[#c5a880] transition-colors cursor-pointer"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-2 overflow-x-auto py-2">
            {images.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden shrink-0 border transition-all ${
                  activeImageIndex === idx ? "border-[#c5a880] scale-105" : "border-white/20 opacity-50"
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
        <div className="flex items-center justify-between text-xs text-zinc-400 mb-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-white transition-colors">Properties</Link>
            <span>/</span>
            <span className="text-[#c5a880]">{property.title}</span>
          </div>

          <button
            type="button"
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#c5a880] text-zinc-300 hover:text-white transition-colors cursor-pointer"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copiedLink ? "Link Copied!" : "Share Dossier"}</span>
          </button>
        </div>

        {/* Property Header */}
        <div className="pb-8 border-b border-white/10 flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold bg-[#c5a880]/20 text-[#c5a880] border border-[#c5a880]/30">
                {property.category}
              </span>
              <span className="px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-white/5 text-zinc-300 border border-white/10">
                {property.status}
              </span>
              {property.signature && (
                <span className="flex items-center gap-1 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest bg-[#c5a880] text-black font-semibold">
                  <Sparkles className="w-3 h-3" />
                  <span>Signature Reserve</span>
                </span>
              )}
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white font-light tracking-tight mt-1">
              {property.title}
            </h1>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-zinc-300 mt-2">
              <MapPin className="w-4 h-4 text-[#c5a880]" />
              <span>{property.location.address}, {property.location.city}, {property.location.country}</span>
            </div>
          </div>

          <div className="lg:text-right">
            <span className="text-[10px] uppercase tracking-widest text-zinc-400 block font-mono">
              Guide Price
            </span>
            <div className="text-3xl sm:text-4xl lg:text-5xl font-serif text-gold-accent font-normal mt-0.5">
              {property.priceFormatted}
            </div>
            {property.pricePerSqFt && (
              <span className="text-xs text-zinc-400 block mt-1">
                {property.pricePerSqFt}
              </span>
            )}
          </div>
        </div>

        {/* Gallery Grid (Editorial Hero Presentation) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Main Large Image */}
          <div
            onClick={() => {
              setActiveImageIndex(0);
              setLightboxOpen(true);
            }}
            className="md:col-span-8 relative aspect-[16/10] rounded-3xl overflow-hidden border border-white/10 cursor-pointer group"
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
              <Eye className="w-3.5 h-3.5 text-[#c5a880]" />
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
        </div>

        {/* Specifications Matrix Bar */}
        <div className="mt-8 p-6 rounded-2xl bg-[#0e0e14] border border-white/10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 text-left">
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-mono">Bedrooms</span>
            <span className="text-base sm:text-lg font-serif text-white">{property.bedrooms} Suites</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-mono">Bathrooms</span>
            <span className="text-base sm:text-lg font-serif text-white">{property.bathrooms} Baths</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-mono">Internal Living</span>
            <span className="text-base sm:text-lg font-serif text-white">{formatNumber(property.areaSqFt)} sq ft</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-mono">Lot Size</span>
            <span className="text-base sm:text-lg font-serif text-white">{property.lotSize || "Private Reserve"}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-mono">Architect</span>
            <span className="text-base sm:text-lg font-serif text-white truncate block">{property.architect || "Atelier Private"}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-mono">Completion</span>
            <span className="text-base sm:text-lg font-serif text-white">{property.specs.completionYear}</span>
          </div>
        </div>

        {/* 2-Column Content Layout: Left details, Right VIP Contact Card */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Narrative, Amenities, Floor Plans, Map */}
          <div className="lg:col-span-8 space-y-12">
            {/* Description & Narrative */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                Architectural Monograph
              </h3>
              <p className="mt-4 text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
                {property.description}
              </p>
              <div className="mt-6 p-5 rounded-2xl bg-white/[0.03] border-l-2 border-[#c5a880] text-sm text-zinc-300 italic">
                &ldquo;{property.architecturalPhilosophy}&rdquo;
                <span className="block not-italic font-medium text-[#c5a880] mt-2 text-xs">
                  — Architectural Philosophy &amp; Material Intent
                </span>
              </div>
            </div>

            {/* Comprehensive Amenities Grid */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                Curated Amenities &amp; Private Infrastructure
              </h3>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-[#0f0f16] border border-white/5 text-xs text-zinc-200"
                  >
                    <Check className="w-4 h-4 text-[#c5a880] shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Interactive Tabbed Floor Plan Visualizer */}
            {property.floorPlans && property.floorPlans.length > 0 && (
              <div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
                      Spatial Layout
                    </span>
                    <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                      Architectural Floor Levels
                    </h3>
                  </div>

                  {/* Level Tabs */}
                  <div className="flex items-center gap-1.5 p-1 rounded-full bg-black/60 border border-white/10 overflow-x-auto">
                    {property.floorPlans.map((fp, idx) => (
                      <button
                        key={fp.level}
                        type="button"
                        onClick={() => setActiveFloorIndex(idx)}
                        className={`px-3 py-1.5 rounded-full text-xs whitespace-nowrap transition-all cursor-pointer ${
                          activeFloorIndex === idx
                            ? "bg-[#c5a880] text-black font-semibold"
                            : "text-zinc-400 hover:text-white"
                        }`}
                      >
                        {fp.level.split(" - ")[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Level Detail Card */}
                <div className="p-6 sm:p-8 rounded-2xl bg-[#0e0e14] border border-white/10">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-white/10">
                    <div>
                      <span className="text-xs uppercase tracking-widest text-[#c5a880] font-mono">
                        {activeFloor.level}
                      </span>
                      <h4 className="text-xl font-serif text-white mt-0.5">{activeFloor.title}</h4>
                    </div>
                    <span className="text-sm font-serif text-zinc-300">
                      {formatNumber(activeFloor.sqFt)} sq ft ({activeFloor.sqM} sq m)
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-zinc-300 mt-4 font-light leading-relaxed">
                    {activeFloor.description}
                  </p>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-400 block mb-2 font-mono">
                      Designated Spatial Zones
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeFloor.rooms.map((room) => (
                        <span
                          key={room}
                          className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-zinc-300"
                        >
                          {room}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Neighborhood / Geographic Context */}
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-white font-light">
                Geographic Positioning &amp; Environs
              </h3>
              <div className="mt-6 p-6 rounded-2xl bg-[#0e0e14] border border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#c5a880]/10 flex items-center justify-center text-[#c5a880]">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <h5 className="text-base font-serif text-white">{property.location.neighborhood}</h5>
                    <span className="text-xs text-zinc-400">
                      Coordinates: {property.location.coordinates.lat}° N, {property.location.coordinates.lng}° W
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed">
                  Situated in {property.location.city}&apos;s most protected ultra-prime corridor. The property
                  benefits from total gated seclusion, private surveillance monitoring, direct helicopter access,
                  and immediate proximity to international private aviation airports.
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs text-zinc-400">
                  <span>Private Airport: 18 min</span>
                  <span>Marina / Harbor: 12 min</span>
                  <span>Michelin Dining: 5 min</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Sticky VIP Contact & Private Viewing Desk */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6">
              {/* Action Box */}
              <div className="p-6 sm:p-8 rounded-3xl bg-[#0d0d12] border border-[#c5a880]/30 shadow-2xl">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-semibold mb-2">
                  <Shield className="w-3.5 h-3.5" />
                  <span>Private Office Desk</span>
                </div>
                <h4 className="text-2xl font-serif text-white">Arrange a Viewing</h4>
                <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                  Strictly confidential private viewings arranged exclusively for verified principals.
                </p>

                {inquirySubmitted ? (
                  <div className="mt-6 p-4 rounded-xl bg-[#c5a880]/10 border border-[#c5a880]/30 text-center">
                    <CheckCircle2 className="w-8 h-8 text-[#c5a880] mx-auto mb-2" />
                    <span className="text-xs text-white font-medium block">Inquiry Transmitted</span>
                    <span className="text-[11px] text-zinc-300 block mt-1">
                      Our Senior Partner will reach out via confidential channels.
                    </span>
                  </div>
                ) : (
                  <form onSubmit={handleInquirySubmit} className="mt-6 space-y-3.5">
                    {inquiryError && (
                      <div className="p-2.5 rounded bg-red-900/40 border border-red-500/40 text-[11px] text-red-200">
                        {inquiryError}
                      </div>
                    )}
                    <div>
                      <input
                        type="text"
                        required
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        placeholder="Full Legal Name"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="email"
                        required
                        value={inquiryEmail}
                        onChange={(e) => setInquiryEmail(e.target.value)}
                        placeholder="Confidential Email Address"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>
                    <div>
                      <input
                        type="tel"
                        value={inquiryPhone}
                        onChange={(e) => setInquiryPhone(e.target.value)}
                        placeholder="Direct Phone / WhatsApp"
                        className="w-full px-3.5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-xs focus:outline-none focus:border-[#c5a880] transition-colors"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all shadow-xl shadow-[#c5a880]/20 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Transmit Viewing Request</span>
                    </button>
                  </form>
                )}

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <a
                    href={`https://wa.me/442079460912?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-full text-center text-xs uppercase tracking-wider text-zinc-300 border border-white/15 hover:border-[#c5a880] transition-colors flex items-center justify-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    Direct WhatsApp Advisory
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsConsultationOpen(true)}
                    className="w-full py-2.5 rounded-full text-center text-xs uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
                  >
                    Request Bespoke Acquisition Dossier
                  </button>
                </div>
              </div>

              {/* Private Security & Verification Badge */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 text-xs text-zinc-400 space-y-2">
                <div className="flex items-center gap-2 text-white font-medium">
                  <Shield className="w-4 h-4 text-[#c5a880]" />
                  <span>Verified Legal Provenance</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Clean title verified by international notarial counsel. Available for sovereign wealth,
                  trust, and family office acquisition.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Related Residences Section */}
        {relatedProperties.length > 0 && (
          <div className="mt-24 pt-16 border-t border-white/10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a880] font-semibold">
                  Complementary Residences
                </span>
                <h3 className="font-serif text-2xl sm:text-4xl text-white font-light">
                  You May Also Consider
                </h3>
              </div>
              <Link
                href="/properties"
                className="text-xs uppercase tracking-widest text-[#c5a880] hover:text-white transition-colors flex items-center gap-1"
              >
                <span>View Full Portfolio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProperties.map((rel) => (
                <PropertyCard key={rel.id} property={rel} />
              ))}
            </div>
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
