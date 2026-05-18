import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

interface BarChartMagazineProps {
  title: string;
  subtitle?: string;
  data: any[];
  xKey: string; // The data value key (e.g. population)
  yKey: string; // The label key (e.g. CCAA name)
  source: string;
  color?: string;
}

export const BarChartMagazine: React.FC<BarChartMagazineProps> = ({
  title,
  subtitle,
  data,
  xKey,
  yKey,
  source,
  color = "#00A9E0", // Default Sky Blue
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
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 10, right: 10, left: 15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" horizontal={false} />
            <XAxis
              type="number"
              stroke="#94A3B8"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              dy={5}
            />
            <YAxis
              type="category"
              dataKey={yKey}
              stroke="#2C3539"
              fontSize={11}
              fontWeight={600}
              tickLine={false}
              axisLine={false}
              width={80}
            />
            <Tooltip
              cursor={{ fill: "rgba(245, 247, 250, 0.5)" }}
              contentStyle={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E2E8F0",
                borderRadius: "4px",
                fontFamily: "'Open Sans', sans-serif",
                fontSize: "12px",
                boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
              }}
            />
            <Bar
              dataKey={xKey}
              fill={color}
              radius={[0, 4, 4, 0]}
              barSize={18}
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#0033A0" : color} // Highlight top item in Trust Blue
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <p className="chart-attribution">
        Source: {source}
      </p>
    </div>
  );
};
