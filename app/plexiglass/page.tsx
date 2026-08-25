import React, { Suspense } from "react";
import ConfiguratorPlexiglass from "@/components/ConfiguratorPlexiglass";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Print Plexiglass Personalizat",
  description: "Configurează online plexiglass personalizate. Prețuri de producător, print outdoor & indoor la rezoluție înaltă.",
  alternates: { canonical: "/plexiglass" }
};

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const product = getProductBySlug("plexiglass");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.homeprint.ro"}/plexiglass`;

  const sp = await searchParams;
  const imageParam = sp?.image;
  const image = typeof imageParam === 'string' ? imageParam : undefined;

  let ratingValue: number | undefined;
  let reviewCount: number | undefined;
  try {
    const aggs = await prisma.review.aggregate({
      where: { productSlug: "plexiglass" },
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
        <ConfiguratorPlexiglass productSlug="plexiglass" productImage={image} />
      </Suspense>

      {/* MASSIVE SEO CONTENT SECTION */}
      <section className="bg-background py-24 mt-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              Print Plexiglass <br /> <span className="text-green-500 neon-text-green">Eleganță și Transparență</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium italic leading-relaxed">
              Realizăm <strong className="text-green-400">print direct pe plexiglass (acrilic)</strong> folosind tehnologie UV de ultimă generație. Ideal pentru semnalistică premium, tablouri luminoase, decoruri de lux sau plăcuțe de firmă rezistente.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white border-b-2 border-green-500 pb-4 inline-block uppercase italic tracking-widest">Avantaje Plexiglass</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Claritate de Cristal</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Plexiglass-ul oferă o claritate optică superioară sticlei clasice, fiind mult mai rezistent la impact și considerabil mai ușor.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Print UV High-Gloss</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Tehnologia UV ne permite să printăm cu alb de susținere sau selectiv, creând efecte de profunzime uimitoare direct pe spatele plăcii.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Durabilitate Outdoor</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Rezistent la intemperii, raze UV și variații de temperatură, plexiglass-ul printat își păstrează aspectul premium ani de zile.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card p-10 shadow-premium relative group">
              <div className="absolute inset-0 bg-green-600/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase italic tracking-widest relative z-10">Specificații</h3>
              <p className="text-slate-400 mb-6 leading-relaxed font-medium relative z-10">
                Putem debita plexiglass-ul la orice formă dorită folosind CNC laser pentru margini perfect lucioase și netede.
              </p>
              <p className="text-green-500 leading-relaxed font-black uppercase tracking-widest text-xs italic relative z-10">
                INFO: PENTRU PLĂCUȚE DE FIRMĂ ORIENTATE SPRE EXTERIOR, PRINTĂM ÎN OGLINDĂ PE SPATE PENTRU PROTECȚIE MAXIMĂ.
              </p>
            </div>
          </div>

          <div className="mt-24 border-t border-white/5 pt-24 pb-12">
            <h3 className="text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter italic">Întrebări Frecvente <span className="text-green-500">(FAQ)</span></h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  q: "Se poate printa și culoarea albă pe plexiglass transparent?",
                  a: "Da! Tehnologia noastră UV permite printul cu cerneală albă ca strat de bază (pentru opacitate) sau ca element grafic distinct."
                },
                {
                  q: "Cum se curăță panourile de plexiglass?",
                  a: "Se recomandă curățarea cu o lavetă moale din microfibră și apă cu săpun neutru. Evitați produsele pe bază de alcool sau solvenți."
                },
                {
                  q: "Ce grosimi aveți disponibile?",
                  a: "Standard lucrăm cu plexiglass de 3mm, 5mm și 10mm, dar putem furniza și alte grosimi la cerere pentru proiecte speciale."
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