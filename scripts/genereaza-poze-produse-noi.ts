/**
 * Ilustrațiile (vectoriale, desenate aici în SVG) pentru produsele noi care nu au poze reale în public/produse-img:
 * calendarele (perete, birou, buzunar), formele de steag beachflag și bazele lor.
 * Fără prețuri, fără text promoțional, fără logo-uri; „Grafica ta aici" pe suprafața de print. 1200×1200, JPEG.
 * Calendarele și steagul dreptunghiular au acum fotografii (public/products/produse-noi/foto/*.webp, 08.10.2026);
 * desenele de aici rămân poze secundare în galerie.
 *
 * Rulare: npx tsx scripts/genereaza-poze-produse-noi.ts   → public/products/produse-noi/*.jpg
 */
import fs from "fs";
import path from "path";
import sharp from "sharp";

const SIZE = 1200;
const OUT_DIR = path.join(process.cwd(), "public", "products", "produse-noi");
const FONT = "Arial, Helvetica, sans-serif";
let uid = 0;
const nid = (p: string) => `${p}${++uid}`;

type Box = { x: number; y: number; w: number; h: number };

function page(body: string, bg = "#f8fafc"): string {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">
<rect width="${SIZE}" height="${SIZE}" fill="${bg}"/>
<ellipse cx="${SIZE / 2}" cy="${SIZE * 0.93}" rx="${SIZE * 0.42}" ry="${SIZE * 0.025}" fill="#0f172a" opacity="0.06"/>
${body}
</svg>`;
}

function shadow(id: string, blur = 14, dy = 10, opacity = 0.22): string {
    return `<filter id="${id}" x="-20%" y="-20%" width="140%" height="150%">
  <feGaussianBlur in="SourceAlpha" stdDeviation="${blur}"/><feOffset dy="${dy}" result="o"/>
  <feComponentTransfer><feFuncA type="linear" slope="${opacity}"/></feComponentTransfer>
  <feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter>`;
}

const PALETTES = [
    ["#0f766e", "#1d4ed8"],
    ["#b45309", "#be123c"],
    ["#047857", "#0369a1"],
    ["#7c3aed", "#db2777"],
];

/** Grafica-exemplu: degrade, câteva forme și (opțional) textul „Grafica ta aici". */
function artwork(b: Box, opts: { text?: boolean; variant?: number; clip?: string } = {}): string {
    const { text = true, variant = 0 } = opts;
    const g = nid("g");
    const c = nid("c");
    const [c1, c2] = PALETTES[variant % PALETTES.length];
    const m = Math.min(b.w, b.h);
    const clipShape = opts.clip ?? `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}"/>`;
    let label = "";
    if (text) {
        const vertical = b.h > b.w * 1.8;
        const fs = Math.max(12, Math.min(m * (vertical ? 0.15 : 0.13), (b.w * 0.82) / (15 * 0.56)));
        const cx = b.x + b.w / 2;
        const cy = b.y + b.h * (vertical ? 0.42 : 0.5);
        label = vertical
            ? `<text x="${cx}" y="${cy}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${fs}" fill="#fff">Grafica</text>
               <text x="${cx}" y="${cy + fs * 1.15}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${fs}" fill="#fff">ta aici</text>`
            : `<text x="${cx}" y="${cy + fs * 0.35}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${fs}" fill="#fff">Grafica ta aici</text>`;
    }
    return `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></linearGradient>
<clipPath id="${c}">${clipShape}</clipPath></defs>
<g clip-path="url(#${c})">
  <rect x="${b.x - 2}" y="${b.y - 2}" width="${b.w + 4}" height="${b.h + 4}" fill="url(#${g})"/>
  <circle cx="${b.x + b.w * 0.9}" cy="${b.y + b.h * 0.1}" r="${m * 0.55}" fill="#fff" opacity="0.09"/>
  <circle cx="${b.x + b.w * 0.08}" cy="${b.y + b.h}" r="${m * 0.5}" fill="#fff" opacity="0.08"/>
  <circle cx="${b.x + b.w * 0.2}" cy="${b.y + b.h * 0.22}" r="${m * 0.12}" fill="#fde68a" opacity="0.3"/>
  ${label}
</g>`;
}

