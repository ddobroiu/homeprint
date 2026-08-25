import React, { Suspense } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import TapetConfigurator from "@/components/TapetConfigurator";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Tapet Personalizat Pe Dimensiune | Publicitate Outdoor",
  description: "Creează un decor unic cu tapet personalizat la dimensiunile tale. Materiale premium, sigure pentru interior, print ecologic. Calitate de producător. Sistem centralizat pentru outdoor și indoor. Print de mari și mici dimensiuni cu preț de producător și rezistență UV.",
  alternates: { canonical: "/tapet" },
  keywords: [
    "tapet personalizat",
    "fototapet la comanda",
    "tapet dimensiuni proprii",
    "decor perete personalizat",
    "tapet dormitor copii",
    "print tapet",
    "homeprint",
  ],
};

export default async function Page({ searchParams }: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const product = getProductBySlug("tapet");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.homeprint.ro"}/tapet`;

  const sp = await searchParams;
  const imageParam = sp?.image;
  const image = typeof imageParam === 'string' ? imageParam : undefined;

  let ratingValue: number | undefined;
  let reviewCount: number | undefined;
  try {
    const aggs = await prisma.review.aggregate({
      where: { productSlug: "tapet" },
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
        <TapetConfigurator productSlug="tapet" productImage={image} />
      </Suspense>

      {/* MASSIVE SEO CONTENT SECTION */}
      <section className="bg-background py-24 mt-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              Tapet Personalizat <br /> <span className="text-green-500 neon-text-green">Design Interior Unic</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium italic leading-relaxed">
              Transformă orice încăpere cu <strong className="text-green-400">tapet personalizat pe dimensiunile peretelui tău</strong>. La HomePrint folosim tehnologie de print ecologică, sigură pentru locuințe, grădinițe sau birouri.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white border-b-2 border-green-500 pb-4 inline-block uppercase italic tracking-widest">De ce HomePrint?</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Personalizare Totală</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Poți printa orice imagine, de la peisaje relaxante la modele geometrice sau personaje din desene animate pentru camera copiilor.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Materiale Profesional</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Oferim atât tapet autoadeziv (ușor de aplicat) cât și tapet vlies (cu aplicare cu adeziv separat), ambele având texturi superbe și rezistență mare.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Print Ecologic</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Cernelurile noastre sunt certificate pentru utilizare la interior, fiind non-toxice și fără miros, ideale pentru spații de locuit.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card p-10 shadow-premium relative group">
              <div className="absolute inset-0 bg-green-600/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase italic tracking-widest relative z-10">Pregătire Montaj</h3>
              <p className="text-slate-400 mb-6 leading-relaxed font-medium relative z-10">
                Măsoară peretele în cel puțin 3 puncte diferite și adaugă o marjă de siguranță de 5cm pentru a compensa eventualele denivelări.
              </p>
              <p className="text-green-500 leading-relaxed font-black uppercase tracking-widest text-xs italic relative z-10">
                INFO: TAPETUL SE LIVREAZĂ ÎN FÂȘII NUMEROTATE, GATA DE ÎMBINAT PERFECT.
              </p>
            </div>
          </div>

          <div className="mt-20 border-t border-white/5 pt-20">
            <div className="bg-slate-950 rounded-[3rem] p-10 md:p-16 text-white relative overflow-hidden shadow-premium border border-white/5">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-green-600/10 rounded-full blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tighter italic leading-none">Livrăm în <span className="text-green-500">Toată România</span></h3>
                  <p className="text-slate-400 text-lg leading-relaxed mb-10 font-medium italic">
                    Avem capacitatea tehnică de a livra tapet personalizat în orice localitate din țară. Fie că ești din Baia Mare, Pitești, Brăila sau un sat îndepărtat, decorul tău ajunge rapid.
                  </p>
                  <Link href="/judet" className="btn-premium">
                    Vezi Zone de Livrare <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="w-full md:w-2/5 grid grid-cols-2 gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                  {['Târgoviște', 'Râmnicu Vâlcea', 'Tulcea', 'Călărași', 'Giurgiu', 'Slobozia', 'Alexandria', 'Vaslui'].map(city => (
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
                  q: "Pot printa propria mea poză?",
                  a: "Desigur! Poți încărca orice imagine la rezoluție mare. Putem oferi consultanță pentru alegerea imaginilor potrivite dimensiunii peretelui."
                },
                {
                  q: "Cât de rezistent este tapetul?",
                  a: "Tapetul nostru este lavabil, putând fi șters ușor cu o lavetă umedă. Materialele folosite sunt durabile și certificate pentru interior."
                },
                {
                  q: "Oferiți și montaj?",
                  a: "Suntem producători, deci ne ocupăm de tipar și livrare. Montajul se realizează extrem de simplu de către orice echipă de amenajări interioare."
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