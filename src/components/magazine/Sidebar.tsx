import React from "react";
import { motion } from "framer-motion";

interface SidebarProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  title,
  children,
  delay = 0.2,
}) => {
  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className="space-y-8 lg:sticky lg:top-8 self-start"
    >
      <div className="border-b-2 border-vumi-blue pb-3 text-left">
        <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-vumi-blue">
          {title}
        </h3>
      </div>
      <div className="space-y-6 text-left">
        {children}
      </div>
    </motion.aside>
  );
};

interface WhatThisMeansProps {
  title?: string;
  points: string[];
}

export const WhatThisMeans: React.FC<WhatThisMeansProps> = ({
  title = "What This Means",
  points,
}) => {
  return (
    <div className="bg-vumi-blue text-white p-6 border border-vumi-blue/10 rounded-lg premium-shadow space-y-4">
      <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-vumi-sky">
        {title}
      </h4>
      <ul className="space-y-3 font-sans text-sm font-light leading-relaxed">
        {points.map((p, i) => (
          <li key={i} className="flex items-start gap-2">
            <span className="text-vumi-sky font-bold mt-0.5">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
