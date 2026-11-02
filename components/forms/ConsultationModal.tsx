"use client";

import React, { useState } from "react";
import { CheckCircle2, Shield, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

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
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-xl bg-[#18110B] border-[#C89D5C]/35 p-6 sm:p-8 shadow-2xl text-[#FAF7F2] rounded-2xl">
        <DialogHeader className="p-0 text-left">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#DFBD85] font-semibold mb-1">
            <Shield className="w-3.5 h-3.5 text-[#C89D5C]" />
            <span>Confidential Private Advisory</span>
          </div>
          <DialogTitle className="text-2xl sm:text-3xl font-serif text-white font-light">
            Request a Private Consultation
          </DialogTitle>
          <DialogDescription className="text-xs text-[#D8C3AC] mt-1 leading-relaxed">
            Connect with our senior partners for off-market acquisitions, bespoke architectural
            representations, and private viewings.
          </DialogDescription>
        </DialogHeader>

        {isSubmitted ? (
          <div className="py-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#7F4F24]/30 border border-[#C89D5C] flex items-center justify-center mx-auto mb-4 text-[#DFBD85]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <span className="text-xs uppercase tracking-widest text-[#DFBD85] font-semibold">
              Confidential Request Received
            </span>
            <h3 className="text-2xl font-serif text-white mt-2 mb-3">
              Thank You, {name}
            </h3>
            <p className="text-sm text-[#EADECF] max-w-md mx-auto leading-relaxed">
              A Senior Partner from Aurelia &amp; Co. Private Office will contact you within 4 hours
              via encrypted channels to confirm your private viewing and portfolio review.
            </p>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={`https://wa.me/13108924400?text=Hello%20Aurelia%2C%20I%20just%20submitted%20a%20consultation%20request%20for%20${encodeURIComponent(
                  name
                )}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-[#C89D5C] to-[#DFBD85] text-[#18110B] hover:brightness-110 transition-colors inline-block text-center"
              >
                Fast-Track WhatsApp
              </a>
              <button
                type="button"
                onClick={handleReset}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest text-[#D8C3AC] hover:text-white border border-[#C89D5C]/30 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        ) : (
          <div className="mt-2">
            {errorMsg && (
              <div className="mb-4 p-3 rounded-lg bg-red-900/40 border border-red-500/40 text-xs text-red-200">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#DFBD85] mb-1.5 font-medium">
                    Full Legal Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Lord / Lady / Mr / Ms..."
                    className="w-full px-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-white placeholder-[#8C7B70] text-sm focus:outline-none focus:border-[#DFBD85] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#DFBD85] mb-1.5 font-medium">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="principal@domain.com"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-white placeholder-[#8C7B70] text-sm focus:outline-none focus:border-[#DFBD85] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#DFBD85] mb-1.5 font-medium">
                    Phone / Signal / WhatsApp
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-white placeholder-[#8C7B70] text-sm focus:outline-none focus:border-[#DFBD85] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] uppercase tracking-wider text-[#DFBD85] mb-1.5 font-medium">
                    Preferred Timeframe
                  </label>
                  <select
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#DFBD85] transition-colors [&>option]:bg-[#18110B] [&>option]:text-white"
                  >
                    <option value="">Immediate (Next 24h)</option>
                    <option value="This Week">Within This Week</option>
                    <option value="Next 2 Weeks">Within Next 14 Days</option>
                    <option value="Next Month">Next Month / Flexible</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#DFBD85] mb-1.5 font-medium">
                  Nature of Advisory Inquiry
                </label>
                <select
                  value={interestType}
                  onChange={(e) => setInterestType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-[#FAF7F2] text-sm focus:outline-none focus:border-[#DFBD85] transition-colors [&>option]:bg-[#18110B] [&>option]:text-white"
                >
                  <option value="Acquiring a Luxury Residence">Acquiring an Ultra-Prime Residence</option>
                  <option value="Selling / Discretionary Representation">Selling an Architectural Estate</option>
                  <option value="Off-Market Portfolio Review">Off-Market Portfolio Allocation</option>
                  <option value="Private Architectural Viewing">Private Viewing Appointment</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#DFBD85] mb-1.5 font-medium">
                  Confidential Notes &amp; Specific Preferences
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Specify target markets (Bel Air, Manhattan, Lake Como, Zurich), budget parameters, or specific property references..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#231811] border border-[#C89D5C]/30 text-white placeholder-[#8C7B70] text-sm focus:outline-none focus:border-[#DFBD85] transition-colors resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-[#18110B] bg-gradient-to-r from-[#C89D5C] via-[#DFBD85] to-[#C89D5C] hover:brightness-110 transition-all shadow-xl shadow-[#C89D5C]/25 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#18110B]" />
                  <span>Transmit Confidential Request</span>
                </button>
              </div>

              <p className="text-[10px] text-[#8C7B70] text-center">
                All communications protected by non-disclosure agreements and Swiss banking-grade data protocols.
              </p>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
