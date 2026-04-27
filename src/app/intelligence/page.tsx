import React from 'react';
export const revalidate = 300;
// app/intelligence/page.tsx
import { getCockpitKPIs, getRecentSignals, getRecentDecisions, getGeoOpportunities } from '@/lib/intelligence';
import Link from 'next/link';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
  h2: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: '#2C3539', marginBottom: 4 },
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
  muted: { fontSize: 12, color: '#6B7785' },
};

const priorityColor: Record<string, string> = { p0: '#0033A0', p1: '#00A9E0', p2: '#F4B860', p3: '#B0BAC6' };
const priorityBg: Record<string, string> = { p0: '#EEF2FF', p1: '#E6F6FC', p2: '#FEF3CD', p3: '#F5F7FA' };

export default async function CockpitPage() {
  const [kpis, signals, decisions, geo] = await Promise.all([
    getCockpitKPIs(),
    getRecentSignals(10),
    getRecentDecisions(5),
    getGeoOpportunities(),
  ]);

  return (
    <div style={{ maxWidth: 1200 }}>
      {/* ── Verdict Band ── */}
      <div style={{
        background: '#0033A0', borderRadius: 8, padding: '20px 28px', marginBottom: 24,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontSize: 10, color: '#00A9E0', fontFamily: "'Montserrat', sans-serif", fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 6 }}>
            Strategic Verdict — España Launch
          </div>
          <div style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 17, lineHeight: 1.35 }}>
            VUMI Europe está posicionado para lanzar en España: regulación confirmada, 17 brokers identificados, Madrid y Barcelona como P0.{' '}
            <span style={{ color: '#00A9E0' }}>Bloqueador activo: {kpis.blockers} gap{kpis.blockers !== 1 ? 's' : ''} P0.</span>
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', textAlign: 'right', flexShrink: 0, marginLeft: 24 }}>
          Actualizado<br />
          <span style={{ color: '#fff' }}>{new Date().toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
        </div>
      </div>

      {/* ── KPI Strip ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { val: kpis.tier1_brokers, label: 'Brokers Tier 1', note: 'Shortlisted', href: '/intelligence/brokers' },
          { val: kpis.latam_audience_segments > 0 ? '3' : '—', label: 'Audiencias LatAm', note: 'VE · CO · MX', href: '/intelligence/audiences' },
          { val: kpis.priority_cities, label: 'Ciudades P0+P1', note: 'Madrid, BCN…', href: '/intelligence/geography' },
          { val: kpis.high_signals, label: 'Señales ≥80', note: kpis.action_signals + ' requieren acción', href: '/intelligence/signals' },
          { val: kpis.open_gaps, label: 'Gaps Abiertos', note: kpis.blockers + ' bloqueantes', href: '/intelligence/gates', warn: kpis.blockers > 0 },
          { val: kpis.active_decisions, label: 'Decisiones Activas', note: 'Registradas', href: '/intelligence/gates' },
        ].map(({ val, label, note, href, warn }) => (
          <Link key={label} href={href} style={{ textDecoration: 'none' }}>
            <div style={{
              ...S.card,
              borderTop: `3px solid ${warn ? '#E55B4D' : '#0033A0'}`,
              transition: 'box-shadow 0.15s',
              cursor: 'pointer',
            }}>
              <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 28, color: warn ? '#E55B4D' : '#0033A0', lineHeight: 1, marginBottom: 4 }}>{val}</div>
              <div style={{ fontSize: 11, fontWeight: 600, color: '#2C3539', marginBottom: 2 }}>{label}</div>
              <div style={{ ...S.muted, fontSize: 11 }}>{note}</div>
            </div>
          </Link>
        ))}
      </div>

      {/* ── Bottom grid: Geo + Signals + Decisions ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>

        {/* Geo Priority */}
        <div style={S.card}>
          <div style={S.kicker}>Prioridad Lanzamiento por Ciudad</div>
          <div style={S.h2}>Geografía</div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12, marginTop: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                {['Prioridad','Ciudad','CCAA','LatAm','HNW','Broker Density'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 8px', fontSize: 10, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {geo.slice(0, 8).map((row: any) => (
                <tr key={row.city + row.ccaa} style={{ borderBottom: '1px solid #F5F7FA' }}>
                  <td style={{ padding: '7px 8px' }}>
                    <span style={{ background: priorityBg[row.launch_priority] || '#F5F7FA', color: priorityColor[row.launch_priority] || '#6B7785', padding: '2px 7px', borderRadius: 99, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 10 }}>
                      {row.launch_priority?.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '7px 8px', fontWeight: 600, color: '#2C3539' }}>{row.city}</td>
                  <td style={{ padding: '7px 8px', color: '#6B7785' }}>{row.ccaa}</td>
                  <td style={{ padding: '7px 8px', color: '#6B7785', textTransform: 'capitalize' }}>{row.latam_concentration}</td>
                  <td style={{ padding: '7px 8px', color: '#6B7785', textTransform: 'capitalize' }}>{row.hnw_concentration}</td>
                  <td style={{ padding: '7px 8px', color: '#6B7785', textTransform: 'capitalize' }}>{row.broker_density}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Link href="/intelligence/geography" style={{ fontSize: 12, color: '#0033A0', fontWeight: 600, textDecoration: 'none' }}>Ver mapa completo →</Link>
          </div>
        </div>

        {/* Signals */}
        <div style={S.card}>
          <div style={S.kicker}>Feed de Señales</div>
          <div style={S.h2}>Inteligencia Reciente</div>
          <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {signals.slice(0, 6).map((s: any) => (
              <div key={s.id} style={{
                padding: '10px 12px', borderRadius: 6, background: s.action_required ? '#FFF8F7' : '#F5F7FA',
                borderLeft: `3px solid ${s.action_required ? '#E55B4D' : s.signal_type === 'regulatory' ? '#0033A0' : '#00A9E0'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 3 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: '#2C3539', lineHeight: 1.3 }}>
                    {s.result_title?.length > 80 ? s.result_title.slice(0, 80) + '…' : s.result_title}
                  </div>
                  <span style={{ fontSize: 10, color: '#6B7785', flexShrink: 0 }}>
                    {s.relevance_score}
                  </span>
                </div>
                <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                  <span style={{ fontSize: 10, background: '#E6F6FC', color: '#0033A0', padding: '1px 6px', borderRadius: 99, fontWeight: 600 }}>
                    {s.signal_type}
                  </span>
                  {s.action_required && <span style={{ fontSize: 10, background: '#FBE8E2', color: '#E55B4D', padding: '1px 6px', borderRadius: 99, fontWeight: 600 }}>⚡ Acción</span>}
                  <span style={{ fontSize: 10, color: '#6B7785' }}>{s.published_at}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 12, textAlign: 'right' }}>
            <Link href="/intelligence/signals" style={{ fontSize: 12, color: '#0033A0', fontWeight: 600, textDecoration: 'none' }}>Ver todas las señales →</Link>
          </div>
        </div>
      </div>

      {/* ── Decision Log ── */}
      <div style={S.card}>
        <div style={S.kicker}>Registro de Decisiones</div>
        <div style={S.h2}>Últimas Decisiones Activas</div>
        <div style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 1 }}>
          {decisions.map((d: any) => (
            <div key={d.id} style={{ padding: '12px 0', borderBottom: '1px solid #F5F7FA', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, marginTop: 2 }}>
                <span style={{
                  background: d.reversibility === 'reversible' ? '#E3F4F0' : '#FBE8E2',
                  color: d.reversibility === 'reversible' ? '#2DA771' : '#E55B4D',
                  fontSize: 10, padding: '2px 7px', borderRadius: 99, fontWeight: 600,
                }}>
                  {d.reversibility === 'reversible' ? '↩ Reversible' : '⚠ Costly'}
                </span>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2C3539', marginBottom: 3 }}>{d.title}</div>
                <div style={{ fontSize: 12, color: '#6B7785', lineHeight: 1.4 }}>
                  {d.decision?.length > 120 ? d.decision.slice(0, 120) + '…' : d.decision}
                </div>
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: '#6B7785' }}>{d.domain}</div>
                <div style={{ fontSize: 11, color: '#2C3539', fontWeight: 600 }}>{d.decided_at}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 12, textAlign: 'right' }}>
          <Link href="/intelligence/gates" style={{ fontSize: 12, color: '#0033A0', fontWeight: 600, textDecoration: 'none' }}>Ver todos los gates y decisiones →</Link>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 10, marginTop: 20 }}>
        {[
          { href: '/intelligence/audiences', label: 'Audiencias LatAm', sub: 'VE · CO · MX' },
          { href: '/intelligence/brokers', label: 'Broker Shortlist', sub: '17 identificados' },
          { href: '/intelligence/competitors', label: 'Competidores', sub: '9 mapeados' },
          { href: '/intelligence/proposition', label: 'Propuesta', sub: 'Diferenciación' },
          { href: '/intelligence/ask', label: 'Ask VUMI', sub: 'RAG sobre corpus' },
        ].map(({ href, label, sub }) => (
          <Link key={href} href={href} style={{
            ...S.card, textDecoration: 'none', display: 'block',
            padding: '14px 16px', textAlign: 'center',
            borderTop: '2px solid #00A9E0', transition: 'box-shadow 0.15s',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#0033A0', fontFamily: "'Montserrat', sans-serif", marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 11, color: '#6B7785' }}>{sub}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
