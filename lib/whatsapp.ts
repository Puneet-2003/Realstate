/**
 * Single source of truth for WhatsApp contact links and form hand-off.
 *
 * Forms "send" by opening WhatsApp with the request pre-typed in a chat with
 * the business number (app on phones, WhatsApp Web / Desktop on computers).
 * The visitor then taps Send inside WhatsApp — browsers cannot send a
 * WhatsApp message silently; that would need the WhatsApp Business API and a
 * server.
 */

// Business WhatsApp number: country code + number, digits only
// (no "+", spaces or dashes). Example for India +91 98765 43210: "919876543210".
// TODO: replace with the real business WhatsApp number.
export const WHATSAPP_NUMBER = "13108924400";

export const WHATSAPP_GREETING =
  "Hello Aurelia & Co., I'd like to know more about your properties and arrange a private consultation.";

/** wa.me link to the business chat, optionally with a pre-typed message. */
export function whatsappUrl(message: string = WHATSAPP_GREETING): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export interface ConsultationRequest {
  name: string;
  email: string;
  phone?: string;
  timeframe?: string;
  inquiry?: string;
  property?: string;
  notes?: string;
  /** Page the request was sent from (path), for context. */
  page?: string;
}

/** Formats a consultation request as a readable WhatsApp message (*bold* labels). */
export function formatConsultationMessage(r: ConsultationRequest): string {
  const lines = [
    "*New Private Consultation Request*",
    "",
    `*Name:* ${r.name}`,
    `*Email:* ${r.email}`,
  ];
  if (r.phone) lines.push(`*Phone:* ${r.phone}`);
  if (r.inquiry) lines.push(`*Inquiry:* ${r.inquiry}`);
  if (r.property) lines.push(`*Property:* ${r.property}`);
  if (r.timeframe) lines.push(`*Timeframe:* ${r.timeframe}`);
  if (r.notes) lines.push("", `*Notes:*`, r.notes);
  if (r.page) lines.push("", `_Sent from the website (${r.page})_`);
  return lines.join("\n");
}

/**
 * Opens WhatsApp with the message. Must be called directly from a user
 * gesture (click / submit) so popup blockers allow the new tab. Falls back to
 * navigating the current tab if a new tab could not be opened.
 */
export function openWhatsApp(message: string): string {
  const url = whatsappUrl(message);
  const win = window.open(url, "_blank");
  if (win) {
    win.opener = null;
  } else {
    window.location.href = url;
  }
  return url;
}
