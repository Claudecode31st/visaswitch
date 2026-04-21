import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use — VisaSwitch",
  description: "Terms of Use for VisaSwitch. Read before using the platform.",
};

const sections = [
  {
    title: "1. Acceptance",
    body: `By accessing or using VisaSwitch ("the Service"), you agree to be bound by these Terms of Use. If you do not agree, do not use the Service.`,
  },
  {
    title: "2. What VisaSwitch is",
    body: `VisaSwitch is an information and self-assessment tool designed to help you understand visa options, eligibility factors, and application processes. It is not a migration agent, law firm, government service, or visa consultancy.`,
  },
  {
    title: "3. Not legal advice",
    body: `Nothing on VisaSwitch constitutes legal advice, migration advice, or a guarantee of any outcome. Visa rules change frequently and vary by individual circumstance. Always verify requirements with the relevant official government source and, for complex situations, consult a registered migration professional.`,
  },
  {
    title: "4. No lodgement",
    body: `VisaSwitch does not lodge, submit, or manage visa applications on your behalf. Any information you enter is used solely to generate your personalised guide and is stored locally in your browser (or in your cloud account if you subscribe to Pro).`,
  },
  {
    title: "5. Accuracy",
    body: `We make reasonable efforts to keep content up to date, but we do not warrant that all information is current, complete, or free from error. Use the Service as a starting point, not as your sole source of immigration guidance.`,
  },
  {
    title: "6. Pro subscription",
    body: `The Pro tier is a one-time payment. It grants access to PDF export, cloud sync, and priority support as described on the Pricing page. All sales are subject to our 7-day money-back guarantee. We reserve the right to modify Pro features with reasonable notice.`,
  },
  {
    title: "7. Prohibited use",
    body: `You must not use VisaSwitch to: (a) provide immigration or legal advice to third parties; (b) resell or redistribute our content; (c) attempt to reverse-engineer or scrape the platform; or (d) use the Service in any way that violates applicable law.`,
  },
  {
    title: "8. Intellectual property",
    body: `All content, design, and code on VisaSwitch is owned by or licensed to us. You may not reproduce, distribute, or create derivative works without our prior written consent.`,
  },
  {
    title: "9. Limitation of liability",
    body: `To the maximum extent permitted by law, VisaSwitch and its operators are not liable for any direct, indirect, incidental, or consequential loss arising from your use of the Service — including refusals, errors, or reliance on information provided.`,
  },
  {
    title: "10. Changes",
    body: `We may update these Terms at any time. Continued use of the Service after changes are posted constitutes acceptance. The date below reflects the most recent revision.`,
  },
  {
    title: "11. Contact",
    body: `Questions? Email us at support@visaswitch.com.`,
  },
];

export default function TermsPage() {
  return (
    <div className="flex flex-col bg-black min-h-screen">

      {/* Hero */}
      <section className="relative overflow-hidden bg-black py-20">
        <div className="absolute inset-0 pointer-events-none" aria-hidden>
          <div className="absolute top-0 right-[20%] w-[500px] h-[300px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, rgba(180,200,255,1) 0%, transparent 70%)" }} />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/[0.08] bg-white/[0.04] text-xs font-semibold text-zinc-500 mb-5 uppercase tracking-widest">
            Legal
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">Terms of Use</h1>
          <p className="text-zinc-600 text-sm">Last updated: April 2025</p>
        </div>
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-b from-transparent to-[#04060c] pointer-events-none" />
      </section>

      {/* Body */}
      <section className="section-dark py-12 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {sections.map((s) => (
              <div key={s.title}>
                <h2 className="text-sm font-bold text-white mb-2">{s.title}</h2>
                <p className="text-sm text-zinc-500 leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="mt-12 pt-8 border-t border-white/[0.06]">
            <p className="text-xs text-amber-500/60 mb-4">
              VisaSwitch is not a migration agent or legal service. Always verify immigration requirements with official government sources.
            </p>
            <Link href="/privacy" className="text-xs text-zinc-600 hover:text-white transition-colors">
              Privacy Policy →
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
