import type { Product } from "@/lib/products";
import { siteConfig } from "@/lib/siteConfig";

const MERCHANT_IMAGE_EXT = /\.(jpe?g|png|gif|webp)(\?|#|$)/i;

/**
 * Hosts whose URLs lie about their format: verified serving `image/webp` (or a
 * redirect/404 HTML page) for URLs ending in `.jpg`. Google fetches those and
 * rejects the product with "unsupported image type".
 */
const UNTRUSTED_IMAGE_HOSTS = ["shop.printcenter.ro", "dotcomcanvas.de"];

function isUntrustedImageHost(url: string): boolean {
  return UNTRUSTED_IMAGE_HOSTS.some((h) => url.includes(h));
}

/** Pagini SEO generate în masă — excluse din Merchant Center (limită articole + duplicate). */
const MASS_SEO_ID = /^seo-(canvas|pnrr|pub)-gen-/i;

/** Respinse / cu risc de politică Google Ads-Shopping (ca pe ShopPrint, Merchant API 07.10):
 * „personal hardships” (kituri PNRR), „gambling” (roata norocului), „weapons” (modele army / camuflaj),
 * „sexual interests” (clasificatorul automat pe poza modelului „produse tradiționale”, banner și mesh), drapelul Atolul Bikini.
 * Paginile rămân pe site; doar nu se trimit în Merchant. */
const POLICY_RISK_PATHS = new Set([
  "/configurator/fonduri-pnrr",
  "/banner-product/produse-traditionale-telefon-personalizat",
  "/banner-product/mesh-produse-traditionale-telefon-personalizat",
  "/produse/promotionale/roata-norocului",
  "/produse/promotionale/bandana-tubulara-army",
  "/produse/promotionale/bandana-tubulara-spots-army",
  "/produse/promotionale/bandana-tubulara-camouflage",
  "/produse/steaguri-si-drapele/drapel-atolul-bikini",
]);

export function includeProductInMerchantFeed(product: Product): boolean {
  if (MASS_SEO_ID.test(String(product.id || ""))) return false;
  return !POLICY_RISK_PATHS.has(new URL(merchantProductCanonicalLink(product, "https://feed.local")).pathname);
}

function roundMoney(n: number): number {
  return Math.round(n * 100) / 100;
}

/** Minimum price in RON from product variants metadata, if any. */
function minVariantPriceRON(product: Product): number | null {
  const variants = product.metadata?.variants;
  if (!Array.isArray(variants)) return null;
  let min: number | null = null;
  for (const v of variants) {
    const raw = (v as { price?: number }).price;
    if (typeof raw !== "number" || !Number.isFinite(raw) || raw <= 0) continue;
    min = min === null ? raw : Math.min(min, raw);
  }
  return min !== null ? roundMoney(min) : null;
}

/**
 * Numeric price in RON for Google Merchant (feed + structured data).
 * Uses priceBase; if missing/zero, falls back to cheapest variant from metadata.
 */
export function merchantPriceRON(product: Product): number | null {
  const base =
    typeof product.priceBase === "number" && Number.isFinite(product.priceBase)
      ? product.priceBase
      : 0;
  if (base > 0) return roundMoney(base);
  const fromVariants = minVariantPriceRON(product);
  if (fromVariants !== null && fromVariants > 0) return fromVariants;
  return null;
}

/**
 * Google Merchant image_link allows JPEG, PNG, GIF (not WebP).
 * Returns an absolute HTTPS URL.
 */
export function merchantImageLink(
  imageCandidate: string | undefined,
  baseUrl: string
): string {
  const base = baseUrl.replace(/\/$/, "");
  const fallback = `${base}/logo.svg`;

  if (!imageCandidate || !String(imageCandidate).trim()) {
    return fallback;
  }

  let url = String(imageCandidate).trim();
  if (url.startsWith("//")) url = `https:${url}`;
  else if (url.startsWith("/")) url = `${base}${url}`;
  else if (!/^https?:\/\//i.test(url)) url = `${base}/${url}`;

  if (isUntrustedImageHost(url)) return fallback;

  if (MERCHANT_IMAGE_EXT.test(url)) return url;

  if (/\.avif(\?|#|$)/i.test(url)) {
    return fallback;
  }

  // Keep the real asset URL: Merchant Center supports WebP.

  return fallback;
}

export function formatMerchantPriceAttribute(price: number, currency: string): string {
  const cur = (currency || "RON").toUpperCase();
  return `${roundMoney(price)} ${cur}`;
}

/** Google Merchant / CSV: two decimals + ISO 4217 currency (e.g. `60.00 RON`). */
export function formatMerchantPriceAttributeStrict(price: number, currency: string): string {
  const cur = (currency || "RON").toUpperCase();
  return `${roundMoney(price).toFixed(2)} ${cur}`;
}

const MAX_DESC = 5000;
/** Google Merchant `title` max 150 characters. */
const MAX_MERCHANT_TITLE = 150;

export function merchantFeedTitle(title: string | undefined, fallback: string): string {
  const raw = (title && String(title).trim()) || String(fallback || "").trim() || "Produs";
  const oneLine = raw.replace(/\r\n|\n|\r/g, " ").replace(/\s+/g, " ").trim();
  return oneLine.length <= MAX_MERCHANT_TITLE ? oneLine : oneLine.slice(0, MAX_MERCHANT_TITLE);
}

export function merchantDescription(text: string | undefined, fallback: string): string {
  const raw = (text && String(text).trim()) || fallback;
  const oneLine = raw.replace(/\r\n|\n|\r/g, " ").replace(/\s+/g, " ").trim();
  return oneLine.length <= MAX_DESC ? oneLine : oneLine.slice(0, MAX_DESC - 1) + "…";
}

/** Loose shape for JSON-LD / client components (Configurator passes partial objects). */
export type MerchantProductLike = {
  priceBase?: number;
  metadata?: Product["metadata"];
  price?: string | number | null;
};

function parseFirstPositiveNumber(text: string): number | null {
  const m = String(text).match(/(\d+([.,]\d+)?)/);
  if (!m) return null;
  const n = parseFloat(m[1].replace(",", "."));
  if (!Number.isFinite(n) || n <= 0) return null;
  return roundMoney(n);
}

/**
 * Resolves a display price for Merchant + schema: `priceBase`, variant metadata,
 * then numeric `price`, then first number in a string (e.g. "De la 60 LEI").
 */
export function coerceMerchantPriceFromUnknown(
  input: MerchantProductLike | null | undefined
): number | null {
  if (!input) return null;
  const fromProduct = merchantPriceRON(input as Product);
  if (fromProduct !== null) return fromProduct;
  if (typeof input.price === "number" && Number.isFinite(input.price) && input.price > 0) {
    return roundMoney(input.price);
  }
  if (typeof input.price === "string" && input.price.trim()) {
    return parseFirstPositiveNumber(input.price);
  }
  return null;
}

export function absoluteShopUrl(href: string | undefined, baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, "");
  if (!href || !href.trim()) return base;
  const h = href.trim();
  if (h.startsWith("//")) return `https:${h}`;
  if (/^https?:\/\//i.test(h)) return h;
  return `${base}${h.startsWith("/") ? h : `/${h}`}`;
}

/** Canonical product landing URL for Merchant feed (CSV + XML). */
export function merchantProductCanonicalLink(product: Product, baseUrl: string): string {
  const base = baseUrl.replace(/\/$/, "");
  const rs = product.routeSlug;
  if (rs) {
    if (rs.startsWith("http")) return rs;
    const path = rs.startsWith("/") ? rs : `/${rs}`;
    return `${base}${path}`;
  }
  return `${base}/shop/product/${encodeURIComponent(String(product.slug || product.id))}`;
}

/** One or more absolute image URLs safe for Google Merchant (no WebP-only). */
export function normalizeMerchantImageList(
  raw: string | string[] | undefined,
  baseUrl: string
): string[] {
  const list = Array.isArray(raw) ? raw : raw ? [raw] : [];
  const out = list
    .filter((s) => s && String(s).trim())
    .map((s) => merchantImageLink(String(s), baseUrl));
  if (out.length === 0) return [merchantImageLink(undefined, baseUrl)];
  return out;
}

export type MerchantShippingOffer = {
  country: string;
  service: string;
  priceAttribute: string;
  csvCell: string;
};

export function merchantStandardShippingOffer(): MerchantShippingOffer {
  const std = siteConfig.shipping?.standardDelivery;
  const price =
    typeof std?.price === "number" && Number.isFinite(std.price) && std.price >= 0
      ? std.price
      : 24;
  const cur = (std?.currency || "RON").toUpperCase();
  const priceAttribute = formatMerchantPriceAttributeStrict(price, cur);
  const service = String(std?.service || "Standard").trim() || "Standard";
  return {
    country: "RO",
    service,
    priceAttribute,
    csvCell: `RO:::${priceAttribute}`,
  };
}
