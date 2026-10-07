// Trusa pentru șabloanele „fluide”: se construiesc direct la formatul ales (mm), nu prin scalare.
// Fiecare familie de produse (banner, roll-up, afiș...) își împarte zona sigură în casete
// (rânduri / coloane) și pune în ele texte cu auto-fit, deci nimic nu iese din casetă oricât de
// lat sau de înalt ar fi formatul. Totul rămâne editabil în editor (text, forme, iconițe, poze).
import { uid } from "../doc";
import { linear, solid } from "../builders";
import type { Background, El, ImageEl, Paint, ShapeEl, SvgEl, TextEl } from "../types";

export { linear, solid };

export type Box = { x: number; y: number; w: number; h: number };

/** Contextul în care se construiește un șablon: formatul final și zonele de siguranță. */
export type Ctx = {
    productId: string;
    W: number;
    H: number;
    bleed: number;
    safe: number;
    /** zona de jos în care nu se pune nimic important (caseta roll-up-ului), mm */
    noGoBottom: number;
    /** zona sigură pentru text: în interiorul marginii de siguranță și deasupra zonei interzise */
    inner: Box;
    /** zona întreagă, cu tot cu bleed (pentru fundaluri și benzi de culoare) */
    full: Box;
    /** W / H */
    ar: number;
    /** latura mică */
    short: number;
};

export type Template = {
    id: string;
    name: string;
    /** produsele pentru care e gândit (la cele generice: ordinea în „Alte șabloane”) */
    products: string[];
    /** formatul de bază (la șabloanele fluide: doar formatul tipic, folosit la sortare) */
    baseW: number;
    baseH: number;
    background: Background | ((c: Ctx) => Background);
    /** fluide: primesc formatul real; generice: elemente în spațiul baseW × baseH */
    build: (c: Ctx) => El[];
    /** true = se construiește direct la format (fără adaptElements) */
    fluid?: boolean;
    /** „verso” = spatele unui produs față-verso */
    side?: "verso";
};

// ---------------- paleta comună ----------------
export const C = {
    green: "#075746",
    greenDark: "#06352b",
    greenLight: "#d9efe8",
    ink: "#14211c",
    cream: "#f6f2eb",
    gold: "#d8b45a",
    red: "#d62828",
    redDark: "#9d0208",
    yellow: "#ffd60a",
    blue: "#0b3d91",
    navy: "#0a2a66",
    orange: "#f77f00",
    white: "#ffffff",
    gray: "#5d6862",
    light: "#eef1ef",
};

// ---------------- casete ----------------
export const box = (x: number, y: number, w: number, h: number): Box => ({ x, y, w, h });
export const inset = (b: Box, dx: number, dy = dx): Box => ({ x: b.x + dx, y: b.y + dy, w: Math.max(0, b.w - 2 * dx), h: Math.max(0, b.h - 2 * dy) });

/** Împarte caseta în rânduri proporționale cu `weights`; `gap` = spațiu între rânduri (mm). */
export function rows(b: Box, weights: number[], gap = 0): Box[] {
    const total = weights.reduce((a, v) => a + v, 0) || 1;
    const free = Math.max(0, b.h - gap * (weights.length - 1));
    let y = b.y;
    return weights.map((wt) => {
        const h = (free * wt) / total;
        const r = { x: b.x, y, w: b.w, h };
        y += h + gap;
        return r;
    });
}

/** Împarte caseta în coloane proporționale cu `weights`. */
export function cols(b: Box, weights: number[], gap = 0): Box[] {
    const total = weights.reduce((a, v) => a + v, 0) || 1;
    const free = Math.max(0, b.w - gap * (weights.length - 1));
    let x = b.x;
    return weights.map((wt) => {
        const w = (free * wt) / total;
        const r = { x, y: b.y, w, h: b.h };
        x += w + gap;
        return r;
    });
}

type Align = "start" | "center" | "end";

/** Cea mai mare casetă cu raportul W/H între minAr și maxAr, așezată în `b`. */
export function clampAr(b: Box, minAr: number, maxAr: number, ay: Align = "center", ax: Align = "center"): Box {
    const ar = b.w / Math.max(1e-6, b.h);
    let w = b.w;
    let h = b.h;
    if (ar > maxAr) w = b.h * maxAr;
    else if (ar < minAr) h = b.w / minAr;
    const fx = ax === "start" ? 0 : ax === "end" ? 1 : 0.5;
    const fy = ay === "start" ? 0 : ay === "end" ? 1 : 0.5;
    return { x: b.x + (b.w - w) * fx, y: b.y + (b.h - h) * fy, w, h };
}

