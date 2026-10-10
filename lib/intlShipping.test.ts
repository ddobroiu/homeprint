// Teste: npx tsx --test lib/intlShipping.test.ts  (fără rețea; prețurile = tariful DPD citit pe 10.10.2026)
import { test } from "node:test";
import assert from "node:assert/strict";
import { quoteInternationalShipping, tariffPrice, INTL_COUNTRIES, intlDeliveryEstimate, customerPrice } from "./intlShipping";
import { parcelsForItem, packingKind } from "./parcels";
import { getEstimatedShippingCost, validateDpdShipment, DPD_COUNTRIES } from "./shippingUtils";
import { shippingFeeFor } from "./paymentRules";

const banner = { productId: "banner-generic", title: "Banner Frontlit 300x100 cm", width: 300, height: 100, quantity: 1 };
const panou = { productId: "pvc-forex", title: "PVC Forex 80x50 cm", width: 80, height: 50, quantity: 1, metadata: { Grosime: "3 mm" } };
const canvas = { productId: "canvas", title: "Tablou Canvas 60x90 cm", quantity: 1, metadata: { Tip: "Cu șasiu", width: 60, height: 90 } };
const sticker = { productId: "autocolante", title: "Autocolant 200x50 cm", quantity: 1, metadata: { width: 200, height: 50 } };

test("țările: doar cele servite de DPD, fără Irlanda / UK / Elveția", () => {
    const codes = DPD_COUNTRIES.map((c) => c.code);
    assert.equal(codes[0], "RO");
    for (const c of ["HU", "BG", "DE", "FR", "PL", "SE", "LU"]) assert.ok(codes.includes(c), c);
    for (const c of ["IE", "GB", "CH", "NO", "CY", "MT", "US", "MD"]) assert.ok(!codes.includes(c), c);
    assert.equal(INTL_COUNTRIES.length, 23);
});

test("împachetare: banner pliat, autocolant rulat pe latura mică, panou în cutie plată", () => {
    assert.equal(packingKind(banner), "banner");
    const [b] = parcelsForItem(banner);
    assert.deepEqual([b.lengthCm, b.widthCm], [40, 30]);
    const [s] = parcelsForItem(sticker);
    assert.equal(s.kind, "roll");
    assert.equal(s.lengthCm, 60); // 50 + 10
    const [p] = parcelsForItem(panou);
    assert.deepEqual([p.lengthCm, p.widthCm], [85, 55]);
    assert.ok(p.chargeableKg > p.weightKg); // volumetric (L×l×h / 6000)
    assert.equal(packingKind({ productId: "carti-vizita", metadata: { Material: "Carton 350g" } }), "paper");
});

test("prețuri: tariful DPD + 10%, rotunjit în sus", () => {
    const de = quoteInternationalShipping("DE", [banner]);
    assert.equal(de.dpdTotal, 98.47);
    assert.equal(de.price, 109);
    assert.equal(quoteInternationalShipping("HU", [panou]).dpdTotal, 53.47);
    assert.equal(quoteInternationalShipping("FR", [canvas]).dpdTotal, 179.91);
    assert.equal(quoteInternationalShipping("PL", [sticker]).dpdTotal, 46.38);
    assert.equal(getEstimatedShippingCost("PL", [sticker]), customerPrice(46.38));
    // 2212: peste 30 kg, 7,48 lei pe kg început
    const hu = INTL_COUNTRIES.find((c) => c.code === "HU")!.tariff;
    assert.equal(tariffPrice(hu, 33), 241.26);
    // colet cu latura peste 100 cm: + taxa de manipulare 24,20
    assert.equal(quoteInternationalShipping("PL", [{ ...sticker, title: "Autocolant 200x100 cm", metadata: { width: 200, height: 100 } }]).dpdTotal, 70.58);
});

test("limite: panou prea mare / țară neservită → ofertă pe email", () => {
    const big = { ...panou, title: "PVC Forex 200x100 cm", width: 200, height: 100 };
    assert.equal(validateDpdShipment([big], "HU").valid, false);
    assert.match(validateDpdShipment([big], "HU").error || "", /oferta de transport pe email/);
    assert.equal(validateDpdShipment([panou], "IE").valid, false);
    assert.equal(validateDpdShipment([panou], "HU").valid, true);
});

test("transport gratuit peste prag doar în România; România neschimbată", () => {
    assert.equal(shippingFeeFor("RO", [panou], 600), 0);
    assert.equal(shippingFeeFor("RO", [panou], 100), 24);
    assert.equal(shippingFeeFor("DE", [banner], 600), 109);
});

test("termen de livrare: producție 2–3 zile + transport pe zonă, fără weekend", () => {
    const mon = new Date(2026, 9, 12, 10, 0); // luni 12 oct, înainte de 15:00
    const hu = intlDeliveryEstimate("HU", mon); // 4–6 zile lucrătoare
    assert.equal(hu.minDate.getDate(), 16);
    assert.equal(hu.maxDate.getDate(), 20);
    assert.equal(hu.label, "Livrare estimată: 16–20 octombrie");
    const fr = intlDeliveryEstimate("FR", mon); // 6–9 zile
    assert.equal(fr.label, "Livrare estimată: 20–23 octombrie");
});
