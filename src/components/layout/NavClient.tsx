'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, MapPin, Briefcase, BarChart2, Target, GitBranch, ShieldAlert, Radio, MessageSquare, Presentation } from 'lucide-react';


const NAV = [
  { href:'/pitch-v2',                    key:'nav.pitch',        Icon:Presentation },
  { href:'/intelligence',             key:'nav.cockpit',      Icon:LayoutDashboard },
  { href:'/intelligence/audiences',   key:'nav.audiences',    Icon:Users },
  { href:'/intelligence/geography',   key:'nav.geography',    Icon:MapPin },
  { href:'/intelligence/brokers',     key:'nav.brokers',      Icon:Briefcase },
  { href:'/intelligence/competitors', key:'nav.competitors',  Icon:BarChart2 },
  { href:'/intelligence/proposition', key:'nav.proposition',  Icon:Target },
  { href:'/intelligence/roadmap',     key:'nav.roadmap',      Icon:GitBranch },
  { href:'/intelligence/gates',       key:'nav.gates',        Icon:ShieldAlert },
  { href:'/intelligence/signals',     key:'nav.signals',      Icon:Radio },
  { href:'/intelligence/ask',         key:'nav.ask',          Icon:MessageSquare },
];


export function NavClient() {
  const path = usePathname();
  const { t } = useTranslation();


  return (
    <nav style={{ flex:1, padding:'10px 8px', overflowY:'auto' }}>
      {NAV.map(({ href, key, Icon }) => {
        const active = path === href || (href !== '/intelligence' && href !== '/pitch' && path?.startsWith(href));
        return (
          <Link key={href} href={href} style={{ textDecoration:'none', display:'block', marginBottom:1 }}>
            <motion.div
              whileHover={{ x: active ? 0 : 2 }}
              transition={{ duration: 0.14, ease: 'easeOut' }}
              style={{
                position: 'relative',
