import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Globe, Database, BookOpen, ShieldOff, UserX, MessageSquareOff, CheckCircle, XCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "About — VisaSwitch",
  description: "VisaSwitch is a structured visa information platform. We are not a migration agent, law firm, or government service.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* Hero */}
      <section className="relative overflow-hidden py-24 hero-gradient">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-[15%] w-[600px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, rgba(180,200,255,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-semibold text-zinc-500 mb-6 uppercase tracking-widest" style={{ borderColor: "var(--border)", background: "var(--muted)" }}>
            About VisaSwitch
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 tracking-tight leading-tight" style={{ color: "var(--foreground)" }}>
            Structured visa information,<br />
            <span className="gradient-text">nothing more.</span>
          </h1>
          <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl mx-auto">
            VisaSwitch organises publicly available immigration information into a clear, step-by-step format. We are a reference tool — not an agent, not a law firm, and not a government service.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 pointer-events-none" style={{ background: "linear-gradient(to bottom, transparent, var(--section-dark-from))" }} />
      </section>

      {/* Who we are */}
      <section className="section-dark py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-5" style={{ color: "var(--foreground)" }}>Who we are</h2>
          <p className="text-zinc-500 leading-relaxed mb-4">
            VisaSwitch is an independent software product. We are not affiliated with any government immigration authority, registered migration agency, or legal practice.
          </p>
          <p className="text-zinc-500 leading-relaxed mb-4">
            We built VisaSwitch because immigration information is publicly available but poorly organised. Finding the right visa, understanding eligibility, and knowing what to prepare takes hours of reading across government portals. We structured that information into a consistent four-step flow so you can work through it quickly and clearly.
          </p>
          <p className="text-zinc-500 leading-relaxed">
            The guide covers Australia, United Kingdom, Canada, and Japan — summarising each country&apos;s visa pathways, eligibility criteria, risk factors, and application checklists based on publicly available official sources.
          </p>
        </div>
      </section>

      {/* What we do / don't do */}
      <section className="section-dark pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-8 text-center" style={{ color: "var(--foreground)" }}>What we do and don&apos;t do</h2>
          <div className="grid sm:grid-cols-2 gap-4">

            {/* Do */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(16,185,129,0.05)", border: "1px solid rgba(16,185,129,0.2)" }}>
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-5 h-5 text-emerald-500" />
                <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>We do</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Organise official visa pathway information into a structured format",
                  "Show eligibility criteria and common risk factors based on public guidance",
                  "Generate a personalised checklist of documents and tasks",
                  "Help you understand what questions to ask a migration professional",
                  "Save your progress locally in your browser — nothing is sent to our servers",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                    <span className="text-sm text-zinc-500 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Don't */}
            <div className="rounded-2xl p-6" style={{ background: "rgba(239,68,68,0.05)", border: "1px solid rgba(239,68,68,0.18)" }}>
              <div className="flex items-center gap-2 mb-5">
                <XCircle className="w-5 h-5 text-red-500" />
                <h3 className="text-sm font-bold" style={{ color: "var(--foreground)" }}>We don&apos;t</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Provide legal advice, migration advice, or any professional opinion",
                  "Guarantee any outcome — visa rules change and individual circumstances vary",
                  "Lodge, submit, or manage applications on your behalf",
                  "Store your personal data on our servers (free tier is 100% local)",
                  "Replace a registered migration agent or immigration lawyer for complex cases",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span className="text-sm text-zinc-500 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-mid pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-8 text-center" style={{ color: "var(--foreground)" }}>How the platform works</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: BookOpen,
                title: "Structured information",
                desc: "Visa requirements, eligibility criteria, and application steps are drawn from official government sources and structured into a consistent format.",
              },
              {
                icon: Globe,
                title: "No data collection",
                desc: "All guide inputs — your visa selections, eligibility answers, and checklist progress — are stored in your browser only. Nothing is transmitted to us.",
              },
              {
                icon: Database,
                title: "You stay in control",
                desc: "Your data never leaves your device unless you opt into cloud sync with a Pro account. Even then, we hold only your guide state — never passport or identity data.",
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="glass rounded-xl p-5" style={{ border: "1px solid var(--border)" }}>
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                    <Icon className="w-4 h-4" style={{ color: "var(--muted-foreground)" }} />
                  </div>
                  <h3 className="text-sm font-bold mb-1.5" style={{ color: "var(--foreground)" }}>{item.title}</h3>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Important notice */}
      <section className="section-dark pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl p-6" style={{ background: "rgba(245,158,11,0.06)", border: "1px solid rgba(245,158,11,0.25)" }}>
            <h3 className="text-sm font-bold mb-3 text-amber-600 dark:text-amber-400">Important — please read before using VisaSwitch</h3>
            <div className="space-y-2.5">
              {[
                "VisaSwitch is an information tool only. Nothing on this platform constitutes legal advice, migration advice, or a professional recommendation of any kind.",
                "Immigration rules, fees, processing times, and eligibility criteria change regularly. Always verify requirements with the official government authority for your country before taking any action.",
                "For complex situations — prior refusals, criminal history, health waivers, or family circumstances — you should engage a registered migration agent (MARA for Australia, OISC for the UK, ICCRC for Canada) or an immigration lawyer.",
                "Use VisaSwitch as a starting point to understand your options, not as the final word on your case.",
              ].map((point, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                  <p className="text-sm text-zinc-500 leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 text-center hero-gradient">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(ellipse, rgba(200,220,255,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--foreground)" }}>See it for yourself</h2>
          <p className="text-zinc-500 text-sm mb-7">Free four-step visa guide. No account needed. Nothing stored.</p>
          <Link
            href="/au/guide"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold rounded-xl transition-all group"
            style={{ background: "var(--primary)", color: "var(--primary-foreground)" }}
          >
            Start free guide
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>

    </div>
  );
}
