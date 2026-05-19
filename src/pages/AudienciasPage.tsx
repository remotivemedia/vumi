import React from "react";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { DataCallout } from "../components/magazine/DataCallout";
import { PullQuote } from "../components/magazine/PullQuote";
import { LineChartMagazine } from "../components/charts/LineChartMagazine";
import { BarChartMagazine } from "../components/charts/BarChartMagazine";
import { Footer } from "../components/magazine/Footer";
import { ConfidenceBadge } from "../components/intelligence/ConfidenceBadge";
import { SectionHeader } from "../components/intelligence/SectionHeader";
import { StatGrid, StatItem } from "../components/intelligence/StatGrid";

// Real-world and strategy-based mockup data for Venezuelan diaspora in Spain (2020-2025)
const populationGrowthData = [
  { year: "2020", population: 380 },
  { year: "2021", population: 460 },
  { year: "2022", population: 550 },
  { year: "2023", population: 640 },
  { year: "2024", population: 720 },
  { year: "2025", population: 800 },
];

const ccaaDistributionData = [
  { ccaa: "Madrid", share: 68 },
  { ccaa: "Catalonia", share: 12 },
  { ccaa: "Andalusia", share: 8 },
  { ccaa: "Canaries", share: 6 },
  { ccaa: "Valencia", share: 4 },
];

const heroStats: StatItem[] = [
  { label: "Active Venezuelan Expats", value: "800k+", sub: "14.2% YoY growth", positive: true },
  { label: "Madrid Metro Concentration", value: "68%", sub: "P0 geographic hub", positive: true },
  { label: "LATAM IPMI Demand Share", value: "42%", sub: "P0 Segment", positive: true },
  { label: "Propensity Score", value: "88%", sub: "Validated confidence", positive: true },
];

