// app/intelligence/audiences/page.tsx
import { getAudienceTopline, getAudienceSegments } from '@/lib/intelligence';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' } as React.CSSProperties,
  h2: { fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: '-0.02em', color: '#2C3539', marginBottom: 4 } as React.CSSProperties,
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
  muted: { fontSize: 12, color: '#6B7785' } as React.CSSProperties,
  label: { fontSize: 11, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.08em' },
};

const headBg: Record<string, string> = {
  Venezuelan: 'linear-gradient(135deg, #0033A0 0%, #00A9E0 100%)',
  Colombian: 'linear-gradient(135deg, #0033A0 0%, #1a56c4 100%)',
  Mexican: 'linear-gradient(135deg, #2C3539 0%, #0033A0 100%)',
};

const NAT_LABEL: Record<string, string> = {
  Venezuelan: 'Venezolana', Colombian: 'Colombiana', Mexican: 'Mexicana',
};

const formatNum = (n: any) => n ? Number(n).toLocaleString('es-ES') : '—';

export default async function AudiencesPage() {
  const [topline, allSegments] = await Promise.all([
    getAudienceTopline(),
    getAudienceSegments(),
  ]);

  const nationalities = ['Venezuelan', 'Colombian', 'Mexican'];

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={S.kicker}>Inteligencia de Audiencias</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 6 }}>
          Diáspora LatAm en España
        </h1>
        <p style={{ ...S.muted, fontSize: 14, maxWidth: 700 }}>
          1,09M+ residentes padrón 2024–2025. Primer objetivo VUMI: profesionales HNW/upper-middle con historial IPMI o propensión a privado premium.
          Fuente: INE Padrón Municipal, OPI, SJM.
        </p>
      </div>

      {/* Topline cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 28 }}>
        {nationalities.map(nat => {
          const t = topline.find((r: any) => r.nationality === nat);
          const priority = nat === 'Venezuelan' ? 1 : nat === 'Colombian' ? 2 : 3;
          return (
            <div key={nat} style={{ ...S.card, overflow: 'hidden' }}>
              <div style={{ background: headBg[nat] || '#0033A0', margin: -24, padding: '20px 24px', marginBottom: 20 }}>
                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 10, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 4 }}>
                  Prioridad #{priority}
                </div>
                <div style={{ color: '#fff', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18 }}>
                  {NAT_LABEL[nat]}
                </div>
              </div>
              {t ? (
                <div>
                  {[
                    { label: 'Padrón España', val: formatNum(t.padron_spain_total), note: `${t.padron_as_of_year}` },
                    { label: 'Nacidos en total', val: t.born_in_total ? formatNum(t.born_in_total) : 'No disponible' },
                    { label: 'Educación terciaria', val: t.tertiary_edu_pct ? `${t.tertiary_edu_pct}%` : '—' },
                    { label: 'Nationalizaciones (último año)', val: t.nationalizations_latest_year ? formatNum(t.nationalizations_latest_year) : '—' },
                  ].map(({ label, val, note }) => (
                    <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: '9px 0', borderBottom: '1px solid #F5F7FA' }}>
                      <span style={S.label}>{label}</span>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#0033A0', fontSize: 14 }}>
                        {val} {note && <span style={{ fontSize: 10, color: '#6B7785', fontWeight: 400 }}>({note})</span>}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ fontSize: 12, color: '#6B7785', padding: '12px 0' }}>
                  Dato no disponible en el dataset actual.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Segment detail by nationality */}
      {nationalities.map(nat => {
        const segs = allSegments.filter((s: any) => s.nationality === nat);
        if (!segs.length) return null;
        return (
          <div key={nat} style={{ ...S.card, marginBottom: 20 }}>
            <div style={S.kicker}>Segmentos — {NAT_LABEL[nat]}</div>
            <div style={S.h2}>Perfiles de Segmento</div>
            <div style={{ overflowX: 'auto', marginTop: 12 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                    {['Segmento','Padrón','CCAA/Ciudad','Nivel SE','Educación','Propensión','Canal Preferido','Mensaje GTM'].map(h => (
                      <th key={h} style={{ textAlign: 'left', padding: '6px 10px', fontSize: 10, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {segs.map((s: any) => (
                    <tr key={s.id} style={{ borderBottom: '1px solid #F5F7FA' }}>
                      <td style={{ padding: '8px 10px', fontWeight: 600, color: '#2C3539', maxWidth: 140, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{s.segment_label}</td>
                      <td style={{ padding: '8px 10px', fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#0033A0' }}>{formatNum(s.padron_total)}</td>
                      <td style={{ padding: '8px 10px', color: '#6B7785', whiteSpace: 'nowrap' }}>{s.geography_ccaa || s.geography_city || '—'}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <span style={{ background: '#EEF2FF', color: '#0033A0', padding: '2px 6px', borderRadius: 4, fontWeight: 600, fontSize: 11 }}>{s.socioeconomic_tier || '—'}</span>
                      </td>
                      <td style={{ padding: '8px 10px', color: '#6B7785' }}>{s.education_profile || '—'}</td>
                      <td style={{ padding: '8px 10px' }}>
                        <span style={{ background: '#E3F4F0', color: '#2DA771', padding: '2px 6px', borderRadius: 4, fontWeight: 600, fontSize: 11 }}>{s.insurance_propensity || '—'}</span>
                      </td>
                      <td style={{ padding: '8px 10px', color: '#6B7785' }}>{s.channel_preference || '—'}</td>
                      <td style={{ padding: '8px 10px', color: '#2C3539', maxWidth: 220 }}>
                        <span title={s.gtm_message}>{s.gtm_message?.length > 80 ? s.gtm_message.slice(0, 80) + '…' : s.gtm_message || '—'}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {segs[0]?.source_url && (
              <div style={{ marginTop: 10, fontSize: 11, color: '#6B7785' }}>
                Fuente: <a href={segs[0].source_url} target="_blank" rel="noopener noreferrer" style={{ color: '#00A9E0' }}>{segs[0].source_url}</a>
                {segs[0].source_year && ` (${segs[0].source_year})`}
              </div>
            )}
          </div>
        );
      })}

      {/* Strategic insight */}
      <div style={{ ...S.card, borderLeft: '4px solid #0033A0', background: '#FAFBFF' }}>
        <div style={S.kicker}>Implicación Estratégica</div>
        <div style={{ fontSize: 14, color: '#2C3539', lineHeight: 1.6 }}>
          <strong>Priorización recomendada:</strong> Venezuela (377K padrón, 48.7% edu superior, mayor income premium) → Colombia (676K volumen, 23% edu) → México (36K padrón, 58% edu superior, perfil HNW más homogéneo).
          El segmento mexicano, aunque pequeño en volumen, tiene el índice más alto de perfil profesional liberal — canal broker especializado en expatriados de corporates.
        </div>
        <div style={{ marginTop: 8, fontSize: 12, color: '#6B7785' }}>
          Dato no disponible: pricing elasticity por segmento. Requiere mystery shopping con perfil B y C definidos en Gaps.
        </div>
      </div>
    </div>
  );
}
