import { stockBannerFormat } from './bannerProductFormats';
// lib/configuratorPresets.ts
//
// Starea INIȚIALĂ a configuratoarelor, citită din adresa paginii (?w=100&h=200&q=50 ...).
// Configuratoarele își inițializează starea DOAR prin funcțiile de aici, iar feedul pentru
// Google Merchant și scripts/check-merchant-prices.ts folosesc exact aceleași funcții:
// astfel prețul din feed este, prin construcție, prețul pe care îl arată pagina la deschidere.
//
// Fără React aici — modulul e importat și de scripturi Node.

import {
    AFISE_CONSTANTS,
    ALUCOBOND_CONSTANTS,
    AUTOCOLANTE_CONSTANTS,
    FLYER_CONSTANTS,
    PLIANTE_CONSTANTS,
    PVC_FOREX_CONSTANTS,
    getFonduriEUGroups,
    type AutocolantesMaterialKey,
    type PlianteFoldType,
    type PlianteWeightKey,
    type PriceInputAlucobond,
    type PriceInputAutocolante,
    type PriceInputBanner,
    type PriceInputBannerVerso,
    type PriceInputBusinessCard,
    type PriceInputCanvas,
    type PriceInputPVCForex,
    type PriceInputRollup,
    type PriceInputTapet,
    type PriceInputWindowGraphics,
    CANVAS_CONSTANTS,
    CANVAS_MARTISOR_CONSTANTS,
} from "@/lib/pricing";

/** Orice obiect cu `get` — URLSearchParams sau ReadonlyURLSearchParams din next/navigation. */
export type ParamSource = { get(name: string): string | null };

export function configuratorInitialQuantity(sp?: ParamSource): number {
    return sp ? intParam(sp, "q") ?? 1 : 1;
}

export function contourInitialState(sp: ParamSource) {
    return {width: intParam(sp, "w") ?? 70, height: intParam(sp, "h") ?? 100, quantity: configuratorInitialQuantity(sp)};
}

export function seasonalCanvasInitialInput(sp: ParamSource) {
    const size = sp.get("size");
    return {sizeKey: CANVAS_MARTISOR_CONSTANTS.SIZES.some(s => s.key === size) ? size! : "40x60", quantity: configuratorInitialQuantity(sp), customText: "", designOption: "upload" as const};
}

function intParam(sp: ParamSource, key: string): number | undefined {
    const raw = sp.get(key);
    if (!raw) return undefined;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n > 0 ? n : undefined;
}

// ---------------------------------------------------------------------------
// ConfiguratorDispatcher: dimensiunile pe care le dă configuratoarelor (props initialWidth/Height)
// ---------------------------------------------------------------------------
export function dispatcherInitialDims(
    sp: ParamSource,
    propW?: number,
    propH?: number
): { initialWidth?: number; initialHeight?: number } {
    return {
        initialWidth: propW || (sp.get("w") ? parseInt(sp.get("w")!) : undefined),
        initialHeight: propH || (sp.get("h") ? parseInt(sp.get("h")!) : undefined),
    };
}

// ---------------------------------------------------------------------------
// Banner o față + mesh  (?w ?h ?q ?mat=510 ?wind=1 ?hem=0)
// ---------------------------------------------------------------------------
export function bannerInitialInput(
    sp: ParamSource,
    opts: { initW?: number; initH?: number; productKind?: "banner" | "mesh" } = {}
): PriceInputBanner {
    const pW = sp.get("w");
    const pH = sp.get("h");
    const pQ = sp.get("q");
    const pMat = sp.get("mat");
    const pWind = sp.get("wind");
    const pHem = sp.get("hem");
    const isMesh = opts.productKind === "mesh";

    return {
        width_cm: pW ? parseFloat(pW) : (opts.initW ?? 0),
        height_cm: pH ? parseFloat(pH) : (opts.initH ?? 0),
        quantity: pQ ? parseInt(pQ) : 1,
        material: isMesh ? "mesh" : pMat === "510" ? "frontlit_510" : "frontlit_440",
        want_wind_holes: isMesh ? false : pWind === "1",
        want_hem_and_grommets: pHem !== "0",
        designOption: "upload",
    };
}

// ---------------------------------------------------------------------------
// Banner față-verso  (?w ?h ?q ?wind=1 ?same=0)
// ---------------------------------------------------------------------------
export function bannerVersoInitialInput(
    sp: ParamSource,
    opts: { initW?: number; initH?: number } = {}
): PriceInputBannerVerso {
    const pW = sp.get("w");
    const pH = sp.get("h");
    const pQ = sp.get("q");
    const pWind = sp.get("wind");
    const pSame = sp.get("same");

    return {
        width_cm: pW ? parseInt(pW) : (opts.initW ?? 0),
        height_cm: pH ? parseInt(pH) : (opts.initH ?? 0),
        quantity: pQ ? parseInt(pQ) : 1,
        want_wind_holes: pWind === "1",
        same_graphic: pSame !== "0",
        designOption: "upload",
    };
}

