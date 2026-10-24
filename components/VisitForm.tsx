"use client";

import React, { useState } from "react";
import {
  Calendar,
  Clock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  User,
  Mail,
  Phone,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function VisitForm() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [visitDate, setVisitDate] = useState("");
  const [residenceTier, setResidenceTier] = useState("The Sky Penthouse ($48.5M)");
  const [notes, setNotes] = useState("");

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedBooking, setSubmittedBooking] = useState<{
    reference: string;
    name: string;
    date: string;
    tier: string;
  } | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = "Please enter your full name.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = "Please enter a valid email address.";
    }
    const phoneClean = phone.replace(/[^0-9+]/g, "");
    if (!phoneClean || phoneClean.length < 8) {
      errs.phone = "Please enter a valid contact phone number with country code.";
    }
    if (!visitDate) {
      errs.visitDate = "Please select your preferred visit date.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Realistic API submission simulation
    setTimeout(() => {
      const refCode = `LUM-${new Date().getFullYear()}-${Math.floor(
        1000 + Math.random() * 9000
      )}`;
      setSubmittedBooking({
        reference: refCode,
        name: fullName,
        date: visitDate,
        tier: residenceTier,
      });
      setIsSubmitting(false);
    }, 900);
  };

  const handleReset = () => {
    setSubmittedBooking(null);
    setFullName("");
    setEmail("");
    setPhone("");
    setVisitDate("");
    setNotes("");
    setErrors({});
  };

  const [todayStr, setTodayStr] = useState("");

  React.useEffect(() => {
    setTodayStr(new Date().toISOString().split("T")[0]);
  }, []);

  return (
    <section id="inquire" className="py-28 sm:py-36 bg-[#050505] relative overflow-hidden">
      {/* Background architectural glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#C6A76B]/5 blur-[160px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.3em] text-[#C6A76B] mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Private Acquisition &amp; Residency</span>
          </div>

          <h2 className="font-serif text-4xl sm:text-6xl text-white font-light tracking-tight leading-[1.08]">
            Your Next Chapter <br />
            <span className="italic font-normal text-gradient bg-gradient-to-r from-[#FFFFFF] via-[#E8D4A8] to-[#C6A76B] bg-clip-text text-transparent">
              Begins Here.
            </span>
          </h2>

          <p className="mt-4 text-base sm:text-lg text-white/70 font-light leading-relaxed">
            Discover a new standard of refined living. Arrange a confidential preview with our
            senior architectural advisory team.
          </p>
        </motion.div>

        {/* Closing Visual Hero & Form Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Final Architectural Hero Shot */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/10 relative shadow-2xl bg-black flex flex-col justify-between group"
          >
            <div className="relative aspect-[4/5] lg:aspect-auto lg:h-full w-full overflow-hidden">
              <img
                src="/sequence/frame-001.jpg"
                alt="The Lumière Tower Twilight Exterior"
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

              <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#C6A76B] bg-black/70 px-3 py-1 rounded-full backdrop-blur-md border border-[#C6A76B]/30">
                  FLAGSHIP MONOLITH
                </span>
                <span className="text-[10px] font-mono text-white/70 bg-black/60 px-2.5 py-1 rounded-full">
                  TWILIGHT EXTERIOR
                </span>
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono text-[#C6A76B] uppercase tracking-wider block">
                  The Lumière Tower
                </span>
                <h4 className="font-serif text-2xl text-white font-light mt-1">
                  Architecture Beyond Ordinary
                </h4>
                <p className="text-xs text-white/60 font-light mt-2 leading-relaxed">
                  A private enclave where architectural restraint meets uncompromising luxury.
                  Confidential appointments include a private vehicle escort and bespoke floorplan
                  consultation.
                </p>

                <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
                  <span>SALES GALLERY OPEN DAILY</span>
                  <span className="text-[#C6A76B]">BY APPOINTMENT</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Refined Inquiry / Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 bg-[#09090D] border border-white/10 rounded-2xl p-6 sm:p-10 shadow-2xl flex flex-col justify-between"
          >
            <AnimatePresence mode="wait">
              {submittedBooking ? (
                <motion.div
                  key="confirmation"
                  initial={{ opacity: 0, scale: 0.94 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="py-10 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-[#C6A76B]/20 border border-[#C6A76B] flex items-center justify-center mx-auto mb-5 text-[#C6A76B]">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>

                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#C6A76B] font-semibold">
                    CONFIDENTIAL APPOINTMENT CONFIRMED
                  </span>

                  <h3 className="font-serif text-3xl text-white font-light mt-2">
                    Thank You, {submittedBooking.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-white/70 font-light leading-relaxed max-w-md mx-auto mt-3">
                    Your private viewing request has been received by the Senior Advisory Desk. A
                    dedicated client director will contact you within 2 business hours with arrival
                    credentials.
                  </p>

                  {/* Booking Receipt Voucher */}
                  <div className="mt-8 max-w-md mx-auto p-5 rounded-xl bg-black/60 border border-[#C6A76B]/30 text-left font-mono text-xs shadow-inner">
                    <div className="flex items-center justify-between pb-3 border-b border-white/10">
                      <span className="text-white/40">REFERENCE NUMBER</span>
                      <span className="text-[#C6A76B] font-bold">
                        {submittedBooking.reference}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-white/10">
                      <span className="text-white/40">SCHEDULED DATE</span>
                      <span className="text-white">{submittedBooking.date}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-white/40">PORTFOLIO TIER</span>
                      <span className="text-white">{submittedBooking.tier}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.a
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      href={`https://wa.me/442079460912?text=Hello%2C%20I%20have%20submitted%20private%20visit%20reference%20${submittedBooking.reference}%20for%20The%20Lumi%C3%A8re.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] text-black hover:bg-[#d8be85] transition-all"
                    >
                      Connect via WhatsApp Concierge
                    </motion.a>

                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={handleReset}
                      className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-mono text-white/60 hover:text-white border border-white/10 transition-all cursor-pointer"
                    >
                      Submit Another Inquiry
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <div className="pb-4 border-b border-white/10 flex items-center justify-between">
                    <div>
                      <h3 className="font-serif text-2xl text-white font-light">
                        Book a Private Visit
                      </h3>
                      <p className="text-xs text-white/50 font-light mt-0.5">
                        Direct access to senior partners • Strict client confidentiality
                      </p>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-[#C6A76B]" />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-1.5">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          placeholder="e.g. Lord Alistair Vance"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border text-xs text-white placeholder:text-white/25 focus:outline-none transition-colors ${
                            errors.fullName
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-white/10 focus:border-[#C6A76B]"
                          }`}
                        />
                      </div>
                      {errors.fullName && (
                        <span className="text-[10px] text-rose-400 mt-1 block">
                          {errors.fullName}
                        </span>
                      )}
                    </div>

                    {/* Email Address */}
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-1.5">
                        Corporate or Private Email *
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="vance@privateoffice.ch"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border text-xs text-white placeholder:text-white/25 focus:outline-none transition-colors ${
                            errors.email
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-white/10 focus:border-[#C6A76B]"
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <span className="text-[10px] text-rose-400 mt-1 block">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Phone Number */}
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-1.5">
                        Telephone / WhatsApp (with Country Code) *
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+44 20 7946 0912"
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border text-xs text-white placeholder:text-white/25 focus:outline-none transition-colors ${
                            errors.phone
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-white/10 focus:border-[#C6A76B]"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <span className="text-[10px] text-rose-400 mt-1 block">
                          {errors.phone}
                        </span>
                      )}
                    </div>

                    {/* Preferred Date */}
                    <div>
                      <label className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-1.5">
                        Preferred Viewing Date *
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        <input
                          type="date"
                          min={todayStr}
                          value={visitDate}
                          onChange={(e) => setVisitDate(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-black/50 border text-xs text-white focus:outline-none transition-colors scheme-dark ${
                            errors.visitDate
                              ? "border-rose-500 focus:border-rose-500"
                              : "border-white/10 focus:border-[#C6A76B]"
                          }`}
                        />
                      </div>
                      {errors.visitDate && (
                        <span className="text-[10px] text-rose-400 mt-1 block">
                          {errors.visitDate}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Residence Tier Selection */}
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-1.5">
                      Portfolio Tier of Primary Interest
                    </label>
                    <select
                      value={residenceTier}
                      onChange={(e) => setResidenceTier(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white focus:outline-none focus:border-[#C6A76B] transition-colors"
                    >
                      <option value="The Sky Penthouse ($48.5M)" className="bg-[#09090D] text-white">
                        The Sky Penthouse — Levels 64–68 ($48,500,000)
                      </option>
                      <option value="The Horizon Duplex ($28.0M)" className="bg-[#09090D] text-white">
                        The Horizon Duplex — Levels 46–52 ($28,000,000)
                      </option>
                      <option value="The Tower Panorama ($16.5M)" className="bg-[#09090D] text-white">
                        The Tower Panorama — Levels 28–44 ($16,500,000)
                      </option>
                      <option value="General Portfolio Inquiry" className="bg-[#09090D] text-white">
                        General Development &amp; Investment Inquiry
                      </option>
                    </select>
                  </div>

                  {/* Private Notes */}
                  <div>
                    <label className="text-[11px] font-mono uppercase tracking-wider text-white/60 block mb-1.5">
                      Special Concierge Accommodations (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Helipad transfer requirements, private security protocols, or NDA requests..."
                      className="w-full px-4 py-2.5 rounded-xl bg-black/50 border border-white/10 text-xs text-white placeholder:text-white/25 focus:outline-none focus:border-[#C6A76B] transition-colors resize-none"
                    />
                  </div>

                  {/* Form Submit */}
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[11px] text-white/40 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>SSL 256-Bit Encrypted Transfer</span>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-8 py-3 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#C6A76B] hover:bg-[#d8be85] text-black transition-all shadow-xl shadow-[#C6A76B]/20 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Validating Credentials...</span>
                        </>
                      ) : (
                        <>
                          <span>Confirm Private Visit</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </>
                      )}
                    </motion.button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
