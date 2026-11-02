"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { LuxuryInfoBar } from "@/components/sections/LuxuryInfoBar";
import { CompanyStats } from "@/components/sections/CompanyStats";
import { FeaturedPropertiesSection } from "@/components/sections/FeaturedPropertiesSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { TrustSection } from "@/components/sections/TrustSection";
import { AppointmentBooking } from "@/components/sections/AppointmentBooking";
import { FAQSection } from "@/components/sections/FAQSection";
import { BlogSection } from "@/components/sections/BlogSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { ConsultationModal } from "@/components/forms/ConsultationModal";
import { CinematicScrollGallery } from "@/components/animation";

export default function HomePage() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#120C08] flex flex-col selection:bg-[#C89D5C]/30 selection:text-[#18110B]">
      {/* SECTION 1: Premium Separate Navigation (Not mixing into hero frames) */}
      <Navbar onOpenBooking={handleOpenBooking} />

      <main className="flex-1">
        {/* SECTION 2: Hero Section with Proper Height Frames & Walkthrough */}
        <HeroSection onOpenBooking={handleOpenBooking} />

        {/* SECTION 3: Warm Cognac Luxury Info Ribbon (Image 2 style) */}
        <LuxuryInfoBar />

        {/* SECTION 4: Company Statistics */}
        <CompanyStats />

        {/* SECTION 5: Featured Properties ("Our Rooms" Image 2 style) */}
        <FeaturedPropertiesSection />

        {/* SECTION 5.5: Cinematic Pinned Scroll Gallery (Inspired by reference video) */}
        <CinematicScrollGallery
          title="Sanctuary."
          brand="AURELIA & CO."
          counter="04 / 09"
          caption="London • New York • St. Moritz • Lake Como"
          ctaText="Private Tour"
          onCtaClick={handleOpenBooking}
          cards={[
            {
              letter: "W",
              title: "West Bel-Air Estate",
              location: "Los Angeles, CA",
              image:
                "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
              initialOffset: 45,
            },
            {
              letter: "E",
              title: "East Side Penthouse",
              location: "Manhattan, NY",
              image:
                "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
              initialOffset: -25,
            },
            {
              letter: "S",
              title: "Swiss Alpine Monolith",
              location: "St. Moritz, CH",
              image:
                "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80",
              initialOffset: 55,
            },
            {
              letter: "T",
              title: "Trophy Como Villa",
              location: "Lake Como, IT",
              image:
                "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
              initialOffset: -30,
            },
          ]}
          description="Aurelia curates extraordinary sanctuaries sculpted into dramatic natural topographies. Each trophy estate represents an unbroken dialogue between monumental architecture and pristine wilderness."
        />

        {/* SECTION 6: The Aurelia Legacy ("The Luxury Experience" Image 2 style) */}
        <AboutSection />

        {/* SECTION 7: Why Choose Us (6 Certified Pillars) */}
        <WhyChooseUs />

        {/* SECTION 8: Our Services */}
        <ServicesSection />

        {/* SECTION 9: Meet Our Senior Team */}
        <TeamSection onOpenBooking={handleOpenBooking} />

        {/* SECTION 10: Client Testimonials (Atmospheric Luxury Dark) */}
        <TestimonialsSection />

        {/* SECTION 11: Trust & Institutional Credibility */}
        <TrustSection />

        {/* SECTION 12: Schedule a Private Consultation */}
        <AppointmentBooking />

        {/* SECTION 13: Frequently Asked Questions */}
        <FAQSection />

        {/* SECTION 14: Latest News & Market Insights */}
        <BlogSection />

        {/* SECTION 15: Contact Us & Global Headquarters */}
        <ContactSection />
      </main>

      {/* SECTION 16: Premium Warm Espresso Footer */}
      <Footer />

      {/* Global Interactive Booking / Consultation Modal */}
      <ConsultationModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        propertyTitle="Exclusive Portfolio Consultation"
      />
    </div>
  );
}
