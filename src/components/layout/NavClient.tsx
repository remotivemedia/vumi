'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, MapPin, Briefcase, BarChart2, Target, GitBranch, ShieldAlert, Radio, MessageSquare } from 'lucide-react';

const NAV = [
  { href:'/intelligence',             label:'Cockpit',         Icon:LayoutDashboard },
  { href:'/intelligence/audiences',   label:'Audiencias',      Icon:Users },
  { href:'/intelligence/geography',   label:'Geografía',       Icon:MapPin },
  { href:'/intelligence/brokers',     label:'Brokers',         Icon:Briefcase },
  { href:'/intelligence/competitors', label:'Competidores',    Icon:BarChart2 },
  { href:'/intelligence/proposition', label:'Propuesta',       Icon:Target },
  { href:'/intelligence/roadmap',     label:'Roadmap',         Icon:GitBranch },
  { href:'/intelligence/gates',       label:'Gates & Gaps',    Icon:ShieldAlert },
  { href:'/intelligence/signals',     label:'Señales',         Icon:Radio },
  { href:'/intelligence/ask',         label:'Ask VUMI',        Icon:MessageSquare },
];

export function NavClient() {
  const path = usePathname();
  return (
    <nav style={{ flex:1, padding:'10px 8px', overflowY:'auto' }}>
      {NAV.map(({ href, label, Icon }) => {
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
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
