// Așezarea textului (rânduri, înălțime) măsurată cu Canvas 2D, cu aceleași fonturi ca SVG-ul.
// Linia de bază se calculează ca în CSS (jumătate din spațiul dintre rânduri sus / jos),
// ca textarea de editare să cadă exact peste text.
import type { TextEl } from "./types";

export type TextLine = { text: string; width: number };
export type TextLayout = {
    lines: TextLine[];
    /** mărimea fontului folosită efectiv (după auto-fit), mm */
    fontSize: number;
    lineHeightMm: number;
    /** înălțimea totală a textului, mm */
    height: number;
    /** linia de bază a primului rând, față de partea de sus, mm */
    firstBaseline: number;
    /** lățimea celui mai lung rând, mm */
    maxWidth: number;
};

const MEASURE_PX = 100;
let ctx: CanvasRenderingContext2D | null = null;
function context(): CanvasRenderingContext2D | null {
    if (ctx) return ctx;
    if (typeof document === "undefined") return null;
    ctx = document.createElement("canvas").getContext("2d");
    return ctx;
}

type Metrics = { ascent: number; descent: number };
const metricsCache = new Map<string, Metrics>();
const widthCache = new Map<string, number>();
let fontEpoch = 0;

/** Se apelează când s-au încărcat fonturi noi (măsurătorile vechi nu mai sunt valabile). */
export function invalidateTextMetrics() {
    metricsCache.clear();
    widthCache.clear();
    layoutCache.clear();
    fontEpoch++;
}
export function textMetricsEpoch() {
    return fontEpoch;
}

function fontString(el: Pick<TextEl, "fontFamily" | "fontWeight" | "italic">): string {
    return `${el.italic ? "italic " : ""}${el.fontWeight} ${MEASURE_PX}px "${el.fontFamily}"`;
}

function measure(font: string, text: string): number {
    const key = `${font}|${text}`;
    const hit = widthCache.get(key);
    if (hit !== undefined) return hit;
    const c = context();
    let w = text.length * MEASURE_PX * 0.55;
    if (c) {
        c.font = font;
        w = c.measureText(text).width;
    }
    if (widthCache.size > 20000) widthCache.clear();
    widthCache.set(key, w);
    return w;
}

function fontMetrics(font: string): Metrics {
    const hit = metricsCache.get(font);
    if (hit) return hit;
    const c = context();
    let m: Metrics = { ascent: MEASURE_PX * 0.9, descent: MEASURE_PX * 0.22 };
    if (c) {
        c.font = font;
        const t = c.measureText("ÂȘjgĂ");
        if (t.fontBoundingBoxAscent !== undefined && t.fontBoundingBoxAscent > 0) {
            m = { ascent: t.fontBoundingBoxAscent, descent: t.fontBoundingBoxDescent };
        }
    }
    metricsCache.set(font, m);
    return m;
}

export function displayText(el: Pick<TextEl, "text" | "uppercase" | "list">): string {
    let t = el.uppercase ? el.text.toLocaleUpperCase("ro-RO") : el.text;
    if (el.list) {
        let n = 0;
        t = t
            .split("\n")
            .map((p) => (p.trim() ? `${el.list === "number" ? `${++n}.` : "•"} ${p}` : p))
            .join("\n");
    }
    return t;
}

/** Lățimea unui șir (mm) la mărimea dată, cu spațierea literelor. */
function widthMm(font: string, s: string, sizeMm: number, spacingEm: number): number {
    if (!s) return 0;
    const chars = [...s].length;
    return (measure(font, s) / MEASURE_PX) * sizeMm + spacingEm * sizeMm * chars;
}

function wrap(font: string, text: string, sizeMm: number, spacingEm: number, maxW: number): TextLine[] {
    const out: TextLine[] = [];
    for (const para of text.split("\n")) {
        const words = para.split(/(\s+)/).filter((p) => p.length > 0);
        if (words.length === 0) {
            out.push({ text: "", width: 0 });
            continue;
        }
        let line = "";
        for (const word of words) {
            const candidate = line + word;
            if (line && /\S/.test(word) && widthMm(font, candidate.trimEnd(), sizeMm, spacingEm) > maxW + 1e-6) {
                out.push({ text: line.trimEnd(), width: widthMm(font, line.trimEnd(), sizeMm, spacingEm) });
                line = word.trimStart();
                // un singur cuvânt mai lung decât caseta: îl rupem pe litere
                while (line && widthMm(font, line, sizeMm, spacingEm) > maxW && [...line].length > 1) {
                    const chars = [...line];
                    let cut = chars.length - 1;
                    while (cut > 1 && widthMm(font, chars.slice(0, cut).join(""), sizeMm, spacingEm) > maxW) cut--;
                    const head = chars.slice(0, cut).join("");
                    out.push({ text: head, width: widthMm(font, head, sizeMm, spacingEm) });
                    line = chars.slice(cut).join("");
                }
            } else {
                line = candidate;
            }
        }
        out.push({ text: line.trimEnd(), width: widthMm(font, line.trimEnd(), sizeMm, spacingEm) });
    }
    return out;
}

