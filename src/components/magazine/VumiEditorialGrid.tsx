import React from "react";
import { motion } from "framer-motion";

/** A single item rendered inside the editorial grid */
export interface VumiEditorialGridItem {
  /** Short uppercase category or section label */
  category?: string;
  /** Card headline */
  headline: string;
  /** Supporting body copy */
  body?: string;
  /** Optional rendered visual, icon, or media block */
  visual?: React.ReactNode;
  /** Optional footer slot — link, tag, or metadata */
  footer?: React.ReactNode;
  /**
   * Span hint for the first item in the grid.
   * Affects only `asymmetric` layout variant when index === 0.
   */
  featured?: boolean;
}

interface VumiEditorialGridProps {
  /** Array of editorial items to render */
  items: VumiEditorialGridItem[];
  /**
   * "uniform"    — equal-width columns (default)
   * "asymmetric" — first item spans 2 cols, rest fill remaining
   * "list"       — single-column stacked list
   */
  layout?: "uniform" | "asymmetric" | "list";
  /** Max columns on large screens (2, 3, or 4) */
  columns?: 2 | 3 | 4;
  /** Optional section heading rendered above the grid */
  sectionHeading?: string;
  /** Optional className override */
  className?: string;
}

const columnClasses: Record<number, string> = {
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 lg:grid-cols-3",
  4: "md:grid-cols-2 lg:grid-cols-4",
};

export const VumiEditorialGrid: React.FC<VumiEditorialGridProps> = ({
  items,
  layout = "uniform",
  columns = 3,
  sectionHeading,
  className = "",
}) => {
  const isAsymmetric = layout === "asymmetric";
  const isList = layout === "list";

  const gridClass = isList
    ? "grid grid-cols-1 gap-6"
    : `grid grid-cols-1 ${columnClasses[columns] ?? columnClasses[3]} gap-6`;

  return (
    <section
      aria-label={sectionHeading ?? "Editorial grid"}
      className={`w-full ${className}`}
    >
      {sectionHeading && (
        <div className="mb-8 pb-4 border-b border-gray-100">
          <h2 className="text-xl md:text-2xl font-bold font-heading text-vumi-blue tracking-tight">
            {sectionHeading}
          </h2>
        </div>
      )}

      <div className={gridClass}>
        {items.map((item, index) => {
          const isFeatured = isAsymmetric && (item.featured || index === 0);

          return (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className={[
                "flex flex-col gap-4 bg-white border border-gray-100 rounded-lg premium-shadow p-6",
                isFeatured ? "md:col-span-2" : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {/* Visual slot */}
              {item.visual && (
                <div
                  aria-hidden="true"
                  className={[
                    "w-full overflow-hidden rounded-md bg-vumi-pearl flex items-center justify-center",
                    isFeatured ? "min-h-[200px]" : "min-h-[120px]",
                  ].join(" ")}
                >
                  {item.visual}
                </div>
              )}

              {/* Meta */}
              <div className="flex flex-col gap-2 flex-1">
                {item.category && (
                  <span className="text-[10px] font-heading font-bold uppercase tracking-widest text-vumi-sky">
                    {item.category}
                  </span>
                )}

                <h3
                  className={[
                    "font-bold font-heading tracking-tight leading-snug text-vumi-blue text-balance",
                    isFeatured
                      ? "text-xl md:text-2xl"
                      : "text-base md:text-lg",
                  ].join(" ")}
                >
                  {item.headline}
                </h3>

                {item.body && (
                  <p className="font-sans text-sm font-light text-vumi-slate/80 leading-relaxed text-pretty">
                    {item.body}
                  </p>
                )}
              </div>

              {/* Footer slot */}
              {item.footer && (
                <div className="pt-3 border-t border-gray-100 mt-auto">
                  {item.footer}
                </div>
              )}
            </motion.article>
          );
        })}
      </div>
    </section>
  );
};
