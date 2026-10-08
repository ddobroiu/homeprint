// Definițiile celor 4 configuratoare noi (calendare, steaguri beachflag, X-banner, panou stradal):
// opțiunile, starea de la deschiderea paginii (din parametrii adresei: ?tip=&format=&q=...), prețul, linia din coș
// (etichetele văzute de client + câmpurile ascunse pentru tipografie / curier) și textele paginii.
// Fără React: folosit de componenta components/configurator/ProdusNouConfigurator.tsx, de pagini, de feedul
// Google Merchant (lib/merchant/landingPrice.ts) și de verificări — toți pornesc din aceeași stare inițială.

import {
    BEACHFLAG_CONSTANTS,
    CALENDAR_CONSTANTS,
    PANOU_CONSTANTS,
    XBANNER_CONSTANTS,
    beachflagMarimi,
    calculateBeachflagPrice,
    calculateCalendarPrice,
    calculatePanouStradalPrice,
    calculateXBannerPrice,
    calendarFormat,
    panouFormat,
    panouMaxAfise,
    xbannerFormate,
    type BeachflagBaza,
    type BeachflagForma,
    type BeachflagMarime,
    type CalendarTip,
    type PanouAfisMaterial,
    type PanouModel,
    type ProdusNouPrice,
    type XBannerMaterial,
    type XBannerModel,
} from "./pricing";

export type ParamSource = { get(name: string): string | null };
export type ProdusNouId = "calendare" | "beachflag" | "x-banner" | "panou-stradal";

export type PNState = { [k: string]: string | number; quantity: number; designOption: "upload" | "pro" };
export type PNChoice = { value: string; label: string; sub?: string };
export type PNGroup = { id: string; label: string; choices: PNChoice[]; help?: string; cols?: 2 | 3 | 4 };
export type PNCartLine = {
    title: string;
    image: string;
    /** etichetele văzute de client + câmpurile ascunse (variantId, packageCm ... vezi lib/cartDisplayMeta.ts) */
    metadata: Record<string, unknown>;
};
export type PNContent = {
    intro: string;
    sections: { h: string; p?: string[]; ul?: string[] }[];
    faqs: { question: string; answer: string }[];
};

export interface ProdusNouDef {
    id: ProdusNouId;
    path: string;
    /** numele scurt al produsului (breadcrumb, meniuri) */
    name: string;
    h1: string;
    subtitle: string;
    seoTitle: string;
    seoDescription: string;
    keywords: string[];
    initial(sp?: ParamSource): PNState;
    normalize(s: PNState): PNState;
    groups(s: PNState): PNGroup[];
    qty(s: PNState): { min: number; max: number; presets: number[] };
    price(s: PNState): ProdusNouPrice;
    proFee: number;
    /** are grafică de tipărit? (panoul de lemn nu are) */
    hasArtwork(s: PNState): boolean;
    /** dimensiunea finită a graficii (cm), pentru fișier */
    artworkCm(s: PNState): { w: number; h: number } | null;
    gallery(s: PNState): string[];
    summary(s: PNState): string;
    includes(s: PNState): string;
    notes(s: PNState): string[];
    cart(s: PNState): PNCartLine;
    content: PNContent;
}

const fmt = (n: number) => String(Math.round(n * 10) / 10).replace(".", ",");
const intParam = (sp: ParamSource | undefined, k: string) => {
    const v = sp?.get(k);
    const n = v ? parseInt(v, 10) : NaN;
    return Number.isFinite(n) && n > 0 ? n : undefined;
};
const oneOf = <T extends string>(v: string | null | undefined, list: readonly T[], def: T): T => (v && (list as readonly string[]).includes(v) ? (v as T) : def);
const clampQty = (q: number, r: { min: number; max: number }) => Math.max(r.min, Math.min(r.max, Math.floor(q || r.min)));
const yesNo = (b: unknown) => (b === "da" ? "Da" : "Nu");
const NO_LOCKER = "Coletul e prea lung sau prea greu pentru lockere: livrăm prin curier la adresă sau la un punct DPD care îl poate primi.";

