import React, { Suspense } from "react";
import MasterConfigurator from "@/components/MasterConfigurator";
import { getProductBySlug } from "@/lib/products";
import { getLandingInfo } from "@/lib/landingData";
import { notFound } from "next/navigation";
import CategorySeoContent from "@/components/CategorySeoContent";
import ProductJsonLd from "@/components/ProductJsonLd";
import { prisma } from "@/lib/prisma";

import AfiseConfigurator from "@/components/AfiseConfigurator";
import AutocolanteConfigurator from "@/components/AutocolanteConfigurator";
import CanvasConfigurator from "@/components/CanvasConfigurator";
import TapetConfigurator from "@/components/TapetConfigurator";
import RollupConfigurator from "@/components/RollupConfigurator";
import WindowGraphicsConfigurator from "@/components/WindowGraphicsConfigurator";
import PlianteConfigurator from "@/components/PlianteConfigurator";
import FlyerConfigurator from "@/components/FlyerConfigurator";
import FonduriEUConfigurator from "@/components/FonduriEUConfigurator";
import ConfiguratorPlexiglass from "@/components/ConfiguratorPlexiglass";
import ConfiguratorPVCForex from "@/components/ConfiguratorPVCForex";
import ConfiguratorPolipropilena from "@/components/ConfiguratorPolipropilena";
import ConfiguratorAlucobond from "@/components/ConfiguratorAlucobond";
import ConfiguratorCarton from "@/components/ConfiguratorCarton";
import ConfiguratorCartiVizita from "@/components/ConfiguratorCartiVizita";
import TextileConfigurator from "@/components/TextileConfigurator";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const slugStr = slug.join("/");
    const product = getProductBySlug(slugStr);
    const landing = slug.length > 1 ? getLandingInfo(slug[0], slug[1]) : getLandingInfo(slug[0], slug[0]);

    if (!product && !landing) return {};

    const title = landing?.seoTitle || product?.seo?.title || (product?.title || landing?.title || "Publicitate");
    const description = (landing?.seoDescription || product?.seo?.description || product?.description || `Comandă ${product?.title || landing?.title} personalizat. Prețuri de producător, livrare rapidă.`).substring(0, 160);

    return {
        title,
        description,
        alternates: { canonical: `/${slugStr}` },
        openGraph: {
            title,
            description,
            images: product?.images?.[0] ? [{ url: product.images[0] }] : []
        }
    };
}

function resolveSpecificConfigurator(initialId: string, slugStr: string) {
    switch (initialId) {
        case 'afise': return <AfiseConfigurator />;
        case 'autocolante': return <AutocolanteConfigurator />;
        case 'canvas': return <CanvasConfigurator productSlug={slugStr} />;
        case 'tapet': return <TapetConfigurator />;
        case 'rollup': return <RollupConfigurator />;
        case 'window-graphics': return <WindowGraphicsConfigurator productSlug={slugStr} />;
        case 'pliante': return <PlianteConfigurator />;
        case 'flayere': return <FlyerConfigurator />;
        case 'fonduri-eu': return <FonduriEUConfigurator productSlug={slugStr} />;
        case 'plexiglass': return <ConfiguratorPlexiglass />;
        case 'pvc-forex': return <ConfiguratorPVCForex />;
        case 'polipropilena': return <ConfiguratorPolipropilena />;
        case 'alucobond': return <ConfiguratorAlucobond />;
        case 'carton': return <ConfiguratorCarton />;
        case 'carti-vizita': return <ConfiguratorCartiVizita />;
        case 'tricouri': return <TextileConfigurator productSlug={slugStr} type="tricouri" />;
        case 'hanorace': return <TextileConfigurator productSlug={slugStr} type="hanorace" />;
        case 'sepci': return <TextileConfigurator productSlug={slugStr} type="sepci" />;
        default: return <MasterConfigurator />;
    }
}

export default async function CatchAllSlugPage({ params }: { params: Promise<{ slug: string[] }> }) {
    const { slug } = await params;
    const slugStr = slug.join("/");

    // 1. Try to find a product matching the SLUG
    const product = getProductBySlug(slugStr);

    // 2. Try to find landing info (e.g. /banner/banner-promotional)
    const landing = slug.length > 1
        ? getLandingInfo(slug[0], slug[1])
        : getLandingInfo(slug[0], slug[0]);

    if (!product && !landing) {
        // Safe check: maybe it's a category but without a landing (e.g. /tricouri)
        if (slug.length === 1) {
            const possibleProduct = getProductBySlug(slug[0]);
            if (possibleProduct) {
                const initId = possibleProduct.metadata?.originalId || possibleProduct.id;
                // Return just the configurator
                return (
                    <main className="min-h-screen bg-background">
                        <Suspense fallback={<div className="h-screen flex justify-center items-center bg-slate-950"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div></div>}>
                            {resolveSpecificConfigurator(initId, slug[0])}
                        </Suspense>
                    </main>
                );
            }
        }
        notFound();
    }

    // Prepare for JSON-LD and configurator
    const initialId = product?.metadata?.originalId || product?.id || landing?.productRouteSlug || slug[0];

    let ratingValue: number | undefined;
    let reviewCount: number | undefined;
    try {
        const aggs = await prisma.review.aggregate({
            where: { productSlug: slugStr },
            _avg: { rating: true },
            _count: { rating: true }
        });
        if (aggs._count.rating > 0) {
            ratingValue = aggs._avg.rating || 0;
            reviewCount = aggs._count.rating;
        }
    } catch (e) { }

    return (
        <main className="min-h-screen bg-background">
            {product && (
                <ProductJsonLd
                    product={product}
                    url={`https://www.homeprint.ro/${slugStr}`}
                    ratingValue={ratingValue}
                    reviewCount={reviewCount}
                />
            )}

            <Suspense fallback={<div className="h-screen flex justify-center items-center bg-slate-950"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div></div>}>
                {resolveSpecificConfigurator(initialId, slugStr)}
            </Suspense>

            {landing && (
                <section className="bg-background py-20 border-t border-white/5 mt-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        {landing.contentHtml ? (
                            <div
                                className="prose prose-invert prose-slate max-w-none prose-h2:italic prose-h2:font-black prose-h2:uppercase prose-h2:tracking-tighter prose-h2:text-4xl lg:prose-h2:text-6xl"
                                dangerouslySetInnerHTML={{ __html: landing.contentHtml }}
                            />
                        ) : (
                            <CategorySeoContent kind={slug[0]} />
                        )}
                    </div>
                </section>
            )}
        </main>
    );
}
