import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import { notFound, permanentRedirect } from 'next/navigation';
import { canvasProducts, findCanvasProduct, type CanvasProduct } from '@/lib/products/canvas-products';
import { CANVAS_LEGACY_SLUGS } from '@/lib/products/canvas-legacy-slugs';
import { CANVAS_CATEGORY_BY_KEY, CANVAS_COLLECTION_HOME } from '@/lib/products/canvas-categories';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import { Suspense } from 'react';
import ProductStructuredData from '@/components/ProductStructuredData';
import Breadcrumbs from '@/components/Breadcrumbs';
import { prisma } from '@/lib/prisma';

// Randare la cerere: configuratorul citește adresa (useSearchParams); pagina nu se mai pune în cache ISR.
export const dynamic = 'force-dynamic';

type Props = {
    params: Promise<{ slug: string }>;
};

const BASE_URL: string = "https://www.HomePrint.ro";
// Colecția canvas e indexabilă doar pe tablou.net; pe celelalte site-uri paginile rămân (200, în magazin) cu noindex,follow.
const COLLECTION_INDEXABLE = BASE_URL === CANVAS_COLLECTION_HOME;

/** Modelul pentru slug-ul cerut și dacă adresa trebuie redirecționată (slug vechi sau aproximativ). */
function resolve(slug: string): { product?: CanvasProduct; redirect: boolean } {
    const exact = canvasProducts.find((p) => p.slug === slug);
    if (exact) return { product: exact, redirect: false };
    const legacy = CANVAS_LEGACY_SLUGS[slug];
    if (legacy) return { product: findCanvasProduct(legacy), redirect: true };
    // adrese aproximative (prefix/sufix în plus) — tot spre adresa canonică
    if (slug.length >= 12) {
        const loose = canvasProducts.find((p) => slug.includes(p.slug) || p.slug.includes(slug))
            ?? canvasProducts.find((p) => p.legacySlug && (slug.includes(p.legacySlug) || p.legacySlug.includes(slug)));
        if (loose) return { product: loose, redirect: true };
    }
    return { redirect: false };
}

function firstParagraph(text: string): string {
    return text.split(/\n\s*\n/)[0] || text;
}

export async function generateMetadata({ params }: Props, parent: ResolvingMetadata): Promise<Metadata> {
    const { slug } = await params;
    const { product, redirect } = resolve(slug);

    if (!product) {
        return { title: 'Produs negăsit', robots: { index: false, follow: true } };
    }
    if (redirect) permanentRedirect(`/canvas-product/${product.slug}`);

    const previousImages = (await parent).openGraph?.images || [];
    const canonicalUrl = `${BASE_URL}/canvas-product/${product.slug}`;
    const description = product.metaDescription || firstParagraph(product.description).slice(0, 155);

    return {
        title: product.title,
        description,
        alternates: {
            canonical: canonicalUrl,
        },
        robots: COLLECTION_INDEXABLE ? undefined : { index: false, follow: true },
        openGraph: {
            title: product.title,
            description,
            url: canonicalUrl,
            images: [
                {
                    url: product.image,
                    width: 800,
                    height: 800,
                    alt: product.imageAlt || product.title,
                },
                ...previousImages,
            ],
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title: product.title,
            description,
            images: [product.image],
        },
    };
}

export default async function CanvasProductPage({ params }: Props) {
    const { slug } = await params;
    const { product, redirect } = resolve(slug);

    if (!product) {
        notFound();
    }
    if (redirect) permanentRedirect(`/canvas-product/${product.slug}`);

    // Parse price for Schema
    // format "79,00 €" -> 79.00
    const priceString = product.price ? product.price.replace(',', '.').replace(/[^\d.]/g, '') : "0";

    // Recenziile existente sunt legate de slug-ul vechi (cheie stabilă).
    const reviewKey = product.legacySlug || product.slug;
    let aggregateRating;
    try {
        const aggs = await prisma.review.aggregate({
            where: { productSlug: reviewKey },
            _avg: { rating: true },
            _count: { rating: true }
        });
        if (aggs._count.rating > 0) {
            aggregateRating = {
                ratingValue: aggs._avg.rating || 0,
                reviewCount: aggs._count.rating
            };
        }
    } catch (e) { }

    const category = CANVAS_CATEGORY_BY_KEY[product.category];
    const breadcrumbItems = [
        { label: 'Produse', href: '/shop' },
        { label: 'Tablouri Canvas', href: '/shop/canvas' },
        ...(category ? [{ label: category.label, href: `/shop/canvas/${category.slug}` }] : []),
        { label: product.title, href: `/canvas-product/${product.slug}` }
    ];

    // Alte modele din aceeași categorie (link-uri randate pe server, pentru vizitatori și crawl)
    const sameCategory = canvasProducts.filter((p) => p.category === product.category && p.id !== product.id);
    const at = Math.max(0, canvasProducts.findIndex((p) => p.id === product.id));
    const related = [...sameCategory.filter((p) => canvasProducts.indexOf(p) > at), ...sameCategory].slice(0, 8);

    return (
        <div className="pt-4 sm:pt-8 w-full max-w-7xl mx-auto px-4">
            <Breadcrumbs items={breadcrumbItems} />
            {/* Configuratorul nu afișează titlul în modul renderOnlyConfigurator: H1-ul paginii vine de aici. */}
            <h1 className="mt-2 mb-4 text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">{product.title}</h1>
            <ProductStructuredData product={{
                name: product.title,
                description: firstParagraph(product.description),
                image: product.image,
                sku: product.id,
                offers: {
                    price: priceString,
                    priceCurrency: "RON",
                    availability: "https://schema.org/InStock",
                    url: `${BASE_URL}/canvas-product/${product.slug}`
                },
                aggregateRating
            }} />

            <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă produsul...</div>}>
                <ConfiguratorDispatcher
                    configuratorId="canvas"
                    productSlug={product.slug} // Pass the CORRECT found slug to the configurator
                    productImage={product.image}
                    renderOnlyConfigurator
                />
            </Suspense>

            {category && related.length > 0 && (
                <section className="mt-12 mb-16" aria-labelledby="canvas-related">
                    <div className="flex items-baseline justify-between gap-4 mb-4">
                        <h2 id="canvas-related" className="text-xl font-bold text-slate-900">Alte tablouri canvas {category.label.toLowerCase()}</h2>
                        <Link href={`/shop/canvas/${category.slug}`} className="text-sm font-semibold text-emerald-700 hover:underline shrink-0">Vezi toată categoria →</Link>
                    </div>
                    <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        {related.map((p) => (
                            <li key={p.id}>
                                <Link href={`/canvas-product/${p.slug}`} className="group block">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img src={p.image} alt={p.imageAlt || p.title} loading="lazy" className="aspect-square w-full rounded-lg object-cover bg-slate-100" />
                                    <span className="mt-2 block text-sm text-slate-700 group-hover:text-slate-900 leading-snug">{p.title}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </section>
            )}
        </div>
    );
}
