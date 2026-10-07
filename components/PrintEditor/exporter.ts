"use client";
// Exportul pentru tipar: SVG-ul documentului (același ca pe ecran) cu fonturile și pozele
// încorporate -> canvas la DPI-ul de print -> PNG (cu DPI în fișier), JPG sau PDF la mărimea
// fizică exactă (cu bleed + TrimBox / BleedBox). Textul ajunge rasterizat = fonturile sunt
// „vectorizate” în fișier, tipografia nu mai depinde de calculatorul care deschide fișierul.
import { jsPDF } from "jspdf";
import { fontByFamily, nearestWeight } from "@/lib/editor/fonts";
import { displayText } from "@/lib/editor/textLayout";
import { docSvg } from "@/lib/editor/render";
import type { EditorDoc, El } from "@/lib/editor/types";
import { srcToDataUrl } from "./assets";
import { EDITOR_BRAND } from "@/lib/editor/site";

const DPI_STEPS = [300, 240, 200, 150, 120, 100, 90, 80, 72, 60, 50];
const MAX_SIDE_PX = 16000;

export function isMobileDevice(): boolean {
    return typeof window !== "undefined" && (window.matchMedia?.("(pointer: coarse)").matches || window.innerWidth < 768);
}

/** Pixelii maximi pe care îi desenăm (memoria browserului: ~4 octeți / pixel). */
export function maxPixels(purpose: "download" | "upload" | "thumb"): number {
    if (purpose === "upload") return 24_000_000; // limita Cloudinary e 25 MP
    if (purpose === "thumb") return 400_000;
    return isMobileDevice() ? 16_000_000 : 72_000_000;
}

export function pickDpi(doc: Pick<EditorDoc, "wMm" | "hMm" | "bleedMm">, maxPx: number, cap = 300): number {
    const w = (doc.wMm + 2 * doc.bleedMm) / 25.4;
    const h = (doc.hMm + 2 * doc.bleedMm) / 25.4;
    // DPI-ul maxim care încape în memorie / limită; rotunjit în jos la o valoare uzuală
    const exact = Math.floor(Math.min(cap, Math.sqrt(maxPx / (w * h)), MAX_SIDE_PX / Math.max(w, h)));
    const step = DPI_STEPS.find((d) => d <= exact);
    return step !== undefined && step >= 150 ? step : Math.max(10, exact);
}

// ---------- Fonturi încorporate ----------
type FontFace = { family: string; weight: number; italic: boolean };

function usedFaces(doc: EditorDoc): { faces: FontFace[]; chars: Set<number> } {
    const map = new Map<string, FontFace>();
    const chars = new Set<number>();
    for (const el of doc.elements) {
        if (el.type !== "text" || el.hidden) continue;
        const font = fontByFamily(el.fontFamily);
        const weight = nearestWeight(font, el.fontWeight);
        const italic = !!el.italic && !!font.italic;
        map.set(`${font.family}|${weight}|${italic}`, { family: font.family, weight, italic });
        for (const ch of displayText(el)) chars.add(ch.codePointAt(0)!);
    }
    return { faces: [...map.values()], chars };
}

function rangeHits(range: string, chars: Set<number>): boolean {
    for (const part of range.split(",")) {
        const m = part.trim().match(/^U\+([0-9A-F?]+)(?:-([0-9A-F]+))?$/i);
        if (!m) continue;
        const lo = parseInt(m[1].replace(/\?/g, "0"), 16);
        const hi = m[2] ? parseInt(m[2], 16) : m[1].includes("?") ? parseInt(m[1].replace(/\?/g, "F"), 16) : lo;
        for (const c of chars) if (c >= lo && c <= hi) return true;
    }
    return false;
}

async function blobToDataUrl(blob: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(String(r.result));
        r.onerror = () => reject(r.error);
        r.readAsDataURL(blob);
    });
}

const fontFileCache = new Map<string, Promise<string>>();

