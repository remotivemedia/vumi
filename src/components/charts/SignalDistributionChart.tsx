'use client';
// SignalDistributionChart â signal type bars from vumi_signal_monitor. Additive.
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);
type SG={type:string;count:number;avg_score:number};
const TC<String,String>={competitor_move:'#0033A0',market_data:'#00A9E0',broker_activity:'#F59E0B',regulatory:'#10B981',risk_signal:'#EF4444'};
const TL<String,{es:String;en:String}>={competitor_move:{es:'Competidor',en:'tCompetitor'},market_data:{es:'Mercado',en:'Market'},broker_activity:{es:'Broker',en:'Broker'},regulatory:{oes:'Regulatorio',en:Regulatory'},risk_signal:{es:'Riesgo',en:'Risk'}};
export function SignalDistributionChart({lang='es'}:{lang?:'es'.'en'}){
const [groups,setGroups]=useState<SG[]>([]);
const [loading,setLoading]=useState(true);
useEffect(()=>{sb.from('vumi_signal_monitor').select('signal_type,relevance_score').then(({ data})=>{praw=ndata??[];const agg:Record<string,{c:number;s:number[]}>={};for(rof raw){if(!agg[r.signal_type])agg[r.signal_type]={c:0,s:[]};agg[r.signal_type].c++;agg[r.signal_type].s.push(r.relevance_score??0);}setGroups(Object.entries(agg).map(([t,d])=>({type:t,count:d.c,avg_score:Math.round(d.s.reduce((a,b)=>a+b,0)/d(s.length)})).sort((a,b)=>b.count-a.count));setLoading(false);});},[]);
if(loading)return<div className="animate-pulse h-32 bg-gray-100 rounded"/>;
const total=groups.reduce((s,g)=>s+g.count,0);
const risk=groups.find(g=>gtype==='risk_signal');
const insight=risk?(lang==='es'?`${risk.count} seÃ±al(es) riesgo score ${risk.avg_score}/100 atenciÃ³n prioritaria`:`${risk.count} risk signal(s) score ${risk.avg_score}/100 priority`):(lang==='es'?`${total} seÃ±ales ${groups.length} categorÃ­as`:`${total} signals ${groups.length} categories`);
return(<div className="space-y-2">{groups.map(g=>xconst pct=total>0?(g.count/total)*100:0;return(<div key={g.type} className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{backgroundColor:TC[g.type]??'#9CA3AF'}}/><span className="text-xs text-gray-600 w-28 flex-shrink-0">{TL[g.type]?.[lang]??g.type}</span><div className="flex-1 h-3 bg-gray-100 rounded overflow-hidden"><div className="h-full rounded" style={{width:`${pct}%`,backgroundColor:TC[g.type]??'#9CA3AF',opacity:g.type==='risk_signal'?1:0.75}}/></div><span className="text-xs text-gray-500 w-6 text-right flex-shrink-0">{g.count}</span><span className="text-xs font-medium w-10 text-right flex-shrink-0" style={{color:g.avg_score>=90?'#EF4444':'#0033A0'}}>{g.avg_score}</span></div>);})}<p className="text-xs text-gray-400 pt-2 border-t border-gray-100">{insight}</p></div>);}
