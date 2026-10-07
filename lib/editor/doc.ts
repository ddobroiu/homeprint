// Operații pe document (fără React): creare, elemente noi, cutii de încadrare, schimbarea formatului.
import { DEFAULT_FONT } from "./fonts";
import { curvedTextBox, layoutText } from "./textLayout";
import type { EditorDoc, EditorProduct, EditorSize, El, TextEl } from "./types";

export function uid(): string {
    return Math.random().toString(36).slice(2, 10);
}

export const PT_PER_MM = 72 / 25.4;
export const mmToPt = (mm: number) => mm * PT_PER_MM;
export const ptToMm = (pt: number) => pt / PT_PER_MM;

export function newDoc(product: EditorProduct, size: EditorSize | null, wMm: number, hMm: number): EditorDoc {
    return {
        version: 1,
        productId: product.id,
        sizeKey: size?.key,
        wMm,
        hMm,
        bleedMm: product.bleedMm,
        safeMm: Math.min(product.safeMm, Math.min(wMm, hMm) * 0.12),
        background: { kind: "solid", color: "#ffffff" },
        elements: [],
    };
}

/** Recalculează înălțimea casetei de text (și lățimea la textul curbat). */
export function normalizeText(el: TextEl): TextEl {
    if (el.curve && Math.abs(el.curve) > 0.5) {
        const cb = curvedTextBox(el, layoutText(el));
        if (Math.abs(cb.w - el.w) < 0.01 && Math.abs(cb.h - el.h) < 0.01) return el;
        // păstrează centrul
        return { ...el, x: el.x + (el.w - cb.w) / 2, w: cb.w, h: cb.h };
    }
    if (el.autoFit) return el;
    const h = layoutText(el).height;
    return Math.abs(h - el.h) < 0.01 ? el : { ...el, h };
}

export function normalizeEl(el: El): El {
    return el.type === "text" ? normalizeText(el) : el;
}

/** Text implicit, dimensionat după format (titlu ≈ 1/9 din latura mică). */
export function makeText(doc: EditorDoc, opts: Partial<TextEl> = {}): TextEl {
    const short = Math.min(doc.wMm, doc.hMm);
    const fontSize = opts.fontSize ?? short / 9;
    const w = opts.w ?? Math.min(doc.wMm - 2 * doc.safeMm, Math.max(fontSize * 8, doc.wMm * 0.6));
    const base: TextEl = {
        id: uid(),
        type: "text",
        text: "Textul tău aici",
        fontFamily: DEFAULT_FONT,
        fontWeight: 700,
        fontSize,
        lineHeight: 1.15,
        letterSpacing: 0,
        align: "center",
        fill: { kind: "solid", color: "#14211c" },
        x: (doc.wMm - w) / 2,
        y: doc.hMm / 2 - fontSize * 0.6,
        w,
        h: fontSize * 1.2,
        rotation: 0,
        opacity: 1,
        ...opts,
    } as TextEl;
    const t = normalizeText(base);
    if (opts.y === undefined) t.y = (doc.hMm - t.h) / 2;
    return t;
}

export type Box = { x: number; y: number; w: number; h: number };

/** Colțurile casetei rotite. */
export function corners(el: Pick<El, "x" | "y" | "w" | "h" | "rotation">): Array<[number, number]> {
    const cx = el.x + el.w / 2;
    const cy = el.y + el.h / 2;
    const a = ((el.rotation || 0) * Math.PI) / 180;
    const cos = Math.cos(a);
    const sin = Math.sin(a);
    return [
        [-el.w / 2, -el.h / 2],
        [el.w / 2, -el.h / 2],
        [el.w / 2, el.h / 2],
        [-el.w / 2, el.h / 2],
    ].map(([x, y]) => [cx + x * cos - y * sin, cy + x * sin + y * cos]);
}

export function aabb(el: Pick<El, "x" | "y" | "w" | "h" | "rotation">): Box {
    if (!el.rotation) return { x: el.x, y: el.y, w: el.w, h: el.h };
    const pts = corners(el);
    const xs = pts.map((p) => p[0]);
    const ys = pts.map((p) => p[1]);
    const x = Math.min(...xs);
    const y = Math.min(...ys);
    return { x, y, w: Math.max(...xs) - x, h: Math.max(...ys) - y };
}

export function unionBox(boxes: Box[]): Box | null {
    if (!boxes.length) return null;
    const x = Math.min(...boxes.map((b) => b.x));
    const y = Math.min(...boxes.map((b) => b.y));
    const x2 = Math.max(...boxes.map((b) => b.x + b.w));
    const y2 = Math.max(...boxes.map((b) => b.y + b.h));
    return { x, y, w: x2 - x, h: y2 - y };
}

