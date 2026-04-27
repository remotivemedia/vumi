import React from 'react';
// app/intelligence/geography/page.tsx
import { getGeoOpportunities } from '@/lib/intelligence';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
  muted: { fontSize: 12, color: '#6B7785' },
};

const PRIORITY_META: Record<string, { color: string; bg: string; label: string }> = {
  p0: { color: '#0033A0', bg: '#EEF2FF', label: 'P0 — Launch Inmediato' },
  p1: { color: '#00A9E0', bg: '#E6F6FC', label: 'P1 — 60 días' },
  p2: { color: '#B45309', bg: '#FEF3CD', label: 'P2 — 90–180 días' },
  p3: { color: '#6B7785', bg: '#F5F7FA', label: 'P3 — Watch' },
};

const DENSITY_COLOR: Record<string, string> = {
  very_high: '#0033A0', high: '#00A9E0', medium: '#6B7785', low: '#B0BAC6',
};

function DensityBadge({ val }: { val: string }) {
  return (
    <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: DENSITY_COLOR[val] || '#E2E8F0', marginRight: 4 }} title={val} />
  );
}

export default async function GeographyPage() {
  const geo = await getGeoOpportunities();

  const grouped = Object.entries(
    geo.reduce((acc: any, row: any) => {
      const p = row.launch_priority;
      if (!acc[p]) acc[p] = [];
      acc[p].push(row);
      return acc;
    }, {})
  ).sort(([a], [b]) => a.localeCompare(b));

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={S.kicker}>Estrategia Geográfica</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 6 }}>
          Prioridad de Lanzamiento por Ciudad
        </h1>
        <p style={{ ...S.muted, fontSize: 14, maxWidth: 680 }}>
          10 ciudades rankeadas por concentración LatAm, densidad broker, presencia HNW y penetración de salud privada.
          P0 = activo inmediato; P3 = monitorizar para expansión futura.
        </p>
      </div>

      {/* Priority legend */}
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 20 }}>
        {Object.entries(PRIORITY_META).map(([k, v]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '5px 10px', borderRadius: 6, background: v.bg, border: `1px solid ${v.color}22` }}>
            <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 11, color: v.color }}>{k.toUpperCase()}</span>
            <span style={{ fontSize: 11, color: '#6B7785' }}>{v.label.split(' — ')[1]}</span>
          </div>
        ))}
      </div>

      {/* City cards by priority group */}
      {grouped.map(([priority, cities]) => {
        const meta = PRIORITY_META[priority] || { color: '#6B7785', bg: '#F5F7FA', label: priority };
        return (
          <div key={priority} style={{ marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <span style={{ background: meta.bg, color: meta.color, padding: '3px 10px', borderRadius: 99, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 12 }}>
                {priority.toUpperCase()}
              </span>
              <span style={{ fontSize: 13, color: '#2C3539', fontWeight: 600 }}>{meta.label}</span>
              <span style={{ fontSize: 12, color: '#6B7785' }}>— {(cities as any[]).length} ciudad{(cities as any[]).length > 1 ? 'es' : ''}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 14 }}>
              {(cities as any[]).map((row) => (
                <div key={row.city + row.ccaa} style={{ ...S.card, borderTop: `3px solid ${meta.color}`, padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                    <div>
                      <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 15, color: '#2C3539' }}>{row.city}</div>
                      <div style={{ fontSize: 11, color: '#6B7785', marginTop: 2 }}>{row.ccaa} · {row.province}</div>
                    </div>
                    {row.private_health_penetration_pct && (
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: '#0033A0' }}>{row.private_health_penetration_pct}%</div>
                        <div style={{ fontSize: 10, color: '#6B7785' }}>Penetración privada</div>
                      </div>
                    )}
                  </div>

                  {/* Dimension pills */}
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {[
                      { label: 'LatAm', val: row.latam_concentration },
                      { label: 'HNW', val: row.hnw_concentration },
                      { label: 'Brokers', val: row.broker_density },
                    ].map(({ label, val }) => (
                      <span key={label} style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: '#F5F7FA', color: '#2C3539', fontWeight: 600 }}>
                        <DensityBadge val={val} />{label}: {val?.replace('_', ' ')}
                      </span>
                    ))}
                    {row.premium_hospital_count > 0 && (
                      <span style={{ fontSize: 10, padding: '2px 7px', borderRadius: 99, background: '#E3F4F0', color: '#2DA771', fontWeight: 600 }}>
                        🏥 {row.premium_hospital_count} hospitales premium
                      </span>
                    )}
                  </div>

                  {row.strategic_rationale && (
                    <div style={{ fontSize: 12, color: '#2C3539', lineHeight: 1.5, borderTop: '1px solid #F5F7FA', paddingTop: 10 }}>
                      {row.strategic_rationale.length > 200 ? row.strategic_rationale.slice(0, 200) + '…' : row.strategic_rationale}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {/* Source note */}
      <div style={{ ...S.card, background: '#F5F7FA', marginTop: 8 }}>
        <div style={{ fontSize: 12, color: '#6B7785', lineHeight: 1.6 }}>
          <strong style={{ color: '#2C3539' }}>Fuentes:</strong> INE Padrón Municipal 2024–2025, OPI (Observatorio Permanente de la Inmigración), datos broker registros DGSFP, análisis propio de presencia HNW (Sotheby's/Knight Frank prime residential data). · private_health_penetration_pct: Dato no disponible en el dataset actual para Madrid, Barcelona y otras ciudades salvo La Moraleja.
        </div>
      </div>
    </div>
  );
}