// ---------------------------------------------------------------------------
// Banner cu grafică gata făcută (/banner-product/<slug>) — pagina pornește mereu de aici
// ---------------------------------------------------------------------------
export const STOCK_BANNER_DEFAULTS = {
    width: 200,
    height: 100,
    material: "frontlit_440" as "frontlit_440" | "frontlit_510",
    bannerType: "single" as "single" | "double",
    wantWindHoles: false,
    quantity: 1,
};

/** Starea de pornire a paginii /banner-product/<slug>: formatul modelului, cu ?w= preselectat (varianta din feed). */
export function stockBannerDefaultInput(slug = "", sp?: ParamSource | null): PriceInputBanner {
    const width = (sp ? intParam(sp, "w") : null) ?? STOCK_BANNER_DEFAULTS.width;
    return {
        width_cm: width,
        height_cm: width / stockBannerFormat(slug).ratio,
        quantity: STOCK_BANNER_DEFAULTS.quantity,
        material: stockBannerFormat(slug).material,
        banner_type: STOCK_BANNER_DEFAULTS.bannerType,
        want_wind_holes: stockBannerFormat(slug).material === "mesh" ? false : STOCK_BANNER_DEFAULTS.wantWindHoles,
        want_hem_and_grommets: true,
        designOption: "upload",
    };
}

// ---------------------------------------------------------------------------
// Canvas  (?w ?h ?type=none|framed ?framedSize ?framedShape ?orient)
// ---------------------------------------------------------------------------
export type CanvasOrientation = "portrait" | "landscape" | "square";

export function canvasInitialState(
    sp: ParamSource,
    initW?: number,
    initH?: number
): { input: PriceInputCanvas; orientation: CanvasOrientation } {
    const paramW = sp.get("w") ? parseInt(sp.get("w")!) : null;
    const paramH = sp.get("h") ? parseInt(sp.get("h")!) : null;
    const paramType = sp.get("type");

    const startW = paramW || initW || 40;
    const startH = paramH || initH || 60;

    let orientation: CanvasOrientation = "portrait";
    let framedShape: "rectangle" | "square" = "rectangle";
    let framedSize = "30x40";

    const sizeKey = `${Math.min(startW, startH)}x${Math.max(startW, startH)}`;

    if (startW === startH) {
        orientation = "square";
        framedShape = "square";
        framedSize = sizeKey in CANVAS_CONSTANTS.FRAMED_PRICES_SQUARE ? sizeKey : "40x40";
    } else {
        if (startW > startH) orientation = "landscape";
        if (sizeKey in CANVAS_CONSTANTS.FRAMED_PRICES_RECTANGLE) framedSize = sizeKey;
    }

    const input: PriceInputCanvas = {
        width_cm: startW,
        height_cm: startH,
        quantity: configuratorInitialQuantity(sp),
        edge_type: "mirror",
        designOption: "upload",
        frameType: paramType === "none" ? "none" : "framed",
        framedSize,
        framedShape,
    };

    // Ce aplică efectul de la montare din CanvasConfigurator (aceiași parametri din URL)
    const o = canvasParamOverrides(sp);
    return {
        input: { ...input, ...o.input },
        orientation: o.orientation ?? orientation,
    };
}

export function canvasParamOverrides(sp: ParamSource): {
    input: Partial<PriceInputCanvas>;
    orientation?: CanvasOrientation;
} {
    const input: Partial<PriceInputCanvas> = {};
    const paramW = sp.get("w");
    const paramH = sp.get("h");
    if (paramW && paramH) {
        const w = parseInt(paramW);
        const h = parseInt(paramH);
        if (!isNaN(w) && !isNaN(h)) {
            input.width_cm = w;
            input.height_cm = h;
        }
    }
    const paramType = sp.get("type");
    if (paramType) input.frameType = paramType as PriceInputCanvas["frameType"];
    const paramSize = sp.get("framedSize");
    if (paramSize) input.framedSize = paramSize;
    const paramShape = sp.get("framedShape");
    if (paramShape) input.framedShape = paramShape as PriceInputCanvas["framedShape"];
    const paramOrient = sp.get("orient");
    return {
        input,
        orientation: paramOrient ? (paramOrient as CanvasOrientation) : undefined,
    };
}

// ---------------------------------------------------------------------------
// Roll-up  (?w=85|100|120|150 — prin ConfiguratorDispatcher)
// ---------------------------------------------------------------------------
export function rollupInitialInput(initW?: number, sp?: ParamSource): PriceInputRollup {
    return { width_cm: initW ?? 85, quantity: sp ? intParam(sp, "q") ?? 1 : 1, designOption: "upload" };
}

