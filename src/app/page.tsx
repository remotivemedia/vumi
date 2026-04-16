"use client";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onMouse = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("scroll", onScroll);
    window.addEventListener("mousemove", onMouse);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMouse); };
  }, []);

  const pillars = [
    {
      glyph: "◈",
      color: "#00E5FF",
      title: "Knowledge Graph",
      body: "700+ expert conversations, 250+ podcasts, a decade of human-AI dialogue — transformed into a living, queryable intelligence layer.",
    },
    {
      glyph: "◉",
      color: "#FF2D9B",
      title: "Humanised Intelligence",
      body: "AI that knows where it came from. Built on real science, real culture, real people — not retrofitted hype.",
    },
    {
      glyph: "◍",
      color: "#FFE500",
      title: "Collective Memory",
      body: "Every insight, framework and discovery your organisation has ever generated — recalled instantly, connected permanently.",
    },
    {
      glyph: "◎",
      color: "#00FF88",
      title: "Contextual Agents",
      body: "Purpose-built agents that reason over your specific knowledge base. Not generic. Not hallucinating. Yours.",
    },
  ];

  const stats = [
    { value: "700+", label: "Expert Sessions" },
    { value: "250+", label: "Deep Podcasts" },
    { value: "500K+", label: "Organic Views" },
    { value: "6+", label: "Years Pre-GPT" },
  ];

  const timeline = [
    { year: "2019", event: "La Pipa Hackspace — Open Source AI & Robotics for Humans" },
    { year: "2020", event: "Humanised Intelligence Framework — Data by Design" },
    { year: "2021", event: "Business Leaders Think Tank Series — 13 events" },
    { year: "2022", event: "Data Clean Rooms & Privacy Architecture deep dives" },
    { year: "2023", event: "Spanish Ministry of Justice — AI Impact on Society" },
    { year: "2026", event: "VUMI — The knowledge becomes the platform" },
  ];

  return (
    <main style={{ background: "#060A14", color: "#F0F4FF", fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif", overflowX: "hidden" }}>

      {/* ── GLOBAL FONT IMPORT ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --navy: #060A14;
          --cyan: #00E5FF;
          --magenta: #FF2D9B;
          --yellow: #FFE500;
          --green: #00FF88;
          --white: #F0F4FF;
          --muted: rgba(240,244,255,0.45);
        }

        html { scroll-behavior: smooth; }

        .syne { font-family: 'Syne', sans-serif; }
        .mono { font-family: 'JetBrains Mono', monospace; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; }
          50%       { opacity: 1; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg) translateX(180px) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(180px) rotate(-360deg); }
        }
        @keyframes scanline {
          from { transform: translateY(-100%); }
          to   { transform: translateY(100vh); }
        }
        @keyframes ticker {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }

        .fade-up { animation: fadeUp 0.8s ease forwards; opacity: 0; }
        .d1 { animation-delay: 0.1s; }
        .d2 { animation-delay: 0.25s; }
        .d3 { animation-delay: 0.4s; }
        .d4 { animation-delay: 0.55s; }
        .d5 { animation-delay: 0.7s; }

        .pillar-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 16px;
          padding: 36px 32px;
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
          cursor: default;
        }
        .pillar-card:hover {
          background: rgba(255,255,255,0.06);
          transform: translateY(-6px);
        }

        .glow-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 36px;
          border-radius: 999px;
          font-family: 'Syne', sans-serif;
          font-size: 15px;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          text-decoration: none;
          transition: all 0.25s;
          cursor: pointer;
          border: none;
        }
        .btn-primary {
          background: var(--cyan);
          color: var(--navy);
          box-shadow: 0 0 32px rgba(0,229,255,0.35);
        }
        .btn-primary:hover {
          box-shadow: 0 0 48px rgba(0,229,255,0.6);
          transform: translateY(-2px);
        }
        .btn-ghost {
          background: transparent;
          color: var(--white);
          border: 1.5px solid rgba(240,244,255,0.25);
        }
        .btn-ghost:hover {
          border-color: var(--cyan);
          color: var(--cyan);
        }

        .stat-card {
          text-align: center;
          padding: 32px 24px;
          border-radius: 16px;
          background: rgba(0,229,255,0.04);
          border: 1px solid rgba(0,229,255,0.12);
        }

        .timeline-item {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          position: relative;
          padding-bottom: 32px;
        }
        .timeline-item::before {
          content: '';
          position: absolute;
          left: 47px;
          top: 40px;
          bottom: 0;
          width: 1px;
          background: linear-gradient(to bottom, rgba(0,229,255,0.3), transparent);
        }
        .timeline-item:last-child::before { display: none; }

        .nav-link {
          color: rgba(240,244,255,0.6);
          text-decoration: none;
          font-size: 14px;
          font-weight: 500;
          transition: color 0.2s;
        }
        .nav-link:hover { color: var(--cyan); }

        input, textarea {
          width: 100%;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 10px;
          padding: 14px 18px;
          color: var(--white);
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          outline: none;
          transition: border-color 0.2s;
        }
        input:focus, textarea:focus { border-color: var(--cyan); }
        input::placeholder, textarea::placeholder { color: rgba(240,244,255,0.3); }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "64px",
        background: scrollY > 40 ? "rgba(6,10,20,0.92)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
        borderBottom: scrollY > 40 ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 22, fontFamily: "'Syne', sans-serif", fontWeight: 800, letterSpacing: "-0.02em", color: "#F0F4FF" }}>
            V<span style={{ color: "#00E5FF" }}>U</span>MI
          </span>
          <span className="mono" style={{ fontSize: 10, color: "rgba(0,229,255,0.6)", marginTop: 2, letterSpacing: "0.1em" }}>BETA</span>
        </div>
        <div style={{ display: "flex", gap: 36 }}>
          <a href="#platform" className="nav-link">Platform</a>
          <a href="#story" className="nav-link">Story</a>
          <a href="#pillars" className="nav-link">Pillars</a>
          <a href="#access" className="nav-link">Early Access</a>
        </div>
        <a href="#access" className="glow-btn btn-primary" style={{ padding: "10px 24px", fontSize: 13 }}>
          Request Access
        </a>
      </nav>

      {/* ── HERO ── */}
      <section ref={heroRef} style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden" }}>

        {/* Radial atmosphere */}
        <div style={{
          position: "absolute", inset: 0,
          background: `
            radial-gradient(ellipse 80% 60% at 20% 50%, rgba(0,229,255,0.12) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 80% 30%, rgba(255,45,155,0.1) 0%, transparent 55%),
            radial-gradient(ellipse 50% 40% at 50% 80%, rgba(255,229,0,0.06) 0%, transparent 50%)
          `,
        }} />

        {/* Mouse-reactive glow */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,229,255,0.06), transparent 50%)`,
          transition: "background 0.1s",
        }} />

        {/* Scanline */}
        <div style={{
          position: "absolute", left: 0, right: 0, height: "1px",
          background: "linear-gradient(to right, transparent, rgba(0,229,255,0.4), transparent)",
          animation: "scanline 8s linear infinite",
          opacity: 0.4,
        }} />

        {/* Orbit dot */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          width: 6, height: 6, borderRadius: "50%",
          background: "#00E5FF",
          animation: "orbit 12s linear infinite",
          opacity: 0.5,
        }} />

        {/* Grid */}
        <div style={{
          position: "absolute", inset: 0, opacity: 0.04,
          backgroundImage: "linear-gradient(rgba(0,229,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 1100, margin: "0 auto", padding: "120px 48px 80px" }}>

          {/* Badge */}
          <div className="fade-up d1 mono" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            padding: "8px 16px", borderRadius: 999,
            border: "1px solid rgba(0,229,255,0.3)",
            background: "rgba(0,229,255,0.06)",
            fontSize: 12, letterSpacing: "0.12em", color: "#00E5FF",
            marginBottom: 36,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00E5FF", animation: "glowPulse 2s ease infinite", display: "inline-block" }} />
            KNOWLEDGE INFRASTRUCTURE · 2026
          </div>

          {/* Headline */}
          <h1 className="syne fade-up d2" style={{
            fontSize: "clamp(52px, 8vw, 100px)",
            fontWeight: 800,
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            marginBottom: 32,
          }}>
            Your knowledge.<br />
            <span style={{
              background: "linear-gradient(135deg, #00E5FF 0%, #FF2D9B 50%, #FFE500 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>Finally alive.</span>
          </h1>

          {/* Sub */}
          <p className="fade-up d3" style={{
            fontSize: "clamp(16px, 2vw, 20px)",
            color: "rgba(240,244,255,0.6)",
            maxWidth: 560,
            lineHeight: 1.65,
            marginBottom: 48,
          }}>
            VUMI turns years of expert conversations, research, and institutional knowledge into a living AI that thinks the way your organisation does.
            Built on 6+ years of human-AI work — before the hype.
          </p>

          {/* CTAs */}
          <div className="fade-up d4" style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="#access" className="glow-btn btn-primary">
              <span>Request Early Access</span>
              <span style={{ fontSize: 18 }}>→</span>
            </a>
            <a href="#story" className="glow-btn btn-ghost">
              Our Story
            </a>
          </div>

          {/* Stats bar */}
          <div className="fade-up d5" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            gap: 1, marginTop: 80,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 16, overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            {stats.map((s, i) => (
              <div key={i} style={{
                padding: "24px 20px", textAlign: "center",
                background: "rgba(6,10,20,0.7)",
                borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}>
                <div className="syne" style={{ fontSize: 32, fontWeight: 800, color: "#00E5FF", letterSpacing: "-0.02em" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "rgba(240,244,255,0.45)", marginTop: 4, letterSpacing: "0.06em" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TICKER ── */}
      <div style={{
        borderTop: "1px solid rgba(0,229,255,0.15)",
        borderBottom: "1px solid rgba(0,229,255,0.15)",
        padding: "14px 0", overflow: "hidden",
        background: "rgba(0,229,255,0.03)",
      }}>
        <div style={{ display: "flex", animation: "ticker 30s linear infinite", whiteSpace: "nowrap" }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} className="mono" style={{ display: "flex", gap: 0 }}>
              {["KNOWLEDGE GRAPH", "HUMANISED AI", "EXPERT CONVERSATIONS", "LIVING MEMORY", "CONTEXTUAL AGENTS", "INSTITUTIONAL INTELLIGENCE", "HUMAN-AI COLLABORATION", "BUILT PRE-GPT"].map((item, j) => (
                <span key={j} style={{ color: "rgba(0,229,255,0.5)", fontSize: 12, letterSpacing: "0.15em", padding: "0 48px" }}>
                  {item} <span style={{ color: "rgba(0,229,255,0.2)" }}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ── PLATFORM SECTION ── */}
      <section id="platform" style={{ padding: "120px 48px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "#FF2D9B", marginBottom: 16 }}>THE PLATFORM</div>
            <h2 className="syne" style={{ fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.02em", marginBottom: 24 }}>
              Intelligence that<br />knows your context
            </h2>
            <p style={{ color: "rgba(240,244,255,0.55)", lineHeight: 1.75, fontSize: 17, marginBottom: 32 }}>
              Most AI tools start from zero every conversation. VUMI starts from everything you've ever learned. Your interviews, your research, your frameworks — ingested, connected, and ready to reason.
            </p>
            <p style={{ color: "rgba(240,244,255,0.55)", lineHeight: 1.75, fontSize: 17 }}>
              The result is an AI that sounds like your best expert on their best day — because it's trained on exactly that.
            </p>
          </div>

          {/* Visual diagram */}
          <div style={{ position: "relative", height: 380 }}>
            <svg viewBox="0 0 400 380" style={{ width: "100%", height: "100%" }}>
              {/* Center node */}
              <circle cx="200" cy="190" r="48" fill="rgba(0,229,255,0.08)" stroke="rgba(0,229,255,0.4)" strokeWidth="1.5" />
              <text x="200" y="185" textAnchor="middle" fill="#00E5FF" fontFamily="'Syne', sans-serif" fontWeight="800" fontSize="14">VUMI</text>
              <text x="200" y="202" textAnchor="middle" fill="rgba(0,229,255,0.6)" fontFamily="'JetBrains Mono', monospace" fontSize="10">CORE</text>

              {/* Satellite nodes */}
              {[
                { x: 80, y: 60, label: "Video", color: "#00E5FF" },
                { x: 330, y: 60, label: "Audio", color: "#FF2D9B" },
                { x: 50, y: 280, label: "Research", color: "#FFE500" },
                { x: 340, y: 270, label: "Events", color: "#00FF88" },
                { x: 200, y: 330, label: "Docs", color: "#00E5FF" },
              ].map((node, i) => (
                <g key={i}>
                  <line x1="200" y1="190" x2={node.x} y2={node.y} stroke={`${node.color}30`} strokeWidth="1" strokeDasharray="4 4" />
                  <circle cx={node.x} cy={node.y} r="26" fill={`${node.color}12`} stroke={`${node.color}50`} strokeWidth="1" />
                  <text x={node.x} y={node.y + 4} textAnchor="middle" fill={node.color} fontFamily="'JetBrains Mono', monospace" fontSize="11">{node.label}</text>
                </g>
              ))}

              {/* Pulse rings */}
              <circle cx="200" cy="190" r="70" fill="none" stroke="rgba(0,229,255,0.08)" strokeWidth="1">
                <animate attributeName="r" from="55" to="120" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.3" to="0" dur="3s" repeatCount="indefinite" />
              </circle>
            </svg>
          </div>
        </div>
      </section>

      {/* ── PILLARS ── */}
      <section id="pillars" style={{ padding: "0 48px 120px", maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "#00E5FF", marginBottom: 16 }}>FOUR PILLARS</div>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em" }}>
            What VUMI is built on
          </h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {pillars.map((p, i) => (
            <div key={i} className="pillar-card" style={{ borderColor: `${p.color}20` }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.color}50`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${p.color}20`)}>
              <div style={{ fontSize: 36, color: p.color, marginBottom: 20, lineHeight: 1 }}>{p.glyph}</div>
              <h3 className="syne" style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: "#F0F4FF" }}>{p.title}</h3>
              <p style={{ color: "rgba(240,244,255,0.5)", lineHeight: 1.7, fontSize: 15 }}>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── STORY / TIMELINE ── */}
      <section id="story" style={{ padding: "80px 48px 120px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
          <div>
            <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "#FFE500", marginBottom: 16 }}>THE STORY</div>
            <h2 className="syne" style={{ fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.1, marginBottom: 24 }}>
              We didn't discover AI in 2023.
            </h2>
            <p style={{ color: "rgba(240,244,255,0.55)", lineHeight: 1.8, fontSize: 16, marginBottom: 20 }}>
              Since 2019, the team behind VUMI has been at the frontier of human-AI collaboration — running hackspaces, think tanks, AI conferences, and deep technical sessions with researchers from DeepMind, NASA, Google, and Microsoft.
            </p>
            <p style={{ color: "rgba(240,244,255,0.55)", lineHeight: 1.8, fontSize: 16 }}>
              VUMI is the product of that work. Not a pivot. Not a rebrand. The knowledge base we've been building since before ChatGPT — finally becoming a platform.
            </p>
          </div>

          <div>
            {timeline.map((item, i) => (
              <div key={i} className="timeline-item">
                <div style={{
                  minWidth: 56, height: 56, borderRadius: "50%",
                  border: i === timeline.length - 1 ? "1.5px solid #00E5FF" : "1px solid rgba(255,255,255,0.12)",
                  background: i === timeline.length - 1 ? "rgba(0,229,255,0.1)" : "rgba(255,255,255,0.03)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span className="mono" style={{
                    fontSize: 11, fontWeight: 500,
                    color: i === timeline.length - 1 ? "#00E5FF" : "rgba(240,244,255,0.4)",
                    letterSpacing: "0.04em",
                  }}>{item.year}</span>
                </div>
                <div style={{ paddingTop: 14 }}>
                  <p style={{
                    fontSize: 14, lineHeight: 1.6,
                    color: i === timeline.length - 1 ? "rgba(240,244,255,0.85)" : "rgba(240,244,255,0.45)",
                    fontWeight: i === timeline.length - 1 ? 500 : 400,
                  }}>{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EARLY ACCESS ── */}
      <section id="access" style={{
        padding: "100px 48px",
        background: "linear-gradient(135deg, rgba(0,229,255,0.06) 0%, rgba(255,45,155,0.04) 50%, rgba(255,229,0,0.03) 100%)",
        borderTop: "1px solid rgba(255,255,255,0.06)",
      }}>
        <div style={{ maxWidth: 600, margin: "0 auto", textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 11, letterSpacing: "0.2em", color: "#00FF88", marginBottom: 16 }}>EARLY ACCESS</div>
          <h2 className="syne" style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: 20 }}>
            Be first in the room.
          </h2>
          <p style={{ color: "rgba(240,244,255,0.5)", lineHeight: 1.75, fontSize: 17, marginBottom: 48 }}>
            VUMI is in private beta. We're onboarding a small number of organisations who want to build knowledge infrastructure that actually thinks.
          </p>

          <form onSubmit={(e) => e.preventDefault()} style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "left" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <input type="text" placeholder="First name" />
              <input type="text" placeholder="Organisation" />
            </div>
            <input type="email" placeholder="Work email" />
            <textarea rows={3} placeholder="What knowledge are you sitting on?" style={{ resize: "vertical" }} />
            <button type="submit" className="glow-btn btn-primary" style={{ alignSelf: "stretch", justifyContent: "center", marginTop: 8 }}>
              Request Access →
            </button>
          </form>

          <p style={{ marginTop: 20, fontSize: 13, color: "rgba(240,244,255,0.25)" }}>
            No spam. We read every submission personally.
          </p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "48px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexWrap: "wrap", gap: 24,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span className="syne" style={{ fontSize: 20, fontWeight: 800, color: "#F0F4FF" }}>
            V<span style={{ color: "#00E5FF" }}>U</span>MI
          </span>
          <span style={{ color: "rgba(240,244,255,0.2)", fontSize: 13 }}>by ReMotive Media</span>
        </div>
        <div style={{ display: "flex", gap: 32 }}>
          <a href="#platform" className="nav-link">Platform</a>
          <a href="#story" className="nav-link">Story</a>
          <a href="#access" className="nav-link">Access</a>
        </div>
        <div className="mono" style={{ fontSize: 12, color: "rgba(240,244,255,0.25)" }}>
          © 2026 ReMotive Media · Madrid
        </div>
      </footer>

    </main>
  );
}
