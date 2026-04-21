"use client";
import { useEffect } from "react";
import {
  X, Printer, CheckCircle, Circle, Clock, DollarSign, CalendarDays,
  Shield, FileCheck, AlertCircle, XCircle, AlertTriangle, BarChart3,
  ChevronRight, Info,
} from "lucide-react";
import { cn } from "@/lib/utils";
import type { VisaPathway, ChecklistItem, RiskFactor, RefusalReason } from "@/types";
import type { ApplicationOutcome } from "@/hooks/use-outcome";

interface Props {
  pathway: VisaPathway | null;
  countryName: string;
  countryCode: string;
  checklist: ChecklistItem[];
  completed: Set<string>;
  lodgementDate: string;
  totalEstimate: number;
  applicationFee: string | null;
  eligibilityChecks?: Record<string, boolean>;
  riskAnswers?: Record<string, "yes" | "no" | "partial">;
  riskFactors?: RiskFactor[];
  outcome?: ApplicationOutcome | null;
  appReferenceNumber?: string;
  refusalReasons?: string[];
  refusalReasonData?: RefusalReason[];
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

const outcomeLabels: Record<ApplicationOutcome, string> = {
  preparing: "Preparing — gathering documents",
  applied:   "Application lodged — under assessment",
  rfi:       "Further information requested",
  approved:  "Approved — visa granted",
  refused:   "Refused",
};

export function ReportModal({
  pathway, countryName, countryCode, checklist, completed,
  lodgementDate, totalEstimate, applicationFee,
  eligibilityChecks, riskAnswers, riskFactors,
  outcome, appReferenceNumber, refusalReasons, refusalReasonData,
  onClose,
}: Props) {
  void countryCode;

  useEffect(() => {
    function onKey(e: KeyboardEvent) { if (e.key === "Escape") onClose(); }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const targetDate = lodgementDate ? new Date(lodgementDate) : null;
  const generatedAt = new Date().toLocaleDateString("en-AU", {
    day: "numeric", month: "long", year: "numeric",
  });

  const byCategory = Object.entries(categoryConfig).map(([key, cfg]) => ({
    key, label: cfg.label,
    items: checklist.filter(i => i.category === key),
  })).filter(g => g.items.length > 0);

  const completedCount = checklist.filter(i => completed.has(i.id)).length;
  const progress = checklist.length > 0 ? Math.round((completedCount / checklist.length) * 100) : 0;
  const costItems = checklist.filter(i => i.estimatedCost && i.estimatedCostNumeric);

  const answeredFactors = riskFactors?.filter(f => riskAnswers?.[f.id] !== undefined) ?? [];
  const riskScore = (() => {
    if (!riskFactors || !riskAnswers || answeredFactors.length === 0) return null;
    let total = 0, weight = 0;
    for (const f of answeredFactors) {
      const ans = riskAnswers[f.id];
      if (!ans) continue;
      total += { yes: 0, partial: 50, no: 100 }[ans] * f.weight;
      weight += f.weight;
    }
    return weight > 0 ? Math.round(total / weight) : null;
  })();
  const riskLevel = riskScore !== null
    ? riskScore >= 75 ? "Low Risk" : riskScore >= 50 ? "Moderate Risk" : riskScore >= 30 ? "High Risk" : "Critical Risk"
    : null;

  const eligibilityWithStatus = pathway?.eligibility.map(req => ({
    ...req, met: eligibilityChecks ? (eligibilityChecks[req.id] ?? null) : null,
  })) ?? [];

  const selectedRefusalReasons = (refusalReasons ?? [])
    .map(id => refusalReasonData?.find(r => r.id === id))
    .filter(Boolean) as RefusalReason[];

  return (
    <>
      {/* ── Print-only clean white report ─────────────────────────────────────── */}
      {/* Hidden on screen; only rendered during window.print() */}
      <div id="vs-print-report" style={{ display: "none" }}>
        <style>{`
          @media print {
            /* Hide everything except the print report */
            body > *:not(#vs-print-portal) { display: none !important; }
            #vs-print-portal { display: block !important; }
            #vs-print-report { display: block !important; }

            /* Page setup */
            @page {
              size: A4;
              margin: 2cm 2cm 2.5cm 2cm;
            }

            /* Reset */
            * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }

            /* Base */
            #vs-print-report {
              font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
              font-size: 10pt;
              line-height: 1.5;
              color: #111;
              background: #fff;
              max-width: 100%;
            }

            /* Cover header */
            .pr-cover { border-bottom: 2px solid #111; padding-bottom: 16pt; margin-bottom: 20pt; }
            .pr-cover-eyebrow { font-size: 7pt; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #888; margin-bottom: 4pt; }
            .pr-cover-title { font-size: 22pt; font-weight: 800; color: #111; line-height: 1.2; margin-bottom: 6pt; }
            .pr-cover-sub { font-size: 10pt; color: #555; margin-bottom: 12pt; }
            .pr-cover-meta { display: flex; flex-wrap: wrap; gap: 20pt; }
            .pr-cover-meta-item { font-size: 9pt; }
            .pr-cover-meta-label { color: #888; }
            .pr-cover-meta-value { font-weight: 600; color: #111; }

            /* Progress bar */
            .pr-progress-wrap { margin: 14pt 0; }
            .pr-progress-label { display: flex; justify-content: space-between; font-size: 9pt; color: #555; margin-bottom: 4pt; }
            .pr-progress-track { height: 6pt; background: #e5e7eb; border-radius: 3pt; overflow: hidden; }
            .pr-progress-fill { height: 100%; background: #111; border-radius: 3pt; }

            /* Sections */
            .pr-section { margin-top: 22pt; page-break-inside: avoid; }
            .pr-section-header {
              display: flex; align-items: center; gap: 8pt;
              border-bottom: 1.5pt solid #111;
              padding-bottom: 6pt; margin-bottom: 12pt;
            }
            .pr-section-num {
              width: 18pt; height: 18pt; border-radius: 50%;
              background: #111; color: #fff;
              font-size: 8pt; font-weight: 800;
              display: flex; align-items: center; justify-content: center;
              flex-shrink: 0;
            }
            .pr-section-title { font-size: 12pt; font-weight: 800; color: #111; }
            .pr-section-badge {
              margin-left: auto; font-size: 8pt; font-weight: 700;
              padding: 2pt 7pt; border-radius: 20pt;
              border: 1pt solid #ccc; color: #555;
            }

            /* Summary text */
            .pr-summary { font-size: 9.5pt; color: #444; line-height: 1.6; margin-bottom: 12pt; }

            /* Two-column grid */
            .pr-two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; margin-top: 10pt; }

            /* List (pros / cons / solutions) */
            .pr-list { margin: 0; padding: 0; list-style: none; }
            .pr-list li { display: flex; gap: 6pt; align-items: flex-start; margin-bottom: 4pt; font-size: 9pt; color: #444; }
            .pr-list-dot { width: 5pt; height: 5pt; border-radius: 50%; margin-top: 4pt; flex-shrink: 0; }
            .pr-list-dot-green { background: #16a34a; }
            .pr-list-dot-red   { background: #dc2626; }
            .pr-list-dot-gray  { background: #6b7280; }

            /* Sub-section label */
            .pr-sub-label { font-size: 8pt; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #555; margin: 12pt 0 6pt; }

            /* Eligibility table */
            .pr-req-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
            .pr-req-table tr { border-bottom: 0.5pt solid #e5e7eb; }
            .pr-req-table td { padding: 5pt 4pt; vertical-align: top; }
            .pr-req-status { width: 16pt; text-align: center; font-weight: 700; }
            .pr-req-status-met    { color: #16a34a; }
            .pr-req-status-notmet { color: #dc2626; }
            .pr-req-status-unk    { color: #9ca3af; }
            .pr-req-name { font-weight: 600; color: #111; }
            .pr-req-desc { color: #666; font-size: 8.5pt; margin-top: 1pt; }
            .pr-req-badge {
              display: inline-block; font-size: 7pt; font-weight: 700;
              padding: 1pt 5pt; border-radius: 10pt;
              border: 0.5pt solid #fca5a5; color: #b91c1c;
              background: #fef2f2; margin-left: 4pt;
            }

            /* Risk factors */
            .pr-risk-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 10pt; }
            .pr-risk-score { font-size: 18pt; font-weight: 800; }
            .pr-risk-level { font-size: 9pt; font-weight: 700; color: #555; }
            .pr-risk-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
            .pr-risk-table tr { border-bottom: 0.5pt solid #e5e7eb; }
            .pr-risk-table td { padding: 6pt 4pt; vertical-align: top; }
            .pr-risk-answer { font-weight: 700; font-size: 8.5pt; white-space: nowrap; }
            .pr-risk-ans-yes     { color: #dc2626; }
            .pr-risk-ans-partial { color: #d97706; }
            .pr-risk-ans-no      { color: #16a34a; }
            .pr-risk-name { font-weight: 600; color: #111; }
            .pr-risk-desc { color: #666; font-size: 8.5pt; margin-top: 1pt; }
            .pr-risk-mitigation { color: #555; font-size: 8.5pt; margin-top: 3pt; font-style: italic; }

            /* Cost table */
            .pr-cost-table { width: 100%; border-collapse: collapse; font-size: 9.5pt; }
            .pr-cost-table tr { border-bottom: 0.5pt solid #e5e7eb; }
            .pr-cost-table td { padding: 5pt 4pt; }
            .pr-cost-table tr:last-child { border-bottom: 1.5pt solid #111; }
            .pr-cost-total { border-top: 1.5pt solid #111 !important; }
            .pr-cost-total td { padding-top: 8pt !important; font-weight: 800; font-size: 11pt; }
            .pr-cost-right { text-align: right; font-weight: 600; }

            /* Checklist */
            .pr-checklist-section { margin-top: 14pt; page-break-inside: avoid; }
            .pr-checklist-cat { font-size: 9pt; font-weight: 800; text-transform: uppercase; letter-spacing: 0.08em; color: #555; margin-bottom: 6pt; border-bottom: 0.5pt solid #e5e7eb; padding-bottom: 4pt; }
            .pr-checklist-table { width: 100%; border-collapse: collapse; font-size: 9pt; }
            .pr-checklist-table tr { border-bottom: 0.5pt solid #f3f4f6; }
            .pr-checklist-table td { padding: 5pt 4pt; vertical-align: top; }
            .pr-checklist-check { width: 14pt; text-align: center; }
            .pr-check-done { color: #16a34a; font-weight: 800; }
            .pr-check-open { color: #d1d5db; }
            .pr-checklist-title-done { text-decoration: line-through; color: #9ca3af; }
            .pr-checklist-desc { color: #666; font-size: 8.5pt; margin-top: 1pt; }
            .pr-checklist-link { color: #2563eb; font-size: 8pt; }
            .pr-checklist-meta { text-align: right; white-space: nowrap; font-size: 8pt; color: #6b7280; }
            .pr-badge-critical { font-size: 7pt; font-weight: 700; padding: 1pt 5pt; border-radius: 10pt; border: 0.5pt solid #fca5a5; color: #b91c1c; background: #fef2f2; }
            .pr-badge-cost { font-size: 8pt; font-weight: 600; color: #059669; }

            /* Status */
            .pr-status-box { border: 1.5pt solid #111; border-radius: 6pt; padding: 10pt 14pt; margin-bottom: 12pt; }
            .pr-status-label { font-size: 8pt; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: #888; margin-bottom: 3pt; }
            .pr-status-value { font-size: 13pt; font-weight: 800; color: #111; }
            .pr-refusal-item { margin-top: 10pt; padding: 8pt 10pt; border-left: 3pt solid #dc2626; background: #fef2f2; page-break-inside: avoid; }
            .pr-refusal-title { font-weight: 700; color: #111; font-size: 10pt; }
            .pr-refusal-desc { color: #555; font-size: 9pt; margin-top: 3pt; margin-bottom: 6pt; }
            .pr-approved-box { border: 1.5pt solid #16a34a; border-radius: 6pt; padding: 10pt 14pt; background: #f0fdf4; }
            .pr-approved-title { font-weight: 800; color: #15803d; font-size: 12pt; margin-bottom: 4pt; }
            .pr-approved-desc { color: #166534; font-size: 9pt; }

            /* Disclaimer */
            .pr-disclaimer { margin-top: 24pt; padding: 10pt 12pt; border: 1pt solid #fbbf24; border-radius: 6pt; background: #fffbeb; font-size: 8.5pt; color: #92400e; line-height: 1.5; page-break-inside: avoid; }
            .pr-footer { margin-top: 16pt; border-top: 0.5pt solid #e5e7eb; padding-top: 8pt; font-size: 8pt; color: #9ca3af; display: flex; justify-content: space-between; }
          }
        `}</style>

        {/* ── Cover ── */}
        <div className="pr-cover">
          <div className="pr-cover-eyebrow">VisaSwitch · Visa Application Report</div>
          <div className="pr-cover-title">
            {pathway ? pathway.name : `${countryName} Visa Guide`}
          </div>
          <div className="pr-cover-sub">
            {pathway?.subclass ? `Subclass ${pathway.subclass} · ` : ""}{countryName}
          </div>
          <div className="pr-cover-meta">
            <div className="pr-cover-meta-item">
              <div className="pr-cover-meta-label">Generated</div>
              <div className="pr-cover-meta-value">{generatedAt}</div>
            </div>
            {targetDate && (
              <div className="pr-cover-meta-item">
                <div className="pr-cover-meta-label">Target lodgement</div>
                <div className="pr-cover-meta-value">{fmt(targetDate)}</div>
              </div>
            )}
            {appReferenceNumber && (
              <div className="pr-cover-meta-item">
                <div className="pr-cover-meta-label">Application reference</div>
                <div className="pr-cover-meta-value">{appReferenceNumber}</div>
              </div>
            )}
            {pathway && (
              <>
                <div className="pr-cover-meta-item">
                  <div className="pr-cover-meta-label">Processing time</div>
                  <div className="pr-cover-meta-value">{pathway.processingTime}</div>
                </div>
                <div className="pr-cover-meta-item">
                  <div className="pr-cover-meta-label">Validity</div>
                  <div className="pr-cover-meta-value">{pathway.validity}</div>
                </div>
                <div className="pr-cover-meta-item">
                  <div className="pr-cover-meta-label">Application fee</div>
                  <div className="pr-cover-meta-value">{pathway.cost}</div>
                </div>
              </>
            )}
          </div>
          <div className="pr-progress-wrap">
            <div className="pr-progress-label">
              <span>Checklist progress — {completedCount} of {checklist.length} tasks completed</span>
              <span>{progress}%</span>
            </div>
            <div className="pr-progress-track">
              <div className="pr-progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        {/* ── Step 1: Pathway ── */}
        {pathway && (
          <div className="pr-section">
            <div className="pr-section-header">
              <div className="pr-section-num">1</div>
              <div className="pr-section-title">Find Pathway — {pathway.name}</div>
              <div className="pr-section-badge">{pathway.category}</div>
            </div>

            <div className="pr-summary">{pathway.summary}</div>

            {/* Eligibility */}
            {eligibilityWithStatus.length > 0 && (
              <>
                <div className="pr-sub-label">Eligibility requirements</div>
                <table className="pr-req-table">
                  <tbody>
                    {eligibilityWithStatus.map(req => (
                      <tr key={req.id}>
                        <td className="pr-req-status">
                          {req.met === true
                            ? <span className="pr-req-status-met">✓</span>
                            : req.met === false
                              ? <span className="pr-req-status-notmet">✗</span>
                              : <span className="pr-req-status-unk">–</span>}
                        </td>
                        <td>
                          <div className="pr-req-name">
                            {req.label}
                            {req.required && <span className="pr-req-badge">Required</span>}
                            {req.met === null && <span style={{ fontSize: "8pt", color: "#9ca3af", marginLeft: "4pt" }}>(not checked)</span>}
                          </div>
                          <div className="pr-req-desc">{req.description}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}

            {/* Pros & Cons */}
            {(pathway.pros.length > 0 || pathway.cons.length > 0) && (
              <div className="pr-two-col" style={{ marginTop: "12pt" }}>
                {pathway.pros.length > 0 && (
                  <div>
                    <div className="pr-sub-label" style={{ marginTop: 0 }}>Advantages</div>
                    <ul className="pr-list">
                      {pathway.pros.map((p, i) => (
                        <li key={i}><span className="pr-list-dot pr-list-dot-green" />{p}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {pathway.cons.length > 0 && (
                  <div>
                    <div className="pr-sub-label" style={{ marginTop: 0 }}>Limitations</div>
                    <ul className="pr-list">
                      {pathway.cons.map((c, i) => (
                        <li key={i}><span className="pr-list-dot pr-list-dot-red" />{c}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {/* Next steps */}
            {pathway.nextSteps.length > 0 && (
              <>
                <div className="pr-sub-label">Official next steps</div>
                <ul className="pr-list">
                  {pathway.nextSteps.map((s, i) => (
                    <li key={i}><span className="pr-list-dot pr-list-dot-gray" />{s}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {/* ── Step 2: Readiness Check ── */}
        {riskFactors && riskAnswers && answeredFactors.length > 0 && (
          <div className="pr-section">
            <div className="pr-section-header">
              <div className="pr-section-num">2</div>
              <div className="pr-section-title">Check Readiness — Risk Assessment</div>
              {riskScore !== null && riskLevel && (
                <div className="pr-section-badge">{riskLevel} · {riskScore}/100</div>
              )}
            </div>

            {riskScore !== null && (
              <div className="pr-risk-header">
                <div>
                  <div className="pr-risk-score">{riskScore}/100</div>
                  <div className="pr-risk-level">{riskLevel} · {answeredFactors.length} of {riskFactors.length} factors assessed</div>
                </div>
                <div style={{ fontSize: "9pt", color: "#555", maxWidth: "280pt" }}>
                  {riskScore >= 75
                    ? "Your application profile looks strong. Proceed with document preparation."
                    : riskScore >= 50
                      ? "Some risk factors identified. Address the recommendations before lodging."
                      : riskScore >= 30
                        ? "Significant risk factors detected. Strongly recommended to address these first."
                        : "One or more critical issues detected. High probability of refusal — seek expert advice."}
                </div>
              </div>
            )}

            <div className="pr-sub-label">Risk factor answers</div>
            <table className="pr-risk-table">
              <tbody>
                {answeredFactors.map(factor => {
                  const ans = riskAnswers[factor.id];
                  return (
                    <tr key={factor.id}>
                      <td style={{ width: "70pt" }}>
                        <span className={`pr-risk-answer ${
                          ans === "yes" ? "pr-risk-ans-yes" : ans === "partial" ? "pr-risk-ans-partial" : "pr-risk-ans-no"
                        }`}>
                          {ans === "yes" ? "⚠ Yes" : ans === "partial" ? "◑ Partially" : "✓ No"}
                        </span>
                      </td>
                      <td>
                        <div className="pr-risk-name">{factor.label}</div>
                        <div className="pr-risk-desc">{factor.description}</div>
                        {ans !== "no" && (
                          <div className="pr-risk-mitigation">Mitigation: {factor.mitigation}</div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Step 3a: Cost Breakdown ── */}
        {(applicationFee || costItems.length > 0) && (
          <div className="pr-section">
            <div className="pr-section-header">
              <div className="pr-section-num">3</div>
              <div className="pr-section-title">Build Your Plan — Estimated Costs</div>
            </div>
            <table className="pr-cost-table">
              <tbody>
                {applicationFee && (
                  <tr>
                    <td>Application fee (VAC)</td>
                    <td className="pr-cost-right">{applicationFee}</td>
                  </tr>
                )}
                {costItems.map(item => (
                  <tr key={item.id}>
                    <td>{item.title}</td>
                    <td className="pr-cost-right">{item.estimatedCost}</td>
                  </tr>
                ))}
                {totalEstimate > 0 && (
                  <tr className="pr-cost-total">
                    <td>Estimated total (excluding ongoing living costs)</td>
                    <td className="pr-cost-right">AUD {totalEstimate.toLocaleString()}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* ── Step 3b: Checklist ── */}
        {byCategory.length > 0 && (
          <div className="pr-section">
            {!(applicationFee || costItems.length > 0) && (
              <div className="pr-section-header">
                <div className="pr-section-num">3</div>
                <div className="pr-section-title">Build Your Plan — Action Checklist</div>
                <div className="pr-section-badge">{completedCount}/{checklist.length} done</div>
              </div>
            )}
            {(applicationFee || costItems.length > 0) && (
              <div className="pr-sub-label" style={{ marginTop: "16pt" }}>Action checklist — {completedCount}/{checklist.length} tasks completed</div>
            )}

            {byCategory.map(({ key, label, items }) => (
              <div key={key} className="pr-checklist-section">
                <div className="pr-checklist-cat">
                  {label} — {items.filter(i => completed.has(i.id)).length}/{items.length}
                </div>
                <table className="pr-checklist-table">
                  <tbody>
                    {items.map(item => {
                      const isDone = completed.has(item.id);
                      const dueDate = targetDate ? addWeeks(targetDate, item.dueWeeks) : null;
                      return (
                        <tr key={item.id}>
                          <td className="pr-checklist-check">
                            <span className={isDone ? "pr-check-done" : "pr-check-open"}>
                              {isDone ? "✓" : "○"}
                            </span>
                          </td>
                          <td>
                            <div className={isDone ? "pr-checklist-title-done" : ""} style={{ fontWeight: 600 }}>
                              {item.title}
                              {item.priority === "critical" && !isDone && (
                                <span className="pr-badge-critical" style={{ marginLeft: "6pt" }}>Critical</span>
                              )}
                            </div>
                            <div className="pr-checklist-desc">{item.description}</div>
                            {item.link && (
                              <div className="pr-checklist-link">{item.link}</div>
                            )}
                          </td>
                          <td className="pr-checklist-meta">
                            {item.estimatedCost && (
                              <div className="pr-badge-cost">{item.estimatedCost}</div>
                            )}
                            {dueDate && <div>{fmt(dueDate)}</div>}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}

        {/* ── Step 4: Application Status ── */}
        {outcome && (
          <div className="pr-section">
            <div className="pr-section-header">
              <div className="pr-section-num">4</div>
              <div className="pr-section-title">Track & Submit — Application Status</div>
            </div>

            <div className="pr-status-box">
              <div className="pr-status-label">Current status</div>
              <div className="pr-status-value">{outcomeLabels[outcome]}</div>
              {appReferenceNumber && (
                <div style={{ marginTop: "6pt", fontSize: "9pt", color: "#555" }}>
                  Reference: <strong>{appReferenceNumber}</strong>
                </div>
              )}
              {targetDate && (
                <div style={{ marginTop: "3pt", fontSize: "9pt", color: "#555" }}>
                  Target lodgement: <strong>{fmt(targetDate)}</strong>
                </div>
              )}
            </div>

            {outcome === "approved" && (
              <div className="pr-approved-box">
                <div className="pr-approved-title">✓ Visa Approved — Congratulations!</div>
                <div className="pr-approved-desc">
                  Your visa has been granted. Keep this report as a record of your successful application journey with VisaSwitch.
                </div>
              </div>
            )}

            {outcome === "refused" && selectedRefusalReasons.length > 0 && (
              <>
                <div className="pr-sub-label">Identified refusal reasons &amp; recovery plan</div>
                {selectedRefusalReasons.map((reason, ri) => (
                  <div key={reason.id} className="pr-refusal-item">
                    <div className="pr-refusal-title">{ri + 1}. {reason.title}{reason.code ? ` (${reason.code})` : ""}</div>
                    <div className="pr-refusal-desc">{reason.description}</div>
                    {reason.solutions.length > 0 && (
                      <>
                        <div style={{ fontSize: "8pt", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "#555", marginBottom: "4pt" }}>How to fix this</div>
                        <ul className="pr-list">
                          {reason.solutions.map((sol, si) => (
                            <li key={si}><span className="pr-list-dot pr-list-dot-green" />{sol}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        )}

        {/* ── Disclaimer ── */}
        <div className="pr-disclaimer">
          <strong>Important notice:</strong> This report is generated by VisaSwitch and is indicative only. Immigration requirements, fees, processing times, and policies change regularly. This is not legal advice. Always verify all information with the official immigration authority ({countryName}) before lodging an application. Consider engaging a registered migration agent for complex cases.
        </div>

        <div className="pr-footer">
          <span>Generated by VisaSwitch · visaswitch.com</span>
          <span>{generatedAt}</span>
        </div>
      </div>

      {/* ── Portal wrapper (print target) ────────────────────────────────────── */}
      {/* This wrapper is what the print @media rule targets */}
      <div id="vs-print-portal" style={{ display: "none" }} />

      {/* ── Screen modal (dark themed) ────────────────────────────────────────── */}
      <div className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm">
        {/* Top bar */}
        <div className="flex-shrink-0 flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-black">
          <div>
            <h2 className="text-sm font-bold text-white">Visa Application Report</h2>
            <p className="text-xs text-zinc-500">
              {countryName}{pathway ? ` — ${pathway.name}` : ""} · Generated {generatedAt}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                // Move print content into body so @media print can target it
                const el = document.getElementById("vs-print-report");
                const portal = document.getElementById("vs-print-portal");
                if (el && portal) {
                  portal.appendChild(el);
                  el.style.display = "block";
                  window.print();
                  // Restore after print
                  setTimeout(() => {
                    document.getElementById("vs-print-report")?.remove();
                  }, 1000);
                } else {
                  window.print();
                }
              }}
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

        {/* Scrollable preview */}
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
                  {appReferenceNumber && (
                    <>
                      <p className="text-xs text-zinc-600 mt-2">Reference</p>
                      <p className="text-xs font-semibold text-zinc-300">{appReferenceNumber}</p>
                    </>
                  )}
                </div>
              </div>
              <div className="mt-5 pt-5 border-t border-white/[0.07]">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-zinc-500">{completedCount} of {checklist.length} checklist tasks completed</span>
                  <span className="font-bold text-white">{progress}%</span>
                </div>
                <div className="h-2 bg-white/[0.08] rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-zinc-400 to-zinc-200 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            {/* Step 1 */}
            {pathway && (
              <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-2">
                  <Shield className="w-4 h-4 text-zinc-500" />
                  <h2 className="text-sm font-bold text-white">Step 1 — Pathway</h2>
                  <span className="ml-auto text-xs text-zinc-600 bg-white/[0.04] px-2 py-0.5 rounded-full border border-white/[0.06]">{pathway.category}</span>
                </div>
                <div className="px-5 py-4 space-y-4">
                  <p className="text-xs text-zinc-500 leading-relaxed">{pathway.summary}</p>
                  {eligibilityWithStatus.length > 0 && (
                    <div>
                      <p className="text-xs font-bold text-zinc-400 mb-2">Eligibility requirements</p>
                      <div className="space-y-2">
                        {eligibilityWithStatus.map(req => (
                          <div key={req.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                            <div className="flex-shrink-0 mt-0.5">
                              {req.met === true ? <CheckCircle className="w-4 h-4 text-emerald-400" />
                                : req.met === false ? <XCircle className="w-4 h-4 text-red-400" />
                                  : <Circle className="w-4 h-4 text-zinc-700" />}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={cn("text-xs font-semibold", req.met === true ? "text-zinc-200" : req.met === false ? "text-red-300" : "text-zinc-400")}>{req.label}</span>
                                {req.required && <span className="text-[10px] font-bold text-red-400/80 bg-red-500/10 px-1.5 py-0.5 rounded-full border border-red-500/20">Required</span>}
                              </div>
                              <p className="text-xs text-zinc-600 leading-relaxed mt-0.5">{req.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  {(pathway.pros.length > 0 || pathway.cons.length > 0) && (
                    <div className="grid grid-cols-2 gap-3">
                      {pathway.pros.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-emerald-400/80 mb-1.5">Advantages</p>
                          <ul className="space-y-1">{pathway.pros.map((p, i) => <li key={i} className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-emerald-500 mt-1.5 flex-shrink-0" /><span className="text-xs text-zinc-500 leading-relaxed">{p}</span></li>)}</ul>
                        </div>
                      )}
                      {pathway.cons.length > 0 && (
                        <div>
                          <p className="text-xs font-bold text-red-400/80 mb-1.5">Limitations</p>
                          <ul className="space-y-1">{pathway.cons.map((c, i) => <li key={i} className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-red-500 mt-1.5 flex-shrink-0" /><span className="text-xs text-zinc-500 leading-relaxed">{c}</span></li>)}</ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 2 */}
            {riskFactors && riskAnswers && answeredFactors.length > 0 && (
              <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-zinc-500" />
                  <h2 className="text-sm font-bold text-white">Step 2 — Readiness Check</h2>
                  {riskScore !== null && riskLevel && (
                    <span className="ml-auto text-xs font-bold text-zinc-300 bg-white/[0.06] px-2.5 py-0.5 rounded-full border border-white/[0.10]">
                      {riskLevel} · {riskScore}/100
                    </span>
                  )}
                </div>
                <div className="divide-y divide-white/[0.05] px-5 py-2">
                  {answeredFactors.map(factor => {
                    const ans = riskAnswers[factor.id];
                    return (
                      <div key={factor.id} className="py-3 flex items-start gap-3">
                        <span className={cn("text-xs font-bold flex-shrink-0 w-16", ans === "yes" ? "text-red-400" : ans === "partial" ? "text-amber-400" : "text-emerald-400")}>
                          {ans === "yes" ? "Yes" : ans === "partial" ? "Partially" : "No"}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="text-xs font-semibold text-zinc-300">{factor.label}</span>
                          <p className="text-xs text-zinc-600 mt-0.5">{factor.description}</p>
                          {ans !== "no" && <p className="text-xs text-zinc-500 mt-1 italic">{factor.mitigation}</p>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3 cost */}
            {(applicationFee || costItems.length > 0) && (
              <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <h2 className="text-sm font-bold text-white">Step 3 — Estimated Investment</h2>
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {applicationFee && <div className="px-5 py-3 flex justify-between"><span className="text-xs font-semibold text-zinc-300">Application fee (VAC)</span><span className="text-xs font-bold text-white">{applicationFee}</span></div>}
                  {costItems.map(item => <div key={item.id} className="px-5 py-3 flex justify-between"><span className="text-xs text-zinc-500 flex-1 mr-4">{item.title}</span><span className="text-xs font-semibold text-zinc-400">{item.estimatedCost}</span></div>)}
                </div>
                {totalEstimate > 0 && (
                  <div className="px-5 py-3.5 bg-white/[0.03] border-t border-white/[0.07] flex justify-between">
                    <span className="text-xs font-bold text-white">Estimated total</span>
                    <div className="text-right"><span className="text-sm font-bold text-white">AUD {totalEstimate.toLocaleString()}</span><span className="block text-xs text-zinc-600">+ ongoing living costs</span></div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3 checklist */}
            {byCategory.map(({ key, label, items }) => (
              <div key={key} className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.07] flex items-center justify-between">
                  <div className="flex items-center gap-2"><FileCheck className="w-4 h-4 text-zinc-600" /><h2 className="text-sm font-bold text-white">{label}</h2></div>
                  <span className="text-xs text-zinc-600">{items.filter(i => completed.has(i.id)).length}/{items.length}</span>
                </div>
                <div className="divide-y divide-white/[0.05]">
                  {items.map(item => {
                    const isDone = completed.has(item.id);
                    const dueDate = targetDate ? addWeeks(targetDate, item.dueWeeks) : null;
                    return (
                      <div key={item.id} className={cn("px-5 py-3.5 flex items-start gap-3", isDone && "opacity-50")}>
                        {isDone ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" /> : <Circle className="w-4 h-4 text-zinc-700 flex-shrink-0 mt-0.5" />}
                        <div className="flex-1 min-w-0">
                          <p className={cn("text-xs font-semibold mb-0.5", isDone ? "line-through text-zinc-600" : "text-white")}>{item.title}</p>
                          <p className="text-xs text-zinc-600 leading-relaxed">{item.description}</p>
                          {item.link && <p className="text-xs text-blue-400/70 mt-0.5 truncate">{item.link}</p>}
                        </div>
                        <div className="flex-shrink-0 flex flex-col items-end gap-1 ml-3">
                          {item.estimatedCost && <span className="text-xs text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded-full">{item.estimatedCost}</span>}
                          {dueDate && <span className="text-xs text-zinc-600 whitespace-nowrap">{fmt(dueDate)}</span>}
                          {item.priority === "critical" && !isDone && <span className="text-[10px] font-bold text-red-400/80 bg-red-500/10 px-1.5 py-0.5 rounded-full border border-red-500/20">Critical</span>}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            {/* Step 4 */}
            {outcome && (
              <div className="glass rounded-2xl border border-white/[0.08] overflow-hidden">
                <div className="px-5 py-4 border-b border-white/[0.07] flex items-center gap-2">
                  <Info className="w-4 h-4 text-zinc-500" />
                  <h2 className="text-sm font-bold text-white">Step 4 — Application Status</h2>
                </div>
                <div className="px-5 py-4 space-y-4">
                  <p className="text-sm font-semibold text-white">{outcomeLabels[outcome]}</p>
                  {appReferenceNumber && <p className="text-xs text-zinc-400">Reference: <span className="font-mono font-bold text-white">{appReferenceNumber}</span></p>}
                  {outcome === "approved" && (
                    <div className="p-4 rounded-xl bg-emerald-500/[0.08] border border-emerald-500/25">
                      <p className="text-sm font-bold text-emerald-300 mb-1">Congratulations!</p>
                      <p className="text-xs text-zinc-400">Your visa has been granted.</p>
                    </div>
                  )}
                  {outcome === "refused" && selectedRefusalReasons.length > 0 && (
                    <div className="space-y-3">
                      {selectedRefusalReasons.map((reason, ri) => (
                        <div key={reason.id} className="p-3 rounded-xl bg-red-500/[0.05] border border-red-500/20">
                          <p className="text-xs font-bold text-zinc-300">{ri + 1}. {reason.title}</p>
                          <p className="text-xs text-zinc-500 mt-1">{reason.description}</p>
                          <ul className="mt-2 space-y-1">{reason.solutions.map((sol, si) => <li key={si} className="flex items-start gap-1.5"><div className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 flex-shrink-0" /><span className="text-xs text-zinc-500">{sol}</span></li>)}</ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <p className="text-xs text-amber-300/80 leading-relaxed">
                This report is indicative only. Always verify with the official immigration authority before lodging. This is not legal advice.
              </p>
            </div>

            <p className="text-center text-xs text-zinc-700 pb-4">Generated by VisaSwitch · visaswitch.com · {generatedAt}</p>
          </div>
        </div>
      </div>
    </>
  );
}
