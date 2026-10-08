// Prețurile produselor noi: calendare, steaguri beachflag, X-banner, panou stradal (people stopper).
//
// Regula proprietarului: prețul = DUBLUL costului de producție PrintCenter (preț fără TVA = 2 × cost fără TVA,
// afișat × 1,21 ca la celelalte produse — preț final). Costurile (cu sursă, link, dată, bază TVA) sunt în
// data/productie/costuri-produse-noi.json; tabelul de vânzare lib/produseNoi/preturi.generated.ts se regenerează cu
// `npx tsx scripts/genereaza-preturi-produse-noi.ts`. Aici doar combinăm pozițiile (structură + print + bază ...).
// Funcțiile sunt re-exportate din lib/pricing.ts (prețurile vin doar de acolo).

import { PRETURI_PRODUSE_NOI } from "./preturi.generated";

const r2 = (n: number) => Math.round(n * 100) / 100;

export type ProdusNouDesignOption = "upload" | "pro";

/** Prețul pe bucată (unit „buc”) sau tariful pe m² (unit „m2”) al poziției `id` la cantitatea / suprafața `q`. */
export function pretProdusNou(id: string, q: number): number {
    const p = PRETURI_PRODUSE_NOI[id];
    if (!p || !p.tiers.length) return 0;
    let price = p.tiers[0].price;
    for (const t of p.tiers) if (q >= t.min) price = t.price;
    return price;
}

/** Există preț pentru poziția `id`? (variantele fără preț nu se afișează) */
export function arePretProdusNou(id: string): boolean {
    return !!PRETURI_PRODUSE_NOI[id]?.tiers.length;
}

export type PriceLine = { label: string; unit: number; qty: number; total: number };
export type ProdusNouPrice = { unitPrice: number; finalPrice: number; designFee: number; lines: PriceLine[] };

function result(lines: PriceLine[], quantity: number, designFee: number): ProdusNouPrice {
    const perUnit = r2(lines.reduce((s, l) => s + l.unit * (l.qty / Math.max(1, quantity)), 0));
    const goods = r2(lines.reduce((s, l) => s + l.total, 0));
    return { unitPrice: perUnit, finalPrice: r2(goods + designFee), designFee, lines };
}

const line = (label: string, unit: number, qty: number): PriceLine => ({ label, unit: r2(unit), qty, total: r2(r2(unit) * qty) });

// =====================================================================================
// 1. CALENDARE PERSONALIZATE
// =====================================================================================
export type CalendarTip = "perete" | "birou" | "buzunar";
export type CalendarFormat = {
    key: string;
    label: string;
    sub: string;
    /** poziția din tabelul de prețuri (la buzunar depinde de print) */
    priceId: string;
    wCm: number;
    hCm: number;
    /** formatul scris în e-mailul către tipografie */
    pcFormat: string;
};

export const CALENDAR_CONSTANTS = {
    TIPURI: [
        { value: "perete" as const, label: "De perete", sub: "12+1 file, spirală" },
        { value: "birou" as const, label: "De birou", sub: "triunghiular, 12+1 file" },
        { value: "buzunar" as const, label: "De buzunar", sub: "card 7 × 10 cm" },
    ],
    FORMATE: {
        perete: [
            { key: "a4", label: "Mediu (A4)", sub: "22,5 × 30 cm", priceId: "calendar-perete-a4", wCm: 22.5, hCm: 30, pcFormat: "225x300mm" },
            { key: "a3", label: "Mare (A3)", sub: "30 × 47 cm", priceId: "calendar-perete-a3", wCm: 30, hCm: 47, pcFormat: "300x470mm" },
        ],
        birou: [
            { key: "105x105", label: "Pătrat mic", sub: "10,5 × 10,5 cm", priceId: "calendar-birou-105x105", wCm: 10.5, hCm: 10.5, pcFormat: "105x105mm" },
            { key: "140x105", label: "Standard", sub: "14 × 10,5 cm", priceId: "calendar-birou-140x105", wCm: 14, hCm: 10.5, pcFormat: "140x105mm" },
            { key: "160x120", label: "Mare", sub: "16 × 12 cm", priceId: "calendar-birou-160x120", wCm: 16, hCm: 12, pcFormat: "160x120mm" },
            { key: "235x105", label: "Panoramic", sub: "23,5 × 10,5 cm", priceId: "calendar-birou-235x105", wCm: 23.5, hCm: 10.5, pcFormat: "235x105mm" },
        ],
        buzunar: [{ key: "70x100", label: "Card", sub: "7 × 10 cm", priceId: "calendar-buzunar-4-1", wCm: 7, hCm: 10, pcFormat: "70x100mm" }],
    } as Record<CalendarTip, CalendarFormat[]>,
    QTY: {
        perete: { min: 1, max: 2000, presets: [1, 10, 25, 50, 100, 200] },
        birou: { min: 1, max: 500, presets: [1, 10, 25, 50, 100, 250] },
        buzunar: { min: 50, max: 10000, presets: [50, 100, 300, 500, 1000, 2000] },
    } as Record<CalendarTip, { min: number; max: number; presets: number[] }>,
    PRO_DESIGN_FEE: 200,
};

