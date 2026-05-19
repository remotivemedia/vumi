import React from "react";
import { motion } from "framer-motion";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { ConfidenceBadge } from "../components/intelligence/ConfidenceBadge";
import { SectionHeader } from "../components/intelligence/SectionHeader";
import { StatGrid, StatItem } from "../components/intelligence/StatGrid";

const phases = [
  {
    phase: "Phase 1: Broker Activation",
    timing: "Q3 2026",
    focus: "Madrid Core",
    desc: "Establish broker agreements with top 5 Venezuelan-focused partners. Onboard and train sales representatives on VUMI's premium portal features. Deploy co-branded digital brochures in private communities.",
  },
  {
    phase: "Phase 2: Geographic Expansion",
    timing: "Q4 2026",
    focus: "Barcelona, Marbella & Canaries",
    desc: "Onboard Tier 2 boutique brokers in Catalonia and Andalusia. Align with key medical clinics in Marbella and Tenerife to establish premium local reimbursement routes.",
  },
  {
    phase: "Phase 3: Cohort Expansion",
    timing: "Q1 2027",
    focus: "Colombian & Mexican Segments",
    desc: "Replicate the proven high-net-worth expat broker activation playbook. Launch customized Colombian and Mexican family-tier IPMI policy benefits.",
  },
];

const phaseConfidence = ["validated", "strong", "emerging"] as const;

const heroStats: StatItem[] = [
  { label: "Launch Phase 1", value: "Q3 2026", sub: "Madrid core", positive: true },
  { label: "Phase 1 Budget", value: "€120k", sub: "Broker activation", positive: true },
  { label: "Lead Conversion Target", value: "<48 hrs", sub: "Broker to proposal", positive: true },
  { label: "Year 1 NPS Target", value: ">70", sub: "Broker + client composite", positive: true },
];

const checklist = [
  { label: "DGSFP Regulatory Filings", done: true },
  { label: "Top 5 Broker Shortlist Setup", done: true },
  { label: "Partner Onboarding Portal Launch", done: false },
  { label: "Madrid Phase 1 Broker Agreements", done: false },
];

