// Pagina unui configurator nou (calendare, steaguri beachflag, X-banner, panou stradal): titlu, configurator,
// date structurate (Product + Offer cu prețul de la deschiderea paginii, FAQ, breadcrumb).
import { Suspense } from "react";
import type { Metadata } from "next";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import ProdusNouConfigurator from "@/components/configurator/ProdusNouConfigurator";
import { siteConfig } from "@/lib/siteConfig";
import { PRODUSE_NOI, produsNouLandingPrice, type ProdusNouId } from "@/lib/produseNoi/definitions";

export function produsNouMetadata(id: ProdusNouId): Metadata {
    const d = PRODUSE_NOI[id];
    const image = d.gallery(d.initial())[0];
    return {
        title: d.seoTitle,
        description: d.seoDescription,
        keywords: d.keywords,
        alternates: { canonical: d.path },
        openGraph: { title: d.seoTitle, description: d.seoDescription, url: d.path, images: [{ url: image }] },
    };
}

export function ProdusNouJsonLd({ id, url }: { id: ProdusNouId; url?: string }) {
    const d = PRODUSE_NOI[id];
    const base = (process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url || "").replace(/\/$/, "");
    const start = d.initial();
    const schema = {
        "@context": "https://schema.org",
        "@type": "Product",
        name: d.name,
        description: d.seoDescription,
        image: d.gallery(start).slice(0, 3).map((src) => `${base}${src}`),
        brand: { "@type": "Brand", name: siteConfig.name },
        sku: `${id}-${Object.values(start).join("-")}`.slice(0, 60),
        // același preț ca pagina la deschidere și ca feedul Google Merchant
        offers: {
            "@type": "Offer",
            priceCurrency: "RON",
            price: produsNouLandingPrice(id).toFixed(2),
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            url: `${base}${url ?? d.path}`,
        },
    };
    return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

export default function ProdusNouPage({ id }: { id: ProdusNouId }) {
    const d = PRODUSE_NOI[id];
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Configuratoare", item: "/configurator" },
                    { name: d.name, item: d.path },
                ]}
            />
            <ProdusNouJsonLd id={id} />
            <FAQSchema faqs={d.content.faqs} />
            <div className="pt-20">
                <div className="container mx-auto px-4 pt-4">
                    <h1 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">{d.h1}</h1>
                </div>
                <Suspense fallback={<div className="min-h-[60vh] flex items-center justify-center">Se încarcă configuratorul…</div>}>
                    <ProdusNouConfigurator productId={id} />
                </Suspense>
            </div>
        </>
    );
}
