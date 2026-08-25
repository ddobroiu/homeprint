import { Suspense } from 'react';
import ConfiguratorDispatcher from "@/components/configurator/ConfiguratorDispatcher";
import ProductSchema from "@/components/ProductSchema";
import BreadcrumbSchema from "@/components/BreadcrumbSchema";
import FAQSchema from "@/components/FAQSchema";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Panouri și Materiale de Publicitate Obligatorii PNRR - HomePrint',
    description: 'Panouri de șantier, plăci permanente și autocolante pentru proiecte finanțate prin PNRR, conforme cu Manualul de Identitate Vizuală al Ministerului. Preț instant, livrare rapidă.',
    keywords: ['pnrr panouri', 'vizibilitate pnrr', 'panou santier pnrr', 'placa permanenta pnrr', 'identitate vizuala pnrr', 'homeprint'],
    alternates: {
        canonical: '/configurator/fonduri-pnrr',
    },
};

export default function FonduriPNRRPage() {
    return (
        <div className="pt-20">
            <h1 className="sr-only">Panouri de Publicitate Obligatorii pentru Proiecte PNRR</h1>
            <BreadcrumbSchema
                items={[
                    { name: "Acasă", item: "/" },
                    { name: "Configuratoare", item: "/configurator" },
                    { name: "Panouri PNRR", item: "/configurator/fonduri-pnrr" }
                ]}
            />
            <ProductSchema
                name="Panou de Publicitate PNRR"
                description="Panou de șantier sau placă permanentă pentru proiecte finanțate prin PNRR, executat conform Manualului de Identitate Vizuală al programului."
                image="/products/fonduri/pnrr-2.webp"
                url="/configurator/fonduri-pnrr"
                price="35.00"
            />
            <Suspense fallback={<div className="min-h-[60svh] flex items-center justify-center text-slate-500 font-medium">Se încarcă configuratorul de fonduri...</div>}>
                <ConfiguratorDispatcher configuratorId="configurator-fonduri" />
            </Suspense>

            <FAQSchema
                faqs={[
                    {
                        question: "Ce panouri sunt obligatorii pentru un proiect PNRR?",
                        answer: "În funcție de valoarea și tipul proiectului, PNRR cere de regulă un panou temporar montat pe durata lucrărilor și, pentru investiții mai mari, o placă permanentă montată după recepția lucrării — ambele cu sigla PNRR și textele standard din manualul de identitate."
                    },
                    {
                        question: "Unde găsesc șablonul oficial pentru panoul PNRR?",
                        answer: "Manualul de Identitate Vizuală PNRR e publicat de coordonatorul programului și conține dimensiunile, culorile și poziția obligatorie a siglelor. Trimite-ne linkul sau documentul primit — echipa noastră de DTP încadrează grafica ta exact în șablon, fără să reinventăm nimic."
                    },
                    {
                        question: "Panoul PNRR e diferit de cel pentru alte programe europene (Regio, POCU)?",
                        answer: "Da, fiecare program are propriul manual de identitate vizuală, cu sigle și texte specifice — un panou PNRR nu e interschimbabil cu unul Regio. Spune-ne exact programul de finanțare și ne asigurăm că folosim varianta corectă."
                    },
                    {
                        question: "Cât durează producția unui panou PNRR de șantier?",
                        answer: "Print UV direct pe placa aleasă (Forex sau Alucobond, în funcție de tip), fără timp de uscare — producție rapidă, livrare prin curier de regulă în 24-48h din momentul aprobării machetei conforme."
                    }
                ]}
            />

            <section className="bg-white py-16 mt-16 border-t border-slate-100">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
                            Panouri de Publicitate Obligatorii pentru Proiecte PNRR
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Un tip specific de <strong className="text-orange-600">semnalistică outdoor cu reguli stricte</strong> — panouri de șantier și plăci permanente pentru proiecte finanțate prin PNRR, executate exact conform Manualului de Identitate Vizuală al programului.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start mb-16">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-bold text-slate-800 border-b-2 border-orange-500 pb-2 inline-block">Ce producem pentru beneficiari PNRR</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Panouri temporare de șantier PNRR</strong>
                                        <span className="text-slate-600 text-sm">Montate la locul lucrărilor pe durata implementării, cu sigla PNRR și informațiile de proiect vizibile de la stradă.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Plăci permanente pe Alucobond</strong>
                                        <span className="text-slate-600 text-sm">Pentru investiții semnificative, o placă rezistentă la exterior ani de zile, montată definitiv după finalizarea lucrării.</span>
                                    </div>
                                </li>
                                <li className="flex items-start gap-3">
                                    <div className="mt-1 bg-green-100 text-green-600 p-1 rounded-full"><svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg></div>
                                    <div>
                                        <strong className="block text-slate-900">Autocolante pentru echipamente achiziționate</strong>
                                        <span className="text-slate-600 text-sm">Marcare conformă pentru utilaje, echipamente sau dotări cumpărate prin finanțarea PNRR.</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50">
                            <h3 className="text-2xl font-bold text-slate-800 mb-6">Ce ne trimiți pentru conformitate</h3>
                            <p className="text-slate-600 mb-4 leading-relaxed">
                                Trimite-ne titlul proiectului, codul de identificare, valoarea finanțării și linkul/documentul cu Manualul de Identitate Vizuală PNRR aplicabil.
                            </p>
                            <p className="text-slate-600 leading-relaxed font-bold">
                                Verificăm poziționarea siglei PNRR și a textelor obligatorii înainte de tipar, ca panoul să treacă fără observații la controale.
                            </p>
                        </div>
                    </div>

                    <div className="mt-16 border-t border-slate-200 pt-16">
                        <h3 className="text-3xl font-black text-slate-900 mb-8 text-center uppercase">Întrebări Frecvente</h3>
                        <div className="space-y-6 max-w-3xl mx-auto">
                            {[
                                {
                                    q: "Ce panouri sunt obligatorii pentru un proiect PNRR?",
                                    a: "În funcție de valoarea și tipul proiectului, PNRR cere de regulă un panou temporar montat pe durata lucrărilor și, pentru investiții mai mari, o placă permanentă montată după recepția lucrării — ambele cu sigla PNRR și textele standard din manualul de identitate."
                                },
                                {
                                    q: "Unde găsesc șablonul oficial pentru panoul PNRR?",
                                    a: "Manualul de Identitate Vizuală PNRR e publicat de coordonatorul programului și conține dimensiunile, culorile și poziția obligatorie a siglelor. Trimite-ne linkul sau documentul primit — echipa noastră de DTP încadrează grafica ta exact în șablon, fără să reinventăm nimic."
                                },
                                {
                                    q: "Panoul PNRR e diferit de cel pentru alte programe europene (Regio, POCU)?",
                                    a: "Da, fiecare program are propriul manual de identitate vizuală, cu sigle și texte specifice — un panou PNRR nu e interschimbabil cu unul Regio. Spune-ne exact programul de finanțare și ne asigurăm că folosim varianta corectă."
                                },
                                {
                                    q: "Cât durează producția unui panou PNRR de șantier?",
                                    a: "Print UV direct pe placa aleasă (Forex sau Alucobond, în funcție de tip), fără timp de uscare — producție rapidă, livrare prin curier de regulă în 24-48h din momentul aprobării machetei conforme."
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
