import React from 'react';
// app/intelligence/competitors/page.tsx
import { getCompetitors, getCompetitorProducts } from '@/lib/intelligence';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
  muted: { fontSize: 12, color: '#6B7785' },
};

const fmtEur = (n: any) => n ? `€${Number(n).toLocaleString('es-ES')}` : '—';
const fmtBand = (min: any, max: any) => {
  if (!min && !max) return 'Dato no disponible';
  if (min && max) return `€${Number(min).toLocaleString('es-ES')} – €${Number(max).toLocaleString('es-ES')}`;
  return min ? `≥€${Number(min).toLocaleString('es-ES')}` : `≤€${Number(max).toLocaleString('es-ES')}`;
};

export default async function CompetitorsPage() {
  const [competitors, products] = await Promise.all([
    getCompetitors(),
    getCompetitorProducts(),
  ]);

  return (
    <div style={{ maxWidth: 1100 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={S.kicker}>Landscape Competitivo</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 6 }}>
          Competidores IPMI en España
        </h1>
        <p style={{ ...S.muted, fontSize: 14, maxWidth: 700 }}>
          {competitors.length} aseguradoras IPMI activas o relevantes en el mercado español. Datos de producto de {products.length} planes.
          Fuente: DGSFP, webs corporativas, corpus Wave 1, mystery shopping pendiente.
        </p>
      </div>

      {/* Competitor landscape */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={S.kicker}>Mapa de Competidores</div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', background: '#F5F7FA' }}>
                {['Marca','Regulador','Jurisdicción','Estado DGSFP','Segmento','Rating AM Best','Visa España','Diferenciación vs VUMI'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 10, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {competitors.map((c: any) => (
                <tr key={c.id} style={{ borderBottom: '1px solid #F5F7FA' }}>
                  <td style={{ padding: '10px 12px' }}>
                    <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#2C3539', fontSize: 13 }}>{c.brand_name}</div>
                    {c.legal_entity_spain_facing && <div style={{ fontSize: 10, color: '#6B7785' }}>{c.legal_entity_spain_facing}</div>}
                  </td>
                  <td style={{ padding: '10px 12px', color: '#6B7785' }}>{c.regulator}</td>
                  <td style={{ padding: '10px 12px' }}>
                    <span style={{
                      background: c.regulator_jurisdiction === 'EEA' ? '#E3F4F0' : '#FBE8E2',
                      color: c.regulator_jurisdiction === 'EEA' ? '#2DA771' : '#E55B4D',
                      padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700,
                    }}>{c.regulator_jurisdiction}</span>
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 11, color: '#6B7785' }}>{c.dgsfp_status || '—'}</td>
                  <td style={{ padding: '10px 12px', fontSize: 11, color: '#6B7785' }}>{c.segment}</td>
                  <td style={{ padding: '10px 12px', fontWeight: 600, color: c.rating_am_best ? '#2DA771' : '#6B7785' }}>{c.rating_am_best || '—'}</td>
                  <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                    {c.visa_spain_eligible === true && <span style={{ color: '#2DA771', fontWeight: 700 }}>✓</span>}
                    {c.visa_spain_eligible === false && <span style={{ color: '#E55B4D' }}>✗</span>}
                    {c.visa_spain_eligible === null && <span style={{ color: '#6B7785' }}>?</span>}
                  </td>
                  <td style={{ padding: '10px 12px', fontSize: 11, color: '#2C3539', maxWidth: 240 }}>
                    {c.vumi_differentiation_angle?.length > 100 ? c.vumi_differentiation_angle.slice(0, 100) + '…' : c.vumi_differentiation_angle || '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Product comparison */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={S.kicker}>Comparativa de Producto</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: '#2C3539', marginBottom: 16 }}>
          {products.length} Planes Mapeados
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #E2E8F0', background: '#F5F7FA' }}>
                {['Competidor','Plan','Tope Anual EUR','Precio/Año','Perfil Precio','Visa Spain','USA','Maternidad','Dental','Datos a fecha'].map(h => (
                  <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 10, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p: any) => {
                const comp = competitors.find((c: any) => c.id === p.competitor_id);
                return (
                  <tr key={p.id} style={{ borderBottom: '1px solid #F5F7FA' }}>
                    <td style={{ padding: '9px 12px', fontWeight: 600, color: '#0033A0', fontSize: 12 }}>{comp?.brand_name || '—'}</td>
                    <td style={{ padding: '9px 12px', color: '#2C3539' }}>{p.product_name}</td>
                    <td style={{ padding: '9px 12px' }}>
                      <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, color: '#0033A0', fontSize: 13 }}>
                        {fmtEur(p.annual_limit_eur)}
                      </span>
                    </td>
                    <td style={{ padding: '9px 12px', color: '#2C3539', fontSize: 11 }}>
                      {fmtBand(p.price_min_eur_per_year, p.price_max_eur_per_year)}
                    </td>
                    <td style={{ padding: '9px 12px', fontSize: 11 }}>
                      <span style={{ background: '#F5F7FA', color: '#6B7785', padding: '2px 6px', borderRadius: 4, fontWeight: 500 }}>{p.pricing_profile || '—'}</span>
                    </td>
                    <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                      {p.visa_eligible_spain === true ? <span style={{ color: '#2DA771', fontWeight: 700 }}>✓</span> : <span style={{ color: '#E55B4D' }}>✗</span>}
                    </td>
                    <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                      {p.worldwide_incl_usa ? <span style={{ color: '#2DA771' }}>✓</span> : <span style={{ color: '#6B7785' }}>—</span>}
                    </td>
                    <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                      {p.maternity ? <span style={{ color: '#2DA771' }}>✓</span> : <span style={{ color: '#6B7785' }}>—</span>}
                    </td>
                    <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                      {p.dental ? <span style={{ color: '#2DA771' }}>✓</span> : <span style={{ color: '#6B7785' }}>—</span>}
                    </td>
                    <td style={{ padding: '9px 12px', fontSize: 11, color: '#6B7785' }}>{p.pricing_as_of || '—'}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* VUMI positioning */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ ...S.card, borderLeft: '4px solid #2DA771', background: '#F0FAF7' }}>
          <div style={S.kicker}>Ventajas Competitivas VUMI</div>
          <ul style={{ paddingLeft: 16, fontSize: 13, color: '#2C3539', lineHeight: 1.8, margin: 0 }}>
            <li>Tope €5M Premier — supera a Allianz Signature (£3.1M ≈ €3.6M) y Cigna Close Care ($500K)</li>
            <li>Regulador EEA (MFSA Malta) — pasaporte directo; ventaja vs Cigna (Guernsey) y AXA Global (FCA UK post-Brexit)</li>
            <li>Preexistencias declaradas con evaluación caso por caso — modelo flexible vs underwriting rígido</li>
            <li>Herencia LatAm service VUMI Group — no replicable por Bupa/Allianz/AXA</li>
          </ul>
        </div>
        <div style={{ ...S.card, borderLeft: '4px solid #E55B4D', background: '#FFF8F7' }}>
          <div style={S.kicker}>Vulnerabilidades Actuales</div>
          <ul style={{ paddingLeft: 16, fontSize: 13, color: '#2C3539', lineHeight: 1.8, margin: 0 }}>
            <li>Sin rating AM Best público (Allianz tiene A+ Superior)</li>
            <li>Red hospitales España con direct billing: pendiente confirmación</li>
            <li>Pricing exacto: <em>Dato no disponible en el dataset actual.</em> Mystery shopping en curso</li>
            <li>vumigroup.com contradice lanzamiento Spain — fix urgente antes de outreach brokers</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