/** Grila unei luni (7 coloane × 5 rânduri), cu numele lunii deasupra. */
function monthGrid(b: Box, month: string, startDay: number, days: number, ink = "#0f172a"): string {
    const head = b.h * 0.16;
    const fs = Math.max(8, head * 0.62);
    const cw = b.w / 7;
    const rh = (b.h - head * 1.6) / 6;
    let out = `<text x="${b.x + b.w / 2}" y="${b.y + head * 0.8}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${fs}" fill="${ink}">${month}</text>`;
    const names = ["L", "M", "M", "J", "V", "S", "D"];
    names.forEach((n, i) => {
        out += `<text x="${b.x + cw * (i + 0.5)}" y="${b.y + head * 1.5}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${rh * 0.5}" fill="${i >= 5 ? "#dc2626" : "#64748b"}">${n}</text>`;
    });
    for (let d = 1; d <= days; d++) {
        const idx = startDay + d - 1;
        const col = idx % 7;
        const row = Math.floor(idx / 7);
        out += `<text x="${b.x + cw * (col + 0.5)}" y="${b.y + head * 1.6 + rh * (row + 0.85)}" text-anchor="middle" font-family="${FONT}" font-size="${rh * 0.52}" fill="${col >= 5 ? "#dc2626" : ink}">${d}</text>`;
    }
    return out;
}

function spiral(x1: number, x2: number, y: number, n: number): string {
    let out = "";
    const step = (x2 - x1) / (n - 1);
    for (let i = 0; i < n; i++) {
        const x = x1 + i * step;
        out += `<rect x="${x - 4}" y="${y - 16}" width="8" height="30" rx="4" fill="#94a3b8"/><rect x="${x - 2}" y="${y - 14}" width="4" height="26" rx="2" fill="#e2e8f0"/>`;
    }
    return out;
}

// ---------------------------------------------------------------------------------------------
function wallCalendar(b: Box, variant = 0): string {
    const s = nid("s");
    const headH = b.h * 0.44;
    return `<defs>${shadow(s)}</defs>
<g filter="url(#${s})"><rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="6" fill="#ffffff"/></g>
${artwork({ x: b.x, y: b.y, w: b.w, h: headH }, { variant })}
<rect x="${b.x}" y="${b.y + headH}" width="${b.w}" height="${b.h - headH}" fill="#ffffff"/>
${monthGrid({ x: b.x + b.w * 0.08, y: b.y + headH + b.h * 0.03, w: b.w * 0.84, h: b.h - headH - b.h * 0.07 }, "IANUARIE", 4, 31)}
${spiral(b.x + b.w * 0.08, b.x + b.w * 0.92, b.y + 2, 18)}
<path d="M ${b.x + b.w / 2 - 22} ${b.y - 6} Q ${b.x + b.w / 2} ${b.y - 60} ${b.x + b.w / 2 + 22} ${b.y - 6}" fill="none" stroke="#64748b" stroke-width="4"/>`;
}

function deskCalendar(cx: number, baseY: number, w: number, h: number, variant = 0): string {
    const s = nid("s");
    const depth = h * 0.42;
    const topY = baseY - h;
    // fața (pagina lunii) + spatele triunghiular
    return `<defs>${shadow(s, 12, 8, 0.2)}</defs>
<g filter="url(#${s})">
  <polygon points="${cx - w / 2 + depth * 0.5},${baseY} ${cx + w / 2 + depth * 0.5},${baseY} ${cx + w / 2 + depth * 0.15},${topY + 6} ${cx - w / 2 + depth * 0.15},${topY + 6}" fill="#cbd5e1"/>
  <rect x="${cx - w / 2}" y="${topY}" width="${w}" height="${h}" rx="4" fill="#ffffff"/>
</g>
${artwork({ x: cx - w / 2, y: topY, w: w * 0.42, h }, { variant, text: false })}
<text x="${cx - w / 2 + w * 0.21}" y="${topY + h * 0.5}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${h * 0.1}" fill="#fff">Grafica</text>
<text x="${cx - w / 2 + w * 0.21}" y="${topY + h * 0.62}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${h * 0.1}" fill="#fff">ta aici</text>
${monthGrid({ x: cx - w / 2 + w * 0.47, y: topY + h * 0.08, w: w * 0.49, h: h * 0.84 }, "MARTIE", 6, 31)}
${spiral(cx - w / 2 + w * 0.06, cx + w / 2 - w * 0.06, topY + 2, 14)}`;
}

