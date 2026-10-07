"use client";
// Inserarea elementelor și operațiile de aliniere, folosite de panouri, scurtături și planșă.
import { aabb, adaptElements, makeText, normalizeText, uid, unionBox } from "@/lib/editor/doc";
import { libraryElement } from "@/lib/editor/render";
import { instantiate, type Template } from "@/lib/editor/templates";
import type { Background, EditorDoc, El, ImageEl, ShapeEl, SvgEl } from "@/lib/editor/types";
import { selectedEls, useEditor } from "./store";
import { EDITOR_BRAND } from "@/lib/editor/site";

const st = () => useEditor.getState();

function center(doc: EditorDoc, w: number, h: number, at?: { x: number; y: number }) {
    const cx = at?.x ?? doc.wMm / 2;
    const cy = at?.y ?? doc.hMm / 2;
    return { x: cx - w / 2, y: cy - h / 2 };
}

export function insertText(opts: Parameters<typeof makeText>[1] = {}) {
    const doc = st().doc;
    if (!doc) return;
    const el = makeText(doc, opts);
    st().addEls([el]);
    return el;
}

export function insertEls(els: El[]) {
    if (!els.length) return;
    st().addEls(els);
}

export function insertShape(shape: ShapeEl["shape"], opts: Partial<ShapeEl> = {}, at?: { x: number; y: number }) {
    const doc = st().doc;
    if (!doc) return;
    const s = Math.min(doc.wMm, doc.hMm) * 0.35;
    const isLine = shape === "line";
    const w = isLine ? Math.min(doc.wMm, doc.hMm) * 0.6 : s;
    const h = isLine ? Math.max(0.5, s * 0.03) : s;
    const el: ShapeEl = {
        id: uid(),
        type: "shape",
        shape,
        ...center(doc, w, h, at),
        w,
        h,
        rotation: 0,
        opacity: 1,
        fill: isLine ? null : { kind: "solid", color: EDITOR_BRAND.color },
        stroke: isLine ? { color: "#14211c", width: h } : null,
        points: shape === "star" ? 5 : shape === "polygon" ? 6 : undefined,
        ...opts,
    };
    // -1 = relativ la format (colțuri rotunjite, grosimea chenarului)
    if (el.radius === -1) el.radius = s * 0.15;
    if (el.stroke && el.stroke.width === -1) el.stroke = { ...el.stroke, width: s * 0.035 };
    st().addEls([el]);
}

export function insertSvg(ref: string, at?: { x: number; y: number }) {
    const doc = st().doc;
    const lib = libraryElement(ref);
    if (!doc || !lib) return;
    const s = Math.min(doc.wMm, doc.hMm) * (lib.group === "iconite" ? 0.18 : 0.3);
    const k = s / Math.max(lib.vw, lib.vh);
    const w = lib.vw * k;
    const h = lib.vh * k;
    const el: SvgEl = { id: uid(), type: "svg", ref, ...center(doc, w, h, at), w, h, rotation: 0, opacity: 1, color: lib.c, color2: lib.c2, name: lib.label };
    st().addEls([el]);
}

/** Poză nouă; dacă e selectată o casetă de poză (din șablon), o umple pe aceea. */
export function insertImage(src: string, iw: number, ih: number, at?: { x: number; y: number }, credit?: string) {
    const { doc, selection } = st();
    if (!doc) return;
    const rid = st().replaceTargetId;
    const target = doc.elements.find((e) => e.type === "image" && selection.includes(e.id) && ((e as ImageEl).placeholder || e.id === rid)) as ImageEl | undefined;
    if (target) {
        st().updateEls([target.id], { src, iw, ih, placeholder: false, zoom: 1, ox: 0, oy: 0, credit } as Partial<El>);
        st().setReplaceTarget(null);
        return;
    }
    const maxW = doc.wMm * 0.6;
    const maxH = doc.hMm * 0.6;
    const k = Math.min(maxW / iw, maxH / ih);
    const w = iw * k;
    const h = ih * k;
    const el: ImageEl = { id: uid(), type: "image", src, iw, ih, ...center(doc, w, h, at), w, h, rotation: 0, opacity: 1, credit };
    st().addEls([el]);
}

/** Pune poza în caseta de poză aflată sub punct (drag & drop). Întoarce true dacă a nimerit una. */
export function fillPlaceholderAt(pt: { x: number; y: number }, src: string, iw: number, ih: number): boolean {
    const doc = st().doc;
    if (!doc) return false;
    for (let i = doc.elements.length - 1; i >= 0; i--) {
        const e = doc.elements[i];
        if (e.type !== "image" || e.hidden || e.locked) continue;
        const b = aabb(e);
        if (pt.x >= b.x && pt.x <= b.x + b.w && pt.y >= b.y && pt.y <= b.y + b.h) {
            if (!e.placeholder) return false;
            st().updateEls([e.id], { src, iw, ih, placeholder: false, zoom: 1, ox: 0, oy: 0 } as Partial<El>);
            st().select([e.id]);
            return true;
        }
    }
    return false;
}

