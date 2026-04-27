import React from 'react';
export const revalidate = 300;
import { getBrokers } from '@/lib/intelligence';
import { queryCorpus } from '@/lib/corpus';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 2px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
};

const OUT: Record<string,{bg:string;color:string;label:string}> = {
  p0:{ bg:'#FBE8E2', color:'#E55B4D', label:'P0 — Esta semana' },
  p1:{ bg:'#EEF2FF', color:'#0033A0', label:'P1 — 30 días' },
  p2:{ bg:'#FEF3CD', color:'#B45309', label:'P2 — 60 días' },
  p3:{ bg:'#F5F7FA', color:'#6B7785', label:'P3 — Watch' },
};

// Key brokers from corpus doc 06 — verified with CCAA context and carriers
// These supplement the DB data with corpus intelligence
const CORPUS_BROKERS = [
  {
    name: 'C1 Broker (Wiseg Mediación)',
    dgsfp: 'J-3790',
    city: 'Las Palmas de Gran Canaria + Mallorca',
    ccaa: 'Canarias + Baleares',
    priority: 'MÁXIMA PRIORIDAD — natural partner VUMI',
    carriers: ['Cigna','Bupa Global','Allianz Care','AXA','DKV','Sanitas Bupa','Caser Expat','Aegon','Asisa','Foyer Global Health','PassportCard'],
    note: '26+ años. Especialización MUY ALTA en expatriados/residentes extranjeros. CEO: Susana Wichels (opinion leader sectorial).',
    website: 'https://c1brokers.es',
    source: '06_Corpus_Brokers §11',
    tier: 1,
  },
  {
    name: 'Medicorasse (Grup Med)',
    dgsfp: '—',
    city: 'Palma de Mallorca (ABR Correduría)',
    ccaa: 'Illes Balears',
    priority: 'Alta — sanitarios + expat premium Ibiza/Palma',
    carriers: ['DKV Salud','Asisa','Adeslas','especialización sanitarios'],
    note: 'Especialización muy alta en profesionales sanitarios. Grup Med — ABR Correduría asociada.',
    website: 'https://medicorasse.med.es',
    source: '06_Corpus_Brokers §12',
    tier: 1,
  },
  {
    name: 'Canarisk Consultores',
    dgsfp: '—',
    city: 'Las Palmas de GC + Tenerife',
    ccaa: 'Canarias',
    priority: 'Alta — residentes extranjeros + visas',
    carriers: ['Especialización seguros privados para extranjeros con visa residencia'],
    note: 'Especialización: seguros médicos privados para extranjeros que solicitan residencia en Canarias. Complementario a C1.',
    website: 'https://www.canarisk.es',
    source: '06_Corpus_Brokers §11',
    tier: 1,
  },
  {
    name: 'Asena Correduría',
    dgsfp: '—',
    city: 'Pamplona',
    ccaa: 'Navarra',
    priority: 'Media — WTW Networks aliado',
    carriers: ['WTW Networks (alianza global)'],
    note: '50+ años. Aliada de WTW Networks — conexión con red internacional de brokers. Clínica Universidad de Navarra en zona.',
    website: 'https://asenacorreduria.com',
    source: '06_Corpus_Brokers §14',
    tier: 2,
  },
  {
    name: 'Holesia Correduría',
    dgsfp: '—',
    city: 'Cantabria + Castilla y León',
    ccaa: 'Cantabria',
    priority: 'Media — crecimiento por adquisición',
    carriers: ['DKV Integral Elite'],
    note: 'Mediadora Colegio Ingenieros Agrónomos. Crecimiento vía adquisición (Álvarez Cortés). Relevante para VUMI.',
    website: 'https://www.holesia.com',
    source: '06_Corpus_Brokers §16',
    tier: 2,
  },
];

