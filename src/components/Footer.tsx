import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-cyan-100 bg-cyan-50/40">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 text-sm text-slate-700 sm:px-6 md:grid-cols-3">
        <div>
          <h3 className="font-semibold text-slate-900">Sciatica Spot</h3>
          <p className="mt-2">Expert sciatica pain relief guides, product reviews, and evidence-based treatment advice.</p>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Guides</h3>
          <ul className="mt-2 space-y-1">
            <li><Link href="/sciatica-exercises" className="hover:text-cyan-700">Sciatica Exercises</Link></li>
            <li><Link href="/best-mattress-for-sciatica" className="hover:text-cyan-700">Best Mattress for Sciatica</Link></li>
            <li><Link href="/best-seat-cushions-for-sciatica-2026" className="hover:text-cyan-700">Best Seat Cushions</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-slate-900">Contact</h3>
          <p className="mt-2">hello@sciaticaspot.com</p>
        </div>
      </div>
      <div className="border-t border-cyan-100 py-4 text-center text-xs text-slate-500">© {new Date().getFullYear()} Sciatica Spot</div>
    </footer>
  );
}
