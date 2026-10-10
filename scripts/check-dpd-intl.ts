// Verifică transportul internațional DPD (lib/intlShipping.ts + lib/parcels.ts) față de API-ul DPD.
//   npx tsx scripts/check-dpd-intl.ts            → coșuri de probă: colete, preț tabel, preț DPD pe viu, preț client
//   npx tsx scripts/check-dpd-intl.ts --tarife   → și tabelul de tarife pe fiecare țară / treaptă de greutate
// Doar cereri POST /calculate (nu creează expedieri). Citește DPD_* din .env; nu afișează datele de acces.
import fs from 'node:fs';
import path from 'node:path';
import { quoteInternationalShipping, describeIntlQuote, INTL_COUNTRIES, tariffPrice } from '../lib/intlShipping';
import { checkIntlQuoteLive, dpdCalculateShipment } from '../lib/dpdIntlLive';
import type { Parcel } from '../lib/parcels';

function loadEnv() {
    for (const f of ['.env', '.env.local']) {
        const p = path.join(process.cwd(), f);
        if (!fs.existsSync(p)) continue;
        for (const l of fs.readFileSync(p, 'utf8').split(/\r?\n/)) {
            const m = l.match(/^\s*(DPD_[A-Z_]+)\s*=\s*(.*)$/);
            if (m && !process.env[m[1]]) process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
        }
    }
}

const CARTS: Array<[string, string, any[]]> = [
    ['Banner frontlit 300×100', 'DE', [{ productId: 'banner-generic', slug: 'generic-banner', title: 'Banner Frontlit 300x100 cm', width: 300, height: 100, quantity: 1, metadata: { Material: 'Frontlit 440g (Standard)' } }]],
    ['Panou PVC forex 80×50 (3 mm)', 'HU', [{ productId: 'pvc-forex', title: 'PVC Forex 80x50 cm', width: 80, height: 50, quantity: 1, metadata: { Dimensiune: '80x50 cm', Grosime: '3 mm' } }]],
    ['Canvas pe șasiu 60×90', 'FR', [{ productId: 'canvas', title: 'Tablou Canvas 60x90 cm', quantity: 1, metadata: { Tip: 'Cu șasiu', width: 60, height: 90 } }]],
    ['Autocolant 200×50', 'PL', [{ productId: 'autocolante', title: 'Autocolant 200x50 cm', quantity: 1, metadata: { Material: 'Vinyl lucios', width: 200, height: 50 } }]],
    ['Autocolant 200×100', 'PL', [{ productId: 'autocolante', title: 'Autocolant 200x100 cm', quantity: 1, metadata: { Material: 'Vinyl lucios', width: 200, height: 100 } }]],
    ['2 × banner 500×300', 'DE', [{ productId: 'banner', title: 'Banner 500x300 cm', width: 500, height: 300, quantity: 2 }]],
    ['1000 flyere A5 170 g', 'HU', [{ productId: 'flayere', title: 'Flyere A5', quantity: 1000, metadata: { Dimensiune: 'A5', 'Hârtie': '170g' } }]],
    ['500 cărți de vizită', 'AT', [{ productId: 'carti-vizita', title: 'Cărți de vizită', quantity: 500, metadata: { Material: 'Carton 350g' } }]],
    ['Panou PVC 150×100 (5 mm)', 'DE', [{ productId: 'pvc-forex', title: 'PVC Forex 150x100 cm', width: 150, height: 100, quantity: 1, metadata: { Grosime: '5 mm' } }]],
    ['Panou PVC 200×100 (prea mare)', 'HU', [{ productId: 'pvc-forex', title: 'PVC Forex 200x100 cm', width: 200, height: 100, quantity: 1, metadata: { Grosime: '3 mm' } }]],
    ['Roll-up 85×200', 'SE', [{ productId: 'rollup', title: 'Roll-up 85x200', quantity: 1, metadata: { Dimensiune: '85x200 cm' } }]],
    ['2 panouri PVC 80×50 + autocolant 200×50', 'PL', [{ productId: 'pvc-forex', title: 'PVC Forex 80x50 cm', width: 80, height: 50, quantity: 2, metadata: { Grosime: '10 mm' } }, { productId: 'autocolante', title: 'Autocolant 200x50 cm', quantity: 1, metadata: { width: 200, height: 50 } }]],
    ['2 panouri PVC 80×50 + autocolant 200×50', 'HU', [{ productId: 'pvc-forex', title: 'PVC Forex 80x50 cm', width: 80, height: 50, quantity: 2, metadata: { Grosime: '10 mm' } }, { productId: 'autocolante', title: 'Autocolant 200x50 cm', quantity: 1, metadata: { width: 200, height: 50 } }]],
    ['10 tricouri', 'BG', [{ productId: 'tricouri', title: 'Tricou personalizat', quantity: 10 }]],
];

async function checkTariffs() {
    let bad = 0;
    for (const c of INTL_COUNTRIES) {
        const row: string[] = [];
        for (const kg of [1, 3, 5, 7, 10, 20, 30, 31.5]) {
            const table = tariffPrice(c.tariff, kg);
            const p: Parcel = { kind: 'generic', lengthCm: 30, widthCm: 20, heightCm: 10, weightKg: kg, volumetricKg: 1, chargeableKg: kg, pieces: 1, label: 'test' };
            const live = await dpdCalculateShipment(c.code, [p]);
            const ok = live.total != null && table != null && Math.abs(live.total - table) < 0.02;
            if (!ok) bad++;
            row.push(`${kg}kg ${table}${ok ? '' : ` ≠ DPD ${live.total ?? live.error}`}`);
        }
        console.log(`${c.code} (${c.tariff.serviceId}): ${row.join(' | ')}`);
    }
    console.log(bad ? `\n${bad} diferențe între tabel și DPD — actualizează lib/intlShipping.ts` : '\nTabelul de tarife = DPD pe viu.');
    return bad;
}

async function main() {
    loadEnv();
    let bad = 0;
    for (const [name, country, items] of CARTS) {
        const q = quoteInternationalShipping(country, items);
        if (!q.ok) { console.log(`${name} → ${country}: OFERTĂ PE EMAIL — ${q.error}`); continue; }
        const live = await checkIntlQuoteLive(q);
        if (live.diff != null && Math.abs(live.diff) > 0.02) bad++;
        console.log(`${name} → ${country}: ${q.shipments.length} expedieri | DPD tabel ${q.dpdTotal} | DPD pe viu ${live.dpdLive ?? live.error} | client ${q.price} RON`);
        console.log(`    ${describeIntlQuote(q)}: ${q.parcels.map((p) => `${p.kind} ${p.lengthCm}×${p.widthCm}×${p.heightCm} cm, ${p.weightKg} kg real / ${p.volumetricKg} kg vol.`).join('; ')}`);
    }
    if (process.argv.includes('--tarife')) bad += await checkTariffs();
    process.exitCode = bad ? 1 : 0;
}

main();
