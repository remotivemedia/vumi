'use client';
import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const GATES = [
  { days:30,  title:'Activaci�n Fundacional',       titleEN:'Foundational Activation',     color:'#E55B4D', bg:'#FBE8E2', status:'in_progress', exit:'DGSFP inscripci�n verificada p�blicamente + vumigroup.com copy corregido + 3 brokers P0 reuni�n inicial completada', exitEN:'DGSFP registration publicly verified + vumigroup.com copy corrected + 3 P0 brokers initial meeting completed', owner:'VUMI Europe + Strategy Lead', blockers:['Confirmar inscripci�n DGSFP en registro p�blico','Corregir copy vumigroup.com Spain exclusion'], blockersEN:['Confirm DGSFP registration in public registry','Fix vumigroup.com Spain exclusion copy'], initiatives:['Mystery shopping pricing competidores (perfiles A, B, C)','Outreach brokers P0: C1 Broker, Medicorasse, Espabrok','Ficha producto VUMI Euro Health EN/ES para brokers','Confirmaci�n modelo: �delegado f�sico Espa�a?'], initiativesEN:['Competitor pricing mystery shopping (profiles A, B, C)','Outreach P0 brokers: C1 Broker, Medicorasse, Espabrok','VUMI Euro Health product sheet EN/ES for brokers','Model confirmation: physical delegate in Spain?'] },
  { days:60,  title:'Validaci�n Canal Broker',        titleEN:'Broker Channel Validation',    color:'#0033A0', bg:'#EEF2FF', status:'not_started', exit:'5+ brokers Tier 1 con propuesta aceptada (NDA o carta de intenci�n) + price corridor VUMI definido vs competencia', exitEN:'5+ Tier 1 brokers with accepted proposal (NDA or letter of intent) + VUMI price corridor defined vs competition', owner:'Strategy + VUMI Commercial', blockers:[], blockersEN:[], initiatives:['Pricing corridor VUMI vs competidores — decisión interna','Material broker: battle cards por competidor (Bupa, Allianz, AXA, Cigna)','Outreach brokers P1 (segunda oleada)','Rating AM Best: decisión go/no-go'], initiativesEN:['VUMI vs competitors pricing corridor — internal decision','Broker material: battle cards per competitor (Bupa, Allianz, AXA, Cigna)','P1 broker outreach (second wave)','AM Best rating: go/no-go decision'] },
  { days:90,  title:'Primeras Pólizas España',         titleEN:'First Policies Spain',          color:'#00A9E0', bg:'#E6F6FC', status:'not_started', exit:'10+ pólizas emitidas vía canal broker en Madrid y/o Barcelona + NPS ≥ 60 primeros asegurados', exitEN:'10+ policies issued via broker channel in Madrid and/or Barcelona + NPS ≥ 60 first insured', owner:'VUMI Operations + Broker Channel', blockers:[], blockersEN:[], initiatives:['Proceso emisión póliza: ¿cuánto tarda VUMI vs Allianz?','Direct billing: confirmación Quirónsalud, HM, Clínica Navarra','Proceso claims en España — SLA definido','Wave 2 audiencias: Argentina y jubilados británicos Costa del Sol'], initiativesEN:['Policy issuance process: how long VUMI vs Allianz?','Direct billing: confirmation Quirónsalud, HM, Clínica Navarra','Claims process in Spain — SLA defined','Audience Wave 2: Argentina and British retirees Costa del Sol'] },
  { days:180, title:'Escala Geográfica',               titleEN:'Geographic Scale',              color:'#6A3AAF', bg:'#F4EEFB', status:'not_started', exit:'Presencia activa en 4+ ciudades P0/P1 + 3+ brokers Tier 2 activos + 50+ pólizas en cartera', exitEN:'Active presence in 4+ P0/P1 cities + 3+ active Tier 2 brokers + 50+ policies in portfolio', owner:'Strategy + VUMI Commercial', blockers:[], blockersEN:[], initiatives:['Activación Valencia, Málaga/Marbella, Sevilla (P1–P2)','Revisión pricing tras mystery shopping Wave 2','Employee Benefits: corporates con empleados LatAm expatriados','Evaluación canal digital (comparadores: Policomparador, HolaSeguro)'], initiativesEN:['Activate Valencia, Málaga/Marbella, Sevilla (P1–P2)','Pricing review after mystery shopping Wave 2','Employee Benefits: corporates with LatAm expat employees','Digital channel evaluation (aggregators: Policomparador, HolaSeguro)'] },
  { days:365, title:'Market Presence Consolidada',     titleEN:'Consolidated Market Presence', color:'#2DA771', bg:'#E3F4F0', status:'not_started', exit:'200+ pólizas · 8+ brokers activos · penetración measurable en segmento venezolano/colombiano HNW Madrid + Barcelona', exitEN:'200+ policies · 8+ active brokers · measurable penetration in Venezuelan/Colombian HNW segment Madrid + Barcelona', owner:'VUMI Europe', blockers:[], blockersEN:[], initiatives:['Análisis retención primera cohorte','Decisión: ¿oficina física España o modelo remoto?','Wave 3: asociaciones de inmigrantes, colegios profesionales','Reporting regulatorio DGSFP — primer año de actividad'], initiativesEN:['First cohort retention analysis','Decision: physical office Spain or remote model?','Wave 3: immigrant associations, professional colleges','DGSFP regulatory reporting — first year of activity'] },
];

const STATUS_KEY: Record<string,{key:string;color:string;bg:string}> = {
  in_progress: { key:'roadmap.status_in_progress', color:'#B45309', bg:'#FEF3CD' },
  not_started: { key:'roadmap.status_not_started', color:'#6B7785', bg:'#F5F7FA' },
  done:        { key:'roadmap.status_done',         color:'#2DA771', bg:'#E3F4F0' },
  blocked:     { key:'roadmap.status_blocked',      color:'#E55B4D', bg:'#FBE8E2' },
};

