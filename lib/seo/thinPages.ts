import trafficPages from "./searchTrafficPages.json";

/**
 * Paginile-combinație generate automat (noindex,follow + scoase din sitemap).
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI (searchTrafficPages.json diferă pe site).
 *
 * GSC 09.10.2026: Google indexa doar 15–40% din sitemap; neindexate erau aproape numai combinațiile
 * (produs × industrie, preț pe cantitate, variante „-telefon-personalizat”, drapelele de țări),
 * „accesate – neindexate” = conținut prea asemănător. Paginile rămân live (200, în magazin, legate
 * intern), dar cu noindex,follow și fără loc în sitemap:
 *  - /recomandat/{produs}/{industrie|scop}
 *  - /industrii/{industrie}/{produs}          (pagina /industrii/{industrie} rămâne indexabilă)
 *  - /preturi/{produs}/{format}-{n}-buc        (pagina /preturi/{produs} rămâne indexabilă)
 *  - /banner-product/{model}-telefon-personalizat și /{model}-telefon-personalizat (modelul de bază rămâne indexabil)
 *  - /produse/steaguri-si-drapele/drapel-{tara}
 * EXCEPȚIE: orice astfel de URL cu afișări în Search Console (searchTrafficPages.json, ~16 luni,
 * lista doar crește: _deploy/refresh-print-traffic-paths.py) rămâne indexabil și în sitemap.
 * Paginile /judet/... au regula lor (localIndexPolicy.ts + searchTrafficPaths.json).
 */

const TRAFFIC = new Set((trafficPages as string[]).map((p) => normalizePath(p)));

function normalizePath(path: string): string {
  let p = String(path || "").split(/[?#]/)[0].toLowerCase();
  p = p.replace(/^https?:\/\/[^/]+/, "").replace(/\/+$/, "");
  return p.startsWith("/") ? p : `/${p}`;
}

/** Calea e o combinație generată (indiferent de trafic). */
export function isThinCombination(path: string): boolean {
  const s = normalizePath(path).split("/").filter(Boolean);
  if (s.length === 3 && (s[0] === "recomandat" || s[0] === "industrii" || s[0] === "preturi")) return true;
  if (s.length === 2 && s[0] === "banner-product" && s[1].endsWith("-telefon-personalizat")) return true;
  // aceleași variante publicate și la rădăcină (/{model}-telefon-personalizat → 307 spre /banner-product/...)
  if (s.length === 1 && s[0].endsWith("-telefon-personalizat")) return true;
  if (s.length === 3 && s[0] === "produse" && s[1] === "steaguri-si-drapele" && s[2].startsWith("drapel-")) return true;
  return false;
}

/** Combinație fără afișări în Search Console → noindex,follow și în afara sitemap-ului. */
export function isNoindexCombination(path: string): boolean {
  return isThinCombination(path) && !TRAFFIC.has(normalizePath(path));
}

/** Pentru `robots` din generateMetadata: noindex,follow pe combinațiile subțiri, altfel undefined (implicit index). */
export function combinationRobots(path: string): { index: false; follow: true } | undefined {
  return isNoindexCombination(path) ? { index: false, follow: true } : undefined;
}

/**
 * /judet/{judet}/{loc}/{slug-campanie-generic} era o dublură a /judet/{judet}/{loc}/{produs}: același
 * produs, același șablon (GSC: prynt.ro .../cernavoda/tricouri vs .../tricouri-personalizate-pret-producator,
 * Google alesese alt canonical). Doar produsele de campanie GENERICE (titlul = produsul însuși); cele
 * tematice (ex. banner vulcanizare) sunt pagini diferite și rămân. Pagina de campanie face 301 spre cheie.
 */
const GENERIC_CAMPAIGN_LOCAL: Record<string, string> = {
  "tricouri-personalizate-pret-producator": "tricouri",
  "hanorace-personalizate-premium-bumbac": "hanorace",
  "sepci-personalizate-logo-firma": "sepci",
  "banner-publicitar-pret-metru-patrat-calcul-online": "banner",
};

export function campaignLocalKey(productSlug: string[] | string): string | undefined {
  const parts = Array.isArray(productSlug) ? productSlug : String(productSlug || "").split("/").filter(Boolean);
  if (parts.length !== 1) return undefined;
  return GENERIC_CAMPAIGN_LOCAL[parts[0].toLowerCase()];
}
