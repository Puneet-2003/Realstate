import React, { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PropertyListContent } from "@/components/properties/PropertyListContent";

export const metadata: Metadata = {
  title: "Curated Portfolio | Aurelia & Co. Luxury Real Estate",
  description:
    "Explore our collection of trophy architectural residences, penthouses, and private estates available for purchase and lease across the globe.",
};

function PropertyListSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 animate-pulse">
      <div className="h-8 bg-white/5 rounded w-48 mb-4" />
      <div className="h-12 bg-white/5 rounded w-96 mb-8" />
      <div className="h-28 bg-white/5 rounded-2xl mb-10" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="h-96 bg-white/5 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}

export default function PropertiesPage() {
  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-24 sm:pt-28">
        <Suspense fallback={<PropertyListSkeleton />}>
          <PropertyListContent />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