export async function embeddedFontCss(doc: EditorDoc): Promise<string> {
    const { faces, chars } = usedFaces(doc);
    if (!faces.length) return "";
    const byFamily = new Map<string, FontFace[]>();
    for (const f of faces) byFamily.set(f.family, [...(byFamily.get(f.family) ?? []), f]);
    const params = [...byFamily.entries()].map(([family, list]) => {
        const name = family.replace(/ /g, "+");
        const font = fontByFamily(family);
        if (font.italic) {
            const pairs = list.map((f) => `${f.italic ? 1 : 0},${f.weight}`).sort();
            return `family=${name}:ital,wght@${[...new Set(pairs)].join(";")}`;
        }
        if (font.weights.length === 1 && font.weights[0] === 400) return `family=${name}`;
        return `family=${name}:wght@${[...new Set(list.map((f) => f.weight))].sort((a, b) => a - b).join(";")}`;
    });
    const res = await fetch(`https://fonts.googleapis.com/css2?${params.join("&")}&display=block`);
    if (!res.ok) throw new Error("Fonturile nu s-au putut descărca pentru export. Verifică conexiunea.");
    const css = await res.text();
    const blocks = css.match(/@font-face\s*{[^}]*}/g) ?? [];
    const out: string[] = [];
    for (const block of blocks) {
        const range = block.match(/unicode-range:\s*([^;]+);/)?.[1];
        if (range && !rangeHits(range, chars)) continue;
        const url = block.match(/url\((https:[^)]+)\)/)?.[1];
        if (!url) continue;
        if (!fontFileCache.has(url)) {
            fontFileCache.set(
                url,
                fetch(url)
                    .then((r) => {
                        if (!r.ok) throw new Error("font");
                        return r.blob();
                    })
                    .then(blobToDataUrl),
            );
        }
        const data = await fontFileCache.get(url)!;
        out.push(block.replace(url, data).replace(/font-display:\s*\w+;/, "font-display: block;"));
    }
    return out.join("\n");
}

// ---------- Poze încorporate ----------
async function inlineImages(doc: EditorDoc): Promise<EditorDoc> {
    const cache = new Map<string, Promise<string>>();
    const conv = (src: string) => {
        if (!cache.has(src)) cache.set(src, srcToDataUrl(src));
        return cache.get(src)!;
    };
    const elements: El[] = await Promise.all(
        doc.elements.map(async (el) => (el.type === "image" && el.src && !el.placeholder && !el.hidden ? { ...el, src: await conv(el.src) } : el)),
    );
    const background = doc.background.kind === "image" ? { ...doc.background, src: await conv(doc.background.src) } : doc.background;
    return { ...doc, elements, background };
}

// ---------- Randare ----------
export type RenderResult = { canvas: HTMLCanvasElement; dpi: number; widthPx: number; heightPx: number };

export async function renderDoc(doc: EditorDoc, dpi: number, opts: { includeBleed?: boolean } = {}): Promise<RenderResult> {
    const includeBleed = opts.includeBleed ?? true;
    const [fontCss, inlined] = await Promise.all([embeddedFontCss(doc), inlineImages(doc)]);
    const fullW = doc.wMm + 2 * doc.bleedMm;
    const fullH = doc.hMm + 2 * doc.bleedMm;
    const pxW = Math.max(1, Math.round((fullW / 25.4) * dpi));
    const pxH = Math.max(1, Math.round((fullH / 25.4) * dpi));
    const svg = docSvg(inlined, { resolveSrc: (s) => s, idPrefix: "x", forExport: true }, { widthPx: pxW, heightPx: pxH, fontCss });
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    try {
        const img = new Image();
        img.decoding = "sync";
        img.src = url;
        await img.decode();
        // fonturile din SVG se pot încărca după primul cadru: așteptăm puțin
        await new Promise((r) => setTimeout(r, 120));
        const bleedPx = includeBleed ? 0 : Math.round((doc.bleedMm / 25.4) * dpi);
        const canvas = document.createElement("canvas");
        canvas.width = pxW - 2 * bleedPx;
        canvas.height = pxH - 2 * bleedPx;
        const ctx = canvas.getContext("2d");
        if (!ctx || canvas.width !== pxW - 2 * bleedPx) throw new Error("Fișierul e prea mare pentru acest browser. Alege un DPI mai mic.");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, -bleedPx, -bleedPx, pxW, pxH);
        return { canvas, dpi, widthPx: canvas.width, heightPx: canvas.height };
    } finally {
        URL.revokeObjectURL(url);
    }
}

function canvasToBlob(canvas: HTMLCanvasElement, type: string, quality?: number): Promise<Blob> {
    return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? resolve(b) : reject(new Error("Exportul a eșuat (memorie insuficientă)."))), type, quality));
}

