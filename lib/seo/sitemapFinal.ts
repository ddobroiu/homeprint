import fs from "node:fs";
import path from "node:path";

/**
 * Harta sitului trebuie să conțină doar adrese finale (200, canonice).
 * Google raportează în Search Console „pagină cu redirecționare” pentru orice
 * adresă din sitemap care trimite mai departe (307/308), iar listele goale nu ajută.
 *
 * - redirecționările din next.config (redirects()) se citesc din
 *   .next/routes-manifest.json, generat la build, deci rămân mereu sincronizate;
 * - adresele cu parametri (?program=...) au canonical fără parametri: nu intră;
 * - dublurile se scot.
 */

type ManifestRedirect = { regex: string; has?: unknown; missing?: unknown; internal?: boolean };

let redirectRes: RegExp[] | null = null;

function configRedirects(): RegExp[] {
    if (redirectRes) return redirectRes;
    redirectRes = [];
    const dirs = [process.env.NEXT_DIST_DIR, ".next"].filter((d): d is string => Boolean(d));
    for (const dir of dirs) {
        try {
            const manifest = JSON.parse(fs.readFileSync(path.join(process.cwd(), dir, "routes-manifest.json"), "utf8")) as { redirects?: ManifestRedirect[] };
            redirectRes = (manifest.redirects ?? [])
                // „internal” = slash-ul final; „has/missing” = condiții de host (www), nu se aplică adreselor canonice.
                .filter((r) => !r.internal && !r.has && !r.missing && typeof r.regex === "string")
                .map((r) => new RegExp(r.regex));
            break;
        } catch {
            // fără manifest (ex. teste): nu filtrăm
        }
    }
    return redirectRes;
}

/** true dacă adresa (doar calea, fără domeniu) e redirecționată de next.config. */
export function isConfigRedirect(pathname: string): boolean {
    return configRedirects().some((re) => re.test(pathname));
}

/** Calea finală pentru o adresă de sitemap sau null dacă nu trebuie listată. */
export function sitemapFinalPath(url: string): string | null {
    const pathname = url.replace(/^https?:\/\/[^/]+/, "") || "/";
    if (pathname.includes("?") || pathname.includes("&amp;")) return null;
    if (isConfigRedirect(pathname)) return null;
    return pathname;
}

const URL_BLOCK = /  <url>\n    <loc>([^<]*)<\/loc>[\s\S]*?<\/url>\n/g;

/** Scoate din <urlset> adresele care redirecționează, cele cu parametri și dublurile. */
export function finalizeUrlset(xml: string): string {
    const seen = new Set<string>();
    return xml.replace(URL_BLOCK, (block: string, loc: string) => {
        if (seen.has(loc) || sitemapFinalPath(loc) === null) return "";
        seen.add(loc);
        return block;
    });
}

/**
 * Scoate din indexul de sitemap listele fără nicio adresă (ex. „recomandat-0”
 * când toate combinațiile sunt noindex). Listele pe județ sunt mari și mereu
 * pline, deci nu se verifică.
 */
export async function pruneEmptyChildSitemaps(indexXml: string, loadChild: (id: string) => Promise<Response>): Promise<string> {
    const re = /  <sitemap>\s*<loc>[^<]*\/server-sitemap\/([^<]+)<\/loc>\s*<\/sitemap>\n/g;
    const ids = [...indexXml.matchAll(re)].map((m) => m[1]).filter((id) => !id.startsWith("judet-"));
    const empty = new Set<string>();
    await Promise.all(ids.map(async (id) => {
        try {
            const body = await (await loadChild(id)).text();
            if (!body.includes("<url>")) empty.add(id);
        } catch {
            // la eroare lista rămâne în index
        }
    }));
    if (!empty.size) return indexXml;
    return indexXml.replace(re, (block: string, id: string) => (empty.has(id) ? "" : block));
}
