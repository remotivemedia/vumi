import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HomePage } from "./pages/HomePage";
import { AudienciasPage } from "./pages/AudienciasPage";
import { IntelligencePage } from "./pages/IntelligencePage";
import { AskIntelligencePage } from "./pages/AskIntelligencePage";
import { StrategyPage } from "./pages/StrategyPage";
import { BrokersPage } from "./pages/BrokersPage";
import { CompetenciaPage } from "./pages/CompetenciaPage";
import { RegulacionPage } from "./pages/RegulacionPage";
import { PitchPage } from "./pages/PitchPage";
import { PlanPage } from "./pages/PlanPage";
import "./styles/magazine.css";

type Tab = "home" | "audiencias" | "intelligence" | "ask" | "strategy" | "brokers" | "competencia" | "regulacion" | "pitch" | "plan";

function App() {
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleString("es-ES", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Europe/Madrid",
        }) + " CET"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { id: "home" as Tab, label: "Overview" },
    { id: "audiencias" as Tab, label: "Audience Intel" },
    { id: "intelligence" as Tab, label: "Command Center" },
    { id: "ask" as Tab, label: "Strategic Query" },
    { id: "strategy" as Tab, label: "Directive" },
    { id: "brokers" as Tab, label: "Channel Intel" },
    { id: "competencia" as Tab, label: "Competition" },
    { id: "regulacion" as Tab, label: "Regulation" },
    { id: "pitch" as Tab, label: "Pitch Playbook" },
    { id: "plan" as Tab, label: "GTM Roadmap" },
  ];

  const renderActivePage = () => {
    switch (activeTab) {
      case "home":
        return <HomePage onNavigate={(tab) => setActiveTab(tab)} />;
      case "audiencias":
        return <AudienciasPage />;
      case "intelligence":
        return <IntelligencePage />;
      case "ask":
        return <AskIntelligencePage />;
      case "strategy":
        return <StrategyPage />;
      case "brokers":
        return <BrokersPage />;
      case "competencia":
        return <CompetenciaPage />;
      case "regulacion":
        return <RegulacionPage />;
      case "pitch":
        return <PitchPage />;
      case "plan":
        return <PlanPage />;
      default:
        return <HomePage onNavigate={(tab) => setActiveTab(tab)} />;
    }
  };

  const signalMarquee = [
    "Active Signal: MUFACE strain driving +18% premium expat enquiry MoM",
    "Validated: Venezuelan propensity for private insurance — 88% confidence",
    "Intelligence Updated: 19 May 2026 · 09:14 CET",
    "Broker Audit: 18 shortlisted · P0 activation in progress",
    "Solvency II Buffer: 218% · DGSFP Compliant",
  ];

  return (
    <div className="min-height-svh bg-vumi-pearl flex flex-col justify-between font-sans">
      {/* Premium Header Frame */}
      <header className="bg-vumi-slate text-white sticky top-0 z-50" style={{ boxShadow: "0 1px 0 rgba(0,169,224,0.14), 0 6px 24px rgba(0,0,0,0.3)" }}>

        {/* Cinematic top accent line */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-vumi-sky/60 to-transparent" />

        {/* Signal marquee strip */}
        <div className="border-b border-white/[0.06] bg-black/20 overflow-hidden">
          <div className="magazine-container flex items-center gap-3 py-1.5">
            <span className="font-heading text-[9px] font-bold uppercase tracking-[0.18em] text-vumi-sky/70 shrink-0 hidden sm:inline">
              LIVE INTEL
            </span>
            <span className="w-px h-3 bg-white/10 shrink-0 hidden sm:inline-block" />
            <div className="overflow-hidden flex-1 relative">
              <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={{ x: ["0%", "-50%"] }}
                transition={{ duration: 40, ease: "linear", repeat: Infinity }}
              >
                {[...signalMarquee, ...signalMarquee].map((s, i) => (
                  <span key={i} className="font-sans text-[10px] text-gray-400 shrink-0">
                    <span className="text-vumi-sky/50 mr-1.5">&#9670;</span>
                    {s}
                  </span>
                ))}
              </motion.div>
            </div>
            <div className="hidden md:flex items-center gap-1.5 shrink-0 font-mono text-[10px] text-gray-500 ml-3">
              <span className="w-1 h-1 rounded-full bg-emerald-400/70 status-pulse" />
              <span>{currentTime}</span>
            </div>
          </div>
        </div>

        {/* Wordmark & identity row */}
        <div className="magazine-container flex flex-row justify-between items-center gap-3 pt-3 pb-2.5">
          <div className="text-left space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-heading font-semibold text-[9px] uppercase tracking-[0.2em] text-white/30 truncate">
                ReMotive Media &times; La Despensa
              </span>
            </div>
            <h1 className="font-heading text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-none">
              <span className="text-vumi-sky">VUMI</span>
              <span className="text-white/20 font-light mx-2">/</span>
              <span className="font-light text-white/70 hidden sm:inline text-sm sm:text-base md:text-lg">Spain Strategic Intelligence</span>
              <span className="font-light text-white/70 sm:hidden text-sm">Spain Intel</span>
            </h1>
          </div>

          {/* Confidentiality badge */}
          <div className="hidden sm:flex items-center gap-1.5 font-heading text-[9px] font-bold uppercase tracking-widest text-vumi-sky/50 border border-vumi-sky/15 bg-vumi-sky/[0.04] px-3 py-1.5 rounded-sm shrink-0">
            <span className="w-1 h-1 rounded-full bg-vumi-sky/50 shrink-0" />
            Confidential &middot; Client Only
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="magazine-container">
          <nav className="flex border-t border-white/[0.06] overflow-x-auto nav-scroll" aria-label="Portal navigation">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-tab-btn relative py-2.5 px-3 sm:px-4 font-heading text-[10px] font-bold uppercase tracking-widest transition duration-200 shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vumi-sky focus-visible:ring-inset rounded-sm ${
                    isActive ? "text-vumi-sky" : "text-white/30 hover:text-white/70"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-vumi-sky"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Main Page Layout Wrapper */}
      <main className="flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
