import React from 'react';
export const revalidate = 300;
import { getGeoOpportunities } from '@/lib/intelligence';
import { FadeIn, StaggerList, StaggerItem } from '@/components/motion/FadeIn';
import { T } from '@/components/i18n/T';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 3px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
};

const PRIORITY_META: Record<string,{color:string;bg:string;labelKey:string}> = {
  p0:{ color:'#0033A0', bg:'#EEF2FF', labelKey:'geography.p0_label' },
  p1:{ color:'#00A9E0', bg:'#E6F6FC', labelKey:'geography.p1_label' },
  p2:{ color:'#B45309', bg:'#FEF3CD', labelKey:'geography.p2_label' },
  p3:{ color:'#6B7785', bg:'#F5F7FA', labelKey:'geography.p3_label' },
};

const DENSITY_COLOR: Record<string,string> = {
  very_high:'#0033A0', high:'#00A9E0', medium:'#6B7785', low:'#B0BAC6',
};

function DensityDot({ val }: { val:string }) {
  return <span style={{ display:'inline-block', width:9, height:9, borderRadius:'50%', background:DENSITY_COLOR[val]||'#E2E8F0', marginRight:4, verticalAlign:'middle' }} />;
}

export default async function GeographyPage() {
  const geo = await getGeoOpportunities();

  const grouped = Object.entries(
    geo.reduce((acc:any, row:any) => {
      const p = row.launch_priority;
      if (!acc[p]) acc[p] = [];
      acc[p].push(row);
      return acc;
    }, {})
  ).sort(([a],[b]) => a.localeCompare(b));

  return (
    <div style={{ maxWidth:1100 }}>

      <FadeIn>
        <div style={{ marginBottom:24 }}>
          <div style={S.kicker}><T k="geography.kicker" /></div>
          <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}>
            <T k="geography.headline" />
          </h1>
          <p style={{ fontSize:13, color:'#6B7785', maxWidth:680, lineHeight:1.6 }}><T k="geography.subtitle" /></p>
        </div>
      </FadeIn>

      <FadeIn delay={0.04}>
        <div style={{ display:'flex', gap:10, flexWrap:'wrap', marginBottom:22 }}>
          {Object.entries(PRIORITY_META).map(([k,v]) => (
            <div key={k} style={{ display:'flex', alignItems:'center', gap:6, padding:'5px 12px', borderRadius:6, background:v.bg, border:`1px solid ${v.color}33` }}>
              <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:11, color:v.color }}>{k.toUpperCase()}</span>
              <span style={{ fontSize:11, color:'#6B7785' }}><T k={v.labelKey} /></span>
            </div>
          ))}
        </div>
      </FadeIn>

      {grouped.map(([priority, cities], gIdx) => {
        const meta = PRIORITY_META[priority] || { color:'#6B7785', bg:'#F5F7FA', labelKey:'geography.p3_label' };
        const cityArr = cities as any[];
        return (
          <FadeIn key={priority} delay={0.06 + gIdx * 0.05}>
            <div style={{ marginBottom:24 }}>
              <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                <span style={{ background:meta.bg, color:meta.color, padding:'3px 10px', borderRadius:99, fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:12 }}>
                  {priority.toUpperCase()}
                </span>
                <span style={{ fontSize:13, color:'#2C3539', fontWeight:600 }}><T k={meta.labelKey} /></span>
                <span style={{ fontSize:12, color:'#6B7785' }}>— {cityArr.length} <T k={cityArr.length===1?'geography.city_count_singular':'geography.city_count_plural'} /></span>
              </div>
              <StaggerList>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(310px,1fr))', gap:14 }}>
                  {cityArr.map((row) => (
                    <StaggerItem key={row.city+row.ccaa}>
                      <div style={{ ...S.card, borderTop:`3px solid ${meta.color}`, padding:20 }}>
                        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:10 }}>
                          <div>
                            <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:15, color:'#2C3539' }}>{row.city}</div>
                            <div style={{ fontSize:11, color:'#6B7785', marginTop:2 }}>{row.ccaa}{row.province && row.province !== row.ccaa ? ' · '+ row.province : ''}</div>
                          </div>
                          {row.private_health_penetration_pct && (
                            <div style={{ textAlign:'right' }}>
                              <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:19, color:'#0033A0', lineHeight:1 }}>{row.private_health_penetration_pct}%</div>
                              <div style={{ fontSize:10, color:'#6B7785' }}><T k="geography.private_health_label" /></div>
                            </div>
                          )}
                        </div>
                        <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:10 }}>
                          {[
                            { labelKey:'geography.latam_label', val:row.latam_concentration },
                            { labelKey:'geography.hnw_label', val:row.hnw_concentration },
                            { labelKey:'geography.brokers_label', val:row.broker_density },
                          ].map(({ labelKey, val }) => (
                            <span key={labelKey} style={{ fontSize:10, padding:'2px 7px', borderRadius:99, background:'#F5F7FA', color:'#2C3539', fontWeight:600 }}>
                              <DensityDot val={val} /><T k={labelKey} />: {val?.replace('_',' ')}
                            </span>
                          ))}
                          {row.premium_hospital_count > 0 && (
                            <span style={{ fontSize:10, padding:'2px 7px', borderRadius:99, background:'#E3F4F0', color:'#2DA771', fontWeight:600 }}>
                              🏥 {row.premium_hospital_count} <T k="geography.hospitals_label" />
                            </span>
                          )}
                        </div>
                        {row.strategic_rationale && (
                          <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.5, borderTop:'1px solid #F5F7FA', paddingTop:10 }}>
                            {row.strategic_rationale.length > 200 ? row.strategic_rationale.slice(0,200)+'…' : row.strategic_rationale}
                          </div>
                        )}
                      </div>
                    </StaggerItem>
                  ))}
                </div>
              </StaggerList>
            </div>
          </FadeIn>
        );
      })}

      <FadeIn delay={0.25}>
        <div style={{ ...S.card, background:'#F5F7FA', marginTop:8 }}>
          <div style={{ fontSize:12, color:'#6B7785', lineHeight:1.6 }}>
            <strong style={{ color:'#2C3539' }}><T k="geography.sources_title" />:</strong> INE Padrón Municipal 2024–2025, OPI (Observatorio Permanente de la Inmigración), registros DGSFP, Sotheby's/Knight Frank prime residential data.
          </div>
        </div>
      </FadeIn>

    </div>
  );
}
