import React from 'react';
export const revalidate = 300;
// app/intelligence/brokers/page.tsx
import { getBrokers } from '@/lib/intelligence';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
  muted: { fontSize: 12, color: '#6B7785' },
};

const TIER_COLOR: Record<string, { bg: string; color: string }> = {
  tier_1: { bg: '#0033A0', color: '#fff' },
  tier_2: { bg: '#D6E4FB', color: '#0033A0' },
};

const OUTREACH: Record<string, { bg: string; color: string; label: string }> = {
  p0: { bg: '#FBE8E2', color: '#E55B4D', label: 'P0 — Esta semana' },
  p1: { bg: '#EEF2FF', color: '#0033A0', label: 'P1 — 30 días' },
  p2: { bg: '#FEF3CD', color: '#B45309', label: 'P2 — 60 días' },
  p3: { bg: '#F5F7FA', color: '#6B7785', label: 'P3 — Watch' },
};

function FitBar({ score }: { score: number }) {
  return (
    <div style={{ height: 4, background: '#E2E8F0', borderRadius: 2, overflow: 'hidden', marginTop: 4 }}>
      <div style={{ height: '100%', width: `${score}%`, background: score >= 90 ? '#0033A0' : score >= 75 ? '#00A9E0' : '#B0BAC6', borderRadius: 2 }} />
    </div>
  );
}

