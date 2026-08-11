import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "Sciatica Spot is your practical guide to evidence-forward product comparisons, buying support, and transparent recommendations.",
  alternates: { canonical: "https://sciaticaspot.com/about" },
  openGraph: {
    title: "About",
    description: "Sciatica Spot is your practical guide to evidence-forward product comparisons, buying support, and transparent recommendations.",
    url: "https://sciaticaspot.com/about",
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
    title: "About",
    description: "Sciatica Spot is your practical guide to evidence-forward product comparisons, buying support, and transparent recommendations.",
    images: ["https://sciaticaspot.com/editorial-hero.png"],
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-4">
      <h1 className="text-3xl font-bold">About Sciatica Spot</h1>
      <p>Sciatica Spot publishes practical reviews and comparisons to help people choose effective air cleaners for real homes and real budgets.</p>
      <p>Our editorial team compares published research, manufacturer specifications, and independent owner feedback. We do not claim individual clinical credentials or first-hand testing.</p>
    </div>
  );
}
