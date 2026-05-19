import React, { useState } from "react";
import { Hero } from "../components/magazine/Hero";
import { motion, AnimatePresence } from "framer-motion";
import { ConfidenceBadge } from "../components/intelligence/ConfidenceBadge";
import { ProgressBar } from "../components/intelligence/ProgressBar";
import { SectionHeader } from "../components/intelligence/SectionHeader";
import { IntelligenceTable, Column } from "../components/intelligence/IntelligenceTable";
import { StatGrid, StatItem } from "../components/intelligence/StatGrid";

const hypotheses = [
  {
    id: "H-01",
    text: "Venezuelan expat segments in Madrid have high private insurance propensities due to cultural distrust of nationalised grids.",
    confidence: 88,
    status: "validated" as const,
    evidence: "Survey of 500+ expats and broker interview logs (ReMotive Media)",
    implication: "Focus digital onboarding assets to speak directly to premium expat hospital network needs.",
  },
  {
    id: "H-02",
    text: "MUFACE network strain serves as a trigger event to convert premium local health plans to high-tier IPMI.",
    confidence: 76,
    status: "strong" as const,
    evidence: "Adeslas premium adjustments and mystery shopping records",
    implication: "Time activations to coincide with peak MUFACE disruption windows in Q3 2026.",
  },
  {
    id: "H-03",
    text: "Colombian expat segment represents a secondary growth cohort in high-net-worth brackets.",
    confidence: 52,
    status: "emerging" as const,
    evidence: "Migration flow trends and initial broker feedback (Canaries & Barcelona)",
    implication: "Begin data collection programme to close confidence gap before Phase 3.",
  },
  {
    id: "H-04",
    text: "Broker-first dark-social channel yields 5x higher qualified lead conversion than paid digital.",
    confidence: 84,
    status: "validated" as const,
    evidence: "WhatsApp directory audits and referral chain mapping by ReMotive Media",
    implication: "Allocate 70% of acquisition budget to broker onboarding and enablement.",
  },
];

interface Decision {
  date: string;
  action: string;
  reversibility: string;
  status: string;
}

const decisions: Decision[] = [
  {
    date: "15 May 2026",
    action: "Shortlisted 18 premium boutique brokers specialising in expat segments",
    reversibility: "High",
    status: "Active",
  },
  {
    date: "12 May 2026",
    action: "Approved DGSFP Regulatory compliance structure and local entity setup",
    reversibility: "Low (Legal Bound)",
    status: "Completed",
  },
  {
    date: "08 May 2026",
    action: "Allocated initial GTM pilot budget of €120,000 for Madrid Broker launch",
    reversibility: "Medium",
    status: "Active",
  },
  {
    date: "01 May 2026",
    action: "Commissioned full Venezuelan expat demographic audit with INE data",
    reversibility: "High",
    status: "Completed",
  },
];

