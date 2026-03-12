import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sciatica Spot | Evidence-Based Health Guides (2026)",
  description: "Evidence-based guides on anti-inflammatory foods, diets, and supplements. Reduce inflammation naturally with expert-reviewed advice from Dr. James Harlow.",
  alternates: { canonical: "https://sciaticaspot.com" },
  openGraph: {
    title: "Sciatica Spot | Evidence-Based Health Guides",
    description: "Reduce inflammation naturally. Expert guides on anti-inflammatory foods, diets, and supplements.",
    url: "https://sciaticaspot.com",
    siteName: "Sciatica Spot",
    type: "website",
    images: [{ url: "https://sciaticaspot.com/images/anti-inflammatory-foods-hero.jpg" }],
  },
};

const FEATURED = [
  {
    slug: "best-anti-inflammatory-foods-guide-2026",
    title: "Best Anti-Inflammatory Foods: Complete Guide (2026)",
    desc: "The 25 most powerful anti-inflammatory foods ranked by evidence. What to eat, how much, and why it works.",
    badge: "Editor's Pick",
    emoji: "🥦",
  },
  {
    slug: "anti-inflammatory-diet-beginners-7-day-meal-plan",
    title: "Anti-Inflammatory Diet for Beginners: 7-Day Meal Plan",
    desc: "A practical 7-day meal plan to start your anti-inflammatory journey. Shopping list, recipes, and what to avoid.",
    badge: "Most Popular",
    emoji: "🥗",
  },
  {
    slug: "best-anti-inflammatory-supplements-2026",
    title: "Best Anti-Inflammatory Supplements Ranked (2026)",
    desc: "Omega-3, turmeric, magnesium and more — ranked by clinical evidence, bioavailability, and value.",
    badge: "Top Picks",
    emoji: "💊",
  },
];

export default async function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-50 via-white to-emerald-50 py-16 sm:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <span className="inline-block bg-green-100 text-green-700 text-sm font-semibold px-4 py-1.5 rounded-full mb-5">Updated for 2026</span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight tracking-tight">
            Fight Inflammation.<br className="hidden sm:block" /> Feel Better. Live Longer.
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Evidence-based guides on anti-inflammatory foods, diets, and supplements — reviewed by nutritional researchers, backed by clinical studies.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sciatica-vs-piriformis-syndrome" className="inline-flex items-center justify-center bg-green-600 text-white px-7 py-3.5 rounded-xl font-semibold hover:bg-green-700 transition-colors">
              Top Anti-Inflammatory Foods →
            </Link>
            <Link href="/best-seat-cushions-for-sciatica-2026" className="inline-flex items-center justify-center bg-white text-green-700 border-2 border-green-200 px-7 py-3.5 rounded-xl font-semibold hover:border-green-400 transition-colors">
              Best Supplements 2026
            </Link>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 -mt-8 mb-16">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/anti-inflammatory-foods-hero.jpg"
          alt="Anti-inflammatory foods including turmeric, berries, salmon, and leafy greens"
          className="w-full rounded-2xl shadow-lg object-cover"
          style={{ maxHeight: 420, objectFit: "cover" }}
        />
      </div>

      {/* Stats */}
      <section className="py-12 bg-green-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            { stat: "100M+", label: "People with chronic inflammation" },
            { stat: "40%", label: "Reduction with dietary changes" },
            { stat: "25+", label: "Evidence-backed foods reviewed" },
            { stat: "50+", label: "Clinical studies referenced" },
          ].map(({ stat, label }) => (
            <div key={label}>
              <div className="text-3xl font-extrabold text-green-600">{stat}</div>
              <div className="mt-1 text-sm text-gray-600">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Articles */}
      <section className="py-16 sm:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Expert Guides</h2>
            <p className="mt-3 text-gray-600 max-w-xl mx-auto">Every guide is reviewed by nutritional researchers and backed by peer-reviewed studies.</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {FEATURED.map((article) => (
              <Link key={article.slug} href={`/${article.slug}`} className="group block bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-green-300 hover:shadow-xl transition-all duration-200">
                <div className="h-48 overflow-hidden bg-green-50 flex items-center justify-center text-6xl">
                  {article.emoji}
                </div>
                <div className="p-6">
                  <span className="inline-block text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded mb-3">{article.badge}</span>
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-green-600 transition-colors leading-snug">{article.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{article.desc}</p>
                  <span className="inline-flex items-center mt-4 text-sm font-semibold text-green-600">Read guide →</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why it matters */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Why Inflammation Matters</h2>
          <p className="mt-4 text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Chronic inflammation is linked to heart disease, type 2 diabetes, arthritis, and certain cancers. The good news: what you eat has a direct, measurable impact on your body&apos;s inflammatory response.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: "🫀", title: "Heart Health", desc: "Anti-inflammatory diets reduce CRP and cardiovascular risk markers" },
              { icon: "🧠", title: "Brain Function", desc: "Omega-3 and polyphenols support cognitive health and reduce neuroinflammation" },
              { icon: "💪", title: "Joint Pain", desc: "Evidence shows dietary changes can reduce joint inflammation as effectively as some medications" },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="text-3xl mb-3">{icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Medical disclaimer */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-xs text-gray-400">
          <strong>Medical Disclaimer:</strong> Content on sciaticaspot.com is for informational purposes only and does not constitute medical advice. Always consult a qualified healthcare professional before making dietary or supplement changes.
        </p>
      </div>
    </main>
  );
}
