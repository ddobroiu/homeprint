// lib/ai-configurators.ts
//
// Ce stie chatul AI de pe site: DOAR configuratoarele.
//  - configuratorIndex(): lista scurta a tuturor configuratoarelor (din ALL_CONFIGURATORS + canvasurile
//    sezoniere), pusa in promptul de sistem;
//  - listConfiguratorOptions(): optiunile valide ale unui configurator (unealta list_configurator_options);
//  - quoteConfigurator(): pretul exact (unealta get_quote).
//
// Pretul vine din aceeasi cale ca pagina: quickPrintQuote (calculatorul rapid de pe homepage) construieste
// adresa configuratorului cu dimensiunile/cantitatea, optiunile se adauga ca parametri pe care pagina ii
// citeste (lib/quickPrintPresets.ts), iar pretul e landingPriceFromUrl(adresa) = pretul pe care il arata
// pagina deschisa la acel link. Exceptie: optiunile de plexiglas pe care pagina nu le citeste din adresa
// (material transparent, grosime, print fata-verso) se calculeaza cu calculatePlexiglassPrice, ca in
// configurator, si se marcheaza ca alegeri de facut in pagina.

import { ALL_CONFIGURATORS } from "./configurators-registry";
import { landingPriceFromUrl } from "./merchant/landingPrice";
import { quickPrintQuote } from "./quickPrintQuote";
import { QUICK_PRINT_PRODUCTS, quickPrintDefaultFormat } from "./quickPrintProducts";
import { configuratorInitialQuantity, dispatcherInitialDims, isAfiseMaterialVisibleForSize } from "./quickPrintPresets";
import {
    AFISE_CONSTANTS,
    ALUCOBOND_CONSTANTS,
    AUTOCOLANTE_CONSTANTS,
    CANVAS_CONSTANTS,
    CANVAS_MARTISOR_CONSTANTS,
    FLYER_CONSTANTS,
    PLEXIGLASS_CONSTANTS,
    PLIANTE_CONSTANTS,
    PVC_FOREX_CONSTANTS,
    getFonduriEUGroups,
    calculatePlexiglassPrice,
} from "./pricing";

type OptValue = { value: string; label: string; param?: string };
type OptDef = { key: string; label: string; param: string; values: OptValue[] };

const yesNo = (key: string, label: string, param: string, onParam: string, defaultYes = false): OptDef => ({
    key,
    label,
    param,
    values: defaultYes
        ? [{ value: "da", label: "da (implicit)" }, { value: "nu", label: "nu", param: onParam }]
        : [{ value: "nu", label: "nu (implicit)" }, { value: "da", label: "da", param: onParam }],
});

const thickness = (list: number[], def = 3): OptDef => ({
    key: "grosime_mm",
    label: "Grosime (mm)",
    param: "t",
    values: [def, ...list.filter((t) => t !== def)].map((t) => ({ value: String(t), label: `${t} mm`, param: t === def ? undefined : String(t) })),
});

const AFISE_DEFAULT = "whiteback_150_material";
const afiseMaterials = [...AFISE_CONSTANTS.MATERIALS].sort((a, b) => (a.key === AFISE_DEFAULT ? -1 : b.key === AFISE_DEFAULT ? 1 : 0));

