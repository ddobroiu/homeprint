// Verificarea pe server a prețurilor din coș, înainte de Stripe / ramburs (app/api/checkout/create-order).
// Browserul trimite prețul unitar calculat de configurator; aici:
//  1. respingem valorile imposibile (preț ≤ 0, NaN, cantități negative sau fracționare, coșuri uriașe);
//  2. pentru produsele din catalog (productId „cat-<slug>”) recalculăm din lib/catalog prețul MINIM posibil
//     pentru cantitatea (și dimensiunile) din coș și respingem prețul trimis dacă e sub el.
// Configuratoarele (banner, autocolante, canvas etc.) nu salvează în coș parametrii bruti de calcul,
// deci pentru ele rămâne doar verificarea de la punctul 1.
import { CATALOG_PRODUCTS, sqmPrice, type CatalogProduct } from "@/lib/catalog";

export const MAX_CART_ITEMS = 200;
export const MAX_ITEM_QUANTITY = 100_000;
export const MAX_UNIT_PRICE = 500_000;
/** Toleranța față de prețul minim din catalog (rotunjiri): 1% + 5 bani. */
const REL_TOLERANCE = 0.01;
const ABS_TOLERANCE = 0.05;

type GuardItem = {
  productId?: unknown;
  id?: unknown;
  quantity?: unknown;
  unitAmount?: unknown;
  price?: unknown;
  width?: unknown;
  height?: unknown;
  metadata?: any;
};

export type CheckoutGuardResult = { ok: true } | { ok: false; error: string };

const BY_SLUG = new Map<string, CatalogProduct[]>();
for (const p of CATALOG_PRODUCTS) {
  const list = BY_SLUG.get(p.slug);
  if (list) list.push(p);
  else BY_SLUG.set(p.slug, [p]);
}

function num(v: unknown): number {
  const n = typeof v === "string" ? Number(v.replace(",", ".")) : Number(v);
  return Number.isFinite(n) ? n : NaN;
}

function itemDimensions(it: GuardItem): { w: number; h: number } {
  const w = num(it.width ?? it.metadata?.width);
  const h = num(it.height ?? it.metadata?.height);
  return { w: w > 0 ? w : 0, h: h > 0 ? h : 0 };
}

/** Cel mai mic preț unitar posibil în catalog pentru produsul și cantitatea date; null = nu se poate calcula. */
export function catalogMinUnitPrice(product: CatalogProduct, quantity: number, widthCm: number, heightCm: number): number | null {
  if (product.kind === "variant") {
    const prices = (product.variants || []).map((v) => v.p).filter((p) => Number.isFinite(p) && p > 0);
    return prices.length ? Math.min(...prices) : null;
  }
  if (product.kind === "qty" && product.qty) {
    let idx = 0;
    product.qty.tiers.forEach((min, i) => {
      if (quantity >= min) idx = i;
    });
    const prices = product.qty.rows
      .map((r) => r.p[idx])
      .filter((p): p is number => typeof p === "number" && Number.isFinite(p) && p > 0);
    return prices.length ? Math.min(...prices) : null;
  }
  if (product.kind === "sqm" && product.sqm?.materials?.length) {
    if (!(widthCm > 0) || !(heightCm > 0)) return null;
    const prices = product.sqm.materials
      .map((m) => sqmPrice(m, widthCm, heightCm, quantity).unit)
      .filter((p) => Number.isFinite(p) && p > 0);
    return prices.length ? Math.min(...prices) : null;
  }
  return null;
}

function catalogFloor(it: GuardItem, quantity: number): number | null {
  const pid = String(it.productId ?? "");
  if (!pid.startsWith("cat-")) return null;
  const candidates = BY_SLUG.get(pid.slice(4));
  if (!candidates?.length) return null;
  const { w, h } = itemDimensions(it);
  const floors = candidates
    .map((p) => catalogMinUnitPrice(p, quantity, w, h))
    .filter((p): p is number => p !== null);
  return floors.length ? Math.min(...floors) : null;
}

/**
 * Verifică și normalizează articolele din coș (pune unitAmount = price numeric, quantity întreg).
 * Modifică `items` pe loc, ca restul rutei să folosească valorile verificate.
 */
export function guardCheckoutItems(items: unknown): CheckoutGuardResult {
  if (!Array.isArray(items) || items.length === 0) return { ok: false, error: "Coșul este gol." };
  if (items.length > MAX_CART_ITEMS) return { ok: false, error: "Prea multe produse în coș." };

  for (const raw of items) {
    if (!raw || typeof raw !== "object") return { ok: false, error: "Date de comandă invalide." };
    const it = raw as GuardItem & Record<string, unknown>;
    const quantity = num(it.quantity ?? 1);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > MAX_ITEM_QUANTITY) {
      return { ok: false, error: "Cantitate invalidă în coș." };
    }
    const unit = num(it.unitAmount ?? it.price);
    if (!Number.isFinite(unit) || unit <= 0 || unit > MAX_UNIT_PRICE) {
      return { ok: false, error: "Preț invalid în coș. Te rugăm să reîncarci pagina produsului și să îl adaugi din nou." };
    }
    const floor = catalogFloor(it, quantity);
    if (floor !== null && unit < floor * (1 - REL_TOLERANCE) - ABS_TOLERANCE) {
      console.warn("[checkoutGuard] preț sub catalog", { productId: String(it.productId).slice(0, 80), unit, floor, quantity });
      return { ok: false, error: "Prețul unui produs din coș nu mai este valabil. Te rugăm să îl adaugi din nou în coș." };
    }
    it.quantity = quantity;
    it.unitAmount = unit;
    if (it.price !== undefined) it.price = unit;
    // lib/orderService.ts citește și totalAmount/total din articol: le aliniem cu prețul verificat
    it.totalAmount = Math.round(unit * quantity * 100) / 100;
    if (it.total !== undefined) it.total = it.totalAmount;
  }
  return { ok: true };
}