export const PlanPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="GTM Roadmap"
        headline="90-Day Soft Launch: Broker-Led, LATAM-First, Data-Proven"
        dek="Our strategic timeline outlines an iterative, low-risk approach to Spain market entry. By focusing resources heavily on high-yield expat corridors first, we build active cash flows and validated operational pipelines before launching nationwide."
      >
        <div className="space-y-4 text-left">
          <span className="font-heading font-bold text-[10px] uppercase tracking-[0.18em] text-vumi-sky block">
            GTM Target Checklist
          </span>
          <div className="divide-y divide-white/[0.06]">
            {checklist.map((c, i) => (
              <div key={i} className="flex justify-between items-center py-2.5">
                <span className="font-sans text-xs text-gray-300 font-light">{c.label}</span>
                <span className={`font-heading text-[9px] font-bold uppercase tracking-wider ${c.done ? "text-emerald-400" : "text-vumi-sky"}`}>
                  {c.done ? "Completed" : "In Progress"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Hero>

      {/* 2. Main content */}
      <div className="magazine-container py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">

          {/* Main Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">

            {/* KPI grid */}
            <div className="space-y-4">
              <SectionHeader eyebrow="KPIs" headline="Success Metrics at a Glance" border={false} />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {heroStats.map((s, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                    className="bg-white border border-gray-100 rounded-sm premium-shadow p-4 kpi-tile"
                  >
                    <span className="font-heading text-xl font-bold text-vumi-blue block">{s.value}</span>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mt-1">{s.label}</span>
                    {s.sub && <span className="font-sans text-[10px] text-emerald-600 font-medium block mt-0.5">{s.sub}</span>}
                  </motion.div>
                ))}
              </div>
            </div>

            <Section
              headline="Phased Strategy: Capturing Value Early, Replicating Success"
              paragraphs={[
                "A national mass-media campaign in Spain would be prohibitively expensive and highly inefficient. Instead, VUMI's Go-To-Market strategy is architected to scale organically, capturing high-margin premium expat communities in distinct phases.",
                "This iterative model minimises upfront burn rates. By achieving operational validation in Madrid first, we can refine our support networks, optimise local reimbursement speed, and build a powerful track record of client satisfaction that acts as social proof for subsequent expansion phases."
              ]}
              implication="We target early profitability within 90 days of Phase 1 launch, leveraging Madrid's extreme concentration of private wealth to generate active cash flows."
            />

            {/* Timeline Phases */}
            <div className="space-y-5">
              <SectionHeader eyebrow="Execution" headline="GTM Execution Phases" border={false} />
              <div className="space-y-3">
                {phases.map((p, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
                    className="bg-white border border-gray-100 rounded-sm premium-shadow flex gap-5 items-start p-5"
                  >
                    {/* Phase number */}
                    <div className="shrink-0 flex flex-col items-center gap-1.5">
                      <div className="w-10 h-10 flex items-center justify-center bg-vumi-blue/5 border border-vumi-blue/10 rounded-sm font-heading font-bold text-vumi-blue text-sm">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      {i < phases.length - 1 && (
                        <div className="w-px h-6 bg-gray-100" />
                      )}
                    </div>
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-heading font-bold text-vumi-blue text-sm">{p.phase}</h4>
                        <ConfidenceBadge level={phaseConfidence[i]} compact />
                        <span className="font-mono text-[9px] text-gray-400 border border-gray-100 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
                          {p.timing} &middot; {p.focus}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-gray-500 leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
            <div className="flex justify-between py-1.5 border-b border-white/5 text-gray-200">
              <span>Top 5 Broker Shortlist Setup</span>
              <span className="font-bold text-emerald-400">✓ Completed</span>
            </div>
            <div className="flex justify-between py-1.5 text-gray-200">
              <span>Partner Onboarding Portal Launch</span>
              <span className="font-bold text-vumi-sky">In Progress</span>
            </div>
          </div>
        </div>
      </Hero>

      {/* 2. Main content */}
      <div className="magazine-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Main Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            <Section
              headline="Phased Strategy: Capturing Value Early, Replicating Success"
              paragraphs={[
                "A national mass-media campaign in Spain would be prohibitively expensive and highly inefficient. Instead, VUMI's Go-To-Market strategy is architected to scale organically, capturing high-margin premium expat communities in distinct phases.",
                "This iterative model minimizes upfront burn rates. By achieving operational validation in Madrid first, we can refine our support networks, optimize local reimbursement speed, and build a powerful track record of client satisfaction that acts as social proof for subsequent expansion phases."
              ]}
              implication="We target early profitability within 90 days of Phase 1 launch, leveraging Madrid's extreme concentration of private wealth to generate active cash flows."
            />

            {/* Timeline Phases */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-vumi-blue tracking-tight">
                Execution Phases
              </h3>
              <div className="space-y-4">
                {phases.map((p, i) => (
                  <div key={i} className="bg-white p-6 border border-gray-100 rounded-lg premium-shadow flex gap-6 items-start">
                    <div className="shrink-0 flex items-center justify-center w-12 h-12 bg-vumi-sky/10 rounded-lg text-vumi-blue font-heading font-bold">
                      0{i + 1}
                    </div>
                    <div className="space-y-2">
                      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1">
                        <h4 className="font-heading font-bold text-vumi-blue">{p.phase}</h4>
                        <span className="text-xs font-semibold px-2 py-0.5 bg-gray-50 border border-gray-100 text-gray-500 rounded uppercase tracking-wider shrink-0 self-start sm:self-auto">
                          {p.timing} • {p.focus}
                        </span>
                      </div>
                      <p className="font-sans text-sm text-gray-600 leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Sidebar title="KPI Target Suite">
              <WhatThisMeans
                title="Measurement Gates"
                points={[
                  "Lead Conversion Time: Target <48 hours from broker inquiry to proposal submission.",
                  "Client Retention Rate: Target >95% renewal index in Year 1.",
                  "Net Promoter Score (NPS): Target >70 composite broker/client satisfaction index.",
                ]}
              />
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
};