/** Optiunile configuratoarelor (prima valoare = implicita, fara parametru). */
const ALL_OPTIONS: Record<string, OptDef[]> = {
    banner: [
        { key: "material", label: "Material", param: "mat", values: [{ value: "frontlit_440", label: "Frontlit 440 g/mp (implicit)" }, { value: "frontlit_510", label: "Frontlit 510 g/mp", param: "510" }] },
        yesNo("gauri_vant", "Găuri pentru vânt", "wind", "1"),
        yesNo("tiv_capse", "Tiv și capse", "hem", "0", true),
    ],
    mesh: [yesNo("tiv_capse", "Tiv și capse", "hem", "0", true)],
    "banner-verso": [yesNo("gauri_vant", "Găuri pentru vânt", "wind", "1"), yesNo("aceeasi_grafica", "Aceeași grafică pe ambele fețe", "same", "0", true)],
    autocolante: [
        { key: "material", label: "Folie", param: "mat", values: AUTOCOLANTE_CONSTANTS.MATERIALS.map((m, i) => ({ value: m.key, label: m.label + (i === 0 ? " (implicit)" : ""), param: i === 0 ? undefined : m.key })) },
        yesNo("laminare", "Laminare", "lam", "1"),
        yesNo("decupare", "Print + decupare pe contur", "cut", "0", true),
    ],
    canvas: [{ key: "sasiu", label: "Montaj", param: "type", values: [{ value: "cu_sasiu", label: "pe șasiu de lemn (implicit; formate fixe, fără ramă decorativă)" }, { value: "fara_sasiu", label: "doar pânza printată, fără șasiu (orice dimensiune)", param: "none" }] }],
    afise: [{ key: "material", label: "Hârtie / material", param: "mat", values: afiseMaterials.map((m) => ({ value: m.key, label: `${m.label} (${m.description})${m.key === AFISE_DEFAULT ? " (implicit)" : ""}`, param: m.key === AFISE_DEFAULT ? undefined : m.key })) }],
    flayere: [
        yesNo("fata_verso", "Print față-verso", "fv", "1"),
        { key: "hartie", label: "Hârtie", param: "g", values: FLYER_CONSTANTS.PAPER_WEIGHTS.map((p, i) => ({ value: p.key, label: p.label, param: i === 0 ? undefined : p.key })) },
    ],
    pliante: [
        { key: "hartie_g", label: "Gramaj hârtie (g/mp)", param: "g", values: Object.keys(PLIANTE_CONSTANTS.PRICE_TABLE).map((g) => ({ value: g, label: `${g} g/mp`, param: g === "115" ? undefined : g })).sort((a) => (a.value === "115" ? -1 : 0)) },
        { key: "pliere", label: "Pliere (A4 deschis)", param: "fold", values: Object.entries(PLIANTE_CONSTANTS.FOLDS).map(([k, f]) => ({ value: k, label: `${f.label}, închis ${f.closed}`, param: k === "simplu" ? undefined : k })) },
    ],
    "carti-vizita": [
        { key: "tip", label: "Tip", param: "type", values: [{ value: "standard", label: "Carton standard (implicit)" }, ...["plastic", "lemn", "metalice"].map((t) => ({ value: t, label: t, param: t }))] },
        yesNo("fata_verso", "Print față-verso", "fv", "0", true),
    ],
    "pvc-forex": [thickness(PVC_FOREX_CONSTANTS.AVAILABLE_THICKNESS)],
    alucobond: [thickness(ALUCOBOND_CONSTANTS.AVAILABLE_THICKNESS)],
};

/**
 * Pe acest site, configuratoarele citesc din adresă doar dimensiunile / formatul și cantitatea; din
 * opțiuni, doar bannerul (mat, wind, hem), bannerul față-verso (wind, same) și canvasul (type).
 * Restul opțiunilor (hârtie, folie, laminare, grosime, față-verso...) se aleg în pagină: chatul le
 * arată, dar prețul îl dă pe configurația implicită (aceeași pe care o deschide linkul).
 */
const URL_OPTIONS = new Set(["banner", "mesh", "banner-verso", "canvas"]);
const OPTIONS: Record<string, OptDef[]> = Object.fromEntries(Object.entries(ALL_OPTIONS).filter(([k]) => URL_OPTIONS.has(k)));
const PAGE_ONLY: Record<string, OptDef[]> = Object.fromEntries(Object.entries(ALL_OPTIONS).filter(([k]) => !URL_OPTIONS.has(k)));
/** Cantitatea cu care pornește pagina când linkul cere mai puțin (configuratorul o urcă la minim). */
const PAGE_MIN_QTY: Record<string, number> = { afise: 50 };

