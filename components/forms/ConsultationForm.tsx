"use client";

import React, { useId, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { formatConsultationMessage, openWhatsApp } from "@/lib/whatsapp";

/**
 * The site-wide "Request a Private Consultation" form.
 * Used in the consultation popup, the home booking section, the contact page
 * and property pages. Submitting opens WhatsApp with the request pre-typed.
 */

const TIMEFRAMES = [
  "Immediate (Next 24h)",
  "Within This Week",
  "Within Next 14 Days",
  "Next Month / Flexible",
];

const INQUIRIES = [
  "Acquiring an Ultra-Prime Residence",
  "Selling an Architectural Estate",
  "Off-Market Portfolio Allocation",
  "Private Viewing Appointment",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ConsultationFormProps {
  /** Property the request is about (pre-selects a viewing inquiry and is included in the message). */
  propertyTitle?: string;
  /** Single-column layout for narrow containers (e.g. a sidebar). */
  compact?: boolean;
  /** Shown on the success screen as a "Close" action (e.g. to close a popup). */
  onClose?: () => void;
}

const labelCls = "block text-[11px] uppercase tracking-wider text-[#CFCCAE] mb-1.5 font-medium";
const fieldCls =
  "w-full px-4 py-2.5 rounded-xl bg-[#2B2612] border border-[#BCB893]/30 text-white placeholder-[#8A876A] text-sm focus:outline-none focus:border-[#CFCCAE] transition-colors";
const selectCls = `${fieldCls} text-[#F8F7F0] cursor-pointer [&>option]:bg-[#1E1700] [&>option]:text-white`;

export function ConsultationForm({ propertyTitle, compact = false, onClose }: ConsultationFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [timeframe, setTimeframe] = useState(TIMEFRAMES[0]);
  const [inquiry, setInquiry] = useState(propertyTitle ? INQUIRIES[3] : INQUIRIES[0]);
  const [notes, setNotes] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [sentUrl, setSentUrl] = useState<string | null>(null);
  const uid = useId();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMsg("Please provide your name and email address.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    const message = formatConsultationMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || undefined,
      timeframe,
      inquiry,
      property: propertyTitle,
      notes: notes.trim() || undefined,
      page: window.location.pathname,
    });
    // Opened synchronously inside the submit gesture so it isn't popup-blocked.
    setSentUrl(openWhatsApp(message));
  };

  const handleNewRequest = () => {
    setSentUrl(null);
    setName("");
    setEmail("");
    setPhone("");
    setNotes("");
  };

  if (sentUrl) {
    return (
      <div className="py-6 text-center">
        <div className="w-16 h-16 rounded-full bg-[#5A5734]/30 border border-[#BCB893] flex items-center justify-center mx-auto mb-4 text-[#CFCCAE]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <span className="text-xs uppercase tracking-widest text-[#CFCCAE] font-semibold">
          Request ready in WhatsApp
        </span>
        <h3 className="text-2xl font-serif text-white mt-2 mb-3">Thank You, {name.trim()}</h3>
        <p className="text-sm text-[#CFCCAE] max-w-md mx-auto leading-relaxed">
          Your request has opened in WhatsApp. Tap <strong className="text-white">Send</strong> in the
          chat to deliver it to our private office. A senior partner will reply personally.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href={sentUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest font-semibold bg-gradient-to-r from-[#BCB893] to-[#CFCCAE] text-[#1E1700] hover:brightness-110 transition-colors inline-block text-center"
          >
            Open WhatsApp Again
          </a>
          <button
            type="button"
            onClick={onClose ?? handleNewRequest}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full text-xs uppercase tracking-widest text-[#CFCCAE] hover:text-white border border-[#BCB893]/30 cursor-pointer"
          >
            {onClose ? "Close" : "New Request"}
          </button>
        </div>
      </div>
    );
  }

  const row = compact ? "grid grid-cols-1 gap-4" : "grid grid-cols-1 sm:grid-cols-2 gap-4";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {errorMsg && (
        <div role="alert" className="p-3 rounded-lg bg-red-900/40 border border-red-500/40 text-xs text-red-200">
          {errorMsg}
        </div>
      )}

      {propertyTitle && (
        <div className="px-4 py-2.5 rounded-xl bg-[#5A5734]/25 border border-[#BCB893]/25 text-xs text-[#CFCCAE]">
          Regarding: <span className="text-white">{propertyTitle}</span>
        </div>
      )}

      <div className={row}>
        <div>
          <label htmlFor={`${uid}-name`} className={labelCls}>Full Legal Name *</label>
          <input id={`${uid}-name`} type="text" required autoComplete="name" value={name}
            onChange={(e) => setName(e.target.value)} placeholder="Lord / Lady / Mr / Ms..." className={fieldCls} />
        </div>
        <div>
          <label htmlFor={`${uid}-email`} className={labelCls}>Email Address *</label>
          <input id={`${uid}-email`} type="email" required autoComplete="email" value={email}
            onChange={(e) => setEmail(e.target.value)} placeholder="principal@domain.com" className={fieldCls} />
        </div>
      </div>

      <div className={row}>
        <div>
          <label htmlFor={`${uid}-phone`} className={labelCls}>Phone / Signal / WhatsApp</label>
          <input id={`${uid}-phone`} type="tel" autoComplete="tel" value={phone}
            onChange={(e) => setPhone(e.target.value)} placeholder="+1 (555) 000-0000" className={fieldCls} />
        </div>
        <div>
          <label htmlFor={`${uid}-timeframe`} className={labelCls}>Preferred Timeframe</label>
          <select id={`${uid}-timeframe`} value={timeframe} onChange={(e) => setTimeframe(e.target.value)} className={selectCls}>
            {TIMEFRAMES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor={`${uid}-inquiry`} className={labelCls}>Nature of Advisory Inquiry</label>
        <select id={`${uid}-inquiry`} value={inquiry} onChange={(e) => setInquiry(e.target.value)} className={selectCls}>
          {INQUIRIES.map((q) => <option key={q} value={q}>{q}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor={`${uid}-notes`} className={labelCls}>Confidential Notes &amp; Specific Preferences</label>
        <textarea id={`${uid}-notes`} rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
          placeholder="Specify target markets (Bel Air, Manhattan, Lake Como, Zurich), budget parameters, or specific property references..."
          className={`${fieldCls} resize-none`} />
      </div>

      <div className="pt-2">
        <button
          type="submit"
          className="w-full py-3.5 rounded-full text-xs uppercase tracking-widest font-semibold text-[#1E1700] bg-gradient-to-r from-[#BCB893] via-[#CFCCAE] to-[#BCB893] hover:brightness-110 transition-all shadow-xl shadow-[#BCB893]/25 flex items-center justify-center gap-2 cursor-pointer"
        >
          <Send className="w-4 h-4 text-[#1E1700]" />
          <span>Send Request via WhatsApp</span>
        </button>
      </div>

      <p className="text-[10px] text-[#8A876A] text-center">
        Opens WhatsApp with your request ready to send. All communications are handled in strict confidence.
      </p>
    </form>
  );
}
