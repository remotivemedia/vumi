import React from 'react';
export const revalidate = 300;
import { getAudienceTopline, getAudienceSegments } from '@/lib/intelligence';
import { queryCorpus } from '@/lib/corpus';
import { AudienceBarChart } from '@/components/charts/AudienceBarChart';
import { FadeIn, StaggerList, StaggerItem } from '@/components/motion/FadeIn';
import { T } from '@/components/i18n/T';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 3px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
};

const AUDIENCES = [
  { id:'venezuelan', label:'Venezolana', flag:'🇻🇪', priority:1, color:'#0033A0', padron2025:'~377.809', nacidos:'~599.769', padronSource:'INE Censo Anual 2025', docSlug:'02_VUMI_Corpus_Poblacion_Venezolana_España_2020-2025', chunk:1, higherEdu:'48,7%', ageProfile:'76,7% entre 26-65 años', settlement:'Madrid 67.700 (30-33%), Cataluña 16.912, Canarias 12.396', elite:'Barrio Salamanca Madrid — "la pequeña Miami". Elite venezolana concentrada.', nationalizations:'35.403 en 2024', gtm:'Diferenciador: plan sin exclusión LatAm, preexistencias declaradas, herencia VUMI Group 30 años', ccaa:[{ccaa:'Madrid',pct:32,n:'~67.700'},{ccaa:'Cataluña',pct:9,n:'~16.912'},{ccaa:'Canarias',pct:6,n:'12.396'},{ccaa:'Galicia',pct:5,n:'~13.200'},{ccaa:'C.Valenciana',pct:4,n:'9.158'}], tier:'HNW + profesional liberal', propensity:'Alta' },
  { id:'colombian', label:'Colombiana', flag:'🇨🇴', priority:2, color:'#1A56C4', padron2025:'676.534', nacidos:'~978.000', padronSource:'INE Censo Anual 2025', docSlug:'04_VUMI_Corpus_Poblacion_Colombiana_España_2022-2025', chunk:1, higherEdu:'~23%', ageProfile:'Edad media ~39 años', settlement:'1ª nac. extranjera en 11 CCAA. Valencia 29.500, Madrid 30.390, Cataluña 24.430', elite:'Perfil bimodal: cuidados/servicios vs profesional clase media-alta.', nationalizations:'26.224 en 2024', gtm:'Volumen + presencia pan-CCAA. Mensaje: cobertura que funciona en Colombia en visitas familiares.', ccaa:[{ccaa:'Valencia',pct:18,n:'29.500'},{ccaa:'Madrid',pct:17,n:'30.390'},{ccaa:'Cataluña',pct:14,n:'24.430'},{ccaa:'Andalucía',pct:8,n:'14.110'},{ccaa:'País Vasco',pct:5,n:'~9.000'}], tier:'Clase media-alta (segmento objetivo)', propensity:'Media-alta' },
  { id:'mexican', label:'Mexicana', flag:'🇲🇽', priority:3, color:'#2C3539', padron2025:'~36.067', nacidos:'~55.000', padronSource:'OPI / INE Padrón 2024', docSlug:'03_VUMI_Corpus_Poblacion_Mexicana_España_2022-2025', chunk:1, higherEdu:'58-62%', ageProfile:'Concentración 30-54 años, perfil ejecutivo', settlement:'Madrid 8.213 (29,5%), Barcelona 6.256 (22,5%)', elite:'Inversión inmobiliaria mexicana en Madrid >700M€ desde 2020.', nationalizations:'3.450 en 2024', gtm:'Ticket alto. Canal: brokers premium. Mensaje: El seguro que mereces en Europa.', ccaa:[{ccaa:'Madrid',pct:30,n:'8.213'},{ccaa:'Barcelona',pct:22,n:'6.256'},{ccaa:'Valencia',pct:4,n:'1.108'},{ccaa:'Málaga',pct:3,n:'815'},{ccaa:'Baleares',pct:2,n:'628'}], tier:'HNW / alta cualificación', propensity:'Muy alta' },
];

const CHART_DATA = [
  { nationality:'Colombia', padron:676534, nacidos:978000 },
  { nationality:'Venezuela', padron:377809, nacidos:599769 },
  { nationality:'México', padron:36067, nacidos:55000 },
];