// =====================================================================================
// 1. CALENDARE
// =====================================================================================
const calendare: ProdusNouDef = {
    id: "calendare",
    path: "/configurator/calendare",
    name: "Calendare personalizate",
    h1: "Calendare personalizate 2027 – de perete, de birou și de buzunar",
    subtitle: "Calendare cu grafica și logo-ul tău, pentru cadouri de firmă și pentru acasă.",
    seoTitle: "Calendare personalizate 2027 – perete, birou, buzunar",
    seoDescription:
        "Calendare personalizate cu logo sau fotografii: de perete cu spirală (12+1 file), de birou triunghiulare și de buzunar. Preț pe loc, de la o bucată.",
    keywords: ["calendare personalizate", "calendar de perete personalizat", "calendar de birou", "calendar de buzunar", "calendare cu logo", "calendare 2027", "calendare corporate"],
    initial(sp) {
        const tip = oneOf(sp?.get("tip"), ["perete", "birou", "buzunar"] as const, "perete");
        const s: PNState = {
            tip,
            format: sp?.get("format") || "",
            print: oneOf(sp?.get("print"), ["4+1", "4+4"] as const, "4+1"),
            laminare: oneOf(sp?.get("laminare"), ["da", "nu"] as const, "nu"),
            colturi: oneOf(sp?.get("colturi"), ["da", "nu"] as const, "nu"),
            quantity: intParam(sp, "q") ?? 0,
            designOption: "upload",
        };
        return calendare.normalize(s);
    },
    normalize(s) {
        const tip = s.tip as CalendarTip;
        const f = calendarFormat(tip, String(s.format));
        const range = CALENDAR_CONSTANTS.QTY[tip];
        return { ...s, format: f.key, quantity: clampQty(Number(s.quantity) || range.presets[0], range) };
    },
    groups(s) {
        const tip = s.tip as CalendarTip;
        const g: PNGroup[] = [
            { id: "tip", label: "Tipul calendarului", cols: 3, choices: CALENDAR_CONSTANTS.TIPURI.map((t) => ({ value: t.value, label: t.label, sub: t.sub })) },
            { id: "format", label: "Format", cols: tip === "birou" ? 4 : 2, choices: CALENDAR_CONSTANTS.FORMATE[tip].map((f) => ({ value: f.key, label: f.label, sub: f.sub })) },
        ];
        if (tip === "buzunar") {
            g.push(
                { id: "print", label: "Imprimare", cols: 2, choices: [{ value: "4+1", label: "Față color", sub: "verso calendar alb-negru" }, { value: "4+4", label: "Față-verso color", sub: "ambele fețe color" }] },
                { id: "laminare", label: "Laminare (mat sau lucios)", cols: 2, choices: [{ value: "nu", label: "Fără" }, { value: "da", label: "Cu laminare", sub: "rezistă mai mult în portofel" }] },
                { id: "colturi", label: "Colțuri", cols: 2, choices: [{ value: "nu", label: "Drepte" }, { value: "da", label: "Rotunjite" }] }
            );
        }
        return g;
    },
    qty(s) {
        return CALENDAR_CONSTANTS.QTY[s.tip as CalendarTip];
    },
    price(s) {
        return calculateCalendarPrice({
            tip: s.tip as CalendarTip,
            format: String(s.format),
            quantity: s.quantity,
            print: s.print === "4+4" ? "4+4" : "4+1",
            laminare: s.laminare === "da",
            colturi: s.colturi === "da",
            designOption: s.designOption,
        });
    },
    proFee: CALENDAR_CONSTANTS.PRO_DESIGN_FEE,
    hasArtwork: () => true,
    artworkCm(s) {
        const f = calendarFormat(s.tip as CalendarTip, String(s.format));
        return { w: f.wCm, h: f.hCm };
    },
    gallery(s) {
        const main = `/products/produse-noi/calendar-${s.tip}.jpg`;
        return [main, "/products/produse-noi/calendare-personalizate.jpg", ...["perete", "birou", "buzunar"].filter((t) => t !== s.tip).map((t) => `/products/produse-noi/calendar-${t}.jpg`)];
    },
    summary(s) {
        const f = calendarFormat(s.tip as CalendarTip, String(s.format));
        return `${CALENDAR_CONSTANTS.TIPURI.find((t) => t.value === s.tip)?.label}, ${f.sub}, ${s.quantity} buc.`;
    },
    includes(s) {
        if (s.tip === "perete") return "Include: 13 file (copertă + 12 luni) pe hârtie 130 g, spate din carton, spirală metalică cu agățătoare.";
        if (s.tip === "birou") return "Include: 12+1 file tipărite față-verso, spirală și suport triunghiular din carton.";
        return "Include: carton dublu cretat mat 300 g, tăiat la format.";
    },
    notes: () => [],
    cart(s) {
        const tip = s.tip as CalendarTip;
        const f = calendarFormat(tip, String(s.format));
        const tipLabel = tip === "perete" ? "de perete" : tip === "birou" ? "de birou" : "de buzunar";
        const pack: Record<CalendarTip, { cm: number[]; kg: number }> = {
            perete: f.key === "a3" ? { cm: [50, 33, 1.2], kg: 0.3 } : { cm: [33, 25, 1], kg: 0.15 },
            birou: { cm: [Math.ceil(f.wCm) + 2, Math.ceil(f.hCm) + 2, 5], kg: 0.1 },
            buzunar: { cm: [11, 8, 0.04], kg: 0.004 },
        };
        const meta: Record<string, unknown> = {
            Tip: `Calendar ${tipLabel}`,
            Format: `${f.label} – ${f.sub}`,
        };
        if (tip === "perete") Object.assign(meta, { "Conținut": "13 file (copertă + 12 luni), o lună pe pagină", Legare: "Spirală metalică" });
        if (tip === "birou") Object.assign(meta, { "Conținut": "12+1 file față-verso", Legare: "Spirală, suport triunghiular" });
        if (tip === "buzunar")
            Object.assign(meta, {
                Print: s.print === "4+4" ? "Față-verso color" : "Față color, verso alb-negru",
                Laminare: yesNo(s.laminare),
                "Colțuri rotunjite": yesNo(s.colturi),
            });
        Object.assign(meta, {
            variantId: tip === "buzunar" ? `buzunar-${s.print}` : `${tip}-${f.key}`,
            width: f.wCm,
            height: f.hCm,
            packageCm: pack[tip].cm,
            packageKg: pack[tip].kg,
        });
        return { title: `Calendar ${tipLabel} personalizat ${f.sub.replace(/ × /g, "×")}`, image: calendare.gallery(s)[0], metadata: meta };
    },
    content: {
        intro:
            "Un calendar cu grafica ta stă pe perete sau pe birou un an întreg: clienții și partenerii îți văd logo-ul de 365 de ori. " +
            "Îl tipărim după fișierul tău sau îl pregătim noi, cu fotografiile și sărbătorile pe care le alegi.",
        sections: [
            {
                h: "Trei tipuri de calendare",
                ul: [
                    "Calendar de perete: copertă + 12 luni, câte o lună pe pagină, hârtie de 130 g cu spate din carton și spirală metalică. Formatul mediu (22,5 × 30 cm) încape în orice birou, cel mare (30 × 47 cm) se vede de departe.",
                    "Calendar de birou triunghiular: 12+1 file tipărite față-verso, pe un suport de carton care stă singur pe masă. Patru formate, de la pătratul de 10,5 cm până la panoramicul de 23,5 cm.",
                    "Calendar de buzunar: card de 7 × 10 cm pe carton de 300 g, cu grafica pe față și calendarul pe verso. Opțional laminat și cu colțuri rotunjite, ca să reziste în portofel.",
                ],
            },
            {
                h: "Pentru firme și pentru acasă",
                p: [
                    "Firmele comandă calendarele în octombrie–decembrie, drept cadou de sfârșit de an pentru clienți, sau le împart la târguri și la recepție. Prețul pe bucată scade la tiraje mai mari (de la 101 și 201 bucăți la perete, de la 51, 101 și 251 la birou).",
                    "Pentru familie, un calendar de perete cu fotografiile voastre e un cadou personal pentru bunici. Îl poți comanda de la o singură bucată.",
                ],
            },
            {
                h: "Cum pregătești fișierul",
                ul: [
                    "Trimite un PDF cu toate paginile (coperta și cele 12 luni), la formatul ales plus 3 mm margine de tăiere, în CMYK, cu imaginile la 300 dpi.",
                    "Lasă cel puțin 5 mm între text și marginea de sus a calendarului de perete: acolo se perforează pentru spirală.",
                    "Nu ai grafică? Alege „Grafică realizată de noi”: graficianul face coperta și grila lunilor cu logo-ul și culorile tale și îți trimite macheta spre aprobare.",
                ],
            },
        ],
        faqs: [
            { question: "Pot comanda un singur calendar?", answer: "Da. Calendarele de perete și de birou se pot comanda de la o bucată; cele de buzunar de la 50 de bucăți, pentru că se taie din coli mari." },
            { question: "Ce înseamnă 12+1 file?", answer: "Douăsprezece file pentru luni și una pentru copertă. La calendarul de perete e câte o lună pe pagină; la cel de birou filele sunt tipărite față-verso." },
            { question: "Pot pune sărbătorile legale și zilele firmei?", answer: "Da. În fișierul tău poți marca orice zi; dacă alegi grafica realizată de noi, scrie în comandă zilele pe care vrei să le evidențiem." },
            { question: "În cât timp primesc calendarele?", answer: "După aprobarea machetei, tipărirea durează 1–4 zile lucrătoare, plus livrarea prin curier. În noiembrie–decembrie comandă din timp, pentru că tirajele sunt mari." },
            { question: "Se pot comanda calendare cu 2 sau 3 luni pe pagină?", answer: "Da, la cerere: scrie-ne pe WhatsApp sau prin formularul de ofertă și îți trimitem prețul pentru formatul dorit." },
        ],
    },
};

