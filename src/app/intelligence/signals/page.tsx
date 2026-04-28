import React from 'react';
export const revalidate = 300;
import { getSignals } from '@/lib/intelligence';
import { SignalTimelineChart } from '@/components/charts/SignalTimelineChart';
import { FadeIn, StaggerList, StaggerItem } from '@/components/motion/FadeIn';
import { T } from '@/components/i18n/T';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 3px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
};

const TYPE_KEYS: Record<string,{bg:string;color:string;labelKey:string}> = {
  regulatory:       { bg:'#EEF2FF', color:'#0033A0', labelKey:'signals.type_regulatory' },
  competitor_move:  { bg:'#E6F6FC', color:'#0074A8', labelKey:'signals.type_competitor' },
  market_data:      { bg:'#E3F4F0', color:'#2DA771', labelKey:'signals.type_market' },
  broker_activity:  { bg:'#F4EEFB', color:'#6A3AAF', labelKey:'signals.type_broker' },
  demographic:      { bg:'#FEF3CD', color:'#B45309', labelKey:'signals.type_demographic' },
};

export default async function SignalsPage() {
  const signals = await getSignals(60);
  const actionRequired = signals.filter((s:any) => s.action_required);
  const byType: Record<string,number> = {};
  signals.forEach((s:any) => { const t=s.signal_type||'other'; byType[t]=(byType[t]||0)+1; });

  return (
    <div style={{ maxWidth:1100 }}>
      <FadeIn>
        <div style={{ marginBottom:24 }}>
          <div style={S.kicker}><T k="signals.kicker" /></div>
          <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}>
            <T k="signals.headline_pre" /> {signals.length}
          </h1>
          <p style={{ fontSize:13, color:'#6B7785', lineHeight:1.6 }}><T k="signals.subtitle" /></p>
        </div>
      </FadeIn>

      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginBottom:20 }}>
        {Object.entries(byType).map(([type,count]) => {
          const meta = TYPE_KEYS[type] || { bg:'#F5F7FA', color:'#6B7785', labelKey:'other' };
          return (
            <div key={type} style={{ background:meta.bg, borderRadius:8, padding:'12px 14px', border:`1px solid ${meta.color}22` }}>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:22, color:meta.color, lineHeight:1, marginBottom:3 }}>{count}</div>
              <div style={{ fontSize:11, color:meta.color, fontWeight:600 }}>
                <T k={meta.labelKey} fallback={type} />
              </div>
            </div>
          );
        })}
      </div>

      <FadeIn delay={0.05}>
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={S.kicker}><T k="signals.kicker" /></div>
          <SignalTimelineChart signals={signals} />
        </div>
      </FadeIn>

      {actionRequired.length > 0 && (
        <FadeIn delay={0.08}>
          <div style={{ ...S.card, border:'1px solid #E55B4D', marginBottom:20 }}>
            <div style={{ ...S.kicker, color:'#E55B4D' }}><T k="signals.action_pre" /> {actionRequired.length}</div>
            {actionRequired.map((s:any) => (
              <div key={s.id} style={{ padding:'10px 0', borderBottom:'1px solid #F5F7FA' }}>
                <div style={{ fontSize:13, fontWeight:600, color:'#2C3539', marginBottom:3 }}>{s.result_title}</div>
                {s.action_note && <div style={{ fontSize:12, color:'#E55B4D', fontWeight:600, background:'#FBE8E2', padding:'3px 8px', borderRadius:4, display:'inline-block' }}>{s.action_note}</div>}
              </div>
            ))}
          </div>
        </FadeIn>
      )}

      <FadeIn delay={0.1}>
        <div style={{ ...S.kicker, marginBottom:12 }}><T k="signals.all_signals" /></div>
        <StaggerList>
          {signals.map((s:any) => {
            const meta = TYPE_KEYS[s.signal_type] || { bg:'#F5F7FA', color:'#6B7785', labelKey:'other' };
            const rc = s.relevance_score >= 85 ? '#0033A0' : s.relevance_score >= 70 ? '#00A9E0' : '#6B7785';
            return (
              <StaggerItem key={s.id}>
                <div style={{ padding:'13px 15px', borderRadius:8, marginBottom:7, background:s.action_required?'#FFF8F7':'#fff', border:'1px solid #E2E8F0', borderLeft:`4px solid ${s.action_required?'#E55B4D':meta.color}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:12, marginBottom:5 }}>
                    <div style={{ flex:1 }}>
                      <div style={{ fontSize:13, fontWeight:600, color:'#2C3539', lineHeight:1.35, marginBottom:3 }}>
                        {s.result_url ? <a href={s.result_url} target="_blank" rel="noopener noreferrer" style={{ color:'#2C3539', textDecoration:'none' }}>{s.result_title}</a> : s.result_title}
                      </div>
                      {s.result_summary && <div style={{ fontSize:12, color:'#6B7785', lineHeight:1.45 }}>{s.result_summary.length > 200 ? s.result_summary.slice(0,200)+'…' : s.result_summary}</div>}
                      {s.action_note && <div style={{ fontSize:12, color:'#E55B4D', fontWeight:600, marginTop:5, padding:'3px 7px', background:'#FBE8E2', borderRadius:4, display:'inline-block' }}><T k="signals.action_badge" /> {s.action_note}</div>}
                    </div>
                    <div style={{ flexShrink:0, textAlign:'right' }}>
                      <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:20, color:rc, lineHeight:1 }}>{s.relevance_score}</div>
                      <div style={{ fontSize:10, color:'#6B7785', textTransform:'uppercase', letterSpacing:'0.06em' }}><T k="signals.relevance" /></div>
                    </div>
                  </div>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap', alignItems:'center' }}>
                    <span style={{ fontSize:10, background:meta.bg, color:meta.color, padding:'2px 7px', borderRadius:99, fontWeight:600 }}><T k={meta.labelKey} fallback={s.signal_type} /></span>
                    {s.entity && <span style={{ fontSize:10, background:'#F5F7FA', color:'#6B7785', padding:'2px 7px', borderRadius:99 }}>{s.entity}</span>}
                    {s.action_required && <span style={{ fontSize:10, background:'#FBE8E2', color:'#E55B4D', padding:'2px 6px', borderRadius:99, fontWeight:700 }}><T k="signals.action_badge" /></span>}
                    <span style={{ fontSize:10, color:'#94A3B8', marginLeft:'auto' }}>{s.detected_at ? new Date(s.detected_at).toLocaleDateString('es-ES',{day:'2-digit',month:'short'}) : ''}</span>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerList>
      </FadeIn>
    </div>
  );
}
