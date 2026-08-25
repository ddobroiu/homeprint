import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Panouri din Carton pentru Semnalistică Temporară de Interior | HomePrint',
    description: 'Panouri din carton ondulat sau fagure (honeycomb), cea mai ieftină soluție rigidă pentru semnalistică temporară de interior, display-uri și evenimente. Preț instant.',
    keywords: ['carton personalizat', 'carton ondulat', 'carton fagure honeycomb', 'display carton eveniment', 'panou carton indoor', 'homeprint'],
    alternates: {
        canonical: '/materiale/carton',
    },
};

export default function CartonPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Se încarcă configuratorul Carton...</div>}>
            <div className="pt-20">
                <h1 className="sr-only">Panouri din Carton pentru Semnalistică Temporară de Interior</h1>
                <BreadcrumbSchema
                    items={[
                        { name: "Acasă", item: "/" },
                        { name: "Materiale", item: "/materiale" },
                        { name: "Carton", item: "/materiale/carton" }
                    ]}
                />
                <ProductSchema
                    name="Panou din Carton Personalizat"
                    description="Panou din carton ondulat sau fagure (honeycomb), soluția economică pentru semnalistică temporară de interior, display-uri și evenimente."
                    image="/products/master/panouri-carton-plume-foam-board-personalizat.png"
                    url="/materiale/carton"
                    price="18.00"
                />
                <ConfiguratorDispatcher configuratorId="carton" />

                <FAQSchema
                    faqs={[
                        {
                            question: "Când ai nevoie de un panou din carton, nu din PVC sau polipropilenă?",
                            answer: "Când folosința e temporară și de interior — un display de eveniment, o zi de promoție în magazin, un panou de conferință. E cel mai ieftin material rigid din gama noastră, dar nu e gândit pentru exterior sau utilizare pe termen lung."
                        },
                        {
                            question: "Care e diferența dintre carton ondulat și fagure (honeycomb)?",
                            answer: "Cartonul ondulat e mai subțire și mai flexibil, potrivit pentru panouri mici sau ambalaje. Structura fagure (honeycomb) e mult mai rigidă la aceeași greutate redusă, recomandată pentru panouri mari de expoziție care trebuie să stea drepte fără să se îndoaie."
                        },
                        {
                            question: "Rezistă la umezeală sau la exterior?",
                            answer: "Nu, cartonul nu e materialul potrivit pentru exterior sau spații cu umezeală — pentru asta recomandăm polipropilena celulară sau PVC Forex, care rezistă la apă și intemperii."
                        },
                        {
                            question: "Cât de repede primesc panourile pentru un eveniment?",
                            answer: "Print UV direct pe carton, fără timp de uscare — producție rapidă, ideală când ai un eveniment programat peste câteva zile și ai nevoie de panouri gata la timp."
                        }
                    ]}
                />

                <section className="bg-white py-16 mt-16 border-t border-slate-100">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                                Carton — Soluția Economică pentru Semnalistică Temporară
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Panourile din carton ondulat sau fagure (honeycomb) sunt <strong className="text-amber-600">cea mai ieftină opțiune rigidă</strong> din gama noastră — potrivite pentru display-uri de eveniment și semnalistică de interior pe termen scurt.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-amber-500 pb-2 inline-block">Pentru ce se folosește</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Display-uri de eveniment sau conferință</strong>
                                            <span className="text-slate-600 text-sm">Ușor de transportat și montat, ideal pentru un stand sau o zi de promoție unde nu ai nevoie de durabilitate pe termen lung.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Semnalistică temporară de interior</strong>
                                            <span className="text-slate-600 text-sm">Panouri de direcționare, anunțuri sau afișaj în magazin, birou sau sală de conferință, fără nevoie de rezistență la exterior.</span>
                                        </div>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                        <div>
                                            <strong className="block text-slate-900">Cel mai bun cost pe panou</strong>
                                            <span className="text-slate-600 text-sm">Fiind cel mai accesibil material rigid din gamă, e alegerea potrivită când ai nevoie de multe panouri identice pentru o campanie scurtă.</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                                <h3 className="text-2xl font-bold text-slate-800 mb-6">Ondulat vs. fagure (honeycomb)</h3>
                                <p className="text-slate-600 mb-4 leading-relaxed">
                                    Cartonul ondulat e potrivit pentru panouri mici, ușoare. Structura fagure e mai rigidă la aceeași greutate, recomandată pentru panouri de expoziție mai mari care trebuie să stea drepte.
                                </p>
                                <p className="text-slate-600 leading-relaxed font-bold">
                                    Important: cartonul e gândit exclusiv pentru interior — nu rezistă la umezeală sau expunere prelungită la exterior.
                                </p>
                            </div>
                        </div>

                        <div className="mt-16 border-t border-slate-200 pt-16">
                            <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                            <div className="space-y-6 max-w-3xl mx-auto">
                                {[
                                    {
                                        q: "Când ai nevoie de un panou din carton, nu din PVC sau polipropilenă?",
                                        a: "Când folosința e temporară și de interior — un display de eveniment, o zi de promoție în magazin, un panou de conferință. E cel mai ieftin material rigid din gama noastră, dar nu e gândit pentru exterior sau utilizare pe termen lung."
                                    },
                                    {
                                        q: "Care e diferența dintre carton ondulat și fagure (honeycomb)?",
                                        a: "Cartonul ondulat e mai subțire și mai flexibil, potrivit pentru panouri mici sau ambalaje. Structura fagure (honeycomb) e mult mai rigidă la aceeași greutate redusă, recomandată pentru panouri mari de expoziție care trebuie să stea drepte fără să se îndoaie."
                                    },
                                    {
                                        q: "Rezistă la umezeală sau la exterior?",
                                        a: "Nu, cartonul nu e materialul potrivit pentru exterior sau spații cu umezeală — pentru asta recomandăm polipropilena celulară sau PVC Forex, care rezistă la apă și intemperii."
                                    },
                                    {
                                        q: "Cât de repede primesc panourile pentru un eveniment?",
                                        a: "Print UV direct pe carton, fără timp de uscare — producție rapidă, ideală când ai un eveniment programat peste câteva zile și ai nevoie de panouri gata la timp."
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
