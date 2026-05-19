import React from "react";
import { motion } from "framer-motion";
import { Hero } from "../components/magazine/Hero";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { ConfidenceBadge } from "../components/intelligence/ConfidenceBadge";
import { SignalCard } from "../components/intelligence/SignalCard";
import { SectionHeader } from "../components/intelligence/SectionHeader";
import { StatGrid, StatItem } from "../components/intelligence/StatGrid";

interface HomePageProps {
  onNavigate: (tab: "audiencias" | "intelligence" | "ask" | "strategy" | "brokers" | "competencia" | "regulacion" | "pitch" | "plan") => void;
}

const portalMap = [
  {
    id: "audiencias" as const,
    idx: "01",
    title: "Audience Intel",
    description: "Expat demographics, geographic concentration hubs, and household wealth statistics.",
    signal: "800k+ P0 target confirmed",
    confidence: "validated" as const,
  },
  {
    id: "intelligence" as const,
    idx: "02",
    title: "Command Center",
    description: "Evidence logs, validated growth hypotheses, and weekly channel intelligence indicators.",
    signal: "8/10 hypotheses validated",
    confidence: "validated" as const,
  },
  {
    id: "ask" as const,
    idx: "03",
    title: "Strategic Query",
    description: "Query databases, audit reports, and reference citations in real-time.",
    signal: "Live query engine",
    confidence: "strong" as const,
  },
  {
    id: "strategy" as const,
    idx: "04",
    title: "Directive",
    description: "The Spain GTM Blueprint, actionable recommendations, and capital allocations.",
    signal: "€12M GWP opportunity",
    confidence: "validated" as const,
  },
  {
    id: "brokers" as const,
    idx: "05",
    title: "Channel Intel",
    description: "Boutique broker audit fit scoring and regional agency shortlists.",
    signal: "18 shortlisted partners",
    confidence: "strong" as const,
  },
  {
    id: "competencia" as const,
    idx: "06",
    title: "Competition",
    description: "Incumbent market share distributions, pricing corridor scatter plots, and feature matrix.",
    signal: "Bupa leads at 38% share",
    confidence: "validated" as const,
  },
  {
    id: "regulacion" as const,
    idx: "07",
    title: "Regulation",
    description: "Solvency II compliance guidelines, DGSFP registry status, and local licensing milestones.",
    signal: "218% Solvency II buffer",
    confidence: "validated" as const,
  },
  {
    id: "pitch" as const,
    idx: "08",
    title: "Pitch Playbook",
    description: "Broker marketing brochures, slide kits, and volume-based commission share tiers.",
    signal: "Up to 20% elite commission",
    confidence: "strong" as const,
  },
  {
    id: "plan" as const,
    idx: "09",
    title: "GTM Roadmap",
    description: "Execution sequence phases, key milestone tracking, and critical KPIs.",
    signal: "Q3 2026 launch target",
    confidence: "strong" as const,
  },
];

const topSignals = [
  {
    id: "S-01",
    title: "Venezuelan expat private insurance propensity",
    value: "88%",
    trend: "Conf.",
    trendPositive: true,
    strength: "validated" as const,
    source: "ReMotive Media Broker Survey 2026",
  },
  {
    id: "S-02",
    title: "MUFACE strain — premium policy conversion trigger",
    value: "+18% MoM",
    strength: "strong" as const,
    source: "Adeslas premium adjustments & mystery shopping",
  },
  {
    id: "S-03",
    title: "Colombian cohort expansion opportunity",
    value: "52%",
    trend: "Conf.",
    trendPositive: true,
    strength: "emerging" as const,
    source: "Migration flow trends, Canaries & Barcelona",
  },
];

