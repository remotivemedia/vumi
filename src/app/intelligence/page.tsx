"use client";
import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   VUMI® Europe — Spain Command Center
   Strategic Intelligence Portal · Build 2.0
   Architecture: native Next.js React page (replaces Supabase edge-function proxy)
   Sources: corpus 01–08 + brand book | Numerical metrics: Supabase only (flagged)
──────────────────────────────────────────────────────────────────────────────*/

const COLORS = {
  trust:   "#0033A0",
  sky:     "#00A9E0",
  slate:   "#2C3539",
  pearl:   "#F5F7FA",
  white:   "#FFFFFF",
  border:  "#E2E8F0",
  muted:   "#6B7785",
  red:     "#DC2626",
  amber:   "#D97706",
  green:   "#16A34A",
  navy:    "#001A6E",
};

const F = {
  heading: "'Montserrat', 'Helvetica Neue', Arial, sans-serif",
  body:    "'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif",
};

// ── Types ────────────────────────────────────────────────────────────────────

type StatusLevel = "BLOQUEANTE" | "ATENCIÓN" | "OK" | "PENDIENTE";

interface Signal {
  level: StatusLevel;
  label: string;
  detail: string;
}

interface Segment {
  id: string;
  pop: string;
  label: string;
  size: string;
  priority: string;
  insight: string;
  trigger: string;
  ccaa: string;
  color: string;
}

interface Competitor {
  name: string;
  tope: string;
  red: string;
  precio: string;
  passport: string;
  vantaja: string;
}

interface BrokerTier {
  tier: string;
  nombres: string[];
  accion: string;
}

interface RoadmapWeek {
  semanas: string;
  fase: string;
  items: string[];
  owner: string;
}

// ── Data (corpus-sourced, no hallucination) ──────────────────────────────────

const SIGNALS: Signal[] = [
  {
    level: "BLOQUEANTE",
    label: "DGSFP — Inscripción no confirmada",
    detail: "VUMI Insurance Europe Ltd. (Malta, C 112852) no aparece en la lista BdE de 18-mar-2026. Confirmación en apps.dgsfp.mineco.es pendiente. Bloquea toda activación media orientada a visados.",
  },
  {
    level: "ATENCIÓN",
    label: "Pricing IPMI — Mystery shopping pendiente",
    detail: "Sin cotizaciones comparativas sistematizadas para los 3 perfiles clave (35 años Madrid / familia Barcelona / HNW Marbella). Necesario para definir price corridor.",
  },
  {
    level: "ATENCIÓN",
    label: "Rating de solvencia — No publicado",
    detail: "Ni A.M. Best ni ratio SCR (SFCR maltés) disponibles públicamente. Contexto MUFACE hace que brokers sofisticados soliciten este dato activamente.",
  },
  {
    level: "OK",
    label: "Pasaporte europeo (Solvencia II) — Marco claro",
    detail: "Proceso LPS MFSA → DGSFP documentado. Plazo estándar: 2 meses tras notificación. Marco operativo sólido una vez confirmada inscripción.",
  },
  {
    level: "OK",
    label: "Canal broker — Receptor confirmado",
    detail: "Corredurías mid-market buscan alternativa tras retirada DKV de MUFACE. Asociaciones Adecose, Aunna, Espabrok/Cojebro con >400 corredurías representadas.",
  },
  {
    level: "PENDIENTE",
    label: "Delegado comercial España — ¿Físico o remoto?",
    detail: "Factor decisivo para activación canal broker. Sin presencia física, las corredurías pequeñas no activan contrato. Respuesta interna pendiente.",
  },
];

