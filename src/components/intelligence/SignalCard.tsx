import React from "react";
import { motion } from "framer-motion";
import { ConfidenceBadge } from "./ConfidenceBadge";

type SignalStrength = "validated" | "strong" | "emerging" | "gap";

interface SignalCardProps {
  id?: string;
  title: string;
  value: string;
  trend?: string;
  trendPositive?: boolean;
  strength: SignalStrength;
  source?: string;
  delay?: number;
}

export const SignalCard: React.FC<SignalCardProps> = ({
  id,
  title,
  value,
  trend,
  trendPositive = true,
  strength,
  source,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay, ease: "easeOut" }}
      className="bg-white border border-gray-100 rounded-sm p-4 premium-shadow flex flex-col gap-3"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          {id && (
            <span className="font-mono text-[9px] font-bold text-gray-300 shrink-0 tabular-nums">
              {id}
            </span>
          )}
          <p className="font-sans text-xs font-semibold text-vumi-slate leading-tight">
            {title}
          </p>
        </div>
        <ConfidenceBadge level={strength} compact />
      </div>

      {/* Value + trend */}
      <div className="flex items-end justify-between gap-2">
        <span className="font-heading text-xl font-bold text-vumi-blue tracking-tight">
          {value}
        </span>
        {trend && (
          <span
            className={`font-heading text-[10px] font-bold uppercase tracking-wider shrink-0 ${
              trendPositive ? "text-emerald-600" : "text-rose-600"
            }`}
          >
            {trendPositive ? "+" : ""}{trend}
          </span>
        )}
      </div>

      {/* Source */}
      {source && (
        <p className="font-sans text-[10px] text-gray-400 font-light leading-tight border-t border-gray-50 pt-2">
          {source}
        </p>
      )}
    </motion.div>
  );
};
