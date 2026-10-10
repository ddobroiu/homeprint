// Transport internațional DPD: țările în care livrăm și prețul pentru coșul real.
// Fără dependențe de server: același calcul în checkout (client), la crearea comenzii, în Stripe,
// în e-mailuri și pe factură (aceeași sumă peste tot).
//
// Tarifele sunt cele din contractul nostru DPD, citite pe 10.10.2026 cu POST /calculate
// (sumă finală cu TVA 21% + combustibil 22,2%; nu suntem plătitori de TVA, deci totalul = costul nostru).
// Verificare / actualizare: `npx tsx scripts/check-dpd-intl.ts` (compară tabelul cu API-ul DPD).
// - 2212 DPD REGIONAL CEE: Ungaria și Bulgaria primesc mai multe colete într-o expediere (taxat pe greutatea
//   taxabilă totală); PL, CZ, SK, SI, HR, GR primesc UN SINGUR colet pe expediere (API: „Allowed [1, 1]”).
// - 2303 DPD INTERNATIONAL (ROAD): un singur colet pe expediere.
// Unde nu se acceptă mai multe colete, fiecare colet e o expediere separată (preț și AWB separat).
// - Taxă manipulare 20 lei + TVA = 24,20 lei pentru fiecare colet cu o latură peste 100 cm.
// Țările fără niciun serviciu DPD în contract (ex. Irlanda, Cipru, Malta, Norvegia, Elveția, UK, SUA,
// Republica Moldova, Serbia) nu apar în listă.

import { planParcels, DPD_VOLUMETRIC_DIVISOR, DPD_INTL_PARCEL_LIMITS, type Parcel } from './parcels';

export { DPD_VOLUMETRIC_DIVISOR, DPD_INTL_PARCEL_LIMITS };

/** Adaosul nostru peste costul DPD (10%), rotunjit în sus la leu. */
export const INTL_SHIPPING_MARGIN = 0.1;
export const DPD_LONG_PARCEL_FEE_RON = 24.2;
const LONG_PARCEL_CM = 100;

type Tariff = {
    serviceId: 2212 | 2303;
    serviceName: string;
    /** [greutate maximă kg, preț total RON] crescător */
    bands: Array<[number, number]>;
    /** RON pe fiecare kg (rotunjit în sus) peste ultima treaptă — doar la expedierile cu mai multe colete */
    perKgOver?: number;
    /** DPD acceptă mai multe colete într-o expediere (verificat cu /calculate, parcelsCount 2) */
    multiParcel: boolean;
};

const CEE_NEAR: Tariff = { serviceId: 2212, serviceName: 'DPD Regional CEE', bands: [[1, 29.85], [3, 36.14], [5, 53.47], [7, 73.94], [10, 94.42], [20, 133.78], [30, 218.82]], perKgOver: 7.48, multiParcel: true };
const CEE: Tariff = { serviceId: 2212, serviceName: 'DPD Regional CEE', bands: [[1, 40.87], [3, 46.38], [5, 72.37], [7, 97.56], [10, 132.99], [20, 181.02], [30, 255.04]], perKgOver: 7.48, multiParcel: false };
const WEST_1: Tariff = { serviceId: 2303, serviceName: 'DPD International', bands: [[3, 98.47], [10, 110.86], [20, 123.14], [31.5, 147.72]], multiParcel: false };
const WEST_2: Tariff = { serviceId: 2303, serviceName: 'DPD International', bands: [[3, 164.96], [10, 179.91], [20, 195.04], [31.5, 224.95]], multiParcel: false };
const WEST_3: Tariff = { serviceId: 2303, serviceName: 'DPD International', bands: [[3, 224.95], [10, 344.96], [20, 404.94], [31.5, 449.97]], multiParcel: false };

export type IntlCountry = { code: string; name: string; isoNumeric: number; tariff: Tariff };

/** Țările în care DPD ne livrează (verificate cu /calculate pe 10.10.2026), în ordinea din formular. */
export const INTL_COUNTRIES: IntlCountry[] = [
    { code: 'HU', name: 'Ungaria', isoNumeric: 348, tariff: CEE_NEAR },
    { code: 'BG', name: 'Bulgaria', isoNumeric: 100, tariff: CEE_NEAR },
    { code: 'AT', name: 'Austria', isoNumeric: 40, tariff: WEST_1 },
    { code: 'DE', name: 'Germania', isoNumeric: 276, tariff: WEST_1 },
    { code: 'IT', name: 'Italia', isoNumeric: 380, tariff: WEST_1 },
    { code: 'FR', name: 'Franța', isoNumeric: 250, tariff: WEST_2 },
    { code: 'ES', name: 'Spania', isoNumeric: 724, tariff: WEST_2 },
    { code: 'GR', name: 'Grecia', isoNumeric: 300, tariff: CEE },
    { code: 'BE', name: 'Belgia', isoNumeric: 56, tariff: WEST_2 },
    { code: 'NL', name: 'Olanda', isoNumeric: 528, tariff: WEST_2 },
    { code: 'PL', name: 'Polonia', isoNumeric: 616, tariff: CEE },
    { code: 'CZ', name: 'Cehia', isoNumeric: 203, tariff: CEE },
    { code: 'SK', name: 'Slovacia', isoNumeric: 703, tariff: CEE },
    { code: 'DK', name: 'Danemarca', isoNumeric: 208, tariff: WEST_2 },
    { code: 'SE', name: 'Suedia', isoNumeric: 752, tariff: WEST_3 },
    { code: 'FI', name: 'Finlanda', isoNumeric: 246, tariff: WEST_3 },
    { code: 'PT', name: 'Portugalia', isoNumeric: 620, tariff: WEST_3 },
    { code: 'HR', name: 'Croația', isoNumeric: 191, tariff: CEE },
    { code: 'SI', name: 'Slovenia', isoNumeric: 705, tariff: CEE },
    { code: 'EE', name: 'Estonia', isoNumeric: 233, tariff: WEST_2 },
    { code: 'LV', name: 'Letonia', isoNumeric: 428, tariff: WEST_2 },
    { code: 'LT', name: 'Lituania', isoNumeric: 440, tariff: WEST_2 },
    { code: 'LU', name: 'Luxemburg', isoNumeric: 442, tariff: WEST_2 },
];

