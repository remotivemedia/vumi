import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DataCallout } from "../components/magazine/DataCallout";
import { BarChartMagazine } from "../components/charts/BarChartMagazine";
import { ConfidenceBadge } from "../components/intelligence/ConfidenceBadge";
import { SourceStatusIndicator } from "../components/intelligence/SourceStatusIndicator";

interface Message {
  role: "user" | "assistant";
  content: React.ReactNode;
  sources?: { title: string; type: "SQL" | "Report" | "ReMotive"; text: string }[];
}

export const AskIntelligencePage: React.FC = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: (
        <div className="space-y-4 text-left font-sans">
          <p className="drop-cap text-base font-light leading-relaxed">
            Welcome to the VUMI Spain Strategic Query portal. Access active marketing databases, Solvency II records, and geographic intelligence on target sectors.
          </p>
          <p className="text-sm font-light text-gray-500">
            Ask me anything about expat audiences, competitors, live hypotheses, regulatory requirements, or broker partnerships.
          </p>
        </div>
      ),
    },
  ]);
  const [activeSources, setActiveSources] = useState<{ title: string; type: string; text: string }[]>([]);
  const [inputVal, setInputVal] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const suggestedPrompts = [
    {
      label: "What is the sizing of the Venezuelan expat segment in Spain?",
      query: "Venezuelan expat sizing and concentration",
    },
    {
      label: "Show me our active hypotheses with confidence levels.",
      query: "Active GTM hypotheses confidence",
    },
    {
      label: "List the top broker partners and their fit scores.",
      query: "Boutique broker partner fit scores",
    },
  ];

  const handleQuery = (queryText: string) => {
    if (!queryText.trim() || isTyping) return;

    const userMsg: Message = {
      role: "user",
      content: <p className="font-sans text-sm font-semibold">{queryText}</p>,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal("");
    setIsTyping(true);

    let responseMsg: Message = {
      role: "assistant",
      content: <p className="font-sans text-xs text-gray-400">Processing query...</p>,
    };

    if (queryText.toLowerCase().includes("venezuelan") || queryText.toLowerCase().includes("sizing")) {
      responseMsg = {
        role: "assistant",
        content: (
          <div className="space-y-6 text-left font-sans">
            <h3 className="font-heading text-xl font-bold text-vumi-blue leading-tight tracking-tight">
              Venezuelan Diaspora: 800,000 Expats Command 42% of LATAM IPMI Demand
            </h3>
            <p className="drop-cap text-sm font-light leading-relaxed text-vumi-slate">
              Analysis of live demographic registries confirms the Venezuelan expat community has grown to over 800,000 residents in Spain by 2026. This cohort stands out as the single most critical growth driver due to their high household income concentration within major metropolitan zones.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <DataCallout number="800,000+" label="Active Venezuelan Expats" />
              <DataCallout number="68%" label="Madrid Metro Concentration" />
            </div>
            <p className="text-sm font-light leading-relaxed text-vumi-slate">
              Geographic clustering is heavily polarized: 68% of the target community resides within the Community of Madrid, followed by Catalonia (12%) and Andalusia (8%).
            </p>
          </div>
        ),
        sources: [
          {
            title: "INE Expat Demographics Census 2025",
            type: "Report",
            text: "Official statistics from the National Institute of Statistics (INE) detailing cumulative Spanish residency certificates issued to Venezuelan nationals from 2020-2025.",
          },
          {
            title: "SELECT * FROM vumi_audience_segments",
            type: "SQL",
            text: "Queried demographic database. Returned 34 segments, identifying Venezuelan Expats as P0 priority.",
          },
        ],
      };
    } else if (queryText.toLowerCase().includes("hypotheses") || queryText.toLowerCase().includes("confidence")) {
      responseMsg = {
        role: "assistant",
        content: (
          <div className="space-y-6 text-left font-sans">
            <h3 className="font-heading text-xl font-bold text-vumi-blue leading-tight tracking-tight">
              GTM Strategic Hypotheses Audit: 8/10 Validated
            </h3>
            <p className="drop-cap text-sm font-light leading-relaxed text-vumi-slate">
              We are actively monitoring 10 core go-to-market hypotheses. Eight have been successfully validated through empirical broker surveys and consumer surveys.
            </p>
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="font-semibold text-vumi-slate">H-01: Venezuelan Private Insurance propensity</span>
                <span className="text-emerald-600 font-bold">Validated (88%)</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="font-semibold text-vumi-slate">H-02: MUFACE strain conversions</span>
                <span className="text-sky-600 font-bold">Strong Signal (76%)</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="font-semibold text-vumi-slate">H-03: Colombian cohort expansion</span>
                <span className="text-amber-600 font-bold">Emerging (52%)</span>
              </div>
            </div>
          </div>
        ),
        sources: [
          {
            title: "SELECT * FROM vumi_strategic_hypotheses",
            type: "SQL",
            text: "Database pull from active hypotheses registry. Identified 10 records with confidence scoring.",
          },
        ],
      };
    } else if (queryText.toLowerCase().includes("broker") || queryText.toLowerCase().includes("partners")) {
      responseMsg = {
        role: "assistant",
        content: (
          <div className="space-y-6 text-left font-sans">
            <h3 className="font-heading text-xl font-bold text-vumi-blue leading-tight tracking-tight">
              Boutique Broker Shortlist: 18 Qualified Agencies
            </h3>
            <p className="drop-cap text-sm font-light leading-relaxed text-vumi-slate">
              Out of 40+ surveyed agencies in Madrid, Barcelona, and Marbella, we have shortlisted 18 boutique brokers specializing in high-net-worth expats. The top two P0 brokers (Seguros Expats and Madrid Premium) command over 35% of the addressable expat portfolio.
            </p>
            <div className="h-[220px]">
              <BarChartMagazine
                title="Broker Fit Scores"
                data={[
                  { name: "Seguros Expats", score: 94 },
                  { name: "Madrid Premium", score: 88 },
                  { name: "Iberian Wealth", score: 85 },
                ]}
                xKey="score"
                yKey="name"
                source="ReMotive Broker Audits"
              />
            </div>
          </div>
        ),
        sources: [
          {
            title: "SELECT * FROM vumi_brokers",
            type: "SQL",
            text: "Database query pulling all 20 registered brokers, filtered by shortlist flag = true.",
          },
          {
            title: "ReMotive Expat Channel Audit 2025",
            type: "ReMotive",
            text: "Methodology report evaluating broker digital readiness and historical LATAM policy volumes.",
          },
        ],
      };
    } else {
      responseMsg = {
        role: "assistant",
        content: (
          <div className="space-y-4 text-left font-sans">
            <p className="text-sm font-light text-vumi-slate">
              Query processed. No direct database records matching "{queryText}" found.
            </p>
            <p className="text-xs text-gray-400">
              Try asking one of our suggested strategic prompts below.
            </p>
          </div>
        ),
      };
    }

    // Simulate a brief async delay for UX realism
    setTimeout(() => {
      setMessages((prev) => [...prev, responseMsg]);
      setIsTyping(false);
      if (responseMsg.sources) {
        setActiveSources(responseMsg.sources);
      } else {
        setActiveSources([]);
      }
    }, 600);
  };

  const sessionHistory = [
    { label: "VUMI GTM Pilot Analysis", date: "19 May 2026", count: 2, active: true },
    { label: "MUFACE Crisis Disruption", date: "15 May 2026", count: 5, active: false },
    { label: "DGSFP Regulatory Gateway", date: "10 May 2026", count: 1, active: false },
  ];

  return (
    <div className="min-h-[calc(100vh-140px)] flex flex-col lg:flex-row bg-vumi-pearl text-vumi-slate overflow-hidden">

      {/* Left panel — session history */}
      <div className="lg:w-64 xl:w-72 bg-vumi-slate text-white border-r border-white/[0.05] flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-white/[0.07]">
          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-vumi-sky">
            Session History
          </span>
        </div>
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {sessionHistory.map((s, i) => (
            <button
              key={i}
              className={`w-full text-left p-3 rounded-sm transition-colors duration-150 ${
                s.active
                  ? "bg-white/10 border border-white/10"
                  : "hover:bg-white/[0.04] border border-transparent"
              }`}
            >
              <span className="font-sans text-xs font-semibold text-white block leading-snug">{s.label}</span>
              <span className="font-mono text-[9px] text-gray-500 block mt-0.5">{s.date} &middot; {s.count} {s.count === 1 ? "query" : "queries"}</span>
            </button>
          ))}
        </div>
        <div className="px-5 py-4 border-t border-white/[0.07] space-y-1">
          <span className="font-heading text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Query Service</span>
          <span className="font-mono text-[10px] font-bold text-vumi-sky">vumi-query-service-v4</span>
          <div className="flex items-center gap-1.5 mt-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 status-pulse" />
            <span className="font-sans text-[9px] text-gray-500">Connected</span>
          </div>
        </div>
      </div>

      {/* Centre panel — dialogue */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Panel header */}
        <div className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-vumi-blue">
            Strategic Query Dialogue
          </span>
          <ConfidenceBadge level="validated" label="Live Data" compact />
        </div>

        {/* Messages scroll area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-5">
          <AnimatePresence>
            {messages.map((m, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex items-start gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {m.role === "assistant" && (
                  <div className="w-7 h-7 rounded-sm bg-vumi-blue/10 border border-vumi-blue/15 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="font-heading text-[8px] font-bold text-vumi-blue">V</span>
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-5 rounded-sm premium-shadow ${
                    m.role === "user"
                      ? "bg-vumi-blue text-white"
                      : "bg-white text-vumi-slate border border-gray-100"
                  }`}
                >
                  {m.content}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="flex items-start gap-3"
              >
                <div className="w-7 h-7 rounded-sm bg-vumi-blue/10 border border-vumi-blue/15 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="font-heading text-[8px] font-bold text-vumi-blue">V</span>
                </div>
                <div className="bg-white border border-gray-100 rounded-sm p-4 premium-shadow flex items-center gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="w-1.5 h-1.5 rounded-full bg-vumi-sky/50"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, delay: i * 0.2, repeat: Infinity }}
                    />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <div className="bg-white border-t border-gray-100 px-6 py-4 space-y-3 shrink-0">
          {/* Suggested prompts */}
          <div className="flex flex-wrap gap-2">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleQuery(p.query)}
                disabled={isTyping}
                className="font-sans text-[11px] font-semibold px-3 py-1.5 bg-gray-50 hover:bg-vumi-sky/5 border border-gray-100 hover:border-vumi-sky/30 rounded-sm transition duration-150 disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vumi-sky"
              >
                {p.label}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleQuery(inputVal)}
              placeholder="Ask a strategic query..."
              aria-label="Strategic query input"
              className="flex-grow px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-sm text-sm font-sans focus:outline-none focus:border-vumi-sky focus:bg-white transition duration-150"
            />
            <button
              onClick={() => handleQuery(inputVal)}
              disabled={isTyping || !inputVal.trim()}
              className="bg-vumi-blue hover:bg-vumi-blue/90 disabled:opacity-40 text-white font-heading font-bold text-[11px] uppercase tracking-wider px-5 py-2.5 rounded-sm transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vumi-sky"
            >
              Query
            </button>
          </div>
        </div>
      </div>

      {/* Right panel — citations */}
      <div className="lg:w-64 xl:w-72 bg-gray-50 border-l border-gray-100 flex flex-col shrink-0">
        <div className="px-5 py-4 border-b border-gray-100">
          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-vumi-blue">
            Citations & Sources
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeSources.length > 0 ? (
            activeSources.map((s, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="bg-white p-4 border border-gray-100 rounded-sm premium-shadow space-y-2"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className="font-heading text-[10px] font-bold text-vumi-blue leading-snug">
                    {s.title}
                  </span>
                  <SourceStatusIndicator type={s.type as "SQL" | "Report" | "ReMotive"} />
                </div>
                <p className="font-sans text-[11px] text-gray-500 font-light leading-relaxed">
                  {s.text}
                </p>
              </motion.div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center h-48 text-center space-y-3">
              <div className="w-10 h-10 rounded-sm border border-gray-200 flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <circle cx="8" cy="8" r="6" stroke="#CBD5E1" strokeWidth="1.2" />
                  <path d="M8 5v4M8 10.5v.5" stroke="#CBD5E1" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
              </div>
              <p className="font-sans text-xs text-gray-400 font-light max-w-[80%] leading-relaxed">
                Source citations and data queries will appear here after each response.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
