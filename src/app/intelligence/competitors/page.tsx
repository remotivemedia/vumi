import React from 'react';
export const revalidate = 300;
import { getCompetitors, getCompetitorProducts } from '@/lib/intelligence';
import { queryCorpus } from '@/lib/corpus';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 2px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
  th: { textAlign:'left' as const, padding:'7px 12px', fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.06em', background:'#F5F7FA' },
};

const fmtEur = (n: any) => n ? `€${Number(n).toLocaleString('es-ES')}` : '—';
const fmtBand = (min: any, max: any) => {
  if (!min && !max) return 'Mystery-shopped pendiente';
  if (min && max) return `€${Number(min).toLocaleString('es-ES')}–€${Number(max).toLocaleString('es-ES')}`;
  return min ? `≥€${Number(min).toLocaleString('es-ES')}` : `≤€${Number(max).toLocaleString('es-ES')}`;
};

// Verified from corpus doc 08 §B — full IPMI competitive landscape
const IPMI_CORPUS = [
  {
    brand: 'VUMI Euro Health',
    regulator: 'MFSA Malta',
    jurisdiction: 'EEA',
    eea: true,
    dgsfp: '⚠ Pendiente verificación',
    topPlan: '€5M (Premier)',
    entryPlan: '€3M (Priority)',
    rating: 'No público',
    preexist: 'Declaradas, caso a caso',
    latam: '★★★★★',
    visa: '✓ (si DGSFP confirmado)',
    source: '08_Wave1_Regulatorio §B.6',
    vumi: true,
  },
  {
    brand: 'Bupa Global',
    regulator: 'Central Bank Ireland',
    jurisdiction: 'EEA',
    eea: true,
    dgsfp: 'Sí (filial Sanitas)',
    topPlan: 'Variable (Elite)',
    entryPlan: 'Variable (Essential)',
    rating: 'Bupa A (AM Best)',
    preexist: 'Underwriting estándar',
    latam: '★★',
    visa: '✓ (vía Sanitas España)',
    source: '08_Wave1_Regulatorio §B.2',
    vumi: false,
  },
  {
    brand: 'Cigna Global',
    regulator: 'Guernsey FSC',
    jurisdiction: 'NO EEA',
    eea: false,
    dgsfp: 'No (Guernsey)',
    topPlan: 'Variable (Platinum)',
    entryPlan: '$500K (Close Care)',
    rating: 'No público directo',
    preexist: 'Underwriting estándar',
    latam: '★★',
    visa: '✗ (Guernsey no EEA)',
    source: '08_Wave1_Regulatorio §B.3',
    vumi: false,
  },
  {
    brand: 'Allianz Care',
    regulator: 'Central Bank Ireland',
    jurisdiction: 'EEA',
    eea: true,
    dgsfp: 'Sí (EEA passport)',
    topPlan: '£3,1M (Signature)',
    entryPlan: '£830K (Care Base)',
    rating: 'A+ Superior (AM Best)',
    preexist: 'Underwriting estándar',
    latam: '★★',
    visa: '✓',
    source: '08_Wave1_Regulatorio §B.4',
    vumi: false,
  },
  {
    brand: 'AXA Global Health',
    regulator: 'FCA UK',
    jurisdiction: 'NO EEA (post-Brexit)',
    eea: false,
    dgsfp: 'Parcial (AXA XL)',
    topPlan: 'Prestige Plus',
    entryPlan: '£250K (Foundation)',
    rating: 'Grupo AXA AA',
    preexist: 'No estándar',
    latam: '★★',
    visa: '✗ (FCA UK no EEA)',
    source: '08_Wave1_Regulatorio §B.5',
    vumi: false,
  },
];

