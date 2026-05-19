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

  return (
    <div className="min-height-svh bg-vumi-pearl flex flex-col justify-between font-sans">
      {/* Premium Header Frame */}
      <header className="bg-vumi-slate text-white border-b border-white/5 sticky top-0 z-50" style={{ boxShadow: "0 1px 0 rgba(0,169,224,0.12), 0 4px 20px rgba(0,0,0,0.25)" }}>
        <div className="magazine-container flex flex-row justify-between items-center gap-3 pt-3.5 pb-2.5">
          <div className="text-left space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span className="font-heading font-semibold text-[10px] uppercase tracking-[0.18em] text-vumi-sky/80 truncate">
                ReMotive Media &times; La Despensa
              </span>
            </div>
            <h1 className="font-heading text-base sm:text-lg md:text-xl font-bold tracking-tight text-white leading-tight">
              <span className="text-vumi-sky">VUMI</span>
              <span className="text-white/30 font-light mx-1.5">/</span>
              <span className="font-light text-gray-300 hidden sm:inline">Spain Strategic Intelligence</span>
              <span className="font-light text-gray-300 sm:hidden">Spain Intel</span>
            </h1>
          </div>

          {/* Live clock — hidden on very small screens */}
          <div className="hidden xs:flex items-center gap-2 font-mono text-[11px] text-gray-500 border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 rounded-sm shrink-0">
            <span className="w-1 h-1 rounded-full bg-emerald-400/60" />
            <span>{currentTime}</span>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="magazine-container">
          <nav className="flex border-t border-white/5 overflow-x-auto nav-scroll">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`nav-tab-btn relative py-3 px-3.5 sm:px-4 font-heading text-[11px] font-semibold uppercase tracking-widest transition duration-200 shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vumi-sky focus-visible:ring-inset rounded-sm ${
                    isActive ? "text-vumi-sky" : "text-gray-500 hover:text-gray-200"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-vumi-sky"
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
