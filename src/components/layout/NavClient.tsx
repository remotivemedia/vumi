'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { LayoutDashboard, Users, MapPin, Briefcase, BarChart2, Target, GitBranch, ShieldAlert, Radio, MessageSquare } from 'lucide-react';

const NAV = [
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
        const active = path === href || (href !== '/intelligence' && path?.startsWith(href));
        return (
          <Link key={href} href={href} style={{
            display:'flex', alignItems:'center', gap:9,
            padding:'8px 11px', borderRadius:6, marginBottom:1,
            color: active ? '#0033A0' : '#4A5568',
            background: active ? '#EEF2FF' : 'transparent',
            textDecoration:'none', fontSize:13, fontWeight: active ? 600 : 500,
            transition:'background 0.12s, color 0.12s',
          }}>
            <Icon size={15} style={{ color: active ? '#0033A0' : '#00A9E0', flexShrink:0 }} />
            {t(key)}
          </Link>
        );
      })}
    </nav>
  );
}