const SEGMENTS: Segment[] = [
  {
    id: "VEN",
    pop: "Venezuela",
    label: "Profesional venezolano con historial de cobertura privada",
    size: "+330.000 residentes en España (2024)",
    priority: "PRIORIDAD 1",
    insight: "Perfil de alta disposición a pago: formación universitaria, ingresos medios-altos, experiencia previa con IPMI. Concentración en Madrid y Barcelona (Usera, Barajas, L'Hospitalet). Visa no lucrativa, reagrupamiento familiar y residencia larga, generan demanda estable.",
    trigger: "Renovación de permiso / nueva familia en España / querer clínica de libre elección",
    ccaa: "Madrid · Cataluña · Comunitat Valenciana",
    color: "#FFD700",
  },
  {
    id: "MEX",
    pop: "México",
    label: "Profesional altamente cualificado y nómada digital",
    size: "+90.000 residentes (crecimiento +18% 2022–2024)",
    priority: "PRIORIDAD 2",
    insight: "Segmento con mayor proyección de crecimiento. Combinación de ingresos altos y baja cobertura local contratada. Visa Nómada Digital (Ley 28/2022) convierte el seguro médico en requisito legal con capital mínimo asegurado. Canal digital-first.",
    trigger: "Trámite de visado nómada digital / traslado de empresa / primer hijo en España",
    ccaa: "Madrid · País Vasco · Cataluña",
    color: "#00A9E0",
  },
  {
    id: "COL",
    pop: "Colombia",
    label: "Clase media-alta con familiares en ambos países",
    size: "+280.000 residentes (segunda comunidad latam)",
    priority: "PRIORIDAD 2",
    insight: "Ticket medio inferior a venezolano pero volumen alto. Fuerte demanda de cobertura familiar transfronteriza (Colombia + España). Crecimiento de clase empresarial con empleados distribuidos. Canal corredor activo en Valencia y Murcia.",
    trigger: "Contratación laboral en empresa española / visado reagrupamiento / cobertura hijos",
    ccaa: "Comunitat Valenciana · Madrid · Murcia",
    color: "#FFCE00",
  },
  {
    id: "NOM",
    pop: "Nómada Digital",
    label: "Residente internacional en tránsito (visado Ley Startups)",
    size: "Visado Nómada Digital activo desde 2023",
    priority: "PRIORIDAD 3 (nicho premium)",
    insight: "Seguro médico es requisito legal para el visado (capital mínimo no especificado en BOE pero exigido por cónsules). HNW con capacidad de pago alta. Concentración en Barcelona, Madrid y Málaga. Sensible a reputación y servicio en inglés. Potencial puerta de entrada a HNW expat anglosajón en Costa del Sol.",
    trigger: "Solicitud inicial de visado / renovación anual / incorporación a coworking premium",
    ccaa: "Cataluña · Madrid · Andalucía (Málaga)",
    color: "#0033A0",
  },
];

const COMPETITORS: Competitor[] = [
  {
    name: "Bupa Global",
    tope: "£3,1M (~€3,6M)",
    red: "No red cerrada",
    precio: "~€1.500–€6.000/año (est.)",
    passport: "BVI (no EEE)",
    vantaja: "Marca reconocida; Sanitas en España da fuerza de distribución local",
  },
  {
    name: "Cigna Global",
    tope: "$1M–$3M (según plan)",
    red: "Global (abierta)",
    precio: "~€900–€4.000/año (est.)",
    passport: "Irlanda (EEE) ✓",
    vantaja: "Pasaporte europeo real; fuerte en corporate expat; directo a empresas",
  },
  {
    name: "Allianz Care",
    tope: "€5M",
    red: "Abierta + direct billing",
    precio: "~€1.200–€5.500/año (est.)",
    passport: "Irlanda (EEE) ✓",
    vantaja: "Rating A+ (S&P); amplia red de brokers IPMI en España; fuerte presencia Costa del Sol",
  },
  {
    name: "AXA Global Healthcare",
    tope: "£250K (Foundation) — prestige ilimitado",
    red: "2M centros direct billing",
    precio: "~€900–€2.800+/año (est.)",
    passport: "UK/FCA (post-Brexit, no EEE)",
    vantaja: "AXA XL Iberia con canal corporativo activo; capacidad de bundling con otras líneas AXA España",
  },
  {
    name: "VUMI Europe",
    tope: "€3M–€5M (Priority→Premier)",
    red: "Global sin red cerrada",
    precio: "[Mystery shopping pendiente]",
    passport: "Malta (EEE) ✓",
    vantaja: "ÚNICO con origen LatAm + EEE passport + topes competitivos. Gap: sin rating publicado, sin presencia física confirmada España.",
  },
];

