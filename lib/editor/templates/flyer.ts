// Flyere (A6, A5 verticale și 21×10 cm culcat). Bleed 3 mm, text la cel puțin 5 mm de tăietură,
// corp de text de minimum ~8 pt. Pentru flyerele față-verso: șabloanele marcate „verso”.
import { C, type Ctx, type El, type Template, band, bullets, centered, cols, hline, icon, iconLine, inset, linear, logoMark, photo, pill, estWidth, rect, rows, shape, solid, txt, type Box } from "./kit";

const F = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["flayere"], baseW: 148, baseH: 210, fluid: true, ...t });

const work = (c: Ctx) => inset(c.inner, c.short * 0.03, c.short * 0.03);
const wide = (c: Ctx) => c.ar > 1.2;

/** Poza (până în bleed) + zona de text: sus/jos pe vertical, stânga/dreapta pe culcat. */
function mediaSplit(c: Ctx, k: number): { media: Box; text: Box } {
    const w = work(c);
    if (wide(c)) {
        const mw = c.W * k;
        return { media: { x: c.full.x, y: c.full.y, w: mw + c.bleed, h: c.full.h }, text: { x: mw + c.short * 0.06, y: w.y, w: w.x + w.w - mw - c.short * 0.06, h: w.h } };
    }
    const mh = c.H * k;
    return { media: { x: c.full.x, y: c.full.y, w: c.full.w, h: mh + c.bleed }, text: { x: w.x, y: mh + c.short * 0.05, w: w.w, h: w.y + w.h - mh - c.short * 0.05 } };
}

