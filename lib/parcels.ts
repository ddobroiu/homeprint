// Coletele reale ale unui coș (dimensiuni + greutate), pentru transportul internațional DPD.
// Helper comun și reutilizabil (fără dependențe de server): îl folosesc lib/intlShipping.ts și alte site-uri.
//
// Reguli de împachetare (stabilite cu proprietarul, 10.10.2026):
// - BANNERE (frontlit / mesh / blockout): se PLIAZĂ într-o cutie / pungă compactă 40×30 cm
//   (60×40 peste 6 m²); grosimea crește cu suprafața. Greutate = m² × g/m² + ambalaj.
// - AUTOCOLANTE / FOLIE / AFIȘE / TAPET / canvas fără șasiu: se RULEAZĂ în tub; lungimea tubului =
//   latura MICĂ a printului + 10 cm (latura aceea nu se poate plia), diametrul crește cu suprafața.
// - PANOURI RIGIDE (PVC forex, alucobond, plexiglas, polipropilenă, carton): cutie plată
//   (L+5) × (l+5) × (grosime teanc + 5) cm; nu se pliază / rulează, cele mari pot depăși limitele DPD.
// - CANVAS pe șasiu: cutie la mărimea ramei + 5 cm, adâncime 8 cm (+4 cm pentru fiecare tablou în plus).
// - FLYERE / PLIANTE / CĂRȚI DE VIZITĂ / BROȘURI: cutie mică, după cantitate și gramaj.
// - TEXTILE: pungă. ROLL-UP: geanta casetei.
// Produsele cu colet declarat (metadata.packageCm / packageKg, lib/packageInfo.ts) își păstrează coletul.
//
// Greutatea taxabilă DPD = max(greutate reală, L × l × h / 6000) — divizorul 6000 verificat pe API-ul
// DPD /calculate (serviciul 2212: cutia 40×35×20 = 28000 cm³ e taxată ca 4,67 kg, nu ca 5,6 kg).

import { declaredPackage } from './packageInfo';

export const DPD_VOLUMETRIC_DIVISOR = 6000;

/** Limitele DPD internațional pe colet (API: max 31,5 kg; standard DPD Classic: lungime 175, L+2(l+h) ≤ 300). */
export const DPD_INTL_PARCEL_LIMITS = {
    maxWeightKg: 31.5,
    maxLengthCm: 175,
    maxGirthCm: 300,
} as const;

/** Greutatea țintă la care împărțim cantitățile mari în mai multe colete. */
const SPLIT_TARGET_KG = 25;

export type ParcelKind = 'banner' | 'roll' | 'rigid' | 'canvas' | 'paper' | 'textile' | 'rollup' | 'declared' | 'generic';

export type Parcel = {
    kind: ParcelKind;
    /** laturile coletului în cm, descrescător (lungime ≥ lățime ≥ înălțime) */
    lengthCm: number;
    widthCm: number;
    heightCm: number;
    /** greutatea reală (kg) */
    weightKg: number;
    /** greutatea volumetrică (kg) = L×l×h / 6000 */
    volumetricKg: number;
    /** greutatea taxabilă = max(reală, volumetrică), rotunjită în sus la 0,1 kg */
    chargeableKg: number;
    /** câte bucăți din produs sunt în colet */
    pieces: number;
    /** produsul din coș (titlu) */
    label: string;
};

export type ParcelPlan = {
    parcels: Parcel[];
    /** coletele care depășesc limitele DPD (motivul, pe înțelesul clientului) */
    problems: string[];
};

const round1 = (n: number) => Math.ceil(n * 10 - 1e-9) / 10;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

