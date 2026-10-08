/**
 * Exemple de utilizare pe pagina unui oraș, alese din DATE: domeniile cu cele mai multe firme
 * active din localitate (BazaDate, lib/seo/data/judete) și tipul localității (reședință de
 * județ, municipiu, oraș — SIRUTA). Profilul orașului (reședință / HoReCa / industrial) se
 * deduce doar din aceste date; textul spune ce produs de specialitate se potrivește domeniului,
 * nu afirmă lucruri despre oraș.
 *
 * FIȘIER IDENTIC ÎN TOATE CELE 6 REPO-URI.
 */
import type { SiteKey } from "./siteSpecialization";

export type UseCase = { section: string; count?: number; text: string; productKey: string };

type Entry = { text: string; productKey: string };
type Table = Partial<Record<SiteKey, Entry>>;

const SECTION_ALIASES: Record<string, string> = {
    "industrie extractivă": "industrie prelucrătoare",
};

const BY_SECTION: Record<string, Table> = {
    "comerț": {
        adbanner: { text: "bannere de fațadă și folii pentru vitrine, pentru magazine", productKey: "banner" },
        tablou: { text: "tablouri canvas pentru decorul magazinelor și al showroom-urilor", productKey: "canvas" },
        homeprint: { text: "autocolante decorative și tapet pentru amenajarea magazinelor", productKey: "autocolante" },
        prynt: { text: "flyere cu oferte și cărți de vizită pentru magazine", productKey: "flayere" },
        euprint: { text: "plăcuțe și panouri din PVC forex pentru spații comerciale", productKey: "pvc-forex" },
        shopprint: { text: "bannere de fațadă și autocolante de vitrină pentru magazine", productKey: "banner" },
    },
    "construcții": {
        adbanner: { text: "bannere mesh pentru schele și împrejmuiri de șantier", productKey: "mesh" },
        tablou: { text: "tablouri canvas pentru apartamentele de prezentare", productKey: "canvas" },
        homeprint: { text: "tapet personalizat pentru apartamentele de prezentare", productKey: "tapet" },
        prynt: { text: "pliante de prezentare și cărți de vizită pentru echipele de construcții", productKey: "pliante" },
        euprint: { text: "panouri temporare și plăci permanente pentru proiectele finanțate", productKey: "fonduri-eu" },
        shopprint: { text: "panouri din PVC forex și bannere pentru șantiere", productKey: "pvc-forex" },
    },
    "HoReCa (hoteluri și restaurante)": {
        adbanner: { text: "bannere pentru terase și roll-up-uri pentru evenimente", productKey: "banner" },
        tablou: { text: "tablouri canvas pentru camere de hotel, pensiuni și restaurante", productKey: "canvas" },
        homeprint: { text: "tapet personalizat pentru camere de hotel, pensiuni și restaurante", productKey: "tapet" },
        prynt: { text: "afișe cu meniul și flyere pentru restaurante și pensiuni", productKey: "afise" },
        euprint: { text: "plăcuțe indicatoare pentru hoteluri și pensiuni", productKey: "semnalistica" },
        shopprint: { text: "afișe cu meniul și bannere pentru terase", productKey: "afise" },
    },
    "industrie prelucrătoare": {
        adbanner: { text: "bannere pentru hale și roll-up-uri pentru târguri", productKey: "banner" },
        tablou: { text: "tablouri canvas pentru birourile și sălile de ședință ale fabricilor", productKey: "canvas" },
        homeprint: { text: "autocolante pentru marcarea spațiilor și decorul birourilor", productKey: "autocolante" },
        prynt: { text: "autocolante pentru marcarea produselor și pliante de prezentare", productKey: "autocolante" },
        euprint: { text: "plăcuțe și panouri din alucobond pentru hale și depozite", productKey: "alucobond" },
        shopprint: { text: "autocolante de marcare și panouri din PVC forex pentru hale", productKey: "autocolante" },
    },
    "transport și depozitare": {
        adbanner: { text: "bannere pentru depozite și folii pentru geamurile birourilor", productKey: "banner" },
        prynt: { text: "autocolante pentru autovehicule și colete", productKey: "autocolante" },
        euprint: { text: "plăcuțe de identificare și panouri pentru depozite", productKey: "semnalistica" },
        homeprint: { text: "autocolante pentru marcarea spațiilor", productKey: "autocolante" },
        tablou: { text: "tablouri canvas pentru birouri", productKey: "canvas" },
        shopprint: { text: "autocolante pentru autovehicule și marcarea depozitelor", productKey: "autocolante" },
    },
    "servicii profesionale, științifice și tehnice": {
        adbanner: { text: "roll-up-uri pentru conferințe și prezentări", productKey: "rollup" },
        tablou: { text: "tablouri canvas pentru birouri și săli de așteptare", productKey: "canvas" },
        homeprint: { text: "tapet personalizat pentru birouri", productKey: "tapet" },
        prynt: { text: "cărți de vizită și pliante de prezentare pentru birouri", productKey: "carti-vizita" },
        euprint: { text: "plăcuțe de firmă din alucobond pentru birouri", productKey: "alucobond" },
        shopprint: { text: "roll-up-uri și afișe pentru birouri și conferințe", productKey: "rollup" },
    },
    "IT, media și comunicații": {
        adbanner: { text: "roll-up-uri și bannere pentru evenimente și recrutare", productKey: "rollup" },
        tablou: { text: "tablouri canvas pentru birourile open-space", productKey: "canvas" },
        homeprint: { text: "tapet personalizat pentru birourile open-space", productKey: "tapet" },
        prynt: { text: "cărți de vizită și autocolante cu logo", productKey: "carti-vizita" },
        euprint: { text: "plăcuțe de firmă și indicatoare pentru birouri", productKey: "semnalistica" },
        shopprint: { text: "roll-up-uri și autocolante cu logo pentru evenimente", productKey: "rollup" },
    },
    "agricultură, silvicultură și pescuit": {
        adbanner: { text: "bannere pentru ferme și târguri agricole", productKey: "banner" },
        prynt: { text: "flyere și autocolante pentru produsele locale", productKey: "flayere" },
        euprint: { text: "panouri și plăci pentru proiectele agricole finanțate", productKey: "fonduri-eu" },
        homeprint: { text: "autocolante decorative pentru spațiile de vânzare", productKey: "autocolante" },
        tablou: { text: "tablouri canvas pentru pensiunile agroturistice", productKey: "canvas" },
        shopprint: { text: "bannere și autocolante pentru ferme și târguri", productKey: "banner" },
    },
};

