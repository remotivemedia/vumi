import React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

interface ScatterPoint {
  age: number;
  premium: number;
  name: string;
}

interface ScatterChartProps {
  title: string;
  subtitle?: string;
  data: ScatterPoint[];
  source?: string;
  color?: string;
}

export const ScatterChartMagazine: React.FC<ScatterChartProps> = ({
  title,
  subtitle,
  data,
  source,
  color = "#00A9E0",
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

      <div className="h-[200px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart
            margin={{
              top: 10,
              right: 20,
              bottom: 20,
              left: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" vertical={false} />
            <XAxis
              type="number"
              dataKey="age"
              name="Age"
              unit=" yrs"
              stroke="#94A3B8"
              fontSize={10}
              tickLine={false}
            >
              <Label value="Client Age" offset={-10} position="insideBottom" style={{ fill: "#94A3B8", fontSize: "10px" }} />
            </XAxis>
            <YAxis
              type="number"
              dataKey="premium"
              name="Premium"
              unit="€"
              stroke="#94A3B8"
              fontSize={10}
              tickLine={false}
            >
              <Label value="Monthly (€)" angle={-90} position="insideLeft" style={{ textAnchor: "middle", fill: "#94A3B8", fontSize: "10px" }} />
            </YAxis>
            <Tooltip
              cursor={{ strokeDasharray: "3 3" }}
              contentStyle={{
                backgroundColor: "#2C3539",
                border: "none",
                borderRadius: "4px",
                color: "#FFFFFF",
                fontFamily: "Open Sans, sans-serif",
                fontSize: "11px",
              }}
              labelStyle={{ color: "#FFFFFF" }}
              formatter={(value: any, name: any) => {
                if (name === "Premium") return [`€${value}/mo`, "Standard Premium"];
                if (name === "Age") return [`${value} years old`, "Client Age"];
                return [value, name];
              }}
              // Custom tooltip to show name of competitor
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as ScatterPoint;
                  return (
                    <div className="bg-vumi-slate text-white p-3 border border-vumi-blue/15 rounded premium-shadow text-xs font-sans space-y-1">
                      <p className="font-heading font-bold text-vumi-sky">{item.name}</p>
                      <p className="font-light text-gray-300">Age: <span className="font-semibold text-white">{item.age} yrs</span></p>
                      <p className="font-light text-gray-300">Premium: <span className="font-semibold text-white">€{item.premium}/mo</span></p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="HNW Competitors" data={data} fill={color} />
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {source && (
        <div className="text-right border-t border-gray-50 pt-2">
          <span className="font-mono text-[9px] text-gray-400 italic">
            Source: {source}
          </span>
        </div>
      )}
    </div>
  );
};
