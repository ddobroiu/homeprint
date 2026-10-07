// Autocolante (rotunde / pătrate / dreptunghiulare, de la 3 cm la 1,5 m). Pe formatele pătrate
// designul e rotund (se poate tăia pe contur rotund); pe cele lungi devine etichetă.
// Bleed 3 mm: culoarea de fundal trece de tăietură.
import { C, type Ctx, type Template, centered, chord, cols, deco, ellipse, hline, icon, inset, linear, logoMark, rect, rows, shape, solid, square, txt, type Box } from "./kit";

const A = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["autocolante"], baseW: 100, baseH: 100, fluid: true, ...t });

/** Pătrat / rotund (raport 0,8 … 1,25) sau etichetă lungă. */
const round = (c: Ctx) => c.ar > 0.8 && c.ar < 1.25;

/** Cercul autocolantului rotund (până la tăietură) și zona de text din el. */
function disc(c: Ctx): { d: Box; t: Box; fit: (b: Box) => Box } {
    const d = square({ x: 0, y: 0, w: c.W, h: c.H });
    return { d, t: inset(d, d.w * 0.14), fit: (b: Box) => chord(d, b, 0.84) };
}

/** Eticheta lungă: zona de text și o zonă pătrată pentru iconiță. */
function label(c: Ctx): { icon: Box; text: Box } {
    const w = inset(c.inner, c.short * 0.06);
    if (c.ar >= 1) {
        const [a, b] = cols(w, [w.h, w.w - w.h], w.h * 0.25);
        return { icon: a, text: b };
    }
    const [a, b] = rows(w, [w.w, w.h - w.w], w.w * 0.25);
    return { icon: a, text: b };
}

