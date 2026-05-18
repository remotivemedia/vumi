import React from "react";
import { motion } from "framer-motion";

interface HeroProps {
  badge: string;
  headline: string;
  dek: string;
  children?: React.ReactNode; // For the hero visualization/chart
}

export const Hero: React.FC<HeroProps> = ({
  badge,
  headline,
  dek,
  children,
}) => {
  return (
    <div className="relative text-white overflow-hidden bg-vumi-gradient py-16 md:py-24 premium-shadow">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(0,169,224,0.15),transparent_60%)] pointer-events-none" />
      <div className="absolute right-0 bottom-0 top-0 w-1/3 bg-[radial-gradient(ellipse_at_bottom_right,rgba(0,169,224,0.1),transparent_70%)] pointer-events-none" />
      
      <div className="magazine-container relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Hero Narrative */}
          <div className="lg:col-span-7 text-left space-y-6">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-block px-3 py-1 bg-vumi-sky/20 border border-vumi-sky/40 text-vumi-sky text-xs font-semibold tracking-widest uppercase rounded-sm"
            >
              {badge}
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-heading"
            >
              {headline}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base md:text-lg text-gray-200 font-light leading-relaxed font-sans max-w-2xl"
            >
              {dek}
            </motion.p>
          </div>
          
          {/* Hero Visual Block */}
          {children && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-5 bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-lg premium-shadow w-full overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