// ---------- DPI în fișier ----------
const CRC_TABLE = (() => {
    const t = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
        let c = n;
        for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
        t[n] = c >>> 0;
    }
    return t;
})();
function crc32(bytes: Uint8Array): number {
    let c = 0xffffffff;
    for (let i = 0; i < bytes.length; i++) c = CRC_TABLE[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
    return (c ^ 0xffffffff) >>> 0;
}

/** Adaugă blocul pHYs (DPI) după IHDR. */
export async function pngWithDpi(blob: Blob, dpi: number): Promise<Blob> {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const ppm = Math.round(dpi / 0.0254);
    const chunk = new Uint8Array(21);
    const dv = new DataView(chunk.buffer);
    dv.setUint32(0, 9);
    chunk.set([0x70, 0x48, 0x59, 0x73], 4); // pHYs
    dv.setUint32(8, ppm);
    dv.setUint32(12, ppm);
    chunk[16] = 1; // metri
    dv.setUint32(17, crc32(chunk.subarray(4, 17)));
    const ihdrEnd = 8 + 25; // semnătura + IHDR (4+4+13+4)
    return new Blob([bytes.subarray(0, ihdrEnd), chunk, bytes.subarray(ihdrEnd)], { type: "image/png" });
}

/** Scrie DPI-ul în antetul JFIF al JPEG-ului din canvas. */
export async function jpegWithDpi(blob: Blob, dpi: number): Promise<Uint8Array> {
    const bytes = new Uint8Array(await blob.arrayBuffer());
    if (bytes[2] === 0xff && bytes[3] === 0xe0 && bytes[6] === 0x4a && bytes[7] === 0x46) {
        bytes[13] = 1; // unități: dpi
        bytes[14] = (dpi >> 8) & 0xff;
        bytes[15] = dpi & 0xff;
        bytes[16] = (dpi >> 8) & 0xff;
        bytes[17] = dpi & 0xff;
    }
    return bytes;
}

export async function exportPng(doc: EditorDoc, dpi: number, includeBleed: boolean): Promise<Blob> {
    const r = await renderDoc(doc, dpi, { includeBleed });
    return pngWithDpi(await canvasToBlob(r.canvas, "image/png"), dpi);
}

export async function exportJpeg(doc: EditorDoc, dpi: number, includeBleed: boolean, quality = 0.92): Promise<Blob> {
    const r = await renderDoc(doc, dpi, { includeBleed });
    const bytes = await jpegWithDpi(await canvasToBlob(r.canvas, "image/jpeg", quality), dpi);
    return new Blob([bytes as BlobPart], { type: "image/jpeg" });
}

export async function exportPdf(doc: EditorDoc, dpi: number, title = `Design ${EDITOR_BRAND.name}`): Promise<Blob> {
    const r = await renderDoc(doc, dpi, { includeBleed: true });
    const jpg = await jpegWithDpi(await canvasToBlob(r.canvas, "image/jpeg", 0.95), dpi);
    r.canvas.width = 1; // eliberează memoria înainte de PDF
    const fullW = doc.wMm + 2 * doc.bleedMm;
    const fullH = doc.hMm + 2 * doc.bleedMm;
    const pdf = new jsPDF({ unit: "mm", format: [fullW, fullH], orientation: fullW >= fullH ? "landscape" : "portrait", compress: true });
    pdf.setProperties({ title, creator: `${EDITOR_BRAND.name} – editor online`, subject: `${doc.wMm / 10}×${doc.hMm / 10} cm, bleed ${doc.bleedMm} mm, ${dpi} DPI` });
    pdf.addImage(jpg, "JPEG", 0, 0, fullW, fullH, undefined, "NONE");
    // TrimBox = formatul final, BleedBox = cu bleed (în puncte, originea jos-stânga)
    const pt = (mm: number) => (mm * 72) / 25.4;
    const info = (pdf as unknown as { getPageInfo: (n: number) => { pageContext: Record<string, unknown> } }).getPageInfo(1);
    const box = (inset: number) => ({ bottomLeftX: pt(inset), bottomLeftY: pt(inset), topRightX: pt(fullW - inset), topRightY: pt(fullH - inset) });
    info.pageContext.trimBox = box(doc.bleedMm);
    info.pageContext.bleedBox = box(0);
    return pdf.output("blob");
}

export async function exportThumb(doc: EditorDoc): Promise<string> {
    const dpi = pickDpi(doc, maxPixels("thumb"), 300);
    const r = await renderDoc(doc, dpi, { includeBleed: false });
    return r.canvas.toDataURL("image/jpeg", 0.8);
}

export function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 5000);
}