const BROKERS: BrokerTier[] = [
  {
    tier: "TIER 1 — Asociaciones nacionales",
    nombres: ["Adecose (158 corredurías)", "Aunna", "Espabrok/Cojebro (>400 representadas)", "Fecor"],
    accion: "Presentación institucional + acuerdo marco. Requiere delegado comercial España y documentación POG completa.",
  },
  {
    tier: "TIER 2 — Corredurías especializadas expat",
    nombres: ["C1 Broker", "HealthPlan Spain", "Polizamedica", "Rastreator premium"],
    accion: "Incorporación a comparadores y mystery shopping para validar pricing vs. competencia.",
  },
  {
    tier: "TIER 3 — Digital / flex benefits",
    nombres: ["Coverflex (>15.000 empresas)", "Vitaance (adquirida PIB Group)", "Cobee", "Edenred"],
    accion: "Canal de entrada para colectivo corporativo LatAm en empresas españolas. Ticket medio menor pero volumen alto.",
  },
];

const ROADMAP: RoadmapWeek[] = [
  {
    semanas: "Sem 1",
    fase: "Desbloqueo regulatorio",
    items: [
      "Consulta DGSFP (apps.dgsfp.mineco.es · filtro Malta · ramo Asistencia Sanitaria)",
      "Confirmar estado LPS con equipo legal VUMI / Niels Bay Haaber",
      "Identificar si DGSFP expediente está en tramitación o inédito",
    ],
    owner: "Legal / MD",
  },
  {
    semanas: "Sem 2–3",
    fase: "Inteligencia de pricing",
    items: [
      "Mystery shopping: Perfil A (35 años, Madrid, ex-USA), Perfil B (familia Barcelona), Perfil C (HNW 55 Marbella)",
      "Brokers objetivo: C1 Broker, Polizamedica, HealthPlan Spain",
      "Comparativa vs Allianz Care, Cigna Global, Bupa Global, AXA GH",
    ],
    owner: "GTM / Brokers",
  },
  {
    semanas: "Sem 2–3",
    fase: "Wave 2 — Audiencias",
    items: [
      "Cualificación perfil argentino y peruano (en crecimiento, no cubierto en Wave 1)",
      "Expat anglosajón Costa del Sol (Marbella, Estepona): jubilados británicos/alemanes",
      "Validar disposición a pago y canal preferente por segmento",
    ],
    owner: "Strategy / Research",
  },
  {
    semanas: "Sem 3–4",
    fase: "Canal broker — primeras reuniones",
    items: [
      "Presentación a 3–5 corredurías piloto (Adecose + 2 especializadas expat)",
      "Condición previa: DGSFP confirmado + pricing disponible + delegado comercial identificado",
      "Objetivo: carta de intención o acuerdo marco con al menos 1 asociación",
    ],
    owner: "Commercial",
  },
  {
    semanas: "Sem 4",
    fase: "Hospital provider intelligence",
    items: [
      "Direct billing: Quirónsalud, HM Hospitales, Vithas, Ribera Salud",
      "Confirmar acuerdo formal con Clínica Universidad de Navarra (¿referencia o direct billing?)",
      "Cuadro médico mínimo por CCAA para material comercial",
    ],
    owner: "Operations",
  },
  {
    semanas: "Sem 5–8",
    fase: "Activación GTM selectiva",
    items: [
      "Solo post-DGSFP confirmado: activar medios orientados a visados",
      "Canales prioritarios: SEM (keywords nómada digital + seguro médico expatriados), LinkedIn corporate",
      "Comunidad venezolana: redes sociales nativas (Instagram, WhatsApp grupos), brokers Usera/Barajas",
    ],
    owner: "Marketing",
  },
];

