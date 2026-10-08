import { priorityCountyPaths } from "./priorityLocalities";
import { resolveLocalProductKey } from "./siteSpecialization";

/** Indexabile = exact lista din sitemap (priorityLocalities.ts): orașele, oraș × produs de
 * specialitate al site-ului și URL-urile cu afișări în Search Console. Restul paginilor
 * /judet/... rămân accesibile (200) cu noindex,follow: nu blocăm cumpărarea, nu schimbăm
 * canonicalul și nu depindem de user-agent. */
const countySets = new Map<string, Set<string>>();
export function isIndexableLocalPage(origin: string, county: string, locality: string, product: string[] = []): boolean {
  const cacheKey = `${origin}|${county}`;
  let paths = countySets.get(cacheKey);
  if (!paths) {
    paths = new Set(priorityCountyPaths(county, origin));
    countySets.set(cacheKey, paths);
  }
  const key = resolveLocalProductKey(product);
  const suffix = key || product.join("/");
  return paths.has(`/judet/${county}/${locality}${suffix ? `/${suffix}` : ""}`);
}
