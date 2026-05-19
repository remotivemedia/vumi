import React from "react";
import { motion } from "framer-motion";

interface VumiFeatureCardProps {
  /** Short uppercase label shown above the title */
  label?: string;
  /** Card title */
  title: string;
  /** Supporting body copy */
  description: string;
  /** Optional icon or small visual element (16–24px) */
  icon?: React.ReactNode;
  /** Optional slot for a footer link or CTA */
  footer?: React.ReactNode;
  /**
   * "default"  — white card, editorial shadow
   * "elevated" — white card with pronounced hover lift
   * "tinted"   — vumi-pearl background with left accent border
   * "dark"     — dark gradient, white text
   */
  variant?: "default" | "elevated" | "tinted" | "dark";
  /** Animation stagger delay in seconds */
  delay?: number;
  /** Optional additional className */
  className?: string;
}

const variantStyles: Record<
  NonNullable<VumiFeatureCardProps["variant"]>,
  { wrapper: string; label: string; title: string; description: string }
> = {
  default: {
    wrapper: "bg-white border border-gray-100 rounded-lg premium-shadow",
    label: "text-vumi-sky",
    title: "text-vumi-blue",
    description: "text-vumi-slate/80",
  },
  elevated: {
    wrapper:
      "bg-white border border-gray-100 rounded-lg shadow-premium hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-300",
    label: "text-vumi-sky",
    title: "text-vumi-blue",
    description: "text-vumi-slate/80",
  },
  tinted: {
    wrapper:
      "bg-vumi-pearl border-l-4 border-vumi-sky border-y border-r border-gray-100 rounded-r-lg pl-5 pr-6 premium-shadow",
    label: "text-vumi-sky",
    title: "text-vumi-blue",
    description: "text-vumi-slate/80",
  },
  dark: {
    wrapper: "bg-vumi-gradient rounded-lg premium-shadow overflow-hidden",
    label: "text-vumi-sky",
    title: "text-white",
    description: "text-gray-200",
  },
};

export const VumiFeatureCard: React.FC<VumiFeatureCardProps> = ({
  label,
  title,
  description,
  icon,
  footer,
  variant = "default",
  delay = 0,
  className = "",
}) => {
  const styles = variantStyles[variant];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`${styles.wrapper} p-6 flex flex-col gap-4 ${className}`}
    >
      {/* Header row: icon + label */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-2 flex-1">
          {label && (
            <span
              className={`text-[10px] font-heading font-bold uppercase tracking-widest ${styles.label}`}
            >
              {label}
            </span>
          )}
          <h3
            className={`text-base md:text-lg font-bold font-heading tracking-tight leading-snug ${styles.title}`}
          >
            {title}
          </h3>
        </div>
        {icon && (
          <div
            aria-hidden="true"
            className={`shrink-0 mt-0.5 ${
              variant === "dark" ? "text-vumi-sky" : "text-vumi-sky"
            }`}
          >
            {icon}
          </div>
        )}
      </div>

      {/* Body */}
      <p
        className={`font-sans text-sm font-light leading-relaxed flex-1 ${styles.description}`}
      >
        {description}
      </p>

      {/* Footer slot */}
      {footer && <div className="pt-2 border-t border-white/10">{footer}</div>}
    </motion.article>
  );
};
