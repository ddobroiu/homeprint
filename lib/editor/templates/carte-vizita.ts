// Cărți de vizită (9×5, 5×9 vertical, 8,5×5,5). Bleed 3 mm, text la cel puțin 4 mm de tăietură,
// nimic sub ~7 pt. Fețele se aleg separat: șabloanele „verso” sunt pentru spatele cărții.
import { C, type Ctx, type El, type Template, centered, clampAr, cols, ellipse, estWidth, hline, icon, iconLine, inset, linear, logoMark, rect, rows, solid, txt, type Box } from "./kit";

const V = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["carti-vizita"], baseW: 90, baseH: 50, fluid: true, ...t });

const vertical = (c: Ctx) => c.ar < 0.9;

const PERSON = "Andrei Popescu";
const ROLE = "Director vânzări";
const CONTACT: Array<[string, string]> = [
    ["ic-phone", "0722 000 000"],
    ["ic-mail", "andrei@firma.ro"],
    ["ic-globe", "www.firma.ro"],
];

/** Datele de contact cu iconițe, aceeași mărime pe toate rândurile. */
function contacts(b: Box, iconColor: string, textColor: string, items = CONTACT): El[] {
    const rs = rows(b, items.map(() => 1), b.h * 0.12);
    const rh = rs[0].h;
    const longest = items.reduce((a, v) => (v[1].length > a.length ? v[1] : a), "");
    const max = Math.min(rh / 1.15, 3.2, (b.w - rh * 1.15) / estWidth(longest, 1, "Inter"));
    return rs.flatMap((r, i) => iconLine(r, items[i][0], items[i][1], iconColor, textColor, { max }));
}

/** Nume + funcție, aliniate. */
function nameBlock(b: Box, o: { color: string; roleColor: string; font?: string; align?: "left" | "center"; upper?: boolean; spacing?: number }): El[] {
    const [n, r] = rows(b, [0.6, 0.4], b.h * 0.06);
    return [
        txt(o.upper ? PERSON.toLocaleUpperCase("ro-RO") : PERSON, n, { fontFamily: o.font ?? "Montserrat", fontWeight: 700, fill: solid(o.color), align: o.align ?? "left", letterSpacing: o.spacing ?? 0, max: 5.2 }),
        txt(ROLE, r, { fontWeight: 500, fill: solid(o.roleColor), align: o.align ?? "left", fontFamily: "Inter", max: 3 }),
    ];
}

