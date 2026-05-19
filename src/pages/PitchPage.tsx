import React from "react";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { DataCallout } from "../components/magazine/DataCallout";
import { ConfidenceBadge } from "../components/intelligence/ConfidenceBadge";
import { SectionHeader } from "../components/intelligence/SectionHeader";
import { StatGrid, StatItem } from "../components/intelligence/StatGrid";

const commissionTierList = [
  { volume: "1 - 10 active policies", commission: "15% standard GWP share" },
  { volume: "11 - 25 active policies", commission: "18% accelerated GWP share" },
  { volume: "26+ active policies", commission: "20% elite volume trigger share" },
];

const heroStats: StatItem[] = [
  { label: "Reimbursement Guarantee", value: "48 Hrs", sub: "Market-leading standard", positive: true },
  { label: "Elite Commission Tier", value: "20%", sub: "26+ active policies", positive: true },
  { label: "Standard Commission", value: "15%", sub: "1–10 active policies", positive: true },
  { label: "Hospital Network", value: "3 Direct", sub: "Ruber, Quirónsalud, HM", positive: true },
];

export const PitchPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Broker Enablement"
        headline="Winning Expat Families: The VUMI Broker Sales Playbook"
        dek="Empower your advisory team with our high-conversion expat sales blueprint. By focusing on VUMI Spain's borderless clinic access, rapid claim reimbursement speeds, and LATAM-optimised family riders, you offer clients an unmatched medical shield."
      >
        <div className="space-y-4 text-left">
          <StatGrid stats={heroStats.slice(0, 2)} cols={2} dark />
          <div className="hairline-dark" />
          <div className="space-y-2">
            <span className="font-heading font-bold text-[10px] uppercase tracking-[0.18em] text-vumi-sky/70 block">
              Marketing Assets
            </span>
            {[
              { label: "Expat GTM Brochure (EN & ES)", meta: "PDF · 3.2MB" },
              { label: "Broker Client Presentation Kit", meta: "PPTX · 12MB" },
            ].map((a, i) => (
              <div
                key={i}
                className="flex justify-between items-center p-3 bg-white/[0.05] border border-white/10 rounded-sm hover:bg-white/10 transition cursor-pointer"
              >
                <span className="font-sans text-xs text-white font-light">{a.label}</span>
                <span className="font-heading text-[9px] font-bold text-vumi-sky uppercase tracking-wider">{a.meta}</span>
              </div>
            ))}
          </div>
        </div>
      </Hero>

      {/* 2. Main content */}
      <div className="magazine-container py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">

          {/* Main narrative column (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            <Section
              headline="The Expat Value Pitch: Direct Reimbursements & Borderless Protection"
              paragraphs={[
                "Expat clients are highly sensitive to administrative stress. Traditional Spanish insurers mandate convoluted pre-authorizations and complex copayment systems that frustrate clients. VUMI Spain completely redesigns this experience.",
                "Our value proposition focuses on borderless accessibility: direct billing coordination in top private hospitals (Ruber, Quirónsalud, HM Hospitales), direct reimbursement processing under 48 hours, and global travel medical riders (referrals to top Miami and London specialist clinics included by default)."
              ]}
              implication="Position VUMI as the premium, hassle-free shield that protects the family's health, wherever they travel."
            />

            {/* Commission Accelerators */}
            <div className="space-y-5">
              <SectionHeader
                eyebrow="Commercial Terms"
                headline="Commission Tier & Volume Accelerators"
                dek="VUMI Spain rewards premium brokers with robust standard compensation models and highly attractive volume accelerations based on active policy thresholds."
              />
              <div className="space-y-3">
                {commissionTierList.map((c, i) => (
                  <div
                    key={i}
                    className="bg-white border border-gray-100 rounded-sm premium-shadow p-4 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] font-bold text-gray-300 tabular-nums shrink-0">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="font-sans text-sm font-semibold text-vumi-slate">{c.volume}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-heading text-sm font-bold text-vumi-sky">{c.commission}</span>
                      {i === commissionTierList.length - 1 && (
                        <ConfidenceBadge level="validated" label="Elite" compact />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Sidebar title="Broker Toolkit">
              <div className="grid grid-cols-1 gap-6">
                <DataCallout
                  number="48 Hrs"
                  label="Reimbursement Guarantee"
                  trend={{ value: "Market Leader", isPositive: true }}
                />
                <DataCallout
                  number="20%"
                  label="Elite Commission Tier"
                />
              </div>

              <WhatThisMeans
                title="Winning Sales Triggers"
                points={[
                  "Ask about Miami/London travel frequency: Use global travel referrals as the primary closing factor.",
                  "Focus on child/elderly family riders: Highlight VUMI's highly customizable multi-country family structures.",
                ]}
              />
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
};
