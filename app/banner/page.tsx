import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import BannerConfigurator from "@/components/BannerConfigurator";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Bannere Publicitare Ieftine (Frontlit) | Publicitate Outdoor",
  description: "Configurează online bannere publicitare la orice dimensiune. Prețuri de producător de la 9€/mp. Finisaje gratuite (tiv, capse). Livrare rapidă 24h. Sistem centralizat pentru outdoor și indoor. Print de mari și mici dimensiuni cu preț de producător și rezistență UV.",
  keywords: [
    "bannere publicitare",
    "bannere ieftine",
    "print banner",
    "banner frontlit",
    "reclama banner",
    "bannere bucuresti",
    "pret banner mp",
    "homeprint",
  ],
  alternates: { canonical: "/banner" },
  openGraph: {
    title: "Bannere Publicitare - Configurează Online | Publicitate Outdoor",
    description: "Ai nevoie de un banner? Introduci dimensiunile și vezi prețul pe loc. Print policromie rezistent UV, finisaje incluse. Sistem centralizat pentru outdoor și indoor. Print de mari și mici dimensiuni cu preț de producător și rezistență UV.",
    images: [{
      url: "/products/banner/banner-1.webp",
      width: 1200,
      height: 630,
      alt: "Bannere publicitare outdoor HomePrint.ro"
    }]
  }
};

export default async function BannerPage({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const product = getProductBySlug("banner");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.homeprint.ro"}/banner`;

  const sp = await searchParams;
  const imageParam = sp?.image;
  const image = typeof imageParam === 'string' ? imageParam : undefined;

  let ratingValue: number | undefined;
  let reviewCount: number | undefined;
  try {
    const aggs = await prisma.review.aggregate({
      where: { productSlug: "banner" },
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
        <BannerConfigurator productSlug="banner" productImage={image} />
      </Suspense>

      {/* MASSIVE SEO CONTENT SECTION */}
      <section className="bg-background py-24 mt-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              Bannere Publicitare <br /> <span className="text-green-500 neon-text-green">Calitate Producător</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium italic leading-relaxed">
              Realizăm <strong className="text-green-400">bannere stradale frontlit premium</strong>, rezistente la vânt, soare (raze UV) și ploaie. Preț de producător, printate 100% ecologic și tăiate la dimensiunea ta exactă.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white border-b-2 border-green-500 pb-4 inline-block uppercase italic tracking-widest">De ce HomePrint?</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Print UV High-Definition</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Cerneala UV se polimerizează instantaneu pe material. Culorile nu se decolorează în timp și sunt rezistente la zgârieturi.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Finisaje Profesional GRATUIT</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Fiecare banner pleacă cu tiv perimetral termosudat și capse metalice la 30-50cm, fără costuri suplimentare ascunse.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Configurare Nelimitată</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Imprimăm pe role poliplan industriale. Introduci dimensiunile dorite în configurator și afli prețul instant.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card p-10 shadow-premium relative group">
              <div className="absolute inset-0 bg-green-600/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase italic tracking-widest relative z-10">Ghid Comandă</h3>
              <p className="text-slate-400 mb-6 leading-relaxed font-medium relative z-10">
                Reclamele frontlit (440g - 510g) sunt standardul în semnalistică pentru promovare imobiliară, spălătorii auto, spații comerciale sau campanii outdoor de lungă durată.
              </p>
              <p className="text-green-500 leading-relaxed font-black uppercase tracking-widest text-xs italic relative z-10">
                INFO GRAFICĂ: Folosiți CMYK și lăsați 5cm zonă de siguranță pe margini pentru perforarea capselor fără a afecta textul.
              </p>
            </div>
          </div>

          {/* National Coverage */}
          <div className="mt-20 border-t border-white/5 pt-20">
            <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-premium border border-white/5">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-600/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter italic leading-none">Acoperire <span className="text-green-500">Națională</span></h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                    Livrăm prin curierat rapid în orice localitate din România. Fie că ești într-un mare centru urban sau într-o zonă rurală, produsele tale ajung în siguranță.
                  </p>
                  <Link href="/judet" className="btn-premium">
                    Vezi Zone de Livrare <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="w-full md:w-2/5 grid grid-cols-2 gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                  {['București', 'Cluj', 'Timișoara', 'Iași', 'Constanța', 'Brașov', 'Craiova', 'Buzău'].map(city => (
                    <div key={city} className="bg-white/5 backdrop-blur-sm border border-white/5 rounded-2xl p-4 text-center text-[10px] font-black uppercase tracking-[0.2em] italic text-white shadow-xl">
                      {city}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-24 border-t border-white/5 pt-24 pb-12">
            <h3 className="text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter italic">Întrebări Frecvente <span className="text-green-500">(FAQ)</span></h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  q: "Există o comandă minimă pentru bannere?",
                  a: "Comanda minimă facturabilă este de 1 mp. Poți comanda dimensiuni mai mici, dar costul va fi rotunjit la nivelul minim de unitate de producție."
                },
                {
                  q: "Sunt incluse inelele de prindere (capsele) și tivul?",
                  a: "Da! Finisarea standard ce include tivirea perimetrală și montarea capselor metalice la distanță de ~30cm este oferită GRATUIT pentru toate produsele HomePrint."
                },
                {
                  q: "Cât de repede se livrează comanda?",
                  a: "Tehnologia UV ne permite uscarea instantă a printului. Timpul standard este de 24-48 ore lucrătoare oriunde în țară, din momentul validării comenzii."
                },
                {
                  q: "Bannerele rezistă la soare (raze UV)?",
                  a: "Absolut! Cernelurile noastre UV premium asigură o rezistență a culorilor de până la 3-5 ani la exterior, oferind un contrast și o durabilitate superioară vopselelor tradiționale."
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