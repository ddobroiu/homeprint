// Roll-up (85 / 100 / 120 / 150 × 200 cm, vertical). Structura clasică: logo sus, mesajul la
// nivelul ochilor, contactul jos — totul DEASUPRA casetei (ultimii 15 cm nu se văd; zona e
// marcată în ghidaje și lăsată doar pentru fundal).
import { C, type Ctx, type El, type Template, bullets, centered, clampAr, ellipse, hline, inset, linear, logoMark, photo, pill, rect, rows, solid, square, txt, type Box } from "./kit";

const R = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["rollup"], baseW: 850, baseH: 2000, fluid: true, ...t });

/** Cele trei zone: logo (sus), mesaj (mijloc), contact (jos, deasupra casetei). */
function zones(c: Ctx, top = 0.13, bottom = 0.12): [Box, Box, Box] {
    const a = inset(c.inner, c.inner.w * 0.02, 0);
    const [t, m, b] = rows(a, [top, 1 - top - bottom, bottom], a.h * 0.025);
    return [t, m, b];
}

/** Banda de jos (fundal), coboară peste casetă până la marginea de jos. */
const bottomBand = (c: Ctx, from: number, fill: string | ReturnType<typeof linear>): El => rect({ x: c.full.x, y: from, w: c.full.w, h: c.H + c.bleed - from }, fill, { name: "Bandă jos" });

const contact = (b: Box, lines: string, color: string): El => txt(lines, inset(b, 0, b.h * 0.12), { fill: solid(color), fontWeight: 700, lineHeight: 1.35, lines: 2 });