/** Cel mai mare pătrat din casetă. */
export const square = (b: Box, ay: Align = "center", ax: Align = "center") => clampAr(b, 1, 1, ay, ax);

/** Caseta de lățime / înălțime dată, centrată în `b` (limitată la `b`). */
export function centered(b: Box, w: number, h: number): Box {
    const ww = Math.min(w, b.w);
    const hh = Math.min(h, b.h);
    return { x: b.x + (b.w - ww) / 2, y: b.y + (b.h - hh) / 2, w: ww, h: hh };
}

/** O fracțiune din casetă (0..1), ca în CSS: x, y, w, h relative. */
export const part = (b: Box, fx: number, fy: number, fw: number, fh: number): Box => ({ x: b.x + b.w * fx, y: b.y + b.h * fy, w: b.w * fw, h: b.h * fh });

// ---------------- elemente ----------------
type TextOpts = Partial<Omit<TextEl, "type" | "id" | "text">> & {
    /** mărimea maximă a fontului (mm); fără ea, fontul umple înălțimea casetei */
    max?: number;
    /** câte rânduri ar trebui să încapă (implicit: rândurile din text) */
    lines?: number;
};

/**
 * Text care umple caseta: fontul pornește de la înălțimea casetei / rânduri și se micșorează
 * automat (auto-fit) dacă textul e prea lat. Textul e centrat vertical în casetă.
 */
export function txt(text: string, b: Box, o: TextOpts = {}): TextEl {
    const { max, lines, ...rest } = o;
    const lh = rest.lineHeight ?? 1.1;
    const n = Math.max(1, lines ?? text.split("\n").length);
    const size = Math.min(max ?? Infinity, b.h / (lh * n));
    return {
        id: uid(),
        type: "text",
        text,
        fontFamily: "Montserrat",
        fontWeight: 800,
        letterSpacing: 0,
        align: "center",
        fill: solid(C.ink),
        rotation: 0,
        opacity: 1,
        ...rest,
        x: b.x,
        y: b.y,
        w: b.w,
        h: b.h,
        fontSize: size,
        lineHeight: lh,
        autoFit: true,
    };
}

type ShapeOpts = Partial<Omit<ShapeEl, "type" | "id" | "shape">>;
const toPaint = (f: Paint | string | null): Paint | null => (typeof f === "string" ? solid(f) : f);

export function rect(b: Box, fill: Paint | string | null, o: ShapeOpts = {}): ShapeEl {
    return { id: uid(), type: "shape", shape: "rect", rotation: 0, opacity: 1, ...o, x: b.x, y: b.y, w: b.w, h: b.h, fill: toPaint(fill) };
}
export function ellipse(b: Box, fill: Paint | string | null, o: ShapeOpts = {}): ShapeEl {
    return { id: uid(), type: "shape", shape: "ellipse", rotation: 0, opacity: 1, ...o, x: b.x, y: b.y, w: b.w, h: b.h, fill: toPaint(fill) };
}
export function shape(kind: ShapeEl["shape"], b: Box, fill: Paint | string | null, o: ShapeOpts = {}): ShapeEl {
    return { id: uid(), type: "shape", shape: kind, rotation: 0, opacity: 1, ...o, x: b.x, y: b.y, w: b.w, h: b.h, fill: toPaint(fill) };
}
/** Linie orizontală centrată vertical în casetă. */
export function hline(b: Box, color: string, width: number, o: ShapeOpts = {}): ShapeEl {
    return { id: uid(), type: "shape", shape: "line", rotation: 0, opacity: 1, ...o, x: b.x, y: b.y + b.h / 2 - width / 2, w: b.w, h: width, fill: null, stroke: { color, width, ...(o.stroke ?? {}) } };
}

/** Iconiță / element din bibliotecă, pătrat, centrat în casetă. */
export function icon(ref: string, b: Box, color: string, o: Partial<Omit<SvgEl, "type" | "id" | "ref">> = {}): SvgEl {
    const s = square(b);
    return { id: uid(), type: "svg", ref, rotation: 0, opacity: 1, color, ...o, x: s.x, y: s.y, w: s.w, h: s.h };
}
/** Element din bibliotecă întins pe toată caseta (rame, linii decorative). */
export function deco(ref: string, b: Box, color: string, o: Partial<Omit<SvgEl, "type" | "id" | "ref">> = {}): SvgEl {
    return { id: uid(), type: "svg", ref, rotation: 0, opacity: 1, color, ...o, x: b.x, y: b.y, w: b.w, h: b.h };
}