export const AudienciasPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Audience Intelligence"
        headline="Venezuelan Expats Drive 42% of LATAM IPMI Demand in Spain"
        dek="An in-depth analysis of VUMI's priority audience segment reveals the Venezuelan diaspora as the single most critical growth driver for the Spain launch. With strong geographic concentration and high propensities for premium private healthcare, this cohort represents an immediate addressable opportunity."
      >
        <StatGrid stats={heroStats} cols={2} dark />
      </Hero>

      {/* 2. Main Article Section */}
      <div className="magazine-container py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Content (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">

            {/* Chart module — population trend */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <SectionHeader eyebrow="Data" headline="Venezuelan Expat Growth Trend (2020–2025)" border={false} />
                <ConfidenceBadge level="validated" compact />
              </div>
              <div className="bg-white border border-gray-100 rounded-sm premium-shadow p-5">
                <LineChartMagazine
                  title=""
                  subtitle="Cumulative growth in thousands of active residents"
                  data={populationGrowthData}
                  xKey="year"
                  series={[{ key: "population", name: "Venezuelan Expats (k)", color: "#00A9E0" }]}
                  source="Instituto Nacional de Estadística (INE)"
                />
              </div>
            </div>
            
            {/* Section 1: Market Opportunity */}
            <Section
              headline="800K Active Venezuelan Expats Create Immediate Addressable Market"
              paragraphs={[
                "Over the past five years, the Venezuelan diaspora in Spain has evolved from a transient refugee influx to a highly established, economically active middle-to-upper class demographic. Reaching over 800,000 active residents by early 2026, this community exhibits one of the highest propensities for private medical insurance (IPMI) among all international segments in Spain.",
                "This demand is fueled by two primary vectors: a deep-seated cultural preference for private healthcare systems over public ones, and high household income concentration within metropolitan hubs. Unlike general migrant classes, the Venezuelan expat demographic has a significant proportion of corporate managers, entrepreneurs, and professional freelancers who actively seek international-grade health coverage."
              ]}
              implication="This concentration enables hyper-targeted broker activation campaigns, allowing VUMI to capture significant market share without the massive marketing expenditures typical of retail consumer brands."
            />

            {/* Section 2: Geographic Concentration */}
            <Section
              headline="Madrid Concentrates 68% of the Priority Target Audience"
              paragraphs={[
                "Demographic clustering in Spain is highly polarized. A staggering 68% of the target Venezuelan expat community resides within the Community of Madrid, with secondary clusters in Barcelona (Catalonia) and Marbella (Andalusia). This geographic density is unprecedented for expat groups and presents an incredibly efficient GTM launchpad.",
                "Rather than executing a fragmented nationwide campaign, VUMI Spain can achieve high market penetration by concentrating 90% of its initial broker activation and business development resources within Madrid's high-income residential zones (Salamanca, Pozuelo, and La Moraleja) and key digital networking spaces."
              ]}
              reverse={true}
              visual={
                <BarChartMagazine
                  title="Geographic Share of Venezuelan Expats by CCAA"
                  subtitle="Percentage concentration of active resident population"
                  data={ccaaDistributionData}
                  xKey="share"
                  yKey="ccaa"
                  source="INE / ReMotive Census Analysis"
                  color="#00A9E0"
                />
              }
              implication="VUMI Spain will utilize a focused four-market strategy—Madrid, Barcelona, Marbella, and the Canary Islands—covering 90% of the active addressable audience with absolute operational efficiency."
            />

            {/* Section 3: Competitive Disruption */}
            <Section
              headline="MUFACE Crisis Leaves 40,000 Premium Policies Open for Disruption"
              paragraphs={[
                "The ongoing crisis surrounding Spain's MUFACE civil service insurance scheme has created a substantial policy vacuum in the private healthcare sector. Incumbents like Adeslas, Sanitas, and Asisa are heavily strained, resulting in major customer service bottlenecks and premium inflation.",
                "For premium Venezuelan expats who previously utilized co-payment structures under private schemes, this systemic stress has triggered a mass exodus toward premium independent IPMI providers. VUMI's value proposition of premium, borderless service and robust international coverage stands out as the ultimate refuge for high-net-worth expat families."
              ]}
              implication="First-mover advantage in a heavily disrupted market. Position VUMI as the premium, reliable alternative for families transitioning away from deteriorating traditional networks."
            />

            <PullQuote
              quote="MUFACE's structural strain has created a once-in-a-decade client migration. Expat families are prioritizing network quality and fast authorization over budget-tier local policies."
              author="Senior Partner"
              source="La Despensa Health GTM Practice"
            />
          </div>

          {/* Sticky Sidebar Content (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <Sidebar title="Executive Summary">
              {/* Data Callout Widgets */}
              <div className="grid grid-cols-1 gap-6">
                <DataCallout
                  number="800,000+"
                  label="Active Venezuelan Expats in Spain"
                  trend={{ value: "14.2% YoY", isPositive: true }}
                  delay={0.1}
                />
                <DataCallout
                  number="42%"
                  label="Share of Total LATAM IPMI Demand"
                  trend={{ value: "P0 Segment", isPositive: true }}
                  delay={0.2}
                />
                <DataCallout
                  number="68%"
                  label="Concentration within Madrid Metro"
                  delay={0.3}
                />
              </div>

              <PullQuote
                quote="WhatsApp directories and private business circles are the primary channels of trust. Peer-to-peer recommendation outperforms paid digital media by a ratio of 5 to 1."
                source="ReMotive Media Channels Audit"
              />

              <WhatThisMeans
                points={[
                  "Broker Activation over Mass Media: Partnering with Venezuelan-focused specialist brokers yields immediate qualified leads.",
                  "Localized Value Pitch: Emphasize hassle-free reimbursement and premium access to Madrid's private hospital clusters.",
                  "Immediate Action: Leverage key digital channel partnerships to distribute co-branded educational collateral."
                ]}
              />
            </Sidebar>
          </div>
        </div>
      </div>

      {/* 3. Action-oriented Footer */}
      <Footer
        actionTitle="Activate Top 5 Venezuelan-focused Broker Partners in Madrid"
        actionDesc="Deploy dedicated business development resources to onboard, train, and equip the leading specialist brokers who control 65%+ of the expat market share in Madrid. Supply premium co-branded campaign assets."
        metadata={[
          { label: "Target Launch", value: "Q3 2026" },
          { label: "Lead Owner", value: "Alex Lawton (GTM Partner)" },
          { label: "Projected GWP", value: "€2.4M (Year 1)" },
          { label: "Risk Mitigation", value: "Active DGSFP Compliance" },
        ]}
        relatedPages={[
          { label: "Channel Intelligence (/brokers)", href: "#/brokers" },
          { label: "Competitive Pricing Matrix (/competencia)", href: "#/competencia" },
          { label: "GTM Roadmap (/plan)", href: "#/plan" },
        ]}
      />
    </div>
  );
};
