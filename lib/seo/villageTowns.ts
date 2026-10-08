import "server-only";
import fs from "node:fs";
import path from "node:path";
import { isTown, nearestTowns, type NearTown } from "./localTowns";

/**
 * Cel mai apropiat oraș (din același județ) pentru fiecare comună / sat / localitate componentă.
 * lib/seo/data/villageTowns.json (~350 KB) e generat de _deploy/seo-localitati/build-locality-tiers.mjs
 * și citit cu fs, pe server, o singură dată (nu intră în bundle).
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI.
 */
type File = { version?: string; villageTowns?: Record<string, Record<string, [string, number | null]>> };

let _data: File | null = null;
function data(): File {
    if (_data) return _data;
    try {
        _data = JSON.parse(fs.readFileSync(path.join(process.cwd(), "lib", "seo", "data", "villageTowns.json"), "utf8")) as File;
    } catch {
        _data = {};
    }
    return _data;
}

/** Orașul cel mai apropiat (slug + km în linie dreaptă, dacă există coordonate). */
export function villageTown(judetSlug: string, locSlug: string): { slug: string; km?: number } | undefined {
    const r = data().villageTowns?.[judetSlug]?.[locSlug];
    if (!r) return undefined;
    return typeof r[1] === "number" ? { slug: r[0], km: r[1] } : { slug: r[0] };
}

/** Toate comunele / satele județului, grupate pe orașul cel mai apropiat. */
export function villagesByTown(judetSlug: string): Map<string, Array<{ slug: string; km?: number }>> {
    const out = new Map<string, Array<{ slug: string; km?: number }>>();
    for (const [slug, [town, km]] of Object.entries(data().villageTowns?.[judetSlug] ?? {})) {
        const list = out.get(town) ?? [];
        list.push(typeof km === "number" ? { slug, km } : { slug });
        out.set(town, list);
    }
    return out;
}

/** Cele mai apropiate orașe pentru orice localitate (oraș: vecinii lui; sat: orașul cel mai apropiat + vecinii). */
export function nearestTownsFor(judetSlug: string, locSlug: string, max = 6): NearTown[] {
    return nearestTowns(judetSlug, locSlug, max, isTown(judetSlug, locSlug) ? undefined : villageTown(judetSlug, locSlug));
}