export function setBackground(bg: Background, key: string | boolean = true) {
    st().update((d) => ({ ...d, background: bg }), { history: key });
}

export function applyTemplate(t: Template) {
    const doc = st().doc;
    if (!doc) return;
    const { background, elements } = instantiate(t, doc);
    const els = elements.map((e) => {
        const { tpl: _tpl, ...rest } = e;
        return rest as El;
    });
    st().update((d) => ({ ...d, background, elements: els, templateId: t.id }));
    st().select([]);
}

export function selectAll() {
    const doc = st().doc;
    if (!doc) return;
    st().select(doc.elements.filter((e) => !e.locked && !e.hidden).map((e) => e.id));
}

type AlignKind = "left" | "hcenter" | "right" | "top" | "vcenter" | "bottom";

/** Un element: față de pagină. Mai multe: față de selecție. */
export function align(kind: AlignKind) {
    const { doc, selection } = st();
    const els = selectedEls(doc, selection).filter((e) => !e.locked);
    if (!doc || !els.length) return;
    const ref = els.length === 1 ? { x: 0, y: 0, w: doc.wMm, h: doc.hMm } : unionBox(els.map(aabb))!;
    const groups = new Map<string, El[]>();
    for (const e of els) {
        const k = e.groupId && els.length > 1 ? e.groupId : e.id;
        groups.set(k, [...(groups.get(k) ?? []), e]);
    }
    const moves = new Map<string, { dx: number; dy: number }>();
    const asOne = new Set(els.map((e) => e.groupId)).size === 1 && els[0].groupId;
    const units = asOne ? [els] : [...groups.values()];
    const target = asOne ? { x: 0, y: 0, w: doc.wMm, h: doc.hMm } : ref;
    for (const unit of units) {
        const b = unionBox(unit.map(aabb))!;
        let dx = 0;
        let dy = 0;
        if (kind === "left") dx = target.x - b.x;
        if (kind === "hcenter") dx = target.x + target.w / 2 - (b.x + b.w / 2);
        if (kind === "right") dx = target.x + target.w - (b.x + b.w);
        if (kind === "top") dy = target.y - b.y;
        if (kind === "vcenter") dy = target.y + target.h / 2 - (b.y + b.h / 2);
        if (kind === "bottom") dy = target.y + target.h - (b.y + b.h);
        for (const e of unit) moves.set(e.id, { dx, dy });
    }
    st().updateEls([...moves.keys()], (e) => ({ ...e, x: e.x + moves.get(e.id)!.dx, y: e.y + moves.get(e.id)!.dy }) as El);
}

export function distribute(axis: "h" | "v") {
    const { doc, selection } = st();
    const els = selectedEls(doc, selection).filter((e) => !e.locked);
    if (!doc || els.length < 3) return;
    const boxes = els.map((e) => ({ e, b: aabb(e) })).sort((a, b) => (axis === "h" ? a.b.x - b.b.x : a.b.y - b.b.y));
    const first = boxes[0].b;
    const last = boxes[boxes.length - 1].b;
    const total = boxes.reduce((s, x) => s + (axis === "h" ? x.b.w : x.b.h), 0);
    const span = axis === "h" ? last.x + last.w - first.x : last.y + last.h - first.y;
    const gap = (span - total) / (boxes.length - 1);
    let cursor = axis === "h" ? first.x : first.y;
    const moves = new Map<string, number>();
    for (const { e, b } of boxes) {
        moves.set(e.id, cursor - (axis === "h" ? b.x : b.y));
        cursor += (axis === "h" ? b.w : b.h) + gap;
    }
    st().updateEls([...moves.keys()], (e) => (axis === "h" ? { ...e, x: e.x + moves.get(e.id)! } : { ...e, y: e.y + moves.get(e.id)! }) as El);
}

export function nudge(dx: number, dy: number) {
    const { selection, doc } = st();
    const ids = selectedEls(doc, selection).filter((e) => !e.locked).map((e) => e.id);
    if (!ids.length) return;
    st().updateEls(ids, (e) => ({ ...e, x: e.x + dx, y: e.y + dy }) as El, { history: "nudge" });
}

/** Schimbă formatul: elementele se adaptează (centrul proporțional, mărimea uniform). */
export function changeFormat(next: Pick<EditorDoc, "productId" | "sizeKey" | "wMm" | "hMm" | "bleedMm" | "safeMm">) {
    const doc = st().doc;
    if (!doc) return;
    const elements = adaptElements(doc.elements, doc.wMm, doc.hMm, next.wMm, next.hMm).map((e) => (e.type === "text" ? normalizeText(e) : e));
    let background = doc.background;
    if (background.kind === "pattern") background = { ...background, sizeMm: background.sizeMm * Math.min(next.wMm / doc.wMm, next.hMm / doc.hMm) };
    st().update((d) => ({ ...d, ...next, elements, background }));
}