/**
 * Exemple din primele domenii după numărul de firme (max. 3), pentru produsele de specialitate
 * ale site-ului. `isSpecialty` filtrează produsele care au pagină locală pe site.
 */
export function localUseCases(
    site: SiteKey,
    sections: Array<{ label: string; count?: number }> | undefined,
    isSpecialty: (productKey: string) => boolean,
): UseCase[] {
    const out: UseCase[] = [];
    for (const s of sections ?? []) {
        const label = SECTION_ALIASES[s.label] ?? s.label;
        const e = BY_SECTION[label]?.[site];
        if (!e || !isSpecialty(e.productKey)) continue;
        out.push({ section: s.label, count: s.count, text: e.text, productKey: e.productKey });
        if (out.length >= 3) break;
    }
    return out;
}

/** Profilul orașului, doar din date: reședință de județ, HoReCa sau industrie printre primele 3 domenii. */
export function townProfile(opts: { isCountySeat?: boolean; typeLabel?: string; sections?: Array<{ label: string }> }): string[] {
    const tags: string[] = [];
    if (opts.isCountySeat || /reședință de județ|capitala/.test(opts.typeLabel ?? "")) tags.push("centru administrativ al județului");
    const top = (opts.sections ?? []).slice(0, 3).map((s) => s.label);
    if (top.some((l) => l.startsWith("HoReCa"))) tags.push("multe firme din turism și HoReCa");
    if (top.some((l) => l.startsWith("industrie"))) tags.push("pondere mare a firmelor din industrie");
    return tags;
}
