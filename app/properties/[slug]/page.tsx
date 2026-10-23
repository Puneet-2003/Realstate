import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";
import { PROPERTIES } from "@/lib/properties";
import { PropertyDetailClient } from "@/components/properties/PropertyDetailClient";

export async function generateStaticParams() {
  return PROPERTIES.map((property) => ({
    slug: property.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    return {
      title: "Property Not Found | Aurelia & Co.",
    };
  }

  return {
    title: `${property.title} | ${property.location.city} | Aurelia & Co.`,
    description: property.description,
    openGraph: {
      title: `${property.title} — ${property.priceFormatted}`,
      description: property.subtitle,
      images: [
        {
          url: property.coverImage,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
    },
  };
}

export default async function PropertyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);

  if (!property) {
    notFound();
  }

  // Related properties: same category or other featured
  const relatedProperties = PROPERTIES.filter(
    (p) => p.slug !== property.slug && (p.category === property.category || p.featured)
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-[#070709] text-white flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20 sm:pt-24">
        <PropertyDetailClient
          property={property}
          relatedProperties={relatedProperties}
        />
      </main>
      <Footer />
    </div>
  );
}
