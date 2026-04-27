'use client';
// app/intelligence/ask/page.tsx
import { useState, useRef, useEffect } from 'react';

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pytjweipmorwfdmxdcgi.supabase.co';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  chunks?: Array<{ doc_slug: string; chunk_index: number; similarity?: number; content_preview?: string }>;
  error?: boolean;
}

const EXAMPLE_QUERIES = [
  '¿Cuáles son los brokers P0 en Madrid?',
  '¿Por qué Venezuela es la audiencia prioritaria?',
  '¿Qué diferencia a VUMI de Bupa Global en España?',
  '¿Cuál es el estado regulatorio de VUMI en España (DGSFP)?',
  '¿Qué dice el corpus sobre el canal broker para salud internacional?',
];

export default function AskPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function send(query: string) {
    if (!query.trim() || loading) return;
    const q = query.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: q }]);
    setLoading(true);

    try {
      const res = await fetch(`${SB_URL}/functions/v1/rag-query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: q, top_k: 6 }),
      });
      const data = await res.json();

      if (!res.ok || (!data.answer && !data.response && !data.chunks?.length)) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Dato no disponible en el dataset actual.',
          error: true,
        }]);
        return;
      }

      const answer = data.answer || data.response || data.text || '';
      const chunks = data.chunks || data.sources || [];

      if (!answer && !chunks.length) {
        setMessages(prev => [...prev, {
          role: 'assistant',
          content: 'Dato no disponible en el dataset actual.',
          error: true,
        }]);
        return;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: answer || 'Respuesta basada en el corpus. Ver fuentes abajo.',
        chunks,
      }]);
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Error de conexión con el corpus. Comprueba la configuración de Supabase.',
        error: true,
      }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column', height: 'calc(100vh - 120px)' }}>
      {/* Header */}
      <div style={{ marginBottom: 20, flexShrink: 0 }}>
        <div style={{ fontSize: 11, color: '#00A9E0', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 6 }}>
          RAG sobre Corpus VUMI
        </div>
        <h1 style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: 22, letterSpacing: '-0.02em', color: '#2C3539', marginBottom: 4 }}>
          Ask VUMI Intelligence
        </h1>
        <p style={{ fontSize: 12, color: '#6B7785' }}>
          Búsqueda semántica sobre 8 documentos del corpus (65 chunks). Todas las respuestas citan doc_slug + chunk_index.
          Si no hay dato en el corpus, responde: "Dato no disponible en el dataset actual."
        </p>
      </div>

      {/* Example queries */}
      {messages.length === 0 && (
        <div style={{ marginBottom: 16, flexShrink: 0 }}>
          <div style={{ fontSize: 11, color: '#6B7785', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>
            Preguntas sugeridas
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {EXAMPLE_QUERIES.map(q => (
              <button
                key={q}
                onClick={() => send(q)}
                style={{
                  background: '#F5F7FA', border: '1px solid #E2E8F0', borderRadius: 6,
                  padding: '6px 12px', fontSize: 12, color: '#2C3539', cursor: 'pointer',
                  fontFamily: 'inherit', textAlign: 'left', transition: 'all 0.15s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#0033A0')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#E2E8F0')}
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Chat thread */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '8px 0', minHeight: 0,
        display: 'flex', flexDirection: 'column', gap: 12,
      }}>
        {messages.map((m, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: m.role === 'user' ? 'flex-end' : 'flex-start' }}>
            {/* Bubble */}
            <div style={{
              maxWidth: '80%', padding: '12px 16px', borderRadius: 8, fontSize: 13, lineHeight: 1.6,
              background: m.role === 'user' ? '#0033A0' : m.error ? '#FFF8F7' : '#fff',
              color: m.role === 'user' ? '#fff' : '#2C3539',
              border: m.role === 'assistant' ? `1px solid ${m.error ? '#E55B4D44' : '#E2E8F0'}` : 'none',
              boxShadow: '0 1px 4px rgba(0,0,0,.06)',
              whiteSpace: 'pre-wrap',
            }}>
              {m.content}
            </div>

            {/* Citations */}
            {m.chunks && m.chunks.length > 0 && (
              <div style={{ maxWidth: '80%', marginTop: 6, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {m.chunks.slice(0, 6).map((c, ci) => (
                  <div key={ci} style={{
                    background: '#F5F7FA', border: '1px solid #E2E8F0', borderRadius: 4,
                    padding: '3px 8px', fontSize: 10, color: '#6B7785',
                    fontFamily: "'JetBrains Mono', monospace",
                  }} title={c.content_preview}>
                    {c.doc_slug}#{c.chunk_index}
                    {c.similarity && <span style={{ color: '#00A9E0', marginLeft: 4 }}>{Math.round(c.similarity * 100)}%</span>}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'flex-start' }}>
            <div style={{
              background: '#F5F7FA', border: '1px solid #E2E8F0', borderRadius: 8,
              padding: '12px 16px', fontSize: 12, color: '#6B7785',
            }}>
              Consultando corpus…
              <span style={{ display: 'inline-block', marginLeft: 4, animation: 'blink 1s step-end infinite' }}>▊</span>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ flexShrink: 0, paddingTop: 12, borderTop: '1px solid #E2E8F0', marginTop: 8 }}>
        <div style={{ display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), send(input))}
            placeholder="Pregunta sobre el corpus VUMI España…"
            disabled={loading}
            style={{
              flex: 1, padding: '10px 14px', borderRadius: 6, border: '1px solid #E2E8F0',
              fontSize: 13, fontFamily: 'inherit', outline: 'none',
              background: loading ? '#F5F7FA' : '#fff',
            }}
          />
          <button
            onClick={() => send(input)}
            disabled={loading || !input.trim()}
            style={{
              padding: '10px 20px', borderRadius: 6, background: loading || !input.trim() ? '#E2E8F0' : '#0033A0',
              color: loading || !input.trim() ? '#6B7785' : '#fff',
              border: 'none', cursor: loading || !input.trim() ? 'not-allowed' : 'pointer',
              fontFamily: "'Montserrat', sans-serif", fontWeight: 600, fontSize: 12,
              transition: 'all 0.15s',
            }}
          >
            Enviar
          </button>
        </div>
        <div style={{ fontSize: 10, color: '#6B7785', marginTop: 6 }}>
          Respuestas sin chunks recuperados → "Dato no disponible en el dataset actual." — No hay alucinaciones.
        </div>
      </div>

      <style>{`@keyframes blink { 0%,100% { opacity:1 } 50% { opacity:0 } }`}</style>
    </div>
  );
}
