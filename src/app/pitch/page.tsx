'use client';

import { useState } from 'react';

const VUMI_BLUE = '#0033A0';
const VUMI_SKY = '#00A9E0';
const LD_BLACK = '#0A0A0A';
const LD_RED = '#E8311A';

export default function PitchPage() {
  const [lang, setLang] = useState<'es' | 'en'>('es');
  const t = lang === 'es' ? es : en;

  return (
    <main style={{ fontFamily: "'Helvetica Neue', Arial, sans-serif", background: LD_BLACK, color: '#fff', minHeight: '100vh' }}>

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '20px 40px',
        background: 'rgba(10,10,10,0.95)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        backdropFilter: 'blur(12px)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 11, letterSpacing: '0.25em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
            HOLA VUMI
          </span>
          <span style={{ color: 'rgba(255,255,255,0.15)' }}>×</span>
          <span style={{ fontSize: 11, letterSpacing: '0.25em', color: VUMI_SKY, textTransform: 'uppercase' }}>
            2026
          </span>
        </div>
        <button
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          style={{
            fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase',
            background: 'transparent', border: '1px solid rgba(255,255,255,0.2)',
            color: 'rgba(255,255,255,0.6)', padding: '6px 14px', cursor: 'pointer',
            borderRadius: 2,
          }}
        >
          {lang === 'es' ? 'EN' : 'ES'}
        </button>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'flex-end', padding: '120px 40px 80px',
        position: 'relative', overflow: 'hidden',
      }}>
        {/* background grid */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `linear-gradient(rgba(0,169,224,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,169,224,0.04) 1px, transparent 1px)`,
          backgroundSize: '80px 80px',
        }} />
        {/* accent line */}
        <div style={{ position: 'absolute', top: 0, left: 40, width: 1, height: '100%', background: `linear-gradient(to bottom, ${VUMI_SKY}, transparent)`, opacity: 0.3 }} />

        <div style={{ position: 'relative', maxWidth: 1200 }}>
          <p style={{ fontSize: 13, letterSpacing: '0.3em', color: VUMI_SKY, textTransform: 'uppercase', marginBottom: 32 }}>
            {t.heroLabel}
          </p>
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 120px)',
            fontWeight: 900, lineHeight: 0.9,
            letterSpacing: '-0.03em',
            marginBottom: 48,
          }}>
            <span style={{ display: 'block' }}>LA</span>
            <span style={{ display: 'block', color: LD_RED }}>DESPENSA</span>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.2)' }}>×</span>
            <span style={{ display: 'block', color: VUMI_SKY }}>REMOTIVE</span>
            <span style={{ display: 'block', color: 'rgba(255,255,255,0.15)', fontSize: '0.55em', fontWeight: 400, letterSpacing: '0.01em', marginTop: 24 }}>
              {t.heroSub}
            </span>
          </h1>

          <div style={{ display: 'flex', gap: 48, flexWrap: 'wrap' }}>
            <Stat label={t.stat1Label} value="23" unit={t.stat1Unit} />
            <Stat label={t.stat2Label} value="6ª" unit={t.stat2Unit} />
            <Stat label={t.stat3Label} value="18" unit={t.stat3Unit} />
            <Stat label={t.stat4Label} value="128" unit={t.stat4Unit} />
          </div>
        </div>
      </section>

      {/* MANIFESTO */}
      <section style={{ padding: '120px 40px', maxWidth: 900, margin: '0 auto' }}>
        <div style={{ borderLeft: `3px solid ${LD_RED}`, paddingLeft: 32, marginBottom: 64 }}>
          <p style={{ fontSize: 'clamp(22px, 3.5vw, 42px)', lineHeight: 1.25, fontWeight: 700, letterSpacing: '-0.02em' }}>
            {t.manifesto}
          </p>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.7, color: 'rgba(255,255,255,0.65)', maxWidth: 680 }}>
          {t.manifestoSub}
        </p>
      </section>

      {/* TWO AGENCIES */}
      <section style={{ padding: '80px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 64 }}>
            {t.agenciesLabel}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            <AgencyCard
              name="LA DESPENSA"
              accent={LD_RED}
              role={t.ldRole}
              bullets={t.ldBullets}
              proof={t.ldProof}
            />
            <AgencyCard
              name="REMOTIVE MEDIA"
              accent={VUMI_SKY}
              role={t.rmRole}
              bullets={t.rmBullets}
              proof={t.rmProof}
            />
          </div>
        </div>
      </section>

      {/* THE PROPOSITION */}
      <section style={{ padding: '120px 40px', background: `linear-gradient(135deg, ${VUMI_BLUE}22 0%, transparent 60%)` }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: VUMI_SKY, textTransform: 'uppercase', marginBottom: 48 }}>
            {t.propositionLabel}
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 72px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 72 }}>
            {t.propositionTitle}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {t.pillars.map((pillar, i) => (
              <PillarCard key={i} number={`0${i + 1}`} title={pillar.title} body={pillar.body} accent={i === 0 ? LD_RED : i === 1 ? VUMI_SKY : '#fff'} />
            ))}
          </div>
        </div>
      </section>

      {/* INTELLIGENCE ADVANTAGE */}
      <section style={{ padding: '120px 40px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 32 }}>
              {t.intelLabel}
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 32 }}>
              {t.intelTitle}
            </h2>
            <p style={{ fontSize: 16, lineHeight: 1.7, color: 'rgba(255,255,255,0.6)', marginBottom: 48 }}>
              {t.intelBody}
            </p>
            <a href="/intelligence" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: VUMI_SKY, textDecoration: 'none',
              borderBottom: `1px solid ${VUMI_SKY}`, paddingBottom: 4,
            }}>
              {t.intelCTA} →
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {t.intelStats.map((s, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                padding: '28px 24px',
              }}>
                <p style={{ fontSize: 36, fontWeight: 900, color: VUMI_SKY, marginBottom: 6 }}>{s.value}</p>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CASES */}
      <section style={{ padding: '80px 40px', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', marginBottom: 48 }}>
            {t.casesLabel}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2 }}>
            {t.cases.map((c, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)',
                padding: '36px 32px',
              }}>
                <p style={{ fontSize: 10, letterSpacing: '0.25em', color: LD_RED, textTransform: 'uppercase', marginBottom: 16 }}>{c.agency}</p>
                <p style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 12 }}>{c.brand}</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6, marginBottom: 24 }}>{c.detail}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {c.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase',
                      background: 'rgba(255,255,255,0.06)', padding: '4px 10px', borderRadius: 2,
                      color: 'rgba(255,255,255,0.5)',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEXT STEPS */}
      <section style={{
        padding: '120px 40px',
        background: `linear-gradient(to right, ${VUMI_BLUE}, #001A5C)`,
        borderTop: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: 11, letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: 32 }}>
            {t.nextLabel}
          </p>
          <h2 style={{ fontSize: 'clamp(32px, 5vw, 64px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 32 }}>
            {t.nextTitle}
          </h2>
          <p style={{ fontSize: 18, lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', maxWidth: 620, margin: '0 auto 64px' }}>
            {t.nextBody}
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="mailto:alex@rmtv.io" style={{
              display: 'inline-block', padding: '16px 36px',
              background: '#fff', color: VUMI_BLUE,
              fontSize: 13, fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 2,
            }}>
              {t.ctaPrimary}
            </a>
            <a href="/intelligence" style={{
              display: 'inline-block', padding: '16px 36px',
              background: 'transparent', color: '#fff',
              border: '1px solid rgba(255,255,255,0.4)',
              fontSize: 13, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
              textDecoration: 'none', borderRadius: 2,
            }}>
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{
        padding: '40px',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        flexWrap: 'wrap', gap: 16,
      }}>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          <span style={{ fontSize: 11, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase' }}>La Despensa × ReMotive Media</span>
          <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.15)' }}>Para VUMI Europe España — 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="/intelligence" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Portal →</a>
          <a href="/brokers" style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', textDecoration: 'none', letterSpacing: '0.15em', textTransform: 'uppercase' }}>Brokers →</a>
        </div>
      </footer>
    </main>
  );
}

// Sub-components

function Stat({ label, value, unit }: { label: string; value: string; unit: string }) {
  return (
    <div>
      <p style={{ fontSize: 'clamp(36px, 5vw, 64px)', fontWeight: 900, lineHeight: 1, letterSpacing: '-0.03em', marginBottom: 6 }}>{value}</p>
      <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', lineHeight: 1.4 }}>
        {label}<br />{unit}
      </p>
    </div>
  );
}

function AgencyCard({ name, accent, role, bullets, proof }: {
  name: string; accent: string; role: string;
  bullets: string[]; proof: string;
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
      padding: '56px 48px',
    }}>
      <div style={{ borderBottom: `2px solid ${accent}`, paddingBottom: 24, marginBottom: 32 }}>
        <h3 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>{name}</h3>
        <p style={{ fontSize: 13, color: accent, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{role}</p>
      </div>
      <ul style={{ listStyle: 'none', margin: 0, padding: 0, marginBottom: 40 }}>
        {bullets.map((b, i) => (
          <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 16 }}>
            <span style={{ color: accent, marginTop: 2, fontSize: 12, flexShrink: 0 }}>▶</span>
            <span style={{ fontSize: 15, lineHeight: 1.55, color: 'rgba(255,255,255,0.7)' }}>{b}</span>
          </li>
        ))}
      </ul>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 24 }}>
        <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontStyle: 'italic', lineHeight: 1.6 }}>{proof}</p>
      </div>
    </div>
  );
}

