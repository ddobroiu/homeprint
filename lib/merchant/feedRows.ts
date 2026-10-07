// lib/merchant/feedRows.ts
//
// Articolele feedului Google Merchant (XML /api/products/feed și CSV /feed.csv): fiecare produs
// primește prețul pe care îl arată pagina lui (lib/merchant/pagePrice.ts). Produsele fără preț de
// pagină exact, excluse cu motiv sau fără poză acceptată rămân pe site, dar nu intră în feed.

import type { Product } from "@/lib/products";
import { merchantImageLink } from "@/lib/merchantFeed";
import { merchantPageExclusion, merchantPagePrice } from "@/lib/merchant/pagePrice";

export type MerchantFeedRow = { product: Product; link: string; price: number };
export type MerchantFeedDrop = { product: Product; link: string; reason: string };

/**
 * Pe unele site-uri (AdBanner, HomePrint) /configurator/<produs> fără ?q= redirecționează spre pagina scurtă
 * (/banner, /afise...), care nu citește parametrii din adresă. Link-ul din feed primește deci ?q= (cantitatea cu
 * care pornește pagina, aleasă așa încât prețul să rămână același), ca să fie servit chiar de configurator.
 */
const QTY_CANDIDATES = [1, 10, 20, 25, 50, 100, 200, 250, 500, 1000, 2000, 5000];
function withQuantityParam(link: string): string {
    const u = new URL(link);
    if (!u.pathname.startsWith("/configurator/") || u.searchParams.has("q")) return link;
    const before = merchantPagePrice(link);
    if (!before) return link;
    for (const q of QTY_CANDIDATES) {
        u.searchParams.set("q", String(q));
        const after = merchantPagePrice(u.toString());
        if (after && Math.abs(after.price - before.price) < 0.005) return u.toString();
    }
    return link;
}

export function merchantFeedRows(
    products: Product[],
    baseUrl: string,
    linkFor: (product: Product, baseUrl: string) => string
): { rows: MerchantFeedRow[]; dropped: MerchantFeedDrop[] } {
    const rows: MerchantFeedRow[] = [];
    const dropped: MerchantFeedDrop[] = [];
    const logo = `${baseUrl.replace(/\/$/, "")}/logo.png`;
    const seen = new Set<string>();
    for (const product of products) {
        const link = withQuantityParam(linkFor(product, baseUrl));
        const id = String(product.id ?? "");
        if (!id || id.length > 50) {
            dropped.push({ product, link, reason: "id lipsă sau peste 50 de caractere (Google îl respinge)" });
            continue;
        }
        const path = new URL(link).pathname;
        const excluded = merchantPageExclusion(path, String(product.title ?? ""));
        if (excluded) {
            dropped.push({ product, link, reason: excluded });
            continue;
        }
        const page = merchantPagePrice(link);
        if (!page) {
            dropped.push({ product, link, reason: "prețul paginii nu se poate calcula exact (pagină de prezentare / fără preț inițial)" });
            continue;
        }
        if (merchantImageLink(product.images?.[0], baseUrl) === logo) {
            dropped.push({ product, link, reason: "fără poză acceptată de Google (s-ar fi pus logo-ul)" });
            continue;
        }
        if (seen.has(id)) {
            dropped.push({ product, link, reason: "id duplicat (alt produs cu același id e deja în feed)" });
            continue;
        }
        seen.add(id);
        rows.push({ product, link, price: page.price });
    }
    return { rows, dropped };
}