export type PriceInputCalendar = {
    tip: CalendarTip;
    format: string;
    quantity: number;
    /** doar la buzunar: față color + verso alb-negru (4+1) sau față-verso color (4+4) */
    print: "4+1" | "4+4";
    laminare: boolean;
    colturi: boolean;
    designOption: ProdusNouDesignOption;
};

export function calendarFormat(tip: CalendarTip, key: string): CalendarFormat {
    const list = CALENDAR_CONSTANTS.FORMATE[tip] || CALENDAR_CONSTANTS.FORMATE.perete;
    return list.find((f) => f.key === key) || list[0];
}

export function calculateCalendarPrice(input: PriceInputCalendar): ProdusNouPrice {
    const q = Math.max(1, Math.floor(input.quantity || 1));
    const f = calendarFormat(input.tip, input.format);
    const lines: PriceLine[] = [];
    if (input.tip === "buzunar") {
        const id = input.print === "4+4" ? "calendar-buzunar-4-4" : "calendar-buzunar-4-1";
        lines.push(line(`Calendar de buzunar ${f.sub}, ${input.print === "4+4" ? "față-verso color" : "față color, verso alb-negru"}`, pretProdusNou(id, q), q));
        if (input.laminare) lines.push(line("Laminare (mat sau lucios)", pretProdusNou("calendar-buzunar-laminare", q), q));
        if (input.colturi) lines.push(line("Colțuri rotunjite", pretProdusNou("calendar-buzunar-colturi", q), q));
    } else {
        lines.push(line(`Calendar ${input.tip === "perete" ? "de perete" : "de birou"} ${f.sub}`, pretProdusNou(f.priceId, q), q));
    }
    return result(lines, q, input.designOption === "pro" ? CALENDAR_CONSTANTS.PRO_DESIGN_FEE : 0);
}

// =====================================================================================
// 2. STEAGURI PUBLICITARE BEACHFLAG
// =====================================================================================
export type BeachflagForma = "lacrima" | "pana" | "drept";
export type BeachflagMarime = "s" | "m" | "l" | "xl";
export type BeachflagBaza = "fara" | "cruce" | "tarus" | "apa";

type BeachflagSize = { printW: number; printH: number; kg: number };

