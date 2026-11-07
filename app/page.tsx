"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { CompanyStats } from "@/components/sections/CompanyStats";
import { OwnerSection } from "@/components/sections/OwnerSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { AppointmentBooking } from "@/components/sections/AppointmentBooking";
import { Footer } from "@/components/Footer";
import { ConsultationModal } from "@/components/forms/ConsultationModal";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#1E1700] text-[#F4F3EA] flex flex-col selection:bg-[#BCB893]/30 selection:text-[#F4F3EA]">
      {/* Floating Menu Icon Over Gemini Watermark */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* 1. Slow, Pure-Smooth Cinematic Frame Walkthrough (Zero overstretching or blur) */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* 2. Track Record: How Many Properties Sold & 18+ Years Experience */}
        <CompanyStats />

        {/* 3. Information of the Owner & Managing Principal */}
        <OwnerSection onOpenBooking={handleOpenBooking} />

        {/* 4. Client Testimonials & Proven Acquisitions */}
        <TestimonialsSection />

        {/* 5. Book Consultation & Private Advisory Appointment */}
        <AppointmentBooking />
      </main>

      {/* 6. Curated Luxury Footer */}
      <Footer />

      {/* Interactive Booking / Consultation Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        propertyTitle="Exclusive Portfolio Consultation"
      />
    </div>
  );
}
