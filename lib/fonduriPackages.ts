// lib/fonduriPackages.ts
//
// Pachetele de vizibilitate pentru fonduri europene (PNRR, Regio, AFIR, naționale) și datele de proiect
// transmise configuratorului prin adresă (?pachet=complet&proiectCod=...&proiectTitlu=...).
// Fără React aici — modulul e folosit și de paginile server (ofertele de pe /fonduri-*, /proiect/[cod]).
//
// Regula de preț: prețul pachetului se aplică pe coș atunci când selecțiile din configurator conțin toate
// elementele pachetului; ce se adaugă peste pachet se plătește la prețul de listă.
// La Regio comunicatul costă 690 lei în loc de 490, deci pachetul crește cu 200 lei pentru fiecare comunicat.

import { getFonduriEUGroups } from "@/lib/pricing";

export type FonduriPackageId = "start" | "complet" | "constructii";

export type FonduriPackage = {
    id: FonduriPackageId;
    name: string;
    tagline: string;
    /** Ce conține, pentru afișare. */
    items: string[];
    /** Selecțiile din configurator pe care le pune pachetul. */
    selections: Record<string, string>;
    /** Condițiile de aplicare: fiecare rând e o listă de variante acceptate (cheie, opțiune). */
    requires: Array<Array<[string, string]>>;
    /** Prețul pachetului cu comunicat la tariful standard (PNRR, AFIR, naționale). */
    price: number;
    /** Câte comunicate de presă include (pentru ajustarea Regio). */
    comunicate: number;
};

/** Diferența de preț a unui comunicat Regio (690 lei) față de cel standard (490 lei). */
export const REGIO_COMUNICAT_SURCHARGE = 200;

const NONE_SELECTIONS: Record<string, string> = {
    comunicat: "none",
    bannerSite: "none",
    afisInformativ: "none",
    autoMici: "none",
    autoMari: "none",
    panouTemporar: "none",
    placaPermanenta: "none",
};

export const FONDURI_PACKAGES: FonduriPackage[] = [
    {
        id: "start",
        name: "Pachet Start proiect",
        tagline: "Tot ce trebuie la începerea proiectului",
        items: [
            "Panou sau placă 80×50 cm (PVC)",
            "Afiș informativ A3",
            "Set autocolante mici",
            "Banner pentru site",
            "Comunicat de presă de începere",
        ],
        selections: { ...NONE_SELECTIONS, panouTemporar: "80x50", afisInformativ: "A3", autoMici: "10x10-20", bannerSite: "with", comunicat: "start" },
        requires: [
            [["panouTemporar", "80x50"], ["placaPermanenta", "80x50"]],
            [["afisInformativ", "A3"]],
            [["autoMici", "10x10-20"], ["autoMici", "15x15-10"], ["autoMici", "15x21-5"]],
            [["bannerSite", "with"]],
            [["comunicat", "start"], ["comunicat", "start+final"]],
        ],
        price: 849,
        comunicate: 1,
    },
    {
        id: "complet",
        name: "Pachet Complet",
        tagline: "De la începere până la recepție",
        items: [
            "Panou temporar 80×50 cm (PVC)",
            "Placă permanentă 80×50 cm (PVC)",
            "Afiș informativ A3",
            "Set autocolante mici",
            "Banner pentru site",
            "Comunicat de presă de începere și de finalizare",
        ],
        selections: { ...NONE_SELECTIONS, panouTemporar: "80x50", placaPermanenta: "80x50", afisInformativ: "A3", autoMici: "10x10-20", bannerSite: "with", comunicat: "start+final" },
        requires: [
            [["panouTemporar", "80x50"]],
            [["placaPermanenta", "80x50"]],
            [["afisInformativ", "A3"]],
            [["autoMici", "10x10-20"], ["autoMici", "15x15-10"], ["autoMici", "15x21-5"]],
            [["bannerSite", "with"]],
            [["comunicat", "start+final"]],
        ],
        price: 1490,
        comunicate: 2,
    },
    {
        id: "constructii",
        name: "Pachet Construcții",
        tagline: "Pentru lucrări și investiții în infrastructură",
        items: [
            "Panou temporar de șantier 200×150 cm (PVC)",
            "Placă permanentă 150×100 cm (PVC)",
            "Afiș informativ A3",
            "Set autocolante mici",
            "Banner pentru site",
            "Comunicat de presă de începere și de finalizare",
        ],
        selections: { ...NONE_SELECTIONS, panouTemporar: "200x150", placaPermanenta: "150x100", afisInformativ: "A3", autoMici: "10x10-20", bannerSite: "with", comunicat: "start+final" },
        requires: [
            [["panouTemporar", "200x150"]],
            [["placaPermanenta", "150x100"]],
            [["afisInformativ", "A3"]],
            [["autoMici", "10x10-20"], ["autoMici", "15x15-10"], ["autoMici", "15x21-5"]],
            [["bannerSite", "with"]],
            [["comunicat", "start+final"]],
        ],
        price: 1990,
        comunicate: 2,
    },
];

