import React from 'react';
export const revalidate = 300;
// app/intelligence/signals/page.tsx
import { getSignals } from '@/lib/intelligence';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
};

const TYPE_META: Record<string, { bg: string; color: string; label: string }> = {
  regulatory: { bg: '#EEF2FF', color: '#0033A0', label: 'Regulatorio' },
  competitor_move: { bg: '#E6F6FC', color: '#0074A8', label: 'Movimiento Competidor' },
  market_data: { bg: '#E3F4F0', color: '#2DA771', label: 'Dato de Mercado' },
  broker_activity: { bg: '#F4EEFB', color: '#6A3AAF', label: 'Actividad Broker' },
  demographic: { bg: '#FEF3CD', color: '#B45309', label: 'Demográfico' },
};

function SignalRow({ s }: { s: any }) {
  const meta = TYPE_META[s.signal_type] || { bg: '#F5F7FA', color: '#6B7785', label: s.signal_type };
  const relevanceColor = s.relevance_score >= 85 ? '#0033A0' : s.relevance_score >= 70 ? '#00A9E0' : '#6B7785';
  return (
    <div style={{
      padding: '14px 16px', borderRadius: 8, marginBottom: 8,
      background: s.action_required ? '#FFF8F7' : '#fff',
      border: '1px solid #E2E8F0',
      borderLeft: `4px solid ${s.action_required ? '#E55B4D' : meta.color}`,
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 6 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#2C3539', lineHeight: 1.35, marginBottom: 4 }}>
            {s.result_url ? (
              <a href={s.result_url} target="_blank" rel="noopener noreferrer" style={{ color: '#2C3539', textDecoration: 'none' }}>
                {s.result_title}
              </a>
            ) : s.result_title}
          </div>
          {s.result_summary && (
            <div style={{ fontSize: 12, color: '#6B7785', lineHeight: 1.45 }}>
              {s.result_summary.length > 200 ? s.result_summary.slice(0, 200) + '…' : s.result_summary}
            </div>
          )}
          {s.action_note && (
            <div style={{ fontSize: 12, color: '#E55B4D', fontWeight: 600, marginTop: 6, padding: '4px 8px', background: '#FBE8E2', borderRadius: 4, display: 'inline-block' }}>
              ⚡ {s.action_note}
            </div>
          )}
        </div>
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 20, color: relevanceColor, lineHeight: 1 }}>{s.relevance_score}</div>
          <div style={{ fontSize: 10, color: '#6B7785', textTransform: 'uppercase', letterSpacing: '0.06em' }}>relevance</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
        <span style={{ background: meta.bg, color: meta.color, padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>
          {meta.label}
        </span>
        {s.action_required && (
          <span style={{ background: '#FBE8E2', color: '#E55B4D', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>
            Requiere Acción
          </span>
        )}
        {s.entity && <span style={{ fontSize: 10, color: '#6B7785' }}>· {s.entity}</span>}
        {s.provider && <span style={{ fontSize: 10, color: '#6B7785' }}>· vía {s.provider}</span>}
        <span style={{ fontSize: 10, color: '#6B7785', marginLeft: 'auto' }}>{s.published_at || s.detected_at?.slice(0, 10)}</span>
      </div>
    </div>
  );
}

export default async function SignalsPage() {
  const signals = await getSignals(50);

  const actionRequired = signals.filter((s: any) => s.action_required);
  const regulatory = signals.filter((s: any) => s.signal_type === 'regulatory');
  const competitorMoves = signals.filter((s: any) => s.signal_type === 'competitor_move');

  const typeCounts = signals.reduce((acc: Record<string, number>, s: any) => {
    acc[s.signal_type] = (acc[s.signal_type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div style={{ maxWidth: 1000 }}>
      {/* Header */}
      <div style={{ marginBottom: 24 }}>
        <div style={S.kicker}>Feed de Inteligencia</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 6 }}>
          Señales del Mercado
        </h1>
        <p style={{ fontSize: 13, color: '#6B7785', maxWidth: 700 }}>
          {signals.length} señales activas. {actionRequired.length} requieren acción inmediata.
          Fuentes: Google Gemini, Claude web search, signal-monitor cron.
        </p>
      </div>

      {/* Type strip */}
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        {Object.entries(typeCounts).sort(([,a],[,b]) => (b as number) - (a as number)).map(([type, count]) => {
          const meta = TYPE_META[type] || { bg: '#F5F7FA', color: '#6B7785', label: type };
          return (
            <div key={type} style={{ padding: '6px 12px', borderRadius: 6, background: meta.bg, border: `1px solid ${meta.color}22` }}>
              <span style={{ fontWeight: 700, color: meta.color, fontSize: 16, fontFamily: "'Montserrat', sans-serif" }}>{count as number}</span>
              <span style={{ fontSize: 11, color: '#6B7785', marginLeft: 6 }}>{meta.label}</span>
            </div>
          );
        })}
      </div>

      {/* Action Required — top */}
      {actionRequired.length > 0 && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#E55B4D', marginBottom: 10 }}>
            ⚡ {actionRequired.length} señal{actionRequired.length > 1 ? 'es' : ''} que requiere{actionRequired.length > 1 ? 'n' : ''} acción
          </div>
          {actionRequired.map((s: any) => <SignalRow key={s.id} s={s} />)}
        </div>
      )}

      {/* All signals */}
      <div style={S.card}>
        <div style={S.kicker}>Todas las Señales</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: '#2C3539', marginBottom: 14 }}>
          Feed Cronológico — últimas {signals.length}
        </div>
        {signals.filter((s: any) => !s.action_required).map((s: any) => <SignalRow key={s.id} s={s} />)}
        {signals.filter((s: any) => !s.action_required).length === 0 && (
          <div style={{ fontSize: 13, color: '#6B7785', padding: '20px 0', textAlign: 'center' }}>
            No hay señales adicionales. Rerun signal-monitor para actualizar.
          </div>
        )}
      </div>
    </div>
  );
}
