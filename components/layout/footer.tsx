import Link from "next/link";
import { Globe, Shield } from "lucide-react";
import { countryList } from "@/data";

export function Footer() {
  return (
    <footer className="bg-[#020407] text-zinc-500 border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-14 grid grid-cols-1 md:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-white/[0.07] border border-white/[0.09] flex items-center justify-center">
                <Globe className="w-4 h-4 text-zinc-300" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Visa<span className="text-zinc-400">Switch</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 leading-relaxed max-w-xs mb-5">
              Intelligent visa navigation for Australia, UK, Canada, and Japan. Plan smarter, apply with confidence.
            </p>
            <div className="flex items-center gap-2 text-xs text-zinc-700">
              <Shield className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Not legal advice. For informational purposes only.</span>
            </div>
          </div>

          {/* Countries */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Countries</h3>
            <ul className="space-y-3">
              {countryList.map((country) => (
                <li key={country.code}>
                  <Link href={`/${country.code}/guide`} className="text-sm text-zinc-600 hover:text-white transition-colors">
                    {country.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-4">Company</h3>
            <ul className="space-y-3">
              <li><Link href="/about" className="text-sm text-zinc-600 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/pricing" className="text-sm text-zinc-600 hover:text-white transition-colors">Pricing</Link></li>
              <li><Link href="/contact" className="text-sm text-zinc-600 hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/privacy" className="text-sm text-zinc-600 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-zinc-600 hover:text-white transition-colors">Terms of Use</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.05] py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-zinc-700">&copy; {new Date().getFullYear()} VisaSwitch. All rights reserved.</p>
          <p className="text-xs text-zinc-800">Always verify requirements with official government sources.</p>
        </div>
      </div>
    </footer>
  );
}
