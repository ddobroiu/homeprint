import BrandLocalHub from "@/components/design/BrandLocalHub";
import { brandDesign } from "@/lib/brandDesign";
import { isIndexableLocalPage } from "@/lib/seo/localIndexPolicy";
import { siteConfig } from "@/lib/siteConfig";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Phone, Truck, Upload, MousePointerClick } from "lucide-react";
import { getLocalitateBySlug, getJudetBySlug } from "@/lib/localitati";
import { CONFIGURATORS_REGISTRY } from "@/lib/configurators-registry";
import { buildLocalContent } from "@/lib/seo/localContent";
import { getJudetProfile } from "@/lib/seo/judetProfiles";
import { getFromPrice } from "@/lib/seo/fromPrice";
import { WhatsAppBar, WhatsAppButton } from "@/components/seo/WhatsAppBar";
import { withDisplayName, nearbyLocalities } from "@/lib/seo/localityData";
import { Breadcrumbs, LocalityFacts, SourceNote } from "@/components/seo/LocalitySeo";

// Pagina unei localitati: scurta si clara, cu butoanele la vedere din primul ecran.
// Textul unic vine din faptele reale ale judetului (lib/seo/localContent.ts), nu din umplutura.
// Intrebarile frecvente sunt afisate pe pagina, identice cu cele din datele structurate.

type Params = { params: Promise<{ judetSlug: string; localitateSlug: string }> };

// Randare la prima cerere, apoi din cache (ISR, 7 zile): Googlebot nu mai randează pagina la fiecare vizită.
// Cache-ul ISR stă doar în memorie (next.config: experimental.isrFlushToDisk=false), nu pe disc.
export const revalidate = 604800;
export const dynamicParams = true;
export function generateStaticParams() {
    return [];
}

// Cele mai comandate, afisate primele si in cardul din primul ecran
const TOP = ["tapet", "canvas", "afise", "autocolante", "window-graphics", "plexiglass", "pvc-forex", "banner"];

function orderedProducts() {
    const rank = (id: string) => (TOP.includes(id) ? TOP.indexOf(id) : TOP.length);
    return [...CONFIGURATORS_REGISTRY].sort((a, b) => rank(a.id) - rank(b.id));
}

function faqFor(locName: string, judetName: string, tier: string | undefined) {
    return [
      { q: `Cum aleg produsul pentru o comandă în ${locName}?`, a: `${brandDesign.steps[0].text} Catalogul complet este disponibil pe această pagină, inclusiv pentru celelalte tipuri de print.` },
      { q: "Unde verific prețul configurației?", a: "Deschide configuratorul produsului și selectează opțiunile disponibile. Prețurile de pornire nu înlocuiesc prețul configurației finale." },
      { q: "Cum pregătesc grafica?", a: brandDesign.story },
      { q: `Aveți un punct de lucru în ${locName}?`, a: `Aceasta este o pagină pentru comenzi cu livrare în ${locName}, județul ${judetName}; nu indică un punct de lucru local. Datele de contact și informațiile despre livrare se găsesc în paginile dedicate.` },
    ];
}

export async function generateMetadata({ params }: Params) {
    const { judetSlug, localitateSlug } = await params;
    const loc = withDisplayName(judetSlug, getLocalitateBySlug(judetSlug, localitateSlug));
    const judet = getJudetBySlug(judetSlug);
    if (!loc || !judet) return {};

    const from = getFromPrice(["tapet"]);
    const title = `Decor printat în ${loc.name}${from ? ` – fototapet de la ${from.text}` : ""}`;
    const description = `Fototapet, tablouri canvas, postere și autocolante decorative, cu livrare în ${loc.name}, jud. ${judet.name}. Preț calculat pe loc, livrare în 2-4 zile lucrătoare, plată la livrare.`;
    const routeUrl = `${siteConfig.url}/judet/${judet.slug}/${loc.slug}`;

    return {
        title,
        description,
        openGraph: { title, description, url: routeUrl, siteName: "HomePrint", locale: "ro_RO", type: "website" },
        alternates: { canonical: routeUrl },
        robots: { index: isIndexableLocalPage(siteConfig.url, judet.slug, loc.slug), follow: true },
    };
}

export default async function LocalitatePage({ params }: Params) {
    const { judetSlug, localitateSlug } = await params;
    const loc = withDisplayName(judetSlug, getLocalitateBySlug(judetSlug, localitateSlug));
    const judet = getJudetBySlug(judetSlug);
    if (!loc || !judet) notFound();

    const profile = getJudetProfile(judet.slug);
    // Din textul generat pastram doar fraza cu faptul real despre zona (face pagina unica)
    const generated = buildLocalContent({
        brand: "homeprint",
        productTitle: "decor printat",
        productSlug: "print",
        locName: loc.name,
        locSlug: loc.slug,
        judetSlug: judet.slug,
        judetName: judet.name,
    }).heroText.split(/(?<=\.)\s+/);
    const localFact = generated.length >= 3 ? generated.slice(1, -1).join(" ") : "";
    const intro = `Fototapet, tablouri canvas, postere și autocolante decorative, livrate la adresa ta din ${loc.name}. ${localFact}`.trim();
    const products = orderedProducts();
    const top = products.filter((p) => TOP.slice(0, 3).includes(p.id));
    const faq = faqFor(loc.name, judet.name, profile?.tierLivrare);
    // Vecinii reali din date (cu distanța), altfel cei din aceeași comună / vecinii alfabetici din județ.
    const neighbours = nearbyLocalities(judet.slug, judet.localitati, loc.slug, 12, (j, s) => getLocalitateBySlug(j, s)?.name);
    const nearbyHasKm = neighbours.some((l) => typeof l.km === "number");
    const bannerFrom = getFromPrice(["tapet"]);
    const pageUrl = `${siteConfig.url}/judet/${judet.slug}/${loc.slug}`;
    const waMessage = `Bună ziua! Aș dori o ofertă pentru decor printat cu livrare în ${loc.name}, jud. ${judet.name}.`;

    return (<>
<script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([
                        {
                            "@context": "https://schema.org",
                            "@type": "Service",
                            name: `Decor printat în ${loc.name}`,
                            serviceType: "Decor printat",
                            areaServed: { "@type": "City", name: loc.name, containedInPlace: { "@type": "AdministrativeArea", name: `Județul ${judet.name}` } },
                            provider: { "@type": "Organization", name: "HomePrint", url: siteConfig.url, telephone: siteConfig.phone },
                            url: pageUrl,
                        },
                        {
                            "@context": "https://schema.org",
                            "@type": "FAQPage",
                            mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
                        },
                    ]),
                }}
            />
<BrandLocalHub loc={loc} judet={judet} localFact={localFact} neighbours={neighbours} faq={faq} waMessage={waMessage} />
<WhatsAppBar message={waMessage} price={bannerFrom?.text} label="de la" />
</>);
}
