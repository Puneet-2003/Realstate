"use client";

import React, { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ContactSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("Acquisition Consultation");
  const [message, setMessage] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!name.trim()) errs.name = "Please provide your name.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Please provide a valid email.";
    }
    if (!message.trim() || message.trim().length < 5) {
      errs.message = "Please write a brief message.";
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
    <section id="contact" className="py-20 sm:py-28 bg-[#FAF7F2] relative overflow-hidden border-b border-[#D8C3AC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
            <span>Section 14 • Global Headquarters</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
            Connect With Our <br />
            <span className="italic font-normal text-[#7F4F24]">
              Private Client Desk.
            </span>
          </h2>
          <p className="mt-3 text-sm text-[#2D2018] font-normal leading-relaxed">
            Direct access to senior partners for acquisition inquiries, valuation audits, and confidential sales.
          </p>
        </div>

        {/* Contact Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Office Details, Hours & WhatsApp */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 rounded-3xl bg-white border border-[#D8C3AC] shadow-md shadow-[#2D1A0B]/6 space-y-8">
            <div className="space-y-6">
              {/* Office Address */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7F4F24]/10 border border-[#7F4F24]/20 flex items-center justify-center shrink-0 text-[#7F4F24]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B3F1B] font-bold block">
                    Global Headquarters
                  </span>
                  <span className="text-base font-semibold text-[#120C08] block mt-0.5 font-serif">
                    450 N Canon Drive, Penthouse Suite
                  </span>
                  <span className="text-xs text-[#2D2018] font-medium block">Beverly Hills, CA 90210, United States</span>
                </div>
              </div>

              {/* Direct Telephone */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7F4F24]/10 border border-[#7F4F24]/20 flex items-center justify-center shrink-0 text-[#7F4F24]">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B3F1B] font-bold block">
                    Telephone Line
                  </span>
                  <a
                    href="tel:+13108924400"
                    className="text-base font-semibold text-[#120C08] hover:text-[#7F4F24] transition-colors block mt-0.5 font-serif"
                  >
                    +1 (310) 892-4400
                  </a>
                  <span className="text-xs text-[#2D2018] font-medium block">Direct Private Desk</span>
                </div>
              </div>

              {/* Business Email */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7F4F24]/10 border border-[#7F4F24]/20 flex items-center justify-center shrink-0 text-[#7F4F24]">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B3F1B] font-bold block">
                    Confidential Email
                  </span>
                  <a
                    href="mailto:private@aurelia.com"
                    className="text-base font-semibold text-[#120C08] hover:text-[#7F4F24] transition-colors block mt-0.5 font-serif"
                  >
                    private@aurelia.com
                  </a>
                  <span className="text-xs text-[#2D2018] font-medium block">PGP Key Available Upon Request</span>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7F4F24]/10 border border-[#7F4F24]/20 flex items-center justify-center shrink-0 text-[#7F4F24]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-[#6B3F1B] font-bold block">
                    Operating Hours
                  </span>
                  <span className="text-base font-semibold text-[#120C08] block mt-0.5 font-serif">
                    Mon – Fri: 08:00 – 19:00 PST
                  </span>
                  <span className="text-xs text-[#2D2018] font-medium block">
                    Sat – Sun: By Confirmed Private Appointment
                  </span>
                </div>
              </div>
            </div>

            {/* Direct WhatsApp CTA Button */}
            <div className="pt-6 border-t border-[#D8C3AC]">
              <a
                href="https://wa.me/13108924400?text=Hello%2C%20I%20would%20like%20to%20inquire%20about%20Aurelia%20private%20estates."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl text-xs uppercase tracking-widest font-bold bg-emerald-50 text-emerald-900 border border-emerald-400 hover:bg-emerald-600 hover:text-white transition-all duration-300 shadow-sm cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 fill-current" />
                <span>Message on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps & Enquiry Form */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            {/* Google Maps Embed Container */}
            <div className="h-52 sm:h-56 rounded-3xl overflow-hidden border border-[#D8C3AC] shadow-md relative">
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
              <div className="absolute bottom-3 left-4 px-3 py-1.5 rounded-xl bg-[#18110B]/90 backdrop-blur-md border border-[#C89D5C]/30 text-[11px] font-mono text-[#F3E5C8]">
                Beverly Hills Penthouse Suite • Valet Available
              </div>
            </div>

            {/* Quick Enquiry Form */}
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D8C3AC] shadow-md shadow-[#2D1A0B]/6">
              <AnimatePresence mode="wait">
                {!isSent ? (
                  <form onSubmit={handleSubmit} noValidate className="space-y-4">
                    <div className="flex items-center justify-between border-b border-[#D8C3AC] pb-3">
                      <span className="text-xs uppercase font-mono tracking-widest text-[#7F4F24] font-bold">
                        Direct Client Enquiry
                      </span>
                      <span className="text-[11px] text-[#2D2018] font-medium">Response within 2 hours</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#120C08] font-bold mb-1">
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
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C3AC] text-xs text-[#120C08] placeholder-[#7F6B60] font-medium focus:outline-none focus:border-[#7F4F24]"
                        />
                        {errors.name && <p className="text-[10px] text-rose-600 font-semibold mt-1">{errors.name}</p>}
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#120C08] font-bold mb-1">
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
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C3AC] text-xs text-[#120C08] placeholder-[#7F6B60] font-medium focus:outline-none focus:border-[#7F4F24]"
                        />
                        {errors.email && <p className="text-[10px] text-rose-600 font-semibold mt-1">{errors.email}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#120C08] font-bold mb-1">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+1 (310) 892-4400"
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C3AC] text-xs text-[#120C08] placeholder-[#7F6B60] font-medium focus:outline-none focus:border-[#7F4F24]"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#120C08] font-bold mb-1">
                          Subject / Requirement
                        </label>
                        <select
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C3AC] text-xs text-[#120C08] font-medium focus:outline-none focus:border-[#7F4F24] [&>option]:bg-white [&>option]:text-[#120C08]"
                        >
                          <option value="Acquisition Consultation">Acquisition Consultation</option>
                          <option value="Property Disposal / Listing">Property Disposal / Listing</option>
                          <option value="Off-Market Portfolio Inquiry">Off-Market Portfolio Inquiry</option>
                          <option value="Commercial Capital Markets">Commercial Capital Markets</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#120C08] font-bold mb-1">
                        Confidential Message *
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={message}
                        onChange={(e) => {
                          setMessage(e.target.value);
                          if (errors.message) setErrors((prev) => ({ ...prev, message: "" }));
                        }}
                        placeholder="Inquiry specifics, price ranges, or desired geographic enclaves..."
                        className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#D8C3AC] text-xs text-[#120C08] placeholder-[#7F6B60] font-medium focus:outline-none focus:border-[#7F4F24] resize-none"
                      />
                      {errors.message && <p className="text-[10px] text-rose-600 font-semibold mt-1">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 rounded-xl text-xs uppercase tracking-widest font-bold bg-[#7F4F24] hover:bg-[#633917] text-[#FAF7F2] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 shadow-md shadow-[#7F4F24]/20"
                    >
                      {isSubmitting ? (
                        <span>Transmitting Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Confidential Inquiry</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center space-y-3"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#7F4F24] mx-auto" />
                    <h4 className="font-serif text-xl text-[#241810] font-light">Inquiry Transmitted Successfully</h4>
                    <p className="text-xs text-[#6B5B51] font-light max-w-sm mx-auto">
                      Thank you. Your message has been routed to our Managing Partner desk. A confidential reply will be provided shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setIsSent(false);
                        setMessage("");
                      }}
                      className="text-xs text-[#7F4F24] underline mt-2 block mx-auto cursor-pointer font-semibold"
                    >
                      Send Another Message
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
