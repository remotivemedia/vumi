'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion'
import { ResponsiveRadialBar } from '@nivo/radial-bar'

/* ─── Design tokens ──────────────────────────────────────────── */
const C = {
  bg:      '#0A0A0A',
  blue:    '#0033A0',
  sky:     '#00A9E0',
  red:     '#E8311A',
  white:   '#ffffff',
  dim:     'rgba(255,255,255,0.55)',
  faint:   'rgba(255,255,255,0.08)',
  glass:   'rgba(255,255,255,0.04)',
  glassBd: 'rgba(255,255,255,0.09)',
  gridLn:  'rgba(0,169,224,0.04)',
}

/* ─── Animation variants ─────────────────────────────────────── */
const ease = [0.22, 1, 0.36, 1] as const
const fadeUp   = { initial:{opacity:0,y:32}, animate:{opacity:1,y:0}, transition:{duration:0.65,ease} }
const fadeIn   = { initial:{opacity:0},      animate:{opacity:1},     transition:{duration:0.5,ease} }
const scaleIn  = { initial:{opacity:0,scale:0.94}, animate:{opacity:1,scale:1}, transition:{duration:0.55,ease} }

/* ─── Nivo radial bar data ───────────────────────────────────── */
const radarData = [
  { id:'Chunks RAG',    data:[{ x:'Intelligence', y:130 }] },
  { id:'Hipótesis',     data:[{ x:'Evidence',     y:10  }] },
  { id:'Brokers',       data:[{ x:'Mapped',        y:18  }] },
  { id:'Competidores',  data:[{ x:'Analysed',      y:9   }] },
]

/* ─── Reusable: scroll-reveal wrapper ───────────────────────── */
function Reveal({ children, delay=0, className='', style={} }: {
  children: React.ReactNode; delay?:number; className?:string; style?:React.CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once:true, margin:'-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity:0, y:28 }}
      animate={inView ? { opacity:1, y:0 } : { opacity:0, y:28 }}
      transition={{ duration:0.65, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}

/* ─── Glass card wrapper ─────────────────────────────────────── */
function GlassCard({ children, style={}, hoverGlow=C.sky }: {
  children:React.ReactNode; style?:React.CSSProperties; hoverGlow?:string
}) {
  const [hovered, setHovered] = useState(false)
  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y:-3, transition:{duration:0.25,ease} }}
      style={{
        background: hovered ? 'rgba(255,255,255,0.065)' : C.glass,
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: `1px solid ${hovered ? 'rgba(255,255,255,0.14)' : C.glassBd}`,
        borderRadius: 2,
        boxShadow: hovered ? `0 0 40px ${hoverGlow}18, 0 8px 32px rgba(0,0,0,0.4)` : '0 2px 12px rgba(0,0,0,0.3)',
        transition: 'background 0.25s, border-color 0.25s, box-shadow 0.25s',
        ...style,
      }}
    >
      {children}
    </motion.div>
  )
}

/* ─── Tip tooltip ────────────────────────────────────────────── */
function Tip({ text, children }: { text:string; children:React.ReactNode }) {
  const [show, setShow] = useState(false)
  return (
    <span style={{ position:'relative', display:'inline-block' }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.span
            initial={{ opacity:0, y:4, scale:0.92 }}
            animate={{ opacity:1, y:0,  scale:1 }}
            exit={{   opacity:0, y:4,  scale:0.92 }}
            transition={{ duration:0.18 }}
            style={{
              position:'absolute', bottom:'calc(100% + 6px)', left:'50%',
              transform:'translateX(-50%)',
              background:'rgba(0,169,224,0.92)', backdropFilter:'blur(8px)',
              color:'#fff', fontSize:10, fontWeight:600, letterSpacing:'0.06em',
              padding:'4px 8px', borderRadius:4, whiteSpace:'nowrap', pointerEvents:'none',
              zIndex:100,
            }}
          >{text}</motion.span>
        )}
      </AnimatePresence>
    </span>
  )
}

