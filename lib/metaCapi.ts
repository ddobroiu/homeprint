// Meta Conversions API (server side): "Purchase" for a paid Stripe order (webhook) and for a
// cash-on-delivery order at creation (api/checkout/create-order), complementing the browser
// pixel (lib/metaPixel.ts, components/ConversionTracker.tsx). Mirrors lib/tiktok-events.ts:
// - sent ONLY when the buyer had accepted marketing cookies at checkout (the checkout page sends
//   that choice as `tiktokConsent`, read from lib/cookieConsent.ts); no consent -> nothing is sent;
// - for card payments the choice, the _fbp/_fbc cookies, IP, user agent and the checkout URL travel
//   in the Stripe session metadata (metaCheckoutMetadata) and are read back in the webhook
//   (metaContextFromMetadata); for cash on delivery they come straight from the request;
// - deduplicated with the pixel through event_id = "order-<orderNo>" (same eventID as the browser);
// - personal data (email, phone in +40 form, first/last name, city, country, external_id) is
//   normalized and SHA-256 hashed; IP, user agent, fbp and fbc are sent as is, as Meta requires.
// Env: META_CAPI_TOKEN (missing -> disabled), pixel = TRACKING.metaPixelId passed by the caller
// (META_PIXEL_ID overrides), META_TEST_EVENT_CODE (optional, Test Events tab),
// META_CAPI_DRY_RUN=1 (logs what would be sent, without personal data, and sends nothing).
// Never throws, 8 s timeout; errors are logged, only token/permission errors are alerted.
// Server only (node:crypto, secret token).
// Docs: https://developers.facebook.com/docs/marketing-api/conversions-api/parameters
import { createHash } from "node:crypto";

export const META_GRAPH_VERSION: string = "v23.0";

// Stripe metadata keys (values max 500 chars)
const KEYS = { consent: "fb_consent", fbp: "fb_fbp", fbc: "fb_fbc", ip: "fb_ip", ua: "fb_ua", url: "fb_url" } as const;

export interface MetaContext {
  marketing: boolean;
  fbp?: string;
  fbc?: string;
  ip?: string;
  userAgent?: string;
  sourceUrl?: string;
}

function clean(value: string | null | undefined, max: number): string | undefined {
  const v: string = (value ?? "").trim();
  return v ? v.slice(0, max) : undefined;
}

/** _fbp looks like fb.1.<ms>.<random>; anything else is dropped. */
export function validFbp(value: string | null | undefined): string | undefined {
  const v = clean(value, 200);
  return v && /^fb\.\d\.\d+\.\d+$/.test(v) ? v : undefined;
}

/** _fbc looks like fb.1.<ms>.<fbclid>; anything else is dropped. */
export function validFbc(value: string | null | undefined): string | undefined {
  const v = clean(value, 500);
  return v && /^fb\.\d\.\d+\.[A-Za-z0-9_-]+$/.test(v) ? v : undefined;
}

/** First IP of x-forwarded-for (behind the proxy), else x-real-ip. */
export function metaClientIp(headers: Headers): string | undefined {
  const forwarded: string | undefined = headers.get("x-forwarded-for")?.split(",")[0];
  return clean(forwarded ?? headers.get("x-real-ip"), 64);
}

/** Context for a request (cash on delivery: the buyer is on the site right now). */
export function metaContextFromRequest(
  req: { headers: Headers; cookies: { get(name: string): { value: string } | undefined } },
  marketing: boolean,
): MetaContext {
  if (!marketing) return { marketing: false };
  return {
    marketing: true,
    fbp: validFbp(req.cookies.get("_fbp")?.value),
    fbc: validFbc(req.cookies.get("_fbc")?.value),
    ip: metaClientIp(req.headers),
    userAgent: clean(req.headers.get("user-agent"), 500),
    sourceUrl: clean(req.headers.get("referer"), 500),
  };
}

/**
 * Metadata to put on the Stripe Checkout session. Empty without marketing consent,
 * so nothing Meta-related is stored or sent for buyers who did not accept.
 */
export function metaCheckoutMetadata(ctx: MetaContext): Record<string, string> {
  if (!ctx.marketing) return {};
  const meta: Record<string, string> = { [KEYS.consent]: "1" };
  const fbp = validFbp(ctx.fbp);
  const fbc = validFbc(ctx.fbc);
  const ip = clean(ctx.ip, 64);
  const ua = clean(ctx.userAgent, 500);
  const url = clean(ctx.sourceUrl, 500);
  if (fbp) meta[KEYS.fbp] = fbp;
  if (fbc) meta[KEYS.fbc] = fbc;
  if (ip) meta[KEYS.ip] = ip;
  if (ua) meta[KEYS.ua] = ua;
  if (url) meta[KEYS.url] = url;
  return meta;
}

