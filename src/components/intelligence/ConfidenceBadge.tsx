import React from "react";

type ConfidenceLevel = "validated" | "strong" | "emerging" | "gap";

interface ConfidenceBadgeProps {
  level: ConfidenceLevel;
  score?: number;
  label?: string;
  compact?: boolean;
}

const CONFIG: Record<ConfidenceLevel, { label: string; color: string; dot: string }> = {
  validated: {
    label: "Validated",
    color: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
    dot: "bg-emerald-500",
  },
  strong: {
    label: "Strong Signal",
    color: "bg-sky-50 text-sky-700 border border-sky-200/60",
    dot: "bg-vumi-sky",
  },
  emerging: {
    label: "Emerging",
    color: "bg-amber-50 text-amber-700 border border-amber-200/60",
    dot: "bg-amber-400",
  },
  gap: {
    label: "Data Gap",
    color: "bg-gray-50 text-gray-500 border border-gray-200/60",
    dot: "bg-gray-400",
  },
};

export const ConfidenceBadge: React.FC<ConfidenceBadgeProps> = ({
  level,
  score,
  label,
  compact = false,
}) => {
  const cfg = CONFIG[level];
  const displayLabel = label ?? cfg.label;

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-heading font-bold rounded-sm ${cfg.color} ${
        compact ? "text-[9px] px-1.5 py-0.5 tracking-wide" : "text-[10px] px-2 py-1 tracking-wider"
      } uppercase`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
      {displayLabel}
      {score !== undefined && !compact && (
        <span className="opacity-60 font-sans font-normal normal-case">
          &nbsp;{score}%
        </span>
      )}
    </span>
  );
};
