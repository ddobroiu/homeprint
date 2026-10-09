// Meta Pixel (browser): evenimentele standard trimise prin `fbq`.
// Pixelul se încarcă NUMAI după acordul pentru marketing, din components/CookieConsent.tsx
// (ID-ul din lib/company.ts -> TRACKING.metaPixelId), și niciodată pe localhost / gazde de dezvoltare.
// trackMeta nu face nimic fără acord, fără pixel încărcat sau pe o gazdă de dezvoltare.
// Purchase are eventID = "order-<nr>", același ca evenimentul trimis de server prin
// Conversions API (lib/metaCapi.ts), ca Meta să le deduplice.

import { readConsent } from "@/lib/cookieConsent";

type Fbq = (...args: unknown[]) => void;

/** Gazdele pe care nu trimitem nimic la Meta (dezvoltare locală, rețea internă, build de test). */
export function isMetaDevHost(hostname: string | null | undefined): boolean {
    const h = (hostname || "").toLowerCase().replace(/^\[|\]$/g, "");
    if (!h) return true;
    if (h === "localhost" || h.endsWith(".localhost") || h.endsWith(".local") || h.endsWith(".test")) return true;
    if (h === "::1" || h === "0.0.0.0" || /^127\./.test(h)) return true;
    if (/^10\./.test(h) || /^192\.168\./.test(h) || /^172\.(1[6-9]|2\d|3[01])\./.test(h)) return true;
    return false;
}

/** True doar în producție, pe o gazdă reală. */
export function metaAllowedHere(): boolean {
    if (typeof window === "undefined") return false;
    if (process.env.NODE_ENV !== "production") return false;
    return !isMetaDevHost(window.location.hostname);
}

function fbq(): Fbq | undefined {
    const f = (window as unknown as { fbq?: Fbq }).fbq;
    return typeof f === "function" ? f : undefined;
}

/**
 * Trimite un eveniment standard Meta. No-op (false) fără acord pentru marketing,
 * fără pixel încărcat sau pe o gazdă de dezvoltare.
 */
export function trackMeta(event: string, params?: Record<string, unknown>, eventId?: string): boolean {
    if (!metaAllowedHere()) return false;
    if (!readConsent()?.marketing) return false;
    const f = fbq();
    if (!f) return false;
    if (eventId) f("track", event, params ?? {}, { eventID: eventId });
    else f("track", event, params ?? {});
    return true;
}

/** ID unic pentru evenimentele fără pereche pe server (Contact, Lead, AddToCart...). */
export function metaEventId(prefix: string): string {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

// Produsele din coș la începerea comenzii, ca Purchase de pe pagina de mulțumire să aibă content_ids.
const CHECKOUT_KEY = "meta_checkout_contents";

export type MetaContent = { id: string; quantity: number; item_price?: number };

export function rememberMetaCheckout(contents: MetaContent[]) {
    try {
        sessionStorage.setItem(CHECKOUT_KEY, JSON.stringify(contents.slice(0, 50)));
    } catch {
        // fără sessionStorage: Purchase pleacă fără content_ids
    }
}

export function readMetaCheckout(): MetaContent[] {
    try {
        const raw = sessionStorage.getItem(CHECKOUT_KEY);
        const parsed = raw ? JSON.parse(raw) : null;
        return Array.isArray(parsed) ? parsed.filter((c) => c && typeof c.id === "string") : [];
    } catch {
        return [];
    }
}

// Paginile de produs / configurator pe care trimitem ViewContent (aceeași listă pe toate site-urile;
// rutele inexistente pe un site pur și simplu nu apar).
const PRODUCT_PREFIXES = [
    "/configurator/",
    "/produse/",
    "/shop/",
    "/banner-product/",
    "/canvas-product/",
    "/semnalistica-product/",
    "/bannere/",
    "/canvas/",
    "/dimensiuni/",
    "/preturi/",
];
const PRODUCT_EXCLUDED_PREFIXES = ["/shop/canvas/"];
const PRODUCT_PAGES = [
    "/afise", "/autocolante", "/banner", "/banner-verso", "/carti-vizita", "/flayere", "/pliante",
    "/rollup", "/tapet", "/window-graphics", "/alucobond", "/carton", "/mesh", "/plexiglass",
    "/polipropilena", "/pvc-forex", "/hanorace", "/tricouri", "/sepci", "/panouri", "/semnalistica",
];

/** content_id pentru ViewContent dacă pagina e de produs / configurator, altfel null. */
export function metaProductIdFromPath(pathname: string | null | undefined): string | null {
    const p = (pathname || "/").replace(/\/+$/, "") || "/";
    if (PRODUCT_PAGES.includes(p)) return p.slice(1);
    if (PRODUCT_EXCLUDED_PREFIXES.some((x) => p.startsWith(x))) return null;
    if (!PRODUCT_PREFIXES.some((x) => p.startsWith(x))) return null;
    const segments = p.split("/").filter(Boolean);
    if (segments.length < 2) return null;
    return decodeURIComponent(segments[segments.length - 1]).slice(0, 100);
}

const CONTACT_HOSTS = ["wa.me", "api.whatsapp.com", "web.whatsapp.com", "whatsapp://"];

/** Tipul de contact pentru un link (WhatsApp / telefon / e-mail), altfel null. */
export function metaContactChannel(href: string | null | undefined): "whatsapp" | "phone" | "email" | null {
    const v = (href || "").trim().toLowerCase();
    if (!v) return null;
    if (CONTACT_HOSTS.some((h) => v.includes(h))) return "whatsapp";
    if (v.startsWith("tel:")) return "phone";
    if (v.startsWith("mailto:")) return "email";
    return null;
}