export default async function CompetitorsPage() {
  const [competitors, products, insight] = await Promise.all([
    getCompetitors(),
    getCompetitorProducts(),
    queryCorpus('IPMI competidores España regulador Allianz Bupa Cigna AXA diferenciación VUMI', 5),
  ]);

  return (
    <div style={{ maxWidth:1100 }}>
      <div style={{ marginBottom:24 }}>
        <div style={S.kicker}>Landscape Competitivo IPMI</div>
        <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}>
          Competidores IPMI — España
        </h1>
        <p style={{ fontSize:13, color:'#6B7785', maxWidth:700, lineHeight:1.6 }}>
          Análisis verificado del corpus Wave 1 (24-abr-2026). La dimensión clave de diferenciación no es precio sino <strong>jurisdicción regulatoria</strong>:
          solo aseguradoras con regulador EEA tienen pasaporte directo a España y pueden figurar en visados.
          <span style={S.cite}>08_Wave1_Regulatorio §B.6</span>
        </p>
      </div>

      {/* Regulatory jurisdiction comparison — key differentiator */}
      <div style={{ ...S.card, marginBottom:20, borderTop:'4px solid #0033A0' }}>
        <div style={S.kicker}>Tabla Comparativa — Regulador y Jurisdicción</div>
        <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:16, color:'#2C3539', marginBottom:14 }}>
          El pasaporte EEA determina la validez en visados españoles
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
            <thead>
              <tr>
                {['Aseguradora','Regulador','EEA / Pasaporte','DGSFP España','Tope Máx.','Tope Entrada','Rating AM Best','Preexistencias','Cobertura LatAm','Fuente corpus'].map(h=>(
                  <th key={h} style={S.th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {IPMI_CORPUS.map((c) => (
                <tr key={c.brand} style={{ borderBottom:'1px solid #F5F7FA', background:c.vumi?'#FAFBFF':'#fff' }}>
                  <td style={{ padding:'10px 12px' }}>
                    <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, color:c.vumi?'#0033A0':'#2C3539', fontSize:13 }}>
                      {c.vumi && <span style={{ fontSize:9, color:'#0033A0', background:'#EEF2FF', padding:'1px 5px', borderRadius:3, marginRight:5 }}>VUMI</span>}
                      {c.brand}
                    </div>
                  </td>
                  <td style={{ padding:'10px 12px', color:'#6B7785', fontSize:11 }}>{c.regulator}</td>
                  <td style={{ padding:'10px 12px' }}>
                    <span style={{ background:c.eea?'#E3F4F0':'#FBE8E2', color:c.eea?'#2DA771':'#E55B4D', padding:'3px 8px', borderRadius:99, fontWeight:700, fontSize:11 }}>
                      {c.eea ? '✓ EEA' : '✗ No EEA'}
                    </span>
                  </td>
                  <td style={{ padding:'10px 12px', fontSize:11, color:c.dgsfp.includes('⚠')?'#E55B4D':'#2C3539' }}>{c.dgsfp}</td>
                  <td style={{ padding:'10px 12px', fontFamily:"'Montserrat',sans-serif", fontWeight:700, color:'#0033A0', fontSize:13 }}>{c.topPlan}</td>
                  <td style={{ padding:'10px 12px', color:'#6B7785', fontSize:12 }}>{c.entryPlan}</td>
                  <td style={{ padding:'10px 12px', color:c.rating.includes('A+')?'#2DA771':c.rating==='No público'?'#E55B4D':'#2C3539', fontWeight:600, fontSize:11 }}>{c.rating}</td>
                  <td style={{ padding:'10px 12px', color:'#6B7785', fontSize:11 }}>{c.preexist}</td>
                  <td style={{ padding:'10px 12px', fontSize:13 }}>{c.latam}</td>
                  <td style={{ padding:'10px 12px' }}><span style={S.cite}>{c.source}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* DB product table */}
      {products.length > 0 && (
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={S.kicker}>Planes y Precios — Base de Datos</div>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:16, color:'#2C3539', marginBottom:14 }}>
            {products.length} planes mapeados
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr>
                  {['Marca','Plan','Tope EUR','Precio/Año (EUR)','Perfil Precio','Visa Spain','Worldwide+USA','Maternidad','Dental','Dato a fecha'].map(h=>(
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {products.map((p:any) => {
                  const comp = competitors.find((c:any) => c.id === p.competitor_id);
                  return (
                    <tr key={p.id} style={{ borderBottom:'1px solid #F5F7FA' }}>
                      <td style={{ padding:'9px 12px', fontWeight:600, color:'#0033A0', fontSize:12 }}>{comp?.brand_name||'—'}</td>
                      <td style={{ padding:'9px 12px', color:'#2C3539' }}>{p.product_name}</td>
                      <td style={{ padding:'9px 12px', fontFamily:"'Montserrat',sans-serif", fontWeight:700, color:'#0033A0' }}>{fmtEur(p.annual_limit_eur)}</td>
                      <td style={{ padding:'9px 12px', color:(!p.price_min_eur_per_year && !p.price_max_eur_per_year)?'#E55B4D':'#2C3539', fontSize:11 }}>
                        {fmtBand(p.price_min_eur_per_year, p.price_max_eur_per_year)}
                      </td>
                      <td style={{ padding:'9px 12px' }}><span style={{ background:'#F5F7FA', color:'#6B7785', padding:'2px 6px', borderRadius:4, fontSize:10 }}>{p.pricing_profile||'—'}</span></td>
                      <td style={{ padding:'9px 12px', textAlign:'center' }}>{p.visa_eligible_spain?<span style={{ color:'#2DA771', fontWeight:700 }}>✓</span>:<span style={{ color:'#E55B4D' }}>✗</span>}</td>
                      <td style={{ padding:'9px 12px', textAlign:'center' }}>{p.worldwide_incl_usa?<span style={{ color:'#2DA771' }}>✓</span>:<span style={{ color:'#6B7785' }}>—</span>}</td>
                      <td style={{ padding:'9px 12px', textAlign:'center' }}>{p.maternity?<span style={{ color:'#2DA771' }}>✓</span>:<span style={{ color:'#6B7785' }}>—</span>}</td>
                      <td style={{ padding:'9px 12px', textAlign:'center' }}>{p.dental?<span style={{ color:'#2DA771' }}>✓</span>:<span style={{ color:'#6B7785' }}>—</span>}</td>
                      <td style={{ padding:'9px 12px', color:'#6B7785', fontSize:11 }}>{p.pricing_as_of||'—'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop:8, fontSize:11, color:'#E55B4D', fontWeight:500 }}>
            ⚠ Precio VUMI Euro Health = Mystery-shopped pendiente. No disponible sin cotización directa.
            <span style={S.cite}>08_Wave1_Regulatorio §A.3.3</span>
          </div>
        </div>
      )}

      {/* VUMI positioning */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginBottom:20 }}>
        <div style={{ ...S.card, borderLeft:'4px solid #2DA771', background:'#F0FAF7' }}>
          <div style={S.kicker}>Ventajas Verificadas VUMI</div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.7 }}>
            <div style={{ marginBottom:6 }}>✓ <strong>Tope €5M Premier</strong> — supera Allianz Signature £3,1M y Cigna Close Care $500K<span style={S.cite}>08 §B.6</span></div>
            <div style={{ marginBottom:6 }}>✓ <strong>Regulador MFSA Malta (EEA)</strong> — pasaporte directo España vs Cigna (Guernsey) y AXA (FCA UK post-Brexit)<span style={S.cite}>08 §B.6</span></div>
            <div style={{ marginBottom:6 }}>✓ <strong>Preexistencias declaradas</strong> evaluación caso a caso — vs underwriting rígido Allianz/Bupa<span style={S.cite}>08 §A.3.3</span></div>
            <div>✓ <strong>Herencia LatAm 30 años</strong> VUMI Group — no replicable por competidores europeos<span style={S.cite}>01_VUMI_Facts §4</span></div>
          </div>
        </div>
        <div style={{ ...S.card, borderLeft:'4px solid #E55B4D', background:'#FFF8F7' }}>
          <div style={S.kicker}>Vulnerabilidades — Cerrar Antes de GTM</div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.7 }}>
            <div style={{ marginBottom:6 }}>✗ <strong>DGSFP pendiente</strong> — sin confirmación no hay canal broker ni visa<span style={S.cite}>08 §A.1.2</span></div>
            <div style={{ marginBottom:6 }}>✗ <strong>Rating AM Best</strong> no público — Allianz tiene A+ Superior<span style={S.cite}>08 §B.4</span></div>
            <div style={{ marginBottom:6 }}>✗ <strong>Precio no disponible</strong> — mystery shopping pendiente para 3 perfiles<span style={S.cite}>08 §A.3.3</span></div>
            <div>✗ <strong>Direct billing España</strong> — red con Quirónsalud/HM sin confirmar<span style={S.cite}>01_VUMI_Facts §5</span></div>
          </div>
        </div>
      </div>

      {/* Corpus insight */}
      {insight.answer && (
        <div style={{ ...S.card, borderLeft:'4px solid #0033A0', background:'#FAFBFF' }}>
          <div style={S.kicker}>Inteligencia del Corpus</div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:10 }}>{insight.answer}</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {insight.chunks.map((c,i) => <span key={i} style={S.cite}>{c.doc_slug}#{c.chunk_index}</span>)}
          </div>
        </div>
      )}
    </div>
  );
}
