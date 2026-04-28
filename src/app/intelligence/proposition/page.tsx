import React from 'react';
export const revalidate = 300;
import { queryCorpus } from '@/lib/corpus';
import { FadeIn, StaggerList, StaggerItem } from '@/components/motion/FadeIn';
import { T } from '@/components/i18n/T';

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 3px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
  th: { textAlign:'left' as const, padding:'8px 12px', fontSize:10, color:'#6B7785', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.06em', background:'#F5F7FA' },
};

const PLANS = [
  { name:'Euro Health Priority', limit:'€3.000.000', color:'#6B7785', coverageKey:'EU / Worldwide ex USA / Worldwide', ambulatoria:'Básica — riesgo de insuficiencia para visado nómada', dental:'No incluido', maternidad:'No incluido', visa:'Condicional (verificar ambulatorio ≥ SNS)', source:'01_VUMI_Facts §3.4 + 08_Wave1 §A.3.3' },
  { name:'Euro Health Pro',      limit:'€4.000.000', color:'#00A9E0', coverageKey:'EU / Worldwide ex USA / Worldwide', ambulatoria:'Sí — + ambulatorio + mental health',          dental:'Dental mayor',          maternidad:'Incluida',                                          visa:'✓ Recomendado para visado nómada/no lucrativo con franquicia €0', source:'01_VUMI_Facts §3.4 + 08_Wave1 §A.3.3' },
  { name:'Euro Health Premier',  limit:'€5.000.000', color:'#0033A0', coverageKey:'EU / Worldwide ex USA / Worldwide', ambulatoria:'Completo',                                dental:'Dental mayor + chequeos', maternidad:'Incluida + gestión preexistencias declaradas', visa:'✓ Óptimo — preexistencias declaradas, tope máximo',            source:'01_VUMI_Facts §3.4 + 08_Wave1 §A.3.3' },
];

const DIFFERENTIATORS = [
  { dim:'Topes de cobertura',   vumi:'€5M Premier',                         market:'Allianz £3,1M · Cigna $500K · AXA £250K', win:true,  src:'08_Wave1 §B.6' },
  { dim:'Regulador EEA',        vumi:'MFSA Malta — pasaporte directo España', market:'Cigna Guernsey ✗ · AXA FCA-UK ✗',          win:true,  src:'08_Wave1 §B.6' },
  { dim:'Preexistencias',       vumi:'Declaradas, evaluación caso a caso',    market:'Underwriting rígido (Allianz/Bupa)',      win:true,  src:'08_Wave1 §A.3.3' },
  { dim:'Herencia LatAm',       vumi:'VUMI Group 30 años LatAm service',      market:'Sin equivalente',                         win:true,  src:'01_VUMI_Facts §2' },
  { dim:'Hospital flagship ES', vumi:'Clínica Universidad de Navarra',        market:'Bupa/Sanitas red propia',                 win:false, src:'01_VUMI_Facts §5' },
  { dim:'Rating AM Best',       vumi:'No público',                            market:'Allianz A+ Superior',                     win:false, src:'08_Wave1 §B.4' },
  { dim:'Precio',               vumi:'Mystery-shopped pendiente',             market:'Allianz £1.200–2.500/año',                win:false, src:'08_Wave1 §B.6' },
  { dim:'DGSFP',                vumi:'⚠ Pendiente verificación',             market:'Allianz/Bupa sí',                        win:false, src:'08_Wave1 §A.1.2' },
];

const MESSAGES = [
  { nat:'Venezolana', flag:'🇻🇪', broker:'Tu cliente venezolano HNW en Madrid necesita un plan que lo cubra en Europa y en LatAm en visitas. VUMI: herencia 30 años VUMI Group + tope €5M + preexistencias declaradas.', hnw:'Barrio Salamanca, ingresos premium. Cobertura €5M. El único plan con herencia venezolana real — no es Allianz ni Bupa.', nomada:'Visa nómada digital: Euro Health Pro con franquicia €0. Cobertura ambulatoria completa. MFSA Malta = válido UGE-CE (si DGSFP confirmado).', src:'02_Venezolana §3 + 08_Wave1 §A.3.3' },
  { nat:'Colombiana', flag:'🇨🇴', broker:'676.534 colombianos en España, 1ª nacionalidad en 11 CCAA. Mensaje: cobertura que funciona también en Colombia cuando viajan a ver a la familia.', hnw:'Clase media-alta colombiana en Madrid/Valencia/País Vasco. Ticket medio. Canal broker con especialización expat.', nomada:'Euro Health Priority para el segmento nómada joven. Confirmar ambulatorio antes de vender para visado.', src:'04_Colombiana §3 + 08_Wave1 §A.3.3' },
  { nat:'Mexicana',   flag:'🇲🇽', broker:'Perfil ejecutivo premium. 39% de la inversión foránea en España es capital mexicano. Canal: broker de banca privada, relación personal.', hnw:'Salamanca, Chamberí, Chamartín. Inversión inmobiliaria >700M€ desde 2020. Mensaje: "El seguro que mereces en Europa." Euro Health Premier.', nomada:'Altamente cualificado: 58-62% educación superior. Perfil emprendedor. Ticket alto. Propuesta Premier directa.', src:'03_Mexicana §2.3 + §3.5' },
];

