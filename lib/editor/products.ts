// Produsele și dimensiunile editorului online, citite din registrele configuratoarelor:
// - dimensiunile populare: lib/seo/standardSizes.ts (dimensiunile standard, aceleași în cele 6 site-uri)
// - formatele fixe (afișe, flyere, roll-up): constantele din lib/pricing.ts
// - bleed / zona de siguranță / DPI: aceleași valori ca în lib/seo/dimensionContent.ts (ghidul de fișiere)
// Se apelează pe server (pagina /editor) și se trimite ca props clientului.
import { STANDARD_SIZES } from "@/lib/seo/standardSizes";
import { AFISE_CONSTANTS, FLYER_CONSTANTS, ROLLUP_CONSTANTS } from "@/lib/pricing";
import { configuratorProducts } from "@/lib/products/configurator-products";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import type { EditorProduct, EditorSize } from "./types";
import { EDITOR_IMAGE_OVERRIDES, EDITOR_PRODUCT_ORDER } from "./site";

type Spec = Omit<EditorProduct, "sizes"> & {
    /** true = dimensiunile standard ale produsului (lib/seo/standardSizes.ts) */
    curatedPath?: string;
    extraSizes?: Array<[number, number]>;
    /** parametri fixi adăugați la link (ex. grosimea plăcii) */
    keep?: string[];
};

const SPECS: Spec[] = [
    { id: "banner", label: "Banner", icon: "flag", path: "/configurator/banner", bleedMm: 0, safeMm: 50, dpi: 150, custom: { minCm: 20, maxCm: 500 }, curatedPath: "/configurator/banner", note: "Fără bleed. Ține textele la cel puțin 5 cm de margine (tiv și capse)." },
    { id: "banner-verso", label: "Banner față-verso", icon: "flag", path: "/configurator/banner-verso", bleedMm: 0, safeMm: 50, dpi: 150, custom: { minCm: 20, maxCm: 500 }, curatedPath: "/configurator/banner-verso", note: "Fără bleed. Textele la cel puțin 5 cm de margine." },
    { id: "mesh", label: "Mesh", icon: "grid", path: "/configurator/mesh", bleedMm: 0, safeMm: 50, dpi: 100, custom: { minCm: 50, maxCm: 1000 }, curatedPath: "/configurator/mesh", extraSizes: [[200, 100], [400, 300], [600, 300]], note: "Material microperforat: evită textele foarte subțiri." },
    { id: "rollup", label: "Roll-up", icon: "scroll", path: "/configurator/rollup", bleedMm: 0, safeMm: 30, dpi: 150, custom: null, note: "Partea de jos (15 cm) intră în casetă: nu pune text acolo (zona e marcată pe planșă)." },
    { id: "afise", label: "Afiș", icon: "file", path: "/configurator/afise", bleedMm: 3, safeMm: 10, dpi: 300, custom: null },
    { id: "flayere", label: "Flyer", icon: "file", path: "/configurator/flayere", bleedMm: 3, safeMm: 5, dpi: 300, custom: null },
    { id: "pliante", label: "Pliant A4", icon: "layers", path: "/configurator/pliante", bleedMm: 3, safeMm: 5, dpi: 300, custom: null, note: "Pliantul deschis (A4). Liniile de împăturire depind de tipul ales în configurator." },
    { id: "carti-vizita", label: "Carte de vizită", icon: "card", path: "/configurator/carti-vizita", bleedMm: 3, safeMm: 4, dpi: 300, custom: null },
    { id: "autocolante", label: "Autocolant", icon: "sticker", path: "/configurator/autocolante", bleedMm: 3, safeMm: 3, dpi: 150, custom: { minCm: 3, maxCm: 150 }, curatedPath: "/configurator/autocolante" },
    { id: "canvas", label: "Tablou canvas", icon: "image", path: "/configurator/canvas", bleedMm: 0, safeMm: 30, dpi: 150, custom: { minCm: 20, maxCm: 200 }, curatedPath: "/configurator/canvas", note: "Marginea (~3 cm) se întinde pe ramă: nu pune text acolo." },
    { id: "pvc-forex", label: "PVC Forex", icon: "box", path: "/configurator/materiale/pvc-forex", bleedMm: 3, safeMm: 5, dpi: 150, custom: { minCm: 10, maxCm: 300 }, curatedPath: "/configurator/materiale/pvc-forex", keep: ["t"] },
    { id: "alucobond", label: "Alucobond", icon: "box", path: "/configurator/materiale/alucobond", bleedMm: 3, safeMm: 5, dpi: 150, custom: { minCm: 10, maxCm: 300 }, curatedPath: "/configurator/materiale/alucobond" },
    { id: "plexiglass", label: "Plexiglas", icon: "box", path: "/configurator/materiale/plexiglass", bleedMm: 3, safeMm: 5, dpi: 150, custom: { minCm: 10, maxCm: 200 }, extraSizes: [[30, 20], [40, 30], [60, 40], [80, 60], [100, 70]] },
    { id: "polipropilena", label: "Polipropilenă", icon: "box", path: "/configurator/materiale/polipropilena", bleedMm: 3, safeMm: 5, dpi: 150, custom: { minCm: 10, maxCm: 300 }, extraSizes: [[50, 70], [70, 100], [100, 70], [120, 80]] },
    { id: "carton", label: "Carton plume", icon: "box", path: "/configurator/materiale/carton", bleedMm: 3, safeMm: 5, dpi: 150, custom: { minCm: 10, maxCm: 200 }, extraSizes: [[50, 70], [70, 100], [100, 70]] },
    { id: "window-graphics", label: "Folie geam", icon: "window", path: "/configurator/window-graphics", bleedMm: 5, safeMm: 20, dpi: 100, custom: { minCm: 20, maxCm: 500 }, curatedPath: "/configurator/window-graphics" },
    { id: "tapet", label: "Tapet", icon: "brush", path: "/configurator/tapet", bleedMm: 50, safeMm: 50, dpi: 100, custom: { minCm: 50, maxCm: 1000 }, curatedPath: "/configurator/tapet", note: "Bleed de 5 cm pe fiecare latură pentru montaj." },
    { id: "tricouri", label: "Tricou (zona de print)", icon: "shirt", path: "/configurator/tricouri", bleedMm: 0, safeMm: 10, dpi: 300, custom: null, extraSizes: [[30, 40]], note: "Folosește fundal transparent sau o culoare apropiată de tricou." },
];