/** Plexiglas: alegeri facute in pagina (nu sunt in adresa), pretuite cu functia configuratorului. */
const PLEXI_EXTRA: OptDef[] = [
    { key: "material", label: "Plexiglas", param: "", values: [{ value: "alb", label: "alb (implicit)" }, { value: "transparent", label: "transparent" }] },
    { key: "grosime_mm", label: `Grosime (mm): alb ${PLEXIGLASS_CONSTANTS.THICKNESS.ALB.join("/")}, transparent ${PLEXIGLASS_CONSTANTS.THICKNESS.TRANSPARENT.join("/")}`, param: "", values: [...new Set([...PLEXIGLASS_CONSTANTS.THICKNESS.ALB, ...PLEXIGLASS_CONSTANTS.THICKNESS.TRANSPARENT])].sort((a, b) => (a === 3 ? -1 : b === 3 ? 1 : a - b)).map((t) => ({ value: String(t), label: `${t} mm` })) },
    { key: "fata_verso", label: "Print față-verso (doar transparent)", param: "", values: [{ value: "nu", label: "nu (implicit)" }, { value: "da", label: "da" }] },
];

const SEASONAL = [
    { id: "canvas-martisor", name: "Canvas de Mărțișor", url: "/configurator/canvas-martisor", description: "Canvas cu grafică de 1 Martie, formate fixe." },
    { id: "canvas-8-martie", name: "Canvas de 8 Martie", url: "/configurator/canvas-8-martie", description: "Canvas cu grafică de 8 Martie, formate fixe." },
];

const CANVAS_FRAMED_KEYS = [...Object.keys(CANVAS_CONSTANTS.FRAMED_PRICES_RECTANGLE), ...Object.keys(CANVAS_CONSTANTS.FRAMED_PRICES_SQUARE)];

function fonduriGroups() {
    return getFonduriEUGroups(false) as Record<string, { title: string; options: { id: string; label: string }[] }>;
}

export const AI_CONFIGURATOR_IDS: string[] = [...ALL_CONFIGURATORS.map((c) => c.id), ...SEASONAL.map((s) => s.id)];

function entry(id: string) {
    const reg = ALL_CONFIGURATORS.find((c) => c.id === id);
    if (reg) return { id, name: reg.name, url: reg.url, description: reg.description, reg };
    const s = SEASONAL.find((x) => x.id === id);
    return s ? { ...s, reg: undefined } : null;
}

function firstSentence(s: string, max = 40) {
    const one = (s || "").split(/(?<=\.)\s/)[0].replace(/\.$/, "");
    return one.length > max ? one.slice(0, max - 1).trimEnd() + "…" : one;
}

/** Cum se cere pretul (ce intrari asteapta get_quote) — scurt, pentru index si pentru list_configurator_options. */
function quoteInputs(id: string): string {
    const qp = QUICK_PRINT_PRODUCTS.find((p) => p.id === id);
    if (id === "semnalistica") return "fără preț în chat: modelul se alege în configurator";
    if (id === "fonduri-eu") return "elemente de kit (options)";
    if (SEASONAL.some((s) => s.id === id)) return `size ${CANVAS_MARTISOR_CONSTANTS.SIZES.map((s) => s.key).join("/")}, cantitate`;
    if (id === "canvas") return "lățime×înălțime cm (pe șasiu doar formatele fixe), cantitate";
    if (id === "rollup") return "lățime 85/100/120/150 cm × 200, cantitate";
    if (id === "afise") return `size ${AFISE_CONSTANTS.SIZES.map((s) => s.key).join("/")}, cantitate`;
    if (id === "flayere") return `size ${FLYER_CONSTANTS.SIZES.map((s) => s.key).join("/")}, cantitate ≥100`;
    if (id === "pliante") return "A4, cantitate ≥30";
    if (id === "carti-vizita") return "9×5 cm, cantitate ≥100";
    if (qp?.mode === "quantity") return "cantitate (model implicit)";
    return DEFAULT_INPUTS;
}

const DEFAULT_INPUTS = "lățime×înălțime cm, cantitate";

