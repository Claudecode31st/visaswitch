"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  Globe,
  ChevronRight,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  DollarSign,
  Calendar,
  ArrowRight,
  BarChart3,
  ListChecks,
  RefreshCw,
  Star,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Shield,
  FileCheck,
  TrendingUp,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { CountryData, VisaPathway, VisaCurrentOption, VisaGoalOption } from "@/types";

interface Props {
  countryData: CountryData;
  countryCode: string;
}

function getDifficultyConfig(difficulty: VisaPathway["difficulty"]) {
  return {
    straightforward: { label: "Straightforward", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
    moderate: { label: "Moderate", color: "text-amber-700 bg-amber-50 border-amber-200" },
    complex: { label: "Complex", color: "text-red-700 bg-red-50 border-red-200" },
  }[difficulty];
}

function getDifficultyStars(difficulty: VisaPathway["difficulty"]) {
  return { straightforward: 1, moderate: 2, complex: 3 }[difficulty];
}

function PathwayCard({
  pathway,
  isBestMatch,
  expanded,
  onToggle,
  countryCode,
}: {
  pathway: VisaPathway;
  isBestMatch: boolean;
  expanded: boolean;
  onToggle: () => void;
  countryCode: string;
}) {
  const difficulty = getDifficultyConfig(pathway.difficulty);
  const stars = getDifficultyStars(pathway.difficulty);

  return (
    <div
      className={cn(
        "bg-white rounded-2xl border shadow-sm overflow-hidden transition-shadow hover:shadow-md",
        isBestMatch ? "border-blue-300 ring-1 ring-blue-200" : "border-slate-200"
      )}
    >
      <div className="p-5">
        {/* Top row */}
        <div className="flex items-start gap-3 mb-3">
          <div
            className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0",
              pathway.iconBg
            )}
          >
            <Globe className={cn("w-5 h-5", pathway.iconColor)} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-1.5 mb-1">
              {isBestMatch && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">
                  <Star className="w-3 h-3 fill-blue-600" /> Best match
                </span>
              )}
              {pathway.subclass && (
                <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                  Subclass {pathway.subclass}
                </span>
              )}
              <span
                className={cn(
                  "text-xs font-medium px-2 py-0.5 rounded-full border",
                  difficulty.color
                )}
              >
                {difficulty.label}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900">{pathway.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{pathway.tagline}</p>
          </div>
          {/* Complexity stars: 1=straightforward, 2=moderate, 3=complex */}
          <div className="flex gap-0.5 flex-shrink-0 mt-1" title={`Complexity: ${pathway.difficulty}`}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Star
                key={i}
                className={cn("w-3 h-3", i < stars ? "fill-rose-400 text-rose-400" : "text-slate-200")}
              />
            ))}
          </div>
        </div>

        {/* Stat pills */}
        <div className="grid grid-cols-3 gap-2 mb-4">
          {[
            { icon: Clock, label: pathway.processingTime },
            { icon: Calendar, label: pathway.validity },
            { icon: DollarSign, label: pathway.cost },
          ].map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-slate-50 rounded-lg px-2.5 py-2 flex items-center gap-1.5 min-w-0">
                <Icon className="w-3 h-3 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-600 truncate">{stat.label}</span>
              </div>
            );
          })}
        </div>

        {/* Urgent note */}
        {pathway.urgentNote && (
          <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">{pathway.urgentNote}</p>
          </div>
        )}

        {/* Expandable section */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors mt-1"
        >
          <span>{expanded ? "Hide details" : "View details, pros & cons"}</span>
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Expandable content */}
      {expanded && (
        <div className="px-5 pb-5 space-y-4 border-t border-slate-100 pt-4">
          {/* Summary */}
          <p className="text-xs text-slate-600 leading-relaxed">{pathway.summary}</p>

          {/* Pros / Cons grid */}
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="bg-emerald-50 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-emerald-800 mb-2 flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5" /> Pros
              </h4>
              <ul className="space-y-1.5">
                {pathway.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-emerald-800 leading-relaxed">{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-red-50 rounded-xl p-3.5">
              <h4 className="text-xs font-bold text-red-800 mb-2 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5" /> Cons
              </h4>
              <ul className="space-y-1.5">
                {pathway.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <div className="w-1 h-1 rounded-full bg-red-400 mt-1.5 flex-shrink-0" />
                    <span className="text-xs text-red-800 leading-relaxed">{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Next steps */}
          {pathway.nextSteps && pathway.nextSteps.length > 0 && (
            <div>
              <h4 className="text-xs font-bold text-slate-700 mb-2">Next steps</h4>
              <ol className="space-y-1.5">
                {pathway.nextSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-xs text-slate-700 leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {/* Leads to */}
          {pathway.pathwayTo.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500">Leads to:</span>
              {pathway.pathwayTo.map((p) => (
                <span
                  key={p}
                  className="text-xs bg-indigo-50 text-indigo-700 border border-indigo-100 px-2.5 py-1 rounded-full font-medium"
                >
                  {p}
                </span>
              ))}
            </div>
          )}

          {/* Related occupations */}
          {pathway.relatedOccupations && pathway.relatedOccupations.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500">Common for:</span>
              {pathway.relatedOccupations.map((occ) => (
                <span
                  key={occ}
                  className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full"
                >
                  {occ}
                </span>
              ))}
            </div>
          )}

          {/* CTA buttons */}
          <div className="flex gap-2.5 pt-1">
            <Link
              href={`/${countryCode}/planner`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-2.5 rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all"
            >
              <ListChecks className="w-3.5 h-3.5" /> Plan this visa
            </Link>
            <Link
              href={`/${countryCode}/audit`}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 bg-slate-100 px-4 py-2.5 rounded-lg hover:bg-slate-200 transition-all"
            >
              <BarChart3 className="w-3.5 h-3.5" /> Risk audit
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export function PathwaysChecker({ countryData, countryCode }: Props) {
  const [currentVisa, setCurrentVisa] = useState<string>("");
  const [goal, setGoal] = useState<string>("all");
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  function toggleExpanded(id: string) {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  // Determine ranked pathway IDs from the relevance matrix
  const rankedPathwayIds = useMemo<string[]>(() => {
    if (!currentVisa) return [];
    const matrix = countryData.pathwayRelevance;
    const byVisa = matrix[currentVisa];
    if (!byVisa) return [];
    return byVisa[goal] ?? byVisa["all"] ?? [];
  }, [currentVisa, goal, countryData]);

  const difficultyOrder = { straightforward: 0, moderate: 1, complex: 2 } as const;

  // Build sorted pathway list
  const displayedPathways = useMemo<VisaPathway[]>(() => {
    if (!currentVisa) {
      return [...countryData.pathways].sort(
        (a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]
      );
    }

    const byId = new Map(countryData.pathways.map((p) => [p.id, p]));
    const ranked: VisaPathway[] = [];

    for (const id of rankedPathwayIds) {
      const p = byId.get(id);
      if (p) ranked.push(p);
    }

    const extras: VisaPathway[] = [];
    for (const p of countryData.pathways) {
      if (rankedPathwayIds.includes(p.id)) continue;
      const visaMatch = p.fromVisas.includes(currentVisa) || p.fromVisas.length === 0;
      const goalMatch = goal === "all" || p.forGoals.includes(goal as VisaPathway["forGoals"][number]);
      if (visaMatch && goalMatch) extras.push(p);
    }
    extras.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);

    return [...ranked, ...extras];
  }, [currentVisa, goal, rankedPathwayIds, countryData]);

  const relatedTools = [
    {
      icon: ListChecks,
      title: "Checklist & Timeline",
      description: "Once you've picked a pathway, generate a personalised step-by-step plan with document checklists and key deadlines for your specific situation.",
      outcomes: ["Full document checklist", "Milestone timeline with deadlines"],
      href: `/${countryCode}/planner`,
      iconColor: "bg-indigo-50 text-indigo-600",
      ctaColor: "text-indigo-600 hover:text-indigo-700",
    },
    {
      icon: BarChart3,
      title: "Pre-lodgement Risk Audit",
      description: "Stress-test your application before you submit. We score your profile across all key criteria and surface the specific weak points holding you back.",
      outcomes: ["Risk score across key criteria", "Prioritised list of improvements"],
      href: `/${countryCode}/audit`,
      iconColor: "bg-violet-50 text-violet-600",
      ctaColor: "text-violet-600 hover:text-violet-700",
    },
    {
      icon: RefreshCw,
      title: "Refusal Recovery",
      description: "Received a refusal? We'll help you understand exactly why it happened and build the strongest possible case for your reapplication or appeal.",
      outcomes: ["Root cause analysis", "Reapplication strategy & evidence plan"],
      href: `/${countryCode}/recovery`,
      iconColor: "bg-rose-50 text-rose-600",
      ctaColor: "text-rose-600 hover:text-rose-700",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero */}
      <div className="hero-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center gap-1.5 text-sm text-slate-400 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/${countryCode}`} className="hover:text-white transition-colors capitalize">{countryData.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Pathway Checker</span>
          </div>

          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center">
                <Globe className="w-5 h-5 text-blue-300" />
              </div>
              <h1 className="text-2xl font-bold text-white">Visa Pathway Checker</h1>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              Select your current visa status and your goal — we'll surface the most relevant {countryData.name} pathways instantly.
            </p>
          </div>

          {/* Filter panel */}
          <div className="mt-8 bg-white/10 border border-white/15 rounded-2xl p-5 backdrop-blur-sm">
            <div className="grid sm:grid-cols-2 gap-6">
              {/* Current visa */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  I currently have
                </label>
                <div className="flex flex-col gap-2">
                  {countryData.currentVisaOptions.map((opt: VisaCurrentOption) => (
                    <button
                      key={opt.value}
                      onClick={() => setCurrentVisa(opt.value)}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left transition-all",
                        currentVisa === opt.value
                          ? "bg-white text-slate-900 border-white shadow-sm"
                          : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full flex-shrink-0 transition-all",
                        currentVisa === opt.value ? "bg-blue-500" : "bg-white/20"
                      )} />
                      <div className="min-w-0">
                        <div className={cn("text-sm font-semibold truncate", currentVisa === opt.value ? "text-slate-900" : "text-white")}>
                          {opt.label}
                        </div>
                        <div className={cn("text-xs truncate", currentVisa === opt.value ? "text-slate-500" : "text-slate-400")}>
                          {opt.sublabel}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
                  My goal
                </label>
                <div className="flex flex-col gap-2">
                  {countryData.goalOptions.map((opt: VisaGoalOption) => (
                    <button
                      key={opt.value}
                      onClick={() => setGoal(opt.value)}
                      className={cn(
                        "flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left transition-all",
                        goal === opt.value
                          ? "bg-white text-slate-900 border-white shadow-sm"
                          : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:border-white/20"
                      )}
                    >
                      <div className={cn(
                        "w-2 h-2 rounded-full flex-shrink-0 transition-all",
                        goal === opt.value ? "bg-indigo-500" : "bg-white/20"
                      )} />
                      <div className="min-w-0">
                        <div className={cn("text-sm font-semibold truncate", goal === opt.value ? "text-slate-900" : "text-white")}>
                          {opt.label}
                        </div>
                        <div className={cn("text-xs truncate", goal === opt.value ? "text-slate-500" : "text-slate-400")}>
                          {opt.sublabel}
                        </div>
                      </div>
                    </button>
                  ))}
                  <button
                    onClick={() => setGoal("all")}
                    className={cn(
                      "flex items-center gap-3 px-3.5 py-2.5 rounded-xl border text-left transition-all",
                      goal === "all"
                        ? "bg-white text-slate-900 border-white shadow-sm"
                        : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10 hover:border-white/20"
                    )}
                  >
                    <div className={cn(
                      "w-2 h-2 rounded-full flex-shrink-0 transition-all",
                      goal === "all" ? "bg-indigo-500" : "bg-white/20"
                    )} />
                    <div className="min-w-0">
                      <div className={cn("text-sm font-semibold", goal === "all" ? "text-slate-900" : "text-white")}>
                        Show all options
                      </div>
                      <div className={cn("text-xs", goal === "all" ? "text-slate-500" : "text-slate-400")}>
                        All pathways for my visa status
                      </div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {currentVisa && (
              <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between">
                <p className="text-sm text-slate-300">
                  Showing <span className="font-bold text-white">{displayedPathways.length}</span> pathways — ranked by relevance
                </p>
                <button
                  onClick={() => { setCurrentVisa(""); setGoal("all"); }}
                  className="text-xs text-slate-400 hover:text-slate-200 transition-colors underline"
                >
                  Clear filter
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* Pathway results — 2/3 width */}
          <div className="lg:col-span-2">
            {!currentVisa && (
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-lg font-bold text-slate-900">
                  All {countryData.name} pathways
                </h2>
                <span className="text-sm text-slate-500">{displayedPathways.length} pathways</span>
              </div>
            )}

            {currentVisa && displayedPathways.length === 0 && (
              <div className="bg-white rounded-2xl border border-slate-200 p-8 text-center">
                <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-6 h-6 text-slate-400" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-1">No direct pathways found</h3>
                <p className="text-xs text-slate-500 mb-4">
                  Try selecting &quot;Show all options&quot; or a different goal to see more pathways.
                </p>
                <button
                  onClick={() => setGoal("all")}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  Show all pathways
                </button>
              </div>
            )}

            <div className="space-y-4">
              {displayedPathways.map((pathway, index) => (
                <PathwayCard
                  key={pathway.id}
                  pathway={pathway}
                  isBestMatch={index === 0 && !!currentVisa && rankedPathwayIds.includes(pathway.id)}
                  expanded={expandedIds.has(pathway.id)}
                  onToggle={() => toggleExpanded(pathway.id)}
                  countryCode={countryCode}
                />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-5">

            {/* What to do next — contextual prompt */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="w-4 h-4 text-blue-200" />
                <span className="text-xs font-bold text-blue-200 uppercase tracking-wider">Your next step</span>
              </div>
              <p className="text-sm font-semibold text-white mb-1">
                {currentVisa
                  ? `${displayedPathways.length} pathway${displayedPathways.length !== 1 ? "s" : ""} matched`
                  : "Start by filtering above"}
              </p>
              <p className="text-xs text-blue-100 leading-relaxed">
                {currentVisa
                  ? "Expand any pathway for full pros, cons, next steps and an application plan."
                  : "Select your current visa and your goal to see personalised, ranked results."}
              </p>
            </div>

            {/* Related tools — expanded cards */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5">
              <h3 className="text-sm font-bold text-slate-900 mb-1">Continue your journey</h3>
              <p className="text-xs text-slate-500 mb-4">Use these tools after you've chosen a pathway.</p>
              <div className="space-y-4">
                {relatedTools.map((tool) => {
                  const Icon = tool.icon;
                  return (
                    <div key={tool.title} className="group">
                      <div className="flex items-start gap-3 mb-2">
                        <div className={cn("w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5", tool.iconColor)}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 mb-1">{tool.title}</h4>
                          <p className="text-xs text-slate-500 leading-relaxed">{tool.description}</p>
                        </div>
                      </div>
                      <div className="ml-11 space-y-1 mb-2.5">
                        {tool.outcomes.map((o) => (
                          <div key={o} className="flex items-center gap-1.5">
                            <FileCheck className="w-3 h-3 text-slate-300 flex-shrink-0" />
                            <span className="text-xs text-slate-500">{o}</span>
                          </div>
                        ))}
                      </div>
                      <div className="ml-11">
                        <Link
                          href={tool.href}
                          className={cn("inline-flex items-center gap-1 text-xs font-semibold transition-colors", tool.ctaColor)}
                        >
                          Open tool <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                      {tool !== relatedTools[relatedTools.length - 1] && (
                        <div className="border-t border-slate-100 mt-4" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Official resources */}
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-bold text-slate-900">Official source</h3>
              </div>
              <a
                href={countryData.visaBodyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between gap-2 bg-white rounded-xl border border-slate-200 px-3.5 py-3 hover:border-blue-200 hover:bg-blue-50 transition-all group"
              >
                <div>
                  <div className="text-xs font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                    {countryData.visaBodyName}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">Official government portal</div>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-500 flex-shrink-0 transition-colors" />
              </a>
              <p className="text-xs text-slate-500 mt-3 leading-relaxed">
                Immigration rules change frequently. Always verify current requirements directly with the official authority before lodging your application.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="text-xs text-slate-400 leading-relaxed px-1">
              VisaSwitch provides structured information only. It does not constitute legal or immigration advice. For complex cases, consult a registered migration agent or immigration lawyer.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
