import type { Metadata } from "next";
import { Noto_Serif, Fira_Sans } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";
import { WhatsAppButton } from "@/components/WhatsAppButton";

// Self-hosted by next/font (no request to Google at runtime, no layout shift).
// Noto Serif is a variable font: the full 100–900 weight range is included.
const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

// Fira Sans is not variable, so only the weights the site uses are loaded.
const firaSans = Fira_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AURELIA & CO. | Extraordinary Luxury Real Estate & Architectural Sanctuaries",
  description: "Curators of the world's most exceptional architectural estates, private villas, and bespoke penthouse residences across London, New York, Zurich, and Dubai.",
  keywords: ["Luxury Real Estate", "Architectural Residences", "Ultra-Luxury Villas", "Penthouses", "Private Estates"],
  openGraph: {
    title: "AURELIA & CO. | Ultra-Luxury Real Estate",
    description: "Find a place beyond ordinary. Exceptional estates and architectural residences worldwide.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${notoSerif.variable} ${firaSans.variable}`}
    >
      <body className="min-h-screen bg-[#F8F7F0] text-[#1E1700] font-sans antialiased selection:bg-[#BCB893]/30 selection:text-[#1E1700]">
        <SmoothScrollProvider>
          <TooltipProvider delayDuration={150}>
            {children}
          </TooltipProvider>
        </SmoothScrollProvider>
        <WhatsAppButton />
      </body>
    </html>
  );
}
