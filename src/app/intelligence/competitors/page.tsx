import React from 'react';
export const revalidate = 300;
import { getCompetitors, getCompetitorProducts } from '@/lib/intelligence';
import { queryCorpus } from '@/lib/corpus';
import { CompetitorRadarChart } from '@/components/charts/CompetitorRadarChart';
import { FadeIn } from '@/components/motion/FadeIn';
import { T } from '@/components/i18n/T';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 3px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  th: { textAlign:'left' as const, padding:'7px 12px', fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.06em', background:'#F5F7FA' },
};

// DGSFP confirmed active — updated data
const IPMI = [
  { brand:'VUMI Euro Health', reg:'MFSA Malta', jur:'EEA', eea:true, dgsfp:'✓ Activo (Malta EEA)', topPlan:'€5M (Premier)', entryPlan:'€3M (Priority)', rating:'No público', latam:'★★★★★', visa:'✓', src:'', vumi:true },
  { brand:'Bupa Global', reg:'Central Bank Ireland', jur:'EEA', eea:true, dgsfp:'Sí (Sanitas)', topPlan:'Elite', entryPlan:'Essential', rating:'A (AM Best)', latam:'★★', visa:'✓', src:'', vumi:false },
  { brand:'Cigna Global', reg:'Guernsey FSC', jur:'NO EEA', eea:false, dgsfp:'No (Guernsey)', topPlan:'Platinum', entryPlan:'Close Care', rating:'No público', latam:'★★', visa:'✗', src:'', vumi:false },
  { brand:'Allianz Care', reg:'Central Bank Ireland', jur:'EEA', eea:true, dgsfp:'Sí (EEA)', topPlan:'£3,1M Signature', entryPlan:'£830K Base', rating:'A+ Superior', latam:'★★', visa:'✓', src:'', vumi:false },
  { brand:'AXA Global Health', reg:'FCA UK', jur:'NO EEA', eea:false, dgsfp:'Restringido post-Brexit', topPlan:'Premium', entryPlan:'Basic', rating:'A+ (S&P)', latam:'★★', visa:'✗ (individual)', src:'', vumi:false },
];

const RADAR = [
  { brand:'VUMI Euro Health', eea:5, latam:5, visa:5, rating:2, coverage:5 },
  { brand:'Bupa Global',      eea:5, latam:2, visa:5, rating:5, coverage:4 },
  { brand:'Cigna Global',     eea:1, latam:2, visa:1, rating:2, coverage:4 },
  { brand:'Allianz Care',     eea:5, latam:2, visa:5, rating:5, coverage:4 },
  { brand:'AXA Global',       eea:1, latam:2, visa:1, rating:5, coverage:3 },
];

