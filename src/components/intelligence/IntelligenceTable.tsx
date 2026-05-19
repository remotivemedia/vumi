import React from "react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: string;
}

interface IntelligenceTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  caption?: string;
  zebra?: boolean;
}

export function IntelligenceTable<T extends object>({
  columns,
  rows,
  caption,
  zebra = false,
}: IntelligenceTableProps<T>) {
  return (
    <div className="w-full bg-white border border-gray-100 rounded-sm premium-shadow overflow-hidden">
      {caption && (
        <div className="px-5 py-3 border-b border-gray-100">
          <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {caption}
          </span>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  style={col.width ? { width: col.width } : undefined}
                  className={`px-4 py-3 font-heading text-[10px] font-bold uppercase tracking-widest text-gray-400 ${
                    col.align === "right"
                      ? "text-right"
                      : col.align === "center"
                      ? "text-center"
                      : "text-left"
                  }`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr
                key={ri}
                className={`border-b border-gray-50 last:border-0 transition duration-150 ${
                  zebra && ri % 2 === 0 ? "bg-gray-50/30" : ""
                } hover:bg-vumi-sky/[0.02]`}
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className={`px-4 py-3 font-sans text-sm ${
                      col.align === "right"
                        ? "text-right"
                        : col.align === "center"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {col.render
                      ? col.render(row)
                      : String((row as Record<string, unknown>)[String(col.key)] ?? "")}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
