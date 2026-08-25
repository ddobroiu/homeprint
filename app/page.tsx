import Script from 'next/script';
import Link from 'next/link';
import { Metadata } from 'next';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, Clock, Phone, Wind, Factory, Timer } from "lucide-react";
import { siteConfig } from '@/lib/siteConfig';
import { CONFIGURATORS_REGISTRY } from '@/lib/configurators-registry';

import dynamic from 'next/dynamic';


const PromoSection = dynamic(() => import("@/components/PromoSection"), { ssr: true });
const FAQSection = dynamic(() => import("@/components/FAQSection"), { ssr: true });

export const metadata: Metadata = {
  authors: [{ name: 'Echipa HomePrint.ro', url: 'https://www.homeprint.ro' }],
  title: 'Bannere Publicitare Outdoor & Semnalistică pentru Afaceri | Livrare 24h',
  description: 'HomePrint e specializat în publicitate outdoor: bannere, mesh, panouri, window graphics și semnalistică pentru afaceri. Configurator online, preț instant, producție proprie, gata în 24h.',
  keywords: ['homeprint', 'bannere outdoor', 'publicitate exterioara', 'panouri publicitare', 'mesh banner', 'window graphics', 'semnalistica afaceri', 'print outdoor rapid'],
  other: {
    "article:published_time": "2024-01-01T08:00:00+02:00",
    "article:modified_time": "2026-08-08T09:00:00+02:00"
  },
  alternates: {
    canonical: 'https://www.homeprint.ro',
  },
  openGraph: {
    title: 'HomePrint.ro — Specialistul tău în publicitate outdoor',
    description: 'Bannere, mesh și panouri publicitare pentru afaceri, gata în 24h.',
    url: 'https://www.homeprint.ro',
    siteName: 'HomePrint.ro',
    locale: 'ro_RO',
    type: 'website',
    images: [
      {
        url: '/products/mesh/mesh_publicitar_personalizat.jpg',
        width: 1200,
        height: 630,
        alt: 'HomePrint.ro - Mesh publicitar montat pe fațadă',
      }
    ],
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "În cât timp livrați comanda?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Termenul standard de producție este de 24-48 de ore lucrătoare de la confirmarea bunului de tipar ('BT'). Livrarea prin curier mai durează, de regulă, încă 24 de ore."
      }
    },
    {
      "@type": "Question",
      "name": "Cum trimit fișierele pentru print?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Cel mai simplu este să le încarci direct în configuratorul online când plasezi comanda (acceptăm PDF, TIFF, JPEG). Dacă fișierele sunt foarte mari, poți folosi WeTransfer."
      }
    },
    {
      "@type": "Question",
      "name": "Verificați fișierele înainte de print?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Da! Toate fișierele sunt verificate manual de echipa noastră de graficieni pentru rezoluție, bleed și margini."
      }
    }
  ]
};

