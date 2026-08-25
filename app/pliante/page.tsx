import React, { Suspense } from "react";
import PlianteConfigurator from "@/components/PlianteConfigurator";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Print Pliante & Flyere Personalizate | Publicitate Outdoor",
  description: "Comandă flyere și pliante de calitate premium. Diverse formate (A4, A5, A6, DL) și tipuri de hârtie. Prețuri de producător, livrare rapidă. Sistem centralizat pentru outdoor și indoor. Print de mari și mici dimensiuni cu preț de producător și rezistență UV.",
  alternates: { canonical: "/pliante" },
  keywords: [
    "flyere personalizate",
    "print pliante",
    "fluturasi publicitari",
    "tipar offset",
    "pliante 2 pliuri",
    "flyere ieftine",
    "homeprint",
  ],
};

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const product = getProductBySlug("pliante");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.homeprint.ro"}/pliante`;

  const sp = await searchParams;
  const imageParam = sp?.image;
  const image = typeof imageParam === 'string' ? imageParam : undefined;

  let ratingValue: number | undefined;
  let reviewCount: number | undefined;
  try {
    const aggs = await prisma.review.aggregate({
      where: { productSlug: "pliante" },
      _avg: { rating: true },
      _count: { rating: true }
    });
    if (aggs._count.rating > 0) {
      ratingValue = aggs._avg.rating || 0;
      reviewCount = aggs._count.rating;
    }
  } catch (e) { }

  return (
    <main className="min-h-screen bg-gray-50">
      {product && (
        <ProductJsonLd
          product={product}
          url={url}
          ratingValue={ratingValue}
          reviewCount={reviewCount}
        />
      )}

      <Suspense fallback={<div className="h-screen flex justify-center items-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div></div>}>
        <PlianteConfigurator productImage={image} />
      </Suspense>

      {/* MASSIVE SEO CONTENT SECTION */}
      <section className="bg-white py-16 mt-16 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight uppercase">
              Flyere și Pliante - Promovare Offline de Impact
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Chiar și în era digitală, <strong className="text-orange-600">flyerele și pliantele rămân un instrument esențial</strong> pentru marketing-ul local. La HomePrint printăm materiale publicitare care atrag atenția prin claritate și culori vii.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">De ce să alegi printul nostru?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Gamă Variată de Formate</strong>
                    <span className="text-slate-600 text-sm">De la flyerele clasice A6 sau A5, până la pliante DL (1/3 din A4) cu 2 sau 3 pliuri, acoperim toate nevoile de distribuție.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Hârtie de Calitate</strong>
                    <span className="text-slate-600 text-sm">Folosim hârtie dublu cretată (lucioasă sau mată) de diverse gramaje, de la varianta economică de 130g până la cartonul premium de 300g.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Tiraj Flexibil</strong>
                    <span className="text-slate-600 text-sm">Fie că ai nevoie de 100 de bucăți pentru un eveniment restrâns sau de 10.000 pentru o campanie masivă, avem soluția potrivită de print digital sau offset.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Tipuri de Pliere:</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Poți alege plierea tip "acordeon" (Z-fold) sau tip "fereastră" (C-fold) pentru a organiza informația cât mai clar pentru clienții tăi.
              </p>
              <p className="text-slate-600 leading-relaxed font-bold">
                Flyerele sunt ideale pentru distribuție în stradă, în timp ce pliantele oferă spațiu generos pentru meniuri, liste de prețuri sau prezentări detaliate.
              </p>
            </div>
          </div>

          <div className="mt-16 border-t border-slate-200 pt-16">
            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Flyere</h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  q: "Care este diferența între flyer și pliant?",
                  a: "Flyerul (sau fluturașul) este o singură foaie de hârtie printată pe una sau ambele fețe. Pliantul este o foaie care trece printr-un proces de biguire și pliere, rezultând mai multe pagini (ex: un pliant A4 pliat în 3 rezultă 6 pagini DL)."
                },
                {
                  q: "Puteți face și designul grafic?",
                  a: "Da, echipa noastră de graficieni te poate ajuta cu realizarea machetei contra cost, sau putem verifica gratuit fișierele trimise de tine pentru a ne asigura că sunt gata de print."
                },
                {
                  q: "Ce rezoluție trebuie să aibă fișierul?",
                  a: "Pentru materialele de tipar digital/offset (flyere, pliante), recomandăm ca fișierele să aibă o rezoluție de minimum 300 DPI la dimensiunea reală, pentru a evita aspectul pixelat."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <h4 className="font-bold text-lg text-slate-900 mb-2">{faq.q}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}