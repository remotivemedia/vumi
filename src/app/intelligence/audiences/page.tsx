import React from 'react';
export const revalidate = 300;
import { getAudienceTopline, getAudienceSegments } from '@/lib/intelligence';
import { queryCorpus } from '@/lib/corpus';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 2px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
  th: { textAlign:'left' as const, padding:'6px 10px', fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.06em' },
};

// Verified data from corpus docs 02, 03, 04 — cited inline
const AUDIENCES = [
  {
    id: 'venezuelan',
    label: 'Venezolana',
    flag: '🇻🇪',
    priority: 1,
    color: '#0033A0',
    padron2025: '~377.809',
    nacidos: '~599.769',
    padronSource: 'INE Censo Anual 2025 (30-abr-2025)',
    docSlug: '02_VUMI_Corpus_Poblacion_Venezolana_España_2020-2025',
    chunk: 1,
    higherEdu: '48,7%',
    ageProfile: '76,7% entre 26-65 años',
    settlement: 'Madrid 67.700 (30-33%), Cataluña 16.912, Canarias 12.396',
    elite: 'Barrio Salamanca Madrid — "la pequeña Miami" (Elcano nov-2025). Elite venezolana concentrada.',
    nationalizations: '35.403 en 2024 — 1ª nacionalidad de nuevas adquisiciones',
    gtm: 'Diferenciador: plan sin exclusión LatAm, preexistencias declaradas, herencia VUMI Group 30 años',
    ccaa: [
      { ccaa:'Madrid', pct:32, n:'~67.700' },
      { ccaa:'Cataluña', pct:9, n:'~16.912' },
      { ccaa:'Canarias', pct:6, n:'12.396' },
      { ccaa:'Galicia', pct:5, n:'~13.200' },
      { ccaa:'C.Valenciana', pct:4, n:'9.158' },
    ],
    tier: 'HNW + profesional liberal',
    propensity: 'Alta',
  },
  {
    id: 'colombian',
    label: 'Colombiana',
    flag: '🇨🇴',
    priority: 2,
    color: '#1A56C4',
    padron2025: '676.534',
    nacidos: '~850.000 (nacidos)',
    padronSource: 'INE Censo Anual 2025',
    docSlug: '04_VUMI_Corpus_Poblacion_Colombiana_España_2022-2025',
    chunk: 1,
    higherEdu: '~23%',
    ageProfile: 'Edad media ~39 años — más envejecida que venezolanos',
    settlement: '1ª nac. extranjera en 11 CCAA. Valencia 29.500, Madrid 30.390, Cataluña 24.430',
    elite: 'Perfil bimodal: segmento cuidados/servicios (Usera/Carabanchel) vs profesional liberado clase media-alta.',
    nationalizations: '26.224 en 2024',
    gtm: 'Volumen + presencia pan-CCAA. Mensaje: cobertura que funciona en Colombia en visitas familiares.',
    ccaa: [
      { ccaa:'Valencia', pct:18, n:'29.500' },
      { ccaa:'Madrid', pct:17, n:'30.390' },
      { ccaa:'Cataluña', pct:14, n:'24.430' },
      { ccaa:'Andalucía', pct:8, n:'14.110' },
      { ccaa:'País Vasco', pct:5, n:'~9.000' },
    ],
    tier: 'Clase media-alta (segmento objetivo)',
    propensity: 'Media-alta',
  },
  {
    id: 'mexican',
    label: 'Mexicana',
    flag: '🇲🇽',
    priority: 3,
    color: '#2C3539',
    padron2025: '~36.067',
    nacidos: '~55.000 (nacidos)',
    padronSource: 'OPI / INE Padrón 2024',
    docSlug: '03_VUMI_Corpus_Poblacion_Mexicana_España_2022-2025',
    chunk: 1,
    higherEdu: '58-62% (~80% en Barcelona, testimonio consular)',
    ageProfile: 'Concentración 30-54 años, perfil ejecutivo y emprendedor',
    settlement: 'Madrid 8.213 (29,5%), Barcelona 6.256 (22,5%). Madrid: Salamanca, Chamberí, Chamartín.',
    elite: 'Inversión inmobiliaria mexicana en Madrid >700M€ desde 2020. Capital mexicano = 39% inversión foránea España 2024.',
    nationalizations: '3.450 en 2024',
    gtm: 'Ticket alto. Canal: brokers premium, relación personal. Mensaje: "El seguro que mereces en Europa."',
    ccaa: [
      { ccaa:'Madrid', pct:30, n:'8.213' },
      { ccaa:'Barcelona', pct:22, n:'6.256' },
      { ccaa:'Valencia', pct:4, n:'1.108' },
      { ccaa:'Málaga', pct:3, n:'815' },
      { ccaa:'Baleares', pct:2, n:'628' },
    ],
    tier: 'HNW / alta cualificación',
    propensity: 'Muy alta',
  },
];

