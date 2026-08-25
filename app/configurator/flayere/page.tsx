import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Flyere Publicitare Ieftine pentru Marketing Local - HomePrint',
    description: 'Comandă flyere publicitare ieftine, formate A6, A5, DL, pentru distribuție locală sau cutii poștale. Hârtie premium, tiraje mici și mari, preț instant.',
    keywords: ['flyere personalizate', 'flayere ieftine', 'print flyere', 'marketing local', 'flyer a5', 'flyer a6', 'homeprint'],
    alternates: {
        canonical: '/configurator/flayere',
    },
};

export default function FlyerePage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Flyere...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Flyere și Fluturași Personalizați</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Configuratoare", item: "/configurator" },
                        { name: "Flyere Publicitare", item: "/configurator/flayere" }
                    ]}
                />
                <ProductSchema
                    name="Flyere Publicitare Personalizate"
                    description="Flyere publicitare ieftine pe hârtie premium, formate A6, A5 și DL, pentru marketing local și distribuție de volum."
                    image="/products/flayere/flayere-1.webp"
                    url="/configurator/flayere"
                    price="15.00"
                />
                <ConfiguratorDispatcher configuratorId="flayere" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Pe ce suport de hârtie se fac?",
                            answer: "În general folosim foi Cretate, fie Lucioase sau Mate, cu gramaje plecând de la 130g/150g (economice/stradale) până la formate rigide, cartonate, de 250g-300g (pentru tichete sau vouchere valoroase)."
                        },
                        {
                            question: "Pot printa față/verso color?",
                            answer: "Da, tehnologia digitală actuală face ca prețul de imprimare față-verso color (4+4 culori CMYK) să fie aproape echivalent cu printul cu o o față simplă, adăugând valoare informațională clientului tău."
                        },
                        {
                            question: "Ce format aleg pentru un flyer de eveniment sau promoție?",
                            answer: "A6 e ideal pentru un cod de reducere sau un anunț scurt, ușor de ținut în buzunar. A5 sau DL oferă spațiu suficient pentru un meniu, un program sau o listă de servicii, fără să pară aglomerat."
                        },
                        {
                            question: "Cât de repede primesc comanda?",
                            answer: "Producția digitală pentru flyere e rapidă, fără timpi de uscare — pentru tiraje standard, livrarea prin curier durează de regulă 24-48h din momentul aprobării machetei."
                        }
                    ]}
                />

                {/* MASSIVE SEO CONTENT SECTION */}
                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Imprimare Flyere și Fluturași Publicitari
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Cea mai eficientă metodă de <strong className="text-orange-600">marketing direct și promovare locală</strong>. Tipărim pe hârtie premium la tiraje mici și mari (din mediul digital web-to-print). Distribuie-le și creșteți vânzările chiar mâine.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">De ce flyerele încă funcționează?</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Cost redus, Impact Major</strong>
                                            <span className="text-slate-600 text-sm">Cu un efort minimal (ca și preț unitar / bucată), atingeți fizic o audiență garantată (în cutii poștale sau mânați trecătorilor), fără teama că adblocker-ul le ascunde "reclama".</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Formate Ușoare (A5 / A6)</strong>
                                            <span className="text-slate-600 text-sm">Flyer-ul A6 este ușor de pus într-un buzunar, ideal pentru o ofertă rapidă (cod voucher de reducere), în timp ce un flyer A5 sau DL (1/3 din A4) are suficientă proporție pentru Meniul unei Pizzerii.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Regula principală de Design DTP</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Gândește fața Flyer-ului sub ideea unei "oferte de neegalat". Omul citește maxim 2 secunde un fluturaș înainte de a decide dacă să îl rețină. Atrage-l vizual cu promisiuni mari, și pe verso scrii condițiile, adresa și meniul!
                                </p>
                            </div>
                        </div>

                        {/* SEO FAQ Structured Schema */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Flyere</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Pe ce suport de hârtie se fac?",
                                        a: "În general folosim foi Cretate, fie Lucioase sau Mate, cu gramaje plecând de la 130g/150g (economice/stradale) până la formate rigide, cartonate, de 250g-300g (pentru tichete sau vouchere valoroase)."
                                    },
                                    {
                                        q: "Pot printa față/verso color?",
                                        a: "Da, tehnologia digitală actuală face ca prețul de imprimare față-verso color (4+4 culori CMYK) să fie aproape echivalent cu printul cu o o față simplă, adăugând valoare informațională clientului tău."
                                    },
                                    {
                                        q: "Ce format aleg pentru un flyer de eveniment sau promoție?",
                                        a: "A6 e ideal pentru un cod de reducere sau un anunț scurt, ușor de ținut în buzunar. A5 sau DL oferă spațiu suficient pentru un meniu, un program sau o listă de servicii, fără să pară aglomerat."
                                    },
                                    {
                                        q: "Cât de repede primesc comanda?",
                                        a: "Producția digitală pentru flyere e rapidă, fără timpi de uscare — pentru tiraje standard, livrarea prin curier durează de regulă 24-48h din momentul aprobării machetei."
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
