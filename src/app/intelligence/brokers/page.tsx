import React from 'react';
export const revalidate = 300;
import { getBrokers } from '@/lib/intelligence';
import { queryCorpus } from '@/lib/corpus';
import { FadeIn, StaggerList, StaggerItem, HoverCard } from '@/components/motion/FadeIn';
import { AnimatedKPI } from '@/components/motion/AnimatedKPI';
import { T } from '@/components/i18n/T';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 3px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
};

const PRIORITY_META: Record<string,{bg:string;color:string;key:string}> = {
  p0:{ bg:'#FBE8E2', color:'#E55B4D', key:'brokers.p0_label' },
  p1:{ bg:'#EEF2FF', color:'#0033A0', key:'brokers.p1_label' },
  p2:{ bg:'#FEF3CD', color:'#B45309', key:'brokers.p2_label' },
  p3:{ bg:'#F5F7FA', color:'#6B7785', key:'brokers.p3_label' },
};

const CORPUS_BROKERS = [
  { name:'C1 Broker (Wiseg Mediación)', dgsfp:'J-3790', city:'Las Palmas + Mallorca', ccaa:'Canarias + Baleares', priorityKey:'MÁXIMA PRIORIDAD — socio natural VUMI', carriers:['Cigna','Bupa Global','Allianz Care','AXA','DKV','Sanitas Bupa','Caser Expat','Foyer Global Health','PassportCard'], note:'26+ años. Especialización MUY ALTA expats/residentes extranjeros. CEO: Susana Wichels (opinion leader).', website:'https://c1brokers.es', source:'06_Corpus_Brokers §11', tier:1, priority_raw:'p0' },
  { name:'Medicorasse (Grup Med)', dgsfp:'—', city:'Palma de Mallorca', ccaa:'Illes Balears', priorityKey:'Alta — sanitarios + expat premium Ibiza/Palma', carriers:['DKV Salud','Asisa','Adeslas'], note:'Especialización muy alta en profesionales sanitarios. ABR Correduría asociada.', website:'https://medicorasse.med.es', source:'06_Corpus_Brokers §12', tier:1, priority_raw:'p1' },
  { name:'Canarisk Consultores', dgsfp:'—', city:'Las Palmas + Tenerife', ccaa:'Canarias', priorityKey:'Alta — residentes extranjeros + visas', carriers:['Esp. seguros privados extranjeros con visa residencia'], note:'Seg. médicos privados para extranjeros que solicitan residencia Canarias. Complementario a C1.', website:'https://www.canarisk.es', source:'06_Corpus_Brokers §11', tier:1, priority_raw:'p1' },
];

function FitBar({ score, color='#0033A0' }: { score:number; color?:string }) {
  return (
    <div style={{ height:4, background:'#E2E8F0', borderRadius:2, overflow:'hidden', marginTop:4 }}>
      <div style={{ height:'100%', width:`${score}%`, background:color, borderRadius:2 }} />
    </div>
  );
}

