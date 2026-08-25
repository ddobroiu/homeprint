import { Suspense } from 'react';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Tricouri cu Logo pentru Echipă sau Eveniment | HomePrint',
    description: 'Tricouri personalizate cu logo-ul firmei sau design de eveniment. Bumbac 100%, print DTF rezistent, comenzi în cantitate, preț instant.',
    keywords: ['tricouri cu logo firma', 'tricouri echipa', 'tricouri promotionale', 'print dtf', 'homeprint'],
    alternates: {
        canonical: '/configurator/tricouri',
    },
    openGraph: {
        title: 'Tricouri cu Logo pentru Echipă sau Eveniment | HomePrint',
        description: 'Personalizezi logo-ul, alegi cantitatea, comanzi online.',
        images: ['/placeholder.png'],
    }
};

export default function TricouriPage() {
    return (
        <div className="pt-20">
            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Configuratoare", item: "/configurator" },
                    { name: "Tricouri Personalizate", item: "/configurator/tricouri" }
                ]}
            />
            <ProductSchema
                name="Tricouri cu Logo pentru Echipă sau Eveniment"
                description="Tricouri din bumbac 100%, personalizate cu logo-ul firmei, print DTF rezistent, potrivite pentru echipă sau evenimente."
                image="/placeholder.png"
                url="/configurator/tricouri"
                price="50.00"
            />
            <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul...</div>}>
                <ConfiguratorDispatcher configuratorId="tricouri" />
            </Suspense>

            <FAQSchema
                faqs={[
                    {
                        question: "Pot comanda tricouri identice pentru toată echipa?",
                        answer: "Da, configurezi designul o dată și alegi cantitatea și mărimile — util pentru echipe de lucru, staff de eveniment sau uniformă de tură."
                    },
                    {
                        question: "Rezistă logo-ul la spălări repetate?",
                        answer: "Da, tehnologia DTF nu crapă și nu se decolorează după multe spălări, spre deosebire de printul termic ieftin."
                    },
                    {
                        question: "Pot combina mărimi diferite în aceeași comandă?",
                        answer: "Da, configuratorul permite alegerea de mărimi diferite pentru fiecare bucată din comandă — util pentru echipe cu mărimi variate."
                    },
                    {
                        question: "Cât durează o comandă mai mare, pentru un eveniment?",
                        answer: "Producția e rapidă, dar pentru comenzi mari recomandăm plasarea comenzii cu câteva zile înainte de eveniment, ca să ai marjă de siguranță."
                    }
                ]}
            />

            <section className="bg-white py-16 mt-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Tricouri cu logo pentru echipă sau eveniment de brand
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            <strong className="text-amber-600">Logo-ul firmei</strong>, pe bumbac 100%, print DTF rezistent — potrivit pentru echipe de lucru, staff de eveniment sau materiale promoționale.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2 inline-block">Pentru ce se folosesc</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Uniformă de echipă sau tură</strong>
                                        <span className="text-slate-600 text-sm">Staff ușor de recunoscut la un eveniment, târg sau în magazin.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Materiale promoționale de brand</strong>
                                        <span className="text-slate-600 text-sm">Un tricou personalizat rămâne mai mult timp la client decât un pliant sau o broșură.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Mărimi mixte, o singură comandă</strong>
                                        <span className="text-slate-600 text-sm">Alegi mărimi diferite pentru fiecare persoană din echipă, fără comenzi separate.</span>
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
                                    q: "Pot comanda tricouri identice pentru toată echipa?",
                                    a: "Da, configurezi designul o dată și alegi cantitatea și mărimile — util pentru echipe de lucru, staff de eveniment sau uniformă de tură."
                                },
                                {
                                    q: "Rezistă logo-ul la spălări repetate?",
                                    a: "Da, tehnologia DTF nu crapă și nu se decolorează după multe spălări, spre deosebire de printul termic ieftin."
                                },
                                {
                                    q: "Pot combina mărimi diferite în aceeași comandă?",
                                    a: "Da, configuratorul permite alegerea de mărimi diferite pentru fiecare bucată din comandă — util pentru echipe cu mărimi variate."
                                },
                                {
                                    q: "Cât durează o comandă mai mare, pentru un eveniment?",
                                    a: "Producția e rapidă, dar pentru comenzi mari recomandăm plasarea comenzii cu câteva zile înainte de eveniment, ca să ai marjă de siguranță."
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
