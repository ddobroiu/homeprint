// Bannere (formate late 2:1 … 5:1; merg și pe cele pătrate / înalte). Fără bleed, textele la
// cel puțin 5 cm de margine (tiv + capse). Titluri mari, contrast puternic: se citesc de la distanță.
import { C, type Ctx, type El, type Template, band, centered, icon, inset, linear, phonePill, pill, rect, shape, sideIcon, solid, square, stack, txt, type Box } from "./kit";

const PRODUCTS = ["banner", "banner-verso", "mesh"];

/** Zona compoziției: zona sigură, puțin mai strânsă pe verticală la formatele late. */
const area = (c: Ctx, k = 0.04) => inset(c.inner, c.inner.w * 0.01, c.inner.h * k);

/** Benzi de culoare sus și jos, în marginea de tiv (decor, fără text). */
function edgeBands(c: Ctx, color: string): El[] {
    const h = c.safe * 0.55;
    return [band(c, c.full.y, h - c.full.y, color), band(c, c.H - h, h + c.bleed, color)];
}

/** Insigna rotundă / stea cu procentul. */
function badge(text: string, fill: string, fg: string, starPoints = 16) {
    return (b: Box): El[] => {
        const s = square(b);
        const g = "insigna";
        return [
            shape("star", s, fill, { points: starPoints, rotation: 8, groupId: g, name: "Insignă" }),
            txt(text, centered(s, s.w * 0.68, s.h * 0.4), { fontFamily: "Anton", fontWeight: 400, fill: solid(fg), rotation: 8, groupId: g }),
        ];
    };
}

const B = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: PRODUCTS, baseW: 2000, baseH: 1000, fluid: true, ...t });

