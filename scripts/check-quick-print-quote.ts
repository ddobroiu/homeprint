import assert from "node:assert/strict";
import { QUICK_PRINT_PRODUCTS, quickPrintQuote } from "../lib/quickPrintQuote";
import { landingPriceFromUrl } from "../lib/merchant/landingPrice";
import { ALL_CONFIGURATORS as CONFIGURATORS_REGISTRY } from "../lib/configurators-registry";

let checked = 0;
for (const p of QUICK_PRINT_PRODUCTS) {
  if (p.mode === "guided") continue;
  for (const quantity of p.mode === "kit" ? [1] : [p.quantity, p.quantity * 10, p.quantity * 25]) {
    const quote = quickPrintQuote({ product: p.id, width: p.width, height: p.height, quantity });
    assert.ok(!("error" in quote), `${p.id}: valid selection rejected`);
    if ("error" in quote) continue;
    const landing = landingPriceFromUrl(quote.href);
    assert.ok(landing, `${p.id}: missing landing price`);
    assert.equal(quote.total, landing.price, `${p.id}: calculator must match destination price`);
    assert.equal(new URL(quote.href, "https://www.homeprint.ro").searchParams.get("q"), String(quantity));
    checked++;
  }
}
for (const invalid of [
  { product: "banner" as const, width: 0, height: 50, quantity: 1 },
  { product: "banner" as const, width: 501, height: 50, quantity: 1 },
  { product: "autocolante" as const, width: 10, height: 10, quantity: 49 },
  { product: "autocolante" as const, width: 138, height: 10, quantity: 50 },
  { product: "carti-vizita" as const, width: 9, height: 5, quantity: 99 },
  { product: "rollup" as const, width: 90, height: 200, quantity: 1 },
  { product: "rollup" as const, width: 85, height: 200, quantity: 1.5 },
  { product: "banner" as const, width: NaN, height: 50, quantity: 1 },
]) assert.ok("error" in quickPrintQuote(invalid));
// fiecare produs o singura data; lista = registrul de configuratoare (verificat mai jos), nu un numar fix
assert.equal(new Set(QUICK_PRINT_PRODUCTS.map(p => p.id)).size, QUICK_PRINT_PRODUCTS.length, "id duplicat in calculatorul rapid");
assert.deepEqual(QUICK_PRINT_PRODUCTS.map(p=>p.id).sort(), CONFIGURATORS_REGISTRY.map(p=>p.id).sort());
for (const p of QUICK_PRINT_PRODUCTS) for (const format of p.formats ?? []) {
 const quote = quickPrintQuote({product:p.id,width:p.width,height:p.height,quantity:p.quantity,format:format.key});
 assert.ok(!("error" in quote), p.id+" "+format.key);
 if (!("error" in quote)) assert.equal(quote.total, landingPriceFromUrl(quote.href)?.price);
 checked++;
}
console.log(`OK: ${checked} quotes match destination configurator prices; 8 invalid selections rejected.`);
