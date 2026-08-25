import React from "react";
import Link from "next/link";
import { getJudetBySlug } from "@/lib/localitati";
import { getTargetLocalitiesForJudet } from "@/lib/seo/targetLocalities";
import { getProducts } from "@/lib/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import { MapPin, ArrowRight } from "lucide-react";
import Script from "next/script";
import { getJudetPageVariant } from "@/lib/seo/judetPageVariants";

export async function generateMetadata({ params }: { params: Promise<{ judetSlug: string }> }) {
    const { judetSlug } = await params;
    const judet = getJudetBySlug(judetSlug);
    if (!judet) return {};

    const variant = getJudetPageVariant(judet.name, judet.slug);

    return {
        title: variant.metaTitle,
        description: variant.metaDescription,
        alternates: {
            canonical: `https://www.homeprint.ro/judet/${judetSlug}`
        }
    };
}

export default async function JudetPage({ params }: { params: Promise<{ judetSlug: string }> }) {
    const { judetSlug } = await params;
    const judet = getJudetBySlug(judetSlug);
    if (!judet) notFound();

    const products = await getProducts();
    const configurators = products.filter(p =>
        p.metadata?.category?.toLowerCase() === 'configuratoare'
    ).sort((a, b) => {
        const order = ['configurator-banner', 'configurator-rollup', 'configurator-autocolant', 'configurator-canvas'];
        const idxA = order.indexOf(a.id);
        const idxB = order.indexOf(b.id);
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        return idxA !== -1 ? -1 : 1;
    });

    const targetLocalities = getTargetLocalitiesForJudet(judet.slug);
    const primaryLocalitySlug = targetLocalities[0]?.loc.slug || judet.localitati[0]?.slug;
    const variant = getJudetPageVariant(judet.name, judet.slug);

    return (
        <div className="bg-white min-h-screen pb-20">
            <script
                id={`schema-judet-${judetSlug}`}
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://www.homeprint.ro/" },
                                { "@type": "ListItem", "position": 2, "name": "Județe", "item": "https://www.homeprint.ro/judet" },
                                { "@type": "ListItem", "position": 3, "name": judet.name }
                            ]
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            "mainEntity": variant.faq.map((f) => ({
                                "@type": "Question",
                                "name": f.q,
                                "acceptedAnswer": { "@type": "Answer", "text": f.a }
                            }))
                        }
                    ])
                }}
            />
            {/* Simple Header - No Hero */}
            <div className="border-b border-slate-100">
                <div className="container mx-auto px-6 py-12">
                     <nav className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-6 uppercase tracking-wider">
                        <Link href="/judet" className="hover:text-slate-900 transition-colors">Județe</Link> 
                        <span>/</span>
                        <span className="text-slate-900">{judet.name}</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="min-w-0">
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">
                                {variant.h1Prefix} <span className="text-amber-500">{judet.name}</span>
                            </h1>
                            <p className="text-lg text-slate-500 mt-4 max-w-2xl">
                                {variant.subtitle}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
                            <a
                                href={`https://wa.me/40750473111?text=${encodeURIComponent(`Bună ziua, aș dori o ofertă pentru print în județul ${judet.name}.`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest border-2 border-slate-200 bg-white text-slate-900 hover:border-amber-500 hover:text-amber-600 transition-all shadow-sm active:scale-[0.99]"
                            >
                                WhatsApp
                            </a>
                            <Link
                                href="/contact"
                                className="inline-flex items-center justify-center px-6 py-3 rounded-2xl font-black text-sm uppercase tracking-widest bg-amber-600 text-white hover:bg-amber-500 transition-all shadow-xl shadow-amber-600/20 active:scale-[0.99]"
                            >
                                Cere ofertă
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16">
                {/* Configurators Grid */}
                <div className="mb-20">
                    <h2 className="text-2xl font-black text-slate-900 mb-8 uppercase tracking-tight">{variant.configuratorsHeading} {judet.name}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {configurators.map((p, i) => (
                            <Link
                                href={`/judet/${judet.slug}/${primaryLocalitySlug}/${p.routeSlug || p.slug || p.id}`}
                                key={i}
                                className="group bg-slate-50 rounded-2xl p-6 border border-slate-100 hover:bg-white hover:shadow-xl transition-all"
                            >
                                <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">{p.title}</h3>
                                <p className="text-xs text-slate-500 uppercase font-bold tracking-widest flex items-center gap-2">
                                    Vezi detalii <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Localities Index */}
                <div className="bg-slate-50 rounded-[2.5rem] p-10 md:p-16 border border-slate-100">
                    <div className="flex items-center gap-4 mb-12">
                        <MapPin className="text-amber-500" size={32} />
                        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Index Localități {judet.name}</h2>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-y-4 gap-x-8">
                        {targetLocalities.map(({ loc }) => (
                            <Link
                                key={loc.slug}
                                href={`/judet/${judet.slug}/${loc.slug}`}
                                className="text-sm font-bold text-slate-500 hover:text-amber-600 transition-colors py-1 flex items-center justify-between group"
                            >
                                {loc.name}
                                <span className="opacity-0 group-hover:opacity-100 text-[10px] bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full transition-all">VEZI</span>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
