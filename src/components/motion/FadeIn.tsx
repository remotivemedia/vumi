'use client';
import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function FadeIn({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.16, 1, 0.3, 1] }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function StaggerList({ children }: { children: ReactNode }) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 12 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
      }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({ children, style }: { children: ReactNode; style?: React.CSSProperties }) {
  return (
    <motion.div
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,51,160,0.10)' }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
      style={style}
    >
      {children}
    </motion.div>
  );
}
