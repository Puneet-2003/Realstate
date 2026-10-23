"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, CheckCircle2, Shield, Send } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyTitle?: string;
}

export function ConsultationModal({
  isOpen,
  onClose,
  propertyTitle,
}: ConsultationModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [interestType, setInterestType] = useState(
    propertyTitle ? `Inquiry for ${propertyTitle}` : "Acquiring a Luxury Residence"
  );
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  // Esc key handler & backdrop click
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please provide your name and email address.");
      return;
    }
    setErrorMsg("");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Light dismiss backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Dialog container */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
        className="relative w-full max-w-xl rounded-2xl bg-[#0c0c12] border border-[#c5a880]/30 p-6 sm:p-8 shadow-2xl shadow-black text-left z-10 my-8 transition-all"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {isSubmitted ? (
          <div className="py-8 text-center">
            <div className="w-16 h-16 rounded-full bg-[#c5a880]/20 border border-[#c5a880] flex items-center justify-center mx-auto mb-4 text-[#c5a880]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
              Confidential Request Received
            </span>
            <h3 className="text-2xl font-serif text-white mt-2 mb-3">
              Thank You, {name}
            </h3>
            <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
              A Senior Partner from Aurelia &amp; Co. Private Office will contact you within 4 hours
              via encrypted channels to confirm your private viewing and portfolio review.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/442079460912?text=Hello%20Aurelia%2C%20I%20just%20submitted%20a%20consultation%20request%20for%20${encodeURIComponent(
                  name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-[#c5a880] text-black hover:bg-[#dfc293] transition-colors"
              >
                Open Fast-Track WhatsApp
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest text-zinc-400 hover:text-white border border-white/10"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c5a880] font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Confidential Private Advisory</span>
              </div>
              <h3
                id="consultation-modal-title"
                className="text-2xl sm:text-3xl font-serif text-white mt-1"
              >
                Request a Private Consultation
              </h3>
              <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                Connect with our senior partners for off-market acquisitions, bespoke architectural
                representations, and private viewings.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-900/30 border border-red-500/40 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lord / Lady / Mr / Ms..."
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="principal@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Phone / Signal / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c5a880] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                    Preferred Timeframe
                  </label>
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#14141e] border border-white/10 text-zinc-200 text-sm focus:outline-none focus:border-[#c5a880] transition-colors"
                  >
                    <option value="">Immediate (Next 24h)</option>
                    <option value="This Week">Within This Week</option>
                    <option value="Next 2 Weeks">Within Next 14 Days</option>
                    <option value="Next Month">Next Month / Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  Nature of Advisory Inquiry
                </label>
                <select
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#14141e] border border-white/10 text-zinc-200 text-sm focus:outline-none focus:border-[#c5a880] transition-colors"
                >
                  <option value="Acquiring a Luxury Residence">Acquiring an Ultra-Prime Residence</option>
                  <option value="Selling / Discretionary Representation">Selling an Architectural Estate</option>
                  <option value="Off-Market Portfolio Review">Off-Market Portfolio Allocation</option>
                  <option value="Private Architectural Viewing">Private Viewing Appointment</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-zinc-400 mb-1.5 font-medium">
                  Confidential Notes &amp; Specific Preferences
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify target markets (Bel Air, Manhattan, Lake Como, Zurich), budget parameters, or specific property references..."
                  className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-[#c5a880] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-black bg-[#c5a880] hover:bg-[#dfc293] transition-all shadow-xl shadow-[#c5a880]/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Confidential Request</span>
                </button>
              </div>

              <p className="text-[10px] text-zinc-500 text-center">
                All communications protected by non-disclosure agreements and Swiss banking-grade data protocols.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