export const BEACHFLAG_CONSTANTS = {
    FORME: [
        { value: "lacrima" as const, label: "Lacrimă", sub: "tear drop", pcName: "Beachflag Lacrima" },
        { value: "pana" as const, label: "Pană", sub: "feather", pcName: "Beachflag Pana" },
        { value: "drept" as const, label: "Dreptunghiular", sub: "rectangular", pcName: "Beachflag Drept" },
    ],
    MARIMI: ["s", "m", "l", "xl"] as BeachflagMarime[],
    /** dimensiunea printului (cm) și greutatea kitului (kg), din paginile PrintCenter */
    SIZES: {
        lacrima: { s: { printW: 96.4, printH: 167.8, kg: 0.9 }, m: { printW: 107.8, printH: 218, kg: 1.0 }, l: { printW: 121, printH: 306.9, kg: 1.3 }, xl: { printW: 135.5, printH: 394.5, kg: 1.5 } },
        pana: { s: { printW: 70.1, printH: 202.9, kg: 0.9 }, m: { printW: 70.1, printH: 262.1, kg: 1.3 }, l: { printW: 89.9, printH: 349.2, kg: 1.3 }, xl: { printW: 89.9, printH: 447.9, kg: 1.5 } },
        // greutatea la Drept L nu e trecută la PrintCenter: estimare 1,2 kg
        drept: { s: { printW: 80.4, printH: 237.3, kg: 0.9 }, m: { printW: 80.4, printH: 296.1, kg: 1.0 }, l: { printW: 80.4, printH: 394.1, kg: 1.2 } },
    } as Record<BeachflagForma, Partial<Record<BeachflagMarime, BeachflagSize>>>,
    BAZE: [
        { value: "fara" as const, label: "Fără bază", sub: "am deja una", priceId: "", pcName: "", kg: 0, box: [0, 0, 0] },
        { value: "cruce" as const, label: "Bază cruce", sub: "metalică 45 cm, 3 kg", priceId: "beachflag-baza-cruce", pcName: "Baza metalica in cruce - 45 cm, 3 kg", kg: 3, box: [50, 12, 10] },
        { value: "tarus" as const, label: "Țăruș", sub: "în pământ, iarbă, nisip", priceId: "beachflag-baza-tarus", pcName: "Melc - Drill", kg: 1, box: [60, 12, 10] },
        { value: "apa" as const, label: "Bază cu apă", sub: "plastic 50 cm, 20 l", priceId: "beachflag-baza-apa", pcName: "Baza de plastic 50 cm, 20 l", kg: 2.5, box: [52, 52, 20] },
    ],
    QTY: { min: 1, max: 100, presets: [1, 2, 3, 5, 10] },
    PRO_DESIGN_FEE: 100,
};

export type PriceInputBeachflag = {
    forma: BeachflagForma;
    marime: BeachflagMarime;
    baza: BeachflagBaza;
    quantity: number;
    designOption: ProdusNouDesignOption;
};

export const beachflagPriceId = (forma: BeachflagForma, marime: BeachflagMarime) => `beachflag-${forma}-${marime}`;

/** Mărimile cu preț pentru forma aleasă (dreptunghiularul nu are XL). */
export function beachflagMarimi(forma: BeachflagForma): BeachflagMarime[] {
    return BEACHFLAG_CONSTANTS.MARIMI.filter((m) => !!BEACHFLAG_CONSTANTS.SIZES[forma]?.[m] && arePretProdusNou(beachflagPriceId(forma, m)));
}

export function calculateBeachflagPrice(input: PriceInputBeachflag): ProdusNouPrice {
    const q = Math.max(1, Math.floor(input.quantity || 1));
    const forma = BEACHFLAG_CONSTANTS.FORME.find((f) => f.value === input.forma) || BEACHFLAG_CONSTANTS.FORME[0];
    const marime = beachflagMarimi(forma.value).includes(input.marime) ? input.marime : beachflagMarimi(forma.value)[0];
    const lines: PriceLine[] = [line(`Steag ${forma.label.toLowerCase()} ${marime.toUpperCase()} cu print, tije și geantă`, pretProdusNou(beachflagPriceId(forma.value, marime), q), q)];
    const baza = BEACHFLAG_CONSTANTS.BAZE.find((b) => b.value === input.baza);
    if (baza && baza.priceId) lines.push(line(baza.label, pretProdusNou(baza.priceId, q), q));
    return result(lines, q, input.designOption === "pro" ? BEACHFLAG_CONSTANTS.PRO_DESIGN_FEE : 0);
}

// =====================================================================================
// 3. X-BANNER
// =====================================================================================
export type XBannerModel = "compact" | "standard";
export type XBannerMaterial = "frontlit_440" | "frontlit_510";

