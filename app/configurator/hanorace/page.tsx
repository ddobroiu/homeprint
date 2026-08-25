import { Suspense } from 'react';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Hanorace Personalizate cu Logo pentru Echipă - HomePrint',
    description: 'Hanorace groase personalizate cu logo-ul firmei, print DTF rezistent la spălări repetate — echipament de lucru sau uniformă de echipă pentru sezonul rece. Preț instant.',
    keywords: ['hanorac personalizat cu logo', 'hanorace echipa', 'echipament de lucru personalizat', 'print dtf', 'homeprint'],
    alternates: {
        canonical: '/configurator/hanorace',
    },
    openGraph: {
        title: 'Hanorace Personalizate cu Logo pentru Echipă | HomePrint',
        description: 'Personalizezi logo-ul, alegi cantitatea, comanzi online.',
        images: ['/placeholder.png'],
    }
};

export default function HanoracePage() {
    return (
        <div className="pt-20">
            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Configuratoare", item: "/configurator" },
                    { name: "Hanorace Personalizate", item: "/configurator/hanorace" }
                ]}
            />
            <ProductSchema
                name="Hanorace Personalizate"
                description="Hanorace personalizate premium folosing tipar DTF, foarte rezistente și călduroase. Alege culoarea și mărimea dorită."
                image="/placeholder.png"
                url="/configurator/hanorace"
                price="120.00"
            />
            <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center">Se încarcă configuratorul...</div>}>
                <ConfiguratorDispatcher configuratorId="hanorace" />
            </Suspense>

            <FAQSchema
                faqs={[
                    {
                        question: "Hanoracele sunt potrivite ca echipament de lucru pentru echipă?",
                        answer: "Da, materialul gros (bumbac amestec de top) ține de cald pe șantier sau la puncte de lucru afară, iar logo-ul aplicat prin DTF rezistă la spălări repetate — util pentru echipe care lucrează afară în sezonul rece."
                    },
                    {
                        question: "Rezistă logo-ul la spălări repetate și la uzură?",
                        answer: "Da, tehnologia DTF nu crapă și nu se decolorează după multe spălări, spre deosebire de printul termic ieftin — important pentru echipament purtat zilnic, nu doar la un eveniment."
                    },
                    {
                        question: "Pot comanda mărimi diferite pentru fiecare membru al echipei?",
                        answer: "Da, configuratorul permite alegerea de mărimi diferite pentru fiecare bucată din aceeași comandă, fără să fie nevoie de comenzi separate pe fiecare persoană."
                    },
                    {
                        question: "Cât durează o comandă mai mare, pentru toată echipa?",
                        answer: "Producția e rapidă, dar pentru comenzi mari recomandăm plasarea comenzii cu câteva zile înainte de sezon, ca să ai marjă de siguranță pentru toate mărimile."
                    }
                ]}
            />

            <section className="bg-white py-16 mt-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Hanorace cu Logo — Echipament de Lucru pentru Echipă
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Realizăm <strong className="text-orange-600">hanorace groase personalizate</strong> cu logo-ul firmei, print DTF rezistent la spălări — soluția pentru echipe care lucrează afară în sezonul rece sau pentru uniformă de brand.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">Pentru ce se folosesc</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Echipament de lucru pe sezon rece</strong>
                                        <span className="text-slate-600 text-sm">Material gros, călduros — echipa ta rămâne vizibilă și cu logo pe șantier, la punct de lucru sau livrări, chiar și iarna.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Print DTF rezistent la uzură zilnică</strong>
                                        <span className="text-slate-600 text-sm">Spre deosebire de printul termic ieftin care crapă rapid, DTF-ul rezistă la spălări repetate — important pentru un hanorac purtat zilnic, nu doar la un eveniment.</span>
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
                                Ideal trimite logo-ul în format vectorial (.PDF, .AI, .EPS) pentru cea mai bună claritate la print, mai ales pe suprafața mare a spatelui.
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
                                    q: "Hanoracele sunt potrivite ca echipament de lucru pentru echipă?",
                                    a: "Da, materialul gros (bumbac amestec de top) ține de cald pe șantier sau la puncte de lucru afară, iar logo-ul aplicat prin DTF rezistă la spălări repetate — util pentru echipe care lucrează afară în sezonul rece."
                                },
                                {
                                    q: "Rezistă logo-ul la spălări repetate și la uzură?",
                                    a: "Da, tehnologia DTF nu crapă și nu se decolorează după multe spălări, spre deosebire de printul termic ieftin — important pentru echipament purtat zilnic, nu doar la un eveniment."
                                },
                                {
                                    q: "Pot comanda mărimi diferite pentru fiecare membru al echipei?",
                                    a: "Da, configuratorul permite alegerea de mărimi diferite pentru fiecare bucată din aceeași comandă, fără să fie nevoie de comenzi separate pe fiecare persoană."
                                },
                                {
                                    q: "Cât durează o comandă mai mare, pentru toată echipa?",
                                    a: "Producția e rapidă, dar pentru comenzi mari recomandăm plasarea comenzii cu câteva zile înainte de sezon, ca să ai marjă de siguranță pentru toate mărimile."
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