export default async function PropositionPage() {
  const [productInsight, mediaInsight] = await Promise.all([
    queryCorpus('VUMI Euro Health diferenciación preexistencias MFSA Malta topes cobertura', 4),
    queryCorpus('mix medios digital canal radio latina broker LATAM España eficiencia', 4),
  ]);

  return (
    <div style={{ maxWidth:1100 }}>

      <FadeIn>
        <div style={{ marginBottom:24 }}>
          <div style={S.kicker}><T k="proposition.kicker" /></div>
          <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}><T k="proposition.headline" /></h1>
          <p style={{ fontSize:13, color:'#6B7785', maxWidth:700, lineHeight:1.6 }}>
            <T k="proposition.subtitle" /><span style={S.cite}>01_VUMI_Facts §3.4</span><span style={S.cite}>08_Wave1_Regulatorio §A.1.1</span>
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.04}>
        <div style={{ marginBottom:6 }}><div style={S.kicker}><T k="proposition.plans_kicker" /></div></div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:24 }}>
          {PLANS.map((p,i) => (
            <div key={p.name} style={{ ...S.card, borderTop:`4px solid ${p.color}`, padding:20 }}>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:13, color:p.color, marginBottom:4 }}>{p.name}</div>
              <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, color:'#0033A0', lineHeight:1, marginBottom:10 }}>{p.limit}</div>
              {[
                { k:'proposition.coverage_label',    v:p.coverageKey },
                { k:'proposition.ambulatoria_label', v:p.ambulatoria },
                { k:'proposition.dental_label',       v:p.dental },
                { k:'proposition.maternidad_label',   v:p.maternidad },
                { k:'proposition.visa_label',          v:p.visa },
              ].map(({ k, v }) => (
                <div key={k} style={{ display:'flex', flexDirection:'column', padding:'5px 0', borderBottom:'1px solid #F5F7FA', fontSize:11 }}>
                  <span style={{ color:'#6B7785', marginBottom:1 }}><T k={k} /></span>
                  <span style={{ color:v.includes('✓')?'#2DA771':v.includes('⚠')||v.includes('Condicional')||v.includes('No incluido')?'#B45309':'#2C3539', fontWeight:500, lineHeight:1.3 }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop:8 }}><span style={S.cite}>{p.source}</span></div>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn delay={0.08}>
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={S.kicker}><T k="proposition.diff_kicker" /></div>
          <div style={{ overflowX:'auto', marginTop:12 }}>
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:12 }}>
              <thead><tr style={{ borderBottom:'2px solid #E2E8F0' }}>
                {['diff_col_dim','diff_col_vumi','diff_col_market','diff_col_result','diff_col_source'].map(k => (
                  <th key={k} style={S.th}><T k={`proposition.${k}`} /></th>
                ))}
              </tr></thead>
              <tbody>
                {DIFFERENTIATORS.map(({ dim, vumi, market, win, src }) => (
                  <tr key={dim} style={{ borderBottom:'1px solid #F5F7FA' }}>
                    <td style={{ padding:'10px 12px', fontWeight:600, color:'#2C3539' }}>{dim}</td>
                    <td style={{ padding:'10px 12px', color:win?'#2DA771':'#E55B4D', fontWeight:win?600:400 }}>{vumi}</td>
                    <td style={{ padding:'10px 12px', color:'#6B7785' }}>{market}</td>
                    <td style={{ padding:'10px 12px', textAlign:'center', fontSize:18 }}>{win?'✓':'✗'}</td>
                    <td style={{ padding:'10px 12px' }}><span style={S.cite}>{src}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </FadeIn>

      <FadeIn delay={0.12}>
        <div style={{ ...S.card, marginBottom:20 }}>
          <div style={S.kicker}><T k="proposition.messages_kicker" /></div>
          <StaggerList>
            {MESSAGES.map(m => (
              <StaggerItem key={m.nat}>
                <div style={{ marginBottom:16, paddingBottom:16, borderBottom:'1px solid #F5F7FA' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:10 }}>
                    <span style={{ fontSize:18 }}>{m.flag}</span>
                    <span style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:14, color:'#2C3539' }}>{m.nat}</span>
                    <span style={S.cite}>{m.src}</span>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
                    {[
                      { k:'proposition.broker_channel', msg:m.broker },
                      { k:'proposition.hnw_direct',     msg:m.hnw },
                      { k:'proposition.nomada_digital', msg:m.nomada },
                    ].map(({ k, msg }) => (
                      <div key={k} style={{ background:'#F5F7FA', borderRadius:6, padding:12 }}>
                        <div style={{ fontSize:10, color:'#0033A0', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}><T k={k} /></div>
                        <div style={{ fontSize:12, color:'#2C3539', lineHeight:1.5 }}>{msg}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerList>
        </div>
      </FadeIn>

      <FadeIn delay={0.16}>
        <div style={{ ...S.card, borderLeft:'4px solid #E55B4D', background:'#FFF8F7', marginBottom:16 }}>
          <div style={S.kicker}><T k="proposition.counter_kicker" /></div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:8 }}>
            <strong><T k="proposition.counter_title" /></strong>{" "}Allianz tiene A+ AM Best, 20+ años en España, red directa, y el broker no asume riesgo reputacional.
          </div>
          <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6 }}>
            <strong>Respuesta VUMI:</strong> No competimos por precio ni por brand recognition genérico. Competimos por herencia LatAm: tu cliente venezolano, colombiano o mexicano ya conoce VUMI Group — 30 años en Miami, Bogotá, Ciudad de México.<span style={S.cite}>01_VUMI_Facts §2+§6</span>
          </div>
        </div>
      </FadeIn>

      {mediaInsight.answer && (
        <FadeIn delay={0.19}>
          <div style={{ ...S.card, borderLeft:'4px solid #00A9E0', background:'#F5FBFF' }}>
            <div style={S.kicker}><T k="proposition.media_kicker" /></div>
            <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.6, marginBottom:8 }}>{mediaInsight.answer}</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {mediaInsight.chunks.map((c,i) => <span key={i} style={S.cite}>{c.doc_slug}#{c.chunk_index}</span>)}
            </div>
          </div>
        </FadeIn>
      )}

    </div>
  );
}
