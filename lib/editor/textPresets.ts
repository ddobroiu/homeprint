// Stiluri de text gata făcute (un clic -> text editabil pe planșă), dimensionate după format.
import { S, T, linear, solid } from "./builders";
import { normalizeText, uid } from "./doc";
import type { EditorDoc, El, TextEl } from "./types";

export type TextPreset = {
    id: string;
    label: string;
    /** previzualizarea din panou */
    preview: { text: string; family: string; weight: number; color: string; bg?: string; stroke?: string; italic?: boolean; spacing?: number };
    /** elementele, la un format de referință cu latura mică = 100 mm */
    build: () => El[];
};

const GREEN = "#075746";
const INK = "#14211c";
const RED = "#d62828";
const YELLOW = "#ffd60a";

export const TEXT_PRESETS: TextPreset[] = [
    { id: "titlu", label: "Titlu", preview: { text: "Adaugă un titlu", family: "Montserrat", weight: 800, color: INK }, build: () => [T("Adaugă un titlu", 0, 0, 160, 14, { fill: solid(INK) })] },
    { id: "subtitlu", label: "Subtitlu", preview: { text: "Adaugă un subtitlu", family: "Montserrat", weight: 600, color: INK }, build: () => [T("Adaugă un subtitlu", 0, 0, 150, 8, { fontWeight: 600, fill: solid(INK) })] },
    { id: "corp", label: "Text", preview: { text: "Adaugă un paragraf", family: "Open Sans", weight: 400, color: INK }, build: () => [T("Adaugă un paragraf de text. Scrie aici detaliile ofertei tale.", 0, 0, 120, 4.5, { fontFamily: "Open Sans", fontWeight: 400, lineHeight: 1.45, fill: solid(INK) })] },
    {
        id: "angajam",
        label: "Angajăm",
        preview: { text: "ANGAJĂM", family: "Anton", weight: 400, color: YELLOW, bg: INK },
        build: () => [T("ANGAJĂM", 0, 0, 150, 26, { fontFamily: "Anton", fontWeight: 400, fill: solid(YELLOW), bg: { color: INK, padding: 22, radius: 8 }, letterSpacing: 20 })],
    },
    {
        id: "reduceri",
        label: "Reduceri",
        preview: { text: "REDUCERI", family: "Anton", weight: 400, color: RED, stroke: "#ffffff" },
        build: () => [T("REDUCERI", 0, 0, 170, 28, { fontFamily: "Anton", fontWeight: 400, fill: solid(RED), stroke: { color: "#ffffff", width: 5 }, shadow: { color: "#000000", blur: 2, dx: 1.2, dy: 1.2, opacity: 0.35 } })],
    },
    {
        id: "procent",
        label: "-50%",
        preview: { text: "-50%", family: "Anton", weight: 400, color: "#ffffff", bg: RED },
        build: () => [S("star", 0, 0, 60, 60, YELLOW, { points: 16 }), T("-50%", 8, 21, 44, 15, { fontFamily: "Anton", fontWeight: 400, fill: solid(RED) })],
    },
    {
        id: "deschidere",
        label: "Deschidere",
        preview: { text: "Deschidere", family: "Great Vibes", weight: 400, color: "#b88a2e" },
        build: () => [
            T("Deschidere", 0, 0, 160, 22, { fontFamily: "Great Vibes", fontWeight: 400, fill: linear(90, "#d8b45a", "#a5781f"), lineHeight: 1.3 }),
            T("OFICIALĂ", 0, 30, 160, 7, { fontWeight: 700, fill: solid(INK), letterSpacing: 400 }),
        ],
    },
    {
        id: "de-vanzare",
        label: "De vânzare",
        preview: { text: "DE VÂNZARE", family: "Archivo Black", weight: 400, color: "#ffffff", bg: RED },
        build: () => [T("DE VÂNZARE", 0, 0, 170, 18, { fontFamily: "Archivo Black", fontWeight: 400, fill: solid("#ffffff"), bg: { color: RED, padding: 25, radius: 0 } })],
    },
    { id: "elegant", label: "Elegant", preview: { text: "Elegant", family: "Playfair Display", weight: 700, color: INK, italic: true }, build: () => [T("Ceva elegant", 0, 0, 150, 16, { fontFamily: "Playfair Display", fontWeight: 700, italic: true, fill: solid(INK) })] },
    {
        id: "contur",
        label: "Contur gros",
        preview: { text: "CONTUR", family: "Bebas Neue", weight: 400, color: "#ffffff", stroke: INK },
        build: () => [T("CONTUR GROS", 0, 0, 170, 24, { fontFamily: "Bebas Neue", fontWeight: 400, fill: solid("#ffffff"), stroke: { color: INK, width: 8 }, letterSpacing: 30 })],
    },
    {
        id: "umbra3d",
        label: "Umbră 3D",
        preview: { text: "BOOM!", family: "Bangers", weight: 400, color: YELLOW, stroke: INK },
        build: () => [T("SUPER OFERTĂ!", 0, 0, 170, 22, { fontFamily: "Bangers", fontWeight: 400, fill: solid(YELLOW), stroke: { color: INK, width: 4 }, shadow: { color: INK, blur: 0, dx: 2.2, dy: 2.2, opacity: 1 }, letterSpacing: 40 })],
    },
    {
        id: "neon",
        label: "Neon",
        preview: { text: "Neon", family: "Montserrat", weight: 800, color: "#e8fdff", bg: "#101826" },
        build: () => [T("NEON", 0, 0, 120, 22, { fontWeight: 800, fill: solid("#e8fdff"), shadow: { color: "#00e5ff", blur: 4, dx: 0, dy: 0, opacity: 1 }, letterSpacing: 120 })],
    },
    { id: "arc", label: "Text pe arc", preview: { text: "Pe arc", family: "Montserrat", weight: 800, color: GREEN }, build: () => [T("TEXT PE ARC · TEXT PE ARC", 0, 0, 150, 9, { fontWeight: 800, fill: solid(GREEN), curve: 45, letterSpacing: 80 })] },
    { id: "script", label: "Scris de mână", preview: { text: "Mulțumim", family: "Pacifico", weight: 400, color: GREEN }, build: () => [T("Mulțumim!", 0, 0, 140, 18, { fontFamily: "Pacifico", fontWeight: 400, fill: solid(GREEN), lineHeight: 1.4 })] },
    {
        id: "gradient",
        label: "Gradient",
        preview: { text: "Gradient", family: "Montserrat", weight: 900, color: "#ff5f6d" },
        build: () => [T("Culori vii", 0, 0, 160, 20, { fontWeight: 900, fill: linear(0, "#ff9a3c", "#ff5f6d", "#c13584") })],
    },
    { id: "spatiat", label: "Spațiat", preview: { text: "S P A Ț I A T", family: "Montserrat", weight: 600, color: INK, spacing: 400 }, build: () => [T("COLECȚIA NOUĂ", 0, 0, 170, 7, { fontWeight: 600, fill: solid(INK), letterSpacing: 400 })] },
    { id: "telefon", label: "Telefon", preview: { text: "0722 000 000", family: "Oswald", weight: 700, color: GREEN }, build: () => [T("0722 000 000", 0, 0, 150, 16, { fontFamily: "Oswald", fontWeight: 700, fill: solid(GREEN), letterSpacing: 30 })] },
    {
        id: "oferta",
        label: "Ofertă specială",
        preview: { text: "Ofertă", family: "Kaushan Script", weight: 400, color: RED },
        build: () => [
            T("Ofertă", 0, 0, 150, 18, { fontFamily: "Kaushan Script", fontWeight: 400, fill: solid(RED), lineHeight: 1.3 }),
            T("SPECIALĂ", 0, 22, 150, 12, { fontFamily: "Anton", fontWeight: 400, fill: solid(INK), letterSpacing: 120 }),
        ],
    },
    { id: "black", label: "Black Friday", preview: { text: "BLACK FRIDAY", family: "Archivo Black", weight: 400, color: "#ffffff", bg: "#0d0d0d" }, build: () => [T("BLACK FRIDAY", 0, 0, 170, 15, { fontFamily: "Archivo Black", fontWeight: 400, fill: solid("#ffffff"), bg: { color: "#0d0d0d", padding: 30, radius: 6 } })] },
    { id: "retro", label: "Retro", preview: { text: "Retro", family: "Alfa Slab One", weight: 400, color: "#f4a261", stroke: "#264653" }, build: () => [T("Retro", 0, 0, 140, 22, { fontFamily: "Alfa Slab One", fontWeight: 400, fill: solid("#f4a261"), shadow: { color: "#264653", blur: 0, dx: 1.8, dy: 1.8, opacity: 1 } })] },
    { id: "copii", label: "Jucăuș", preview: { text: "Petrecere", family: "Baloo 2", weight: 800, color: "#7a5cff" }, build: () => [T("Petrecere!", 0, 0, 150, 18, { fontFamily: "Baloo 2", fontWeight: 800, fill: linear(0, "#7a5cff", "#ff7eb3"), curve: 18 })] },
    { id: "citat", label: "Citat", preview: { text: "„Citat”", family: "Cormorant Garamond", weight: 600, color: INK, italic: true }, build: () => [T("„Simplitatea este rafinamentul suprem.”", 0, 0, 140, 9, { fontFamily: "Cormorant Garamond", fontWeight: 600, italic: true, fill: solid(INK), lineHeight: 1.3 })] },
];