function PillarCard({ number, title, body, accent }: {
  number: string; title: string; body: string; accent: string;
}) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.025)', border: '1px solid rgba(255,255,255,0.06)',
      padding: '48px 40px',
    }}>
      <p style={{ fontSize: 48, fontWeight: 900, color: 'rgba(255,255,255,0.06)', letterSpacing: '-0.04em', marginBottom: 24 }}>{number}</p>
      <h3 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16, color: accent }}>{title}</h3>
      <p style={{ fontSize: 15, lineHeight: 1.7, color: 'rgba(255,255,255,0.55)' }}>{body}</p>
    </div>
  );
}

// Copy

const es = {
  heroLabel: 'Propuesta conjunta de agencias',
  heroSub: 'Creatividad + Inteligencia para el lanzamiento de VUMI en España',
  stat1Label: 'Años de\nexperiencia', stat1Unit: 'La Despensa',
  stat2Label: 'Mejor agencia\nde España', stat2Unit: 'SCOPEN 2022',
  stat3Label: 'Brokers\nidentificados', stat3Unit: 'Alta compatibilidad',
  stat4Label: 'Chunks de\ninteligencia', stat4Unit: 'RAG activo',
  manifesto: '"España tiene 900.000 latinoamericanos con renta media-alta y cero opciones de seguro de salud que los traten como lo que son."',
  manifestoSub: 'La Despensa y ReMotive Media llegan juntas para cubrir ese hueco. Una con la mejor creatividad independiente de España. La otra con la arquitectura de inteligencia de mercado más sofisticada del sector.',
  agenciesLabel: 'Dos agencias. Una propuesta.',
  ldRole: 'Estrategia creativa & campaña',
  ldBullets: [
    '23 años. 32 personas. 5 perros. Cero jerarquías de grupo.',
    'Aegon: 6 años, #Cariñoterapia — el caso de referencia del sector salud en España.',
    'Finetwork (lanzamiento nacional), Burger King (14 años), Tanqueray, Schweppes.',
    '6ª mejor agencia de España según clientes reales. SCOPEN 2022.',
    'Creemos en el poder transformador de la creatividad. Nada más.',
  ],
  ldProof: 'Premio Eficacia, Gran Premio Genio. Campañas que funcionan en la calle, no solo en awards shows.',
  rmRole: 'Inteligencia de mercado & medios',
  rmBullets: [
    'Strategic Intelligence Portal activo: vumi.agency — RAG sobre corpus VUMI.',
    '18 brokers catalogados con fit score. 9 competidores analizados. 3 segmentos LATAM.',
    'Media mix diferencial: radio latina, creadores LATAM, DOOH en barrios venezolanos/colombianos.',
    '10 espacios sin contestar identificados en el mercado — ningún competidor los toca.',
    'Pipeline data → creative → media → measurement ya construido.',
  ],
  rmProof: 'El portal ya existe. No es una promesa. Es una ventaja competitiva funcionando hoy.',
  propositionLabel: 'Lo que proponemos',
  propositionTitle: 'Un lanzamiento que el mercado español no ha visto en salud.',
  pillars: [
    {
      title: 'Creatividad con dientes',
      body: 'Una plataforma creativa construida para el expat LATAM de clase media-alta. No adaptaciones de campaña genérica — ideas nacidas de esa audiencia, para esa audiencia.',
    },
    {
      title: 'Inteligencia accionable',
      body: 'Decisiones de medios, canal y geografía basadas en datos reales de los tres segmentos LATAM prioritarios. No en intuición de agencia.',
    },
    {
      title: 'Canal broker activado',
      body: '18 brokers identificados con scoring de compatibilidad por CCAA. El canal más eficiente para IPMI en España, sin explotar por los competidores.',
    },
  ],
  intelLabel: 'La ventaja de inteligencia',
  intelTitle: 'El portal es la propuesta.',
  intelBody: 'No construimos una presentación. Construimos un sistema de decisión. El Strategic Intelligence Portal de VUMI España integra corpus RAG, datos de mercado en tiempo real, análisis de brokers por CCAA y señales competitivas — todo en una sola plataforma.',
  intelCTA: 'Ver el portal en vivo',
  intelStats: [
    { value: '128', label: 'Chunks de inteligencia\nindexados y consultables' },
    { value: '10', label: 'Hipótesis estratégicas\ncon evidencia verificada' },
    { value: '18', label: 'Brokers catalogados\npor fit score y CCAA' },
    { value: '9', label: 'Competidores analizados\ncon gaps identificados' },
  ],
  casesLabel: 'Casos que respaldan la propuesta',
  cases: [
    {
      agency: 'La Despensa',
      brand: 'Aegon España',
      detail: '6 años de relación. Campaña #Cariñoterapia: el acompañamiento como propuesta emocional en salud. Multi-año, multi-formato, TV a digital.',
      tags: ['Salud', 'Seguros', 'Emocional', 'Multi-año'],
    },
    {
      agency: 'La Despensa',
      brand: 'Finetwork',
      detail: 'Lanzamiento nacional desde cero. Todos los puntos de contacto en 2 años. Entrada en mercado saturado con identidad diferencial.',
      tags: ['Lanzamiento', 'Nacional', 'Full-funnel'],
    },
    {
      agency: 'ReMotive Media',
      brand: 'VUMI Spain Portal',
      detail: 'Strategic Intelligence Portal live. RAG sobre 128 chunks. Brokers, competidores, audiencias LATAM — todo consultable en tiempo real.',
      tags: ['Inteligencia', 'RAG', 'Data', 'Live'],
    },
  ],
  nextLabel: 'Próximos pasos',
  nextTitle: 'Arranquemos.',
  nextBody: 'Una sesión de trabajo. Sin presentaciones de 80 slides. Con el portal abierto, el corpus consultable y las decisiones que hay que tomar sobre la mesa.',
  ctaPrimary: 'Contactar ahora',
  ctaSecondary: 'Ver el portal',
};

