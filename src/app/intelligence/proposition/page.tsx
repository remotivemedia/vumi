import React from 'react';
// app/intelligence/proposition/page.tsx
import { getCompetitors } from '@/lib/intelligence';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
};

const DIFFERENTIATORS = [
  { dim: 'Topes de cobertura', vumi: '€5M (Premier)', market: '£3.1M Allianz / $500K Cigna / £250K AXA', advantage: true },
  { dim: 'Regulador EEA', vumi: 'MFSA Malta — pasaporte directo España', market: 'Cigna (Guernsey ✗) / AXA Global (FCA UK ✗)', advantage: true },
  { dim: 'Preexistencias', vumi: 'Declaradas, evaluación caso a caso', market: 'Underwriting rígido (estándar)', advantage: true },
  { dim: 'Herencia LatAm service', vumi: 'VUMI Group — 30 años LatAm premium', market: 'Sin equivalente (Bupa/Allianz/AXA)', advantage: true },
  { dim: 'Rating solvencia', vumi: 'Dato no disponible en el dataset actual.', market: 'Allianz A+ (AM Best)', advantage: false },
  { dim: 'Red hospitales España', vumi: 'Pendiente confirmación direct billing', market: 'Bupa/Sanitas (red propia)', advantage: false },
];

const MESSAGES: Record<string, { broker: string; hnw: string; nomada: string }> = {
  Venezuelan: {
    broker: 'Tu cliente venezolano con ingresos premium necesita un plan que lo cubra en LATAM y Europa. VUMI lo tiene — y acepta su historial médico.',
    hnw: 'Cobertura €5M sin límites geográficos. El único plan que te sigue de Madrid a Caracas.',
    nomada: 'Visa nómada digital aprobada con VUMI Euro Health Priority — cobertura mínima cumplida, protección máxima.',
  },
  Colombian: {
    broker: 'Colombianos en Madrid buscan cobertura que funcione en Colombia para visitas familiares. VUMI cubre worldwide — sin exclusiones LatAm.',
    hnw: 'Presencia en Barcelona, Bogotá, Miami. Tu salud debe seguirte — VUMI Premier €5M lo garantiza.',
    nomada: 'VUMI Euro Health Priority: válido para visado no lucrativo y nómada digital en España.',
  },
  Mexican: {
    broker: 'Directivos y creativos mexicanos en Barcelona y Madrid necesitan cobertura premium EEA + México. VUMI es el único con herencia LatAm y regulador europeo.',
    hnw: 'HNW mexicano en Sarrià o Salamanca. Clínica Universidad de Navarra en red. Tope €5M. Sin exclusiones por preexistencias.',
    nomada: 'Alta propensión a privado premium. Ticket medio alto. Mensaje: "El seguro que mereces en Europa."',
  },
};

export default async function PropositionPage() {
  const competitors = await getCompetitors();

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={S.kicker}>Propuesta de Valor</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 6 }}>
          Diferenciación y Mensajes
        </h1>
        <p style={{ fontSize: 13, color: '#6B7785', maxWidth: 700 }}>
          Framework de diferenciación basado en datos verificados del corpus y la base estructurada.
          Los mensajes se estructuran por audiencia × canal.
        </p>
      </div>

      {/* Differentiation table */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={S.kicker}>Framework de Diferenciación</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #E2E8F0', background: '#F5F7FA' }}>
              {['Dimensión', 'VUMI Euro Health', 'Mercado (mejor alternativa)', 'Ventaja'].map(h => (
                <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 10, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {DIFFERENTIATORS.map(({ dim, vumi, market, advantage }) => (
              <tr key={dim} style={{ borderBottom: '1px solid #F5F7FA' }}>
                <td style={{ padding: '10px 12px', fontWeight: 600, color: '#2C3539', fontSize: 12 }}>{dim}</td>
                <td style={{ padding: '10px 12px', color: advantage ? '#2DA771' : '#E55B4D', fontWeight: advantage ? 600 : 400 }}>{vumi}</td>
                <td style={{ padding: '10px 12px', color: '#6B7785' }}>{market}</td>
                <td style={{ padding: '10px 12px', textAlign: 'center', fontSize: 16 }}>
                  {advantage ? '✓' : '✗'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Message matrix */}
      <div style={{ ...S.card, marginBottom: 20 }}>
        <div style={S.kicker}>Matriz de Mensajes</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: '#2C3539', marginBottom: 16 }}>
          Audiencia × Canal
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 1fr 1fr', gap: 1, fontSize: 12 }}>
          {/* Header row */}
          <div style={{ background: '#0033A0', color: '#fff', padding: '8px 12px', fontWeight: 700, fontSize: 11 }}>Canal →</div>
          {['Broker', 'HNW Direct', 'Nómada Digital'].map(h => (
            <div key={h} style={{ background: '#0033A0', color: '#fff', padding: '8px 12px', fontWeight: 700, fontSize: 11 }}>{h}</div>
          ))}
          {/* Data rows */}
          {(['Venezuelan', 'Colombian', 'Mexican'] as const).map(nat => (
            <>
              <div key={nat + '_label'} style={{ background: '#EEF2FF', padding: '10px 12px', fontWeight: 700, color: '#0033A0', fontSize: 11, display: 'flex', alignItems: 'center' }}>
                {nat === 'Venezuelan' ? 'Venezolana' : nat === 'Colombian' ? 'Colombiana' : 'Mexicana'}
              </div>
              {(['broker', 'hnw', 'nomada'] as const).map(canal => (
                <div key={nat + canal} style={{ background: '#fff', border: '1px solid #E2E8F0', padding: '10px 12px', color: '#2C3539', lineHeight: 1.45 }}>
                  {MESSAGES[nat][canal]}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>

      {/* Counter-argument */}
      <div style={{ ...S.card, borderLeft: '4px solid #E55B4D', background: '#FFF8F7' }}>
        <div style={S.kicker}>Contraargumento más fuerte</div>
        <div style={{ fontSize: 14, color: '#2C3539', lineHeight: 1.6, marginBottom: 10 }}>
          <strong>¿Por qué un broker debería preferir Allianz Care sobre VUMI?</strong>
          Allianz tiene A+ AM Best, red global establecida, brand recognition, y lleva 20+ años en el mercado español. Para un broker mid-market el riesgo reputacional de presentar un carrier nuevo a un cliente HNW es alto — si hay un siniestro el primer año, el broker responde.
        </div>
        <div style={{ fontSize: 13, color: '#2C3539', lineHeight: 1.6 }}>
          <strong>Respuesta:</strong> El argumento de VUMI no es "somos nuevos y más baratos". Es "somos regulados EEA, tenemos topes superiores, y somos los únicos con herencia LatAm genuine. Tu cliente venezolano o colombiano HNW nos conoce — VUMI Group lleva 30 años siendo su referencia en Miami y Bogotá. No eres el primero en recomendarnos."
        </div>
      </div>
    </div>
  );
}
