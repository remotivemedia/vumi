/**
 * Spain Command Center — strategic intelligence portal.
 *
 * Served at `/intelligence`. Lives alongside the consumer marketing page at `/`.
 *
 * The portal is authored and rendered in Supabase so it can refresh live from
 * the underlying data store on every request. This route handler transparently
 * proxies it through Next.js so it ships on the same domain as the rest of the
 * application and benefits from Vercel's edge cache.
 */

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const UPSTREAM = "https://pytjweipmorwfdmxdcgi.supabase.co/functions/v1/vumi-portal";

export async function GET(): Promise<Response> {
  try {
    const upstream = await fetch(UPSTREAM, {
      method: "GET",
      headers: { Accept: "text/html" },
      cache: "no-store",
    });

    const html = await upstream.text();

    return new Response(html, {
      status: upstream.status,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=60, stale-while-revalidate=300",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin",
      },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return new Response(
      `<!doctype html><html><head><title>Command Center unavailable</title></head><body style="font-family:system-ui;padding:40px;max-width:600px;margin:0 auto"><h1 style="color:#0033A0">Command Center is loading</h1><p>The live intelligence source is momentarily unreachable. Retry in a few seconds.</p><pre style="color:#6B7785;font-size:.85rem">${message.replace(/[<>&]/g, "")}</pre></body></html>`,
      { status: 502, headers: { "Content-Type": "text/html; charset=utf-8" } }
    );
  }
}
