import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Fototapet Personalizat pentru Birou și Showroom - HomePrint',
    description: 'Fototapet vinilic personalizat pentru amenajarea biroului, showroom-ului sau spațiului comercial. Material lavabil 400g, print HD, orice imagine sau logo. Preț instant.',
    keywords: ['tapet personalizat', 'fototapet birou', 'tapet showroom', 'tapet vinilic', 'decor perete firma', 'homeprint'],
    alternates: {
        canonical: '/configurator/tapet',
    },
};

export default function TapetPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul de tapet...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Tapet Personalizat pentru Birou și Showroom</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Configuratoare", item: "/configurator" },
                        { name: "Tapet Personalizat", item: "/configurator/tapet" }
                    ]}
                />
                <ProductSchema
                    name="Fototapet Personalizat pentru Business"
                    description="Fototapet vinilic lavabil, print HD, personalizat pentru amenajarea birourilor, showroom-urilor și spațiilor comerciale."
                    image="/products/tapet/tapet-1.webp"
                    url="/configurator/tapet"
                    price="40.00"
                />
                <ConfiguratorDispatcher configuratorId="tapet" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Dimensiunea imprimantei: Din câte fâșii va fi compus fototapetul?",
                            answer: "Materialele vin sub formă de tapet la rolă tipică DTP de lățimi gen 1.05m sau 1.37m, ceea ce înseamnă că la un perete de recepție de 3 metri lungime, vei primi designul partiționat în fâșii verticale logice, cu o ușoară suprapunere (overlap 1-2 cm) marcată special pentru un montaj fluid."
                        },
                        {
                            question: "Asigurați lipiciul sau aplicarea directă la locație (Montaj)?",
                            answer: "Noi fabricăm, tăiem și pregătim sulurile pentru comandă alături de schema de îmbinare. Lipiciul/adezivul ecologic comercializat se poate găsi separat (pentru tapete grele, recomandăm Adeziv Vlies sau amestec cu PVA), aplicându-se pe peretele prealabil curățat și amorsat strict ca o vopsea."
                        },
                        {
                            question: "Grafica la Fototapet: De unde obțin o imagine clară?",
                            answer: "Poți apela la arhive profesionale gratuite (Pixabay, Unsplash, Freepik Profesional) sau la platforme premium de stock (Shutterstock / Adobe Stock). Imaginile trebuie să depășească 30-40 Megapixeli din cauza măririi la 1:1. Pentru un logo de firmă pe perete, trimite-l în format vectorial."
                        },
                        {
                            question: "Se potrivește pentru un perete de recepție cu logo-ul firmei?",
                            answer: "Da, e o aplicație foarte căutată — un perete de fundal cu logo-ul companiei în spatele recepției sau sălii de ședințe creează un impact vizual mult mai puternic decât o simplă vopsire, la un cost comparabil."
                        }
                    ]}
                />

                {/* MASSIVE SEO CONTENT SECTION */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Fototapet Personalizat pentru Birou, Showroom și Spații Comerciale
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Un perete de recepție plictisitor spune mult despre o afacere. Tipărim la rezoluție fină <strong className="text-orange-600">fototapet vinilic lavabil</strong>, cu orice imagine — logo de companie, peisaje, texturi faux-lemn — pentru birouri, showroom-uri și spații comerciale.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">De ce să optezi pentru Tapet Custom?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Total Unic, fără tipare pre-fabricate</strong>
                                            <span className="text-slate-600 text-sm">Spre deosebire de magazinele de bricolaj unde ești limitat la modele repetitive (flori sau geometrii clasice), un fototapet este conceput pur pentru proiectul și suprafața ta (cu pierderi 0).</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Material Gros / Super-Lavabil</strong>
                                            <span className="text-slate-600 text-sm">Hârtia subțire dă bătăi de cap la aplicare. Noi recomandăm Vlies heavy-duty de minim 350 grame (PVC texturat). Se curăță ușor cu buretele, ideal pentru spații cu trafic zilnic ridicat — recepții, holuri de birou, showroom-uri.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Decor de brand, nu doar decorațiune</strong>
                                            <span className="text-slate-600 text-sm">Un perete întreg cu logo-ul și culorile companiei creează o impresie mult mai puternică la clienți și candidați la interviu decât o ramă cu logo pe birou.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Măsurarea unui perete</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Când adaugi lățimea (L) și înălțimea (H) camerei tele în acest calculator online, te rugăm să <b>adaugi 3-5 centimetri pierdere tehnică perimetrală</b>. Niciun plafon și niciun perete nu e perfect perpendicular 90 grade din construcție, prin urmare acea marjă te va ajuta extrem mult la tăietura finală la fața locului!
                                </p>
                            </div>
                        </div>

                        {/* SEO FAQ Structured Schema */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Tapet Custom</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Dimensiunea imprimantei: Din câte fâșii va fi compus fototapetul?",
                                        a: "Materialele vin sub formă de tapet la rolă tipică DTP de lățimi gen 1.05m sau 1.37m, ceea ce înseamnă că la perete de 3 metri lungime, vei primi designul partiționat în fâșii verticale logice, cu o ușoară suprapunere (overlap 1-2 cm) marcată special pentru un montaj fluid."
                                    },
                                    {
                                        q: "Asigurați lipiciul sau aplicarea directă la locație (Montaj)?",
                                        a: "Noi fabricăm, tăiem și pregătim sulurile pentru comandă alături de schema de îmbinare. Lipiciul/adezivul ecologic comercializat se poate găsi separat (pentru tapete grele, recomandăm Adeziv Vlies sau amestec cu PVA), aplicându-se pe peretele prealabil curățat și amorsat strict ca o vopsea."
                                    },
                                    {
                                        q: "Grafica la Fototapet: De unde obțin o imagine clară?",
                                        a: "Poți apela la arhive profesionale gratuite (Pixabay, Unsplash, Freepik Profesional) sau la platforme premium de stock (Shutterstock / Adobe Stock). Imaginile trebuie să depășească 30-40 Megapixeli din cauza măririi la 1:1. Pentru un logo de firmă pe perete, trimite-l în format vectorial."
                                    },
                                    {
                                        q: "Se potrivește pentru un perete de recepție cu logo-ul firmei?",
                                        a: "Da, e o aplicație foarte căutată — un perete de fundal cu logo-ul companiei în spatele recepției sau sălii de ședințe creează un impact vizual mult mai puternic decât o simplă vopsire, la un cost comparabil."
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
            </div>
        </Suspense>
    );
}
