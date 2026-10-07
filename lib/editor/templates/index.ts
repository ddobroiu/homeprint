// Șabloanele editorului, pe familii de produse (câte un fișier în acest director), ca să poată fi
// copiate și pe celelalte site-uri de print. Panoul arată ÎNTÂI setul produsului ales, apoi
// „Alte șabloane” (generice, adaptate prin scalare).
import { adaptElements, cloneWithNewIds, normalizeEl } from "../doc";
import type { Background, EditorDoc, El } from "../types";
import { bottomNoGoMm } from "../zones";
import { AFIS_TEMPLATES } from "./afis";
import { AUTOCOLANT_TEMPLATES } from "./autocolant";
import { BANNER_TEMPLATES } from "./banner";
import { CANVAS_TEMPLATES } from "./canvas";
import { CARTE_VIZITA_TEMPLATES } from "./carte-vizita";
import { FLYER_TEMPLATES } from "./flyer";
import { GENERIC_TEMPLATES } from "./generic";
import { type Ctx, type Template } from "./kit";
import { MESH_TEMPLATES } from "./mesh";
import { FOLIE_GEAM_TEMPLATES, PLIANT_TEMPLATES, TAPET_TEMPLATES, TRICOU_TEMPLATES } from "./altele";
import { PANOU_TEMPLATES } from "./panouri";
import { ROLLUP_TEMPLATES } from "./rollup";
import { SITE_TEMPLATE_SETS } from "./site";

export type { Ctx, Template };
export { GENERIC_TEMPLATES };

/** Setul fiecărui produs din editor (lib/editor/products.ts), în ordinea afișării. */
const BASE_TEMPLATE_SETS: Record<string, Template[]> = {
    banner: BANNER_TEMPLATES,
    "banner-verso": BANNER_TEMPLATES,
    mesh: [...MESH_TEMPLATES, ...BANNER_TEMPLATES],
    rollup: ROLLUP_TEMPLATES,
    afise: AFIS_TEMPLATES,
    flayere: FLYER_TEMPLATES,
    pliante: PLIANT_TEMPLATES,
    "carti-vizita": CARTE_VIZITA_TEMPLATES,
    autocolante: AUTOCOLANT_TEMPLATES,
    canvas: CANVAS_TEMPLATES,
    "pvc-forex": PANOU_TEMPLATES,
    alucobond: PANOU_TEMPLATES,
    plexiglass: PANOU_TEMPLATES,
    polipropilena: [...PANOU_TEMPLATES, ...AFIS_TEMPLATES],
    carton: [...AFIS_TEMPLATES, ...PANOU_TEMPLATES],
    "window-graphics": FOLIE_GEAM_TEMPLATES,
    tapet: TAPET_TEMPLATES,
    tricouri: TRICOU_TEMPLATES,
};

/** Setul de bază + șabloanele proprii ale site-ului (./site.ts), puse primele. */
export const PRODUCT_TEMPLATE_SETS: Record<string, Template[]> = Object.fromEntries(
    [...new Set([...Object.keys(BASE_TEMPLATE_SETS), ...Object.keys(SITE_TEMPLATE_SETS)])].map((id) => [id, [...(SITE_TEMPLATE_SETS[id] ?? []), ...(BASE_TEMPLATE_SETS[id] ?? [])]]),
);

/** Toate șabloanele (unice), pentru căutarea după id. */
export const TEMPLATES: Template[] = (() => {
    const seen = new Set<string>();
    const out: Template[] = [];
    for (const t of [...Object.values(PRODUCT_TEMPLATE_SETS).flat(), ...GENERIC_TEMPLATES]) {
        if (seen.has(t.id)) continue;
        seen.add(t.id);
        out.push(t);
    }
    return out;
})();

export function templateById(id: string): Template | undefined {
    return TEMPLATES.find((t) => t.id === id);
}

/** Setul produsului (primele) și restul, generice, sortate după potrivirea cu formatul. */
export function templatesFor(productId: string, wMm: number, hMm: number): { primary: Template[]; others: Template[] } {
    const primary = PRODUCT_TEMPLATE_SETS[productId] ?? [];
    const ar = wMm / hMm;
    const others = [...GENERIC_TEMPLATES].sort((a, b) => {
        const score = (t: Template) => (t.products.includes(productId) ? 0 : 10) + Math.abs(Math.log(t.baseW / t.baseH / ar));
        return score(a) - score(b);
    });
    return { primary, others };
}

type DocLike = Pick<EditorDoc, "productId" | "wMm" | "hMm" | "bleedMm" | "safeMm">;

export function makeCtx(doc: DocLike): Ctx {
    const { wMm: W, hMm: H, bleedMm: bleed, safeMm: safe } = doc;
    const noGoBottom = bottomNoGoMm(doc.productId, H);
    const bottom = Math.max(safe, noGoBottom);
    return {
        productId: doc.productId,
        W,
        H,
        bleed,
        safe,
        noGoBottom,
        inner: { x: safe, y: safe, w: W - 2 * safe, h: H - safe - bottom },
        full: { x: -bleed, y: -bleed, w: W + 2 * bleed, h: H + 2 * bleed },
        ar: W / H,
        short: Math.min(W, H),
    };
}

/** Elementele și fundalul șablonului la formatul documentului (aceeași funcție pentru miniatură și aplicare). */
export function instantiate(t: Template, doc: DocLike): { background: Background; elements: El[] } {
    if (t.fluid) {
        const c = makeCtx(doc);
        const background = typeof t.background === "function" ? t.background(c) : t.background;
        const elements = cloneWithNewIds(t.build(c)).map(normalizeEl);
        return { background, elements };
    }
    const base = makeCtx({ productId: doc.productId, wMm: t.baseW, hMm: t.baseH, bleedMm: 0, safeMm: 0 });
    const elements = adaptElements(cloneWithNewIds(t.build(base)), t.baseW, t.baseH, doc.wMm, doc.hMm);
    let background = typeof t.background === "function" ? t.background(base) : t.background;
    if (background.kind === "pattern") background = { ...background, sizeMm: background.sizeMm * Math.min(doc.wMm / t.baseW, doc.hMm / t.baseH) };
    return { background, elements };
}
