'use client';
import { useMemo } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { useTranslation } from 'react-i18next';

const BASE_THEME = {
  fontFamily: "'Open Sans',sans-serif", fontSize: 11, textColor: '#6B7785',
  grid: { line: { stroke: '#E2E8F0', strokeWidth: 1 } },
  axis: { ticks: { text: { fill: '#6B7785', fontSize: 11 } } },
  tooltip: { container: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,51,160,0.08)', padding: '8px 12px', fontSize: 12 } },
} as any;

const NAT_COLORS: Record<string, string> = { Colombia: '#1A56C4', Venezuela: '#0033A0', México: '#4A5568', default: '#00A9E0' };

export function AudienceBarChart({ data }: { data: Array<{ nationality: string; padron: number; nacidos: number }> }) {
  const { t } = useTranslation();

  const keyRegistered   = t('common.chart_census_nat');
  const keyNaturalised  = t('common.chart_incl_nat');
  const axisLegend      = t('common.chart_people');

  const chartData = useMemo(() => data.map(d => ({
    nationality: d.nationality,
    [keyRegistered]: d.padron,
    [keyNaturalised]: d.nacidos,
  })), [data, keyRegistered, keyNaturalised]);

  return (
    <div style={{ height: 200 }}>
      <ResponsiveBar
        data={chartData}
        keys={[keyRegistered, keyNaturalised]}
        indexBy="nationality"
        margin={{ top: 8, right: 20, bottom: 52, left: 96 }}
        padding={0.35}
        layout="horizontal"
        groupMode="grouped"
        colors={({ id, data: d }) => {
          const base = NAT_COLORS[d.nationality as string] || NAT_COLORS.default;
          return id === keyNaturalised ? base + '66' : base;
        }}
        theme={BASE_THEME}
        axisBottom={{
          format: (v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : String(v),
          legend: axisLegend,
          legendPosition: 'middle',
          legendOffset: 40,
        }}
        axisLeft={{ tickSize: 0, tickPadding: 8 }}
        enableGridY={false}
        enableLabel={false}
        tooltip={({ id, value, data: d }) => (
          <div style={{ padding: '6px 10px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12 }}>
            <strong style={{ color: '#0033A0' }}>{d.nationality}</strong> — {id}<br/>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{Number(value).toLocaleString()}</span>
          </div>
        )}
        animate
        motionConfig="gentle"
        legends={[{
          dataFrom: 'keys',
          anchor: 'bottom',
          direction: 'row',
          translateY: 50,
          itemWidth: 160,
          itemHeight: 14,
          symbolSize: 9,
          symbolShape: 'circle',
        }]}
      />
    </div>
  );
}