// =====================================================================================
// 2. STEAGURI BEACHFLAG
// =====================================================================================
const FLAG_PHOTOS: Partial<Record<string, string[]>> = {
    "lacrima-s": ["/produse-img/steag-lacrima-s-beachflag-tear-drop.jpg", "/produse-img/steag-lacrima-s-beachflag-tear-drop-2.jpg"],
    "lacrima-m": ["/produse-img/steag-lacrima-m-beachflag-tear-drop.jpg", "/produse-img/steag-lacrima-m-beachflag-tear-drop-2.jpg"],
    "lacrima-l": ["/produse-img/steag-lacrima-l-beachflag-tear-drop.jpg", "/produse-img/steag-lacrima-l-beachflag-tear-drop-2.jpg"],
    "lacrima-xl": ["/produse-img/steag-lacrima-xl-beachflag-tear-drop.jpg", "/produse-img/steag-lacrima-xl-beachflag-tear-drop-2.jpg"],
    "pana-m": ["/produse-img/steag-personalizat-pana-m.jpg", "/produse-img/steag-personalizat-pana-m-2.jpg"],
    "pana-xl": ["/produse-img/steag-personalizat-pana-xl.jpg", "/produse-img/steag-personalizat-pana-xl-2.jpg"],
};
const FLAG_SVG: Record<BeachflagForma, string> = {
    lacrima: "/products/produse-noi/beachflag-lacrima.jpg",
    pana: "/products/produse-noi/beachflag-pana.jpg",
    drept: "/products/produse-noi/beachflag-dreptunghiular.jpg",
};

/** Poza principală a unei variante de steag (fotografia PrintCenter dacă există pentru acea formă și mărime). */
export function beachflagImage(forma: BeachflagForma, marime: BeachflagMarime): string {
    return FLAG_PHOTOS[`${forma}-${marime}`]?.[0] ?? FLAG_SVG[forma];
}

