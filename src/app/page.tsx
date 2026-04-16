"use client";
import { useEffect, useState } from "react";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [lang, setLang] = useState<"es"|"en">("es");

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const es = {
    badge: "Cobertura de salud premium · Europa",
    h1a: "Tu salud no",
    h1b: "espera fronteras.",
    sub: "VUMI ofrece seguro médico premium para latinoamericanos en Europa. Eliges cuándo, con quién y dónde te tratas — en cualquier país del mundo.",
    cta1: "Solicitar cobertura",
    cta2: "Hablar con un broker",
    nav: ["Cobertura", "Para quién", "Cómo funciona", "Contacto"],
    s1v:"+12",s1l:"años operando",s2v:"4",s2l:"continentes",s3v:"24/7",s3l:"asistencia",s4v:"100%",s4l:"libre elección",
    who_label:"PARA QUIÉN",
    who_h:"Hecho para quienes\nviven entre dos mundos.",
    who_p:"VUMI nació en Latinoamérica. Entendemos que cuando llegas a Europa no quieres renunciar a la calidad de atención que conoces — ni depender de listas de espera interminables.",
    p1t:"El profesional en movimiento",p1b:"Vives entre Madrid, Miami y Bogotá. Tu trabajo no espera y tú tampoco. Necesitas cobertura que te siga a donde tú vayas.",
    p2t:"El que sabe lo que quiere",p2b:"Llevas tiempo en España. Conoces el sistema. Sabes que con VUMI eliges especialista, clínica y fecha — sin intermediarios del sistema público.",
    how_label:"CÓMO FUNCIONA",how_h:"Sin sorpresas.\nSin burocracia.",
    steps:[
      {n:"01",t:"Habla con un broker",b:"Te ponemos en contacto con un especialista VUMI que entiende tu situación y te asesora sin compromiso."},
      {n:"02",t:"Elige tu plan",b:"Cobertura individual, familiar o corporativa. Adaptada a tu perfil migratorio y estilo de vida."},
      {n:"03",t:"Activa tu póliza",b:"En menos de 48 horas tienes acceso completo. App, tarjeta y línea de asistencia en español."},
      {n:"04",t:"Te cuidas donde quieras",b:"Red de clínicas en España, Portugal, Grecia, Chipre e Italia. Y cobertura global cuando sales de Europa."},
    ],
    cov_label:"COBERTURA",cov_h:"Premium significa\nelección total.",
    covs:[
      {icon:"✦",t:"Libre elección de médico",b:"Cualquier especialista, cualquier clínica. Privada, concertada o pública de alto nivel."},
      {icon:"◈",t:"Cobertura multinacional",b:"España, Portugal, Grecia, Chipre e Italia en Fase 2. Cobertura viaje incluida."},
      {icon:"◉",t:"Cirugía sin espera",b:"Programa tu operación cuando tú decides. Nada de listas de espera de 18 meses."},
      {icon:"◎",t:"Asistencia 24/7 en español",b:"Atención en tu idioma, con tu cultura. Porque los matices importan cuando estás enfermo."},
      {icon:"⬡",t:"Pólizas corporativas",b:"Para empresas que traen talento de LATAM o tienen equipos distribuidos entre España y el mundo."},
      {icon:"◆",t:"Travel insurance",b:"Cada viaje cubierto. Tanto si viajas por trabajo como si vuelves a ver a tu familia."},
    ],
    form_label:"ACCESO ANTICIPADO",form_h:"Habla con\nun especialista.",
    form_p:"Estamos en fase de lanzamiento en España. Nuestro equipo de brokers se pone en contacto contigo en menos de 24 horas.",
    fn:"Nombre",fe:"Email",fc:"País de residencia",fm:"¿Qué necesitas cubrir?",fb:"Solicitar información →",ff:"Sin compromiso. Te responde una persona real.",
    ticker:["COBERTURA PREMIUM","LIBRE ELECCIÓN","SIN LISTAS DE ESPERA","VENEZOLANOS EN EUROPA","COLOMBIANOS EN EUROPA","PÓLIZAS INDIVIDUALES","PÓLIZAS CORPORATIVAS","TRAVEL INSURANCE"],
    live:"Aceptando nuevos clientes en España",
    footer_by:"por ReMotive Media",footer_copy:"© 2026 VUMI · Malta · Dinamarca · Madrid",
    flinks:["Política de privacidad","Aviso legal","Contacto"],
  };

  const en = {
    badge:"Premium health coverage · Europe",
    h1a:"Your health has",h1b:"no borders.",
    sub:"VUMI offers premium medical insurance for Latin Americans in Europe. Choose when, with whom, and where you get treated — anywhere in the world.",
    cta1:"Get covered",cta2:"Talk to a broker",
    nav:["Coverage","Who it's for","How it works","Contact"],
    s1v:"+12",s1l:"years operating",s2v:"4",s2l:"continents",s3v:"24/7",s3l:"assistance",s4v:"100%",s4l:"free choice",
    who_label:"WHO IT'S FOR",
    who_h:"Made for those who\nlive between two worlds.",
    who_p:"VUMI was born in Latin America. We understand that when you arrive in Europe, you don't want to give up the quality of care you're used to — or depend on endless waiting lists.",
    p1t:"The professional on the move",p1b:"You live between Madrid, Miami and Bogotá. Your work doesn't wait and neither do you. You need coverage that follows you wherever you go.",
    p2t:"The one who knows what they want",p2b:"You've been in Spain a while. You know the system. You know that with VUMI you choose your specialist, clinic and date — no gatekeepers.",
    how_label:"HOW IT WORKS",how_h:"No surprises.\nNo bureaucracy.",
    steps:[
      {n:"01",t:"Talk to a broker",b:"We connect you with a VUMI specialist who understands your situation and advises you with no commitment."},
      {n:"02",t:"Choose your plan",b:"Individual, family or corporate coverage. Tailored to your migratory profile and lifestyle."},
      {n:"03",t:"Activate your policy",b:"Full access in under 48 hours. App, card and Spanish-language assistance line."},
      {n:"04",t:"Get care wherever you are",b:"Clinic network in Spain, Portugal, Greece, Cyprus and Italy. Global coverage when you leave Europe."},
    ],
    cov_label:"COVERAGE",cov_h:"Premium means\ntotal choice.",
    covs:[
      {icon:"✦",t:"Free choice of doctor",b:"Any specialist, any clinic. Private, semi-private or top-tier public."},
      {icon:"◈",t:"Multinational coverage",b:"Spain, Portugal, Greece, Cyprus and Italy in Phase 2. Travel insurance included."},
      {icon:"◉",t:"Surgery without waiting",b:"Schedule your procedure when you decide. No 18-month waiting lists."},
      {icon:"◎",t:"24/7 assistance in Spanish",b:"Care in your language, with your culture. Because nuance matters when you're unwell."},
      {icon:"⬡",t:"Corporate policies",b:"For companies bringing Latin talent to Europe or with distributed teams across Spain and the world."},
      {icon:"◆",t:"Travel insurance",b:"Every trip covered. Whether travelling for work or going home to see family."},
    ],
    form_label:"EARLY ACCESS",form_h:"Talk to\na specialist.",
    form_p:"We are in launch phase in Spain. Our broker team will contact you within 24 hours.",
    fn:"Name",fe:"Email",fc:"Country of residence",fm:"What do you need covered?",fb:"Request information →",ff:"No commitment. A real person will reply.",
    ticker:["PREMIUM COVERAGE","FREE CHOICE","NO WAITING LISTS","VENEZUELANS IN EUROPE","COLOMBIANS IN EUROPE","INDIVIDUAL POLICIES","CORPORATE POLICIES","TRAVEL INSURANCE"],
    live:"Accepting new clients in Spain",
    footer_by:"by ReMotive Media",footer_copy:"© 2026 VUMI · Malta · Denmark · Madrid",
    flinks:["Privacy policy","Legal notice","Contact"],
  };

  const t = lang === "es" ? es : en;

  return (
    <main style={{background:"#F8F5F0",color:"#1A1208",fontFamily:"'DM Sans','Helvetica Neue',sans-serif",overflowX:"hidden"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500;1,600&family=JetBrains+Mono:wght@400;500&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        .corm{font-family:'Cormorant Garamond',Georgia,serif}
        .mono{font-family:'JetBrains Mono',monospace}
        @keyframes fadeUp{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:translateY(0)}}
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        @keyframes pulse{0%,100%{opacity:.5}50%{opacity:1}}
        .fu{animation:fadeUp .85s ease forwards;opacity:0}
        .d1{animation-delay:.05s}.d2{animation-delay:.2s}.d3{animation-delay:.35s}.d4{animation-delay:.5s}.d5{animation-delay:.65s}
        .btn-p{display:inline-flex;align-items:center;gap:8px;padding:15px 34px;border-radius:4px;background:#C8441A;color:#fff;font-family:'DM Sans',sans-serif;font-weight:600;font-size:15px;text-decoration:none;border:none;cursor:pointer;transition:all .2s;letter-spacing:.01em}
        .btn-p:hover{background:#A83510;transform:translateY(-1px);box-shadow:0 8px 24px rgba(200,68,26,.3)}
        .btn-g{display:inline-flex;align-items:center;gap:8px;padding:14px 30px;border-radius:4px;background:transparent;color:#1A1208;font-family:'DM Sans',sans-serif;font-weight:500;font-size:15px;text-decoration:none;border:1.5px solid rgba(26,18,8,.2);cursor:pointer;transition:all .2s}
        .btn-g:hover{border-color:#C8441A;color:#C8441A}
        .nl{color:rgba(26,18,8,.5);text-decoration:none;font-size:14px;font-weight:500;transition:color .2s}
        .nl:hover{color:#C8441A}
        .cc{padding:30px 26px;border:1px solid rgba(26,18,8,.08);border-radius:8px;background:white;transition:all .25s}
        .cc:hover{border-color:rgba(200,68,26,.3);box-shadow:0 8px 32px rgba(0,0,0,.06);transform:translateY(-3px)}
        .sc{display:flex;gap:24px;align-items:flex-start;padding:30px 0;border-bottom:1px solid rgba(26,18,8,.08)}
        .sc:last-child{border-bottom:none}
        input,textarea{width:100%;background:white;border:1.5px solid rgba(26,18,8,.12);border-radius:6px;padding:13px 16px;color:#1A1208;font-family:'DM Sans',sans-serif;font-size:15px;outline:none;transition:border-color .2s;-webkit-appearance:none}
        input:focus,textarea:focus{border-color:#C8441A}
        input::placeholder,textarea::placeholder{color:rgba(26,18,8,.3)}
        .sl{font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:.2em;color:#C8441A;margin-bottom:14px}
        @media(max-width:768px){
          .hg,.wg,.hg2{grid-template-columns:1fr!important}
          .sg{grid-template-columns:repeat(2,1fr)!important}
          .cg{grid-template-columns:1fr!important}
          .fg{grid-template-columns:1fr!important}
          .navl{display:none!important}
          .fi{flex-direction:column!important;text-align:center}
          nav{padding:0 20px!important}
          section,footer{padding-left:20px!important;padding-right:20px!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position:"fixed",top:0,left:0,right:0,zIndex:100,
        display:"flex",alignItems:"center",justifyContent:"space-between",
        padding:"0 48px",height:"68px",
        background:scrollY>30?"rgba(248,245,240,.95)":"transparent",
        backdropFilter:scrollY>30?"blur(16px)":"none",
        borderBottom:scrollY>30?"1px solid rgba(26,18,8,.08)":"none",
        transition:"all .35s",
      }}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:32,height:32,borderRadius:"50%",background:"linear-gradient(135deg,#C8441A,#B8962A)",display:"flex",alignItems:"center",justifyContent:"center"}}>
            <span style={{color:"white",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:16}}>V</span>
          </div>
          <span className="corm" style={{fontWeight:600,fontSize:22,letterSpacing:"-.01em",color:"#1A1208"}}>VUMI</span>
        </div>
        <div className="navl" style={{display:"flex",gap:32}}>
          {t.nav.map((n,i)=><a key={i} href={["#coverage","#who","#how","#contact"][i]} className="nl">{n}</a>)}
        </div>
        <div style={{display:"flex",alignItems:"center",gap:14}}>
          <button onClick={()=>setLang(lang==="es"?"en":"es")} className="mono" style={{background:"transparent",border:"1px solid rgba(26,18,8,.15)",borderRadius:4,padding:"6px 11px",fontSize:11,letterSpacing:".1em",color:"rgba(26,18,8,.5)",cursor:"pointer"}}>{lang==="es"?"EN":"ES"}</button>
          <a href="#contact" className="btn-p" style={{padding:"9px 20px",fontSize:13}}>{t.cta1}</a>
        </div>
      </nav>

      {/* HERO */}
      <section style={{minHeight:"100vh",display:"flex",alignItems:"center",background:"linear-gradient(160deg,#F8F5F0 0%,#F0EBE2 40%,#EDE4D8 100%)",position:"relative",overflow:"hidden",padding:"0 48px"}}>
        <div style={{position:"absolute",right:"-8%",top:"12%",width:"52vw",height:"52vw",maxWidth:680,maxHeight:680,borderRadius:"50%",background:"radial-gradient(circle,rgba(200,68,26,.07) 0%,rgba(184,150,42,.04) 40%,transparent 70%)",border:"1px solid rgba(200,68,26,.07)"}}/>
        <div style={{position:"absolute",right:"6%",top:"22%",width:"32vw",height:"32vw",maxWidth:420,maxHeight:420,borderRadius:"50%",border:"1px solid rgba(200,68,26,.05)"}}/>

        <div style={{maxWidth:1100,margin:"0 auto",width:"100%",paddingTop:80}}>
          <div className="hg" style={{display:"grid",gridTemplateColumns:"55% 45%",gap:48,alignItems:"center"}}>
            <div>
              <div className="sl fu d1">{t.badge}</div>
              <h1 className="corm fu d2" style={{fontSize:"clamp(50px,7vw,88px)",fontWeight:600,lineHeight:1.0,letterSpacing:"-.02em",marginBottom:26}}>
                {t.h1a}<br/>
                <em style={{color:"#C8441A",fontStyle:"italic"}}>{t.h1b}</em>
              </h1>
              <p className="fu d3" style={{fontSize:"clamp(15px,1.7vw,18px)",color:"rgba(26,18,8,.6)",lineHeight:1.75,maxWidth:480,marginBottom:40}}>{t.sub}</p>
              <div className="fu d4" style={{display:"flex",gap:14,flexWrap:"wrap"}}>
                <a href="#contact" className="btn-p">{t.cta1}</a>
                <a href="#how" className="btn-g">{t.cta2}</a>
              </div>
              <div className="fu d5" style={{marginTop:48,display:"flex",gap:28,alignItems:"center",flexWrap:"wrap"}}>
                {[["🇲🇹","Malta","Registrada en"],["🇩🇰","Copenhagen","Europa HQ"],["🕐","2012","Desde"]].map(([flag,val,lbl],i)=>(
                  <div key={i} style={{display:"flex",alignItems:"center",gap:8}}>
                    {i>0&&<div style={{width:1,height:14,background:"rgba(26,18,8,.1)"}}/>}
                    <span style={{fontSize:12,color:"rgba(26,18,8,.35)"}}>{lbl}</span>
                    <span style={{fontSize:12,fontWeight:600,color:"rgba(26,18,8,.6)"}}>{flag} {val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div className="fu d3" style={{background:"white",borderRadius:14,border:"1px solid rgba(26,18,8,.07)",overflow:"hidden",boxShadow:"0 20px 56px rgba(0,0,0,.07)"}}>
              <div style={{padding:"28px 28px 0",borderBottom:"1px solid rgba(26,18,8,.05)"}}>
                <p className="mono" style={{fontSize:10,letterSpacing:".15em",color:"rgba(26,18,8,.3)",marginBottom:10}}>COVERAGE SNAPSHOT</p>
                <div className="sg" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:1,margin:"0 -28px"}}>
                  {[[t.s1v,t.s1l,"#C8441A"],[t.s2v,t.s2l,"#B8962A"],[t.s3v,t.s3l,"#3D5A47"],[t.s4v,t.s4l,"#C8441A"]].map(([v,l,c],i)=>(
                    <div key={i} style={{padding:"24px 28px",background:i%2===0?"rgba(26,18,8,.01)":"white",borderRight:i%2===0?"1px solid rgba(26,18,8,.05)":"none",borderBottom:i<2?"1px solid rgba(26,18,8,.05)":"none"}}>
                      <div className="corm" style={{fontSize:38,fontWeight:700,color:c as string,lineHeight:1,letterSpacing:"-.02em"}}>{v}</div>
                      <div style={{fontSize:12,color:"rgba(26,18,8,.4)",marginTop:3}}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{padding:"18px 28px",display:"flex",alignItems:"center",gap:8}}>
                <div style={{width:7,height:7,borderRadius:"50%",background:"#3D5A47",animation:"pulse 2s infinite"}}/>
                <span style={{fontSize:13,color:"rgba(26,18,8,.45)"}}>{t.live}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TICKER */}
      <div style={{borderTop:"1px solid rgba(26,18,8,.06)",borderBottom:"1px solid rgba(26,18,8,.06)",padding:"12px 0",overflow:"hidden",background:"#1A1208"}}>
        <div style={{display:"flex",animation:"ticker 28s linear infinite",whiteSpace:"nowrap"}}>
          {[...Array(2)].map((_,i)=>(
            <span key={i} style={{display:"flex"}}>
              {t.ticker.map((item,j)=>(
                <span key={j} className="mono" style={{color:"rgba(248,245,240,.35)",fontSize:11,letterSpacing:".18em",padding:"0 36px"}}>
                  {item} <span style={{color:"rgba(200,68,26,.4)"}}>◆</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* WHO */}
      <section id="who" style={{padding:"110px 48px",maxWidth:1100,margin:"0 auto"}}>
        <div className="wg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"start"}}>
          <div>
            <div className="sl">{t.who_label}</div>
            <h2 className="corm" style={{fontSize:"clamp(30px,3.8vw,50px)",fontWeight:600,lineHeight:1.1,letterSpacing:"-.02em",marginBottom:24,whiteSpace:"pre-line"}}>{t.who_h}</h2>
            <p style={{color:"rgba(26,18,8,.55)",lineHeight:1.8,fontSize:16,marginBottom:36}}>{t.who_p}</p>
            <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
              {["🇪🇸 España","🇵🇹 Portugal","🇬🇷 Grecia","🇨🇾 Chipre","🇮🇹 Italia"].map((c,i)=>(
                <span key={i} style={{padding:"7px 14px",borderRadius:999,border:"1px solid rgba(26,18,8,.1)",fontSize:13,color:"rgba(26,18,8,.55)",background:"white"}}>{c}</span>
              ))}
              <span style={{padding:"7px 14px",borderRadius:999,border:"1px dashed rgba(200,68,26,.3)",fontSize:13,color:"rgba(200,68,26,.65)",background:"rgba(200,68,26,.04)"}}>
                {lang==="es"?"+ más próximamente":"+ more coming"}
              </span>
            </div>
          </div>
          <div style={{display:"flex",flexDirection:"column",gap:18}}>
            {[[t.p1t,t.p1b,"◈","#C8441A",true],[t.p2t,t.p2b,"◉","#B8962A",false]].map(([title,body,icon,color,dark],i)=>(
              <div key={i} style={{padding:"28px 26px",background:dark?"#1A1208":"white",borderRadius:10,border:dark?"none":"1px solid rgba(26,18,8,.08)"}}>
                <div style={{fontSize:20,color:color as string,marginBottom:14}}>{icon as string}</div>
                <h3 style={{fontSize:17,fontWeight:600,marginBottom:8,color:dark?"#F8F5F0":"#1A1208"}}>{title as string}</h3>
                <p style={{color:dark?"rgba(248,245,240,.5)":"rgba(26,18,8,.5)",lineHeight:1.7,fontSize:14}}>{body as string}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" style={{padding:"90px 48px",background:"linear-gradient(180deg,#F0EBE2,#F8F5F0)",borderTop:"1px solid rgba(26,18,8,.06)",borderBottom:"1px solid rgba(26,18,8,.06)"}}>
        <div className="hg2" style={{maxWidth:1100,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:72,alignItems:"start"}}>
          <div style={{position:"sticky",top:96}}>
            <div className="sl">{t.how_label}</div>
            <h2 className="corm" style={{fontSize:"clamp(30px,3.8vw,50px)",fontWeight:600,lineHeight:1.1,letterSpacing:"-.02em",whiteSpace:"pre-line"}}>{t.how_h}</h2>
            <p style={{color:"rgba(26,18,8,.4)",marginTop:20,fontSize:15,lineHeight:1.75}}>
              {lang==="es"?"Nuestros brokers especializados hablan tu idioma y conocen tu situación.":"Our specialist brokers speak your language and understand your situation."}
            </p>
          </div>
          <div>
            {t.steps.map((s,i)=>(
              <div key={i} className="sc">
                <div className="mono" style={{minWidth:36,fontSize:11,letterSpacing:".08em",color:"#C8441A",paddingTop:3}}>{s.n}</div>
                <div>
                  <h3 style={{fontSize:17,fontWeight:600,marginBottom:7,letterSpacing:"-.01em"}}>{s.t}</h3>
                  <p style={{color:"rgba(26,18,8,.5)",lineHeight:1.7,fontSize:14}}>{s.b}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COVERAGE */}
      <section id="coverage" style={{padding:"110px 48px",maxWidth:1100,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:56}}>
          <div className="sl" style={{justifyContent:"center",display:"flex"}}>{t.cov_label}</div>
          <h2 className="corm" style={{fontSize:"clamp(30px,3.8vw,50px)",fontWeight:600,lineHeight:1.1,letterSpacing:"-.02em",whiteSpace:"pre-line"}}>{t.cov_h}</h2>
        </div>
        <div className="cg" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:18}}>
          {t.covs.map((c,i)=>(
            <div key={i} className="cc">
              <div style={{fontSize:22,color:"#C8441A",marginBottom:18,lineHeight:1}}>{c.icon}</div>
              <h3 style={{fontSize:16,fontWeight:600,marginBottom:8,letterSpacing:"-.01em"}}>{c.t}</h3>
              <p style={{color:"rgba(26,18,8,.5)",lineHeight:1.7,fontSize:14}}>{c.b}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{padding:"90px 48px",background:"#1A1208",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%,-50%)",width:"70%",height:"70%",background:"radial-gradient(ellipse,rgba(200,68,26,.1) 0%,transparent 60%)",pointerEvents:"none"}}/>
        <div style={{maxWidth:580,margin:"0 auto",position:"relative",textAlign:"center"}}>
          <div className="sl" style={{color:"#C8441A",justifyContent:"center",display:"flex"}}>{t.form_label}</div>
          <h2 className="corm" style={{fontSize:"clamp(30px,4vw,50px)",fontWeight:600,lineHeight:1.1,letterSpacing:"-.02em",color:"#F8F5F0",marginBottom:14,whiteSpace:"pre-line"}}>{t.form_h}</h2>
          <p style={{color:"rgba(248,245,240,.4)",fontSize:15,lineHeight:1.75,marginBottom:44}}>{t.form_p}</p>
          <form onSubmit={(e)=>e.preventDefault()} style={{textAlign:"left"}}>
            <div className="fg" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:12}}>
              <input type="text" placeholder={t.fn} style={{background:"rgba(255,255,255,.05)",borderColor:"rgba(248,245,240,.1)",color:"#F8F5F0"}}/>
              <input type="email" placeholder={t.fe} style={{background:"rgba(255,255,255,.05)",borderColor:"rgba(248,245,240,.1)",color:"#F8F5F0"}}/>
            </div>
            <input type="text" placeholder={t.fc} style={{marginBottom:12,background:"rgba(255,255,255,.05)",borderColor:"rgba(248,245,240,.1)",color:"#F8F5F0"}}/>
            <textarea rows={3} placeholder={t.fm} style={{marginBottom:18,background:"rgba(255,255,255,.05)",borderColor:"rgba(248,245,240,.1)",color:"#F8F5F0",resize:"vertical"}}/>
            <button type="submit" className="btn-p" style={{width:"100%",justifyContent:"center"}}>{t.fb}</button>
          </form>
          <p style={{marginTop:14,fontSize:13,color:"rgba(248,245,240,.2)"}}>{t.ff}</p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{background:"#100D07",padding:"36px 48px",borderTop:"1px solid rgba(248,245,240,.05)"}}>
        <div className="fi" style={{maxWidth:1100,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center",gap:20,flexWrap:"wrap"}}>
          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:26,height:26,borderRadius:"50%",background:"linear-gradient(135deg,#C8441A,#B8962A)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{color:"white",fontFamily:"'Cormorant Garamond',serif",fontWeight:700,fontSize:13}}>V</span>
            </div>
            <span className="corm" style={{fontSize:18,fontWeight:600,color:"#F8F5F0"}}>VUMI</span>
            <span style={{fontSize:12,color:"rgba(248,245,240,.2)"}}>{t.footer_by}</span>
          </div>
          <div style={{display:"flex",gap:24}}>
            {t.flinks.map((l,i)=>(
              <a key={i} href="#" style={{color:"rgba(248,245,240,.25)",fontSize:12,textDecoration:"none",transition:"color .2s"}}
                onMouseEnter={e=>(e.currentTarget.style.color="rgba(248,245,240,.6)")}
                onMouseLeave={e=>(e.currentTarget.style.color="rgba(248,245,240,.25)")}>{l}</a>
            ))}
          </div>
          <span className="mono" style={{fontSize:11,color:"rgba(248,245,240,.18)",letterSpacing:".04em"}}>{t.footer_copy}</span>
        </div>
      </footer>
    </main>
  );
}
