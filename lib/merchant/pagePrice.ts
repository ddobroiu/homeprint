// lib/merchant/pagePrice.ts
//
// Prețul din feedul Google Merchant = prețul pe care îl arată pagina produsului la deschidere
// (aceeași logică ca pe ShopPrint: lib/merchant/landingPrice.ts + catalog + semnalistică).
// Un produs al cărui preț de pagină nu se poate calcula exact NU intră în feed (Google respinge
// articolele cu preț diferit de pagină). Folosit de feed (app/api/products/feed, app/feed.csv)
// și de scripts/check-merchant-feed.ts (npm run check:merchant).

import { CATALOG_PRODUCTS, findVariant, qtyUnitPrice, sqmPrice, type CatalogProduct } from "@/lib/catalog";
import { signageProducts, type SignageProduct } from "@/lib/products/signage-products";
import { landingPriceFromUrl, type LandingPrice } from "@/lib/merchant/landingPrice";

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Selecția cu care pornește components/catalog/CatalogProductView.tsx (copiat din componentă, ca pe ShopPrint). */
function catalogInitialSelection(p: CatalogProduct): string[] {
    if (p.kind === "variant" && p.variants?.length) return [...p.variants[0].o];
    if (p.kind === "qty" && p.qty?.rows.length) {
        const row = p.qty.rows.find((r) => r.p.some((x) => x !== null)) ?? p.qty.rows[0];
        return [...row.o];
    }
    return p.options.map((o) => o.values[0]);
}

const CATALOG_SQM_INITIAL = { width: 100, height: 100 } as const;

/** Prețul total afișat la deschiderea paginii /produse/<categorie>/<slug> (null = pagina nu are preț). */
export function catalogInitialPrice(p: CatalogProduct): number | null {
    const selection = catalogInitialSelection(p);
    const quantity = p.qty?.minQty ?? 1;
    let total: number | null = null;
    if (p.kind === "variant") {
        const v = findVariant(p, selection);
        if (v) total = v.p * quantity;
    } else if (p.kind === "sqm" && p.sqm?.materials[0]) {
        total = sqmPrice(p.sqm.materials[0], CATALOG_SQM_INITIAL.width, CATALOG_SQM_INITIAL.height, quantity).total;
    } else if (p.kind === "qty" && p.qty) {
        const unit = qtyUnitPrice(p.qty, selection, quantity);
        if (unit !== null) total = unit * quantity;
    }
    return total !== null && total > 0 ? round2(total) : null;
}

/** components/configurator/SignageConfigurator.tsx: prima variantă (sau prețul de bază, dimensiunea „Standard”), 1 buc. */
export function signageInitialPrice(p: SignageProduct): number {
    const price = p.variants && p.variants.length > 0 ? p.variants[0]?.price || p.price : p.price;
    return round2(price);
}

/** Personaje / mărci ale altora: produsele cu ele nu se pun în Google Shopping (ca pe ShopPrint). */
const LICENSED_CHARACTERS =
    /\b(bluey|sonic|disney|frozen|elsa|paw ?patrol|spider-?man|batman|superman|minnie|mickey|peppa|pok[eé]mon|pikachu|barbie|marvel|minecraft|mario|hello kitty|stitch|cars|lego)\b/i;
/** Modele cu mesaj de reducere / promoție: Google tratează titlul ca text promoțional. */
const PROMO_THEMED = /black friday|lichidare|ofert[aă]|reduceri|reducere|promo[tț]i|\bsale\b/i;

/** Produse care NU se trimit în Merchant, cu motiv (aceleași reguli ca pe ShopPrint). */
export const MERCHANT_PAGE_EXCLUSIONS: Array<{ reason: string; test: (path: string, title: string) => boolean }> = [
    {
        reason: "tablouri canvas cu opere preluate (drepturi de autor, poze externe); prețul paginii depinde de format",
        test: (path) => path.startsWith("/canvas-product/"),
    },
    {
        reason: "personaj cu licență (marcă înregistrată)",
        test: (path, title) => (path.startsWith("/shop/") || path.startsWith("/banner-product/")) && LICENSED_CHARACTERS.test(title),
    },
    {
        reason: "model cu mesaj de reducere / promoție în titlu",
        test: (path, title) => (path.startsWith("/shop/") || path.startsWith("/banner-product/")) && PROMO_THEMED.test(title),
    },
    {
        reason: "produs sezonier (Mărțișor / 8 Martie)",
        test: (path) => path === "/configurator/canvas-martisor" || path === "/configurator/canvas-8-martie",
    },
];

export function merchantPageExclusion(path: string, title = ""): string | undefined {
    const p = path.replace(/\/+$/, "") || "/";
    return MERCHANT_PAGE_EXCLUSIONS.find((e) => e.test(p, title))?.reason;
}

/** Prețul pe care îl arată pagina de la adresa `url` la deschidere, sau null dacă nu se știe exact. */
export function merchantPagePrice(url: string): LandingPrice | null {
    const fromConfigurator = landingPriceFromUrl(url);
    if (fromConfigurator) return fromConfigurator.price > 0 ? fromConfigurator : null;
    const u = new URL(url, "https://www.example.ro");
    // EuPrint publică catalogul și sub /shop/produse/...
    const path = u.pathname.replace(/\/+$/, "").replace(/^\/shop(?=\/produse\/)/, "");
    const cat = path.match(/^\/produse\/([^/]+)\/([^/]+)$/);
    if (cat) {
        const p = CATALOG_PRODUCTS.find((x) => x.category === decodeURIComponent(cat[1]) && x.slug === decodeURIComponent(cat[2]));
        const price = p ? catalogInitialPrice(p) : null;
        return price ? { configurator: "catalog", price } : null;
    }
    const sem = path.match(/^\/semnalistica-product\/([^/]+)$/);
    if (sem) {
        const p = signageProducts.find((x) => x.slug === decodeURIComponent(sem[1]));
        const price = p ? signageInitialPrice(p) : 0;
        return price > 0 ? { configurator: "semnalistica-product", price } : null;
    }
    return null;
}
