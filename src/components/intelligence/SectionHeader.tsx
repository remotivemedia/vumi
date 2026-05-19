import React from "react";
import { motion } from "framer-motion";

interface SectionHeaderProps {
  eyebrow?: string;
  headline: string;
  dek?: string;
  delay?: number;
  border?: boolean;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  eyebrow,
  headline,
  dek,
  delay = 0,
  border = true,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`text-left space-y-2 ${border ? "pb-5 border-b border-gray-100" : ""}`}
    >
      {eyebrow && (
        <div className="flex items-center gap-2.5">
          <span className="w-4 h-px bg-vumi-sky" />
          <span className="font-heading text-[10px] font-bold uppercase tracking-[0.2em] text-vumi-sky">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-heading text-xl md:text-2xl font-bold text-vumi-blue tracking-tight leading-tight">
        {headline}
      </h2>
      {dek && (
        <p className="font-sans text-sm text-gray-500 font-light leading-relaxed max-w-3xl">
          {dek}
        </p>
      )}
    </motion.div>
  );
};
