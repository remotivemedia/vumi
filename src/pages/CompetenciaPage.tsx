import React from "react";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { PieChartMagazine } from "../components/charts/PieChartMagazine";
import { ScatterChartMagazine } from "../components/charts/ScatterChartMagazine";

const marketShareData = [
  { name: "Bupa Global DAC", value: 38 },
  { name: "Sanitas Premium", value: 28 },
  { name: "Adeslas Expat", value: 18 },
  { name: "DKV International", value: 10 },
  { name: "Others", value: 6 },
];

const pricingData = [
  { age: 25, premium: 110, name: "Bupa Global" },
  { age: 35, premium: 148, name: "Bupa Global" },
  { age: 45, premium: 190, name: "Bupa Global" },
  { age: 55, premium: 240, name: "Bupa Global" },

  { age: 25, premium: 85, name: "Sanitas Premium" },
  { age: 35, premium: 115, name: "Sanitas Premium" },
  { age: 45, premium: 145, name: "Sanitas Premium" },
  { age: 55, premium: 195, name: "Sanitas Premium" },

  { age: 25, premium: 75, name: "Adeslas Expat" },
  { age: 35, premium: 105, name: "Adeslas Expat" },
  { age: 45, premium: 130, name: "Adeslas Expat" },
  { age: 55, premium: 170, name: "Adeslas Expat" },

  { age: 25, premium: 80, name: "VUMI Spain (Proposed)" },
  { age: 35, premium: 110, name: "VUMI Spain (Proposed)" },
  { age: 45, premium: 135, name: "VUMI Spain (Proposed)" },
  { age: 55, premium: 180, name: "VUMI Spain (Proposed)" },
];

const featuresMatrix = [
  {
    feature: "LATAM-Optimized Family Riders",
    vumi: "✓ Fully Included",
    bupa: "✕ Local Focus Only",
    sanitas: "✕ Local Focus Only",
    adeslas: "✕ Local Focus Only",
  },
  {
    feature: "Bypass Local Network Delays",
    vumi: "✓ Dedicated Support Desks",
    bupa: "✓ Yes (Direct billing)",
    sanitas: "✕ No (Generic queues)",
    adeslas: "✕ No (Generic queues)",
  },
  {
    feature: "Direct Miami / London Referrals",
    vumi: "✓ Fully Integrated",
    bupa: "✓ Optional (High tier)",
    sanitas: "✕ Limited Coverage",
    adeslas: "✕ No Coverage",
  },
  {
    feature: "24/7 Expat Concierge Desk",
    vumi: "✓ Fully Staffed",
    bupa: "✓ Available",
    sanitas: "✕ Call center only",
    adeslas: "✕ Call center only",
  },
];

export const CompetenciaPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Competitive Intelligence"
        headline="Four Incumbents Dominate Spain's Premium IPMI Landscape"
        dek="Spain's high-net-worth expat sector is heavily concentrated under four primary incumbents led by Bupa Global. However, systemic strain on traditional hospital networks and lack of LATAM-specific benefit optimization leaves an open corridor for VUMI's premium entry."
      >
        <PieChartMagazine
          title="Premium Expat Sector Market Share"
          subtitle="Estimated allocation of high-net-worth expat portfolios"
          data={marketShareData}
          source="ReMotive Competitor Database"
        />
      </Hero>

      {/* 2. Main content */}
      <div className="magazine-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Main content column (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            <Section
              headline="IPMI Market Structure: Bupa Dominates, Local Networks Under Strain"
              paragraphs={[
                "The premium international private medical insurance (IPMI) market in Spain has historically been a comfortable oligopoly. Bupa Global DAC controls 38% of high-net-worth expat portfolios, followed closely by Sanitas (28%) and Adeslas (18%). Due to their massive local brand equity, these carriers have faced minimal disruption.",
                "However, this reliance on local capacity has exposed their vulnerability. Traditional local plans route clients through general domestic networks that are experiencing unprecedented waiting lists and administrative delays. Premium clients paying high-tier fees are increasingly frustrated with generic, local-grade services."
              ]}
              implication="VUMI Spain stands out by decoupling its premium client experience from generic local administrative queues. We offer dedicated expat desks, direct access to top private hospital clusters, and borderless travel riders."
            />

            {/* Scatter Pricing Chart */}
            <div className="bg-white p-6 border border-gray-100 rounded-lg premium-shadow">
              <ScatterChartMagazine
                title="Premium Pricing Corridor Comparison"
                subtitle="Monthly premium in Euros (€) by client age across major competitors"
                data={pricingData}
                source="Mystery Shopping & Competitor Rate Sheets (May 2026)"
              />
            </div>

            {/* Feature Comparison Matrix */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-vumi-blue tracking-tight">
                Product Feature Comparison Matrix
              </h3>
              <div className="bg-white border border-gray-100 rounded-lg premium-shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Core Feature</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-vumi-sky">VUMI Spain</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Bupa Global</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Sanitas</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Adeslas</th>
                    </tr>
                  </thead>
                  <tbody>
                    {featuresMatrix.map((f, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                        <td className="p-4 font-sans text-sm font-bold text-vumi-slate">{f.feature}</td>
                        <td className="p-4 font-sans text-xs font-bold text-vumi-blue bg-vumi-sky/5">{f.vumi}</td>
                        <td className="p-4 font-sans text-xs text-gray-500">{f.bupa}</td>
                        <td className="p-4 font-sans text-xs text-gray-500">{f.sanitas}</td>
                        <td className="p-4 font-sans text-xs text-gray-500">{f.adeslas}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Sidebar title="GTM Positioning">
              <WhatThisMeans
                title="VUMI Competitive Edge"
                points={[
                  "Optimized for LATAM: No competitor has custom-designed benefits tailored to the Venezuelan/Colombian family structures.",
                  "Premium Experience: Avoid the local administrative bottlenecks that plague Adeslas and Sanitas.",
                  "Borderless Access: Direct coordination with leading Miami and London clinics included by default.",
                ]}
              />
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
};
