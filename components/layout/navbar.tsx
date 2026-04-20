"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { countryList } from "@/data";

const countryMeta: Record<string, { abbr: string; tagline: string; color: string }> = {
  au: { abbr: "AU", tagline: "14 pathways · Home Affairs", color: "bg-blue-500/15 text-blue-300 border border-blue-500/25" },
  uk: { abbr: "UK", tagline: "8 pathways · UKVI", color: "bg-violet-500/15 text-violet-300 border border-violet-500/25" },
  ca: { abbr: "CA", tagline: "9 pathways · IRCC", color: "bg-red-500/15 text-red-300 border border-red-500/25" },
  jp: { abbr: "JP", tagline: "8 pathways · Immigration Bureau", color: "bg-amber-500/15 text-amber-300 border border-amber-500/25" },
};

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const countryCode = pathname.split("/")[1];
  const currentCountry = countryList.find((c) => c.code === countryCode);
  const base = currentCountry ? `/${currentCountry.code}` : "/au";

  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const navLink = "px-3 py-2 text-sm font-medium rounded-lg transition-colors text-zinc-400 hover:text-white hover:bg-white/[0.06]";
  const navLinkActive = "px-3 py-2 text-sm font-medium rounded-lg transition-colors text-white bg-white/[0.08]";

  return (
    <header className="sticky top-0 z-50 bg-black/85 backdrop-blur-md border-b border-white/[0.07]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-zinc-700 to-zinc-800 flex items-center justify-center border border-white/[0.08]">
              <Globe className="w-4 h-4 text-zinc-300" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">
              Visa<span className="text-zinc-400">Switch</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-0.5">
            <Link href="/pricing" className={pathname === "/pricing" ? navLinkActive : navLink}>
              Pricing
            </Link>
            <Link href="/about" className={pathname === "/about" ? navLinkActive : navLink}>
              About
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center">
            <Link
              href={`${base}/guide`}
              className="inline-flex items-center px-4 py-2 text-sm font-semibold bg-white text-black rounded-lg hover:bg-zinc-100 transition-all"
            >
              Start free guide
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg hover:bg-white/[0.06]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.07] bg-zinc-950">
          <div className="px-4 py-4 space-y-1">
            <Link href="/pricing" className="block px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.05] rounded-xl" onClick={() => setMobileOpen(false)}>Pricing</Link>
            <Link href="/about" className="block px-3 py-2.5 text-sm text-zinc-300 hover:bg-white/[0.05] rounded-xl" onClick={() => setMobileOpen(false)}>About</Link>
            <div className="pt-2">
              <Link href={`${base}/guide`} className="block px-3 py-2.5 text-sm font-semibold text-black text-center bg-white rounded-xl hover:bg-zinc-100 transition-all" onClick={() => setMobileOpen(false)}>Start free guide</Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