export const XBANNER_CONSTANTS = {
    MODELE: [
        { value: "compact" as const, label: "Compact", sub: "fibră de sticlă, sac de transport" },
        { value: "standard" as const, label: "Standard", sub: "metal + brațe elastice, geantă" },
    ],
    FORMATE: [
        { key: "60x160", w: 60, h: 160 },
        { key: "80x180", w: 80, h: 180 },
        { key: "120x210", w: 120, h: 210 },
    ],
    /** ambalajul structurii (cm) și greutatea (kg), din paginile PrintCenter */
    PACK: {
        "compact-60x160": { box: [100, 8, 8], kg: 0.6 },
        "compact-80x180": { box: [125, 8, 8], kg: 0.8 },
        "standard-60x160": { box: [120, 15, 8], kg: 1.3 },
        "standard-80x180": { box: [130, 15, 8], kg: 1.4 },
        "standard-120x210": { box: [150, 17, 8], kg: 1.7 },
    } as Record<string, { box: [number, number, number]; kg: number }>,
    MATERIALE: [
        { value: "frontlit_440" as const, label: "Frontlit 440 g/mp", sub: "standard, mat-satinat", priceId: "banner-frontlit-440", pcName: "Frontlit 440g" },
        { value: "frontlit_510" as const, label: "Frontlit 510 g/mp", sub: "mai gros, mai rigid", priceId: "banner-frontlit-510", pcName: "Frontlit 510g" },
    ],
    QTY: { min: 1, max: 500, presets: [1, 2, 5, 10, 25] },
    PRO_DESIGN_FEE: 100,
};

export type PriceInputXBanner = { model: XBannerModel; format: string; material: XBannerMaterial; quantity: number; designOption: ProdusNouDesignOption };

export const xbannerPriceId = (model: XBannerModel, format: string) => `xbanner-${model}-${format}`;

/** Formatele cu preț pentru modelul ales (Compact nu are 120x210). */
export function xbannerFormate(model: XBannerModel) {
    return XBANNER_CONSTANTS.FORMATE.filter((f) => arePretProdusNou(xbannerPriceId(model, f.key)));
}

export function calculateXBannerPrice(input: PriceInputXBanner): ProdusNouPrice {
    const q = Math.max(1, Math.floor(input.quantity || 1));
    const formate = xbannerFormate(input.model);
    const f = formate.find((x) => x.key === input.format) || formate[0];
    const mat = XBANNER_CONSTANTS.MATERIALE.find((m) => m.value === input.material) || XBANNER_CONSTANTS.MATERIALE[0];
    const area = (f.w * f.h) / 10000;
    const printUnit = area * pretProdusNou(mat.priceId, area * q);
    const lines = [
        line(`Structură X-banner ${input.model === "standard" ? "Standard" : "Compact"} ${f.w}×${f.h} cm`, pretProdusNou(xbannerPriceId(input.model, f.key), q), q),
        line(`Print ${f.w}×${f.h} cm pe ${mat.label}, cu capse`, printUnit, q),
    ];
    return result(lines, q, input.designOption === "pro" ? XBANNER_CONSTANTS.PRO_DESIGN_FEE : 0);
}

// =====================================================================================
// 4. PANOU STRADAL TIP A (PEOPLE STOPPER)
// =====================================================================================
export type PanouModel = "aluminiu" | "exterior" | "lemn";
export type PanouAfisMaterial = "blueback" | "foto";

type PanouFormat = { key: string; label: string; sub: string; priceId: string; pcName: string; posterW: number; posterH: number; box: [number, number, number]; kg: number; kgEstimat?: boolean };