const beachflag: ProdusNouDef = {
    id: "beachflag",
    path: "/configurator/beachflag",
    name: "Steaguri publicitare beachflag",
    h1: "Steaguri publicitare beachflag – lacrimă, pană sau dreptunghiular",
    subtitle: "Steag textil cu grafica ta, tije flexibile și geantă; alegi forma, mărimea și baza.",
    seoTitle: "Steaguri publicitare beachflag personalizate – lacrimă, pană",
    seoDescription:
        "Steaguri beachflag personalizate: lacrimă, pană sau dreptunghiular, mărimi S–XL, cu bază cruce, țăruș sau bază cu apă. Print prin sublimare, preț pe loc.",
    keywords: ["steaguri publicitare", "beach flag", "beachflag personalizat", "steag lacrima", "steag pana", "steag publicitar exterior", "steaguri evenimente"],
    initial(sp) {
        const s: PNState = {
            forma: oneOf(sp?.get("forma"), ["lacrima", "pana", "drept"] as const, "lacrima"),
            marime: oneOf(sp?.get("marime"), ["s", "m", "l", "xl"] as const, "m"),
            baza: oneOf(sp?.get("baza"), ["fara", "cruce", "tarus", "apa"] as const, "cruce"),
            quantity: intParam(sp, "q") ?? 1,
            designOption: "upload",
        };
        return beachflag.normalize(s);
    },
    normalize(s) {
        const marimi = beachflagMarimi(s.forma as BeachflagForma);
        const marime = marimi.includes(s.marime as BeachflagMarime) ? s.marime : marimi.includes("l") && s.marime === "xl" ? "l" : marimi[0];
        return { ...s, marime, quantity: clampQty(s.quantity, BEACHFLAG_CONSTANTS.QTY) };
    },
    groups(s) {
        const forma = s.forma as BeachflagForma;
        return [
            { id: "forma", label: "Forma steagului", cols: 3, choices: BEACHFLAG_CONSTANTS.FORME.map((f) => ({ value: f.value, label: f.label, sub: f.sub })) },
            {
                id: "marime",
                label: "Mărime",
                cols: 4,
                help: forma === "drept" ? "Dreptunghiularul se face în mărimile S, M și L." : undefined,
                choices: beachflagMarimi(forma).map((m) => {
                    const z = BEACHFLAG_CONSTANTS.SIZES[forma][m]!;
                    return { value: m, label: m.toUpperCase(), sub: `print ${fmt(z.printW)} × ${fmt(z.printH)} cm` };
                }),
            },
            { id: "baza", label: "Baza", cols: 4, choices: BEACHFLAG_CONSTANTS.BAZE.map((b) => ({ value: b.value, label: b.label, sub: b.sub })) },
        ];
    },
    qty: () => BEACHFLAG_CONSTANTS.QTY,
    price(s) {
        return calculateBeachflagPrice({ forma: s.forma as BeachflagForma, marime: s.marime as BeachflagMarime, baza: s.baza as BeachflagBaza, quantity: s.quantity, designOption: s.designOption });
    },
    proFee: BEACHFLAG_CONSTANTS.PRO_DESIGN_FEE,
    hasArtwork: () => true,
    artworkCm(s) {
        const z = BEACHFLAG_CONSTANTS.SIZES[s.forma as BeachflagForma][s.marime as BeachflagMarime];
        return z ? { w: z.printW, h: z.printH } : null;
    },
    gallery(s) {
        const forma = s.forma as BeachflagForma;
        const photos = FLAG_PHOTOS[`${forma}-${s.marime}`] ?? [];
        return [...(photos.length ? photos : [FLAG_SVG[forma]]), "/products/produse-noi/steaguri-beachflag-forme.jpg", "/products/produse-noi/beachflag-baze.jpg"];
    },
    summary(s) {
        const f = BEACHFLAG_CONSTANTS.FORME.find((x) => x.value === s.forma)?.label;
        const b = BEACHFLAG_CONSTANTS.BAZE.find((x) => x.value === s.baza)?.label.toLowerCase();
        return `${f} ${String(s.marime).toUpperCase()}, ${b}, ${s.quantity} buc.`;
    },
    includes(s) {
        const b = BEACHFLAG_CONSTANTS.BAZE.find((x) => x.value === s.baza);
        return `Include: steagul imprimat (o față, sublimare pe poliester), tijele din fibră și geanta de transport${b && b.value !== "fara" ? ` + ${b.label.toLowerCase()} (${b.sub})` : ""}.`;
    },
    notes: () => [
        "Print pe o față: pe spate imaginea se vede în oglindă, prin material. Steagurile față-verso le facem doar la cerere (ofertă).",
        NO_LOCKER,
    ],
    cart(s) {
        const forma = s.forma as BeachflagForma;
        const marime = s.marime as BeachflagMarime;
        const f = BEACHFLAG_CONSTANTS.FORME.find((x) => x.value === forma)!;
        const z = BEACHFLAG_CONSTANTS.SIZES[forma][marime]!;
        const b = BEACHFLAG_CONSTANTS.BAZE.find((x) => x.value === s.baza)!;
        const bagLen: Record<BeachflagMarime, number> = { s: 110, m: 125, l: 140, xl: 155 };
        const flagBox = [bagLen[marime], 15, 15];
        const box = b.value === "fara" ? flagBox : [Math.max(flagBox[0], b.box[0]), Math.max(flagBox[1], b.box[1]), flagBox[2] + b.box[2]];
        return {
            title: `Steag beachflag ${f.label.toLowerCase()} ${marime.toUpperCase()} personalizat${b.value === "fara" ? "" : `, ${b.label.toLowerCase()}`}`,
            image: beachflagImage(forma, marime),
            metadata: {
                Formă: `${f.label} (${f.sub})`,
                "Mărime steag": `${marime.toUpperCase()} – print ${fmt(z.printW)} × ${fmt(z.printH)} cm`,
                Bază: b.value === "fara" ? "Fără bază" : `${b.label} (${b.sub})`,
                Print: "O față, sublimare pe poliester",
                Pachet: "Steag + tije + geantă",
                variantId: `${forma}-${marime}`,
                accessoryId: b.value,
                width: z.printW,
                height: z.printH,
                packageCm: box,
                packageKg: Math.round((z.kg + 0.3 + b.kg) * 10) / 10,
            },
        };
    },
    content: {
        intro:
            "Steagurile beachflag se văd de departe și se mișcă în vânt, așa că atrag privirea mai repede decât un panou fix. " +
            "Le folosesc benzinăriile, showroom-urile auto, magazinele, terasele și organizatorii de evenimente și concursuri sportive.",
        sections: [
            {
                h: "Ce formă alegi",
                ul: [
                    "Lacrimă (tear drop): pânza rămâne întinsă și pe vânt slab, iar logo-ul se citește din orice unghi. Cea mai populară pentru intrări de magazin și evenimente.",
                    "Pană (feather): mai înaltă și mai îngustă, potrivită pentru texte scurte scrise pe verticală și pentru drumuri, unde contează să se vadă de la distanță.",
                    "Dreptunghiular: are cea mai mare suprafață utilă pentru logo și mesaj; e alegerea bună pentru grafică cu mult text.",
                ],
            },
            {
                h: "Mărimi și baze",
                p: [
                    "Mărimea S are în jur de 2 m înălțime, iar XL trece de 4,5 m. Lângă fiecare mărime vezi dimensiunea exactă a printului, ca să pregătești fișierul.",
                    "Baza depinde de locul unde stă steagul: crucea metalică pentru interior și pavaj, țărușul pentru pământ, iarbă și nisip, iar baza din plastic umplută cu 20 l de apă pentru asfalt și locuri cu vânt. Dacă ai deja o bază, alege „Fără bază”.",
                ],
            },
            {
                h: "Material și imprimare",
                ul: [
                    "Imprimare prin sublimare la până la 1440 dpi pe poliester de 110–117 g/mp, cu protecție UV; culorile nu se crapă și nu se cojesc.",
                    "Tije flexibile interconectabile, care se montează în câteva minute, și geantă textilă de transport incluse.",
                    "Pânza se poate înlocui separat când vrei altă campanie: păstrezi tijele și baza.",
                ],
            },
        ],
        faqs: [
            { question: "Steagul se poate folosi afară, pe vânt?", answer: "Da, steagurile sunt făcute pentru exterior. Pe vânt puternic recomandăm baza cu apă sau țărușul și să strângi steagul la furtună." },
            { question: "Se vede grafica și pe spate?", answer: "Imprimarea e pe o față; pe spate imaginea apare în oglindă, prin material, la aproximativ 70–80% din intensitate. Steagurile față-verso (două pânze cusute) le facem la cerere." },
            { question: "Ce fișier trimit?", answer: "Un PDF sau o imagine la dimensiunea printului afișată la mărimea aleasă, cu textele importante departe de marginea dinspre tijă. Dacă ai nevoie, îți trimitem șablonul formei." },
            { question: "Pot cumpăra doar pânza, fără tije?", answer: "Da, scrie-ne pentru o ofertă la pânza de schimb pe forma și mărimea pe care le ai deja." },
            { question: "Cum se livrează?", answer: "Prin curier, la adresă sau la un punct DPD: steagul cu tijele are peste un metru lungime, așa că nu încape în lockere." },
        ],
    },
};

