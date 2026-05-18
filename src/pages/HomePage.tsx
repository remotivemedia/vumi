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

  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Executive Overview"
        headline="The Spain Blueprint: Premium Expat Market Entry Strategy"
        dek="Welcome to the VUMI Spain Strategic Intelligence Portal. This executive dashboard centralizes all demographic insights, competitor scatter matrices, regulatory solvency frameworks, and broker activation toolkits compiled for senior leadership."
      >
        <div className="space-y-4 text-left font-sans text-xs">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-vumi-sky">Portal Registry Status</span>
          <div className="p-4 bg-white/5 border border-white/10 rounded space-y-2">
            <div className="flex justify-between items-center text-white">
              <span className="font-semibold">Compliance Status</span>
              <span className="text-emerald-400 uppercase font-bold text-[10px]">Solvency II Compliant</span>
            </div>
            <div className="flex justify-between items-center text-white">
              <span className="font-semibold">Security Level</span>
              <span className="text-vumi-sky uppercase font-bold text-[10px]">Encrypted Client-Only</span>
            </div>
          </div>
        </div>
      </Hero>

      {/* 2. Main Narrative & Portal Map Grid */}
      <div className="magazine-container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">
          
          {/* Main narrative column (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            <Section
              headline="Executive Intelligence & Market Architecture"
              paragraphs={[
                "International Private Medical Insurance (IPMI) positioning in Spain requires exceptional alignment between local regulatory mandates and premium channel networks. This portal consolidates ReMotive Media's strategic findings to support executive decision-making.",
                "Select any strategic intelligence section below to explore interactive Recharts visualizations, geographic registries, Solvency II metrics, and channel toolkits."
              ]}
            />

            {/* Portal Map Grid */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-vumi-blue tracking-tight">
                Strategic Intelligence Map
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {portalMap.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => onNavigate(item.id)}
                    className="p-5 bg-white border border-gray-100 rounded-lg premium-shadow hover:border-vumi-sky transition cursor-pointer flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <h4 className="font-heading text-sm font-bold text-vumi-blue uppercase tracking-wider">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs text-gray-500 font-light leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <div className="pt-4 flex items-center text-[10px] font-heading font-bold uppercase text-vumi-sky tracking-wider">
                      Explore Section →
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Sidebar title="Executive Summary">
              <div className="grid grid-cols-1 gap-6">
                <DataCallout
                  number="800,000+"
                  label="Target Expat Segment"
                  trend={{ value: "Venezuelan / LATAM Hubs", isPositive: true }}
                />
                <DataCallout
                  number="218%"
                  label="Solvency II Statutory Buffer"
                />
              </div>

              <WhatThisMeans
                title="GTM Triggers"
                points={[
                  "Focus on Salamanca, Pozuelo, and La Moraleja broker relationships.",
                  "Utilize accelerated commission tiers (up to 20% elite volume bracket).",
                ]}
              />
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
};