export const ROLLUP_TEMPLATES: Template[] = [
    R({
        id: "rl-corporate",
        name: "Corporate",
        background: solid(C.white),
        build: (c) => {
            const [top, mid, bot] = zones(c, 0.24, 0.12);
            const [logo, name, tag] = rows(top, [0.42, 0.33, 0.17], top.h * 0.04);
            const [ph, list] = rows(mid, [0.55, 0.45], mid.h * 0.05);
            return [
                rect({ x: c.full.x, y: c.full.y, w: c.full.w, h: top.y + top.h + c.inner.h * 0.02 - c.full.y }, linear(160, "#0a7a62", C.green), { name: "Bandă sus" }),
                ...logoMark(logo, C.white),
                txt("Numele firmei", name, { fill: solid(C.white), fontWeight: 800 }),
                txt("Soluții complete pentru afacerea ta", tag, { fill: solid(C.greenLight), fontWeight: 500 }),
                photo(inset(ph, 0, ph.h * 0.04), { radius: c.short * 0.03 }),
                ...bullets(inset(list, list.w * 0.08, 0), ["Consultanță", "Implementare", "Suport 24/7"], "ic-circle-check", C.green, C.ink, { fontWeight: 700, fontFamily: "Montserrat" }),
                bottomBand(c, bot.y - c.inner.h * 0.015, C.ink),
                contact(bot, "www.firma.ro\n0722 000 000", C.white),
            ];
        },
    }),
    R({
        id: "rl-conferinta",
        name: "Eveniment / conferință",
        background: linear(160, "#5b2bd6", "#1c3faa"),
        build: (c) => {
            const [top, mid, bot] = zones(c, 0.1, 0.1);
            const [kick, head, line, date, ph] = rows(mid, [0.06, 0.25, 0.02, 0.06, 0.5], mid.h * 0.025);
            return [
                ...logoMark(top, C.white),
                txt("CONFERINȚA", kick, { fill: solid("#c9d4ff"), fontWeight: 800, letterSpacing: 250 }),
                txt("Inovație\n2026", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.white), lineHeight: 1.15 }),
                hline(centered(line, line.w * 0.35, line.h), C.yellow, Math.max(2, c.short * 0.006)),
                txt("15 – 16 noiembrie · București", date, { fill: solid(C.white), fontWeight: 600 }),
                photo(clampAr(ph, 0.9, 1.4), { radius: c.short * 0.04 }),
                ...pill(centered(bot, bot.w, bot.h * 0.6), "Înscrieri: www.eveniment.ro", { bg: C.yellow, fg: "#1c3faa", fill: true, radius: bot.h * 0.15 }),
            ];
        },
    }),
    R({
        id: "rl-clinica",
        name: "Clinică / salon",
        background: solid("#f3fbfa"),
        build: (c) => {
            const [top, mid, bot] = zones(c, 0.12, 0.12);
            const [head, sub, ph, list] = rows(mid, [0.2, 0.05, 0.38, 0.28], mid.h * 0.035);
            const teal = "#0f7c8c";
            return [
                ...logoMark(top, teal),
                txt("Clinica\nZâmbet Sănătos", head, { fontFamily: "Playfair Display", fontWeight: 700, fill: solid(teal), lineHeight: 1.15 }),
                txt("Stomatologie · Estetică dentară", sub, { fontWeight: 600, fill: solid(C.ink) }),
                ellipse(square(ph), "#d5eef0", { name: "Cerc" }),
                photo(inset(square(ph), square(ph).w * 0.06), { mask: "circle" }),
                ...bullets(inset(list, list.w * 0.08, 0), ["Consultație gratuită", "Programări rapide", "Plata în rate"], "ic-circle-check", teal, C.ink, { fontWeight: 600, fontFamily: "Montserrat" }),
                bottomBand(c, bot.y - c.inner.h * 0.015, teal),
                contact(bot, "Programări: 0722 000 000\nwww.clinica.ro", C.white),
            ];
        },
    }),
    R({
        id: "rl-restaurant",
        name: "Restaurant",
        background: solid("#1d1a16"),
        build: (c) => {
            const [top, mid, bot] = zones(c, 0.11, 0.11);
            const [kick, head, ph, sub] = rows(mid, [0.05, 0.14, 0.58, 0.12], mid.h * 0.035);
            return [
                ...logoMark(top, C.gold),
                txt("BUCĂTĂRIE TRADIȚIONALĂ", kick, { fill: solid(C.gold), fontWeight: 700, letterSpacing: 200 }),
                txt("Gust autentic", head, { fontFamily: "Dancing Script", fontWeight: 700, fill: solid(C.white), lineHeight: 1.25 }),
                photo(ph, { radius: c.short * 0.02, border: { color: C.gold, width: Math.max(2, c.short * 0.006) } }),
                txt("Meniul zilei · Evenimente · Livrare", sub, { fill: solid("#e9dfc9"), fontWeight: 600, lines: 2 }),
                hline({ x: bot.x + bot.w * 0.3, y: bot.y - c.inner.h * 0.012, w: bot.w * 0.4, h: 2 }, C.gold, Math.max(2, c.short * 0.004)),
                contact(bot, "Rezervări: 0722 000 000\nstr. Exemplului 1", C.gold),
            ];
        },
    }),
    R({
        id: "rl-imobiliare",
        name: "Imobiliare",
        background: solid(C.white),
        build: (c) => {
            const [top, mid, bot] = zones(c, 0.11, 0.12);
            const [ph, head, list] = rows(mid, [0.46, 0.17, 0.3], mid.h * 0.035);
            return [
                ...logoMark(top, C.navy),
                photo({ x: c.full.x, y: ph.y, w: c.full.w, h: ph.h }),
                txt("Casa visurilor\ntale te așteaptă", head, { fontFamily: "Playfair Display", fontWeight: 700, fill: solid(C.navy), lineHeight: 1.15 }),
                ...bullets(inset(list, list.w * 0.08, 0), ["Apartamente 2 – 4 camere", "Finalizare 2027", "Credit ipotecar asistat"], "ic-house", C.gold, C.ink, { fontWeight: 600, fontFamily: "Montserrat" }),
                bottomBand(c, bot.y - c.inner.h * 0.015, C.navy),
                contact(bot, "0722 000 000\nwww.ansamblu.ro", C.white),
            ];
        },
    }),
    R({
        id: "rl-promo-produs",
        name: "Promo produs",
        background: linear(170, "#ffd60a", "#ffb703"),
        build: (c) => {
            const [top, mid, bot] = zones(c, 0.1, 0.11);
            const [kick, head, ph, offer] = rows(mid, [0.05, 0.18, 0.5, 0.14], mid.h * 0.03);
            return [
                ...logoMark(top, C.ink),
                txt("NOU ÎN MAGAZIN", kick, { fill: solid(C.red), fontWeight: 800, letterSpacing: 200 }),
                txt("NUMELE\nPRODUSULUI", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.ink), lineHeight: 1.15 }),
                photo(clampAr(ph, 0.8, 1.3), { radius: c.short * 0.03 }),
                ...pill(centered(offer, offer.w, offer.h * 0.75), "-20% la lansare", { bg: C.red, fg: C.white, fill: true, radius: offer.h * 0.18 }),
                bottomBand(c, bot.y - c.inner.h * 0.015, C.ink),
                contact(bot, "www.magazin.ro\n0722 000 000", C.yellow),
            ];
        },
    }),
];
