/**
 * Spain Command Center — health probe.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UPSTREAM = "https://pytjweipmorwfdmxdcgi.supabase.co/functions/v1/vumi-portal/health";

export async function GET(): Promise<Response> {
  try {
    const upstream = await fetch(UPSTREAM, { cache: "no-store" });
    const body = await upstream.text();
    return new Response(body, {
      status: upstream.status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ ok: false, error: err instanceof Error ? err.message : String(err) }),
      { status: 502, headers: { "Content-Type": "application/json; charset=utf-8" } }
    );
  }
}
