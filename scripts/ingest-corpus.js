#!/usr/bin/env node
/**
 * VUMI Spain — Corpus ingestion pipeline
 * Reads project knowledge files and loads embeddings into corpus_chunks table.
 * 
 * Usage:
 *   SUPABASE_URL=... SUPABASE_SERVICE_ROLE_KEY=... \
 *   OPENAI_API_KEY=... node scripts/ingest-corpus.js
 *
 * Sources: /docs/corpus/*.md (01-08 VUMI corpus files)
 * Model: text-embedding-3-small (1536 dims)
 * Chunking: 800 tokens with 100-token overlap
 */

// TODO: implement after schema is applied and corpus files are in /docs/corpus/
console.log("Corpus ingestion pipeline — placeholder");
console.log("Schema required: run supabase/migrations/001_vumi_spain_intelligence.sql first");