function FitBar({ score, color = '#0033A0' }: { score:number; color?:string }) {
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
      <div style={{ marginBottom:24 }}>
        <div style={S.kicker}>Canal Broker</div>
        <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}>
          Shortlist Brokers España
        </h1>
        <p style={{ fontSize:13, color:'#6B7785', maxWidth:700, lineHeight:1.6 }}>
          {brokers.length} brokers en la base de datos + inteligencia adicional del corpus (doc 06).
          Rankeados por fit score compuesto: especialización expat/HNW, foco LatAm, carriers IPMI actuales, cobertura geográfica P0/P1.
          <span style={S.cite}>06_Corpus_Brokers_CCAA</span>
        </p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:12, marginBottom:24 }}>
        {[
          { v:t1.length, l:'Tier 1 DB',   c:'#0033A0' },
          { v:t2.length, l:'Tier 2 DB',   c:'#00A9E0' },
          { v:brokers.filter((b:any)=>b.expat_focus).length, l:'Expat Focus', c:'#2DA771' },
          { v:brokers.filter((b:any)=>b.latam_focus).length, l:'LatAm Focus', c:'#2DA771' },
        ].map(({ v, l, c }) => (
          <div key={l} style={{ ...S.card, borderTop:`3px solid ${c}` }}>
            <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:28, color:c, lineHeight:1, marginBottom:4 }}>{v}</div>
            <div style={{ fontSize:12, fontWeight:600, color:'#2C3539' }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Corpus broker intelligence — C1 Broker highlighted */}
      <div style={{ ...S.card, marginBottom:20, borderLeft:'4px solid #E55B4D' }}>
        <div style={S.kicker}>Brokers Clave — Inteligencia Corpus Doc 06</div>
        <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:16, color:'#2C3539', marginBottom:14 }}>
          C1 Broker: Socio Estratégico Natural Nº1 España
          <span style={S.cite}>06_Corpus_Brokers §11</span>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:14 }}>
          {CORPUS_BROKERS.filter(b => b.tier === 1).map((b) => (
            <div key={b.name} style={{ background:'#F5F7FA', borderRadius:8, padding:16, border:`1px solid #E2E8F0`, borderTop:b.name.includes('C1')?'3px solid #E55B4D':'3px solid #0033A0' }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:8 }}>
                <div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:14, color:'#2C3539' }}>
                    {b.website ? <a href={b.website} target="_blank" rel="noopener noreferrer" style={{ color:'#0033A0', textDecoration:'none' }}>{b.name}</a> : b.name}
                  </div>
                  <div style={{ fontSize:11, color:'#6B7785', marginTop:2 }}>{b.city} · DGSFP {b.dgsfp}</div>
                </div>
              </div>
              <div style={{ fontSize:11, background:b.name.includes('C1')?'#FBE8E2':'#EEF2FF', color:b.name.includes('C1')?'#E55B4D':'#0033A0', padding:'4px 8px', borderRadius:4, marginBottom:8, fontWeight:600 }}>
                {b.priority}
              </div>
              <div style={{ fontSize:11, color:'#2C3539', marginBottom:8, lineHeight:1.4 }}>{b.note}</div>
              <div style={{ fontSize:10, color:'#6B7785', marginBottom:4 }}>
                <strong style={{ color:'#2C3539' }}>Carriers:</strong> {b.carriers.join(' · ')}
              </div>
              <span style={S.cite}>{b.source}</span>
            </div>
          ))}
        </div>
      </div>

      {/* DB Tier 1 brokers */}
      {t1.length > 0 && (
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={S.kicker}>Tier 1 — Base de Datos</div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(290px,1fr))', gap:14, marginTop:12 }}>
            {t1.map((b:any) => {
              const out = OUT[b.outreach_priority] || OUT.p3;
              return (
                <div key={b.id} style={{ background:'#F5F7FA', borderRadius:8, padding:16, border:'1px solid #E2E8F0', borderTop:b.outreach_priority==='p0'?'3px solid #E55B4D':'3px solid #0033A0' }}>
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
                    <span style={{ background:out.bg, color:out.color, padding:'2px 6px', borderRadius:99, fontSize:10, fontWeight:600 }}>{out.label}</span>
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
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* DB Tier 2 */}
      {t2.length > 0 && (
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={S.kicker}>Tier 2 — Segunda Oleada</div>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12, marginTop:12 }}>
            <thead>
              <tr style={{ borderBottom:'1px solid #E2E8F0' }}>
                {['Broker','CCAA','Fit','Expat','LatAm','Prioridad'].map(h=>(
                  <th key={h} style={{ textAlign:'left', padding:'6px 10px', fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t2.map((b:any) => {
                const out = OUT[b.outreach_priority] || OUT.p3;
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
                    <td style={{ padding:'8px 10px' }}><span style={{ background:out.bg, color:out.color, padding:'2px 6px', borderRadius:99, fontSize:10, fontWeight:600 }}>{b.outreach_priority?.toUpperCase()}</span></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Corpus insight */}
      {insight.answer && (
        <div style={{ ...S.card, borderLeft:'4px solid #0033A0', background:'#FAFBFF' }}>
          <div style={S.kicker}>Inteligencia del Corpus</div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:8 }}>{insight.answer}</div>
          <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
            {insight.chunks.map((c,i) => <span key={i} style={S.cite}>{c.doc_slug}#{c.chunk_index}</span>)}
          </div>
        </div>
      )}

      {/* Strategic note */}
      <div style={{ ...S.card, borderLeft:'4px solid #E55B4D', background:'#FFF8F7', marginTop:16 }}>
        <div style={S.kicker}>Acción Recomendada</div>
        <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6 }}>
          <strong>C1 Broker (Canarias + Mallorca)</strong> es el socio estratégico natural nº1: 26 años expat, portfolio completo IPMI, CEO visible en sector.
          Outreach esta semana con battle card VUMI vs Cigna/Bupa/Allianz + pricing pendiente mystery shopping.
          Requisito previo: confirmar DGSFP antes de cualquier reunión con broker.
          <span style={S.cite}>06_Corpus_Brokers §11</span>
        </div>
      </div>
    </div>
  );
}
