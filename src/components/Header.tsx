"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-cyan-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link href="/" className="text-xl font-bold text-cyan-800">Sciatica Spot</Link>
        <nav aria-label="Primary navigation" className="flex w-full gap-5 overflow-x-auto whitespace-nowrap pb-1 text-sm font-medium text-slate-700 sm:w-auto sm:pb-0">
          <Link href="/sciatica-exercises" className="hover:text-cyan-700">Exercises</Link>
          <Link href="/best-mattress-for-sciatica" className="hover:text-cyan-700">Best Mattress</Link>
          <Link href="/best-seat-cushions-for-sciatica-2026" className="hover:text-cyan-700">Seat Cushions</Link>
          <Link href="/about" className="hover:text-cyan-700">About</Link>
        </nav>
      </div>
    </header>
  );
}
