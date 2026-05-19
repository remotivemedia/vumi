import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  badge: string;
  headline: string;
  dek: string;
  children?: React.ReactNode;
}

export const Hero: React.FC<HeroProps> = ({ badge, headline, dek, children }) => {
  return (
    <div className="relative text-white overflow-hidden bg-vumi-gradient">
      {/* Cinematic top rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-vumi-sky/40" />

      {/* Ambient light effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_50%,rgba(0,169,224,0.12),transparent_55%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_20%,rgba(0,51,160,0.2),transparent_50%)] pointer-events-none" />

      <div className="magazine-container relative z-10 py-20 md:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center">

          {/* Hero Narrative */}
          <div className="lg:col-span-7 text-left space-y-7">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex items-center gap-3"
            >
              <span className="w-5 h-px bg-vumi-sky" />
              <span className="font-heading text-[11px] font-bold tracking-[0.2em] uppercase text-vumi-sky">
                {badge}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="font-heading text-4xl md:text-5xl lg:text-[3.25rem] font-bold tracking-tight text-white leading-[1.1]"
            >
              {headline}
            </motion.h1>

            {/* Hairline divider */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.25, ease: "easeOut" }}
              className="origin-left h-px w-16 bg-vumi-sky/60"
            />

            {/* Dek */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="font-sans text-base md:text-lg text-gray-300 font-light leading-relaxed max-w-xl"
            >
              {dek}
            </motion.p>
          </div>

          {/* Hero Visual Block */}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 bg-white/[0.04] backdrop-blur-sm border border-white/10 p-7 rounded-sm w-full overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>

      {/* Bottom fade rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-white/5" />
    </div>
  );
};
