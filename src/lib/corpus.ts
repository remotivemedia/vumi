// src/lib/corpus.ts
// Server-side helper to query the VUMI corpus via rag-query edge function.
// Returns answer + cited chunks (doc_slug + chunk_index).
// Never called client-side — always from async Server Components.

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://pytjweipmorwfdmxdcgi.supabase.co';

export interface CorpusChunk {
  doc_slug: string;
  chunk_index: number;
  similarity?: number;
  content?: string;
  content_preview?: string;
}

export interface CorpusResult {
  answer: string;
  chunks: CorpusChunk[];
}

const EMPTY: CorpusResult = { answer: '', chunks: [] };

export async function queryCorpus(query: string, top_k = 5): Promise<CorpusResult> {
  try {
    const res = await fetch(`${SB_URL}/functions/v1/rag-query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, top_k }),
      // No auth — verify_jwt: false
    });
    if (!res.ok) return EMPTY;
    const data = await res.json();
    const answer: string = data.answer || data.response || data.text || '';
    const chunks: CorpusChunk[] = data.chunks || data.sources || [];
    if (!answer && !chunks.length) return EMPTY;
    return { answer, chunks };
  } catch {
    return EMPTY;
  }
}

// Citation badge: show doc_slug#chunk_index inline
export function citationLabel(chunk: CorpusChunk): string {
  const short = chunk.doc_slug?.replace(/^\d{2}_VUMI_/, '').replace(/_/g, ' ').replace('.md', '');
  return `${short} §${chunk.chunk_index}`;
}