export const AUTOCOLANT_TEMPLATES: Template[] = [
    A({
        id: "au-logo",
        name: "Etichetă cu logo",
        background: solid(C.white),
        build: (c) => {
            if (round(c)) {
                const { d, t, fit } = disc(c);
                const [logo, name, web] = rows(t, [0.45, 0.25, 0.15], t.h * 0.05);
                return [ellipse(inset(d, -c.bleed), C.green, { name: "Fond rotund" }), ellipse(inset(d, d.w * 0.05), null, { stroke: { color: C.gold, width: d.w * 0.012 } }), ...logoMark(fit(logo), C.white), txt("NUMELE FIRMEI", fit(name), { fill: solid(C.white), fontWeight: 800, letterSpacing: 80 }), txt("www.firma.ro", fit(web), { fill: solid(C.greenLight), fontWeight: 500 })];
            }
            const l = label(c);
            const [name, web] = rows(l.text, [0.6, 0.3], l.text.h * 0.08);
            return [rect({ x: -c.bleed, y: -c.bleed, w: c.W + 2 * c.bleed, h: c.H + 2 * c.bleed }, C.green, { name: "Fond" }), ...logoMark(l.icon, C.white, { ar: 1.4 }), txt("NUMELE FIRMEI", name, { fill: solid(C.white), fontWeight: 800, letterSpacing: 60, align: c.ar >= 1 ? "left" : "center" }), txt("www.firma.ro", web, { fill: solid(C.greenLight), fontWeight: 500, align: c.ar >= 1 ? "left" : "center" })];
        },
    }),
    A({
        id: "au-multumim",
        name: "Mulțumim!",
        background: solid("#fde8ef"),
        build: (c) => {
            if (round(c)) {
                const { d, t, fit } = disc(c);
                const [ic, head, sub] = rows(t, [0.24, 0.42, 0.16], t.h * 0.04);
                return [ellipse(inset(d, -c.bleed), "#e85d8a", { name: "Fond rotund" }), icon("ic-heart", ic, C.white, { strokeScale: 1.3 }), txt("Mulțumim!", fit(head), { fontFamily: "Pacifico", fontWeight: 400, fill: solid(C.white), lineHeight: 1.4 }), txt("PENTRU COMANDĂ", fit(sub), { fill: solid("#ffe3ec"), fontWeight: 700, letterSpacing: 150 })];
            }
            const l = label(c);
            const [head, sub] = rows(l.text, [0.62, 0.26], l.text.h * 0.06);
            return [icon("pc-hearts", l.icon, "#e85d8a"), txt("Mulțumim!", head, { fontFamily: "Pacifico", fontWeight: 400, fill: solid("#c2185b"), lineHeight: 1.4 }), txt("că ai ales produsele noastre", sub, { fill: solid(C.ink), fontWeight: 600 })];
        },
    }),
    A({
        id: "au-pret",
        name: "Preț / promo",
        background: solid(C.yellow),
        build: (c) => {
            if (round(c)) {
                const { d, fit } = disc(c);
                const t = inset(d, d.w * 0.2);
                const [k, p, s] = rows(t, [0.2, 0.5, 0.18], t.h * 0.03);
                return [shape("star", inset(d, -c.bleed), C.red, { points: 18, name: "Insignă" }), txt("DOAR", fit(k), { fill: solid(C.yellow), fontWeight: 800, letterSpacing: 150 }), txt("49,99", fit(p), { fontFamily: "Anton", fontWeight: 400, fill: solid(C.white) }), txt("LEI", fit(s), { fill: solid(C.yellow), fontWeight: 800, letterSpacing: 150 })];
            }
            const w = inset(c.inner, c.short * 0.06);
            const [a, b] = c.ar >= 1 ? cols(w, [0.55, 0.45], w.w * 0.04) : rows(w, [0.55, 0.45], w.h * 0.04);
            const [k, p] = rows(a, [0.3, 0.7], a.h * 0.03);
            return [txt("REDUCERE", k, { fill: solid(C.ink), fontWeight: 800, letterSpacing: 120 }), txt("-25%", p, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.red) }), txt("la al doilea produs", b, { fill: solid(C.ink), fontWeight: 700, lines: 2, lineHeight: 1.2 })];
        },
    }),
    A({
        id: "au-qr",
        name: "Cod QR",
        background: solid(C.white),
        build: (c) => {
            if (round(c)) {
                const { d, t, fit } = disc(c);
                const [qr, lab] = rows(inset(t, t.w * 0.05, 0), [0.7, 0.2], t.h * 0.05);
                return [ellipse(inset(d, d.w * 0.02), null, { stroke: { color: C.ink, width: d.w * 0.025 } }), icon("ic-qr-code", qr, C.ink), txt("SCANEAZĂ-MĂ", fit(lab), { fill: solid(C.ink), fontWeight: 800, letterSpacing: 120 })];
            }
            const l = label(c);
            const [head, sub] = rows(l.text, [0.55, 0.35], l.text.h * 0.06);
            return [icon("ic-qr-code", l.icon, C.ink), txt("Scanează codul", head, { fill: solid(C.ink), fontWeight: 800, align: c.ar >= 1 ? "left" : "center" }), txt("meniu · recenzii · Wi-Fi", sub, { fill: solid(C.gray), fontWeight: 600, align: c.ar >= 1 ? "left" : "center" })];
        },
    }),
    A({
        id: "au-artizanal",
        name: "Produse artizanale",
        background: solid("#f3ead8"),
        build: (c) => {
            const brown = "#6b4423";
            if (round(c)) {
                const { d, t, fit } = disc(c);
                const [kick, head, line, sub] = rows(t, [0.14, 0.4, 0.04, 0.16], t.h * 0.05);
                return [
                    ellipse(inset(d, d.w * 0.04), null, { stroke: { color: brown, width: d.w * 0.01, dash: "dash" } }),
                    txt("FĂCUT ÎN CASĂ", fit(kick), { fill: solid(brown), fontWeight: 700, letterSpacing: 200 }),
                    txt("Dulceață de caise", fit(head), { fontFamily: "Lora", fontWeight: 700, italic: true, fill: solid(brown), lineHeight: 1.15, lines: 2 }),
                    deco("pc-lineOrnament", centered(line, line.w * 0.5, line.h), brown),
                    txt("350 g · 2026", fit(sub), { fill: solid(brown), fontWeight: 600 }),
                ];
            }
            const w = inset(c.inner, c.short * 0.06);
            const [kick, head, sub] = rows(w, [0.2, 0.5, 0.2], w.h * 0.04);
            return [
                rect(inset(c.inner, -c.short * 0.02), null, { stroke: { color: brown, width: c.short * 0.012, dash: "dash" }, radius: c.short * 0.06 }),
                txt("FĂCUT ÎN CASĂ", kick, { fill: solid(brown), fontWeight: 700, letterSpacing: 200 }),
                txt("Dulceață de caise", head, { fontFamily: "Lora", fontWeight: 700, italic: true, fill: solid(brown), lineHeight: 1.15 }),
                txt("350 g · fără conservanți", sub, { fill: solid(brown), fontWeight: 600 }),
            ];
        },
    }),
    A({
        id: "au-ambalaj",
        name: "Sigiliu ambalaj",
        background: linear(135, C.ink, "#2b3d36"),
        build: (c) => {
            if (round(c)) {
                const { d, t, fit } = disc(c);
                const [ic, head, sub] = rows(t, [0.26, 0.3, 0.26], t.h * 0.04);
                return [
                    ellipse(inset(d, d.w * 0.05), null, { stroke: { color: C.gold, width: d.w * 0.01 } }),
                    icon("ic-gift", ic, C.gold, { strokeScale: 1.2 }),
                    txt("Ambalat cu grijă", fit(head), { fontFamily: "Playfair Display", fontWeight: 700, italic: true, fill: solid(C.white), lines: 2, lineHeight: 1.15 }),
                    txt("NU DESCHIDE\nÎNAINTE DE LIVRARE", fit(sub), { fill: solid(C.gold), fontWeight: 700, letterSpacing: 80, lineHeight: 1.3 }),
                ];
            }
            const l = label(c);
            const [head, line, sub] = rows(l.text, [0.5, 0.04, 0.3], l.text.h * 0.06);
            return [
                icon("ic-gift", l.icon, C.gold, { strokeScale: 1.2 }),
                txt("Ambalat cu grijă", head, { fontFamily: "Playfair Display", fontWeight: 700, italic: true, fill: solid(C.white), align: c.ar >= 1 ? "left" : "center" }),
                hline({ ...line, w: line.w * 0.3, x: c.ar >= 1 ? line.x : line.x + line.w * 0.35 }, C.gold, c.short * 0.01),
                txt("SIGILIU DE GARANȚIE", sub, { fill: solid(C.gold), fontWeight: 700, letterSpacing: 120, align: c.ar >= 1 ? "left" : "center" }),
            ];
        },
    }),
];