const layoutCache = new Map<string, TextLayout>();

function layoutAt(el: TextEl, size: number): TextLayout {
    const font = fontString(el);
    const spacing = el.letterSpacing / 1000;
    const text = displayText(el);
    const curved = !!el.curve && Math.abs(el.curve) > 0.5;
    const lines = curved
        ? [{ text: text.replace(/\n/g, " "), width: widthMm(font, text.replace(/\n/g, " "), size, spacing) }]
        : wrap(font, text, size, spacing, Math.max(1, el.w));
    const m = fontMetrics(font);
    const asc = (m.ascent / MEASURE_PX) * size;
    const desc = (m.descent / MEASURE_PX) * size;
    const lh = el.lineHeight * size;
    const firstBaseline = (lh - (asc + desc)) / 2 + asc;
    return {
        lines,
        fontSize: size,
        lineHeightMm: lh,
        height: Math.max(lh, lines.length * lh),
        firstBaseline,
        maxWidth: Math.max(0, ...lines.map((l) => l.width)),
    };
}

export function layoutText(el: TextEl): TextLayout {
    const key = [el.text, el.uppercase ? 1 : 0, el.list ?? "", el.fontFamily, el.fontWeight, el.italic ? 1 : 0, el.fontSize, el.lineHeight, el.letterSpacing, el.w, el.autoFit ? el.h : 0, el.curve ?? 0].join("|");
    const hit = layoutCache.get(key);
    if (hit) return hit;
    let result = layoutAt(el, el.fontSize);
    if (el.autoFit) {
        // cel mai mare font (<= fontSize) la care textul încape în casetă
        const fits = (l: TextLayout) => l.height <= el.h + 1e-6 && l.maxWidth <= el.w + 1e-6 && !l.lines.some((ln, i) => i > 0 && ln.text.length === 1 && l.lines.length > 4);
        if (!fits(result)) {
            let lo = el.fontSize * 0.05;
            let hi = el.fontSize;
            for (let i = 0; i < 14; i++) {
                const mid = (lo + hi) / 2;
                if (fits(layoutAt(el, mid))) lo = mid;
                else hi = mid;
            }
            result = layoutAt(el, lo);
        }
    }
    if (layoutCache.size > 3000) layoutCache.clear();
    layoutCache.set(key, result);
    return result;
}

/** Înălțimea pe care trebuie să o aibă caseta (fără auto-fit caseta crește cu textul). */
export function textBoxHeight(el: TextEl): number {
    if (el.autoFit) return el.h;
    const l = layoutText(el);
    if (el.curve && Math.abs(el.curve) > 0.5) return curvedTextBox(el, l).h;
    return l.height;
}

/** Arcul textului curbat: raza, unghiul, săgeata arcului și caseta (mm). */
export function curvedTextBox(el: TextEl, l: TextLayout = layoutText(el)) {
    const c = Math.max(-100, Math.min(100, el.curve ?? 0));
    const textW = Math.max(1, l.maxWidth);
    // la 100 textul acoperă 330° dintr-un cerc
    const angle = Math.max(0.02, (Math.abs(c) / 100) * ((330 * Math.PI) / 180));
    const r = textW / angle;
    const sag = r * (1 - Math.cos(angle / 2));
    const chord = angle >= Math.PI ? 2 * r : 2 * r * Math.sin(angle / 2);
    const lh = l.lineHeightMm;
    const w = chord + 2 * lh * Math.sin(Math.min(angle / 2, Math.PI / 2));
    return { r, angle, sag, chord, w, h: sag + lh, up: c > 0 };
}

export async function ensureFontLoaded(family: string, weight: number, italic = false, sample = "AăÂîȘțĂ"): Promise<boolean> {
    if (typeof document === "undefined" || !document.fonts) return false;
    const spec = `${italic ? "italic " : ""}${weight} 40px "${family}"`;
    try {
        if (document.fonts.check(spec, sample)) return false;
        await document.fonts.load(spec, sample);
        return true;
    } catch {
        return false;
    }
}
