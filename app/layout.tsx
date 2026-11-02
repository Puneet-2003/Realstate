import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SmoothScrollProvider } from "@/components/animation/SmoothScrollProvider";

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
      className={`${cormorant.variable} ${jakarta.variable}`}
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-[#FAF7F2] text-[#120C08] font-sans antialiased selection:bg-[#C89D5C]/30 selection:text-[#120C08]">
        <SmoothScrollProvider>
          <TooltipProvider delayDuration={150}>
            {children}
          </TooltipProvider>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
