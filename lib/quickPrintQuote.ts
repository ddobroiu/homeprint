import { landingPriceFromUrl } from "./merchant/landingPrice";
import { autocolanteMinQty } from "./quickPrintPresets";
import { ALL_CONFIGURATORS as CONFIGURATORS_REGISTRY } from "./configurators-registry";
import { QUICK_PRINT_PRODUCTS, quickPrintDefaultFormat, type QuickPrintSelection, type QuickPrintResult } from "./quickPrintProducts";
export { QUICK_PRINT_PRODUCTS } from "./quickPrintProducts";
export type { QuickPrintId, QuickPrintSelection } from "./quickPrintProducts";

export function quickPrintQuote(selection: QuickPrintSelection): QuickPrintResult {
  const { product, width, height, quantity } = selection;
  const item = QUICK_PRINT_PRODUCTS.find(p => p.id === product);
  if (!item) return {error: "Alege un produs din listă."};
  if (item.mode === "guided") return {error: "Alege un model în configuratorul de semnalistică."};
  if (["decor-foto-copil","personaj-propriu"].includes(product) && (width < 10 || height < 10 || width > 200 || height > 300)) return {error: "Decorul poate avea între 10 și 200 cm lățime și între 10 și 300 cm înălțime."};
  if (!item.mode && (!Number.isInteger(width) || !Number.isInteger(height))) return {error: "Introdu dimensiunile în centimetri întregi."};
  if (![width, height, quantity].every(Number.isFinite) || width <= 0 || height <= 0 || !Number.isInteger(quantity) || quantity < 1 || quantity > 100000) return { error: "Introdu dimensiuni valide și o cantitate între 1 și 100.000 de bucăți." };
  const limits = CONFIGURATORS_REGISTRY.find(p => p.id === product)?.dimensions;
  if (!item.mode && product !== "autocolante" && limits && ((limits.minWidth && width < limits.minWidth) || (limits.maxWidth && width > limits.maxWidth) || (limits.minHeight && height < limits.minHeight) || (limits.maxHeight && height > limits.maxHeight))) return {error: "Dimensiunile sunt în afara intervalului disponibil pentru acest produs."};
  if (["banner", "mesh", "banner-verso"].includes(product) && (width < 50 || height < 50 || width > 500 || height > 500)) return { error: "Pentru banner, fiecare dimensiune trebuie să fie între 50 și 500 cm." };
  if (product === "autocolante" && (width > 137 || height > 5000)) return { error: "Autocolantele pot avea maximum 137 cm lățime și 5.000 cm înălțime." };
  const minimum = product === "carti-vizita" ? 100 : product === "autocolante" ? autocolanteMinQty(width, height) : item.minQuantity ?? 1;
  if (quantity < minimum) return { error: `Pentru această configurație, cantitatea minimă este ${minimum} bucăți.` };
  if (product === "carti-vizita" && (width !== 9 || height !== 5)) return { error: "Formatul standard pentru cărți de vizită este 9 × 5 cm." };
  if (product === "rollup" && (![85, 100, 120, 150].includes(width) || height !== 200)) return { error: "Alege un roll-up de 85, 100, 120 sau 150 × 200 cm." };
  const params = new URLSearchParams({ w: String(width), h: String(height), q: String(quantity) });
  if (item.formats) {
    const format = selection.format ?? quickPrintDefaultFormat(item)!;
    if (!item.formats.some(f => f.key === format)) return {error: "Alege un format din listă."};
    if (item.mode === "kit") {
      if (quantity !== 1) return {error: "Elementele kitului se configurează individual."};
      const [group,value] = format.split(":"); params.set(group,value);
    } else if (product === "canvas") {
      const [w,h] = format.split("x"); params.set("w",w); params.set("h",h); params.set("framedSize",format); params.set("framedShape",w === h ? "square" : "rectangle"); params.set("type","framed");
    } else params.set("size",format);
  }
  const material = ["plexiglass","pvc-forex","alucobond","carton","polipropilena"].includes(product);
  const href = `/configurator/${material ? "materiale/" : ""}${product}?${params}`;
  const landing = landingPriceFromUrl(href);
  if (!landing || !Number.isFinite(landing.price) || landing.price <= 0) return {error: "Această configurație nu are un preț disponibil. Verifică opțiunile produsului."};
  return {total: landing.price, unit: landing.price / quantity, href};
}