/* ─── Floating orb ───────────────────────────────────────────── */
function Orb({ color, size, top, left, delay=0 }:{color:string;size:number;top:string;left:string;delay?:number}) {
  return (
    <motion.div
      animate={{ scale:[1,1.08,1], opacity:[0.18,0.26,0.18] }}
      transition={{ duration:6+delay, repeat:Infinity, ease:'easeInOut', delay }}
      style={{
        position:'absolute', width:size, height:size,
        top, left,
        borderRadius:'50%',
        background:`radial-gradient(circle at 40% 40%, ${color}, transparent 70%)`,
        filter:`blur(${size*0.5}px)`,
        pointerEvents:'none', zIndex:0,
      }}
    />
  )
}

/* ─── Section nav card ───────────────────────────────────────── */
function NavCard({ href, label, sub, accent=C.sky }: {href:string;label:string;sub:string;accent?:string}) {
  const [hov, setHov] = useState(false)
  return (
    <motion.a
      href={href}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      whileHover={{ y:-4, transition:{duration:0.22} }}
      style={{
        display:'block', textDecoration:'none',
        background: hov ? 'rgba(255,255,255,0.07)' : 'rgba(255,255,255,0.03)',
        backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
        border: `1px solid ${hov ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)'}`,
        borderTop: `2px solid ${accent}`,
        borderRadius:2, padding:'18px 16px',
        boxShadow: hov ? `0 0 24px ${accent}22, 0 6px 20px rgba(0,0,0,0.35)` : '0 2px 8px rgba(0,0,0,0.25)',
        transition:'background 0.22s,border-color 0.22s,box-shadow 0.22s',
      }}
    >
      <div style={{fontFamily:"'Montserrat',sans-serif",fontWeight:700,fontSize:13,color:C.white,marginBottom:5,letterSpacing:'-0.01em'}}>
        {label}
      </div>
      <div style={{fontSize:10,color:'rgba(255,255,255,0.45)',letterSpacing:'0.06em',lineHeight:1.5}}>{sub}</div>
    </motion.a>
  )
}