// =====================================================================================
// 3. X-BANNER
// =====================================================================================
const XB_PHOTOS: Record<XBannerModel, string[]> = {
    compact: ["/produse-img/x-banner-compact.jpg", "/produse-img/x-banner-compact-2.jpg", "/produse-img/x-banner-compact-3.jpg", "/produse-img/x-banner-compact-4.jpg"],
    standard: ["/produse-img/x-banner-standard.jpg", "/produse-img/x-banner-standard-2.jpg", "/produse-img/x-banner-standard-3.jpg", "/produse-img/x-banner-standard-4.jpg"],
};

const xbanner: ProdusNouDef = {
    id: "x-banner",
    path: "/configurator/x-banner",
    name: "X-banner",
    h1: "X-banner personalizat – stand cu print inclus",
    subtitle: "Stand în formă de X și bannerul tău tipărit, cu capse în colțuri; se montează în mai puțin de un minut.",
    seoTitle: "X-banner personalizat cu print inclus – 60x160, 80x180 cm",
    seoDescription:
        "X-banner cu print inclus: model Compact sau Standard, 60x160, 80x180 sau 120x210 cm, banner frontlit cu capse și geantă. Alternativa economică la roll-up.",
    keywords: ["x-banner", "x banner pret", "stand x banner", "x-banner 80x180", "x-banner 60x160", "banner portabil", "stand expozitional ieftin"],
    initial(sp) {
        const s: PNState = {
            model: oneOf(sp?.get("model"), ["compact", "standard"] as const, "compact"),
            format: sp?.get("format") || "80x180",
            material: oneOf(sp?.get("material"), ["frontlit_440", "frontlit_510"] as const, "frontlit_440"),
            quantity: intParam(sp, "q") ?? 1,
            designOption: "upload",
        };
        return xbanner.normalize(s);
    },
    normalize(s) {
        const formate = xbannerFormate(s.model as XBannerModel);
        const format = formate.some((f) => f.key === s.format) ? s.format : formate[formate.length - 1].key;
        return { ...s, format, quantity: clampQty(s.quantity, XBANNER_CONSTANTS.QTY) };
    },
    groups(s) {
        return [
            { id: "model", label: "Modelul standului", cols: 2, choices: XBANNER_CONSTANTS.MODELE.map((m) => ({ value: m.value, label: m.label, sub: m.sub })) },
            {
                id: "format",
                label: "Dimensiune",
                cols: 3,
                help: s.model === "compact" ? "120 × 210 cm există doar la modelul Standard." : undefined,
                choices: xbannerFormate(s.model as XBannerModel).map((f) => ({ value: f.key, label: `${f.w} × ${f.h} cm`, sub: `print ${f.w}×${f.h} cm` })),
            },
            { id: "material", label: "Materialul printului", cols: 2, choices: XBANNER_CONSTANTS.MATERIALE.map((m) => ({ value: m.value, label: m.label, sub: m.sub })) },
        ];
    },
    qty: () => XBANNER_CONSTANTS.QTY,
    price(s) {
        return calculateXBannerPrice({ model: s.model as XBannerModel, format: String(s.format), material: s.material as XBannerMaterial, quantity: s.quantity, designOption: s.designOption });
    },
    proFee: XBANNER_CONSTANTS.PRO_DESIGN_FEE,
    hasArtwork: () => true,
    artworkCm(s) {
        const f = XBANNER_CONSTANTS.FORMATE.find((x) => x.key === s.format)!;
        return { w: f.w, h: f.h };
    },
    gallery(s) {
        return XB_PHOTOS[s.model as XBannerModel];
    },
    summary(s) {
        return `${s.model === "standard" ? "Standard" : "Compact"} ${String(s.format).replace("x", "×")} cm, ${s.quantity} buc.`;
    },
    includes(s) {
        return `Include: standul X-banner ${s.model === "standard" ? "Standard cu geantă" : "Compact cu sac"} + bannerul tipărit, tăiat la format, cu capse în colțuri.`;
    },
    notes: () => ["X-bannerul e pentru interior sau pentru exterior fără vânt; pe vânt recomandăm un steag beachflag sau un banner prins.", NO_LOCKER],
    cart(s) {
        const model = s.model as XBannerModel;
        const f = XBANNER_CONSTANTS.FORMATE.find((x) => x.key === s.format)!;
        const mat = XBANNER_CONSTANTS.MATERIALE.find((m) => m.value === s.material)!;
        const pack = XBANNER_CONSTANTS.PACK[`${model}-${f.key}`];
        const printKg = ((f.w * f.h) / 10000) * (mat.value === "frontlit_510" ? 0.55 : 0.48);
        return {
            title: `X-banner ${model === "standard" ? "Standard" : "Compact"} ${f.w}x${f.h} cm cu print`,
            image: XB_PHOTOS[model][0],
            metadata: {
                Model: model === "standard" ? "Standard (metal, geantă)" : "Compact (fibră de sticlă, sac)",
                Format: `${f.w} × ${f.h} cm`,
                "Material print": `${mat.label}, capse în colțuri`,
                variantId: `${model}-${f.key}`,
                materialId: mat.value,
                width: f.w,
                height: f.h,
                packageCm: pack.box,
                packageKg: Math.round((pack.kg + printKg + 0.2) * 10) / 10,
            },
        };
    },
    content: {
        intro:
            "X-bannerul e cel mai ieftin stand portabil pentru un banner: patru brațe elastice în formă de X întind bannerul prin capsele din colțuri. " +
            "Se strânge într-un sac sau într-o geantă mică și îl duci ușor la târguri, conferințe, recepții sau în magazin.",
        sections: [
            {
                h: "Compact sau Standard",
                ul: [
                    "Compact: construit integral din fibră de sticlă, cântărește 0,6–0,8 kg și vine cu sac de transport. Bun pentru evenimente dese și buget mic; există în 60 × 160 și 80 × 180 cm.",
                    "Standard: corp din metal vopsit în câmp electrostatic și brațe elastice din fibră de sticlă, mai stabil, cu geantă. Există și în formatul mare de 120 × 210 cm.",
                ],
            },
            {
                h: "Bannerul inclus",
                p: [
                    "Tipărim grafica ta pe banner frontlit de 440 g/mp (sau 510 g/mp, mai rigid), îl tăiem la format și punem capsele în colțuri, exact unde le prinde standul. Primești standul și bannerul gata de montat.",
                    "Pentru grafică lasă 2–3 cm liberi spre margini, unde sunt capsele, și pune mesajul principal în treimea de sus, la nivelul ochilor.",
                ],
            },
            {
                h: "X-banner sau roll-up?",
                p: [
                    "X-bannerul costă mai puțin și se schimbă bannerul în câteva secunde, dar rămâne la vedere structura din spate. Roll-up-ul ascunde bannerul într-o casetă de aluminiu și arată mai elegant la standuri; alege-l dacă îl folosești des la evenimente de prezentare.",
                ],
            },
        ],
        faqs: [
            { question: "Prețul include și printul?", answer: "Da: standul X-banner + bannerul tipărit pe frontlit, tăiat la format și cu capse în colțuri." },
            { question: "Pot comanda doar bannerul pentru standul meu?", answer: "Da, alege dimensiunea din configuratorul de banner (cu capse în colțuri) sau scrie-ne pe WhatsApp." },
            { question: "Se poate folosi afară?", answer: "Pe vreme calmă, da. Standul e ușor și se poate răsturna pe vânt; pentru exterior recomandăm steagurile beachflag sau panourile stradale cu bază." },
            { question: "Cât durează montajul?", answer: "Sub un minut: desfaci brațele, prinzi capsele bannerului în cârligele din colțuri și standul îl ține întins." },
        ],
    },
};

