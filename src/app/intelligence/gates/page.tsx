import React from 'react';
// app/intelligence/gates/page.tsx
import { getDataGaps, getRecentDecisions, getHypotheses } from '@/lib/intelligence';

const S = {
  card: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 8, padding: 24, boxShadow: '0 1px 2px rgba(0,0,0,.04)' },
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
};

const P_META: Record<string, { bg: string; color: string }> = {
  p0: { bg: '#FBE8E2', color: '#E55B4D' },
  p1: { bg: '#EEF2FF', color: '#0033A0' },
  p2: { bg: '#FEF3CD', color: '#B45309' },
};

export default async function GatesPage() {
  const [gaps, decisions, hypotheses] = await Promise.all([
    getDataGaps(),
    getRecentDecisions(20),
    getHypotheses(),
  ]);

  const blockers = gaps.filter((g: any) => g.blocker);
  const p0 = gaps.filter((g: any) => g.priority === 'p0' && !g.blocker);
  const p1 = gaps.filter((g: any) => g.priority === 'p1');
  const p2 = gaps.filter((g: any) => g.priority === 'p2');

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ marginBottom: 24 }}>
        <div style={S.kicker}>Validation Gates & Decisiones</div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 6 }}>
          Gaps Abiertos · Decisiones Activas
        </h1>
        <p style={{ fontSize: 13, color: '#6B7785', maxWidth: 700 }}>
          {gaps.length} gaps sin resolver. {blockers.length} bloqueante{blockers.length !== 1 ? 's' : ''} — resolución necesaria antes de activar medios.
        </p>
      </div>

      {/* Blockers — always on top, in red */}
      {blockers.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <span style={{ background: '#E55B4D', color: '#fff', padding: '3px 10px', borderRadius: 99, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 12 }}>
              ⚠ BLOQUEANTE
            </span>
            <span style={{ fontSize: 13, color: '#E55B4D', fontWeight: 600 }}>Resolver antes de cualquier activación de medios</span>
          </div>
          {blockers.map((g: any) => <GapCard key={g.id} gap={g} />)}
        </div>
      )}

      {/* P0 gaps */}
      {p0.length > 0 && (
        <GapSection title="P0 — Esta Semana" gaps={p0} count={p0.length} color="#E55B4D" />
      )}
      {p1.length > 0 && (
        <GapSection title="P1 — 30 días" gaps={p1} count={p1.length} color="#0033A0" />
      )}
      {p2.length > 0 && (
        <GapSection title="P2 — 60–90 días" gaps={p2} count={p2.length} color="#B45309" />
      )}

      {/* Hypotheses */}
      {hypotheses.length > 0 && (
        <div style={{ ...S.card, marginBottom: 20 }}>
          <div style={S.kicker}>Hipótesis Estratégicas</div>
          <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: '#2C3539', marginBottom: 12 }}>
            {hypotheses.length} Hipótesis Activas
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {hypotheses.map((h: any) => (
              <div key={h.id} style={{ padding: '12px 0', borderBottom: '1px solid #F5F7FA', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ flexShrink: 0, width: 48, textAlign: 'center' }}>
                  <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: h.confidence_score >= 70 ? '#2DA771' : h.confidence_score >= 50 ? '#0033A0' : '#E55B4D', lineHeight: 1 }}>
                    {h.confidence_score ?? '—'}
                  </div>
                  <div style={{ fontSize: 10, color: '#6B7785' }}>conf.</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: '#2C3539', marginBottom: 3 }}>{h.hypothesis}</div>
                  {h.supporting_evidence && <div style={{ fontSize: 11, color: '#6B7785', lineHeight: 1.4 }}>{h.supporting_evidence}</div>}
                </div>
                <div style={{ flexShrink: 0, textAlign: 'right' }}>
                  <span style={{
                    background: h.status === 'supported' ? '#E3F4F0' : h.status === 'refuted' ? '#FBE8E2' : '#F5F7FA',
                    color: h.status === 'supported' ? '#2DA771' : h.status === 'refuted' ? '#E55B4D' : '#6B7785',
                    padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600,
                  }}>{h.status || 'open'}</span>
                  <div style={{ fontSize: 10, color: '#6B7785', marginTop: 3 }}>{h.domain}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Decision Log */}
      <div style={S.card}>
        <div style={S.kicker}>Registro de Decisiones</div>
        <div style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 18, color: '#2C3539', marginBottom: 12 }}>
          {decisions.length} Decisiones Activas
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {decisions.map((d: any) => (
            <div key={d.id} style={{ padding: '14px 0', borderBottom: '1px solid #F5F7FA', display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <div style={{ flexShrink: 0, width: 90 }}>
                <div style={{ fontSize: 11, color: '#6B7785' }}>{d.decided_at}</div>
                <div style={{ fontSize: 10, color: '#6B7785', marginTop: 2 }}>{d.decided_by}</div>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#2C3539', marginBottom: 3 }}>{d.title}</div>
                <div style={{ fontSize: 12, color: '#6B7785', lineHeight: 1.4 }}>
                  {d.decision?.length > 160 ? d.decision.slice(0, 160) + '…' : d.decision}
                </div>
                {d.commit_sha && <div style={{ fontSize: 10, color: '#00A9E0', marginTop: 4, fontFamily: "'JetBrains Mono', monospace" }}>sha: {d.commit_sha.slice(0, 12)}</div>}
              </div>
              <div style={{ flexShrink: 0, textAlign: 'right' }}>
                <span style={{ background: '#F5F7FA', color: '#6B7785', padding: '2px 7px', borderRadius: 4, fontSize: 10, fontWeight: 600 }}>{d.domain}</span>
                <div style={{ marginTop: 4 }}>
                  <span style={{
                    background: d.reversibility === 'reversible' ? '#E3F4F0' : '#FBE8E2',
                    color: d.reversibility === 'reversible' ? '#2DA771' : '#E55B4D',
                    padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600,
                  }}>{d.reversibility === 'reversible' ? '↩ Rev.' : '⚠ Costly'}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GapSection({ title, gaps, count, color }: { title: string; gaps: any[]; count: number; color: string }) {
  return (
    <div style={{ marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span style={{ color, fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 13 }}>{title}</span>
        <span style={{ fontSize: 12, color: '#6B7785' }}>— {count} gap{count !== 1 ? 's' : ''}</span>
      </div>
      {gaps.map((g: any) => <GapCard key={g.id} gap={g} />)}
    </div>
  );
}

function GapCard({ gap: g }: { gap: any }) {
  const meta = P_META[g.priority] || { bg: '#F5F7FA', color: '#6B7785' };
  return (
    <div style={{
      background: '#fff', border: `1px solid #E2E8F0`, borderRadius: 8, padding: 16, marginBottom: 8,
      borderLeft: g.blocker ? '4px solid #E55B4D' : `4px solid ${meta.color}`,
    }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
            <span style={{ background: meta.bg, color: meta.color, padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>
              {g.priority?.toUpperCase()}
            </span>
            <span style={{ background: '#F5F7FA', color: '#6B7785', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 600 }}>{g.domain}</span>
            {g.blocker && <span style={{ background: '#FBE8E2', color: '#E55B4D', padding: '2px 7px', borderRadius: 99, fontSize: 10, fontWeight: 700 }}>⚠ BLOQUEANTE</span>}
          </div>
          <div style={{ fontSize: 13, fontWeight: 600, color: '#2C3539', marginBottom: 4 }}>{g.question}</div>
          {g.why_it_matters && <div style={{ fontSize: 12, color: '#6B7785', lineHeight: 1.45, marginBottom: 6 }}>{g.why_it_matters}</div>}
          <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#6B7785' }}>
            {g.recommended_method && <span><strong>Método:</strong> {g.recommended_method}</span>}
            {g.recommended_source && <span><strong>Fuente:</strong> {g.recommended_source}</span>}
            {g.owner && <span><strong>Owner:</strong> {g.owner}</span>}
            {g.eta && <span><strong>ETA:</strong> {g.eta}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
