import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
      className={`${cormorant.variable} ${jakarta.variable} dark scroll-smooth`}
    >
      <body className="min-h-screen bg-[#070709] text-[#f5f3ef] font-sans antialiased selection:bg-[#c5a880]/30 selection:text-[#fff]">
        {children}
      </body>
    </html>
  );
}
