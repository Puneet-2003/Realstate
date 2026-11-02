"use client";

import React, { useState, useEffect } from "react";
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Mail,
  Phone,
  Building,
  CheckCircle2,
  ShieldCheck,
  Send,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { PROPERTIES } from "@/lib/properties";

export function AppointmentBooking() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interestedProperty, setInterestedProperty] = useState(PROPERTIES[0].title);
  const [meetingType, setMeetingType] = useState<"Office Meeting" | "Property Site Visit" | "Virtual Meeting" | "Investment Consultation">("Property Site Visit");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("11:30 AM");
  const [message, setMessage] = useState("");
  const [minDate, setMinDate] = useState("");

  useEffect(() => {
    setMinDate(new Date().toISOString().split("T")[0]);
  }, []);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationData, setConfirmationData] = useState<{
    referenceId: string;
    fullName: string;
    email: string;
    property: string;
    meetingType: string;
    date: string;
    time: string;
  } | null>(null);

  const meetingTypes = [
    { id: "Property Site Visit", label: "Property Site Visit", desc: "Private chauffeured viewing of the property." },
    { id: "Office Meeting", label: "Office Meeting", desc: "Consultation at our Manhattan / Beverly Hills Penthouse." },
    { id: "Virtual Meeting", label: "Virtual Meeting", desc: "Encrypted 4K digital architectural walkthrough." },
    { id: "Investment Consultation", label: "Investment Consultation", desc: "Portfolio financial modeling & tax structuring." },
  ];

  const timeSlots = ["10:00 AM", "11:30 AM", "01:30 PM", "03:00 PM", "04:30 PM", "06:00 PM"];

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full legal name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    const phoneClean = phone.replace(/[^0-9+]/g, "");
    if (!phoneClean || phoneClean.length < 7) {
      errs.phone = "Please enter a valid telephone number.";
    }
    if (!preferredDate) {
      errs.preferredDate = "Please choose your preferred appointment date.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const ref = "AUR-" + Math.floor(100000 + Math.random() * 900000);
      setConfirmationData({
        referenceId: ref,
        fullName,
        email,
        property: interestedProperty,
        meetingType,
        date: preferredDate,
        time: preferredTime,
      });
      setIsSubmitting(false);
    }, 800);
  };

  const handleReset = () => {
    setConfirmationData(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setPreferredDate("");
    setMessage("");
  };

  return (
    <section id="schedule-meeting" className="py-20 sm:py-28 bg-[#F5EFEB] relative overflow-hidden border-b border-[#D8C3AC]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#6B3F1B] font-bold mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-[#8C5A30]" />
            <span>Section 11 • Private Appointments</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#120C08] font-normal tracking-tight">
            Schedule a Private <br />
            <span className="italic font-normal text-[#7F4F24]">
              Consultation &amp; Visit.
            </span>
          </h2>
          <p className="mt-3 text-sm text-[#2D2018] font-normal max-w-lg mx-auto leading-relaxed">
            Book a discreet meeting or private property site visit with a senior partner. All inquiries handled under non-disclosure protocol.
          </p>
        </div>

        {/* Card Frame */}
        <div className="rounded-3xl bg-white border border-[#D8C3AC] p-6 sm:p-10 lg:p-12 shadow-xl shadow-[#2D1A0B]/8">
          <AnimatePresence mode="wait">
            {!confirmationData ? (
              <motion.form
                key="booking-form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-8"
              >
                {/* Meeting Type Selection */}
                <div>
                  <label className="block text-xs uppercase font-mono tracking-widest text-[#7F4F24] font-bold mb-3">
                    Step 1: Select Meeting Type
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {meetingTypes.map((type) => {
                      const selected = meetingType === type.id;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setMeetingType(type.id as typeof meetingType)}
                          className={`p-4 rounded-xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                            selected
                              ? "bg-[#7F4F24] border-[#7F4F24] text-white shadow-md shadow-[#7F4F24]/20"
                              : "bg-[#FAF7F2] border-[#D8C3AC] text-[#120C08] hover:border-[#7F4F24]"
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block">{type.label}</span>
                            <span className={`text-[11px] block mt-1 leading-snug font-normal ${selected ? "text-[#FAF7F2]" : "text-[#2D2018]"}`}>
                              {type.desc}
                            </span>
                          </div>
                          <span className={`text-[10px] font-mono mt-3 inline-block font-bold ${selected ? "text-[#F3E5C8]" : "text-[#7F4F24]"}`}>
                            {selected ? "● Selected" : "○ Select"}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Primary Details Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#D8C3AC]">
                  {/* Full Name */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#120C08] font-bold mb-1.5">
                      Full Legal Name <span className="text-[#7F4F24]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <User className="w-4 h-4 text-[#7F4F24]" />
                      </div>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                        }}
                        placeholder="Lord Julian Sterling"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D8C3AC] text-sm text-[#120C08] placeholder-[#7F6B60] focus:outline-none focus:border-[#7F4F24] font-medium transition-colors"
                      />
                    </div>
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#120C08] font-bold mb-1.5">
                      Email Address <span className="text-[#7F4F24]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Mail className="w-4 h-4 text-[#7F4F24]" />
                      </div>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                        }}
                        placeholder="client@familyoffice.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D8C3AC] text-sm text-[#120C08] placeholder-[#7F6B60] focus:outline-none focus:border-[#7F4F24] font-medium transition-colors"
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#120C08] font-bold mb-1.5">
                      Phone Number <span className="text-[#7F4F24]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Phone className="w-4 h-4 text-[#7F4F24]" />
                      </div>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => {
                          setPhone(e.target.value);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                        }}
                        placeholder="+1 (310) 892-4400"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D8C3AC] text-sm text-[#120C08] placeholder-[#7F6B60] focus:outline-none focus:border-[#7F4F24] font-medium transition-colors"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.phone}</p>
                    )}
                  </div>

                  {/* Interested Property */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#120C08] font-bold mb-1.5">
                      Interested Property / Scope
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <Building className="w-4 h-4 text-[#7F4F24]" />
                      </div>
                      <select
                        value={interestedProperty}
                        onChange={(e) => setInterestedProperty(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D8C3AC] text-sm text-[#120C08] focus:outline-none focus:border-[#7F4F24] font-medium transition-colors [&>option]:bg-white [&>option]:text-[#120C08]"
                      >
                        {PROPERTIES.map((p) => (
                          <option key={p.id} value={p.title}>
                            {p.title} ({p.priceFormatted})
                          </option>
                        ))}
                        <option value="General Investment Portfolio">General Investment Portfolio</option>
                        <option value="Private Off-Market Inquiries">Private Off-Market Inquiries</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Date & Time Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-4 border-t border-[#D8C3AC]">
                  {/* Preferred Date */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#120C08] font-bold mb-1.5">
                      Preferred Date <span className="text-[#7F4F24]">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                        <CalendarIcon className="w-4 h-4 text-[#7F4F24]" />
                      </div>
                      <input
                        type="date"
                        required
                        value={preferredDate}
                        min={minDate || undefined}
                        onChange={(e) => {
                          setPreferredDate(e.target.value);
                          if (errors.preferredDate) setErrors((prev) => ({ ...prev, preferredDate: "" }));
                        }}
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-[#D8C3AC] text-sm text-[#120C08] focus:outline-none focus:border-[#7F4F24] font-medium transition-colors"
                      />
                    </div>
                    {errors.preferredDate && (
                      <p className="mt-1 text-xs text-rose-600 font-semibold">{errors.preferredDate}</p>
                    )}
                  </div>

                  {/* Preferred Time Slots */}
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider text-[#120C08] font-bold mb-1.5">
                      Preferred Time Slot
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setPreferredTime(time)}
                          className={`py-2 text-xs rounded-lg font-mono border text-center transition-all cursor-pointer font-semibold ${
                            preferredTime === time
                              ? "bg-[#7F4F24] text-white border-[#7F4F24] shadow-xs"
                              : "bg-[#FAF7F2] border-[#D8C3AC] text-[#120C08] hover:border-[#7F4F24]"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Additional Message */}
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#120C08] font-bold mb-1.5">
                    Additional Confidential Requirements or Questions
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Specific architectural preferences, helicopter arrival coordination, or investment horizon notes..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white border border-[#D8C3AC] text-sm text-[#120C08] placeholder-[#7F6B60] focus:outline-none focus:border-[#7F4F24] font-medium transition-colors resize-none"
                  />
                </div>

                {/* Submit Row with NDA Guarantee */}
                <div className="pt-4 border-t border-[#D8C3AC] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-[#2D2018] font-mono font-medium">
                    <ShieldCheck className="w-4 h-4 text-[#7F4F24]" />
                    <span>Protected under strict mutual non-disclosure (NDA)</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-xs uppercase tracking-widest font-bold text-[#18110B] bg-gradient-to-r from-[#C89D5C] via-[#DFBD85] to-[#C89D5C] hover:brightness-105 shadow-md shadow-[#C89D5C]/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Reserving Schedule...</span>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>Confirm Appointment Request</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              /* Success Confirmation Screen */
              <motion.div
                key="booking-success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-6 sm:py-8 text-center max-w-xl mx-auto"
              >
                <div className="w-16 h-16 rounded-full bg-[#7F4F24]/10 border border-[#7F4F24]/30 text-[#7F4F24] mx-auto flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <span className="text-xs uppercase font-mono tracking-widest text-[#7F4F24] font-semibold block mb-2">
                  Booking Confirmed • Reference: {confirmationData.referenceId}
                </span>

                <h3 className="font-serif text-2xl sm:text-3xl text-[#241810] font-light">
                  Thank You, {confirmationData.fullName}
                </h3>

                <p className="mt-3 text-xs sm:text-sm text-[#6B5B51] font-light leading-relaxed">
                  Your appointment request for <strong>{confirmationData.property}</strong> has been logged with our Private Wealth desk. A senior partner will contact you directly at <strong>{confirmationData.email}</strong> to coordinate your arrival.
                </p>

                {/* Appointment Receipt Card */}
                <div className="mt-6 p-5 rounded-2xl bg-[#FAF7F2] border border-[#8C5A30]/20 text-left text-xs font-mono space-y-2">
                  <div className="flex justify-between border-b border-[#8C5A30]/10 pb-1.5">
                    <span className="text-[#6B5B51]">Meeting Type:</span>
                    <span className="text-[#241810] font-medium">{confirmationData.meetingType}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#8C5A30]/10 pb-1.5">
                    <span className="text-[#6B5B51]">Scheduled Date:</span>
                    <span className="text-[#7F4F24] font-medium">{confirmationData.date}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#8C5A30]/10 pb-1.5">
                    <span className="text-[#6B5B51]">Confirmed Window:</span>
                    <span className="text-[#241810] font-medium">{confirmationData.time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6B5B51]">NDA Status:</span>
                    <span className="text-emerald-700 font-semibold">Executed &amp; Bound</span>
                  </div>
                </div>

                <div className="mt-8 flex items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-full text-xs uppercase tracking-widest bg-[#FAF7F2] hover:bg-[#7F4F24] hover:text-white text-[#7F4F24] border border-[#8C5A30]/30 transition-all cursor-pointer font-semibold"
                  >
                    Schedule Another Session
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