export const BANNER_TEMPLATES: Template[] = [
    B({
        id: "bn-angajam",
        name: "Angajăm",
        background: solid(C.yellow),
        build: (c) => [
            ...edgeBands(c, C.ink),
            ...stack(area(c), {
                head: { text: "ANGAJĂM", font: "Anton", weight: 400, color: C.ink, spacing: 20 },
                sub: { text: "Ospătari · Bucătari · Personal curățenie", weight: 700, color: C.ink },
                cta: phonePill("0722 000 000", C.ink, C.white, { iconColor: C.yellow }),
                side: sideIcon("ic-users", C.ink),
                weights: { head: 0.46 },
            }),
        ],
    }),
    B({
        id: "bn-de-vanzare",
        name: "De vânzare",
        background: solid(C.white),
        build: (c) => [
            ...edgeBands(c, C.red),
            ...stack(area(c), {
                kicker: { text: "PROPRIETAR VINDE", weight: 700, color: C.ink, spacing: 150 },
                head: { text: "DE VÂNZARE", font: "Anton", weight: 400, color: C.red, spacing: 10 },
                sub: { text: "Apartament 3 camere · 75 m²", weight: 600, color: C.ink },
                cta: phonePill("0722 000 000", C.red, C.white),
                side: sideIcon("ic-house", C.red),
            }),
        ],
    }),
    B({
        id: "bn-de-inchiriat",
        name: "De închiriat",
        background: linear(90, C.blue, C.navy),
        build: (c) => [
            ...stack(area(c), {
                head: { text: "DE ÎNCHIRIAT", font: "Anton", weight: 400, color: C.white, spacing: 10 },
                sub: { text: "Spațiu comercial 120 m² · Zonă centrală", weight: 600, color: "#dbe7ff" },
                cta: (b) => pill(b, "0722 000 000", { bg: C.yellow, fg: C.navy, icon: "ic-phone", radius: b.h * 0.18 }),
                side: sideIcon("ic-key-round", C.yellow),
            }),
        ],
    }),
    B({
        id: "bn-deschidere",
        name: "Deschidere",
        background: linear(135, "#0a6b55", C.greenDark),
        build: (c) => {
            const a = area(c);
            const sp = Math.min(a.w, a.h) * 0.16;
            return [
                icon("pc-sparkle", { x: a.x, y: a.y, w: sp, h: sp }, C.gold),
                icon("pc-sparkle", { x: a.x + a.w - sp * 0.8, y: a.y + a.h - sp * 0.8, w: sp * 0.8, h: sp * 0.8 }, C.gold),
                ...stack(inset(a, sp * 1.1, 0), {
                    kicker: { text: "MAGAZIN NOU", weight: 700, color: C.white, spacing: 300 },
                    head: { text: "Deschidere", font: "Great Vibes", weight: 400, color: linear(90, "#f6d98b", C.gold, "#b88a2e"), lh: 1.25 },
                    sub: { text: "Sâmbătă, 12 octombrie · ora 10:00", weight: 500, color: "#e7efe9" },
                    cta: (b) => pill(b, "TE AȘTEPTĂM!", { bg: C.gold, fg: C.greenDark, spacing: 80 }),
                    weights: { head: 0.48 },
                }),
            ];
        },
    }),
    B({
        id: "bn-reduceri",
        name: "Reduceri -50%",
        background: linear(120, "#e63946", "#a4161a"),
        build: (c) => [
            ...stack(area(c), {
                head: { text: "REDUCERI", font: "Anton", weight: 400, color: C.white, shadow: { color: "#5a0a0d", blur: 0, dx: c.short * 0.008, dy: c.short * 0.008, opacity: 0.55 } },
                sub: { text: "la toate produsele din magazin", weight: 700, color: "#ffe3e3" },
                foot: { text: "1 – 15 noiembrie", weight: 600, color: C.white },
                side: badge("-50%", C.yellow, C.red),
                weights: { head: 0.5, side: 0.4 },
                wideAt: 3.4,
            }),
        ],
    }),
    B({
        id: "bn-program",
        name: "Program magazin",
        background: solid(C.cream),
        build: (c) => [
            ...edgeBands(c, C.green),
            ...stack(area(c), {
                kicker: { text: "MAGAZIN · CAFENEA", weight: 700, color: C.gold, spacing: 200 },
                head: { text: "PROGRAM", font: "Oswald", weight: 700, color: C.green, spacing: 40 },
                sub: { text: "Luni – Vineri  08:00 – 20:00", weight: 700, color: C.ink, font: "Inter" },
                foot: { text: "Sâmbătă  09:00 – 14:00 · Duminică închis", weight: 600, color: C.gray, font: "Inter" },
                side: sideIcon("ic-clock", C.green),
                weights: { sub: 0.16, foot: 0.12 },
            }),
        ],
    }),
    B({
        id: "bn-service-auto",
        name: "Service auto",
        background: solid("#1b1f24"),
        build: (c) => [
            band(c, c.full.y, c.safe * 0.6 - c.full.y, C.orange),
            band(c, c.H - c.safe * 0.6, c.safe * 0.6 + c.bleed, C.orange),
            ...stack(area(c), {
                kicker: { text: "REPARAȚII RAPIDE · GARANȚIE", weight: 700, color: C.orange, spacing: 120 },
                head: { text: "SERVICE AUTO", font: "Anton", weight: 400, color: C.white, spacing: 15 },
                sub: { text: "Mecanică · Electrică · Vulcanizare · ITP", weight: 600, color: "#cfd6de" },
                cta: phonePill("0722 000 000", C.orange, C.ink),
                side: sideIcon("ic-wrench", C.orange),
            }),
        ],
    }),
    B({
        id: "bn-meniul-zilei",
        name: "Restaurant · meniul zilei",
        background: solid(C.cream),
        build: (c) => [
            ...edgeBands(c, C.green),
            ...stack(area(c), {
                kicker: { text: "RESTAURANT LA NOI", weight: 700, color: C.green, spacing: 200 },
                head: { text: "Meniul zilei", font: "Dancing Script", weight: 700, color: C.green, lh: 1.2 },
                sub: { text: "Ciorbă · Fel principal · Desert", weight: 600, color: C.ink, font: "Lora" },
                cta: (b) => pill(b, "doar 35 lei", { bg: C.gold, fg: C.ink, font: "Montserrat", weight: 900 }),
                side: sideIcon("ic-utensils", C.green),
                ctaAr: 3.6,
                weights: { head: 0.48 },
            }),
        ],
    }),
    B({
        id: "bn-eveniment",
        name: "Eveniment",
        background: linear(120, "#5b2bd6", "#1c3faa"),
        build: (c) => [
            ...stack(area(c), {
                kicker: { text: "FESTIVALUL", weight: 700, color: "#c9d4ff", spacing: 300 },
                head: { text: "ZILELE ORAȘULUI", font: "Bebas Neue", weight: 400, color: C.white, spacing: 30 },
                sub: { text: "20 – 22 iunie · Parcul Central", weight: 600, color: C.white },
                cta: (b) => pill(b, "INTRARE LIBERĂ", { bg: C.yellow, fg: "#1c3faa", spacing: 60 }),
                side: sideIcon("ic-music", C.yellow),
                weights: { head: 0.46 },
            }),
        ],
    }),
    B({
        id: "bn-santier",
        name: "Construim aici · șantier",
        background: (c) => ({ kind: "pattern", pattern: "diagonal", fg: "#111111", bg: C.yellow, sizeMm: Math.max(40, c.short * 0.14) }),
        build: (c) => {
            const panel = inset(c.inner, -c.safe * 0.5, -c.safe * 0.5);
            return [
                rect(panel, C.white, { radius: c.short * 0.02, name: "Panou" }),
                ...stack(inset(c.inner, c.inner.w * 0.02, c.inner.h * 0.06), {
                    kicker: { text: "ȘANTIER ÎN LUCRU", weight: 800, color: C.red, spacing: 150 },
                    head: { text: "CONSTRUIM AICI", font: "Anton", weight: 400, color: C.ink, spacing: 10 },
                    sub: { text: "Bloc de locuințe P+4 · Finalizare 2027", weight: 600, color: "#333333" },
                    foot: { text: "Accesul persoanelor străine interzis", weight: 700, color: C.red },
                    side: sideIcon("ic-triangle-alert", C.red),
                }),
            ];
        },
    }),
    B({
        id: "bn-livram",
        name: "Livrăm la domiciliu",
        background: linear(120, "#0a7a62", C.green),
        build: (c) => [
            ...stack(area(c), {
                kicker: { text: "COMANDĂ ACUM", weight: 700, color: C.greenLight, spacing: 250 },
                head: { text: "LIVRĂM LA DOMICILIU", font: "Anton", weight: 400, color: C.white, spacing: 10, lines: 1 },
                sub: { text: "Rapid, în tot orașul · www.firma.ro", weight: 600, color: C.greenLight },
                cta: phonePill("0722 000 000", C.yellow, C.ink),
                side: sideIcon("ic-truck", C.yellow),
            }),
        ],
    }),
    B({
        id: "bn-la-multi-ani",
        name: "La mulți ani",
        background: linear(120, "#ff7eb3", "#7a5cff"),
        build: (c) => {
            const a = area(c);
            const s = Math.min(a.w, a.h) * 0.14;
            return [
                icon("pc-heart", { x: a.x, y: a.y, w: s, h: s }, C.white, { opacity: 0.8, rotation: -12 }),
                icon("pc-sparkle", { x: a.x + a.w - s, y: a.y + a.h - s, w: s, h: s }, "#fff3b0"),
                ...stack(inset(a, s * 1.2, 0), {
                    kicker: { text: "La mulți ani,", font: "Great Vibes", weight: 400, color: C.white, lh: 1.25 },
                    head: { text: "MARIA!", weight: 900, color: C.white, spacing: 60, shadow: { color: "#3b1d7a", blur: c.short * 0.02, dx: 0, dy: c.short * 0.01, opacity: 0.4 } },
                    sub: { text: "Te iubim! · Familia", weight: 600, color: "#fff0f7" },
                    weights: { kicker: 0.3, head: 0.45, sub: 0.14 },
                }),
            ];
        },
    }),
    B({
        id: "bn-absolvire",
        name: "Felicitări absolvenți",
        background: linear(160, "#13235b", "#0a1433"),
        build: (c) => [
            ...edgeBands(c, C.gold),
            ...stack(area(c), {
                kicker: { text: "Felicitări, absolvenți!", font: "Great Vibes", weight: 400, color: C.gold, lh: 1.25 },
                head: { text: "PROMOȚIA 2026", font: "Cinzel", weight: 700, color: C.white, spacing: 60 },
                sub: { text: "Liceul Teoretic „Mihai Eminescu”", weight: 600, color: "#d9def0", font: "Lora" },
                side: sideIcon("ic-graduation-cap", C.gold),
                weights: { kicker: 0.26, head: 0.36 },
            }),
        ],
    }),
];

// folosit și la mesh
export { area as bannerArea, edgeBands, badge };