// ── Sub-components ────────────────────────────────────────────────────────────

function StatusBadge({ level }: { level: StatusLevel }) {
  const cfg: Record<StatusLevel, { bg: string; text: string }> = {
    BLOQUEANTE: { bg: "#FEE2E2", text: COLORS.red },
    ATENCIÓN:   { bg: "#FEF3C7", text: COLORS.amber },
    OK:         { bg: "#DCFCE7", text: COLORS.green },
    PENDIENTE:  { bg: "#EFF6FF", text: COLORS.trust },
  };
  const { bg, text } = cfg[level];
  return (
    <span style={{
      display: "inline-block",
      padding: "2px 8px",
      borderRadius: "4px",
      background: bg,
      color: text,
      fontSize: ".67rem",
      fontFamily: F.heading,
      fontWeight: 700,
      letterSpacing: ".06em",
      whiteSpace: "nowrap",
    }}>
      {level}
    </span>
  );
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: COLORS.white,
      border: `1px solid ${COLORS.border}`,
      borderRadius: "8px",
      padding: "24px",
      boxShadow: "0 4px 6px rgba(0,0,0,.04)",
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div style={{ marginBottom: "24px" }}>
      <div style={{
        fontSize: ".68rem",
        fontFamily: F.heading,
        fontWeight: 700,
        letterSpacing: ".1em",
        color: COLORS.sky,
        textTransform: "uppercase",
        marginBottom: "6px",
      }}>{label}</div>
      <h2 style={{
        fontFamily: F.heading,
        fontWeight: 700,
        fontSize: "1.4rem",
        color: COLORS.slate,
        margin: 0,
        letterSpacing: "-.02em",
      }}>{title}</h2>
    </div>
  );
}

