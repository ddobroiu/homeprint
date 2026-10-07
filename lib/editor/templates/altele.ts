// Celelalte produse din editor: pliant (A4 împăturit în 3), folie de geam, tapet, tricou.
import { C, type Ctx, type Template, bullets, centered, cols, estWidth, hline, icon, iconLine, inset, linear, logoMark, photo, pill, rect, rows, sideIcon, solid, stack, txt, type Box } from "./kit";

// ---------------- Pliant A4 (3 panouri) ----------------
// Pe A4 culcat panourile sunt coloane (pliere la 1/3); pe A4 vertical sunt rânduri.
// Fiecare panou are propria margine, ca nimic să nu cadă în pliu.
function panels(c: Ctx): Box[] {
    const m = c.safe + c.short * 0.02;
    const across = c.ar >= 1;
    const step = (across ? c.W : c.H) / 3;
    return [0, 1, 2].map((i) =>
        across ? { x: i * step + m, y: m, w: step - 2 * m, h: c.H - 2 * m } : { x: m, y: i * step + m, w: c.W - 2 * m, h: step - 2 * m },
    );
}
const PL = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["pliante"], baseW: 297, baseH: 210, fluid: true, ...t });

export const PLIANT_TEMPLATES: Template[] = [
    PL({
        id: "pl-exterior",
        name: "Exterior (copertă + contact)",
        background: solid(C.white),
        build: (c) => {
            const [flap, back, front] = panels(c);
            const across = c.ar >= 1;
            const coverBox: Box = across ? { x: (c.W / 3) * 2, y: c.full.y, w: c.W / 3 + c.bleed, h: c.full.h } : { x: c.full.x, y: (c.H / 3) * 2, w: c.full.w, h: c.H / 3 + c.bleed };
            const [fLogo, fHead, fSub] = rows(front, [0.2, 0.4, 0.2], front.h * 0.06);
            const [bHead, bList] = rows(back, [0.15, 0.7], back.h * 0.06);
            const [flHead, flBody] = rows(flap, c.ar >= 1 ? [0.18, 0.65] : [0.22, 0.7], flap.h * 0.06);
            const info = ["str. Exemplului 1, București", "0722 000 000", "contact@firma.ro", "www.firma.ro"];
            const refs = ["ic-map-pin", "ic-phone", "ic-mail", "ic-globe"];
            const lr = rows(inset(bList, 0, bList.h * 0.1), info.map(() => 1), bList.h * 0.06);
            return [
                rect(coverBox, linear(160, "#0a7a62", C.green), { name: "Copertă" }),
                ...logoMark(fLogo, C.white),
                txt("Numele firmei", fHead, { fill: solid(C.white), fontWeight: 800, lines: 2, lineHeight: 1.15 }),
                txt("Servicii profesionale din 2005", fSub, { fill: solid(C.greenLight), fontWeight: 500, lines: 2, lineHeight: 1.3 }),
                txt("Contact", bHead, { fill: solid(C.green), fontWeight: 800 }),
                ...lr.flatMap((r, i) => iconLine(r, refs[i], info[i], C.green, C.ink, { max: Math.min(r.h, c.short * 0.035) })),
                txt("De ce noi?", flHead, { fill: solid(C.green), fontWeight: 800 }),
                txt("Peste 20 de ani de experiență, echipă proprie și garanție pentru fiecare lucrare. Oferta se face gratuit, în 24 de ore.", flBody, { fontFamily: "Open Sans", fontWeight: 500, fill: solid(C.ink), lineHeight: 1.45, lines: c.ar >= 1 ? 8 : 3 }),
            ];
        },
    }),
    PL({
        id: "pl-interior",
        name: "Interior (3 servicii)",
        background: solid(C.cream),
        build: (c) => {
            const items: Array<[string, string, string]> = [
                ["ic-wrench", "Montaj", "Echipă proprie, montaj rapid și curat, în tot județul."],
                ["ic-shield-check", "Garanție", "Garanție 5 ani pentru produse și 2 ani pentru manoperă."],
                ["ic-truck", "Livrare", "Livrare gratuită pentru comenzile de peste 1.000 lei."],
            ];
            return [
                ...panels(c).flatMap((p, i) => {
                    if (c.ar < 1) {
                        // A4 vertical: fiecare panou e o bandă culcată (iconiță stânga, text dreapta)
                        const [ic, t] = cols(p, [0.24, 0.76], p.w * 0.04);
                        const [head, body] = rows(inset(t, 0, t.h * 0.1), [0.32, 0.6], t.h * 0.04);
                        return [icon(items[i][0], ic, C.green, { strokeScale: 1.2 }), txt(items[i][1], head, { fill: solid(C.green), fontWeight: 800, align: "left" }), txt(items[i][2], body, { fontFamily: "Open Sans", fontWeight: 500, fill: solid(C.ink), lineHeight: 1.45, lines: 2, align: "left" })];
                    }
                    const [ic, head, body] = rows(p, [0.22, 0.14, 0.42], p.h * 0.05);
                    return [icon(items[i][0], ic, C.green, { strokeScale: 1.2 }), txt(items[i][1], head, { fill: solid(C.green), fontWeight: 800 }), txt(items[i][2], body, { fontFamily: "Open Sans", fontWeight: 500, fill: solid(C.ink), lineHeight: 1.45, lines: 5 })];
                }),
            ];
        },
    }),
    PL({
        id: "pl-meniu",
        name: "Meniu restaurant",
        background: solid("#1d1a16"),
        build: (c) => {
            const sections: Array<[string, string[]]> = [
                ["Ciorbe", ["Ciorbă de burtă · 22 lei", "Ciorbă de perișoare · 19 lei", "Supă cremă de ciuperci · 18 lei"]],
                ["Feluri principale", ["Sarmale cu mămăligă · 35 lei", "Tochitură moldovenească · 42 lei", "Pește la grătar · 48 lei"]],
                ["Deserturi", ["Papanași · 22 lei", "Clătite cu dulceață · 18 lei", "Tort de casă · 20 lei"]],
            ];
            const longestItem = sections.flatMap((x) => x[1]).reduce((a, v) => (v.length > a.length ? v : a), "");
            return [
                ...panels(c).flatMap((p, i) => {
                    const [head, line, list] = rows(p, [0.14, 0.02, 0.62], p.h * 0.05);
                    return [
                        txt(sections[i][0], head, { fontFamily: "Dancing Script", fontWeight: 700, fill: solid(C.gold), lineHeight: 1.25 }),
                        hline(centered(line, line.w * 0.3, line.h), C.gold, Math.max(0.3, c.short * 0.003)),
                        txt(sections[i][1].join("\n"), list, { fontFamily: "Lora", fontWeight: 500, fill: solid("#efe6d2"), lineHeight: 1.9, max: list.w / estWidth(longestItem, 1, "Lora") }),
                    ];
                }),
            ];
        },
    }),
];