export const FLYER_TEMPLATES: Template[] = [
    F({
        id: "fl-promo",
        name: "Ofertă specială",
        background: solid(C.white),
        build: (c) => {
            const { media, text } = mediaSplit(c, 0.44);
            const [head, body, cta] = rows(text, [0.3, 0.36, 0.2], text.h * 0.06);
            const bs = c.short * 0.27;
            const bx = wide(c) ? media.x + media.w - bs * 1.1 : c.W - c.inner.x - bs;
            const by = wide(c) ? c.inner.y : media.y + media.h - bs * 1.15;
            return [
                photo(media),
                ellipse({ x: bx, y: by, w: bs, h: bs }, C.red, "ins"),
                txt("-30%", { x: bx + bs * 0.15, y: by + bs * 0.3, w: bs * 0.7, h: bs * 0.4 }, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.white), groupId: "ins" }),
                txt("OFERTĂ SPECIALĂ", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.ink), letterSpacing: 20, lineHeight: 1.15 }),
                txt("Descrie pe scurt oferta: ce primește clientul, până când e valabilă și de ce merită.", body, { fontFamily: "Open Sans", fontWeight: 500, fill: solid(C.gray), lineHeight: 1.4, lines: 4 }),
                ...pill(cta, "0722 000 000", { bg: C.green, fg: C.white, icon: "ic-phone" }),
            ];
        },
    }),
    F({
        id: "fl-meniu",
        name: "Meniul zilei",
        background: solid(C.cream),
        build: (c) => {
            const w = work(c);
            const out: El[] = [];
            let menu: Box;
            let cta: Box;
            if (wide(c)) {
                const [l, r] = cols(w, [0.38, 0.62], w.w * 0.05);
                const [ic, head, price] = rows(l, [0.25, 0.4, 0.25], l.h * 0.05);
                out.push(icon("ic-utensils", ic, C.green), txt("Meniul zilei", head, { fontFamily: "Dancing Script", fontWeight: 700, fill: solid(C.green), lineHeight: 1.25, lines: 2 }));
                out.push(...pill(centered(price, price.w * 0.8, price.h), "35 lei", { bg: C.green, fg: C.white }));
                [menu, cta] = rows(r, [0.78, 0.16], r.h * 0.04);
            } else {
                const [ic, head, line, m, price, ct] = rows(w, [0.08, 0.13, 0.01, 0.48, 0.09, 0.06], w.h * 0.025);
                out.push(icon("ic-utensils", ic, C.green), txt("Meniul zilei", head, { fontFamily: "Dancing Script", fontWeight: 700, fill: solid(C.green), lineHeight: 1.25 }), hline(centered(line, line.w * 0.35, line.h), C.gold, c.short * 0.006));
                out.push(...pill(centered(price, price.w * 0.5, price.h), "35 lei", { bg: C.green, fg: C.white }));
                menu = m;
                cta = ct;
            }
            out.push(
                txt("Ciorbă de perișoare\nSnițel de pui cu piure\nSalată de varză\nPapanași cu smântână", menu, { fontFamily: "Lora", fontWeight: 500, fill: solid(C.ink), lineHeight: 1.7 }),
                txt("Comenzi: 0722 000 000", cta, { fontWeight: 700, fill: solid(C.ink) }),
            );
            return out;
        },
    }),
    F({
        id: "fl-petrecere",
        name: "Petrecere / eveniment",
        background: linear(160, "#ff4fa3", "#6a1b9a"),
        build: (c) => {
            const w = work(c);
            const s = c.short * 0.12;
            const area = inset(w, 0, 0);
            const [kick, head, date, place, cta] = wide(c) ? rows(inset(area, s, 0), [0.12, 0.4, 0.14, 0.12, 0.18], area.h * 0.03) : rows(inset(area, s * 0.9, 0), [0.06, 0.34, 0.08, 0.1, 0.1], area.h * 0.05);
            return [
                icon("pc-confetti", { x: w.x, y: w.y, w: s, h: s }, "#fff3b0"),
                icon("pc-sparkles", { x: w.x + w.w - s, y: w.y + w.h - s, w: s, h: s }, "#fff3b0"),
                txt("TE INVITĂM LA", kick, { fill: solid("#ffe0ef"), fontWeight: 700, letterSpacing: 250 }),
                txt("PETRECEREA\nANULUI", head, { fontFamily: "Bebas Neue", fontWeight: 400, fill: solid(C.white), letterSpacing: 30, lineHeight: 1.05 }),
                txt("Sâmbătă, 25 octombrie · 21:00", date, { fill: solid(C.white), fontWeight: 700 }),
                txt("Club Exemplu, str. Muzicii 7\nDJ · Tombolă · Surprize", place, { fill: solid("#ffe0ef"), fontWeight: 500, lineHeight: 1.35 }),
                ...pill(centered(cta, cta.w * 0.75, cta.h), "Rezervări: 0722 000 000", { bg: C.yellow, fg: "#6a1b9a" }),
            ];
        },
    }),
    F({
        id: "fl-servicii",
        name: "Servicii firmă",
        background: solid(C.white),
        build: (c) => {
            const w = work(c);
            const out: El[] = [];
            if (wide(c)) {
                const [l, r] = cols(w, [0.42, 0.58], w.w * 0.05);
                out.push(rect({ x: c.full.x, y: c.full.y, w: l.x + l.w + w.w * 0.025 - c.full.x, h: c.full.h }, C.navy, { name: "Bandă" }));
                const [logo, head, sub] = rows(l, [0.25, 0.4, 0.2], l.h * 0.05);
                out.push(...logoMark(logo, C.white), txt("Instalații\n& Reparații", head, { fill: solid(C.white), fontWeight: 800, lineHeight: 1.15 }), txt("Intervenții rapide", sub, { fill: solid("#cdd9f5"), fontWeight: 500 }));
                const [list, cta] = rows(r, [0.72, 0.2], r.h * 0.06);
                out.push(...bullets(list, ["Instalații sanitare", "Instalații electrice", "Centrale termice", "Mici reparații"], "ic-wrench", C.orange, C.ink, { fontWeight: 600 }));
                out.push(...pill(cta, "0722 000 000", { bg: C.orange, fg: C.white, icon: "ic-phone" }));
            } else {
                const top = c.H * 0.34;
                out.push(rect({ x: c.full.x, y: c.full.y, w: c.full.w, h: top - c.full.y }, C.navy, { name: "Bandă" }));
                const [logo, head, sub] = rows({ x: w.x, y: w.y, w: w.w, h: top - w.y - c.short * 0.04 }, [0.28, 0.46, 0.14], c.short * 0.02);
                out.push(...logoMark(logo, C.white), txt("Instalații\n& Reparații", head, { fill: solid(C.white), fontWeight: 800, lineHeight: 1.15 }), txt("Intervenții rapide", sub, { fill: solid("#cdd9f5"), fontWeight: 500 }));
                const [list, cta] = rows({ x: w.x, y: top + c.short * 0.06, w: w.w, h: w.y + w.h - top - c.short * 0.06 }, [0.72, 0.16], c.short * 0.05);
                out.push(...bullets(inset(list, list.w * 0.06, 0), ["Instalații sanitare", "Instalații electrice", "Centrale termice", "Mici reparații"], "ic-wrench", C.orange, C.ink, { fontWeight: 600 }));
                out.push(...pill(cta, "0722 000 000", { bg: C.orange, fg: C.white, icon: "ic-phone" }));
            }
            return out;
        },
    }),
    F({
        id: "fl-cupon",
        name: "Cupon de reducere",
        background: solid(C.yellow),
        build: (c) => {
            const w = work(c);
            const cutAt = wide(c) ? c.W * 0.6 : c.H * 0.72;
            const out: El[] = [];
            const [main, coupon] = wide(c) ? [{ ...w, w: cutAt - w.x - c.short * 0.05 }, { x: cutAt + c.short * 0.05, y: w.y, w: w.x + w.w - cutAt - c.short * 0.05, h: w.h }] : [{ ...w, h: cutAt - w.y - c.short * 0.05 }, { x: w.x, y: cutAt + c.short * 0.05, w: w.w, h: w.y + w.h - cutAt - c.short * 0.05 }];
            const [kick, head, sub] = rows(main, [0.14, 0.5, 0.24], main.h * 0.05);
            out.push(
                txt("CU ACEST FLYER PRIMEȘTI", kick, { fill: solid(C.ink), fontWeight: 700, letterSpacing: 120 }),
                txt("-15%", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.red) }),
                txt("la prima comandă în magazinul nostru", sub, { fill: solid(C.ink), fontWeight: 600, lines: 2, lineHeight: 1.3 }),
                wide(c)
                    ? rect({ x: cutAt, y: c.full.y, w: 0.01, h: c.full.h }, null, { stroke: { color: C.ink, width: 0.5, dash: "dash" }, name: "Linie de tăiere" })
                    : hline({ x: c.full.x, y: cutAt, w: c.full.w, h: 0 }, C.ink, 0.5, { stroke: { color: C.ink, width: 0.5, dash: "dash" }, name: "Linie de tăiere" }),
                icon("ic-scissors", { x: wide(c) ? cutAt - c.short * 0.035 : w.x, y: wide(c) ? w.y : cutAt - c.short * 0.035, w: c.short * 0.07, h: c.short * 0.07 }, C.ink, { rotation: wide(c) ? 90 : 0 }),
            );
            const [code, valid] = rows(coupon, wide(c) ? [0.35, 0.3] : [0.6, 0.3], coupon.h * 0.08);
            out.push(...pill(code, "COD: SALUT15", { bg: C.ink, fg: C.yellow, fill: true, radius: code.h * 0.15, font: "Oswald", weight: 700, spacing: 60 }));
            out.push(txt("Valabil până la 31 decembrie", valid, { fill: solid(C.ink), fontWeight: 500 }));
            return out;
        },
    }),
    F({
        id: "fl-curs",
        name: "Curs / atelier",
        background: solid("#eef6ff"),
        build: (c) => {
            const { media, text } = mediaSplit(c, 0.4);
            const [kick, head, info, cta] = rows(text, [0.1, 0.32, 0.26, 0.16], text.h * 0.05);
            return [
                photo(media),
                txt("ÎNSCRIERI DESCHISE", kick, { fill: solid(C.blue), fontWeight: 800, letterSpacing: 150 }),
                txt("Atelier de pictură pentru copii", head, { fontFamily: "Baloo 2", fontWeight: 800, fill: solid(C.navy), lines: 2, lineHeight: 1.1 }),
                txt("Sâmbăta, 10:00 – 12:00 · 7–12 ani\nMateriale incluse · locuri limitate", info, { fontWeight: 500, fill: solid(C.ink), fontFamily: "Inter", lineHeight: 1.4 }),
                ...pill(cta, "0722 000 000", { bg: C.blue, fg: C.white, icon: "ic-phone" }),
            ];
        },
    }),
    F({
        id: "fl-verso-contact",
        name: "Contact și program",
        side: "verso",
        background: solid(C.white),
        build: (c) => {
            const w = work(c);
            const out: El[] = [band(c, c.full.y, c.inner.y * 0.9 - c.full.y + c.short * 0.02, C.green)];
            const info = ["str. Exemplului nr. 1, București", "0722 000 000", "contact@firma.ro", "www.firma.ro"];
            const refs = ["ic-map-pin", "ic-phone", "ic-mail", "ic-globe"];
            const list = (b: Box) => {
                const rs = rows(b, info.map(() => 1), b.h * 0.12);
                return rs.flatMap((r, i) => iconLine(r, refs[i], info[i], C.green, C.ink, { max: Math.min(r.h, c.short * 0.06) }));
            };
            if (wide(c)) {
                const [l, r] = cols(inset(w, 0, w.h * 0.06), [0.58, 0.42], w.w * 0.06);
                const [head, li] = rows(l, [0.2, 0.75], l.h * 0.05);
                out.push(txt("Unde ne găsești", head, { fill: solid(C.green), fontWeight: 800, align: "left" }), ...list(li));
                const [ph, hours] = rows(r, [0.45, 0.45], r.h * 0.05);
                out.push(icon("ic-qr-code", ph, C.ink), txt("Luni – Vineri 09–18\nSâmbătă 10–14", hours, { fill: solid(C.ink), fontWeight: 600, lineHeight: 1.4 }));
            } else {
                const [head, li, hours, qr] = rows(inset(w, 0, w.h * 0.04), [0.08, 0.36, 0.14, 0.2], w.h * 0.05);
                out.push(txt("Unde ne găsești", head, { fill: solid(C.green), fontWeight: 800 }), ...list(inset(li, li.w * 0.04, 0)));
                out.push(txt("Program: Luni – Vineri 09–18\nSâmbătă 10–14", hours, { fill: solid(C.ink), fontWeight: 600, lineHeight: 1.4 }), icon("ic-qr-code", qr, C.ink));
            }
            return out;
        },
    }),
    F({
        id: "fl-verso-preturi",
        name: "Listă de prețuri",
        side: "verso",
        background: solid(C.cream),
        build: (c) => {
            const w = work(c);
            const items: Array<[string, string]> = [
                ["Tuns + spălat", "60 lei"],
                ["Vopsit rădăcină", "120 lei"],
                ["Coafat ocazie", "90 lei"],
                ["Manichiură semipermanentă", "80 lei"],
                ["Pachet mireasă", "450 lei"],
            ];
            const [head, list, foot] = rows(w, [0.14, 0.7, 0.1], w.h * 0.04);
            const rs = rows(list, items.map(() => 1), list.h * 0.04);
            const out: El[] = [txt("Prețuri", head, { fontFamily: "Playfair Display", fontWeight: 700, fill: solid(C.green), lineHeight: 1.2 })];
            const longest = items.reduce((a, v) => (v[0].length > a.length ? v[0] : a), "");
            const fs = Math.min(rs[0].h * 0.45, (list.w * 0.68) / estWidth(longest, 1, "Inter"));
            rs.forEach((r, i) => {
                const [a, b] = cols(r, [0.7, 0.3], r.w * 0.02);
                out.push(txt(items[i][0], a, { fill: solid(C.ink), fontWeight: 500, align: "left", fontFamily: "Inter", max: fs }));
                out.push(txt(items[i][1], b, { fill: solid(C.green), fontWeight: 800, align: "right", max: fs }));
                if (i < items.length - 1) out.push(hline({ x: r.x, y: r.y + r.h + list.h * 0.02, w: r.w, h: 0 }, "#d8cfbf", Math.max(0.2, c.short * 0.002)));
            });
            out.push(txt("Programări: 0722 000 000", foot, { fill: solid(C.ink), fontWeight: 700 }));
            return out;
        },
    }),
];

function ellipse(b: Box, color: string, group: string): El {
    return shape("ellipse", b, color, { groupId: group, name: "Insignă" });
}
