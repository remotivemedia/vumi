import React, { useState } from "react";
import { Hero } from "../components/magazine/Hero";
import { motion } from "framer-motion";

// Sample live hypothesis data from strategy instructions
const hypotheses = [
  {
    id: "H-01",
    text: "Venezuelan expat segments in Madrid have high private insurance propensities due to cultural distrust of nationalized grids.",
    confidence: 88,
    status: "Validated",
    evidence: "Survey of 500+ expats and broker interview logs (ReMotive Media)",
  },
  {
    id: "H-02",
    text: "MUFACE network strain serves as a trigger event to convert premium local health plans to high-tier IPMI.",
    confidence: 76,
    status: "Strong Signal",
    evidence: "Adeslas premium adjustments and mystery shopping records",
  },
  {
    id: "H-03",
    text: "Colombian expat segment represents a secondary growth cohort in high-net-worth brackets.",
    confidence: 52,
    status: "Emerging",
    evidence: "Migration flow trends and initial broker feedback (Canaries & Barcelona)",
  },
];

const decisions = [
  {
    date: "15 May 2026",
    action: "Shortlisted 18 premium boutique brokers specializing in expat segments",
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
];

const signals = [
  { name: "Expats inquiring about premium private networks", trend: "+18% MoM", status: "Strong" },
  { name: "Traditional local premium cost inflation (Sanitas/Adeslas)", trend: "+6.4%", status: "Strong" },
  { name: "Expat-focused broker interest in international-grade plans", trend: "High Demand", status: "Emerging" },
  { name: "Regulatory audits on cross-border coverage by DGSFP", trend: "No concerns", status: "Stable" },
];

export const IntelligencePage: React.FC = () => {
  const [selectedHypothesis, setSelectedHypothesis] = useState<string | null>(null);

  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Command Center"
        headline="Strategic Intelligence & Real-Time Market Signals"
        dek="A central hub consolidating live GTM hypotheses, operational decisions, active market signals, and core database metrics to guide VUMI Europe's leadership through the Spain launch."
      >
        <div className="grid grid-cols-2 gap-4 text-left">
          <div className="p-4 bg-white/5 rounded border border-white/10">
            <span className="text-xs text-vumi-sky uppercase tracking-wider block">Active Signals</span>
            <span className="text-3xl font-heading font-bold text-white">48</span>
          </div>
          <div className="p-4 bg-white/5 rounded border border-white/10">
            <span className="text-xs text-vumi-sky uppercase tracking-wider block">Decisions Logged</span>
            <span className="text-3xl font-heading font-bold text-white">18+</span>
          </div>
          <div className="p-4 bg-white/5 rounded border border-white/10">
            <span className="text-xs text-vumi-sky uppercase tracking-wider block">Validated Hypotheses</span>
            <span className="text-3xl font-heading font-bold text-white">8 / 10</span>
          </div>
          <div className="p-4 bg-white/5 rounded border border-white/10">
            <span className="text-xs text-vumi-sky uppercase tracking-wider block">Known Data Gaps</span>
            <span className="text-3xl font-heading font-bold text-white">14</span>
          </div>
        </div>
      </Hero>

      {/* 2. Main Dashboard Content */}
      <div className="magazine-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Main Column - Hypotheses & Decisions (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Hypotheses Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-vumi-blue font-heading tracking-tight">
                Live Strategic Hypotheses
              </h2>
              <div className="space-y-4">
                {hypotheses.map((h) => (
                  <div
                    key={h.id}
                    onClick={() => setSelectedHypothesis(selectedHypothesis === h.id ? null : h.id)}
                    className="p-6 bg-white border border-gray-100 rounded-lg premium-shadow cursor-pointer hover:border-vumi-sky transition duration-200"
                  >
                    <div className="flex justify-between items-start gap-4">
                      <span className="text-xs font-bold font-heading text-vumi-sky uppercase bg-vumi-sky/10 px-2 py-0.5 rounded">
                        {h.id}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                          h.status === "Validated"
                            ? "bg-emerald-50 text-emerald-700"
                            : h.status === "Strong Signal"
                            ? "bg-sky-50 text-sky-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {h.status} ({h.confidence}% Conf.)
                      </span>
                    </div>
                    <p className="font-sans text-base font-semibold text-vumi-slate mt-3 leading-relaxed">
                      {h.text}
                    </p>
                    
                    {selectedHypothesis === h.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-4 border-t border-gray-100 text-sm font-sans text-gray-500 space-y-2"
                      >
                        <p>
                          <strong className="text-vumi-blue font-heading text-xs uppercase tracking-wider block">Evidence Trail:</strong>
                          {h.evidence}
                        </p>
                        <p>
                          <strong className="text-vumi-blue font-heading text-xs uppercase tracking-wider block mt-2">Actionable Implication:</strong>
                          Focus digital onboarding assets to speak directly to premium expat hospital network needs.
                        </p>
                      </motion.div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Decisions Logged */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-vumi-blue font-heading tracking-tight">
                Recent Strategic Decisions
              </h2>
              <div className="bg-white border border-gray-100 rounded-lg premium-shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Date</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Decision & Action</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Reversibility</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {decisions.map((d, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                        <td className="p-4 font-sans text-xs text-gray-400 font-semibold">{d.date}</td>
                        <td className="p-4 font-sans text-sm font-semibold text-vumi-slate">{d.action}</td>
                        <td className="p-4 font-sans text-xs text-gray-500">{d.reversibility}</td>
                        <td className="p-4">
                          <span className="text-xs font-semibold px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-full">
                            {d.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar Columns - Signals & Gaps (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <div className="bg-white p-6 border border-gray-100 rounded-lg premium-shadow space-y-6">
              <h3 className="font-heading text-lg font-bold text-vumi-blue border-b border-gray-100 pb-3 uppercase tracking-wider">
                Active Signals (Weekly)
              </h3>
              <div className="space-y-4">
                {signals.map((s, idx) => (
                  <div key={idx} className="flex justify-between items-start gap-4">
                    <div>
                      <p className="font-sans text-sm font-semibold text-vumi-slate leading-tight">{s.name}</p>
                      <span className="text-xs text-gray-400 font-medium">Preset Filter: Spain Launch</span>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-sm font-heading font-bold text-vumi-sky">{s.trend}</span>
                      <span className="block text-[10px] uppercase font-bold text-gray-400">{s.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-vumi-slate text-white p-6 border border-vumi-slate/15 rounded-lg premium-shadow space-y-4">
              <h3 className="font-heading text-lg font-bold text-vumi-sky uppercase tracking-wider">
                Outstanding Data Gaps
              </h3>
              <p className="font-sans text-xs text-gray-300 font-light leading-relaxed">
                We are actively tracking 14 specific data gaps needed to fully resolve second-tier GTM opportunities (e.g. detailed Colombian expat pricing corridors).
              </p>
              <div className="space-y-2 pt-2 text-xs font-sans">
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-300">Colombian Expat Pricing</span>
                  <span className="text-vumi-sky font-bold">High Priority</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/5">
                  <span className="text-gray-300">Barcelona Local Network Capacity</span>
                  <span className="text-amber-500 font-bold">Medium Priority</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-gray-300">Canaries Expat Broker Channels</span>
                  <span className="text-gray-400 font-bold">Low Priority</span>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};