/** Context read back from the Stripe session metadata (webhook). */
export function metaContextFromMetadata(metadata: Record<string, string> | null | undefined): MetaContext {
  const m: Record<string, string> = metadata ?? {};
  if (m[KEYS.consent] !== "1") return { marketing: false };
  return {
    marketing: true,
    fbp: validFbp(m[KEYS.fbp]),
    fbc: validFbc(m[KEYS.fbc]),
    ip: clean(m[KEYS.ip], 64),
    userAgent: clean(m[KEYS.ua], 500),
    sourceUrl: clean(m[KEYS.url], 500),
  };
}

export function sha256(value: string): string {
  return createHash("sha256").update(value, "utf8").digest("hex");
}

function stripDiacritics(value: string): string {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "");
}

export function normalizeEmail(email: string | null | undefined): string | undefined {
  const v: string = (email ?? "").trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? v : undefined;
}

/**
 * Phone as Meta wants it before hashing: digits only, with the country code
 * (Romanian national numbers 07xx... -> 407xx...). undefined when unusable.
 */
export function normalizePhone(phone: string | null | undefined): string | undefined {
  if (!phone) return undefined;
  let p: string = phone.trim().replace(/[\s().\-/]/g, "");
  if (p.startsWith("00")) p = "+" + p.slice(2);
  if (!p.startsWith("+")) {
    if (/^0\d{9}$/.test(p)) p = "+40" + p.slice(1);
    else if (/^40\d{9}$/.test(p)) p = "+" + p;
    else if (/^7\d{8}$/.test(p)) p = "+40" + p;
    else return undefined;
  }
  return /^\+\d{8,15}$/.test(p) ? p.slice(1) : undefined;
}

/** Names: lowercase, no diacritics, letters a-z only (Meta: "lowercase, no punctuation"). */
export function normalizeName(value: string | null | undefined): string | undefined {
  const v: string = stripDiacritics((value ?? "").toLowerCase()).replace(/[^a-z]/g, "");
  return v || undefined;
}

/** City: lowercase, no diacritics, no spaces/punctuation ("București" -> "bucuresti"). */
export function normalizeCity(value: string | null | undefined): string | undefined {
  const v: string = stripDiacritics((value ?? "").toLowerCase()).replace(/[^a-z]/g, "");
  return v && v !== "na" ? v : undefined;
}

/** ISO 3166-1 alpha-2, lowercase (default "ro" is applied by the caller). */
export function normalizeCountry(value: string | null | undefined): string | undefined {
  const v: string = (value ?? "").trim().toLowerCase();
  if (v === "romania" || v === "românia") return "ro";
  return /^[a-z]{2}$/.test(v) ? v : undefined;
}

/** "Ion Popescu" -> first "Ion", last "Popescu" (the checkout joins firstName + lastName). */
export function splitFullName(full: string | null | undefined): { firstName?: string; lastName?: string } {
  const parts: string[] = (full ?? "").trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0 || (parts.length === 1 && /^n\/?a$/i.test(parts[0]))) return {};
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") || undefined };
}

/** Cart / checkout items (any of the shapes used by the checkout and the webhook) -> Meta contents. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function metaContentsFromItems(items: any[] | null | undefined): { id: string; quantity: number; item_price: number }[] {
  return (Array.isArray(items) ? items : []).slice(0, 50).map((it) => ({
    id: String(it?.productId || it?.id || it?.slug || it?.name || "produs").slice(0, 100),
    quantity: Number(it?.quantity) || 1,
    item_price: Number(it?.unitAmount ?? it?.price ?? 0) || 0,
  }));
}

/** Buyer fields from the order address saved by create-order (nume_prenume, email, telefon, localitate, country). */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function metaBuyerFromAddress(address: any): Pick<MetaPurchase, "email" | "phone" | "firstName" | "lastName" | "city" | "country"> {
  const a = address ?? {};
  const fromParts = a.firstName || a.lastName ? { firstName: a.firstName, lastName: a.lastName } : splitFullName(a.nume_prenume || a.name);
  return {
    email: a.email,
    phone: a.telefon || a.phone,
    firstName: fromParts.firstName,
    lastName: fromParts.lastName,
    city: a.localitate || a.city,
    country: a.country || "RO",
  };
}

export interface MetaPurchase {
  pixelId?: string | null;
  // Same id the browser pixel sends as eventID ("order-<orderNo>")
  eventId: string;
  orderId?: string;
  value: number;
  currency: string;
  contents: { id: string; quantity: number; item_price: number }[];
  // Fallback when the checkout URL was not captured
  eventSourceUrl: string;
  email?: string | null;
  phone?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  city?: string | null;
  country?: string | null;
  externalId?: string | null;
  context: MetaContext;
  eventTime?: number;
}