/** Poze pentru produsele fără intrare în registrul configuratoarelor (din public/products). */
const IMAGE_FALLBACK: Record<string, string> = {
    flayere: "/products/flayere/flyere-personalizate-design-colorat-2.webp",
};

/** "297×420 mm" -> [297, 420] */
function parseDims(dims: string): [number, number] | null {
    const m = dims.replace(/\s/g, "").match(/^(\d+(?:[.,]\d+)?)[×x](\d+(?:[.,]\d+)?)mm$/i);
    return m ? [Number(m[1].replace(",", ".")), Number(m[2].replace(",", "."))] : null;
}

function cmLabel(wMm: number, hMm: number): string {
    const f = (mm: number) => (mm % 10 === 0 ? String(mm / 10) : (mm / 10).toFixed(1).replace(".", ","));
    return `${f(wMm)}×${f(hMm)} cm`;
}

function whSize(wCm: number, hCm: number, extra: Record<string, string> = {}): EditorSize {
    return { key: `${wCm}x${hCm}`, label: `${wCm}×${hCm} cm`, wMm: wCm * 10, hMm: hCm * 10, params: { w: String(wCm), h: String(hCm), ...extra } };
}

/** Produsele din focusul site-ului primele (lib/editor/site.ts), restul în ordinea de mai sus. */
function siteOrder(specs: Spec[]): Spec[] {
    const rank = (id: string) => {
        const i = EDITOR_PRODUCT_ORDER.indexOf(id);
        return i === -1 ? EDITOR_PRODUCT_ORDER.length : i;
    };
    return [...specs].sort((a, b) => rank(a.id) - rank(b.id));
}

export function buildEditorProducts(): EditorProduct[] {
    return siteOrder(SPECS).map(({ curatedPath, extraSizes, keep, ...spec }) => {
        const sizes: EditorSize[] = [];
        const seen = new Set<string>();
        const push = (s: EditorSize) => {
            if (seen.has(s.key)) return;
            seen.add(s.key);
            sizes.push(s);
        };
        if (curatedPath || spec.custom) {
            for (const [w, h] of STANDARD_SIZES[spec.id] ?? []) push(whSize(w, h));
        }
        void keep;
        for (const [w, h] of extraSizes ?? []) push(whSize(w, h));

        if (spec.id === "rollup") {
            for (const s of ROLLUP_CONSTANTS.SIZES) push({ key: `${s.width_cm}x200`, label: `${s.width_cm}×200 cm (${s.label})`, wMm: s.width_cm * 10, hMm: 2000, params: { w: String(s.width_cm) } });
        }
        if (spec.id === "afise") {
            for (const s of AFISE_CONSTANTS.SIZES) {
                const d = parseDims(s.dims);
                if (d) push({ key: s.key, label: `${s.label} · ${cmLabel(d[0], d[1])}`, wMm: d[0], hMm: d[1], params: { size: s.key } });
            }
        }
        if (spec.id === "flayere") {
            for (const s of FLYER_CONSTANTS.SIZES) {
                const d = parseDims(s.dims);
                if (d) push({ key: s.key, label: `${s.label} · ${cmLabel(d[0], d[1])}`, wMm: d[0], hMm: d[1], params: { size: s.key } });
            }
        }
        if (spec.id === "pliante") {
            push({ key: "A4", label: "A4 deschis · 29,7×21 cm", wMm: 297, hMm: 210, params: {} });
            push({ key: "A4v", label: "A4 vertical · 21×29,7 cm", wMm: 210, hMm: 297, params: {} });
        }
        if (spec.id === "carti-vizita") {
            push({ key: "standard", label: "Standard · 9×5 cm", wMm: 90, hMm: 50, params: {} });
            push({ key: "standard-v", label: "Standard vertical · 5×9 cm", wMm: 50, hMm: 90, params: {} });
            push({ key: "card_bancar", label: "Card bancar · 8,5×5,5 cm", wMm: 85, hMm: 55, params: { size: "card_bancar" } });
        }
        // poza: suprascrierea site-ului, apoi registrul configuratoarelor (aceeași poză ca pe /configuratoare)
        const image =
            EDITOR_IMAGE_OVERRIDES[spec.id] ??
            CONFIGURATORS_REGISTRY.find((c) => c.id === spec.id)?.image ??
            configuratorProducts.find((c) => `/${c.routeSlug}` === spec.path)?.image ??
            IMAGE_FALLBACK[spec.id];
        return { ...spec, sizes, ...(image ? { image } : {}) };
    });
}
