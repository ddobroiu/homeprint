import { Suspense } from 'react';
import BannerConfigurator from "@/components/configurator/BannerConfigurator";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { SeoDimensionsLinks } from '@/components/SeoDimensionsLinks';

export const metadata: Metadata = {
  title: 'Banner Personalizat - Configurator Online Banner Outdoor',
  description: 'Comandă bannere personalizate online. Material PVC premium (frontlit), tiv și capse incluse. Preț instant și livrare rapidă în 24-48h.',
  keywords: ['banner personalizat', 'bannere publicitare', 'configurator banner', 'print outdoor', 'banner pvc pret', 'homeprint'],
  alternates: {
    canonical: '/configurator/banner',
  },
  openGraph: {
    title: 'Configurator Banner Personalizat',
    description: 'Personalizează propriul banner online. Preț instant, calitate premium.',
    images: ['/products/banner/banner-1.webp'],
  }
};

export default function BannerPage() {
  return (
    <div className="pt-20">
      <h1 className="sr-only">Bannere Publicitare Personalizate - Configurator Online Print Outdoor PVC</h1>
      <BreadcrumbSchema
        items={[
          { name: "Acasă", item: "/" },
          { name: "Configuratoare", item: "/configurator" },
          { name: "Bannere Publicitare", item: "/configurator/banner" }
        ]}
      />
      <ProductSchema
        name="Banner Publicitar Personalizat"
        description="Bannere publicitare premium (frontlit), tiv și capse incluse. Durabilitate ridicată la exterior (UV și intemperii)."
        image="/products/banner/banner-1.webp"
        url="/configurator/banner"
        price="45.00"
      />
      <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul...</div>}>
        <BannerConfigurator />
      </Suspense>

      <FAQSchema
        faqs={[
          {
            question: "Există o comandă minimă pentru bannere?",
            answer: "Comanda minimă facturabilă este echivalentul a 1 metru pătrat (1 mp = 10.000 cmp). Poți comanda un banner chiar și de 50x50cm, însă prețul de calcul va porni de la valoarea minimă pe mp."
          },
          {
            question: "Sunt incluse inelele de prindere (capsele) și tivul?",
            answer: "Da! Finisarea de bază: tivirea marginilor pentru rezistență mecanică sporită la smulgere și asamblarea capselor metalice la o distanță de ~30-50 cm sunt complet gratuite. Totul pentru ca tu să poți monta bannerul folosind o simplă sfoară sau coliere de plastic."
          },
          {
            question: "Cât de repede se livrează comanda?",
            answer: "Datorită imprimantelor UV industriale folosite, cerneala se usucă instant (nu necesită timp de așteptare pentru evaporarea solvenților). Din momentul aprobării graficii (BT) și finalizării configurării în site, timpul standard de producție + livrare prin Curier este între 24 și 48 de ore lucrătoare, național."
          },
          {
            question: "Bannerele rezistă la soare (raze UV) și nu se decolorează?",
            answer: "Absolut! Deoarece folosim o tehnologie premium cu polimerizare fotochimică (Cerneluri UV), reclamele tale își vor menține strălucirea culorilor, contrastul de negru și lizibilitatea pe o durată mult mai mare cuprinsă între 3-5 ani la exterior permanent, față de printul tradițional pe bază de Eco-Solvent."
          }
        ]}
      />

      {/* MASSIVE SEO CONTENT SECTION */}
      <section className="bg-white py-16 mt-16 border-t border-slate-100">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
              Bannere Publicitare la Comandă - Calitate Producător
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Realizăm <strong className="text-orange-600">bannere stradale frontlit premium</strong>, rezistente la vânt, soare (raze UV) și ploaie. Preț de producător, printate 100% ecologic și tăiate la dimensiunea ta exactă.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">De ce să ne alegi pe noi?</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Print UV de Înaltă Rezoluție</strong>
                    <span className="text-slate-600 text-sm">Cerneala UV se polimerizează instantaneu pe material. Culorile nu se decolorează în timp și sunt rezistente la zgârieturi.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Finisaje Profesional GRATUITE</strong>
                    <span className="text-slate-600 text-sm">Fiecare banner pleacă de la noi cu Tiv perimetral (termosudat pentru a nu se rupe în vânt) și Capse metalice din 30 în 30cm, fără costuri ascunse.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                  <div>
                    <strong className="block text-slate-900">Orice Dimensiune (Lungime Infinită)</strong>
                    <span className="text-slate-600 text-sm">Imprimăm pe role poliplan de mari dimensiuni. Folosește configuratorul de mai sus, alege Lățimea și Înălțimea și afli prețul instant.</span>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce trebuie să știi înainte să comanzi:</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Reclamele de tip banner publicitar frontlit (440g/mp - 510g/mp) sunt soluția supremă de semnalistică pentru promovare imobiliară ("De Vânzare", "De Închiriat"), evenimente, spălătorii auto, spatii comerciale sau semnalizări stradale.
              </p>
              <p className="text-slate-600 leading-relaxed font-bold">
                Pentru pregătirea graficii: folosiți profilul de culoare CMYK și lăsați o zonă de siguranță de 5 cm pe margini pentru ca textul să nu fie perforat de capse!
              </p>
            </div>
          </div>

          {/* SEO FAQ Structured Schema */}
          <div className="mt-16 border-t border-slate-200 pt-16">
            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente (FAQ)</h3>
            <div className="space-y-6 max-w-3xl mx-auto">
              {[
                {
                  q: "Există o comandă minimă pentru bannere?",
                  a: "Comanda minimă facturabilă este echivalentul a 1 metru pătrat (1 mp = 10.000 cmp). Poți comanda un banner chiar și de 50x50cm, însă prețul de calcul va porni de la valoarea minimă pe mp."
                },
                {
                  q: "Sunt incluse inelele de prindere (capsele) și tivul?",
                  a: "Da! Finisarea de bază: tivirea marginilor pentru rezistență mecanică sporită la smulgere și asamblarea capselor metalice la o distanță de ~30-50 cm sunt complet gratuite. Totul pentru ca tu să poți monta bannerul folosind o simplă sfoară sau coliere de plastic."
                },
                {
                  q: "Cât de repede se livrează comanda?",
                  a: "Datorită imprimantelor UV industriale folosite, cerneala se usucă instant (nu necesită timp de așteptare pentru evaporarea solvenților). Din momentul aprobării graficii (BT) și finalizării configurării în site, timpul standard de producție + livrare prin Curier este între 24 și 48 de ore lucrătoare, național."
                },
                {
                  q: "Bannerele rezistă la soare (raze UV) și nu se decolorează?",
                  a: "Absolut! Deoarece folosim o tehnologie premium cu polimerizare fotochimică (Cerneluri UV), reclamele tale își vor menține strălucirea culorilor, contrastul de negru și lizibilitatea pe o durată mult mai mare cuprinsă între 3-5 ani la exterior permanent, față de printul tradițional pe bază de Eco-Solvent."
                }
              ].map((faq, idx) => (
                <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition">
                  <h4 className="font-bold text-lg text-slate-900 mb-2">{faq.q}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <SeoDimensionsLinks 
        productId="banner" 
        productName="Banner Frontlit" 
        currentW={100} 
        currentH={100} 
      />
    </div>
      </section>
    </div>
  );
}