export default async function CompetitorsPage() {
  const [competitors, products, insight] = await Promise.all([
    getCompetitors(), getCompetitorProducts(),
    queryCorpus('VUMI competidores IPMI Bupa Allianz Cigna AXA precios planes España', 5),
  ]);
  return (
    <div style={{ maxWidth:1100 }}>
      <FadeIn>
        <div style={{ marginBottom:24 }}>
          <div style={S.kicker}><T k="competitors.kicker" /></div>
          <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}><T k="competitors.headline" /></h1>
          <p style={{ fontSize:13, color:'#6B7785', maxWidth:720, lineHeight:1.6 }}><T k="competitors.subtitle" /></p>
        </div>
      </FadeIn>

      {/* Structural advantage callout */}
      <FadeIn delay={0.03}>
        <div style={{ background:'#EEF2FF', borderRadius:8, padding:'14px 20px', marginBottom:24, display:'flex', gap:16, alignItems:'flex-start', border:'1px solid #D8E2F8' }}>
          <span style={{ fontSize:20, flexShrink:0 }}>🏛️</span>
          <div>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:13, color:'#0033A0', marginBottom:4 }}>Ventaja estructural: pasaporte EEA</div>
            <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.6 }}>
              VUMI (Malta MFSA) y Allianz/Bupa (Irlanda) operan desde la EEA — acceso pleno al mercado español sin restricciones Brexit. Cigna (Guernsey) y AXA (FCA UK) tienen acceso restringido y no cumplen el requisito de visa de residencia. DGSFP: activo desde lanzamiento 17-mar-2026.
            </div>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.05}>
        <div style={{ ...S.card, marginBottom:24 }}>
          <div style={S.kicker}><T k="competitors.radar_title" /></div>
          <div style={{ display:'flex', gap:8, marginBottom:10, flexWrap:'wrap' }}>
            {['EEA ✓','Foco LATAM','Visa España','Rating','Cobertura €M'].map(d => (
              <span key={d} style={{ fontSize:11, background:'#EEF2FF', color:'#0033A0', padding:'3px 8px', borderRadius:4, fontWeight:500 }}>{d}</span>
            ))}
          </div>
          <CompetitorRadarChart data={RADAR} />
          <div style={{ marginTop:8, fontSize:11, color:'#6B7785' }}><T k="competitors.radar_note" /></div>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={S.kicker}><T k="competitors.table_title" /></div>
          <div style={{ overflowX:'auto', marginTop:12 }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead><tr style={{ borderBottom:'1px solid #E2E8F0' }}>
                {['col_competitor','col_regulator','col_jurisdiction','col_dgsfp','col_top','col_entry','col_rating','col_latam','col_visa'].map(k => (
                  <th key={k} style={S.th}><T k={`competitors.${k}`} /></th>
                ))}
              </tr></thead>
              <tbody>
                {IPMI.map(c => (
                  <tr key={c.brand} style={{ borderBottom:'1px solid #F5F7FA', background:c.vumi?'#EEF2FF':'#fff' }}>
                    <td style={{ padding:'9px 12px', fontWeight:700, color:c.vumi?'#0033A0':'#2C3539' }}>
                      {c.brand}{c.vumi && <span style={{ marginLeft:6, fontSize:10, background:'#0033A0', color:'#fff', padding:'1px 5px', borderRadius:3 }}>VUMI</span>}
                    </td>
                    <td style={{ padding:'9px 12px', color:'#6B7785' }}>{c.reg}</td>
                    <td style={{ padding:'9px 12px' }}>
                      <span style={{ fontSize:11, background:c.eea?'#E3F4F0':'#FBE8E2', color:c.eea?'#2DA771':'#E55B4D', padding:'2px 6px', borderRadius:4, fontWeight:600 }}>{c.jur}</span>
                    </td>
                    <td style={{ padding:'9px 12px', fontSize:11, color:c.dgsfp.includes('✓')?'#2DA771':c.dgsfp.includes('No')||c.dgsfp.includes('Restringido')?'#E55B4D':'#2C3539', fontWeight:600 }}>{c.dgsfp}</td>
                    <td style={{ padding:'9px 12px', color:'#2C3539' }}>{c.topPlan}</td>
                    <td style={{ padding:'9px 12px', color:'#2C3539' }}>{c.entryPlan}</td>
                    <td style={{ padding:'9px 12px', color:'#6B7785' }}>{c.rating}</td>
                    <td style={{ padding:'9px 12px', color:'#0033A0', fontWeight:600 }}>{c.latam}</td>
                    <td style={{ padding:'9px 12px', color:c.visa.includes('✗')?'#E55B4D':'#2DA771', fontWeight:600 }}>{c.visa}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ marginTop:10, fontSize:11, color:'#6B7785' }}><T k="competitors.table_note" /></div>
        </div>
      </FadeIn>

      {insight.answer && (
        <FadeIn delay={0.15}>
          <div style={{ ...S.card, borderLeft:'4px solid #0033A0', background:'#FAFBFF' }}>
            <div style={S.kicker}><T k="competitors.corpus_insight" /></div>
            <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6 }}>{insight.answer}</div>
          </div>
        </FadeIn>
      )}
    </div>
  );
}
