# VUMI Spain Intelligence Portal — Architecture

## Routes

| Route | Purpose | Status |
|---|---|---|
| `/intelligence` | Cockpit — KPIs, geo, signals, decisions | v2 |
| `/intelligence/audiences` | LatAm diaspora profiles (VE/CO/MX) | v2 |
| `/intelligence/geography` | City launch priority map | v2 |
| `/intelligence/brokers` | 17-broker shortlist with fit scores | v2 |
| `/intelligence/competitors` | IPMI landscape + product comparison | v2 |
| `/intelligence/proposition` | Differentiation framework + messages | v2 |
| `/intelligence/roadmap` | 30/60/90/180/365-day gates | v2 |
| `/intelligence/gates` | Validation gaps + decision log | v2 |
| `/intelligence/signals` | Live market signals feed | v2 |
| `/intelligence/ask` | RAG chat over VUMI corpus | v2 |
| `/intelligence/data` | JSON payload proxy | v2 |
| `/intelligence/health` | Health probe | preserved |

## Data Layer

- All numeric data: Supabase (`vumi_v_portal_payload`, individual tables)
- Qualitative context: `rag-query` edge function (65 chunks, 8 docs)
- Data library: `src/lib/intelligence.ts` — single file, all queries

## Required Vercel Env Vars

```
NEXT_PUBLIC_SUPABASE_URL=https://pytjweipmorwfdmxdcgi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon key>
SUPABASE_SERVICE_ROLE_KEY=<service role key — server only>
```

## Deployment Branch

`feat/intelligence-frontend-v2` — additive, no modifications to `main` protected files.

## Rollback

Revert to previous commit on branch. All DB changes are additive (nullable columns, new functions) — no destructive operations.

*Updated: 2026-04-27*