export function metaPixelIdFor(p: Pick<MetaPurchase, "pixelId">): string | undefined {
  return clean(process.env.META_PIXEL_ID, 40) || clean(p.pixelId ?? undefined, 40);
}

/** The request body, without the access token (exported for tests). */
export function buildMetaPurchasePayload(p: MetaPurchase): Record<string, unknown> {
  const ctx: MetaContext = p.context;
  const user: Record<string, unknown> = {};
  const hashed = (key: string, value: string | undefined) => {
    if (value) user[key] = [sha256(value)];
  };
  hashed("em", normalizeEmail(p.email));
  hashed("ph", normalizePhone(p.phone));
  hashed("fn", normalizeName(p.firstName));
  hashed("ln", normalizeName(p.lastName));
  hashed("ct", normalizeCity(p.city));
  hashed("country", normalizeCountry(p.country) ?? "ro");
  if (p.externalId) user.external_id = [sha256(String(p.externalId))];
  if (ctx.ip) user.client_ip_address = ctx.ip;
  if (ctx.userAgent) user.client_user_agent = ctx.userAgent;
  const fbp = validFbp(ctx.fbp);
  const fbc = validFbc(ctx.fbc);
  if (fbp) user.fbp = fbp;
  if (fbc) user.fbc = fbc;

  const contents = p.contents.slice(0, 50);
  const event: Record<string, unknown> = {
    event_name: "Purchase",
    event_time: p.eventTime ?? Math.floor(Date.now() / 1000),
    event_id: p.eventId,
    action_source: "website",
    event_source_url: ctx.sourceUrl || p.eventSourceUrl,
    user_data: user,
    custom_data: {
      currency: p.currency.toUpperCase(),
      value: Math.round(p.value * 100) / 100,
      content_type: "product",
      content_ids: contents.map((c) => c.id),
      contents,
      num_items: contents.reduce((s, c) => s + c.quantity, 0),
      order_id: p.orderId ?? p.eventId,
    },
  };

  const body: Record<string, unknown> = { data: [event] };
  const testCode: string | undefined = clean(process.env.META_TEST_EVENT_CODE, 64);
  if (testCode) body.test_event_code = testCode;
  return body;
}

function isAuthError(status: number, code: number | undefined, message: string): boolean {
  return status === 401 || status === 403 || code === 190 || code === 10 || code === 200
    || /access[ _-]?token|permission|unauthori[sz]ed|does not exist|cannot be loaded/i.test(message);
}

/**
 * Sends Purchase. No-op without META_CAPI_TOKEN (unless META_CAPI_DRY_RUN=1, which only logs), without a pixel id, without the buyer's
 * marketing consent or without a user agent (required for website events).
 * Resolves to true when Meta accepted the event. Never throws. Call once per order.
 */
export async function sendMetaPurchase(p: MetaPurchase): Promise<boolean> {
  const token: string | undefined = clean(process.env.META_CAPI_TOKEN, 1000);
  const pixelId: string | undefined = metaPixelIdFor(p);
  if (!pixelId || !p.context.marketing || !p.context.userAgent) return false;
  const dryRun: boolean = process.env.META_CAPI_DRY_RUN === "1";
  if (!token && !dryRun) return false;
  try {
    const body: Record<string, unknown> = buildMetaPurchasePayload(p);
    if (dryRun) {
      const event = (body.data as Record<string, unknown>[])[0];
      console.log("[meta-capi] dry run, not sent:", p.eventId, JSON.stringify({
        pixelId,
        user_data_keys: Object.keys(event.user_data as object),
        custom_data: event.custom_data,
        test_event_code: body.test_event_code ? "set" : "none",
      }));
      return false;
    }
    const res: Response = await fetch(`https://graph.facebook.com/${META_GRAPH_VERSION}/${encodeURIComponent(pixelId)}/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // token in the body, not in the URL (keeps it out of proxy/access logs)
      body: JSON.stringify({ ...body, access_token: token }),
      signal: AbortSignal.timeout(8000),
    });
    const data = (await res.json().catch(() => null)) as { events_received?: number; error?: { code?: number; message?: string } } | null;
    if (res.ok && (data?.events_received ?? 0) >= 1) return true;
    const message: string = `HTTP ${res.status}, code ${data?.error?.code ?? "?"}: ${data?.error?.message ?? ""}`;
    console.error("[meta-capi] Purchase rejected:", p.eventId, message);
    if (isAuthError(res.status, data?.error?.code, data?.error?.message ?? "")) {
      void import("./alerts")
        .then((m) => m.alerta("error", "meta-capi", `Meta Conversions API a refuzat token-ul/pixelul (${message})`))
        .catch(() => {});
    }
  } catch (error: unknown) {
    console.error("[meta-capi] Purchase failed:", p.eventId, error instanceof Error ? error.message : error);
  }
  return false;
}