// ---------------------------------------------------------------------------
// Autocolante  (?w ?h prin dispatcher, ?q ?mat=3641|transparent|621|970 ?lam=1 ?cut=0)
// ---------------------------------------------------------------------------
/** Piesele de până la 10×10 cm se comandă de la 50 buc. */
export function autocolanteMinQty(widthCm: number, heightCm: number): number {
    if (widthCm > 0 && heightCm > 0 && widthCm <= 10 && heightCm <= 10) return 50;
    return 1;
}

const AUTOCOLANT_MATERIAL_PARAM: Record<string, AutocolantesMaterialKey> = {
    "3641": "oracal_3641",
    transparent: "oracal_transparent",
    "621": "oracal_621",
    "970": "oracal_970",
};

export function autocolanteInitialInput(
    sp: ParamSource,
    initW?: number,
    initH?: number
): PriceInputAutocolante {
    const width_cm = initW ?? 10;
    const height_cm = initH ?? 10;
    const q = intParam(sp, "q") ?? 1;
    const matParam = sp.get("mat");
    const material =
        (matParam && AUTOCOLANT_MATERIAL_PARAM[matParam]) ||
        (AUTOCOLANTE_CONSTANTS.MATERIALS.some((m) => m.key === matParam) ? (matParam as AutocolantesMaterialKey) : "oracal_3641");
    return {
        width_cm,
        height_cm,
        quantity: Math.max(autocolanteMinQty(width_cm, height_cm), q),
        material,
        print_type: sp.get("cut") === "0" ? "print_only" : "print_cut",
        laminated: sp.get("lam") === "1",
        transfer_film: false,
        designOption: "upload",
    };
}

// ---------------------------------------------------------------------------
// PVC forex / Alucobond  (?w ?h prin dispatcher, ?t=grosime mm, ?q)
// ---------------------------------------------------------------------------
export function pvcForexInitialInput(sp: ParamSource, initW?: number, initH?: number): PriceInputPVCForex {
    const t = intParam(sp, "t");
    return {
        width_cm: initW ?? 100,
        height_cm: initH ?? 50,
        quantity: intParam(sp, "q") ?? 1,
        thickness_mm: t && PVC_FOREX_CONSTANTS.AVAILABLE_THICKNESS.includes(t) ? t : 3,
        designOption: "upload",
    };
}

export function alucobondInitialInput(sp: ParamSource, initW?: number, initH?: number): PriceInputAlucobond {
    const t = intParam(sp, "t");
    return {
        width_cm: initW ?? 100,
        height_cm: initH ?? 50,
        quantity: intParam(sp, "q") ?? 1,
        thickness_mm: t && ALUCOBOND_CONSTANTS.AVAILABLE_THICKNESS.includes(t) ? t : 3,
        color: "Alb",
        designOption: "upload",
    };
}

// ---------------------------------------------------------------------------
// Afișe  (?size=A3|A2|A1|A0|S5|S7 ?mat=<cheie material> ?q)
// ---------------------------------------------------------------------------
export const AFISE_DEFAULT_MATERIAL = "whiteback_150_material";

export function isAfiseMaterialVisibleForSize(mKey: string, sKey: string): boolean {
    if (mKey.startsWith("paper_")) return true;
    const matTable = AFISE_CONSTANTS.PRICE_TABLE[mKey];
    return !!(matTable && matTable[sKey]);
}

export function afiseInitialState(sp: ParamSource): { size: string; material: string; quantity: number } {
    const sizeParam = sp.get("size");
    const size = sizeParam && AFISE_CONSTANTS.SIZES.some((s) => s.key === sizeParam) ? sizeParam : "A2";
    const matParam = sp.get("mat");
    let material =
        matParam && AFISE_CONSTANTS.MATERIALS.some((m) => m.key === matParam) ? matParam : AFISE_DEFAULT_MATERIAL;
    // Același lucru îl face efectul din configurator când materialul nu există pe format
    if (!isAfiseMaterialVisibleForSize(material, size)) material = AFISE_DEFAULT_MATERIAL;
    return { size, material, quantity: intParam(sp, "q") ?? 50 };
}

// ---------------------------------------------------------------------------
// Flyere  (?size=A6|A5|21x10 ?q ?fv=1 ?g=135|250)
// ---------------------------------------------------------------------------
export const FLYER_MIN_QTY = 100;

