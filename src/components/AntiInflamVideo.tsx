"use client";
import { useEffect, useMemo, useState } from "react";

const LOOP_SECONDS = 30;
const SLIDE_SECONDS = 5;

const SLIDE_SETS: Record<string, {title:string;subtitle:string;icon:string;bgClass:string}[]> = {
  foods: [
    { title: "25 Anti-Inflammatory Foods Ranked", subtitle: "Evidence-based picks from clinical research", icon: "🥦", bgClass: "from-green-600 via-emerald-500 to-teal-500" },
    { title: "#1 Turmeric — Curcumin blocks NF-κB", subtitle: "The most studied anti-inflammatory compound on earth", icon: "🌿", bgClass: "from-yellow-500 via-orange-500 to-amber-500" },
    { title: "#2 Fatty Fish — 2g EPA/DHA daily", subtitle: "Directly lowers inflammatory cytokines IL-6 and TNF-α", icon: "🐟", bgClass: "from-blue-600 via-cyan-500 to-teal-400" },
    { title: "#3 Berries — Anthocyanins fight free radicals", subtitle: "Blueberries, cherries and strawberries reduce CRP by 25%", icon: "🍓", bgClass: "from-purple-600 via-pink-500 to-rose-400" },
    { title: "#4 Leafy Greens — Vitamin K + polyphenols", subtitle: "Spinach and kale shown to reduce 8 inflammatory markers", icon: "🥗", bgClass: "from-green-700 via-lime-500 to-green-400" },
    { title: "Build Every Meal Around These 25 Foods", subtitle: "Scroll down for the full ranked list and serving guides", icon: "✅", bgClass: "from-emerald-700 via-teal-600 to-slate-700" },
  ],
  mealplan: [
    { title: "Your 7-Day Anti-Inflammatory Meal Plan", subtitle: "Practical, delicious, and clinically backed", icon: "📅", bgClass: "from-green-600 via-emerald-500 to-teal-500" },
    { title: "Day 1–2: Elimination Phase", subtitle: "Remove processed foods, seed oils, and refined sugar", icon: "🚫", bgClass: "from-red-500 via-orange-400 to-amber-400" },
    { title: "Day 3–4: Load Up on Omega-3s", subtitle: "Salmon, walnuts, flaxseeds — 2 servings per day", icon: "🐟", bgClass: "from-blue-600 via-cyan-500 to-teal-400" },
    { title: "Day 5–6: Add Fermented Foods", subtitle: "Kefir, kimchi and sauerkraut to support gut health", icon: "🫙", bgClass: "from-amber-600 via-yellow-500 to-lime-400" },
    { title: "Day 7: Full Anti-Inflammatory Day", subtitle: "Green smoothie → salmon salad → turmeric lentils", icon: "🥇", bgClass: "from-emerald-600 via-green-500 to-teal-400" },
    { title: "Results: Measurable by Day 14", subtitle: "Most people report reduced joint pain and better energy", icon: "📈", bgClass: "from-teal-700 via-emerald-600 to-slate-700" },
  ],
  supplements: [
    { title: "Top 5 Anti-Inflammatory Supplements Ranked", subtitle: "Scored by clinical evidence, bioavailability & value", icon: "💊", bgClass: "from-green-600 via-emerald-500 to-teal-500" },
    { title: "#1 Omega-3 Fish Oil — Score: 95/100", subtitle: "10,000+ studies. Reduces CRP, IL-6 and joint inflammation", icon: "🐟", bgClass: "from-blue-600 via-cyan-500 to-sky-400" },
    { title: "#2 Curcumin + Piperine — Score: 91/100", subtitle: "As effective as ibuprofen for joint pain in 3 trials", icon: "🌿", bgClass: "from-yellow-500 via-orange-500 to-amber-400" },
    { title: "#3 Magnesium Glycinate — Score: 87/100", subtitle: "72% of adults are deficient. Reduces CRP by 22%", icon: "⚡", bgClass: "from-purple-600 via-violet-500 to-indigo-400" },
    { title: "#4 Vitamin D3 + K2 — Score: 83/100", subtitle: "Deficiency doubles inflammatory markers. $8/month fix", icon: "☀️", bgClass: "from-amber-500 via-yellow-400 to-lime-400" },
    { title: "Start with Omega-3 + Curcumin", subtitle: "The most evidence-backed combo. Full guide below.", icon: "✅", bgClass: "from-emerald-700 via-teal-600 to-slate-700" },
  ],
};

export default function AntiInflamVideo({ variant }: { variant: "foods" | "mealplan" | "supplements" }) {
  const slides = SLIDE_SETS[variant];
  const [elapsed, setElapsed] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setElapsed((prev) => { const next = prev + 0.1; return next >= LOOP_SECONDS ? 0 : next; });
    }, 100);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  const slideIndex = Math.floor(elapsed / SLIDE_SECONDS) % slides.length;
  const progress = (elapsed / LOOP_SECONDS) * 100;
  const currentSlide = useMemo(() => slides[slideIndex], [slideIndex, slides]);

  return (
    <section className="my-8 rounded-xl border border-slate-200 bg-slate-950 p-3 sm:p-4 shadow-lg">
      <div className="aspect-video w-full overflow-hidden rounded-lg border border-slate-800 bg-slate-900 relative">
        <div className={`absolute inset-0 bg-gradient-to-br ${currentSlide.bgClass} transition-colors duration-700`} />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.25),transparent_45%)]" />
        <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center text-white">
          <div className="mb-4 text-5xl">{currentSlide.icon}</div>
          <p className="text-xl sm:text-3xl font-extrabold leading-tight max-w-2xl">{currentSlide.title}</p>
          <p className="mt-3 text-sm sm:text-base text-white/90 max-w-xl">{currentSlide.subtitle}</p>
        </div>
        <div className="absolute bottom-3 right-4 text-xs text-white/50 font-mono">sciaticaspot.com</div>
      </div>
      <div className="mt-3 flex items-center gap-3">
        <button type="button" onClick={() => setIsPlaying((p) => !p)}
          className="rounded-md bg-green-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-green-500"
          aria-label={isPlaying ? "Pause" : "Play"}>
          {isPlaying ? "⏸ Pause" : "▶ Play"}
        </button>
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full rounded-full bg-green-400 transition-[width] duration-100" style={{ width: `${progress}%` }} />
        </div>
        <span className="text-xs text-slate-300 tabular-nums">{Math.floor(elapsed)}s / 30s</span>
      </div>
    </section>
  );
}
