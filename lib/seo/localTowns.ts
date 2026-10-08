/**
 * Nivelurile localităților pentru paginile /judet/...
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI.
 *
 *  - „oraș”: municipii, orașe, București și sectoarele lui (SIRUTA), plus orașele principale
 *    curate din mainTowns.ts → pagină de oraș completă + pagini oraș × produs de specialitate.
 *  - restul (comune, sate, localități componente, cartiere) → fără pagini de produs indexabile;
 *    apar pe pagina județului grupate sub cel mai apropiat oraș.
 *
 * Datele vin din lib/seo/data/localityTiers.json, generat de
 * _deploy/seo-localitati/build-locality-tiers.mjs (SIRUTA, RPL 2021, coordonate OpenStreetMap).
 * Distanțele sunt în linie dreaptă.
 */
import tiers from "./data/localityTiers.json";

type TownRow = [slug: string, name: string, population: number, type: string, isCountySeat: number];
type NearRow = [judet: string, slug: string, km: number | null];

const TOWNS = (tiers as unknown as { towns: Record<string, TownRow[]> }).towns;
const NEAR = (tiers as unknown as { near: Record<string, NearRow[]> }).near;
export const LOCALITY_TIERS_VERSION: string = (tiers as unknown as { version?: string }).version ?? "2026-10-08";

export type Town = { judetSlug: string; slug: string; name: string; population: number; type: string; isCountySeat: boolean };

const toTown = (judetSlug: string, r: TownRow): Town => ({ judetSlug, slug: r[0], name: r[1], population: r[2], type: r[3], isCountySeat: r[4] === 1 });

let _index: Map<string, Town> | null = null;
function index(): Map<string, Town> {
    if (_index) return _index;
    const m = new Map<string, Town>();
    for (const [j, rows] of Object.entries(TOWNS)) for (const r of rows) m.set(`${j}/${r[0]}`, toTown(j, r));
    _index = m;
    return m;
}

/** True pentru municipii, orașe, București + sectoare și orașele principale curate. */
export function isTown(judetSlug: string, locSlug: string): boolean {
    return index().has(`${String(judetSlug || "").toLowerCase()}/${String(locSlug || "").toLowerCase()}`);
}

export function getTown(judetSlug: string, locSlug: string): Town | undefined {
    return index().get(`${judetSlug}/${locSlug}`);
}

/** Orașele județului, după populație (descrescător). */
export function townsOfCounty(judetSlug: string): Town[] {
    return (TOWNS[judetSlug] ?? []).map((r) => toTown(judetSlug, r));
}

/** Toate orașele, după populație; fără sectoare (au deja pagina municipiului București). */
export function topTowns(max = 12): Town[] {
    return [...index().values()].filter((t) => t.type !== "sector").sort((a, b) => b.population - a.population).slice(0, max);
}

export type NearTown = Town & { km?: number };

/**
 * Cele mai apropiate orașe (oricare județ) de un oraș; pentru o localitate care nu e oraș,
 * cel mai apropiat oraș din județ urmat de vecinii lui.
 */
export function nearestTowns(judetSlug: string, locSlug: string, max = 6, villageTown?: { slug: string; km?: number }): NearTown[] {
    const out: NearTown[] = [];
    const seen = new Set<string>([`${judetSlug}/${locSlug}`]);
    const push = (j: string, s: string, km?: number | null) => {
        const k = `${j}/${s}`;
        const t = index().get(k);
        if (!t || seen.has(k) || out.length >= max) return;
        seen.add(k);
        out.push({ ...t, ...(typeof km === "number" ? { km } : {}) });
    };
    if (isTown(judetSlug, locSlug)) {
        for (const [j, s, km] of NEAR[`${judetSlug}/${locSlug}`] ?? []) push(j, s, km);
    } else if (villageTown) {
        push(judetSlug, villageTown.slug, villageTown.km);
        for (const [j, s] of NEAR[`${judetSlug}/${villageTown.slug}`] ?? []) push(j, s, null);
    }
    // Completare: orașele mari ale județului.
    for (const t of townsOfCounty(judetSlug)) push(t.judetSlug, t.slug, null);
    return out;
}
