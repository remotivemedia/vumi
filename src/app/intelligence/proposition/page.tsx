import React from 'react';
export const revalidate = 300;
import { queryCorpus } from '@/lib/corpus';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 2px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
};

// Verified product specs — from corpus doc 01 §3.4, doc 08 §A.3.3
const PLANS = [
  {
    name: 'Euro Health Priority',
    limit: '€3.000.000',
    color: '#6B7785',
    coverage: 'EU / Worldwide ex USA / Worldwide',
    ambulatoria: 'Básica — riesgo de insuficiencia para visado nómada',
    dental: 'No incluido',
    maternidad: 'No incluido',
    visa: 'Condicional (verificar ambulatorio ≥ SNS)',
    source: '01_VUMI_Facts §3.4 + 08_Wave1 §A.3.3',
  },
  {
    name: 'Euro Health Pro',
    limit: '€4.000.000',
    color: '#00A9E0',
    coverage: 'EU / Worldwide ex USA / Worldwide',
    ambulatoria: 'Sí — + ambulatorio + mental health',
    dental: 'Dental mayor',
    maternidad: 'Incluida',
    visa: '✓ Recomendado para visado nómada/no lucrativo con franquicia €0',
    source: '01_VUMI_Facts §3.4 + 08_Wave1 §A.3.3',
  },
  {
    name: 'Euro Health Premier',
    limit: '€5.000.000',
    color: '#0033A0',
    coverage: 'EU / Worldwide ex USA / Worldwide',
    ambulatoria: 'Completo',
    dental: 'Dental mayor + chequeos',
    maternidad: 'Incluida + gestión preexistencias declaradas',
    visa: '✓ Óptimo — preexistencias declaradas, tope máximo',
    source: '01_VUMI_Facts §3.4 + 08_Wave1 §A.3.3',
  },
];

const DIFFERENTIATORS = [
  { dim:'Topes de cobertura',  vumi:'€5M Premier',  market:'Allianz £3,1M · Cigna $500K · AXA £250K', win:true,  src:'08_Wave1 §B.6' },
  { dim:'Regulador EEA',       vumi:'MFSA Malta — pasaporte directo España', market:'Cigna Guernsey ✗ · AXA FCA-UK ✗', win:true, src:'08_Wave1 §B.6' },
  { dim:'Preexistencias',      vumi:'Declaradas, evaluación caso a caso',    market:'Underwriting rígido (Allianz/Bupa)', win:true,  src:'08_Wave1 §A.3.3' },
  { dim:'Herencia LatAm',      vumi:'VUMI Group 30 años LatAm service',      market:'Sin equivalente',         win:true,  src:'01_VUMI_Facts §2' },
  { dim:'Hospital flagship ES',vumi:'Clínica Universidad de Navarra',        market:'Bupa/Sanitas red propia',  win:false, src:'01_VUMI_Facts §5' },
  { dim:'Rating AM Best',      vumi:'No público',                            market:'Allianz A+ Superior',      win:false, src:'08_Wave1 §B.4' },
  { dim:'Precio',              vumi:'Mystery-shopped pendiente',             market:'Allianz £1.200–2.500/año', win:false, src:'08_Wave1 §B.6' },
  { dim:'DGSFP',               vumi:'⚠ Pendiente verificación',             market:'Allianz/Bupa sí',          win:false, src:'08_Wave1 §A.1.2' },
];

const MESSAGES: { nat: string; flag: string; broker: string; hnw: string; nomada: string; src: string }[] = [
  {
    nat: 'Venezolana',   flag: '🇻🇪',
    broker:  'Tu cliente venezolano HNW en Madrid necesita un plan que lo cubra en Europa y en LatAm en visitas. VUMI: herencia 30 años VUMI Group + tope €5M + preexistencias declaradas.',
    hnw:     'Barrio Salamanca, ingresos premium. Cobertura €5M. El único plan con herencia venezolana real — no es Allianz ni Bupa.',
    nomada:  'Visa nómada digital: Euro Health Pro con franquicia €0. Cobertura ambulatoria completa. MFSA Malta = válido UGE-CE (si DGSFP confirmado).',
    src:     '02_Venezolana §3 + 08_Wave1 §A.3.3',
  },
  {
    nat: 'Colombiana',  flag: '🇨🇴',
    broker:  '676.534 colombianos en España, 1ª nacionalidad en 11 CCAA. Mensaje: cobertura que funciona también en Colombia cuando viajan a ver a la familia.',
    hnw:     'Clase media-alta colombiana en Madrid/Valencia/País Vasco. Ticket medio. Canal broker con especialización expat.',
    nomada:  'Euro Health Priority para el segmento nómada joven. Confirmar ambulatorio antes de vender para visado.',
    src:     '04_Colombiana §3 + 08_Wave1 §A.3.3',
  },
  {
    nat: 'Mexicana',    flag: '🇲🇽',
    broker:  'Perfil ejecutivo premium. 39% de la inversión foránea en España es capital mexicano. Canal: broker de banca privada, relación personal, no digital.',
    hnw:     'Salamanca, Chamberí, Chamartín. Inversión inmobiliaria >700M€ desde 2020. Mensaje: "El seguro que mereces en Europa." Euro Health Premier.',
    nomada:  'Altamente cualificado: 58-62% educación superior. Perfil emprendedor. Ticket alto. Propuesta Premier directa.',
    src:     '03_Mexicana §2.3 + §3.5',
  },
];

