import trafficPaths from "./searchTrafficPaths.json";
import { JUDETE_FULL_DATA } from "@/lib/localitati";
import { localSpecialty, resolveLocalProductKey } from "./siteSpecialization";
import { townsOfCounty } from "./localTowns";
import { getProductBySlug } from "@/lib/products";
import { getCatalogFamily } from "@/lib/catalog/families";
import { MATERIALE_DATA } from "./materialeData";
import { INTENT_LABELS } from "./intents";
import { STILURI_DATA } from "./stiluriData";
import { REGLEMENTARI_DATA } from "./reglementariData";

/**
 * Lista paginilor /judet/... indexabile pe site-ul curent (= sitemap-ul pe județ).
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI (searchTrafficPaths.json diferă pe site).
 *
 *  1. toate orașele județului (municipii, orașe, București + sectoare; lib/seo/localTowns.ts);
 *  2. oraș × produs de specialitate al site-ului (LOCAL_SPECIALTY din siteSpecialization.ts);
 *  3. orice URL /judet/... cu afișări în Search Console (searchTrafficPaths.json, lista doar
 *     crește: _deploy/refresh-print-traffic-paths.py), dacă pagina există (200).
 * Restul paginilor rămân live (200), cu noindex,follow (vezi localIndexPolicy.ts).
 * Canonicalul rămâne pe sine; nu există canonical între site-uri.
 */

/** Data ultimei schimbări a șablonului paginilor locale (lastmod minim în sitemap). */
export const LOCAL_TEMPLATE_VERSION = "2026-10-08";
/** Păstrat pentru compatibilitate (versiunea anterioară a selecției). */
export const PRIORITY_CONTENT_VERSION = LOCAL_TEMPLATE_VERSION;

const cache = new Map<string, string[]>();
const QUALIFIERS = ["ieftin", "pret", "preturi", "personalizat", "personalizate"];

export function validLocalProduct(tail: string[]): boolean {
  if (!tail.length || resolveLocalProductKey(tail)) return true;
  if (tail.length === 1 && getCatalogFamily(tail[0])) return true;
  if (getProductBySlug(tail.join("/"))) return true;
  if (tail.length !== 2 || !getProductBySlug(tail[0])) return false;
  const target = tail[1].replace(/^pentru-/, "");
  return Boolean(INTENT_LABELS[target] || MATERIALE_DATA.some((m) => m.slug === target || m.id === target)
    || STILURI_DATA.some((s) => s.slug === target) || REGLEMENTARI_DATA.some((r) => r.slug === target));
}

/** Cheile de produs + familiile de specialitate care chiar au pagină pe site-ul curent. */
export function specialtyLocalSlugs(origin: string): string[] {
  const s = localSpecialty(origin);
  return [
    ...s.products.filter((k) => resolveLocalProductKey(k) === k && Boolean(getProductBySlug(k))),
    ...s.families.filter((f) => Boolean(getCatalogFamily(f))),
  ];
}

/** URL-urile /judet/... cu afișări în Search Console, aduse la calea finală (după redirecturi). */
export function trafficCountyPaths(county: string): string[] {
  const judet = JUDETE_FULL_DATA.find((j) => j.slug === county);
  if (!judet) return [];
  const valid = new Set(judet.localitati.map((l) => l.slug));
  const out = new Set<string>();
  for (const path of trafficPaths as string[]) {
    const parts = path.split("/").filter(Boolean);
    if (parts[0] !== "judet" || parts[1] !== county || !parts[2] || !valid.has(parts[2])) continue;
    const tail = parts.slice(3);
    if (tail.length > 1 && QUALIFIERS.includes(tail[tail.length - 1])) tail.pop();
    if (!validLocalProduct(tail)) continue; // URL-uri vechi cu afișări, dar produse retrase (404).
    const key = resolveLocalProductKey(tail);
    out.add(key ? `/judet/${county}/${parts[2]}/${key}` : `/${parts.slice(0, 3).concat(tail).join("/")}`);
  }
  return [...out];
}

export function priorityCountyPaths(county: string, origin: string, extraProducts: string[] = []): string[] {
  const cacheKey = `${origin}|${county}|${extraProducts.join(",")}`;
  const saved = cache.get(cacheKey);
  if (saved) return saved;
  const judet = JUDETE_FULL_DATA.find((j) => j.slug === county);
  if (!judet) return [];
  const valid = new Set(judet.localitati.map((l) => l.slug));
  const products = [...specialtyLocalSlugs(origin), ...extraProducts];
  const paths = new Set<string>();
  for (const town of townsOfCounty(county)) {
    if (!valid.has(town.slug)) continue;
    paths.add(`/judet/${county}/${town.slug}`);
    for (const product of products) paths.add(`/judet/${county}/${town.slug}/${product}`);
  }
  for (const p of trafficCountyPaths(county)) paths.add(p);
  const result = [...paths];
  cache.set(cacheKey, result);
  return result;
}
