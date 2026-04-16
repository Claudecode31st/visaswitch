import type { Metadata } from "next";
import Link from "next/link";
import { Globe, Shield, Target, Users, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "About VisaSwitch",
  description: "Learn about VisaSwitch — our mission to make visa navigation accessible, clear, and stress-free.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-[20%] w-[500px] h-[400px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, rgba(180,200,255,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs font-semibold text-zinc-500 mb-6 uppercase tracking-widest">
              About
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight text-white">About VisaSwitch</h1>
            <p className="text-zinc-500 text-lg leading-relaxed">
              Immigration is one of the most consequential decisions people make. We built VisaSwitch to make it navigable.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#04060c] pointer-events-none" />
      </section>

      {/* Content */}
      <section className="section-dark py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">Our mission</h2>
              <p className="text-zinc-500 leading-relaxed mb-4">
                Millions of people navigate complex immigration systems every year — often without clear guidance, spending thousands on fees for visas that get refused, or missing pathways they were eligible for all along.
              </p>
              <p className="text-zinc-500 leading-relaxed">
                VisaSwitch exists to change that. We provide structured, data-driven tools that give people the same clarity a good migration agent would — at a fraction of the cost and without the waiting time.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-4">What we are not</h2>
              <p className="text-zinc-500 leading-relaxed mb-4">
                We are not a migration agent, a law firm, or a government agency. VisaSwitch does not provide legal advice and does not lodge visa applications on your behalf.
              </p>
              <p className="text-zinc-500 leading-relaxed">
                We are a tools platform — designed to inform your decisions, prepare your application, and reduce the chance of costly mistakes. For complex legal situations, we always recommend engaging a registered professional.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {[
              { icon: Globe, title: "Multi-country", desc: "Australia, UK, Canada, and Japan — more countries coming soon" },
              { icon: Target, title: "Data-driven", desc: "Tools built on current immigration rules, not general advice" },
              { icon: Shield, title: "Transparent", desc: "No legal advice, no hidden claims — just structured guidance" },
              { icon: Users, title: "People-first", desc: "Designed for real applicants in real situations, including complex ones" },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass rounded-xl border border-white/[0.08] p-5">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.06] border border-white/[0.09] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5 text-zinc-300" />
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1.5">{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>

          <div className="glass rounded-2xl border border-white/[0.08] p-10 text-center">
            <h2 className="text-2xl font-bold text-white mb-3">Start navigating your visa journey</h2>
            <p className="text-zinc-500 text-sm mb-7">Free pathway check — no account required.</p>
            <Link
              href="/au/pathways"
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-white text-black rounded-xl hover:bg-zinc-100 transition-all group"
            >
              Check my pathways
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
