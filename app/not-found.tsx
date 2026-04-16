import Link from "next/link";
import { Globe, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] bg-black flex items-center justify-center px-4">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(ellipse, rgba(180,200,255,1) 0%, transparent 70%)" }} />
      </div>
      <div className="relative text-center max-w-md">
        <div className="w-16 h-16 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mx-auto mb-6">
          <Globe className="w-8 h-8 text-zinc-400" />
        </div>
        <h1 className="text-6xl font-bold text-white mb-3">404</h1>
        <h2 className="text-xl font-semibold text-zinc-300 mb-3">Page not found</h2>
        <p className="text-zinc-600 text-sm leading-relaxed mb-8">
          The page you are looking for does not exist. It may have moved or been removed.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-white text-black rounded-xl hover:bg-zinc-100 transition-all group"
          >
            Go home <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/au/pathways"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-zinc-400 border border-white/[0.12] rounded-xl hover:border-white/25 hover:text-white transition-all"
          >
            Pathway Checker
          </Link>
        </div>
      </div>
    </div>
  );
}
