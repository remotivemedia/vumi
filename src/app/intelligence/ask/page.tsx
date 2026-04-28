'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pytjweipmorwfdmxdcgi.supabase.co';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  chunks?: Array<{ doc_slug: string; chunk_index: number; similarity?: number; content_preview?: string }>;
  error?: boolean;
}

const EXAMPLE_QUERIES_ES = [
  '¿Cuáles son los brokers P0 en Madrid?',
  '¿Por qué Venezuela es la audiencia prioritaria?',
  '¿Qué diferencia a VUMI de Bupa Global en España?',
  '¿Cuál es el estado regulatorio de VUMI en España (DGSFP)?',
  '¿Qué dice el corpus sobre el canal broker para salud internacional?',
];

const EXAMPLE_QUERIES_EN = [
  'Who are the P0 brokers in Madrid?',
  'Why is Venezuela the priority audience?',
  'What differentiates VUMI from Bupa Global in Spain?',
  'What is VUMI's regulatory status in Spain (DGSFP)?',
  'What does the corpus say about the broker channel for international health?',
];

const S = {
  kicker: { fontSize:11, color:'#00A9E0', fontWeight:600, textTransform:'uppercase' as const, letterSpacing:'0.12em', marginBottom:6 },
  cite: { fontSize:10, color:'#00A9E0', background:'#E6F6FC', padding:'1px 6px', borderRadius:3, fontFamily:"'JetBrains Mono',monospace", marginLeft:4, verticalAlign:'middle' } as const,
};