/** Casetă pentru poza clientului („Pune poza ta aici”). Nu apare în fișierul de print cât e goală. */
export function photo(b: Box, o: Partial<Omit<ImageEl, "type" | "id">> = {}): ImageEl {
    return { id: uid(), type: "image", src: "", iw: 1600, ih: 1200, placeholder: true, rotation: 0, opacity: 1, name: "Poza ta", ...o, x: b.x, y: b.y, w: b.w, h: b.h };
}

/** Lățimea aproximativă a unui text (fără măsurare), pentru dimensionarea etichetelor. */
export function estWidth(text: string, size: number, family = "Montserrat", spacing = 0): number {
    const k: Record<string, number> = { Anton: 0.47, "Bebas Neue": 0.42, Oswald: 0.52, "Barlow Condensed": 0.48, Montserrat: 0.66, Inter: 0.6, Poppins: 0.64, "Archivo Black": 0.72 };
    const longest = Math.max(...text.split("\n").map((l) => [...l].length));
    return longest * size * ((k[family] ?? 0.62) + spacing / 1000);
}

type PillOpts = {
    bg: Paint | string;
    fg: string;
    icon?: string;
    iconColor?: string;
    font?: string;
    weight?: number;
    spacing?: number;
    radius?: number;
    stroke?: { color: string; width: number } | null;
    group?: string;
    /** lățimea se potrivește textului (implicit), altfel umple caseta */
    fill?: boolean;
};

/** Etichetă / buton: dreptunghi rotunjit cu iconiță opțională și text (de ex. telefonul). */
export function pill(b: Box, text: string, o: PillOpts): El[] {
    const g = o.group ?? `p${uid()}`;
    const h = b.h;
    const pad = h * 0.38;
    const ic = o.icon ? h * 0.52 : 0;
    const icGap = o.icon ? h * 0.22 : 0;
    const textH = h * 0.5;
    const tw = estWidth(text, textH / 1.1, o.font ?? "Montserrat", o.spacing ?? 0);
    const w = o.fill ? b.w : Math.min(b.w, pad * 2 + ic + icGap + tw);
    const x = b.x + (b.w - w) / 2;
    const out: El[] = [rect({ x, y: b.y, w, h }, o.bg, { radius: o.radius ?? h / 2, groupId: g, stroke: o.stroke ?? null, name: "Etichetă" })];
    if (o.icon) out.push(icon(o.icon, { x: x + pad, y: b.y + (h - ic) / 2, w: ic, h: ic }, o.iconColor ?? o.fg, { groupId: g, strokeScale: 1.25 }));
    const tx = x + pad + ic + icGap;
    out.push(txt(text, { x: tx, y: b.y + (h - textH) / 2, w: x + w - pad - tx, h: textH }, { fill: solid(o.fg), fontFamily: o.font ?? "Montserrat", fontWeight: o.weight ?? 800, letterSpacing: o.spacing ?? 0, groupId: g, align: o.icon ? "left" : "center" }));
    return out;
}

/** Iconiță + text pe un rând (ex. telefon, adresă), aliniate la stânga în casetă. */
export function iconLine(b: Box, ref: string, text: string, color: string, textColor: string, o: TextOpts = {}): El[] {
    const s = b.h;
    const g = `l${uid()}`;
    return [
        icon(ref, { x: b.x, y: b.y + s * 0.1, w: s * 0.8, h: s * 0.8 }, color, { groupId: g, strokeScale: 1.2 }),
        txt(text, { x: b.x + s * 1.15, y: b.y, w: b.w - s * 1.15, h: b.h }, { fontWeight: 500, fill: solid(textColor), align: "left", fontFamily: "Inter", ...o, groupId: g }),
    ];
}

/** Bandă de culoare pe toată lățimea (inclusiv bleed), sus sau jos. */
export function band(c: Ctx, y: number, h: number, fill: Paint | string, o: ShapeOpts = {}): ShapeEl {
    return rect({ x: c.full.x, y, w: c.full.w, h }, fill, { name: "Bandă", ...o });
}

