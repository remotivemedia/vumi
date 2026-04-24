/**
 * Spain Command Center — live JSON data feed.
 *
 * Exposes the same payload the portal reads, so downstream tools (broker
 * one-pagers, dashboards, exports) can consume it without crossing origins.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UPSTREAM = "https://pytjweipmorwfdmxdcgi.supabase.co/functions/v1/vumi-portal/data";

export async function GET(): Promise<Response> {
  try {
    const upstream = await fetch(UPSTREAM, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    const body = await upstream.text();

    return new Response(body, {
      status: upstream.status,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "public, max-age=30, s-maxage=30, stale-while-revalidate=120",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(JSON.stringify({ ok: false, error: message }), {
      status: 502,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
}
