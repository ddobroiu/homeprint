// TikTok Pixel (măsurarea eficienței reclamelor TikTok și retargeting).
// Se încarcă NUMAI după consimțământul pentru marketing, din components/CookieConsent.tsx,
// și niciodată pe paginile cu date personale (aceeași listă ca Microsoft Clarity, lib/clarity.ts),
// cu o singură excepție: pagina de mulțumire după comandă (/checkout/success), ca să putem
// raporta conversia (CompletePayment) — fără date personale, doar numărul, valoarea și moneda comenzii.

import { isClarityExcludedPath } from "@/lib/clarity";
import { readConsent } from "@/lib/cookieConsent";

export const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID || "DATFTEBC77UA36CC6CPG";

const TIKTOK_SCRIPT_ID = "ttq-init";
/** Pagina de mulțumire după comandă: exclusă pentru Clarity (este sub /checkout), permisă pentru conversie. */
const TIKTOK_THANK_YOU_PATH = "/checkout/success";

// tt_ttclid: click id-ul TikTok din URL-ul de pe reclamă (?ttclid=), păstrat 30 de zile NUMAI cu marketing,
// ca pagina de checkout să-l transmită Events API pe server (lib/tiktok-events.ts)
const TTCLID_COOKIE = "tt_ttclid";
const TIKTOK_COOKIES = ["_ttp", "_tt_enable_cookie", TTCLID_COOKIE];

/** Salvează ?ttclid= din URL-ul curent (apelat doar cu consimțământ pentru marketing). */
function captureTtclid() {
    try {
        const ttclid = new URLSearchParams(window.location.search).get("ttclid");
        if (ttclid && ttclid.length <= 500) {
            document.cookie = `${TTCLID_COOKIE}=${encodeURIComponent(ttclid)}; Path=/; Max-Age=${60 * 60 * 24 * 30}; SameSite=Lax${window.location.protocol === "https:" ? "; Secure" : ""}`;
        }
    } catch {
        // nu strică niciodată pagina
    }
}

export function isTikTokExcludedPath(pathname: string | null | undefined): boolean {
    const p = pathname || "/";
    if (p === TIKTOK_THANK_YOU_PATH || p.startsWith(TIKTOK_THANK_YOU_PATH + "/")) return false;
    return isClarityExcludedPath(p);
}

type Ttq = { [method: string]: (...args: unknown[]) => void };

function win() {
    return window as unknown as {
        ttq?: Ttq;
        __ttqLoaded?: boolean;
        __ttqRevoked?: boolean;
        __ttqLastPath?: string;
    };
}

/** Snippetul oficial TikTok Pixel (neschimbat, doar cu ID-ul parametrizat), cu consimțământul acordat explicit. */
function baseCode(id: string) {
    return `!function (w, d, t) {
  w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(
var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};n=d.createElement("script")
;n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;e=d.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
  ttq.holdConsent();
  ttq.load(${JSON.stringify(id)});
  ttq.page();
  ttq.grantConsent();
}(window, document, 'ttq');`;
}

export function isTikTokLoaded(): boolean {
    if (typeof window === "undefined") return false;
    const w = win();
    return !!w.__ttqLoaded && !w.__ttqRevoked;
}

/** Încarcă pixelul (o singură dată pe durata paginii). Apelați numai cu consimțământ la marketing. */
export function loadTikTok(pathname?: string | null) {
    if (!TIKTOK_PIXEL_ID || typeof window === "undefined") return;
    // apelată numai cu marketing acceptat (CookieConsent / ConversionTracker)
    captureTtclid();
    const path = pathname ?? window.location.pathname;
    if (isTikTokExcludedPath(path)) return;
    const w = win();
    if (w.__ttqLoaded) {
        // consimțământ reacordat după o retragere
        if (w.__ttqRevoked) {
            w.ttq?.grantConsent?.();
            w.__ttqRevoked = false;
        }
        return;
    }
    if (document.getElementById(TIKTOK_SCRIPT_ID)) return;
    const s = document.createElement("script");
    s.id = TIKTOK_SCRIPT_ID;
    s.text = baseCode(TIKTOK_PIXEL_ID);
    document.head.appendChild(s);
    w.__ttqLoaded = true;
    w.__ttqRevoked = false;
    w.__ttqLastPath = path;
}

/**
 * Navigare client-side (App Router): `page()` la fiecare schimbare de cale (prima vizualizare o trimite
 * snippetul). Pe căile excluse nu trimitem nimic; dacă pixelul nu e încă încărcat, îl încărcăm aici.
 */
export function syncTikTokWithPath(pathname: string | null | undefined, marketingConsent: boolean) {
    if (!TIKTOK_PIXEL_ID || typeof window === "undefined" || !marketingConsent) return;
    const path = pathname || "/";
    const w = win();
    if (!w.__ttqLoaded) {
        loadTikTok(path);
        return;
    }
    if (w.__ttqLastPath === path) return;
    w.__ttqLastPath = path;
    if (w.__ttqRevoked || isTikTokExcludedPath(path)) return;
    w.ttq?.page?.();
}

/** La refuz / retragere: revokeConsent() și ștergerea cookie-urilor _ttp / _tt_enable_cookie. */
export function revokeTikTok() {
    if (typeof window === "undefined") return;
    const w = win();
    if (w.__ttqLoaded && !w.__ttqRevoked) {
        w.ttq?.revokeConsent?.();
        w.__ttqRevoked = true;
    }
    const host = window.location.hostname;
    const registrable = host.split(".").slice(-2).join(".");
    const domains = ["", host, "." + host, "." + host.replace(/^www\./, ""), "." + registrable];
    for (const name of TIKTOK_COOKIES) {
        for (const d of domains) {
            document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
        }
    }
}

/**
 * Trimite un eveniment TikTok numai dacă există consimțământ la marketing și pixelul e încărcat.
 * Returnează true dacă evenimentul a fost trimis.
 */
export function trackTikTok(event: string, params?: Record<string, unknown>, options?: Record<string, unknown>): boolean {
    if (typeof window === "undefined" || !TIKTOK_PIXEL_ID) return false;
    if (!readConsent()?.marketing || !isTikTokLoaded()) return false;
    const ttq = win().ttq;
    if (!ttq || typeof ttq.track !== "function") return false;
    if (options) ttq.track(event, params || {}, options);
    else ttq.track(event, params || {});
    return true;
}