export default async function BrokersPage() {
  const brokers = await getBrokers();
  const t1 = brokers.filter((b: any) => b.tier === 'tier_1');
  const t2 = brokers.filter((b: any) => b.tier === 'tier_2');

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={S.kicker}>Canal Broker</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 6 }}>
          Shortlist de Brokers — España
        </h1>
        <p style={{ ...S.muted, fontSize: 14, maxWidth: 700 }}>
          {brokers.length} brokers identificados. Rankeados por fit score compuesto: especialización expat/HNW, foco LatAm, cartera de carriers IPMI actuales y cobertura geográfica P0/P1.
          Fuente: DGSFP, webs corporativas, corpus VUMI Wave 1.
        </p>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 24 }}>
        {[
          { val: t1.length, label: 'Tier 1', sub: 'Prioridad máxima', color: '#0033A0' },
          { val: t2.length, label: 'Tier 2', sub: 'Segunda oleada', color: '#00A9E0' },
          { val: brokers.filter((b: any) => b.expat_focus).length, label: 'Expat Focus', sub: 'Flag confirmado', color: '#2DA771' },
          { val: brokers.filter((b: any) => b.latam_focus).length, label: 'LatAm Focus', sub: 'Alineado audiencia', color: '#2DA771' },
        ].map(({ val, label, sub, color }) => (
          <div key={label} style={{ ...S.card, borderTop: `3px solid ${color}` }}>
            <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 28, color, lineHeight: 1, marginBottom: 4 }}>{val}</div>
            <div style={{ fontSize: 12, fontWeight: 600, color: '#2C3539', marginBottom: 2 }}>{label}</div>
            <div style={{ fontSize: 11, color: '#6B7785' }}>{sub}</div>
          </div>
        ))}
      </div>

      {/* Tier 1 Cards */}
      <div style={S.card}>
        <div style={S.kicker}>Tier 1 — Outreach Inmediato</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: '#2C3539', marginBottom: 16 }}>
          {t1.length} Brokers Prioritarios
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 14 }}>
          {t1.map((b: any) => {
            const out = OUTREACH[b.outreach_priority] || OUTREACH.p3;
            return (
              <div key={b.id} style={{
                background: '#F5F7FA', borderRadius: 8, padding: 18,
                border: '1px solid #E2E8F0',
                borderTop: b.outreach_priority === 'p0' ? '3px solid #E55B4D' : '3px solid #0033A0',
              }}>
                {/* Head */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <div style={{ flex: 1, minWidth: 0, marginRight: 12 }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 14, color: '#2C3539', lineHeight: 1.25 }}>
                      {b.website ? (
                        <a href={b.website} target="_blank" rel="noopener noreferrer" style={{ color: '#0033A0', textDecoration: 'none' }}>{b.name}</a>
                      ) : b.name}
                    </div>
                    <div style={{ fontSize: 11, color: '#6B7785', marginTop: 2 }}>
                      {b.primary_city} · {b.primary_ccaa} · {b.dgsfp_code}
                    </div>
                  </div>
                  <div style={{ flexShrink: 0, textAlign: 'right' }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 22, color: '#0033A0', lineHeight: 1 }}>{b.fit_score}</div>
                    <div style={{ fontSize: 10, color: '#6B7785', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Fit Score</div>
                    <FitBar score={b.fit_score} />
                  </div>
                </div>

                {/* Tags */}
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginBottom: 10 }}>
                  <span style={{ ...TIER_COLOR[b.tier], padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700, fontFamily: "'Montserrat', sans-serif" }}>
                    {b.tier === 'tier_1' ? 'Tier 1' : 'Tier 2'}
                  </span>
                  <span style={{ background: out.bg, color: out.color, padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>
                    {out.label}
                  </span>
                  {b.expat_focus && <span style={{ background: '#E6F6FC', color: '#0033A0', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>Expat</span>}
                  {b.latam_focus && <span style={{ background: '#E6F6FC', color: '#0033A0', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>LatAm</span>}
                  {b.vip_hnw_focus && <span style={{ background: '#F4EEFB', color: '#6A3AAF', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>VIP/HNW</span>}
                  <span style={{ background: '#F5F7FA', color: '#6B7785', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>
                    {b.broker_type?.replace('_', ' ')}
                  </span>
                </div>

                {/* Carriers */}
                {b.carriers_intermediated?.length > 0 && (
                  <div style={{ fontSize: 11, color: '#6B7785', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600, color: '#2C3539' }}>Carriers: </span>
                    {b.carriers_intermediated.slice(0, 5).join(' · ')}
                    {b.carriers_intermediated.length > 5 && ` +${b.carriers_intermediated.length - 5}`}
                  </div>
                )}

                {/* Notes */}
                {b.notes && (
                  <div style={{ fontSize: 11, color: '#2C3539', lineHeight: 1.45, borderTop: '1px solid #E2E8F0', paddingTop: 8, marginTop: 4 }}>
                    {b.notes.length > 120 ? b.notes.slice(0, 120) + '…' : b.notes}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Tier 2 Table */}
      {t2.length > 0 && (
        <div style={{ ...S.card, marginTop: 20 }}>
          <div style={S.kicker}>Tier 2 — Segunda Oleada</div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: '#2C3539', marginBottom: 12 }}>
            {t2.length} Brokers Watchlist
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                {['Broker','CCAA','Fit Score','Expat','LatAm','Carriers','Prioridad Outreach'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 10, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {t2.map((b: any) => {
                const out = OUTREACH[b.outreach_priority] || OUTREACH.p3;
                return (
                  <tr key={b.id} style={{ borderBottom: '1px solid #F5F7FA' }}>
                    <td style={{ padding: '8px 10px' }}>
                      <div style={{ fontWeight: 600, color: '#2C3539' }}>
                        {b.website ? <a href={b.website} target="_blank" rel="noopener noreferrer" style={{ color: '#0033A0', textDecoration: 'none' }}>{b.name}</a> : b.name}
                      </div>
                      <div style={{ fontSize: 10, color: '#6B7785' }}>{b.dgsfp_code}</div>
                    </td>
                    <td style={{ padding: '8px 10px', color: '#6B7785' }}>{b.primary_ccaa}</td>
                    <td style={{ padding: '8px 10px' }}>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#0033A0' }}>{b.fit_score}</span>
                      <FitBar score={b.fit_score} />
                    </td>
                    <td style={{ padding: '8px 10px' }}>{b.expat_focus ? '✓' : '—'}</td>
                    <td style={{ padding: '8px 10px' }}>{b.latam_focus ? '✓' : '—'}</td>
                    <td style={{ padding: '8px 10px', color: '#6B7785' }}>{b.carriers_intermediated?.slice(0, 3).join(', ')}</td>
                    <td style={{ padding: '8px 10px' }}>
                      <span style={{ background: out.bg, color: out.color, padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>
                        {b.outreach_priority?.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Strategic note */}
      <div style={{ ...S.card, borderLeft: '4px solid #0033A0', background: '#FAFBFF', marginTop: 20 }}>
        <div style={S.kicker}>Implicación Estratégica</div>
        <div style={{ fontSize: 14, color: '#2C3539', lineHeight: 1.6 }}>
          <strong>Acción inmediata:</strong> los {brokers.filter((b: any) => b.outreach_priority === 'p0').length} brokers P0 deben recibir outreach esta semana con propuesta de valor VUMI Euro Health, material de comparativa versus sus carriers actuales (Bupa Global, Allianz Care, AXA) y visibilidad de diferenciadores: tope €5M Premier, preexistencias declaradas, herencia LatAm service.
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#6B7785' }}>
          Gap activo: ¿tiene VUMI Europe un delegado comercial físico en España? Factor decisivo para activación broker (ver Gates).
        </div>
      </div>
    </div>
  );
}
