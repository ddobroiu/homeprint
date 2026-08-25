import React, { Suspense } from "react";
import CanvasConfigurator from "@/components/CanvasConfigurator";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Tablouri Canvas Personalizate | Publicitate Outdoor",
  description: "Transformă-ți fotografiile în tablouri canvas premium. Rama de lemn inclusă, gata de agățat pe perete. Calitate de producător, livrare rapidă. Sistem centralizat pentru outdoor și indoor. Print de mari și mici dimensiuni cu preț de producător și rezistență UV.",
  alternates: { canonical: "/canvas" },
  keywords: [
    "tablouri canvas",
    "canvas personalizat",
    "print pe panza",
    "cadouri personalizate",
    "decoratiuni perete",
    "canvas bucuresti",
    "homeprint",
  ],
};

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const product = getProductBySlug("canvas");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.homeprint.ro"}/canvas`;

  const sp = await searchParams;
  const imageParam = sp?.image;
  const image = typeof imageParam === 'string' ? imageParam : undefined;

  let ratingValue: number | undefined;
  let reviewCount: number | undefined;
  try {
    const aggs = await prisma.review.aggregate({
      where: { productSlug: "canvas" },
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
          url={url}
          ratingValue={ratingValue}
          reviewCount={reviewCount}
        />
      )}

      <Suspense fallback={<div className="h-screen flex justify-center items-center bg-slate-950"><div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-green-500"></div></div>}>
        <CanvasConfigurator productSlug="canvas" productImage={image} />
      </Suspense>

      {/* MASSIVE SEO CONTENT SECTION */}
      <section className="bg-background py-24 mt-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              Tablouri Canvas <br /> <span className="text-green-500 neon-text-green">Amintiri pe Pânză Profesional</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium italic leading-relaxed">
              Realizăm <strong className="text-green-400">tablouri canvas de înaltă rezoluție</strong>, folosind pânză premium de bumbac și șasiu din lemn natural. Fiecare tablou este lucrat manual la HomePrint pentru a asigura o întindere perfectă.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white border-b-2 border-green-500 pb-4 inline-block uppercase italic tracking-widest">Calitate Profesional</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Pânză Canvas Bumbac</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Folosim material canvas mat, cu textură bogată, care nu reflectă lumina și păstrează detaliile fine ale fotografiilor tale.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Șasiu din Lemn Masiv</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Rama interioară este construită din baghete de brad uscat, asigurând stabilitate și prevenind curbarea tabloului în timp.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Gata de Agățat</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Tablourile vin cu agațatoarea montată și marginile îmbrăcate în pânză (printate), gata pentru a fi expuse imediat.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card p-10 shadow-premium relative group">
              <div className="absolute inset-0 bg-green-600/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase italic tracking-widest relative z-10">Recomandări Foto</h3>
              <p className="text-slate-400 mb-6 leading-relaxed font-medium relative z-10">
                Pentru rezultate uimitoare, folosiți fotografii la rezoluție mare. Rețineți că pânza se va întinde și pe marginile laterale (cca. 2cm).
              </p>
              <p className="text-green-500 leading-relaxed font-black uppercase tracking-widest text-xs italic relative z-10">
                INFO: EVITAȚI PLASAREA DETALIILOR IMPORTANTE SAU A TEXTELOR FOARTE APROAPE DE MARGINI.
              </p>
            </div>
          </div>

          <div className="mt-24 border-t border-white/5 pt-24 pb-12">
            <h3 className="text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter italic">Întrebări Frecvente <span className="text-green-500">(FAQ)</span></h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  q: "Se decolorează culorile în timp?",
                  a: "Nu! Folosim cerneluri cu protecție UV, garantate să-și păstreze vivacitatea zeci de ani dacă tabloul este expus la interior."
                },
                {
                  q: "Pot curăța tabloul canvas?",
                  a: "Tabloul poate fi șters ușor de praf cu o cârpă moale uscată. Evitați agenții chimici de curățare agresivi."
                },
                {
                  q: "Cât durează execuția?",
                  a: "Fiind producători direcți, timpul de producție este de obicei de 24-48 de ore lucrătoare de la confirmarea graficii."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-slate-900/40 backdrop-blur-sm p-8 rounded-3xl border border-white/5 shadow-soft hover:border-green-500/30 transition-all duration-500 group">
                  <h4 className="font-black text-xl text-white mb-4 uppercase tracking-tighter italic group-hover:text-green-400 transition-colors leading-none">{faq.q}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed font-medium italic">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}