function MiniBar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:6 }}>
      <div style={{ width:60, height:6, background:'#E2E8F0', borderRadius:3, overflow:'hidden' }}>
        <div style={{ width:`${pct}%`, height:'100%', background:color, borderRadius:3 }} />
      </div>
      <span style={{ fontSize:10, color:'#6B7785' }}>{pct}%</span>
    </div>
  );
}

export default async function AudiencesPage() {
  const [topline, allSegs, insight] = await Promise.all([
    getAudienceTopline(),
    getAudienceSegments(),
    queryCorpus('venezolanos colombianos mexicanos España perfil socioeconómico seguro salud', 5),
  ]);

  return (
    <div style={{ maxWidth:1100 }}>
      <div style={{ marginBottom:24 }}>
        <div style={S.kicker}>Inteligencia de Audiencias</div>
        <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}>
          Diáspora LatAm en España — 1,09M+
        </h1>
        <p style={{ fontSize:13, color:'#6B7785', maxWidth:720, lineHeight:1.6 }}>
          Datos verificados INE Censo Anual 2025, OPI/MITES, SJM. Objetivo VUMI: profesionales HNW y clase media-alta con propensión a seguro privado premium.
          Colombia (676.534) es el mayor colectivo por volumen; Venezuela (377.809) lidera por propensión premium y herencia VUMI Group.
        </p>
      </div>

      {/* Population comparison bar chart (server-side SVG) */}
      <div style={{ ...S.card, marginBottom:24 }}>
        <div style={S.kicker}>Padrón 2025 — Comparativa por Nacionalidad</div>
        <div style={{ marginTop:12, display:'flex', flexDirection:'column', gap:10 }}>
          {[
            { label:'Colombia', n:676534, color:'#1A56C4', doc:'04_Colombiana §1' },
            { label:'Venezuela', n:377809, color:'#0033A0', doc:'02_Venezolana §1' },
            { label:'México', n:36067, color:'#2C3539', doc:'03_Mexicana §1' },
          ].map(row => {
            const pct = Math.round((row.n / 676534) * 100);
            return (
              <div key={row.label} style={{ display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:80, fontSize:12, fontWeight:600, color:'#2C3539', flexShrink:0 }}>{row.label}</div>
                <div style={{ flex:1, height:28, background:'#F5F7FA', borderRadius:4, overflow:'hidden', position:'relative' }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:row.color, borderRadius:4, display:'flex', alignItems:'center', paddingLeft:10, minWidth:60 }}>
                    <span style={{ color:'#fff', fontSize:12, fontFamily:"'Montserrat',sans-serif", fontWeight:700, whiteSpace:'nowrap' }}>
                      {row.n.toLocaleString('es-ES')}
                    </span>
                  </div>
                </div>
                <span style={{ fontSize:10, color:'#00A9E0', fontFamily:"'JetBrains Mono',monospace", flexShrink:0 }}>{row.doc}</span>
              </div>
            );
          })}
        </div>
        <div style={{ marginTop:10, fontSize:11, color:'#6B7785' }}>Fuente: INE Censo Anual 2025 (publicado 30-abr-2025) · OPI · Nota: cifras = nacionalidad empadronada; nacidos en país de origen son ~50-60% superiores.</div>
      </div>

      {/* Audience profiles */}
      {AUDIENCES.map((aud) => (
        <div key={aud.id} style={{ ...S.card, marginBottom:20, borderTop:`4px solid ${aud.color}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                <span style={{ fontSize:20 }}>{aud.flag}</span>
                <span style={{ background:aud.color, color:'#fff', padding:'2px 10px', borderRadius:99, fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:11 }}>Prioridad #{aud.priority}</span>
                <span style={{ background:'#E3F4F0', color:'#2DA771', padding:'2px 8px', borderRadius:99, fontSize:10, fontWeight:600 }}>Propensión {aud.propensity}</span>
              </div>
              <h2 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:20, color:'#2C3539', marginBottom:2 }}>
                Audiencia {aud.label}
                <span style={{ ...S.cite }}>{aud.docSlug}#{aud.chunk}</span>
              </h2>
              <div style={{ fontSize:12, color:'#6B7785' }}>{aud.padronSource}</div>
            </div>
            <div style={{ textAlign:'right' }}>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:28, color:aud.color, lineHeight:1 }}>{aud.padron2025}</div>
              <div style={{ fontSize:11, color:'#6B7785' }}>padrón (nac.)</div>
              <div style={{ fontSize:11, color:'#6B7785', marginTop:2 }}>{aud.nacidos} incl. nat.</div>
            </div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
            {/* Key metrics */}
            <div>
              <div style={{ fontSize:11, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>Perfil Clave</div>
              {[
                { k:'Educación superior', v:aud.higherEdu },
                { k:'Perfil edad', v:aud.ageProfile },
                { k:'Tier socioeconómico', v:aud.tier },
                { k:'Nacionalizaciones 2024', v:aud.nationalizations },
              ].map(({ k, v }) => (
                <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #F5F7FA', fontSize:12 }}>
                  <span style={{ color:'#6B7785' }}>{k}</span>
                  <span style={{ color:'#2C3539', fontWeight:600, textAlign:'right', maxWidth:200 }}>{v}</span>
                </div>
              ))}
            </div>

            {/* CCAA distribution */}
            <div>
              <div style={{ fontSize:11, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}>Distribución por CCAA (top 5)</div>
              {aud.ccaa.map(r => (
                <div key={r.ccaa} style={{ display:'flex', alignItems:'center', gap:10, marginBottom:8 }}>
                  <div style={{ width:90, fontSize:11, color:'#2C3539', fontWeight:500, flexShrink:0 }}>{r.ccaa}</div>
                  <div style={{ flex:1, height:20, background:'#F5F7FA', borderRadius:3, overflow:'hidden' }}>
                    <div style={{ width:`${Math.min(r.pct*3,100)}%`, height:'100%', background:aud.color, borderRadius:3, display:'flex', alignItems:'center', paddingLeft:6 }}>
                      <span style={{ color:'#fff', fontSize:10, whiteSpace:'nowrap', fontWeight:600 }}>{r.n}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Settlement + GTM */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:16, paddingTop:14, borderTop:'1px solid #E2E8F0' }}>
            <div style={{ background:'#F5F7FA', borderRadius:6, padding:12 }}>
              <div style={{ fontSize:10, color:'#0033A0', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Asentamiento Premium</div>
              <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.5 }}>{aud.settlement}</div>
              <div style={{ fontSize:11, color:'#6B7785', marginTop:6, lineHeight:1.4 }}>{aud.elite}</div>
            </div>
            <div style={{ background:'#EEF2FF', borderRadius:6, padding:12 }}>
              <div style={{ fontSize:10, color:'#0033A0', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>Mensaje GTM VUMI</div>
              <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.5 }}>{aud.gtm}</div>
            </div>
          </div>
        </div>
      ))}

      {/* Corpus insight */}
      {insight.answer && (
        <div style={{ ...S.card, borderLeft:'4px solid #0033A0', background:'#FAFBFF', marginTop:8 }}>
          <div style={S.kicker}>Insight del Corpus</div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:10 }}>{insight.answer}</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {insight.chunks.map((c,i) => (
              <span key={i} style={S.cite}>{c.doc_slug}#{c.chunk_index}</span>
            ))}
          </div>
        </div>
      )}

      {/* DB segments table if populated */}
      {allSegs.length > 0 && (
        <div style={{ ...S.card, marginTop:20 }}>
          <div style={S.kicker}>Segmentos Detallados — Base de Datos</div>
          <div style={{ overflowX:'auto', marginTop:12 }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #E2E8F0' }}>
                  {['Segmento','Nac.','Padrón','CCAA','Nivel SE','Propensión','Canal','Mensaje GTM'].map(h=>(
                    <th key={h} style={S.th}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {allSegs.slice(0,12).map((s:any) => (
                  <tr key={s.id} style={{ borderBottom:'1px solid #F5F7FA' }}>
                    <td style={{ padding:'8px 10px', fontWeight:600, color:'#2C3539', maxWidth:160, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{s.segment_label}</td>
                    <td style={{ padding:'8px 10px', color:'#6B7785', fontSize:11 }}>{s.nationality}</td>
                    <td style={{ padding:'8px 10px', fontFamily:"'Montserrat',sans-serif", fontWeight:700, color:'#0033A0' }}>{s.padron_total?.toLocaleString('es-ES') || '—'}</td>
                    <td style={{ padding:'8px 10px', color:'#6B7785' }}>{s.geography_ccaa || s.geography_city || '—'}</td>
                    <td style={{ padding:'8px 10px' }}><span style={{ background:'#EEF2FF', color:'#0033A0', padding:'2px 6px', borderRadius:4, fontSize:10, fontWeight:600 }}>{s.socioeconomic_tier||'—'}</span></td>
                    <td style={{ padding:'8px 10px' }}><span style={{ background:'#E3F4F0', color:'#2DA771', padding:'2px 6px', borderRadius:4, fontSize:10, fontWeight:600 }}>{s.insurance_propensity||'—'}</span></td>
                    <td style={{ padding:'8px 10px', color:'#6B7785', fontSize:11 }}>{s.channel_preference||'—'}</td>
                    <td style={{ padding:'8px 10px', color:'#2C3539', maxWidth:200, fontSize:11 }}><span title={s.gtm_message}>{s.gtm_message?.slice(0,70)}{s.gtm_message?.length>70?'…':''}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
