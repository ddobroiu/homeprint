import Link from "next/link";
import { ArrowRight } from "lucide-react";
import WindowGraphicsConfigurator from "@/components/WindowGraphicsConfigurator";
import type { Metadata } from "next";
import { Suspense } from "react";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";
import { prisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Window Graphics - Folie Perforată Geamuri | Publicitate Outdoor",
  description:
    "Folie perforată (One Way Vision) pentru geamuri și vitrine. Vizibilitate din interior, reclamă din exterior. Print de înaltă rezoluție, rezistent la exterior.",
  keywords: [
    "window graphics",
    "folie perforata",
    "one way vision",
    "folie geamuri",
    "autocolant vitrine",
    "branding vitrine",
    "homeprint",
  ],
  alternates: { canonical: "/window-graphics" },
  openGraph: {
    title: "Window Graphics - Folie Perforată | Publicitate Outdoor",
    description:
      "Transformă vitrina sau geamurile într-un spațiu publicitar cu folie perforată One Way Vision. Comandă online la HomePrint.ro!",
    images: [{
      url: "/products/window-graphics/window-graphics-1.webp",
      width: 1200,
      height: 630,
      alt: "Window Graphics Folie Perforata"
    }],
    type: "website",
  },
};

export default async function WindowGraphicsPage() {
  const product = getProductBySlug("window-graphics");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.homeprint.ro"}/window-graphics`;

  let ratingValue: number | undefined;
  let reviewCount: number | undefined;
  try {
    const aggs = await prisma.review.aggregate({
      where: { productSlug: "window-graphics" },
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
        <WindowGraphicsConfigurator productSlug="window-graphics" />
      </Suspense>

      {/* MASSIVE SEO CONTENT SECTION */}
      <section className="bg-background py-24 mt-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              Window Graphics <br /> <span className="text-green-500 neon-text-green">Folie Perforată Vitrine</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium italic leading-relaxed">
              Transformă geamurile afacerii tale într-un panou de marketing eficient, fără a bloca lumina naturală. Autocolantul <strong className="text-green-400">One-Way Vision</strong> oferă intimitate la interior și reclamă vibrantă la exterior.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white border-b-2 border-green-500 pb-4 inline-block uppercase italic tracking-widest">De ce HomePrint?</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Iluzie Optică Perfectă</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Materialul perforat permite celor din interior să vadă afară ca printr-un geam fumuriu, în timp ce exteriorul afișează doar grafica ta colorată și vibrantă.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Protecție Solară</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Folia reduce radiația termică, menținând încăperile răcoroase pe timpul verii, scăzând totodată costurile cu climatizarea (A/C).</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Rezistență și Durabilitate</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Folosim cerneluri UV rezistente la intemperii, care nu se decolorează la soare. Opțional putem lamina folia pentru o protecție sporită.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card p-10 shadow-premium relative group">
              <div className="absolute inset-0 bg-green-600/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase italic tracking-widest relative z-10">Sfaturi Design</h3>
              <p className="text-slate-400 mb-6 leading-relaxed font-medium relative z-10">
                Evitați textele minuscule sau detaliile extrem de fine, deoarece procesul de perforare (50/50 print/aer) poate face aceste elemente greu de citit.
              </p>
              <p className="text-green-500 leading-relaxed font-black uppercase tracking-widest text-xs italic relative z-10">
                INFO: PLASAȚI LOGO-UL ȘI DATELE DE CONTACT ÎN ZONELE FĂRĂ ÎMBINĂRI ALE GEAMURILOR.
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
                    Avem capacitatea tehnică de a livra window graphics personalizat în orice localitate din țară. Fie că ești din Ploiești, Arad, Sibiu sau un sat îndepărtat, produsele tale ajung rapid.
                  </p>
                  <Link href="/judet" className="btn-premium">
                    Vezi Zone de Livrare <ArrowRight size={20} />
                  </Link>
                </div>
                <div className="w-full md:w-2/5 grid grid-cols-2 gap-4 opacity-60 group-hover:opacity-100 transition-opacity">
                  {['Târgu Mureș', 'Alba Iulia', 'Deva', 'Hunedoara', 'Zalău', 'Reșița', 'Slatina', 'Târgu Jiu'].map(city => (
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
                  q: "Pot aplica folie cu găurele pe luneta mașinii?",
                  a: "Absolut! Este una dintre aplicațiile principale pentru brandingul auto comercial pe utilitare și turisme."
                },
                {
                  q: "Cum reacționează noaptea (pe întuneric)?",
                  a: "Efectul depinde de lumină. Noaptea, dacă este lumină puternică la interior, vizibilitatea se inversează parțial. Recomandăm iluminarea fațadei din exterior."
                },
                {
                  q: "Laminăm Window Graphics-ul?",
                  a: "Pentru vitrine expuse murdăriei excesive putem lamina folia cu o peliculă specială ultra-transparentă care sigilează găurile, protejând printul."
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