function pocketCard(b: Box, front: boolean, variant = 0): string {
    const s = nid("s");
    const r = b.w * 0.06;
    const clip = `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${r}"/>`;
    const inner = front
        ? artwork(b, { variant, clip })
        : `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" rx="${r}" fill="#ffffff"/>
           <text x="${b.x + b.w / 2}" y="${b.y + b.h * 0.1}" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="${b.h * 0.055}" fill="#0f172a">2027</text>
           ${[0, 1, 2, 3].map((i) => monthGrid({ x: b.x + b.w * (0.06 + (i % 2) * 0.46), y: b.y + b.h * (0.15 + Math.floor(i / 2) * 0.42), w: b.w * 0.42, h: b.h * 0.38 }, ["IAN", "FEB", "MAR", "APR"][i], (i * 3 + 4) % 7, [31, 28, 31, 30][i])).join("")}`;
    return `<defs>${shadow(s, 10, 8, 0.2)}</defs><g filter="url(#${s})">${clip.replace("/>", ' fill="#fff"/>')}</g>${inner}`;
}

function calendarPerete(): string {
    return page(wallCalendar({ x: 330, y: 170, w: 540, h: 860 }, 0));
}
function calendarBirou(): string {
    return page(deskCalendar(600, 860, 820, 470, 1));
}
function calendarBuzunar(): string {
    return page(
        `<g transform="rotate(-8 430 600)">${pocketCard({ x: 230, y: 330, w: 380, h: 543 }, true, 2)}</g>
         <g transform="rotate(6 770 600)">${pocketCard({ x: 590, y: 300, w: 380, h: 543 }, false)}</g>`
    );
}
function calendareTipuri(): string {
    return page(
        `${wallCalendar({ x: 120, y: 190, w: 400, h: 640 }, 0)}
         ${deskCalendar(800, 900, 520, 300, 1)}
         <g transform="rotate(-6 860 420)">${pocketCard({ x: 760, y: 250, w: 200, h: 286 }, true, 2)}</g>
         <g transform="rotate(5 1010 420)">${pocketCard({ x: 900, y: 260, w: 200, h: 286 }, false)}</g>`
    );
}

// ---------------------------------------------------------------------------------------------
type FlagShape = "lacrima" | "pana" | "drept";

/** Conturul pânzei (path) pentru fiecare formă, în cutia dată; stâlpul e pe marginea din stânga. */
function flagPath(shape: FlagShape, b: Box): string {
    const { x, y, w, h } = b;
    if (shape === "lacrima")
        return `M ${x} ${y + h} L ${x} ${y + h * 0.18} C ${x} ${y - h * 0.02} ${x + w * 0.95} ${y - h * 0.02} ${x + w} ${y + h * 0.22} C ${x + w} ${y + h * 0.55} ${x + w * 0.45} ${y + h * 0.85} ${x} ${y + h} Z`;
    if (shape === "pana")
        return `M ${x} ${y + h} L ${x} ${y + h * 0.06} C ${x + w * 0.2} ${y - h * 0.01} ${x + w} ${y} ${x + w} ${y + h * 0.1} L ${x + w} ${y + h * 0.82} C ${x + w * 0.7} ${y + h * 0.9} ${x + w * 0.3} ${y + h * 0.96} ${x} ${y + h} Z`;
    return `M ${x} ${y} L ${x + w} ${y} L ${x + w} ${y + h} L ${x} ${y + h} Z`;
}

function crossBase(cx: number, y: number, s = 1): string {
    return `<g stroke="#334155" stroke-width="${10 * s}" stroke-linecap="round">
  <line x1="${cx - 90 * s}" y1="${y + 18 * s}" x2="${cx + 90 * s}" y2="${y + 18 * s}"/>
  <line x1="${cx - 45 * s}" y1="${y + 30 * s}" x2="${cx + 45 * s}" y2="${y + 8 * s}"/></g>
  <rect x="${cx - 9 * s}" y="${y - 30 * s}" width="${18 * s}" height="${44 * s}" rx="${4 * s}" fill="#475569"/>`;
}