/** Fundal care acoperă tot (inclusiv bleed). */
export const cover = (c: Ctx, fill: Paint | string, o: ShapeOpts = {}): ShapeEl => rect(c.full, fill, { name: "Fundal", ...o });

export type { Background, El, Paint };

// ---------------- compoziția standard: supratitlu / titlu / subtitlu / buton + iconiță ----------------
export type Line = {
    text: string;
    font?: string;
    weight?: number;
    color?: Paint | string;
    spacing?: number;
    italic?: boolean;
    lh?: number;
    lines?: number;
    uppercase?: boolean;
    shadow?: TextEl["shadow"];
    stroke?: TextEl["stroke"];
    max?: number;
};

export type StackSpec = {
    kicker?: Line;
    head: Line;
    sub?: Line;
    foot?: Line;
    /** butonul / eticheta (telefon, preț); primește caseta și o umple */
    cta?: (b: Box) => El[];
    /** raportul lățime/înălțime dorit al casetei butonului */
    ctaAr?: number;
    /** iconiță sau insignă (ex. „-50%”), lângă text la formatele late, deasupra la cele înalte */
    side?: (b: Box) => El[];
    sideAr?: number;
    weights?: Partial<Record<"kicker" | "head" | "sub" | "foot" | "cta" | "side", number>>;
    align?: "center" | "left";
    /** de la ce W/H trece în coloane (implicit 3.8) */
    wideAt?: number;
    /** sub ce W/H trece pe verticală (implicit 1.15) */
    tallAt?: number;
};

export function line(l: Line, b: Box, align: "center" | "left" = "center"): TextEl {
    return txt(l.text, b, {
        fontFamily: l.font ?? "Montserrat",
        fontWeight: l.weight ?? 800,
        fill: typeof l.color === "string" ? solid(l.color) : l.color ?? solid(C.ink),
        letterSpacing: l.spacing ?? 0,
        italic: l.italic,
        lineHeight: l.lh ?? 1.2,
        lines: l.lines,
        uppercase: l.uppercase,
        shadow: l.shadow ?? null,
        stroke: l.stroke ?? null,
        max: l.max,
        align,
    });
}

/**
 * Așază supratitlul, titlul, subtitlul, butonul și iconița în `area`, după formă:
 * foarte lat → coloane (iconiță | text | buton); normal → rânduri; înalt → rânduri, cu iconița sus.
 */
export function stack(area: Box, s: StackSpec): El[] {
    const ar = area.w / area.h;
    const wt = { kicker: 0.13, head: 0.42, sub: 0.15, foot: 0.11, cta: 0.2, side: 0.24, ...s.weights };
    const ctaAr = s.ctaAr ?? 4.6;
    const out: El[] = [];
    const textRows = (b: Box, align: "center" | "left", withCta: boolean) => {
        const keys = (["kicker", "head", "sub", "foot"] as const).filter((k) => s[k]);
        const all: Array<"kicker" | "head" | "sub" | "foot" | "cta"> = [...keys];
        if (withCta && s.cta) all.push("cta");
        const boxes = rows(b, all.map((k) => wt[k]), b.h * 0.035);
        all.forEach((k, i) => {
            if (k === "cta") {
                const r = boxes[i];
                const h = Math.min(r.h, r.w / ctaAr);
                const cb = align === "left" ? { x: r.x, y: r.y + (r.h - h) / 2, w: Math.min(r.w, h * ctaAr), h } : centered(r, h * ctaAr, h);
                out.push(...s.cta!(cb));
            } else out.push(line(s[k]!, boxes[i], align));
        });
    };
    if (ar >= (s.wideAt ?? 3.8)) {
        const gap = area.h * 0.18;
        const sideW = s.side ? area.h * (s.sideAr ?? 1) * 0.9 : 0;
        const ctaW = s.cta ? Math.min(area.w * 0.34, area.h * 0.46 * ctaAr) : 0;
        const textW = area.w - sideW - ctaW - (s.side ? gap : 0) - (s.cta ? gap : 0);
        let x = area.x;
        if (s.side) {
            out.push(...s.side(centered({ x, y: area.y, w: sideW, h: area.h }, sideW, area.h * 0.9)));
            x += sideW + gap;
        }
        textRows({ x, y: area.y, w: textW, h: area.h }, s.align ?? (s.side || s.cta ? "left" : "center"), false);
        x += textW + gap;
        if (s.cta) {
            const h = Math.min(area.h * 0.46, ctaW / ctaAr);
            out.push(...s.cta({ x, y: area.y + (area.h - h) / 2, w: ctaW, h }));
        }
        return out;
    }
    if (ar >= (s.tallAt ?? 1.15)) {
        if (s.side && ar >= 1.9) {
            const sideW = Math.min(area.w * 0.26, area.h * 0.62 * (s.sideAr ?? 1));
            const gap = area.w * 0.04;
            const [a, b] = [{ x: area.x, y: area.y, w: area.w - sideW - gap, h: area.h }, { x: area.x + area.w - sideW, y: area.y, w: sideW, h: area.h }];
            textRows(a, s.align ?? "center", true);
            out.push(...s.side(centered(b, sideW, sideW / (s.sideAr ?? 1))));
            return out;
        }
        if (s.side) {
            const [top, rest] = rows(area, [wt.side * 0.8, 1], area.h * 0.03);
            out.push(...s.side(top));
            textRows(rest, s.align ?? "center", true);
            return out;
        }
        textRows(area, s.align ?? "center", true);
        return out;
    }
    // înalt: compoziția într-o casetă de cel mult 1:2, centrată
    const content = clampAr(area, 0.5, 1.15);
    if (s.side) {
        const [top, rest] = rows(content, [wt.side * 1.2, 1], content.h * 0.03);
        out.push(...s.side(top));
        textRows(rest, s.align ?? "center", true);
    } else textRows(content, s.align ?? "center", true);
    return out;
}

