import React from "react";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { DataCallout } from "../components/magazine/DataCallout";

const commissionTierList = [
  { volume: "1 - 10 active policies", commission: "15% standard GWP share" },
  { volume: "11 - 25 active policies", commission: "18% accelerated GWP share" },
  { volume: "26+ active policies", commission: "20% elite volume trigger share" },
];

export const PitchPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Broker Enablement"
        headline="Winning Expat Families: The VUMI Broker Sales Playbook"
        dek="Empower your advisory team with our high-conversion expat sales blueprint. By focusing on VUMI Spain's borderless clinic access, rapid claim reimbursement speeds, and LATAM-optimized family riders, you offer clients an unmatched medical shield."
      >
        <div className="space-y-4 text-left font-sans text-xs">
          <span className="font-heading font-bold text-xs uppercase tracking-wider text-vumi-sky">Marketing Material Assets</span>
          <div className="grid grid-cols-1 gap-2 pt-2">
            <a
              href="#/download-brochure"
              className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center hover:bg-white/10 transition cursor-pointer"
            >
              <span className="text-white font-semibold">Expat GTM Brochure (English & Spanish)</span>
              <span className="text-vumi-sky uppercase font-bold text-[10px]">PDF • 3.2MB</span>
            </a>
            <a
              href="#/download-kit"
              className="p-3 bg-white/5 border border-white/10 rounded flex justify-between items-center hover:bg-white/10 transition cursor-pointer"
            >
              <span className="text-white font-semibold">Broker Client Presentation Kit</span>
              <span className="text-vumi-sky uppercase font-bold text-[10px]">PPTX • 12MB</span>
            </a>
          </div>
        </div>
      </Hero>

      {/* 2. Main content */}
      <div className="magazine-container py-12">
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
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-vumi-blue tracking-tight">
                Commission Tier & Volume Accelerators
              </h3>
              <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
                VUMI Spain rewards premium brokers with robust standard compensation models and highly attractive volume accelerations based on active policy thresholds.
              </p>
              <div className="bg-white border border-gray-100 rounded-lg premium-shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Volume Bracket</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">GWP Share Tier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {commissionTierList.map((c, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                        <td className="p-4 font-sans text-sm font-bold text-vumi-slate">{c.volume}</td>
                        <td className="p-4 font-sans text-xs text-vumi-blue font-semibold">{c.commission}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
