import React from "react";
import { motion } from "framer-motion";

interface VumiSectionHeaderProps {
  /** Small badge/label displayed above the title */
  badge?: string;
  /** Main section title */
  title: string;
  /** Optional subtitle or description text */
  subtitle?: string;
  /** Text alignment - defaults to left for editorial consistency */
  align?: "left" | "center";
  /** Animation delay in seconds */
  delay?: number;
  /** Optional className for additional styling */
  className?: string;
}

export const VumiSectionHeader: React.FC<VumiSectionHeaderProps> = ({
  badge,
  title,
  subtitle,
  align = "left",
  delay = 0,
  className = "",
}) => {
  const alignmentClasses = align === "center" ? "text-center items-center" : "text-left items-start";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`flex flex-col space-y-3 ${alignmentClasses} ${className}`}
    >
      {badge && (
        <span className="inline-block px-3 py-1 bg-vumi-sky/10 border border-vumi-sky/30 text-vumi-sky text-xs font-heading font-semibold tracking-widest uppercase rounded-sm">
          {badge}
        </span>
      )}

      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-vumi-blue tracking-tight font-heading leading-tight text-balance">
        {title}
      </h2>

      {subtitle && (
        <p className="text-base md:text-lg text-vumi-slate/80 font-sans font-light leading-relaxed max-w-3xl text-pretty">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
