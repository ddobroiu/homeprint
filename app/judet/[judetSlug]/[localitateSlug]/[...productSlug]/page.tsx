import CatalogLocalityPage from "@/components/catalog/CatalogLocalityPage";
import { getCatalogFamily, familyLocalMetadata } from "@/lib/catalog/localSeo";
import { LocalProductFacts } from "@/components/seo/LocalProductFacts";
import { getProductDisplayName, localProductTitle } from "@/lib/seo/localTitle";
import { siteConfig } from "@/lib/siteConfig";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound, permanentRedirect } from "next/navigation";
import { getLocalitateBySlug, getJudetBySlug } from "@/lib/localitati";
import { getProductBySlug, getProducts } from "@/lib/products";
import Script from "next/script";
import { ShieldCheck, Zap, Truck, MessageCircle, Star, Info, HelpCircle, MapPin, ArrowRight, ChevronLeft, ChevronRight, Globe, Award, CheckCircle2 } from "lucide-react";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import { buildLocalContent } from "@/lib/seo/localContent";
import { isIndexableLocality, getSiblingLocalitySlugs } from "@/lib/seo/indexableLocalities";
import { LocalFaq, getLocalFaqs } from "@/components/LocalFaq";
import { LocalSizePrices } from "@/components/seo/LocalSizePrices";
import { getFromPrice } from "@/lib/seo/fromPrice";
import { whatsappHref } from "@/components/seo/WhatsAppBar";

import { MATERIALE_DATA } from "@/lib/seo/materialeData";
import { REGLEMENTARI_DATA } from "@/lib/seo/reglementariData";
import { STILURI_DATA } from "@/lib/seo/stiluriData";
import { INTENT_LABELS } from "@/lib/seo/intents";
import { localProductCanonical, resolveLocalProductKey } from "@/lib/seo/siteSpecialization";
import { withDisplayName, nearbyLocalities } from "@/lib/seo/localityData";
import { Breadcrumbs, LocalProductJsonLd, FromPriceNote, LocalityFacts } from "@/components/seo/LocalitySeo";
import { JUDET_LOCALITY_SLUGS } from "@/lib/seo/mainTowns";

// Randare la prima cerere, apoi din cache (ISR, 7 zile): Googlebot nu mai randează pagina la fiecare vizită.
// Cache-ul ISR stă doar în memorie (next.config: experimental.isrFlushToDisk=false), nu pe disc.
export const revalidate = 604800;
export const dynamicParams = true;
export function generateStaticParams() {
    return [];
}

function getTargetInfo(slug: string) {
    const normalized = slug.startsWith('pentru-') ? slug.replace('pentru-', '') : slug;
    
    // 1. Material
    const material = MATERIALE_DATA.find(m => m.slug === normalized || m.id === normalized);
    if (material) return { label: material.name.split(' (')[0] };

    // 2. Intent
    let label = INTENT_LABELS[normalized];
    if (label) return { label };

    // 3. Style / Regulation
    const style = STILURI_DATA.find(s => s.slug === normalized);
    if (style) return { label: style.name };
    
    const reg = REGLEMENTARI_DATA.find(r => r.slug === normalized);
    if (reg) return { label: reg.name };

    return null;
}

