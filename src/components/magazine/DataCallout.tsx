import React from "react";
import { motion } from "framer-motion";

interface DataCalloutProps {
  number: string;
  label: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  delay?: number;
}

export const DataCallout: React.FC<DataCalloutProps> = ({
  number,
  label,
  trend,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="bg-white p-4 sm:p-5 border border-gray-100 rounded-sm premium-shadow flex flex-col justify-between kpi-tile"
    >
      <div>
        <div className="flex justify-between items-start gap-2">
          <span className="font-heading text-4xl sm:text-5xl font-bold text-vumi-blue tracking-tight">
            {number}
          </span>
          {trend && (
            <span
              className={`text-[9px] font-semibold px-2 py-1 rounded-sm shrink-0 ${
                trend.isPositive
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-rose-50 text-rose-700"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </span>
          )}
        </div>
        <p className="font-sans text-[10px] text-vumi-slate font-semibold leading-relaxed mt-2 uppercase tracking-wider text-gray-500">
          {label}
        </p>
      </div>
    </motion.div>
  );
};