function norm(s: unknown): string {
    return String(s ?? '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
}

function itemText(item: any): string {
    const m = item?.metadata && typeof item.metadata === 'object' ? item.metadata : {};
    const o = item?.options && typeof item.options === 'object' ? item.options : {};
    return norm([
        item?.productId, item?.slug, item?.routeSlug, item?.title, item?.name,
        m.productType, m.Material, m.material, m.Tip, m['Hârtie'], m.Grosime, m.Dimensiune,
        o.material, o.productType,
    ].filter(Boolean).join(' | '));
}

function itemId(item: any): string {
    return norm([item?.productId, item?.slug, item?.routeSlug].filter(Boolean).join(' | '));
}

const PAPER_FORMATS_CM: Record<string, [number, number]> = {
    a0: [84.1, 118.9], a1: [59.4, 84.1], a2: [42, 59.4], a3: [29.7, 42], a4: [21, 29.7],
    a5: [14.8, 21], a6: [10.5, 14.8], a7: [7.4, 10.5], dl: [9.9, 21], s5: [50, 70], s7: [70, 100],
};

/** Dimensiunea unei bucăți în cm (lățime, înălțime) sau null dacă nu se poate afla. */
export function itemSizeCm(item: any): { w: number; h: number } | null {
    const text = norm([item?.title, item?.name, JSON.stringify(item?.metadata || item?.options || {})].join(' '));
    // „300x100 cm”, „297×420 mm”, „1,5 x 2 m” — cea mai mare pereche găsită
    const rx = /(\d+(?:[.,]\d+)?)\s*[x×*]\s*(\d+(?:[.,]\d+)?)\s*(mm|cm|m\b)?/g;
    let best: { w: number; h: number } | null = null;
    let m: RegExpExecArray | null;
    while ((m = rx.exec(text)) !== null) {
        const unit = m[3] || 'cm';
        const k = unit === 'mm' ? 0.1 : unit === 'm' ? 100 : 1;
        const w = parseFloat(m[1].replace(',', '.')) * k;
        const h = parseFloat(m[2].replace(',', '.')) * k;
        if (!(w >= 2 && h >= 2) || w > 2000 || h > 2000) continue;
        if (!best || w * h > best.w * best.h) best = { w, h };
    }
    if (best) return best;
    const num = (v: unknown) => { const n = parseFloat(String(v ?? '').replace(',', '.')); return Number.isFinite(n) && n > 0 ? n : 0; };
    const meta = item?.metadata || {};
    let w = num(meta.width), h = num(meta.height);
    if (w && h) return { w, h };
    w = num(item?.width); h = num(item?.height);
    if (w && h) return { w, h };
    const f = text.match(/\b(a[0-7]|dl|s5|s7)\b/);
    if (f) { const [a, b] = PAPER_FORMATS_CM[f[1]]; return { w: a, h: b }; }
    if (/carti[- ]?(de[- ])?vizita|business card/.test(text)) return { w: 9, h: 5 };
    return null;
}

/** Tipul de împachetare al unui produs din coș. */
export function packingKind(item: any): ParcelKind {
    if (declaredPackage(item)) return 'declared';
    const t = itemText(item);
    const id = itemId(item);
    // întâi după produs (productId / slug), apoi după tot textul (titlu, material)
    for (const src of [id, t]) {
        if (!src) continue;
        if (/tricou|hanorac|sepci|sapca|textil|tote|sacos|maieu|polo/.test(src)) return 'textile';
        if (/roll-?up/.test(src)) return 'rollup';
        if (/canvas|tablou/.test(src)) return /fara (sasiu|rama)|doar (panza|print)|print-only|fara-rama/.test(t) ? 'roll' : 'canvas';
        if (/flyer|flayer|plian|vizita|brosur|catalog|calendar|comunicat|invitat|felicit|meniu|etichet|carnet|agend|mapa|plic|cupon|voucher|fluturas/.test(src)) return 'paper';
        if (/autocolant|sticker|folie|vinil|vinyl|window|tapet|wallpaper|afis|poster|blueback|whiteback/.test(src)) return 'roll';
        if (/banner|mesh|frontlit|backlit|blockout|steag|panza/.test(src)) return 'banner';
        // „carton 350g” = hârtie groasă (cărți de vizită, afișe); „carton” fără gramaj = placă rigidă
        if (/forex|alucobond|dibond|\bbond\b|plexi|polipropilen|akylux|placut|placa|panou|semnalistic|personaj|decor-foto|kapa|pvc/.test(src)) return 'rigid';
        if (/carton/.test(src) && !/carton \d{2,3}\s*g/.test(src)) return 'rigid';
    }
    return 'generic';
}

function makeParcel(kind: ParcelKind, dims: number[], weightKg: number, pieces: number, label: string): Parcel {
    const [lengthCm, widthCm, heightCm] = dims.map((d) => Math.ceil(d)).sort((a, b) => b - a);
    const volumetricKg = (lengthCm * widthCm * heightCm) / DPD_VOLUMETRIC_DIVISOR;
    const weight = round1(weightKg);
    return {
        kind, lengthCm, widthCm, heightCm,
        weightKg: weight,
        volumetricKg: round1(volumetricKg),
        chargeableKg: round1(Math.max(weight, volumetricKg)),
        pieces, label,
    };
}

/** Împarte `qty` bucăți în colete de câte maxim `perParcel` (minim 1). */
function splitQty(qty: number, perParcel: number): number[] {
    const per = Math.max(1, Math.floor(perParcel));
    const out: number[] = [];
    for (let left = qty; left > 0; left -= per) out.push(Math.min(per, left));
    return out;
}

function thicknessMm(text: string, fallback: number): number {
    const m = text.match(/(\d+(?:[.,]\d+)?)\s*mm\b/);
    const v = m ? parseFloat(m[1].replace(',', '.')) : NaN;
    return Number.isFinite(v) && v > 0 && v <= 30 ? v : fallback;
}

function gsmOf(text: string, fallback: number): number {
    const m = text.match(/(\d{2,3})\s*(g\/m|g\/mp|gr|g\b|gsm)/);
    const v = m ? parseInt(m[1], 10) : NaN;
    return Number.isFinite(v) && v >= 60 && v <= 700 ? v : fallback;
}

// --- reguli pe tip de produs (o bucată → colete) ---

function bannerParcels(item: any, size: { w: number; h: number }, qty: number, label: string): Parcel[] {
    const t = itemText(item);
    // frontlit 440/510 g/m² + tiv și capse; mesh ~370 g/m²; blockout / verso ~650 g/m²
    const kgPerM2 = /mesh/.test(t) ? 0.42 : /verso|blockout|backlit/.test(t) ? 0.7 : 0.58;
    const pieceM2 = (size.w * size.h) / 10000;
    // cutie de cel mult ~45 m² (≈ 27 kg); o bucată nu se taie, deci rămâne întreagă
    const perBox = Math.max(1, Math.floor(45 / Math.max(pieceM2, 0.01)));
    return splitQty(qty, perBox).map((n) => {
        const m2 = pieceM2 * n;
        const big = m2 > 6;
        const [l, w] = big ? [60, 40] : [40, 30];
        const h = clamp(4 + (big ? 0.75 : 1.5) * m2, 5, 60);
        return makeParcel('banner', [l, w, h], m2 * kgPerM2 + 0.3, n, label);
    });
}

function rollParcels(item: any, size: { w: number; h: number }, qty: number, label: string): Parcel[] {
    const t = itemText(item);
    const short = Math.min(size.w, size.h);
    const long = Math.max(size.w, size.h);
    // bucățile mici (≤ A4 pe latura mică) nu se rulează: plic / cutie plată
    if (short <= 21 && long <= 30) return paperParcels(item, size, qty, label, 0.3);
    const canvas = /canvas|tablou|panza/.test(t);
    const wallpaper = /tapet|wallpaper/.test(t);
    const poster = /afis|poster|blueback|whiteback|hartie|satin|foto/.test(t) && !/autocolant|folie|vinil/.test(t);
    const kgPerM2 = canvas ? 0.45 : wallpaper ? 0.4 : poster ? gsmOf(t, 150) / 1000 : 0.3; // autocolant + liner ≈ 300 g/m²
    const thickCm = canvas ? 0.05 : wallpaper ? 0.04 : poster ? 0.02 : 0.03;
    const tubeLen = Math.max(30, short + 10);
    const pieceM2 = (size.w * size.h) / 10000;
    const parcels: Parcel[] = [];
    // un tub: cel mult ~20 kg și diametru ≤ 35 cm
    const diameterFor = (n: number) => {
        const wound = long * n; // lungimea rulată (cm)
        return Math.sqrt(8 * 8 + (4 * wound * thickCm) / Math.PI) + 2; // tub de carton Ø8 + perete
    };
    let perTube = qty;
    while (perTube > 1 && (pieceM2 * perTube * kgPerM2 > 20 || diameterFor(perTube) > 35)) perTube = Math.ceil(perTube / 2);
    for (const n of splitQty(qty, perTube)) {
        const d = Math.max(10, diameterFor(n));
        parcels.push(makeParcel('roll', [tubeLen, d, d], pieceM2 * n * kgPerM2 + 0.15 + 0.004 * tubeLen, n, label));
    }
    return parcels;
}

function rigidParcels(item: any, size: { w: number; h: number }, qty: number, label: string): Parcel[] {
    const t = itemText(item);
    let kgPerM2PerMm = 0.65; // PVC forex (spumat) ≈ 0,55–0,7 g/cm³
    let mm = 3;
    if (/alucobond|dibond|\bbond\b/.test(t)) { kgPerM2PerMm = 1.3; mm = 3; }
    else if (/plexi/.test(t)) { kgPerM2PerMm = 1.19; mm = 3; }
    else if (/polipropilen|akylux/.test(t)) { kgPerM2PerMm = 0.14; mm = 3.5; }
    else if (/carton|kapa/.test(t)) { kgPerM2PerMm = 0.25; mm = 5; }
    mm = thicknessMm(t, mm);
    const L = Math.max(size.w, size.h) + 5;
    const W = Math.min(size.w, size.h) + 5;
    const pieceKg = (size.w * size.h) / 10000 * kgPerM2PerMm * mm;
    const boxKg = 0.2 + 0.5 * (L * W) / 10000 * 2; // carton dublu pe ambele fețe
    // teanc de cel mult 20 cm și ~25 kg pe cutie
    const perBox = Math.min(Math.floor(200 / mm), Math.floor((SPLIT_TARGET_KG - boxKg) / Math.max(pieceKg, 0.01)));
    return splitQty(qty, perBox).map((n) => makeParcel('rigid', [L, W, (n * mm) / 10 + 5], pieceKg * n + boxKg, n, label));
}

function canvasParcels(size: { w: number; h: number }, qty: number, label: string): Parcel[] {
    const L = Math.max(size.w, size.h) + 5;
    const W = Math.min(size.w, size.h) + 5;
    // pânză ~0,45 kg/m² + șasiu de lemn 2 cm (~0,3 kg pe metru de perimetru) + colțare
    const pieceKg = (size.w * size.h) / 10000 * 0.45 + ((2 * (size.w + size.h)) / 100) * 0.3 + 0.1;
    const boxKg = 0.2 + 0.5 * (L * W) / 10000 * 2;
    return splitQty(qty, 5).map((n) => makeParcel('canvas', [L, W, 4 + 4 * n], pieceKg * n + boxKg, n, label));
}

function paperParcels(item: any, size: { w: number; h: number }, qty: number, label: string, fallbackKgPerM2?: number): Parcel[] {
    const t = itemText(item);
    const gsm = fallbackKgPerM2 ? fallbackKgPerM2 * 1000 : gsmOf(t, /vizita/.test(t) ? 350 : 170);
    // pliantele vin împăturite: suprafața rămâne, amprenta scade (A4 → ~A5)
    let { w, h } = size;
    if (/plian/.test(t) && Math.max(w, h) > 21) { w = Math.min(w, h); h = Math.max(size.w, size.h) / 2; }
    const pieceKg = (size.w * size.h) / 10000 * (gsm / 1000);
    const pieceCm = gsm * 0.0001; // ~1 µm la 1 g/m²
    const perBox = Math.max(1, Math.floor(15 / Math.max(pieceKg, 1e-6)));
    return splitQty(qty, perBox).map((n) => makeParcel('paper',
        [Math.max(w, h) + 4, Math.min(w, h) + 4, clamp(n * pieceCm + 3, 4, 60)],
        pieceKg * n * 1.05 + 0.2, n, label));
}

function textileParcels(item: any, qty: number, label: string): Parcel[] {
    const t = itemText(item);
    const pieceKg = /hanorac/.test(t) ? 0.6 : /sepci|sapca/.test(t) ? 0.12 : /tote|sacos/.test(t) ? 0.15 : 0.22;
    return splitQty(qty, 25).map((n) => makeParcel('textile', [35, 25, clamp(3 + 2 * n, 4, 50)], pieceKg * n + 0.05, n, label));
}

function rollupParcels(size: { w: number; h: number } | null, qty: number, label: string): Parcel[] {
    const w = size ? Math.min(size.w, size.h) : 85; // lățimea casetei (85 / 100 / 120 / 150)
    const kg = w <= 100 ? 3.5 : w <= 120 ? 4.5 : 6;
    return splitQty(qty, 1).map((n) => makeParcel('rollup', [w + 10, 15, 15], kg * n, n, label));
}

function declaredParcels(item: any, qty: number, label: string): Parcel[] {
    const one = declaredPackage({ ...item, quantity: 1 });
    if (!one) return [];
    const perBox = Math.max(1, Math.floor(SPLIT_TARGET_KG / Math.max(one.unitKg, 0.01)));
    return splitQty(qty, perBox).map((n) => {
        const pkg = declaredPackage({ ...item, quantity: n })!;
        return makeParcel('declared', pkg.box, pkg.kg + 0.2, n, label);
    });
}

function genericParcels(size: { w: number; h: number } | null, qty: number, label: string, item: any): Parcel[] {
    if (size && Math.max(size.w, size.h) > 35) return rigidParcels(item, size, qty, label);
    if (size) return paperParcels(item, size, qty, label, 0.3);
    return splitQty(qty, 20).map((n) => makeParcel('generic', [30, 20, clamp(5 + 2 * n, 5, 50)], 0.5 * n, n, label));
}

/** Coletele pentru un produs din coș. */
export function parcelsForItem(item: any): Parcel[] {
    const qty = Math.max(1, Math.round(Number(item?.quantity ?? item?.qty ?? 1)) || 1);
    const label = String(item?.title || item?.name || item?.slug || item?.productId || 'Produs');
    const kind = packingKind(item);
    const size = itemSizeCm(item);
    switch (kind) {
        case 'declared': return declaredParcels(item, qty, label);
        case 'textile': return textileParcels(item, qty, label);
        case 'rollup': return rollupParcels(size, qty, label);
        case 'banner': return size ? bannerParcels(item, size, qty, label) : genericParcels(null, qty, label, item);
        case 'roll': return size ? rollParcels(item, size, qty, label) : genericParcels(null, qty, label, item);
        case 'rigid': return size ? rigidParcels(item, size, qty, label) : genericParcels(null, qty, label, item);
        case 'canvas': return size ? canvasParcels(size, qty, label) : genericParcels(null, qty, label, item);
        case 'paper': return paperParcels(item, size || { w: 21, h: 14.8 }, qty, label);
        default: return genericParcels(size, qty, label, item);
    }
}

/** Motivul pentru care un colet nu poate pleca prin DPD internațional (sau null). */
export function parcelProblem(p: Parcel): string | null {
    const lim = DPD_INTL_PARCEL_LIMITS;
    if (p.lengthCm > lim.maxLengthCm) return `„${p.label}”: coletul are ${p.lengthCm} cm (DPD internațional primește maximum ${lim.maxLengthCm} cm pe latură).`;
    if (p.lengthCm + 2 * (p.widthCm + p.heightCm) > lim.maxGirthCm) return `„${p.label}”: coletul ${p.lengthCm}×${p.widthCm}×${p.heightCm} cm depășește dimensiunea maximă DPD internațional.`;
    if (p.chargeableKg > lim.maxWeightKg) return `„${p.label}”: coletul are ${p.chargeableKg} kg taxabile (DPD internațional primește maximum ${lim.maxWeightKg} kg pe colet).`;
    return null;
}

/** Toate coletele coșului + problemele de limită DPD. */
export function planParcels(items: any[]): ParcelPlan {
    const parcels = (items || []).flatMap((it) => parcelsForItem(it));
    const problems = parcels.map(parcelProblem).filter((x): x is string => !!x);
    return { parcels, problems: Array.from(new Set(problems)) };
}
