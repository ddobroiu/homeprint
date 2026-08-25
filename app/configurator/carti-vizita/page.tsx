import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Cărți de Vizită Personalizate - Modele Premiu',
    description: 'Comandă online cărți de vizită premium din carton, plastic sau metal. Plastifiere soft-touch și finisaje de lux. Preț instant.',
    keywords: ['carti de vizita', 'print carti de vizita', 'personalizate', 'business cards', 'carton', 'plastic', 'homeprint'],
    alternates: {
        canonical: '/configurator/carti-vizita',
    },
};

export default function CartiVizitaPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul de cărți de vizită...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Cărți de Vizită Personalizate</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Configuratoare", item: "/configurator" },
                        { name: "Cărți de Vizită", item: "/configurator/carti-vizita" }
                    ]}
                />
                <ProductSchema
                    name="Cărți de Vizită Personalizate"
                    description="Comandă online cărți de vizită premium din carton, plastic, lemn sau metal. Diverse opțiuni de finisare disponibile."
                    image="/products/master/carti-de-vizita-premium-personalizate-online-ieftine.png"
                    url="/configurator/carti-vizita"
                    price="0.50"
                />
                <ConfiguratorDispatcher configuratorId="carti-vizita" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Care este cantitatea minimă de cărți de vizită?",
                            answer: "Comanda minimă pentru cărțile de vizită standard este de 100 de bucăți pe model grafic (pentru a asigura un preț optim pe unitate)."
                        },
                        {
                            question: "Pot imprima fața-verso (pe ambele pări)?",
                            answer: "Desigur! Configurarea noastră permite selectarea printului o față (4+0) sau față-verso (4+4). Prețul se ajustează automat în funcție de alegere."
                        },
                        {
                            question: "Ce este plastifierea Soft-Touch?",
                            answer: "Plastifierea Soft-Touch oferă cartonului o textură catifelată, premium, mult mai plăcută la atingere decât plastifierea mată standard și este mult mai rezistentă la amprente."
                        },
                        {
                            question: "Cât durează de la comandă la livrare?",
                            answer: "Producția standard pentru cărți de vizită durează 1-2 zile lucrătoare, plus timpul de curierat — de regulă ai comanda în mână în 24-48h din momentul aprobării machetei."
                        }
                    ]}
                />

                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Cărți de Vizită Premium
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Transformă prima impresie într-una memorabilă. Realizăm <strong className="text-orange-600">cărți de vizită de o calitate excepțională</strong> cu opțiuni complete de finisare: plastifiere mată sau lucioasă, colțuri rotunjite și tăieri pe formă.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">Materiale Disponibile</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Carton Standard (350g/mp)</strong>
                                            <span className="text-slate-600 text-sm">Grosime optimă, culori netede, perfect pentru tiraje mari și campanii corporate unde eleganța rezonabilă întâlnește prețul scăzut.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Plastic Transparent / Mat</strong>
                                            <span className="text-slate-600 text-sm">O alternativă luxoasă de excepție rezistentă aproape nelimitat în timp la frecare și apă. Impact imposibil de trecut cu vederea.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Specificații și Grafică</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Dimensiunea finală standard recomandată pe plan intern este de <strong className="text-amber-600">90x50 mm</strong> sau formatul bancar la <strong className="text-amber-600">85x54 mm</strong>. Dimensiunea brută (bleed-ul) se lasă întotdeauna cu minim +2mm de jur împrejur.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Pregătește documentele PDF CMYK convertind fonturile la curbe (create outlines) pentru cele mai precise rezultate pe stațiile noastre DTP.
                                </p>
                            </div>
                        </div>
                        
                        {/* FAQ Visual Section */}
                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente Cărți de Vizită</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Care este cantitatea minimă de cărți de vizită?",
                                        a: "Comanda minimă pentru cărțile de vizită standard este de 100 de bucăți pe model grafic (pentru a asigura un preț optim pe unitate)."
                                    },
                                    {
                                        q: "Pot imprima fața-verso (pe ambele pări)?",
                                        a: "Desigur! Configurarea noastră permite selectarea printului o față (4+0) sau față-verso (4+4). Prețul se ajustează automat în funcție de alegere."
                                    },
                                    {
                                        q: "Ce este plastifierea Soft-Touch?",
                                        a: "Plastifierea Soft-Touch oferă cartonului o textură catifelată, premium, mult mai plăcută la atingere decât plastifierea mată standard și este mult mai rezistentă la amprente."
                                    },
                                    {
                                        q: "Cât durează de la comandă la livrare?",
                                        a: "Producția standard pentru cărți de vizită durează 1-2 zile lucrătoare, plus timpul de curierat — de regulă ai comanda în mână în 24-48h din momentul aprobării machetei."
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