export const INTL_OFFER_MESSAGE = 'Pentru această destinație vă trimitem oferta de transport pe email.';

export function normalizeCountry(country: string | null | undefined): string {
    const c = String(country || 'RO').toUpperCase().trim();
    return c === 'ROMANIA' || c === 'ROMÂNIA' ? 'RO' : c;
}

export function intlCountry(country: string | null | undefined): IntlCountry | undefined {
    const c = normalizeCountry(country);
    return INTL_COUNTRIES.find((x) => x.code === c);
}

/** Prețul DPD (RON, cu TVA și combustibil) pentru o greutate taxabilă, după tabel. */
export function tariffPrice(t: Tariff, kg: number): number | null {
    for (const [max, price] of t.bands) if (kg <= max + 1e-9) return price;
    if (!t.perKgOver) return null;
    const [lastMax, lastPrice] = t.bands[t.bands.length - 1];
    return Math.round((lastPrice + Math.ceil(kg - lastMax - 1e-9) * t.perKgOver) * 100) / 100;
}

export type IntlShipment = { parcels: Parcel[]; chargeableKg: number; dpdTotal: number };

export type IntlQuote = {
    ok: boolean;
    country: string;
    countryName?: string;
    serviceId?: number;
    serviceName?: string;
    parcels: Parcel[];
    shipments: IntlShipment[];
    chargeableKg: number;
    /** costul DPD (RON, cu TVA + combustibil) */
    dpdTotal: number;
    /** prețul pentru client = cost DPD + 10%, rotunjit în sus la leu */
    price: number;
    /** de ce nu se poate calcula automat (țară neservită / colet peste limite) */
    error?: string;
};

/** Gruparea coletelor în expedieri: toate într-una unde DPD acceptă mai multe colete (HU, BG), altfel câte una pe colet. */
export function groupShipments(t: Tariff, parcels: Parcel[]): Parcel[][] {
    if (!parcels.length) return [];
    return t.multiParcel ? [parcels] : parcels.map((p) => [p]);
}

export function quoteInternationalShipping(country: string | null | undefined, items: any[]): IntlQuote {
    const code = normalizeCountry(country);
    const c = intlCountry(code);
    const base: IntlQuote = { ok: false, country: code, parcels: [], shipments: [], chargeableKg: 0, dpdTotal: 0, price: 0 };
    if (!c) return { ...base, error: `${INTL_OFFER_MESSAGE} Livrarea automată nu este disponibilă în țara aleasă.` };
    const plan = planParcels(items);
    const out: IntlQuote = { ...base, countryName: c.name, serviceId: c.tariff.serviceId, serviceName: c.tariff.serviceName, parcels: plan.parcels };
    if (plan.problems.length) return { ...out, error: `${INTL_OFFER_MESSAGE} ${plan.problems[0]}` };
    if (!plan.parcels.length) return { ...out, ok: true };

    const shipments: IntlShipment[] = [];
    for (const group of groupShipments(c.tariff, plan.parcels)) {
        const kg = Math.round(group.reduce((s, p) => s + p.chargeableKg, 0) * 10) / 10;
        const base = tariffPrice(c.tariff, kg);
        if (base == null) return { ...out, error: `${INTL_OFFER_MESSAGE} Greutatea depășește limita DPD pentru o expediere.` };
        const longFees = group.filter((p) => p.lengthCm > LONG_PARCEL_CM).length * DPD_LONG_PARCEL_FEE_RON;
        shipments.push({ parcels: group, chargeableKg: kg, dpdTotal: Math.round((base + longFees) * 100) / 100 });
    }
    const dpdTotal = Math.round(shipments.reduce((s, x) => s + x.dpdTotal, 0) * 100) / 100;
    return {
        ...out,
        ok: true,
        shipments,
        chargeableKg: Math.round(plan.parcels.reduce((s, p) => s + p.chargeableKg, 0) * 10) / 10,
        dpdTotal,
        price: customerPrice(dpdTotal),
    };
}

