"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { ScrollJourney } from "@/components/ScrollJourney";
import { StorySection } from "@/components/StorySection";
import { ArchitectureSection } from "@/components/ArchitectureSection";
import { Showcase3DSection } from "@/components/sections/Showcase3DSection";
import { ResidencesSection } from "@/components/ResidencesSection";
import { AmenitiesSection } from "@/components/AmenitiesSection";
import { ProjectDetails } from "@/components/ProjectDetails";
import { VisitForm } from "@/components/VisitForm";
import { Footer } from "@/components/Footer";
import { ConsultationModal } from "@/components/forms/ConsultationModal";
import { SearchPanel } from "@/components/search/SearchPanel";
import { FeaturedProperties } from "@/components/sections/FeaturedProperties";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F0E8] flex flex-col selection:bg-[#C6A76B]/30 selection:text-white">
      {/* Apple-Style Minimal Glass Navigation */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* Flagship Continuous Architectural Journey: 240 Photorealistic Frames */}
        <section id="journey-stage" className="relative">
          <ScrollJourney onOpenBooking={handleOpenBooking} />
        </section>

        {/* Architectural Story & Philosophy */}
        <StorySection />

        {/* Architectural Precision, Materiality & Facade Engineering */}
        <ArchitectureSection />

        {/* Real-time 3D Spatial Exploration Lab */}
        <Showcase3DSection />

        {/* Curated Luxury Residences & Sky Penthouses */}
        <ResidencesSection onOpenBooking={handleOpenBooking} />

        {/* Verified Lifestyle Amenities & Privileges */}
        <AmenitiesSection onOpenBooking={handleOpenBooking} />

        {/* Global Property Discovery & Search Suite */}
        <section className="relative z-20 py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          <div className="mb-6">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A76B] block">
              Global Portfolio
            </span>
            <h3 className="text-2xl sm:text-4xl font-serif text-white font-light mt-1">
              Explore Sister Developments &amp; Private Estates
            </h3>
          </div>
          <SearchPanel />
        </section>

        {/* Curated Portfolio Showcase */}
        <FeaturedProperties />

        {/* Project Telemetry & Prestigious Location */}
        <ProjectDetails />

        {/* Final Architectural Reveal & Validated Private Visit Booking */}
        <VisitForm />
      </main>

      {/* Sophisticated Luxury Footer */}
      <Footer />

      {/* Global Interactive Booking Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        propertyTitle="The Lumière Residences & Penthouses"
      />
    </div>
  );
}
