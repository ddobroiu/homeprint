// Tablouri canvas: compoziții cu poze. Pozele merg până la marginea pânzei (cei ~3 cm de pe
// margine se întind pe ramă), textele stau în zona sigură. Fără poze de stoc: casete de poză.
import { C, type Ctx, type El, type Template, cols, hline, inset, photo, rows, solid, txt, type Box } from "./kit";

const K = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["canvas"], baseW: 600, baseH: 400, fluid: true, ...t });

const gutter = (c: Ctx) => Math.max(4, c.short * 0.02);
const full = (c: Ctx): Box => ({ x: 0, y: 0, w: c.W, h: c.H });

export const CANVAS_TEMPLATES: Template[] = [
    K({
        id: "cn-o-poza",
        name: "O poză",
        background: solid("#222222"),
        build: (c) => [photo(full(c))],
    }),
    K({
        id: "cn-colaj-2",
        name: "Colaj 2 poze",
        background: solid(C.white),
        build: (c) => {
            const g = gutter(c);
            const parts = c.ar >= 1 ? cols(full(c), [1, 1], g) : rows(full(c), [1, 1], g);
            return parts.map((b) => photo(b));
        },
    }),
    K({
        id: "cn-colaj-3",
        name: "Colaj 3 poze",
        background: solid(C.white),
        build: (c) => {
            const g = gutter(c);
            if (c.ar >= 1) {
                const [big, side] = cols(full(c), [0.62, 0.38], g);
                return [photo(big), ...rows(side, [1, 1], g).map((b) => photo(b))];
            }
            const [big, bottom] = rows(full(c), [0.62, 0.38], g);
            return [photo(big), ...cols(bottom, [1, 1], g).map((b) => photo(b))];
        },
    }),
    K({
        id: "cn-colaj-4",
        name: "Colaj 4 poze",
        background: solid(C.white),
        build: (c) => {
            const g = gutter(c);
            return rows(full(c), [1, 1], g).flatMap((r) => cols(r, [1, 1], g).map((b) => photo(b)));
        },
    }),
    K({
        id: "cn-poza-citat",
        name: "Poză + citat",
        background: solid(C.cream),
        build: (c) => {
            const out: El[] = [];
            let text: Box;
            if (c.ar > 1.15) {
                const pw = c.W * 0.58;
                out.push(photo({ x: 0, y: 0, w: pw, h: c.H }));
                text = { x: pw + c.short * 0.06, y: c.inner.y, w: c.inner.x + c.inner.w - pw - c.short * 0.06, h: c.inner.h };
            } else {
                const ph = c.H * (c.ar > 0.9 ? 0.55 : 0.6);
                out.push(photo({ x: 0, y: 0, w: c.W, h: ph }));
                text = { x: c.inner.x, y: ph + c.short * 0.05, w: c.inner.w, h: c.inner.y + c.inner.h - ph - c.short * 0.05 };
            }
            const [q, quote, line, sign] = rows(inset(text, text.w * 0.04, 0), [0.14, 0.5, 0.03, 0.1], text.h * 0.04);
            out.push(
                txt("“", q, { fontFamily: "Playfair Display", fontWeight: 700, fill: solid(C.gold), lineHeight: 1 }),
                txt("Acasă e locul unde începe dragostea.", quote, { fontFamily: "Playfair Display", fontWeight: 600, italic: true, fill: solid(C.ink), lineHeight: 1.3, lines: c.ar > 1.15 ? 4 : 2 }),
                hline({ x: line.x + line.w * 0.4, y: line.y, w: line.w * 0.2, h: line.h }, C.gold, Math.max(1, c.short * 0.004)),
                txt("FAMILIA NOASTRĂ", sign, { fontWeight: 600, fill: solid(C.green), letterSpacing: 300 }),
            );
            return out;
        },
    }),
];