// =====================================================================================
// 4. PANOU STRADAL TIP A (PEOPLE STOPPER)
// =====================================================================================
const PANOU_PHOTOS: Record<string, string[]> = {
    "aluminiu-a1": ["/produse-img/people-stopper-silver-a1.jpg", "/produse-img/people-stopper-silver-a1-2.jpg", "/produse-img/people-stopper-silver-a1-3.jpg", "/produse-img/people-stopper-silver-a1-4.jpg"],
    "aluminiu-b1": ["/produse-img/people-stopper-silver-b1.jpg", "/produse-img/people-stopper-silver-b1-2.jpg", "/produse-img/people-stopper-silver-b1-3.jpg", "/produse-img/people-stopper-silver-b1-4.jpg"],
    "aluminiu-a0": ["/produse-img/people-stopper-silver-a0.jpg", "/produse-img/people-stopper-silver-a0-2.jpg", "/produse-img/people-stopper-silver-a0-3.jpg", "/produse-img/people-stopper-silver-a0-4.jpg"],
    "exterior-a1": ["/produse-img/people-stopper-pavement-silver-a1.jpg", "/produse-img/people-stopper-pavement-silver-a1-2.jpg", "/produse-img/people-stopper-pavement-silver-a1-3.jpg", "/produse-img/people-stopper-pavement-silver-a1-4.jpg"],
    "lemn-s": ["/produse-img/people-stopper-wood-51-x-90-cm-2.jpg", "/produse-img/people-stopper-wood-51-x-90-cm.jpg", "/produse-img/people-stopper-wood-51-x-90-cm-3.jpg"],
    "lemn-m": ["/produse-img/people-stopper-wood-m-60x100-cm-2.jpg", "/produse-img/people-stopper-wood-m-60x100-cm.jpg", "/produse-img/people-stopper-wood-m-60x100-cm-3.jpg"],
    "lemn-l": ["/produse-img/people-stopper-wood-61-x-118-cm-2.jpg", "/produse-img/people-stopper-wood-61-x-118-cm.jpg", "/produse-img/people-stopper-wood-61-x-118-cm-3.jpg"],
    "lemn-xl": ["/produse-img/people-stopper-wood-72-x-160-cm-2.jpg", "/produse-img/people-stopper-wood-72-x-160-cm.jpg", "/produse-img/people-stopper-wood-72-x-160-cm-3.jpg"],
};