export async function generateMetadata({ params }: { params: Promise<{ judetSlug: string, localitateSlug: string, productSlug: string[] }> }) {
    const { judetSlug, localitateSlug, productSlug } = await params;
    if (productSlug.length > 1 && ["ieftin", "pret", "preturi", "personalizat", "personalizate"].includes(productSlug[productSlug.length - 1])) {
        const basePath = productSlug.slice(0, -1);
        const resolved = resolveLocalProductKey(basePath);
        if (resolved || getProductBySlug(basePath.join('/'))) permanentRedirect(`/judet/${judetSlug}/${localitateSlug}/${resolved ?? basePath.join('/')}`);
    }

    // Familiile din catalogul /produse au pagina lor pe localitate.
    const catalogFamily = productSlug.length === 1 ? getCatalogFamily(productSlug[0]) : undefined;
    if (catalogFamily) {
        const cLoc = getLocalitateBySlug(judetSlug, localitateSlug);
        const cJudet = getJudetBySlug(judetSlug);
        if (!cLoc || !cJudet) return {};
        return familyLocalMetadata(catalogFamily, { locName: cLoc.name, locSlug: cLoc.slug, judetName: cJudet.name, judetSlug: cJudet.slug });
    }
    const aliasKey = resolveLocalProductKey(productSlug);
    if (aliasKey && productSlug.join('/') !== aliasKey) permanentRedirect(`/judet/${judetSlug}/${localitateSlug}/${aliasKey}`);

    const baseSlug = aliasKey ?? productSlug[0];
    const targetSlug = aliasKey ? undefined : productSlug[1];

    const loc = withDisplayName(judetSlug, getLocalitateBySlug(judetSlug, localitateSlug));
    const judet = getJudetBySlug(judetSlug);
    const product = getProductBySlug(baseSlug);

    if (!loc || !judet || !product) return {};

    const targetInfo = targetSlug ? getTargetInfo(targetSlug) : null;
    if (targetSlug && !targetInfo) {
        if (productSlug.length === 2 && ["ieftin", "pret", "preturi", "personalizat", "personalizate"].includes(targetSlug)) {
            permanentRedirect(`/judet/${judetSlug}/${localitateSlug}/${baseSlug}`);
        }
        notFound();
    }

    const productBaseName = getProductDisplayName([baseSlug, product.id, (product as any).routeSlug], product.title);
    const productTitle = targetInfo ? `${productBaseName} ${targetInfo.label}` : productBaseName;

    const fromPrice = getFromPrice([baseSlug, (product as any).routeSlug?.replace('configurator/', ''), product.id]);
    const title = fromPrice
        ? localProductTitle("homeprint", productTitle, loc.name, fromPrice.text)
        : `${productTitle} în ${loc.name}`;
    const { description: baseDescription } = buildLocalContent({
        brand: "homeprint",
        productTitle,
        productSlug: baseSlug,
        locName: loc.name,
        locSlug: loc.slug,
        judetSlug: judet.slug,
        judetName: judet.name,
    });
    const description = fromPrice
        ? `De la ${fromPrice.text}/buc (${fromPrice.basis}). ${baseDescription}`.slice(0, 158)
        : baseDescription;

    const routeUrl = localProductCanonical(siteConfig.url, judet.slug, loc.slug, productSlug).url;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: routeUrl,
            images: [(product as any).image || '/placeholder.png'],
        },
        alternates: { canonical: routeUrl },
        robots: { index: true, follow: true }
    };
}

