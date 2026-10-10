// Verificarea pe viu (server) a prețului DPD internațional: POST /calculate cu coletele reale ale coșului.
// Prețul pentru client rămâne cel din tabel (lib/intlShipping.ts), ca să fie același în checkout, Stripe,
// e-mail și factură; aici doar comparăm cu DPD și salvăm rezultatul pe comandă. Dacă DPD cere mai mult
// decât tabelul (tarif / combustibil schimbat), apare un avertisment în log — atunci se actualizează
// tabelul (scripts/check-dpd-intl.ts). Doar cereri /calculate (fără expedieri create).

import { intlCountry, groupShipments, type IntlQuote } from './intlShipping';
import type { Parcel } from './parcels';

const BASE_URL = 'https://api.dpd.ro/v1';
const CACHE_MS = 6 * 3_600_000;
const TIMEOUT_MS = 5000;
const cache = new Map<string, { at: number; total: number | null; error?: string }>();

/** Codul poștal implicit pentru țările unde DPD îl cere la calcul (Bulgaria). */
const DEFAULT_POSTCODE: Record<string, string> = { BG: '1000' };

export type DpdLiveShipmentPrice = { total: number | null; error?: string };

export async function dpdCalculateShipment(countryCode: string, parcels: Parcel[], postCode?: string): Promise<DpdLiveShipmentPrice> {
    const c = intlCountry(countryCode);
    const userName = process.env.DPD_USERNAME;
    const password = process.env.DPD_PASSWORD;
    const sender = Number(process.env.DPD_SENDER_CLIENT_ID || 0) || undefined;
    if (!c || !userName || !password) return { total: null, error: 'DPD indisponibil' };
    const pc = (postCode || '').trim() || DEFAULT_POSTCODE[c.code];
    const key = JSON.stringify([c.code, pc || '', parcels.map((p) => [p.lengthCm, p.widthCm, p.heightCm, p.chargeableKg])]);
    const hit = cache.get(key);
    if (hit && Date.now() - hit.at < CACHE_MS) return { total: hit.total, error: hit.error };

    const body = {
        userName, password, language: 'EN',
        ...(sender ? { sender: { clientId: sender } } : {}),
        recipient: { privatePerson: true, addressLocation: { countryId: c.isoNumeric, ...(pc ? { postCode: pc } : {}) } },
        service: { serviceIds: [c.tariff.serviceId], autoAdjustPickupDate: true },
        content: {
            parcelsCount: parcels.length,
            totalWeight: Math.round(parcels.reduce((s, p) => s + p.chargeableKg, 0) * 10) / 10,
            contents: 'Materiale tiparite', package: 'BOX',
            // greutatea trimisă = greutatea taxabilă (volumetrică inclusă), ca să nu depindem de serviciu
            parcels: parcels.map((p, i) => ({ seqNo: i + 1, weight: p.chargeableKg, size: { width: p.widthCm, depth: p.lengthCm, height: p.heightCm } })),
        },
        payment: { courierServicePayer: 'SENDER' },
    };
    let result: DpdLiveShipmentPrice;
    try {
        const res = await fetch(`${BASE_URL}/calculate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json; charset=utf-8' },
            body: JSON.stringify(body),
            signal: AbortSignal.timeout(TIMEOUT_MS),
        });
        const data: any = await res.json().catch(() => null);
        const calc = Array.isArray(data?.calculations) ? data.calculations[0] : null;
        const total = Number(calc?.price?.total);
        result = Number.isFinite(total) && total > 0
            ? { total }
            : { total: null, error: String(calc?.error?.message || data?.error?.message || `HTTP ${res.status}`).replace(/\s*\(EE\w+\)\s*$/, '') };
    } catch (e: any) {
        return { total: null, error: String(e?.message || e) }; // erorile de rețea nu se țin în cache
    }
    cache.set(key, { at: Date.now(), ...result });
    return result;
}

export type DpdLiveCheck = { dpdLive: number | null; dpdTable: number; diff: number | null; error?: string; checkedAt: string };

/** Costul DPD pe viu pentru cotația din tabel (aceleași colete și expedieri). Nu aruncă erori. */
export async function checkIntlQuoteLive(quote: IntlQuote, postCode?: string): Promise<DpdLiveCheck> {
    const checkedAt = new Date().toISOString();
    const c = intlCountry(quote.country);
    if (!quote.ok || !c) return { dpdLive: null, dpdTable: quote.dpdTotal, diff: null, error: quote.error || 'fără cotație', checkedAt };
    let total = 0;
    for (const group of groupShipments(c.tariff, quote.parcels)) {
        const r = await dpdCalculateShipment(c.code, group, postCode);
        if (r.total == null) return { dpdLive: null, dpdTable: quote.dpdTotal, diff: null, error: r.error, checkedAt };
        total += r.total;
    }
    const dpdLive = Math.round(total * 100) / 100;
    const diff = Math.round((dpdLive - quote.dpdTotal) * 100) / 100;
    if (diff > 0.5) console.warn(`[DPD intl] costul DPD pe viu (${dpdLive} RON) e mai mare decât tabelul (${quote.dpdTotal} RON) pentru ${quote.country}; actualizează lib/intlShipping.ts`);
    return { dpdLive, dpdTable: quote.dpdTotal, diff, checkedAt };
}
