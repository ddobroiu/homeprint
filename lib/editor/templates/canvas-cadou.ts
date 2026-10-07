// Tablouri canvas-cadou: nuntă, botez, familie. Poza merge până la marginea pânzei (cei ~3 cm de pe
// margine se întind pe ramă), textele stau în zona sigură. Casete de poză, fără poze de stoc.
import { C, type Ctx, type El, type Template, cols, hline, inset, photo, rect, rows, solid, txt, type Box } from "./kit";

const K = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["canvas"], baseW: 600, baseH: 400, fluid: true, ...t });

const gutter = (c: Ctx) => Math.max(4, c.short * 0.02);

/** Poza sus / în stânga și caseta de text în rest (după orientare). */
function split(c: Ctx, k: number): { pic: Box; text: Box } {
    if (c.ar > 1.15) {
        const pw = c.W * k;
        return { pic: { x: 0, y: 0, w: pw, h: c.H }, text: { x: pw + c.short * 0.05, y: c.inner.y, w: c.inner.x + c.inner.w - pw - c.short * 0.05, h: c.inner.h } };
    }
    const ph = c.H * k;
    return { pic: { x: 0, y: 0, w: c.W, h: ph }, text: { x: c.inner.x, y: ph + c.short * 0.04, w: c.inner.w, h: c.inner.y + c.inner.h - ph - c.short * 0.04 } };
}

export const CANVAS_CADOU_TEMPLATES: Template[] = [
    K({
        id: "cn-nunta",
        name: "Nuntă: poză + nume",
        background: solid("#fbf7f2"),
        build: (c) => {
            const { pic, text } = split(c, c.ar > 1.15 ? 0.6 : 0.66);
            const [names, line, date] = rows(inset(text, text.w * 0.04, text.h * 0.06), [0.55, 0.04, 0.18], text.h * 0.05);
            return [
                photo(pic),
                txt("Ana & Mihai", names, { fontFamily: "Great Vibes", fontWeight: 400, fill: solid("#5a3b2e"), lineHeight: 1.1 }),
                hline({ x: line.x + line.w * 0.38, y: line.y, w: line.w * 0.24, h: line.h }, C.gold, Math.max(1, c.short * 0.004)),
                txt("12 SEPTEMBRIE 2026", date, { fontFamily: "Cormorant Garamond", fontWeight: 600, fill: solid("#5a3b2e"), letterSpacing: 160 }),
            ];
        },
    }),
    K({
        id: "cn-botez",
        name: "Botez: poză + nume",
        background: solid("#eef4fa"),
        build: (c) => {
            const { pic, text } = split(c, c.ar > 1.15 ? 0.58 : 0.64);
            const [kicker, name, date] = rows(inset(text, text.w * 0.04, text.h * 0.06), [0.16, 0.5, 0.16], text.h * 0.05);
            return [
                photo(pic),
                txt("BOTEZUL LUI", kicker, { fontFamily: "Montserrat", fontWeight: 600, fill: solid("#6b88a8"), letterSpacing: 350 }),
                txt("Luca", name, { fontFamily: "Dancing Script", fontWeight: 700, fill: solid("#34587e"), lineHeight: 1.1 }),
                txt("3 mai 2026", date, { fontFamily: "Montserrat", fontWeight: 500, fill: solid("#6b88a8") }),
            ];
        },
    }),
    K({
        id: "cn-familie",
        name: "Familia noastră (colaj)",
        background: solid(C.white),
        build: (c) => {
            const g = gutter(c);
            const out: El[] = [];
            const titleH = Math.max(c.short * 0.16, c.H * 0.18);
            const pics: Box = { x: 0, y: 0, w: c.W, h: c.H - titleH };
            if (c.ar >= 1) {
                const [big, side] = cols(pics, [0.62, 0.38], g);
                out.push(photo(big), ...rows(side, [1, 1], g).map((b) => photo(b)));
            } else {
                const [big, bottom] = rows(pics, [0.62, 0.38], g);
                out.push(photo(big), ...cols(bottom, [1, 1], g).map((b) => photo(b)));
            }
            const band: Box = { x: 0, y: c.H - titleH, w: c.W, h: titleH };
            const t = inset({ x: c.inner.x, y: band.y, w: c.inner.w, h: Math.max(1, c.inner.y + c.inner.h - band.y) }, 0, titleH * 0.1);
            out.push(rect(band, C.white, { name: "Bandă" }), txt("Familia Popescu", t, { fontFamily: "Playfair Display", fontWeight: 700, italic: true, fill: solid(C.ink) }));
            return out;
        },
    }),
];