export function panouImage(model: string, format: string): string {
    return PANOU_PHOTOS[`${model}-${format}`]?.[0] ?? PANOU_PHOTOS["aluminiu-a1"][0];
}

const panou: ProdusNouDef = {
    id: "panou-stradal",
    path: "/configurator/panou-stradal",
    name: "Panou stradal tip A (people stopper)",
    h1: "Panou stradal tip A (people stopper) – cu afișele tale",
    subtitle: "Panou de trotuar care oprește trecătorii: ramă click din aluminiu, model de exterior cu apă sau lemn cu tablă de cretă.",
    seoTitle: "Panou stradal tip A / people stopper cu afiș – A1, B1, A0",
    seoDescription:
        "Panou stradal tip A (people stopper, stop-trotuar) din aluminiu cu ramă click, A1, B1 sau A0, cu unul sau două afișe incluse; model de exterior cu bază cu apă sau lemn cu tablă de cretă.",
    keywords: ["panou stradal", "people stopper", "stop trotuar", "panou tip A", "a-board", "panou trotuar", "panou publicitar stradal", "tabla creta restaurant"],
    initial(sp) {
        const model = oneOf(sp?.get("model"), ["aluminiu", "exterior", "lemn"] as const, "aluminiu");
        const afise = sp?.get("afise");
        const s: PNState = {
            model,
            format: sp?.get("format") || "a1",
            afise: afise !== null && afise !== undefined && /^\d$/.test(afise) ? parseInt(afise, 10) : panouMaxAfise(model),
            afisMaterial: oneOf(sp?.get("hartie"), ["blueback", "foto"] as const, "blueback"),
            quantity: intParam(sp, "q") ?? 1,
            designOption: "upload",
        };
        return panou.normalize(s);
    },
    normalize(s) {
        const model = s.model as PanouModel;
        const f = panouFormat(model, String(s.format));
        const max = panouMaxAfise(model);
        return { ...s, format: f.key, afise: Math.max(0, Math.min(max, Number(s.afise) || 0)), quantity: clampQty(s.quantity, PANOU_CONSTANTS.QTY) };
    },
    groups(s) {
        const model = s.model as PanouModel;
        const max = panouMaxAfise(model);
        const g: PNGroup[] = [
            { id: "model", label: "Modelul panoului", cols: 3, choices: PANOU_CONSTANTS.MODELE.map((m) => ({ value: m.value, label: m.label, sub: m.sub })) },
            {
                id: "format",
                label: model === "lemn" ? "Mărime" : "Format afiș",
                cols: model === "lemn" ? 4 : 3,
                help: model === "exterior" ? "Modelul de exterior cu arcuri se face în format A1." : undefined,
                choices: PANOU_CONSTANTS.FORMATE[model].map((f) => ({ value: f.key, label: f.label, sub: f.sub })),
            },
        ];
        if (max > 0) {
            g.push({
                id: "afise",
                label: "Afișe tipărite incluse",
                cols: max === 2 ? 3 : 2,
                choices: [
                    { value: "0", label: "Fără afiș", sub: "doar panoul" },
                    { value: "1", label: "Un afiș", sub: max === 2 ? "pe o față" : "fața panoului" },
                    ...(max === 2 ? [{ value: "2", label: "Două afișe", sub: "câte unul pe fiecare față" }] : []),
                ],
            });
            if (Number(s.afise) > 0)
                g.push({ id: "afisMaterial", label: "Hârtia afișului", cols: 2, choices: PANOU_CONSTANTS.AFIS_MATERIALE.map((m) => ({ value: m.value, label: m.label, sub: m.sub })) });
        }
        return g;
    },
    qty: () => PANOU_CONSTANTS.QTY,
    price(s) {
        return calculatePanouStradalPrice({ model: s.model as PanouModel, format: String(s.format), afise: Number(s.afise), afisMaterial: s.afisMaterial as PanouAfisMaterial, quantity: s.quantity, designOption: s.designOption });
    },
    proFee: PANOU_CONSTANTS.PRO_DESIGN_FEE,
    hasArtwork: (s) => Number(s.afise) > 0,
    artworkCm(s) {
        const f = panouFormat(s.model as PanouModel, String(s.format));
        return f.posterW ? { w: f.posterW, h: f.posterH } : null;
    },
    gallery(s) {
        return PANOU_PHOTOS[`${s.model}-${s.format}`] ?? PANOU_PHOTOS["aluminiu-a1"];
    },
    summary(s) {
        const m = PANOU_CONSTANTS.MODELE.find((x) => x.value === s.model)?.label;
        const f = panouFormat(s.model as PanouModel, String(s.format));
        const a = Number(s.afise);
        return `${m}, ${f.label}${s.model === "lemn" ? "" : `, ${a === 0 ? "fără afiș" : a === 1 ? "1 afiș" : "2 afișe"}`}, ${s.quantity} buc.`;
    },
    includes(s) {
        const a = Number(s.afise);
        if (s.model === "lemn") return "Include: panoul din lemn masiv cu tablă de cretă pe ambele fețe, livrat în cutie (fără afiș).";
        const frame = s.model === "exterior" ? "panoul de exterior cu bază-rezervor (se umple cu apă), roți și ramă pe arcuri" : "panoul din aluminiu cu ramă click și folie de protecție UV pe ambele fețe";
        return `Include: ${frame}${a > 0 ? ` + ${a === 1 ? "un afiș tipărit" : "două afișe tipărite"} la formatul ramei` : ""}.`;
    },
    notes: (s) => {
        const f = panouFormat(s.model as PanouModel, String(s.format));
        return [`Greutate aproximativă cu ambalaj: ${fmt(f.kg)} kg${f.kgEstimat ? " (estimare)" : ""}. ${NO_LOCKER}`];
    },
    cart(s) {
        const model = s.model as PanouModel;
        const f = panouFormat(model, String(s.format));
        const m = PANOU_CONSTANTS.MODELE.find((x) => x.value === model)!;
        const a = Number(s.afise);
        const mat = PANOU_CONSTANTS.AFIS_MATERIALE.find((x) => x.value === s.afisMaterial)!;
        const meta: Record<string, unknown> = {
            Model: `${m.label} (${m.sub})`,
            Format: model === "lemn" ? `${f.label} – ${f.sub}` : `${f.label} – ${f.sub.split(" · ")[0]}`,
        };
        if (model !== "lemn") {
            meta["Afișe incluse"] = a === 0 ? "Fără afiș" : a === 1 ? "1 afiș" : "2 afișe (câte unul pe fiecare față)";
            if (a > 0) meta["Hârtie afiș"] = mat.label;
        }
        Object.assign(meta, {
            variantId: `${model}-${f.key}`,
            posters: model === "lemn" ? 0 : a,
            materialId: a > 0 ? mat.value : "",
            ...(f.posterW ? { width: f.posterW, height: f.posterH } : {}),
            packageCm: f.box,
            packageKg: f.kg,
            packageLarge: true,
        });
        const modelTitle = model === "aluminiu" ? "aluminiu" : model === "exterior" ? "de exterior cu arcuri" : "lemn cu tablă de cretă";
        return {
            title: `Panou stradal tip A ${modelTitle} ${f.label}${model === "lemn" ? "" : a === 0 ? ", fără afiș" : a === 1 ? ", cu 1 afiș" : ", cu 2 afișe"}`,
            image: panouImage(model, f.key),
            metadata: meta,
        };
    },
    content: {
        intro:
            "Panoul stradal tip A (people stopper, stop-trotuar sau A-board) stă în fața ușii și le spune trecătorilor ce oferi azi: meniul zilei, o reducere, programul sau o săgeată spre intrare. " +
            "Afișele se schimbă în câteva secunde, iar panoul îl păstrezi ani de zile.",
        sections: [
            {
                h: "Trei modele",
                ul: [
                    "Aluminiu, două fețe: ramă click argintie de 25 mm, spate din oțel galvanizat și folie de protecție UV. Se deschid cele patru laturi ale ramei, pui afișul și închizi. Formate A1, B1 și A0, pentru interior și pentru exterior pe vreme calmă.",
                    "Exterior cu arcuri: rama stă pe arcuri și se înclină pe vânt, iar baza din plastic se umple cu apă și are roți. Format A1, o față. Pentru trotuare și benzinării cu vânt.",
                    "Lemn cu tablă de cretă: lemn masiv natur, cu tablă pe ambele fețe; scrii meniul cu creta și îl ștergi oricând. Mărimi S–XL, pentru restaurante, cafenele și florării.",
                ],
            },
            {
                h: "Afișele incluse",
                p: [
                    "La panourile cu ramă alegi câte afișe tipărim (niciunul, unul sau câte unul pe fiecare față) și hârtia: blueback, opacă, care nu lasă să se vadă afișul din spate, sau hârtie foto pentru culori mai vii. Afișele se tipăresc exact la formatul ramei (A1, B1 sau A0).",
                    "Fișierul: PDF sau imagine la formatul ales, cu 3 mm margine de tăiere; lasă 2 cm liberi la margini, unde rama acoperă afișul.",
                ],
            },
            {
                h: "Livrare",
                p: [
                    "Panourile au între 4 și 15 kg și peste un metru lungime, așa că le livrăm prin curier la adresă sau la un punct DPD care primește colete mari (nu în lockere).",
                ],
            },
        ],
        faqs: [
            { question: "Pot comanda doar afișe pentru un panou pe care îl am deja?", answer: "Da, din configuratorul de afișe (A1, A0) sau scrie-ne formatul exact al ramei tale." },
            { question: "Panoul din aluminiu rezistă afară?", answer: "Da, pe trotuar sau la intrare, pe vreme calmă; folia are filtru UV. Pentru zone cu vânt alege modelul de exterior cu arcuri și bază cu apă." },
            { question: "Ce diferență e între blueback și hârtie foto?", answer: "Blueback are spatele albastru, opac, și e hârtia clasică pentru afișe în ramă. Hârtia foto are culori mai saturate și luciu, potrivită pentru fotografii de produs." },
            { question: "Panoul din lemn ia afiș?", answer: "Nu, are tablă de cretă pe ambele fețe: scrii direct pe ea cu creta sau cu markerul cu cretă lichidă." },
            { question: "Vine montat?", answer: "Panourile se livrează pliate, gata de folosit: le deschizi și blochezi lanțul sau balamaua de siguranță. La modelul de exterior umpli baza cu apă." },
        ],
    },
};

