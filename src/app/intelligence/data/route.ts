// app/intelligence/data/route.ts
// Proxies vumi_v_portal_payload as JSON.
// DO NOT MODIFY — serves as single source of truth for portal JSON payload.
import { NextResponse } from 'next/server';

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const revalidate = 60;

export async function GET() {
  try {
    const res = await fetch(`${SB_URL}/rest/v1/vumi_v_portal_payload?select=*`, {
      headers: {
        apikey: SB_KEY,
        Authorization: `Bearer ${SB_KEY}`,
        'Content-Type': 'application/json',
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Failed to fetch portal payload', status: res.status }, { status: 502 });
    }

    const rows = await res.json();
    const payload = rows[0] ?? {};

    return NextResponse.json(payload, {
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=120',
        'X-Portal-Version': '2.2.0',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Internal error', detail: String(err) }, { status: 500 });
  }
}
