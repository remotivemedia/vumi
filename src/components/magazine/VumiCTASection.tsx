import React from "react";
import { motion } from "framer-motion";

interface VumiCTASectionProps {
  /** Eyebrow label above the heading */
  badge?: string;
  /** Main CTA heading */
  heading: string;
  /** Supporting body copy */
  body?: string;
  /** Primary action slot — pass a <button> or <a> */
  primaryAction?: React.ReactNode;
  /** Secondary action slot */
  secondaryAction?: React.ReactNode;
  /**
   * "dark"  — full-width deep gradient (default)
   * "light" — white panel with sky accent border top
   * "accent"— sky-blue gradient
   */
  variant?: "dark" | "light" | "accent";
  /** Optional className override */
  className?: string;
}

export const VumiCTASection: React.FC<VumiCTASectionProps> = ({
  badge,
  heading,
  body,
  primaryAction,
  secondaryAction,
  variant = "dark",
  className = "",
}) => {
  const wrapperStyles: Record<string, string> = {
    dark: "bg-vumi-gradient text-white",
    light: "bg-white border-t-4 border-vumi-sky text-vumi-blue",
    accent: "bg-magazine-accent text-white",
  };

  const badgeStyles: Record<string, string> = {
    dark: "bg-vumi-sky/20 border-vumi-sky/40 text-vumi-sky",
    light: "bg-vumi-sky/10 border-vumi-sky/30 text-vumi-sky",
    accent: "bg-white/20 border-white/40 text-white",
  };

  const bodyStyles: Record<string, string> = {
    dark: "text-gray-200",
    light: "text-vumi-slate/80",
    accent: "text-white/90",
  };

  const isDark = variant !== "light";

  return (
    <section
      aria-label="Call to action"
      className={[
        "relative overflow-hidden",
        wrapperStyles[variant],
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Decorative ambient radial for dark/accent variants */}
      {isDark && (
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(0,169,224,0.15),transparent_55%)] pointer-events-none"
        />
      )}

      <div className="magazine-container relative z-10 py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-center text-center gap-6 max-w-3xl mx-auto"
        >
          {badge && (
            <span
              className={`inline-block px-3 py-1 text-xs font-heading font-semibold tracking-widest uppercase rounded-sm border ${badgeStyles[variant]}`}
            >
              {badge}
            </span>
          )}

          <h2
            className={[
              "text-3xl md:text-4xl lg:text-5xl font-bold font-heading tracking-tight leading-tight text-balance",
              isDark ? "text-white" : "text-vumi-blue",
            ].join(" ")}
          >
            {heading}
          </h2>

          {body && (
            <p
              className={`text-base md:text-lg font-sans font-light leading-relaxed max-w-2xl text-pretty ${bodyStyles[variant]}`}
            >
              {body}
            </p>
          )}

          {(primaryAction || secondaryAction) && (
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              {primaryAction}
              {secondaryAction}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
