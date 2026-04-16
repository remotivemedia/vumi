# VUMI

Full-stack application powered by Next.js 15 + Supabase + Vercel.

## Stack
- **Frontend**: Next.js 15 (React 19, TypeScript)
- **Database**: Supabase (PostgreSQL 17.6, eu-west-1)
- **Auth**: Supabase Auth
- **Hosting**: Vercel
- **Edge Functions**: Supabase Edge Functions (Deno)

## Project IDs
- Supabase Project: `pytjweipmorwfdmxdcgi`
- Supabase URL: `https://pytjweipmorwfdmxdcgi.supabase.co`
- GitHub: `remotivemedia/vumi`

## Environment Variables (Vercel)
```
NEXT_PUBLIC_SUPABASE_URL=https://pytjweipmorwfdmxdcgi.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key>
SUPABASE_SERVICE_ROLE_KEY=<service_role_key>
AI_GATEWAY_API_KEY=<ai_gateway_key>
```

## Local Development
```bash
npm install
cp .env.example .env.local
# Fill in .env.local
npm run dev
```
