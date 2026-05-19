import React from "react";
import { motion } from "framer-motion";

interface ProgressBarProps {
  value: number; // 0-100
  color?: string;
  height?: "thin" | "medium" | "thick";
  showLabel?: boolean;
  label?: string;
  delay?: number;
}

const HEIGHTS = {
  thin: "h-0.5",
  medium: "h-1.5",
  thick: "h-2.5",
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  color = "#00A9E0",
  height = "medium",
  showLabel = false,
  label,
  delay = 0,
}) => {
  return (
    <div className="w-full space-y-1">
      {(showLabel || label) && (
        <div className="flex justify-between items-center">
          {label && (
            <span className="font-sans text-[10px] text-gray-400 font-light">{label}</span>
          )}
          {showLabel && (
            <span className="font-heading text-[10px] font-bold text-vumi-slate tabular-nums">
              {value}%
            </span>
          )}
        </div>
      )}
      <div className={`w-full bg-gray-100 rounded-full overflow-hidden ${HEIGHTS[height]}`}>
        <motion.div
          className={`${HEIGHTS[height]} rounded-full`}
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.4, 0, 0.2, 1] }}
        />
      </div>
    </div>
  );
};
