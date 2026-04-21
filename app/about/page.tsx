import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Shield, Zap, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "About — VisaSwitch",
  description: "VisaSwitch gives you the same clarity a good migration agent would — free, structured, and without the wait.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-black">

      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-[15%] w-[600px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, rgba(180,200,255,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs font-semibold text-zinc-500 mb-6 uppercase tracking-widest">
            About
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight text-white leading-tight">
            Visa navigation<br />
            <span className="gradient-text">without the confusion.</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-xl mx-auto">
            Immigration is one of the most consequential decisions you&apos;ll make. VisaSwitch gives you a clear, structured path through it — for free.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#04060c] pointer-events-none" />
      </section>

      {/* Why */}
      <section className="section-dark py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-white mb-4">Why we built this</h2>
          <p className="text-zinc-500 leading-relaxed mb-4">
            Every year, millions of people navigate complex immigration systems — often spending thousands on applications that get refused, missing pathways they were eligible for, or not knowing what to do after a refusal.
          </p>
          <p className="text-zinc-500 leading-relaxed mb-4">
            A good migration agent gives you clarity: which visa fits you, what your risks are, exactly what to prepare. VisaSwitch does the same thing, structured into a four-step guide — pathway finding, eligibility check, risk scoring, and application tracking.
          </p>
          <p className="text-zinc-500 leading-relaxed">
            The full guide is free. No account, no credit card, no time limit. We charge only for extras — PDF export, cloud sync, and priority support.
          </p>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-dark pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: Globe,
                title: "Multi-country",
                desc: "Australia, UK, Canada, and Japan. One consistent flow across every country, with more coming.",
              },
              {
                icon: Zap,
                title: "Instant clarity",
                desc: "No intake forms or waiting lists. You get your pathway ranking, risk score, and checklist right now.",
              },
              {
                icon: Shield,
                title: "Honest guidance",
                desc: "We tell you your risk score and refusal factors, not just what you want to hear.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass rounded-xl border border-white/[0.08] p-5">
                  <div className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.09] flex items-center justify-center mb-4">
                    <Icon className="w-4.5 h-4.5 text-zinc-300" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Not a law firm */}
      <section className="section-mid py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 glass rounded-xl border border-amber-500/20 bg-amber-500/[0.04] p-6">
            <AlertTriangle className="w-5 h-5 text-amber-500/70 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-sm font-bold text-white mb-1.5">Not legal advice</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">
                VisaSwitch is not a migration agent, law firm, or government service. We do not provide legal advice and we do not lodge applications on your behalf. For complex or sensitive situations, always engage a registered migration professional and verify requirements with the official government portal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-black py-20 text-center">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse, rgba(200,220,255,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-3">See it for yourself</h2>
          <p className="text-zinc-500 text-sm mb-7">Free four-step visa guide. No account needed.</p>
          <Link
            href="/au/guide"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-white text-black rounded-xl hover:bg-zinc-100 transition-all group"
          >
            Start free guide
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
