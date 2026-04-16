import Link from "next/link";
import {
  ArrowRight,
  CheckCircle,
  ShieldCheck,
  ListChecks,
  BarChart3,
  RefreshCw,
  Star,
  Globe,
  Clock,
  Users,
  TrendingUp,
  Sparkles,
  Zap,
  Lock,
  FileCheck,
  ChevronRight,
  LogIn,
} from "lucide-react";
import { countryList } from "@/data";

const countryMeta: Record<string, { abbr: string; tagline: string; pathways: string; authority: string }> = {
  au: { abbr: "AU", tagline: "Australia", pathways: "14 pathways", authority: "Home Affairs" },
  uk: { abbr: "UK", tagline: "United Kingdom", pathways: "8 pathways", authority: "UKVI" },
  ca: { abbr: "CA", tagline: "Canada", pathways: "9 pathways", authority: "IRCC" },
  jp: { abbr: "JP", tagline: "Japan", pathways: "8 pathways", authority: "Immigration Bureau" },
};

const countryColors: Record<string, { badge: string; glow: string; border: string }> = {
  au: { badge: "bg-blue-500/20 text-blue-300 border-blue-500/30", glow: "rgba(59,130,246,0.15)", border: "rgba(59,130,246,0.25)" },
  uk: { badge: "bg-rose-500/20 text-rose-300 border-rose-500/30", glow: "rgba(244,63,94,0.15)", border: "rgba(244,63,94,0.25)" },
  ca: { badge: "bg-red-500/20 text-red-300 border-red-500/30", glow: "rgba(239,68,68,0.15)", border: "rgba(239,68,68,0.25)" },
  jp: { badge: "bg-slate-500/20 text-slate-300 border-slate-500/30", glow: "rgba(148,163,184,0.15)", border: "rgba(148,163,184,0.25)" },
};

const tools = [
  {
    icon: Globe,
    step: "01",
    title: "Pathway Checker",
    description: "Input your current visa status and goals. Get every pathway you qualify for — ranked by difficulty, speed, and fit.",
    cta: "Check my pathways",
    href: "/au/pathways",
    accent: "from-blue-500 to-cyan-500",
    iconBg: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
  },
  {
    icon: ListChecks,
    step: "02",
    title: "Checklist & Timeline",
    description: "A personalised, pathway-specific checklist with every document, deadline, and milestone — nothing generic.",
    cta: "Build my plan",
    href: "/au/planner",
    accent: "from-indigo-500 to-violet-500",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: BarChart3,
    step: "03",
    title: "Pre-lodgement Risk Audit",
    description: "Score your application before you submit. Surface critical weaknesses, get priority fixes, and maximise your approval odds.",
    cta: "Audit my application",
    href: "/au/audit",
    accent: "from-violet-500 to-purple-500",
    iconBg: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-400",
  },
  {
    icon: RefreshCw,
    step: "04",
    title: "Refusal Recovery",
    description: "Received a refusal? Identify the exact reasons, understand their severity, and map the strongest path to overturning it.",
    cta: "Recover from refusal",
    href: "/au/recovery",
    accent: "from-rose-500 to-pink-500",
    iconBg: "bg-rose-500/10 border-rose-500/20",
    iconColor: "text-rose-400",
  },
];

const stats = [
  { value: "39", label: "Visa pathways mapped", sub: "Across 4 countries" },
  { value: "4", label: "Countries covered", sub: "AU · UK · CA · JP" },
  { value: "Free", label: "To start", sub: "No credit card needed" },
  { value: "100%", label: "Browser-based", sub: "Nothing stored server-side" },
];

const features = [
  {
    icon: Zap,
    title: "Instant results, no waiting",
    description: "Select your situation and see ranked visa pathways in seconds. No form submissions, no waiting for a consultant to reply.",
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
  },
  {
    icon: FileCheck,
    title: "Pathway-specific, not generic",
    description: "Every checklist item, risk factor, and eligibility requirement is specific to your selected visa — not a copy-paste template.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    icon: Lock,
    title: "No account required",
    description: "All tools run entirely in your browser. Your situation, answers, and results never leave your device unless you choose.",
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    icon: ShieldCheck,
    title: "Verified against official sources",
    description: "Every visa requirement is cross-referenced with the official immigration authority — Home Affairs, UKVI, IRCC, and Japan MOJ.",
    color: "text-violet-400",
    bg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    icon: TrendingUp,
    title: "Connected, not siloed",
    description: "Your pathway choice flows directly into the planner, the audit, and refusal recovery — the tools hand context to each other.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10 border-cyan-500/20",
  },
  {
    icon: Users,
    title: "Built for real complexity",
    description: "Multiple visas, prior refusals, expiring status, dependants — the tools are designed for situations that don't fit a simple box.",
    color: "text-rose-400",
    bg: "bg-rose-500/10 border-rose-500/20",
  },
];