const heroStats: StatItem[] = [
  { label: "Target Expat Segment", value: "800k+", sub: "Venezuelan / LATAM Hubs", positive: true },
  { label: "Solvency II Buffer", value: "218%", sub: "Statutory compliant", positive: true },
  { label: "Year 1 GWP Potential", value: "€12M", sub: "P0 focus only", positive: true },
  { label: "Intel Modules Active", value: "9 / 9", sub: "All portals live", positive: true },
];

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* Hero */}
      <Hero
        badge="Executive Overview"
        headline="The Spain Blueprint: Premium Expat Market Entry Strategy"
        dek="This executive intelligence portal centralises demographic insights, competitor matrices, regulatory frameworks, and broker activation toolkits for senior leadership. Use the navigation above to explore each intelligence module."
      >
        <StatGrid stats={heroStats} cols={2} dark />
      </Hero>

      {/* Main body */}
      <div className="magazine-container py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 text-left">

          {/* Main column — 8 cols */}
          <div className="lg:col-span-8 space-y-12">

            {/* Executive Summary Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="space-y-4"
            >
              <SectionHeader
                eyebrow="Context"
                headline="Executive Intelligence & Market Architecture"
              />
              <div className="space-y-3 font-sans text-sm text-gray-500 font-light leading-relaxed">
                <p className="drop-cap text-vumi-slate font-normal">
                  International Private Medical Insurance positioning in Spain requires exceptional alignment between local regulatory mandates and premium channel networks. This portal consolidates ReMotive Media&apos;s strategic findings to support executive decision-making.
                </p>
                <p>
                  Select any strategic intelligence section below to explore interactive visualisations, geographic registries, Solvency II metrics, and channel toolkits. Data availability and source confidence are surfaced before interpretation.
                </p>
              </div>
            </motion.div>

            {/* Portal Map */}
            <div className="space-y-5">
              <SectionHeader
                eyebrow="Navigation"
                headline="Strategic Intelligence Map"
                dek="Market signals indicate where attention, investment, and competitive pressure are concentrating. Use this map to identify priority opportunities and high-confidence next actions."
                border={false}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
                {portalMap.map((item, idx) => (
                  <motion.button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.04, ease: "easeOut" }}
                    className="portal-card group text-left p-4 sm:p-5 bg-white border border-gray-100/80 rounded-sm premium-shadow hover:border-vumi-sky/40 hover:shadow-premium-hover flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vumi-sky"
                  >
                    <div className="space-y-2.5">
                      {/* Index + title row */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-start gap-2.5 min-w-0">
                          <span className="font-mono text-[9px] font-bold text-gray-300 leading-none pt-[3px] shrink-0 tabular-nums">
                            {item.idx}
                          </span>
                          <h4 className="font-heading text-xs font-bold text-vumi-blue uppercase tracking-wider leading-tight">
                            {item.title}
                          </h4>
                        </div>
                        <ConfidenceBadge level={item.confidence} compact />
                      </div>
                      <p className="font-sans text-[11px] text-gray-400 font-light leading-relaxed pl-[22px]">
                        {item.description}
                      </p>
                      {/* Signal readout */}
                      <div className="pl-[22px] flex items-center gap-1.5">
                        <span className="w-1 h-1 rounded-full bg-vumi-sky/50 shrink-0" />
                        <span className="font-sans text-[10px] text-vumi-sky/70 font-medium">
                          {item.signal}
                        </span>
                      </div>
                    </div>

                    {/* Explore CTA */}
                    <div className="pt-3.5 pl-[22px] flex items-center gap-1.5 text-[9px] font-heading font-bold uppercase tracking-wider text-gray-300 group-hover:text-vumi-sky transition-colors duration-200">
                      <span>Explore</span>
                      <svg
                        width="9"
                        height="9"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                        className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-150"
                      >
                        <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Active Signals Grid */}
            <div className="space-y-5">
              <SectionHeader
                eyebrow="Live Intelligence"
                headline="Top Active Market Signals"
                dek="Highest-confidence signals surfaced this week from validated evidence trails."
                border={false}
              />
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {topSignals.map((s, i) => (
                  <SignalCard key={s.id} {...s} delay={i * 0.08} />
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar — 4 cols */}
          <div className="lg:col-span-4 space-y-6 sm:space-y-8">
            <Sidebar title="Executive Summary">

              {/* KPI tiles */}
              <div className="space-y-3">
                {[
                  { label: "Target Expat Segment", value: "800,000+", sub: "Venezuelan / LATAM Hubs", positive: true },
                  { label: "Solvency II Buffer", value: "218%", sub: "Statutory minimum: 100%", positive: true },
                  { label: "Active Intel Modules", value: "9 / 9", sub: "All portals live", positive: true },
                ].map((kpi) => (
                  <motion.div
                    key={kpi.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, ease: "easeOut" }}
                    className="bg-white border border-gray-100 rounded-sm p-4 premium-shadow kpi-tile"
                  >
                    <span className="font-heading text-2xl font-bold text-vumi-blue tracking-tight block">
                      {kpi.value}
                    </span>
                    <span className="font-sans text-[10px] uppercase tracking-wider text-gray-400 font-semibold block mt-1">
                      {kpi.label}
                    </span>
                    {kpi.sub && (
                      <span className="font-sans text-[10px] text-emerald-600 font-medium block mt-0.5">
                        {kpi.sub}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* Portal Status */}
              <div className="bg-white border border-gray-100 rounded-sm premium-shadow overflow-hidden">
                <div className="px-4 py-3 border-b border-gray-50">
                  <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Portal Registry
                  </span>
                </div>
                <div className="divide-y divide-gray-50">
                  {[
                    { label: "Compliance Status", value: "Solvency II Compliant", ok: true },
                    { label: "Security Level", value: "Encrypted · Client-Only", ok: true },
                    { label: "Data Classification", value: "Confidential", ok: null },
                    { label: "Last Updated", value: "19 May 2026", ok: null },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center px-4 py-2.5 intel-row">
                      <span className="font-sans text-[11px] text-gray-400 font-light">{row.label}</span>
                      <span className={`font-heading font-bold text-[9px] uppercase tracking-wider ${
                        row.ok === true ? "text-emerald-500" : row.ok === false ? "text-rose-500" : "text-vumi-sky/70"
                      }`}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <WhatThisMeans
                title="GTM Triggers"
                points={[
                  "Focus on Salamanca, Pozuelo, and La Moraleja broker relationships.",
                  "Utilise accelerated commission tiers (up to 20% elite volume bracket).",
                  "Activate before MUFACE displacement window closes in Q3 2026.",
                ]}
              />
            </Sidebar>
          </div>

        </div>
      </div>
    </div>
  );
};
