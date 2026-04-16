"use client";
import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  BarChart3, ChevronRight, AlertTriangle, CheckCircle, XCircle,
  Shield, RefreshCw, TrendingUp, TrendingDown, Minus, Info,
  ListChecks, ChevronDown, ChevronUp, Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CountryData, RiskFactor, VisaPathway } from "@/types";

interface Props {
  countryData: CountryData;
  countryCode: string;
}

type RiskLevel = "low" | "moderate" | "high" | "critical";

interface FactorResult {
  factor: RiskFactor;
  answer: "yes" | "no" | "partial" | null;
  impact: "positive" | "neutral" | "negative" | "critical";
  score: number;
}

const riskLevelConfig: Record<RiskLevel, { label: string; color: string; bg: string; border: string; description: string }> = {
  low: {
    label: "Low Risk",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20",
    description: "Your application profile looks strong. Proceed with final preparation and lodge when ready.",
  },
  moderate: {
    label: "Moderate Risk",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/20",
    description: "Some risk factors identified. Address the recommendations below before lodging.",
  },
  high: {
    label: "High Risk",
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    description: "Significant risk factors detected. We strongly recommend addressing these before submitting.",
  },
  critical: {
    label: "Critical Risk",
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    description: "One or more critical issues detected. Lodging now carries a high probability of refusal. Seek expert advice.",
  },
};

function computeRiskLevel(score: number): RiskLevel {
  if (score >= 75) return "low";
  if (score >= 50) return "moderate";
  if (score >= 30) return "high";
  return "critical";
}