export default async function BrokersPage() {
  const [brokers, insight] = await Promise.all([
    getBrokers(),
    queryCorpus('broker correduria España salud expat LATAM IPMI canal distribución', 5),
  ]);

  const t1 = brokers.filter((b:any) => b.tier === 'tier_1');
  const t2 = brokers.filter((b:any) => b.tier === 'tier_2');

  return (
    <div style={{ maxWidth:1100 }}>

      <FadeIn>
        <div style={{ marginBottom:24 }}>
          <div style={S.kicker}><T k="brokers.kicker" /></div>
          <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}>
            <T k="brokers.headline" />
          </h1>
          <p style={{ fontSize:13, color:'#6B7785', maxWidth:700, lineHeight:1.6 }}>
            {brokers.length} <T k="brokers.subtitle_pre" /><span style={S.cite}>06_Corpus_Brokers_CCAA</span>
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.04}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
          <AnimatedKPI value={t1.length}                                   label="Tier 1 DB"  sub="Priority shortlist"                    color="'#0033A0'" />
          <AnimatedKPI value={t2.length}                                   label="Tier 2 DB"  sub="Second wave"                            color="'#00A9E0'" />
          <AnimatedKPI value={brokers.filter((b:any)=>b.expat_focus).length} label="Expat Focus" sub="Verified specialisation"              color="'#2DA771'" />
          <AnimatedKPI value={brokers.filter((b:any)=>b.latam_focus).length} label="LatAm Focus" sub="Target aligned"                      color="'#2DA771'" />
        </div>
      </FadeIn>

      {/* Corpus broker intelligence */}
      <FadeIn delay={0.08}>
        <div style={{ ...S.card, marginBottom:20, borderLeft:'4px solid #E55B4D' }}>
          <div style={S.kicker}><T k="brokers.corpus_section_title" /></div>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:16, color:'#2C3539', marginBottom:14 }}>
            C1 Broker: <T k="brokers.c1_priority" /><span style={S.cite}>06_Corpus_Brokers §11</span>
          </div>
          <StaggerList>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:14 }}>
              {CORPUS_BROKERS.map((b) => {
                const isC1 = b.name.includes('C1');
                return (
                  <StaggerItem key={b.name}>
                    <HoverCard style={{ background:'#F5F7FA', borderRadius:8, padding:16, border:'1px solid #E2E8F0', borderTop:isC1?'3px solid #E55B4D':'3px solid #0033A0', height:'100%' }}>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                        <div>
                          <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:14, color:'#2C3539' }}>
                            {b.website ? <a href={b.website} target="_blank" rel="noopener noreferrer" style={{ color:'#0033A0', textDecoration:'none' }}>{b.name}</a> : b.name}
                          </div>
                          <div style={{ fontSize:11, color:'#6B7785', marginTop:2 }}>{b.city} · DGSFP {b.dgsfp}</div>
                        </div>
                        <span style={{ background:isC1?'#FBE8E2':'#EEF2FF', color:isC1?'#E55B4D':'#0033A0', padding:'2px 8px', borderRadius:99, fontSize:9, fontWeight:700, height:'fit-content' }}>
                          {b.priority_raw.toUpperCase()}
                        </span>
                      </div>
                      <div style={{ fontSize:11, background:isC1?'#FBE8E2':'#EEF2FF', color:isC1?'#E55B4D':'#0033A0', padding:'4px 8px', borderRadius:4, marginBottom:8, fontWeight:600 }}>
                        {b.priorityKey}
                      </div>
                      <div style={{ fontSize:11, color:'#2C3539', marginBottom:8, lineHeight:1.5 }}>{b.note}</div>
                      <div style={{ fontSize:10, color:'#6B7785', marginBottom:4 }}>
                        <strong style={{ color:'#2C3539' }}><T k="brokers.carriers_label" />:</strong> {b.carriers.join(' · ')}
                      </div>
                      <span style={S.cite}>{b.source}</span>
                    </HoverCard>
                  </StaggerItem>
                );
              })}
            </div>
          </StaggerList>
        </div>
      </FadeIn>

      {/* DB Tier 1 */}
      {t1.length > 0 && (
        <FadeIn delay={0.12}>
          <div style={{ ...S.card, marginBottom:20 }}>
            <div style={S.kicker}><T k="brokers.tier1_title" /></div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:14, marginTop:12 }}>
              {t1.map((b:any) => {
                const out = PRIORITY_META[b.outreach_priority] || PRIORITY_META.p3;
                return (
                  <HoverCard key={b.id} style={{ background:'#F5F7FA', borderRadius:8, padding:16, border:'1px solid #E2E8F0', borderTop:b.outreach_priority==='p0'?'3px solid #E55B4D':'3px solid #0033A0' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                      <div>
                        <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:14, color:'#2C3539' }}>
                          {b.website ? <a href={b.website} target="_blank" rel="noopener noreferrer" style={{ color:'#0033A0', textDecoration:'none' }}>{b.name}</a> : b.name}
                        </div>
                        <div style={{ fontSize:11, color:'#6B7785', marginTop:2 }}>{b.primary_city} · {b.primary_ccaa}</div>
                      </div>
                      <div style={{ textAlign:'right' }}>
                        <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:22, color:'#0033A0', lineHeight:1 }}>{b.fit_score}</div>
                        <div style={{ fontSize:10, color:'#6B7785' }}>Fit</div>
                        <FitBar score={b.fit_score} />
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginBottom:8 }}>
                      <span style={{ background:out.bg, color:out.color, padding:'2px 6px', borderRadius:99, fontSize:10, fontWeight:600 }}><T k={out.key} /></span>
                      {b.expat_focus && <span style={{ background:'#E6F6FC', color:'#0033A0', padding:'2px 6px', borderRadius:99, fontSize:10, fontWeight:600 }}>Expat</span>}
                      {b.latam_focus && <span style={{ background:'#E6F6FC', color:'#0033A0', padding:'2px 6px', borderRadius:99, fontSize:10, fontWeight:600 }}>LatAm</span>}
                      {b.vip_hnw_focus && <span style={{ background:'#F4EEFB', color:'#6A3AAF', padding:'2px 6px', borderRadius:99, fontSize:10, fontWeight:600 }}>VIP/HNW</span>}
                    </div>
                    {b.carriers_intermediated?.length > 0 && (
                      <div style={{ fontSize:10, color:'#6B7785' }}>
                        {b.carriers_intermediated.slice(0,4).join(' · ')}{b.carriers_intermediated.length>4?` +${b.carriers_intermediated.length-4}`:''}
                      </div>
                    )}
                    {b.notes && <div style={{ fontSize:11, color:'#2C3539', marginTop:6, lineHeight:1.4, borderTop:'1px solid #E2E8F0', paddingTop:6 }}>{b.notes.slice(0,100)}{b.notes.length>100?'…':''}</div>}
                  </HoverCard>
                );
              })}
            </div>
          </div>
        </FadeIn>
      )}

      {/* DB Tier 2 */}
      {t2.length > 0 && (
        <FadeIn delay={0.15}>
          <div style={{ ...S.card, marginBottom:20 }}>
            <div style={S.kicker}><T k="brokers.tier2_title" /></div>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, marginTop:12 }}>
              <thead>
                <tr style={{ borderBottom:'1px solid #E2E8F0', background:'#F5F7FA' }}>
                  {['col_broker','col_ccaa','col_fit','col_expat','col_latam','col_priority'].map(k => (
                    <th key={k} style={{ textAlign:'left', padding:'7px 10px', fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase' }}><T k={`brokers.${k}`} /></th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t2.map((b:any) => {
                  const out = PRIORITY_META[b.outreach_priority] || PRIORITY_META.p3;
                  return (
                    <tr key={b.id} style={{ borderBottom:'1px solid #F5F7FA' }}>
                      <td style={{ padding:'8px 10px' }}>
                        <div style={{ fontWeight:600, color:'#2C3539', fontSize:12 }}>{b.website?<a href={b.website} target="_blank" rel="noopener noreferrer" style={{ color:'#0033A0', textDecoration:'none' }}>{b.name}</a>:b.name}</div>
                        <div style={{ fontSize:10, color:'#6B7785' }}>{b.dgsfp_code}</div>
                      </td>
                      <td style={{ padding:'8px 10px', color:'#6B7785' }}>{b.primary_ccaa}</td>
                      <td style={{ padding:'8px 10px' }}><span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, color:'#0033A0' }}>{b.fit_score}</span><FitBar score={b.fit_score}/></td>
                      <td style={{ padding:'8px 10px' }}>{b.expat_focus?'✓':'—'}</td>
                      <td style={{ padding:'8px 10px' }}>{b.latam_focus?'✓':'—'}</td>
                      <td style={{ padding:'8px 10px' }}><span style={{ background:out.bg, color:out.color, padding:'2px 6px', borderRadius:99, fontSize:10, fontWeight:600 }}><T k={out.key} /></span></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </FadeIn>
      )}

      {insight.answer && (
        <FadeIn delay={0.18}>
          <div style={{ ...S.card, borderLeft:'4px solid #0033A0', background:'#FAFBFF' }}>
            <div style={S.kicker}><T k="brokers.corpus_insight" /></div>
            <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:8 }}>{insight.answer}</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {insight.chunks.map((c,i) => <span key={i} style={S.cite}>{c.doc_slug}#{c.chunk_index}</span>)}
            </div>
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.2}>
        <div style={{ ...S.card, borderLeft:'4px solid #E55B4D', background:'#FFF8F7', marginTop:16 }}>
          <div style={S.kicker}><T k="brokers.action_title" /></div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6 }}>
            <strong>C1 Broker (Canarias + Mallorca)</strong> es el socio estratégico natural nº1: 26 años expat, portfolio completo IPMI, CEO visible en sector.
            Outreach esta semana con battle card VUMI vs Cigna/Bupa/Allianz + pricing pendiente mystery shopping.
            Requisito previo: confirmar DGSFP.<span style={S.cite}>06_Corpus_Brokers §11</span>
          </div>
        </div>
      </FadeIn>

    </div>
  );
}
