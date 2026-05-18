import React from "react";
import { Hero } from "../components/magazine/Hero";
import { BarChartMagazine } from "../components/charts/BarChartMagazine";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";

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

export const BrokersPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Channel Intelligence"
        headline="20 Specialized Broker Partners Selected to Drive Premium Growth"
        dek="Our channel audit has identified and shortlisted 18 high-performing boutique brokers who command over 65% of the Venezuelan and premium international expat market share in Madrid. A targeted, tier-one onboard campaign launches in Q3 2026."
      >
        <BarChartMagazine
          title="Top Broker Partner Fit Score Ranking"
          subtitle="Composite index: Audience concentration × IPMI capability × digital readiness"
          data={brokerScores}
          xKey="score"
          yKey="name"
          source="ReMotive Media Broker Audit"
          color="#00A9E0"
        />
      </Hero>

      {/* 2. Main content grid */}
      <div className="magazine-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main content column (8 Columns) */}
          <div className="lg:col-span-8 space-y-12 text-left">
            <Section
              headline="The GTM Distribution Engine: Quality over Mass Reach"
              paragraphs={[
                "International private medical insurance (IPMI) is not a commodity bought online; it is a consultative high-trust product mediated by specialist brokers. Rather than deploying massive consumer advertising, VUMI's entry into Spain will rely on a dedicated B2B2C broker distribution engine.",
                "Out of 40+ surveyed agencies in Madrid, Barcelona, and Andalucia, we have qualified a premium shortlist of 18 boutique brokers. These firms have established, decade-long relationships with high-net-worth expat families, managing their wealth, real estate holdings, and corporate portfolios."
              ]}
              implication="By partnering with the top 5 'P0' brokers who specialize in the Venezuelan diaspora, VUMI Spain gains immediate access to a warm lead pool representing €12M+ in potential premium volume."
            />

            {/* Shortlist Table */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-vumi-blue tracking-tight">
                Shortlisted Broker Partners
              </h3>
              <div className="bg-white border border-gray-100 rounded-lg premium-shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Partner</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Segment Specialty</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Est. Volume</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Fit Index</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brokersList.map((b, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                        <td className="p-4 font-sans text-sm font-bold text-vumi-slate">{b.name}</td>
                        <td className="p-4 font-sans text-xs text-gray-500">{b.specialty}</td>
                        <td className="p-4 font-sans text-xs text-gray-600">{b.volume}</td>
                        <td className="p-4 font-sans text-xs font-bold text-vumi-blue">{b.score}/100</td>
                        <td className="p-4">
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                              b.status === "P0 Activation"
                                ? "bg-sky-50 text-vumi-blue"
                                : "bg-gray-50 text-gray-500"
                            }`}
                          >
                            {b.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
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