const testimonials = [
  {
    quote: "I had no idea there were so many pathways available. VisaSwitch helped me realise I qualified for the 485 visa before it expired — saved me a fortune in migration agent fees.",
    name: "Anh T.",
    role: "Software Engineer · Vietnam → Australia",
    rating: 5,
    highlight: "Saved thousands in agent fees",
  },
  {
    quote: "The refusal recovery tool was incredibly thorough. It identified the exact issue — a GTE statement that wasn't specific enough — and gave me a clear action plan that worked second time.",
    name: "Carlos M.",
    role: "Project Manager · Colombia → UK",
    rating: 5,
    highlight: "Approved on second attempt",
  },
  {
    quote: "The timeline planner removed so much stress from our Express Entry application. We knew exactly what to do every single week. No surprises, no scrambling.",
    name: "Priya & Raj S.",
    role: "Engineers · India → Canada",
    rating: 5,
    highlight: "Express Entry approved",
  },
];

const faqs = [
  {
    q: "Is VisaSwitch a substitute for a migration agent?",
    a: "No — and we're upfront about that. VisaSwitch gives you structured information, personalised checklists, and risk analysis so you can understand your options and prepare effectively. For complex situations or formal legal advice, always engage a registered migration agent or immigration lawyer.",
  },
  {
    q: "How current is the information?",
    a: "We review visa requirements regularly against official government sources. That said, immigration rules change frequently — always verify critical details with the relevant official authority (Home Affairs, UKVI, IRCC, or Japan MOJ) before lodging.",
  },
  {
    q: "Do I need to create an account?",
    a: "No. All four tools work fully in your browser without an account. A free account unlocks saved progress, export features, and priority updates when rules change.",
  },
  {
    q: "Which countries are covered?",
    a: "Currently Australia, United Kingdom, Canada, and Japan — covering 39 visa pathways. More countries are on the roadmap.",
  },
  {
    q: "Can I use VisaSwitch if my situation is complex?",
    a: "Yes — it's designed for complexity. Prior refusals, expiring visas, multiple overlapping pathways, dependants — input your real situation and get a result that reflects it.",
  },
];

