import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DataCallout } from "../components/magazine/DataCallout";
import { BarChartMagazine } from "../components/charts/BarChartMagazine";

interface Message {
  role: "user" | "assistant";
  content: React.ReactNode;
  sources?: { title: string; type: "SQL" | "Report" | "ReMotive"; text: string }[];
}

export const AskIntelligencePage: React.FC = () => {
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
    if (!queryText.trim()) return;

    const userMsg: Message = {
      role: "user",
      content: <p className="font-sans text-sm font-semibold">{queryText}</p>,
    };

    let responseMsg: Message = {
      role: "assistant",
      content: <p>Processing query...</p>,
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

    setMessages([...messages, userMsg, responseMsg]);
    setInputVal("");
    if (responseMsg.sources) {
      setActiveSources(responseMsg.sources);
    } else {
      setActiveSources([]);
    }
  };

  return (
    <div className="min-h-[calc(100vh-130px)] flex flex-col lg:flex-row bg-vumi-pearl text-vumi-slate overflow-hidden">
      {/* Left Panel: Conversation Sessions (3 Columns on Desktop) */}
      <div className="lg:w-1/4 bg-vumi-slate text-white border-r border-white/5 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-6 text-left">
          <div className="border-b border-white/10 pb-4">
            <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-vumi-sky">
              Session History
            </h3>
          </div>
          <div className="space-y-2">
            <div className="p-3 bg-white/10 border border-white/10 rounded cursor-pointer text-xs font-semibold text-white">
              VUMI GTM Pilot Analysis
              <span className="block text-[9px] text-gray-400 font-normal mt-1">19 May 2026 • 2 queries</span>
            </div>
            <div className="p-3 hover:bg-white/5 border border-transparent hover:border-white/5 rounded cursor-pointer text-xs font-semibold text-gray-300 transition">
              MUFACE Crisis Disruption
              <span className="block text-[9px] text-gray-400 font-normal mt-1">15 May 2026 • 5 queries</span>
            </div>
            <div className="p-3 hover:bg-white/5 border border-transparent hover:border-white/5 rounded cursor-pointer text-xs font-semibold text-gray-300 transition">
              DGSFP Regulatory Gateway
              <span className="block text-[9px] text-gray-400 font-normal mt-1">10 May 2026 • 1 query</span>
            </div>
          </div>
        </div>
        
        <div className="pt-6 border-t border-white/10 text-left space-y-1">
          <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider block">Connected Query Service</span>
          <span className="text-xs font-mono font-bold text-vumi-sky">vumi-query-service-v4</span>
        </div>
      </div>

      {/* Center Panel: Active Magazine Dialogue (6 Columns on Desktop) */}
      <div className="flex-grow lg:w-2/4 p-6 md:p-8 flex flex-col justify-between overflow-y-auto space-y-6">
        <div className="space-y-6 max-w-3xl mx-auto w-full">
          <div className="border-b border-gray-100 pb-3 text-left">
            <h3 className="font-heading text-xs font-bold uppercase tracking-wider text-vumi-blue">
              Conversational Query Dialogue
            </h3>
          </div>

          <div className="space-y-6">
            <AnimatePresence>
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 items-start ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-6 border rounded-lg premium-shadow ${
                      m.role === "user"
                        ? "bg-vumi-blue text-white border-vumi-blue"
                        : "bg-white text-vumi-slate border-gray-100"
                    }`}
                  >
                    {m.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Input Interface */}
        <div className="max-w-3xl mx-auto w-full pt-8 space-y-4">
          {/* Suggestions */}
          <div className="flex flex-wrap gap-2 text-left justify-start">
            {suggestedPrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleQuery(p.query)}
                className="text-[11px] font-sans font-semibold px-3 py-1.5 bg-white hover:bg-gray-50 border border-gray-100 rounded-full premium-shadow transition duration-200"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex gap-3">
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleQuery(inputVal)}
              placeholder="Ask a strategic query..."
              className="flex-grow px-4 py-3 bg-white border border-gray-100 rounded premium-shadow text-sm font-sans focus:outline-none focus:border-vumi-sky"
            />
            <button
              onClick={() => handleQuery(inputVal)}
              className="bg-vumi-blue hover:bg-vumi-blue/90 text-white font-heading font-semibold text-sm px-6 py-3 rounded premium-shadow transition duration-200"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Citations & Database Sources (3 Columns on Desktop) */}
      <div className="lg:w-1/4 bg-gray-50 border-l border-gray-100 p-6 flex flex-col text-left overflow-y-auto shrink-0">
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h3 className="font-heading text-xs font-bold uppercase tracking-widest text-vumi-blue">
            Citations & Sources
          </h3>
        </div>

        {activeSources.length > 0 ? (
          <div className="space-y-6">
            {activeSources.map((s, idx) => (
              <div key={idx} className="bg-white p-4 border border-gray-100 rounded premium-shadow space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-heading text-[10px] font-bold text-vumi-blue truncate max-w-[70%]">
                    {s.title}
                  </span>
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded uppercase tracking-wider ${
                      s.type === "SQL"
                        ? "bg-purple-50 text-purple-700 border border-purple-100"
                        : s.type === "Report"
                        ? "bg-sky-50 text-sky-700 border border-sky-100"
                        : "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    }`}
                  >
                    {s.type}
                  </span>
                </div>
                <p className="font-sans text-[11px] text-gray-500 font-light leading-relaxed">
                  {s.text}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-center text-gray-400 space-y-2 font-sans">
            <span className="text-2xl">ⓘ</span>
            <p className="text-xs font-light max-w-[80%]">
              Ask a question to view citations, data queries, and source documents pulled in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
