'use client'
// AskVumiWidget — wires ElevenLabs conversational agent (agent_7501kqdz6w99e3mbppy29qemmdvq)
// Text chat uses portal-chat-v10 (Anthropic). Voice uses ElevenLabs directly.
// 36 corpus docs synced to agent KB via elevenlabs-corpus-sync.
// ADDITIVE: drop into /intelligence/ask page.

import { useEffect, useRef, useState, useCallback } from 'react'

const AGENT_ID   = 'agent_7501kqdz6w99e3mbppy29qemmdvq'
const CHAT_URL   = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/portal-chat-v10`
const ANON_KEY   = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ''

type Message = { role: 'user' | 'assistant'; text: string; latency?: number; citations?: Citation[] }
type Citation = { doc_slug: string; doc_title: string; similarity?: number }
type Mode = 'text' | 'voice'

export function AskVumiWidget() {
  const [mode, setMode]         = useState<Mode>('text')
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const widgetRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (document.querySelector('script[src*="elevenlabs.io/convai-widget"]')) return
    const s = document.createElement('script')
    s.src = 'https://elevenlabs.io/convai-widget/index.js'
    s.async = true
    document.body.appendChild(s)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const sendText = useCallback(async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMessages(m => [...m, { role: 'user', text: q }])
    setLoading(true)
    const t0 = Date.now()
    try {
      const r = await fetch(CHAT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', apikey: ANON_KEY },
        body: JSON.stringify({ query: q }),
      })
      const d = await r.json()
      setMessages(m => [...m, { role: 'assistant', text: d.answer ?? d.error ?? 'No response.', latency: Date.now() - t0, citations: d.citations ?? [] }])
    } catch (e) {
      setMessages(m => [...m, { role: 'assistant', text: `Error: ${e instanceof Error ? e.message : 'Network error'}` }])
    } finally { setLoading(false) }
  }, [input, loading])

  const handleKey = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendText() }
  }, [sendText])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: 520 }}>
      <div style={{ display: 'flex', gap: 0, marginBottom: 14, borderRadius: 6, overflow: 'hidden', border: '1px solid #E2E8F0', alignSelf: 'flex-start' }}>
        {(['text', 'voice'] as Mode[]).map(m => (
          <button key={m} onClick={() => setMode(m)} style={{ padding: '7 18px', background: mode === m ? '#0033A0' : '#fff', color: mode === m ? '#fff' : '#6B7785', border: 'none', fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.08em', cursor: 'pointer' }}>
            {m === 'text' ? '⌨ Texto' : '🙪Ovz' }
          </button>
        ))}
      </div>

      {mode === 'text' && (
        <>
          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 14 }}>
            {messages.length === 0 && (<div style={{ color: '#6B7785', fontSize: 11, fontStyle: 'italic', padding: '20px 0', textAlign: 'center' }}>Pregunta sobre audiencias, brokers, competidores, regulación o propuesta VUMI.</div>)}
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{ maxWidth: '88%', background: msg.role === 'user' ? '#0033A0' : '#F5F7FA', color: msg.role === 'user' ? '#fff' : '#2C3539', borderRadius: msg.role === 'user' ? '10px 10px 2px 10px' : '10px 10px 10px 2px', padding: '10px 14px', fontSize: 12, lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                {msg.role === 'assistant' && (msg.citations?.length ?? 0) > 0 && (
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginTop: 4, maxWidth: '88%' }}>
                    {msg.citations!.slice(0,5).map((c, j) => (<span key={j} style={{ fontSize: 9, background: '#E6F6FC', color: '#00A9E0', padding: '2px 6px', borderRadius: 3, fontFamily: 'monospace' }}>{c.doc_title ?? c.doc_slug}</span>))}
                  </div>
                )}
                {msg.role === 'assistant' && msg.latency && <div style={{ fontSize: 8, color: '#B0B8C2', marginTop: 2 }}>{msg.latency}ms · portal-chat-v10 · Anthropic</div>}
              </div>
            ))}
            {loading && (<div style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ fontSize: 10, color: '#6B7785' }}>Consultando corpus VUMI…</span></div>)}
            <div ref={bottomRef} />
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
            <textarea value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} placeholder="¿Cuál es el broker P0 para Wave 1? ¿Por qué Cigna no puede cubrir visados españoles?" rows={2} style={{ flex: 1, resize: 'none', border: '1px solid #E2E8F0', borderRadius: 6, padding: '9px 12px', fontSize: 12, fontFamily: 'Open Sans,sans-serif', outline: 'none' }} />
            <button onClick={sendText} disabled={loading || !input.trim()} style={{ background: loading || !input.trim() ? '#E2E8F0' : '#0033A0', color: loading || !input.trim() ? '#B0B8C2' : '#fff', border: 'none', borderRadius: 6, padding: '10px 16px', fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 11, cursor: loading || !input.trim() ? 'not-allowed' : 'pointer' }}>Enviar</button>
          </div>
          <div style={{ marginTop: 6, fontSize: 9, color: '#B0B8C2', textAlign: 'right' }}>Enter para enviar · 128 chunks · portal-chat-v10 · Anthropic</div>
        </>
      )}

      {mode === 'voice' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20 }}>
          <div style={{ background: '#F5F7FA', border: '1px solid #E2E8F0', borderRadius: 8, padding: '16px 22px', maxWidth: 420, textAlign: 'center' }}>
            <div style={{ fontFamily: 'Montserrat,sans-serif', fontWeight: 700, fontSize: 11, color: '#0033A0', marginBottom: 6 }}>VUCI#SPAAN - AGENTE DE VOZ</div>
            <div style={{ fontSize: 10.5, color: '#6B7785', lineHeight: 1.6 }}>Agente conversacional con acceso al corpus completo de 36 documentos. Di <em>"VUMI Spain intelligence online"</em> para comenzar.</div>
          </div>
          <div ref={widgetRef} style={{ width: '100%', maxWidth: 420 }} dangerouslySetInnerHTML={{ __html: `<elevenlabs-convai agent-id="${AGENT_ID}" style="width:100%;display:block;"></elevenlabs-convai>` }} />
          <div style={{ fontSize: 9, color: '#B0B8C2', textAlign: 'center' }}>36 docs en KB · voice gD1IexrzCvsXPHUuT0s3 · {AGENT_ID.slice(0,22)}…</div>
        </div>
      )}
    </div>
  )
}