/**
 * Adaptează elementele la alt format: centrul fiecărui element se mută proporțional,
 * mărimea se scalează uniform (textul nu se deformează). Benzile marcate `stretchX/Y` se întind.
 */
export function adaptElements(elements: El[], fromW: number, fromH: number, toW: number, toH: number): El[] {
    const sx = toW / fromW;
    const sy = toH / fromH;
    const s = Math.min(sx, sy);
    const scaleEl = (el: El, nx: number, ny: number, nw: number, nh: number, k: number): El => {
        const next: El = { ...el, x: nx, y: ny, w: nw, h: nh } as El;
        if (next.type === "text") {
            next.fontSize = (el as TextEl).fontSize * k;
            return normalizeText(next);
        }
        if (next.type === "shape" && next.stroke) next.stroke = { ...next.stroke, width: next.stroke.width * k };
        if (next.type === "shape" && next.radius) next.radius = next.radius * k;
        if (next.type === "image" && next.radius) next.radius = next.radius * k;
        if (next.type === "image" && next.border) next.border = { ...next.border, width: next.border.width * k };
        if ("shadow" in next && next.shadow) next.shadow = { ...next.shadow, blur: next.shadow.blur * k, dx: next.shadow.dx * k, dy: next.shadow.dy * k };
        return next;
    };
    // elementele grupate se mută împreună (centrul grupului proporțional, interiorul scalat uniform)
    const groups = new Map<string, El[]>();
    for (const el of elements) if (el.groupId) groups.set(el.groupId, [...(groups.get(el.groupId) ?? []), el]);
    const groupMove = new Map<string, { cx: number; cy: number; ncx: number; ncy: number }>();
    for (const [g, list] of groups) {
        if (list.length < 2) continue;
        const b = unionBox(list.map((e) => ({ x: e.x, y: e.y, w: e.w, h: e.h })))!;
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h / 2;
        groupMove.set(g, { cx, cy, ncx: cx * sx, ncy: cy * sy });
    }
    return elements.map((el) => {
        const gm = el.groupId ? groupMove.get(el.groupId) : undefined;
        if (gm) {
            const nw = el.w * s;
            const nh = el.h * s;
            const ecx = gm.ncx + (el.x + el.w / 2 - gm.cx) * s;
            const ecy = gm.ncy + (el.y + el.h / 2 - gm.cy) * s;
            return scaleEl(el, ecx - nw / 2, ecy - nh / 2, nw, nh, s);
        }
        const t = el.tpl ?? {};
        const nw = t.stretchX ? el.w * sx : el.w * s;
        const nh = t.stretchY ? el.h * sy : el.h * s;
        let cx = (el.x + el.w / 2) * sx;
        let cy = (el.y + el.h / 2) * sy;
        if (t.anchorX === "left") cx = el.x * sx + nw / 2;
        if (t.anchorX === "right") cx = toW - (fromW - el.x - el.w) * sx - nw / 2;
        if (t.anchorY === "top") cy = el.y * sy + nh / 2;
        if (t.anchorY === "bottom") cy = toH - (fromH - el.y - el.h) * sy - nh / 2;
        return scaleEl(el, cx - nw / 2, cy - nh / 2, nw, nh, s);
    });
}

export function cloneWithNewIds(elements: El[]): El[] {
    const groups = new Map<string, string>();
    return elements.map((el) => {
        const g = el.groupId ? groups.get(el.groupId) ?? (groups.set(el.groupId, uid()), groups.get(el.groupId)!) : undefined;
        return { ...el, id: uid(), groupId: g };
    });
}

export function sizeLabel(wMm: number, hMm: number): string {
    const f = (mm: number) => (Math.round(mm) % 10 === 0 ? String(Math.round(mm) / 10) : (mm / 10).toFixed(1).replace(".", ","));
    return `${f(wMm)} × ${f(hMm)} cm`;
}

/** Linkul configuratorului pentru designul terminat (dimensiunea + fișierul). */
export function configuratorHref(product: EditorProduct, size: EditorSize | null | undefined, wMm: number, hMm: number, imageUrl?: string): string {
    const params = new URLSearchParams(size ? size.params : { w: String(Math.round(wMm / 10)), h: String(Math.round(hMm / 10)) });
    if (imageUrl) params.set("image", imageUrl);
    const qs = params.toString();
    return qs ? `${product.path}?${qs}` : product.path;
}