const trustPoints = [
  { icon: Factory, title: "Producători direcți", desc: "Parc tehnologic propriu (UV, Eco-Solvent, Latex) în București — nu intermediem, printăm noi." },
  { icon: ShieldCheck, title: "Verificare DTP gratuită", desc: "Fiecare fișier trece prin revizia echipei grafice pentru rezoluție, proporții și margini de siguranță." },
  { icon: Wind, title: "Materiale gândite pentru exterior", desc: "Frontlit, mesh microperforat anti-vânt, blockout — alegem materialul potrivit locului de montaj." },
  { icon: Truck, title: "Livrare națională 24-48h", desc: "Sistem automatizat de producție, curier în toată țara." },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FBF7F1] selection:bg-amber-500 selection:text-white">
      <Script
        id="home-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* HERO - split editorial layout, not a full-bleed dark image */}
      <section className="relative overflow-hidden border-b border-stone-200">
        <div className="container mx-auto px-4 max-w-7xl pt-16 pb-16 md:pt-24 md:pb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-amber-700 font-bold uppercase tracking-[0.2em] text-xs mb-5">HomePrint.ro — Producție Publicitară</p>
              <h1 className="text-4xl md:text-5xl lg:text-6xl text-stone-900 leading-[1.05] mb-6">
                Afacerea ta are nevoie<br className="hidden md:block" />
                să <span className="text-amber-700 italic">se vadă.</span> Azi.
              </h1>
              <p className="text-stone-600 text-lg max-w-xl leading-relaxed mb-8">
                Bannere, mesh, panouri și window graphics pentru afaceri — preț instant, comandă azi, gata în 24h.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="#produse" className="inline-flex items-center justify-center gap-2 bg-amber-700 text-white font-bold px-7 py-4 rounded-lg hover:bg-amber-800 transition-colors">
                  Vezi produsele
                  <ArrowRight size={18} />
                </Link>
                <a href={`tel:${siteConfig.phone.replace(/\s+/g, '').replace(/^0/, '+40')}`} className="inline-flex items-center justify-center gap-2 bg-white text-stone-900 font-semibold px-7 py-4 rounded-lg border border-stone-300 hover:border-amber-700 transition-colors">
                  <Phone size={16} />
                  {siteConfig.phone}
                </a>
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-[0_30px_60px_-20px_rgba(28,25,23,0.25)]">
                <Image
                  src="/products/mesh/mesh_publicitar_personalizat.jpg"
                  alt="Mesh publicitar personalizat montat pe fațada unei clădiri de birouri"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-white rounded-xl border border-stone-200 shadow-lg px-5 py-4 hidden sm:block">
                <p className="text-2xl text-stone-900 font-bold">24h</p>
                <p className="text-[11px] text-stone-500 uppercase tracking-widest font-bold">Producție rapidă</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="bg-white border-b border-stone-200 py-10">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {trustPoints.map((f, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                  <f.icon size={20} strokeWidth={2.2} />
                </div>
                <div>
                  <p className="text-stone-900 font-bold text-sm leading-tight">{f.title}</p>
                  <p className="text-stone-500 text-xs leading-snug mt-1 hidden md:block">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <section id="produse" className="bg-[#FBF7F1] py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <p className="text-amber-700 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-3">Catalog complet</p>
              <h2 className="text-3xl md:text-4xl text-stone-900">Alege ce ai nevoie, configurezi în pagină.</h2>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {CONFIGURATORS_REGISTRY.map((config, index) => (
              <Link
                key={config.id}
                href={config.url || `/configurator/${config.slug}`}
                className="group relative flex flex-col items-center text-center rounded-xl border border-stone-200 transition-all duration-300 overflow-hidden hover:border-amber-400 hover:shadow-[0_12px_32px_-16px_rgba(120,53,15,0.25)] bg-white h-full"
              >
                <div className="w-full aspect-square relative bg-stone-50 flex items-center justify-center overflow-hidden">
                  {config.image ? (
                    <Image
                      src={config.image}
                      alt={config.name}
                      fill
                      className="object-contain p-6 md:p-10 transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 25vw"
                      priority={index < 8}
                      loading={index < 8 ? undefined : "lazy"}
                    />
                  ) : (
                    <div className="w-full h-full bg-stone-100 animate-pulse flex items-center justify-center text-stone-400 font-bold uppercase text-[10px] tracking-widest">Imagine Lipsă</div>
                  )}
                </div>

                <div className="p-4 md:p-5 w-full flex-1 flex flex-col items-center justify-center border-t border-stone-100">
                  <h4 className="font-bold text-sm md:text-base leading-tight text-stone-900 group-hover:text-amber-700 transition-colors">
                    {config.name}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16 md:py-24 border-y border-stone-200">
        <div className="container mx-auto px-4 !max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-amber-700 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-4">Experiența HomePrint</p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl text-stone-900 mb-6 md:mb-8 leading-[1.1]">HP Latex & UV High-End.<br className="hidden md:block"/>Tipar de înaltă rezoluție.</h2>

              <div className="w-full h-px bg-stone-200 mb-6 md:mb-8"></div>

              <div className="space-y-6 md:space-y-8">
                {[
                  { icon: Timer, title: "Producție 24-48h", desc: "Sistem de producție automatizat, pentru comenzi urgente și campanii de ultim moment." },
                  { icon: ShieldCheck, title: "Verificare DTP Gratuită", desc: "Fiecare fișier încărcat trece prin revizia echipei noastre grafice pentru proporții și rezoluție." },
                  { icon: Truck, title: "Livrare Națională în 24-48h", desc: "Curier în toată țara, ambalare adaptată dimensiunii materialului." },
                ].map((f, i) => (
                  <div key={i} className="flex gap-4 md:gap-6 group">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-amber-50 border border-amber-100 text-amber-700 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-amber-700 group-hover:text-white transition-all duration-300">
                      <f.icon size={22} className="md:w-[26px] md:h-[26px]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h4 className="text-lg md:text-xl font-bold mb-1 md:mb-2 text-stone-900 tracking-tight">{f.title}</h4>
                      <p className="text-stone-500 leading-relaxed text-sm md:text-base">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative aspect-square sm:aspect-video lg:aspect-square rounded-2xl overflow-hidden border-4 border-[#FBF7F1] shadow-xl">
                <Image
                  src="/products/banner/banner-barbershop-1.jpg"
                  alt="Exemplu banner personalizat montat pe stand"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent"></div>

                <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-xl border border-stone-200">
                  <div className="flex items-center gap-4">
                    <div className="w-11 h-11 bg-amber-700 rounded-lg flex items-center justify-center text-white font-bold">
                      10+
                    </div>
                    <div>
                      <p className="text-stone-900 font-bold tracking-tight">10+ ani de experiență</p>
                      <p className="text-amber-700 text-xs font-bold uppercase tracking-widest">Producție proprie, București</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PromoSection />
      <FAQSection />

      <section className="container mx-auto px-4 md:px-8 mt-4 mb-12 md:mb-20 !max-w-7xl">
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden bg-[#241A10] border-4 border-amber-700 p-8 md:p-20 text-center">
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl text-white mb-4 md:mb-6 leading-tight">Gata să dăm viață <span className="text-amber-500 italic">brandului tău?</span></h2>
            <Link href="#produse" className="inline-flex justify-center items-center bg-amber-600 text-white font-bold px-8 md:px-10 py-4 md:py-5 rounded-lg active:scale-95 transition-all hover:bg-amber-500 text-base md:text-lg">
              Începe Configurarea
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