// ---------------- Folie de geam (vitrine) ----------------
const G = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["window-graphics"], baseW: 2000, baseH: 1000, fluid: true, ...t });
const vitrina = (c: Ctx) => inset(c.inner, c.inner.w * 0.02, c.inner.h * 0.04);

export const FOLIE_GEAM_TEMPLATES: Template[] = [
    G({
        id: "fg-deschis",
        name: "Deschis + program",
        background: solid(C.white),
        build: (c) => [
            ...stack(vitrina(c), {
                head: { text: "DESCHIS", font: "Anton", weight: 400, color: C.green, spacing: 40 },
                sub: { text: "Luni – Vineri 09–19 · Sâmbătă 10–15", weight: 700, color: C.ink },
                cta: (b: Box) => pill(b, "Bine ați venit!", { bg: C.green, fg: C.white }),
                side: sideIcon("ic-clock", C.green),
            }),
        ],
    }),
    G({
        id: "fg-reduceri",
        name: "Reduceri vitrină",
        background: solid(C.red),
        build: (c) => [
            ...stack(vitrina(c), {
                kicker: { text: "LICHIDARE DE STOC", weight: 800, color: C.yellow, spacing: 200 },
                head: { text: "-50%", font: "Anton", weight: 400, color: C.white },
                sub: { text: "la produsele marcate", weight: 700, color: C.white },
                weights: { head: 0.55 },
            }),
        ],
    }),
    G({
        id: "fg-servicii",
        name: "Logo + servicii",
        background: solid(C.navy),
        build: (c) => {
            const w = vitrina(c);
            const tall = c.ar < 1.2;
            const [a, b] = tall ? rows(w, [0.3, 0.6], w.h * 0.06) : cols(w, [0.4, 0.6], w.w * 0.05);
            const [logo, name] = rows(a, [0.55, 0.3], a.h * 0.06);
            return [
                ...logoMark(logo, C.white),
                txt("Numele firmei", name, { fill: solid(C.white), fontWeight: 800 }),
                ...bullets(inset(b, b.w * 0.04, 0), ["Reparații telefoane", "Accesorii", "Deblocări", "Service rapid"], "ic-circle-check", C.yellow, C.white, { fontWeight: 700, fontFamily: "Montserrat" }),
            ];
        },
    }),
];

