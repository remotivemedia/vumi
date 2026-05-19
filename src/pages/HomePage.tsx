import React from "react";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { DataCallout } from "../components/magazine/DataCallout";

interface HomePageProps {
  onNavigate: (tab: "audiencias" | "intelligence" | "ask" | "strategy" | "brokers" | "competencia" | "regulacion" | "pitch" | "plan") => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const portalMap = [
    {
      id: "audiencias" as const,
      title: "Audience Intel",
      description: "Expat demographics, geographic concentration hubs, and household wealth statistics.",
    },
    {
      id: "intelligence" as const,
      title: "Command Center",
      description: "Evidence logs, validated growth hypotheses, and weekly channel intelligence indicators.",
    },
    {
      id: "ask" as const,
      title: "Strategic Query",
      description: "Query databases, audit reports, and reference citations in real-time.",
    },
    {
      id: "strategy" as const,
      title: "Directive",
      description: "The Spain GTM Blueprint, actionable recommendations, and capital allocations.",
    },
    {
      id: "brokers" as const,
      title: "Channel Intel",
      description: "Boutique broker audit fit scoring and regional agency shortlists.",
    },
    {
      id: "competencia" as const,
      title: "Competition",
      description: "Incumbent market share distributions, pricing corridor scatter plots, and feature matrix.",
    },
    {
      id: "regulacion" as const,
      title: "Regulation",
      description: "Solvency II compliance guidelines, DGSFP registry status, and local licensing milestones.",
    },
    {
      id: "pitch" as const,
      title: "Pitch Playbook",
      description: "Broker marketing brochures, slide kits, and volume-based commission share tiers.",
    },
    {
      id: "plan" as const,
      title: "GTM Roadmap",
      description: "Execution sequence phases, key milestone tracking, and critical KPIs.",
    },
  ];

  const statusRows = [
    { label: "Compliance Status", value: "Solvency II Compliant", positive: true },
    { label: "Security Level", value: "Encrypted · Client-Only", positive: true },
    { label: "Data Classification", value: "Confidential", positive: false },
  ];

  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Executive Overview"
        headline="The Spain Blueprint: Premium Expat Market Entry Strategy"
        dek="Welcome to the VUMI Spain Strategic Intelligence Portal. This executive dashboard centralises demographic insights, competitor matrices, regulatory frameworks, and broker activation toolkits compiled for senior leadership."
      >
        {/* Portal Registry Status Panel */}
        <div className="space-y-4 text-left font-sans">
          <span className="font-heading font-bold text-[10px] uppercase tracking-[0.18em] text-vumi-sky">
            Portal Registry Status
          </span>
          <div className="border border-white/10 divide-y divide-white/[0.07] rounded-sm overflow-hidden">
            {statusRows.map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-center px-4 py-3 bg-white/[0.04]"
              >
                <span className="font-sans text-xs text-gray-400 font-light">{row.label}</span>
                <span
                  className={`font-heading font-bold text-[10px] uppercase tracking-wider ${
                    row.positive ? "text-emerald-400" : "text-vumi-sky"
                  }`}
                >
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Hero>

      {/* 2. Main Narrative & Portal Map Grid */}
      <div className="magazine-container py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 text-left">

          {/* Main narrative column — 8 columns */}
          <div className="lg:col-span-8 space-y-14">
            <Section
              headline="Executive Intelligence & Market Architecture"
              paragraphs={[
                "International Private Medical Insurance (IPMI) positioning in Spain requires exceptional alignment between local regulatory mandates and premium channel networks. This portal consolidates ReMotive Media's strategic findings to support executive decision-making.",
                "Select any strategic intelligence section below to explore interactive visualisations, geographic registries, Solvency II metrics, and channel toolkits.",
              ]}
            />

            {/* Portal Map Grid */}
            <div className="space-y-5">
              {/* Section heading with accent rule */}
              <div>
                <span className="section-rule" />
                <h3 className="font-heading text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
                  Strategic Intelligence Map
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {portalMap.map((item, idx) => (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className="portal-card group text-left p-5 bg-white border border-gray-100 rounded-sm premium-shadow hover:border-vumi-sky/60 hover:bg-vumi-sky/[0.02] transition-all duration-200 flex flex-col justify-between focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vumi-sky"
                  >
                    <div className="space-y-2.5">
                      {/* Index + title row */}
                      <div className="flex items-start gap-3">
                        <span className="font-mono text-[10px] font-bold text-gray-300 leading-none pt-[3px] shrink-0 tabular-nums">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <h4 className="font-heading text-sm font-bold text-vumi-blue uppercase tracking-wider leading-tight">
                          {item.title}
                        </h4>
                      </div>
                      <p className="font-sans text-xs text-gray-500 font-light leading-relaxed pl-6">
                        {item.description}
                      </p>
                    </div>

                    {/* Enter caret */}
                    <div className="pt-4 pl-6 flex items-center gap-1.5 text-[10px] font-heading font-bold uppercase tracking-wider text-vumi-sky/60 group-hover:text-vumi-sky transition-colors duration-200">
                      <span>Explore</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                        className="translate-x-0 group-hover:translate-x-0.5 transition-transform duration-150"
                      >
                        <path d="M2 5h6M5.5 2.5L8 5l-2.5 2.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar — 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <Sidebar title="Executive Summary">
              <div className="grid grid-cols-1 gap-5">
                <DataCallout
                  number="800,000+"
                  label="Target Expat Segment"
                  trend={{ value: "Venezuelan / LATAM Hubs", isPositive: true }}
                />
                <DataCallout
                  number="218%"
                  label="Solvency II Statutory Buffer"
                />
                <DataCallout
                  number="9"
                  label="Intelligence Modules Active"
                  trend={{ value: "All portals live", isPositive: true }}
                />
              </div>

              <WhatThisMeans
                title="GTM Triggers"
                points={[
                  "Focus on Salamanca, Pozuelo, and La Moraleja broker relationships.",
                  "Utilise accelerated commission tiers (up to 20% elite volume bracket).",
                ]}
              />
            </Sidebar>
          </div>

        </div>
      </div>
    </div>
  );
};