export default async function PropositionPage() {
  const [productInsight, mediaInsight] = await Promise.all([
    queryCorpus('VUMI Euro Health diferenciación preexistencias MFSA Malta topes cobertura', 4),
    queryCorpus('mix medios digital canal radio latina broker LATAM España eficiencia', 4),
  ]);

  return (
    <div style={{ maxWidth:1100 }}>
      <div style={{ marginBottom:24 }}>
        <div style={S.kicker}>Propuesta de Valor</div>
        <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}>
          Diferenciación y Mensajes
        </h1>
        <p style={{ fontSize:13, color:'#6B7785', maxWidth:700, lineHeight:1.6 }}>
          Basado en datos verificados del corpus Wave 1. Los tres planes Euro Health fueron lanzados el 17-mar-2026
          desde VUMI Insurance Europe Limited (MFSA Malta C&nbsp;112852).
          <span style={S.cite}>01_VUMI_Facts §3.4</span>
          <span style={S.cite}>08_Wave1_Regulatorio §A.1.1</span>
        </p>
      </div>

      {/* Product plans */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
        {PLANS.map((p) => (
          <div key={p.name} style={{ ...S.card, borderTop:`4px solid ${p.color}`, padding:20 }}>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:13, color:p.color, marginBottom:4 }}>{p.name}</div>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, color:'#0033A0', lineHeight:1, marginBottom:10 }}>{p.limit}</div>
            {[
              { k:'Cobertura geográfica', v:p.coverage },
              { k:'Ambulatoria', v:p.ambulatoria },
              { k:'Dental', v:p.dental },
              { k:'Maternidad', v:p.maternidad },
              { k:'Visado España', v:p.visa },
            ].map(({ k, v }) => (
              <div key={k} style={{ display:'flex', flexDirection:'column', padding:'5px 0', borderBottom:'1px solid #F5F7FA', fontSize:11 }}>
                <span style={{ color:'#6B7785', marginBottom:1 }}>{k}</span>
                <span style={{ color:v.includes('✓')?'#2DA771':v.includes('⚠')||v.includes('Condicional')?'#B45309':'#2C3539', fontWeight:500, lineHeight:1.3 }}>{v}</span>
              </div>
            ))}
            <div style={{ marginTop:8 }}><span style={S.cite}>{p.source}</span></div>
          </div>
        ))}
      </div>

      {/* Differentiation table */}
      <div style={{ ...S.card, marginBottom:20 }}>
        <div style={S.kicker}>Framework de Diferenciación</div>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
          <thead>
            <tr style={{ borderBottom:'2px solid #E2E8F0', background:'#F5F7FA' }}>
              {['Dimensión','VUMI Euro Health','Mejor Alternativa Mercado','Resultado','Fuente corpus'].map(h=>(
                <th key={h} style={{ textAlign:'left', padding:'8px 12px', fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIFFERENTIATORS.map(({ dim, vumi, market, win, src }) => (
              <tr key={dim} style={{ borderBottom:'1px solid #F5F7FA' }}>
                <td style={{ padding:'10px 12px', fontWeight:600, color:'#2C3539' }}>{dim}</td>
                <td style={{ padding:'10px 12px', color:win?'#2DA771':'#E55B4D', fontWeight:win?600:400 }}>{vumi}</td>
                <td style={{ padding:'10px 12px', color:'#6B7785' }}>{market}</td>
                <td style={{ padding:'10px 12px', textAlign:'center', fontSize:18 }}>{win ? '✓' : '✗'}</td>
                <td style={{ padding:'10px 12px' }}><span style={S.cite}>{src}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message matrix */}
      <div style={{ ...S.card, marginBottom:20 }}>
        <div style={S.kicker}>Mensajes por Audiencia × Canal</div>
        {MESSAGES.map((m) => (
          <div key={m.nat} style={{ marginBottom:16, paddingBottom:16, borderBottom:'1px solid #F5F7FA' }}>
            <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
              <span style={{ fontSize:18 }}>{m.flag}</span>
              <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:14, color:'#2C3539' }}>{m.nat}</span>
              <span style={S.cite}>{m.src}</span>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
              {[
                { canal:'Canal Broker', msg:m.broker },
                { canal:'HNW Direct', msg:m.hnw },
                { canal:'Nómada Digital', msg:m.nomada },
              ].map(({ canal, msg }) => (
                <div key={canal} style={{ background:'#F5F7FA', borderRadius:6, padding:12 }}>
                  <div style={{ fontSize:10, color:'#0033A0', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{canal}</div>
                  <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.5 }}>{msg}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Counter-argument */}
      <div style={{ ...S.card, borderLeft:'4px solid #E55B4D', background:'#FFF8F7', marginBottom:16 }}>
        <div style={S.kicker}>Contraargumento más Fuerte</div>
        <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:8 }}>
          <strong>¿Por qué un broker preferiría Allianz Care sobre VUMI?</strong> Allianz tiene A+ AM Best, 20+ años en España, red directa, y el broker no asume riesgo reputacional. Para un cliente HNW el siniestro en año 1 con carrier desconocido es un riesgo para el broker.
        </div>
        <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6 }}>
          <strong>Respuesta VUMI:</strong> No compitimos por precio ni por brand recognition genérico. Competimos por <em>herencia LatAm</em>: tu cliente venezolano, colombiano o mexicano ya conoce VUMI Group — 30 años en Miami, Bogotá, Ciudad de México. No eres el primero en recomendarnos. Eso elimina el riesgo reputacional del broker.
          <span style={S.cite}>01_VUMI_Facts §2+§6</span>
        </div>
      </div>

      {/* Media channel efficiency from corpus doc 07 */}
      {mediaInsight.answer && (
        <div style={{ ...S.card, borderLeft:'4px solid #00A9E0', background:'#F5FBFF' }}>
          <div style={S.kicker}>Canales de Mayor Eficiencia — Corpus Doc 07</div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:8 }}>{mediaInsight.answer}</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {mediaInsight.chunks.map((c,i) => <span key={i} style={S.cite}>{c.doc_slug}#{c.chunk_index}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
