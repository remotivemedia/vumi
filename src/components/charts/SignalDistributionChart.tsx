'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type SignalRow = {
  signal_type: string;
  count: number;
  avg_relevance: number;
  has_risk: boolean;
};

export function SignalDistributionChart({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const [signals, setSignals] = useState<SignalRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sb.from('vumi_signal_monitor')
      .select('signal_type,relevance_score,action_required')
      .then(({ data }) => {
        if (!data) { setLoading(false); return; }
        const agg: Record<string, { count: number; total: number; risk: boolean }> = {};
        for (const r of data) {
          const t = r.signal_type ?? 'other';
          if (!agg[t]) agg[t] = { count: 0, total: 0, risk: false };
          agg[t].count++;
          agg[t].total += r.relevance_score ?? 0;
          if (r.action_required) agg[t].risk = true;
        }
        const rows: SignalRow[] = Object.entries(agg)
          .map(([signal_type, v]) => ({
            signal_type,
            count: v.count,
            avg_relevance: Math.round(v.total / v.count),
            has_risk: v.risk,
          }))
          .sort((a, b) => b.count - a.count);
        setSignals(rows);
        setLoading(false);
      });
  }, []);

  const topRisk = signals.find((s) => s.has_risk);
  const insight = topRisk
    ? lang === 'es'
      ? `Señal de riesgo activa: ${topRisk.signal_type} (relevancia ${topRisk.avg_relevance})`
      : `Active risk signal: ${topRisk.signal_type} (relevance ${topRisk.avg_relevance})`
    : lang === 'es'
    ? 'Sin señales de riesgo activas'
    : 'No active risk signals';

  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-6 bg-gray-100 rounded" />
        ))}
      </div>
    );
  }

  if (signals.length === 0) {
    return (
      <p className="text-xs text-gray-400">
        Dato no disponible en el dataset actual.
      </p>
    );
  }

  const maxCount = signals[0]?.count ?? 1;

  return (
    <div className="space-y-2">
      {signals.map((s) => (
        <div key={s.signal_type} className="flex items-center gap-2">
          <div className="w-28 text-xs text-gray-500 truncate shrink-0">
            {s.signal_type.replace(/_/g, ' ')}
          </div>
          <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
            <div
              className="h-full rounded"
              style={{
                width: `${(s.count / maxCount) * 100}%`,
                backgroundColor: s.has_risk ? '#DC2626' : '#0033A0',
                opacity: s.has_risk ? 1 : 0.7,
              }}
            />
          </div>
          <div className="w-6 text-xs text-gray-500 text-right shrink-0">
            {s.count}
          </div>
          <div className="w-8 text-xs text-gray-400 text-right shrink-0">
            {s.avg_relevance}
          </div>
          {s.has_risk && (
            <span className="text-xs text-red-500 shrink-0">⚠</span>
          )}
        </div>
      ))}
      <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
        {insight}
      </p>
    </div>
  );
}
