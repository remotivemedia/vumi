'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function AnimatedKPI({
  value, label, sub,
  color = '#0033A0', warning = false,
}: {
  value: number | string;
  label: string;
  sub: string;
  color?: string;
  warning?: boolean;
}) {
  const numVal = typeof value === 'number' ? value : parseInt(String(value)) || 0;
  const isNumeric = typeof value === 'number' || !isNaN(Number(value));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isNumeric) return;
    let raf: number;
    const start = performance.now();
    const duration = 900;
    function step(now: number) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.floor(ease * numVal));
      if (p < 1) raf = requestAnimationFrame(step);
      else setDisplay(numVal);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [numVal, isNumeric]);

  const c = warning ? '#E55B4D' : color;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,51,160,0.10)' }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        background: '#fff', border: '1px solid #E2E8F0',
        borderTop: `3px solid ${c}`, borderRadius: 8,
        padding: '16px 18px', cursor: 'default',
      }}
    >
      <div style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: isNumeric && numVal < 100 ? 28 : 22, color: c, lineHeight: 1, marginBottom: 5 }}>
        {isNumeric ? display : value}
      </div>
      <div style={{ fontSize: 11, fontWeight: 600, color: '#2C3539', marginBottom: 2 }}>{label}</div>
      <div style={{ fontSize: 10, color: '#6B7785' }}>{sub}</div>
    </motion.div>
  );
}
