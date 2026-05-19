import React from "react";
import { motion } from "framer-motion";

interface VumiHeroSectionProps {
  /** Small badge/label rendered above the headline */
  badge?: string;
  /** Primary headline — keep to 1–2 lines */
  headline: string;
  /** Supporting deck copy below the headline */
  dek?: string;
  /** Optional slot for a visual, chart, or stats block */
  visual?: React.ReactNode;
  /** Optional slot for primary CTA button(s) */
  actions?: React.ReactNode;
  /** Choose between the dark gradient hero or a lighter editorial tone */
  variant?: "dark" | "light";
  /** Optional className for the outer wrapper */
  className?: string;
}

export const VumiHeroSection: React.FC<VumiHeroSectionProps> = ({
  badge,
  headline,
  dek,
  visual,
  actions,
  variant = "dark",
  className = "",
}) => {
  const isDark = variant === "dark";

  return (
    <section
      aria-label="Hero"
      className={[
        "relative overflow-hidden",
        isDark
          ? "bg-vumi-gradient text-white"
          : "bg-white text-vumi-blue border-b border-gray-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Ambient radial accents — decorative, hidden from a11y */}
      {isDark && (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_40%,rgba(0,169,224,0.18),transparent_60%)] pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute right-0 top-0 bottom-0 w-2/5 bg-[radial-gradient(ellipse_at_top_right,rgba(0,169,224,0.1),transparent_70%)] pointer-events-none"
          />
        </>
      )}

      <div className="magazine-container relative z-10 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Copy block */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {badge && (
              <motion.span
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className={[
                  "inline-block px-3 py-1 text-xs font-heading font-semibold tracking-widest uppercase rounded-sm",
                  isDark
                    ? "bg-vumi-sky/20 border border-vumi-sky/40 text-vumi-sky"
                    : "bg-vumi-sky/10 border border-vumi-sky/30 text-vumi-sky",
                ].join(" ")}
              >
                {badge}
              </motion.span>
            )}

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: "easeOut" }}
              className={[
                "text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-heading text-balance",
                isDark ? "text-white" : "text-vumi-blue",
              ].join(" ")}
            >
              {headline}
            </motion.h1>

            {dek && (
              <motion.p
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.2, ease: "easeOut" }}
                className={[
                  "text-base md:text-lg font-light leading-relaxed font-sans max-w-2xl text-pretty",
                  isDark ? "text-gray-200" : "text-vumi-slate/80",
                ].join(" ")}
              >
                {dek}
              </motion.p>
            )}

            {actions && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                className="flex flex-wrap gap-3 pt-2"
              >
                {actions}
              </motion.div>
            )}
          </div>

          {/* Visual slot */}
          {visual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.65, delay: 0.35, ease: "easeOut" }}
              className={[
                "lg:col-span-5 w-full rounded-lg overflow-hidden premium-shadow",
                isDark
                  ? "bg-white/5 backdrop-blur-md border border-white/10 p-6"
                  : "bg-vumi-pearl border border-gray-100 p-6",
              ].join(" ")}
            >
              {visual}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};
