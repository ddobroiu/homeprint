import React, { Suspense } from "react";
import BannerVersoConfigurator from "@/components/BannerVersoConfigurator";
import { getProductBySlug } from "@/lib/products";
import ProductJsonLd from "@/components/ProductJsonLd";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Banner Față-Verso (Double Sided)",
  description: "Comandă bannere printate pe ambele fețe (blockout). Vizibilitate maximă stradală, material opac care nu permite trecerea luminii. Prețuri de producător.",
  keywords: ["banner fata verso", "banner dubla fata", "print double sided", "banner blockout", "banner stradal"],
  openGraph: {
    title: "Banner Față-Verso (Double Sided)",
    description: "Bannere printate pe ambele fețe pentru vizibilitate maximă. Configurează online dimensiunile și vezi prețul instant!",
    images: [{
      url: "/products/fata-verso/banner-verso-1.webp",
      width: 1200,
      height: 630,
      alt: "Banner Fata-Verso HomePrint.ro"
    }]
  },
  alternates: { canonical: "/banner-verso" },
};

export default async function BannerVersoPage() {
  const product = getProductBySlug("banner-verso");
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || "https://www.HomePrint.ro"}/banner-verso`;

  let ratingValue: number | undefined;
  let reviewCount: number | undefined;
  try {
    const aggs = await prisma.review.aggregate({
      where: { productSlug: "banner-verso" },
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
        <BannerVersoConfigurator productSlug="banner-verso" />
      </Suspense>

      {/* MASSIVE SEO CONTENT SECTION */}
      <section className="bg-background py-24 mt-24 border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.03)_0%,transparent_70%)] pointer-events-none"></div>
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="text-center mb-16 lg:mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              Bannere <span className="text-green-500 neon-text-green">Față-Verso</span> <br /> (Blockout 100% Opac)
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto font-medium italic leading-relaxed">
              Când vrei ca reclama ta să fie văzută din ambele sensuri de mers, un banner frontlit simplu nu e suficient. Intră în scenă <strong className="text-green-500">Poliplanul Blockout (dublă față)</strong> – 100% opac, ultra-rezistent, perfect pentru steaguri suspendate sau semnalizări perpendiculare pe stradă.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start mb-24">
            <div className="space-y-8">
              <h3 className="text-2xl font-black text-white border-b-2 border-green-500 pb-4 inline-block uppercase italic tracking-widest">De ce Blockout?</h3>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Structură Opacă Inovatoare</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Include o peliculă de polimer negru la interior care blochează complet lumina. Grafica de pe spate nu se va vedea niciodată prin transparență.</span>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/10 text-green-500 p-1.5 rounded-full border border-green-500/20 shadow-xl shadow-green-500/10 transition-transform hover:scale-110"><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-white text-lg font-black uppercase tracking-tighter italic mb-1">Eficiență Vizuală Maximă</strong>
                    <span className="text-slate-400 text-sm font-medium leading-relaxed">Perfect pentru axul central al stâlpilor sau zone de trafic intens bidirecțional. O singură bucată de material ancorată înlocuiește două bannere clasice.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="glass-card p-10 shadow-premium relative group">
              <div className="absolute inset-0 bg-green-600/5 rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <h3 className="text-2xl font-black text-white mb-8 uppercase italic tracking-widest relative z-10">Cerințe Grafice</h3>
              <p className="text-slate-400 mb-6 leading-relaxed font-medium relative z-10">
                Putem tipări grafică identică pe ambele fețe sau fețe diferite. Vă rugăm să specificați acest lucru în detaliile comenzii.
              </p>
              <p className="text-green-500 leading-relaxed font-black uppercase tracking-widest text-xs italic relative z-10">
                EXPEDIERE FIȘIERE: Încărcați PDF multi-page (Pagina 1 = Față, Pagina 2 = Spate) pentru aliniere perfectă.
              </p>
            </div>
          </div>

          <div className="mt-24 border-t border-white/5 pt-24 pb-12">
            <h3 className="text-4xl font-black text-white mb-16 text-center uppercase tracking-tighter italic">Întrebări Frecvente <span className="text-green-500">(FAQ)</span></h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  q: "Materialul este mai gros decat un banner normal?",
                  a: "Da, poliplanul Blockout are o densitate superioară (500-610g/mp), fiind ranforsat suplimentar pentru stabilitate și rezistență anti-rupere la exterior."
                },
                {
                  q: "Ce includ finisajele gratuite?",
                  a: "Ca și la bannerele clasice, primești gratuit tiv perimetral și capse metalice. La cerere, putem realiza buzunare pentru tije/stâlpi (sistem tip steag)."
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
