import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle, XCircle, ArrowRight, Zap, Shield, Building2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing for VisaSwitch. Start free — upgrade when you need deeper analysis.",
};

const plans = [
  {
    name: "Free",
    price: "0",
    period: "forever",
    description: "Full pathway check and basic tools — no account required.",
    cta: "Start for free",
    href: "/au/pathways",
    highlight: false,
    icon: Zap,
    features: [
      { label: "Pathway Checker (all countries)", included: true },
      { label: "Full eligibility breakdown", included: true },
      { label: "Refusal reasons library", included: true },
      { label: "Basic checklist template", included: true },
      { label: "Personalised timeline with deadlines", included: false },
      { label: "Pre-lodgement risk score", included: false },
      { label: "Refusal recovery plan", included: false },
      { label: "Save & export your results", included: false },
    ],
  },
  {
    name: "Pro",
    price: "29",
    period: "one-time",
    description: "Everything you need for a single visa application — pay once, use as long as you need.",
    cta: "Get Pro access",
    href: "/sign-up",
    highlight: true,
    icon: Shield,
    badge: "Most popular",
    features: [
      { label: "Everything in Free", included: true },
      { label: "Personalised timeline with deadlines", included: true },
      { label: "Pre-lodgement risk score & audit", included: true },
      { label: "Refusal recovery plan", included: true },
      { label: "Save & export your results (PDF)", included: true },
      { label: "Unlimited re-assessments", included: true },
      { label: "Multi-pathway comparison", included: true },
      { label: "Priority email support", included: false },
    ],
  },
  {
    name: "Premium",
    price: "79",
    period: "one-time",
    description: "Complex situations, multiple pathways, or family applications — full coverage.",
    cta: "Get Premium",
    href: "/sign-up",
    highlight: false,
    icon: Building2,
    features: [
      { label: "Everything in Pro", included: true },
      { label: "Multi-country comparison", included: true },
      { label: "Family / dependant planning", included: true },
      { label: "Complex situation assessment", included: true },
      { label: "Priority email support (48h response)", included: true },
      { label: "Personalised checklist for dependants", included: true },
      { label: "Pathway change scenario modelling", included: true },
      { label: "Early access to new features", included: true },
    ],
  },
];

export default function PricingPage() {
  return (
    <div className="flex flex-col bg-black">
      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-[20%] w-[500px] h-[400px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(circle, rgba(180,200,255,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight text-white">
            Simple, <span className="gradient-text">transparent pricing</span>
          </h1>
          <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
            Start with the free pathway check. Upgrade when you need personalised planning, risk analysis, or refusal recovery.
          </p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-b from-transparent to-[#04060c] pointer-events-none" />
      </section>

      {/* Plans */}
      <section className="section-dark py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-5">
            {plans.map((plan) => {
              const Icon = plan.icon;
              return (
                <div
                  key={plan.name}
                  className={`rounded-2xl border p-7 flex flex-col ${
                    plan.highlight
                      ? "bg-white/[0.07] border-white/25 shadow-[0_0_60px_rgba(255,255,255,0.06)]"
                      : "glass border-white/[0.08]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-5">
                    <div>
                      {plan.badge && (
                        <span className="inline-block text-xs font-bold text-zinc-300 bg-white/[0.09] border border-white/15 px-2.5 py-1 rounded-full mb-2">
                          {plan.badge}
                        </span>
                      )}
                      <h2 className="text-lg font-bold text-white">{plan.name}</h2>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-white/[0.07] border border-white/[0.09] flex items-center justify-center">
                      <Icon className="w-5 h-5 text-zinc-300" />
                    </div>
                  </div>

                  <div className="mb-5">
                    <div className="flex items-end gap-1.5">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-sm text-zinc-600 pb-1">AUD / {plan.period}</span>
                    </div>
                    <p className="text-sm text-zinc-500 mt-2 leading-relaxed">{plan.description}</p>
                  </div>

                  <Link
                    href={plan.href}
                    className={`w-full py-3 text-sm font-semibold rounded-xl text-center mb-6 transition-all ${
                      plan.highlight
                        ? "bg-white text-black hover:bg-zinc-100"
                        : "border border-white/[0.12] text-zinc-300 hover:border-white/25 hover:text-white"
                    }`}
                  >
                    {plan.cta}
                  </Link>

                  <ul className="space-y-2.5 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature.label} className="flex items-center gap-2.5">
                        {feature.included ? (
                          <CheckCircle className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                        ) : (
                          <XCircle className="w-4 h-4 flex-shrink-0 text-zinc-700" />
                        )}
                        <span className={`text-sm ${feature.included ? "text-zinc-300" : "text-zinc-700"}`}>
                          {feature.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="text-center text-sm text-zinc-700 mt-8">
            All plans are one-time payments. No subscriptions, no recurring charges.
          </p>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-mid py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-8 text-center">Pricing FAQ</h2>
          <div className="space-y-3">
            {[
              { q: "Can I start without paying?", a: "Yes — the Pathway Checker is fully free. You can check your eligibility across all pathways and see a full breakdown without creating an account." },
              { q: "Do I need to pay per country?", a: "No. A Pro or Premium purchase covers all countries (Australia, UK, Canada, and Japan) for the duration of your application." },
              { q: "What if I have a complex situation?", a: "Premium is designed for complex cases — multiple pathways, family applications, prior refusals, or situations involving more than one country." },
              { q: "Is there a refund policy?", a: "Yes — if the tools are not useful for your situation, contact us within 7 days for a full refund. No questions asked." },
            ].map((faq, i) => (
              <div key={i} className="glass rounded-xl border border-white/[0.08] p-5">
                <h3 className="text-sm font-semibold text-white mb-2">{faq.q}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-black py-20 text-center">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[300px] rounded-full opacity-[0.06]"
            style={{ background: "radial-gradient(ellipse, rgba(200,220,255,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white mb-3">Start with the free pathway check</h2>
          <p className="text-zinc-500 text-sm mb-7">No account required. See all your options in under 3 minutes.</p>
          <Link
            href="/au/pathways"
            className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-semibold bg-white text-black rounded-xl hover:bg-zinc-100 transition-all group"
          >
            Check my pathways
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
