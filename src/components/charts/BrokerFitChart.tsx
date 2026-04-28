'use client';
// BrokerFitChart â horizontal bar chart, fit_score from vumi_brokers
// Additive component. Import and place in /brokers page.
// Data: live Supabase fetch, no hardcoded values.\n
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
type Broker={name:string;fit_score:number;outreach_priority:string;latam_focus:boolean;vip_hnw_focus:boolean};
const PC:Record<string,string>={p0:'#0033A0'p1:'#00A9E0'p2:'#6B7280',p3:'#D1D5DB'};
const PL:Record<string,string>={p0:'P0',p1:'P1',p2:'P2',p3:'P3'};
export function BrokerFitChart({lang='es'}:{lang?:'es'|'en'}){
const [brokers,setBrokers]=useState<Broker[]>([]);
const [loading,setLoading]=useState(true);
useEffect(()=>{sb.from('vumi_brokers').select('name,fit_score,outreach_priority,latam_focus,vip_hnw_focus').order('fit_score',{ascending:false}).limit(15).then(({data})=>{setBrokers((data??[]) as Broker[]);setLoading(false);});},[]);
if(loading)return(<div className="animate-pulse space-y-2">{[...Array(8)].map((_,i)=><div key={i} className="h-7 bg-gray-100 rounded"/>)}</div> );
const avg=brokers.length?Math.round(brokers.reduce((a,b)=>a+b.fit_score,0)/brokers.length):0;
const insight=lang==='es'?`${brokers.filter(b=>b.outreach_priority==='p0').length} P0 Â· score medio ${avg}/100`:`${brokers.filter(b=>b.outreach_priority==='p0').length} P0 Â· avg ${avg}/100`;
return(<div className="space-y-1">{brokers.map(b=>(<div key={b.name} className="flex items-center gap-3"><span className="text-xs font-medium w-6 text-center" style={{color:PC[b.outreach_priority]??'6B7280'}}>{PL[b.outreach_priority]??b.outreach_priority}</span><span className="text-xs text-gray-600 w-48 truncate">{b.name}</span><div className="flex-1 h-5 bg-gray-100 rounded overflow-hidden"><div className="h-full rounded" style={{width:`${b.fit_score}%`,backgroundColor:PC[b.outreach_priority]??'#6B7280',opacity:0.85}}/></div><span className="text-xs font-medium text-gray-700 w-8 text-right">{b.fit_score}</span><div className="flex gap-1 w-8">{b.latam_focus&&<span>ð</span>}{b.vip_hnw_focus&&<span>ð</span>}</div></div>))}<p className="text-xs text-gray-400 mt-3 pt-2 border-t border-gray-100">{insight}</p></div>);
}
