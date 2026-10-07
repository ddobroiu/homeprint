// Randarea documentului în SVG (șir de caractere). ACELAȘI cod desenează planșa din editor și
// fișierul de print (PNG / PDF), deci ce vezi pe ecran este exact ce se tipărește.
// Unități: mm (viewBox-ul SVG e în mm).
import LIBRARY from "./elements.generated.json";
import { curvedTextBox, displayText, layoutText } from "./textLayout";
import type { Background, EditorDoc, El, ImageEl, Paint, Shadow, ShapeEl, SvgEl, TextEl } from "./types";

export type LibraryElement = { id: string; group: string; label: string; vw: number; vh: number; svg: string; c: string; c2?: string; keepRatio: boolean; stroke?: boolean };
export const ELEMENT_LIBRARY = LIBRARY as LibraryElement[];
const LIB_BY_ID = new Map(ELEMENT_LIBRARY.map((e) => [e.id, e]));
export function libraryElement(id: string): LibraryElement | undefined {
    return LIB_BY_ID.get(id);
}

export type RenderCtx = {
    /** transformă src-ul unei poze în URL afișabil (asset:..., proxy, data:) */
    resolveSrc: (src: string) => string;
    /** prefix pentru id-urile din <defs> (mai multe SVG-uri pe aceeași pagină) */
    idPrefix?: string;
    /** export: casetele de poză goale nu se desenează */
    forExport?: boolean;
};

