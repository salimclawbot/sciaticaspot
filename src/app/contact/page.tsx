import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Sciatica Spot",
  description: "Contact Sciatica Spot about editorial corrections, source questions, accessibility, privacy, or feedback on our evidence-aware sciatica information.",
  alternates: { canonical: "https://sciaticaspot.com/contact" },
  openGraph: {
    title: "Contact",
    description: "This site does not use retailer affiliate links or earn referral commissions.",
    url: "https://sciaticaspot.com/contact",
    siteName: "Sciatica Spot",
    type: "website",
    images: [
      {
        url: "https://sciaticaspot.com/editorial-hero.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact",
    description: "This site does not use retailer affiliate links or earn referral commissions.",
    images: ["https://sciaticaspot.com/editorial-hero.png"],
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-4">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p>Questions, corrections, or partnership inquiries:</p>
      <p><a className="text-cyan-700 underline" href="mailto:hello@sciaticaspot.com">hello@sciaticaspot.com</a></p>
    </div>
  );
}
