import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getLocalitateBySlug, getJudetBySlug } from "@/lib/localitati";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import { getTargetLocalities, getTargetLocalitiesForJudet } from "@/lib/seo/targetLocalities";
import { getLocalityPageVariant } from "@/lib/seo/localityPageVariants";

// Only the curated ~350-400 localities get a real page; anything else 404s
// instead of being rendered on demand (closes the crawl-trap where every one
// of the 13k+ localities in ro_localitati.json was reachable/indexable).
export async function generateStaticParams() {
    return getTargetLocalities().map(({ judet, loc }) => ({
        judetSlug: judet.slug,
        localitateSlug: loc.slug,
    }));
}

export const dynamicParams = false;

// Seeded random for deterministic Spintax & Ratings
function getSeededRandom(seedStr: string) {
    let hash = 0;
    for (let i = 0; i < seedStr.length; i++) {
        hash = seedStr.charCodeAt(i) + ((hash << 5) - hash);
    }
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
}

export async function generateMetadata({ params }: { params: Promise<{ judetSlug: string, localitateSlug: string }> }) {
    const { judetSlug, localitateSlug } = await params;
    const loc = getLocalitateBySlug(judetSlug, localitateSlug);
    const judet = getJudetBySlug(judetSlug);

    if (!loc || !judet) return {};

    const variant = getLocalityPageVariant(loc.name, judet.name, loc.slug);
    const title = variant.metaTitle;
    const description = variant.metaDescription;

    const routeUrl = `https://HomePrint.ro/judet/${judet.slug}/${loc.slug}`;

    return {
        title,
        description,
        keywords: `print ${loc.name}, publicitate ${loc.name}, bannere ${loc.name}, materiale promotionale ${loc.name}, tipografie ${loc.name}`,
        openGraph: {
            title,
            description,
            url: routeUrl,
            siteName: 'HomePrint',
            locale: 'ro_RO',
            type: 'website',
        },
        alternates: { canonical: routeUrl },
    };
}

export default async function LocalitatePage({ params }: { params: Promise<{ judetSlug: string, localitateSlug: string }> }) {
    const { judetSlug, localitateSlug } = await params;
    const loc = getLocalitateBySlug(judetSlug, localitateSlug);
    const judet = getJudetBySlug(judetSlug);

    if (!loc || !judet) notFound();

    const configurators = CONFIGURATORS_REGISTRY;
    const siblingLocalities = getTargetLocalitiesForJudet(judet.slug).map((m) => m.loc);
    const variant = getLocalityPageVariant(loc.name, judet.name, loc.slug);

    return (
        <div className="min-h-screen bg-white">
            <script
                id="local-schema-city"
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Service",
                            "name": `Print și Publicitate HomePrint ${loc.name}`,
                            "provider": {
                                "@type": "LocalBusiness",
                                "name": "HomePrint",
                                "url": `https://HomePrint.ro/judet/${judet.slug}/${loc.slug}`,
                                "areaServed": { "@type": "City", "name": loc.name }
                            }
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "BreadcrumbList",
                            "itemListElement": [
                                { "@type": "ListItem", "position": 1, "name": "Acasă", "item": "https://HomePrint.ro/" },
                                { "@type": "ListItem", "position": 2, "name": judet.name, "item": `https://HomePrint.ro/judet/${judet.slug}` },
                                { "@type": "ListItem", "position": 3, "name": loc.name }
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

            {/* Premium Header/Nav */}
            {/* Simple Header - No Hero */}
            <div className="pt-24 pb-12 border-b border-slate-100">
                <div className="container mx-auto px-6">
                    <nav className="text-[10px] font-black text-slate-400 mb-6 flex gap-3 items-center uppercase tracking-widest">
                        <Link href="/judet" className="hover:text-amber-600 transition-colors">Județe</Link> 
                        <span>/</span>
                        <Link href={`/judet/${judet.slug}`} className="hover:text-amber-600 transition-colors">{judet.name}</Link> 
                        <span>/</span>
                        <span className="text-slate-900">{loc.name}</span>
                    </nav>
                    <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                        <div className="min-w-0">
                            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-4 tracking-tighter">
                                {variant.h1Prefix} <span className="text-amber-500">{loc.name}</span>
                            </h1>
                            <p className="text-lg text-slate-500 max-w-2xl">
                                {variant.subtitle}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 shrink-0">
                            <a
                                href={`https://wa.me/40750473111?text=${encodeURIComponent(`Bună ziua, aș dori o ofertă pentru print în ${loc.name}.`)}`}
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

            {/* Main Content - Configurators */}
            <section className="py-40">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">{variant.productsHeading}</h2>
                        <div className="h-2 w-24 bg-amber-500 mx-auto rounded-full mb-8"></div>
                        <p className="text-xl text-slate-500 font-light max-w-2xl mx-auto">{variant.productsSubtitle}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                        {configurators.map((p: any) => {
                            const cleanSlug = p.slug || p.id;
                            const productUrl = `/judet/${judet.slug}/${loc.slug}/${cleanSlug}`;

                            return (
                                <Link 
                                    href={productUrl} 
                                    key={p.id} 
                                    className="group flex flex-col items-center text-center space-y-8"
                                >
                                    <div className="w-full aspect-square bg-slate-50 rounded-[4rem] overflow-hidden border border-slate-100 group-hover:border-amber-500 group-hover:shadow-2xl group-hover:-translate-y-4 transition-all duration-700 relative">
                                        <Image
                                            src={p.image || '/placeholder.png'}
                                            alt={`${p.name} personalizat în ${loc.name}, județul ${judet.name} - HomePrint`}
                                            fill
                                            className="object-cover group-hover:scale-110 transition-transform duration-1000"
                                        />
                                        <div className="absolute bottom-6 left-6 right-6">
                                             <div className="bg-white/90 backdrop-blur-md text-slate-900 py-3 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all">
                                                Configurează &rarr;
                                             </div>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors mb-2">{p.name}</h3>
                                        <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Preț de Producător</p>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Local Trust Section */}
            <section className="py-40 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-amber-500/5 rounded-full blur-[200px]"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center max-w-5xl">
                    <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-16 leading-[0.8]">
                        {variant.trustHeading}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-left">
                        {variant.trustFacts.map((item, i) => (
                            <div key={i} className="space-y-6">
                                <div className="text-amber-500 font-black text-4xl">0{i+1}.</div>
                                <h3 className="text-2xl font-bold">{item.title}</h3>
                                <p className="text-slate-400 text-lg font-light leading-relaxed">{item.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Other Localities List */}
            <section className="py-32 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-b border-slate-200 pb-16">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter">Tipografie în Județul {judet.name}</h2>
                            <p className="text-slate-500 mt-2 font-medium">Livrăm materiale personalizate și în localitățile vecine:</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {siblingLocalities.filter(l => l.slug !== loc.slug).slice(0, 8).map(l => (
                                <Link
                                    key={l.slug}
                                    href={`/judet/${judet.slug}/${l.slug}`}
                                    className="px-6 py-3 bg-white border border-slate-200 text-slate-600 rounded-2xl text-sm font-black hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                                >
                                    {l.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
