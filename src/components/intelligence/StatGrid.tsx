import React from "react";
import { motion } from "framer-motion";

export interface StatItem {
  label: string;
  value: string;
  sub?: string;
  positive?: boolean;
}

interface StatGridProps {
  stats: StatItem[];
  cols?: 2 | 3 | 4;
  dark?: boolean;
}

export const StatGrid: React.FC<StatGridProps> = ({ stats, cols = 2, dark = false }) => {
  const colClass =
    cols === 4
      ? "grid-cols-2 sm:grid-cols-4"
      : cols === 3
      ? "grid-cols-2 sm:grid-cols-3"
      : "grid-cols-2";

  return (
    <div className={`grid ${colClass} gap-3`}>
      {stats.map((s, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
          className={`p-4 rounded-sm border ${
            dark
              ? "bg-white/[0.05] border-white/10"
              : "bg-white/[0.07] border-white/10"
          }`}
        >
          <span
            className={`block font-heading text-2xl font-bold leading-none tracking-tight ${
              dark ? "text-white" : "text-white"
            }`}
          >
            {s.value}
          </span>
          <span
            className={`block font-sans text-[10px] uppercase tracking-widest mt-1.5 font-semibold ${
              dark ? "text-vumi-sky/80" : "text-vumi-sky/80"
            }`}
          >
            {s.label}
          </span>
          {s.sub && (
            <span
              className={`block font-sans text-[10px] mt-0.5 font-light ${
                s.positive === true
                  ? "text-emerald-400"
                  : s.positive === false
                  ? "text-rose-400"
                  : "text-white/40"
              }`}
            >
              {s.sub}
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};
