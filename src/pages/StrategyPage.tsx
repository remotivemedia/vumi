import React from "react";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { DataCallout } from "../components/magazine/DataCallout";
import { PullQuote } from "../components/magazine/PullQuote";
import { BarChartMagazine } from "../components/charts/BarChartMagazine";
import { Footer } from "../components/magazine/Footer";
import { SectionHeader } from "../components/intelligence/SectionHeader";
import { StatGrid, StatItem } from "../components/intelligence/StatGrid";

const budgetAllocation = [
  { segment: "Broker BD & Enablement", budget: 45 },
  { segment: "Private Networks Integration", budget: 25 },
  { segment: "Expat Community Co-branding", budget: 15 },
  { segment: "Compliance & Legal (DGSFP)", budget: 10 },
  { segment: "General Admin", budget: 5 },
];

const heroStats: StatItem[] = [
  { label: "Year 1 GWP Potential", value: "€12M", sub: "P0 focus only", positive: true },
  { label: "Phase 1 Capital", value: "€120k", sub: "Madrid pilot budget", positive: true },
  { label: "Madrid Validation Phase", value: "90 Days", sub: "Before Phase 2 expansion" },
  { label: "Shortlisted Active Brokers", value: "18", sub: "P0 + P1 tiers", positive: true },
];

export const StrategyPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Strategic Directive"
        headline="The Spain Blueprint: Broker-Led, LATAM-First GTM Recommendation"
        dek="Our comprehensive go-to-market recommendation for VUMI Europe's entry into the Spain premium private healthcare market. By targeting high-net-worth Latin American expats through specialist broker partnerships, we bypass legacy incumbents with maximum capital efficiency."
      >
        <StatGrid stats={heroStats} cols={2} dark />
      </Hero>

      {/* 2. Main Content Grid */}
      <div className="magazine-container py-10 sm:py-14">

        {/* Budget allocation chart */}
        <div className="mb-10 space-y-4">
          <SectionHeader eyebrow="Capital Allocation" headline="GTM Budget Allocation — Phase 1" dek="Distribution of initial €120,000 pilot capital across activation channels." border={false} />
          <div className="bg-white border border-gray-100 rounded-sm premium-shadow p-5">
            <BarChartMagazine
              title=""
              subtitle="Percentage of Phase 1 budget"
              data={budgetAllocation}
              xKey="budget"
              yKey="segment"
              source="ReMotive GTM Capital Proposal"
              color="#00A9E0"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Main Article column (8 Columns) */}
          <div className="lg:col-span-8 space-y-12 text-left">
            
            {/* Section 1: Market Opportunity */}
            <Section
              headline="The €12M Prize: Capturing Spain's Premium Expat Insurance Core"
              paragraphs={[
                "Spain's premium private medical insurance (IPMI) sector is one of Europe's most lucrative, yet highly static markets. Over the last five years, a major shift has occurred: high-income expats from Latin America (specifically Venezuela, Colombia, and Mexico) have concentrated in Spain's urban centers, creating a €12,000,000 Gross Written Premium (GWP) potential within the first 12 months.",
                "This demographic does not buy insurance through online comparison portals or general corporate plans. They seek boutique, borderless international-grade healthcare coverage, making them the ultimate addressable target for VUMI Spain's premium value proposition."
              ]}
              implication="We recommend bypassing general retail consumers completely. Target the high-net-worth LATAM expat community directly through hyper-focused distribution networks."
            />

            {/* Section 2: Channel Prioritization */}
            <Section
              headline="Broker-First, Dark Social Second, Mass Media Last"
              paragraphs={[
                "Distribution is the primary bottleneck for new insurance entrants. Mass media advertising is too diluted, while digital search bidding is highly inflated. The ultimate channel of trust for premium expats is the specialized boutique broker.",
                "Our recommendation is to focus 70% of acquisition budget on onboarding the 18 shortlisted brokers who already control the target segments. Secondary channels should leverage 'dark social' spaces—invite-only private WhatsApp networks, country-specific chamber events, and expat business roundtables."
              ]}
              reverse={true}
              implication="Building a friction-free portal and premium marketing toolkits for brokers is a 10x higher yield action than running generic Google Ads or social campaigns."
            />

            {/* Section 3: Four-Market Phasing */}
            <Section
              headline="Madrid Core First, Coastal Clusters Second, Islands Last"
              paragraphs={[
                "Geographic expansion must be strictly phased to protect cash flows. Due to the unprecedented concentration of our P0 audience (68% of premium Venezuelan expats reside in Madrid), we recommend establishing a flawless operational blueprint in Madrid during Phase 1.",
                "Once local network direct billing, claims reimbursement times, and broker satisfaction scores are proven in the capital, Phase 2 will scale the playbook to Barcelona (Catalonia) and Marbella (Andalusia). Phase 3 will expand to Tenerife and Las Palmas (Canaries)."
              ]}
              implication="Limit initial operations to Madrid for the first 90 days. Resolve all customer support and local network bottlenecks before deploying regional staff."
            />

            <PullQuote
              quote="To win the Spain market, VUMI does not need to compete with local retail giants. We need to be the undisputed premium provider for the top 5% HNW expats who require absolute borderless security."
              author="Alex Lawton"
              source="Managing Partner, ReMotive Media"
            />
          </div>

          {/* Sidebar (4 Columns) */}
          <div className="lg:col-span-4 space-y-8">
            <Sidebar title="GTM Matrix">
              <div className="grid grid-cols-1 gap-6">
                <DataCallout
                  number="€12M"
                  label="Year 1 GWP Potential"
                  trend={{ value: "P0 Focus", isPositive: true }}
                />
                <DataCallout
                  number="90 Days"
                  label="Madrid Validation Phase"
                />
                <DataCallout
                  number="18"
                  label="Shortlisted Active Brokers"
                />
              </div>

              <WhatThisMeans
                title="Measurement Gates"
                points={[
                  "Gate 1 (Month 1): Sign partnership agreements with top 5 Madrid P0 brokers.",
                  "Gate 2 (Month 3): Process first 200 premium expat policies with zero claims delays.",
                  "Gate 3 (Month 6): Launch Phase 2 regional expansion in Barcelona and Marbella.",
                ]}
              />
            </Sidebar>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <Footer
        actionTitle="Approve GTM Blueprint and Deploy Pilot Capital"
        actionDesc="Authorize the immediate release of Phase 1 marketing and broker enablement capital. Establish local coordination offices in Madrid."
        metadata={[
          { label: "Timeline", value: "Q3 2026 Launch" },
          { label: "Investment", value: "€120,000 (Phase 1)" },
          { label: "Target GWP", value: "€2.4M (Year 1 Pilot)" },
          { label: "Lead Agency", value: "ReMotive Media" },
        ]}
        relatedPages={[
          { label: "Audience Analysis (/audiencias)", href: "#/audiencias" },
          { label: "Command Center (/intelligence)", href: "#/intelligence" },
        ]}
      />
    </div>
  );
};
