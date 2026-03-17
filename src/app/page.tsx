import Link from "next/link";
import { getAllArticles } from "@/lib/articles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: { absolute: "Sciatica Spot: Evidence-Based Sciatica Relief Guides (2026)" },
  description: "Evidence-based sciatica pain relief guides reviewed by spine specialists. Exercises, mattresses, seat cushions, and treatment strategies.",
  alternates: { canonical: "https://sciaticaspot.com" },
  openGraph: {
    title: "Sciatica Spot: Evidence-Based Sciatica Relief Guides (2026)",
    description: "Evidence-based sciatica pain relief guides reviewed by spine specialists.",
    url: "https://sciaticaspot.com",
    type: "website",
  },
};

export default async function HomePage() {
  const articles = await getAllArticles();
  return (
    <>
      <section className="bg-gradient-to-br from-teal-50 via-white to-cyan-50 py-16 sm:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-teal-100 text-teal-700 text-sm font-medium px-3 py-1 rounded-full mb-4">Updated for 2026</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Sciatica Relief Guides: Evidence-Based Treatment That Works
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Spine specialist-reviewed guides for sciatica pain relief, exercises, mattresses, and seat cushions that actually help.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sciatica-exercises" className="inline-flex items-center justify-center bg-teal-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-teal-800 transition-colors">Best Exercises</Link>
            <Link href="/best-seat-cushions-for-sciatica-2026" className="inline-flex items-center justify-center bg-white text-teal-700 border-2 border-teal-200 px-6 py-3 rounded-lg font-semibold hover:border-teal-400 transition-colors">Best Seat Cushions</Link>
          </div>
        </div>
      </section>
      <section className="py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-10">Sciatica Relief Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((g) => (
              <Link key={g.slug} href={`/${g.slug}`} className="group block bg-white border border-gray-200 rounded-xl p-6 hover:border-teal-300 hover:shadow-lg transition-all duration-200">
                <span className="inline-block text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded mb-3">{g.category}</span>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-700 transition-colors">{g.title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{g.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}