export const CARTE_VIZITA_TEMPLATES: Template[] = [
    V({
        id: "cv-clasic",
        name: "Clasic",
        background: solid(C.white),
        build: (c) => {
            const w = c.inner;
            if (vertical(c)) {
                const [logo, name, line, ct] = rows(inset(w, 0, w.h * 0.03), [0.22, 0.2, 0.04, 0.32], w.h * 0.05);
                return [...logoMark(logo, C.navy), ...nameBlock(name, { color: C.navy, roleColor: C.gray, align: "center" }), hline(centered(line, line.w * 0.3, line.h), C.gold, 0.35), ...contacts(ct, C.navy, C.ink)];
            }
            const [l, r] = cols(w, [0.42, 0.58], w.w * 0.05);
            return [
                ...logoMark(centered(l, l.w, l.h * 0.5), C.navy),
                rect({ x: l.x + l.w + w.w * 0.025, y: w.y + w.h * 0.1, w: 0.3, h: w.h * 0.8 }, C.gold, { name: "Separator" }),
                ...nameBlock(rows(r, [0.38, 0.62])[0], { color: C.navy, roleColor: C.gray }),
                ...contacts(inset(rows(r, [0.4, 0.6])[1], 0, r.h * 0.04), C.navy, C.ink),
            ];
        },
    }),
    V({
        id: "cv-modern",
        name: "Modern",
        background: solid(C.white),
        build: (c) => {
            const w = c.inner;
            if (vertical(c)) {
                const top = c.H * 0.36;
                const [n, ct] = rows({ x: w.x, y: top + 4, w: w.w, h: w.y + w.h - top - 4 }, [0.36, 0.56], w.h * 0.06);
                return [
                    rect({ x: c.full.x, y: c.full.y, w: c.full.w, h: top - c.full.y }, C.green, { name: "Bandă" }),
                    txt("SP", centered({ x: w.x, y: w.y, w: w.w, h: top - w.y - 2 }, w.w * 0.5, (top - w.y) * 0.5), { fontWeight: 900, fill: solid(C.white), letterSpacing: 50 }),
                    ...nameBlock(n, { color: C.ink, roleColor: C.green, align: "center" }),
                    ...contacts(ct, C.green, C.ink),
                ];
            }
            const side = c.W * 0.32;
            const r = { x: side + c.short * 0.1, y: w.y, w: w.x + w.w - side - c.short * 0.1, h: w.h };
            const [n, ct] = rows(r, [0.4, 0.6], r.h * 0.08);
            return [
                rect({ x: c.full.x, y: c.full.y, w: side - c.full.x, h: c.full.h }, C.green, { name: "Bandă" }),
                txt("SP", centered({ x: w.x, y: w.y, w: side - w.x - 2, h: w.h }, side * 0.6, w.h * 0.3), { fontWeight: 900, fill: solid(C.white), letterSpacing: 50 }),
                ...nameBlock(n, { color: C.ink, roleColor: C.green }),
                ...contacts(ct, C.green, C.ink),
            ];
        },
    }),
    V({
        id: "cv-minimal",
        name: "Minimal",
        background: solid("#fbfaf7"),
        build: (c) => {
            const w = inset(c.inner, c.short * 0.04);
            const [n, line, ct] = rows(w, vertical(c) ? [0.3, 0.06, 0.4] : [0.36, 0.06, 0.42], w.h * 0.06);
            return [
                ...nameBlock(n, { color: C.ink, roleColor: "#8a8f8c", font: "Raleway", align: "center", upper: true, spacing: 150 }),
                hline(centered(line, line.w * 0.12, line.h), C.ink, 0.3),
                txt("0722 000 000\nandrei@firma.ro", ct, { fontFamily: "Inter", fontWeight: 400, fill: solid(C.ink), lineHeight: 1.6, max: 3 }),
            ];
        },
    }),
    V({
        id: "cv-creativ",
        name: "Creativ",
        background: linear(135, "#ff7a59", "#ff3d77", "#7a5cff"),
        build: (c) => {
            const w = c.inner;
            const s = c.short * 0.9;
            const [n, ct] = rows(vertical(c) ? inset(w, 0, w.h * 0.2) : { ...w, w: w.w * 0.7 }, [0.45, 0.5], w.h * 0.08);
            return [
                ellipse({ x: c.W - s * 0.55, y: -s * 0.35, w: s, h: s }, "#ffffff", { opacity: 0.16, name: "Cerc" }),
                ellipse({ x: -s * 0.3, y: c.H - s * 0.45, w: s * 0.7, h: s * 0.7 }, "#ffffff", { opacity: 0.12, name: "Cerc" }),
                ...nameBlock(n, { color: C.white, roleColor: "#ffe3ec", font: "Poppins", align: vertical(c) ? "center" : "left" }),
                ...contacts(ct, C.white, C.white),
            ];
        },
    }),
    V({
        id: "cv-elegant",
        name: "Elegant auriu",
        background: solid(C.ink),
        build: (c) => {
            const w = inset(c.inner, c.short * 0.04);
            const [n, role, line, ct] = rows(w, [0.26, 0.12, 0.05, 0.3], w.h * 0.06);
            return [
                rect(inset(c.inner, -c.short * 0.02), null, { stroke: { color: C.gold, width: 0.25 }, name: "Chenar" }),
                txt("ELENA IONESCU", n, { fontFamily: "Cinzel", fontWeight: 700, fill: linear(90, "#f3d98c", C.gold), letterSpacing: 120, max: 5 }),
                txt("Arhitect", role, { fontFamily: "Cormorant Garamond", fontWeight: 500, italic: true, fill: solid("#d9d2c0"), max: 3.6 }),
                hline(centered(line, line.w * 0.22, line.h), C.gold, 0.3),
                txt("0722 000 000 · elena@studio.ro\nwww.studio.ro", ct, { fontWeight: 500, fill: solid("#d9d2c0"), lineHeight: 1.6, max: 2.8 }),
            ];
        },
    }),
    V({
        id: "cv-constructii",
        name: "Construcții / auto",
        background: solid("#1b1f24"),
        build: (c) => {
            const w = c.inner;
            const stripe = c.short * 0.12;
            const out: El[] = [rect({ x: c.full.x, y: c.H - stripe, w: c.full.w, h: stripe + c.bleed }, { kind: "linear", angle: 0, stops: [{ offset: 0, color: C.orange }, { offset: 1, color: C.yellow }] }, { name: "Bandă" })];
            const area = { ...w, h: c.H - stripe - c.short * 0.05 - w.y };
            if (vertical(c)) {
                const [ic, n, ct] = rows(area, [0.2, 0.3, 0.42], area.h * 0.05);
                out.push(icon("ic-hammer", ic, C.orange, { strokeScale: 1.3 }), ...nameBlock(n, { color: C.white, roleColor: C.orange, align: "center" }), ...contacts(ct, C.orange, C.white));
            } else {
                const [l, r] = cols(area, [0.2, 0.8], area.w * 0.04);
                const [n, ct] = rows(r, [0.45, 0.55], r.h * 0.06);
                out.push(icon("ic-hammer", l, C.orange, { strokeScale: 1.3 }), ...nameBlock(n, { color: C.white, roleColor: C.orange }), ...contacts(ct, C.orange, C.white));
            }
            return out;
        },
    }),
    V({
        id: "cv-beauty",
        name: "Salon / beauty",
        background: solid("#fdf1f3"),
        build: (c) => {
            const w = inset(c.inner, c.short * 0.03);
            const [brand, n, ct] = rows(w, vertical(c) ? [0.32, 0.18, 0.36] : [0.34, 0.2, 0.36], w.h * 0.06);
            return [
                txt("Studio Bella", brand, { fontFamily: "Great Vibes", fontWeight: 400, fill: solid("#b03a5b"), lineHeight: 1.3 }),
                txt("Elena Marin · stilist", n, { fontFamily: "Montserrat", fontWeight: 600, fill: solid(C.ink), letterSpacing: 60, max: 3.2 }),
                txt("Programări: 0722 000 000\n@studiobella", ct, { fontFamily: "Inter", fontWeight: 500, fill: solid("#6d4c56"), lineHeight: 1.5, max: 2.9 }),
            ];
        },
    }),
    V({
        id: "cv-medical",
        name: "Medical",
        background: solid(C.white),
        build: (c) => {
            const w = c.inner;
            const teal = "#0f7c8c";
            const bar = c.short * 0.07;
            const out: El[] = [rect({ x: c.full.x, y: c.full.y, w: c.full.w, h: bar - c.full.y }, teal, { name: "Bandă" })];
            const area = { ...w, y: Math.max(w.y, bar + c.short * 0.04), h: w.y + w.h - Math.max(w.y, bar + c.short * 0.04) };
            const items: Array<[string, string]> = [["ic-phone", "0722 000 000"], ["ic-map-pin", "str. Sănătății 5"]];
            if (vertical(c)) {
                const [ic, n, ct] = rows(area, [0.18, 0.28, 0.4], area.h * 0.05);
                out.push(icon("ic-stethoscope", ic, teal), ...nameBlock(n, { color: C.ink, roleColor: teal, align: "center" }), ...contacts(ct, teal, C.ink, items));
            } else {
                const [l, r] = cols(area, [0.2, 0.8], area.w * 0.04);
                const [n, ct] = rows(r, [0.5, 0.42], r.h * 0.06);
                out.push(icon("ic-stethoscope", clampAr(l, 1, 1, "start"), teal), ...nameBlock(n, { color: C.ink, roleColor: teal }), ...contacts(ct, teal, C.ink, items));
            }
            return out;
        },
    }),
    V({
        id: "cv-verso-logo",
        name: "Logo pe culoare",
        side: "verso",
        background: solid(C.green),
        build: (c) => {
            const w = c.inner;
            const [logo, slogan] = rows(inset(w, w.w * 0.1, w.h * 0.12), [0.62, 0.22], w.h * 0.08);
            return [...logoMark(logo, C.white), txt("Soluții pentru afacerea ta", slogan, { fill: solid(C.greenLight), fontWeight: 500, letterSpacing: 60, max: 3 })];
        },
    }),
    V({
        id: "cv-verso-qr",
        name: "Cod QR + servicii",
        side: "verso",
        background: solid(C.cream),
        build: (c) => {
            const w = c.inner;
            if (vertical(c)) {
                const [qr, lab, list] = rows(w, [0.38, 0.08, 0.36], w.h * 0.05);
                return [icon("ic-qr-code", qr, C.ink), txt("Scanează pentru site", lab, { fill: solid(C.gray), fontWeight: 600, max: 2.6 }), txt("Consultanță\nProiectare\nExecuție", list, { fill: solid(C.green), fontWeight: 700, lineHeight: 1.5, max: 3.4 })];
            }
            const [l, r] = cols(w, [0.4, 0.6], w.w * 0.06);
            const [qr, lab] = rows(l, [0.78, 0.16], l.h * 0.04);
            return [icon("ic-qr-code", qr, C.ink), txt("Scanează pentru site", lab, { fill: solid(C.gray), fontWeight: 600, max: 2.6 }), txt("Consultanță\nProiectare\nExecuție", r, { fill: solid(C.green), fontWeight: 700, lineHeight: 1.5, align: "left", max: 4 })];
        },
    }),
];
