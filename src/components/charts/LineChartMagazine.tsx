import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

interface LineChartMagazineProps {
  title: string;
  subtitle?: string;
  data: any[];
  xKey: string;
  series: {
    key: string;
    name: string;
    color?: string;
  }[];
  source: string;
}

export const LineChartMagazine: React.FC<LineChartMagazineProps> = ({
  title,
  subtitle,
  data,
  xKey,
  series,
  source,
}) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="text-left mb-6">
        <h3 className="font-heading text-lg font-bold text-vumi-blue leading-tight tracking-tight">
          {title}
        </h3>
        {subtitle && (
          <p className="font-sans text-xs text-gray-500 font-light mt-1">
            {subtitle}
          </p>
        )}
      </div>

      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              dataKey={xKey}
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={10}
            />
            <YAxis
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dx={-5}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "4px",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
            />
            <Legend
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#2C3539",
              }}
            />
            {series.map((s, idx) => (
              <Line
                key={s.key}
                type="monotone"
                dataKey={s.key}
                name={s.name}
                stroke={s.color || (idx === 0 ? "#00A9E0" : "#0033A0")}
                strokeWidth={3}
                dot={{ r: 4, strokeWidth: 1 }}
                activeDot={{ r: 6, strokeWidth: 0 }}
                animationDuration={1500}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <p className="chart-attribution">
        Source: {source}
      </p>
    </div>
  );
};
