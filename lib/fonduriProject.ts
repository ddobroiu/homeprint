// lib/fonduriProject.ts
//
// Parametri din adresă pentru configuratorul de fonduri europene: produsele preselectate
// (?panouTemporar=80x50&afisInformativ=A3 ...), datele proiectului pentru machetă
// (?proiectCod=...&proiectTitlu=...) și sursa campaniei (utm_*).
// Fără React aici — modulul e folosit și de paginile server (ex. /proiect/[cod]).
// Prețul rămâne suma produselor alese (calculateFonduriEUPrice), fără pachete.

import { getFonduriEUGroups } from "@/lib/pricing";

type ParamSource = { get(name: string): string | null };

/** Produsele din configurator, toate pe „none”. */
export const FONDURI_EMPTY_SELECTIONS: Record<string, string> = {
    comunicat: "none",
    bannerSite: "none",
    afisInformativ: "none",
    autoMici: "none",
    autoMari: "none",
    panouTemporar: "none",
    placaPermanenta: "none",
};

/**
 * Produsele preselectate din adresă, ex. ?placaPermanenta=80x50&panouTemporar=200x150.
 * Întoarce null dacă adresa nu conține nicio opțiune validă.
 */
export function fonduriSelectionsFromParams(sp: ParamSource, isRegio = false): Record<string, string> | null {
    const groups = getFonduriEUGroups(isRegio) as Record<string, { options: { id: string }[] }>;
    let touched = false;
    const out: Record<string, string> = { ...FONDURI_EMPTY_SELECTIONS };
    for (const key of Object.keys(FONDURI_EMPTY_SELECTIONS)) {
        const v = sp.get(key);
        if (v && groups[key]?.options.some((o) => o.id === v)) {
            out[key] = v;
            touched = true;
        }
    }
    return touched ? out : null;
}

/** Datele proiectului, transmise de pagina /proiect/[cod] către configurator. */
export const FONDURI_PROJECT_FIELDS = [
    { param: "proiectCod", label: "Cod proiect / SMIS" },
    { param: "proiectTitlu", label: "Titlu proiect" },
    { param: "beneficiar", label: "Beneficiar" },
    { param: "cui", label: "CUI beneficiar" },
    { param: "program", label: "Program" },
    { param: "localitate", label: "Localitate" },
    { param: "judet", label: "Județ" },
    { param: "valoareTotala", label: "Valoare totală" },
    { param: "finantarePublica", label: "Finanțare publică / nerambursabilă" },
    { param: "dataStart", label: "Data începerii" },
    { param: "dataFinal", label: "Data finalizării" },
] as const;

export type FonduriProjectData = Partial<Record<(typeof FONDURI_PROJECT_FIELDS)[number]["param"], string>>;

export function fonduriProjectFromParams(sp: ParamSource): FonduriProjectData {
    const out: FonduriProjectData = {};
    for (const f of FONDURI_PROJECT_FIELDS) {
        const v = sp.get(f.param);
        if (v && v.trim()) out[f.param] = v.trim().slice(0, 400);
    }
    return out;
}

/** Textul salvat în coș (metadata „Date proiect”), un câmp pe rând. */
export function fonduriProjectSummary(data: FonduriProjectData): string {
    return FONDURI_PROJECT_FIELDS.filter((f) => data[f.param])
        .map((f) => `${f.label}: ${data[f.param]}`)
        .join("\n");
}

/** Sursa campaniei (utm_*) pentru metadata coșului. */
export function fonduriUtmFromParams(sp: ParamSource): string {
    return ["utm_source", "utm_medium", "utm_campaign", "utm_content"]
        .map((k) => [k, sp.get(k)] as const)
        .filter(([, v]) => !!v)
        .map(([k, v]) => `${k}=${String(v).slice(0, 80)}`)
        .join("&");
}