export function getFonduriPackage(id: string | null | undefined): FonduriPackage | undefined {
    if (!id) return undefined;
    return FONDURI_PACKAGES.find((p) => p.id === id);
}

/** Suma prețurilor de listă pentru selecțiile date (același calcul ca în configurator). */
export function fonduriListPrice(selections: Record<string, string>, isRegio = false): number {
    const groups = getFonduriEUGroups(isRegio) as Record<string, { options: { id: string; price: number }[] }>;
    let sum = 0;
    for (const [key, val] of Object.entries(selections)) {
        if (!val || val === "none") continue;
        const opt = groups[key]?.options.find((o) => o.id === val);
        if (opt) sum += opt.price;
    }
    return Math.round(sum * 100) / 100;
}

export function fonduriPackagePrice(pkg: FonduriPackage, isRegio = false): number {
    return pkg.price + (isRegio ? REGIO_COMUNICAT_SURCHARGE * pkg.comunicate : 0);
}

export type FonduriPackageOffer = { pkg: FonduriPackage; separate: number; price: number; savings: number };

export function fonduriPackageOffer(pkg: FonduriPackage, isRegio = false): FonduriPackageOffer {
    const separate = fonduriListPrice(pkg.selections, isRegio);
    const price = fonduriPackagePrice(pkg, isRegio);
    return { pkg, separate, price, savings: Math.max(0, Math.round((separate - price) * 100) / 100) };
}

export function fonduriPackageOffers(isRegio = false): FonduriPackageOffer[] {
    return FONDURI_PACKAGES.map((p) => fonduriPackageOffer(p, isRegio));
}

/**
 * Pachetul care se aplică selecțiilor (cel cu reducerea cea mai mare), sau null.
 * Totalul de plată = prețul de listă al selecțiilor − offer.savings.
 */
export function matchFonduriPackage(selections: Record<string, string>, isRegio = false): FonduriPackageOffer | null {
    let best: FonduriPackageOffer | null = null;
    for (const pkg of FONDURI_PACKAGES) {
        const ok = pkg.requires.every((alts) => alts.some(([k, v]) => selections[k] === v));
        if (!ok) continue;
        const offer = fonduriPackageOffer(pkg, isRegio);
        if (!best || offer.savings > best.savings) best = offer;
    }
    return best;
}

/** Totalul configuratorului: prețul de listă minus reducerea pachetului aplicabil. */
export function fonduriTotalWithPackage(selections: Record<string, string>, isRegio = false) {
    const list = fonduriListPrice(selections, isRegio);
    const offer = matchFonduriPackage(selections, isRegio);
    const total = Math.round((list - (offer?.savings ?? 0)) * 100) / 100;
    return { list, total, offer };
}

// ---------------------------------------------------------------------------
// Parametri din adresă
// ---------------------------------------------------------------------------
type ParamSource = { get(name: string): string | null };

/** Selecțiile din adresă: ?pachet=complet și/sau ?placaPermanenta=80x50&panouTemporar=200x150 ... */
export function fonduriSelectionsFromParams(sp: ParamSource, isRegio = false): Record<string, string> | null {
    const groups = getFonduriEUGroups(isRegio) as Record<string, { options: { id: string }[] }>;
    const pkg = getFonduriPackage(sp.get("pachet"));
    let touched = !!pkg;
    const out: Record<string, string> = { ...(pkg ? pkg.selections : NONE_SELECTIONS) };
    for (const key of Object.keys(NONE_SELECTIONS)) {
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
