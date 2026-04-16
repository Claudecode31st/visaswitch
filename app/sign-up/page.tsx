import type { Metadata } from "next";
import Link from "next/link";
import { Globe, ArrowRight, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create your free VisaSwitch account.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-12">
      {/* Glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(ellipse, rgba(180,200,255,1) 0%, transparent 70%)" }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-zinc-300" />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">
              Visa<span className="text-zinc-400">Switch</span>
            </span>
          </Link>
        </div>

        <div className="glass rounded-2xl border border-white/[0.09] p-8">
          <h1 className="text-2xl font-bold text-white mb-1 text-center">Create your account</h1>
          <p className="text-zinc-500 text-sm text-center mb-5">Free forever — no credit card required</p>

          <div className="flex flex-wrap gap-3 justify-center mb-7">
            {["Free pathway check", "Save results", "Build checklists"].map((item) => (
              <div key={item} className="flex items-center gap-1.5 text-xs text-zinc-500">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500/70" />
                {item}
              </div>
            ))}
          </div>

          <form className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Full name</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Email address</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-zinc-300 mb-2">Password</label>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="At least 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-white/[0.12] bg-white/[0.05] text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30 transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 text-sm font-semibold bg-white text-black rounded-xl hover:bg-zinc-100 transition-all flex items-center justify-center gap-2 mt-2"
            >
              Create free account
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <p className="text-center text-xs text-zinc-700 mt-4">
            By creating an account, you agree to our{" "}
            <Link href="/terms" className="text-zinc-500 hover:text-white transition-colors">Terms</Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-zinc-500 hover:text-white transition-colors">Privacy Policy</Link>.
          </p>

          <p className="text-center text-sm text-zinc-600 mt-4">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-zinc-300 font-semibold hover:text-white transition-colors">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