const en = {
  heroLabel: 'Joint agency proposal',
  heroSub: 'Creativity + Intelligence for the VUMI Spain launch',
  stat1Label: 'Years of\nexperience', stat1Unit: 'La Despensa',
  stat2Label: 'Best agency\nin Spain', stat2Unit: 'SCOPEN 2022',
  stat3Label: 'Brokers\nidentified', stat3Unit: 'High compatibility',
  stat4Label: 'Intelligence\nchunks', stat4Unit: 'Active RAG',
  manifesto: '"Spain has 900,000 high-income Latin Americans with zero health insurance options that treat them as who they are."',
  manifestoSub: 'La Despensa and ReMotive Media arrive together to fill that gap. One with Spain\'s best independent creative work. The other with the most sophisticated market intelligence architecture in the sector.',
  agenciesLabel: 'Two agencies. One proposition.',
  ldRole: 'Creative strategy & campaign',
  ldBullets: [
    '23 years. 32 people. 5 dogs. Zero group hierarchies.',
    'Aegon: 6 years, #Cariñoterapia — the health sector reference case in Spain.',
    'Finetwork (national launch), Burger King (14 years), Tanqueray, Schweppes.',
    '6th best agency in Spain by actual clients. SCOPEN 2022.',
    'We believe in the transformative power of creativity. Nothing more.',
  ],
  ldProof: 'Eficacia Award, Grand Prix Genio. Campaigns that work in the street, not just at award shows.',
  rmRole: 'Market intelligence & media',
  rmBullets: [
    'Active Strategic Intelligence Portal: vumi.agency — RAG on VUMI corpus.',
    '18 brokers catalogued with fit score. 9 competitors analysed. 3 LatAm segments.',
    'Differential media mix: Latin radio, LatAm creators, DOOH in Venezuelan/Colombian neighbourhoods.',
    '10 uncontested market spaces identified — no competitor touches them.',
    'Data → creative → media → measurement pipeline already built.',
  ],
  rmProof: 'The portal already exists. Not a promise. A competitive advantage working today.',
  propositionLabel: 'What we propose',
  propositionTitle: 'A launch Spain\'s health market has never seen.',
  pillars: [
    {
      title: 'Creativity with teeth',
      body: 'A creative platform built for the upper-middle-class LatAm expat. Not generic campaign adaptations — ideas born from that audience, for that audience.',
    },
    {
      title: 'Actionable intelligence',
      body: 'Media, channel and geography decisions based on real data from the three priority LatAm segments. Not agency gut feel.',
    },
    {
      title: 'Broker channel activated',
      body: '18 brokers identified with compatibility scoring by region. The most efficient channel for IPMI in Spain, untapped by competitors.',
    },
  ],
  intelLabel: 'The intelligence advantage',
  intelTitle: 'The portal is the proposition.',
  intelBody: 'We didn\'t build a presentation. We built a decision system. The VUMI Spain Strategic Intelligence Portal integrates RAG corpus, real-time market data, broker analysis by region and competitive signals — all in one platform.',
  intelCTA: 'View the live portal',
  intelStats: [
    { value: '128', label: 'Intelligence chunks\nindexed and queryable' },
    { value: '10', label: 'Strategic hypotheses\nwith verified evidence' },
    { value: '18', label: 'Brokers catalogued\nby fit score and region' },
    { value: '9', label: 'Competitors analysed\nwith gaps identified' },
  ],
  casesLabel: 'Cases that back the proposition',
  cases: [
    {
      agency: 'La Despensa',
      brand: 'Aegon Spain',
      detail: '6-year relationship. #Cariñoterapia campaign: companionship as emotional proposition in health. Multi-year, multi-format, TV to digital.',
      tags: ['Health', 'Insurance', 'Emotional', 'Multi-year'],
    },
    {
      agency: 'La Despensa',
      brand: 'Finetwork',
      detail: 'National launch from zero. All touchpoints in 2 years. Entry into saturated market with differential identity.',
      tags: ['Launch', 'National', 'Full-funnel'],
    },
    {
      agency: 'ReMotive Media',
      brand: 'VUMI Spain Portal',
      detail: 'Strategic Intelligence Portal live. RAG on 128 chunks. Brokers, competitors, LatAm audiences — all queryable in real time.',
      tags: ['Intelligence', 'RAG', 'Data', 'Live'],
    },
  ],
  nextLabel: 'Next steps',
  nextTitle: 'Let\'s go.',
  nextBody: 'One working session. No 80-slide decks. With the portal open, the corpus queryable and the real decisions on the table.',
  ctaPrimary: 'Contact us now',
  ctaSecondary: 'View the portal',
};