function beachflag(shape: FlagShape, cx: number, baseY: number, height: number, width: number, variant = 0, base = true): string {
    const s = nid("s");
    const poleX = cx - width / 2;
    const top = baseY - height;
    const flagBox: Box = { x: poleX, y: top, w: width, h: height * 0.84 };
    const d = flagPath(shape, flagBox);
    const curve =
        shape === "drept"
            ? `<line x1="${poleX}" y1="${top}" x2="${poleX + width}" y2="${top}" stroke="#94a3b8" stroke-width="6"/>`
            : `<path d="M ${poleX} ${baseY - 30} L ${poleX} ${top + height * 0.12}" stroke="#94a3b8" stroke-width="7" fill="none"/>`;
    return `<defs>${shadow(s, 12, 8, 0.18)}</defs>
<line x1="${poleX}" y1="${baseY - 20}" x2="${poleX}" y2="${top}" stroke="#94a3b8" stroke-width="8" stroke-linecap="round"/>
${curve}
<g filter="url(#${s})"><path d="${d}" fill="#fff"/></g>
${artwork(flagBox, { variant, clip: `<path d="${d}"/>` })}
${base ? crossBase(poleX, baseY - 10) : ""}`;
}

function beachflagSingle(shape: FlagShape, variant: number): string {
    const dims: Record<FlagShape, [number, number]> = { lacrima: [900, 380], pana: [960, 250], drept: [940, 300] };
    const [h, w] = dims[shape];
    return page(beachflag(shape, 600 + w / 2 - 40, 1060, h, w, variant));
}

function beachflagForme(): string {
    return page(
        `${beachflag("lacrima", 300, 1060, 760, 300, 0)}
         ${beachflag("pana", 640, 1060, 900, 200, 1)}
         ${beachflag("drept", 960, 1060, 840, 230, 2)}`
    );
}

function baze(): string {
    const label = (x: number, t: string) => `<text x="${x}" y="1010" text-anchor="middle" font-family="${FONT}" font-weight="700" font-size="44" fill="#0f172a">${t}</text>`;
    // cruce (perspectivă), țăruș tip melc, bază cu apă
    const cruce = `<g transform="translate(220 700)"><g stroke="#334155" stroke-width="22" stroke-linecap="round">
        <line x1="-170" y1="40" x2="170" y2="40"/><line x1="-80" y1="90" x2="80" y2="-10"/></g>
        <rect x="-20" y="-120" width="40" height="170" rx="10" fill="#475569"/></g>`;
    let spiralTurns = "";
    for (let i = 0; i < 7; i++) spiralTurns += `<ellipse cx="0" cy="${40 + i * 38}" rx="${46 - i * 5}" ry="12" fill="none" stroke="#475569" stroke-width="10"/>`;
    const tarus = `<g transform="translate(600 520)"><rect x="-14" y="-140" width="28" height="200" rx="8" fill="#475569"/>
        <rect x="-70" y="-150" width="140" height="22" rx="10" fill="#334155"/>${spiralTurns}
        <path d="M -8 300 L 0 345 L 8 300 Z" fill="#475569"/></g>`;
    const apa = `<g transform="translate(980 760)"><ellipse cx="0" cy="40" rx="170" ry="50" fill="#1e293b"/>
        <path d="M -170 40 L -150 -40 Q 0 -90 150 -40 L 170 40 Q 0 90 -170 40 Z" fill="#334155"/>
        <ellipse cx="0" cy="-44" rx="150" ry="40" fill="#475569"/><rect x="-18" y="-190" width="36" height="150" rx="8" fill="#64748b"/>
        <circle cx="80" cy="-50" r="16" fill="#0ea5e9"/></g>`;
    return page(`${cruce}${tarus}${apa}${label(220, "Cruce")}${label(600, "Țăruș")}${label(980, "Bază cu apă")}`);
}

const IMAGES: Record<string, () => string> = {
    "calendare-personalizate": calendareTipuri,
    "calendar-perete": calendarPerete,
    "calendar-birou": calendarBirou,
    "calendar-buzunar": calendarBuzunar,
    "steaguri-beachflag-forme": beachflagForme,
    "beachflag-lacrima": () => beachflagSingle("lacrima", 0),
    "beachflag-pana": () => beachflagSingle("pana", 1),
    "beachflag-dreptunghiular": () => beachflagSingle("drept", 2),
    "beachflag-baze": baze,
};

async function main() {
    fs.mkdirSync(OUT_DIR, { recursive: true });
    const only = process.argv[2];
    for (const [name, draw] of Object.entries(IMAGES)) {
        if (only && !name.includes(only)) continue;
        await sharp(Buffer.from(draw()), { density: 72 })
            .flatten({ background: "#ffffff" })
            .jpeg({ quality: 86, mozjpeg: true })
            .toFile(path.join(OUT_DIR, `${name}.jpg`));
    }
    console.log(`poze în ${path.relative(process.cwd(), OUT_DIR)}`);
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});
