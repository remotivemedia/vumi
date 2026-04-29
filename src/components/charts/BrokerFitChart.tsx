'use client';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

type Broker = {
  name: string;
  fit_score: number;
  outreach_priority: string;
  latam_focus: boolean;
  vip_hnw_focus: boolean;
};

const PC: Record<string, string> = {
  p0: '#0033A0',
  p1: '#00A9E0',
  p2: '#6B7280',
  p3: '#D1D5DB',
};

const PL: Record<string, string> = {
  p0: 'P0', p1: 'P1', p2: 'P2', p3: 'P3',
};

export function BrokerFitChart({ lang = 'es' }: { lang?: 'es' | 'en' }) {
  const [brokers, setBrokers] = useState<Broker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    sb.from('vumi_brokers')
      .select('name,fit_score,outreach_priority,latam_focus,vip_hnw_focus')
      .not('fit_score', 'is', null)
      .order('fit_score', { ascending: false })
      .limit(15)
      .then(({ data }) => {
        setBrokers((data ?? []) as Broker[]);
        setLoading(false);
      });
  }, []);

  const top = brokers[0]?.name ?? '';
  const insight =
    lang === 'es'
      ? `${top} broker de mayor fit para VUMI España`
      : `${top} highest-fit broker for VUMI Spain`;

  if (loading) {
    return (
      <div className="space-y-2 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="h-6 bg-gray-100 rounded" />
        ))}
      </div>
    );
  }

  if (brokers.length === 0) {
    return (
      <p className="text-xs text-gray-400">
        Dato no disponible en el dataset actual.
      </p>
    );
  }

  const max = brokers[0]?.fit_score ?? 100;

  return (
    <div className="space-y-2">
      {brokers.map((b) => (
        <div key={b.name} className="flex items-center gap-2">
          <div className="w-24 text-xs text-gray-500 truncate shrink-0" title={b.name}>
            {b.name.split(' ')[0]}
          </div>
          <div className="flex-1 h-4 bg-gray-100 rounded overflow-hidden">
            <div
              className="h-full rounded"
              style={{
                width: `${(b.fit_score / max) * 100}%`,
                backgroundColor: PC[b.outreach_priority] ?? '#6B7280',
                opacity: 0.85,
              }}
            />
          </div>
          <div className="w-8 text-xs text-gray-500 text-right shrink-0">
            {b.fit_score}
          </div>
          <div
            className="w-5 text-xs font-semibold shrink-0"
            style={{ color: PC[b.outreach_priority] ?? '#6B7280' }}
          >
            {PL[b.outreach_priority] ?? ''}
          </div>
          <div className="flex gap-0.5 shrink-0">
            {b.latam_focus && (
              <span className="text-xs" title="LATAM focus">🌎</span>
            )}
            {b.vip_hnw_focus && (
              <span className="text-xs" title="VIP/HNW focus">⭐</span>
            )}
          </div>
        </div>
      ))}
      <p className="text-xs text-gray-400 pt-2 border-t border-gray-100">
        {insight}
      </p>
    </div>
  );
}
