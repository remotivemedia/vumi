'use client'
import{useEffect,useState}from'react'
import{createClient}from'@supabase/supabase-js'
const B='#050505',W='#FFFFFF',R='#E63C1E',G='#1BB54B',BL='#0038FF',Y='#F5D400',SB='#00A9E0'
function getSupabase(){return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)}
async function fetchCounts(){const sb=getSupabase();const[b,c,g,kc,kd,sm,li]=await Promise.all([sb.from('vumi_brokers').select('*',{count:'exact',head:true}),sb.from('vumi_competitors').select('*',{count:'exact',head:true}),sb.from('vumi_geo_opportunity').select('*',{count:'exact',head:true}),sb.from('kb_chunks').select('*',{count:'exact',head:true}),sb.from('kb_documents').select('*',{count:'exact',head:true}),sb.from('vumi_signal_monitor').select('*',{count:'exact',head:true}),sb.from('live_intel').select('*',{count:'exact',head:true})]);return{brokers:b.count??20,competitors:c.count??9,cities:g.count??10,chunks:kc.count??130,docs:kd.count??37,signals:sm.count??48,intel:li.count??49}}
const TOTAL=17
export default function PitchV2(){
const[counts,setCounts]=useState({brokers:20,competitors:9,cities:10,chunks:130,docs:37,signals:48,intel:49})
const[active,setActive]=useState(1)
const[scrolled,setScrolled]=useState(false)
useEffect(()=>{fetchCounts().then(setCounts).catch(()=>{})},[])
useEffect(()=>{const onScroll=()=>setScrolled(window.scrollY>40);window.addEventListener('scroll',onScroll,{passive:true});return()=>window.removeEventListener('scroll',onScroll)},[])
return(<div style={{fontFamily:"'Barlow',Arial,sans-serif",background:B,color:W,overflowX:'hidden'}}>
<style>{`@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;700;800;900&display=swap');*{box-sizing:border-box}html{scroll-behavior:smooth}`}</style>
<nav style={{position:'fixed',top:0,left:0,right:0,zIndex:200,height:52,display:'flex',alignItems:'center',justifyContent:'space-between',padding:'0 40px',background:scrolled?'rgba(5,5,5,0.96)':'transparent',transition:'all 0.3s'}}>
<span style={{fontSize:11,fontWeight:800,letterSpacing:'0.2em',textTransform:'uppercase',color:'rgba(255,255,255,0.45)'}}>VUMI Spain</span>
<a href="/intelligence" style={{fontSize:10,color:'rgba(255,255,255,0.3)',textDecoration:'none',letterSpacing:'0.14em',textTransform:'uppercase'}}>Portal →</a>
</nav>
<div style={{position:'fixed',right:20,top:'50%',transform:'translateY(-50%)',zIndex:200,display:'flex',flexDirection:'column',gap:7}}>
{Array.from({length:TOTAL}).map((_,i)=>(
<a key={i} href={`#s${i+1}`} style={{display:'block',width:active===i+1?7:3,height:active===i+1?7:3,borderRadius:'50%',background:active===i+1?W:'rgba(255,255,255,0.18)',transition:'all 0.2s'}}/>
))}
</div>
{[
{id:1,label:'El mercado',c:R,head:'1,2 millones. Cero aseguradoras se lo disputan.',body:'El mercado de salud privada para el expat latinoamericano premium en España no tiene un líder. No todavía.',extra:<div style={{display:'flex',gap:52,marginTop:56,flexWrap:'wrap'}}>{[{v:'676.534',l:'Colombianos',c:R},{v:'~377.000',l:'Venezolanos',c:G},{v:'~160.000',l:'Mexicanos',c:BL}].map(s=><div key={s.l}><div style={{fontSize:50,fontWeight:900,color:s.c,lineHeight:1}}>{s.v}</div><div style={{fontSize:11,fontWeight:800,textTransform:'uppercase',letterSpacing:'0.1em',color:'rgba(255,255,255,0.4)',marginTop:8}}>{s.l}</div><div style={{fontSize:9,color:'rgba(255,255,255,0.2)',marginTop:4,textTransform:'uppercase',letterSpacing:'0.06em'}}>INE Padrón 2025</div></div>)}</div>},
{id:2,label:'El target',c:G,head:'No son inmigrantes. Son el profesional más cualificado que llega a España en dos décadas.',body:'Renta familiar >€60–80k. Clase liberal, directiva, tecnológica. Familia en dos países. Digital-first.'},
{id:3,label:'El gap de producto',c:Y,head:'Tienen familia en dos países. No existe un seguro español que lo resuelva.',body:'VUMI ya tiene el producto correcto — IPMI + cobertura transnacional. El problema: nadie en España lo está comunicando a quien lo necesita.'},
{id:4,label:'Comportamiento de compra',c:BL,head:'No compran por publicidad. Compran por recomendación dentro de su comunidad.',body:'WhatsApp → validación en creadores → búsqueda long-tail → conversión por broker o asociación de confianza.'},
{id:5,label:'Gap competitivo',c:R,head:'Sus competidores llevan una década mirando al lado equivocado.',body:'Sanitas · Adeslas · Bupa · Cigna · Allianz — ninguno tiene estrategia activa para el expat latinoamericano premium.'},
{id:6,label:'La ventana',c:R,head:'DKV acaba de cambiar todas sus agencias. La ventana: seis meses.',body:'"El primero en llegar define el segmento para cinco años. El segundo paga el triple por el mismo cliente."'},
{id:7,label:'El coste de esperar',c:Y,head:'Cada mes sin VUMI es SOV que otro puede acumular.',body:'250–400k target premium. >€2.000 ARPU/año. €500M+ pool de mercado. El coste de esperar no es cero.'},
{id:8,label:'Gap de canales',c:R,head:'Diez canales con coste de entrada mínimo. Competencia en todos: cero.',body:'Radio latina · WhatsApp Business · Meta Groups LATAM · AEO/LLMs · Google long-tail · DOOH · Creadores · Podcast · Remesadoras · Iglesias'},
{id:9,label:'Mix de medios',c:G,head:'Un plan construido desde el gap competitivo, no desde la plantilla.',body:'30% Digital performance · 15% Branded content · 15% Creadores latinos · 10% Radio latina · 8% Eventos · 8% DOOH · 7% CTV · 4% WhatsApp CRM · 3% AEO'},
{id:10,label:'El business case',c:G,head:'El modelo ya cierra desde el día uno.',body:'CPL Search <€40 · CPL Social <€20 · CAC objetivo €300–600 · ARPU >€2.000/año'},
{id:11,label:'La creatividad',c:R,head:'Cuando AEGON decidió que su seguro de salud dejara de parecer un seguro, llamaron a La Despensa.',body:'#Cariñoterapia es la referencia de tono para VUMI. 23 años · 32 personas · 6ª mejor agencia España (SCOPEN 2022).'},
{id:12,label:'La inteligencia',c:BL,head:'ReMotive construyó el portal de inteligencia de VUMI España antes de recibir el brief.',body:`${counts.brokers} brokers catalogados · ${counts.competitors} competidores · ${counts.docs} docs · ${counts.chunks} chunks RAG en vivo · ${counts.signals} señales monitorizadas`},
{id:13,label:'Prueba de trabajo',c:BL,head:'No pedimos que confíen. Esto ya existe y funciona.',body:'Supabase + RAG · Señales semanales automáticas · Voice agent ElevenLabs en vivo · Geo + broker layer activo'},
{id:14,label:'Fase 01 · Meses 1–3',c:R,head:'VUMI presente antes de que los competidores reaccionen.',body:'Plataforma creativa + formato hero · Radio latina + Meta LATAM · 5–10 micro-creadores · Primeras conversiones broker'},
{id:15,label:'Fase 02 · Meses 4–6',c:G,head:'Los 10 canales sin contestar, todos activados.',body:'DOOH: Usera, Raval, Ruzafa, T4 · PR branded content medios LATAM · Google Search + WhatsApp CRM · Lead magnet guía salud expat'},
{id:16,label:'Fase 03 · Meses 7–12',c:BL,head:'VUMI líder del segmento expat premium en España.',body:'CTV: Prime Video + DAZN · Materiales canal broker · Wave 2: Argentinos, Peruanos, Costa del Sol · SOV LLM salud expat consolidado'},
{id:17,label:'Siguiente paso',c:W,head:'Una sesión. El brief se construye juntos.',body:'No una presentación formal. Una sesión de trabajo de 90 minutos. El portal ya corre. Empezamos de inmediato.',isClose:true},
].map(slide=>(
<section key={slide.id} data-slide={slide.id} id={`s${slide.id}`} style={{minHeight:'100vh',display:'flex',flexDirection:'column',justifyContent:'center',background:slide.id%2===0?'#070707':B,padding:'0 56px',borderTop:slide.id===1?'none':slide.id===6?`3px solid ${R}`:slide.id===17?`3px solid ${W}`:'1px solid rgba(255,255,255,0.05)',scrollMarginTop:52}} onMouseEnter={()=>setActive(slide.id)}>
<div style={{maxWidth:1140,margin:'0 auto',width:'100%',paddingTop:80,paddingBottom:80}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:32,flexWrap:'wrap',gap:12}}>
<div style={{display:'flex',alignItems:'center',gap:10}}><span style={{display:'block',width:24,height:2,background:slide.c}}/><span style={{fontSize:10,fontWeight:800,letterSpacing:'0.22em',textTransform:'uppercase',color:slide.c}}>{slide.label}</span></div>
<div style={{display:'flex',alignItems:'baseline',gap:3}}><span style={{fontSize:12,fontWeight:900,color:'rgba(255,255,255,0.6)'}}>{String(slide.id).padStart(2,'0')}</span><span style={{fontSize:10,color:'rgba(255,255,255,0.18)'}}>/{String(TOTAL).padStart(2,'0')}</span></div>
</div>
{slide.id===1?<h1 style={{fontSize:'clamp(56px,9vw,140px)',fontWeight:900,lineHeight:0.87,letterSpacing:'-0.03em',textTransform:'uppercase',margin:'0 0 40px'}}>{slide.head.split('. ').map((part,i)=><span key={i} style={{display:'block',color:i===0?W:i===1?R:'rgba(255,255,255,0.2)'}}>{part}{i<2?'.':''}</span>)}</h1>:<h2 style={{fontSize:'clamp(32px,4.8vw,68px)',fontWeight:900,lineHeight:0.91,letterSpacing:'-0.025em',textTransform:'uppercase',marginBottom:36,maxWidth:820}}>{slide.head}</h2>}
<p style={{maxWidth:580,fontSize:slide.id===17?18:15,color:'rgba(255,255,255,0.45)',lineHeight:1.7,marginBottom:32}}>{slide.body}</p>
{(slide as any).extra}
{slide.id===17&&<div style={{display:'flex',gap:12,flexWrap:'wrap',marginTop:20}}>
<a href="mailto:alex@rmtv.io" style={{display:'inline-flex',alignItems:'center',background:W,color:B,padding:'16px 36px',fontWeight:900,fontSize:11,letterSpacing:'0.14em',textTransform:'uppercase',textDecoration:'none'}}>ReMotive Media</a>
<a href="mailto:hola@ladespensa.es" style={{display:'inline-flex',alignItems:'center',background:'transparent',color:R,padding:'16px 36px',fontWeight:900,fontSize:11,letterSpacing:'0.14em',textTransform:'uppercase',border:`2px solid ${R}`,textDecoration:'none'}}>La Despensa</a>
<a href="/intelligence" style={{display:'inline-flex',alignItems:'center',background:'transparent',color:'rgba(255,255,255,0.4)',padding:'16px 32px',fontWeight:700,fontSize:11,letterSpacing:'0.14em',textTransform:'uppercase',border:'1px solid rgba(255,255,255,0.14)',textDecoration:'none'}}>Portal →</a>
</div>}
</div>
</section>
))}
</div>)
}