/** Pune presetarea în mijlocul planșei, scalată după format; elementele multiple se grupează. */
export function placePreset(preset: TextPreset, doc: EditorDoc): El[] {
    const scale = Math.min(doc.wMm, doc.hMm) / 100;
    const maxW = doc.wMm - 2 * doc.safeMm;
    let els = preset.build().map((el) => {
        const next = { ...el, x: el.x * scale, y: el.y * scale, w: el.w * scale, h: el.h * scale } as El;
        if (next.type === "text") {
            next.fontSize = (el as TextEl).fontSize * scale;
            return normalizeText(next);
        }
        if (next.type === "shape" && next.stroke) next.stroke = { ...next.stroke, width: next.stroke.width * scale };
        if ("shadow" in next && next.shadow) next.shadow = { ...next.shadow, blur: next.shadow.blur * scale, dx: next.shadow.dx * scale, dy: next.shadow.dy * scale };
        return next;
    });
    // nu mai lat decât zona sigură
    const w0 = Math.max(...els.map((e) => e.x + e.w)) - Math.min(...els.map((e) => e.x));
    if (w0 > maxW) {
        const k = maxW / w0;
        els = els.map((e) => {
            const n = { ...e, x: e.x * k, y: e.y * k, w: e.w * k, h: e.h * k } as El;
            if (n.type === "text") {
                n.fontSize = (e as TextEl).fontSize * k;
                return normalizeText(n);
            }
            return n;
        });
    }
    // centrare pe orizontală (fiecare element pe axa comună) și pe verticală (blocul)
    const minY = Math.min(...els.map((e) => e.y));
    const maxY = Math.max(...els.map((e) => e.y + e.h));
    const dy = (doc.hMm - (maxY - minY)) / 2 - minY;
    const cxAll = (Math.min(...els.map((e) => e.x)) + Math.max(...els.map((e) => e.x + e.w))) / 2;
    const dx = doc.wMm / 2 - cxAll;
    const group = els.length > 1 ? uid() : undefined;
    return els.map((e) => ({ ...e, id: uid(), x: e.x + dx, y: e.y + dy, groupId: group }));
}
