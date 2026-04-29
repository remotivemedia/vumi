'use client';
import { useState, useEffect, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Row = { nationality: string; ccaa: string; value: number; metric_type: string };

const CA: Record<string, string> = {
  'Comunidad de Madrid': 'Madrid',
  'Cataluña': 'Cataluña',
  'Canarias': 'Canarias',
  'Comunitat Valenciana': 'Valencia',
  'Andalucía': 'Andalucía',
};

const NATS = ['Venezuelan', 'Colombian', 'Mexican'];

const NC: Record<string, string> = {
  Venezuelan: '#0033A0',
  Colombian: '#00A9E0',
  Mexican: '#F59E0B',
};

export function AudienceCCAAChart({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sb.from('vumi_audience_segments')
      .select('nationality,ccaa,value,metric_type')
      .in('metric_type', ['nationality_padron', 'flows_in'])
      .not('ccaa', 'is', null)
      .then(({ data }) => {
        setRows((data ?? []) as Row[]);
        setLoading(false);
      });
  }, []);

  const { ccaas, agg, maxVal } = useMemo(() => {
    const agg: Record<string, Record<string, number>> = {};
    for (const r of rows) {
      if (!agg[r.ccaa]) agg[r.ccaa] = {};
      agg[r.ccaa][r.nationality] = (agg[r.ccaa][r.nationality] ?? 0) + r.value;
    }
    const ccaas = Object.keys(agg)
      .sort((a, b) => {
        const sumA = NATS.reduce((s, n) => s + (agg[a][n] ?? 0), 0);
        const sumB = NATS.reduce((s, n) => s + (agg[b][n] ?? 0), 0);
        return sumB - sumA;
      })
      .slice(0, 5);
    const maxVal = ccaas.reduce((m, ccaa) => {
      const sum = NATS.reduce((s, n) => s + (agg[ccaa][n] ?? 0), 0);
      return Math.max(m, sum);
    }, 0);
    return { ccaas, agg, maxVal };
  }, [rows]);

  const top = ccaas[0] ? (CA[ccaas[0]] ?? ccaas[0]) : '';
  const insight =
    lang === 'es'
      ? `${top} mayor volumen LATAM combinado`
      : `${top} highest combined LATAM volume`;

  if (loading) {
    return (
      <div className="space-y-3 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-8 bg-gray-100 rounded" />
        ))}
      </div>
    );
  }

  if (ccaas.length === 0) {
    return (
      <p className="text-xs text-gray-400">
        Dato no disponible en el dataset actual.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex gap-4 text-xs">
        {NATS.map((n) => (
          <div key={n} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-sm"
              style={{ backgroundColor: NC[n] }}
            />
            <span className="text-gray-600">{n}</span>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        {ccaas.map((ccaa) => (
          <div key={ccaa}>
            <div className="text-xs text-gray-500 mb-1 font-medium">
              {CA[ccaa] ?? ccaa}
            </div>
            <div className="flex gap-1">
              {NATS.map((nat) => {
                const val = agg[ccaa][nat] ?? 0;
                return (
                  <div key={nat} className="flex-1">
                    <div className="h-4 bg-gray-100 rounded overflow-hidden">
                      <div
                        className="h-full rounded"
                        style={{
                          width: `${maxVal > 0 ? (val / maxVal) * 100 : 0}%`,
                          backgroundColor: NC[nat],
                          opacity: 0.85,
                        }}
                      />
                    </div>
                    <div className="text-xs text-gray-400 mt-0.5 text-center">
                      {val >= 1000 ? `${(val / 1000).toFixed(0)}K` : val || ''}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
        {insight}
      </p>
    </div>
  );
}