export const PRODUSE_NOI: Record<ProdusNouId, ProdusNouDef> = {
    calendare,
    beachflag,
    "x-banner": xbanner,
    "panou-stradal": panou,
};

export const PRODUSE_NOI_LIST: ProdusNouDef[] = Object.values(PRODUSE_NOI);

/** Prețul afișat la deschiderea paginii configuratorului (cu parametrii din adresă). */
export function produsNouLandingPrice(id: ProdusNouId, sp?: ParamSource): number {
    const d = PRODUSE_NOI[id];
    return d.price(d.initial(sp)).finalPrice;
}

/** Cel mai mic preț total posibil (o bucată / tirajul minim), pentru textele „de la ... lei”. */
export function produsNouFromPrice(id: ProdusNouId): number {
    const d = PRODUSE_NOI[id];
    const start = d.initial();
    let best = Infinity;
    const visit = (s: PNState, depth: number) => {
        const groups = d.groups(s);
        if (depth >= groups.length) {
            const n = d.normalize({ ...s, quantity: d.qty(s).min });
            best = Math.min(best, d.price(n).finalPrice);
            return;
        }
        for (const c of groups[depth].choices) visit(d.normalize({ ...s, [groups[depth].id]: c.value }), depth + 1);
    };
    visit(start, 0);
    return best;
}
