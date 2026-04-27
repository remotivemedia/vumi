'use client';
import { ResponsiveBar } from '@nivo/bar';

const THEME = {
  fontFamily: "'Open Sans',sans-serif", fontSize: 11, textColor: '#6B7785',
  grid: { line: { stroke: '#E2E8F0', strokeWidth: 1 } },
  axis: { ticks: { text: { fill: '#6B7785', fontSize: 11 } } },
  tooltip: { container: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,51,160,0.08)', padding: '8px 12px', fontSize: 12 } },
} as any;

const NAT_COLORS: Record<string, string> = { Colombia: '#1A56C4', Venezuela: '#0033A0', México: '#4A5568', default: '#00A9E0' };

export function AudienceBarChart({ data }: { data: Array<{ nationality: string; padron: number; nacidos: number }> }) {
  const chartData = data.map(d => ({
    nationality: d.nationality,
    'Padrón (nac.)': d.padron,
    'Incl. naturalizados': d.nacidos,
  }));
  return (
    <div style={{ height: 200 }}>
      <ResponsiveBar
        data={chartData}
        keys={['Padrón (nac.)', 'Incl. naturalizados']}
        indexBy="nationality"
        margin={{ top: 8, right: 20, bottom: 48, left: 90 }}
        padding={0.35}
        layout="horizontal"
        groupMode="grouped"
        colors={({ id, data: d }) => {
          const base = NAT_COLORS[d.nationality as string] || NAT_COLORS.default;
          return id === 'Incl. naturalizados' ? base + '66' : base;
        }}
        theme={THEME}
        axisBottom={{ format: (v: number) => v >= 1000 ? `${(v/1000).toFixed(0)}K` : String(v), legend: 'personas', legendPosition: 'middle', legendOffset: 38 }}
        axisLeft={{ tickSize: 0, tickPadding: 8 }}
        enableGridY={false}
        enableLabel={false}
        tooltip={({ id, value, data: d }) => (
          <div style={{ padding: '6px 10px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6, fontSize: 12 }}>
            <strong style={{ color: '#0033A0' }}>{d.nationality}</strong> — {id}<br/>
            <span style={{ fontSize: 14, fontWeight: 700 }}>{Number(value).toLocaleString('es-ES')}</span>
          </div>
        )}
        animate motionConfig="gentle"
        legends={[{ dataFrom: 'keys', anchor: 'bottom', direction: 'row', translateY: 46, itemWidth: 150, itemHeight: 14, symbolSize: 9, symbolShape: 'circle' }]}
      />
    </div>
  );
}