/** Butonul de telefon standard. */
export const phonePill = (text: string, bg: Paint | string, fg: string, o: Partial<PillOpts> = {}) => (b: Box) => pill(b, text, { bg, fg, icon: "ic-phone", ...o });
/** Iconiță pentru `side`. */
export const sideIcon = (ref: string, color: string, o: Partial<Omit<SvgEl, "type" | "id" | "ref">> = {}) => (b: Box) => [icon(ref, b, color, { strokeScale: 1.1, ...o })];

/** Locul logo-ului: chenar rotunjit cu textul „LOGO” (se înlocuiește cu logo-ul încărcat). */
export function logoMark(b: Box, color: string, o: { text?: string; ar?: number; fill?: string } = {}): El[] {
    const lb = clampAr(b, o.ar ?? 2.4, o.ar ?? 2.4);
    const g = `logo${uid()}`;
    return [
        rect(lb, o.fill ?? null, { radius: lb.h * 0.2, stroke: { color, width: Math.max(0.3, lb.h * 0.04) }, groupId: g, name: "Logo" }),
        txt(o.text ?? "LOGO", inset(lb, lb.w * 0.12, lb.h * 0.28), { fill: solid(color), fontWeight: 900, letterSpacing: 200, groupId: g }),
    ];
}

/** Listă cu iconițe (ex. servicii), câte un rând pe element. */
export function bullets(b: Box, items: string[], ref: string, color: string, textColor: string, o: TextOpts = {}): El[] {
    const n = items.length;
    const rh = Math.min(b.h / (n * 1.45), b.w / 9);
    const total = rh * n + rh * 0.45 * (n - 1);
    let y = b.y + (b.h - total) / 2;
    const out: El[] = [];
    // aceeași mărime pentru toate rândurile (după cel mai lung), ca lista să arate uniform
    const longest = items.reduce((a, v) => (v.length > a.length ? v : a), "");
    const textW = b.w - rh * 1.15;
    const same = Math.min(rh / 1.1, textW / Math.max(1e-6, estWidth(longest, 1, o.fontFamily ?? "Inter")));
    for (const it of items) {
        out.push(...iconLine({ x: b.x, y, w: b.w, h: rh }, ref, it, color, textColor, { max: same, ...o }));
        y += rh * 1.45;
    }
    return out;
}

/** Restrânge caseta (un rând de text) la coarda cercului `d`, ca textul să nu iasă din cerc. */
export function chord(d: Box, b: Box, k = 0.86): Box {
    const cx = d.x + d.w / 2;
    const cy = d.y + d.h / 2;
    const r = (Math.min(d.w, d.h) / 2) * k;
    const dy = Math.max(Math.abs(b.y - cy), Math.abs(b.y + b.h - cy));
    const half = Math.sqrt(Math.max(0, r * r - dy * dy));
    const w = Math.min(b.w, 2 * half);
    return { x: cx - w / 2, y: b.y, w, h: b.h };
}