export const PANOU_CONSTANTS = {
    MODELE: [
        { value: "aluminiu" as const, label: "Aluminiu, două fețe", sub: "ramă click argintie, interior", maxAfise: 2 },
        { value: "exterior" as const, label: "Exterior cu arcuri", sub: "bază cu apă și roți, o față", maxAfise: 1 },
        { value: "lemn" as const, label: "Lemn cu tablă de cretă", sub: "scrii cu creta, fără afiș", maxAfise: 0 },
    ],
    FORMATE: {
        aluminiu: [
            { key: "a1", label: "A1", sub: "afiș 59,4 × 84,1 cm · înălțime 106 cm", priceId: "panou-silver-a1", pcName: "People Stopper Silver A1", posterW: 59.4, posterH: 84.1, box: [110, 66, 8], kg: 9.5 },
            { key: "b1", label: "B1", sub: "afiș 70,7 × 100 cm · înălțime 130 cm", priceId: "panou-silver-b1", pcName: "People Stopper Silver B1", posterW: 70.7, posterH: 100, box: [134, 78, 8], kg: 9.7 },
            { key: "a0", label: "A0", sub: "afiș 84,1 × 118,9 cm · înălțime 146 cm", priceId: "panou-silver-a0", pcName: "People Stopper Silver A0", posterW: 84.1, posterH: 118.9, box: [150, 92, 8], kg: 13.1 },
        ],
        exterior: [
            { key: "a1", label: "A1", sub: "afiș 59,4 × 84,1 cm · 15 kg cu rezervorul gol", priceId: "panou-pavement-a1", pcName: "People Stopper Pavement Silver A1", posterW: 59.4, posterH: 84.1, box: [120, 72, 45], kg: 15.5 },
        ],
        lemn: [
            { key: "s", label: "S", sub: "51 × 85 cm · tablă 44 × 66 cm", priceId: "panou-lemn-s", pcName: "People Stopper Wood Natural S (51x90cm)", posterW: 0, posterH: 0, box: [90, 52, 8], kg: 4.3 },
            { key: "m", label: "M", sub: "60 × 95 cm · tablă 53 × 66 cm", priceId: "panou-lemn-m", pcName: "People Stopper Wood Natural M (60x100cm)", posterW: 0, posterH: 0, box: [100, 61, 8], kg: 5, kgEstimat: true },
            { key: "l", label: "L", sub: "61 × 114 cm · tablă 53 × 80 cm", priceId: "panou-lemn-l", pcName: "People Stopper Wood Natural L (61x118cm)", posterW: 0, posterH: 0, box: [118, 62, 8], kg: 6, kgEstimat: true },
            { key: "xl", label: "XL", sub: "72 × 156 cm · tablă 64 × 136 cm", priceId: "panou-lemn-xl", pcName: "People Stopper Wood Natural XL (72x160cm)", posterW: 0, posterH: 0, box: [160, 74, 9], kg: 8, kgEstimat: true },
        ],
    } as Record<PanouModel, PanouFormat[]>,
    AFIS_MATERIALE: [
        { value: "blueback" as const, label: "Hârtie blueback", sub: "opacă, potrivită pentru ramă", priceId: "afis-hartie-blueback", pcName: "Hartie blueback" },
        { value: "foto" as const, label: "Hârtie foto", sub: "culori mai vii, lucioasă", priceId: "afis-hartie-foto", pcName: "Hartie foto" },
    ],
    QTY: { min: 1, max: 50, presets: [1, 2, 3, 5, 10] },
    PRO_DESIGN_FEE: 100,
};

export type PriceInputPanouStradal = { model: PanouModel; format: string; afise: number; afisMaterial: PanouAfisMaterial; quantity: number; designOption: ProdusNouDesignOption };

export function panouFormat(model: PanouModel, key: string): PanouFormat {
    const list = (PANOU_CONSTANTS.FORMATE[model] || PANOU_CONSTANTS.FORMATE.aluminiu).filter((f) => arePretProdusNou(f.priceId));
    return list.find((f) => f.key === key) || list[0];
}

export function panouMaxAfise(model: PanouModel): number {
    return PANOU_CONSTANTS.MODELE.find((m) => m.value === model)?.maxAfise ?? 0;
}

export function calculatePanouStradalPrice(input: PriceInputPanouStradal): ProdusNouPrice {
    const q = Math.max(1, Math.floor(input.quantity || 1));
    const f = panouFormat(input.model, input.format);
    const afise = Math.max(0, Math.min(panouMaxAfise(input.model), Math.floor(input.afise || 0)));
    const modelLabel = PANOU_CONSTANTS.MODELE.find((m) => m.value === input.model)?.label || "";
    const lines: PriceLine[] = [line(`Panou ${modelLabel.toLowerCase()} ${f.label}`, pretProdusNou(f.priceId, q), q)];
    if (afise > 0) {
        const mat = PANOU_CONSTANTS.AFIS_MATERIALE.find((m) => m.value === input.afisMaterial) || PANOU_CONSTANTS.AFIS_MATERIALE[0];
        const area = (f.posterW * f.posterH) / 10000;
        const posters = afise * q;
        lines.push(line(`Afiș ${f.label} pe ${mat.label.toLowerCase()}`, area * pretProdusNou(mat.priceId, area * posters), posters));
    }
    const fee = afise > 0 && input.designOption === "pro" ? PANOU_CONSTANTS.PRO_DESIGN_FEE : 0;
    return result(lines, q, fee);
}
