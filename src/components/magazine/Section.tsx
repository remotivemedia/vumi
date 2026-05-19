import React from "react";
import { motion } from "framer-motion";

interface SectionProps {
  headline: string;
  paragraphs: string[];
  visual?: React.ReactNode;
  implication?: string;
  reverse?: boolean; // Alternates left/right visual split
  delay?: number;
}

export const Section: React.FC<SectionProps> = ({
  headline,
  paragraphs,
  visual,
  implication,
  reverse = false,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="py-10 sm:py-14 border-b border-gray-100 last:border-0"
    >
      <div className={`grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start`}>
        {/* Narrative & Implication */}
        <div className={`lg:col-span-7 space-y-6 text-left ${reverse ? "lg:order-last" : ""}`}>
          <h2 className="text-2xl md:text-3xl font-bold text-vumi-blue tracking-tight font-heading leading-tight text-balance">
            {headline}
          </h2>
          
          <div className="space-y-4 text-vumi-slate font-sans text-base md:text-lg font-light leading-relaxed">
            {paragraphs.map((p, i) => (
              <p key={i} className={i === 0 ? "drop-cap" : ""}>
                {p}
              </p>
            ))}
          </div>
          
          {implication && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="bg-vumi-sky/5 border-l-4 border-vumi-sky p-4 sm:p-5 rounded-r-sm premium-shadow mt-6"
            >
              <h4 className="text-xs font-heading font-bold uppercase tracking-wider text-vumi-blue mb-1.5">
                Strategic Implication
              </h4>
              <p className="font-sans text-sm md:text-base font-semibold text-vumi-slate leading-relaxed">
                {implication}
              </p>
            </motion.div>
          )}
        </div>
        
        {/* Visual Proof */}
        {visual && (
          <div className="lg:col-span-5 w-full flex flex-col justify-center items-center">
            <div className="w-full bg-white p-4 sm:p-5 border border-gray-100 rounded-sm premium-shadow">
              {visual}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
