'use client'

import { useRef, useState } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ResponsivePie } from '@nivo/pie'
import { ResponsiveRadar } from '@nivo/radar'

/* ââ Tokens âââââââââââââââââââââââââââââââââââââââââââââââââââââ */
const C = {
  bg:     '#0A0A0A',
  blue:   '#0033A0',
  sky:    '#00A9E0',
  red:    '#E8311A',
  white:  '#ffffff',
  dim:    'rgba(255,255,255,0.55)',
  glass:  'rgba(255,255,255,0.04)',
  bd:     'rgba(255,255,255,0.09)',
  grid:   'rgba(0,169,224,0.04)',
}
const ease = [0.22, 1, 0.36, 1] as const

/* ââ Scroll-reveal wrapper ââââââââââââââââââââââââââââââââââââââ */
function Reveal({ children, delay = 0, style = {} }: {
  children: React.ReactNode; delay?: number; style?: React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div ref={ref} style={style}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay }}>
      {children}
    </motion.div>
  )
}

/* ââ Glassmorphism card âââââââââââââââââââââââââââââââââââââââââ */
function Glass({ children, style = {}, glow = C.sky }: {
  children: React.ReactNode; style?: React.CSSProperties; glow?: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.22 }}
      style={{
        background: hov ? 'rgba(255,255,255,0.065)' : C.glass,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.14)' : C.bd}`,
        borderRadius: 2,
        boxShadow: hov
          ? `0 0 40px ${glow}1a, 0 8px 32px rgba(0,0,0,0.45)`
          : '0 2px 12px rgba(0,0,0,0.3)',
        transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
        ...style,
      }}>
      {children}
    </motion.div>
  )
}

/* ââ Tooltip ââââââââââââââââââââââââââââââââââââââââââââââââââââ */
function Tip({ text, children }: { text: string; children: React.ReactNode }) {
  const [show, setShow] = useState(false)
  return (
    <span style={{ position: 'relative', display: 'inline-block', cursor: 'default' }}
      onMouseEnter={() => setShow(true)} onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.9 }}
            transition={{ duration: 0.16 }}
            style={{
              position: 'absolute', bottom: 'calc(100% + 8px)', left: '50%',
              transform: 'translateX(-50%)',
              background: `${C.sky}ee`, backdropFilter: 'blur(8px)',
              color: '#fff', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.07em', padding: '5px 10px', borderRadius: 4,
              whiteSpace: 'nowrap', pointerEvents: 'none', zIndex: 200,
            }}>
            {text}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

/* ââ Floating orb âââââââââââââââââââââââââââââââââââââââââââââââ */
function Orb({ color, size, top, left, delay = 0 }: {
  color: string; size: number; top: string; left: string; delay?: number
}) {
  return (
    <motion.div
      animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
      transition={{ duration: 7 + delay, repeat: Infinity, ease: 'easeInOut', delay }}
      style={{
        position: 'absolute', width: size, height: size, top, left,
        borderRadius: '50%',
        background: `radial-gradient(circle at 40% 40%, ${color}, transparent 70%)`,
        filter: `blur(${size * 0.45}px)`,
        pointerEvents: 'none', zIndex: 0,
      }}
    />
  )
}

/* ââ Nav section card âââââââââââââââââââââââââââââââââââââââââââ */
function NavCard({ href, icon, label, sub, accent = C.sky }: {
  href: string; icon: string; label: string; sub: string; accent?: string
}) {
  const [hov, setHov] = useState(false)
  return (
    <motion.a href={href} onHoverStart={() => setHov(true)} onHoverEnd={() => setHov(false)}
      whileHover={{ y: -5 }} transition={{ duration: 0.2 }}
      style={{
        display: 'block', textDecoration: 'none',
        background: hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.025)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.16)' : 'rgba(255,255,255,0.07)'}`,
        borderTop: `2px solid ${accent}`,
        borderRadius: 2, padding: '20px 18px',
        boxShadow: hov ? `0 0 28px ${accent}22, 0 8px 24px rgba(0,0,0,0.4)` : '0 2px 8px rgba(0,0,0,0.25)',
        transition: 'background 0.22s, border-color 0.22s, box-shadow 0.22s',
      }}>
      <div style={{ fontSize: 20, marginBottom: 8 }}>{icon}</div>
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 13, color: C.white, marginBottom: 5 }}>{label}</div>
      <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.06em', lineHeight: 1.5 }}>{sub}</div>
    </motion.a>
  )
}

/* ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ
   PAGE
ââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââââ */
export default function PitchPage() {
  const { scrollY } = useScroll()
  const heroY  = useTransform(scrollY, [0, 600], [0, -110])
  const heroOp = useTransform(scrollY, [0, 400], [1, 0.25])
  const gridY  = useTransform(scrollY, [0, 600], [0, -55])

  /* Nivo data */
  const pieData = [
    { id: 'SeÃ±ales',      label: 'SeÃ±ales',       value: 130, color: C.sky  },
    { id: 'HipÃ³tesis',    label: 'HipÃ³tesis',     value: 10,  color: '#00C875' },
    { id: 'Brokers',      label: 'Brokers',       value: 18,  color: C.red  },
    { id: 'Competidores', label: 'Competidores',  value: 9,   color: '#FFD166' },
  ]

  const radarData = [
    { metric: 'Audiencia',   score: 90 },
    { metric: 'Broker',      score: 82 },
    { metric: 'Competencia', score: 78 },
    { metric: 'RegulaciÃ³n',  score: 95 },
    { metric: 'GeografÃ­a',   score: 88 },
    { metric: 'Propuesta',   score: 85 },
  ]

  return (
    <main style={{ fontFamily: "'Helvetica Neue',Arial,sans-serif", background: C.bg, color: C.white, minHeight: '100vh', overflowX: 'hidden' }}>

      {/* ââ NAV âââââââââââââââââââââââââââââââââââââââââââââââ */}
      <motion.nav
        initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '18px 40px',
          background: 'rgba(10,10,10,0.82)',
          backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
        }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 10, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.32)', textTransform: 'uppercase' }}>HOLA VUMI</span>
          <span style={{ color: 'rgba(255,255,255,0.1)' }}>Ã</span>
          <span style={{ fontSize: 10, letterSpacing: '0.32em', color: C.sky, textTransform: 'uppercase' }}>2026</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <motion.a href="/intelligence" whileHover={{ color: C.sky, letterSpacing: '0.25em' }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', textDecoration: 'none' }}>
            Portal â
          </motion.a>
          <motion.button whileHover={{ borderColor: 'rgba(0,169,224,0.5)', color: 'rgba(255,255,255,0.8)' }}
            style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', background: 'transparent', border: `1px solid rgba(255,255,255,0.18)`, color: 'rgba(255,255,255,0.5)', padding: '6px 14px', cursor: 'pointer', borderRadius: 2 }}>
            EN
          </motion.button>
        </div>
      </motion.nav>

      {/* ââ HERO ââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '120px 40px 80px', position: 'relative', overflow: 'hidden' }}>
        <motion.div style={{ position: 'absolute', inset: 0, y: gridY, backgroundImage: `linear-gradient(${C.grid} 1px,transparent 1px),linear-gradient(90deg,${C.grid} 1px,transparent 1px)`, backgroundSize: '80px 80px', pointerEvents: 'none' }} />
        <Orb color={C.sky} size={520} top="2%"  left="55%" delay={0} />
        <Orb color={C.red} size={340} top="45%" left="78%" delay={2.5} />
        <Orb color={C.blue} size={420} top="18%" left="3%"  delay={1.5} />
        <div style={{ position: 'absolute', top: 0, left: 40, width: 1, height: '100%', background: `linear-gradient(to bottom,${C.sky},transparent)`, opacity: 0.28 }} />

        <motion.div style={{ position: 'relative', maxWidth: 1200, y: heroY, opacity: heroOp }}>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, ease }}
            style={{ fontSize: 11, letterSpacing: '0.38em', color: C.sky, textTransform: 'uppercase', marginBottom: 32 }}>
            Propuesta conjunta de agencias
          </motion.p>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.85, delay: 0.3, ease }}
            style={{ fontSize: 'clamp(48px,8.5vw,122px)', fontWeight: 900, lineHeight: 0.88, letterSpacing: '-0.03em', marginBottom: 52 }}>
            <span style={{ display: 'block' }}>LA</span>
            <span style={{ display: 'block', color: C.red }}>DESPENSA</span>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.16)' }}>Ã</span>
            <span style={{ display: 'block', color: C.sky }}>REMOTIVE</span>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.13)', fontSize: '0.53em', fontWeight: 400, letterSpacing: '0.01em', marginTop: 26 }}>
              Creatividad + Inteligencia para el lanzamiento de VUMI en EspaÃ±a
            </span>
          </motion.h1>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.65, ease }}
            style={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {[
              { v: '23',  l: 'AÃ±os\nLa Despensa',      tip: 'Fundada 2003. 32 personas. 5 perros. Cero jerarquÃ­as.' },
              { v: '6Âª',  l: 'Agencia\nSCOPEN 2022',   tip: 'Por valoraciÃ³n de clientes reales, no de jurados.' },
              { v: '18',  l: 'Brokers\nIdentificados', tip: 'Fit score por CCAA, expat DNA e IPMI track record.' },
              { v: '130', l: 'SeÃ±ales de\nMercado',     tip: 'Inteligencia verificada. ActualizaciÃ³n semanal automÃ¡tica.' },
            ].map(({ v, l, tip }) => (
              <Glass key={v} style={{ padding: '28px 36px', flex: '1 1 140px', minWidth: 130 }}>
                <Tip text={tip}>
                  <p style={{ fontSize: 'clamp(34px,4vw,60px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 8 }}>{v}</p>
                </Tip>
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.6, whiteSpace: 'pre-line' }}>{l}</p>
              </Glass>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ââ QUOTE âââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding: '120px 40px', maxWidth: 900, margin: '0 auto' }}>
        <Reveal>
          <Glass glow={C.red} style={{ borderLeft: `3px solid ${C.red}`, padding: '42px 44px', marginBottom: 44 }}>
            <p style={{ fontSize: 'clamp(20px,3.2vw,38px)', lineHeight: 1.28, fontWeight: 700, letterSpacing: '-0.02em' }}>
              "EspaÃ±a tiene 900.000 latinoamericanos con renta media-alta y cero opciones de seguro de salud que los traten como lo que son."
            </p>
          </Glass>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontSize: 17, lineHeight: 1.75, color: C.dim, maxWidth: 680 }}>
            La Despensa y ReMotive Media llegan juntas para cubrir ese hueco. Una con la mejor creatividad independiente de EspaÃ±a. La otra con la arquitectura de inteligencia de mercado mÃ¡s sofisticada del sector.
          </p>
        </Reveal>
      </section>

      {/* ââ AGENCY CARDS ââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding: '80px 40px', borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 56 }}>Dos agencias. Una propuesta.</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {/* La Despensa */}
            <Reveal>
              <Glass glow={C.red} style={{ padding: '56px 48px', height: '100%' }}>
                <div style={{ borderBottom: `2px solid ${C.red}`, paddingBottom: 24, marginBottom: 32 }}>
                  <h3 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>LA DESPENSA</h3>
                  <p style={{ fontSize: 12, color: C.red, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Estrategia creativa &amp; campaÃ±a</p>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 40 }}>
                  {[
                    '23 aÃ±os. 32 personas. 5 perros. Cero jerarquÃ­as de grupo.',
                    'Aegon: 6 aÃ±os, #CariÃ±oterapia â el caso de referencia del sector salud en EspaÃ±a.',
                    'Finetwork (lanzamiento nacional), Burger King (14 aÃ±os), Tanqueray, Schweppes.',
                    '6Âª mejor agencia de EspaÃ±a segÃºn clientes reales. SCOPEN 2022.',
                    'Creemos en el poder transformador de la creatividad. Nada mÃ¡s.',
                  ].map((t, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.38, ease }}
                      style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                      <span style={{ color: C.red, marginTop: 3, fontSize: 10, flexShrink: 0 }}>â¶</span>
                      <span style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>{t}</span>
                    </motion.li>
                  ))}
                </ul>
                <div style={{ borderTop: `1px solid rgba(255,255,255,0.07)`, paddingTop: 24 }}>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic', lineHeight: 1.65 }}>Premio Eficacia, Gran Premio Genio. CampaÃ±as que funcionan en la calle, no solo en awards shows.</p>
                </div>
              </Glass>
            </Reveal>

            {/* ReMotive */}
            <Reveal delay={0.1}>
              <Glass glow={C.sky} style={{ padding: '56px 48px', height: '100%' }}>
                <div style={{ borderBottom: `2px solid ${C.sky}`, paddingBottom: 24, marginBottom: 32 }}>
                  <h3 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>REMOTIVE MEDIA</h3>
                  <p style={{ fontSize: 12, color: C.sky, letterSpacing: '0.12em', textTransform: 'uppercase' }}>Inteligencia de mercado &amp; medios</p>
                </div>
                <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 40 }}>
                                    {[
                    'Estrategia de audiencia primaria: 1.09M residentes LATAM premium en España — tres segmentos, cuatro mercados de lanzamiento.',
                    '18 corredurías de salud identificadas y puntuadas por CCAA. Canal broker-first: el más eficiente para IPMI premium en España.',
                    'Media mix diferencial: audio latino, activación comunitaria WhatsApp, native programático. CPL 58–73% menor que display estándar.',
                    '10 huecos de mercado confirmados sin activación — ningún competidor los está cubriendo.',
                    'Hoja de ruta 12 meses estructurada en cuatro fases: Test → Aprender → Escalar → Optimizar.',
                  ].map((t, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: i * 0.08, duration: 0.38, ease }}
                      style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
                      <span style={{ color: C.sky, marginTop: 3, fontSize: 10, flexShrink: 0 }}>â¶</span>
                      <span style={{ fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.65)' }}>{t}</span>
                    </motion.li>
                  ))}
                </ul>
                <div style={{ borderTop: `1px solid rgba(255,255,255,0.07)`, paddingTop: 24 }}>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.28)', fontStyle: 'italic', lineHeight: 1.65 }}>La estrategia ya está construida. No es una promesa — es un plan accionable con datos reales sobre la mesa.</p>
                </div>
              </Glass>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ââ PROPOSITION âââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding: '120px 40px', background: `linear-gradient(135deg,${C.blue}15 0%,transparent 60%)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: '0.32em', color: C.sky, textTransform: 'uppercase', marginBottom: 44 }}>Lo que proponemos</p>
            <h2 style={{ fontSize: 'clamp(30px,5vw,70px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 64 }}>
              Un lanzamiento que el mercado espaÃ±ol no ha visto en salud.
            </h2>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {[
              { n: '01', t: 'Creatividad con dientes', c: C.red,  b: 'Una plataforma creativa construida para el expat LATAM de clase media-alta. No adaptaciones de campaÃ±a genÃ©rica â ideas nacidas de esa audiencia, para esa audiencia.' },
              { n: '02', t: 'Inteligencia accionable', c: C.sky,  b: 'Decisiones de medios, canal y geografÃ­a basadas en datos reales de los tres segmentos LATAM prioritarios. No en intuiciÃ³n de agencia.' },
              { n: '03', t: 'Canal broker activado',   c: C.white, b: '18 brokers identificados con scoring de compatibilidad por CCAA. El canal mÃ¡s eficiente para IPMI en EspaÃ±a, sin explotar por los competidores.' },
            ].map(({ n, t, c, b }, i) => (
              <Reveal key={n} delay={i * 0.1}>
                <Glass glow={c} style={{ padding: '48px 40px', height: '100%' }}>
                  <p style={{ fontSize: 52, fontWeight: 900, color: 'rgba(255,255,255,0.05)', letterSpacing: '-0.04em', marginBottom: 24 }}>{n}</p>
                  <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16, color: c }}>{t}</h3>
                  <p style={{ fontSize: 15, lineHeight: 1.72, color: 'rgba(255,255,255,0.5)' }}>{b}</p>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ââ CASES âââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding: '80px 40px', background: 'rgba(255,255,255,0.016)', borderTop: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', marginBottom: 44 }}>Casos que respaldan la propuesta</p>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2 }}>
            {[
              { agency: 'La Despensa', brand: 'Aegon EspaÃ±a',     color: C.red, tags: ['Salud','Seguros','Emocional','Multi-aÃ±o'], body: '6 aÃ±os de relaciÃ³n. CampaÃ±a #CariÃ±oterapia: el acompaÃ±amiento como propuesta emocional en salud. Multi-aÃ±o, multi-formato, TV a digital.' },
              { agency: 'La Despensa', brand: 'Finetwork',         color: C.red, tags: ['Lanzamiento','Nacional','Full-funnel'],   body: 'Lanzamiento nacional desde cero. Todos los puntos de contacto en 2 aÃ±os. Entrada en mercado saturado con identidad diferencial.' },
              { agency: 'ReMotive',   brand: 'VUMI Spain Portal', color: C.sky, tags: ['Inteligencia','Tiempo Real','Data','Live'],        body: 'Strategic Intelligence Portal activo. Inteligencia de mercado en vivo. Brokers, competidores, audiencias LATAM â todo consultable en tiempo real.' },
            ].map(({ agency, brand, color, tags, body }, i) => (
              <Reveal key={brand} delay={i * 0.1}>
                <Glass glow={color} style={{ padding: '36px 32px', height: '100%' }}>
                  <p style={{ fontSize: 10, letterSpacing: '0.28em', color, textTransform: 'uppercase', marginBottom: 14 }}>{agency}</p>
                  <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 14 }}>{brand}</p>
                  <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.68, marginBottom: 24 }}>{body}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {tags.map(tag => (
                      <motion.span key={tag} whileHover={{ background: `${color}22`, color: color }}
                        transition={{ duration: 0.18 }}
                        style={{ fontSize: 9, letterSpacing: '0.1em', textTransform: 'uppercase', background: 'rgba(255,255,255,0.06)', padding: '3px 9px', borderRadius: 2, color: 'rgba(255,255,255,0.42)', transition: 'background 0.18s,color 0.18s' }}>
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </Glass>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ââ CTA âââââââââââââââââââââââââââââââââââââââââââââââ */}
      <section style={{ padding: '120px 40px', background: `linear-gradient(to right,${C.blue},#001A5C)`, borderTop: `1px solid rgba(255,255,255,0.1)` }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <p style={{ fontSize: 10, letterSpacing: '0.32em', color: 'rgba(255,255,255,0.42)', textTransform: 'uppercase', marginBottom: 28 }}>PrÃ³ximos pasos</p>
            <h2 style={{ fontSize: 'clamp(32px,5vw,64px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 28 }}>Arranquemos.</h2>
            <p style={{ fontSize: 17, lineHeight: 1.72, color: 'rgba(255,255,255,0.66)', maxWidth: 580, margin: '0 auto 56px' }}>
              Una sesiÃ³n de trabajo. Sin presentaciones de 80 slides. Con el portal abierto, la inteligencia consultable y las decisiones que hay que tomar sobre la mesa.
            </p>
            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <motion.a href="mailto:alex@rmtv.io"
                whileHover={{ scale: 1.03, boxShadow: '0 0 36px rgba(255,255,255,0.22)' }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', padding: '16px 42px', background: C.white, color: C.blue, fontSize: 12, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}>
                Contactar ahora
              </motion.a>
              <motion.a href="/intelligence"
                whileHover={{ scale: 1.03, background: 'rgba(255,255,255,0.1)' }}
                whileTap={{ scale: 0.97 }}
                style={{ display: 'inline-block', padding: '16px 42px', background: 'transparent', color: C.white, border: '1px solid rgba(255,255,255,0.36)', fontSize: 12, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textDecoration: 'none', borderRadius: 2 }}>
                Ver el portal
              </motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      
      {/* ── GTM STRATEGY DECK ──────────────────────────────── */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.07)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <Reveal>
            <a href="/strategy" style={{ textDecoration: 'none', display: 'block' }}>
              <motion.div
                whileHover={{ y: -4, boxShadow: '0 0 60px rgba(232,49,26,0.18), 0 16px 48px rgba(0,0,0,0.5)' }}
                transition={{ duration: 0.25 }}
                style={{
                  background: 'linear-gradient(135deg, rgba(232,49,26,0.12) 0%, rgba(0,51,160,0.08) 100%)',
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                  border: '1px solid rgba(232,49,26,0.25)',
                  borderRadius: 2,
                  padding: '52px 56px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 32,
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                {/* Accent bar */}
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #E8311A, #0033A0)', borderRadius: '2px 2px 0 0' }} />

                {/* Left — content */}
                <div style={{ flex: 1, minWidth: 280 }}>
                  <p style={{ fontSize: 10, letterSpacing: '0.32em', color: '#E8311A', textTransform: 'uppercase', marginBottom: 12, fontWeight: 700 }}>
                    Estrategia GTM
                  </p>
                  <h2 style={{ fontSize: 'clamp(26px,3.5vw,42px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 14, color: '#ffffff' }}>
                    Plan de Crecimiento<br />12 Meses.
                  </h2>
                  <p style={{ fontSize: 15, lineHeight: 1.65, color: 'rgba(255,255,255,0.52)', maxWidth: 480, marginBottom: 0 }}>
                    Audiencias, canales, creatividad y hoja de ruta de activación completa — presentado en 25 diapositivas. Construido desde la inteligencia de mercado.
                  </p>
                </div>

                {/* Centre — stats */}
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
                  {[
                    { val: '25', label: 'Slides' },
                    { val: '4', label: 'Fases' },
                    { val: '1.09M', label: 'Audiencia LATAM' },
                    { val: '18', label: 'Brokers' },
                  ].map(({ val, label }) => (
                    <div key={label} style={{ textAlign: 'center' }}>
                      <p style={{ fontSize: 28, fontWeight: 900, color: '#E8311A', lineHeight: 1, marginBottom: 4, letterSpacing: '-0.02em' }}>{val}</p>
                      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.38)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
                    </div>
                  ))}
                </div>

                {/* Right — CTA */}
                <div style={{ flexShrink: 0 }}>
                  <div style={{
                    display: 'inline-flex', alignItems: 'center', gap: 10,
                    background: '#E8311A', color: '#ffffff',
                    padding: '14px 28px', borderRadius: 2,
                    fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase',
                  }}>
                    Ver Estrategia
                    <span style={{ fontSize: 16 }}>→</span>
                  </div>
                </div>
              </motion.div>
            </a>
          </Reveal>
        </div>
      </section>

      {/* ââ FOOTER ââââââââââââââââââââââââââââââââââââââââââââ */}
      <footer style={{ padding: '28px 40px', borderTop: `1px solid rgba(255,255,255,0.06)`, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          <span style={{ fontSize: 10, letterSpacing: '0.22em', color: 'rgba(255,255,255,0.2)', textTransform: 'uppercase' }}>La Despensa Ã ReMotive Media</span>
          <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.1)' }}>Para VUMI Europe EspaÃ±a â 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 22 }}>
          {[
            { href: '/intelligence', label: 'Portal' },
            { href: '/intelligence/brokers', label: 'Brokers' },
          ].map(({ href, label }) => (
            <motion.a key={href} href={href} whileHover={{ color: C.sky }}
              transition={{ duration: 0.18 }}
              style={{ fontSize: 10, color: 'rgba(255,255,255,0.25)', textDecoration: 'none', letterSpacing: '0.16em', textTransform: 'uppercase' }}>
              {label} â
            </motion.a>
          ))}
        </div>
      </footer>

    </main>
  )
}
