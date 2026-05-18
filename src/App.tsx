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
    { id: "home" as Tab, label: "Home" },
    { id: "audiencias" as Tab, label: "Audience Intel (/audiencias)" },
    { id: "intelligence" as Tab, label: "Command Center (/intelligence)" },
    { id: "ask" as Tab, label: "Strategic Query (/intelligence/ask)" },
    { id: "strategy" as Tab, label: "Directive (/strategy)" },
    { id: "brokers" as Tab, label: "Channel Intel (/brokers)" },
    { id: "competencia" as Tab, label: "Competition (/competencia)" },
    { id: "regulacion" as Tab, label: "Regulation (/regulacion)" },
    { id: "pitch" as Tab, label: "Pitch Playbook (/pitch)" },
    { id: "plan" as Tab, label: "GTM Roadmap (/plan)" },
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
      <header className="bg-vumi-slate text-white border-b border-vumi-blue/10 py-5 sticky top-0 z-50 premium-shadow">
        <div className="magazine-container flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-left space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-heading font-bold text-xs uppercase tracking-widest text-vumi-sky">
                ReMotive Media × La Despensa
              </span>
            </div>
            <h1 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              VUMI<span className="text-vumi-sky">®</span> Spain — Strategic Intelligence Portal
            </h1>
          </div>
          
          {/* Metadata Badges & Time */}
          <div className="flex flex-wrap items-center gap-3 font-sans text-xs">
            <span className="px-2.5 py-1 bg-white/5 border border-white/10 text-gray-400 font-mono font-semibold rounded">
              {currentTime}
            </span>
          </div>
        </div>

        {/* Tabbed Navigation Bar */}
        <div className="magazine-container mt-6">
          <nav className="flex flex-wrap border-b border-white/10 gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative py-3 px-4 font-heading text-xs font-semibold uppercase tracking-wider transition duration-300 shrink-0 ${
                    isActive ? "text-vumi-sky" : "text-gray-400 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-vumi-sky"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
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
