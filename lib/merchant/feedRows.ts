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
        const link = linkFor(product, baseUrl);
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
