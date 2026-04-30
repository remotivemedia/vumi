'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SB_URL = 'https://pytjweipmorwfdmxdcgi.supabase.co';
const ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5dGp3ZWlwbW9yd2ZkbXhkY2dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYzNTQxNDksImV4cCI6MjA5MTkzMDE0OX0.-Wi1v7MlegaNtzC3rCVDP97_fZfd2xGRVvohv1RAfLk';

type Mode = 'text' | 'voice';
type VoiceStatus = 'idle' | 'connecting' | 'listening' | 'speaking' | 'thinking' | 'error';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  chunks?: Array<{ doc_slug: string; chunk_index: number; similarity?: number }>;
  error?: boolean;
  source?: 'text' | 'voice';
}

const S = {
  kicker: { fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase' as const, letterSpacing: '0.12em', marginBottom: 6 },
};

const EXAMPLES_ES = [
  '¿Cuáles son los brokers P0 en Madrid?',
  '¿Por qué Venezuela es la audiencia prioritaria?',
  '¿Qué diferencia a VUMI de Bupa Global en España?',
  '¿Cuál es el estado regulatorio DGSFP de VUMI?',
  '¿Qué canal de distribución es más eficiente para IPMI en España?',
];

const EXAMPLES_EN = [
  'Who are the P0 brokers in Madrid?',
  'Why is Venezuela the priority audience?',
  'What differentiates VUMI from Bupa Global in Spain?',
  "What is VUMI's DGSFP regulatory status?",
  'What is the most efficient distribution channel for IPMI in Spain?',
];

const STATUS_LABEL: Record<VoiceStatus, string> = {
  idle: 'Pulsa para hablar',
  connecting: 'Conectando...',
  listening: 'Escuchando...',
  speaking: 'VUMI respondiendo...',
  thinking: 'Procesando...',
  error: 'Error de conexión',
};

const STATUS_COLOR: Record<VoiceStatus, string> = {
  idle: '#0033A0',
  connecting: '#6B7785',
  listening: '#00A9E0',
  speaking: '#2DA771',
  thinking: '#B45309',
  error: '#E55B4D',
};

export default function AskPage() {
  const { t, i18n } = useTranslation();
  const isEN = i18n.language === 'en';
  const [mode, setMode] = useState<Mode>('text');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [voiceStatus, setVoiceStatus] = useState<VoiceStatus>('idle');
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const bottomRef = useRef<HTMLDivElement>(null);
  const convRef = useRef<any>(null);

  const EXAMPLES = isEN ? EXAMPLES_EN : EXAMPLES_ES;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, voiceTranscript]);

  // ── Text RAG ─────────────────────────────────────────────────────────────
  async function sendText(query: string) {
    if (!query.trim() || loading) return;
    const q = query.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: q, source: 'text' }]);
    setLoading(true);
    try {
      const res = await fetch(`${SB_URL}/functions/v1/rag-query-v3`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, top_k: 6 }),
      });
      const data = await res.json();
      const answer = data.answer || data.response || data.text || '';
      const chunks = data.chunks || data.sources || [];
      if (!answer && !chunks.length) {
        setMessages(prev => [...prev, { role: 'assistant', content: t('ask.no_answer'), error: true, source: 'text' }]);
        return;
      }
      setMessages(prev => [...prev, { role: 'assistant', content: answer, chunks, source: 'text' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: t('ask.error_state'), error: true, source: 'text' }]);
    } finally {
      setLoading(false);
    }
  }

  // ── Client tools (wired to Supabase corpus) ───────────────────────────────
  const clientTools = useCallback(() => ({
    search_knowledge: async ({ query }: { query: string }) => {
      try {
        const res = await fetch(`${SB_URL}/functions/v1/rag-query-v3`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query, top_k: 4 }),
        });
        const data = await res.json();
        return data.answer || data.response || 'No information found in the corpus for this query.';
      } catch {
        return 'Knowledge search unavailable.';
      }
    },
    get_brokers: async () => {
      try {
        const res = await fetch(
          `${SB_URL}/rest/v1/vumi_brokers?select=name,primary_city,primary_ccaa,fit_score,tier,outreach_priority,expat_focus,latam_focus&order=fit_score.desc&limit=10`,
          { headers: { 'apikey': ANON, 'Authorization': `Bearer ${ANON}` } }
        );
        const brokers = await res.json();
        if (!brokers?.length) return 'No broker data available.';
        return brokers.map((b: any) =>
          `${b.name} | ${b.primary_city}, ${b.primary_ccaa} | Fit: ${b.fit_score} | Priority: ${b.outreach_priority} | Expat: ${b.expat_focus ? 'Yes' : 'No'} | LatAm: ${b.latam_focus ? 'Yes' : 'No'}`
        ).join('\n');
      } catch {
        return 'Broker data unavailable.';
      }
    },
    get_market_signals: async () => {
      try {
        const res = await fetch(
          `${SB_URL}/rest/v1/vumi_signals?select=result_title,signal_type,relevance_score,action_required,source_url&gte=relevance_score.70&order=relevance_score.desc&limit=8`,
          { headers: { 'apikey': ANON, 'Authorization': `Bearer ${ANON}` } }
        );
        const signals = await res.json();
        if (!signals?.length) return 'No signals available.';
        return signals.map((s: any) =>
          `[${s.signal_type}] ${s.result_title} | Relevance: ${s.relevance_score}${s.action_required ? ' | ACTION REQUIRED' : ''}`
        ).join('\n');
      } catch {
        return 'Signal data unavailable.';
      }
    },
    get_competitors: async () => {
      try {
        const res = await fetch(
          `${SB_URL}/rest/v1/vumi_competitors?select=brand,regulator,jurisdiction,eea_passport,dgsfp_status,latam_strength&order=latam_strength.desc`,
          { headers: { 'apikey': ANON, 'Authorization': `Bearer ${ANON}` } }
        );
        const comps = await res.json();
        if (!comps?.length) return 'Competitor data: Bupa Global (Irlanda EEA), Cigna (Guernsey, no EEA), Allianz Care (Irlanda EEA), AXA Global (FCA UK, no EEA). VUMI lidera en foco LatAm y pasaporte EEA.';
        return comps.map((c: any) =>
          `${c.brand} | ${c.regulator} | EEA: ${c.eea_passport ? 'Yes' : 'No'} | DGSFP: ${c.dgsfp_status || 'Unknown'}`
        ).join('\n');
      } catch {
        return 'VUMI Euro Health: EEA (Malta), DGSFP activo. Bupa: EEA (Irlanda). Cigna: NO EEA (Guernsey). Allianz: EEA (Irlanda). AXA: NO EEA (FCA UK post-Brexit).';
      }
    },
    get_hypotheses: async () => {
      try {
        const res = await fetch(
          `${SB_URL}/rest/v1/vumi_hypotheses?select=hypothesis,confidence_score,status,evidence_summary&order=confidence_score.desc&limit=8`,
          { headers: { 'apikey': ANON, 'Authorization': `Bearer ${ANON}` } }
        );
        const hyp = await res.json();
        if (!hyp?.length) return 'No hypotheses available.';
        return hyp.map((h: any) =>
          `"${h.hypothesis}" | Confidence: ${h.confidence_score}% | Status: ${h.status}`
        ).join('\n');
      } catch {
        return 'Hypotheses data unavailable.';
      }
    },
  }), []);

  // ── Voice session ─────────────────────────────────────────────────────────
  async function startVoice() {
    if (convRef.current) return;
    setVoiceStatus('connecting');
    setVoiceTranscript('');
    try {
      // Get signed URL + dynamic variables from our Supabase edge function
      const urlRes = await fetch(`${SB_URL}/functions/v1/elevenlabs-signed-url`);
      if (!urlRes.ok) throw new Error('Could not get session URL');
      const { signed_url, dynamic_variables } = await urlRes.json();

      const { Conversation } = await import('@11labs/client');

      const tools = clientTools();
      const conv = await Conversation.startSession({
        signedUrl: signed_url,
        dynamicVariables: dynamic_variables,
        clientTools: tools as any,

        onConnect: () => {
          setVoiceStatus('listening');
          setMessages(prev => [...prev, {
            role: 'assistant',
            content: 'VUMI online. ¿Qué necesitas saber sobre el lanzamiento en España?',
            source: 'voice',
          }]);
        },
        onDisconnect: () => {
          setVoiceStatus('idle');
          convRef.current = null;
        },
        onMessage: ({ message, source }) => {
          if (source === 'user' && message?.trim()) {
            setVoiceTranscript('');
            setMessages(prev => [...prev, { role: 'user', content: message, source: 'voice' }]);
          }
          if (source === 'ai' && message?.trim()) {
            setMessages(prev => {
              const last = prev[prev.length - 1];
              // Accumulate or append AI message
              if (last?.role === 'assistant' && last?.source === 'voice' && !last.error) {
                return [...prev.slice(0, -1), { ...last, content: message }];
              }
              return [...prev, { role: 'assistant', content: message, source: 'voice' }];
            });
          }
        },
        onError: (msg: string) => {
          console.error('ElevenLabs error:', msg);
          setVoiceStatus('error');
          setTimeout(() => {
            if (convRef.current) stopVoice();
          }, 2000);
        },
        onStatusChange: ({ status }: { status: string }) => {
          if (status === 'connected') setVoiceStatus('listening');
          if (status === 'disconnected') { setVoiceStatus('idle'); convRef.current = null; }
        },
        onModeChange: ({ mode: m }: { mode: string }) => {
          if (m === 'speaking') setVoiceStatus('speaking');
          if (m === 'listening') setVoiceStatus('listening');
          if (m === 'thinking') setVoiceStatus('thinking');
        },
      });

      convRef.current = conv;
    } catch (err: any) {
      console.error('Voice start error:', err);
      setVoiceStatus('error');
      setTimeout(() => setVoiceStatus('idle'), 3000);
    }
  }

  async function stopVoice() {
    if (!convRef.current) return;
    try {
      await convRef.current.endSession();
    } catch { /* ignore */ }
    convRef.current = null;
    setVoiceStatus('idle');
    setVoiceTranscript('');
  }

  function toggleVoice() {
    if (voiceStatus === 'idle' || voiceStatus === 'error') {
      startVoice();
    } else {
      stopVoice();
    }
  }

  const voiceActive = voiceStatus !== 'idle' && voiceStatus !== 'error';

  return (
    <div style={{ maxWidth: 960, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 80px)' }}>

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <div style={{ marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 12 }}>
          <div>
            <div style={S.kicker}>{t('ask.kicker')}</div>
            <h1 style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 26, letterSpacing: '-0.025em', color: '#2C3539', marginBottom: 4 }}>{t('ask.headline')}</h1>
            <p style={{ fontSize: 12, color: '#6B7785', maxWidth: 640, lineHeight: 1.5 }}>{t('ask.subtitle')}</p>
          </div>

          {/* Mode toggle */}
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            {(['text', 'voice'] as Mode[]).map(m => (
              <motion.button
                key={m}
                onClick={() => { setMode(m); if (m === 'text' && voiceActive) stopVoice(); }}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                style={{
                  padding: '7px 16px', borderRadius: 6, border: 'none', cursor: 'pointer',
                  fontSize: 12, fontWeight: 600, fontFamily: "'Montserrat',sans-serif",
                  background: mode === m ? '#0033A0' : '#E2E8F0',
                  color: mode === m ? '#fff' : '#6B7785',
                  transition: 'all 0.15s',
                }}
              >
                {m === 'text' ? '💬 Texto' : '🎙️ Voz'}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Chat area */}
      <div style={{ flex: 1, overflowY: 'auto', marginBottom: 12, minHeight: 0, padding: '4px 0' }}>

        {messages.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
            <div style={{ marginBottom: 14, fontSize: 11, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{t('ask.examples_title')}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              {EXAMPLES.map((q, i) => (
                <motion.button
                  key={q}
                  initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.3 }}
                  onClick={() => { if (mode === 'text') sendText(q); }}
                  style={{ textAlign: 'left', padding: '9px 13px', borderRadius: 7, border: '1px solid #E2E8F0', background: '#fff', cursor: mode === 'text' ? 'pointer' : 'default', fontSize: 13, color: '#0033A0', fontWeight: 500, transition: 'all 0.12s' }}
                  whileHover={mode === 'text' ? { background: '#EEF2FF', borderColor: '#0033A0', x: 2 } : {}}
                >{q}</motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence initial={false}>
          {messages.map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} style={{ marginBottom: 12 }}>
              {msg.role === 'user' ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, alignItems: 'center' }}>
                  {msg.source === 'voice' && <span style={{ fontSize: 10, color: '#6B7785' }}>🎙️</span>}
                  <div style={{ background: '#0033A0', color: '#fff', padding: '10px 15px', borderRadius: '12px 12px 3px 12px', maxWidth: '70%', fontSize: 13, lineHeight: 1.5, fontWeight: 500 }}>
                    {msg.content}
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: msg.source === 'voice' ? '#2DA771' : '#0033A0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 11, flexShrink: 0, marginTop: 2 }}>
                    {msg.source === 'voice' ? '🎙' : 'V'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ background: msg.error ? '#FFF8F7' : '#fff', border: `1px solid ${msg.error ? '#E55B4D' : '#E2E8F0'}`, borderRadius: '3px 12px 12px 12px', padding: '11px 15px', fontSize: 13, lineHeight: 1.65, color: msg.error ? '#E55B4D' : '#2C3539', borderLeft: msg.error ? '3px solid #E55B4D' : '1px solid #E2E8F0' }}>
                      {msg.error ? msg.content : (
                        <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                          p: ({ node, ...p }) => <p style={{ margin: '0 0 8px' }} {...p} />,
                          strong: ({ node, ...p }) => <strong style={{ color: '#0033A0' }} {...p} />,
                          li: ({ node, ...p }) => <li style={{ marginBottom: 4 }} {...p} />,
                          code: ({ node, ...p }) => <code style={{ background: '#F5F7FA', padding: '1px 4px', borderRadius: 3, fontSize: 11, fontFamily: "'JetBrains Mono',monospace" }} {...p} />,
                        }}>{msg.content}</ReactMarkdown>
                      )}
                    </div>
                    {msg.chunks && msg.chunks.length > 0 && (
                      <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', marginTop: 5 }}>
                        <span style={{ fontSize: 10, color: '#6B7785', marginRight: 2, fontWeight: 600 }}>{t('ask.citations_label')}:</span>
                        {msg.chunks.map((c, ci) => (
                          <span key={ci} style={{ fontSize: 10, color: '#00A9E0', background: '#E6F6FC', padding: '1px 6px', borderRadius: 3, fontFamily: "'JetBrains Mono',monospace" }}>
                            {c.doc_slug}#{c.chunk_index}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Text loading */}
        {loading && mode === 'text' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ display: 'flex', gap: 10, alignItems: 'center', padding: '10px 0' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0033A0', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: "'Montserrat',sans-serif", fontWeight: 700, fontSize: 11, flexShrink: 0 }}>V</div>
            <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
              {[0, 1, 2].map(i => (
                <motion.div key={i} style={{ width: 6, height: 6, borderRadius: '50%', background: '#00A9E0' }}
                  animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: i * 0.15 }} />
              ))}
              <span style={{ fontSize: 12, color: '#6B7785', marginLeft: 4 }}>{t('ask.loading')}</span>
            </div>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* ── Voice mode UI ───────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mode === 'voice' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, paddingBottom: 8 }}
          >
            {/* Animated orb */}
            <div style={{ position: 'relative', width: 100, height: 100 }}>
              {voiceActive && (
                <>
                  <motion.div
                    animate={{ scale: [1, 1.35, 1], opacity: [0.3, 0, 0.3] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
                    style={{ position: 'absolute', inset: -16, borderRadius: '50%', background: STATUS_COLOR[voiceStatus] }}
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0, 0.15] }}
                    transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut', delay: 0.3 }}
                    style={{ position: 'absolute', inset: -8, borderRadius: '50%', background: STATUS_COLOR[voiceStatus] }}
                  />
                </>
              )}
              <motion.button
                onClick={toggleVoice}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                animate={voiceStatus === 'speaking' ? { scale: [1, 1.05, 1] } : {}}
                transition={voiceStatus === 'speaking' ? { repeat: Infinity, duration: 0.6 } : {}}
                style={{
                  width: 100, height: 100, borderRadius: '50%', border: 'none',
                  background: STATUS_COLOR[voiceStatus],
                  color: '#fff', fontSize: 30, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: `0 4px 24px ${STATUS_COLOR[voiceStatus]}44`,
                  transition: 'background 0.3s, box-shadow 0.3s',
                  position: 'relative', zIndex: 1,
                }}
              >
                {voiceStatus === 'idle' || voiceStatus === 'error' ? '🎙️' :
                  voiceStatus === 'connecting' ? '⏳' :
                    voiceStatus === 'speaking' ? '🔊' :
                      voiceStatus === 'thinking' ? '💭' : '👂'}
              </motion.button>
            </div>

            {/* Status label */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: STATUS_COLOR[voiceStatus], fontFamily: "'Montserrat',sans-serif" }}>
                {STATUS_LABEL[voiceStatus]}
              </div>
              {voiceActive && (
                <div style={{ fontSize: 11, color: '#6B7785', marginTop: 4 }}>
                  Pulsa el orb para terminar la sesión
                </div>
              )}
              {voiceStatus === 'idle' && (
                <div style={{ fontSize: 11, color: '#6B7785', marginTop: 4 }}>
                  El agente tiene acceso a todo el corpus VUMI España
                </div>
              )}
            </div>

            {/* Connection info */}
            {voiceActive && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}
              >
                {['Corpus VUMI', 'Brokers DB', 'Señales live', 'Competidores', 'Hipótesis'].map(tag => (
                  <span key={tag} style={{ fontSize: 10, background: '#EEF2FF', color: '#0033A0', padding: '2px 8px', borderRadius: 99, fontWeight: 600 }}>
                    ✓ {tag}
                  </span>
                ))}
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Text input ──────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mode === 'text' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ delay: 0.1 }}
          >
            <div style={{ display: 'flex', gap: 8, padding: '11px 13px', background: '#fff', border: '1px solid #E2E8F0', borderRadius: 10, boxShadow: '0 2px 8px rgba(0,51,160,0.06)' }}>
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendText(input)}
                placeholder={t('ask.placeholder')}
                style={{ flex: 1, border: 'none', outline: 'none', fontSize: 13, color: '#2C3539', background: 'transparent', fontFamily: "'Open Sans',sans-serif" }}
              />
              <motion.button
                onClick={() => sendText(input)}
                disabled={loading || !input.trim()}
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                style={{ padding: '7px 16px', borderRadius: 7, border: 'none', background: loading || !input.trim() ? '#E2E8F0' : '#0033A0', color: loading || !input.trim() ? '#6B7785' : '#fff', fontSize: 13, fontWeight: 600, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer', fontFamily: "'Montserrat',sans-serif", transition: 'background 0.12s' }}
              >
                {t('ask.send_btn')}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
