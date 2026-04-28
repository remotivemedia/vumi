'use client';
import { useMemo } from 'react';
import { ResponsiveRadar } from '@nivo/radar';
import { useTranslation } from 'react-i18next';

export interface RadarCompetitor { brand: string; eea: number; latam: number; visa: number; rating: number; coverage: number }

const BASE_THEME = {
  fontFamily: "'Open Sans',sans-serif", fontSize: 11, textColor: '#6B7785',
  grid: { line: { stroke: '#E2E8F0' } },
  tooltip: { container: { background: '#fff', border: '1px solid #E2E8F0', borderRadius: 6, boxShadow: '0 4px 12px rgba(0,51,160,0.08)', padding: '6px 10px', fontSize: 12 } },
} as any;

const COLORS = ['#00A9E0','#0033A0','#1A56C4','#64748B','#94A3B8'];

export function CompetitorRadarChart({ data }: { data: RadarCompetitor[] }) {
  const { t } = useTranslation();

  const DIMS = useMemo(() => [
    'EEA ✓',
    'LATAM',
    t('common.chart_visa_es'),
    'Rating',
    t('common.chart_coverage'),
  ], [t]);

  const keys = data.slice(0,5).map(d => d.brand);

  const chartData = useMemo(() => DIMS.map((dim, idx) => {
    const row: Record<string,any> = { dimension: dim };
    data.slice(0,5).forEach(c => {
      switch(idx) {
        case 0: row[c.brand] = c.eea;      break;
        case 1: row[c.brand] = c.latam;    break;
        case 2: row[c.brand] = c.visa;     break;
        case 3: row[c.brand] = c.rating;   break;
        case 4: row[c.brand] = c.coverage; break;
      }
    });
    return row;
  }), [DIMS, data]);

  return (
    <div style={{ height: 300 }}>
      <ResponsiveRadar
        data={chartData}
        keys={keys}
        indexBy="dimension"
        maxValue={5}
        margin={{ top: 40, right: 80, bottom: 30, left: 80 }}
        curve="linearClosed"
        borderWidth={2}
        borderColor={{ from: 'color' }}
        gridLevels={5}
        gridShape="circular"
        gridLabelOffset={14}
        enableDots
        dotSize={6}
        dotColor={{ from: 'color' }}
        dotBorderWidth={2}
        dotBorderColor="white"
        fillOpacity={0.07}
        blendMode="normal"
        animate
        motionConfig="gentle"
        colors={COLORS}
        theme={BASE_THEME}
        legends={[{
          anchor: 'top-left',
          direction: 'column',
          translateX: -60,
          translateY: -30,
          itemWidth: 80,
          itemHeight: 16,
          symbolSize: 9,
          symbolShape: 'circle',
        }]}
      />
    </div>
  );
}
