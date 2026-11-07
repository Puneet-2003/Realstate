"use client";

import React from "react";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import {
  ShieldCheck,
  Phone,
  Mail,
  Lock,
} from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation";

export default function ContactPage() {
  const offices = [
    {
      city: "London (Mayfair)",
      address: "14 Berkeley Square, Mayfair, London W1J 6BQ",
      tel: "+44 20 7946 0912",
      hours: "09:00 – 19:00 GMT",
      lead: "Lord Julian Vance-Garrick Office",
    },
    {
      city: "New York (Midtown)",
      address: "767 Fifth Avenue, 42nd Floor, New York, NY 10153",
      tel: "+1 212 555 0198",
      hours: "09:00 – 18:30 EST",
      lead: "Aurelia Sterling Desk",
    },
    {
      city: "Zurich (Bahnhofstrasse)",
      address: "Bahnhofstrasse 28, 8001 Zürich, Switzerland",
      tel: "+41 44 211 8840",
      hours: "08:30 – 18:00 CET",
      lead: "Henrik Van Der Bilt Salon",
    },
    {
      city: "Dubai (DIFC)",
      address: "Gate Village, Building 04, Level 06, DIFC, Dubai",
      tel: "+971 4 362 7700",
      hours: "09:00 – 19:00 GST",
      lead: "Tariq Al-Mansoor Suite",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F7F0] text-[#2B2612] flex flex-col">
      <Navbar />

      <main className="flex-1 py-10 sm:py-14 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <StaggerContainer staggerDelay={0.14} className="max-w-3xl mb-10 sm:mb-16">
            <StaggerItem className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#5A5734] font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Private Discretionary Desk</span>
            </StaggerItem>
            <StaggerItem>
            <h1 className="font-serif text-[2.25rem] min-[400px]:text-4xl sm:text-6xl text-[#2B2612] font-light tracking-tight leading-[1.08]">
              Connect with Our <br />
              <span className="italic font-normal text-[#5A5734]">Global Senior Partners.</span>
            </h1>
            </StaggerItem>
            <StaggerItem as="div" className="mt-6 text-sm sm:text-base text-[#6F6C55] font-light leading-relaxed">
              We welcome inquiries from private collectors, family offices, and sovereign wealth representatives.
              All communications are strictly protected by bilateral non-disclosure agreements.
            </StaggerItem>
          </StaggerContainer>

          {/* Form & Offices Split */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left: Contact Form */}
            <FadeIn distance={40} duration={0.9} threshold={0.1} className="lg:col-span-7">
              <div className="[color-scheme:dark] p-5 sm:p-10 rounded-2xl sm:rounded-3xl bg-[#1E1700] border border-[#BCB893]/30 shadow-xl">
                <div className="flex items-center justify-between gap-4 pb-6 mb-6 border-b border-[#BCB893]/20">
                  <div>
                    <h3 className="font-serif text-2xl text-white font-light">Request a Private Consultation</h3>
                    <p className="text-xs text-[#CFCCAE] mt-1">Sent straight to our private office on WhatsApp</p>
                  </div>
                  <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#2B2612] border border-[#BCB893]/30 text-[10px] text-[#CFCCAE] font-mono">
                    <Lock className="w-3 h-3 text-[#BCB893]" />
                    <span>Confidential</span>
                  </div>
                </div>
                <ConsultationForm />
              </div>
            </FadeIn>

            {/* Right: Global Advisory Suites */}
            <StaggerContainer staggerDelay={0.1} threshold={0.05} delayChildren={0.25} className="lg:col-span-5 space-y-6">
              <StaggerItem className="p-6 rounded-2xl bg-white border border-[#DCDAC2] shadow-sm">
                <span className="text-[10px] uppercase tracking-widest text-[#5A5734] font-semibold">
                  Global Headquarters
                </span>
                <h4 className="text-xl font-serif text-[#2B2612] mt-1">Aurelia &amp; Co. Private Office</h4>
                <div className="mt-4 space-y-2 text-xs text-[#6F6C55]">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 shrink-0 text-[#5A5734]" />
                    <span>Global Concierge: +1 (310) 892-4400</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 shrink-0 text-[#5A5734]" />
                    <span>private@aurelia.com</span>
                  </div>
                </div>
              </StaggerItem>

              <div className="space-y-4">
                <StaggerItem as="span" className="text-xs uppercase tracking-widest text-[#5A5734] block font-semibold">
                  Regional Advisory Suites
                </StaggerItem>
                {offices.map((office) => (
                  <StaggerItem
                    key={office.city}
                    className="p-5 rounded-2xl bg-white border border-[#DCDAC2] shadow-sm"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                      <h5 className="font-serif text-base text-[#2B2612] font-semibold">{office.city}</h5>
                      <span className="text-[10px] text-[#5A5734] font-mono">{office.hours}</span>
                    </div>
                    <p className="text-xs text-[#6F6C55] mt-1">{office.address}</p>
                    <div className="mt-3 pt-3 border-t border-[#6B6840]/10 flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-xs text-[#6F6C55]">
                      <span>{office.tel}</span>
                      <span className="text-[#5A5734] text-[11px] font-medium">{office.lead}</span>
                    </div>
                  </StaggerItem>
                ))}
              </div>
            </StaggerContainer>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
