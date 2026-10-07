// Afișe / postere (A3 … A0, S5, S7; vertical). Bleed 3 mm: fundalurile și pozele merg până în
// bleed, textele stau în zona sigură. Ierarhie clară: titlu mare, detalii, informații practice jos.
import { C, type Ctx, type El, type Template, band, bullets, centered, cols, hline, icon, inset, linear, logoMark, photo, pill, rect, rows, shape, solid, square, txt, type Box } from "./kit";

const A = (t: Omit<Template, "products" | "baseW" | "baseH" | "fluid">): Template => ({ products: ["afise", "polipropilena", "carton"], baseW: 420, baseH: 594, fluid: true, ...t });

/** Zona de lucru: zona sigură plus o margine de respirație proporțională cu formatul. */
const work = (c: Ctx) => inset(c.inner, c.short * 0.035, c.short * 0.035);

/** Format culcat (folosit pe plăci): coloane în loc de rânduri. */
const landscape = (c: Ctx) => c.ar > 1.15;

export const AFIS_TEMPLATES: Template[] = [
    A({
        id: "af-eveniment",
        name: "Eveniment",
        background: solid("#111a2e"),
        build: (c) => {
            const w = work(c);
            const out: El[] = [];
            let info: Box;
            if (landscape(c)) {
                out.push(photo({ x: c.full.x, y: c.full.y, w: c.W * 0.48 + c.bleed, h: c.full.h }));
                info = { x: c.W * 0.52, y: w.y, w: w.x + w.w - c.W * 0.52, h: w.h };
            } else {
                out.push(photo({ x: c.full.x, y: c.full.y, w: c.full.w, h: c.H * 0.46 + c.bleed }));
                info = { x: w.x, y: c.H * 0.5, w: w.w, h: w.y + w.h - c.H * 0.5 };
            }
            const [kick, head, sub, details, cta] = rows(info, [0.08, 0.3, 0.11, 0.2, 0.12], info.h * 0.04);
            out.push(
                txt("SÂMBĂTĂ SEARA", kick, { fill: solid(C.yellow), fontWeight: 700, letterSpacing: 300 }),
                txt("FESTIVALUL\nLUMINILOR", head, { fontFamily: "Bebas Neue", fontWeight: 400, fill: solid(C.white), letterSpacing: 40, lineHeight: 1.05 }),
                txt("muzică · lampioane · food trucks", sub, { fontFamily: "Dancing Script", fontWeight: 700, fill: solid(C.yellow), lineHeight: 1.2 }),
                txt("14 septembrie · de la ora 18:00\nParcul Central, Cluj-Napoca", details, { fontWeight: 600, fill: solid("#d6def0"), lineHeight: 1.45 }),
                ...pill(centered(cta, cta.w * 0.7, cta.h), "INTRARE LIBERĂ", { bg: C.yellow, fg: "#111a2e", spacing: 80 }),
            );
            return out;
        },
    }),
    A({
        id: "af-concert",
        name: "Concert",
        background: linear(170, "#1b0a33", "#3a0d5c", "#c2185b"),
        build: (c) => {
            const w = work(c);
            const [kick, head, line, guests, ph, info] = rows(w, [0.06, 0.24, 0.015, 0.09, 0.38, 0.14], w.h * 0.025);
            return [
                shape("star", square(ph), null, { stroke: { color: "#ff4fa3", width: c.short * 0.004 }, points: 24, opacity: 0.6, name: "Decor" }),
                txt("TURNEU NAȚIONAL 2026", kick, { fill: solid("#ffb3d9"), fontWeight: 700, letterSpacing: 300 }),
                txt("NUMELE\nTRUPEI", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.white), lineHeight: 1.08, shadow: { color: "#ff4fa3", blur: c.short * 0.02, dx: 0, dy: 0, opacity: 0.6 } }),
                hline(centered(line, line.w * 0.3, line.h), "#ff4fa3", c.short * 0.006),
                txt("invitați speciali: Artist 1 · Artist 2", guests, { fill: solid("#ffe0ef"), fontWeight: 600 }),
                photo(inset(square(ph), square(ph).w * 0.12), { mask: "circle", border: { color: C.white, width: c.short * 0.008 } }),
                txt("Vineri, 20 iunie · ora 20:00\nSala Polivalentă · Bilete pe bilete.ro", info, { fill: solid(C.white), fontWeight: 600, lineHeight: 1.45 }),
            ];
        },
    }),
    A({
        id: "af-promo",
        name: "Promoție",
        background: solid(C.white),
        build: (c) => {
            const w = work(c);
            const topH = c.H * 0.55;
            const [kick, head, sub, cta] = rows({ x: w.x, y: topH + c.short * 0.03, w: w.w, h: w.y + w.h - topH - c.short * 0.03 }, [0.1, 0.3, 0.2, 0.16], w.h * 0.02);
            const bs = c.short * 0.3;
            return [
                photo({ x: c.full.x, y: c.full.y, w: c.full.w, h: topH + c.bleed }),
                shape("star", { x: w.x + w.w - bs, y: topH - bs * 1.08, w: bs, h: bs }, C.red, { points: 16, rotation: 8, groupId: "ins" }),
                txt("-30%", { x: w.x + w.w - bs * 0.84, y: topH - bs * 1.08 + bs * 0.3, w: bs * 0.68, h: bs * 0.4 }, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.white), rotation: 8, groupId: "ins" }),
                txt("DOAR LUNA ACEASTĂ", kick, { fill: solid(C.red), fontWeight: 800, letterSpacing: 200 }),
                txt("OFERTĂ SPECIALĂ", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.ink), lineHeight: 1.1 }),
                txt("Descrie pe scurt oferta: ce primește clientul și până când e valabilă.", sub, { fill: solid(C.gray), fontWeight: 500, fontFamily: "Open Sans", lines: 2, lineHeight: 1.35 }),
                ...pill(centered(cta, cta.w * 0.8, cta.h * 0.8), "www.magazin.ro · 0722 000 000", { bg: C.green, fg: C.white, fill: true }),
            ];
        },
    }),
    A({
        id: "af-anunt",
        name: "Anunț",
        background: solid(C.white),
        build: (c) => {
            const w = work(c);
            const fr = inset(c.inner, c.short * 0.01);
            const [ic, head, line, body, thanks, sign] = rows(inset(w, w.w * 0.04, w.h * 0.03), [0.1, 0.14, 0.01, 0.42, 0.08, 0.06], w.h * 0.03);
            return [
                rect(fr, null, { stroke: { color: C.red, width: c.short * 0.012 }, name: "Chenar" }),
                icon("ic-megaphone", ic, C.red, { strokeScale: 1.2 }),
                txt("ANUNȚ", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.red), letterSpacing: 60 }),
                hline(centered(line, line.w * 0.25, line.h), C.ink, c.short * 0.004),
                txt("Aducem la cunoștința locatarilor că în data de 10 octombrie se va opri apa caldă între orele 9:00 și 15:00, pentru lucrări de întreținere.", body, { fontFamily: "Open Sans", fontWeight: 500, fill: solid(C.ink), lineHeight: 1.45, lines: 5 }),
                txt("Vă mulțumim pentru înțelegere!", thanks, { fontFamily: "Open Sans", fontWeight: 700, fill: solid(C.ink) }),
                txt("Administrația", sign, { fontFamily: "Open Sans", fontWeight: 500, italic: true, fill: solid(C.gray) }),
            ];
        },
    }),
    A({
        id: "af-angajare",
        name: "Angajăm",
        background: solid(C.yellow),
        build: (c) => {
            const w = work(c);
            const [logo, head, sub, list, cta] = rows(w, [0.09, 0.2, 0.07, 0.4, 0.12], w.h * 0.035);
            return [
                band(c, c.full.y, c.inner.y * 0.6 - c.full.y, C.ink),
                band(c, c.H - c.inner.y * 0.6, c.inner.y * 0.6 + c.bleed, C.ink),
                ...logoMark(logo, C.ink),
                txt("ANGAJĂM", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.ink), letterSpacing: 20, lineHeight: 1.2 }),
                txt("Alătură-te echipei noastre!", sub, { fontWeight: 700, fill: solid(C.ink) }),
                ...bullets(inset(list, list.w * 0.1, 0), ["Vânzător / vânzătoare", "Casier", "Lucrător depozit", "Salariu motivant + bonusuri"], "ic-circle-check", C.ink, C.ink, { fontWeight: 700, fontFamily: "Montserrat" }),
                ...pill(centered(cta, cta.w * 0.8, cta.h * 0.8), "0722 000 000", { bg: C.ink, fg: C.white, icon: "ic-phone", iconColor: C.yellow }),
            ];
        },
    }),
    A({
        id: "af-vanzare",
        name: "Vânzare imobil",
        background: solid(C.white),
        build: (c) => {
            const w = work(c);
            const headBand = c.H * 0.2;
            const [head, sub] = rows({ x: w.x, y: w.y, w: w.w, h: headBand - w.y - c.short * 0.025 }, [0.66, 0.34], 0);
            const rest = { x: w.x, y: headBand + c.short * 0.04, w: w.w, h: w.y + w.h - headBand - c.short * 0.04 };
            const [ph, specs, price, cta] = rows(rest, [0.45, 0.25, 0.1, 0.12], rest.h * 0.035);
            const [s1, s2, s3] = cols(specs, [1, 1, 1], specs.w * 0.04);
            const spec = (b: Box, ic: string, label: string): El[] => {
                const [i, t] = rows(b, [0.5, 0.5], b.h * 0.05);
                return [icon(ic, i, C.red, { strokeScale: 1.2 }), txt(label, t, { fontWeight: 700, fill: solid(C.ink), lines: 2, lineHeight: 1.2 })];
            };
            return [
                rect({ x: c.full.x, y: c.full.y, w: c.full.w, h: headBand - c.full.y }, C.red, { name: "Bandă" }),
                txt("DE VÂNZARE", head, { fontFamily: "Anton", fontWeight: 400, fill: solid(C.white), letterSpacing: 20 }),
                txt("Casă cu grădină · direct de la proprietar", sub, { fontWeight: 600, fill: solid("#ffe3e3") }),
                photo(ph, { radius: c.short * 0.015 }),
                ...spec(s1, "ic-house", "4 camere\n140 m²"),
                ...spec(s2, "ic-leaf", "Teren\n600 m²"),
                ...spec(s3, "ic-car", "Garaj\n2 mașini"),
                txt("Preț: 145.000 €", price, { fontWeight: 900, fill: solid(C.red) }),
                ...pill(centered(cta, cta.w * 0.8, cta.h * 0.85), "0722 000 000", { bg: C.ink, fg: C.white, icon: "ic-phone", iconColor: C.yellow }),
            ];
        },
    }),
];
