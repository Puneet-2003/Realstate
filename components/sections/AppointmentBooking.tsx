"use client";

import React from "react";
import { Sparkles, Shield } from "lucide-react";
import { ConsultationForm } from "@/components/forms/ConsultationForm";
import { FadeIn, StaggerContainer, StaggerItem } from "@/components/animation";

export function AppointmentBooking() {
  return (
    <section
      id="schedule-meeting"
      className="[color-scheme:dark] py-24 sm:py-32 bg-[#1E1700] relative overflow-hidden border-b border-[#3E3A1F]"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <StaggerContainer className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <StaggerItem className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#BCB893] font-mono font-medium mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#BCB893]" />
            <span>Confidential Acquisition Desk • Private Appointments</span>
          </StaggerItem>
          <StaggerItem>
            <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#F4F3EA] font-light tracking-tight">
              Schedule a Private <br />
              <span className="italic text-[#BCB893]">Consultation &amp; Visit.</span>
            </h2>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 text-sm text-[#A9A68A] font-light max-w-lg mx-auto leading-relaxed">
              Reserve a discreet meeting or private property visit with a senior partner. Your request
              opens in WhatsApp, ready to send directly to our private office.
            </p>
          </StaggerItem>
        </StaggerContainer>

        {/* Card Frame */}
        <FadeIn
          distance={40}
          duration={0.9}
          threshold={0.1}
          className="rounded-3xl bg-[#171200] border border-[#3E3A1F] p-5 sm:p-10 shadow-xl shadow-black/30"
        >
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#CFCCAE] font-semibold mb-1">
            <Shield className="w-3.5 h-3.5 text-[#BCB893]" />
            <span>Confidential Private Advisory</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
            Request a Private Consultation
          </h3>
          <p className="text-xs text-[#CFCCAE] mt-1 mb-6 leading-relaxed">
            Connect with our senior partners for off-market acquisitions, bespoke architectural
            representations, and private viewings.
          </p>
          <ConsultationForm />
        </FadeIn>
      </div>
    </section>
  );
}