export default async function AudiencesPage() {
  const [topline, allSegs, insight] = await Promise.all([
    getAudienceTopline(), getAudienceSegments(),
    queryCorpus('venezolanos colombianos mexicanos España perfil socioeconómico seguro salud', 5),
  ]);
  return (
    <div style={{ maxWidth:1100 }}>
      <FadeIn>
        <div style={{ marginBottom:24 }}>
          <div style={S.kicker}><T k="audiences.kicker" /></div>
          <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}><T k="audiences.headline" /></h1>
          <p style={{ fontSize:13, color:'#6B7785', maxWidth:720, lineHeight:1.6 }}><T k="audiences.subtitle" /></p>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div style={{ ...S.card, marginBottom:24 }}>
          <div style={S.kicker}><T k="audiences.chart_title" /></div>
          <AudienceBarChart data={CHART_DATA} />
          <div style={{ marginTop:8, fontSize:11, color:'#6B7785' }}><T k="audiences.chart_note" /></div>
        </div>
      </FadeIn>

      <StaggerList>
        {AUDIENCES.map((aud) => (
          <StaggerItem key={aud.id}>
            <div style={{ ...S.card, marginBottom:20, borderTop:`4px solid ${aud.color}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                <div>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:4 }}>
                    <span style={{ fontSize:20 }}>{aud.flag}</span>
                    <span style={{ background:aud.color, color:'#fff', padding:'2px 10px', borderRadius:99, fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:11 }}><T k="audiences.priority_label" /> #{aud.priority}</span>
                    <span style={{ background:'#E3F4F0', color:'#2DA771', padding:'2px 8px', borderRadius:99, fontSize:10, fontWeight:600 }}><T k="audiences.propensity" /> {aud.propensity}</span>
                  </div>
                  <h2 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:20, color:'#2C3539', marginBottom:2 }}>Audiencia {aud.label}</h2>
                  <div style={{ fontSize:12, color:'#6B7785' }}>{aud.padronSource}</div>
                </div>
                <div style={{ textAlign:'right' }}>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:28, color:aud.color, lineHeight:1 }}>{aud.padron2025}</div>
                  <div style={{ fontSize:11, color:'#6B7785' }}><T k="audiences.padron_label" /></div>
                  <div style={{ fontSize:11, color:'#6B7785', marginTop:2 }}>{aud.nacidos} <T k="audiences.incl_nat" /></div>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
                <div>
                  <div style={{ fontSize:11, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}><T k="audiences.key_profile" /></div>
                  {[
                    { tk:'audiences.higher_edu', v:aud.higherEdu },
                    { tk:'audiences.age_profile', v:aud.ageProfile },
                    { tk:'audiences.socio_tier', v:aud.tier },
                    { tk:'audiences.nationalization', v:aud.nationalizations },
                  ].map(({ tk, v }) => (
                    <div key={tk} style={{ display:'flex', justifyContent:'space-between', padding:'7px 0', borderBottom:'1px solid #F5F7FA', fontSize:12 }}>
                      <span style={{ color:'#6B7785' }}><T k={tk} /></span>
                      <span style={{ color:'#2C3539', fontWeight:600, textAlign:'right', maxWidth:200 }}>{v}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ fontSize:11, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:10 }}><T k="audiences.ccaa_dist" /></div>
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
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16, marginTop:16, paddingTop:14, borderTop:'1px solid #E2E8F0' }}>
                <div style={{ background:'#F5F7FA', borderRadius:6, padding:12 }}>
                  <div style={{ fontSize:10, color:'#0033A0', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}><T k="audiences.premium_settlement" /></div>
                  <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.5 }}>{aud.settlement}</div>
                  <div style={{ fontSize:11, color:'#6B7785', marginTop:6, lineHeight:1.4 }}>{aud.elite}</div>
                </div>
                <div style={{ background:'#EEF2FF', borderRadius:6, padding:12 }}>
                  <div style={{ fontSize:10, color:'#0033A0', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}><T k="audiences.gtm_message" /></div>
                  <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.5 }}>{aud.gtm}</div>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerList>

      {insight.answer && (
        <FadeIn delay={0.2}>
          <div style={{ ...S.card, borderLeft:'4px solid #0033A0', background:'#FAFBFF', marginTop:8 }}>
            <div style={S.kicker}><T k="audiences.corpus_insight" /></div>
            <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:10 }}>{insight.answer}</div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