/* ═══════════════════════════════════════════════════════════════
   MAIN PAGE
═══════════════════════════════════════════════════════════════ */
export default function PitchPage() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()
  const heroY    = useTransform(scrollY, [0,600], [0,-120])
  const heroOp   = useTransform(scrollY, [0,400], [1, 0.3])
  const gridY    = useTransform(scrollY, [0,600], [0,-60])

  return (
    <main style={{ fontFamily:"'Helvetica Neue',Arial,sans-serif", background:C.bg, color:C.white, minHeight:'100vh', overflowX:'hidden' }}>

      {/* ── NAV ───────────────────────────────────────────────── */}
      <motion.nav
        initial={{ opacity:0, y:-12 }}
        animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5, ease }}
        style={{
          position:'fixed', top:0, left:0, right:0, zIndex:100,
          display:'flex', justifyContent:'space-between', alignItems:'center',
          padding:'18px 40px',
          background:'rgba(10,10,10,0.80)',
          backdropFilter:'blur(20px)', WebkitBackdropFilter:'blur(20px)',
          borderBottom:`1px solid rgba(255,255,255,0.06)`,
        }}
      >
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <span style={{ fontSize:10, letterSpacing:'0.3em', color:'rgba(255,255,255,0.35)', textTransform:'uppercase' }}>HOLA VUMI</span>
          <span style={{ color:'rgba(255,255,255,0.12)' }}>×</span>
          <span style={{ fontSize:10, letterSpacing:'0.3em', color:C.sky, textTransform:'uppercase' }}>2026</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:16 }}>
          <motion.a
            href="/intelligence"
            whileHover={{ opacity:1 }}
            style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', color:'rgba(255,255,255,0.45)', textDecoration:'none' }}
          >Portal →</motion.a>
          <motion.button
            whileHover={{ background:'rgba(0,169,224,0.15)', borderColor:'rgba(0,169,224,0.5)' }}
            style={{ fontSize:10, letterSpacing:'0.2em', textTransform:'uppercase', background:'transparent', border:'1px solid rgba(255,255,255,0.18)', color:'rgba(255,255,255,0.55)', padding:'6px 14px', cursor:'pointer', borderRadius:2, transition:'all 0.2s' }}
          >EN</motion.button>
        </div>
      </motion.nav>

      {/* ── HERO ──────────────────────────────────────────────── */}
      <section ref={heroRef} style={{ minHeight:'100vh', display:'flex', flexDirection:'column', justifyContent:'flex-end', padding:'120px 40px 80px', position:'relative', overflow:'hidden' }}>

        {/* Parallax background grid */}
        <motion.div style={{ position:'absolute', inset:0, y:gridY,
          backgroundImage:`linear-gradient(${C.gridLn} 1px,transparent 1px),linear-gradient(90deg,${C.gridLn} 1px,transparent 1px)`,
          backgroundSize:'80px 80px', pointerEvents:'none' }}
        />

        {/* Floating orbs */}
        <Orb color={C.sky}  size={500} top="5%"  left="60%" delay={0} />
        <Orb color={C.red}  size={320} top="40%" left="80%" delay={2} />
        <Orb color={C.blue} size={400} top="20%" left="5%"  delay={1.5} />

        {/* Vertical accent line */}
        <div style={{ position:'absolute', top:0, left:40, width:1, height:'100%', background:`linear-gradient(to bottom,${C.sky},transparent)`, opacity:0.3 }} />

        <motion.div style={{ position:'relative', maxWidth:1200, y:heroY, opacity:heroOp }}>
          <motion.p {...fadeIn} transition={{ duration:0.6, delay:0.2, ease }} style={{ fontSize:12, letterSpacing:'0.35em', color:C.sky, textTransform:'uppercase', marginBottom:32 }}>
            Propuesta conjunta de agencias
          </motion.p>

          <motion.h1 {...fadeUp} transition={{ duration:0.8, delay:0.3, ease }} style={{ fontSize:'clamp(48px,8vw,118px)', fontWeight:900, lineHeight:0.9, letterSpacing:'-0.03em', marginBottom:48 }}>
            <span style={{ display:'block' }}>LA</span>
            <span style={{ display:'block', color:C.red }}>DESPENSA</span>
            <span style={{ display:'block', color:'rgba(255,255,255,0.18)' }}>×</span>
            <span style={{ display:'block', color:C.sky }}>REMOTIVE</span>
            <span style={{ display:'block', color:'rgba(255,255,255,0.14)', fontSize:'0.54em', fontWeight:400, letterSpacing:'0.01em', marginTop:24 }}>
              Creatividad + Inteligencia para el lanzamiento de VUMI en España
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.8, delay:0.6, ease }}
            style={{ display:'flex', gap:2, flexWrap:'wrap' }}
          >
            {[
              { v:'23', l:'Años de\nexperiencia\nLa Despensa', tip:'Fundada 2003. 32 personas.' },
              { v:'6ª',  l:'Mejor agencia\nde España\nSCOPEN 2022', tip:'Ranking por valoración de clientes reales.' },
              { v:'18',  l:'Brokers\nidentificados\nAlta compatibilidad', tip:'Fit score calculado por CCAA, expat DNA, IPMI track.' },
              { v:'130', l:'Chunks de\ninteligencia\nRAG activo', tip:'Embedded en pgvector. Query en <2s.' },
            ].map(({ v, l, tip }) => (
              <GlassCard key={v} style={{ padding:'28px 36px', flex:'1 1 140px', minWidth:130 }}>
                <Tip text={tip}>
                  <p style={{ fontSize:'clamp(36px,4.5vw,62px)', fontWeight:900, lineHeight:1, letterSpacing:'-0.03em', marginBottom:6, cursor:'default' }}>{v}</p>
                </Tip>
                <p style={{ fontSize:10, color:'rgba(255,255,255,0.4)', letterSpacing:'0.14em', textTransform:'uppercase', lineHeight:1.55, whiteSpace:'pre-line' }}>{l}</p>
              </GlassCard>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── QUOTE ─────────────────────────────────────────────── */}
      <section style={{ padding:'120px 40px', maxWidth:900, margin:'0 auto' }}>
        <Reveal>
          <GlassCard style={{ borderLeft:`3px solid ${C.red}`, padding:'40px 40px', marginBottom:48 }}>
            <p style={{ fontSize:'clamp(20px,3.2vw,38px)', lineHeight:1.28, fontWeight:700, letterSpacing:'-0.02em' }}>
              "España tiene 900.000 latinoamericanos con renta media-alta y cero opciones de seguro de salud que los traten como lo que son."
            </p>
          </GlassCard>
        </Reveal>
        <Reveal delay={0.1}>
          <p style={{ fontSize:17, lineHeight:1.7, color:C.dim, maxWidth:680 }}>
            La Despensa y ReMotive Media llegan juntas para cubrir ese hueco. Una con la mejor creatividad independiente de España. La otra con la arquitectura de inteligencia de mercado más sofisticada del sector.
          </p>
        </Reveal>
      </section>

      {/* ── AGENCY CARDS ──────────────────────────────────────── */}
      <section style={{ padding:'80px 40px', borderTop:`1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <p style={{ fontSize:10, letterSpacing:'0.32em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:56 }}>Dos agencias. Una propuesta.</p>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2 }}>
            {/* La Despensa */}
            <Reveal delay={0}>
              <GlassCard hoverGlow={C.red} style={{ padding:'56px 48px', height:'100%' }}>
                <div style={{ borderBottom:`2px solid ${C.red}`, paddingBottom:24, marginBottom:32 }}>
                  <h3 style={{ fontSize:28, fontWeight:900, letterSpacing:'-0.02em', marginBottom:8 }}>LA DESPENSA</h3>
                  <p style={{ fontSize:12, color:C.red, letterSpacing:'0.12em', textTransform:'uppercase' }}>Estrategia creativa &amp; campaña</p>
                </div>
                <ul style={{ listStyle:'none', margin:0, padding:0, marginBottom:40 }}>
                  {[
                    '23 años. 32 personas. 5 perros. Cero jerarquías de grupo.',
                    'Aegon: 6 años, #Cariñoterapia — el caso de referencia del sector salud en España.',
                    'Finetwork (lanzamiento nacional), Burger King (14 años), Tanqueray, Schweppes.',
                    '6ª mejor agencia de España según clientes reales. SCOPEN 2022.',
                    'Creemos en el poder transformador de la creatividad. Nada más.',
                  ].map((t,i) => (
                    <motion.li key={i} initial={{ opacity:0,x:-12 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.4, ease }}
                      style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:16 }}>
                      <span style={{ color:C.red, marginTop:3, fontSize:11, flexShrink:0 }}>▶</span>
                      <span style={{ fontSize:15, lineHeight:1.55, color:'rgba(255,255,255,0.68)' }}>{t}</span>
                    </motion.li>
                  ))}
                </ul>
                <div style={{ borderTop:`1px solid rgba(255,255,255,0.07)`, paddingTop:24 }}>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.3)', fontStyle:'italic', lineHeight:1.6 }}>Premio Eficacia, Gran Premio Genio. Campañas que funcionan en la calle, no solo en awards shows.</p>
                </div>
              </GlassCard>
            </Reveal>

            {/* ReMotive */}
            <Reveal delay={0.1}>
              <GlassCard hoverGlow={C.sky} style={{ padding:'56px 48px', height:'100%' }}>
                <div style={{ borderBottom:`2px solid ${C.sky}`, paddingBottom:24, marginBottom:32 }}>
                  <h3 style={{ fontSize:28, fontWeight:900, letterSpacing:'-0.02em', marginBottom:8 }}>REMOTIVE MEDIA</h3>
                  <p style={{ fontSize:12, color:C.sky, letterSpacing:'0.12em', textTransform:'uppercase' }}>Inteligencia de mercado &amp; medios</p>
                </div>
                <ul style={{ listStyle:'none', margin:0, padding:0, marginBottom:40 }}>
                  {[
                    'Strategic Intelligence Portal activo: vumi.agency — RAG sobre corpus VUMI.',
                    '18 brokers catalogados con fit score. 9 competidores analizados. 3 segmentos LATAM.',
                    'Media mix diferencial: radio latina, creadores LATAM, DOOH en barrios venezolanos/colombianos.',
                    '10 espacios sin contestar identificados en el mercado — ningún competidor los toca.',
                    'Pipeline data → creative → media → measurement ya construido.',
                  ].map((t,i) => (
                    <motion.li key={i} initial={{ opacity:0,x:-12 }} whileInView={{ opacity:1,x:0 }} viewport={{ once:true }} transition={{ delay:i*0.08, duration:0.4, ease }}
                      style={{ display:'flex', gap:12, alignItems:'flex-start', marginBottom:16 }}>
                      <span style={{ color:C.sky, marginTop:3, fontSize:11, flexShrink:0 }}>▶</span>
                      <span style={{ fontSize:15, lineHeight:1.55, color:'rgba(255,255,255,0.68)' }}>{t}</span>
                    </motion.li>
                  ))}
                </ul>
                <div style={{ borderTop:`1px solid rgba(255,255,255,0.07)`, paddingTop:24 }}>
                  <p style={{ fontSize:12, color:'rgba(255,255,255,0.3)', fontStyle:'italic', lineHeight:1.6 }}>El portal ya existe. No es una promesa. Es una ventaja competitiva funcionando hoy.</p>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── PROPOSITION ───────────────────────────────────────── */}
      <section style={{ padding:'120px 40px', background:`linear-gradient(135deg,${C.blue}16 0%,transparent 60%)` }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <p style={{ fontSize:10, letterSpacing:'0.32em', color:C.sky, textTransform:'uppercase', marginBottom:44 }}>Lo que proponemos</p>
            <h2 style={{ fontSize:'clamp(32px,5vw,70px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1, marginBottom:64 }}>
              Un lanzamiento que el mercado español no ha visto en salud.
            </h2>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
            {[
              { n:'01', t:'Creatividad con dientes', c:C.red,  b:'Una plataforma creativa construida para el expat LATAM de clase media-alta. No adaptaciones de campaña genérica — ideas nacidas de esa audiencia, para esa audiencia.' },
              { n:'02', t:'Inteligencia accionable', c:C.sky,  b:'Decisiones de medios, canal y geografía basadas en datos reales de los tres segmentos LATAM prioritarios. No en intuición de agencia.' },
              { n:'03', t:'Canal broker activado',   c:C.white, b:'18 brokers identificados con scoring de compatibilidad por CCAA. El canal más eficiente para IPMI en España, sin explotar por los competidores.' },
            ].map(({ n, t, c, b },i) => (
              <Reveal key={n} delay={i*0.1}>
                <GlassCard hoverGlow={c} style={{ padding:'48px 40px', height:'100%' }}>
                  <p style={{ fontSize:48, fontWeight:900, color:'rgba(255,255,255,0.05)', letterSpacing:'-0.04em', marginBottom:24 }}>{n}</p>
                  <h3 style={{ fontSize:22, fontWeight:800, letterSpacing:'-0.02em', marginBottom:16, color:c }}>{t}</h3>
                  <p style={{ fontSize:15, lineHeight:1.7, color:'rgba(255,255,255,0.52)' }}>{b}</p>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── INTELLIGENCE + NIVO ───────────────────────────────── */}
      <section style={{ padding:'120px 40px', borderTop:`1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'start' }}>
          <Reveal>
            <p style={{ fontSize:10, letterSpacing:'0.32em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:28 }}>La ventaja de inteligencia</p>
            <h2 style={{ fontSize:'clamp(28px,4vw,52px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1.05, marginBottom:28 }}>El portal es la propuesta.</h2>
            <p style={{ fontSize:15, lineHeight:1.75, color:'rgba(255,255,255,0.58)', marginBottom:44 }}>
              No construimos una presentación. Construimos un sistema de decisión. El Strategic Intelligence Portal de VUMI España integra corpus RAG, datos de mercado en tiempo real, análisis de brokers por CCAA y señales competitivas — todo en una sola plataforma.
            </p>
            <motion.a
              href="/intelligence"
              whileHover={{ gap:16, color:C.sky }}
              style={{ display:'inline-flex', alignItems:'center', gap:10, fontSize:11, letterSpacing:'0.22em', textTransform:'uppercase', color:C.sky, textDecoration:'none', borderBottom:`1px solid ${C.sky}`, paddingBottom:4, transition:'gap 0.2s' }}
            >Ver el portal en vivo →</motion.a>
          </Reveal>

          {/* Nivo RadialBar */}
          <Reveal delay={0.15}>
            <div style={{ position:'relative' }}>
              <div style={{ height:300, position:'relative' }}>
                <ResponsiveRadialBar
                  data={radarData}
                  valueFormat=">-.0f"
                  padding={0.4}
                  cornerRadius={3}
                  colors={[C.sky, '#00C875', C.red, '#FFD166']}
                  borderColor={{ from:'color', modifiers:[['darker',1.2]] }}
                  startAngle={-100}
                  endAngle={260}
                  innerRadius={0.3}
                  enableTracks={true}
                  tracksColor="rgba(255,255,255,0.05)"
                  enableRadialGrid={false}
                  enableCircularGrid={false}
                  radialAxisStart={{ tickSize:0, tickPadding:0 }}
                  circularAxisOuter={{ tickSize:0, tickPadding:8 }}
                  legends={[{
                    anchor:'bottom', direction:'row', justify:false, translateX:0, translateY:24,
                    itemsSpacing:8, itemDirection:'left-to-right', itemWidth:120, itemHeight:18,
                    itemTextColor:'rgba(255,255,255,0.4)', symbolSize:10, symbolShape:'circle',
                  }]}
                  theme={{
                    background:'transparent',
                    text:{ fill:'rgba(255,255,255,0.4)', fontSize:10 },
                    tooltip:{ container:{ background:'#1a1a2e', color:'#fff', borderRadius:4, fontSize:12, border:'1px solid rgba(255,255,255,0.1)' } },
                  }}
                  motionConfig="gentle"
                />
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:2, marginTop:16 }}>
                {[
                  { v:'130', l:'Chunks de inteligencia indexados', c:C.sky },
                  { v:'10',  l:'Hipótesis estratégicas activas',   c:'#00C875' },
                  { v:'18',  l:'Brokers catalogados con fit score', c:C.red },
                  { v:'9',   l:'Competidores mapeados con gaps',    c:'#FFD166' },
                ].map(({ v, l, c }) => (
                  <GlassCard key={v} style={{ padding:'22px 20px' }}>
                    <p style={{ fontFamily:"'Montserrat',sans-serif", fontSize:30, fontWeight:900, color:c, lineHeight:1, marginBottom:5 }}>{v}</p>
                    <p style={{ fontSize:10, color:'rgba(255,255,255,0.45)', lineHeight:1.5 }}>{l}</p>
                  </GlassCard>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CASES ─────────────────────────────────────────────── */}
      <section style={{ padding:'80px 40px', background:'rgba(255,255,255,0.016)', borderTop:`1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <p style={{ fontSize:10, letterSpacing:'0.32em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:44 }}>Casos que respaldan la propuesta</p>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:2 }}>
            {[
              { agency:'La Despensa', brand:'Aegon España',      color:C.red, tags:['Salud','Seguros','Emocional','Multi-año'], body:'6 años de relación. Campaña #Cariñoterapia: el acompañamiento como propuesta emocional en salud. Multi-año, multi-formato, TV a digital.' },
              { agency:'La Despensa', brand:'Finetwork',          color:C.red, tags:['Lanzamiento','Nacional','Full-funnel'],  body:'Lanzamiento nacional desde cero. Todos los puntos de contacto en 2 años. Entrada en mercado saturado con identidad diferencial.' },
              { agency:'ReMotive',    brand:'VUMI Spain Portal',  color:C.sky, tags:['Inteligencia','RAG','Data','Live'],       body:'Strategic Intelligence Portal live. RAG sobre 130 chunks. Brokers, competidores, audiencias LATAM — todo consultable en tiempo real.' },
            ].map(({ agency, brand, color, tags, body }, i) => (
              <Reveal key={brand} delay={i*0.1}>
                <GlassCard hoverGlow={color} style={{ padding:'36px 32px', height:'100%' }}>
                  <p style={{ fontSize:10, letterSpacing:'0.28em', color, textTransform:'uppercase', marginBottom:14 }}>{agency}</p>
                  <p style={{ fontSize:20, fontWeight:800, letterSpacing:'-0.02em', marginBottom:12 }}>{brand}</p>
                  <p style={{ fontSize:13, color:'rgba(255,255,255,0.52)', lineHeight:1.65, marginBottom:22 }}>{body}</p>
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
                    {tags.map(tag => (
                      <span key={tag} style={{ fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', background:'rgba(255,255,255,0.06)', padding:'3px 9px', borderRadius:2, color:'rgba(255,255,255,0.45)' }}>{tag}</span>
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section style={{ padding:'120px 40px', background:`linear-gradient(to right,${C.blue},#001A5C)`, borderTop:`1px solid rgba(255,255,255,0.1)` }}>
        <div style={{ maxWidth:900, margin:'0 auto', textAlign:'center' }}>
          <Reveal>
            <p style={{ fontSize:10, letterSpacing:'0.32em', color:'rgba(255,255,255,0.45)', textTransform:'uppercase', marginBottom:28 }}>Próximos pasos</p>
            <h2 style={{ fontSize:'clamp(32px,5vw,62px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1.05, marginBottom:28 }}>Arranquemos.</h2>
            <p style={{ fontSize:17, lineHeight:1.7, color:'rgba(255,255,255,0.68)', maxWidth:580, margin:'0 auto 56px' }}>
              Una sesión de trabajo. Sin presentaciones de 80 slides. Con el portal abierto, el corpus consultable y las decisiones que hay que tomar sobre la mesa.
            </p>
            <div style={{ display:'flex', gap:16, justifyContent:'center', flexWrap:'wrap' }}>
              <motion.a
                href="mailto:alex@rmtv.io"
                whileHover={{ scale:1.03, boxShadow:'0 0 32px rgba(255,255,255,0.2)' }}
                whileTap={{ scale:0.98 }}
                style={{ display:'inline-block', padding:'16px 40px', background:C.white, color:C.blue, fontSize:12, fontWeight:800, letterSpacing:'0.15em', textTransform:'uppercase', textDecoration:'none', borderRadius:2, transition:'box-shadow 0.2s' }}
              >Contactar ahora</motion.a>
              <motion.a
                href="/intelligence"
                whileHover={{ scale:1.03, background:'rgba(255,255,255,0.1)' }}
                whileTap={{ scale:0.98 }}
                style={{ display:'inline-block', padding:'16px 40px', background:'transparent', color:C.white, border:'1px solid rgba(255,255,255,0.38)', fontSize:12, fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', textDecoration:'none', borderRadius:2, transition:'background 0.2s' }}
              >Ver el portal</motion.a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── SECTION NAV GRID ──────────────────────────────────── */}
      <section style={{ padding:'100px 40px', borderTop:`1px solid rgba(255,255,255,0.07)`, background:C.bg }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <Reveal>
            <p style={{ fontSize:10, letterSpacing:'0.32em', color:'rgba(255,255,255,0.28)', textTransform:'uppercase', marginBottom:16 }}>Portal de inteligencia</p>
            <h2 style={{ fontSize:'clamp(22px,3.5vw,44px)', fontWeight:900, letterSpacing:'-0.03em', lineHeight:1.05, marginBottom:12 }}>
              Lo que ya construimos para ti.
            </h2>
            <p style={{ fontSize:14, color:'rgba(255,255,255,0.4)', marginBottom:52, maxWidth:520 }}>
              Acceso directo a cada capa de la inteligencia VUMI España. Todo en tiempo real. Todo consultable.
            </p>
          </Reveal>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:2, marginBottom:2 }}>
            {[
              { href:'/intelligence',             label:'Cockpit',      sub:'Command center España',           accent:C.sky },
              { href:'/intelligence/audiences',   label:'Audiencias',   sub:'VE 377K · CO 676K · MX 36K',     accent:C.sky },
              { href:'/intelligence/geography',   label:'Geografía',    sub:'10 ciudades · P0: Madrid + BCN',  accent:C.sky },
              { href:'/intelligence/brokers',     label:'Brokers',      sub:'18 catalogados · 6 Tier-1',       accent:'#00C875' },
              { href:'/intelligence/competitors', label:'Competidores', sub:'9 mapeados · MFSA vs FCA',        accent:C.red },
            ].map((c,i) => (
              <Reveal key={c.href} delay={i*0.06}>
                <NavCard {...c} />
              </Reveal>
            ))}
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:2 }}>
            {[
              { href:'/intelligence/proposition', label:'Propuesta',    sub:'Euro Health Priority→Premier',    accent:'#FFD166' },
              { href:'/intelligence/roadmap',     label:'Roadmap',      sub:'5 gates · 30/60/90/180/365d',     accent:C.sky },
              { href:'/intelligence/gates',       label:'Gates & Gaps', sub:'12 gaps · 4 bloqueantes',         accent:C.red },
              { href:'/intelligence/signals',     label:'Señales',      sub:'48 señales · refresh lunes 6am',  accent:C.sky },
              { href:'/intelligence/ask',         label:'Ask VUMI',     sub:'RAG · 130 chunks · voice agent',  accent:'#00C875' },
            ].map((c,i) => (
              <Reveal key={c.href} delay={0.3+i*0.06}>
                <NavCard {...c} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ────────────────────────────────────────────── */}
      <footer style={{ padding:'32px 40px', borderTop:`1px solid rgba(255,255,255,0.06)`, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16 }}>
        <div style={{ display:'flex', gap:28, alignItems:'center' }}>
          <span style={{ fontSize:10, letterSpacing:'0.22em', color:'rgba(255,255,255,0.22)', textTransform:'uppercase' }}>La Despensa × ReMotive Media</span>
          <span style={{ fontSize:10, color:'rgba(255,255,255,0.12)' }}>Para VUMI Europe España — 2026</span>
        </div>
        <div style={{ display:'flex', gap:20 }}>
          <a href="/intelligence" style={{ fontSize:10, color:'rgba(255,255,255,0.28)', textDecoration:'none', letterSpacing:'0.16em', textTransform:'uppercase' }}>Portal →</a>
          <a href="/intelligence/brokers" style={{ fontSize:10, color:'rgba(255,255,255,0.28)', textDecoration:'none', letterSpacing:'0.16em', textTransform:'uppercase' }}>Brokers →</a>
        </div>
      </footer>

    </main>
  )
}
