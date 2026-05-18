import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface PieChartProps {
  title: string;
  subtitle?: string;
  data: { name: string; value: number }[];
  source?: string;
  colors?: string[];
}

const DEFAULT_COLORS = ["#0033A0", "#00A9E0", "#2C3539", "#8884d8", "#82ca9d"];

export const PieChartMagazine: React.FC<PieChartProps> = ({
  title,
  subtitle,
  data,
  source,
  colors = DEFAULT_COLORS,
}) => {
  return (
    <div className="w-full flex flex-col justify-between space-y-4">
      <div className="text-left">
        <h4 className="font-heading font-bold text-sm text-vumi-slate uppercase tracking-wider">
          {title}
        </h4>
        {subtitle && (
          <p className="font-sans text-xs text-gray-400 font-light mt-0.5">
            {subtitle}
          </p>
        )}
      </div>

      <div className="h-[200px] w-full flex items-center justify-center relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={75}
              paddingAngle={4}
              dataKey="value"
              animationDuration={1500}
            >
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#2C3539",
                border: "none",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontFamily: "Open Sans, sans-serif",
                fontSize: "11px",
              }}
              itemStyle={{ color: "#FFFFFF" }}
              formatter={(value: any) => [`${value}%`, "Market Share"]}
            />
          </PieChart>
        </ResponsiveContainer>
        {/* Absolute Legend */}
        <div className="absolute text-center">
          <span className="text-[10px] font-heading font-bold text-gray-400 uppercase block tracking-widest">
            Dominance
          </span>
          <span className="text-2xl font-heading font-bold text-vumi-blue">
            {data[0]?.value}%
          </span>
        </div>
      </div>

      {/* Legend & Attribution */}
      <div className="flex flex-col gap-2 pt-2 border-t border-gray-50">
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[10px] font-sans text-gray-500 justify-start">
          {data.map((item, idx) => (
            <div key={idx} className="flex items-center gap-1.5 shrink-0">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: colors[idx % colors.length] }}
              />
              <span className="font-semibold text-vumi-slate">{item.name}</span>
              <span className="text-gray-400">({item.value}%)</span>
            </div>
          ))}
        </div>
        {source && (
          <div className="text-right">
            <span className="font-mono text-[9px] text-gray-400 italic">
              Source: {source}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