export default function AskPage() {
  const { t, i18n } = useTranslation();
  const isEN = i18n.language === 'en';
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const EXAMPLES = isEN ? EXAMPLE_QUERIES_EN : EXAMPLE_QUERIES_ES;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' });
  }, [messages]);

  async function send(query: string) {
    if (!query.trim() || loading) return;
    const q = query.trim();
    setInput('');
    setMessages(prev => [...prev, { role:'user', content:q }]);
    setLoading(true);
    try {
      const res = await fetch(`${SB_URL}/functions/v1/rag-query`, {
        method:'POST',
        headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ query:q, top_k:6 }),
      });
      const data = await res.json();
      if (!res.ok || (!data.answer && !data.response && !data.chunks?.length)) {
        setMessages(prev => [...prev, { role:'assistant', content:t('ask.error_state'), error:true }]);
        return;
      }
      const answer = data.answer || data.response || data.text || '';
      const chunks = data.chunks || data.sources || [];
      if (!answer && !chunks.length) {
        setMessages(prev => [...prev, { role:'assistant', content:t('ask.no_answer'), error:true }]);
        return;
      }
      setMessages(prev => [...prev, { role:'assistant', content:answer, chunks }]);
    } catch {
      setMessages(prev => [...prev, { role:'assistant', content:t('ask.error_state'), error:true }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth:900, display:'flex', flexDirection:'column', height:'calc(100vh - 80px)' }}>

      {/* Header */}
      <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.35 }}>
        <div style={{ marginBottom:20 }}>
          <div style={S.kicker}>{t('ask.kicker')}</div>
          <h1 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:26, letterSpacing:'-0.025em', color:'#2C3539', marginBottom:4 }}>{t('ask.headline')}</h1>
          <p style={{ fontSize:12, color:'#6B7785', maxWidth:680, lineHeight:1.5 }}>{t('ask.subtitle')}</p>
        </div>
      </motion.div>

      {/* Message thread */}
      <div style={{ flex:1, overflowY:'auto', marginBottom:16, minHeight:0 }}>
        {messages.length === 0 && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}>
            <div style={{ marginBottom:16, fontSize:12, color:'#6B7785', fontWeight:600, textTransform:'uppercase', letterSpacing:'0.08em' }}>{t('ask.examples_title')}</div>
            <div style={{ display:'flex', flexDirection:'column', gap:7 }}>
              {EXAMPLES.map((q, i) => (
                <motion.button
                  key={q}
                  initial={{ opacity:0, x:-8 }}
                  animate={{ opacity:1, x:0 }}
                  transition={{ delay:0.1 + i*0.05, duration:0.3 }}
                  onClick={() => send(q)}
                  style={{ textAlign:'left', padding:'10px 14px', borderRadius:7, border:'1px solid #E2E8F0', background:'#fff', cursor:'pointer', fontSize:13, color:'#0033A0', fontWeight:500, transition:'all 0.12s' }}
                  whileHover={{ background:'#EEF2FF', borderColor:'#0033A0', x:2 }}
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity:0, y:8 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0 }}
              transition={{ duration:0.3 }}
              style={{ marginBottom:14 }}
            >
              {msg.role === 'user' ? (
                <div style={{ display:'flex', justifyContent:'flex-end' }}>
                  <div style={{ background:'#0033A0', color:'#fff', padding:'10px 16px', borderRadius:'12px 12px 3px 12px', maxWidth:'70%', fontSize:13, lineHeight:1.5, fontWeight:500 }}>
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
                  <div style={{ width:28, height:28, borderRadius:'50%', background:'#0033A0', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:11, flexShrink:0, marginTop:2 }}>V</div>
                  <div style={{ flex:1 }}>
                    <div style={{ background:msg.error?'#FFF8F7':'#fff', border:'1px solid #E2E8F0', borderRadius:'3px 12px 12px 12px', padding:'12px 16px', fontSize:13, lineHeight:1.65, color:msg.error?'#E55B4D':'#2C3539', borderLeft:msg.error?'3px solid #E55B4D':'1px solid #E2E8F0' }}>
                      {msg.error ? msg.content : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]}
                          components={{
                            p:({node,...p}) => <p style={{ margin:'0 0 8px' }} {...p} />,
                            strong:({node,...p}) => <strong style={{ color:'#0033A0' }} {...p} />,
                            li:({node,...p}) => <li style={{ marginBottom:4 }} {...p} />,
                            code:({node,...p}) => <code style={{ background:'#F5F7FA', padding:'1px 4px', borderRadius:3, fontSize:11, fontFamily:"'JetBrains Mono',monospace" }} {...p} />,
                          }}
                        >{msg.content}</ReactMarkdown>
                      )}
                    </div>
                    {msg.chunks && msg.chunks.length > 0 && (
                      <div style={{ display:'flex', gap:5, flexWrap:'wrap', marginTop:6 }}>
                        <span style={{ fontSize:10, color:'#6B7785', marginRight:2, fontWeight:600 }}>{t('ask.citations_label')}:</span>
                        {msg.chunks.map((c,ci) => (
                          <span key={ci} style={S.cite}>{c.doc_slug}#{c.chunk_index}{c.similarity?` (${(c.similarity*100).toFixed(0)}%)`:''}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {loading && (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} style={{ display:'flex', gap:10, alignItems:'center', padding:'10px 0' }}>
            <div style={{ width:28, height:28, borderRadius:'50%', background:'#0033A0', color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:11, flexShrink:0 }}>V</div>
            <div style={{ display:'flex', gap:4, alignItems:'center' }}>
              {[0,1,2].map(i => (
                <motion.div key={i} style={{ width:6, height:6, borderRadius:'50%', background:'#00A9E0' }}
                  animate={{ y:[0,-4,0] }} transition={{ repeat:Infinity, duration:0.8, delay:i*0.15 }} />
              ))}
              <span style={{ fontSize:12, color:'#6B7785', marginLeft:4 }}>{t('ask.loading')}</span>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.15 }}>
        <div style={{ display:'flex', gap:10, padding:'12px 14px', background:'#fff', border:'1px solid #E2E8F0', borderRadius:10, boxShadow:'0 2px 8px rgba(0,51,160,0.06)' }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key==='Enter' && !e.shiftKey && send(input)}
            placeholder={t('ask.placeholder')}
            style={{ flex:1, border:'none', outline:'none', fontSize:13, color:'#2C3539', background:'transparent', fontFamily:"'Open Sans',sans-serif" }}
          />
          <motion.button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            whileHover={{ scale:1.03 }}
            whileTap={{ scale:0.97 }}
            style={{ padding:'8px 18px', borderRadius:7, border:'none', background:loading||!input.trim()?'#E2E8F0':'#0033A0', color:loading||!input.trim()?'#6B7785':'#fff', fontSize:13, fontWeight:600, cursor:loading||!input.trim()?'not-allowed':'pointer', fontFamily:"'Montserrat',sans-serif", transition:'background 0.12s' }}
          >
            {t('ask.send_btn')}
          </motion.button>
        </div>
      </motion.div>

    </div>
  );
}
