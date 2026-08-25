import { Suspense } from 'react';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Șepci cu Logo pentru Echipă sau Eveniment | HomePrint',
    description: 'Șepci personalizate cu logo-ul firmei, pentru echipă, promoții sau evenimente. Print DTF rezistent, comenzi în cantitate, preț instant.',
    keywords: ['sepci cu logo firma', 'sepci promotionale', 'sepci echipa', 'print dtf', 'homeprint'],
    alternates: {
        canonical: '/configurator/sepci',
    },
    openGraph: {
        title: 'Șepci cu Logo pentru Echipă sau Eveniment | HomePrint',
        description: 'Personalizezi logo-ul, alegi cantitatea, comanzi online.',
        images: ['/placeholder.png'],
    }
};

export default function SepciConfigPage() {
    return (
        <div className="pt-20">
            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Configuratoare", item: "/configurator" },
                    { name: "Șepci Personalizate", item: "/configurator/sepci" }
                ]}
            />
            <ProductSchema
                name="Șepci cu Logo pentru Echipă sau Eveniment"
                description="Șepci personalizate cu logo-ul firmei, print DTF rezistent, potrivite pentru echipă, promoții sau evenimente."
                image="/placeholder.png"
                url="/configurator/sepci"
                price="45.00"
            />
            <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul...</div>}>
                <ConfiguratorDispatcher configuratorId="sepci" />
            </Suspense>

            <FAQSchema
                faqs={[
                    {
                        question: "Pot pune logo-ul firmei pe mai multe șepci identice?",
                        answer: "Da, configurezi o dată designul și alegi cantitatea — potrivit pentru echipe, standuri la târguri sau materiale promoționale de eveniment."
                    },
                    {
                        question: "Rezistă logo-ul la purtare zilnică, afară?",
                        answer: "Da, tehnologia DTF rezistă bine la expunere solară și spălări repetate, mult mai durabilă decât printul termic ieftin."
                    },
                    {
                        question: "Pot combina mai multe culori de șapcă în aceeași comandă?",
                        answer: "Da, poți configura variante diferite (culoare, mărime) în cadrul aceleiași comenzi, util dacă echipa are preferințe diferite."
                    },
                    {
                        question: "Cât durează o comandă de volum mai mare?",
                        answer: "Producția DTF e rapidă indiferent de cantitate; pentru comenzi mari, recomandăm să plasezi comanda cu câteva zile înainte de eveniment."
                    }
                ]}
            />

            <section className="bg-white py-16 mt-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Șepci cu logo pentru echipă, stand sau promoție
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Un accesoriu simplu de vizibilitate de brand — <strong className="text-amber-600">logo-ul tău</strong>, print DTF rezistent, comandat în cantitatea de care ai nevoie, de la o bucată la zeci de exemplare.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2 inline-block">Pentru ce se folosesc</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Uniformă vizuală pentru echipă</strong>
                                        <span className="text-slate-600 text-sm">La un stand, un eveniment sau o echipă de teren, logo-ul pe șapcă e o formă simplă de vizibilitate.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Materiale promoționale de eveniment</strong>
                                        <span className="text-slate-600 text-sm">Cadouri pentru clienți la lansări sau târguri — mai memorabile decât un pliant.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Comenzi flexibile, de la 1 la zeci de bucăți</strong>
                                        <span className="text-slate-600 text-sm">Nu e nevoie de minim mare — poți testa cu câteva bucăți înainte de o comandă mai mare.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Pregătirea logo-ului</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Ideal trimite logo-ul în format vectorial (.PDF, .AI, .EPS) pentru cea mai bună claritate la print.
                            </p>
                            <p className="text-slate-600 leading-relaxed font-bold">
                                Nu ai fișier vectorial? Echipa noastră de DTP poate pregăti gratuit logo-ul pentru print.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-slate-200 pt-16">
                        <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                        <div className="space-y-6 max-w-3xl mx-auto">
                            {[
                                {
                                    q: "Pot pune logo-ul firmei pe mai multe șepci identice?",
                                    a: "Da, configurezi o dată designul și alegi cantitatea — potrivit pentru echipe, standuri la târguri sau materiale promoționale de eveniment."
                                },
                                {
                                    q: "Rezistă logo-ul la purtare zilnică, afară?",
                                    a: "Da, tehnologia DTF rezistă bine la expunere solară și spălări repetate, mult mai durabilă decât printul termic ieftin."
                                },
                                {
                                    q: "Pot combina mai multe culori de șapcă în aceeași comandă?",
                                    a: "Da, poți configura variante diferite (culoare, mărime) în cadrul aceleiași comenzi, util dacă echipa are preferințe diferite."
                                },
                                {
                                    q: "Cât durează o comandă de volum mai mare?",
                                    a: "Producția DTF e rapidă indiferent de cantitate; pentru comenzi mari, recomandăm să plasezi comanda cu câteva zile înainte de eveniment."
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
    );
}