/** Cost DPD + 10%, rotunjit în sus la leu. */
export function customerPrice(dpdTotal: number): number {
    return Math.ceil(dpdTotal * (1 + INTL_SHIPPING_MARGIN) - 1e-9);
}

/** Text scurt pentru checkout / e-mail: „DPD International · 1 colet · 2 kg taxabil”. */
export function describeIntlQuote(q: IntlQuote): string {
    if (!q.ok) return q.error || INTL_OFFER_MESSAGE;
    const n = q.parcels.length;
    const kg = q.chargeableKg.toLocaleString('ro-RO', { maximumFractionDigits: 1 });
    return `${q.serviceName} · ${q.countryName} · ${n} ${n === 1 ? 'colet' : 'colete'} · ${kg} kg taxabil`;
}

/** Rezumatul salvat pe comandă (adresa de livrare JSON). */
export function intlQuoteSummary(q: IntlQuote) {
    return {
        country: q.country,
        serviceId: q.serviceId,
        dpdTotal: q.dpdTotal,
        price: q.price,
        chargeableKg: q.chargeableKg,
        parcels: q.parcels.map((p) => ({ kind: p.kind, cm: [p.lengthCm, p.widthCm, p.heightCm], kg: p.weightKg, chargeableKg: p.chargeableKg, pieces: p.pieces })),
    };
}

// --- Termen de livrare internațional ---
// Producție 2–3 zile lucrătoare + transport DPD pe zone (zile lucrătoare). Nu ne bazăm pe deliveryDeadline
// din API-ul DPD: pentru transportul rutier internațional e prea optimist.
export const INTL_PRODUCTION_DAYS: [number, number] = [2, 3];

export const INTL_TRANSIT_DAYS: Record<string, [number, number]> = {
    HU: [2, 3], BG: [2, 3],
    PL: [3, 4], CZ: [3, 4], SK: [3, 4], AT: [3, 4], SI: [3, 4], HR: [3, 4], GR: [3, 4],
    DE: [3, 5], IT: [3, 5],
    FR: [4, 6], ES: [4, 6], PT: [4, 6], NL: [4, 6], BE: [4, 6], LU: [4, 6], DK: [4, 6],
    SE: [4, 6], FI: [4, 6], IE: [4, 6], EE: [4, 6], LV: [4, 6], LT: [4, 6],
};
const DEFAULT_TRANSIT: [number, number] = [4, 6];

function addBusinessDays(from: Date, days: number): Date {
    const d = new Date(from);
    let added = 0;
    while (added < days) {
        d.setDate(d.getDate() + 1);
        const wd = d.getDay();
        if (wd !== 0 && wd !== 6) added++;
    }
    return d;
}

export type IntlDeliveryEstimate = { minDays: number; maxDays: number; minDate: Date; maxDate: Date; range: string; label: string };

/** Interval de date, ex. „18–21 octombrie” sau „30 octombrie – 3 noiembrie” (locale implicit ro-RO). */
export function formatDateRange(minDate: Date, maxDate: Date, locale = 'ro-RO'): string {
    const day = (d: Date) => d.toLocaleDateString(locale, { day: 'numeric' });
    const dayMonth = (d: Date) => d.toLocaleDateString(locale, { day: 'numeric', month: 'long' });
    if (minDate.toDateString() === maxDate.toDateString()) return dayMonth(maxDate);
    if (minDate.getMonth() === maxDate.getMonth() && minDate.getFullYear() === maxDate.getFullYear()) {
        // „18–21 octombrie”: luna doar o dată (în engleză / germană ordinea e tot cea a locale-ului)
        const full = dayMonth(maxDate);
        return full.replace(day(maxDate), `${day(minDate)}–${day(maxDate)}`);
    }
    return `${dayMonth(minDate)} – ${dayMonth(maxDate)}`;
}

/**
 * Data estimată de livrare în țara aleasă: ziua de start + producție (2–3 zile lucrătoare) + transport pe zonă,
 * sărind peste weekend. `label` e în română; pentru alte limbi se folosește `range` cu alt locale.
 */
export function intlDeliveryEstimate(country: string | null | undefined, now: Date = new Date(), locale = 'ro-RO'): IntlDeliveryEstimate {
    const [tMin, tMax] = INTL_TRANSIT_DAYS[normalizeCountry(country)] || DEFAULT_TRANSIT;
    const minDays = INTL_PRODUCTION_DAYS[0] + tMin;
    const maxDays = INTL_PRODUCTION_DAYS[1] + tMax;
    // comenzile de după ora 15:00 sau din weekend intră în lucru în următoarea zi lucrătoare (ca lib/shipping.ts)
    const wd = now.getDay();
    const start = wd !== 0 && wd !== 6 && now.getHours() < 15 ? now : addBusinessDays(now, 1);
    const minDate = addBusinessDays(start, minDays);
    const maxDate = addBusinessDays(start, maxDays);
    const range = formatDateRange(minDate, maxDate, locale);
    return { minDays, maxDays, minDate, maxDate, range, label: `Livrare estimată: ${range}` };
}
