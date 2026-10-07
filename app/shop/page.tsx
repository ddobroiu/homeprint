import React, { Suspense } from "react";
import ShopPageContent from "./ShopPageContent";
import { Metadata } from 'next';
import { childPhotoDecorInitialPrice, ownCharacterInitialPrice } from "@/lib/merchant/landingPrice";
import type { Product } from "@/lib/products";
import { catalogAsProducts } from "@/lib/catalog";
import { EXTRA_CONFIGURATORS } from "@/lib/configurators-registry";

export async function generateMetadata({ searchParams }: { searchParams: Promise<{ category?: string }> }): Promise<Metadata> {
    const { category } = await searchParams;

    if (category?.toLowerCase() === 'semnalistica') {
        return {
            title: 'Semnalistică și Indicatoare PVC/Autocolant',
            description: 'Cumpără indicatoare de securitate, semnalistică rutieră, SSM și PSI. Produse din PVC, Autocolant sau Dibond cu rezistență maximă. Prețuri directe de producător.',
            keywords: ['semnalistica', 'indicatoare pvc', 'semne protectia muncii', 'indicatoare ssm', 'indicatoare psi', 'semnalistica magazine'],
            alternates: { canonical: '/shop?category=semnalistica' },
        };
    }

    return {
        title: 'Shop - Decor printat, bannere și tot catalogul HomePrint',
        description: 'Tablouri canvas gata de agățat, fototapet, postere și autocolante decorative pentru casă și birou, plus bannere, semnalistică și kituri fonduri UE. Producție proprie, livrare 2-4 zile lucrătoare.',
        keywords: ['shop decor', 'homeprint produse', 'tablouri canvas', 'fototapet', 'postere', 'autocolante decorative', 'bannere online'],
        alternates: { canonical: '/shop' },
    };
}

import Breadcrumbs from '@/components/Breadcrumbs';
import EditorShopBanner from "@/components/EditorShopBanner";

export default function ShopPage() {
    const personalProducts: Product[] = EXTRA_CONFIGURATORS
        .filter(product => ["decor-foto-copil", "personaj-propriu"].includes(product.id))
        .map(product => ({
            id: `configurator-${product.id}`, slug: product.slug, routeSlug: product.url.slice(1),
            title: product.name,
            description: `${product.description} Preț pentru 70 × 100 cm, 1 bucată, inclusiv pregătirea imaginii și a conturului.`,
            images: product.image ? [product.image] : [],
            priceBase: product.id === "decor-foto-copil" ? childPhotoDecorInitialPrice() : ownCharacterInitialPrice(),
            currency: "RON", tags: product.keywords,
            metadata: { category: "pvc-forex", subcategory: "Decor personalizat", isPersonalizedDecor: true },
        }));
    return (
        <div className="pt-24 w-full max-w-7xl mx-auto px-4">
            <Breadcrumbs items={[{ label: 'Magazin', href: '/shop' }]} />
            <EditorShopBanner />
            <Suspense fallback={<div className="container py-20 text-center">Se încarcă produsele...</div>}>
                <ShopPageContent personalProducts={personalProducts} catalogProducts={catalogAsProducts()} />
            </Suspense>
        </div>
    );
}
