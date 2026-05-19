import React from "react";

type SourceType = "SQL" | "Report" | "ReMotive" | "Live" | "Pending";

interface SourceStatusIndicatorProps {
  type: SourceType;
  label?: string;
}

const STYLES: Record<SourceType, string> = {
  SQL: "bg-indigo-50 text-indigo-700 border border-indigo-200/60",
  Report: "bg-sky-50 text-sky-700 border border-sky-200/60",
  ReMotive: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  Live: "bg-emerald-50 text-emerald-700 border border-emerald-200/60",
  Pending: "bg-amber-50 text-amber-700 border border-amber-200/60",
};

export const SourceStatusIndicator: React.FC<SourceStatusIndicatorProps> = ({
  type,
  label,
}) => {
  return (
    <span
      className={`inline-flex items-center gap-1 font-heading text-[9px] font-bold uppercase tracking-wider rounded-sm px-1.5 py-0.5 ${STYLES[type]}`}
    >
      {type}
      {label && <span className="font-sans font-normal normal-case opacity-70">{label}</span>}
    </span>
  );
};