export function flyerInitialState(sp: ParamSource): {
    sizeKey: string;
    quantity: number;
    twoSided: boolean;
    paperWeightKey: string;
} {
    const sizeParam = sp.get("size");
    const g = sp.get("g");
    return {
        sizeKey:
            sizeParam && FLYER_CONSTANTS.SIZES.some((s) => s.key === sizeParam) ? sizeParam : FLYER_CONSTANTS.SIZES[0].key,
        quantity: Math.max(FLYER_MIN_QTY, intParam(sp, "q") ?? 100),
        twoSided: sp.get("fv") === "1",
        paperWeightKey:
            g && FLYER_CONSTANTS.PAPER_WEIGHTS.some((p) => p.key === g) ? g : FLYER_CONSTANTS.PAPER_WEIGHTS[0].key,
    };
}

// ---------------------------------------------------------------------------
// Pliante  (?g=115..250 ?q ?fold=simplu|fereastra|paralel|fluture)
// ---------------------------------------------------------------------------
export const PLIANTE_MIN_QTY = 30;

export function plianteInitialState(sp: ParamSource): {
    weight: PlianteWeightKey;
    quantity: number;
    fold: PlianteFoldType;
} {
    const g = sp.get("g");
    const fold = sp.get("fold");
    return {
        weight: g && g in PLIANTE_CONSTANTS.PRICE_TABLE ? (g as PlianteWeightKey) : "115",
        quantity: Math.max(PLIANTE_MIN_QTY, intParam(sp, "q") ?? 30),
        fold: fold && fold in PLIANTE_CONSTANTS.FOLDS ? (fold as PlianteFoldType) : "simplu",
    };
}

// ---------------------------------------------------------------------------
// Cărți de vizită  (?q ?fv=0 ?type=standard|plastic|transparente|lemn|metalice ?size=card_bancar)
// ---------------------------------------------------------------------------
export const CARTI_VIZITA_MIN_QTY = 100;
const CARTI_VIZITA_TYPES = ["standard", "plastic", "transparente", "lemn", "metalice"] as const;

export type CartiVizitaInput = {
    type: (typeof CARTI_VIZITA_TYPES)[number];
    size: "standard" | "card_bancar";
    quantity: number;
    twoSided: boolean;
    roundedCorners: boolean;
    specialShape: boolean;
    designOption: "upload" | "pro" | "ai_generate";
};

export function cartiVizitaInitialInput(sp: ParamSource): CartiVizitaInput {
    const type = sp.get("type");
    return {
        type: (CARTI_VIZITA_TYPES as readonly string[]).includes(type || "")
            ? (type as CartiVizitaInput["type"])
            : "standard",
        size: sp.get("size") === "card_bancar" ? "card_bancar" : "standard",
        quantity: Math.max(CARTI_VIZITA_MIN_QTY, intParam(sp, "q") ?? 100),
        twoSided: sp.get("fv") !== "0",
        roundedCorners: false,
        specialShape: false,
        designOption: "upload",
    };
}

/** Intrarea pentru calculateBusinessCardPrice, la fel ca în configurator (input-ul e trimis direct). */
export function cartiVizitaPriceInput(input: CartiVizitaInput): PriceInputBusinessCard {
    return input;
}

// ---------------------------------------------------------------------------
// Fonduri europene / PNRR  (?placaPermanenta=80x50 ?panouTemporar=200x150 ?afisInformativ=A3 ...)
// ---------------------------------------------------------------------------
export const FONDURI_DEFAULT_SELECTIONS: Record<string, string> = {
    comunicat: "none",
    bannerSite: "none",
    afisInformativ: "none",
    autoMici: "none",
    autoMari: "none",
    panouTemporar: "none",
    placaPermanenta: "none",
};

export function fonduriInitialSelections(sp: ParamSource, isRegio = false): Record<string, string> {
    const groups = getFonduriEUGroups(isRegio) as Record<string, { options: { id: string }[] }>;
    const out = { ...FONDURI_DEFAULT_SELECTIONS };
    for (const key of Object.keys(out)) {
        const v = sp.get(key);
        if (v && groups[key]?.options.some((o) => o.id === v)) out[key] = v;
    }
    return out;
}

// ---------------------------------------------------------------------------
// Tapet / Window graphics  (?w ?h prin dispatcher)
// ---------------------------------------------------------------------------
export function tapetInitialInput(initW?: number, initH?: number, sp?: ParamSource): PriceInputTapet {
    return { width_cm: initW ?? 300, height_cm: initH ?? 250, quantity: configuratorInitialQuantity(sp), want_adhesive: false, designOption: "upload" };
}

export function windowGraphicsInitialInput(initW?: number, initH?: number, sp?: ParamSource): PriceInputWindowGraphics {
    return {
        width_cm: initW ?? 100,
        height_cm: initH ?? 100,
        quantity: configuratorInitialQuantity(sp),
        designOption: "upload",
        print_type: "print_cut",
        laminated: false,
    };
}