const S = {
  card: { background:'#fff', border:'1px solid #E2E8F0', borderRadius:8, padding:24, boxShadow:'0 1px 3px rgba(0,0,0,.04)' } as const,
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
};

export default function RoadmapPage() {
  const { t, i18n } = useTranslation();
  const isEN = i18n.language === 'en';

  return (
    <div style={{ maxWidth:1000 }}>
      <motion.div initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}>
        <div style={{ marginBottom:24 }}>
          <div style={S.kicker}>{t('roadmap.kicker')}</div>
          <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:6 }}>{t('roadmap.headline')}</h1>
          <p style={{ fontSize:13, color:'#6B7785', maxWidth:700 }}>
            {t('roadmap.subtitle')}{" "}
            <Link href="/intelligence/gates" style={{ color:'#0033A0', fontWeight:600 }}>{t('roadmap.see_gates')}</Link>
          </p>
        </div>
      </motion.div>

      {/* Timeline strip */}
      <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.4, delay:0.05, ease:[0.16,1,0.3,1] }}>
        <div style={{ display:'flex', gap:0, marginBottom:28, overflowX:'auto', paddingBottom:8 }}>
          {GATES.map((gate, i) => {
            const sm = STATUS_KEY[gate.status] || STATUS_KEY.not_started;
            return (
              <div key={gate.days} style={{ display:'flex', alignItems:'center', flexShrink:0 }}>
                <div style={{ display:'flex', flexDirection:'column', alignItems:'center', width:140 }}>
                  <motion.div
                    whileHover={{ scale:1.07, boxShadow:'0 4px 16px rgba(0,0,0,0.12)' }}
                    transition={{ duration:0.15 }}
                    style={{ width:52, height:52, borderRadius:'50%', background:gate.color, color:'#fff', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:13, lineHeight:1.1, border:gate.status==='in_progress'?'3px solid #F4B860':'3px solid transparent', cursor:'default' }}
                  >
                    <span style={{ fontSize:16 }}>{gate.days}</span>
                    <span style={{ fontSize:9 }}>{t('roadmap.days_label')}</span>
                  </motion.div>
                  <div style={{ fontSize:10, color:gate.color, fontWeight:700, textAlign:'center', marginTop:6, lineHeight:1.3 }}>
                    {isEN ? gate.titleEN : gate.title}
                  </div>
                  <span style={{ background:sm.bg, color:sm.color, padding:'2px 6px', borderRadius:99, fontSize:9, fontWeight:600, marginTop:4 }}>
                    {t(sm.key)}
                  </span>
                </div>
                {i < GATES.length - 1 && <div style={{ width:36, height:2, background:'#E2E8F0', flexShrink:0 }} />}
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Gate detail cards */}
      {GATES.map((gate, idx) => {
        const sm = STATUS_KEY[gate.status] || STATUS_KEY.not_started;
        const blockerList = isEN ? gate.blockersEN : gate.blockers;
        const initiativeList = isEN ? gate.initiativesEN : gate.initiatives;
        return (
          <motion.div
            key={gate.days}
            initial={{ opacity:0, y:12 }}
            animate={{ opacity:1, y:0 }}
            transition={{ duration:0.38, delay:0.08 + idx*0.05, ease:[0.16,1,0.3,1] }}
          >
            <div style={{ ...S.card, marginBottom:16, borderTop:`4px solid ${gate.color}` }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:14 }}>
                <div>
                  <div style={S.kicker}>{t('roadmap.gate_label')} {gate.days} {t('roadmap.days_label')}</div>
                  <div style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:17, color:'#2C3539' }}>
                    {isEN ? gate.titleEN : gate.title}
                  </div>
                </div>
                <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                  {blockerList.length > 0 && (
                    <span style={{ background:'#FBE8E2', color:'#E55B4D', padding:'3px 8px', borderRadius:99, fontSize:10, fontWeight:700 }}>
                      ⚠ {blockerList.length} {t(blockerList.length>1?'roadmap.blocker_plural':'roadmap.blocker_singular')}
                    </span>
                  )}
                  <span style={{ background:sm.bg, color:sm.color, padding:'3px 8px', borderRadius:99, fontSize:10, fontWeight:600 }}>
                    {t(sm.key)}
                  </span>
                </div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
                <div>
                  <div style={{ fontSize:11, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{t('roadmap.exit_criterion')}</div>
                  <div style={{ fontSize:13, color:'#2C3539', lineHeight:1.5, background:gate.bg, padding:12, borderRadius:6 }}>
                    {isEN ? gate.exitEN : gate.exit}
                  </div>
                  <div style={{ marginTop:10, fontSize:12, color:'#6B7785' }}>
                    <strong style={{ color:'#2C3539' }}>{t('roadmap.owner_label')}:</strong> {gate.owner}
                  </div>
                  {blockerList.length > 0 && (
                    <div style={{ marginTop:8 }}>
                      <div style={{ fontSize:11, color:'#E55B4D', fontWeight:600, marginBottom:4 }}>{t('roadmap.blockers_label')}:</div>
                      {blockerList.map(b => (
                        <div key={b} style={{ fontSize:12, color:'#2C3539', padding:'4px 0', borderLeft:'3px solid #E55B4D', paddingLeft:8, marginBottom:4 }}>{b}</div>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <div style={{ fontSize:11, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6 }}>{t('roadmap.initiatives_label')}</div>
                  <ul style={{ paddingLeft:16, margin:0, fontSize:12, color:'#2C3539', lineHeight:1.9 }}>
                    {initiativeList.map(ini => <li key={ini}>{ini}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
