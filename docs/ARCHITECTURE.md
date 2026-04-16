# VUMI — Architecture

## Stack

```
GitHub (remotivemedia/vumi)
  └─► Vercel (auto-deploy on push to main)
        └─► Next.js 15 + React 19
              └─► Supabase (pytjweipmorwfdmxdcgi)
                    ├─ PostgreSQL 17.6 (eu-west-1)
                    ├─ Auth
                    ├─ Edge Functions
                    │    ├─ health         (public)
                    │    └─ ai-gateway     (public, proxies Vercel AI Gateway)
                    └─ Vault (encrypted secrets)
                         ├─ AI_GATEWAY_API_KEY
                         ├─ GITHUB_TOKEN
                         ├─ VERCEL_TEAM_ID
                         └─ SUPABASE_URL
```

## Edge Functions

| Function | URL | Auth |
|---|---|---|
| `health` | `.../functions/v1/health` | public |
| `ai-gateway` | `.../functions/v1/ai-gateway` | public |

## Environment Variables (Vercel)

| Key | Where |
|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://pytjweipmorwfdmxdcgi.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase dashboard → API settings |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | `sb_publishable_c0757...` |
| `AI_GATEWAY_API_KEY` | Vercel dashboard → AI Gateway |

## Connect Vercel (one-time manual step)

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import `remotivemedia/vumi` from GitHub
3. Framework: **Next.js** (auto-detected)
4. Add env vars above
5. Deploy

Or run: `./scripts/setup-vercel.sh`
