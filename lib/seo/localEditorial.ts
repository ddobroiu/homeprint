import "server-only";
import fs from "node:fs";
import path from "node:path";
import { siteKeyFromOrigin, type SiteKey } from "./siteSpecialization";

/**
 * Bloc editorial opțional pe pagina unui oraș: data/local-content/{site}/{judet}/{oras}.json
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI. {site} = shopprint | prynt | euprint | homeprint |
 * adbanner | tablou. Format:
 *   { "intro": "…", "useCases": ["…"], "faq": [{ "q": "…", "a": "…" }], "updatedAt": "2026-10-08" }
 * Textul e tratat ca text simplu: etichetele HTML sunt eliminate, iar React escapează restul
 * (fără dangerouslySetInnerHTML). Lipsește fișierul sau e invalid → nu se afișează nimic.
 * next.config include data/local-content/** în build-ul standalone (outputFileTracingIncludes).
 */

export type LocalEditorial = { intro?: string; useCases: string[]; faq: Array<{ q: string; a: string }>; updatedAt?: string };

const ROOT = path.join(process.cwd(), "data", "local-content");
const SLUG_RE = /^[a-z0-9-]{1,64}$/;
const cache = new Map<string, LocalEditorial | null>();

function clean(v: unknown, max: number): string | undefined {
    if (typeof v !== "string") return undefined;
    const s = v.replace(/<[^>]*>/g, "").replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "").replace(/\s+/g, " ").trim();
    return s ? s.slice(0, max) : undefined;
}

export function getLocalEditorial(origin: string, judetSlug: string, locSlug: string): LocalEditorial | undefined {
    const site: SiteKey | undefined = siteKeyFromOrigin(origin);
    const j = String(judetSlug || "").toLowerCase();
    const l = String(locSlug || "").toLowerCase();
    if (!site || !SLUG_RE.test(j) || !SLUG_RE.test(l)) return undefined;
    const key = `${site}/${j}/${l}`;
    if (cache.has(key)) return cache.get(key) ?? undefined;
    let out: LocalEditorial | null = null;
    try {
        const raw = JSON.parse(fs.readFileSync(path.join(ROOT, site, j, `${l}.json`), "utf8")) as Record<string, unknown>;
        const intro = clean(raw.intro, 2000);
        const useCases = (Array.isArray(raw.useCases) ? raw.useCases : []).map((u) => clean(u, 400)).filter((u): u is string => Boolean(u)).slice(0, 8);
        const faq = (Array.isArray(raw.faq) ? raw.faq : [])
            .map((f) => (f && typeof f === "object" ? { q: clean((f as { q?: unknown }).q, 200), a: clean((f as { a?: unknown }).a, 1200) } : null))
            .filter((f): f is { q: string; a: string } => Boolean(f?.q && f?.a))
            .slice(0, 8);
        const updatedAt = typeof raw.updatedAt === "string" && /^\d{4}-\d{2}-\d{2}/.test(raw.updatedAt) ? raw.updatedAt.slice(0, 10) : undefined;
        if (intro || useCases.length || faq.length) out = { intro, useCases, faq, updatedAt };
    } catch {
        out = null;
    }
    cache.set(key, out);
    return out ?? undefined;
}

/** Cea mai recentă dată `updatedAt` din fișierele editoriale ale unui județ (pentru lastmod în sitemap). */
export function editorialUpdatedAt(origin: string, judetSlug: string): Map<string, string> {
    const out = new Map<string, string>();
    const site = siteKeyFromOrigin(origin);
    const j = String(judetSlug || "").toLowerCase();
    if (!site || !SLUG_RE.test(j)) return out;
    let files: string[] = [];
    try {
        files = fs.readdirSync(path.join(ROOT, site, j)).filter((f) => f.endsWith(".json"));
    } catch {
        return out;
    }
    for (const f of files) {
        const loc = f.replace(/\.json$/, "");
        const e = getLocalEditorial(origin, j, loc);
        if (e?.updatedAt) out.set(loc, e.updatedAt);
    }
    return out;
}