export default async function ProductLocalityPage({ params }: { params: Promise<{ judetSlug: string, localitateSlug: string, productSlug: string[] }> }) {
    const { judetSlug, localitateSlug, productSlug } = await params;
    if (productSlug.length > 1 && ["ieftin", "pret", "preturi", "personalizat", "personalizate"].includes(productSlug[productSlug.length - 1])) {
        const basePath = productSlug.slice(0, -1);
        const resolved = resolveLocalProductKey(basePath);
        if (resolved || getProductBySlug(basePath.join('/'))) permanentRedirect(`/judet/${judetSlug}/${localitateSlug}/${resolved ?? basePath.join('/')}`);
    }

    const catalogFamily = productSlug.length === 1 ? getCatalogFamily(productSlug[0]) : undefined;
    if (catalogFamily) {
        const cLoc = getLocalitateBySlug(judetSlug, localitateSlug);
        const cJudet = getJudetBySlug(judetSlug);
        if (!cLoc || !cJudet) notFound();
        return <CatalogLocalityPage family={catalogFamily} loc={cLoc} judet={cJudet} />;
    }
    const loc = withDisplayName(judetSlug, getLocalitateBySlug(judetSlug, localitateSlug));
    const judet = getJudetBySlug(judetSlug);

    // Greedy Product Resolution for multi-segment slugs (e.g. banner-product/xxx)
    // Aliasurile /configurator/... randează exact produsul de pe calea scurtă (același conținut ca pagina canonică).
    const aliasKey = resolveLocalProductKey(productSlug);
    if (aliasKey && productSlug.join('/') !== aliasKey) permanentRedirect(`/judet/${judetSlug}/${localitateSlug}/${aliasKey}`);

    let productResolved = getProductBySlug(aliasKey ?? productSlug.join('/'));
    let baseSlug = aliasKey ?? productSlug.join('/');
    let targetSlug = null;

    if (!productResolved && productSlug.length > 1) {
        // Fallback: product is the first segment, second segment is the modifier (material/intent)
        baseSlug = productSlug[0];
        productResolved = getProductBySlug(baseSlug);
        if (productSlug.length !== 2) notFound();
        targetSlug = productSlug[1];
    }

    const product = productResolved;
    if (!loc || !judet || !product) notFound();

    const targetInfo = targetSlug ? getTargetInfo(targetSlug) : null;
    if (targetSlug && !targetInfo) {
        if (productSlug.length === 2 && ["ieftin", "pret", "preturi", "personalizat", "personalizate"].includes(targetSlug)) {
            permanentRedirect(`/judet/${judetSlug}/${localitateSlug}/${baseSlug}`);
        }
        notFound();
    }

    const productBaseName = getProductDisplayName([baseSlug, product.id, (product as any).routeSlug], product.title);
    const productTitle = targetInfo ? `${productBaseName} ${targetInfo.label}` : productBaseName;

    const productImage = (product as any).image || ((product as any).images?.[0]) || "/products/banner/banner-1.webp";
    const canonicalProductUrl = localProductCanonical(siteConfig.url, judet.slug, loc.slug, productSlug).url;
    
    let shopUrl = (product as any).routeSlug || (product as any).slug || product.id;
    if (!shopUrl.startsWith('/') && !shopUrl.startsWith('http')) {
        shopUrl = `/${shopUrl}`;
    }

    if (!shopUrl.startsWith('/configurator') && !shopUrl.startsWith('/shop') && !shopUrl.startsWith('/banner-product') && !shopUrl.startsWith('/semnalistica-product')) {
        if (baseSlug.includes('banner')) shopUrl = '/banner';
        else if (baseSlug.includes('canvas')) shopUrl = '/canvas';
        else if (baseSlug.includes('pliante') || baseSlug.includes('fluturas')) shopUrl = '/pliante';
        else if (baseSlug.includes('afis') || baseSlug.includes('poster')) shopUrl = '/afise';
        else if (baseSlug.includes('autocolant') || baseSlug.includes('sticker')) shopUrl = '/autocolante';
        else if (baseSlug.includes('rollup')) shopUrl = '/rollup';
        else if (baseSlug.includes('tapet')) shopUrl = '/tapet';
        else if (baseSlug.includes('window-graphics')) shopUrl = '/window-graphics';
        else if (baseSlug.includes('fonduri') || baseSlug.includes('pnrr')) shopUrl = '/fonduri-pnrr';
        else if (baseSlug.includes('tricou') || baseSlug.includes('textile')) shopUrl = '/tricouri';
        else if (baseSlug.includes('hanorac')) shopUrl = '/hanorace';
        else if (baseSlug.includes('sapca') || baseSlug.includes('sepci')) shopUrl = '/sepci';
    }

    // Flayerele și mesh-ul au configuratoarele lor; produsul intern comun le trimitea la pliante / banner.
    if (baseSlug === 'flayere' || baseSlug === 'mesh') shopUrl = `/configurator/${baseSlug}`;

    const productCategoryKey = shopUrl.startsWith('/configurator/') ? shopUrl.replace('/configurator/', '') : baseSlug;

    // next.config redirects /configurator/:path* -> /:path*, so linking to the
    // /configurator/ form makes every one of these ~13k pages emit links that only
    // redirect. Point straight at the destination and save the crawl budget.
    if (shopUrl.startsWith('/configurator/')) {
        shopUrl = shopUrl.replace('/configurator/', '/');
    }
    const { heroText } = buildLocalContent({
        brand: "homeprint",
        productTitle,
        productSlug: productCategoryKey,
        locName: loc.name,
        locSlug: loc.slug,
        judetSlug: judet.slug,
        judetName: judet.name,
    });

    // Cross-links to the other curated (indexable) towns in the same judet, for
    // the same product — these indexed pages otherwise link nowhere to each other.
    // Legăturile interne folosesc calea scurtă, canonică (/judet/{j}/{l}/{cheie}), nu aliasul /configurator/...
    const localKey = resolveLocalProductKey(productSlug);
    const productPath = localKey ?? productSlug.join('/');
    // Același produs în orașele principale ale județului (lib/seo/mainTowns.ts).
    const siblingLocalities = (JUDET_LOCALITY_SLUGS[judet.slug] ?? [])
        .filter((s) => s !== loc.slug)
        .slice(0, 8)
        .map((s) => withDisplayName(judet.slug, getLocalitateBySlug(judet.slug, s)))
        .filter((l): l is NonNullable<typeof l> => Boolean(l));

    return (
        <div className="bg-[#fafafc] min-h-screen font-sans overflow-x-hidden w-full max-w-full box-border">
            <LocalProductJsonLd
                name={`${productTitle} în ${loc.name}`}
                description={heroText}
                image={productImage}
                url={canonicalProductUrl}
                siteName={siteConfig.name}
                siteUrl={siteConfig.url}
                serviceType={productBaseName}
                locName={loc.name}
                judetName={judet.name}
                productIds={[baseSlug, productCategoryKey]}
                faqs={getLocalFaqs({ productTitle, locName: loc.name, judetName: judet.name })}
            />

            {/* Premium Header Space */}
            <div className="w-full bg-white border-b border-slate-100 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-8 md:py-16">
                    {/* Breadcrumbs */}
                    <Breadcrumbs
                        siteUrl={siteConfig.url}
                        items={[
                            { name: "Acasă", href: "/" },
                            { name: "Județe", href: "/judet" },
                            { name: judet.name, href: `/judet/${judet.slug}` },
                            { name: loc.name, href: `/judet/${judet.slug}/${loc.slug}` },
                            { name: productTitle },
                        ]}
                        className="flex flex-wrap items-center gap-2 text-[10px] md:text-xs font-bold text-slate-400 mb-8 uppercase tracking-[0.2em]"
                        linkClassName="hover:text-slate-900 transition-colors"
                        currentClassName="text-slate-600"
                    />

                    <div className="flex flex-col lg:flex-row gap-8 lg:gap-20 items-start">
                        {/* LEFT: Product Info */}
                        <div className="flex-1 w-full order-2 lg:order-1 lg:pt-8">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 rounded-full text-amber-600 font-black text-[10px] uppercase tracking-widest mb-6 border border-amber-100 italic">
                                <MapPin size={12} /> Livrare prin curier în {loc.name}, jud. {judet.name}
                            </div>
                            
                            <h1 className="text-3xl min-[390px]:text-4xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-6 uppercase italic break-words">
                                {productTitle} <br />
                                <span className="text-amber-500 not-italic uppercase tracking-tighter shadow-sm whitespace-normal">în {loc.name}</span>
                            </h1>

                            <p className="text-lg md:text-xl text-slate-500 font-medium leading-relaxed mb-10 max-w-2xl italic opacity-80">
                                {heroText}
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 mb-12">
                                <a 
                                    href={whatsappHref(`Bună ziua, aș dori o ofertă pentru ${product.title} în ${loc.name}.`)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-10 py-5 bg-[#25D366] text-white border-2 border-[#25D366] rounded-2xl font-black text-lg hover:border-amber-500 hover:text-amber-600 transition-all flex items-center justify-center gap-3 shadow-sm active:scale-95 group uppercase italic tracking-tighter"
                                >
                                    <MessageCircle size={22} className="group-hover:text-amber-500" />
                                    WHATSAPP
                                </a>
                                <Link 
                                    href={shopUrl} 
                                    className="px-10 py-5 bg-amber-600 text-white rounded-2xl font-black text-lg hover:bg-amber-500 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/20 active:scale-95 group uppercase italic tracking-tighter"
                                >
                                    <Zap size={22} className="fill-current group-hover:animate-pulse" />
                                    CONFIGUREAZĂ ONLINE
                                </Link>
                            </div>

                            <LocalSizePrices productIds={[baseSlug, productCategoryKey]} locName={loc.name} />
                            <FromPriceNote productIds={[baseSlug, productCategoryKey]} />

                            <div className="flex flex-wrap gap-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-amber-500">
                                        <Truck size={20} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Livrare rapidă<br/>{loc.name}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-amber-500">
                                        <Star size={20} className="fill-current" />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">2-4 zile<br/>lucrătoare</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-blue-500">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="text-xs font-bold text-slate-600 uppercase tracking-widest">Factură pe<br/>firmă sau PF</span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: Visual Asset - Product Image First on Mobile */}
                        <div className="flex-1 w-full order-1 lg:order-2 mb-8 lg:mb-0">
                            <div className="relative group">
                                <div className="absolute -inset-4 bg-gradient-to-tr from-amber-500/20 to-transparent rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
                                <div className="relative aspect-square bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-center justify-center p-8 overflow-hidden">
                                    <Image 
                                        src={productImage} 
                                        alt={product.title} 
                                        width={800} 
                                        height={800} 
                                        className="w-full h-full object-contain drop-shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform duration-700" 
                                    />
                                    {/* Local info badge */}
                                    <div className="absolute bottom-6 left-6 right-6 p-4 bg-white/80 backdrop-blur-md rounded-2xl border border-white/50 shadow-lg flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                                            <span className="text-xs font-black text-slate-900 uppercase truncate">Livrare prin curier în {loc.name}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-amber-600">24H Livrare</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Other Products Section - MOVED HIGHER */}
            <div className="max-w-7xl mx-auto px-4 py-24">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
                        <Zap size={14} className="text-amber-500" /> TOATE CONFIGURATOARELE
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Produse în {loc.name}</h2>
                    <p className="text-slate-500 mt-4 font-medium italic">Vezi toată gama de produse disponibile cu livrare rapidă.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
                    {CONFIGURATORS_REGISTRY.slice(0, 18).map((config) => {
                        const rpSlug = config.slug || config.id;
                        if (rpSlug === baseSlug) return null;

                        return (
                            <Link
                                key={config.id}
                                href={`/judet/${judet.slug}/${loc.slug}/${rpSlug}`}
                                className="group relative flex flex-col items-center text-center rounded-[2rem] border border-slate-200/60 transition-all duration-500 overflow-hidden hover:border-amber-400 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.15)] hover:-translate-y-2 bg-white h-full"
                            >
                                <div className="w-full aspect-square relative bg-slate-50 border-b border-slate-100 flex items-center justify-center overflow-hidden">
                                    {config.image ? (
                                        <Image
                                            src={config.image}
                                            alt={config.name}
                                            width={320}
                                            height={320}
                                            sizes="(max-width: 640px) 45vw, 220px"
                                            loading="lazy"
                                            className="w-[70%] h-[70%] object-contain p-4 transition-transform duration-700 group-hover:scale-110"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-slate-200 animate-pulse flex items-center justify-center text-slate-400 font-black uppercase text-[10px] tracking-widest">Imagine Lipsă</div>
                                    )}
                                    <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/[0.03] transition-colors duration-500" />
                                </div>

                                <div className="p-4 w-full flex-1 flex flex-col items-center justify-center bg-white relative">
                                    <h3 className="font-black text-[10px] md:text-xs leading-tight tracking-tight transition-all duration-300 text-slate-800 group-hover:text-amber-600 uppercase italic tracking-tighter">
                                        {config.name}
                                    </h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </div>

            {/* Local FAQ Section */}
            <div className="bg-white py-24 border-t border-slate-100">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
                            <HelpCircle size={14} className="text-amber-500" /> LIVRARE ÎN {loc.name.toUpperCase()}
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">Întrebări Frecvente</h2>
                        <p className="text-slate-500 mt-4 font-medium italic">Tot ce trebuie să știi despre comanda ta de {productTitle.toLowerCase()} în {loc.name}.</p>
                    </div>
                    
                    <div className="bg-slate-50/50 rounded-[3rem] p-8 md:p-12 border border-slate-100">
                        <LocalFaq 
                            productTitle={productTitle} 
                            locName={loc.name} 
                            judetName={judet.name}
                        />
                    </div>
                </div>
            </div>

            {/* Ce primești: fapte despre produs, utilizări, pașii comenzii */}
            <LocalProductFacts productIds={[baseSlug, productCategoryKey, product.id]} productTitle={productTitle} locName={loc.name} judetSlug={judet.slug} locSlug={loc.slug} configUrl={shopUrl} />

            {/* Sibling Curated Localities - internal cross-links within the same judet, same product */}
            {siblingLocalities.length > 0 && (
                <div className="bg-white py-24 border-t border-slate-100">
                    <div className="max-w-7xl mx-auto px-4">
                        <div className="text-center mb-16">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-widest mb-4">
                                <MapPin size={14} className="text-amber-500" /> ACOPERIRE JUDEȚEANĂ
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase leading-none">
                                Comandă {productTitle} și în alte orașe din județul {judet.name}
                            </h2>
                            <p className="text-slate-500 mt-4 font-medium italic">Livrăm în toate orașele importante din județ, cu aceleași standarde de calitate.</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {siblingLocalities.map((sibling) => (
                                <Link
                                    key={sibling.slug}
                                    href={`/judet/${judet.slug}/${sibling.slug}/${productPath}`}
                                    className="px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-600 hover:text-amber-600 hover:bg-amber-50 hover:border-amber-200 transition-all text-xs font-bold truncate text-center"
                                >
                                    {productTitle} {sibling.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Date reale despre localitate (doar dacă există în lib/seo/data/judete) */}
            <LocalityFacts judetSlug={judet.slug} locSlug={loc.slug} locName={loc.name} />

            {/* Proximity Network */}
            <div className="bg-slate-900 py-24">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
                        <div>
                            <p className="text-amber-400 font-bold uppercase tracking-[0.2em] text-[10px] mb-3">Rețeaua Națională</p>
                            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase leading-[1]">Alte locații din județul {judet.name}</h2>
                        </div>
                        <Link href={`/judet/${judet.slug}`} className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-all backdrop-blur-md">
                            Vezi tot județul
                        </Link>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {nearbyLocalities(judet.slug, judet.localitati, loc.slug, 18, (j, s) => getLocalitateBySlug(j, s)?.name).map((l, i) => (
                            <Link
                                key={`${l.judetSlug}/${l.slug}`}
                                href={`/judet/${l.judetSlug}/${l.slug}/${productPath}`}
                                className="px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/60 hover:text-white hover:bg-white/10 hover:border-amber-500/50 transition-all text-xs font-bold truncate text-center"
                            >
                                {product.title.split(' ')[0]} {l.name}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mobile Sticky CTA */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-slate-100 flex gap-3 md:hidden z-50">
                <Link 
                    href={shopUrl}
                    className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2"
                >
                    <Zap size={16} fill="white" /> Configurează
                </Link>
                <a 
                    href={`https://wa.me/40750473111?text=Buna%20ziua,%20as%20dori%20mai%20multe%20detalii%20despre%20${encodeURIComponent(product.title)}%20in%20${encodeURIComponent(loc.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-[#25D366] text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                >
                    <MessageCircle size={18} fill="white" /> WhatsApp
                </a>
            </div>
            {/* Spacing for mobile sticky footer */}
            <div className="h-24 md:hidden"></div>
        </div>
    );
}
