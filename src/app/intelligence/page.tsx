import React from 'react';
export const revalidate = 300;
import { getCockpitKPIs, getRecentSignals, getRecentDecisions, getGeoOpportunities } from '@/lib/intelligence';
import { queryCorpus } from '@/lib/corpus';
import Link from 'next/link';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 2px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
};
const PC: Record<string,string> = { p0:'#0033A0', p1:'#00A9E0', p2:'#B45309', p3:'#6B7785' };
const PB: Record<string,string> = { p0:'#EEF2FF', p1:'#E6F6FC', p2:'#FEF3CD', p3:'#F5F7FA' };

export default async function CockpitPage() {
  const [kpis, signals, decisions, geo, regulatory] = await Promise.all([
    getCockpitKPIs(),
    getRecentSignals(8),
    getRecentDecisions(5),
    getGeoOpportunities(),
    queryCorpus('VUMI DGSFP registro España regulatorio estado inscripción Malta', 4),
  ]);

  return (
    <div style={{ maxWidth:1200 }}>

      {/* DGSFP Blocker — always shown until gap is resolved */}
      <div style={{ background:'#FBE8E2', border:'1px solid #E55B4D', borderRadius:8, padding:'14px 20px', marginBottom:20, display:'flex', gap:14, alignItems:'flex-start' }}>
        <span style={{ color:'#E55B4D', fontSize:18, flexShrink:0 }}>⚠</span>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:13, color:'#E55B4D', marginBottom:4 }}>
            BLOQUEANTE P0 — Inscripción DGSFP no verificada públicamente
          </div>
          <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.55 }}>
            La lista BdE de aseguradoras maltesas (18-mar-2026) no incluye a VUMI Insurance Europe Limited.
            Lanzamiento anunciado 17-mar-2026 (Health &amp; Protection). Posible desfase — verificar con DGSFP
            antes de activar canal broker o medios.
            <span style={S.cite}>08_Wave1_Regulatorio §A.1.2</span>
          </div>
        </div>
        <Link href="/intelligence/gates" style={{ fontSize:12, color:'#E55B4D', fontWeight:600, textDecoration:'none', flexShrink:0 }}>Ver gap →</Link>
      </div>

      {/* Verdict */}
      <div style={{ background:'#0033A0', borderRadius:8, padding:'20px 28px', marginBottom:24, display:'flex', justifyContent:'space-between', alignItems:'center', gap:24 }}>
        <div>
          <div style={{ fontSize:10, color:'#00A9E0', fontFamily:"'Montserrat',sans-serif", fontWeight:600, textTransform:'uppercase', letterSpacing:'0.15em', marginBottom:6 }}>Veredicto — España Go-to-Market</div>
          <div style={{ color:'#fff', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:16, lineHeight:1.45, maxWidth:680 }}>
            VUMI® Insurance Europe Limited (MFSA Malta C&nbsp;112852) lanzó Euro Health el 17 mar&nbsp;2026 — planes Priority €3M · Pro €4M · Premier €5M.
            {' '}<span style={{ color:'#FFD166' }}>Canal broker Madrid/Canarias como entrada; 1,09M+ latinos Spain como audiencia primaria.</span>
          </div>
          {regulatory.chunks.length > 0 && (
            <div style={{ marginTop:8, display:'flex', gap:5, flexWrap:'wrap' }}>
              {regulatory.chunks.slice(0,3).map((c,i) => (
                <span key={i} style={{ fontSize:10, background:'rgba(0,169,224,0.2)', color:'#9BD6F0', padding:'2px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace" }}>
                  {c.doc_slug}#{c.chunk_index}
                </span>
              ))}
            </div>
          )}
        </div>
        <div style={{ flexShrink:0, textAlign:'right' }}>
          <div style={{ color:'rgba(255,255,255,0.6)', fontSize:10 }}>Actualizado</div>
          <div style={{ color:'#fff', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:13 }}>
            {new Date().toLocaleDateString('es-ES',{day:'2-digit',month:'short',year:'numeric'})}
          </div>
        </div>
      </div>

      {/* Plans */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:12, marginBottom:20 }}>
        {[
          { name:'Euro Health Priority', amt:'€3.000.000', id:'priority' },
          { name:'Euro Health Pro',      amt:'€4.000.000', id:'pro'      },
          { name:'Euro Health Premier',  amt:'€5.000.000', id:'premier'  },
        ].map((p,i) => (
          <div key={p.id} style={{ ...S.card, borderTop:`3px solid ${i===2?'#0033A0':i===1?'#3366CC':'#6B7785'}` }}>
            <div style={{ fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:4 }}>{p.name}</div>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:24, color:'#0033A0', lineHeight:1 }}>{p.amt}</div>
            <div style={{ fontSize:10, color:'#6B7785', marginTop:3 }}>cobertura anual máxima</div>
            <span style={S.cite}>01_VUMI_Facts §3.4</span>
          </div>
        ))}
      </div>

      {/* KPIs */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(6,1fr)', gap:12, marginBottom:24 }}>
        {[
          { v:kpis.tier1_brokers,      l:'Brokers T1',     n:'Shortlisted',              h:'/intelligence/brokers',   w:false },
          { v:'3',                     l:'Audiencias LatAm', n:'VE · CO · MX',            h:'/intelligence/audiences', w:false },
          { v:kpis.priority_cities,    l:'Ciudades P0+P1',  n:'Madrid, BCN, Canarias',    h:'/intelligence/geography', w:false },
          { v:kpis.high_signals,       l:'Señales ≥80',     n:`${kpis.action_signals} acción`, h:'/intelligence/signals', w:false },
          { v:kpis.open_gaps,          l:'Gaps Abiertos',   n:`${kpis.blockers} bloqueantes`, h:'/intelligence/gates', w:kpis.blockers>0 },
          { v:kpis.active_decisions,   l:'Decisiones',      n:'Activas',                  h:'/intelligence/gates',   w:false },
        ].map(({ v, l, n, h, w }) => (
          <Link key={l} href={h} style={{ textDecoration:'none' }}>
            <div style={{ ...S.card, borderTop:`3px solid ${w?'#E55B4D':'#0033A0'}` }}>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, color:w?'#E55B4D':'#0033A0', lineHeight:1, marginBottom:4 }}>{v}</div>
              <div style={{ fontSize:11, fontWeight:600, color:'#2C3539', marginBottom:2 }}>{l}</div>
              <div style={{ fontSize:10, color:'#6B7785' }}>{n}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* Geo + Signals */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20, marginBottom:20 }}>
        <div style={S.card}>
          <div style={S.kicker}>Prioridad por Ciudad</div>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, marginTop:10 }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #E2E8F0' }}>
                {['P','Ciudad','CCAA','LatAm','HNW'].map(h=>(
                  <th key={h} style={{ textAlign:'left', padding:'5px 8px', fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {geo.slice(0,8).map((r:any) => (
                <tr key={r.city} style={{ borderBottom:'1px solid #F5F7FA' }}>
                  <td style={{ padding:'6px 8px' }}>
                    <span style={{ background:PB[r.launch_priority]||'#F5F7FA', color:PC[r.launch_priority]||'#6B7785', padding:'2px 5px', borderRadius:99, fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:10 }}>{r.launch_priority?.toUpperCase()}</span>
                  </td>
                  <td style={{ padding:'6px 8px', fontWeight:600, color:'#2C3539' }}>{r.city}</td>
                  <td style={{ padding:'6px 8px', color:'#6B7785' }}>{r.ccaa}</td>
                  <td style={{ padding:'6px 8px', color:'#6B7785', fontSize:11, textTransform:'capitalize' }}>{r.latam_concentration}</td>
                  <td style={{ padding:'6px 8px', color:'#6B7785', fontSize:11, textTransform:'capitalize' }}>{r.hnw_concentration}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link href="/intelligence/geography" style={{ display:'block', marginTop:10, textAlign:'right', fontSize:12, color:'#0033A0', fontWeight:600, textDecoration:'none' }}>Mapa completo →</Link>
        </div>

        <div style={S.card}>
          <div style={S.kicker}>Señales Recientes</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8, marginTop:10 }}>
            {signals.slice(0,6).map((s:any) => (
              <div key={s.id} style={{ padding:'9px 11px', borderRadius:6, background:s.action_required?'#FFF8F7':'#F5F7FA', borderLeft:`3px solid ${s.action_required?'#E55B4D':s.signal_type==='regulatory'?'#0033A0':'#00A9E0'}` }}>
                <div style={{ fontSize:12, fontWeight:600, color:'#2C3539', lineHeight:1.3, marginBottom:3 }}>{s.result_title?.slice(0,75)}{s.result_title?.length>75?'…':''}</div>
                <div style={{ display:'flex', gap:5, alignItems:'center', flexWrap:'wrap' }}>
                  <span style={{ fontSize:10, background:'#E6F6FC', color:'#0033A0', padding:'1px 5px', borderRadius:99, fontWeight:600 }}>{s.signal_type}</span>
                  {s.action_required && <span style={{ fontSize:10, background:'#FBE8E2', color:'#E55B4D', padding:'1px 5px', borderRadius:99, fontWeight:700 }}>⚡ Acción</span>}
                  <span style={{ fontSize:10, color:'#6B7785', marginLeft:'auto' }}>{s.relevance_score}</span>
                </div>
              </div>
            ))}
          </div>
          <Link href="/intelligence/signals" style={{ display:'block', marginTop:10, textAlign:'right', fontSize:12, color:'#0033A0', fontWeight:600, textDecoration:'none' }}>Ver todas →</Link>
        </div>
      </div>

      {/* Decisions */}
      <div style={S.card}>
        <div style={S.kicker}>Últimas Decisiones Activas</div>
        {decisions.map((d:any) => (
          <div key={d.id} style={{ padding:'11px 0', borderBottom:'1px solid #F5F7FA', display:'flex', gap:14, alignItems:'flex-start' }}>
            <span style={{ background:d.reversibility==='reversible'?'#E3F4F0':'#FBE8E2', color:d.reversibility==='reversible'?'#2DA771':'#E55B4D', padding:'2px 6px', borderRadius:99, fontSize:10, fontWeight:600, flexShrink:0, marginTop:2 }}>
              {d.reversibility==='reversible'?'↩ Rev.':'⚠ Costly'}
            </span>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600, color:'#2C3539', marginBottom:2 }}>{d.title}</div>
              <div style={{ fontSize:11, color:'#6B7785' }}>{d.decision?.slice(0,110)}{d.decision?.length>110?'…':''}</div>
            </div>
            <div style={{ flexShrink:0, textAlign:'right', fontSize:11 }}>
              <div style={{ color:'#6B7785' }}>{d.domain}</div>
              <div style={{ color:'#2C3539', fontWeight:600 }}>{d.decided_at}</div>
            </div>
          </div>
        ))}
        <Link href="/intelligence/gates" style={{ display:'block', marginTop:10, textAlign:'right', fontSize:12, color:'#0033A0', fontWeight:600, textDecoration:'none' }}>Gates y decisiones →</Link>
      </div>

      {/* Nav */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10, marginTop:20 }}>
        {[
          { h:'/intelligence/audiences',  l:'Audiencias LatAm',  s:'VE 377K · CO 676K · MX 36K' },
          { h:'/intelligence/brokers',    l:'Brokers',           s:`${kpis.tier1_brokers} shortlisted` },
          { h:'/intelligence/competitors',l:'Competidores IPMI', s:'9 mapeados — MFSA vs FCA' },
          { h:'/intelligence/proposition',l:'Propuesta',         s:'Euro Health Priority→Premier' },
          { h:'/intelligence/ask',        l:'Ask VUMI',          s:'RAG · 65 chunks corpus' },
        ].map(({ h, l, s }) => (
          <Link key={h} href={h} style={{ ...S.card, textDecoration:'none', display:'block', padding:'14px 16px', textAlign:'center', borderTop:'2px solid #00A9E0' }}>
            <div style={{ fontSize:13, fontWeight:600, color:'#0033A0', fontFamily:"'Montserrat',sans-serif", marginBottom:3 }}>{l}</div>
            <div style={{ fontSize:11, color:'#6B7785' }}>{s}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
