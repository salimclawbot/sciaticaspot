import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Commerce Policy",
  description: "Read Sciatica Spot’s clear non-commercial policy, including editorial independence, external references, and the site’s current zero-affiliate-link boundary.",
  alternates: { canonical: "/affiliate-disclosure" },
  openGraph: {
    title: "Commerce Policy | Sciatica Spot",
    description: "How Sciatica Spot maintains editorial independence and its current policy of using no retailer affiliate links.",
    url: "https://sciaticaspot.com/affiliate-disclosure",
    siteName: "Sciatica Spot",
    type: "website",
    images: [{ url: "https://sciaticaspot.com/editorial-hero.png", width: 1200, height: 630, alt: "Sciatica Spot commerce policy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Commerce Policy | Sciatica Spot",
    description: "How Sciatica Spot maintains editorial independence and its current policy of using no retailer affiliate links.",
    images: ["https://sciaticaspot.com/editorial-hero.png"],
  },
};

export default function CommercePolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-12">
      <h1 className="text-4xl font-bold">Commerce Policy</h1>
      <p className="mt-6 text-lg leading-8">Sciatica Spot does not use retailer affiliate links and does not earn commissions from product purchases.</p>
      <p className="mt-4 leading-7">Product mentions are provided for general informational context only. Readers should independently evaluate suitability, current details, and safety with qualified professionals where appropriate.</p>
    </main>
  );
}