// ---------------- Tapet ----------------
const TP = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["tapet"], baseW: 3000, baseH: 2500, fluid: true, ...t });

export const TAPET_TEMPLATES: Template[] = [
    TP({
        id: "tp-foto",
        name: "Perete foto",
        background: solid("#222222"),
        build: (c) => [photo(c.full)],
    }),
    TP({
        id: "tp-geometric",
        name: "Model geometric",
        background: (c) => ({ kind: "pattern", pattern: "waves", fg: "#cfe3dc", bg: "#f2f7f5", sizeMm: Math.max(80, c.short * 0.08) }),
        build: (c) => {
            const w = inset(c.inner, c.inner.w * 0.2, c.inner.h * 0.3);
            return [rect(inset(w, -c.short * 0.04), solid("#f2f7f5"), { radius: c.short * 0.02, opacity: 0.92, name: "Panou" }), txt("Bine ai venit acasă", w, { fontFamily: "Playfair Display", fontWeight: 600, italic: true, fill: solid(C.green), lines: 2, lineHeight: 1.2 })];
        },
    }),
    TP({
        id: "tp-birou",
        name: "Perete birou (valori)",
        background: linear(135, C.ink, "#22332c"),
        build: (c) => {
            const w = inset(c.inner, c.inner.w * 0.06, c.inner.h * 0.1);
            const [logo, words, tag] = rows(w, [0.16, 0.6, 0.1], w.h * 0.05);
            return [
                ...logoMark(logo, C.gold),
                txt("CURAJ\nCALITATE\nÎNCREDERE", words, { fontFamily: "Bebas Neue", fontWeight: 400, fill: solid(C.white), letterSpacing: 120, lineHeight: 1.05 }),
                txt("Împreună construim lucruri care durează.", tag, { fontWeight: 500, fill: solid(C.gold) }),
            ];
        },
    }),
];

// ---------------- Tricou ----------------
const TR = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["tricouri"], baseW: 300, baseH: 400, fluid: true, ...t });

export const TRICOU_TEMPLATES: Template[] = [
    TR({
        id: "tr-text-mare",
        name: "Text mare",
        background: solid(C.white),
        build: (c) => {
            const [k, head, sub] = rows(clampTall(c), [0.12, 0.6, 0.14], c.inner.h * 0.03);
            return [
                txt("ECHIPA", k, { fontWeight: 800, fill: solid(C.red), letterSpacing: 400 }),
                txt("TEAM\nBUILDING", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.ink), lineHeight: 1.05 }),
                txt("BRAȘOV 2026", sub, { fontWeight: 800, fill: solid(C.red), letterSpacing: 300 }),
            ];
        },
    }),
    TR({
        id: "tr-numar",
        name: "Nume + număr",
        background: solid(C.white),
        build: (c) => {
            const [name, num] = rows(clampTall(c), [0.2, 0.7], c.inner.h * 0.03);
            return [
                txt("POPESCU", name, { fontFamily: "Oswald", fontWeight: 700, fill: solid(C.navy), letterSpacing: 150 }),
                txt("10", num, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.navy), lineHeight: 1.05 }),
            ];
        },
    }),
    TR({
        id: "tr-logo-piept",
        name: "Logo pe piept",
        background: solid(C.white),
        build: (c) => {
            const w = c.inner;
            const top = { x: w.x, y: w.y, w: w.w * 0.42, h: w.h * 0.28 };
            const [logo, name] = rows(top, [0.6, 0.3], top.h * 0.05);
            return [...logoMark(logo, C.green, { ar: 1.6 }), txt("Numele firmei", name, { fill: solid(C.green), fontWeight: 700 })];
        },
    }),
];

function clampTall(c: Ctx): Box {
    return inset(c.inner, 0, c.inner.h * 0.08);
}

