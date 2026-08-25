import React, { Suspense } from "react";
import TextileConfigurator from "@/components/TextileConfigurator";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";

export const metadata = {
    title: "Tricouri Personalizate - Print DTF | Publicitate Outdoor",
    description: "Personalizează tricouri din bumbac 100% cu design-ul tău. Imprimare DTF rezistentă la spălări repetate, culori vibrante. Comandă online simplu și rapid. Sistem centralizat pentru outdoor și indoor. Print de mari și mici dimensiuni cu preț de producător și rezistență UV.",
    keywords: [
        "tricouri personalizate",
        "print dtf",
        "tricouri bumbac",
        "cadouri personalizate",
        "homeprint",
        "haine personalizate"
    ],
    alternates: { canonical: "/tricouri" },
    openGraph: {
        title: "Tricouri Personalizate | Print DTF Profesional | Publicitate Outdoor",
        description: "Personalizează tricouri premium din bumbac. Print DTF de înaltă rezistență. Ideal pentru firmă sau evenimente. Sistem centralizat pentru outdoor și indoor. Print de mari și mici dimensiuni cu preț de producător și rezistență UV.",
        images: [{
            url: "/products/banner/banner-1.webp",
            width: 1200,
            height: 630,
            alt: "Tricouri Personalizate"
        }]
    }
};

type Props = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function TricouriPage({ searchParams }: Props) {
    const sParams = await searchParams;
    const product = getProductBySlug("configurator-tricouri");
    const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.HomePrint.ro"}/tricouri`;

    const image = typeof sParams.image === 'string' ? sParams.image : undefined;

    return (
        <main className="min-h-screen bg-slate-50 pt-20">
            {product && <ProductJsonLd name={product.title} description={product.description} image={product.images?.[0]} price={60} url={url} />}

            <Suspense fallback={<div className="h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div></div>}>
                <h1 className="sr-only">Tricouri Personalizate</h1>
                <TextileConfigurator type="tricouri" productSlug="configurator-tricouri" productImage={image} />
            </Suspense>

            <section className="bg-white py-16 mt-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Tricouri Personalizate Profesional
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            La <strong className="text-amber-600">HomePrint.ro</strong>, realizăm tricouri folosind tipar DTF de înaltă calitate, care rezistă excelent în timp și la spălări repetate, cu materiale premium din bumbac 100%.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}

