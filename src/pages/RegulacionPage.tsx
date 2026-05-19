import React from "react";
import { Hero } from "../components/magazine/Hero";
import { Section } from "../components/magazine/Section";
import { Sidebar, WhatThisMeans } from "../components/magazine/Sidebar";
import { DataCallout } from "../components/magazine/DataCallout";
import { StatGrid, StatItem } from "../components/intelligence/StatGrid";
import { ProgressBar } from "../components/intelligence/ProgressBar";

const complianceTimeline = [
  { item: "Solvency II Passporting Filing", status: "Approved", date: "April 2026" },
  { item: "Spain Local Entity Registration", status: "Completed", date: "May 2026" },
  { item: "ISO/IEC 27001 & SOC 2 Security Audits", status: "Completed", date: "May 2026" },
  { item: "GDPR Localized Data Architecture", status: "Completed", date: "May 2026" },
];

const heroStats: StatItem[] = [
  { label: "Solvency II Capital Ratio", value: "218%", sub: "Required minimum: 100%", positive: true },
  { label: "Data Encryption", value: "AES-256", sub: "End-to-end mandate", positive: true },
  { label: "Compliance Milestones", value: "4 / 4", sub: "All completed", positive: true },
  { label: "GDPR Status", value: "Compliant", sub: "EU multi-zone hosting", positive: true },
];

export const RegulacionPage: React.FC = () => {
  return (
    <div className="space-y-0 bg-vumi-pearl">
      {/* 1. Hero Section */}
      <Hero
        badge="Regulatory Compliance"
        headline="Solvency and Stability: Navigating Spain's DGSFP Framework"
        dek="VUMI Europe operates in strict compliance with the Dirección General de Seguros y Fondos de Pensiones (DGSFP) and European Solvency II directives. Our passported cross-border operations guarantee absolute safety and regulatory coverage for high-net-worth expat clients."
      >
        <div className="space-y-4 text-left">
          <StatGrid stats={heroStats.slice(0, 2)} cols={2} dark />
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-sans text-[11px] text-gray-300 font-light">Solvency II Capital Ratio</span>
              <span className="font-heading text-xs font-bold text-vumi-sky">218%</span>
            </div>
            <ProgressBar value={90} height="medium" color="#00A9E0" />
            <div className="flex justify-between font-sans text-[9px] text-gray-500">
              <span>Required (100%)</span>
              <span>VUMI Buffer (218%)</span>
            </div>
          </div>
        </div>
      </Hero>

      {/* 2. Main content */}
      <div className="magazine-container py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 text-left">

          {/* Certification grid at top of main col — merged with section below */}
          
          {/* Main narrative column (8 Columns) */}
          <div className="lg:col-span-8 space-y-12">
            <Section
              headline="The solider Regulatory Shield: Solvency II and European Passporting"
              paragraphs={[
                "Entering the European insurance market requires meeting strict solvency and consumer protection thresholds. VUMI Europe leverages EU cross-border freedom of service provisions, passporting our comprehensive international health license directly under Solvency II capital requirements.",
                "This model provides VUMI with dual advantages: institutional solvency standards supervised by primary EU regulatory boards, combined with operational agility. Unlike local retail insurers weighed down by legacy retail obligations, VUMI maintains a streamlined risk pool reserved exclusively for high-tier premium niches."
              ]}
              implication="Clients receive institutional-grade protection. In a highly volatile private health market, VUMI's 218% solvency buffer stands as a testament to absolute financial stability."
            />

            {/* GDPR & Patient Data */}
            <Section
              headline="GDPR Patient Portal Compliance: Multi-Cluster Data Security"
              paragraphs={[
                "Private healthcare demands the absolute highest standards of data privacy. VUMI's client management system is built in strict compliance with the General Data Protection Regulation (GDPR), hosting patient medical records and diagnostic files in highly encrypted, localized EU servers.",
                "All broker communication pipelines, document transmissions, and authorization portals utilize end-to-end AES-256 encryption. We ensure that premium expat medical claims, doctor referrals, and medical histories remain strictly confidential."
              ]}
              reverse={true}
              implication="Brokers can confidently onboard high-net-worth corporate families, knowing VUMI exceeds standard GDPR compliance mandates for sensitive health data."
            />

            {/* Security Certifications Grid */}
            <div className="space-y-6 pt-4">
              <h3 className="font-heading text-lg font-bold text-vumi-blue tracking-tight">
                Enterprise Privacy & Security Architecture
              </h3>
              <p className="font-sans text-sm text-gray-500 font-light leading-relaxed">
                VUMI Spain's data storage and transaction systems utilize a premier, certified enterprise infrastructure, providing maximum assurance across global standards:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-white border border-gray-100 rounded premium-shadow space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-heading text-xs font-bold text-vumi-blue uppercase tracking-wider">ISO/IEC 27001</span>
                  </div>
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                    Certified Information Security Management System (ISMS) protecting asset accessibility and data integrity.
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-100 rounded premium-shadow space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-heading text-xs font-bold text-vumi-blue uppercase tracking-wider">SOC 2 Type II</span>
                  </div>
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                    Independently audited operational standards ensuring strict confidentiality, availability, and security.
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-100 rounded premium-shadow space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-heading text-xs font-bold text-vumi-blue uppercase tracking-wider">GDPR Compliant</span>
                  </div>
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                    Full data protection framework with localized EU multi-zone hosting and active customer deletion protocols.
                  </p>
                </div>
                <div className="p-4 bg-white border border-gray-100 rounded premium-shadow space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="font-heading text-xs font-bold text-vumi-blue uppercase tracking-wider">HIPAA Security Standard</span>
                  </div>
                  <p className="font-sans text-xs text-gray-400 font-light leading-relaxed">
                    Meets US national administrative, physical, and technical standards for protecting private health data.
                  </p>
                </div>
              </div>
            </div>

            {/* Compliance timeline checklist */}
            <div className="space-y-6">
              <h3 className="font-heading text-xl font-bold text-vumi-blue tracking-tight">
                Spain Compliance Milestones
              </h3>
              <div className="bg-white border border-gray-100 rounded-lg premium-shadow overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100">
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Milestone</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Date Completed</th>
                      <th className="p-4 font-heading text-xs font-bold uppercase text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {complianceTimeline.map((c, i) => (
                      <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                        <td className="p-4 font-sans text-sm font-bold text-vumi-slate">{c.item}</td>
                        <td className="p-4 font-sans text-xs text-gray-400">{c.date}</td>
                        <td className="p-4">
                          <span
                            className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                              c.status === "Approved" || c.status === "Completed"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-sky-50 text-vumi-blue"
                            }`}
                          >
                            {c.status}
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
            <Sidebar title="Compliance Blueprint">
              <div className="grid grid-cols-1 gap-6">
                <DataCallout
                  number="218%"
                  label="Solvency II Capital Ratio"
                  trend={{ value: "Regulatory Buffer", isPositive: true }}
                />
                <DataCallout
                  number="AES-256"
                  label="Data Encryption Mandate"
                />
              </div>

              <WhatThisMeans
                title="Compliance Audits"
                points={[
                  "Solvency II Audits: Quarterly internal stress testing ensures VUMI Europe holds capital reserves exceeding twice the required statutory buffer.",
                  "DGSFP Guidelines: Active local legal counsel continuously monitors and updates local broker terms.",
                ]}
              />
            </Sidebar>
          </div>
        </div>
      </div>
    </div>
  );
};