export function esc(s: string): string {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
const n = (v: number) => (Math.round(v * 1000) / 1000).toString();

function paintFill(paint: Paint | null | undefined, id: string, defs: string[]): string {
    if (!paint) return "none";
    if (paint.kind === "solid") return paint.color;
    const stops = paint.stops.map((s) => `<stop offset="${n(s.offset)}" stop-color="${esc(s.color)}"/>`).join("");
    if (paint.kind === "linear") {
        defs.push(`<linearGradient id="${id}" gradientTransform="rotate(${n(paint.angle)} 0.5 0.5)">${stops}</linearGradient>`);
    } else {
        defs.push(`<radialGradient id="${id}" cx="0.5" cy="0.5" r="0.7">${stops}</radialGradient>`);
    }
    return `url(#${id})`;
}

function shadowFilter(shadow: Shadow | null | undefined, id: string, defs: string[]): string {
    if (!shadow) return "";
    defs.push(
        `<filter id="${id}" x="-50%" y="-50%" width="200%" height="200%" color-interpolation-filters="sRGB"><feDropShadow dx="${n(shadow.dx)}" dy="${n(shadow.dy)}" stdDeviation="${n(Math.max(0, shadow.blur) / 2)}" flood-color="${esc(shadow.color)}" flood-opacity="${n(shadow.opacity)}"/></filter>`,
    );
    return ` filter="url(#${id})"`;
}

function textInner(el: TextEl, pid: string, defs: string[]): string {
    const l = layoutText(el);
    const size = l.fontSize;
    const ls = (el.letterSpacing / 1000) * size;
    const fill = paintFill(el.fill, `${pid}g`, defs);
    const strokeW = el.stroke && el.stroke.width > 0 ? (el.stroke.width / 100) * size * 2 : 0;
    const strokeAttr = strokeW > 0 ? ` stroke="${esc(el.stroke!.color)}" stroke-width="${n(strokeW)}" stroke-linejoin="round" paint-order="stroke fill"` : "";
    const fontAttr = `font-family="'${esc(el.fontFamily)}'" font-weight="${el.fontWeight}" font-style="${el.italic ? "italic" : "normal"}" font-size="${n(size)}"${ls ? ` letter-spacing="${n(ls)}"` : ""}`;
    const filter = shadowFilter(el.shadow, `${pid}s`, defs);
    let body = "";
    let bg = "";
    const curved = !!el.curve && Math.abs(el.curve) > 0.5;
    if (curved) {
        const cb = curvedTextBox(el, l);
        const cx = el.w / 2;
        const half = cb.angle / 2;
        const large = cb.angle > Math.PI ? 1 : 0;
        let d: string;
        if (cb.up) {
            const cy = l.firstBaseline + cb.r;
            const sx = cx - cb.r * Math.sin(half);
            const sy = cy - cb.r * Math.cos(half);
            const ex = cx + cb.r * Math.sin(half);
            d = `M${n(sx)} ${n(sy)}A${n(cb.r)} ${n(cb.r)} 0 ${large} 1 ${n(ex)} ${n(sy)}`;
        } else {
            const yb = el.h - (l.lineHeightMm - l.firstBaseline);
            const cy = yb - cb.r;
            const sx = cx - cb.r * Math.sin(half);
            const sy = cy + cb.r * Math.cos(half);
            const ex = cx + cb.r * Math.sin(half);
            d = `M${n(sx)} ${n(sy)}A${n(cb.r)} ${n(cb.r)} 0 ${large} 0 ${n(ex)} ${n(sy)}`;
        }
        defs.push(`<path id="${pid}p" d="${d}" fill="none"/>`);
        const text = l.lines[0]?.text ?? "";
        body = `<text ${fontAttr} fill="${fill}"${strokeAttr} xml:space="preserve"><textPath href="#${pid}p" startOffset="50%" text-anchor="middle">${esc(text)}</textPath></text>`;
    } else {
        const offY = el.autoFit ? Math.max(0, (el.h - l.height) / 2) : 0;
        const anchor = el.align === "center" ? "middle" : el.align === "right" ? "end" : "start";
        const x = el.align === "center" ? el.w / 2 + ls / 2 : el.align === "right" ? el.w + ls : 0;
        const spans = l.lines
            .map((line, i) => `<tspan x="${n(x)}" y="${n(offY + l.firstBaseline + i * l.lineHeightMm)}">${esc(line.text) || " "}</tspan>`)
            .join("");
        body = `<text ${fontAttr} text-anchor="${anchor}" fill="${fill}"${strokeAttr} xml:space="preserve">${spans}</text>`;
        // subliniere / tăiere: desenate ca dreptunghiuri (identic pe ecran, în PNG și în PDF)
        if (el.underline || el.strike) {
            const th = Math.max(0.05, size * 0.06);
            const deco: string[] = [];
            l.lines.forEach((line, i) => {
                if (!line.text.trim()) return;
                const lw = Math.max(0, line.width - ls);
                const lx = el.align === "center" ? (el.w - lw) / 2 : el.align === "right" ? el.w - lw : 0;
                const base = offY + l.firstBaseline + i * l.lineHeightMm;
                if (el.underline) deco.push(`<rect x="${n(lx)}" y="${n(base + size * 0.1)}" width="${n(lw)}" height="${n(th)}" fill="${fill}"/>`);
                if (el.strike) deco.push(`<rect x="${n(lx)}" y="${n(base - size * 0.3)}" width="${n(lw)}" height="${n(th)}" fill="${fill}"/>`);
            });
            body += deco.join("");
        }
    }
    if (el.bg) {
        const p = (el.bg.padding / 100) * size;
        bg = `<rect x="${n(-p)}" y="${n(-p * 0.6)}" width="${n(el.w + 2 * p)}" height="${n(el.h + 1.2 * p)}" rx="${n((el.bg.radius / 100) * size)}" fill="${esc(el.bg.color)}"/>`;
    }
    return `${bg}<g${filter}>${body}</g>`;
}

function starPoints(w: number, h: number, points: number, inner: number): string {
    const out: string[] = [];
    for (let i = 0; i < points * 2; i++) {
        const a = -Math.PI / 2 + (i * Math.PI) / points;
        const r = i % 2 === 0 ? 1 : inner;
        out.push(`${n(w / 2 + (w / 2) * r * Math.cos(a))},${n(h / 2 + (h / 2) * r * Math.sin(a))}`);
    }
    return out.join(" ");
}
function polygonPoints(w: number, h: number, sides: number): string {
    const out: string[] = [];
    for (let i = 0; i < sides; i++) {
        const a = -Math.PI / 2 + (i * 2 * Math.PI) / sides;
        out.push(`${n(w / 2 + (w / 2) * Math.cos(a))},${n(h / 2 + (h / 2) * Math.sin(a))}`);
    }
    return out.join(" ");
}

function shapeInner(el: ShapeEl, pid: string, defs: string[]): string {
    const fill = paintFill(el.fill, `${pid}g`, defs);
    const sw = el.stroke?.width ?? 0;
    const dash = el.stroke?.dash === "dash" ? ` stroke-dasharray="${n(sw * 3)} ${n(sw * 2)}"` : el.stroke?.dash === "dot" ? ` stroke-dasharray="0.01 ${n(sw * 2)}" stroke-linecap="round"` : "";
    const stroke = sw > 0 && el.stroke ? ` stroke="${esc(el.stroke.color)}" stroke-width="${n(sw)}"${dash}` : "";
    const filter = shadowFilter(el.shadow, `${pid}s`, defs);
    let shape = "";
    switch (el.shape) {
        case "rect": {
            const r = Math.min(el.radius ?? 0, el.w / 2, el.h / 2);
            shape = `<rect x="0" y="0" width="${n(el.w)}" height="${n(el.h)}" rx="${n(r)}" fill="${fill}"${stroke}/>`;
            break;
        }
        case "ellipse":
            shape = `<ellipse cx="${n(el.w / 2)}" cy="${n(el.h / 2)}" rx="${n(el.w / 2)}" ry="${n(el.h / 2)}" fill="${fill}"${stroke}/>`;
            break;
        case "triangle":
            shape = `<polygon points="${n(el.w / 2)},0 ${n(el.w)},${n(el.h)} 0,${n(el.h)}" fill="${fill}"${stroke} stroke-linejoin="round"/>`;
            break;
        case "star":
            shape = `<polygon points="${starPoints(el.w, el.h, el.points ?? 5, el.points && el.points > 8 ? 0.78 : 0.45)}" fill="${fill}"${stroke} stroke-linejoin="round"/>`;
            break;
        case "polygon":
            shape = `<polygon points="${polygonPoints(el.w, el.h, el.points ?? 6)}" fill="${fill}"${stroke} stroke-linejoin="round"/>`;
            break;
        case "line": {
            const lw = Math.max(0.1, sw || el.h);
            const color = el.stroke?.color ?? (el.fill?.kind === "solid" ? el.fill.color : "#111111");
            const cap = el.stroke?.dash === "dot" ? "round" : "butt";
            shape = `<line x1="0" y1="${n(el.h / 2)}" x2="${n(el.w)}" y2="${n(el.h / 2)}" stroke="${esc(color)}" stroke-width="${n(lw)}" stroke-linecap="${cap}"${dash.replace(/ stroke-linecap="round"/, "")}/>`;
            break;
        }
    }
    return `<g${filter}>${shape}</g>`;
}

function svgInner(el: SvgEl, pid: string, defs: string[]): string {
    const lib = LIB_BY_ID.get(el.ref);
    if (!lib) return "";
    const markup = lib.svg
        .split("{{c}}").join(esc(el.color))
        .split("{{c2}}").join(esc(el.color2 ?? lib.c2 ?? el.color))
        .split("{{sw}}").join(n(2 * (el.strokeScale ?? 1)));
    const filter = shadowFilter(el.shadow, `${pid}s`, defs);
    return `<g${filter}><svg x="0" y="0" width="${n(el.w)}" height="${n(el.h)}" viewBox="0 0 ${lib.vw} ${lib.vh}" preserveAspectRatio="none" overflow="visible">${markup}</svg></g>`;
}

/** Cum se așază poza în casetă (cover + zoom + decupaj). */
export function imagePlacement(el: Pick<ImageEl, "w" | "h" | "iw" | "ih" | "zoom" | "ox" | "oy">) {
    const s = Math.max(el.w / Math.max(1, el.iw), el.h / Math.max(1, el.ih)) * Math.max(1, el.zoom ?? 1);
    const dw = el.iw * s;
    const dh = el.ih * s;
    const x = (el.w - dw) * (0.5 + (el.ox ?? 0) / 2);
    const y = (el.h - dh) * (0.5 + (el.oy ?? 0) / 2);
    return { x, y, dw, dh };
}

/** DPI efectiv al pozei la dimensiunea de print. */
export function imageDpi(el: Pick<ImageEl, "w" | "h" | "iw" | "ih" | "zoom">): number {
    const { dw } = imagePlacement({ ...el, ox: 0, oy: 0 });
    return el.iw / (dw / 25.4);
}

function imageInner(el: ImageEl, pid: string, defs: string[], ctx: RenderCtx): string {
    const r = el.mask === "circle" ? -1 : Math.min(el.radius ?? 0, el.w / 2, el.h / 2);
    const clip = r < 0 ? `<ellipse cx="${n(el.w / 2)}" cy="${n(el.h / 2)}" rx="${n(el.w / 2)}" ry="${n(el.h / 2)}"/>` : `<rect x="0" y="0" width="${n(el.w)}" height="${n(el.h)}" rx="${n(r)}"/>`;
    defs.push(`<clipPath id="${pid}c">${clip}</clipPath>`);
    const filter = shadowFilter(el.shadow, `${pid}s`, defs);
    if (el.placeholder || !el.src) {
        if (ctx.forExport) return "";
        const s = Math.min(el.w, el.h);
        return `<g clip-path="url(#${pid}c)"><rect width="${n(el.w)}" height="${n(el.h)}" fill="#e9e4da"/><g opacity="0.55" transform="translate(${n(el.w / 2 - s * 0.12)} ${n(el.h / 2 - s * 0.12)}) scale(${n((s * 0.24) / 24)})"><g fill="none" stroke="#6b7a72" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21"/></g></g></g>`;
    }
    const p = imagePlacement(el);
    const f = el.filters ?? {};
    const css: string[] = [];
    if (f.brightness !== undefined && f.brightness !== 100) css.push(`brightness(${f.brightness}%)`);
    if (f.contrast !== undefined && f.contrast !== 100) css.push(`contrast(${f.contrast}%)`);
    if (f.saturate !== undefined && f.saturate !== 100) css.push(`saturate(${f.saturate}%)`);
    if (f.grayscale) css.push(`grayscale(${f.grayscale}%)`);
    if (f.blur) css.push(`blur(${n(f.blur)}px)`);
    const style = css.length ? ` style="filter:${css.join(" ")}"` : "";
    const border = el.border && el.border.width > 0 ? (r < 0 ? `<ellipse cx="${n(el.w / 2)}" cy="${n(el.h / 2)}" rx="${n(el.w / 2 - el.border.width / 2)}" ry="${n(el.h / 2 - el.border.width / 2)}" fill="none" stroke="${esc(el.border.color)}" stroke-width="${n(el.border.width)}"/>` : `<rect x="${n(el.border.width / 2)}" y="${n(el.border.width / 2)}" width="${n(el.w - el.border.width)}" height="${n(el.h - el.border.width)}" rx="${n(Math.max(0, r - el.border.width / 2))}" fill="none" stroke="${esc(el.border.color)}" stroke-width="${n(el.border.width)}"/>`) : "";
    return `<g${filter}><g clip-path="url(#${pid}c)"><image href="${esc(ctx.resolveSrc(el.src))}" x="${n(p.x)}" y="${n(p.y)}" width="${n(p.dw)}" height="${n(p.dh)}" preserveAspectRatio="none"${style}/></g>${border}</g>`;
}

/** Transformarea casetei: poziție, rotire în jurul centrului, oglindire. */
export function elementTransform(el: El): string {
    const cx = el.x + el.w / 2;
    const cy = el.y + el.h / 2;
    const flip = el.flipX || el.flipY ? ` scale(${el.flipX ? -1 : 1} ${el.flipY ? -1 : 1})` : "";
    return `translate(${n(cx)} ${n(cy)}) rotate(${n(el.rotation || 0)})${flip} translate(${n(-el.w / 2)} ${n(-el.h / 2)})`;
}

/** Conținutul elementului (în coordonatele casetei), cu propriile <defs>. */
export function elementMarkup(el: El, ctx: RenderCtx): string {
    const pid = `${ctx.idPrefix ?? "e"}-${el.id}-`;
    const defs: string[] = [];
    let inner = "";
    if (el.type === "text") inner = textInner(el, pid, defs);
    else if (el.type === "shape") inner = shapeInner(el, pid, defs);
    else if (el.type === "svg") inner = svgInner(el, pid, defs);
    else inner = imageInner(el, pid, defs, ctx);
    return (defs.length ? `<defs>${defs.join("")}</defs>` : "") + inner;
}

export function elementSvg(el: El, ctx: RenderCtx): string {
    if (el.hidden) return "";
    const op = el.opacity < 1 ? ` opacity="${n(el.opacity)}"` : "";
    return `<g transform="${elementTransform(el)}"${op}>${elementMarkup(el, ctx)}</g>`;
}

function patternMarkup(bg: Extract<Background, { kind: "pattern" }>, id: string): string {
    const s = Math.max(1, bg.sizeMm);
    const fg = esc(bg.fg);
    let inner = "";
    switch (bg.pattern) {
        case "dots":
            inner = `<circle cx="${n(s / 2)}" cy="${n(s / 2)}" r="${n(s * 0.16)}" fill="${fg}"/>`;
            break;
        case "stripes":
            inner = `<rect width="${n(s / 2)}" height="${n(s)}" fill="${fg}"/>`;
            break;
        case "grid":
            inner = `<path d="M${n(s)} 0V${n(s)}M0 ${n(s)}H${n(s)}" stroke="${fg}" stroke-width="${n(s * 0.06)}" fill="none"/>`;
            break;
        case "checker":
            inner = `<rect width="${n(s / 2)}" height="${n(s / 2)}" fill="${fg}"/><rect x="${n(s / 2)}" y="${n(s / 2)}" width="${n(s / 2)}" height="${n(s / 2)}" fill="${fg}"/>`;
            break;
        case "diagonal":
            inner = `<path d="M${n(-s / 4)} ${n(s / 4)}L${n(s / 4)} ${n(-s / 4)}M0 ${n(s)}L${n(s)} 0M${n((3 * s) / 4)} ${n((5 * s) / 4)}L${n((5 * s) / 4)} ${n((3 * s) / 4)}" stroke="${fg}" stroke-width="${n(s * 0.18)}"/>`;
            break;
        case "waves":
            inner = `<path d="M0 ${n(s * 0.5)}Q${n(s * 0.25)} ${n(s * 0.2)} ${n(s * 0.5)} ${n(s * 0.5)}T${n(s)} ${n(s * 0.5)}" stroke="${fg}" stroke-width="${n(s * 0.08)}" fill="none"/>`;
            break;
        case "zigzag":
            inner = `<path d="M0 ${n(s * 0.65)}L${n(s * 0.25)} ${n(s * 0.35)}L${n(s * 0.5)} ${n(s * 0.65)}L${n(s * 0.75)} ${n(s * 0.35)}L${n(s)} ${n(s * 0.65)}" stroke="${fg}" stroke-width="${n(s * 0.08)}" fill="none" stroke-linejoin="round"/>`;
            break;
    }
    return `<pattern id="${id}" patternUnits="userSpaceOnUse" width="${n(s)}" height="${n(s)}"><rect width="${n(s)}" height="${n(s)}" fill="${esc(bg.bg)}"/>${inner}</pattern>`;
}

export function backgroundSvg(doc: Pick<EditorDoc, "background" | "wMm" | "hMm" | "bleedMm">, ctx: RenderCtx): string {
    const b = doc.bleedMm;
    const x = -b;
    const y = -b;
    const w = doc.wMm + 2 * b;
    const h = doc.hMm + 2 * b;
    const bg = doc.background;
    const pid = `${ctx.idPrefix ?? "e"}-bg`;
    if (bg.kind === "image") {
        const s = Math.max(w / Math.max(1, bg.iw), h / Math.max(1, bg.ih));
        const dw = bg.iw * s;
        const dh = bg.ih * s;
        return `<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="#ffffff"/><image href="${esc(ctx.resolveSrc(bg.src))}" x="${n(x + (w - dw) / 2)}" y="${n(y + (h - dh) / 2)}" width="${n(dw)}" height="${n(dh)}" preserveAspectRatio="none"/>`;
    }
    if (bg.kind === "pattern") {
        return `<defs>${patternMarkup(bg, pid)}</defs><rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="url(#${pid})"/>`;
    }
    const defs: string[] = [];
    const fill = paintFill(bg, pid, defs);
    return `${defs.length ? `<defs>${defs.join("")}</defs>` : ""}<rect x="${n(x)}" y="${n(y)}" width="${n(w)}" height="${n(h)}" fill="${fill}"/>`;
}

/** Documentul întreg ca SVG (cu bleed). `fontCss` = @font-face cu fonturile încorporate. */
export function docSvg(doc: EditorDoc, ctx: RenderCtx, opts: { widthPx?: number; heightPx?: number; fontCss?: string } = {}): string {
    const b = doc.bleedMm;
    const vw = doc.wMm + 2 * b;
    const vh = doc.hMm + 2 * b;
    const size = opts.widthPx ? ` width="${opts.widthPx}" height="${opts.heightPx}"` : ` width="${n(vw)}mm" height="${n(vh)}mm"`;
    const style = opts.fontCss ? `<defs><style>${opts.fontCss}</style></defs>` : "";
    return (
        `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"${size} viewBox="${n(-b)} ${n(-b)} ${n(vw)} ${n(vh)}">` +
        style +
        backgroundSvg(doc, ctx) +
        doc.elements.map((el) => elementSvg(el, ctx)).join("") +
        `</svg>`
    );
}
