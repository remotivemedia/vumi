import React from "react";
import { Hero } from "../components/magazine/Hero";
import { BarChartMagazine } from "../components/charts/BarChartMagazine";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { ConfidenceBadge } from "../components/intelligence/ConfidenceBadge";
import { SectionHeader } from "../components/intelligence/SectionHeader";
import { IntelligenceTable, Column } from "../components/intelligence/IntelligenceTable";
import { ProgressBar } from "../components/intelligence/ProgressBar";
import { StatGrid, StatItem } from "../components/intelligence/StatGrid";

// Strategy based data for 5 key broker partners
const brokerScores = [
  { name: "Seguros Expats", score: 94 },
  { name: "Madrid Premium", score: 88 },
  { name: "Iberian Wealth", score: 85 },
  { name: "LATAM Advisors", score: 81 },
  { name: "Canarias Broker", score: 74 },
];

const brokersList = [
  {
    name: "Seguros Expats Madrid",
    specialty: "Venezuelan & Colombian HNW",
    volume: "High",
    readiness: "Ready (Q3 2026)",
    score: 94,
    status: "P0 Activation",
  },
  {
    name: "Madrid Premium Wealth",
    specialty: "International Corporate Accounts",
    volume: "High",
    readiness: "Onboarding",
    score: 88,
    status: "P0 Activation",
  },
  {
    name: "Iberian Care Partners",
    specialty: "LATAM Expats (Broad)",
    volume: "Medium",
    readiness: "Shortlisted",
    score: 85,
    status: "P1 Onboarding",
  },
  {
    name: "Canarias Expat Advisors",
    specialty: "Medical Insurance Specialist",
    volume: "Medium",
    readiness: "Initial Contact",
    score: 74,
    status: "P1 Onboarding",
  },
];

interface BrokerRow {
  name: string;
  specialty: string;
  volume: string;
  score: number;
  status: string;
}

const brokerColumns: Column<BrokerRow>[] = [
  {
    key: "name",
    label: "Partner",
    render: (row) => <span className="font-sans text-sm font-bold text-vumi-slate">{row.name}</span>,
  },
  {
    key: "specialty",
    label: "Segment Specialty",
    render: (row) => <span className="font-sans text-xs text-gray-500 font-light">{row.specialty}</span>,
  },
  {
    key: "volume",
    label: "Volume",
    width: "80px",
    render: (row) => <span className="font-sans text-xs text-gray-600">{row.volume}</span>,
  },
  {
    key: "score",
    label: "Fit Index",
    width: "130px",
    render: (row) => (
      <div className="space-y-1 min-w-[80px]">
        <span className="font-heading text-xs font-bold text-vumi-blue">{row.score}/100</span>
        <ProgressBar value={row.score} height="thin" color="#00A9E0" />
      </div>
    ),
  },
  {
    key: "status",
    label: "Status",
    width: "120px",
    render: (row) => (
      <ConfidenceBadge
        level={row.status === "P0 Activation" ? "validated" : "strong"}
        label={row.status}
        compact
      />
    ),
  },
];

const heroStats: StatItem[] = [
  { label: "Audited Agencies", value: "40+", sub: "Across Madrid, BCN, Andalucia" },
  { label: "Shortlisted Brokers", value: "18", sub: "P0 & P1 tiers", positive: true },
  { label: "P0 Top Fit Score", value: "94 / 100", sub: "Seguros Expats", positive: true },
  { label: "Addressable GWP", value: "€12M+", sub: "Via top 5 partners", positive: true },
];

export const BrokersPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Channel Intelligence"
        headline="18 Specialist Broker Partners Selected to Drive Premium Growth"
        dek="Our channel audit has identified and shortlisted 18 high-performing boutique brokers who command over 65% of the Venezuelan and premium international expat market share in Madrid. A targeted, tier-one onboard campaign launches in Q3 2026."
      >
        <StatGrid stats={heroStats} cols={2} dark />
      </Hero>

      {/* 2. Main content grid */}
      <div className="magazine-container py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main content column (8 Columns) */}
          <div className="lg:col-span-8 space-y-12 text-left">

            {/* Fit score chart */}
            <div className="space-y-4">
              <SectionHeader eyebrow="Ranking" headline="Broker Fit Score Index" dek="Composite index: audience concentration × IPMI capability × digital readiness." border={false} />
              <div className="bg-white border border-gray-100 rounded-sm premium-shadow p-5">
                <BarChartMagazine
                  title=""
                  subtitle="Score out of 100"
                  data={brokerScores}
                  xKey="score"
                  yKey="name"
                  source="ReMotive Media Broker Audit"
                  color="#00A9E0"
                />
              </div>
            </div>

            <Section
              headline="The GTM Distribution Engine: Quality over Mass Reach"
              paragraphs={[
                "International private medical insurance (IPMI) is not a commodity bought online; it is a consultative high-trust product mediated by specialist brokers. Rather than deploying massive consumer advertising, VUMI's entry into Spain will rely on a dedicated B2B2C broker distribution engine.",
                "Out of 40+ surveyed agencies in Madrid, Barcelona, and Andalucia, we have qualified a premium shortlist of 18 boutique brokers. These firms have established, decade-long relationships with high-net-worth expat families, managing their wealth, real estate holdings, and corporate portfolios."
              ]}
              implication="By partnering with the top 5 'P0' brokers who specialise in the Venezuelan diaspora, VUMI Spain gains immediate access to a warm lead pool representing €12M+ in potential premium volume."
            />

            {/* Shortlist Table — upgraded */}
            <div className="space-y-5">
              <SectionHeader eyebrow="Shortlist" headline="Shortlisted Broker Partners" border={false} />
              <IntelligenceTable
                columns={brokerColumns}
                rows={brokersList}
                zebra
              />
            </div>
          </div>

          {/* Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <Sidebar title="Broker Playbook">
              <WhatThisMeans
                title="Activation Roadmap"
                points={[
                  "Tier 1 Integrations (Q3 2026): Onboard Seguros Expats and Madrid Premium. Equip their reps with VUMI portal credentials.",
                  "Commission incentives: Introduce standard premium GWP triggers and volume accelerators.",
                  "Marketing Collateral: Produce co-branded digital brochures focusing on local hospital access.",
                ]}
              />
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
};