/** Indexul compact al configuratoarelor pentru promptul de sistem (stabil, fara date din cerere). */
export function configuratorIndex(baseUrl: string): string {
    const lines = AI_CONFIGURATOR_IDS.map((id) => {
        const e = entry(id)!;
        const opts = id === "plexiglass" ? PLEXI_EXTRA : id === "fonduri-eu" ? [] : OPTIONS[id] ?? [];
        const o = opts.length ? `; opțiuni: ${opts.map((x) => x.key).join(", ")}` : "";
        const q = quoteInputs(id);
        return `- ${id} | ${e.name} | ${e.url} | ${firstSentence(e.description)}${q === DEFAULT_INPUTS ? "" : ` | preț: ${q}`}${o}`;
    });
    return `(linkuri relative la ${baseUrl}; pentru preț implicit: ${DEFAULT_INPUTS})\n` + lines.join("\n");
}

function limitsOf(id: string) {
    const d = ALL_CONFIGURATORS.find((c) => c.id === id)?.dimensions;
    if (!d || d.minWidth === undefined) return undefined;
    return { latime_cm: `${d.minWidth}-${d.maxWidth}`, inaltime_cm: `${d.minHeight}-${d.maxHeight}` };
}

export function listConfiguratorOptions(id: string, baseUrl: string) {
    const e = entry(String(id || "").trim());
    if (!e) return { error: `Configurator necunoscut. Valori valide: ${AI_CONFIGURATOR_IDS.join(", ")}` };
    const qp = QUICK_PRINT_PRODUCTS.find((p) => p.id === e.id);
    const out: Record<string, unknown> = {
        configurator: e.id,
        name: e.name,
        url: baseUrl + e.url,
        description: e.description,
        price_inputs: quoteInputs(e.id),
    };
    if (qp?.note) out.included_by_default = qp.note;
    const lim = e.id === "canvas" ? limitsOf("canvas") : qp?.mode ? undefined : limitsOf(e.id);
    if (lim && e.id !== "rollup") out.dimension_limits = lim;
    if (qp?.minQuantity) out.min_quantity = qp.minQuantity;
    if (e.id === "autocolante") out.min_quantity = "50 buc pentru piese de cel mult 10×10 cm, altfel 1";
    if (e.id === "canvas") out.framed_sizes_cm = CANVAS_FRAMED_KEYS;
    if (e.id === "afise") out.sizes = AFISE_CONSTANTS.SIZES.map((s) => `${s.key} (${s.dims})`);
    if (e.id === "flayere") out.sizes = FLYER_CONSTANTS.SIZES.map((s) => `${s.key} (${s.dims})`);
    if (SEASONAL.some((s) => s.id === e.id)) out.sizes = CANVAS_MARTISOR_CONSTANTS.SIZES.map((s) => s.key);
    if (PAGE_ONLY[e.id]) out.choose_in_configurator = Object.fromEntries(PAGE_ONLY[e.id].map((o) => [o.key, { label: o.label, values: o.values.map((v) => v.label.replace(" (implicit)", "")) }]));
    if (PAGE_MIN_QTY[e.id]) out.min_quantity = PAGE_MIN_QTY[e.id];
    const opts = e.id === "plexiglass" ? PLEXI_EXTRA : OPTIONS[e.id];
    if (opts) out.options = Object.fromEntries(opts.map((o) => [o.key, { label: o.label, values: o.values.map((v) => `${v.value} = ${v.label}`) }]));
    if (e.id === "fonduri-eu") {
        out.options = Object.fromEntries(Object.entries(fonduriGroups()).map(([k, g]) => [k, { label: g.title, values: g.options.map((o) => `${o.id} = ${o.label}`) }]));
        out.note = "Fiecare element al kitului e o opțiune; trimite în options doar elementele dorite.";
    }
    if (e.reg?.materials?.length) out.materials = e.reg.materials.map((m) => m.name);
    if (e.reg?.turnaroundTime) out.production_time = e.reg.turnaroundTime;
    if (["tricouri", "hanorace", "sepci"].includes(e.id)) out.note = "Modelul, mărimea, culoarea și poziția printului se aleg în configurator; prețul din chat e pentru configurația implicită.";
    return out;
}

/** Configuratoarele cu dimensiuni libere in cm (restul: format, cantitate sau kit). */
function dimensional(id: string) {
    return !["fonduri-eu", "tricouri", "hanorace", "sepci", "carti-vizita", "pliante", "afise", "flayere", ...SEASONAL.map((s) => s.id)].includes(id);
}