export function RiskAudit({ countryData, countryCode }: Props) {
  const searchParams = useSearchParams();
  const pathwayParam = searchParams.get("pathway") ?? "";

  const [selectedPathway, setSelectedPathway] = useState<string>(pathwayParam);
  const [factorResults, setFactorResults] = useState<Map<string, "yes" | "no" | "partial">>(new Map());
  const [expandedFactor, setExpandedFactor] = useState<string | null>(null);

  const selectedPathwayData: VisaPathway | null = useMemo(
    () => countryData.pathways.find((p) => p.id === selectedPathway) ?? null,
    [selectedPathway, countryData]
  );

  // Filtered risk factors by pathway
  const filteredRiskFactors = useMemo(() => {
    if (!selectedPathway) return countryData.riskFactors;
    return countryData.riskFactors.filter(
      (f) => !f.pathwayIds || f.pathwayIds.length === 0 || f.pathwayIds.includes(selectedPathway)
    );
  }, [countryData.riskFactors, selectedPathway]);

  const totalFactors = filteredRiskFactors.length;
  const answeredCount = factorResults.size;

  function setAnswer(factorId: string, answer: "yes" | "no" | "partial") {
    setFactorResults((prev) => {
      const next = new Map(prev);
      next.set(factorId, answer);
      return next;
    });
  }

  const results: FactorResult[] = filteredRiskFactors.map((factor) => {
    const answer = factorResults.get(factor.id) ?? null;
    let impact: "positive" | "neutral" | "negative" | "critical" = "neutral";
    let score = 100;
    if (answer === "yes") {
      if (factor.weight >= 30) { impact = "critical"; score = 0; }
      else if (factor.weight >= 20) { impact = "negative"; score = 100 - factor.weight * 2; }
      else { impact = "negative"; score = 100 - factor.weight; }
    } else if (answer === "partial") {
      impact = "neutral"; score = 100 - factor.weight / 2;
    } else if (answer === "no") {
      impact = "positive"; score = 100;
    }
    return { factor, answer, impact, score };
  });

  const answeredResults = results.filter((r) => r.answer !== null);
  const overallScore = answeredResults.length > 0
    ? Math.round(answeredResults.reduce((sum, r) => sum + r.score, 0) / answeredResults.length)
    : 100;
  const riskLevel = computeRiskLevel(overallScore);
  const config = riskLevelConfig[riskLevel];
  const criticalIssues = results.filter((r) => r.impact === "critical");
  const negativeIssues = results.filter((r) => r.impact === "negative");

  function reset() {
    setFactorResults(new Map());
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Hero header */}
      <div className="hero-gradient text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5 text-sm text-zinc-600 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${countryCode}`} className="hover:text-white transition-colors">{countryData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Risk Audit</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-400/30 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-violet-300" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Pre-Lodgement Risk Audit</h1>
              <p className="text-zinc-400 text-sm">{countryData.name} — Identify risks before you submit</p>
            </div>
          </div>

          {/* Pathway selector */}
          <div className="mt-6 bg-white/10 border border-white/15 rounded-xl p-4 backdrop-blur-sm">
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">Auditing for visa pathway</label>
            <select
              className="w-full px-3 py-2.5 rounded-xl border border-white/[0.15] bg-white/[0.07] text-white text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
              value={selectedPathway}
              onChange={(e) => setSelectedPathway(e.target.value)}
            >
              <option value="" className="bg-zinc-900">General — all pathways</option>
              {countryData.pathways.map((p) => (
                <option key={p.id} value={p.id} className="bg-zinc-900">
                  {p.subclass ? `Subclass ${p.subclass} — ` : ""}{p.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main content — two-column grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Left column — questions */}
          <div className="lg:col-span-2 space-y-4">
            {/* Intro */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
              <Info className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-300/90">
                For each risk factor below, indicate whether it applies to your situation. Be honest — this is for your benefit. All responses stay in your browser only.
              </p>
            </div>

            {/* Risk factors */}
            {filteredRiskFactors.map((factor, index) => {
              const answer = factorResults.get(factor.id);
              const weightLabel = factor.weight >= 30 ? "Critical weight" : factor.weight >= 20 ? "High weight" : "Moderate weight";
              const weightColor = factor.weight >= 30 ? "text-red-400 bg-red-500/10" : factor.weight >= 20 ? "text-orange-400 bg-orange-500/10" : "text-amber-400 bg-amber-500/10";
              const isExpanded = expandedFactor === factor.id;

              return (
                <div
                  key={factor.id}
                  className="glass rounded-2xl border border-white/[0.08] overflow-hidden transition-all hover:border-white/[0.12]"
                >
                  <button
                    onClick={() => setExpandedFactor(isExpanded ? null : factor.id)}
                    className="w-full p-5 flex items-start gap-3 text-left"
                  >
                    <div className="w-6 h-6 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-zinc-500">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-sm font-bold text-white">{factor.label}</h3>
                        <span className={cn("text-xs font-semibold px-2 py-0.5 rounded-full", weightColor)}>
                          {weightLabel}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-500 leading-relaxed">{factor.description}</p>
                    </div>
                    <div className="flex-shrink-0 ml-2">
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-600 hover:text-zinc-300 transition-colors" /> : <ChevronDown className="w-4 h-4 text-zinc-600 hover:text-zinc-300 transition-colors" />}
                    </div>
                  </button>

                  <div className="px-5 pb-5 -mt-2">
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { value: "yes", label: "Yes, applies to me", selectedColor: "border-red-500/40 bg-red-500/15 text-red-300" },
                        { value: "partial", label: "Partially / unsure", selectedColor: "border-amber-500/40 bg-amber-500/15 text-amber-300" },
                        { value: "no", label: "No, does not apply", selectedColor: "border-emerald-500/40 bg-emerald-500/15 text-emerald-300" },
                      ] as const).map((opt) => (
                        <button
                          key={opt.value}
                          onClick={() => setAnswer(factor.id, opt.value)}
                          className={cn(
                            "px-3 py-2.5 rounded-lg border text-xs font-semibold transition-all",
                            answer === opt.value
                              ? opt.selectedColor
                              : "border border-white/[0.10] bg-white/[0.03] text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                          )}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>

                    {(answer === "yes" || isExpanded) && (
                      <div className="mt-3 p-3 bg-white/[0.04] rounded-lg border border-white/[0.08]">
                        <p className="text-xs font-semibold text-zinc-400 mb-1">Recommended mitigation:</p>
                        <p className="text-xs text-zinc-500 leading-relaxed">{factor.mitigation}</p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Positive factors section */}
            {results.filter((r) => r.impact === "positive").length > 0 && (
              <div className="bg-emerald-500/[0.07] border border-emerald-500/15 rounded-xl p-5">
                <h3 className="text-sm font-bold text-emerald-400 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  Positive Profile Factors
                </h3>
                <div className="grid sm:grid-cols-2 gap-2">
                  {results
                    .filter((r) => r.impact === "positive")
                    .map((r) => (
                      <div key={r.factor.id} className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                        <span className="text-xs text-emerald-300/80">{r.factor.label}</span>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Full breakdown table */}
            {answeredCount > 0 && (
              <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.07]">
                  <h3 className="text-sm font-bold text-white">Full Risk Factor Breakdown</h3>
                </div>
                <div className="divide-y divide-white/[0.06]">
                  {results.map((r) => {
                    const impactIcons = {
                      positive: <TrendingUp className="w-4 h-4 text-emerald-400" />,
                      neutral: <Minus className="w-4 h-4 text-zinc-600" />,
                      negative: <TrendingDown className="w-4 h-4 text-orange-400" />,
                      critical: <XCircle className="w-4 h-4 text-red-400" />,
                    };
                    return (
                      <div key={r.factor.id} className="px-5 py-3.5 flex items-center gap-3">
                        {impactIcons[r.impact]}
                        <span className="text-sm text-zinc-400 flex-1">{r.factor.label}</span>
                        <span className={cn(
                          "text-xs font-semibold px-2 py-0.5 rounded-full",
                          r.answer === "yes" ? "bg-red-500/15 text-red-400" :
                          r.answer === "partial" ? "bg-amber-500/15 text-amber-400" :
                          r.answer === "no" ? "bg-emerald-500/15 text-emerald-400" :
                          "bg-white/[0.06] text-zinc-500"
                        )}>
                          {r.answer === "yes" ? "Applies" : r.answer === "partial" ? "Partial" : r.answer === "no" ? "Clear" : "Not assessed"}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right column — live score panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 space-y-4">
              {/* Score gauge */}
              <div className={cn("glass rounded-2xl border p-5", config.bg, config.border)}>
                <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-4">Live risk score</h3>
                <div className="flex items-center gap-4">
                  <div className="relative w-20 h-20 flex-shrink-0">
                    <svg className="w-20 h-20 -rotate-90" viewBox="0 0 36 36">
                      <circle cx="18" cy="18" r="16" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="3" />
                      <circle
                        cx="18" cy="18" r="16" fill="none"
                        stroke={overallScore >= 75 ? "#34d399" : overallScore >= 50 ? "#fbbf24" : overallScore >= 30 ? "#fb923c" : "#f87171"}
                        strokeWidth="3" strokeLinecap="round"
                        strokeDasharray={`${(overallScore / 100) * 100.5} 100.5`}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-white">{answeredCount > 0 ? overallScore : "—"}</span>
                    </div>
                  </div>
                  <div>
                    <span className={cn("text-sm font-bold", config.color)}>{config.label}</span>
                    <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                      {answeredCount === 0 ? "Answer questions to see your score" : config.description}
                    </p>
                  </div>
                </div>

                {/* Progress */}
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-zinc-500 mb-1">
                    <span>{answeredCount} of {totalFactors} assessed</span>
                    <span>{Math.round((answeredCount / totalFactors) * 100)}%</span>
                  </div>
                  <div className="h-1.5 bg-white/[0.08] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-zinc-400 to-zinc-200 rounded-full transition-all"
                      style={{ width: `${(answeredCount / totalFactors) * 100}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Issues summary */}
              {(criticalIssues.length > 0 || negativeIssues.length > 0) && (
                <div className="glass rounded-2xl border border-white/[0.08] p-4 space-y-2">
                  <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Issues found</h4>
                  {criticalIssues.length > 0 && (
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
                      <span className="text-xs text-red-400 font-semibold">
                        {criticalIssues.length} critical issue{criticalIssues.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                  {negativeIssues.length > 0 && (
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                      <span className="text-xs text-amber-400 font-semibold">
                        {negativeIssues.length} risk factor{negativeIssues.length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                  {results.filter((r) => r.impact === "positive").length > 0 && (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      <span className="text-xs text-emerald-400 font-semibold">
                        {results.filter((r) => r.impact === "positive").length} positive factor{results.filter((r) => r.impact === "positive").length > 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Pathway-specific risk areas */}
              {selectedPathwayData && selectedPathwayData.cons.length > 0 && (
                <div className="glass rounded-2xl border border-white/[0.08] p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
                    <h4 className="text-xs font-bold text-zinc-400">Known {selectedPathwayData.name} challenges</h4>
                  </div>
                  <ul className="space-y-1.5">
                    {selectedPathwayData.cons.slice(0, 4).map((con, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-zinc-600 mt-1.5 flex-shrink-0" />
                        <span className="text-xs text-zinc-500 leading-relaxed">{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTAs */}
              {answeredCount > 0 && (
                <div className="space-y-2">
                  <Link
                    href={selectedPathway ? `/${countryCode}/planner?pathway=${selectedPathway}` : `/${countryCode}/planner`}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm font-semibold text-black bg-white rounded-xl hover:bg-zinc-100 transition-all"
                  >
                    <ListChecks className="w-4 h-4" /> Application checklist
                  </Link>
                  <button
                    onClick={reset}
                    className="flex items-center gap-2 w-full px-4 py-3 text-sm font-medium border border-white/[0.12] text-zinc-400 rounded-xl hover:border-white/25 hover:text-white transition-all"
                  >
                    <RefreshCw className="w-4 h-4" /> Reset audit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
