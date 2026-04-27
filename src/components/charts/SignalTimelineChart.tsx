'use client';
import { ResponsiveLine } from '@nivo/line';

const TYPE_COLORS: Record<string,string> = {
  regulatory: '#0033A0',
  competitor_move: '#00A9E0',
  market_data: '#2DA771',
  demographic: '#B45309',
  broker_activity: '#6A3AAF',
};

const THEME = {
  fontFamily: "'Open Sans',sans-serif", fontSize: 10, textColor: '#6B7785',
  grid: { line: { stroke: '#E2E8F0', strokeWidth: 1 } },
  crosshair: { line: { stroke: '#0033A0', strokeWidth: 1, strokeOpacity: 0.3 } },
  tooltip: { container: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6, padding: '6px 10px', fontSize: 11 } },
} as any;

export function SignalTimelineChart({ signals }: { signals: any[] }) {
  const byWeek: Record<string, Record<string, number>> = {};
  signals.forEach(s => {
    const raw = s.detected_at || s.published_at;
    if (!raw) return;
    const d = new Date(raw);
    const sun = new Date(d); sun.setDate(d.getDate() - d.getDay());
    const wk = sun.toISOString().slice(0,10);
    if (!byWeek[wk]) byWeek[wk] = {};
    const t = s.signal_type || 'other';
    byWeek[wk][t] = (byWeek[wk][t] || 0) + 1;
  });
  const weeks = Object.keys(byWeek).sort().slice(-10);
  if (weeks.length < 2) return (
    <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7785', fontSize: 12 }}>Dato no disponible en el dataset actual.</div>
  );
  const types = Object.keys(TYPE_COLORS);
  const lineData = types
    .map(t => ({
      id: t, color: TYPE_COLORS[t],
      data: weeks.map(w => ({ x: w.slice(5), y: byWeek[w]?.[t] || 0 })),
    }))
    .filter(d => d.data.some(p => p.y > 0));
  if (!lineData.length) return <div style={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#6B7785', fontSize: 12 }}>Dato no disponible en el dataset actual.</div>;
  return (
    <div style={{ height: 190 }}>
      <ResponsiveLine
        data={lineData} margin={{ top: 8, right: 20, bottom: 44, left: 32 }}
        xScale={{ type: 'point' }} yScale={{ type: 'linear', min: 0 }}
        curve="monotoneX" colors={d => d.color as string}
        lineWidth={2} enablePoints pointSize={5} pointColor="white" pointBorderWidth={2} pointBorderColor={{ from: 'serieColor' }}
        enableArea areaOpacity={0.06} useMesh enableGridX={false}
        theme={THEME} animate motionConfig="gentle"
        legends={[{ anchor: 'bottom', direction: 'row', translateY: 42, itemWidth: 100, itemHeight: 14, symbolSize: 9, symbolShape: 'circle' }]}
        tooltip={({ point }) => (
          <div style={{ padding: '5px 8px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 5, fontSize: 11 }}>
            <span style={{ color: point.serieColor as string, fontWeight: 700 }}>{point.serieId}</span> — semana {point.data.xFormatted}: <strong>{point.data.yFormatted}</strong>
          </div>
        )}
      />
    </div>
  );
}