const decisionColumns: Column<Decision>[] = [
  {
    key: "date",
    label: "Date",
    width: "110px",
    render: (row) => (
      <span className="font-mono text-[11px] text-gray-400 font-semibold tabular-nums">{row.date}</span>
    ),
  },
  {
    key: "action",
    label: "Decision & Action",
    render: (row) => (
      <span className="font-sans text-sm font-semibold text-vumi-slate">{row.action}</span>
    ),
  },
  {
    key: "reversibility",
    label: "Reversibility",
    width: "130px",
    render: (row) => (
      <span className="font-sans text-xs text-gray-400">{row.reversibility}</span>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "110px",
    render: (row) => (
      <span className={`font-heading text-[9px] font-bold uppercase tracking-wider px-2 py-1 rounded-sm ${
        row.status === "Active"
          ? "bg-sky-50 text-sky-700 border border-sky-200/50"
          : "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
      }`}>
        {row.status}
      </span>
    ),
  },
];

const signals = [
  { name: "Expats inquiring about premium private networks", trend: "+18% MoM", status: "Strong", statusLevel: "validated" as const },
  { name: "Traditional local premium cost inflation (Sanitas/Adeslas)", trend: "+6.4%", status: "Strong", statusLevel: "validated" as const },
  { name: "Expat-focused broker interest in international-grade plans", trend: "High Demand", status: "Emerging", statusLevel: "strong" as const },
  { name: "Regulatory audits on cross-border coverage by DGSFP", trend: "No concerns", status: "Stable", statusLevel: "validated" as const },
];

const dataGaps = [
  { label: "Colombian Expat Pricing Corridor", priority: "High", color: "text-rose-500" },
  { label: "Barcelona Local Network Capacity", priority: "Medium", color: "text-amber-500" },
  { label: "Canaries Expat Broker Channels", priority: "Low", color: "text-gray-400" },
  { label: "Mexican Cohort Household Incomes", priority: "Medium", color: "text-amber-500" },
];

const heroStats: StatItem[] = [
  { label: "Active Signals", value: "48", sub: "Weekly feed", positive: true },
  { label: "Decisions Logged", value: "18+", sub: "All documented", positive: true },
  { label: "Validated Hypotheses", value: "8 / 10", sub: "2 emerging", positive: true },
  { label: "Known Data Gaps", value: "14", sub: "Tracked actively" },
];

export const IntelligencePage: React.FC = () => {
  const [expandedHypothesis, setExpandedHypothesis] = useState<string | null>(null);

  return (
    <div className="space-y-0 bg-vumi-pearl">
      <Hero
        badge="Command Center"
        headline="Strategic Intelligence & Real-Time Market Signals"
        dek="A central hub consolidating live GTM hypotheses, operational decisions, active market signals, and core database metrics to guide VUMI Europe's leadership through the Spain launch."
      >
        <StatGrid stats={heroStats} cols={2} dark />
      </Hero>

      <div className="magazine-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">

          {/* Main column — 8 cols */}
          <div className="lg:col-span-8 space-y-12">

            {/* Hypotheses */}
            <div className="space-y-5">
              <SectionHeader
                eyebrow="GTM Hypotheses"
                headline="Live Strategic Hypotheses"
                dek="Evidence-backed assertions driving the Spain GTM strategy. Click any hypothesis to expand the evidence trail."
              />
              <div className="space-y-3">
                {hypotheses.map((h, i) => (
                  <motion.div
                    key={h.id}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: "easeOut" }}
                    onClick={() => setExpandedHypothesis(expandedHypothesis === h.id ? null : h.id)}
                    className="bg-white border border-gray-100 rounded-sm premium-shadow cursor-pointer hover:border-vumi-sky/40 transition-colors duration-200"
                  >
                    <div className="p-5">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-[9px] font-bold text-gray-300 shrink-0">{h.id}</span>
                          <ConfidenceBadge level={h.status} score={h.confidence} />
                        </div>
                        <motion.div
                          animate={{ rotate: expandedHypothesis === h.id ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                          className="text-gray-300 shrink-0 mt-0.5"
                        >
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                            <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </motion.div>
                      </div>
                      <p className="font-sans text-sm font-semibold text-vumi-slate leading-relaxed mb-3">
                        {h.text}
                      </p>
                      <ProgressBar
                        value={h.confidence}
                        height="thin"
                        color={h.status === "validated" ? "#10b981" : h.status === "strong" ? "#00A9E0" : "#f59e0b"}
                        delay={i * 0.1}
                      />
                    </div>

                    <AnimatePresence>
                      {expandedHypothesis === h.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: "easeOut" }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 pt-1 border-t border-gray-50 space-y-3">
                            <div>
                              <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-gray-400 block mb-1">Evidence Trail</span>
                              <p className="font-sans text-xs text-gray-500 font-light leading-relaxed">{h.evidence}</p>
                            </div>
                            <div>
                              <span className="font-heading text-[9px] font-bold uppercase tracking-widest text-vumi-blue block mb-1">Strategic Implication</span>
                              <p className="font-sans text-xs text-vumi-slate font-semibold leading-relaxed">{h.implication}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Decisions table */}
            <div className="space-y-5">
              <SectionHeader
                eyebrow="Decision Log"
                headline="Recent Strategic Decisions"
                dek="Operational commitments logged with reversibility scoring and current status."
              />
              <IntelligenceTable
                columns={decisionColumns}
                rows={decisions}
                zebra
              />
            </div>

          </div>

          {/* Sidebar — 4 cols */}
          <div className="lg:col-span-4 space-y-6">

            {/* Weekly Signals */}
            <div className="bg-white border border-gray-100 rounded-sm premium-shadow overflow-hidden">
              <div className="px-5 py-3.5 border-b border-gray-50 flex items-center justify-between">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-vumi-blue">Active Signals</span>
                <span className="font-mono text-[9px] text-gray-300">Weekly</span>
              </div>
              <div className="divide-y divide-gray-50">
                {signals.map((s, idx) => (
                  <div key={idx} className="px-5 py-3.5 flex justify-between items-start gap-3 intel-row">
                    <div className="min-w-0">
                      <p className="font-sans text-xs font-semibold text-vumi-slate leading-snug">{s.name}</p>
                      <ConfidenceBadge level={s.statusLevel} compact />
                    </div>
                    <span className="font-heading text-xs font-bold text-vumi-sky shrink-0">{s.trend}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Data Gaps */}
            <div className="bg-vumi-slate text-white rounded-sm premium-shadow overflow-hidden">
              <div className="px-5 py-3.5 border-b border-white/[0.07]">
                <span className="font-heading text-xs font-bold uppercase tracking-widest text-vumi-sky">Outstanding Data Gaps</span>
              </div>
              <div className="p-5 space-y-4">
                <p className="font-sans text-xs text-gray-300 font-light leading-relaxed">
                  14 specific data gaps tracked to fully resolve second-tier GTM opportunities. Priority order:
                </p>
                <div className="space-y-0 divide-y divide-white/[0.05]">
                  {dataGaps.map((g, i) => (
                    <div key={i} className="flex justify-between items-center py-2.5">
                      <span className="font-sans text-xs text-gray-300 font-light">{g.label}</span>
                      <span className={`font-heading text-[9px] font-bold uppercase tracking-wider ${g.color}`}>{g.priority}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Confidence legend */}
            <div className="bg-white border border-gray-100 rounded-sm premium-shadow p-5 space-y-3">
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400 block">Confidence Key</span>
              <div className="space-y-2">
                {([
                  { level: "validated", label: "Validated — empirical evidence trail" },
                  { level: "strong", label: "Strong Signal — directionally confirmed" },
                  { level: "emerging", label: "Emerging — early data only" },
                  { level: "gap", label: "Data Gap — insufficient evidence" },
                ] as const).map((item) => (
                  <div key={item.level} className="flex items-center gap-2">
                    <ConfidenceBadge level={item.level} compact />
                    <span className="font-sans text-[10px] text-gray-400 font-light">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
