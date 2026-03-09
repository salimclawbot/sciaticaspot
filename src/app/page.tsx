import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Air Purifier Guide: Best Picks (2026)" },
  description: "Expert air purifier reviews, comparisons, and buying guides for cleaner indoor air.",
  alternates: { canonical: "https://airpurifierguide.vercel.app" },
  openGraph: {
    title: "Air Purifier Guide: Best Picks (2026)",
    description: "Expert air purifier reviews, comparisons, and buying guides for cleaner indoor air.",
    url: "https://airpurifierguide.vercel.app",
    type: "website",
  },
};

const guides = [
  { slug: "best-air-purifier-asthma", title: "Best Air Purifier for Asthma", description: "HEPA-first picks for asthma-sensitive homes.", category: "Health Guide" },
  { slug: "best-air-purifier-mold", title: "Best Air Purifier for Mold", description: "Filter strategy and model picks for mold-prone spaces.", category: "Problem-Solution" },
  { slug: "best-air-purifier-baby-room", title: "Best Air Purifier for Baby Room", description: "Quiet and nursery-friendly purification options.", category: "Family Guide" },
  { slug: "levoit-vs-winix-air-purifier", title: "Levoit vs Winix Air Purifier", description: "Head-to-head comparison on CADR, noise, smart features, and filter costs.", category: "Brand Comparison" },
  { slug: "coway-vs-levoit-air-purifier", title: "Coway vs Levoit Air Purifier", description: "Which brand wins on value, airflow, and long-term ownership cost.", category: "Brand Comparison" },
  { slug: "true-hepa-vs-hepa-type", title: "True HEPA vs HEPA-Type", description: "A standards-first guide to filter grades and what actually protects respiratory health.", category: "Education" },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-gradient-to-br from-cyan-50 via-white to-emerald-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-cyan-100 text-cyan-700 text-sm font-medium px-3 py-1 rounded-full mb-4">Updated for 2026</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Breathe Cleaner with <span className="text-cyan-700">Air Purifier Guide</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Evidence-led reviews and buying guides to help you choose the right air purifier for your home.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/best-air-purifier-asthma" className="inline-flex items-center justify-center bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-cyan-800 transition-colors">Explore Asthma Picks</Link>
            <Link href="/best-air-purifier-baby-room" className="inline-flex items-center justify-center bg-white text-cyan-700 border-2 border-cyan-200 px-6 py-3 rounded-lg font-semibold hover:border-cyan-400 transition-colors">Nursery-Safe Options</Link>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Featured Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((g) => (
              <Link key={g.slug} href={`/${g.slug}`} className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-cyan-300 hover:shadow-lg transition-all duration-200">
                <span className="inline-block text-xs font-semibold text-cyan-700 bg-cyan-50 px-2 py-1 rounded mb-3">{g.category}</span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-cyan-700 transition-colors">{g.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
