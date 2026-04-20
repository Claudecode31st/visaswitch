"use client";
import { useEffect } from "react";
import { X, Printer, CheckCircle, Circle, Clock, DollarSign, CalendarDays, Shield, FileCheck, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { VisaPathway, ChecklistItem } from "@/types";

interface Props {
  pathway: VisaPathway | null;
  countryName: string;
  countryCode: string;
  checklist: ChecklistItem[];         // filtered checklist for this pathway
  completed: Set<string>;
  lodgementDate: string;              // ISO date string or ""
  totalEstimate: number;              // numeric total in AUD
  applicationFee: string | null;
  onClose: () => void;
}

function addWeeks(date: Date, weeks: number): Date {
  const d = new Date(date);
  d.setDate(d.getDate() + weeks * 7);
  return d;
}

function fmt(date: Date): string {
  return date.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
}

const categoryConfig: Record<string, { label: string }> = {
  document:  { label: "Documents" },
  financial: { label: "Financial" },
  health:    { label: "Health" },
  form:      { label: "Forms & Applications" },
  other:     { label: "Other" },
};

export function ReportModal({
  pathway, countryName, countryCode, checklist, completed,
  lodgementDate, totalEstimate, applicationFee, onClose,
}: Props) {
  // Close on Escape
  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Lock scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Suppress unused variable warning — countryCode is part of the public API
  void countryCode;

  const targetDate = lodgementDate ? new Date(lodgementDate) : null;
  const generatedAt = new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });

  // Group checklist by category
  const byCategory = Object.entries(categoryConfig).map(([key, cfg]) => ({
    key,
    label: cfg.label,
    items: checklist.filter(i => i.category === key),
  })).filter(g => g.items.length > 0);

  const completedCount = checklist.filter(i => completed.has(i.id)).length;
  const progress = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;

  // Cost items
  const costItems = checklist.filter(i => i.estimatedCost && i.estimatedCostNumeric);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm no-print">
      {/* Top bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-black no-print">
        <div>
          <h2 className="text-sm font-bold text-white">Visa Application Report</h2>
          <p className="text-xs text-zinc-500">{countryName}{pathway ? ` — ${pathway.name}` : ""} · Generated {generatedAt}</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 py-2 bg-white text-black text-xs font-bold rounded-xl hover:bg-zinc-100 transition-all"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save PDF
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg border border-white/[0.10] text-zinc-500 hover:text-white hover:border-white/20 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable report body */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-6 py-8 space-y-6">

          {/* Header */}
          <div className="glass rounded-2xl border border-white/[0.10] p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold text-zinc-600 uppercase tracking-widest mb-1">Visa Application Report</p>
                <h1 className="text-xl font-bold text-white mb-1">
                  {pathway ? pathway.name : `${countryName} Visa Plan`}
                </h1>
                {pathway?.subclass && (
                  <p className="text-sm text-zinc-500 mb-2">Subclass {pathway.subclass} · {countryName}</p>
                )}
                {pathway && (
                  <div className="flex flex-wrap gap-3 mt-3">
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
                      <Clock className="w-3 h-3" /> {pathway.processingTime}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
                      <CalendarDays className="w-3 h-3" /> {pathway.validity}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-zinc-400 bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
                      <DollarSign className="w-3 h-3" /> {pathway.cost}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-shrink-0 text-right">
                <p className="text-xs text-zinc-600">Generated</p>
                <p className="text-xs font-semibold text-zinc-400">{generatedAt}</p>
                {targetDate && (
                  <>
                    <p className="text-xs text-zinc-600 mt-2">Target lodgement</p>
                    <p className="text-xs font-semibold text-zinc-400">{fmt(targetDate)}</p>
                  </>
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-5 pt-5 border-t border-white/[0.07]">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-500">{completedCount} of {checklist.length} tasks completed</span>
                <span className="font-bold text-white">{progress}%</span>
              </div>
              <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-zinc-400 to-zinc-200 rounded-full"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Pathway summary */}
          {pathway && (
            <div className="glass rounded-2xl border border-white/[0.08] p-5 print-avoid-break">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-4 h-4 text-zinc-500" />
                <h2 className="text-sm font-bold text-white">Pathway overview</h2>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed mb-4">{pathway.summary}</p>
              {pathway.eligibility.length > 0 && (
                <div>
                  <p className="text-xs font-bold text-zinc-400 mb-2">Key eligibility requirements</p>
                  <div className="space-y-1.5">
                    {pathway.eligibility.map(req => (
                      <div key={req.id} className="flex items-start gap-2">
                        <div className={cn("w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0", req.required ? "bg-red-400" : "bg-zinc-600")} />
                        <span className="text-xs text-zinc-500 leading-relaxed">
                          <span className="font-semibold text-zinc-300">{req.label}</span> — {req.description}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Cost breakdown */}
          {(applicationFee || costItems.length > 0) && (
            <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden print-avoid-break">
              <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-2">
                <DollarSign className="w-4 h-4 text-emerald-400" />
                <h2 className="text-sm font-bold text-white">Estimated Total Investment</h2>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {applicationFee && (
                  <div className="px-5 py-3 flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-300">Application fee (VAC)</span>
                    <span className="text-xs font-bold text-white">{applicationFee}</span>
                  </div>
                )}
                {costItems.map(item => (
                  <div key={item.id} className="px-5 py-3 flex items-center justify-between">
                    <span className="text-xs text-zinc-500 flex-1 mr-4">{item.title}</span>
                    <span className="text-xs font-semibold text-zinc-400 flex-shrink-0">{item.estimatedCost}</span>
                  </div>
                ))}
              </div>
              {totalEstimate > 0 && (
                <div className="px-5 py-3.5 bg-white/[0.03] border-t border-white/[0.07] flex items-center justify-between">
                  <span className="text-xs font-bold text-white">Estimated total</span>
                  <div className="text-right">
                    <span className="text-sm font-bold text-white">AUD {totalEstimate.toLocaleString()}</span>
                    <span className="block text-xs text-zinc-600">+ ongoing living costs</span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Checklist by category */}
          {byCategory.map(({ key, label, items }) => (
            <div key={key} className="glass rounded-2xl border border-white/[0.08] overflow-hidden print-avoid-break">
              <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-zinc-600" />
                  <h2 className="text-sm font-bold text-white">{label}</h2>
                </div>
                <span className="text-xs text-zinc-600">
                  {items.filter(i => completed.has(i.id)).length}/{items.length}
                </span>
              </div>
              <div className="divide-y divide-white/[0.05]">
                {items.map(item => {
                  const isDone = completed.has(item.id);
                  const dueDate = targetDate ? addWeeks(targetDate, item.dueWeeks) : null;
                  return (
                    <div key={item.id} className={cn("px-5 py-3.5 flex items-start gap-3", isDone && "opacity-50")}>
                      {isDone
                        ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        : <Circle className="w-4 h-4 text-zinc-700 flex-shrink-0 mt-0.5" />}
                      <div className="flex-1 min-w-0">
                        <p className={cn("text-xs font-semibold mb-0.5", isDone ? "line-through text-zinc-600" : "text-white")}>
                          {item.title}
                        </p>
                        <p className="text-xs text-zinc-600 leading-relaxed">{item.description}</p>
                      </div>
                      <div className="flex-shrink-0 flex flex-col items-end gap-1 ml-3">
                        {item.estimatedCost && (
                          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                            {item.estimatedCost}
                          </span>
                        )}
                        {dueDate && (
                          <span className="text-xs text-zinc-600 whitespace-nowrap">{fmt(dueDate)}</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Disclaimer */}
          <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3 print-avoid-break">
            <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-amber-300/80 leading-relaxed">
              This report is generated from VisaSwitch and is indicative only. Requirements, fees, and processing times change regularly. Always verify current information with the official immigration authority before lodging.
            </p>
          </div>

          <p className="text-center text-xs text-zinc-700 pb-4">
            Generated by VisaSwitch · visaswitch.com · {generatedAt}
          </p>
        </div>
      </div>
    </div>
  );
}