export default function HomePage() {
  return (
    <div className="flex flex-col">

      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section className="hero-gradient relative overflow-hidden">
        {/* Radial glow blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-[-10%] left-[15%] w-[600px] h-[600px] rounded-full opacity-20"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)" }} />
          <div className="absolute top-[10%] right-[5%] w-[400px] h-[400px] rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)" }} />
          <div className="absolute bottom-[-5%] left-[40%] w-[500px] h-[300px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)" }} />
        </div>

        {/* Subtle grid */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20 lg:pt-32 lg:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold text-slate-300 mb-8 uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Australia · UK · Canada · Japan
            </div>

            {/* H1 */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6 tracking-tight text-white">
              Your visa journey,{" "}
              <br className="hidden sm:block" />
              <span className="gradient-text">navigated precisely.</span>
            </h1>

            {/* Sub */}
            <p className="text-lg sm:text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Four connected tools that take you from eligibility check through to
              approval — with pathway-specific checklists, real risk analysis,
              and refusal recovery built in.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-16">
              <Link
                href="/au/pathways"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg shadow-blue-500/30 ring-1 ring-inset ring-white/10 group"
              >
                Check my pathways
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
              <Link
                href="#tools"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-slate-300 glass rounded-xl hover:bg-white/8 transition-all border border-white/10"
              >
                See how it works
              </Link>
            </div>

            {/* Country selector */}
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-4">Select your destination</p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
                {countryList.map((country) => {
                  const meta = countryMeta[country.code];
                  const col = countryColors[country.code];
                  return (
                    <Link
                      key={country.code}
                      href={`/${country.code}`}
                      className="glass glass-hover rounded-2xl p-4 flex flex-col items-center gap-2 text-center group"
                      style={{ borderColor: col.border }}
                    >
                      <span className={`text-xs font-bold px-2 py-1 rounded-lg border ${col.badge}`}>
                        {meta.abbr}
                      </span>
                      <span className="text-sm font-semibold text-white">{meta.tagline}</span>
                      <span className="text-xs text-slate-500">{meta.pathways}</span>
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-slate-100">
            {stats.map((stat) => (
              <div key={stat.label} className="px-6 first:pl-0 last:pr-0 flex flex-col gap-0.5">
                <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
                <div className="text-sm font-medium text-slate-700">{stat.label}</div>
                <div className="text-xs text-slate-400">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TOOLS ─────────────────────────────────────────────────────── */}
      <section id="tools" className="section-dark relative overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-[20%] w-[400px] h-[400px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(99,102,241,0.6) 0%, transparent 70%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold text-slate-400 mb-5 uppercase tracking-widest">
              Four connected tools
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Every stage of the visa journey,{" "}
              <span className="gradient-text">covered.</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
              Use one, use all four — they share context so your pathway choice flows directly into your checklist, audit, and recovery plan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.title} className="glass glass-hover rounded-2xl p-6 flex flex-col gap-5 border border-white/8 group">
                  <div className="flex items-start gap-4">
                    <div className={`w-11 h-11 rounded-xl border flex items-center justify-center flex-shrink-0 ${tool.iconBg}`}>
                      <Icon className={`w-5 h-5 ${tool.iconColor}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1.5">
                        <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Step {tool.step}</span>
                      </div>
                      <h3 className="text-base font-bold text-white mb-2">{tool.title}</h3>
                      <p className="text-sm text-slate-400 leading-relaxed">{tool.description}</p>
                    </div>
                  </div>
                  <Link
                    href={tool.href}
                    className={`inline-flex items-center gap-1.5 text-sm font-semibold bg-gradient-to-r ${tool.accent} bg-clip-text text-transparent group-hover:gap-2 transition-all self-start`}
                  >
                    {tool.cta}
                    <ArrowRight className={`w-3.5 h-3.5 ${tool.iconColor}`} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              From uncertainty to action{" "}
              <span className="gradient-text-dark">in three steps.</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto leading-relaxed">
              Most people don&apos;t know what they don&apos;t know. VisaSwitch structures the complexity so you always know your next move.
            </p>
          </div>

          <div className="relative grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-[calc(16.67%+1.5rem)] right-[calc(16.67%+1.5rem)] h-px bg-gradient-to-r from-blue-200 via-indigo-200 to-violet-200" />

            {[
              {
                number: "1",
                title: "Tell us your situation",
                desc: "Select your current visa status, nationality, occupation, and goal. No account needed — takes under a minute.",
                color: "from-blue-500 to-indigo-500",
                shadow: "shadow-blue-200",
              },
              {
                number: "2",
                title: "Get your complete picture",
                desc: "Ranked visa pathways, a pathway-specific checklist, and a risk score — generated instantly for your exact situation.",
                color: "from-indigo-500 to-violet-500",
                shadow: "shadow-indigo-200",
              },
              {
                number: "3",
                title: "Apply with confidence",
                desc: "Know precisely what to prepare, when to lodge, and which risks to address — before you spend a dollar on fees.",
                color: "from-violet-500 to-purple-500",
                shadow: "shadow-violet-200",
              },
            ].map((step) => (
              <div key={step.number} className="relative flex flex-col items-center text-center gap-4">
                <div className={`relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg ${step.shadow}`}>
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────── */}
      <section className="section-dark relative overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute bottom-0 left-[10%] w-[500px] h-[300px] rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 tracking-tight">
              Why VisaSwitch is different
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto leading-relaxed">
              Not a directory. Not a forum. A precision toolkit built specifically for navigating the visa application process.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div key={f.title} className="glass rounded-2xl p-6 border border-white/8 flex flex-col gap-4">
                  <div className={`w-10 h-10 rounded-xl border flex items-center justify-center flex-shrink-0 ${f.bg}`}>
                    <Icon className={`w-4.5 h-4.5 ${f.color}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white mb-1.5">{f.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{f.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-100 text-xs font-semibold text-amber-700 mb-4 uppercase tracking-widest">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              What people say
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              People who used it.{" "}
              <span className="gradient-text-dark">People who got through.</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {testimonials.map((t, i) => (
              <div key={i} className="card-hover bg-white rounded-2xl border border-slate-200 p-7 shadow-sm flex flex-col gap-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                    {t.highlight}
                  </span>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="pt-3 border-t border-slate-100">
                  <div className="text-sm font-bold text-slate-900">{t.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-slate-400 mt-6">
            Testimonials reflect individual experiences. Immigration outcomes vary based on personal circumstances.
          </p>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">Common questions</h2>
            <p className="text-slate-500 text-sm">Straight answers — no fluff.</p>
          </div>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                <div className="px-6 py-5">
                  <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    {faq.q}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed ml-7">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────────── */}
      <section className="hero-gradient relative overflow-hidden py-24">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full opacity-15"
            style={{ background: "radial-gradient(ellipse, rgba(99,102,241,0.6) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 text-xs font-semibold text-slate-400 mb-6 uppercase tracking-widest">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
            Free pathway check · No credit card
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-5 tracking-tight">
            Your next step{" "}
            <span className="gradient-text">starts here.</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 leading-relaxed">
            No guesswork. No expensive surprises. Just a clear, precise path forward — built for your exact situation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <Link
              href="/au/pathways"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all shadow-xl shadow-blue-500/25 ring-1 ring-inset ring-white/10 group"
            >
              <Sparkles className="w-4 h-4" />
              Start with Australia
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-medium text-slate-300 glass rounded-xl hover:bg-white/8 transition-all border border-white/10"
            >
              View pricing
            </Link>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-5 text-xs text-slate-500">
            {[
              "No account required to start",
              "Pathway-specific content",
              "Browser-only · Nothing stored",
            ].map((item) => (
              <span key={item} className="flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
