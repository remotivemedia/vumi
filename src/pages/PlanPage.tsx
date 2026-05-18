import React from "react";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";

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

export const PlanPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="GTM Roadmap"
        headline="90-Day Soft Launch: Broker-Led, LATAM-First, Data-Proven"
        dek="Our strategic timeline outlines an iterative, low-risk approach to Spain market entry. By focusing resources heavily on high-yield expat corridors first, we build active cash flows and validated operational pipelines before launching nationwide."
      >
        <div className="space-y-3 text-left font-sans text-xs">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-vumi-sky">GTM Target Checklist</span>
          <div className="space-y-2 pt-1">
            <div className="flex justify-between py-1.5 border-b border-white/5 text-gray-200">
              <span>DGSFP Regulatory Filings</span>
              <span className="font-bold text-emerald-400">✓ Completed</span>
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
