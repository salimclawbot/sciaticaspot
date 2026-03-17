"use client";

import { useEffect, useMemo, useState } from "react";

const LOOP_SECONDS = 30;
const SLIDE_SECONDS = 5;

const slides = [
  {
    title: "Sciatica vs Piriformis Syndrome",
    subtitle: "Two conditions, very different treatments",
    icon: "VS",
    bgClass: "from-teal-500 via-cyan-500 to-sky-500",
  },
  {
    title: "Pain location: down the back of the leg",
    subtitle: "True sciatica follows the sciatic nerve path",
    icon: "📍",
    bgClass: "from-teal-600 to-emerald-500",
  },
  {
    title: "Exercise is better than bed rest",
    subtitle: "Movement reduces disc pressure on the nerve",
    icon: "🏃",
    bgClass: "from-sky-600 to-blue-500",
  },
  {
    title: "90% of sciatica cases resolve without surgery",
    subtitle: "Conservative treatment works for most people",
    icon: "90%",
    bgClass: "from-emerald-600 to-lime-500",
  },
  {
    title: "Sleep position matters",
    subtitle: "Foetal position reduces sciatic nerve tension",
    icon: "💤",
    bgClass: "from-cyan-600 to-teal-500",
  },
  {
    title: "Read the full sciatica relief guide",
    subtitle: "Evidence-based strategies that actually work",
    icon: "→",
    bgClass: "from-teal-700 to-cyan-600",
  },
];

export default function ComparisonVideo() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const elapsed = tick % LOOP_SECONDS;
  const slideIndex = useMemo(
    () => Math.floor(elapsed / SLIDE_SECONDS) % slides.length,
    [elapsed]
  );
  const slide = slides[slideIndex];
  const progress = ((elapsed % SLIDE_SECONDS) / SLIDE_SECONDS) * 100;

  return (
    <div className="my-8 overflow-hidden rounded-2xl shadow-lg">
      <div className={`bg-gradient-to-br ${slide.bgClass} p-8 text-white transition-all duration-700`}>
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/20 text-2xl font-bold">
            {slide.icon}
          </div>
          <div>
            <p className="text-lg font-bold">{slide.title}</p>
            <p className="text-sm text-white/80">{slide.subtitle}</p>
          </div>
        </div>
        <div className="mt-4 h-1 rounded-full bg-white/20">
          <div
            className="h-1 rounded-full bg-white/80 transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
