import React from "react";
import { motion } from "framer-motion";

interface FooterProps {
  actionTitle: string;
  actionDesc: string;
  metadata: {
    label: string;
    value: string;
  }[];
  relatedPages?: {
    label: string;
    href: string;
  }[];
}

export const Footer: React.FC<FooterProps> = ({
  actionTitle,
  actionDesc,
  metadata,
  relatedPages,
}) => {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-vumi-gradient text-white py-12 md:py-16 mt-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,169,224,0.12),transparent_60%)] pointer-events-none" />
      
      <div className="magazine-container relative z-10 space-y-10">
        <div className="border-b border-white/10 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="text-left max-w-3xl space-y-2">
            <span className="text-xs font-heading font-bold uppercase tracking-widest text-vumi-sky">
              Recommended GTM Action
            </span>
            <h3 className="font-heading text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight">
              {actionTitle}
            </h3>
            <p className="font-sans text-base text-gray-300 font-light leading-relaxed max-w-2xl">
              {actionDesc}
            </p>
          </div>
          
          <button className="bg-vumi-sky hover:bg-vumi-sky/90 text-white font-heading font-semibold text-sm px-6 py-3 rounded shadow transition duration-300 transform hover:-translate-y-0.5 self-start md:self-auto shrink-0">
            Execute Strategy
          </button>
        </div>
        
        {/* Strategy Meta & Links */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start pt-4 text-left">
          {/* Metadata Block */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6">
            {metadata.map((item, index) => (
              <div key={index} className="space-y-1">
                <span className="font-heading text-xs font-bold text-vumi-sky uppercase tracking-wider">
                  {item.label}
                </span>
                <p className="font-sans text-sm font-semibold text-white">
                  {item.value}
                </p>
              </div>
            ))}
          </div>
          
          {/* Related Pages Links */}
          {relatedPages && relatedPages.length > 0 && (
            <div className="md:col-span-4 space-y-3">
              <span className="font-heading text-xs font-bold text-gray-400 uppercase tracking-wider block">
                Related Intelligence
              </span>
              <div className="flex flex-wrap gap-2">
                {relatedPages.map((page, index) => (
                  <a
                    key={index}
                    href={page.href}
                    className="font-sans text-xs font-semibold px-3 py-1.5 bg-white/5 hover:bg-white/10 border border-white/10 text-white hover:text-vumi-sky rounded transition duration-200"
                  >
                    {page.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500 font-sans gap-4">
          <p>© 2026 VUMI Spain. Compiled by ReMotive Media & La Despensa.</p>
          <p className="text-gray-400 font-medium">SECRET // FOR INTERNAL USE ONLY</p>
        </div>
      </div>
    </motion.footer>
  );
};
