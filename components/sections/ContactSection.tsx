"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  CheckCircle2,
  ShieldCheck,
  Globe2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { whatsappUrl } from "@/lib/whatsapp";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Trophy Acquisition Consultation");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please provide your legal name or representative.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Please provide a valid confidential email.";
    }
    if (!message.trim() || message.trim().length < 5) {
      errs.message = "Please write a brief acquisition inquiry.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 700);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#F4F3EA] relative overflow-hidden border-b border-[#D7D4BD]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E7E5D4] border border-[#D7D4BD] text-[11px] font-mono uppercase tracking-[0.25em] text-[#9D9970] font-semibold mb-4">
            <Globe2 className="w-3.5 h-3.5 text-[#9D9970]" />
            <span>Private Client Advisory</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-[2.75rem] lg:text-[3.25rem] text-[#2B2712] font-light tracking-tight">
            Connect With Our <br />
            <span className="italic font-normal text-[#9D9970]">
              Global Private Client Desk.
            </span>
          </h2>
          <p className="mt-4 text-base text-[#6F6C55] font-light leading-relaxed max-w-2xl">
            Direct, discreet access to senior partners for trophy acquisition inquiries, unlisted portfolio access, and cross-border transactions.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Office Details, Hours & WhatsApp */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-2xl bg-white border border-[#D7D4BD] shadow-xl shadow-black/[0.02] space-y-8">
            <div className="space-y-6">
              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E7E5D4] border border-[#D7D4BD] flex items-center justify-center shrink-0 text-[#9D9970]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#9D9970] font-semibold block">
                    Global Headquarters
                  </span>
                  <span className="text-base font-serif text-[#2B2712] block mt-0.5 font-normal">
                    450 N Canon Drive, Penthouse Suite
                  </span>
                  <span className="text-xs text-[#6F6C55] font-light block">Beverly Hills, CA 90210, United States</span>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E7E5D4] border border-[#D7D4BD] flex items-center justify-center shrink-0 text-[#9D9970]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#9D9970] font-semibold block">
                    Telephone Line
                  </span>
                  <a
                    href="tel:+13108924400"
                    className="text-base font-serif text-[#2B2712] hover:text-[#9D9970] transition-colors block mt-0.5 font-normal"
                  >
                    +1 (310) 892-4400
                  </a>
                  <span className="text-xs text-[#6F6C55] font-light block">Direct Partner Advisory Desk</span>
                </div>
              </div>

              {/* Business Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E7E5D4] border border-[#D7D4BD] flex items-center justify-center shrink-0 text-[#9D9970]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#9D9970] font-semibold block">
                    Confidential Email
                  </span>
                  <a
                    href="mailto:private@aurelia.com"
                    className="text-base font-serif text-[#2B2712] hover:text-[#9D9970] transition-colors block mt-0.5 font-normal"
                  >
                    private@aurelia.com
                  </a>
                  <span className="text-xs text-[#6F6C55] font-light block">PGP Encrypted Communication Available</span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#E7E5D4] border border-[#D7D4BD] flex items-center justify-center shrink-0 text-[#9D9970]">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#9D9970] font-semibold block">
                    Operating Hours
                  </span>
                  <span className="text-base font-serif text-[#2B2712] block mt-0.5 font-normal">
                    Mon – Fri: 08:00 – 19:00 PST
                  </span>
                  <span className="text-xs text-[#6F6C55] font-light block">
                    Sat – Sun: By Confirmed Private Appointment
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-6 border-t border-[#D7D4BD]">
              <a
                href={whatsappUrl("Hello, I would like to inquire about Aurelia private estates.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-full text-xs font-mono uppercase tracking-[0.15em] font-semibold bg-[#2B2712] text-[#F4F3EA] hover:bg-[#9D9970] hover:text-[#1E1700] transition-all duration-300 shadow-md cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Message Private Client Desk</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps & Enquiry Form */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Google Maps Embed Container */}
            <div className="h-52 sm:h-56 rounded-2xl overflow-hidden border border-[#D7D4BD] shadow-md relative">
              <iframe
                title="Aurelia & Co. Beverly Hills Headquarters"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.123456789!2d-118.4005!3d34.0700!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147bb%3A0x6bcfd3c13876e4c2!2s450%20N%20Canon%20Dr%2C%20Beverly%20Hills%2C%20CA%2090210!5e0!3m2!1sen!2sus!4v1600000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-3 left-4 px-3 py-1.5 rounded-full bg-[#1E1700]/90 backdrop-blur-md border border-[#D7D4BD]/20 text-[11px] font-mono text-[#F4F3EA]">
                Beverly Hills Penthouse Suite • Valet Available
              </div>
            </div>

            {/* Quick Enquiry Form */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#D7D4BD] shadow-xl shadow-black/[0.02]">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#D7D4BD] pb-3">
                      <span className="text-xs uppercase font-mono tracking-widest text-[#9D9970] font-semibold">
                        Direct Client Enquiry
                      </span>
                      <span className="text-[11px] font-mono text-[#6F6C55]">Response within 2 hours</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-[#2B2712] font-semibold mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => {
                            setName(e.target.value);
                            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
                          }}
                          placeholder="Lord Julian Sterling"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F3EA] border border-[#D7D4BD] text-xs text-[#2B2712] placeholder-[#6F6C55]/60 font-sans focus:outline-none focus:border-[#9D9970]"
                        />
                        {errors.name && <p className="text-[10px] text-rose-600 font-medium mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-[#2B2712] font-semibold mb-1">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                          }}
                          placeholder="client@familyoffice.com"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F3EA] border border-[#D7D4BD] text-xs text-[#2B2712] placeholder-[#6F6C55]/60 font-sans focus:outline-none focus:border-[#9D9970]"
                        />
                        {errors.email && <p className="text-[10px] text-rose-600 font-medium mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-[#2B2712] font-semibold mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (555) 000-0000"
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F3EA] border border-[#D7D4BD] text-xs text-[#2B2712] placeholder-[#6F6C55]/60 font-sans focus:outline-none focus:border-[#9D9970]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase font-mono tracking-wider text-[#2B2712] font-semibold mb-1">
                          Inquiry Focus
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F3EA] border border-[#D7D4BD] text-xs text-[#2B2712] font-sans focus:outline-none focus:border-[#9D9970]"
                        >
                          <option>Trophy Acquisition Consultation</option>
                          <option>Private Estate Viewing</option>
                          <option>Off-Market Portfolio Access</option>
                          <option>Institutional Property Advisory</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase font-mono tracking-wider text-[#2B2712] font-semibold mb-1">
                        Acquisition Brief / Message *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                        }}
                        placeholder="Please specify geographical preference, architectural style, or confidentiality constraints..."
                        className="w-full px-3.5 py-2.5 rounded-xl bg-[#F4F3EA] border border-[#D7D4BD] text-xs text-[#2B2712] placeholder-[#6F6C55]/60 font-sans focus:outline-none focus:border-[#9D9970] resize-none"
                      />
                      {errors.message && <p className="text-[10px] text-rose-600 font-medium mt-1">{errors.message}</p>}
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                      <div className="flex items-center gap-2 text-[10px] text-[#6F6C55] font-mono">
                        <ShieldCheck className="w-3.5 h-3.5 text-[#9D9970]" />
                        <span>Protected under Non-Disclosure Protocol</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-full text-xs font-mono uppercase tracking-[0.2em] font-semibold bg-[#9D9970] text-[#1E1700] hover:bg-[#BCB893] transition-all duration-300 shadow-md cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Transmitting...</span>
                        ) : (
                          <>
                            <span>Transmit Inquiry</span>
                            <Send className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-10 text-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#E7E5D4] border border-[#9D9970] text-[#9D9970] mx-auto flex items-center justify-center">
                      <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-2xl text-[#2B2712]">
                      Inquiry Confidentially Received
                    </h3>
                    <p className="text-xs text-[#6F6C55] max-w-md mx-auto leading-relaxed">
                      Thank you. A senior managing director will review your brief and make contact via your designated communication channel within 2 hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSent(false);
                        setMessage("");
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-[#D7D4BD] text-xs font-mono text-[#2B2712] hover:border-[#9D9970] transition-colors"
                    >
                      <span>Send Another Inquiry</span>
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