function Divider() {
  return <hr style={{ border: "none", borderTop: `1px solid ${COLORS.border}`, margin: "40px 0" }} />;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SpainCommandCenter() {
  const [now, setNow] = useState("");
  const [activeSegment, setActiveSegment] = useState<string | null>(null);

  useEffect(() => {
    const fmt = () => {
      const d = new Date();
      setNow(d.toLocaleDateString("en-GB", {
        weekday: "long", day: "numeric", month: "long", year: "numeric",
        hour: "2-digit", minute: "2-digit",
      }));
    };
    fmt();
    const t = setInterval(fmt, 60_000);
    return () => clearInterval(t);
  }, []);

  const blockers = SIGNALS.filter(s => s.level === "BLOQUEANTE").length;

  return (
    <div style={{
      minHeight: "100vh",
      background: COLORS.pearl,
      fontFamily: F.body,
      color: COLORS.slate,
    }}>
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Open+Sans:wght@300;400;600&display=swap');
        * { box-sizing: border-box; }
        a { color: ${COLORS.trust}; }
        table { border-collapse: collapse; width: 100%; }
        th { background: ${COLORS.pearl}; font-family: ${F.heading}; font-weight: 700; font-size: .75rem; letter-spacing: .05em; color: ${COLORS.muted}; text-transform: uppercase; text-align: left; padding: 10px 14px; border-bottom: 2px solid ${COLORS.border}; }
        td { padding: 12px 14px; font-size: .85rem; border-bottom: 1px solid ${COLORS.border}; vertical-align: top; }
        tr:last-child td { border-bottom: none; }
        tr:hover td { background: ${COLORS.pearl}; }
        @media (max-width: 768px) {
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .grid-4 { grid-template-columns: 1fr 1fr !important; }
          .hide-mobile { display: none !important; }
          .pad-mobile { padding: 16px !important; }
        }
      `}</style>

      {/* ── Top nav bar ── */}
      <div style={{
        background: COLORS.trust,
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "52px",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span style={{
            fontFamily: F.heading,
            fontWeight: 700,
            fontSize: "1rem",
            color: COLORS.white,
            letterSpacing: "-.01em",
          }}>
            VUMI<sup style={{ fontSize: ".5em", verticalAlign: "super" }}>®</sup>
          </span>
          <span style={{
            width: "1px", height: "20px",
            background: "rgba(255,255,255,.25)", display: "inline-block",
          }} />
          <span style={{
            fontSize: ".72rem",
            fontFamily: F.heading,
            fontWeight: 600,
            color: "rgba(255,255,255,.8)",
            letterSpacing: ".08em",
            textTransform: "uppercase",
          }}>
            Spain Command Center
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {blockers > 0 && (
            <span style={{
              background: COLORS.red,
              color: COLORS.white,
              fontFamily: F.heading,
              fontWeight: 700,
              fontSize: ".68rem",
              padding: "2px 8px",
              borderRadius: "4px",
              letterSpacing: ".04em",
            }}>
              {blockers} BLOCKER{blockers > 1 ? "S" : ""}
            </span>
          )}
          <span style={{
            fontSize: ".72rem",
            color: "rgba(255,255,255,.6)",
            fontFamily: F.body,
          }}>
            {now}
          </span>
        </div>
      </div>

      {/* ── Main content ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 32px" }} className="pad-mobile">

        {/* ── Hero status bar ── */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: "16px", marginBottom: "16px" }}>
            <div>
              <div style={{
                fontSize: ".68rem",
                fontFamily: F.heading,
                fontWeight: 700,
                letterSpacing: ".1em",
                color: COLORS.muted,
                textTransform: "uppercase",
                marginBottom: "4px",
              }}>
                FASE ACTUAL
              </div>
              <h1 style={{
                fontFamily: F.heading,
                fontWeight: 700,
                fontSize: "1.9rem",
                margin: 0,
                color: COLORS.slate,
                letterSpacing: "-.03em",
                lineHeight: 1.1,
              }}>
                Pre-Soft Launch · Wave 1 completada
              </h1>
              <p style={{
                marginTop: "8px",
                fontSize: ".88rem",
                color: COLORS.muted,
                maxWidth: "560px",
                lineHeight: 1.5,
              }}>
                Inteligencia de lanzamiento para España. Wave 1 cierra regulatorio, IPMI y MUFACE.
                El único bloqueante activo es la confirmación de inscripción DGSFP.
              </p>
            </div>
            <div style={{
              background: COLORS.white,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "8px",
              padding: "16px 20px",
              minWidth: "180px",
            }}>
              <div style={{ fontSize: ".68rem", fontFamily: F.heading, fontWeight: 700, color: COLORS.muted, letterSpacing: ".08em", textTransform: "uppercase", marginBottom: "8px" }}>Señales activas</div>
              {(["BLOQUEANTE","ATENCIÓN","OK","PENDIENTE"] as StatusLevel[]).map(lvl => {
                const n = SIGNALS.filter(s => s.level === lvl).length;
                if (!n) return null;
                return (
                  <div key={lvl} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                    <StatusBadge level={lvl} />
                    <span style={{ fontFamily: F.heading, fontWeight: 700, fontSize: ".85rem", color: COLORS.slate }}>{n}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Signals / blockers ── */}
        <SectionHeader label="STATUS DE LANZAMIENTO" title="Señales de control — 24 abril 2026" />
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "40px" }}>
          {SIGNALS.map((s, i) => (
            <Card key={i} style={{ padding: "16px 20px" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", flexWrap: "wrap" }}>
                <div style={{ paddingTop: "2px" }}>
                  <StatusBadge level={s.level} />
                </div>
                <div style={{ flex: 1, minWidth: "200px" }}>
                  <div style={{ fontFamily: F.heading, fontWeight: 700, fontSize: ".88rem", color: COLORS.slate, marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ fontSize: ".83rem", color: COLORS.muted, lineHeight: 1.5 }}>{s.detail}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Divider />

        {/* ── Priority Audiences ── */}
        <SectionHeader label="AUDIENCIAS OBJETIVO" title="Segmentos prioritarios — España" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          marginBottom: "40px",
        }} className="grid-2">
          {SEGMENTS.map(seg => (
            <Card
              key={seg.id}
              style={{
                cursor: "pointer",
                borderLeft: `4px solid ${activeSegment === seg.id ? seg.color : COLORS.border}`,
                transition: "border-left-color .15s, box-shadow .15s",
                boxShadow: activeSegment === seg.id ? `0 8px 24px rgba(0,0,0,.08)` : undefined,
              }}
              onClick={() => setActiveSegment(activeSegment === seg.id ? null : seg.id)}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "10px" }}>
                <div>
                  <div style={{
                    display: "inline-block",
                    fontSize: ".68rem",
                    fontFamily: F.heading,
                    fontWeight: 700,
                    letterSpacing: ".06em",
                    color: seg.color === COLORS.trust ? COLORS.trust : COLORS.muted,
                    background: seg.color === COLORS.trust ? "#EFF6FF" : "transparent",
                    padding: seg.color === COLORS.trust ? "2px 6px" : "0",
                    borderRadius: "3px",
                    marginBottom: "4px",
                  }}>{seg.priority}</div>
                  <h3 style={{
                    fontFamily: F.heading,
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: COLORS.slate,
                    margin: 0,
                  }}>
                    Comunidad {seg.pop}
                  </h3>
                </div>
                <span style={{
                  fontFamily: F.heading,
                  fontWeight: 700,
                  fontSize: "1.4rem",
                  color: seg.color,
                  opacity: .7,
                }}>{seg.id}</span>
              </div>
              <div style={{ fontSize: ".82rem", color: COLORS.muted, marginBottom: "8px" }}>{seg.size}</div>
              <div style={{ fontSize: ".85rem", color: COLORS.slate, lineHeight: 1.5, marginBottom: "12px" }}>
                <strong style={{ fontFamily: F.heading }}>Perfil:</strong> {seg.label}
              </div>
              {activeSegment === seg.id && (
                <div style={{
                  borderTop: `1px solid ${COLORS.border}`,
                  paddingTop: "12px",
                  marginTop: "4px",
                }}>
                  <div style={{ fontSize: ".83rem", color: COLORS.slate, lineHeight: 1.5, marginBottom: "10px" }}>
                    {seg.insight}
                  </div>
                  <div style={{ fontSize: ".82rem", color: COLORS.muted, marginBottom: "4px" }}>
                    <strong style={{ fontFamily: F.heading, color: COLORS.slate }}>Trigger de conversión:</strong> {seg.trigger}
                  </div>
                  <div style={{ fontSize: ".82rem", color: COLORS.muted }}>
                    <strong style={{ fontFamily: F.heading, color: COLORS.slate }}>CCAA prioritarias:</strong> {seg.ccaa}
                  </div>
                </div>
              )}
              {activeSegment !== seg.id && (
                <div style={{ fontSize: ".75rem", color: COLORS.sky, fontFamily: F.heading, fontWeight: 600 }}>
                  Pulsa para más detalle →
                </div>
              )}
            </Card>
          ))}
        </div>

        <Divider />

        {/* ── Competitive Landscape ── */}
        <SectionHeader label="PANORAMA COMPETITIVO" title="IPMI Big 4 vs VUMI Europe" />
        <Card style={{ padding: 0, marginBottom: "40px", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table>
              <thead>
                <tr>
                  <th>Competidor</th>
                  <th>Capital máximo</th>
                  <th>Red</th>
                  <th>Precio referencia</th>
                  <th>Pasaporte EU</th>
                  <th>Diferencial</th>
                </tr>
              </thead>
              <tbody>
                {COMPETITORS.map((c, i) => (
                  <tr key={i} style={{ background: c.name === "VUMI Europe" ? "#EFF6FF" : undefined }}>
                    <td>
                      <span style={{
                        fontFamily: F.heading,
                        fontWeight: 700,
                        fontSize: ".85rem",
                        color: c.name === "VUMI Europe" ? COLORS.trust : COLORS.slate,
                      }}>
                        {c.name}
                        {c.name === "VUMI Europe" && <span style={{ marginLeft: "6px", fontSize: ".65rem", background: COLORS.trust, color: "#fff", borderRadius: "3px", padding: "1px 4px" }}>TÚ</span>}
                      </span>
                    </td>
                    <td style={{ fontSize: ".83rem" }}>{c.tope}</td>
                    <td style={{ fontSize: ".83rem" }}>{c.red}</td>
                    <td style={{ fontSize: ".83rem", color: c.precio.includes("pendiente") ? COLORS.amber : undefined }}>
                      {c.precio}
                    </td>
                    <td style={{ fontSize: ".83rem" }}>{c.passport}</td>
                    <td style={{ fontSize: ".82rem", color: COLORS.muted, maxWidth: "220px" }}>{c.vantaja}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ padding: "12px 16px", background: "#FFFBEB", borderTop: `1px solid #FEF3C7` }}>
            <span style={{ fontSize: ".75rem", color: COLORS.amber, fontFamily: F.heading, fontWeight: 700 }}>
              ⚠ Precios indicativos (estimaciones corpus Wave 1). Mystery shopping pendiente para confirmación.
            </span>
          </div>
        </Card>

        <Divider />

        {/* ── Broker Ecosystem ── */}
        <SectionHeader label="CANAL DE DISTRIBUCIÓN" title="Ecosistema broker — Salud en España" />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "8px" }}>
          {BROKERS.map((tier, i) => (
            <Card key={i} style={{ padding: "20px" }}>
              <div style={{
                fontSize: ".72rem",
                fontFamily: F.heading,
                fontWeight: 700,
                letterSpacing: ".08em",
                color: COLORS.sky,
                textTransform: "uppercase",
                marginBottom: "10px",
              }}>{tier.tier}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "12px" }}>
                {tier.nombres.map((n, j) => (
                  <span key={j} style={{
                    background: COLORS.pearl,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "4px",
                    padding: "4px 10px",
                    fontSize: ".80rem",
                    fontFamily: F.heading,
                    fontWeight: 600,
                    color: COLORS.slate,
                  }}>{n}</span>
                ))}
              </div>
              <div style={{
                fontSize: ".83rem",
                color: COLORS.muted,
                lineHeight: 1.5,
                paddingTop: "8px",
                borderTop: `1px solid ${COLORS.border}`,
              }}>
                <strong style={{ color: COLORS.slate, fontFamily: F.heading }}>Acción VUMI: </strong>{tier.accion}
              </div>
            </Card>
          ))}
        </div>
        <div style={{ fontSize: ".78rem", color: COLORS.muted, marginBottom: "40px" }}>
          Fuente: corpus 05, 06 — DGSFP Informe Mediación 2023. Cuota canal broker en salud: ~17% primas / 21% pólizas.
        </div>

        <Divider />

        {/* ── Roadmap ── */}
        <SectionHeader label="PLAN DE ACCIÓN" title="Roadmap GTM — 8 semanas" />
        <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "40px" }}>
          {ROADMAP.map((week, i) => (
            <div key={i} style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr",
              gap: "0",
              position: "relative",
            }}>
              {/* Timeline dot */}
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "8px",
              }}>
                <div style={{
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: i === 0 ? COLORS.red : COLORS.trust,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: F.heading,
                  fontWeight: 700,
                  fontSize: ".65rem",
                  color: COLORS.white,
                  flexShrink: 0,
                  zIndex: 1,
                }}>
                  {week.semanas.split(" ")[1]}
                </div>
                {i < ROADMAP.length - 1 && (
                  <div style={{
                    width: "2px",
                    flex: 1,
                    background: COLORS.border,
                    margin: "4px 0",
                    minHeight: "24px",
                  }} />
                )}
              </div>
              <div style={{ paddingBottom: "24px", paddingLeft: "16px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span style={{
                    fontFamily: F.heading,
                    fontWeight: 700,
                    fontSize: ".88rem",
                    color: i === 0 ? COLORS.red : COLORS.slate,
                  }}>{week.fase}</span>
                  <span style={{
                    fontSize: ".68rem",
                    color: COLORS.muted,
                    background: COLORS.pearl,
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "4px",
                    padding: "1px 6px",
                    fontFamily: F.heading,
                    fontWeight: 600,
                  }}>Owner: {week.owner}</span>
                </div>
                <ul style={{ margin: 0, paddingLeft: "16px" }}>
                  {week.items.map((item, j) => (
                    <li key={j} style={{ fontSize: ".83rem", color: COLORS.muted, lineHeight: 1.6, marginBottom: "2px" }}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* ── Open questions ── */}
        <SectionHeader label="GAPS ESTRATÉGICOS" title="Preguntas sin respuesta — Wave 2" />
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "12px",
          marginBottom: "40px",
        }} className="grid-2">
          {[
            { q: "¿El producto Euro Health incluye franquicia €0 por defecto o es add-on?", why: "Determina idoneidad para visado de larga duración. Sin €0 freno, muchos visados rechazados." },
            { q: "¿Fuerza comercial en España: delegado físico o cobertura remota?", why: "Factor decisivo para activación canal broker. Sin presencia física, corredurías pequeñas no activan." },
            { q: "¿VUMI Europe distribuirá vía asociaciones (Espabrok, Adecose) o acuerdos directos con Big Five?", why: "Define velocidad de rampa y modelo de incentivos. Estrategias no son excluyentes pero tienen distinto coste y tiempo." },
            { q: "¿Partnership con Clínica Universidad de Navarra es formal (direct billing) o relación de referencia?", why: "Si es direct billing, es argumento comercial tier-1 para HNW. Si no, no mencionarlo en material de ventas." },
            { q: "Perfil argentino y peruano — ¿mismo trigger que venezolano o patrones propios?", why: "Comunidades en crecimiento. Argentina HNW con perfil distinto. Perú mayor sensibilidad precio. Necesita Wave 2." },
            { q: "Rating de solvencia VUMI — ¿hay plan para A.M. Best o equivalente?", why: "Brokers sofisticados y HNW piden rating. Sin él, VUMI tiene desventaja frente a Allianz Care (A+)." },
          ].map((item, i) => (
            <Card key={i} style={{ padding: "18px" }}>
              <div style={{
                fontFamily: F.heading,
                fontWeight: 700,
                fontSize: ".85rem",
                color: COLORS.slate,
                lineHeight: 1.4,
                marginBottom: "8px",
              }}>
                {item.q}
              </div>
              <div style={{ fontSize: ".80rem", color: COLORS.muted, lineHeight: 1.5 }}>
                <em>Por qué importa:</em> {item.why}
              </div>
            </Card>
          ))}
        </div>

        {/* ── Footer ── */}
        <div style={{
          borderTop: `1px solid ${COLORS.border}`,
          paddingTop: "24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}>
          <div style={{ fontSize: ".75rem", color: COLORS.muted }}>
            <strong style={{ fontFamily: F.heading, color: COLORS.slate }}>VUMI® Europe Spain Command Center</strong>
            {" "}· Inteligencia Wave 1 · Corpus 01–08 · 24 abril 2026
          </div>
          <div style={{ fontSize: ".75rem", color: COLORS.muted }}>
            Métricas numéricas: Supabase/Postgres <code style={{ background: COLORS.pearl, padding: "1px 4px", borderRadius: "3px" }}>pytjweipmorwfdmxdcgi</code> · Corpus: RAG project knowledge
          </div>
        </div>

      </div>
    </div>
  );
}