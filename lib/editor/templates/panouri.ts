// Panouri rigide de semnalistică (PVC forex, alucobond, plexiglas, polipropilenă, carton):
// plăcuțe de firmă, program, interdicții / avertizări, direcții, numere de casă.
// Bleed 3 mm, text la cel puțin 5 mm de tăietură; mesaje scurte, contrast mare.
import { C, type Ctx, type El, type Template, cols, deco, icon, inset, linear, logoMark, rect, rows, sideIcon, solid, stack, txt, type Box } from "./kit";

const PRODUCTS = ["pvc-forex", "alucobond", "plexiglass", "polipropilena", "carton"];
const P = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: PRODUCTS, baseW: 600, baseH: 400, fluid: true, ...t });

const work = (c: Ctx) => inset(c.inner, c.short * 0.05, c.short * 0.05);
/** Ramă subțire în interiorul zonei sigure (arată bine pe plăcuțe). */
const frame = (c: Ctx, color: string) => rect(inset(c.inner, c.short * 0.015), null, { stroke: { color, width: Math.max(0.6, c.short * 0.01) }, radius: c.short * 0.03, name: "Chenar" });

export const PANOU_TEMPLATES: Template[] = [
    P({
        id: "pn-placuta-firma",
        name: "Plăcuță firmă",
        background: linear(135, "#2b2f33", "#14171a"),
        build: (c) => [
            frame(c, C.gold),
            ...stack(work(c), {
                kicker: { text: "S.C. EXEMPLU S.R.L.", weight: 600, color: "#d9d2c0", spacing: 200 },
                head: { text: "Cabinet de avocatură", font: "Playfair Display", weight: 700, color: C.gold },
                sub: { text: "Etaj 2 · Ap. 5", weight: 500, color: "#d9d2c0" },
                foot: { text: "Luni – Vineri 09:00 – 17:00", weight: 500, color: "#a9a395" },
                side: (b: Box) => logoMark(b, C.gold, { ar: 1.6 }),
                sideAr: 1.6,
                weights: { head: 0.4, side: 0.3 },
            }),
        ],
    }),
    P({
        id: "pn-program",
        name: "Program de lucru",
        background: solid(C.white),
        build: (c) => {
            const w = work(c);
            const days: Array<[string, string]> = [
                ["Luni – Vineri", "09:00 – 18:00"],
                ["Sâmbătă", "10:00 – 14:00"],
                ["Duminică", "Închis"],
            ];
            const wideF = c.ar > 1.6;
            const [head, table] = wideF ? cols(w, [0.36, 0.64], w.w * 0.05) : rows(w, [0.26, 0.64], w.h * 0.06);
            const out: El[] = [frame(c, C.green)];
            const [ic, title] = wideF ? rows(head, [0.5, 0.35], head.h * 0.05) : cols(head, [0.25, 0.75], head.w * 0.04);
            out.push(icon("ic-clock", ic, C.green, { strokeScale: 1.2 }), txt("PROGRAM", title, { fontFamily: "Oswald", fontWeight: 700, fill: solid(C.green), letterSpacing: 60, align: wideF ? "center" : "left" }));
            const rs = rows(table, days.map(() => 1), table.h * 0.08);
            const fs = Math.min(rs[0].h * 0.55, table.w / 13);
            rs.forEach((r, i) => {
                const [a, b] = cols(r, [0.55, 0.45], r.w * 0.03);
                out.push(txt(days[i][0], a, { fontWeight: 600, fill: solid(C.ink), align: "left", fontFamily: "Inter", max: fs }));
                out.push(txt(days[i][1], b, { fontWeight: 800, fill: solid(i === 2 ? C.red : C.ink), align: "right", max: fs }));
            });
            return out;
        },
    }),
    P({
        id: "pn-interzis",
        name: "Acces interzis",
        background: solid(C.white),
        build: (c) => [
            frame(c, C.red),
            ...stack(work(c), {
                head: { text: "ACCES INTERZIS", font: "Anton", weight: 400, color: C.red, spacing: 20 },
                sub: { text: "persoanelor neautorizate", weight: 700, color: C.ink },
                side: sideIcon("ic-ban", C.red, { strokeScale: 1.4 }),
                weights: { head: 0.45, sub: 0.18, side: 0.4 },
                wideAt: 3,
            }),
        ],
    }),
    P({
        id: "pn-atentie",
        name: "Atenție",
        background: solid(C.yellow),
        build: (c) => [
            frame(c, C.ink),
            ...stack(work(c), {
                head: { text: "ATENȚIE!", font: "Anton", weight: 400, color: C.ink, spacing: 30 },
                sub: { text: "Câine în curte", weight: 800, color: C.ink },
                side: sideIcon("ic-triangle-alert", C.ink, { strokeScale: 1.3 }),
                weights: { head: 0.45, sub: 0.22, side: 0.4 },
                wideAt: 3,
            }),
        ],
    }),
    P({
        id: "pn-directie",
        name: "Indicator direcție",
        background: solid(C.navy),
        build: (c) => {
            const w = work(c);
            const tall = c.ar < 1.2;
            const [a, t] = tall ? rows(w, [0.4, 0.55], w.h * 0.06) : cols(w, [0.32, 0.68], w.w * 0.05);
            const arrow = inset(a, 0, a.h * (tall ? 0.15 : 0.25));
            const [head, sub] = rows(t, [0.6, 0.3], t.h * 0.05);
            return [
                deco("pc-arrowThick", arrow, C.white, { name: "Săgeată" }),
                txt("Recepție", head, { fontWeight: 800, fill: solid(C.white), align: tall ? "center" : "left" }),
                txt("Etaj 1 · Sala de conferințe", sub, { fontWeight: 500, fill: solid("#cdd9f5"), align: tall ? "center" : "left" }),
            ];
        },
    }),
    P({
        id: "pn-numar-casa",
        name: "Număr casă",
        background: solid("#fbfaf7"),
        build: (c) => {
            const w = work(c);
            const tall = c.ar < 1.2;
            const [n, t] = tall ? rows(w, [0.62, 0.3], w.h * 0.05) : cols(w, [0.42, 0.58], w.w * 0.05);
            const [st, city] = rows(t, [0.55, 0.3], t.h * 0.08);
            return [
                frame(c, C.ink),
                txt("17", n, { fontFamily: "Playfair Display", fontWeight: 700, fill: solid(C.ink), lineHeight: 1.05 }),
                txt("Strada Florilor", st, { fontFamily: "Playfair Display", fontWeight: 600, italic: true, fill: solid(C.ink), align: tall ? "center" : "left", lines: 2 }),
                txt("FAMILIA POPESCU", city, { fontWeight: 600, fill: solid(C.gray), letterSpacing: 200, align: tall ? "center" : "left" }),
            ];
        },
    }),
];