export type QuoteArgs = {
    configurator?: unknown;
    width_cm?: unknown;
    height_cm?: unknown;
    quantity?: unknown;
    size?: unknown;
    options?: unknown;
};

/** Sinonime frecvente din partea modelului: true/1/cu/pe_sasiu = da; false/0/fara/none = nu. */
function aliasOf(v: string) {
    const t = v.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/\s*mm$/, "").trim().replace(/[\s-]+/g, "_");
    if (["da", "true", "1", "yes", "cu", "cu_sasiu", "pe_sasiu", "sasiu", "framed"].includes(t)) return "da";
    if (["nu", "false", "0", "no", "fara", "fara_sasiu", "none", "frameless"].includes(t)) return "nu";
    return t;
}

const num = (v: unknown) => (v === undefined || v === null || v === "" ? undefined : Number(String(v).replace(",", ".")));
const optStr = (v: unknown) => (typeof v === "boolean" ? (v ? "da" : "nu") : String(v ?? "").trim().toLowerCase());
const money = (n: number) => Math.round(n * 100) / 100;

export function quoteConfigurator(args: QuoteArgs, baseUrl: string) {
    const id = String(args.configurator ?? "").trim();
    const e = entry(id);
    if (!e) return { error: `Configurator necunoscut. Valori valide: ${AI_CONFIGURATOR_IDS.join(", ")}` };
    const link = baseUrl + e.url;
    const fail = (error: string) => ({ error, configurator_url: link });
    if (id === "semnalistica") return fail("Semnalistica se configurează pe model: alege modelul și materialul în configurator, prețul apare acolo.");

    const w = num(args.width_cm);
    const h = num(args.height_cm);
    let q = num(args.quantity);
    const size = args.size === undefined || args.size === null ? "" : String(args.size).trim();
    const rawOpts = args.options && typeof args.options === "object" && !Array.isArray(args.options) ? (args.options as Record<string, unknown>) : {};
    if (q !== undefined && (!Number.isInteger(q) || q < 1 || q > 100000)) return fail("Cantitatea trebuie să fie un număr întreg între 1 și 100.000.");

    // ---- optiuni ----
    const params = new URLSearchParams();
    const chosen: Record<string, string> = {};
    const pageChoices: Record<string, string> = {};
    let minNote: string | undefined;
    if (q !== undefined && PAGE_MIN_QTY[id] && q < PAGE_MIN_QTY[id]) {
        minNote = `Se comandă de la ${PAGE_MIN_QTY[id]} buc; prețul e pentru ${PAGE_MIN_QTY[id]} buc (cantitatea minimă din configurator).`;
        q = PAGE_MIN_QTY[id];
    }
    if (id === "fonduri-eu") {
        const groups = fonduriGroups();
        for (const [k, v] of Object.entries(rawOpts)) {
            const g = groups[k];
            const val = String(v ?? "").trim();
            if (!g) return fail(`Element de kit necunoscut "${k}". Valide: ${Object.keys(groups).join(", ")}`);
            if (!g.options.some((o) => o.id === val)) return fail(`Valoare invalidă pentru ${k}. Valide: ${g.options.map((o) => o.id).join(", ")}`);
            if (val !== "none") { params.set(k, val); chosen[g.title] = g.options.find((o) => o.id === val)!.label; }
        }
        if (![...params.keys()].length) return fail("Spune ce elemente vrei în kit (ex. afisInformativ, placaPermanenta, panouTemporar). Folosește list_configurator_options pentru variante.");
    } else {
        const defs = id === "plexiglass" ? PLEXI_EXTRA : OPTIONS[id] ?? [];
        for (const [k, v] of Object.entries(rawOpts)) {
            const pageDef = PAGE_ONLY[id]?.find((d) => d.key === k);
            if (pageDef) {
                pageChoices[pageDef.label] = optStr(v);
                continue;
            }
            const def = defs.find((d) => d.key === k);
            if (!def) return fail(defs.length ? `Opțiune necunoscută "${k}". Valide: ${defs.map((d) => d.key).join(", ")}` : "Acest configurator nu are opțiuni de preț în chat; restul se aleg în pagină.");
            const val = optStr(v);
            const hit = def.values.find((x) => x.value.toLowerCase() === val) ?? def.values.find((x) => aliasOf(x.value) === aliasOf(val));
            if (!hit) return fail(`Valoare invalidă pentru ${k}. Valide: ${def.values.map((x) => x.value).join(", ")}`);
            chosen[def.label] = hit.label.replace(" (implicit)", "");
            if (hit.param && def.param) params.set(def.param, hit.param);
        }
    }

    // ---- href de baza (validarea calculatorului rapid) ----
    let href: string;
    let note: string | undefined = QUICK_PRINT_PRODUCTS.find((p) => p.id === id)?.note;
    if (SEASONAL.some((s) => s.id === id)) {
        if (!CANVAS_MARTISOR_CONSTANTS.SIZES.some((s) => s.key === size)) return fail(`Alege formatul: ${CANVAS_MARTISOR_CONSTANTS.SIZES.map((s) => s.key).join(" sau ")}.`);
        href = `${e.url}?size=${size}&q=${q ?? 1}`;
        note = undefined;
    } else if (id === "canvas" && params.get("type") === "none") {
        const lim = ALL_CONFIGURATORS.find((c) => c.id === "canvas")!.dimensions;
        if (w === undefined || h === undefined) return fail("Spune lățimea și înălțimea în cm.");
        if (!Number.isInteger(w) || !Number.isInteger(h)) return fail("Introdu dimensiunile în centimetri întregi.");
        if (w < lim.minWidth! || w > lim.maxWidth! || h < lim.minHeight! || h > lim.maxHeight!) return fail(`Canvas fără șasiu: lățime ${lim.minWidth}-${lim.maxWidth} cm, înălțime ${lim.minHeight}-${lim.maxHeight} cm.`);
        href = `/configurator/canvas?w=${w}&h=${h}&q=${q ?? 1}`;
        note = "Pânză canvas printată, fără șasiu";
    } else {
        const qp = QUICK_PRINT_PRODUCTS.find((p) => p.id === id);
        if (!qp) return fail("Pentru acest produs prețul se calculează în configurator.");
        let format: string | undefined;
        let width = w ?? qp.width;
        let height = h ?? qp.height;
        if (id === "canvas") {
            if (w === undefined || h === undefined) {
                if (!size) return fail(`Spune dimensiunea. Pe șasiu avem formatele: ${CANVAS_FRAMED_KEYS.join(", ")} cm; orice altă dimensiune doar fără șasiu.`);
            }
            const [a, b] = size ? size.toLowerCase().split("x").map(Number) : [w!, h!];
            format = `${Math.min(a, b)}x${Math.max(a, b)}`;
            if (!CANVAS_FRAMED_KEYS.includes(format)) return fail(`Pe șasiu avem doar formatele: ${CANVAS_FRAMED_KEYS.join(", ")} cm. Pentru ${a}×${b} cm se poate canvas fără șasiu (options.sasiu = fara_sasiu).`);
            width = a; height = b;
        } else if (id === "afise" || id === "flayere") {
            const keys = (id === "afise" ? AFISE_CONSTANTS.SIZES : FLYER_CONSTANTS.SIZES).map((s) => s.key);
            format = size || quickPrintDefaultFormat(qp);
            if (!keys.includes(format!)) return fail(`Formate valide: ${keys.join(", ")}.`);
            if (id === "afise" && params.get("mat") && !isAfiseMaterialVisibleForSize(params.get("mat")!, format!)) return fail(`Materialul ales nu există pe formatul ${format}.`);
        } else if (id === "fonduri-eu") {
            const [k, v] = [...params.entries()][0];
            format = `${k}:${v}`;
            width = qp.width; height = qp.height;
        } else if (qp.mode === "quantity") {
            width = qp.width; height = qp.height;
        } else if (id === "rollup") {
            height = h ?? 200;
            if (w === undefined) return fail("Alege lățimea roll-up-ului: 85, 100, 120 sau 150 cm (înălțime 200 cm).");
        } else if (w === undefined || h === undefined) {
            return fail("Spune lățimea și înălțimea în cm.");
        }
        const base = quickPrintQuote({ product: id, width, height, quantity: q ?? (id === "fonduri-eu" ? 1 : qp.quantity), format });
        if ("error" in base) return fail(base.error);
        href = base.href;
        if (id === "canvas") {
            // pastreaza orientarea ceruta (pretul pe sasiu depinde doar de format)
            const u = new URL(href, "https://x");
            u.searchParams.set("w", String(width)); u.searchParams.set("h", String(height));
            if (width === height) u.searchParams.set("framedShape", "square");
            href = u.pathname + "?" + u.searchParams.toString();
        }
    }

    // ---- adauga optiunile din adresa si pretuieste ca pagina ----
    const u = new URL(href, "https://x");
    const pageOnly = id === "canvas" ? ["type"] : [];
    for (const [k, v] of params) if (!pageOnly.includes(k)) u.searchParams.set(k, v);
    if (id === "canvas" && params.get("type") === "none") u.searchParams.set("type", "none");
    if (!dimensional(id)) { u.searchParams.delete("w"); u.searchParams.delete("h"); }
    href = u.pathname + "?" + u.searchParams.toString();
    const landing = landingPriceFromUrl(href);
    if (!landing || !Number.isFinite(landing.price) || landing.price <= 0) return fail("Această configurație nu are un preț disponibil în chat. Verifică opțiunile în configurator.");
    let total = landing.price;
    const quantity = configuratorInitialQuantity(u.searchParams) || 1;
    let toSelect: Record<string, string> | undefined;

    if (id === "plexiglass" && Object.keys(rawOpts).length) {
        const mat = optStr(rawOpts.material ?? "alb") as "alb" | "transparent";
        const t = Number(optStr(rawOpts.grosime_mm ?? "3"));
        const dbl = optStr(rawOpts.fata_verso ?? "nu") === "da";
        const allowed = mat === "alb" ? PLEXIGLASS_CONSTANTS.THICKNESS.ALB : PLEXIGLASS_CONSTANTS.THICKNESS.TRANSPARENT;
        if (!allowed.includes(t)) return fail(`Plexiglas ${mat}: grosimi ${allowed.join("/")} mm.`);
        if (dbl && mat !== "transparent") return fail("Printul față-verso există doar la plexiglasul transparent.");
        const dims = dispatcherInitialDims(u.searchParams);
        total = calculatePlexiglassPrice({
            width_cm: dims.initialWidth ?? 50, height_cm: dims.initialHeight ?? 50, quantity, material: mat,
            thickness_mm: t, print_double: dbl, designOption: "upload", standoffs: null,
        }).finalPrice;
        if (!Number.isFinite(total) || total <= 0) return fail("Această configurație nu are un preț disponibil în chat.");
        toSelect = chosen;
    }

    const dims = dimensional(id) ? `${u.searchParams.get("w")}×${u.searchParams.get("h") ?? "200"} cm` : undefined;
    return {
        configurator: id,
        name: e.name,
        ...(dims && { dimensions: dims }),
        ...(u.searchParams.get("size") && { size: u.searchParams.get("size") }),
        quantity: id === "fonduri-eu" ? 1 : quantity,
        options: toSelect ? undefined : chosen,
        total_lei: money(total),
        unit_lei: money(total / (id === "fonduri-eu" ? 1 : quantity)),
        ...(!Object.keys(chosen).length && note && { default_configuration: note }),
        url: baseUrl + href,
        ...(toSelect && { select_in_configurator: toSelect, url_note: "Linkul precompletează dimensiunile și cantitatea; materialul/grosimea se aleg în pagină." }),
        ...(Object.keys(pageChoices).length && {
            select_in_configurator: pageChoices,
            url_note: "Prețul e pentru configurația implicită (cea deschisă de link); opțiunile cerute se aleg în pagină și pot schimba prețul.",
        }),
        ...(minNote && { min_quantity_note: minNote }),
        price_note: "Prețul este cel afișat în configurator pentru această configurație (grafică încărcată de client); transportul se calculează în coș.",
    };
}
