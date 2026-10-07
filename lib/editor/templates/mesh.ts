// Mesh și formate foarte mari (fațade, garduri de șantier, schele). Se văd de la zeci de metri:
// puține cuvinte, litere foarte mari, fără texte subțiri (materialul e microperforat).
import { badge, bannerArea, edgeBands } from "./banner";
import { C, type Template, band, inset, linear, logoMark, phonePill, photo, pill, rect, sideIcon, solid, stack, type Box } from "./kit";

const M = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["mesh"], baseW: 4000, baseH: 2000, fluid: true, ...t });

export const MESH_TEMPLATES: Template[] = [
    M({
        id: "ms-fatada",
        name: "Fațadă cu randare",
        background: solid(C.white),
        build: (c) => {
            const split = c.H * 0.66;
            const info = { x: c.inner.x, y: split + c.short * 0.04, w: c.inner.w, h: c.inner.y + c.inner.h - split - c.short * 0.04 };
            return [
                photo({ x: c.full.x, y: c.full.y, w: c.full.w, h: split - c.full.y }),
                band(c, split, c.H + c.bleed - split, C.navy),
                ...stack(info, {
                    head: { text: "REZIDENȚIAL PARC", font: "Anton", weight: 400, color: C.white, spacing: 20 },
                    sub: { text: "Apartamente 2 – 4 camere · Finalizare 2027", weight: 700, color: "#cdd9f5" },
                    cta: phonePill("0722 000 000", C.gold, C.navy),
                    wideAt: 3.4,
                }),
            ];
        },
    }),
    M({
        id: "ms-gard-santier",
        name: "Gard de șantier",
        background: (c) => ({ kind: "pattern", pattern: "diagonal", fg: "#111111", bg: C.yellow, sizeMm: Math.max(60, c.short * 0.1) }),
        build: (c) => [
            rect(inset(c.inner, -c.safe * 0.5), C.white, { radius: c.short * 0.015, name: "Panou" }),
            ...stack(bannerArea(c, 0.06), {
                kicker: { text: "INVESTIȚIE REALIZATĂ DE", weight: 700, color: C.gray, spacing: 150 },
                head: { text: "AICI CONSTRUIM VIITORUL", font: "Anton", weight: 400, color: C.ink, spacing: 10 },
                sub: { text: "Constructor: Firma Exemplu SRL · www.firma.ro", weight: 700, color: C.ink },
                side: (b: Box) => logoMark(b, C.ink, { ar: 1.6 }),
                sideAr: 1.6,
            }),
        ],
    }),
    M({
        id: "ms-spatiu-publicitar",
        name: "Spațiu publicitar",
        background: linear(120, C.green, C.greenDark),
        build: (c) => [
            ...edgeBands(c, C.yellow),
            ...stack(bannerArea(c), {
                kicker: { text: "ACEST SPAȚIU ESTE", weight: 700, color: C.greenLight, spacing: 200 },
                head: { text: "DISPONIBIL", font: "Anton", weight: 400, color: C.yellow, spacing: 30 },
                sub: { text: "Publicitate pe fațadă · 40 m² · zonă centrală", weight: 700, color: C.white },
                cta: phonePill("0722 000 000", C.yellow, C.ink),
                side: sideIcon("ic-megaphone", C.yellow),
            }),
        ],
    }),
    M({
        id: "ms-eveniment",
        name: "Eveniment mare",
        background: linear(120, "#1b0a33", "#c2185b"),
        build: (c) => {
            return [
                ...stack(bannerArea(c), {
                    kicker: { text: "21 – 23 AUGUST · STADIONUL CENTRAL", weight: 800, color: "#ffb3d9", spacing: 120 },
                    head: { text: "SUMMER FEST", font: "Anton", weight: 400, color: C.white, spacing: 30 },
                    sub: { text: "3 zile · 20 de artiști · bilete pe festival.ro", weight: 700, color: C.white },
                    cta: (b: Box) => pill(b, "BILETE DE LA 99 LEI", { bg: C.yellow, fg: "#1b0a33", spacing: 40 }),
                    side: badge("NOU", C.yellow, "#c2185b", 12),
                }),
            ];
        },
    }),
];
